import streamlit as st
st.set_page_config(page_title="E-Consultation Report", layout="wide")
st.title("E-Consultation PDF Analyzer")
uploaded_file = st.file_uploader("Upload PDF file", type="pdf")

if uploaded_file:
    st.info("Processing PDF...")
    from main import main
    st.markdown(main(uploaded_file))
else:
    st.info("No file uploaded")