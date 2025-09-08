import pdfplumber
import pandas as pd
from transformers import pipeline
from visualizations import generate_sentiment_pie_chart, generate_wordcloud
from langchain.prompts import PromptTemplate
from langchain_ollama import ChatOllama
import pandas as pd
REPORT_MD = "report.md"
def generate_markdown_report(summary_df, final_summary, pie_chart_path, positive_wordcloud_path, negative_wordcloud_path):
    """Generate a Markdown report from summary DataFrame and visualizations."""

    md_lines = []

    # Title
    md_lines.append("# Report on Comments and Suggestions")
    md_lines.append("\n## Table of Summaries and Sentiments\n")

    # Markdown table header
    md_lines.append("| Sr.No | Para Number | Summary | Sentiment |")
    md_lines.append("|-------|------------|---------|-----------|")

    # Fill table rows
    for _, row in summary_df.iterrows():
        md_lines.append(f"| {row[headers[0]]} | {row[headers[1]]} | {row['Summary']} | {row['sentiment']} |")

    # Overall summary
    md_lines.append("\n## Overall Summary\n")
    md_lines.append(final_summary)

    # Visualizations
    md_lines.append("\n## Visualizations\n")
    md_lines.append(f"### Sentiment Pie Chart\n![]({pie_chart_path})\n")
    md_lines.append(f"### Positive Wordcloud\n![]({positive_wordcloud_path})\n")
    md_lines.append(f"### Negative Wordcloud\n![]({negative_wordcloud_path})\n")

    # Write to file
    with open(REPORT_MD, "w") as f:
        f.write("\n".join(md_lines))

    print(f"Markdown report saved to {REPORT_MD}")

# File paths
file_path = "econsult.pdf"
output_file = "formatted_tables_combined.csv"

# Initialize variables
headers = None
combined_rows = []

# Initialize pipelines once
summarizer = pipeline("summarization", model="facebook/bart-large-cnn",device=0)
sentiment_analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english",device=0)

# Extract tables from PDF
with pdfplumber.open(file_path) as pdf:
    last_row = None
    for page in pdf.pages:
        tables = page.extract_tables()
        for table in tables:
            if not table or len(table) < 2:
                continue

            # Set headers
            current_headers = [" ".join(cell.split()) if cell else "" for cell in table[0]]
            if headers is None:
                headers = current_headers

            for row in table[1:]:
                clean_row = [" ".join(cell.split()) if cell else "" for cell in row]
                while len(clean_row) < len(headers):
                    clean_row.append("")
                if len(clean_row) > len(headers):
                    clean_row = clean_row[:len(headers)]

                if clean_row[0]:  # New row
                    combined_rows.append(clean_row)
                    last_row = combined_rows[-1]
                else:  # Continuation
                    if last_row:
                        last_row[2] += " " + clean_row[2]
                        last_row[3] += " " + clean_row[3]

# Summarize and perform sentiment analysis
rows_data = []
final_document_to_summarize = ""

for row in combined_rows:
    try:
        text_to_summarize = row[2] + " " + row[3]
        max_len = min(60, len(text_to_summarize.split()) // 2 + 1)
        summary = summarizer(text_to_summarize, max_length=max_len, min_length=15, do_sample=False)[0]['summary_text']
        sentiment_result = sentiment_analyzer(text_to_summarize)[0]

        rows_data.append({
            headers[0]: row[0],
            headers[1]: row[1],
            headers[2]: row[2],
            headers[3]: row[3],
            "Summary": summary,
            "sentiment": sentiment_result['label'],
            "score": sentiment_result['score']
        })

        final_document_to_summarize += " " + summary
    except Exception as e:
        print(f"Error processing row {row[0]}: {e}")

# Create DataFrame
summary_df = pd.DataFrame(rows_data)

# Final document summary
max_len = min(100, len(final_document_to_summarize.split()) // 2 + 1)
final_summary = summarizer(final_document_to_summarize, max_length=max_len, min_length=15, do_sample=False)[0]['summary_text']

# Show unique sentiments
print("Unique sentiments found:")
print(summary_df["sentiment"].unique())

# Visualizations
pie_chart = generate_sentiment_pie_chart(summary_df)
positive_wordcloud = generate_wordcloud(summary_df, "POSITIVE", headers[2])
negative_wordcloud = generate_wordcloud(summary_df, "NEGATIVE", headers[2])

'''
#Creating report
llm = ChatOllama(model="qwen2.5",temperature=0)
rows_list = summary_df.to_dict(orient="records")

prompt = """
You are a reporting analyst. Generate a Markdown report from the given summary data.

Instructions:
1. For each row, include:
   - Sr.No
   - Para Number
   - Summary
   - Sentiment
   in a Markdown table.
2. Include an overall analysis of all comments and overall sentiment.
3. Include visualizations in the report as Markdown images:
   - Sentiment pie chart: ![]({{pie_chart}})
   - Positive wordcloud: ![]({{positive_wordcloud}})
   - Negative wordcloud: ![]({{negative_wordcloud}})

Data:
{rows}
Overall summary: {overall_summary}
"""
prompt_template = PromptTemplate(
    input_variables=["rows", "overall_summary", "pie_chart", "positive_wordcloud", "negative_wordcloud"],
    template=prompt
)
chain = prompt_template | llm 
report = chain.invoke({"rows":rows_list,"overall_summary":final_summary,"pie_chart":pie_chart,"positive_wordcloud":positive_wordcloud,"negative_wordcloud":negative_wordcloud})
'''


#generating report
generate_markdown_report(
    summary_df,
    final_summary,
    pie_chart_path=pie_chart,
    positive_wordcloud_path=positive_wordcloud,
    negative_wordcloud_path=negative_wordcloud
)
# Save summarized data
summary_df.to_csv(output_file, index=False)
print(f"Combined and formatted table saved to {output_file}")
