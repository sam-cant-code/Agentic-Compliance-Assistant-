from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime
import re
import torch

# LangChain imports
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate

app = Flask(__name__)
CORS(app)  # Allow frontend to call this API

# ==============================================================================
# CONFIGURATION
# ==============================================================================

# Environment variables
GOOGLE_API_KEY = os.getenv('GEMINI_API_KEY', 'your-gemini-api-key-here')
CHROMA_DB_PATH = os.getenv('CHROMA_DB_PATH', 'src/data/chroma_db')  # Updated to match your structure
COLLECTION_NAME = os.getenv('COLLECTION_NAME', 'mental_health')

# Crisis detection keywords
CRISIS_KEYWORDS = [
    'suicide', 'kill myself', 'end my life', 'want to die', 
    'self harm', 'cut myself', 'hurt myself', 'no reason to live'
]

# Crisis resources
CRISIS_RESOURCES = {
    'hotline': '988 (Suicide & Crisis Lifeline)',
    'text': 'Text "HELLO" to 741741 (Crisis Text Line)',
    'international': 'https://findahelpline.com'
}

# ==============================================================================
# GLOBAL VARIABLES
# ==============================================================================

vector_store = None
llm = None
embedding_model = None
memory_store = {}  # Store conversation history per session

# ==============================================================================
# INITIALIZATION
# ==============================================================================

def initialize_rag_system():
    """Initialize RAG system with YOUR existing vector store and Gemini LLM"""
    global vector_store, llm, embedding_model
    
    try:
        print("🔄 Initializing RAG system...")
        
        # 1. Load YOUR sentence-transformer embeddings (same as your notebook)
        print("Loading HuggingFace embeddings model...")
        model_name = "sentence-transformers/all-MiniLM-L6-v2"
        model_kwargs = {"device": "cuda" if torch.cuda.is_available() else "cpu"}
        
        embedding_model = HuggingFaceEmbeddings(
            model_name=model_name,
            model_kwargs=model_kwargs
        )
        print(f"✅ Embeddings loaded on: {model_kwargs['device']}")
        
        # 2. Load YOUR existing Chroma vector store
        if os.path.exists(CHROMA_DB_PATH):
            vector_store = Chroma(
                persist_directory=CHROMA_DB_PATH,
                embedding_function=embedding_model,
                collection_name=COLLECTION_NAME
            )
            doc_count = vector_store._collection.count()
            print(f"✅ Vector store loaded: {doc_count} documents")
        else:
            print(f"❌ Error: Vector store not found at {CHROMA_DB_PATH}")
            vector_store = None
        
        # 3. Initialize Gemini LLM for chat
        llm = ChatGoogleGenerativeAI(
            google_api_key=GOOGLE_API_KEY,
            model="gemini-2.0-flash-exp",  # Latest Gemini 2.0 experimental model
            temperature=0.7,
            max_output_tokens=500,
            convert_system_message_to_human=True
        )
        print("✅ Gemini 2.0 Flash initialized")
        
        print("✅ RAG system ready!")
        
    except Exception as e:
        print(f"❌ Error initializing RAG system: {e}")
        raise

# ==============================================================================
# SAFETY FUNCTIONS
# ==============================================================================

def detect_crisis(message):
    """Detect if message contains crisis-related content"""
    message_lower = message.lower()
    
    for keyword in CRISIS_KEYWORDS:
        if keyword in message_lower:
            return True
    
    concerning_patterns = [
        r'\b(don\'t|dont) want to (live|be here)',
        r'\b(thinking about|planning) (suicide|ending)',
        r'\bno point in (living|life)\b'
    ]
    
    for pattern in concerning_patterns:
        if re.search(pattern, message_lower):
            return True
    
    return False


