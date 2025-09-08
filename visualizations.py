import matplotlib.pyplot as plt
from wordcloud import WordCloud
import tempfile
import os

def generate_sentiment_pie_chart(results_df):
    """
    Generates a pie chart showing the sentiment distribution and saves it to a temporary PNG file.

    Args:
    - results_df (DataFrame): The DataFrame containing sentiment data.

    Returns:
    - str: The path to the temporary PNG file.
    """
    sentiment_counts = results_df.groupby(["sentiment"]).size()

    fig = plt.figure(figsize=(6, 6), dpi=100)
    ax = plt.subplot(111)
    sentiment_counts.plot.pie(ax=ax, autopct='%1.1f%%', startangle=270, fontsize=12, label="")
    
    # Create a temporary file
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".png")
    plt.savefig(temp_file.name, bbox_inches='tight', dpi=150)
    plt.close(fig)  # Close the figure

    return temp_file.name


def generate_wordcloud(results_df, sentiment_label, column_name):
    """
    Generates a word cloud for a specific sentiment and saves it to a temporary PNG file.

    Args:
    - results_df (DataFrame): The DataFrame containing sentiment data.
    - sentiment_label (str): The sentiment label to filter by (e.g., "POSITIVE").
    - column_name (str): The name of the column containing text data.

    Returns:
    - str: The path to the temporary PNG file.
    """
    text_data = results_df[column_name][results_df["sentiment"] == sentiment_label]
    wordcloud = WordCloud(max_font_size=50, max_words=100, background_color="white").generate(str(text_data))

    plt.figure()
    plt.title(f"{sentiment_label} Suggestions Word Cloud")
    plt.imshow(wordcloud, interpolation="bilinear")
    plt.axis("off")

    # Create a temporary file
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".png")
    plt.savefig(temp_file.name, bbox_inches='tight', dpi=150)
    plt.close()  # Close the figure

    return temp_file.name
