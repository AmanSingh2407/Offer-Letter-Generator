import React from 'react';
import { 
  Briefcase, 
  IndianRupee, 
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
  TrendingUp,
  Percent
} from 'lucide-react';
import companyLogo from '../../assets/logo.png';
import { formatDateLong, capitalizeName, replacePlaceholders } from '../../utils/formatters';

export const IncrementTemplate = ({ formData }) => {
  const formattedIssueDate = formatDateLong(formData.issueDate);
  const formattedEffectiveDate = formatDateLong(formData.incrementEffectiveDate || formData.startDate);

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
        <div className="letter-title-modern">SALARY REVISION &amp; INCREMENT LETTER</div>
        <div className="title-separator-modern">
          <div className="separator-dot"></div>
          <div className="separator-line"></div>
          <div className="separator-dot"></div>
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
          {replacePlaceholders(formData.incrementIntro || 'In recognition of your exceptional performance, dedication, and invaluable contributions to {companyName}, management is pleased to announce a revision in your compensation package. We appreciate your hard work and commitment toward driving our organizational goals.', formData)}
        </p>
      </div>

      {/* Increment Revision Summary Grid */}
      <div className="summary-box-modern">
        <div className="summary-box-header">COMPENSATION REVISION DETAILS</div>
        <div className="summary-grid-modern">
          {/* Column 1: Current Designation */}
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper">
              <Briefcase size={14} />
            </div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Designation</div>
              <div className="summary-item-value">{formData.designation}</div>
            </div>
          </div>
          
          {/* Column 2: Department */}
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper">
              <Users size={14} />
            </div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Department</div>
              <div className="summary-item-value">{formData.department}</div>
            </div>
          </div>
          
          {/* Column 1: Previous CTC */}
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper">
              <IndianRupee size={14} />
            </div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Previous CTC</div>
              <div className="summary-item-value" style={{ textDecoration: 'line-through', opacity: 0.75 }}>
                {formData.previousCTC || '₹ 6,00,000/- PA'}
              </div>
            </div>
          </div>
          
          {/* Column 2: Revised CTC */}
          <div className="summary-grid-item" style={{ backgroundColor: 'rgba(37, 99, 235, 0.06)', borderRadius: '6px' }}>
            <div className="summary-icon-wrapper" style={{ color: '#2563eb' }}>
              <TrendingUp size={14} />
            </div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label" style={{ color: '#2563eb', fontWeight: 700 }}>Revised CTC</div>
              <div className="summary-item-value" style={{ color: '#2563eb', fontWeight: 800 }}>
                {formData.revisedCTC || '₹ 7,50,000/- PA'}
              </div>
            </div>
          </div>

          {/* Column 1: Effective Date */}
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper">
              <Calendar size={14} />
            </div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Effective Date</div>
              <div className="summary-item-value">{formattedEffectiveDate}</div>
            </div>
          </div>
          
          {/* Column 2: Hike Percentage / Amount */}
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper">
              <Percent size={14} />
            </div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Hike / Increase</div>
              <div className="summary-item-value" style={{ color: '#16a34a', fontWeight: 700 }}>
                {formData.incrementPercentage || '25% Hike'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Closing Note */}
      <div className="terms-section-modern">
        <div className="terms-title-modern">TERMS &amp; CONFIDENTIALITY</div>
        <ul className="terms-list-modern">
          <li className="terms-item-modern">
            <Check size={12} className="terms-check-icon" />
            <span>All other terms and conditions of your employment contract remain unchanged and in full force.</span>
          </li>
          <li className="terms-item-modern">
            <Check size={12} className="terms-check-icon" />
            <span>Salary information is strictly confidential between you and management. Any unauthorized disclosure is a policy breach.</span>
          </li>
          <li className="terms-item-modern">
            <Check size={12} className="terms-check-icon" />
            <span>Your updated salary breakdown and structure will be detailed in your upcoming salary slips.</span>
          </li>
        </ul>
        
        <p className="terms-closing-modern" style={{ textAlign: 'justify', marginTop: '0.6rem' }}>
          {replacePlaceholders(formData.incrementClosing || 'We look forward to your continued effort, leadership, and dedication toward scaling new heights with {companyName}. Congratulations once again!', formData)}
        </p>
      </div>

      {/* Signature & Acceptance Area */}
      <div className="signature-acceptance-modern" style={{ marginTop: 'auto' }}>
        <div className="signatory-modern-block">
          <div className="signatory-label-modern">Warm Regards,</div>
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
          <div className="signatory-label-modern">Accepted &amp; Acknowledged</div>
          <div style={{ height: '30px' }}></div>
          <div className="signature-line" style={{ width: '130px', margin: '2px 0 4px 0' }}></div>
          <div className="signatory-name-modern">{capitalizeName(formData.candidateName)}</div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Employee Signature &amp; Date</div>
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
            <div className="value-desc">We grow together.</div>
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
        <span>Congratulations on your salary revision with {formData.companyName}! Keep elevating!</span>
      </div>
    </>
  );
};
