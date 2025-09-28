#!/bin/bash

set -e

PROJECT_NAME="compliance-ai-backend"
BASE_DIR=$(pwd)/$PROJECT_NAME

mkdir -p "$BASE_DIR"
cd "$BASE_DIR"

# Backend structure
mkdir -p app/agents/investigator
mkdir -p app/agents/reporter
mkdir -p app/agents/policy_guard
mkdir -p app/api/routes
mkdir -p app/api/middleware
mkdir -p app/api/schemas
mkdir -p app/core/rag
mkdir -p app/core/vector_store
mkdir -p app/core/compliance_engine
mkdir -p app/services/document_parser
mkdir -p app/services/policy_matcher
mkdir -p app/services/risk_assessor
mkdir -p app/utils/logging
mkdir -p app/utils/config
mkdir -p app/utils/validators
mkdir -p tests/unit
mkdir -p tests/integration
mkdir -p tests/e2e
mkdir -p config/environments
mkdir -p config/policies
mkdir -p data/knowledge_base
mkdir -p data/embeddings
mkdir -p data/temp
mkdir -p logs
mkdir -p scripts/deployment
mkdir -p scripts/maintenance

# Requirements file
cat > requirements.txt << 'EOF'
fastapi==0.104.1
uvicorn==0.24.0
pydantic==2.5.0
langchain==0.1.0
openai==1.6.0
qdrant-client==1.7.0
sentence-transformers==2.2.2
python-multipart==0.0.6
python-jose==3.3.0
passlib==1.7.4
sqlalchemy==2.0.23
alembic==1.13.1
redis==5.0.1
celery==5.3.4
pytest==7.4.3
python-docx==1.1.0
PyPDF2==3.0.1
pandas==2.1.4
numpy==1.25.2
EOF

# Main app file
cat > main.py << 'EOF'
"""
Compliance AI Assistant - Main Application
Multi-agent system for document compliance checking
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Compliance AI Assistant",
    description="Agentic system for compliance document review",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Compliance AI Assistant API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
EOF

# Environment file
cat > .env.example << 'EOF'
# API Configuration
API_PORT=8000
API_HOST=0.0.0.0
DEBUG=true

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/compliance_db
REDIS_URL=redis://localhost:6379

# Vector Database
QDRANT_URL=http://localhost:6333

# AI Services
OPENAI_API_KEY=your_openai_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here

# Compliance Sources
CONFLUENCE_URL=https://your-company.atlassian.net
CONFLUENCE_TOKEN=your_confluence_token

# Security
JWT_SECRET=your_secret_key_here
ENCRYPTION_KEY=your_encryption_key_here

# Logging
LOG_LEVEL=INFO
LOG_FILE=logs/compliance.log
EOF

# Docker Compose
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:password@postgres:5432/compliance_db
      - REDIS_URL=redis://redis:6379
      - QDRANT_URL=http://qdrant:6333
    depends_on:
      - postgres
      - redis
      - qdrant
    volumes:
      - .:/app
      - ./data:/app/data

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=compliance_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"
    volumes:
      - qdrant_data:/qdrant/storage

volumes:
  postgres_data:
  qdrant_data:
EOF

# Dockerfile
cat > Dockerfile << 'EOF'
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "main.py"]
EOF

# Gitignore
cat > .gitignore << 'EOF'
.env
__pycache__/
*.py[cod]
*.so
.Python
env/
venv/
ENV/
.venv/
logs/
*.log
data/temp/
data/uploads/
data/cache/
.DS_Store
*.db
*.sqlite3
EOF