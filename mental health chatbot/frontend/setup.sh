#!/bin/bash

echo "🚀 Setting up Mental Health Chatbot Frontend with Zustand..."
echo "============================================================="

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "Please run this script from your Vite project root directory"
    exit 1
fi

echo -e "${YELLOW}⚠️  This will DELETE your existing src/ directory!${NC}"
echo -n "Continue? (y/n): "
read -r response

if [[ ! "$response" =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 0
fi

echo -e "${RED}🗑️  Removing old src/ directory...${NC}"
rm -rf src/

echo -e "${BLUE}📁 Creating new directory structure...${NC}"

mkdir -p src/components/Chat
mkdir -p src/components/Sidebar
mkdir -p src/components/CrisisModal
mkdir -p src/components/Common
mkdir -p src/services
mkdir -p src/store
mkdir -p src/utils
mkdir -p src/styles

echo -e "${GREEN}✅ Directories created${NC}"

echo -e "${BLUE}📝 Creating files...${NC}"

touch src/components/Chat/ChatInterface.jsx
touch src/components/Chat/MessageList.jsx
touch src/components/Chat/MessageInput.jsx
touch src/components/Chat/Message.jsx

touch src/components/Sidebar/Sidebar.jsx
touch src/components/Sidebar/ResourcesPanel.jsx

touch src/components/CrisisModal/CrisisModal.jsx

touch src/components/Common/LoadingSpinner.jsx
touch src/components/Common/ErrorMessage.jsx

touch src/services/api.js

touch src/store/useChatStore.js

touch src/utils/constants.js
touch src/utils/helpers.js

touch src/styles/index.css

touch src/App.jsx
touch src/main.jsx

touch .env

echo -e "${GREEN}✅ Files created${NC}"

echo -e "${BLUE}📦 Installing dependencies...${NC}"

npm install axios lucide-react date-fns zustand

echo -e "${GREEN}✅ Dependencies installed${NC}"

echo -e "${BLUE}📄 Creating .env file...${NC}"

cat > .env << 'EOF'
VITE_API_URL=http://localhost:5000
EOF

echo -e "${GREEN}✅ .env file created${NC}"

echo ""
echo "============================================================="
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "============================================================="
echo ""
echo "📁 New directory structure:"
echo "   src/"
echo "   ├── components/"
echo "   │   ├── Chat/"
echo "   │   ├── Sidebar/"
echo "   │   ├── CrisisModal/"
echo "   │   └── Common/"
echo "   ├── services/"
echo "   │   └── api.js"
echo "   ├── store/"
echo "   │   └── useChatStore.js  ⭐ Zustand store"
echo "   ├── utils/"
echo "   ├── styles/"
echo "   ├── App.jsx"
echo "   └── main.jsx"
echo ""
echo -e "${YELLOW}📝 Next steps:${NC}"
echo "   1. Copy component code into files"
echo "   2. npm run dev"
echo ""
echo "Happy coding! 💙"