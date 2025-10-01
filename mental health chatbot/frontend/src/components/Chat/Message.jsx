import React, { useState } from 'react';
import { Bot, User, AlertCircle, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { formatMessageTime } from '../../utils/helpers';

const Message = ({ message }) => {
  const [showSources, setShowSources] = useState(false);
  
  const { text, isBot, timestamp, sources, isCrisis, isError } = message;

  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        padding: '1rem',
        animation: 'fadeIn 0.3s ease-out',
        flexDirection: isBot ? 'row' : 'row-reverse'
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: isBot ? '#6366f1' : '#8b5cf6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        {isBot ? <Bot size={20} color="white" /> : <User size={20} color="white" />}
      </div>

      <div style={{ flex: 1, maxWidth: '70%' }}>
        <div
          style={{
            backgroundColor: isBot ? 'white' : '#6366f1',
            color: isBot ? '#111827' : 'white',
            padding: '1rem',
            borderRadius: '1rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            ...(isCrisis && {
              border: '2px solid #ef4444',
              backgroundColor: '#fee2e2'
            }),
            ...(isError && {
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca'
            })
          }}
        >
          {isCrisis && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
                padding: '0.5rem',
                backgroundColor: 'white',
                borderRadius: '0.5rem'
              }}
            >
              <AlertCircle size={18} color="#dc2626" />
              <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#dc2626' }}>
                Crisis Support Information
              </span>
            </div>
          )}

          <p
            style={{
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap',
              color: isCrisis || isError ? '#111827' : 'inherit'
            }}
          >
            {text}
          </p>

          {sources && sources.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <button
                onClick={() => setShowSources(!showSources)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6366f1',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  padding: '0.25rem 0'
                }}
              >
                <ExternalLink size={14} />
                {showSources ? 'Hide' : 'Show'} Sources ({sources.length})
                {showSources ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {showSources && (
                <div
                  style={{
                    marginTop: '0.75rem',
                    padding: '0.75rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem'
                  }}
                >
                  {sources.map((source, idx) => (
                    <div
                      key={idx}
                      style={{
                        marginBottom: idx < sources.length - 1 ? '0.75rem' : 0,
                        paddingBottom: idx < sources.length - 1 ? '0.75rem' : 0,
                        borderBottom: idx < sources.length - 1 ? '1px solid #e5e7eb' : 'none'
                      }}
                    >
                      <p style={{ fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
                        📄 {source.source}
                      </p>
                      <p style={{ color: '#6b7280', fontSize: '0.8rem' }}>
                        {source.snippet}
                      </p>
                      <span
                        style={{
                          display: 'inline-block',
                          marginTop: '0.25rem',
                          padding: '0.125rem 0.5rem',
                          backgroundColor: '#dbeafe',
                          color: '#1e40af',
                          borderRadius: '0.25rem',
                          fontSize: '0.75rem'
                        }}
                      >
                        {source.chunk_type}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <p
          style={{
            fontSize: '0.75rem',
            color: '#9ca3af',
            marginTop: '0.5rem',
            textAlign: isBot ? 'left' : 'right'
          }}
        >
          {formatMessageTime(timestamp)}
        </p>
      </div>
    </div>
  );
};

export default Message;