import React, { useState } from 'react';
import { Info, X } from 'lucide-react';
import ResourcesPanel from './ResourcesPanel';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1001, backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.target.style.backgroundColor = '#4f46e5'; e.target.style.transform = 'scale(1.05)'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = '#6366f1'; e.target.style.transform = 'scale(1)'; }}>
        {isOpen ? <X size={24} /> : <Info size={24} />}
      </button>

      <div style={{ position: 'fixed', top: 0, right: isOpen ? 0 : '-400px', width: '400px', height: '100vh', backgroundColor: 'white', borderLeft: '1px solid #e5e7eb', transition: 'right 0.3s ease-out', zIndex: 1000, overflowY: 'auto', boxShadow: isOpen ? '-4px 0 6px -1px rgba(0, 0, 0, 0.1)' : 'none' }}>
        <ResourcesPanel />
      </div>

      {isOpen && (
        <div onClick={() => setIsOpen(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999, animation: 'fadeIn 0.3s ease-out' }} />
      )}
    </>
  );
};

export default Sidebar;