import React from 'react';
import { MapPin, Globe, Mail, Phone, Lightbulb, Shield, Users, Award } from 'lucide-react';
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
      <div className="letter-title-modern-container" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <div className="letter-title-modern">EXPERIENCE LETTER</div>
        <div className="title-separator-modern">
          <div className="separator-dot"></div>
          <div className="separator-line"></div>
          <div className="separator-dot"></div>
        </div>
      </div>

      {/* Metadata */}
      <div className="letter-meta" style={{ marginBottom: '1rem' }}>
        <div className="letter-meta-block">
          <strong>Ref No:</strong> {formData.refNumber}
        </div>
        <div className="letter-meta-block">
          <strong>Date:</strong> {formattedIssueDate}
        </div>
      </div>

      {/* Letter Body */}
      <div className="letter-body" style={{ flexGrow: 1, lineHeight: '1.45', fontSize: '0.88rem', textAlign: 'justify', marginBottom: '1.25rem' }}>
        <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
          {resolvedBody}
        </p>
      </div>

      {/* Signature Section */}
      <div className="signature-section" style={{ marginTop: 'auto', paddingTop: '1rem', marginBottom: '1rem' }}>
        <div className="signature-block">
          <div className="signature-line" style={{ width: '180px' }}></div>
          <div>Employee Signature</div>
        </div>

        <div className="signature-block" style={{ alignItems: 'flex-end', textAlign: 'right' }}>
          {formData.signatureText && (
            <div 
              style={{ 
                fontFamily: "'Caveat', cursive", 
                fontSize: '1.75rem', 
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

      {/* Values Footer Badges */}
      <div className="values-footer-modern" style={{ marginBottom: '0.5rem', flexShrink: 0 }}>
        <div className="value-badge-modern">
          <div className="value-icon-circle">
            <Lightbulb size={10} />
          </div>
          <div className="value-text-block">
            <div className="value-title">INNOVATION</div>
            <div className="value-desc">We embrace new ideas.</div>
          </div>
        </div>
        <div className="value-badge-modern">
          <div className="value-icon-circle">
            <Shield size={10} />
          </div>
          <div className="value-text-block">
            <div className="value-title">INTEGRITY</div>
            <div className="value-desc">We do the right thing.</div>
          </div>
        </div>
        <div className="value-badge-modern">
          <div className="value-icon-circle">
            <Users size={10} />
          </div>
          <div className="value-text-block">
            <div className="value-title">COLLABORATION</div>
            <div className="value-desc">We achieve more together.</div>
          </div>
        </div>
        <div className="value-badge-modern">
          <div className="value-icon-circle">
            <Award size={10} />
          </div>
          <div className="value-text-block">
            <div className="value-title">EXCELLENCE</div>
            <div className="value-desc">We deliver the best.</div>
          </div>
        </div>
      </div>

      {/* Bottom Thank You strip */}
      <div className="thankyou-strip-modern" style={{ flexShrink: 0 }}>
        <div className="thankyou-strip-accent"></div>
        <span>Thank you for your valuable contributions. We wish you all the best in your future endeavors!</span>
      </div>
    </>
  );
};
