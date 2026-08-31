import React from 'react';
import { MapPin, Globe, Mail, Phone } from 'lucide-react';
import { formatDateLong, replacePlaceholders } from '../../utils/formatters';
import companyLogo from '../../assets/logo.png';

export const ExperienceTemplate = ({ formData }) => {
  const formattedIssueDate = formatDateLong(formData.issueDate);
  const formattedStart = formatDateLong(formData.experienceStartDate || formData.startDate);
  const formattedEnd = formatDateLong(formData.experienceEndDate || formData.internshipEndDate || formData.issueDate);
  
  // Custom replacements inside body
  const bodyText = (formData.experienceBody || '')
    .replace(/{experienceStartDate}/g, formattedStart)
    .replace(/{experienceEndDate}/g, formattedEnd);

  const resolvedBody = replacePlaceholders(bodyText, formData);

  return (
    <>
      {/* Modern Slanted Header */}
      <div className="letterhead-header-modern">
        <div className="header-brand-bg"></div>
        <div className="header-divider-bg"></div>
        
        <div className="header-brand-content">
          <img 
            src={companyLogo} 
            className="company-logo-modern" 
            alt={formData.companyName} 
            crossOrigin="anonymous"
          />
          <div className="company-brand-text">
            <div className="company-name-modern">{formData.companyName}</div>
            <div className="company-tagline-modern">{formData.companyTagline}</div>
          </div>
        </div>
        
        <div className="header-contact-content">
          <div className="contact-item">
            <MapPin size={10} className="contact-icon" />
            <span>{formData.companyAddress}</span>
          </div>
          <div className="contact-item">
            <Globe size={10} className="contact-icon" />
            <span>{formData.companyWebsite}</span>
          </div>
          <div className="contact-item">
            <Mail size={10} className="contact-icon" />
            <span>{formData.companyEmail || 'info@mindmanthansoftwaresolutions.com'}</span>
          </div>
          <div className="contact-item">
            <Phone size={10} className="contact-icon" />
            <span>{formData.companyMobile}</span>
          </div>
        </div>
      </div>

      {/* Document Title */}
      <div className="letter-title" style={{ marginTop: '2.5rem', marginBottom: '2rem' }}>
        TO WHOM IT MAY CONCERN
      </div>

      {/* Metadata */}
      <div className="letter-meta" style={{ marginBottom: '2rem' }}>
        <div className="letter-meta-block">
          <strong>Ref No:</strong> {formData.refNumber}
        </div>
        <div className="letter-meta-block">
          <strong>Date:</strong> {formattedIssueDate}
        </div>
      </div>

      {/* Letter Body */}
      <div className="letter-body" style={{ flexGrow: 1, lineHeight: '1.8', fontSize: '0.95rem', textAlign: 'justify', marginBottom: '3rem' }}>
        <p style={{ whiteSpace: 'pre-wrap' }}>
          {resolvedBody}
        </p>
      </div>

      {/* Signature Section */}
      <div className="signature-section" style={{ marginTop: 'auto', paddingTop: '2rem' }}>
        <div className="signature-block">
          <div className="signature-line" style={{ width: '180px' }}></div>
          <div>Employee Signature</div>
        </div>

        <div className="signature-block" style={{ alignItems: 'flex-end', textAlign: 'right' }}>
          {formData.signatureText && (
            <div 
              style={{ 
                fontFamily: "'Caveat', cursive", 
                fontSize: '2rem', 
                color: '#2563eb',
                lineHeight: '1',
                marginBottom: '0.2rem',
                paddingRight: '0.5rem'
              }}
            >
              {formData.signatureText}
            </div>
          )}
          <div className="signature-line" style={{ width: '180px' }}></div>
          <div>Authorized Signatory</div>
          <div className="signature-name">{formData.signatoryName}</div>
          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{formData.signatoryDesignation}</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#0f172a' }}>{formData.companyName}</div>
        </div>
      </div>

      {/* Letterhead Footer */}
      <div className="letter-footer" style={{ marginTop: '2rem' }}>
        <div>{formData.companyName} &copy; {new Date().getFullYear()}</div>
        <div>{formData.companyWebsite}</div>
        <div>Page 1 of 1</div>
      </div>
    </>
  );
};
