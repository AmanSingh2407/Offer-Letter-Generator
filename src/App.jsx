import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  RotateCcw, 
  Sun, 
  Moon, 
  User, 
  Mail, 
  Briefcase, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Globe, 
  FileSignature,
  Lock
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import companyLogo from './assets/logo.png';
import './App.css';

// Default initial state matching all constraints requested by the user
const DEFAULTS = {
  candidateName: 'Rahul Sharma',
  candidateEmail: 'rahul.sharma@example.com',
  designation: 'MERN Stack Developer',
  department: 'Software Development',
  durationMonths: '4',
  issueDate: new Date().toISOString().split('T')[0], // Today's date
  startDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow's date
  workingHours: '4:30 PM to 12:30 AM',
  reportingManager: 'Aman Singh',
  managerDesignation: 'Founder & CTO',
  signatoryName: 'Kartik Khare',
  signatoryDesignation: 'Managing Director',
  companyWebsite: 'www.mindmanthansoftwaresolutions.com',
  companyName: 'Mind Manthan Software Solutions',
  companyAddress: 'A90, Sector 4, Noida, Uttar Pradesh, 201301',
  refNumber: `MMSS/INT/2026/${Math.floor(100 + Math.random() * 900)}`,
  signatureText: 'Kartik Khare',
  workLocation: 'Noida Office',
  employmentType: 'Internship',
  workMode: 'Remote',
  rolesResponsibilities: 'During this {employmentType}, you will work on software development systems under the guidance of our engineering team. You will be expected to write clean, maintainable code, participate in team syncs, and adhere to project timelines and deliverables.'
};

