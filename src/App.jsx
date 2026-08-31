import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  RotateCcw, 
  User, 
  Mail, 
  Briefcase, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Globe, 
  MapPin,
  IndianRupee,
  Phone,
  Award,
  TrendingUp,
  Lock,
  UserX,
  Trophy,
  Star,
  AlertTriangle
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import companyLogo from './assets/logo.png';
import './App.css';

// Modular Imports
import { DEFAULTS, SHEETS_URL } from './constants/defaults';
import { 
  formatDateLong, 
  capitalizeName, 
  formatCurrency, 
  replacePlaceholders 
} from './utils/formatters';

import { Header } from './components/Common/Header';
import { Toast } from './components/Common/Toast';
import { AccessModal } from './components/Common/AccessModal';
import { UniquenessAlert } from './components/Sidebar/UniquenessAlert';
import { QuotationManager } from './components/Sidebar/QuotationManager';

import { Page1Template } from './components/Templates/Page1Template';
import { Page2Template } from './components/Templates/Page2Template';
import { PPOTemplate } from './components/Templates/PPOTemplate';
import { CertTemplate } from './components/Templates/CertTemplate';
import { PayslipTemplate } from './components/Templates/PayslipTemplate';
import { QuotationPages } from './components/Templates/QuotationPages';
import { IncrementTemplate } from './components/Templates/IncrementTemplate';
import { NDAPage1Template } from './components/Templates/NDAPage1Template';
import { NDAPage2Template } from './components/Templates/NDAPage2Template';
import { TerminationTemplate } from './components/Templates/TerminationTemplate';
import { AwardCertTemplate } from './components/Templates/AwardCertTemplate';
import { DisciplinaryTemplate } from './components/Templates/DisciplinaryTemplate';
import { ExperienceTemplate } from './components/Templates/ExperienceTemplate';

