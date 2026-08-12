import React from 'react';
import { 
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
  AlertCircle,
  Clock,
  User
} from 'lucide-react';
import companyLogo from '../../assets/logo.png';
import { formatDateLong, capitalizeName, replacePlaceholders } from '../../utils/formatters';

export const TerminationTemplate = ({ formData }) => {
  const formattedIssueDate = formatDateLong(formData.issueDate);
  const formattedLastDay = formatDateLong(formData.terminationLastDay || formData.startDate);

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
        <div className="letter-title-modern" style={{ color: '#dc2626' }}>NOTICE OF EMPLOYMENT TERMINATION</div>
        <div className="title-separator-modern">
          <div className="separator-dot" style={{ backgroundColor: '#dc2626' }}></div>
          <div className="separator-line" style={{ backgroundColor: '#fca5a5' }}></div>
          <div className="separator-dot" style={{ backgroundColor: '#dc2626' }}></div>
        </div>
      </div>

      {/* Metadata Row */}
      <div className="letter-meta-modern">
        <div><strong>Ref No:</strong> {formData.refNumber}</div>
        <div><strong>Date:</strong> {formattedIssueDate}</div>
      </div>

      {/* Candidate / Employee Recipient Block */}
      <div className="candidate-block-modern">
        <div className="candidate-name-modern">{capitalizeName(formData.candidateName)}</div>
        {formData.employeeId && <div className="candidate-detail-text"><strong>Emp ID:</strong> {formData.employeeId}</div>}
        <div className="candidate-detail-text">{formData.candidateAddress}</div>
        {formData.candidateMobile && <div className="candidate-detail-text"><strong>Mobile:</strong> {formData.candidateMobile}</div>}
        {formData.candidateEmail && <div className="candidate-detail-text"><strong>Email:</strong> {formData.candidateEmail}</div>}
      </div>

      {/* Salutation & Intro */}
      <div className="salutation-intro-modern">
        <p>Dear <strong>{capitalizeName(formData.candidateName)}</strong>,</p>
        <p style={{ textIndent: '15px', textAlign: 'justify' }}>
          {replacePlaceholders(formData.terminationIntro || 'This letter serves as formal notification that your employment with {companyName} as {designation} will terminate effective on {terminationLastDay}. We appreciate your contributions during your tenure with us and wish to ensure a smooth transition process.', formData)}
        </p>
      </div>

      {/* Termination Summary Grid */}
      <div className="summary-box-modern">
        <div className="summary-box-header" style={{ backgroundColor: '#991b1b', color: '#ffffff' }}>TERMINATION &amp; SEPARATION DETAILS</div>
        <div className="summary-grid-modern">
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper"><User size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Employee Name</div>
              <div className="summary-item-value">{capitalizeName(formData.candidateName)}</div>
            </div>
          </div>

          <div className="summary-grid-item">
            <div className="summary-icon-wrapper"><Briefcase size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Designation</div>
              <div className="summary-item-value">{formData.designation}</div>
            </div>
          </div>

          <div className="summary-grid-item">
            <div className="summary-icon-wrapper"><Users size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Department</div>
              <div className="summary-item-value">{formData.department}</div>
            </div>
          </div>

          <div className="summary-grid-item" style={{ backgroundColor: 'rgba(220, 38, 38, 0.06)', borderRadius: '6px' }}>
            <div className="summary-icon-wrapper" style={{ color: '#dc2626' }}><Calendar size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label" style={{ color: '#dc2626', fontWeight: 700 }}>Last Working Day</div>
              <div className="summary-item-value" style={{ color: '#dc2626', fontWeight: 800 }}>
                {formattedLastDay}
              </div>
            </div>
          </div>

          <div className="summary-grid-item">
            <div className="summary-icon-wrapper"><Clock size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Notice Status</div>
              <div className="summary-item-value">{formData.terminationNoticeStatus || '30 Days Notice Served'}</div>
            </div>
          </div>

          <div className="summary-grid-item">
            <div className="summary-icon-wrapper"><FileText size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Reason / Type</div>
              <div className="summary-item-value">{formData.terminationReason || 'End of Fixed-Term Contract'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Clearance & Settlement Requirements */}
      <div className="terms-section-modern">
        <div className="terms-title-modern">CLEARANCE &amp; SETTLEMENT OBLIGATIONS</div>
        <ul className="terms-list-modern">
          <li className="terms-item-modern">
            <Check size={12} className="terms-check-icon" />
            <span><strong>Asset Return:</strong> You are required to hand over all company property, laptops, ID badges, access credentials, and documents to HR on or before your Last Working Day.</span>
          </li>
          <li className="terms-item-modern">
            <Check size={12} className="terms-check-icon" />
            <span><strong>Full &amp; Final Settlement:</strong> Your FnF settlement, including unpaid salary, encashments, and statutory dues, will be credited after departmental no-dues clearance.</span>
          </li>
          <li className="terms-item-modern">
            <Check size={12} className="terms-check-icon" />
            <span><strong>Confidentiality Survival:</strong> Your obligation to maintain strict confidentiality regarding {formData.companyName}'s software, trade secrets, and client data remains in effect post-separation.</span>
          </li>
        </ul>
        
        <p className="terms-closing-modern" style={{ textAlign: 'justify', marginTop: '0.5rem' }}>
          {replacePlaceholders(formData.terminationClosing || 'We thank you for your service with {companyName} and wish you success in your future professional endeavors.', formData)}
        </p>
      </div>

      {/* Signature & Acknowledgement Area */}
      <div className="signature-acceptance-modern" style={{ marginTop: 'auto' }}>
        <div className="signatory-modern-block">
          <div className="signatory-label-modern">Issued By,</div>
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
          <div className="signatory-label-modern">Employee Receipt Acknowledgement</div>
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
        <div className="thankyou-strip-accent" style={{ backgroundColor: '#dc2626' }}></div>
        <span>Formal HR Document — {formData.companyName}</span>
      </div>
    </>
  );
};
