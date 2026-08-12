import React from 'react';
import { MapPin, Globe, Mail, Phone, Lightbulb, Shield, Users, Award, Check } from 'lucide-react';
import companyLogo from '../../assets/logo.png';
import { capitalizeName } from '../../utils/formatters';

export const NDAPage2Template = ({ formData }) => {
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
            <span>{formData.companyMobile || '+91 92772 67732'}</span>
          </div>
        </div>
      </div>

      {/* Document Title */}
      <div className="letter-title-modern-container" style={{ marginBottom: '0.75rem' }}>
        <div className="letter-title-modern">LEGAL CLAUSES &amp; SIGNATURES (PART II)</div>
        <div className="title-separator-modern" style={{ width: '120px' }}>
          <div className="separator-dot"></div>
          <div className="separator-line"></div>
          <div className="separator-dot"></div>
        </div>
      </div>

      {/* Terms & Clauses Page 2 */}
      <div className="letter-body" style={{ flexGrow: 1, gap: '0.75rem', marginBottom: '1rem', overflowY: 'hidden' }}>
        <div style={{ marginBottom: '0.4rem' }}>
          <h3 style={{ fontSize: '0.88rem', color: '#0f172a', marginBottom: '0.2rem', fontFamily: 'var(--font-heading)' }}>
            4. Exclusions from Confidentiality
          </h3>
          <p style={{ margin: 0, fontSize: '0.74rem', color: '#475569', lineHeight: '1.35' }}>
            Confidential Information does not include information that: (a) is or becomes publicly known through no breach of Receiving Party; (b) was already in Receiving Party's lawful possession prior to disclosure; or (c) is required to be disclosed by applicable legal court order.
          </p>
        </div>

        <div style={{ marginBottom: '0.4rem' }}>
          <h3 style={{ fontSize: '0.88rem', color: '#0f172a', marginBottom: '0.2rem', fontFamily: 'var(--font-heading)' }}>
            5. Intellectual Property Ownership
          </h3>
          <p style={{ margin: 0, fontSize: '0.74rem', color: '#475569', lineHeight: '1.35' }}>
            Nothing in this Agreement grants Receiving Party any license, patent, copyright, or intellectual property rights over Disclosing Party's software, databases, or trade secrets. All IP created or disclosed remains sole property of <strong>{formData.companyName}</strong>.
          </p>
        </div>

        <div style={{ marginBottom: '0.4rem' }}>
          <h3 style={{ fontSize: '0.88rem', color: '#0f172a', marginBottom: '0.2rem', fontFamily: 'var(--font-heading)' }}>
            6. Return of Materials &amp; Injunctive Remedies
          </h3>
          <p style={{ margin: 0, fontSize: '0.74rem', color: '#475569', lineHeight: '1.35' }}>
            Upon written request or termination of association, Receiving Party shall immediately return or destroy all physical and electronic copies of Confidential Information. Unauthorized disclosure will cause irreparable harm, entitling Disclosing Party to seek immediate injunctive relief and damages.
          </p>
        </div>

        <div style={{ marginBottom: '0.4rem' }}>
          <h3 style={{ fontSize: '0.88rem', color: '#0f172a', marginBottom: '0.2rem', fontFamily: 'var(--font-heading)' }}>
            7. Governing Law &amp; Jurisdiction
          </h3>
          <p style={{ margin: 0, fontSize: '0.74rem', color: '#475569', lineHeight: '1.35' }}>
            This Agreement shall be governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the courts situated at <strong>{formData.ndaJurisdiction || 'Noida, Uttar Pradesh'}</strong>.
          </p>
        </div>

        <p style={{ marginTop: '0.5rem', fontWeight: '600', color: '#0f172a', fontSize: '0.74rem' }}>
          IN WITNESS WHEREOF, the parties hereto have executed this Non-Disclosure Agreement as of the Effective Date written above.
        </p>
      </div>

      {/* Signature & Execution Area */}
      <div className="signature-acceptance-modern" style={{ marginTop: 'auto' }}>
        <div className="signatory-modern-block">
          <div className="signatory-label-modern">For Disclosing Party</div>
          {formData.signatureText && (
            <div className="signatory-signature-modern">
              {capitalizeName(formData.signatureText)}
            </div>
          )}
          <div className="signatory-name-modern">{capitalizeName(formData.signatoryName)}</div>
          <div className="signatory-title-modern">{formData.signatoryDesignation}</div>
          <div className="signatory-company-modern">{formData.companyName}</div>
        </div>

        <div className="signatory-modern-block" style={{ alignItems: 'flex-end', textAlign: 'right' }}>
          <div className="signatory-label-modern">For Receiving Party</div>
          <div style={{ height: '30px' }}></div>
          <div className="signature-line" style={{ width: '130px', margin: '2px 0 4px 0' }}></div>
          <div className="signatory-name-modern">{capitalizeName(formData.candidateName)}</div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Authorized Signature &amp; Date</div>
        </div>
      </div>

      {/* Values Footer Badges */}
      <div className="values-footer-modern">
        <div className="value-badge-modern"><div className="value-icon-circle"><Lightbulb size={10} /></div><div className="value-text-block"><div className="value-title">INNOVATION</div><div className="value-desc">We protect new ideas.</div></div></div>
        <div className="value-badge-modern"><div className="value-icon-circle"><Shield size={10} /></div><div className="value-text-block"><div className="value-title">INTEGRITY</div><div className="value-desc">We honor strict trust.</div></div></div>
        <div className="value-badge-modern"><div className="value-icon-circle"><Users size={10} /></div><div className="value-text-block"><div className="value-title">COLLABORATION</div><div className="value-desc">We build together.</div></div></div>
        <div className="value-badge-modern"><div className="value-icon-circle"><Award size={10} /></div><div className="value-text-block"><div className="value-title">EXCELLENCE</div><div className="value-desc">We deliver quality.</div></div></div>
      </div>

      {/* Bottom Thank You strip */}
      <div className="thankyou-strip-modern">
        <div className="thankyou-strip-accent"></div>
        <span>Confidential &amp; Proprietary — {formData.companyName} | Page 2 of 2</span>
      </div>
    </>
  );
};
