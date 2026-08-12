import React from 'react';
import { 
  AlertTriangle, 
  Briefcase, 
  Users, 
  Calendar, 
  Check, 
  Lightbulb, 
  Shield, 
  Award,
  MapPin,
  Globe,
  Mail,
  Phone,
  FileText,
  Clock,
  User,
  ShieldAlert
} from 'lucide-react';
import companyLogo from '../../assets/logo.png';
import { formatDateLong, capitalizeName, replacePlaceholders } from '../../utils/formatters';

export const DisciplinaryTemplate = ({ formData }) => {
  const formattedIssueDate = formatDateLong(formData.issueDate);

  const noticeTitle = (formData.discType || 'FIRST WRITTEN WARNING').toUpperCase();

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
        <div className="letter-title-modern" style={{ color: '#b91c1c' }}>{noticeTitle}</div>
        <div className="title-separator-modern">
          <div className="separator-dot" style={{ backgroundColor: '#b91c1c' }}></div>
          <div className="separator-line" style={{ backgroundColor: '#fca5a5' }}></div>
          <div className="separator-dot" style={{ backgroundColor: '#b91c1c' }}></div>
        </div>
      </div>

      {/* Metadata Row */}
      <div className="letter-meta-modern">
        <div><strong>Notice Ref:</strong> {formData.refNumber}</div>
        <div><strong>Date:</strong> {formattedIssueDate}</div>
      </div>

      {/* Employee Recipient Block */}
      <div className="candidate-block-modern">
        <div className="candidate-name-modern">{capitalizeName(formData.candidateName)}</div>
        {formData.employeeId && <div className="candidate-detail-text"><strong>Emp ID:</strong> {formData.employeeId}</div>}
        {formData.designation && <div className="candidate-detail-text"><strong>Designation:</strong> {formData.designation} ({formData.department})</div>}
        <div className="candidate-detail-text">{formData.candidateAddress}</div>
        {formData.candidateMobile && <div className="candidate-detail-text"><strong>Mobile:</strong> {formData.candidateMobile}</div>}
        {formData.candidateEmail && <div className="candidate-detail-text"><strong>Email:</strong> {formData.candidateEmail}</div>}
      </div>

      {/* Salutation & Intro */}
      <div className="salutation-intro-modern">
        <p>Dear <strong>{capitalizeName(formData.candidateName)}</strong>,</p>
        <p style={{ textIndent: '15px', textAlign: 'justify' }}>
          {replacePlaceholders(formData.discIntro || 'This letter serves as a formal {discType} issued by {companyName} regarding observed workplace misconduct, policy non-compliance, or performance concerns outlined below.', formData)}
        </p>
      </div>

      {/* Disciplinary Summary Box */}
      <div className="summary-box-modern">
        <div className="summary-box-header" style={{ backgroundColor: '#b91c1c', color: '#ffffff' }}>NOTICE &amp; VIOLATION SUMMARY</div>
        <div className="summary-grid-modern">
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper" style={{ color: '#b91c1c' }}><AlertTriangle size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Notice Type</div>
              <div className="summary-item-value" style={{ color: '#b91c1c', fontWeight: 700 }}>{formData.discType || 'First Written Warning'}</div>
            </div>
          </div>

          <div className="summary-grid-item">
            <div className="summary-icon-wrapper"><FileText size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Subject / Incident</div>
              <div className="summary-item-value">{formData.discSubject || 'Policy Non-Compliance / Misconduct'}</div>
            </div>
          </div>

          <div className="summary-grid-item">
            <div className="summary-icon-wrapper"><Calendar size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Incident Date(s)</div>
              <div className="summary-item-value">{formData.discIncidentDates || 'Recent Review Period'}</div>
            </div>
          </div>

          <div className="summary-grid-item">
            <div className="summary-icon-wrapper"><Users size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Department</div>
              <div className="summary-item-value">{formData.department}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Violation Details & Corrective Actions */}
      <div className="terms-section-modern">
        <div className="terms-title-modern">DETAILS OF VIOLATION &amp; CORRECTIVE REQUIREMENTS</div>
        
        <div style={{ fontSize: '0.78rem', color: '#334155', lineHeight: '1.45', marginBottom: '0.5rem', textAlign: 'justify' }}>
          <strong>Details of Violation:</strong> {replacePlaceholders(formData.discViolationDetails || 'It has been observed that you have failed to adhere to official workplace guidelines, working hours, or project standards despite prior verbal counseling.', formData)}
        </div>

        <ul className="terms-list-modern">
          <li className="terms-item-modern">
            <Check size={12} className="terms-check-icon" />
            <span><strong>Immediate Rectification:</strong> {replacePlaceholders(formData.discActionRequired || 'You are required to immediately rectify your attendance, performance, and professional conduct in full alignment with company policies.', formData)}</span>
          </li>
          <li className="terms-item-modern">
            <Check size={12} className="terms-check-icon" />
            <span><strong>Written Explanation:</strong> You are requested to submit a written explanation within <strong>3 business days</strong> regarding the aforementioned matter.</span>
          </li>
          <li className="terms-item-modern">
            <Check size={12} className="terms-check-icon" />
            <span><strong>Consequences:</strong> {replacePlaceholders(formData.discConsequences || 'Failure to demonstrate immediate and sustained improvement may result in strict escalation up to and including suspension or termination of employment.', formData)}</span>
          </li>
        </ul>
      </div>

      {/* Signature & Acknowledgement Area */}
      <div className="signature-acceptance-modern" style={{ marginTop: 'auto' }}>
        <div className="signatory-modern-block">
          <div className="signatory-label-modern">Issued By HR,</div>
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
          <div className="signatory-label-modern">Employee Acknowledment &amp; Receipt</div>
          <div style={{ height: '30px' }}></div>
          <div className="signature-line" style={{ width: '140px', margin: '2px 0 4px 0' }}></div>
          <div className="signatory-name-modern">{capitalizeName(formData.candidateName)}</div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Signature &amp; Date of Receipt</div>
        </div>
      </div>

      {/* Values Footer Badges */}
      <div className="values-footer-modern">
        <div className="value-badge-modern"><div className="value-icon-circle"><Lightbulb size={10} /></div><div className="value-text-block"><div className="value-title">INNOVATION</div><div className="value-desc">We embrace new ideas.</div></div></div>
        <div className="value-badge-modern"><div className="value-icon-circle"><Shield size={10} /></div><div className="value-text-block"><div className="value-title">INTEGRITY</div><div className="value-desc">We do the right thing.</div></div></div>
        <div className="value-badge-modern"><div className="value-icon-circle"><Users size={10} /></div><div className="value-text-block"><div className="value-title">COLLABORATION</div><div className="value-desc">We grow together.</div></div></div>
        <div className="value-badge-modern"><div className="value-icon-circle"><Award size={10} /></div><div className="value-text-block"><div className="value-title">EXCELLENCE</div><div className="value-desc">We deliver the best.</div></div></div>
      </div>

      {/* Bottom Thank You strip */}
      <div className="thankyou-strip-modern">
        <div className="thankyou-strip-accent" style={{ backgroundColor: '#b91c1c' }}></div>
        <span>Confidential HR Notice — {formData.companyName}</span>
      </div>
    </>
  );
};
