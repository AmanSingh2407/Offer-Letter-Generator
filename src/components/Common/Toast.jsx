import React from 'react';

export const Toast = ({ toast }) => {
  if (!toast) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      padding: '0.75rem 1.25rem',
      borderRadius: '10px',
      fontSize: '0.875rem',
      fontWeight: '600',
      boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
      animation: 'slideInToast 0.3s ease',
      backgroundColor: toast.type === 'success' ? '#10b981' : '#ef4444',
      color: '#ffffff',
      fontFamily: 'var(--font-sans)'
    }}>
      <span style={{ fontSize: '1.1rem' }}>{toast.type === 'success' ? '📊' : '⚠️'}</span>
      {toast.message}
    </div>
  );
};