function App() {
  const [formData, setFormData] = useState(DEFAULTS);
  const [theme, setTheme] = useState('light');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [toast, setToast] = useState(null);

  // Quick Quotation Helper States
  const [quickLineText, setQuickLineText] = useState('');
  const [quickCatText, setQuickCatText] = useState('');
  const [showRawEditor, setShowRawEditor] = useState(false);

  // Access protection authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('auth_code') === '24072026';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Synchronize theme & dynamic document title / favicon
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.title = "Mind Manthan Software Solutions";
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'shortcut icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.type = 'image/png';
    link.href = companyLogo;
  }, [theme]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message, type = 'success') => setToast({ message, type });

  // Registered Ref & Certificate Numbers state for uniqueness checks
  const [registeredRecords, setRegisteredRecords] = useState(() => {
    try {
      const saved = localStorage.getItem('mm_registered_records');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Sync registered records with Google Sheets
  useEffect(() => {
    fetch(SHEETS_URL)
      .then(res => res.json())
      .then(data => {
        if (data && (data.registeredRefs || data.registeredCerts)) {
          const fetchedRefs = data.registeredRefs || [];
          const fetchedCerts = data.registeredCerts || [];
          const combined = [...new Set([...fetchedRefs, ...fetchedCerts].map(s => String(s).trim()))];
          setRegisteredRecords(prev => {
            const updated = [...new Set([...prev, ...combined])];
            try { localStorage.setItem('mm_registered_records', JSON.stringify(updated)); } catch (e) {}
            return updated;
          });
        }
      })
      .catch(err => console.log('Google Sheets sync check:', err));
  }, []);

  const markNumberAsRegistered = (numStr) => {
    if (!numStr || !numStr.trim()) return;
    const clean = numStr.trim();
    setRegisteredRecords(prev => {
      const updated = [...new Set([...prev, clean])];
      try { localStorage.setItem('mm_registered_records', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  // 1-Click Unique Generators
  const generateUniqueRefNumber = () => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    const prefix = formData.letterType === 'PPO Letter' ? 'PPO' : formData.letterType === 'Increment Letter' ? 'INC' : formData.letterType === 'NDA Agreement' ? 'NDA' : formData.letterType === 'Termination Letter' ? 'TRM' : formData.letterType === 'Disciplinary Letter' ? 'DISC' : 'OL';
    const dept = formData.letterType === 'NDA Agreement' ? 'LEGAL' : 'HR';
    const newRef = `MMSS/${dept}/${prefix}/${year}/${randomDigits}`;
    setFormData(prev => ({ ...prev, refNumber: newRef }));
    showToast(`⚡ Generated fresh Ref No: ${newRef}`, 'success');
  };

  const generateUniqueCertificateId = () => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    const prefix = formData.letterType === 'Employee Award Certificate' ? 'AWD' : 'INT';
    const newCert = `MMSS/${prefix}/CERT/${year}/${randomDigits}`;
    setFormData(prev => ({ ...prev, certificateId: newCert }));
    showToast(`⚡ Generated fresh Certificate ID: ${newCert}`, 'success');
  };

  const generateUniqueQuotationNo = () => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const newQuot = `A${randomDigits}`;
    setFormData(prev => ({ ...prev, quotationNo: newQuot }));
    showToast(`⚡ Generated fresh Quotation No: ${newQuot}`, 'success');
  };

  // Quotation Scope Items Helper Handlers
  const handleAddScopeItem = (type = 2) => {
    if (type === 1) {
      const catName = prompt('Enter Category Title (e.g. 1. Website Features):', '1. New Category');
      if (!catName || !catName.trim()) return;
      const formatted = `\n${catName.trim()}`;
      setFormData(prev => ({
        ...prev,
        quotationScopeText: prev.quotationScopeText ? `${prev.quotationScopeText}\n${formatted}` : formatted
      }));
    } else {
      const featName = prompt('Enter Feature Item (e.g. Hero Banner Slider):', 'New Feature Item');
      if (!featName || !featName.trim()) return;
      const formatted = `• ${featName.trim()}`;
      setFormData(prev => ({
        ...prev,
        quotationScopeText: prev.quotationScopeText ? `${prev.quotationScopeText}\n${formatted}` : formatted
      }));
    }
  };

  const handleAddPageBreak = () => {
    setFormData(prev => ({
      ...prev,
      quotationScopeText: prev.quotationScopeText ? `${prev.quotationScopeText}\n\n[PAGE]\n` : '[PAGE]\n'
    }));
    showToast('📄 New Page Break inserted!', 'success');
  };

  const handleAddSection = () => {
    const title = prompt('Enter New Section Title:', 'Admin Panel Features');
    if (!title || !title.trim()) return;
    const secTag = `\n\n[SECTION] ${title.trim()}\n`;
    setFormData(prev => ({
      ...prev,
      quotationScopeText: prev.quotationScopeText ? `${prev.quotationScopeText}${secTag}` : secTag
    }));
  };

  const handleEditLine = (indexToEdit, newText) => {
    const lines = (formData.quotationScopeText || '').split('\n');
    lines[indexToEdit] = newText;
    setFormData(prev => ({
      ...prev,
      quotationScopeText: lines.join('\n')
    }));
  };

  const handleDeleteLine = (indexToDelete) => {
    const lines = (formData.quotationScopeText || '').split('\n');
    lines.splice(indexToDelete, 1);
    setFormData(prev => ({
      ...prev,
      quotationScopeText: lines.join('\n')
    }));
    showToast('🗑️ Item deleted', 'success');
  };

  // NDA Clause Manager Handlers
  const handleAddPart1Clause = () => {
    setFormData(prev => {
      const current = prev.ndaPart1Clauses || [];
      const nextNum = current.length + 1;
      return {
        ...prev,
        ndaPart1Clauses: [
          ...current,
          { title: `${nextNum}. New Obligation Clause`, content: 'Enter obligation clause text here...' }
        ]
      };
    });
    showToast('➕ Clause added to Part I (Page 1)', 'success');
  };

  const handleRemovePart1Clause = (index) => {
    setFormData(prev => {
      const current = [...(prev.ndaPart1Clauses || [])];
      current.splice(index, 1);
      return { ...prev, ndaPart1Clauses: current };
    });
    showToast('🗑️ Clause removed from Part I', 'info');
  };

  const handleUpdatePart1Clause = (index, field, value) => {
    setFormData(prev => {
      const current = [...(prev.ndaPart1Clauses || [])];
      current[index] = { ...current[index], [field]: value };
      return { ...prev, ndaPart1Clauses: current };
    });
  };

  const handleAddPart2Clause = () => {
    setFormData(prev => {
      const current = prev.ndaPart2Clauses || [];
      const p1Len = (prev.ndaPart1Clauses ? prev.ndaPart1Clauses.length : 3);
      const nextNum = p1Len + current.length + 1;
      return {
        ...prev,
        ndaPart2Clauses: [
          ...current,
          { title: `${nextNum}. New Legal Clause`, content: 'Enter legal clause text here...' }
        ]
      };
    });
    showToast('➕ Clause added to Part II (Page 2)', 'success');
  };

  const handleRemovePart2Clause = (index) => {
    setFormData(prev => {
      const current = [...(prev.ndaPart2Clauses || [])];
      current.splice(index, 1);
      return { ...prev, ndaPart2Clauses: current };
    });
    showToast('🗑️ Clause removed from Part II', 'info');
  };

  const handleUpdatePart2Clause = (index, field, value) => {
    setFormData(prev => {
      const current = [...(prev.ndaPart2Clauses || [])];
      current[index] = { ...current[index], [field]: value };
      return { ...prev, ndaPart2Clauses: current };
    });
  };

  // Log to Google Sheets & Google Drive via Apps Script webhook
  const logToSheets = async (data, pdfBase64 = '', filename = '') => {
    try {
      const isQuot = data.letterType === 'Quotation';
      const isPay = data.letterType === 'Salary Slip';
      const isPPO = data.letterType === 'PPO Letter';
      const isCert = data.letterType === 'Internship Certificate';
      const isAward = data.letterType === 'Employee Award Certificate';
      const isInc = data.letterType === 'Increment Letter';
      const isNDA = data.letterType === 'NDA Agreement';
      const isTrm = data.letterType === 'Termination Letter';
      const isDisc = data.letterType === 'Disciplinary Letter';

      const payload = {
        candidateName: isQuot ? (data.quotationForClient || '') : (data.candidateName || ''),
        designation: isQuot ? (data.quotationProjectTitle || '') : isPPO ? (data.ppoFullTimeRole || data.designation) : isNDA ? `NDA (${data.ndaPartyType || 'Legal'})` : isTrm ? `${data.designation} (Terminated)` : isAward ? `${data.awardType || 'Award'} (${data.awardPeriod || ''})` : isDisc ? `${data.designation} (${data.discType || 'Warning'})` : (data.designation || ''),
        department: isQuot ? 'IT & Web Solutions' : isNDA ? 'Legal & Compliance' : (data.department || ''),
        letterType: data.letterType || 'Offer Letter',
        issueDate: isQuot ? (data.quotationDate || '') : (data.issueDate || ''),
        startDate: isQuot ? (data.validTillDate || '') : isPPO ? (data.ppoJoiningDate || '') : isInc ? (data.incrementEffectiveDate || '') : isNDA ? (data.ndaEffectiveDate || '') : isTrm ? (data.terminationLastDay || '') : isAward ? (data.awardPeriod || '') : isDisc ? (data.discIncidentDates || '') : (data.startDate || ''),
        companyName: isQuot ? (data.quotationFromCompany || '') : (data.companyName || ''),
        refNumber: (isCert || isAward) ? 'N/A' : isQuot ? (data.quotationNo || 'N/A') : isPay ? `PAY-${data.employeeId || ''}-${data.payPeriod || ''}` : (data.refNumber || 'N/A'),
        certificateNo: (isCert || isAward) ? (data.certificateId || 'N/A') : 'N/A',
        timestamp: new Date().toLocaleString('en-IN'),
        filename: filename,
        pdfBase64: pdfBase64
      };

      await fetch(SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      showToast('✓ PDF & Record saved to Google Sheets & Drive', 'success');
    } catch (err) {
      console.error('Failed to log to Google Sheets:', err);
      showToast('⚠ Could not reach Google Sheets', 'error');
    }
  };

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
    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: value
      };
      if (name === 'signatoryName') {
        updated.signatureText = value;
      }
      if (name === 'letterType') {
        if (value === 'Disciplinary Letter') {
          updated.candidateName = 'Aman Singh';
          updated.employeeId = '43521';
          updated.designation = 'Software Engineer';
          updated.department = 'Engineering';
          updated.discType = 'First Written Warning';
          updated.discSubject = 'Unexcused Absences & Policy Misconduct';
          updated.discIncidentDates = 'August 05 - August 10, 2026';
          updated.discViolationDetails = 'It has been observed that you have failed to adhere to official workplace guidelines, working hours, or project standards despite prior verbal counseling.';
          updated.discActionRequired = 'You are required to immediately rectify your attendance, performance, and professional conduct in full alignment with company policies.';
          updated.discConsequences = 'Failure to demonstrate immediate and sustained improvement may result in strict escalation up to and including suspension or termination of employment.';
          updated.refNumber = `MMSS/HR/DISC/2026/${Math.floor(1000 + Math.random() * 9000)}`;
          updated.signatoryName = 'Aman Singh';
          updated.signatoryDesignation = 'HR Manager';
        } else if (value === 'Employee Award Certificate') {
          updated.candidateName = 'Aman Singh';
          updated.designation = 'Senior Software Engineer';
          updated.department = 'Engineering';
          updated.awardType = 'EMPLOYEE OF THE MONTH';
          updated.awardPeriod = 'August 2026';
          updated.awardCitation = 'In recognition of outstanding performance, exceptional dedication, and remarkable contributions toward achieving organizational excellence at Mind Manthan Software Solutions.';
          updated.certificateId = `MMSS/AWD/CERT/2026/${Math.floor(1000 + Math.random() * 9000)}`;
          updated.signatoryName = 'Aman Singh';
          updated.signatoryDesignation = 'HR Manager';
          updated.secondarySignatoryName = 'Managing Director';
        } else if (value === 'Termination Letter') {
          updated.candidateName = 'Aman Singh';
          updated.employeeId = '43521';
          updated.designation = 'Software Engineer';
          updated.department = 'Engineering';
          updated.terminationLastDay = '2026-08-31';
          updated.terminationNoticeStatus = '30 Days Notice Served';
          updated.terminationReason = 'End of Fixed-Term Contract';
          updated.refNumber = `MMSS/HR/TRM/2026/${Math.floor(1000 + Math.random() * 9000)}`;
          updated.signatoryName = 'Aman Singh';
          updated.signatoryDesignation = 'HR Manager';
        } else if (value === 'NDA Agreement') {
          updated.candidateName = 'Aman Singh';
          updated.ndaPartyType = 'Employee / Contractor';
          updated.ndaEffectiveDate = new Date().toISOString().split('T')[0];
          updated.ndaDuration = '2 Years Post Termination';
          updated.ndaJurisdiction = 'Noida, Uttar Pradesh';
          updated.refNumber = `MMSS/LEGAL/NDA/2026/${Math.floor(1000 + Math.random() * 9000)}`;
          updated.signatoryName = 'Aman Singh';
          updated.signatoryDesignation = 'HR Manager';
        } else if (value === 'Increment Letter') {
          updated.candidateName = 'Aman Singh';
          updated.employeeId = '43521';
          updated.designation = 'Software Engineer';
          updated.department = 'Engineering';
          updated.previousCTC = '₹ 6,00,000/- Per Annum';
          updated.revisedCTC = '₹ 7,50,000/- Per Annum';
          updated.incrementPercentage = '25% Hike (₹ 1,50,000/- PA)';
          updated.incrementEffectiveDate = '2026-04-01';
          updated.refNumber = 'MMSS/HR/INC/2026/1024';
          updated.signatoryName = 'Aman Singh';
          updated.signatoryDesignation = 'HR Manager';
        } else if (value === 'PPO Letter') {
          updated.candidateName = 'Aman Singh';
          updated.designation = 'Software Engineer';
          updated.department = 'Engineering';
          updated.ppoFullTimeRole = 'Software Engineer';
          updated.ppoCTC = '₹ 6,00,000/- Per Annum';
          updated.ppoJoiningDate = '2025-07-01';
          updated.ppoProbation = '6 Months';
          updated.ppoAcceptDeadline = '2025-05-25';
          updated.internshipStartDate = '2025-01-10';
          updated.internshipEndDate = '2025-05-08';
          updated.reportingManager = 'Engineering Manager';
          updated.signatoryName = 'Aman Singh';
          updated.signatoryDesignation = 'HR Manager';
        } else if (value === 'Quotation') {
          updated.quotationNo = 'A000029';
          updated.quotationDate = '2026-07-29';
          updated.validTillDate = '2026-08-08';
          updated.quotationProjectTitle = 'Hellobites';
          updated.quotationProjectSub = 'Admin Panel, Website, Product Listing with SEO, Database, web Deployment, E-mail configuration';
          updated.quotationFromCompany = 'Mind Manthan IT Solutions';
          updated.quotationFromAddress = 'A90, A Block, Sector 4, Noida, Uttar Pradesh 201301, Noida, Uttar Pradesh, India - 201301';
          updated.quotationForClient = 'Hello Bites';
          updated.quotationForAddress = '15E/3, Shri Ram Marg, Street No. 3 Maujpur, North East, Delhi - 110053, New Delhi, Delhi, India - 110053';
          updated.quotationItemCode = 'Hellobite028';
          updated.quotationQuantity = '1';
          updated.quotationRate = '20000';
          updated.quotationMobile = '+91 92772 67732';
          updated.quotationEmail = 'info@mindmanthansoftwaresolutions.com';
        } else if (value === 'Salary Slip') {
          updated.candidateName = 'Aman Singh';
          updated.employeeId = '43521';
          updated.joiningDate = '2020-06-30';
          updated.payPeriod = 'March 2024';
          updated.payDate = '2024-03-29';
          updated.paidDays = '31';
          updated.lopDays = '0';
          updated.pfAccountNumber = 'AA/AAA/9999999/99G/9899999';
          updated.uan = '111111111111';
          updated.designation = 'Software Engineer';
          updated.department = 'Engineering';
          updated.earningBasic = 43750;
          updated.earningHra = 21875;
          updated.earningConveyance = 6000;
          updated.earningChildren = 4000;
          updated.earningFixed = 6625;
          updated.deductionEpf = 5250;
          updated.deductionProfTax = 0;
        } else if (value === 'Internship Certificate') {
          updated.candidateName = 'Aman Singh';
          updated.designation = 'Full Stack Web Development Intern';
          updated.department = 'Software Development';
          updated.internshipStartDate = '2025-01-10';
          updated.internshipEndDate = '2025-05-08';
          updated.certificateId = 'MMSS/INT/CERT/2026/0528';
          updated.candidateGender = 'Male';
          updated.signatoryName = 'Aman Singh';
          updated.signatoryDesignation = 'HR Manager';
          updated.certAppreciationText = 'We appreciate your valuable contributions to our team.';
          updated.certDescription = 'During the internship, {pronounSubject} demonstrated dedication, enthusiasm, and a strong commitment to learning.';
          updated.certClosingText = 'We wish {pronounObject} all the best for {pronounPossessive} future endeavors!';
        } else {
          updated.candidateName = 'Aman Singh';
          updated.designation = 'Software Engineer';
          updated.department = 'Engineering';
          updated.ctcOffered = '₹ 6,00,000/- Per Annum';
          updated.probationPeriod = '6 Months';
          updated.refNumber = 'MMSS/HR/OL/2025/1478';
          updated.letterSubject = 'Subject: Offer of Employment';
          updated.letterIntro = 'We are pleased to offer you the position of {designation} at {companyName}. We were impressed with your skills and experience, and we believe that you will be a valuable addition to our team.';
          updated.letterClosing = 'Please sign and return a copy of this letter as a token of your acceptance of this offer. We look forward to welcoming you to the {companyName} family!';
        }
      }
      return updated;
    });
  };

  const resetForm = () => {
    setFormData({
      ...DEFAULTS,
      refNumber: `MMSS/HR/OL/2025/${Math.floor(1000 + Math.random() * 9000)}`
    });
    setErrorMessage('');
  };

  // Bulletproof client-side multi-page PDF generation
  const generatePDF = async () => {
    const isQuotation = formData.letterType === 'Quotation';
    const isCertificate = formData.letterType === 'Internship Certificate';
    const isAward = formData.letterType === 'Employee Award Certificate';
    const isPayslip = formData.letterType === 'Salary Slip';
    const isIncrement = formData.letterType === 'Increment Letter';
    const isPPO = formData.letterType === 'PPO Letter';
    const isNDA = formData.letterType === 'NDA Agreement';
    const isTermination = formData.letterType === 'Termination Letter';
    const isDisciplinary = formData.letterType === 'Disciplinary Letter';
    const isExperience = formData.letterType === 'Experience Letter';
    const isLandscape = isCertificate || isAward;

    const nameToCheck = isQuotation ? formData.quotationForClient : formData.candidateName;
    if (!nameToCheck || !nameToCheck.trim()) {
      setErrorMessage(isQuotation ? "Please enter the Client's Name (Quotation For)." : "Please enter the Candidate's Name.");
      return;
    }

    // Uniqueness Check Guard
    const currentNum = (isCertificate || isAward) ? formData.certificateId : isQuotation ? formData.quotationNo : formData.refNumber;
    const isAlreadyUsed = currentNum && registeredRecords.some(r => r.trim().toLowerCase() === currentNum.trim().toLowerCase());
    if (isAlreadyUsed) {
      const proceed = window.confirm(`⚠️ WARNING: ${(isCertificate || isAward) ? 'Certificate ID' : isQuotation ? 'Quotation No' : 'Reference Number'} "${currentNum}" is ALREADY REGISTERED in Google Sheets!\n\nAre you sure you want to download a duplicate?`);
      if (!proceed) return;
    }

    setErrorMessage('');
    setIsGenerating(true);

    try {
      if (isQuotation) {
        const quotationPages = document.querySelectorAll('.printable-quotation-page');
        if (!quotationPages || quotationPages.length === 0) throw new Error('Quotation pages not found');

        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        for (let i = 0; i < quotationPages.length; i++) {
          if (i > 0) pdf.addPage();
          const canvas = await html2canvas(quotationPages[i], {
            scale: 2.2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
            width: 794,
            height: 1123,
          });
          const imgData = canvas.toDataURL('image/png');
          pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, undefined, 'FAST');
        }

        const cleanName = (formData.quotationForClient || 'Client').trim().replace(/[^a-zA-Z0-9]/g, '_');
        const filename = `Quotation_${formData.quotationNo || 'Q1'}_${cleanName}.pdf`;
        const pdfBase64 = pdf.output('datauristring');
        pdf.save(filename);
        markNumberAsRegistered(formData.quotationNo);
        logToSheets(formData, pdfBase64, filename);
        return;
      }

      const page1Element = document.getElementById('printable-page-1');
      if (!page1Element) throw new Error('Printable page 1 not found');

      // Capture Page 1
      const canvas1 = await html2canvas(page1Element, {
        scale: 2.2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: isLandscape ? 1123 : 794,
        height: isLandscape ? 794 : 1123,
      });
      const imgData1 = canvas1.toDataURL('image/png');

      let imgData2 = null;
      if (!isLandscape && !isPayslip && !isIncrement && !isPPO && !isTermination && !isDisciplinary && !isExperience) {
        const page2Element = document.getElementById('printable-page-2');
        if (page2Element) {
          const canvas2 = await html2canvas(page2Element, {
            scale: 2.2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
            width: 794,
            height: 1123,
          });
          imgData2 = canvas2.toDataURL('image/png');
        }
      }

      // Create PDF in A4 format
      const pdf = new jsPDF({
        orientation: isLandscape ? 'landscape' : 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = isLandscape ? 297 : 210;
      const imgHeight = isLandscape ? 210 : 297;

      // Add Page 1
      pdf.addImage(imgData1, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
      
      // Add Page 2
      if (!isLandscape && !isPayslip && !isIncrement && !isPPO && !isTermination && !isDisciplinary && !isExperience && imgData2) {
        pdf.addPage();
        pdf.addImage(imgData2, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
      }

      const cleanName = formData.candidateName.trim().replace(/[^a-zA-Z0-9]/g, '_');
      const docPrefix = isCertificate ? 'Certificate' : isAward ? 'AwardCertificate' : isPayslip ? 'Payslip' : isIncrement ? 'IncrementLetter' : isNDA ? 'NDA_Agreement' : isTermination ? 'TerminationLetter' : isDisciplinary ? 'DisciplinaryWarning' : isPPO ? 'PPO' : isExperience ? 'ExperienceLetter' : 'Letter';
      const filename = `${docPrefix}_MindManthan_${cleanName}.pdf`;
      const pdfBase64 = pdf.output('datauristring');
      pdf.save(filename);

      // Register used number locally
      const activeNum = (isCertificate || isAward) ? formData.certificateId : formData.refNumber;
      markNumberAsRegistered(activeNum);

      // Log to Google Sheets
      logToSheets(formData, pdfBase64, filename);

    } catch (err) {
      console.error('Failed to generate PDF:', err);
      setErrorMessage('An error occurred during PDF generation. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <AccessModal 
        theme={theme}
        toggleTheme={toggleTheme}
        companyName={formData.companyName}
        passcode={passcode}
        setPasscode={setPasscode}
        authError={authError}
        setAuthError={setAuthError}
        handleLogin={handleLogin}
      />
    );
  }

  const isCertificate = formData.letterType === 'Internship Certificate';
  const isAward = formData.letterType === 'Employee Award Certificate';
  const isPayslip = formData.letterType === 'Salary Slip';
  const isQuotation = formData.letterType === 'Quotation';
  const isPPO = formData.letterType === 'PPO Letter';
  const isIncrement = formData.letterType === 'Increment Letter';
  const isNDA = formData.letterType === 'NDA Agreement';
  const isTermination = formData.letterType === 'Termination Letter';
  const isDisciplinary = formData.letterType === 'Disciplinary Letter';
  const isExperience = formData.letterType === 'Experience Letter';

  const isRefDuplicate = formData.refNumber && registeredRecords.some(r => r.trim().toLowerCase() === formData.refNumber.trim().toLowerCase());
  const isCertDuplicate = formData.certificateId && registeredRecords.some(r => r.trim().toLowerCase() === formData.certificateId.trim().toLowerCase());
  const isQuotDuplicate = formData.quotationNo && registeredRecords.some(r => r.trim().toLowerCase() === formData.quotationNo.trim().toLowerCase());

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Header 
        theme={theme}
        toggleTheme={toggleTheme}
        generatePDF={generatePDF}
        isGenerating={isGenerating}
      />

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
            <div className="error-banner">
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="sidebar-scroll">
            
            {/* Document Selection */}
            <div className="form-group">
              <label htmlFor="letterType">Document Type</label>
              <select 
                id="letterType" 
                name="letterType" 
                value={formData.letterType}
                onChange={handleInputChange}
                className="input-field"
                style={{ fontWeight: '600' }}
              >
                <option value="Offer Letter">Offer Letter</option>
                <option value="Joining Letter">Joining Letter</option>
                <option value="Increment Letter">Increment Letter (Salary Revision)</option>
                <option value="Disciplinary Letter">Disciplinary Letter (Warning / Show Cause)</option>
                <option value="Employee Award Certificate">Employee Award Certificate (Month/Year)</option>
                <option value="Termination Letter">Termination Letter (Notice of Separation)</option>
                <option value="NDA Agreement">NDA Agreement (Non-Disclosure)</option>
                <option value="PPO Letter">PPO Letter (Pre-Placement Offer)</option>
                <option value="Internship Certificate">Internship Certificate</option>
                <option value="Salary Slip">Salary Slip (Payslip)</option>
                <option value="Quotation">Quotation (Commercial Offer)</option>
                <option value="Experience Letter">Experience Letter</option>
              </select>
            </div>

            {/* Section 1: Candidate / Recipient Info */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '700',
                marginBottom: '0.75rem',
                color: 'var(--primary-500)',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '0.25rem'
              }}>
                <User size={16} /> {isQuotation ? 'Client Information' : isNDA ? 'Receiving Party Details' : isAward ? 'Honoree Details' : 'Candidate / Employee Details'}
              </div>

              {isQuotation ? (
                <>
                  <div className="form-group">
                    <label htmlFor="quotationForClient">Client / Company Name</label>
                    <input 
                      type="text" 
                      id="quotationForClient" 
                      name="quotationForClient"
                      value={formData.quotationForClient}
                      onChange={handleInputChange}
                      placeholder="e.g. Hello Bites"
                      className="input-field"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="quotationForAddress">Client Address</label>
                    <textarea 
                      id="quotationForAddress" 
                      name="quotationForAddress"
                      value={formData.quotationForAddress}
                      onChange={handleInputChange}
                      placeholder="Client full billing address..."
                      className="input-field"
                      rows={2}
                      style={{ resize: 'vertical', minHeight: '50px', fontSize: '0.85rem' }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="candidateName">{isNDA ? 'Receiving Party / Counterparty Name' : isAward ? 'Honoree Employee Full Name' : 'Employee / Candidate Full Name'}</label>
                    <input 
                      type="text" 
                      id="candidateName" 
                      name="candidateName"
                      value={formData.candidateName}
                      onChange={handleInputChange}
                      placeholder="e.g. Aman Singh"
                      className="input-field"
                    />
                  </div>

                  {(isIncrement || isTermination || isAward || isDisciplinary || isExperience) && (
                    <div className="form-group">
                      <label htmlFor="employeeId">Employee ID</label>
                      <input 
                        type="text" 
                        id="employeeId" 
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleInputChange}
                        placeholder="e.g. 43521"
                        className="input-field"
                      />
                    </div>
                  )}

                  {!isCertificate && !isPayslip && !isAward && (
                    <div className="form-group">
                      <label htmlFor="candidateAddress">Full Address</label>
                      <textarea 
                        id="candidateAddress" 
                        name="candidateAddress"
                        value={formData.candidateAddress}
                        onChange={handleInputChange}
                        placeholder="House No, Street, City, State - Pincode"
                        className="input-field"
                        rows={2}
                        style={{ resize: 'vertical', minHeight: '50px', fontSize: '0.85rem' }}
                      />
                    </div>
                  )}

                  {!isCertificate && !isAward && (
                    <div className="input-row">
                      <div className="form-group">
                        <label htmlFor="candidateEmail">Email Address</label>
                        <input 
                          type="email" 
                          id="candidateEmail" 
                          name="candidateEmail"
                          value={formData.candidateEmail}
                          onChange={handleInputChange}
                          placeholder="candidate@email.com"
                          className="input-field"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="candidateMobile">Mobile Number</label>
                        <input 
                          type="text" 
                          id="candidateMobile" 
                          name="candidateMobile"
                          value={formData.candidateMobile}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="input-field"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Section 2.1: Disciplinary Letter Inputs */}
            {isDisciplinary && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  color: '#b91c1c',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '0.25rem'
                }}>
                  <AlertTriangle size={16} /> Disciplinary Warning Details
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="discType">Notice Type</label>
                    <select 
                      id="discType" 
                      name="discType"
                      value={formData.discType}
                      onChange={handleInputChange}
                      className="input-field"
                      style={{ fontWeight: 600 }}
                    >
                      <option value="First Written Warning">First Written Warning</option>
                      <option value="Second Written Warning">Second Written Warning</option>
                      <option value="Final Written Warning">Final Written Warning</option>
                      <option value="Show Cause Notice">Show Cause Notice</option>
                      <option value="Performance & Conduct Notice">Performance &amp; Conduct Notice</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="discSubject">Incident / Violation Subject</label>
                    <input 
                      type="text" 
                      id="discSubject" 
                      name="discSubject"
                      value={formData.discSubject}
                      onChange={handleInputChange}
                      placeholder="e.g. Unexcused Absences / Misconduct"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="designation">Designation</label>
                    <input 
                      type="text" 
                      id="designation" 
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      placeholder="e.g. Software Engineer"
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
                      placeholder="e.g. Engineering"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="discIncidentDates">Incident Date(s) / Period</label>
                  <input 
                    type="text" 
                    id="discIncidentDates" 
                    name="discIncidentDates"
                    value={formData.discIncidentDates}
                    onChange={handleInputChange}
                    placeholder="e.g. August 05 - August 10, 2026"
                    className="input-field"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="discViolationDetails">Details of Violation / Misconduct</label>
                  <textarea 
                    id="discViolationDetails" 
                    name="discViolationDetails"
                    value={formData.discViolationDetails}
                    onChange={handleInputChange}
                    placeholder="Details of breach..."
                    className="input-field"
                    rows={3}
                    style={{ resize: 'vertical', fontSize: '0.8rem' }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="discActionRequired">Corrective Action Required</label>
                  <textarea 
                    id="discActionRequired" 
                    name="discActionRequired"
                    value={formData.discActionRequired}
                    onChange={handleInputChange}
                    placeholder="Required actions..."
                    className="input-field"
                    rows={2}
                    style={{ resize: 'vertical', fontSize: '0.8rem' }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="discConsequences">Consequences of Non-Compliance</label>
                  <textarea 
                    id="discConsequences" 
                    name="discConsequences"
                    value={formData.discConsequences}
                    onChange={handleInputChange}
                    placeholder="Failure to improve may lead to..."
                    className="input-field"
                    rows={2}
                    style={{ resize: 'vertical', fontSize: '0.8rem' }}
                  />
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="issueDate">Issue Date</label>
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
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <label htmlFor="refNumber">Notice Ref No</label>
                      <UniquenessAlert 
                        fieldName="Notice Ref"
                        isDuplicate={isRefDuplicate}
                        value={formData.refNumber}
                        onGenerateUnique={generateUniqueRefNumber}
                      />
                    </div>
                    <input 
                      type="text" 
                      id="refNumber" 
                      name="refNumber"
                      value={formData.refNumber}
                      onChange={handleInputChange}
                      placeholder="MMSS/HR/DISC/2026/0491"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Section 2.2: Award Certificate Inputs */}
            {isAward && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  color: '#d97706',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '0.25rem'
                }}>
                  <Trophy size={16} /> Award &amp; Citation Parameters
                </div>

                <div className="form-group">
                  <label htmlFor="awardType">Award Category / Title</label>
                  <select 
                    id="awardType" 
                    name="awardType"
                    value={formData.awardType}
                    onChange={handleInputChange}
                    className="input-field"
                    style={{ fontWeight: 600 }}
                  >
                    <option value="EMPLOYEE OF THE MONTH">EMPLOYEE OF THE MONTH</option>
                    <option value="EMPLOYEE OF THE YEAR">EMPLOYEE OF THE YEAR</option>
                    <option value="STAR PERFORMER OF THE QUARTER">STAR PERFORMER OF THE QUARTER</option>
                    <option value="EXCELLENCE IN INNOVATION">EXCELLENCE IN INNOVATION</option>
                    <option value="LEADERSHIP & DEDICATION AWARD">LEADERSHIP &amp; DEDICATION AWARD</option>
                  </select>
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="awardPeriod">Award Month / Period</label>
                    <input 
                      type="text" 
                      id="awardPeriod" 
                      name="awardPeriod"
                      value={formData.awardPeriod}
                      onChange={handleInputChange}
                      placeholder="e.g. August 2026 or Year 2026"
                      className="input-field"
                    />
                  </div>

                  <div className="form-group">
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <label htmlFor="certificateId">Certificate ID</label>
                      <UniquenessAlert 
                        fieldName="Certificate ID"
                        isDuplicate={isCertDuplicate}
                        value={formData.certificateId}
                        onGenerateUnique={generateUniqueCertificateId}
                      />
                    </div>
                    <input 
                      type="text" 
                      id="certificateId" 
                      name="certificateId"
                      value={formData.certificateId}
                      onChange={handleInputChange}
                      placeholder="MMSS/AWD/CERT/2026/0894"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="designation">Designation</label>
                    <input 
                      type="text" 
                      id="designation" 
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      placeholder="e.g. Senior Software Engineer"
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
                      placeholder="e.g. Engineering"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="awardCitation">Citation / Reason Text</label>
                  <textarea 
                    id="awardCitation" 
                    name="awardCitation"
                    value={formData.awardCitation}
                    onChange={handleInputChange}
                    placeholder="In recognition of outstanding performance..."
                    className="input-field"
                    rows={3}
                    style={{ resize: 'vertical', fontSize: '0.8rem' }}
                  />
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="secondarySignatoryName">2nd Signatory (Director)</label>
                    <input 
                      type="text" 
                      id="secondarySignatoryName" 
                      name="secondarySignatoryName"
                      value={formData.secondarySignatoryName || ''}
                      onChange={handleInputChange}
                      placeholder="Managing Director"
                      className="input-field"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="issueDate">Issue Date</label>
                    <input 
                      type="date" 
                      id="issueDate" 
                      name="issueDate"
                      value={formData.issueDate}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Section 2: Position & Offer Details */}
            {!isQuotation && !isIncrement && !isNDA && !isTermination && !isAward && !isDisciplinary && !isExperience && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  color: 'var(--primary-500)',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '0.25rem'
                }}>
                  <Briefcase size={16} /> Job &amp; Role Details
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="designation">Designation / Role</label>
                    <input 
                      type="text" 
                      id="designation" 
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      placeholder="e.g. Software Engineer"
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
                      placeholder="e.g. Engineering"
                      className="input-field"
                    />
                  </div>
                </div>

                {!isCertificate && !isPayslip && (
                  <>
                    <div className="input-row">
                      <div className="form-group">
                        <label htmlFor="ctcOffered">CTC / Package</label>
                        <input 
                          type="text" 
                          id="ctcOffered" 
                          name="ctcOffered"
                          value={formData.ctcOffered}
                          onChange={handleInputChange}
                          placeholder="₹ 6,00,000/- Per Annum"
                          className="input-field"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="probationPeriod">Probation Period</label>
                        <input 
                          type="text" 
                          id="probationPeriod" 
                          name="probationPeriod"
                          value={formData.probationPeriod}
                          onChange={handleInputChange}
                          placeholder="e.g. 6 Months"
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div className="input-row">
                      <div className="form-group">
                        <label htmlFor="issueDate">Issue Date</label>
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
                        <label htmlFor="startDate">Joining Date</label>
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
                        <label htmlFor="employmentType">Employment Type</label>
                        <select 
                          id="employmentType" 
                          name="employmentType"
                          value={formData.employmentType}
                          onChange={handleInputChange}
                          className="input-field"
                        >
                          <option value="Full-Time">Full-Time</option>
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
                          <option value="Hybrid">Hybrid</option>
                          <option value="Remote">Remote</option>
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
                        placeholder="Noida, Uttar Pradesh"
                        className="input-field"
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Section 2.3: Termination Letter Inputs */}
            {isTermination && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  color: '#dc2626',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '0.25rem'
                }}>
                  <UserX size={16} /> Separation &amp; Termination Details
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="designation">Designation</label>
                    <input 
                      type="text" 
                      id="designation" 
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      placeholder="e.g. Software Engineer"
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
                      placeholder="e.g. Engineering"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="terminationLastDay">Last Working Day</label>
                    <input 
                      type="date" 
                      id="terminationLastDay" 
                      name="terminationLastDay"
                      value={formData.terminationLastDay}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="terminationNoticeStatus">Notice Period Status</label>
                    <select 
                      id="terminationNoticeStatus" 
                      name="terminationNoticeStatus"
                      value={formData.terminationNoticeStatus}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="30 Days Notice Served">30 Days Notice Served</option>
                      <option value="1 Month Pay in Lieu of Notice">1 Month Pay in Lieu of Notice</option>
                      <option value="Immediate Termination">Immediate Termination</option>
                      <option value="Waived Off">Waived Off</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="terminationReason">Separation Reason / Type</label>
                  <select 
                    id="terminationReason" 
                    name="terminationReason"
                    value={formData.terminationReason}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="End of Fixed-Term Contract">End of Fixed-Term Contract</option>
                    <option value="Business Restructuring / Layoff">Business Restructuring / Layoff</option>
                    <option value="Mutual Separation Agreement">Mutual Separation Agreement</option>
                    <option value="Performance Non-Alignment">Performance Non-Alignment</option>
                  </select>
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="issueDate">Issue Date</label>
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
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <label htmlFor="refNumber">Ref Number</label>
                      <UniquenessAlert 
                        fieldName="Ref Number"
                        isDuplicate={isRefDuplicate}
                        value={formData.refNumber}
                        onGenerateUnique={generateUniqueRefNumber}
                      />
                    </div>
                    <input 
                      type="text" 
                      id="refNumber" 
                      name="refNumber"
                      value={formData.refNumber}
                      onChange={handleInputChange}
                      placeholder="MMSS/HR/TRM/2026/1098"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Section 2.3.5: Experience Letter Inputs */}
            {isExperience && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  color: 'var(--primary-500)',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '0.25rem'
                }}>
                  <Briefcase size={16} /> Work Experience &amp; Relieving Details
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="designation">Designation</label>
                    <input 
                      type="text" 
                      id="designation" 
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      placeholder="e.g. Software Engineer"
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
                      placeholder="e.g. Engineering"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="experienceStartDate">Experience Start Date</label>
                    <input 
                      type="date" 
                      id="experienceStartDate" 
                      name="experienceStartDate"
                      value={formData.experienceStartDate}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="experienceEndDate">Experience End Date</label>
                    <input 
                      type="date" 
                      id="experienceEndDate" 
                      name="experienceEndDate"
                      value={formData.experienceEndDate}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="issueDate">Issue Date</label>
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
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <label htmlFor="refNumber">Ref Number</label>
                      <UniquenessAlert 
                        fieldName="Ref Number"
                        isDuplicate={isRefDuplicate}
                        value={formData.refNumber}
                        onGenerateUnique={generateUniqueRefNumber}
                      />
                    </div>
                    <input 
                      type="text" 
                      id="refNumber" 
                      name="refNumber"
                      value={formData.refNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. MMSS/HR/EXP/2026/0482"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="experienceBody">Experience Details &amp; Body Text</label>
                  <textarea 
                    id="experienceBody" 
                    name="experienceBody"
                    value={formData.experienceBody}
                    onChange={handleInputChange}
                    placeholder="Enter experience letter description..."
                    className="input-field"
                    rows={8}
                    style={{ resize: 'vertical', minHeight: '140px', fontSize: '0.85rem', lineHeight: '1.4' }}
                  />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    Variables supported: <code>{`{candidateName}`}</code>, <code>{`{designation}`}</code>, <code>{`{department}`}</code>, <code>{`{experienceStartDate}`}</code>, <code>{`{experienceEndDate}`}</code>, <code>{`{companyName}`}</code>, <code>{`{pronounSubject}`}</code>, <code>{`{pronounObject}`}</code>, <code>{`{pronounPossessive}`}</code>, <code>{`{pronounSubjectCap}`}</code>, <code>{`{pronounPossessiveCap}`}</code>
                  </span>
                </div>
              </div>
            )}

            {/* Section 2.4: NDA Specific Form Fields */}
            {isNDA && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  color: 'var(--primary-500)',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '0.25rem'
                }}>
                  <Lock size={16} /> NDA Legal Parameters
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="ndaPartyType">Receiving Party Role</label>
                    <select 
                      id="ndaPartyType" 
                      name="ndaPartyType"
                      value={formData.ndaPartyType}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="Employee / Contractor">Employee / Contractor</option>
                      <option value="Intern / Trainee">Intern / Trainee</option>
                      <option value="Client / Vendor">Client / Vendor</option>
                      <option value="Business Partner">Business Partner</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="ndaEffectiveDate">Effective Date</label>
                    <input 
                      type="date" 
                      id="ndaEffectiveDate" 
                      name="ndaEffectiveDate"
                      value={formData.ndaEffectiveDate}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="ndaDuration">Confidentiality Term</label>
                    <input 
                      type="text" 
                      id="ndaDuration" 
                      name="ndaDuration"
                      value={formData.ndaDuration}
                      onChange={handleInputChange}
                      placeholder="2 Years Post Termination"
                      className="input-field"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="ndaJurisdiction">Jurisdiction</label>
                    <input 
                      type="text" 
                      id="ndaJurisdiction" 
                      name="ndaJurisdiction"
                      value={formData.ndaJurisdiction}
                      onChange={handleInputChange}
                      placeholder="Noida, Uttar Pradesh"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="issueDate">Issue Date</label>
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
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <label htmlFor="refNumber">Agreement Ref No</label>
                      <UniquenessAlert 
                        fieldName="Agreement Ref"
                        isDuplicate={isRefDuplicate}
                        value={formData.refNumber}
                        onGenerateUnique={generateUniqueRefNumber}
                      />
                    </div>
                    <input 
                      type="text" 
                      id="refNumber" 
                      name="refNumber"
                      value={formData.refNumber}
                      onChange={handleInputChange}
                      placeholder="MMSS/LEGAL/NDA/2026/0812"
                      className="input-field"
                    />
                  </div>
                </div>

                {/* NDA Part I Clauses (Page 1) */}
                <div style={{ marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-500)' }}>
                      📜 Part I Clauses (Page 1)
                    </div>
                    <button 
                      type="button" 
                      onClick={handleAddPart1Clause}
                      style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                    >
                      + Add Clause
                    </button>
                  </div>
                  
                  {(formData.ndaPart1Clauses || []).map((clause, idx) => (
                    <div key={idx} style={{ backgroundColor: 'var(--bg-card)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                        <input 
                          type="text" 
                          value={clause.title || ''} 
                          onChange={(e) => handleUpdatePart1Clause(idx, 'title', e.target.value)}
                          placeholder="Clause Title (e.g. 1. Definition)"
                          style={{ flex: 1, fontWeight: 700, fontSize: '0.78rem', background: 'none', border: 'none', color: 'var(--text-primary)', outline: 'none' }}
                        />
                        <button 
                          type="button" 
                          onClick={() => handleRemovePart1Clause(idx)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.75rem', padding: '0 4px' }}
                          title="Remove clause"
                        >
                          ✕
                        </button>
                      </div>
                      <textarea 
                        value={clause.content || ''} 
                        onChange={(e) => handleUpdatePart1Clause(idx, 'content', e.target.value)}
                        placeholder="Clause description content..."
                        className="input-field" 
                        rows={2} 
                        style={{ fontSize: '0.78rem', resize: 'vertical' }}
                      />
                    </div>
                  ))}
                </div>

                {/* NDA Part II Clauses (Page 2) */}
                <div style={{ marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-500)' }}>
                      📜 Part II Clauses (Page 2)
                    </div>
                    <button 
                      type="button" 
                      onClick={handleAddPart2Clause}
                      style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--primary-500)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                    >
                      + Add Clause
                    </button>
                  </div>

                  {(formData.ndaPart2Clauses || []).map((clause, idx) => (
                    <div key={idx} style={{ backgroundColor: 'var(--bg-card)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                        <input 
                          type="text" 
                          value={clause.title || ''} 
                          onChange={(e) => handleUpdatePart2Clause(idx, 'title', e.target.value)}
                          placeholder="Clause Title (e.g. 4. Exclusions)"
                          style={{ flex: 1, fontWeight: 700, fontSize: '0.78rem', background: 'none', border: 'none', color: 'var(--text-primary)', outline: 'none' }}
                        />
                        <button 
                          type="button" 
                          onClick={() => handleRemovePart2Clause(idx)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.75rem', padding: '0 4px' }}
                          title="Remove clause"
                        >
                          ✕
                        </button>
                      </div>
                      <textarea 
                        value={clause.content || ''} 
                        onChange={(e) => handleUpdatePart2Clause(idx, 'content', e.target.value)}
                        placeholder="Clause description content..."
                        className="input-field" 
                        rows={2} 
                        style={{ fontSize: '0.78rem', resize: 'vertical' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 2.5: Increment Letter Inputs */}
            {isIncrement && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  color: 'var(--primary-500)',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '0.25rem'
                }}>
                  <TrendingUp size={16} /> Salary Revision Details
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="designation">Designation</label>
                    <input 
                      type="text" 
                      id="designation" 
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      placeholder="e.g. Software Engineer"
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
                      placeholder="e.g. Engineering"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="previousCTC">Previous CTC</label>
                    <input 
                      type="text" 
                      id="previousCTC" 
                      name="previousCTC"
                      value={formData.previousCTC}
                      onChange={handleInputChange}
                      placeholder="₹ 6,00,000/- Per Annum"
                      className="input-field"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="revisedCTC">Revised CTC</label>
                    <input 
                      type="text" 
                      id="revisedCTC" 
                      name="revisedCTC"
                      value={formData.revisedCTC}
                      onChange={handleInputChange}
                      placeholder="₹ 7,50,000/- Per Annum"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="incrementPercentage">Hike / Increase</label>
                    <input 
                      type="text" 
                      id="incrementPercentage" 
                      name="incrementPercentage"
                      value={formData.incrementPercentage}
                      onChange={handleInputChange}
                      placeholder="25% Hike"
                      className="input-field"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="incrementEffectiveDate">Effective Date</label>
                    <input 
                      type="date" 
                      id="incrementEffectiveDate" 
                      name="incrementEffectiveDate"
                      value={formData.incrementEffectiveDate}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="issueDate">Issue Date</label>
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
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <label htmlFor="refNumber">Ref Number</label>
                      <UniquenessAlert 
                        fieldName="Ref Number"
                        isDuplicate={isRefDuplicate}
                        value={formData.refNumber}
                        onGenerateUnique={generateUniqueRefNumber}
                      />
                    </div>
                    <input 
                      type="text" 
                      id="refNumber" 
                      name="refNumber"
                      value={formData.refNumber}
                      onChange={handleInputChange}
                      placeholder="MMSS/HR/INC/2026/1024"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Section 2.6: Certificate Settings */}
            {isCertificate && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  color: 'var(--primary-500)',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '0.25rem'
                }}>
                  <Award size={16} /> Certificate Settings
                </div>

                <div className="form-group">
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <label htmlFor="certificateId">Certificate ID</label>
                    <UniquenessAlert 
                      fieldName="Certificate ID"
                      isDuplicate={isCertDuplicate}
                      value={formData.certificateId}
                      onGenerateUnique={generateUniqueCertificateId}
                    />
                  </div>
                  <input 
                    type="text" 
                    id="certificateId" 
                    name="certificateId"
                    value={formData.certificateId}
                    onChange={handleInputChange}
                    placeholder="MMSS/INT/CERT/2026/0528"
                    className="input-field"
                  />
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="internshipStartDate">Internship Start</label>
                    <input 
                      type="date" 
                      id="internshipStartDate" 
                      name="internshipStartDate"
                      value={formData.internshipStartDate}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="internshipEndDate">Internship End</label>
                    <input 
                      type="date" 
                      id="internshipEndDate" 
                      name="internshipEndDate"
                      value={formData.internshipEndDate}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="candidateGender">Candidate Gender</label>
                  <select 
                    id="candidateGender" 
                    name="candidateGender"
                    value={formData.candidateGender}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            )}

            {/* Section 2.7: Quotation Specific Form Fields */}
            {isQuotation && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  color: 'var(--primary-500)',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '0.25rem'
                }}>
                  <IndianRupee size={16} /> Quotation Commercials
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="quotationDate">Quotation Date</label>
                    <input 
                      type="date" 
                      id="quotationDate" 
                      name="quotationDate"
                      value={formData.quotationDate || ''}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="validTillDate">Valid Till Date</label>
                    <input 
                      type="date" 
                      id="validTillDate" 
                      name="validTillDate"
                      value={formData.validTillDate || ''}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <label htmlFor="quotationNo">Quotation No #</label>
                      <UniquenessAlert 
                        fieldName="Quotation No"
                        isDuplicate={isQuotDuplicate}
                        value={formData.quotationNo}
                        onGenerateUnique={generateUniqueQuotationNo}
                      />
                    </div>
                    <input 
                      type="text" 
                      id="quotationNo" 
                      name="quotationNo"
                      value={formData.quotationNo}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="quotationItemCode">Item / Project Code</label>
                    <input 
                      type="text" 
                      id="quotationItemCode" 
                      name="quotationItemCode"
                      value={formData.quotationItemCode}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="quotationQuantity">Quantity</label>
                    <input 
                      type="number" 
                      id="quotationQuantity" 
                      name="quotationQuantity"
                      value={formData.quotationQuantity}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="quotationRate">Rate (INR ₹)</label>
                    <input 
                      type="number" 
                      id="quotationRate" 
                      name="quotationRate"
                      value={formData.quotationRate}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="quotationMobile">Enquiry Mobile Number</label>
                    <input 
                      type="text" 
                      id="quotationMobile" 
                      name="quotationMobile"
                      value={formData.quotationMobile || ''}
                      onChange={handleInputChange}
                      placeholder="+91 92772 67732"
                      className="input-field"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="quotationEmail">Enquiry Email ID</label>
                    <input 
                      type="email" 
                      id="quotationEmail" 
                      name="quotationEmail"
                      value={formData.quotationEmail || ''}
                      onChange={handleInputChange}
                      placeholder="info@mindmanthansoftwaresolutions.com"
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="signatureText">Signatory Name (Cursive Font)</label>
                  <input 
                    type="text" 
                    id="signatureText" 
                    name="signatureText"
                    value={formData.signatureText || ''}
                    onChange={handleInputChange}
                    placeholder="Kartik"
                    className="input-field"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="quotationSignatureImg">Upload Signature Image (Optional)</label>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData(prev => ({ ...prev, quotationSignatureImg: reader.result }));
                          showToast('✍️ Signature image uploaded!', 'success');
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="input-field"
                    style={{ fontSize: '0.8rem', padding: '0.35rem' }}
                  />
                  {formData.quotationSignatureImg && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.3rem' }}>
                      <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>✓ Signature Image Active</span>
                      <button 
                        type="button" 
                        onClick={() => setFormData(prev => ({ ...prev, quotationSignatureImg: null }))}
                        style={{ fontSize: '0.68rem', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                <QuotationManager 
                  quotationScopeText={formData.quotationScopeText}
                  onScopeTextChange={(val) => setFormData(prev => ({ ...prev, quotationScopeText: val }))}
                  handleAddScopeItem={handleAddScopeItem}
                  handleAddSection={handleAddSection}
                  handleAddPageBreak={handleAddPageBreak}
                  handleEditLine={handleEditLine}
                  handleDeleteLine={handleDeleteLine}
                />
              </div>
            )}

            {/* Section 3: Manager & Reference - Letter only */}
            {!isQuotation && !isPayslip && !isAward && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  color: 'var(--primary-500)',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '0.25rem'
                }}>
                  <ShieldCheck size={16} /> Reference &amp; Signatory
                </div>

                {!isCertificate && !isIncrement && !isNDA && !isTermination && !isDisciplinary && !isExperience && (
                  <div className="input-row">
                    <div className="form-group">
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <label htmlFor="refNumber">Reference Number</label>
                        <UniquenessAlert 
                          fieldName="Ref Number"
                          isDuplicate={isRefDuplicate}
                          value={formData.refNumber}
                          onGenerateUnique={generateUniqueRefNumber}
                        />
                      </div>
                      <input 
                        type="text" 
                        id="refNumber" 
                        name="refNumber"
                        value={formData.refNumber}
                        onChange={handleInputChange}
                        placeholder="MMSS/HR/OL/2025/1478"
                        className="input-field"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="reportingManager">Reporting Manager</label>
                      <input 
                        type="text" 
                        id="reportingManager" 
                        name="reportingManager"
                        value={formData.reportingManager}
                        onChange={handleInputChange}
                        placeholder="e.g. Engineering Manager"
                        className="input-field"
                      />
                    </div>
                  </div>
                )}

                <div className="input-row">
                  <div className="form-group">
                    <label htmlFor="signatoryName">Signatory Name</label>
                    <input 
                      type="text" 
                      id="signatoryName" 
                      name="signatoryName"
                      value={formData.signatoryName}
                      onChange={handleInputChange}
                      placeholder="e.g. Aman Singh"
                      className="input-field"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="signatoryDesignation">Signatory Title</label>
                    <input 
                      type="text" 
                      id="signatoryDesignation" 
                      name="signatoryDesignation"
                      value={formData.signatoryDesignation}
                      onChange={handleInputChange}
                      placeholder="e.g. HR Manager"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button 
                className="btn btn-secondary" 
                onClick={resetForm}
                style={{ flex: 1 }}
              >
                <RotateCcw size={16} /> Reset
              </button>
            </div>

          </div>
        </aside>

        {/* Right Panel: Live Document Preview */}
        <main className="preview-container">
          <div className="preview-toolbar">
            <span className="preview-title">
              Live Preview ({formData.letterType})
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            {isQuotation ? (
              <QuotationPages formData={formData} />
            ) : isCertificate ? (
              <div className="paper-page landscape cert-modern">
                <CertTemplate formData={formData} />
              </div>
            ) : isAward ? (
              <div className="paper-page landscape cert-modern">
                <AwardCertTemplate formData={formData} />
              </div>
            ) : isPayslip ? (
              <div className="paper-page payslip">
                <PayslipTemplate formData={formData} />
              </div>
            ) : isIncrement ? (
              <div className="paper-page">
                <IncrementTemplate formData={formData} />
              </div>
            ) : isTermination ? (
              <div className="paper-page">
                <TerminationTemplate formData={formData} />
              </div>
            ) : isDisciplinary ? (
              <div className="paper-page">
                <DisciplinaryTemplate formData={formData} />
              </div>
            ) : isNDA ? (
              <>
                <div className="paper-page">
                  <NDAPage1Template formData={formData} />
                </div>
                <div className="paper-page">
                  <NDAPage2Template formData={formData} />
                </div>
              </>
            ) : isPPO ? (
              <div className="paper-page ppo">
                <PPOTemplate formData={formData} />
              </div>
            ) : isExperience ? (
              <div className="paper-page">
                <ExperienceTemplate formData={formData} />
              </div>
            ) : (
              <>
                <div className="paper-page">
                  <Page1Template formData={formData} />
                </div>
                <div className="paper-page">
                  <Page2Template formData={formData} />
                </div>
              </>
            )}
          </div>

          {/* Hidden Print Container for PDF Export */}
          <div id="pdf-printable-area" style={{ position: 'absolute', left: '-9999px', top: '-9999px', overflow: 'hidden' }}>
            {isQuotation ? (
              <QuotationPages formData={formData} isPrintableContainer={true} />
            ) : isCertificate ? (
              <div id="printable-page-1" className="paper-page landscape cert-modern">
                <CertTemplate formData={formData} />
              </div>
            ) : isAward ? (
              <div id="printable-page-1" className="paper-page landscape cert-modern">
                <AwardCertTemplate formData={formData} />
              </div>
            ) : isPayslip ? (
              <div id="printable-page-1" className="paper-page payslip">
                <PayslipTemplate formData={formData} />
              </div>
            ) : isIncrement ? (
              <div id="printable-page-1" className="paper-page">
                <IncrementTemplate formData={formData} />
              </div>
            ) : isTermination ? (
              <div id="printable-page-1" className="paper-page">
                <TerminationTemplate formData={formData} />
              </div>
            ) : isDisciplinary ? (
              <div id="printable-page-1" className="paper-page">
                <DisciplinaryTemplate formData={formData} />
              </div>
            ) : isNDA ? (
              <>
                <div id="printable-page-1" className="paper-page">
                  <NDAPage1Template formData={formData} />
                </div>
                <div id="printable-page-2" className="paper-page">
                  <NDAPage2Template formData={formData} />
                </div>
              </>
            ) : isPPO ? (
              <div id="printable-page-1" className="paper-page ppo">
                <PPOTemplate formData={formData} />
              </div>
            ) : isExperience ? (
              <div id="printable-page-1" className="paper-page">
                <ExperienceTemplate formData={formData} />
              </div>
            ) : (
              <>
                <div id="printable-page-1" className="paper-page">
                  <Page1Template formData={formData} />
                </div>
                <div id="printable-page-2" className="paper-page">
                  <Page2Template formData={formData} />
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      <Toast toast={toast} />
    </div>
  );
}

export default App;