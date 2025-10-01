import React from 'react';
import { AlertTriangle, X, Phone, MessageSquare, Globe } from 'lucide-react';

const CrisisModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          maxWidth: '500px',
          width: '100%',
          padding: '2rem',
          position: 'relative',
          animation: 'fadeIn 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <X size={24} color="#6b7280" />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div
            style={{
              backgroundColor: '#fee2e2',
              borderRadius: '50%',
              padding: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <AlertTriangle size={32} color="#dc2626" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.25rem' }}>
              Crisis Support Available
            </h2>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Your safety is our priority
            </p>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ color: '#374151', marginBottom: '1rem', lineHeight: '1.6' }}>
            If you're experiencing a mental health crisis or having thoughts of self-harm, 
            please reach out to a trained crisis counselor immediately:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb'
              }}
            >
              <Phone size={24} color="#6366f1" />
              <div>
                <p style={{ fontWeight: '600', color: '#111827' }}>Call 988</p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Suicide & Crisis Lifeline (24/7)
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb'
              }}
            >
              <MessageSquare size={24} color="#6366f1" />
              <div>
                <p style={{ fontWeight: '600', color: '#111827' }}>Text "HELLO" to 741741</p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Crisis Text Line
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem',
                border: '1px solid #e5e7eb'
              }}
            >
              <Globe size={24} color="#6366f1" />
              <div>
                <p style={{ fontWeight: '600', color: '#111827' }}>
                  <a
                    href="https://findahelpline.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#6366f1', textDecoration: 'none' }}
                  >
                    findahelpline.com
                  </a>
                </p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  International resources
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '1rem',
            backgroundColor: '#eff6ff',
            borderRadius: '0.5rem',
            border: '1px solid #dbeafe'
          }}
        >
          <p style={{ fontSize: '0.875rem', color: '#1e40af', textAlign: 'center' }}>
            💙 You don't have to go through this alone. Help is available 24/7.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CrisisModal;