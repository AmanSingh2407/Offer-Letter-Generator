import React from 'react';
import { MapPin, Globe, Mail, Phone, Lightbulb, Shield, Users, Award } from 'lucide-react';
import companyLogo from '../../assets/logo.png';
import { capitalizeName } from '../../utils/formatters';

export const Page2Template = ({ formData }) => {
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
            <span>info@mindmanthansoftwaresolutions.com</span>
          </div>
          <div className="contact-item">
            <Phone size={10} className="contact-icon" />
            <span>+91 98765 43210</span>
          </div>
        </div>
      </div>

      {/* Page 2 Document Title */}
      <div className="letter-title-modern-container" style={{ marginBottom: '0.75rem' }}>
        <div className="letter-title-modern">ANNEXURE</div>
        <div className="title-separator-modern" style={{ width: '100px' }}>
          <div className="separator-dot"></div>
          <div className="separator-line"></div>
          <div className="separator-dot"></div>
        </div>
      </div>

      {/* Policies / Clause Headings */}
      <div className="letter-body" style={{ flexGrow: 1, gap: '0.75rem', marginBottom: '1rem', overflowY: 'hidden' }}>
        {formData.rolesResponsibilities && (
          <div style={{ marginBottom: '0.4rem' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#0f172a', marginBottom: '0.2rem', fontFamily: 'var(--font-heading)' }}>
              1. Roles and Responsibilities
            </h3>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#475569', whiteSpace: 'pre-wrap', lineHeight: '1.35' }}>
              {(formData.rolesResponsibilities || '').replace('{employmentType}', formData.employmentType?.toLowerCase() || 'internship')}
            </p>
          </div>
        )}

        {formData.conductConfidentiality && (
          <div style={{ marginBottom: '0.4rem' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#0f172a', marginBottom: '0.2rem', fontFamily: 'var(--font-heading)' }}>
              2. Code of Conduct & Confidentiality
            </h3>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#475569', whiteSpace: 'pre-wrap', lineHeight: '1.35' }}>
              {formData.conductConfidentiality}
            </p>
          </div>
        )}

        {formData.stipendTerms && (
          <div style={{ marginBottom: '0.4rem' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#0f172a', marginBottom: '0.2rem', fontFamily: 'var(--font-heading)' }}>
              3. Stipend & Commercial Terms
            </h3>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#475569', whiteSpace: 'pre-wrap', lineHeight: '1.35' }}>
              {formData.stipendTerms}
            </p>
          </div>
        )}

        {formData.corporateInfo && (
          <div style={{ marginBottom: '0.4rem' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#0f172a', marginBottom: '0.2rem', fontFamily: 'var(--font-heading)' }}>
              4. Corporate Information
            </h3>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#475569', whiteSpace: 'pre-wrap', lineHeight: '1.35' }}>
              {(formData.corporateInfo || '').replace('{companyWebsite}', formData.companyWebsite)}
            </p>
          </div>
        )}

        <p style={{ marginTop: '0.5rem', fontWeight: '600', color: '#0f172a', fontSize: '0.75rem' }}>
          We look forward to a mutually productive association and wish you a highly educational experience.
        </p>
      </div>

      {/* Signature & Acceptance Area for Page 2 */}
      <div className="signature-acceptance-modern" style={{ marginTop: 'auto' }}>
        <div className="signatory-modern-block">
          <div className="signatory-label-modern">Accepted By</div>
          <div style={{ height: '30px' }}></div>
          <div className="signature-line" style={{ width: '130px', margin: '2px 0 4px 0' }}></div>
          <div className="signatory-name-modern">{capitalizeName(formData.candidateName)}</div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Candidate Signature & Date</div>
        </div>
        
        <div className="signatory-modern-block" style={{ alignItems: 'flex-end', textAlign: 'right' }}>
          <div className="signatory-label-modern">Authorized Signatory</div>
          {formData.signatureText && (
            <div className="signatory-signature-modern">
              {capitalizeName(formData.signatureText)}
            </div>
          )}
          <div className="signatory-name-modern">{capitalizeName(formData.signatoryName)}</div>
          <div className="signatory-title-modern">{formData.signatoryDesignation}</div>
        </div>
      </div>

      {/* Values Footer Badges */}
      <div className="values-footer-modern">
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
      <div className="thankyou-strip-modern">
        <div className="thankyou-strip-accent"></div>
        <span>Thank you for choosing {formData.companyName}. We're excited to have you on board!</span>
      </div>
    </>
  );
};