function App() {
  const [formData, setFormData] = useState(DEFAULTS);
  const [theme, setTheme] = useState('light');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Access protection authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('auth_code') === '24072026';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Synchronize theme with HTML attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === '24072026') {
      sessionStorage.setItem('auth_code', '24072026');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Access Denied. Invalid Passcode.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      ...DEFAULTS,
      refNumber: `MMSS/INT/2026/${Math.floor(100 + Math.random() * 900)}`
    });
    setErrorMessage('');
  };

  // Helper: Format date into readable string, e.g. "June 23, 2026"
  const formatDateLong = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Helper: Calculate internship end date
  const calculateEndDate = (startDateStr, durationStr) => {
    if (!startDateStr || !durationStr) return '';
    const start = new Date(startDateStr);
    const months = parseInt(durationStr, 10) || 4;
    
    // Add months
    start.setMonth(start.getMonth() + months);
    
    return start.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Bulletproof client-side multi-page PDF generation
  const generatePDF = async () => {
    if (!formData.candidateName.trim()) {
      setErrorMessage("Please enter the Candidate's Name.");
      return;
    }
    setErrorMessage('');
    setIsGenerating(true);

    try {
      const page1Element = document.getElementById('printable-page-1');
      const page2Element = document.getElementById('printable-page-2');
      if (!page1Element || !page2Element) throw new Error('Printable pages not found');

      // Capture Page 1
      const canvas1 = await html2canvas(page1Element, {
        scale: 2.2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 794,
        height: 1123,
      });
      const imgData1 = canvas1.toDataURL('image/png');

      // Capture Page 2
      const canvas2 = await html2canvas(page2Element, {
        scale: 2.2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 794,
        height: 1123,
      });
      const imgData2 = canvas2.toDataURL('image/png');

      // Create PDF in A4 format (210mm x 297mm)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210;
      const imgHeight = 297;

      // Add Page 1
      pdf.addImage(imgData1, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
      
      // Add Page 2
      pdf.addPage();
      pdf.addImage(imgData2, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');

      const cleanName = formData.candidateName.trim().replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `Joining_Letter_MindManthan_${cleanName}.pdf`;
      pdf.save(filename);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      setErrorMessage('An error occurred during PDF generation. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const page1HTML = () => {
    const formattedIssueDate = formatDateLong(formData.issueDate);
    const formattedStartDate = formatDateLong(formData.startDate);
    const formattedEndDate = calculateEndDate(formData.startDate, formData.durationMonths);

    return (
      <>
        {/* Letterhead Header */}
        <div className="letterhead-header">
          <img 
            src={companyLogo} 
            className="company-logo" 
            alt={formData.companyName} 
            crossOrigin="anonymous"
          />
          <div className="company-details">
            <div className="company-name">{formData.companyName}</div>
            <div>{formData.companyAddress}</div>
            <div>Website: {formData.companyWebsite}</div>
            <div>Email: info@mindmanthansoftwaresolutions.com</div>
          </div>
        </div>

        {/* Document Title */}
        <div className="letter-title">
          {formData.employmentType === 'Trainee' ? 'Letter of Traineeship' : formData.employmentType === 'Volunteer' ? 'Letter of Volunteering' : 'Letter of Internship'}
        </div>

        {/* Metadata */}
        <div className="letter-meta">
          <div className="letter-meta-block">
            <strong>Ref No:</strong> {formData.refNumber}
          </div>
          <div className="letter-meta-block">
            <strong>Date:</strong> {formattedIssueDate}
          </div>
        </div>

        {/* Candidate Recipient Block */}
        <div className="candidate-block">
          <div>To,</div>
          <div className="candidate-name">{formData.candidateName}</div>
          {formData.candidateEmail && <div>{formData.candidateEmail}</div>}
        </div>

        {/* Subject & Intro */}
        <div className="letter-body" style={{ flexGrow: 0, marginBottom: '0.5rem' }}>
          <p>
            <strong>Subject: Joining Letter of {formData.employmentType}</strong>
          </p>

          <p>
            Dear <strong>{formData.candidateName}</strong>,
          </p>

          <p>
            We are pleased to offer you an opportunity at <strong>{formData.companyName}</strong> in our <strong>{formData.department}</strong> department. We were highly impressed by your qualifications, problem-solving skills, and tech enthusiasm, and we believe you will be a valuable addition to our team.
          </p>

          <p>
            The key terms and conditions of your {formData.employmentType?.toLowerCase() || 'internship'} are detailed below:
          </p>
        </div>

        {/* Terms Table */}
        <table className="letter-table-info">
          <tbody>
            <tr>
              <td className="label">Reference Number</td>
              <td className="value">{formData.refNumber}</td>
            </tr>
            <tr>
              <td className="label">Date of Issue</td>
              <td className="value">{formattedIssueDate}</td>
            </tr>
            <tr>
              <td className="label">Position/Designation</td>
              <td className="value">{formData.designation}</td>
            </tr>
            <tr>
              <td className="label">Department</td>
              <td className="value">{formData.department}</td>
            </tr>
            <tr>
              <td className="label">Employment Type</td>
              <td className="value">{formData.employmentType}</td>
            </tr>
            <tr>
              <td className="label">Work Mode</td>
              <td className="value">{formData.workMode}</td>
            </tr>
            <tr>
              <td className="label">Work Location</td>
              <td className="value">{formData.workLocation}</td>
            </tr>
            <tr>
              <td className="label">Duration</td>
              <td className="value">{formData.durationMonths} Months (Unpaid)</td>
            </tr>
            <tr>
              <td className="label">Joining Date</td>
              <td className="value">{formattedStartDate}</td>
            </tr>

            <tr>
              <td className="label">Working Timings</td>
              <td className="value">{formData.workingHours} (Mon - Sat)</td>
            </tr>
            <tr>
              <td className="label">Reporting Manager</td>
              <td className="value">{formData.reportingManager} ({formData.managerDesignation})</td>
            </tr>
          </tbody>
        </table>

        {/* Letterhead Footer */}
        <div className="letter-footer" style={{ marginTop: 'auto' }}>
          <div>Mind Manthan Software Solutions &copy; {new Date().getFullYear()}</div>
          <div>{formData.companyWebsite}</div>
          <div>Page 1 of 2</div>
        </div>
      </>
    );
  };

  const page2HTML = () => {
    return (
      <>
        {/* Page 2 Mini Header */}
        <div className="letterhead-header" style={{ paddingBottom: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #cbd5e1' }}>
          <img 
            src={companyLogo} 
            style={{ maxHeight: '40px', width: 'auto' }} 
            alt={formData.companyName} 
            crossOrigin="anonymous"
          />
          <div style={{ fontSize: '0.8rem', color: '#64748b', fontFamily: 'var(--font-heading)', fontWeight: '500' }}>
            {formData.companyName} | Offer & Joining Details
          </div>
        </div>

        {/* Policies / Clause Headings */}
        <div className="letter-body" style={{ flexGrow: 1, gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '0.35rem', fontFamily: 'var(--font-heading)' }}>
              1. Roles and Responsibilities
            </h3>
            <p style={{ margin: 0, fontSize: '0.92rem', color: '#334155', whiteSpace: 'pre-wrap' }}>
              {(formData.rolesResponsibilities || '').replace('{employmentType}', formData.employmentType?.toLowerCase() || 'internship')}
            </p>
          </div>

          <div style={{ marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '0.35rem', fontFamily: 'var(--font-heading)' }}>
              2. Code of Conduct & Confidentiality
            </h3>
            <p style={{ margin: 0, fontSize: '0.92rem', color: '#334155' }}>
              Please note that as a participant in our program, you may have access to proprietary systems and business data. You agree to maintain absolute confidentiality regarding all company codes, projects, intellectual property, and client information during and after your association. Any breach of this confidentiality policy will result in immediate termination of your engagement and potential legal action.
            </p>
          </div>

          <div style={{ marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '0.35rem', fontFamily: 'var(--font-heading)' }}>
              3. Stipend & Commercial Terms
            </h3>
            <p style={{ margin: 0, fontSize: '0.92rem', color: '#334155' }}>
              This is an unpaid engagement, and you will not receive any financial compensation or employee benefits. However, upon successful completion of your tenure and milestones, you will receive an official Certificate of Completion and a Letter of Recommendation.
            </p>
          </div>

          <div style={{ marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '0.35rem', fontFamily: 'var(--font-heading)' }}>
              4. Corporate Information
            </h3>
            <p style={{ margin: 0, fontSize: '0.92rem', color: '#334155' }}>
              For more information regarding our company policies, technical divisions, and work standards, you can visit our official website at <strong>{formData.companyWebsite}</strong>.
            </p>
          </div>

          <p style={{ marginTop: '1rem', fontWeight: '500', color: '#0f172a' }}>
            We look forward to a mutually productive association and wish you a highly educational experience.
          </p>
        </div>

        {/* Signature Section */}
        <div className="signature-section" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
          <div className="signature-block">
            <div className="signature-line"></div>
            <div>Accepted By</div>
            <div style={{ fontStyle: 'italic', color: '#64748b', fontSize: '0.8rem' }}>Candidate Signature & Date</div>
          </div>

          <div className="signature-block" style={{ alignItems: 'flex-end', textAlign: 'right' }}>
            {formData.signatureText && (
              <div 
                style={{ 
                  fontFamily: "'Caveat', cursive", 
                  fontSize: '1.8rem', 
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
            <div className="signature-name">{formData.signatoryName || 'Kartik Khare'}</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{formData.signatoryDesignation || 'Managing Director'}</div>
          </div>
        </div>

        {/* Letterhead Footer */}
        <div className="letter-footer" style={{ marginTop: '1.5rem' }}>
          <div>Mind Manthan Software Solutions &copy; {new Date().getFullYear()}</div>
          <div>{formData.companyWebsite}</div>
          <div>Page 2 of 2</div>
        </div>
      </>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10 }}>
          <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle Theme" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
        
        <div className="auth-card">
          <div className="auth-header">
            <img src={companyLogo} className="auth-logo" alt={formData.companyName} />
            <div className="auth-title">Mind Manthan</div>
            <div className="auth-subtitle">
              Please enter the 8-digit access code to unlock the Offer & Joining Letter Generator.
            </div>
          </div>
          
          <form onSubmit={handleLogin} className="auth-form">
            <div className="passcode-input-wrapper">
              <span className="input-icon-left">
                <Lock size={18} />
              </span>
              <input
                type="password"
                className="passcode-input"
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (authError) setAuthError('');
                }}
                maxLength={16}
                autoFocus
                required
              />
            </div>
            
            {authError && (
              <div className="auth-error">
                <span>{authError}</span>
              </div>
            )}
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
              Unlock Generator
            </button>
          </form>
          
          <div className="auth-footer">
            {formData.companyName} &copy; {new Date().getFullYear()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      {/* Premium Header */}
      <header className="app-header">
        <div className="logo-brand">
          <img src={companyLogo} style={{ height: '32px', width: 'auto' }} alt="Brand Logo" />
          <span className="brand-text">Mind Manthan</span>
        </div>
        
        <div className="header-actions">
          <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <button 
            className="btn btn-primary" 
            onClick={generatePDF} 
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="spinner" style={{
                  display: 'inline-block',
                  width: '14px',
                  height: '14px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#fff',
                  borderRadius: '50%',
                  animation: 'spin 0.6s linear infinite',
                  marginRight: '0.5rem'
                }}></span>
                Generating...
              </>
            ) : (
              <>
                <Download size={18} />
                Download PDF
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Workspace split in two panels */}
      <div className="app-container">
        
        {/* Left Panel: Inputs Form */}
        <aside className="sidebar">
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>
              Letter Generator
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Configure details below. The letter will update instantly.
            </p>
          </div>

          {errorMessage && (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              borderLeft: '4px solid var(--danger)',
              padding: '0.75rem',
              borderRadius: '4px',
              fontSize: '0.85rem',
              color: 'var(--text-primary)'
            }}>
              {errorMessage}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Section 1: Candidate Info */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '700',
                marginBottom: '0.75rem',
                color: 'var(--primary-600)',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '0.25rem'
              }}>
                <User size={16} /> Candidate Details
              </div>

              <div className="form-group">
                <label htmlFor="candidateName">Full Name</label>
                <input 
                  type="text" 
                  id="candidateName" 
                  name="candidateName"
                  value={formData.candidateName}
                  onChange={handleInputChange}
                  placeholder="Rahul Sharma"
                  className="input-field"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="candidateEmail">Email Address</label>
                <input 
                  type="email" 
                  id="candidateEmail" 
                  name="candidateEmail"
                  value={formData.candidateEmail}
                  onChange={handleInputChange}
                  placeholder="rahul.sharma@example.com"
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label htmlFor="designation">Position/Designation</label>
                <input 
                  type="text" 
                  id="designation" 
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="MERN Stack Developer"
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label htmlFor="department">Department</label>
                <input 
                  type="text" 
                  id="department" 
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="Software Development"
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label htmlFor="rolesResponsibilities">Roles & Responsibilities</label>
                <textarea 
                  id="rolesResponsibilities" 
                  name="rolesResponsibilities"
                  value={formData.rolesResponsibilities}
                  onChange={handleInputChange}
                  placeholder="Enter role and responsibilities..."
                  className="input-field"
                  rows={4}
                  style={{ resize: 'vertical', minHeight: '80px', fontSize: '0.85rem', lineHeight: '1.4' }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Use <code>{`{employmentType}`}</code> as a placeholder for the contract type (e.g. internship).
                </span>
              </div>
            </div>

            {/* Section 2: Internship Schedule & Terms */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '700',
                marginBottom: '0.75rem',
                color: 'var(--primary-600)',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '0.25rem'
              }}>
                <Calendar size={16} /> Schedule & Conditions
              </div>

              <div className="input-row">
                <div className="form-group">
                  <label htmlFor="issueDate">Issue Date (Today)</label>
                  <input 
                    type="date" 
                    id="issueDate" 
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="startDate">Start Date (Tomorrow)</label>
                  <input 
                    type="date" 
                    id="startDate" 
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="form-group">
                  <label htmlFor="durationMonths">Duration (Months)</label>
                  <input 
                    type="number" 
                    id="durationMonths" 
                    name="durationMonths"
                    value={formData.durationMonths}
                    onChange={handleInputChange}
                    min="1"
                    max="12"
                    className="input-field"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="workingHours">Working Timings</label>
                  <input 
                    type="text" 
                    id="workingHours" 
                    name="workingHours"
                    value={formData.workingHours}
                    onChange={handleInputChange}
                    placeholder="4:30 PM to 12:30 AM"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="form-group">
                  <label htmlFor="employmentType">Employment Type</label>
                  <select 
                    id="employmentType" 
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Trainee">Trainee</option>
                    <option value="Volunteer">Volunteer</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="workMode">Work Mode</label>
                  <select 
                    id="workMode" 
                    name="workMode"
                    value={formData.workMode}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="workLocation">Work Location</label>
                <input 
                  type="text" 
                  id="workLocation" 
                  name="workLocation"
                  value={formData.workLocation}
                  onChange={handleInputChange}
                  placeholder="Noida Office"
                  className="input-field"
                />
              </div>
            </div>

            {/* Section 3: Manager & Reference */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '700',
                marginBottom: '0.75rem',
                color: 'var(--primary-600)',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '0.25rem'
              }}>
                <ShieldCheck size={16} /> Officer & Document Info
              </div>

              <div className="input-row">
                <div className="form-group">
                  <label htmlFor="reportingManager">Reporting Manager</label>
                  <input 
                    type="text" 
                    id="reportingManager" 
                    name="reportingManager"
                    value={formData.reportingManager}
                    onChange={handleInputChange}
                    placeholder="Aman Singh"
                    className="input-field"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="managerDesignation">Manager Designation</label>
                  <input 
                    type="text" 
                    id="managerDesignation" 
                    name="managerDesignation"
                    value={formData.managerDesignation}
                    onChange={handleInputChange}
                    placeholder="Founder & CTO"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="form-group">
                  <label htmlFor="signatoryName">Signatory Name</label>
                  <input 
                    type="text" 
                    id="signatoryName" 
                    name="signatoryName"
                    value={formData.signatoryName}
                    onChange={handleInputChange}
                    placeholder="Kartik Khare"
                    className="input-field"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signatoryDesignation">Signatory Role</label>
                  <input 
                    type="text" 
                    id="signatoryDesignation" 
                    name="signatoryDesignation"
                    value={formData.signatoryDesignation}
                    onChange={handleInputChange}
                    placeholder="Managing Director"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="form-group">
                  <label htmlFor="refNumber">Ref Number</label>
                  <input 
                    type="text" 
                    id="refNumber" 
                    name="refNumber"
                    value={formData.refNumber}
                    onChange={handleInputChange}
                    placeholder="MMSS/INT/2026/042"
                    className="input-field"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signatureText">Digital Signature</label>
                  <input 
                    type="text" 
                    id="signatureText" 
                    name="signatureText"
                    value={formData.signatureText}
                    onChange={handleInputChange}
                    placeholder="Kartik Khare"
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Web Company Details */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '700',
                marginBottom: '0.75rem',
                color: 'var(--primary-600)',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '0.25rem'
              }}>
                <Globe size={16} /> Company Details
              </div>

              <div className="form-group">
                <label htmlFor="companyWebsite">Website Link</label>
                <input 
                  type="text" 
                  id="companyWebsite" 
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleInputChange}
                  placeholder="www.mindmanthansoftwaresolutions.com"
                  className="input-field"
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', paddingTop: '1rem' }}>
            <button className="btn btn-secondary" onClick={resetForm} style={{ flex: 1 }}>
              <RotateCcw size={16} />
              Reset
            </button>
            <button className="btn btn-primary" onClick={generatePDF} disabled={isGenerating} style={{ flex: 2 }}>
              <Download size={16} />
              Download
            </button>
          </div>
        </aside>

        {/* Right Panel: Scrollable Live Preview Container */}
        <main className="preview-container">
          <div className="paper-page-wrapper" style={{ paddingBottom: '3rem' }}>
            <div style={{ 
              marginBottom: '0.25rem', 
              fontSize: '0.85rem', 
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>Live 2-Page A4 Letterhead Preview</span>
              <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--border-color)', padding: '2px 8px', borderRadius: '12px' }}>
                794 x 1123 px (Per Page)
              </span>
            </div>
            
            {/* Visual Live Preview - Page 1 */}
            <div id="live-preview-letter-1" className="paper-page">
              {page1HTML()}
            </div>

            {/* Visual Live Preview - Page 2 */}
            <div id="live-preview-letter-2" className="paper-page" style={{ marginTop: '1.5rem' }}>
              {page2HTML()}
            </div>
          </div>
        </main>
      </div>

      {/* 
        This is an off-screen container that renders the exact same A4 page but is 
        NEVER scaled down or affected by media queries. html2canvas will snapshot this 
        for flawless high-resolution vector extraction.
      */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <div id="printable-page-1" className="paper-page" style={{ transform: 'none', boxShadow: 'none' }}>
          {page1HTML()}
        </div>
        <div id="printable-page-2" className="paper-page" style={{ transform: 'none', boxShadow: 'none' }}>
          {page2HTML()}
        </div>
      </div>
      
      {/* Keyframe animation for spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default App;
