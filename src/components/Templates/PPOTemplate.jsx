import React from 'react';
import { 
  Calendar, 
  Briefcase, 
  Users, 
  IndianRupee, 
  Clock, 
  User, 
  FileText, 
  Check, 
  Lightbulb, 
  Shield, 
  Award,
  MapPin,
  Globe,
  Mail,
  Phone
} from 'lucide-react';
import companyLogo from '../../assets/logo.png';
import { formatDateLong, capitalizeName } from '../../utils/formatters';

export const PPOTemplate = ({ formData }) => {
  const formattedIssueDate  = formatDateLong(formData.issueDate);
  const formattedJoining    = formatDateLong(formData.ppoJoiningDate);
  const formattedDeadline   = formatDateLong(formData.ppoAcceptDeadline);
  const formattedIntStart   = formatDateLong(formData.internshipStartDate);
  const formattedIntEnd     = formatDateLong(formData.internshipEndDate);
  const ppoTermsList = (formData.ppoTerms || '')
    .split('\n').map(l => l.trim()).filter(l => l.length > 0);

  return (
    <>
      {/* Same premium slanted header as offer letter */}
      <div className="letterhead-header-modern">
        <div className="header-brand-bg"></div>
        <div className="header-divider-bg"></div>
        <div className="header-brand-content">
          <img src={companyLogo} className="company-logo-modern" alt={formData.companyName} crossOrigin="anonymous" />
          <div className="company-brand-text">
            <div className="company-name-modern">{formData.companyName}</div>
            <div className="company-tagline-modern">{formData.companyTagline}</div>
          </div>
        </div>
        <div className="header-contact-content">
          <div className="contact-item"><MapPin size={10} className="contact-icon" /><span>{formData.companyAddress}</span></div>
          <div className="contact-item"><Globe size={10} className="contact-icon" /><span>{formData.companyWebsite}</span></div>
          <div className="contact-item"><Mail size={10} className="contact-icon" /><span>info@mindmanthansoftwaresolutions.com</span></div>
          <div className="contact-item"><Phone size={10} className="contact-icon" /><span>{formData.companyMobile || '+91 92772 67732'}</span></div>
        </div>
      </div>

      {/* PPO Title */}
      <div className="letter-title-modern-container">
        <div className="letter-title-modern">PRE-PLACEMENT OFFER</div>
        <div className="title-separator-modern">
          <div className="separator-dot"></div>
          <div className="separator-line"></div>
          <div className="separator-dot"></div>
        </div>
      </div>

      {/* Meta row */}
      <div className="letter-meta-modern">
        <div><strong>Ref No:</strong> {formData.refNumber}</div>
        <div><strong>Date:</strong> {formattedIssueDate}</div>
      </div>

      {/* Candidate block */}
      <div className="candidate-block-modern">
        <div className="candidate-name-modern">{capitalizeName(formData.candidateName)}</div>
        <div className="candidate-detail-text">{formData.candidateAddress}</div>
        {formData.candidateMobile && <div className="candidate-detail-text"><strong>Mobile:</strong> {formData.candidateMobile}</div>}
        {formData.candidateEmail && <div className="candidate-detail-text"><strong>Email:</strong> {formData.candidateEmail}</div>}
      </div>

      {/* Salutation */}
      <div className="salutation-intro-modern">
        <p>Dear <strong>{capitalizeName(formData.candidateName)}</strong>,</p>
        <p style={{ textIndent: '15px', textAlign: 'justify' }}>
          We are delighted to extend this <strong>Pre-Placement Offer (PPO)</strong> to you for a full-time position at <strong>{formData.companyName}</strong>, based on your outstanding performance during your internship with us from <strong>{formattedIntStart}</strong> to <strong>{formattedIntEnd}</strong> in the <strong>{formData.department}</strong> department. Your dedication and contributions have been truly commendable.
        </p>
      </div>

      {/* PPO Summary Grid */}
      <div className="summary-box-modern">
        <div className="summary-box-header">PPO SUMMARY</div>
        <div className="summary-grid-modern">
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper"><Calendar size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Internship Period</div>
              <div className="summary-item-value">{formattedIntStart} – {formattedIntEnd}</div>
            </div>
          </div>
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper"><Briefcase size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Full-Time Role</div>
              <div className="summary-item-value">{formData.ppoFullTimeRole}</div>
            </div>
          </div>
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper"><Users size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Department</div>
              <div className="summary-item-value">{formData.department}</div>
            </div>
          </div>
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper"><IndianRupee size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">CTC Offered</div>
              <div className="summary-item-value">{formData.ppoCTC}</div>
            </div>
          </div>
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper"><Calendar size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Date of Joining</div>
              <div className="summary-item-value">{formattedJoining}</div>
            </div>
          </div>
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper"><Clock size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Probation Period</div>
              <div className="summary-item-value">{formData.ppoProbation}</div>
            </div>
          </div>
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper"><User size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Reporting Manager</div>
              <div className="summary-item-value">{formData.reportingManager}{formData.managerDesignation && ` (${formData.managerDesignation})`}</div>
            </div>
          </div>
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper"><FileText size={14} /></div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Accept By</div>
              <div className="summary-item-value" style={{ color: '#dc2626', fontWeight: 700 }}>{formattedDeadline}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="terms-section-modern">
        <div className="terms-title-modern">TERMS &amp; CONDITIONS</div>
        <ul className="terms-list-modern">
          {ppoTermsList.map((term, i) => (
            <li key={i} className="terms-item-modern">
              <Check size={12} className="terms-check-icon" />
              <span>{term.replace('{ppoProbation}', formData.ppoProbation).replace('{ppoAcceptDeadline}', formattedDeadline)}</span>
            </li>
          ))}
        </ul>
        <p className="terms-closing-modern" style={{ textAlign: 'justify' }}>
          We look forward to having you as a full-time member of the <strong>{formData.companyName}</strong> family. Please confirm your acceptance of this Pre-Placement Offer by signing below and returning a copy before <strong>{formattedDeadline}</strong>.
        </p>
      </div>

      {/* Signature */}
      <div className="signature-acceptance-modern">
        <div className="signatory-modern-block">
          <div className="signatory-label-modern">Warm Regards,</div>
          {formData.signatureText && (
            <div className="signatory-signature-modern">{capitalizeName(formData.signatureText)}</div>
          )}
          <div className="signatory-name-modern">{capitalizeName(formData.signatoryName)}</div>
          <div className="signatory-title-modern">{formData.signatoryDesignation}</div>
          <div className="signatory-company-modern">{formData.companyName}</div>
        </div>
      </div>

      {/* Values footer */}
      <div className="values-footer-modern">
        <div className="value-badge-modern"><div className="value-icon-circle"><Lightbulb size={10} /></div><div className="value-text-block"><div className="value-title">INNOVATION</div><div className="value-desc">We embrace new ideas.</div></div></div>
        <div className="value-badge-modern"><div className="value-icon-circle"><Shield size={10} /></div><div className="value-text-block"><div className="value-title">INTEGRITY</div><div className="value-desc">We do the right thing.</div></div></div>
        <div className="value-badge-modern"><div className="value-icon-circle"><Users size={10} /></div><div className="value-text-block"><div className="value-title">COLLABORATION</div><div className="value-desc">We grow together.</div></div></div>
        <div className="value-badge-modern"><div className="value-icon-circle"><Award size={10} /></div><div className="value-text-block"><div className="value-title">EXCELLENCE</div><div className="value-desc">We aim for the best.</div></div></div>
      </div>

      {/* Bottom ribbon */}
      <div className="footer-ribbon-modern">
        <div className="footer-ribbon-bg"></div>
        <div className="footer-ribbon-accent"></div>
      </div>
    </>
  );
};
