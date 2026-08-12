import React, { useState } from 'react';

export const QuotationManager = ({
  quotationScopeText,
  onScopeTextChange,
  handleAddScopeItem,
  handleAddSection,
  handleAddPageBreak,
  handleEditLine,
  handleDeleteLine
}) => {
  const [editorMode, setEditorMode] = useState('text'); // 'text' (default multi-line direct editor) or 'items'

  return (
    <div style={{ marginTop: '0.75rem', padding: '0.75rem', backgroundColor: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary-500)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Scope &amp; Features Editor</span>
        
        {/* Toggle Mode Button */}
        <div style={{ display: 'flex', gap: '4px' }}>
          <button 
            type="button" 
            onClick={() => setEditorMode('text')} 
            style={{
              fontSize: '0.68rem',
              padding: '0.2rem 0.45rem',
              borderRadius: '4px',
              border: '1px solid var(--border-color)',
              backgroundColor: editorMode === 'text' ? 'var(--primary-500)' : 'var(--bg-secondary)',
              color: editorMode === 'text' ? '#ffffff' : 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            ✏️ Direct Text
          </button>
          <button 
            type="button" 
            onClick={() => setEditorMode('items')} 
            style={{
              fontSize: '0.68rem',
              padding: '0.2rem 0.45rem',
              borderRadius: '4px',
              border: '1px solid var(--border-color)',
              backgroundColor: editorMode === 'items' ? 'var(--primary-500)' : 'var(--bg-secondary)',
              color: editorMode === 'items' ? '#ffffff' : 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            📋 Visual List
          </button>
        </div>
      </div>

      {/* Helper Insert Buttons */}
      <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
        <button type="button" onClick={handleAddSection} style={{ padding: '0.35rem 0.5rem', fontSize: '0.72rem', backgroundColor: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
          + Add Section
        </button>
        <button type="button" onClick={handleAddPageBreak} style={{ padding: '0.35rem 0.5rem', fontSize: '0.72rem', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
          + Page Break
        </button>
        <button type="button" onClick={() => handleAddScopeItem(1)} style={{ padding: '0.35rem 0.5rem', fontSize: '0.72rem', backgroundColor: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
          + Add Category (#)
        </button>
        <button type="button" onClick={() => handleAddScopeItem(2)} style={{ padding: '0.35rem 0.5rem', fontSize: '0.72rem', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
          + Bullet (•)
        </button>
      </div>

      {editorMode === 'text' ? (
        /* Direct Multi-Line Textarea Editor */
        <div>
          <textarea
            value={quotationScopeText || ''}
            onChange={(e) => onScopeTextChange(e.target.value)}
            placeholder="Type or paste your quotation scope and features freely here..."
            className="input-field"
            rows={10}
            style={{
              width: '100%',
              resize: 'vertical',
              minHeight: '180px',
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              lineHeight: '1.45',
              padding: '0.5rem',
              borderRadius: '6px'
            }}
          />
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
            💡 Tip: Use <code>[SECTION] Title</code> for headers, <code>1. Title</code> for categories, <code>• Bullet</code> for features, and <code>[PAGE]</code> for manual page breaks.
          </div>
        </div>
      ) : (
        /* Visual List Mode */
        <div style={{ maxHeight: '220px', overflowY: 'auto', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: 'var(--bg-main)', padding: '0.35rem' }}>
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
      )}
    </div>
  );
};
