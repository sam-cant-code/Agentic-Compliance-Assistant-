import React from 'react';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: '16px',
    md: '24px',
    lg: '32px'
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div
        style={{
          width: sizeClasses[size],
          height: sizeClasses[size],
          border: '3px solid var(--border)',
          borderTop: '3px solid var(--primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;