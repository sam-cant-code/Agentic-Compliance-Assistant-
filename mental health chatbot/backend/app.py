import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativai as genai
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from dotenv import load_dotenv

# --- 1. CONFIGURATION and SETUP ---

# Load environment variables
load_dotenv()

# --- Initialize Flask App and CORS ---
app = Flask(__name__)
# CORS is needed to allow your React frontend to communicate with this backend
CORS(app)

# --- Pre-load all necessary models and data ---
# This ensures that the app is responsive and doesn't reload large models on every request.
print("Loading embedding model...")
# Use the same embedding model as in your notebook
embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2",
    model_kwargs={'device': 'cpu'}
)
print("Embedding model loaded.")

print("Loading Chroma vector database...")
# Specify the path to your existing Chroma database
# Make sure this path is correct relative to where you run the script
CHROMA_DB_PATH = "data/chroma_db"
try:
    vectordb = Chroma(
        persist_directory=CHROMA_DB_PATH,
        embedding_function=embedding_model,
        collection_name="mental_health"
    )
    print(f"Vector database loaded with {vectordb._collection.count()} documents.")
except Exception as e:
    print(f"Error loading vector database: {e}")
    print("Please ensure the ChromaDB files are in the 'backend/data/chroma_db' directory.")
    vectordb = None


# --- Configure Gemini API ---
try:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY not found in environment variables.")
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-pro')
    print("Gemini model configured.")
except Exception as e:
    print(f"Error configuring Gemini API: {e}")
    # Handle the error gracefully if the app needs to run without Gemini
    model = None

# --- 2. CORE CHATBOT LOGIC ---

def get_relevant_context(query, vectordb, k=5):
    """Performs a similarity search on the vector database."""
    if not vectordb:
        return []
    results = vectordb.similarity_search(query, k=k)
    return results

def generate_response(query, context_chunks):
    """Generates a response using the Gemini API."""
    if not model:
        return "Error: Gemini model is not configured. Please check your API key."

    context = "\n\n---\n\n".join([doc.page_content for doc in context_chunks])

    prompt_template = f"""
    You are a helpful chatbot for mental health information. Your knowledge is based on the provided text.
    Please answer the user's question based *only* on the following context.
    If the information is not in the context, state that you cannot answer the question with the given information.
    Do not make up information or use external knowledge.

    CONTEXT:
    {context}

    QUESTION:
    {query}

    ANSWER:
    """
    try:
        response = model.generate_content(prompt_template)
        return response.text
    except Exception as e:
        return f"An error occurred while generating the response: {e}"

# --- 3. API ENDPOINT ---

@app.route('/api/chat', methods=['POST'])
def chat():
    """
    The main API endpoint. It receives a query, gets context,
    generates a response, and returns it.
    """
    try:
        data = request.get_json()
        query = data.get('query')

        if not query:
            return jsonify({'error': 'Query is missing'}), 400

        # 1. Retrieve relevant context
        relevant_docs = get_relevant_context(query, vectordb)

        # 2. Generate the response
        response_text = generate_response(query, relevant_docs)

        return jsonify({'response': response_text})

    except Exception as e:
        print(f"Error in /api/chat: {e}")
        return jsonify({'error': 'An internal server error occurred'}), 500

# --- 4. RUN THE FLASK APP ---

if __name__ == '__main__':
    # Runs the Flask app on localhost, port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)
