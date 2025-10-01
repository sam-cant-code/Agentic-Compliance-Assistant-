import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const ErrorMessage = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div
      style={{
        backgroundColor: '#fee2e2',
        border: '1px solid #fecaca',
        borderRadius: '0.5rem',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      <AlertCircle size={20} color="#dc2626" />
      <p style={{ flex: 1, color: '#991b1b', fontSize: '0.875rem' }}>
        {message}
      </p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <X size={18} color="#991b1b" />
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;