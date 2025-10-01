import React, { useEffect, useRef } from 'react';
import Message from './Message';
import LoadingSpinner from '../Common/LoadingSpinner';
import { useChatStore } from '../../store/useChatStore';

const MessageList = () => {
  const { messages, isLoading } = useChatStore();
  const containerRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div ref={containerRef} style={{ flex: 1, overflowY: 'auto', padding: '1rem', backgroundColor: '#f9fafb' }}>
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      
      {isLoading && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LoadingSpinner size="sm" />
          </div>
          <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '1rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#6366f1', animation: 'pulse 1.5s ease-in-out infinite' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#6366f1', animation: 'pulse 1.5s ease-in-out 0.2s infinite' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#6366f1', animation: 'pulse 1.5s ease-in-out 0.4s infinite' }} />
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;