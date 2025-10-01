import React, { useEffect, useState } from 'react';
import ChatInterface from './components/Chat/ChatInterface';
import Sidebar from './components/Sidebar/Sidebar';
import CrisisModal from './components/CrisisModal/CrisisModal';
import { useChatStore } from './store/useChatStore';
import { chatAPI } from './services/api';
import { WifiOff } from 'lucide-react';

function App() {
  const { isCrisisMode, closeCrisisMode } = useChatStore();
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    checkServerHealth();
    const interval = setInterval(checkServerHealth, 60000);
    return () => clearInterval(interval);
  }, []);

  const checkServerHealth = async () => {
    try {
      await chatAPI.healthCheck();
      setIsOnline(true);
    } catch (error) {
      setIsOnline(false);
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {!isOnline && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, backgroundColor: '#fef2f2', borderBottom: '1px solid #fecaca', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', zIndex: 1002 }}>
          <WifiOff size={18} color="#dc2626" />
          <p style={{ fontSize: '0.875rem', color: '#991b1b', fontWeight: '500' }}>
            Unable to connect to server. Please check your connection.
          </p>
        </div>
      )}

      <ChatInterface />
      <Sidebar />
      <CrisisModal isOpen={isCrisisMode} onClose={closeCrisisMode} />
    </div>
  );
}

export default App;