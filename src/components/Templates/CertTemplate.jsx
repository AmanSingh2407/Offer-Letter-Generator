import React from 'react';
import { Award, MapPin, Phone, Mail, Globe } from 'lucide-react';
import companyLogo from '../../assets/logo.png';
import { formatDateLong, getGenderPronouns, capitalizeName, replacePlaceholders } from '../../utils/formatters';

export const CertTemplate = ({ formData }) => {
  const pronouns = getGenderPronouns(formData.candidateGender);
  const formattedCertDate = formatDateLong(formData.internshipEndDate || formData.issueDate);
  const formattedStart = formatDateLong(formData.internshipStartDate);
  const formattedEnd = formatDateLong(formData.internshipEndDate);

  return (
    <>
      {/* Slanted Navy & Royal Blue layered background banner (vector-sharp SVG) */}
      <svg width="330" height="794" viewBox="0 0 330 794" style={{ position: 'absolute', left: 0, top: 0, zIndex: 2, pointerEvents: 'none' }}>
        {/* Base: Royal Blue stripe on the right */}
        <polygon points="0,0 280,0 80,794 0,794" fill="#2563eb" />
        <polygon points="0,0 274,0 74,794 0,794" fill="#0c3b6f" />
        
        {/* Main Dark Navy Block on the left */}
        <polygon points="0,0 240,0 40,794 0,794" fill="#07162c" />
        
        {/* Premium Gold Accent Triangle in top-left corner */}
        <polygon points="0,0 80,0 0,120" fill="#c39b33" opacity="0.95" />
        <polygon points="0,0 50,0 0,75" fill="#07162c" />
        
        {/* Gold Divider Line */}
        <line x1="280" y1="0" x2="80" y2="794" stroke="#c39b33" strokeWidth="6" />
      </svg>
      
      {/* Overlapping Gold Seal Badge */}
      <div className="cert-gold-seal-container">
        <div className="cert-gold-seal">
          <div className="seal-scallop-1"></div>
          <div className="seal-scallop-2"></div>
          <div className="seal-scallop-3"></div>
          <div className="seal-scallop-4"></div>
          <div className="seal-inner-circle">
            <span className="seal-star-top" style={{ color: '#d4af37', fontSize: '0.8rem', lineHeight: '1', marginBottom: '2px' }}>★</span>
            <div className="seal-text-top">INTERNSHIP</div>
            <div className="seal-text-middle">COMPLETED</div>
            <svg width="60" height="28" viewBox="0 0 60 28" style={{ marginTop: '1px' }}>
              {/* Left laurel branch */}
              <path d="M 22 24 C 14 22, 8 16, 8 8 M 8 8 C 9 10, 11 11, 13 9 M 8 12 C 10 14, 12 14, 13 11 M 9 17 C 11 19, 13 18, 14 15 M 12 21 C 14 22, 16 21, 16 18" fill="none" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" />
              {/* Right laurel branch */}
              <path d="M 38 24 C 46 22, 52 16, 52 8 M 52 8 C 51 10, 49 11, 47 9 M 52 12 C 50 14, 48 14, 47 11 M 51 17 C 49 19, 47 18, 46 15 M 48 21 C 46 22, 44 21, 44 18" fill="none" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" />
              {/* Small star in center */}
              <text x="30" y="22" fill="#d4af37" fontSize="8" textAnchor="middle">★</text>
            </svg>
          </div>
        </div>
      </div>

      <div className="cert-content">
        {/* Certificate Header */}
        <div className="cert-header">
          <div className="cert-logo-container">
            <img src={companyLogo} className="cert-company-logo" alt={formData.companyName} crossOrigin="anonymous" />
            <div>
              <div className="cert-company-name">{formData.companyName}</div>
              <div className="cert-company-tagline">{formData.companyTagline}</div>
            </div>
          </div>
          
          <div className="cert-meta-info">
            <div><strong>Certificate ID:</strong> {formData.certificateId}</div>
            <div><strong>Date:</strong> {formattedCertDate}</div>
          </div>
        </div>

        {/* Certificate Title */}
        <div className="cert-title-container">
          <h1 className="cert-main-title">CERTIFICATE</h1>
          <div className="cert-subtitle-container">
            <div className="cert-subtitle-line"></div>
            <div className="cert-subtitle-dot"></div>
            <div className="cert-subtitle-text">OF INTERNSHIP COMPLETION</div>
            <div className="cert-subtitle-dot"></div>
            <div className="cert-subtitle-line"></div>
          </div>
        </div>

        {/* Body content */}
        <div className="cert-certify-text">This is to certify that</div>
        
        <div className="cert-candidate-name">
          {capitalizeName(formData.candidateName)}
        </div>

        {/* Restructured Body content to match reference block layout */}
        <div className="cert-body-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem', color: '#475569', fontSize: '0.82rem', textAlign: 'center', width: '100%', flexShrink: 0, marginTop: '1.1rem' }}>
          <div style={{ fontStyle: 'italic', fontWeight: '500' }}>has successfully completed {pronouns.possessive} internship as</div>
          
          <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#2563eb', margin: '0.1rem 0' }}>
            {formData.designation}
          </div>
          
          <div style={{ fontWeight: '750', color: '#0b1c33', fontSize: '0.9rem' }}>
            at {formData.companyName}
          </div>
          
          <div style={{ fontSize: '0.85rem' }}>
            from <strong style={{ color: '#2563eb' }}>{formattedStart}</strong> to <strong style={{ color: '#2563eb' }}>{formattedEnd}</strong>.
          </div>
          
          <div style={{ fontSize: '0.78rem', opacity: '0.9', maxWidth: '580px', marginTop: '0.2rem', lineHeight: '1.4' }}>
            {replacePlaceholders(formData.certDescription, formData)}
          </div>
          
          <div style={{ fontSize: '0.78rem', fontWeight: '600', color: '#0b1c33', marginTop: '0.25rem' }}>
            {replacePlaceholders(formData.certClosingText, formData)}
          </div>
        </div>

        {/* Bottom area */}
        <div className="cert-signatures-container">
          <div className="cert-signature-block">
            {formData.signatureText && (
              <div className="cert-signature-cursive">
                {capitalizeName(formData.signatureText)}
              </div>
            )}
            <div className="cert-signature-line"></div>
            <div className="cert-signature-name">{capitalizeName(formData.signatoryName)}</div>
            <div className="cert-signature-title">{formData.signatoryDesignation}</div>
            <div className="cert-signature-company">{formData.companyName}</div>
          </div>

          <div className="cert-appreciation-block">
            <Award size={20} className="cert-appreciation-icon" />
            <div className="cert-appreciation-text">
              {formData.certAppreciationText}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Coordinates Ribbon */}
      <div className="cert-bottom-ribbon">
        <div className="cert-bottom-item">
          <MapPin size={9} className="contact-icon" />
          <span>{formData.companyAddress}</span>
        </div>
        <div className="cert-bottom-item">
          <Phone size={9} className="contact-icon" />
          <span>{formData.companyMobile || '+91 98765 43210'}</span>
        </div>
        <div className="cert-bottom-item">
          <Mail size={9} className="contact-icon" />
          <span>{formData.companyEmail || 'info@mindmanthansoftwaresolutions.com'}</span>
        </div>
        <div className="cert-bottom-item">
          <Globe size={9} className="contact-icon" />
          <span>{formData.companyWebsite}</span>
        </div>
      </div>
    </>
  );
};
