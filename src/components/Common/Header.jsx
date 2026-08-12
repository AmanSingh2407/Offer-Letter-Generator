import React from 'react';
import { Download, Sun, Moon } from 'lucide-react';
import companyLogo from '../../assets/logo.png';

export const Header = ({ theme, toggleTheme, generatePDF, isGenerating }) => {
  return (
    <header className="app-header">
      <div className="logo-brand">
        <img src={companyLogo} style={{ height: '32px', width: 'auto', borderRadius: '4px' }} alt="Brand Logo" />
        <span className="brand-text">Mind Manthan</span>
      </div>
      
      <div className="header-actions">
        <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle Theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        <button 
          className="btn btn-primary" 
          onClick={generatePDF} 
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <span className="spinner" style={{
                display: 'inline-block',
                width: '14px',
                height: '14px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: '#fff',
                borderRadius: '50%',
                animation: 'spin 0.6s linear infinite',
                marginRight: '0.5rem'
              }}></span>
              Generating...
            </>
          ) : (
            <>
              <Download size={18} />
              Download PDF
            </>
          )}
        </button>
      </div>
    </header>
  );
};
