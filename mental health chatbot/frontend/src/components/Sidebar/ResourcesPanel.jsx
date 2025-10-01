import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Globe, Heart, ExternalLink, AlertCircle } from 'lucide-react';
import { chatAPI } from '../../services/api';

const ResourcesPanel = () => {
  const [resources, setResources] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const data = await chatAPI.getResources();
      setResources(data);
    } catch (error) {
      console.error('Failed to load resources:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>
        Loading resources...
      </div>
    );
  }

  return (
    <div style={{ padding: '1.5rem' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>
        🆘 Crisis Resources
      </h2>

      <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fecaca', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <AlertCircle size={20} color="#dc2626" />
          <h3 style={{ fontWeight: '600', color: '#991b1b' }}>
            In Crisis? Get Help Now
          </h3>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Phone size={18} color="#dc2626" />
            <div>
              <p style={{ fontWeight: '600', color: '#991b1b', fontSize: '0.875rem' }}>
                Call 988
              </p>
              <p style={{ fontSize: '0.75rem', color: '#7f1d1d' }}>
                Suicide & Crisis Lifeline
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <MessageSquare size={18} color="#dc2626" />
            <div>
              <p style={{ fontWeight: '600', color: '#991b1b', fontSize: '0.875rem' }}>
                Text HELLO to 741741
              </p>
              <p style={{ fontSize: '0.75rem', color: '#7f1d1d' }}>
                Crisis Text Line
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Globe size={18} color="#dc2626" />
            <div>
              <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" style={{ fontWeight: '600', color: '#991b1b', fontSize: '0.875rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                International Resources
                <ExternalLink size={12} />
              </a>
              <p style={{ fontSize: '0.75rem', color: '#7f1d1d' }}>
                Find help worldwide
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
        📚 General Resources
      </h3>
      
      {resources?.general && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <a href="https://www.psychologytoday.com/us/therapists" target="_blank" rel="noopener noreferrer" style={{ padding: '0.75rem', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '0.5rem', textDecoration: 'none', color: '#111827', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#f3f4f6'; e.target.style.borderColor = '#6366f1'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = '#f9fafb'; e.target.style.borderColor = '#e5e7eb'; }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: '600', fontSize: '0.875rem' }}>
                  Find a Therapist
                </p>
                <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  Psychology Today
                </p>
              </div>
              <ExternalLink size={16} color="#6366f1" />
            </div>
          </a>
          
          <div style={{ padding: '0.75rem', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
            <p style={{ fontWeight: '600', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
              SAMHSA Helpline
            </p>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
              Substance abuse & mental health
            </p>
            <p style={{ fontWeight: '600', color: '#6366f1', fontSize: '0.875rem' }}>
              1-800-662-4357
            </p>
          </div>
          
          <a href="https://www.nami.org" target="_blank" rel="noopener noreferrer" style={{ padding: '0.75rem', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '0.5rem', textDecoration: 'none', color: '#111827', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#f3f4f6'; e.target.style.borderColor = '#6366f1'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = '#f9fafb'; e.target.style.borderColor = '#e5e7eb'; }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: '600', fontSize: '0.875rem' }}>
                  NAMI
                </p>
                <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  National Alliance on Mental Illness
                </p>
              </div>
              <ExternalLink size={16} color="#6366f1" />
            </div>
          </a>
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#eff6ff', border: '1px solid #dbeafe', borderRadius: '0.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Heart size={18} color="#2563eb" style={{ flexShrink: 0, marginTop: '0.125rem' }} />
          <p style={{ fontSize: '0.75rem', color: '#1e40af', lineHeight: '1.5' }}>
            Remember: This chatbot provides information only. Always consult a mental health 
            professional for personalized advice and treatment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPanel;