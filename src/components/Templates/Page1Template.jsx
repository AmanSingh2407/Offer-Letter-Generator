import React from 'react';
import { 
  Briefcase, 
  IndianRupee, 
  Users, 
  Clock, 
  Calendar, 
  User, 
  MapPin, 
  FileText, 
  Check, 
  Lightbulb, 
  Shield, 
  Award,
  Globe,
  Mail,
  Phone
} from 'lucide-react';
import companyLogo from '../../assets/logo.png';
import { formatDateLong, capitalizeName, replacePlaceholders } from '../../utils/formatters';

export const Page1Template = ({ formData }) => {
  const formattedIssueDate = formatDateLong(formData.issueDate);
  const formattedStartDate = formatDateLong(formData.startDate);
  const termsList = (formData.termsAndConditions || '')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

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
        <div className="letter-title-modern">{formData.letterType ? formData.letterType.toUpperCase() : 'OFFER LETTER'}</div>
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

      {/* Candidate Recipient Block */}
      <div className="candidate-block-modern">
        <div className="candidate-name-modern">{formData.candidateName}</div>
        <div className="candidate-detail-text">{formData.candidateAddress}</div>
        {formData.candidateMobile && <div className="candidate-detail-text"><strong>Mobile:</strong> {formData.candidateMobile}</div>}
        {formData.candidateEmail && <div className="candidate-detail-text"><strong>Email:</strong> {formData.candidateEmail}</div>}
      </div>

      {/* Salutation & Intro */}
      <div className="salutation-intro-modern">
        <p>Dear <strong>{formData.candidateName}</strong>,</p>
        <p style={{ textIndent: '15px', textAlign: 'justify' }}>
          {replacePlaceholders(formData.letterIntro, formData)}
        </p>
      </div>

      {/* Offer Summary Box Grid */}
      <div className="summary-box-modern">
        <div className="summary-box-header">OFFER SUMMARY</div>
        <div className="summary-grid-modern">
          {/* Column 1: Position */}
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper">
              <Briefcase size={14} />
            </div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Position</div>
              <div className="summary-item-value">{formData.designation}</div>
            </div>
          </div>
          
          {/* Column 2: CTC Offered */}
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper">
              <IndianRupee size={14} />
            </div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">CTC Offered</div>
              <div className="summary-item-value">{formData.ctcOffered}</div>
            </div>
          </div>
          
          {/* Column 1: Department */}
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper">
              <Users size={14} />
            </div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Department</div>
              <div className="summary-item-value">{formData.department}</div>
            </div>
          </div>
          
          {/* Column 2: Probation Period */}
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper">
              <Clock size={14} />
            </div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Probation Period</div>
              <div className="summary-item-value">{formData.probationPeriod}</div>
            </div>
          </div>
          
          {/* Column 1: Date of Joining */}
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper">
              <Calendar size={14} />
            </div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Date of Joining</div>
              <div className="summary-item-value">{formattedStartDate}</div>
            </div>
          </div>
          
          {/* Column 2: Reporting To */}
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper">
              <User size={14} />
            </div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Reporting To</div>
              <div className="summary-item-value">{formData.reportingManager} {formData.managerDesignation && `(${formData.managerDesignation})`}</div>
            </div>
          </div>
          
          {/* Column 1: Work Location */}
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper">
              <MapPin size={14} />
            </div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Work Location</div>
              <div className="summary-item-value">{formData.workLocation} ({formData.workMode})</div>
            </div>
          </div>
          
          {/* Column 2: Employment Type */}
          <div className="summary-grid-item">
            <div className="summary-icon-wrapper">
              <FileText size={14} />
            </div>
            <div className="summary-text-wrapper">
              <div className="summary-item-label">Employment Type</div>
              <div className="summary-item-value">{formData.employmentType}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Conditions Section */}
      <div className="terms-section-modern">
        <div className="terms-title-modern">TERMS & CONDITIONS</div>
        <ul className="terms-list-modern">
          {termsList.map((term, index) => (
            <li key={index} className="terms-item-modern">
              <Check size={12} className="terms-check-icon" />
              <span>{term.replace('{probationPeriod}', formData.probationPeriod)}</span>
            </li>
          ))}
        </ul>
        
        <p className="terms-closing-modern" style={{ textAlign: 'justify' }}>
          {replacePlaceholders(formData.letterClosing, formData)}
        </p>
      </div>

      {/* Signature & Acceptance Area */}
      <div className="signature-acceptance-modern">
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
