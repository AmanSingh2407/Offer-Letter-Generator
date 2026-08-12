import React from 'react';
import { Lock, Sun, Moon } from 'lucide-react';
import companyLogo from '../../assets/logo.png';

export const AccessModal = ({
  theme,
  toggleTheme,
  companyName,
  passcode,
  setPasscode,
  authError,
  setAuthError,
  handleLogin
}) => {
  return (
    <div className="auth-container">
      <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10 }}>
        <button 
          className="theme-toggle-btn" 
          onClick={toggleTheme} 
          title="Toggle Theme" 
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
      
      <div className="auth-card">
        <div className="auth-header">
          <img src={companyLogo} className="auth-logo" alt={companyName} />
          <div className="auth-title">Mind Manthan</div>
          <div className="auth-subtitle">
            Please enter the 8-digit access code to unlock the Offer & Joining Letter Generator.
          </div>
        </div>
        
        <form onSubmit={handleLogin} className="auth-form">
          <div className="passcode-input-wrapper">
            <span className="input-icon-left">
              <Lock size={18} />
            </span>
            <input
              type="password"
              className="passcode-input"
              placeholder="Enter passcode"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                if (authError) setAuthError('');
              }}
              maxLength={16}
              autoFocus
              required
            />
          </div>
          
          {authError && (
            <div className="auth-error">
              <span>{authError}</span>
            </div>
          )}
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
            Unlock Generator
          </button>
        </form>
        
        <div className="auth-footer">
          {companyName} &copy; {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};
