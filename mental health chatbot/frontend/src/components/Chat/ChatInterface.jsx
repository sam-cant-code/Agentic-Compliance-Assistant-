import React from 'react';
import { Trash2 } from 'lucide-react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ErrorMessage from '../Common/ErrorMessage';
import { useChatStore } from '../../store/useChatStore';
import { SAMPLE_PROMPTS } from '../../utils/constants';

const ChatInterface = () => {
  const { messages, isLoading, error, sendMessage, clearChat, dismissError } = useChatStore();
  const showSamplePrompts = messages.length === 1 && !isLoading;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'white' }}>
      <div style={{ padding: '1rem 1.5rem', backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
            Mental Health Support
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
            Compassionate AI assistance for your mental wellbeing
          </p>
        </div>
        
        <button onClick={clearChat} disabled={messages.length <= 1} className="btn btn-secondary" style={{ opacity: messages.length <= 1 ? 0.5 : 1, padding: '0.5rem 1rem', border: 'none', borderRadius: '0.5rem', fontWeight: '500', cursor: messages.length <= 1 ? 'not-allowed' : 'pointer', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'white', color: '#111827', border: '1px solid #e5e7eb' }}>
          <Trash2 size={18} />
          Clear Chat
        </button>
      </div>

      {error && (
        <div style={{ padding: '1rem' }}>
          <ErrorMessage message={error} onDismiss={dismissError} />
        </div>
      )}

      {showSamplePrompts && (
        <div style={{ padding: '2rem', backgroundColor: '#f9fafb' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
              💬 Try asking me about:
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {SAMPLE_PROMPTS.map((prompt, index) => (
                <button 
                  key={index} 
                  onClick={() => sendMessage(prompt)} 
                  style={{ padding: '0.75rem 1rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.875rem', color: '#374151' }} 
                  onMouseEnter={(e) => { e.target.style.borderColor = '#6366f1'; e.target.style.backgroundColor = '#f5f3ff'; }} 
                  onMouseLeave={(e) => { e.target.style.borderColor = '#e5e7eb'; e.target.style.backgroundColor = 'white'; }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatInterface;