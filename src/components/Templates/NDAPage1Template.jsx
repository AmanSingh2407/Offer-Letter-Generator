import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  MapPin, 
  Globe, 
  Mail, 
  Phone, 
  Calendar, 
  User, 
  FileText, 
  Check, 
  Lightbulb, 
  Shield, 
  Users, 
  Award 
} from 'lucide-react';
import companyLogo from '../../assets/logo.png';
import { formatDateLong, capitalizeName } from '../../utils/formatters';

export const NDAPage1Template = ({ formData }) => {
  const formattedIssueDate = formatDateLong(formData.issueDate);
  const formattedEffectiveDate = formatDateLong(formData.ndaEffectiveDate || formData.issueDate);

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
      <div className="letter-title-modern-container">
        <div className="letter-title-modern">NON-DISCLOSURE AGREEMENT</div>
        <div className="title-separator-modern">
          <div className="separator-dot"></div>
          <div className="separator-line"></div>
          <div className="separator-dot"></div>
        </div>
      </div>

      {/* Metadata Row */}
      <div className="letter-meta-modern">
        <div><strong>Agreement Ref:</strong> {formData.refNumber}</div>
        <div><strong>Date:</strong> {formattedIssueDate}</div>
      </div>

      {/* Parties Recipient Block */}
      <div className="candidate-block-modern">
        <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, marginBottom: '2px', textTransform: 'uppercase' }}>Receiving Party / Counterparty</div>
        <div className="candidate-name-modern">{capitalizeName(formData.candidateName)}</div>
        {formData.ndaPartyType && <div className="candidate-detail-text"><strong>Role / Type:</strong> {formData.ndaPartyType}</div>}
        <div className="candidate-detail-text">{formData.candidateAddress}</div>
        {formData.candidateMobile && <div className="candidate-detail-text"><strong>Mobile:</strong> {formData.candidateMobile}</div>}
        {formData.candidateEmail && <div className="candidate-detail-text"><strong>Email:</strong> {formData.candidateEmail}</div>}
      </div>

      {/* Agreement Preamble */}
      <div className="salutation-intro-modern">
        <p style={{ textIndent: '15px', textAlign: 'justify', margin: 0 }}>
          This Non-Disclosure Agreement ("Agreement") is entered into on <strong>{formattedEffectiveDate}</strong> ("Effective Date"), by and between <strong>{formData.companyName}</strong> ("Disclosing Party"), and <strong>{capitalizeName(formData.candidateName)}</strong> ("Receiving Party").
        </p>
        <p style={{ textIndent: '15px', textAlign: 'justify', marginTop: '0.4rem' }}>
          {formData.ndaPurpose || 'WHEREAS, Disclosing Party and Receiving Party wish to explore or engage in business discussions, employment, or project collaboration during which Disclosing Party may disclose confidential, proprietary, and technical information to Receiving Party.'}
        </p>
      </div>

      {/* NDA Parameters Summary Grid */}
      <div className="summary-box-modern">
        <div className="summary-box-header">AGREEMENT HIGHLIGHTS</div>
        <div className="summary-grid-modern">
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper"><ShieldCheck size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Disclosing Party</div>
              <div className="summary-item-value">{formData.companyName}</div>
            </div>
          </div>

          <div className="summary-grid-item">
            <div className="summary-icon-wrapper"><User size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Receiving Party</div>
              <div className="summary-item-value">{capitalizeName(formData.candidateName)}</div>
            </div>
          </div>

          <div className="summary-grid-item">
            <div className="summary-icon-wrapper"><Calendar size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Effective Date</div>
              <div className="summary-item-value">{formattedEffectiveDate}</div>
            </div>
          </div>

          <div className="summary-grid-item">
            <div className="summary-icon-wrapper"><Lock size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Confidentiality Term</div>
              <div className="summary-item-value" style={{ color: '#2563eb', fontWeight: 700 }}>
                {formData.ndaDuration || '2 Years Post Termination'}
              </div>
            </div>
          </div>

          <div className="summary-grid-item">
            <div className="summary-icon-wrapper"><FileText size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Party Role</div>
              <div className="summary-item-value">{formData.ndaPartyType || 'Employee / Contractor'}</div>
            </div>
          </div>

          <div className="summary-grid-item">
            <div className="summary-icon-wrapper"><MapPin size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Jurisdiction</div>
              <div className="summary-item-value">{formData.ndaJurisdiction || 'Noida, Uttar Pradesh'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Legal Terms (Page 1) */}
      <div className="terms-section-modern">
        <div className="terms-title-modern">KEY OBLIGATIONS &amp; CLAUSES (PART I)</div>
        <ul className="terms-list-modern">
          <li className="terms-item-modern">
            <Check size={12} className="terms-check-icon" />
            <span><strong>1. Definition of Confidential Information:</strong> {replacePlaceholders(formData.ndaClause1 || 'Includes all technical data, source code, designs, algorithms, financial records, client lists, business strategies, and trade secrets disclosed orally or in writing.', formData)}</span>
          </li>
          <li className="terms-item-modern">
            <Check size={12} className="terms-check-icon" />
            <span><strong>2. Non-Disclosure Duty:</strong> {replacePlaceholders(formData.ndaClause2 || 'Receiving Party agrees to hold all Confidential Information in strict confidence and shall not copy, reproduce, or disclose it to any third party without prior written consent.', formData)}</span>
          </li>
          <li className="terms-item-modern">
            <Check size={12} className="terms-check-icon" />
            <span><strong>3. Restricted Use:</strong> {replacePlaceholders(formData.ndaClause3 || 'Receiving Party shall use Confidential Information solely for the authorized purpose of their professional engagement with Disclosing Party and for no other commercial benefit.', formData)}</span>
          </li>
        </ul>
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
        <span>Confidential &amp; Proprietary — {formData.companyName} | Page 1 of 2</span>
      </div>
    </>
  );
};