def get_crisis_response():
    """Return crisis intervention response"""
    return {
        'message': (
            "I'm really concerned about what you're sharing. Your safety is the most important thing right now.\n\n"
            "Please reach out to a crisis counselor immediately:\n"
            f"• Call or text {CRISIS_RESOURCES['hotline']} (available 24/7)\n"
            f"• {CRISIS_RESOURCES['text']}\n"
            f"• International resources: {CRISIS_RESOURCES['international']}\n\n"
            "These counselors are trained to help and want to support you. "
            "You don't have to go through this alone."
        ),
        'is_crisis': True,
        'resources': CRISIS_RESOURCES,
        'status': 'crisis_detected'
    }


def add_safety_disclaimer(response):
    """Add disclaimer to all responses"""
    disclaimer = (
        "\n\n*Note: I'm an AI assistant providing general information. "
        "For personalized advice, please consult a mental health professional.*"
    )
    return response + disclaimer

# ==============================================================================
# RAG CHAIN CREATION
# ==============================================================================

def create_mental_health_chain(session_id):
    """Create conversational RAG chain using YOUR vector store + Gemini"""
    
    if not vector_store or not llm:
        raise ValueError("RAG system not initialized")
    
    # Create or retrieve memory for this session
    if session_id not in memory_store:
        memory_store[session_id] = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True,
            output_key="answer"
        )
    
    # Custom prompt for mental health (optimized for Gemini)
    prompt_template = """You are a compassionate mental health support assistant. Use the context from mental health resources to answer the question.

Context from mental health resources:
{context}

Previous conversation:
{chat_history}

User's question: {question}

Instructions:
- Be empathetic, supportive, and non-judgmental
- Provide evidence-based information from the context
- If you don't know something, say so - don't make up information
- Always acknowledge feelings before providing information
- Use simple, clear language
- Remind users to seek professional help for serious concerns
- Never diagnose or prescribe treatment

Your response:"""

    PROMPT = PromptTemplate(
        template=prompt_template,
        input_variables=["context", "chat_history", "question"]
    )
    
    # Create conversational retrieval chain
    qa_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vector_store.as_retriever(
            search_type="mmr",  # Maximal Marginal Relevance
            search_kwargs={
                "k": 4,  # Retrieve top 4 chunks
                "fetch_k": 10,
                "lambda_mult": 0.7
            }
        ),
        memory=memory_store[session_id],
        return_source_documents=True,
        combine_docs_chain_kwargs={"prompt": PROMPT}
    )
    
    return qa_chain

# ==============================================================================
# API ROUTES
# ==============================================================================

@app.route('/api/chat', methods=['POST'])
def chat():
    """Main chat endpoint"""
    try:
        data = request.get_json()
        user_message = data.get('message')
        session_id = data.get('session_id', 'default')
        
        # Validation
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400
        
        if len(user_message) > 1000:
            return jsonify({'error': 'Message too long (max 1000 characters)'}), 400
        
        # Crisis detection (highest priority)
        if detect_crisis(user_message):
            return jsonify(get_crisis_response()), 200
        
        # Check if RAG system is initialized
        if not vector_store or not llm:
            return jsonify({
                'error': 'Chatbot is not ready. Please contact support.',
                'status': 'error'
            }), 503
        
        # Create RAG chain for this session
        qa_chain = create_mental_health_chain(session_id)
        
        # Get response from RAG chain
        result = qa_chain({"question": user_message})
        
        # Extract answer and sources
        answer = result.get('answer', '')
        source_docs = result.get('source_documents', [])
        
        # Add safety disclaimer
        answer = add_safety_disclaimer(answer)
        
        # Format sources for frontend
        sources = []
        for doc in source_docs[:2]:  # Show top 2 sources
            sources.append({
                'source': doc.metadata.get('source', 'Unknown'),
                'page': doc.metadata.get('page', 'N/A'),
                'chunk_type': doc.metadata.get('chunk_type', 'unknown'),
                'snippet': doc.page_content[:150] + '...'
            })
        
        response = {
            'message': answer,
            'sources': sources,
            'session_id': session_id,
            'is_crisis': False,
            'status': 'success',
            'timestamp': datetime.now().isoformat()
        }
        
        return jsonify(response), 200
    
    except Exception as e:
        print(f"❌ Error in chat endpoint: {e}")
        return jsonify({
            'error': 'An error occurred processing your message',
            'details': str(e),
            'status': 'error'
        }), 500


