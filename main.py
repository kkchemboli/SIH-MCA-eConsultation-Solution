import pdfplumber
import pandas as pd
from transformers import pipeline
import matplotlib.pyplot as plt
from visualizations import generate_sentiment_pie_chart, generate_wordcloud

# File paths
file_path = "econsult.pdf"
output_file = "formatted_tables_combined.csv"

# Initialize variables
headers = None
combined_rows = []
summarized_rows = []

# Initialize pipelines once
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
sentiment_analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

# Extract tables from PDF
with pdfplumber.open(file_path) as pdf:
    last_row = None
    for page in pdf.pages:
        tables = page.extract_tables()
        for table in tables:
            if not table or len(table) < 2:
                continue  # Skip empty/malformed tables

            # Set headers
            current_headers = [" ".join(cell.split()) if cell else "" for cell in table[0]]
            if headers is None:
                headers = current_headers

            # Process rows
            for row in table[1:]:
                clean_row = [" ".join(cell.split()) if cell else "" for cell in row]
                
                # Pad/truncate to match header length
                while len(clean_row) < len(headers):
                    clean_row.append("")
                if len(clean_row) > len(headers):
                    clean_row = clean_row[:len(headers)]

                # Check for new record
                if clean_row[0]:  # New row if 'Sr No' is present
                    combined_rows.append(clean_row)
                    last_row = combined_rows[-1]
                else:
                    # Continuation of previous row
                    if last_row:
                        last_row[2] = last_row[2] + " " + clean_row[2]
                        last_row[3] = last_row[3] + " " + clean_row[3]

# Summarize suggestions and justifications
for row in combined_rows:
    try:
        to_summarize = row[2] + " " + row[3]
        max_len = min(60, len(to_summarize.split()) // 2 + 1)
        summary = summarizer(to_summarize, max_length=max_len, min_length=15, do_sample=False)[0]['summary_text']
        summarized_rows.append({
            headers[0]: row[0],
            headers[1]: row[1],
            "Summary": summary,
            headers[2]: row[2],
            headers[3]: row[3]
        })
    except Exception as e:
        print(f"Error summarizing row {row[0]}: {e}")

# Create DataFrames
df = pd.DataFrame(combined_rows, columns=headers).dropna(how="all")
summary_df = pd.DataFrame(summarized_rows)

# Sentiment analysis on each suggestion
sentiments = []
for row in summary_df.values:
    try:
        content = row[headers.index(headers[2])]
        sentiment = sentiment_analyzer(content)[0]
        sentiments.append({
            headers[0]: row[0],
            headers[1]: row[1],
            headers[2]: content,
            headers[3]: row[3],
            "Summary": row[summary_df.columns.get_loc("Summary")],
            "sentiment": sentiment['label'],
            "score": sentiment['score']
        })
    except Exception as e:
        print(f"Error in sentiment analysis for row {row[0]}: {e}")

results_df = pd.DataFrame(sentiments)

# Show unique sentiments
print("Unique sentiments found:")
print(results_df["sentiment"].unique())

# Display all columns
pd.set_option('display.max_columns', None)

# Visualizations
pie_chart = generate_sentiment_pie_chart(results_df)
positive_wordcloud = generate_wordcloud(results_df, "POSITIVE", headers[2])
negative_wordcloud = generate_wordcloud(results_df, "NEGATIVE", headers[2])

# Save summarized data to CSV
summary_df.to_csv(output_file, index=False)
print(f"Combined and formatted table saved to {output_file}")
