import React, { useState, useRef } from 'react';
import { Send, Loader } from 'lucide-react';
import { useChatStore } from '../../store/useChatStore';

const MessageInput = () => {
  const { sendMessage, isLoading } = useChatStore();
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      sendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem', backgroundColor: 'white', borderTop: '1px solid #e5e7eb' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', maxWidth: '1200px', margin: '0 auto' }}>
        <textarea 
          ref={textareaRef} 
          value={message} 
          onChange={handleChange} 
          onKeyDown={handleKeyDown} 
          placeholder="Type your message... (Shift+Enter for new line)" 
          disabled={isLoading} 
          rows={1} 
          style={{ 
            flex: 1, 
            padding: '0.75rem 1rem', 
            borderRadius: '0.75rem', 
            border: '1px solid #e5e7eb', 
            fontSize: '1rem', 
            resize: 'none', 
            outline: 'none', 
            transition: 'border-color 0.2s', 
            fontFamily: 'inherit', 
            maxHeight: '150px', 
            minHeight: '48px' 
          }} 
          onFocus={(e) => e.target.style.borderColor = '#6366f1'} 
          onBlur={(e) => e.target.style.borderColor = '#e5e7eb'} 
        />
        
        <button 
          type="submit" 
          disabled={!message.trim() || isLoading} 
          style={{ 
            padding: '0.75rem 1.5rem', 
            backgroundColor: isLoading || !message.trim() ? '#e5e7eb' : '#6366f1', 
            color: 'white', 
            border: 'none', 
            borderRadius: '0.75rem', 
            cursor: isLoading || !message.trim() ? 'not-allowed' : 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            fontWeight: '500', 
            transition: 'all 0.2s', 
            minWidth: '100px', 
            justifyContent: 'center' 
          }} 
          onMouseEnter={(e) => { 
            if (message.trim() && !isLoading) { 
              e.target.style.backgroundColor = '#4f46e5'; 
              e.target.style.transform = 'translateY(-2px)'; 
            }
          }} 
          onMouseLeave={(e) => { 
            e.target.style.backgroundColor = message.trim() && !isLoading ? '#6366f1' : '#e5e7eb'; 
            e.target.style.transform = 'translateY(0)'; 
          }}
        >
          {isLoading ? (
            <>
              <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
              Sending
            </>
          ) : (
            <>
              <Send size={18} />
              Send
            </>
          )}
        </button>
      </div>
      
      <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem', textAlign: 'center' }}>
        This is an AI assistant. For emergencies, call 988 or your local emergency services.
      </p>
    </form>
  );
};

export default MessageInput;