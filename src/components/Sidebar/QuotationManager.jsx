import React from 'react';

export const QuotationManager = ({
  quotationScopeText,
  handleAddScopeItem,
  handleAddSection,
  handleAddPageBreak,
  handleEditLine,
  handleDeleteLine
}) => {
  return (
    <div style={{ marginTop: '0.75rem', padding: '0.75rem', backgroundColor: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary-500)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Scope &amp; Items Manager</span>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 400 }}>Click item to edit inline</span>
      </div>

      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
        <button type="button" onClick={() => handleAddScopeItem(1)} style={{ flex: 1, padding: '0.35rem 0.5rem', fontSize: '0.72rem', backgroundColor: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
          + Add Category (#)
        </button>
        <button type="button" onClick={() => handleAddScopeItem(2)} style={{ flex: 1, padding: '0.35rem 0.5rem', fontSize: '0.72rem', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
          + Add Feature (•)
        </button>
        <button type="button" onClick={handleAddSection} style={{ padding: '0.35rem 0.5rem', fontSize: '0.72rem', backgroundColor: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
          + Section
        </button>
        <button type="button" onClick={handleAddPageBreak} style={{ padding: '0.35rem 0.5rem', fontSize: '0.72rem', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
          + Page Break
        </button>
      </div>

      <div style={{ maxHeight: '180px', overflowY: 'auto', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: 'var(--bg-main)', padding: '0.35rem' }}>
        {(quotationScopeText || '').split('\n').map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return null;

          const isSec = trimmed.startsWith('[SECTION]');
          const isPg = trimmed === '[PAGE]';
          const isNum = /^\d+\./.test(trimmed);

          return (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.4rem',
              padding: '0.25rem 0.35rem',
              borderBottom: '1px solid var(--border-color)',
              backgroundColor: isPg ? '#d1fae5' : isSec ? '#ede9fe' : isNum ? 'var(--bg-card)' : 'transparent',
              borderRadius: '3px',
              marginBottom: '2px',
              fontSize: '0.75rem'
            }}>
              <input 
                type="text" 
                value={line} 
                onChange={(e) => handleEditLine(idx, e.target.value)}
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontFamily: isPg || isSec ? 'var(--font-heading)' : 'inherit',
                  fontWeight: isPg || isSec || isNum ? 700 : 400,
                  color: isPg ? '#065f46' : isSec ? '#5b21b6' : 'var(--text-primary)',
                  outline: 'none'
                }}
              />
              <button 
                type="button" 
                onClick={() => handleDeleteLine(idx)}
                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.75rem', padding: '0 2px' }}
                title="Delete line"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