@app.route('/api/clear-history', methods=['POST'])
def clear_history():
    """Clear conversation history for a session"""
    try:
        data = request.get_json()
        session_id = data.get('session_id', 'default')
        
        if session_id in memory_store:
            del memory_store[session_id]
        
        return jsonify({
            'message': 'Conversation history cleared',
            'status': 'success'
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/resources', methods=['GET'])
def get_resources():
    """Get mental health resources"""
    resources = {
        'crisis': CRISIS_RESOURCES,
        'general': {
            'therapy_finder': 'https://www.psychologytoday.com/us/therapists',
            'samhsa': '1-800-662-4357 (Substance abuse and mental health)',
            'nami': 'https://www.nami.org (National Alliance on Mental Illness)'
        }
    }
    return jsonify(resources), 200


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    health_status = {
        'status': 'healthy',
        'rag_initialized': vector_store is not None and llm is not None,
        'vector_store_docs': vector_store._collection.count() if vector_store else 0,
        'embedding_model': 'sentence-transformers/all-MiniLM-L6-v2',
        'llm_model': 'gemini-2.0-flash-exp',
        'active_sessions': len(memory_store),
        'timestamp': datetime.now().isoformat()
    }
    return jsonify(health_status), 200


@app.route('/api/search', methods=['POST'])
def search():
    """Direct search endpoint (without LLM, just retrieval)"""
    try:
        data = request.get_json()
        query = data.get('query')
        k = data.get('k', 3)  # Number of results
        
        if not query:
            return jsonify({'error': 'No query provided'}), 400
        
        if not vector_store:
            return jsonify({'error': 'Vector store not initialized'}), 503
        
        # Search vector store
        results = vector_store.similarity_search(query, k=k)
        
        # Format results
        formatted_results = []
        for doc in results:
            formatted_results.append({
                'content': doc.page_content,
                'source': doc.metadata.get('source', 'Unknown'),
                'page': doc.metadata.get('page', 'N/A'),
                'chunk_type': doc.metadata.get('chunk_type', 'unknown')
            })
        
        return jsonify({
            'query': query,
            'results': formatted_results,
            'count': len(formatted_results),
            'status': 'success'
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    """Collect user feedback"""
    try:
        data = request.get_json()
        rating = data.get('rating')
        comment = data.get('comment', '')
        session_id = data.get('session_id')
        
        # TODO: Store in database
        print(f"📊 Feedback - Rating: {rating}, Session: {session_id}, Comment: {comment}")
        
        return jsonify({
            'message': 'Thank you for your feedback!',
            'status': 'success'
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==============================================================================
# STARTUP
# ==============================================================================

if __name__ == '__main__':
    print("="*80)
    print("🧠 Mental Health Chatbot API Starting...")
    print("   Embeddings: sentence-transformers/all-MiniLM-L6-v2")
    print("   LLM: Gemini 2.0 Flash (Experimental)")
    print("="*80)
    
    # Initialize RAG system
    try:
        initialize_rag_system()
    except Exception as e:
        print(f"⚠️ RAG initialization failed: {e}")
        print("   API will start but may not work properly")
    
    print("\n✅ Server starting on http://0.0.0.0:5000")
    print("📝 Endpoints:")
    print("   POST /api/chat           - Chat with mental health bot")
    print("   POST /api/search         - Direct vector search (no LLM)")
    print("   POST /api/clear-history  - Clear conversation")
    print("   GET  /api/resources      - Get mental health resources")
    print("   GET  /api/health         - Health check")
    print("   POST /api/feedback       - Submit feedback")
    print("="*80 + "\n")
    
    app.run(debug=True, host='0.0.0.0', port=5000)