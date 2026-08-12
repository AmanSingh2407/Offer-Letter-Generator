import React from 'react';

export const UniquenessAlert = ({ fieldName, isDuplicate, value, onGenerateUnique }) => {
  return (
    <>
      <button 
        type="button" 
        onClick={onGenerateUnique} 
        style={{ fontSize: '0.68rem', background: 'none', border: 'none', color: 'var(--primary-500)', cursor: 'pointer', fontWeight: '600' }}
      >
        ⚡ Generate Unique
      </button>
      {isDuplicate && (
        <span style={{ color: '#ef4444', fontSize: '0.72rem', fontWeight: 'bold', marginTop: '0.2rem', display: 'block' }}>
          ⚠️ {fieldName} "{value}" is ALREADY registered!
        </span>
      )}
    </>
  );
};
