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
  Lock,
  MapPin,
  IndianRupee,
  Check,
  Lightbulb,
  Shield,
  Users,
  Phone,
  Award
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import companyLogo from './assets/logo.png';
import './App.css';

// Default initial state matching all constraints requested by the user, now defaulted to candidate "Aman Singh" with matching reference layout values
const DEFAULTS = {
  candidateName: 'Aman Singh',
  candidateEmail: 'aman.singh@email.com',
  candidateAddress: '123, Green Park, Kushinagar, Uttar Pradesh - 274402',
  candidateMobile: '+91 98765 43210',
  ctcOffered: 'â¹ 6,00,000/- Per Annum',
  probationPeriod: '6 Months',
  designation: 'Software Engineer',
  department: 'Engineering',
  durationMonths: '6',
  issueDate: '2025-05-08',
  startDate: '2025-05-20',
  workingHours: '9:00 AM to 6:00 PM',
  reportingManager: 'Engineering Manager',
  managerDesignation: '',
  signatoryName: 'Aman Singh',
  signatoryDesignation: 'HR Manager',
  companyWebsite: 'www.mindmanthansoftwaresolutions.com',
  companyName: 'Mind Manthan Software Solutions',
  companyTagline: 'Innovate. Build. Elevate.',
  companyAddress: 'A90, Sector 4, Noida, Uttar Pradesh, 201301',
  refNumber: 'MMSS/HR/OL/2025/1478',
  signatureText: 'Aman Singh',
  workLocation: 'Noida, Uttar Pradesh',
  employmentType: 'Full-Time',
  workMode: 'Hybrid',
  rolesResponsibilities: 'During this {employmentType}, you will work on software development systems under the guidance of our engineering team. You will be expected to write clean, maintainable code, participate in team syncs, and adhere to project timelines and deliverables.',
  conductConfidentiality: 'Please note that as a participant in our program, you may have access to proprietary systems and business data. You agree to maintain absolute confidentiality regarding all company codes, projects, intellectual property, and client information during and after your association. Any breach of this confidentiality policy will result in immediate termination of your engagement and potential legal action.',
  stipendTerms: "This engagement's financial parameters are specified in the Offer Summary. Upon successful completion of your tenure and performance milestones, you will receive an official Certificate of Completion and a Letter of Recommendation.",
  corporateInfo: 'For more information regarding our company policies, technical divisions, and work standards, you can visit our official website at {companyWebsite} or write to our support desk.',
  letterType: 'Offer Letter',
  letterSubject: 'Subject: Offer of Employment',
  letterIntro: 'We are pleased to offer you the position of {designation} at {companyName}. We were impressed with your skills and experience, and we believe that you will be a valuable addition to our team.',
  letterClosing: 'Please sign and return a copy of this letter as a token of your acceptance of this offer. We look forward to welcoming you to the {companyName} family!',
  termsAndConditions: [
    "Your employment will be governed by the company's policies and procedures.",
    "You will be on probation for {probationPeriod} from your date of joining.",
    "Your performance will be reviewed periodically during your employment.",
    "You are requested to carry the original documents as mentioned in the Annexure at the time of joining.",
    "This offer is subject to your acceptance and verification of the information provided by you."
  ].join('\n'),
  internshipStartDate: '2025-01-10',
  internshipEndDate: '2025-05-08',
  certificateId: 'MMSS/INT/CERT/2026/0528',
  candidateGender: 'Male',
  certAppreciationText: 'We appreciate your valuable contributions to our team.',
  certDescription: 'During the internship, {pronounSubject} demonstrated dedication, enthusiasm, and a strong commitment to learning.',
  certClosingText: 'We wish {pronounObject} all the best for {pronounPossessive} future endeavors!',
  // Salary Slip (Payslip) Default parameters
  employeeId: '43521',
  joiningDate: '2020-06-30',
  payPeriod: 'March 2024',
  payDate: '2024-03-29',
  paidDays: '31',
  lopDays: '0',
  pfAccountNumber: 'AA/AAA/9999999/99G/9899999',
  uan: '111111111111',
  earningBasic: 43750,
  earningHra: 21875,
  earningConveyance: 6000,
  earningChildren: 4000,
  earningFixed: 6625,
  deductionEpf: 5250,
  deductionProfTax: 0,
  ytdBasic: 131250,
  ytdHra: 65625,
  ytdConveyance: 18000,
  ytdChildren: 12000,
  ytdFixed: 19875,
  ytdEpf: 15750,
  ytdProfTax: 1250,
  // PPO (Pre-Placement Offer) default fields
  ppoInternshipDuration: '6 Months',
  ppoFullTimeRole: 'Software Engineer',
  ppoCTC: '\u20b9 6,00,000/- Per Annum',
  ppoJoiningDate: '2025-07-01',
  ppoProbation: '6 Months',
  ppoAcceptDeadline: '2025-05-25',
  ppoTerms: [
    'This Pre-Placement Offer is contingent upon successful completion of your internship and a satisfactory performance review.',
    'Your full-time employment will be governed by the company policies and HR guidelines in force at the time of joining.',
    'You will be on probation for {ppoProbation} from your date of joining, during which your employment may be terminated with notice.',
    'Please confirm your acceptance of this offer in writing by {ppoAcceptDeadline}.',
    'This offer is non-transferable and is valid only for the candidate named above.'
  ].join('\n'),
  // Quotation Default parameters
  quotationNo: 'A000029',
  quotationDate: '2026-07-29',
  validTillDate: '2026-08-08',
  quotationMobile: '+91 70115 02461',
  quotationEmail: 'Info.mindmanthan@gmail.com',
  quotationProjectTitle: 'Hellobites',
  quotationProjectSub: 'Admin Panel, Website, Product Listing with SEO, Database, web Deployment, E-mail configuration',
  quotationFromCompany: 'Mind Manthan IT Solutions',
  quotationFromAddress: 'A90, A Block, Sector 4, Noida, Uttar Pradesh 201301, Noida, Uttar Pradesh, India - 201301',
  quotationForClient: 'Hello Bites',
  quotationForAddress: '15E/3, Shri Ram Marg, Street No. 3 Maujpur, North East, Delhi - 110053, New Delhi, Delhi, India - 110053',
  quotationItemCode: 'Hellobite028',
  quotationQuantity: '1',
  quotationRate: '20000',
  quotationScopeText: `[SECTION] Website Features
1. Home Page
• Modern Responsive Design
• Hero Banner Slider
• Featured Categories
• Popular Products
• Offers & Promotions
• About Preview
• Customer Testimonials
• CTA Sections
• Footer with Quick Links

2. About Us
• Company Introduction
• Brand Story
• Vision & Mission
• Why Choose Hello Bites

3. Our Menu / Product Listing
• Category Wise Products
• Product Search
• Product Filters
• Veg / Non-Veg Labels
• Best Seller Tag

4. Product Details Page
• Product Images
• Description & Ingredients
• Price & Product Variants
• Add to Cart / Order Button

5. Order Now Page
• Product Listing & Cart Integration
• Quantity Selection & Checkout Redirect

6. Bulk Order Page
• Bulk Order Form
• Product Selection
• Customer Details

7. Franchise Enquiry
• Franchise Information
• Online Enquiry Form

8. Contact Us
• Contact Form & Google Map
• Phone & Email

[SECTION] Admin Panel Features
1. Dashboard & Categories
• Total Products & Categories
• Category & Product Management
• Banner & Blog Management
• CMS & Email Configuration
• Website Settings & Google Analytics`
};

function App() {
  const [formData, setFormData] = useState(DEFAULTS);
  const [theme, setTheme] = useState('light');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sheetsUrl, setSheetsUrl] = useState(() => localStorage.getItem('mm_sheets_url') || '');
  const [toast, setToast] = useState(null); // { message, type: 'success'|'error' }

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

  // Synchronize theme with HTML attribute & set tab title/favicon dynamically
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

  // Auto-dismiss toast after 3.5 seconds
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

  // Sync registered records with Google Sheets if webhook URL is configured
  useEffect(() => {
    if (!sheetsUrl || !sheetsUrl.startsWith('https://')) return;
    fetch(sheetsUrl)
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
  }, [sheetsUrl]);

  // Mark a number as registered/used
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
    const prefix = formData.letterType === 'PPO Letter' ? 'PPO' : 'OL';
    const newRef = `MMSS/HR/${prefix}/${year}/${randomDigits}`;
    setFormData(prev => ({ ...prev, refNumber: newRef }));
    showToast(`⚡ Generated fresh Ref No: ${newRef}`, 'success');
  };

  const generateUniqueCertificateId = () => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    const newCert = `MMSS/INT/CERT/${year}/${randomDigits}`;
    setFormData(prev => ({ ...prev, certificateId: newCert }));
    showToast(`⚡ Generated fresh Certificate ID: ${newCert}`, 'success');
  };

  const generateUniqueQuotationNo = () => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const newQuot = `A${randomDigits}`;
    setFormData(prev => ({ ...prev, quotationNo: newQuot }));
    showToast(`⚡ Generated fresh Quotation No: ${newQuot}`, 'success');
  };

  // Save sheets URL to localStorage when it changes
  const handleSheetsUrlChange = (e) => {
    const val = e.target.value;
    setSheetsUrl(val);
    localStorage.setItem('mm_sheets_url', val);
  };

  // Helper to append a new feature line to quotation scope text
  const handleAddQuickLine = (e) => {
    if (e) e.preventDefault();
    if (!quickLineText.trim()) return;
    const newLine = `• ${quickLineText.trim()}`;
    setFormData(prev => ({
      ...prev,
      quotationScopeText: prev.quotationScopeText ? `${prev.quotationScopeText}\n${newLine}` : newLine
    }));
    setQuickLineText('');
  };

  // Helper to append a new category title to quotation scope text
  const handleAddQuickCategory = (e) => {
    if (e) e.preventDefault();
    if (!quickCatText.trim()) return;
    const newCat = `\n${quickCatText.trim()}`;
    setFormData(prev => ({
      ...prev,
      quotationScopeText: prev.quotationScopeText ? `${prev.quotationScopeText}\n${newCat}` : newCat
    }));
    setQuickCatText('');
  };

  // Helper to append a new page break to quotation scope text
  const handleAddPageBreak = () => {
    setFormData(prev => ({
      ...prev,
      quotationScopeText: prev.quotationScopeText ? `${prev.quotationScopeText}\n\n[PAGE]\n` : '[PAGE]\n'
    }));
    showToast('📄 New Page Break inserted!', 'success');
  };

  // Helper to append a new section title to quotation scope text
  const handleAddSection = () => {
    const title = prompt('Enter New Section Title:', 'Admin Panel Features');
    if (!title || !title.trim()) return;
    const secTag = `\n\n[SECTION] ${title.trim()}\n`;
    setFormData(prev => ({
      ...prev,
      quotationScopeText: prev.quotationScopeText ? `${prev.quotationScopeText}${secTag}` : secTag
    }));
  };

  // Helper to edit a specific line in quotation scope text by index
  const handleEditLine = (indexToEdit, newText) => {
    const lines = (formData.quotationScopeText || '').split('\n');
    lines[indexToEdit] = newText;
    setFormData(prev => ({
      ...prev,
      quotationScopeText: lines.join('\n')
    }));
  };

  // Helper to delete a specific line in quotation scope text by index
  const handleDeleteLine = (indexToDelete) => {
    const lines = (formData.quotationScopeText || '').split('\n');
    lines.splice(indexToDelete, 1);
    setFormData(prev => ({
      ...prev,
      quotationScopeText: lines.join('\n')
    }));
    showToast('🗑️ Item deleted', 'success');
  };

  // Log to Google Sheets & Google Drive via Apps Script webhook
  const logToSheets = async (data, pdfBase64 = '', filename = '') => {
    if (!sheetsUrl || !sheetsUrl.startsWith('https://')) {
      showToast('⚠️ Paste your Google Sheets Webhook URL in sidebar to auto-save to Sheet!', 'error');
      return;
    }

    try {
      const isQuot = data.letterType === 'Quotation';
      const isPay = data.letterType === 'Salary Slip';
      const isPPO = data.letterType === 'PPO Letter';
      const isCert = data.letterType === 'Internship Certificate';

      const payload = {
        candidateName: isQuot ? (data.quotationForClient || '') : (data.candidateName || ''),
        designation: isQuot ? (data.quotationProjectTitle || '') : isPPO ? (data.ppoFullTimeRole || data.designation) : (data.designation || ''),
        department: isQuot ? 'IT & Web Solutions' : (data.department || ''),
        letterType: data.letterType || 'Offer Letter',
        issueDate: isQuot ? (data.quotationDate || '') : (data.issueDate || ''),
        startDate: isQuot ? (data.validTillDate || '') : isPPO ? (data.ppoJoiningDate || '') : (data.startDate || ''),
        companyName: isQuot ? (data.quotationFromCompany || '') : (data.companyName || ''),
        refNumber: isQuot ? (data.quotationNo || '') : isPay ? `PAY-${data.employeeId || ''}-${data.payPeriod || ''}` : (data.refNumber || ''),
        certificateNo: isCert ? (data.certificateId || '') : isQuot ? (data.quotationNo || '') : (data.refNumber || ''),
        timestamp: new Date().toLocaleString('en-IN'),
        filename: filename,
        pdfBase64: pdfBase64
      };

      await fetch(sheetsUrl, {
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
      // Auto-sync digital signature with signatory name as they type
      if (name === 'signatoryName') {
        updated.signatureText = value;
      }
      // Auto-switch subject and intro text based on selected letterType
      if (name === 'letterType') {
        if (value === 'PPO Letter') {
          updated.candidateName = 'Aman Singh';
          updated.designation = 'Software Engineer';
          updated.department = 'Engineering';
          updated.ppoFullTimeRole = 'Software Engineer';
          updated.ppoCTC = '\u20b9 6,00,000/- Per Annum';
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
          updated.quotationMobile = '+91 70115 02461';
          updated.quotationEmail = 'Info.mindmanthan@gmail.com';
          updated.quotationProjectTitle = 'Hellobites';
          updated.quotationProjectSub = 'Admin Panel, Website, Product Listing with SEO, Database, web Deployment, E-mail configuration';
          updated.quotationFromCompany = 'Mind Manthan IT Solutions';
          updated.quotationFromAddress = 'A90, A Block, Sector 4, Noida, Uttar Pradesh 201301';
          updated.quotationForClient = 'Hello Bites';
          updated.quotationForAddress = '15E/3, Shri Ram Marg, Street No. 3 Maujpur, North East, Delhi - 110053';
          updated.quotationItemCode = 'Hellobite028';
          updated.quotationQuantity = '1';
          updated.quotationRate = '20000';
        } else if (value === 'Salary Slip') {
          // Load default payslip values automatically
          updated.candidateName = 'Gaurav';
          updated.designation = 'Associate Editor';
          updated.employeeId = '43521';
          updated.joiningDate = '2020-06-30';
          updated.payPeriod = 'March 2024';
          updated.payDate = '2024-03-29';
          updated.paidDays = '31';
          updated.lopDays = '0';
          updated.pfAccountNumber = 'AA/AAA/9999999/99G/9899999';
          updated.uan = '111111111111';
          updated.earningBasic = 43750;
          updated.earningHra = 21875;
          updated.earningConveyance = 6000;
          updated.earningChildren = 4000;
          updated.earningFixed = 6625;
          updated.deductionEpf = 5250;
          updated.deductionProfTax = 0;
          updated.ytdBasic = 131250;
          updated.ytdHra = 65625;
          updated.ytdConveyance = 18000;
          updated.ytdChildren = 12000;
          updated.ytdFixed = 19875;
          updated.ytdEpf = 15750;
          updated.ytdProfTax = 1250;
        } else {
          // Restore default letter/certificate candidate values
          updated.candidateName = 'Aman Singh';
          updated.designation = 'Software Engineer';
          updated.department = 'Engineering';
          
          if (value === 'Joining Letter') {
            updated.letterSubject = 'Subject: Appointment & Joining Confirmation';
            updated.letterIntro = 'This is to officially confirm your appointment and joining at {companyName} as a {designation} in our {department} department, effective from {startDate}. We welcome you to our organization and wish you a successful career with us.';
            updated.letterClosing = 'Please review our onboarding material and report to the office at the designated timing. We look forward to a mutually rewarding association!';
          } else {
            updated.letterSubject = 'Subject: Offer of Employment';
            updated.letterIntro = 'We are pleased to offer you the position of {designation} at {companyName}. We were impressed with your skills and experience, and we believe that you will be a valuable addition to our team.';
            updated.letterClosing = 'Please sign and return a copy of this letter as a token of your acceptance of this offer. We look forward to welcoming you to the {companyName} family!';
          }
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

  // Helper: Format date into readable string, e.g. "08 May 2025"
  const formatDateLong = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr; // Fallback if string is formatted already
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Helper: Get pronouns based on selected gender
  const getGenderPronouns = (gender) => {
    const g = (gender || 'Male').toLowerCase();
    if (g === 'female') {
      return {
        subject: 'she',
        object: 'her',
        possessive: 'her',
        title: 'Ms.'
      };
    } else if (g === 'other') {
      return {
        subject: 'they',
        object: 'them',
        possessive: 'their',
        title: 'Mx.'
      };
    } else {
      return {
        subject: 'he',
        object: 'him',
        possessive: 'his',
        title: 'Mr.'
      };
    }
  };

  // Helper: Capitalize Name to Title Case
  const capitalizeName = (str) => {
    if (!str) return '';
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Helper: Format Number into INR Currency representation
  const formatCurrency = (amount) => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return 'â¹0.00';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numericAmount);
  };

  // Helper: Convert Number to formal Indian Rupee Word notation
  const numberToWords = (num) => {
    const numericVal = Math.floor(parseFloat(num));
    if (isNaN(numericVal) || numericVal === 0) return 'Indian Rupee Zero Only';
    
    const a = [
      '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
      'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
    ];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    const makeWords = (n) => {
      let str = '';
      if (n > 99) {
        str += a[Math.floor(n / 100)] + ' Hundred ';
        n %= 100;
      }
      if (n > 19) {
        str += b[Math.floor(n / 10)] + ' ';
        n %= 10;
      }
      if (n > 0) {
        str += a[n] + ' ';
      }
      return str.trim();
    };

    let cleanNum = numericVal;
    let parts = [];
    
    // Thousand division (last 3 digits)
    parts.push(cleanNum % 1000);
    cleanNum = Math.floor(cleanNum / 1000);
    
    // Lakh division (next 2 digits)
    if (cleanNum > 0) {
      parts.push(cleanNum % 100);
      cleanNum = Math.floor(cleanNum / 100);
    }
    // Crore division (next 2 digits)
    if (cleanNum > 0) {
      parts.push(cleanNum % 100);
      cleanNum = Math.floor(cleanNum / 100);
    }
    // Higher crores
    if (cleanNum > 0) {
      parts.push(cleanNum);
    }

    let words = [];
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] > 0) {
        let suffix = '';
        if (i === 1) suffix = ' Thousand';
        else if (i === 2) suffix = ' Lakh';
        else if (i === 3) suffix = ' Crore';
        else if (i > 3) suffix = ' Crore';
        
        words.unshift(makeWords(parts[i]) + suffix);
      }
    }

    return 'Indian Rupee ' + words.join(' ').trim() + ' Only';
  };

  // Helper: Replace placeholder tags in user inputs
  const replacePlaceholders = (text) => {
    if (!text) return '';
    const pronouns = getGenderPronouns(formData.candidateGender);
    return text
      .replace(/{candidateName}/g, capitalizeName(formData.candidateName))
      .replace(/{designation}/g, formData.designation)
      .replace(/{companyName}/g, formData.companyName)
      .replace(/{department}/g, formData.department)
      .replace(/{startDate}/g, formatDateLong(formData.startDate))
      .replace(/{employmentType}/g, formData.employmentType)
      .replace(/{probationPeriod}/g, formData.probationPeriod)
      .replace(/{companyWebsite}/g, formData.companyWebsite)
      .replace(/{certificateId}/g, formData.certificateId)
      .replace(/{internshipStartDate}/g, formatDateLong(formData.internshipStartDate))
      .replace(/{internshipEndDate}/g, formatDateLong(formData.internshipEndDate))
      .replace(/{pronounSubject}/g, pronouns.subject)
      .replace(/{pronounObject}/g, pronouns.object)
      .replace(/{pronounPossessive}/g, pronouns.possessive)
      .replace(/{titlePronoun}/g, pronouns.title);
  };

  // Bulletproof client-side multi-page PDF generation
  const generatePDF = async () => {
    const isQuotation = formData.letterType === 'Quotation';
    const isCertificate = formData.letterType === 'Internship Certificate';
    const isPayslip = formData.letterType === 'Salary Slip';

    const nameToCheck = isQuotation ? formData.quotationForClient : formData.candidateName;
    if (!nameToCheck || !nameToCheck.trim()) {
      setErrorMessage(isQuotation ? "Please enter the Client's Name (Quotation For)." : "Please enter the Candidate's Name.");
      return;
    }

    // Uniqueness Check Guard
    const currentNum = isCertificate ? formData.certificateId : isQuotation ? formData.quotationNo : formData.refNumber;
    const isAlreadyUsed = currentNum && registeredRecords.some(r => r.trim().toLowerCase() === currentNum.trim().toLowerCase());
    if (isAlreadyUsed) {
      const proceed = window.confirm(`⚠️ WARNING: ${isCertificate ? 'Certificate ID' : isQuotation ? 'Quotation No' : 'Reference Number'} "${currentNum}" is ALREADY REGISTERED in Google Sheets!\n\nAre you sure you want to download a duplicate?`);
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
        width: isCertificate ? 1123 : 794,
        height: isCertificate ? 794 : 1123,
      });
      const imgData1 = canvas1.toDataURL('image/png');

      let imgData2 = null;
      if (!isCertificate && !isPayslip) {
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

      // Create PDF in A4 format (210mm x 297mm or 297mm x 210mm)
      const pdf = new jsPDF({
        orientation: isCertificate ? 'landscape' : 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = isCertificate ? 297 : 210;
      const imgHeight = isCertificate ? 210 : 297;

      // Add Page 1
      pdf.addImage(imgData1, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
      
      // Add Page 2
      if (!isCertificate && !isPayslip && imgData2) {
        pdf.addPage();
        pdf.addImage(imgData2, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
      }

      const cleanName = formData.candidateName.trim().replace(/[^a-zA-Z0-9]/g, '_');
      const docPrefix = isCertificate ? 'Certificate' : isPayslip ? 'Payslip' : 'Letter';
      const filename = `${docPrefix}_MindManthan_${cleanName}.pdf`;
      const pdfBase64 = pdf.output('datauristring');
      pdf.save(filename);

      // Register used number locally
      const activeNum = isCertificate ? formData.certificateId : formData.refNumber;
      markNumberAsRegistered(activeNum);

      // Log to Google Sheets & Google Drive after successful download
      logToSheets(formData, pdfBase64, filename);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      setErrorMessage('An error occurred during PDF generation. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const certificateHTML = () => {
    const pronouns = getGenderPronouns(formData.candidateGender);
    const formattedCertDate = formatDateLong(formData.internshipEndDate || formData.issueDate);
    const formattedStart = formatDateLong(formData.internshipStartDate);
    const formattedEnd = formatDateLong(formData.internshipEndDate);

    const isCertificate = formData.letterType === 'Internship Certificate';
  const isPayslip = formData.letterType === 'Salary Slip';

  return (
      <>
        {/* Slanted Navy & Royal Blue layered background banner (vector-sharp SVG) */}
        <svg width="330" height="794" viewBox="0 0 330 794" style={{ position: 'absolute', left: 0, top: 0, zIndex: 2, pointerEvents: 'none' }}>
          {/* Base: Royal Blue stripe on the right */}
          <polygon points="0,0 280,0 80,794 0,794" fill="#2563eb" />
          <polygon points="0,0 274,0 74,794 0,794" fill="#0c3b6f" />
          
          {/* Main Dark Navy Block on the left */}
          <polygon points="0,0 240,0 40,794 0,794" fill="#07162c" />
          
          {/* Premium Gold Accent Triangle in top-left corner */}
          <polygon points="0,0 80,0 0,120" fill="#c39b33" opacity="0.95" />
          <polygon points="0,0 50,0 0,75" fill="#07162c" />
          
          {/* Gold Divider Line */}
          <line x1="280" y1="0" x2="80" y2="794" stroke="#c39b33" strokeWidth="6" />
        </svg>
        
        {/* Overlapping Gold Seal Badge */}
        <div className="cert-gold-seal-container">
          <div className="cert-gold-seal">
            <div className="seal-scallop-1"></div>
            <div className="seal-scallop-2"></div>
            <div className="seal-scallop-3"></div>
            <div className="seal-scallop-4"></div>
            <div className="seal-inner-circle">
              <span className="seal-star-top" style={{ color: '#d4af37', fontSize: '0.8rem', lineHeight: '1', marginBottom: '2px' }}>â</span>
              <div className="seal-text-top">INTERNSHIP</div>
              <div className="seal-text-middle">COMPLETED</div>
              <svg width="60" height="28" viewBox="0 0 60 28" style={{ marginTop: '1px' }}>
                {/* Left laurel branch */}
                <path d="M 22 24 C 14 22, 8 16, 8 8 M 8 8 C 9 10, 11 11, 13 9 M 8 12 C 10 14, 12 14, 13 11 M 9 17 C 11 19, 13 18, 14 15 M 12 21 C 14 22, 16 21, 16 18" fill="none" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" />
                {/* Right laurel branch */}
                <path d="M 38 24 C 46 22, 52 16, 52 8 M 52 8 C 51 10, 49 11, 47 9 M 52 12 C 50 14, 48 14, 47 11 M 51 17 C 49 19, 47 18, 46 15 M 48 21 C 46 22, 44 21, 44 18" fill="none" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" />
                {/* Small star in center */}
                <text x="30" y="22" fill="#d4af37" fontSize="8" textAnchor="middle">â</text>
              </svg>
            </div>
          </div>
        </div>

        <div className="cert-content">
          {/* Certificate Header */}
          <div className="cert-header">
            <div className="cert-logo-container">
              <img src={companyLogo} className="cert-company-logo" alt={formData.companyName} crossOrigin="anonymous" />
              <div>
                <div className="cert-company-name">{formData.companyName}</div>
                <div className="cert-company-tagline">{formData.companyTagline}</div>
              </div>
            </div>
            
            <div className="cert-meta-info">
              <div><strong>Certificate ID:</strong> {formData.certificateId}</div>
              <div><strong>Date:</strong> {formattedCertDate}</div>
            </div>
          </div>

          {/* Certificate Title */}
          <div className="cert-title-container">
            <h1 className="cert-main-title">CERTIFICATE</h1>
            <div className="cert-subtitle-container">
              <div className="cert-subtitle-line"></div>
              <div className="cert-subtitle-dot"></div>
              <div className="cert-subtitle-text">OF INTERNSHIP COMPLETION</div>
              <div className="cert-subtitle-dot"></div>
              <div className="cert-subtitle-line"></div>
            </div>
          </div>

          {/* Body content */}
          <div className="cert-certify-text">This is to certify that</div>
          
          <div className="cert-candidate-name">
            {capitalizeName(formData.candidateName)}
          </div>

          {/* Restructured Body content to match reference block layout */}
          <div className="cert-body-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem', color: '#475569', fontSize: '0.82rem', textAlign: 'center', width: '100%', flexShrink: 0, marginTop: '1.1rem' }}>
            <div style={{ fontStyle: 'italic', fontWeight: '500' }}>has successfully completed {pronouns.possessive} internship as</div>
            
            <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#2563eb', margin: '0.1rem 0' }}>
              {formData.designation}
            </div>
            
            <div style={{ fontWeight: '750', color: '#0b1c33', fontSize: '0.9rem' }}>
              at {formData.companyName}
            </div>
            
            <div style={{ fontSize: '0.85rem' }}>
              from <strong style={{ color: '#2563eb' }}>{formattedStart}</strong> to <strong style={{ color: '#2563eb' }}>{formattedEnd}</strong>.
            </div>
            
            <div style={{ fontSize: '0.78rem', opacity: '0.9', maxWidth: '580px', marginTop: '0.2rem', lineHeight: '1.4' }}>
              {replacePlaceholders(formData.certDescription)}
            </div>
            
            <div style={{ fontSize: '0.78rem', fontWeight: '600', color: '#0b1c33', marginTop: '0.25rem' }}>
              {replacePlaceholders(formData.certClosingText)}
            </div>
          </div>

          {/* Bottom area */}
          <div className="cert-signatures-container">
            <div className="cert-signature-block">
              {formData.signatureText && (
                <div className="cert-signature-cursive">
                  {capitalizeName(formData.signatureText)}
                </div>
              )}
              <div className="cert-signature-line"></div>
              <div className="cert-signature-name">{capitalizeName(formData.signatoryName)}</div>
              <div className="cert-signature-title">{formData.signatoryDesignation}</div>
              <div className="cert-signature-company">{formData.companyName}</div>
            </div>

            <div className="cert-appreciation-block">
              <Award size={20} className="cert-appreciation-icon" />
              <div className="cert-appreciation-text">
                {formData.certAppreciationText}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Coordinates Ribbon */}
        <div className="cert-bottom-ribbon">
          <div className="cert-bottom-item">
            <MapPin size={9} className="contact-icon" />
            <span>{formData.companyAddress}</span>
          </div>
          <div className="cert-bottom-item">
            <Phone size={9} className="contact-icon" />
            <span>{formData.companyMobile || '+91 98765 43210'}</span>
          </div>
          <div className="cert-bottom-item">
            <Mail size={9} className="contact-icon" />
            <span>{formData.companyEmail || 'info@mindmanthansoftwaresolutions.com'}</span>
          </div>
          <div className="cert-bottom-item">
            <Globe size={9} className="contact-icon" />
            <span>{formData.companyWebsite}</span>
          </div>
        </div>
      </>
    );
  };

  const payslipHTML = () => {
    const basic = parseFloat(formData.earningBasic) || 0;
    const hra = parseFloat(formData.earningHra) || 0;
    const conveyance = parseFloat(formData.earningConveyance) || 0;
    const children = parseFloat(formData.earningChildren) || 0;
    const fixed = parseFloat(formData.earningFixed) || 0;
    
    const epf = parseFloat(formData.deductionEpf) || 0;
    const profTax = parseFloat(formData.deductionProfTax) || 0;
    
    const ytdBasic = parseFloat(formData.ytdBasic) || 0;
    const ytdHra = parseFloat(formData.ytdHra) || 0;
    const ytdConveyance = parseFloat(formData.ytdConveyance) || 0;
    const ytdChildren = parseFloat(formData.ytdChildren) || 0;
    const ytdFixed = parseFloat(formData.ytdFixed) || 0;
    const ytdEpf = parseFloat(formData.ytdEpf) || 0;
    const ytdProfTax = parseFloat(formData.ytdProfTax) || 0;
    
    const grossEarnings = basic + hra + conveyance + children + fixed;
    const totalDeductions = epf + profTax;
    const netPay = grossEarnings - totalDeductions;
    
    const grossEarningsYtd = ytdBasic + ytdHra + ytdConveyance + ytdChildren + ytdFixed;
    const totalDeductionsYtd = ytdEpf + ytdProfTax;

    return (
      <div className="payslip-wrapper">
        {/* Header Block */}
        <div className="payslip-header">
          <div className="payslip-logo-section">
            <img src={companyLogo} className="payslip-logo" alt={formData.companyName} crossOrigin="anonymous" />
            <div className="payslip-logo-text">
              <div className="payslip-company-name">{formData.companyName}</div>
              <div className="payslip-company-address">{formData.companyAddress}</div>
            </div>
          </div>
          <div className="payslip-title-section">
            <div className="payslip-title-label">Payslip For the Month</div>
            <div className="payslip-title-month">{formData.payPeriod}</div>
          </div>
        </div>

        {/* Employee Summary & Net Pay Area */}
        <div className="payslip-summary-net-pay">
          {/* Summary Box */}
          <div className="payslip-summary-box">
            <h3 className="payslip-section-title">EMPLOYEE SUMMARY</h3>
            <div className="payslip-summary-grid">
              <div className="payslip-grid-label">Employee Name</div>
              <div className="payslip-grid-value">: {capitalizeName(formData.candidateName)}</div>

              <div className="payslip-grid-label">Designation</div>
              <div className="payslip-grid-value">: {formData.designation}</div>

              <div className="payslip-grid-label">Employee ID</div>
              <div className="payslip-grid-value">: {formData.employeeId}</div>

              <div className="payslip-grid-label">Date of Joining</div>
              <div className="payslip-grid-value">: {formatDateLong(formData.joiningDate)}</div>

              <div className="payslip-grid-label">Pay Period</div>
              <div className="payslip-grid-value">: {formData.payPeriod}</div>

              <div className="payslip-grid-label">Pay Date</div>
              <div className="payslip-grid-value">: {formatDateLong(formData.payDate)}</div>
            </div>
          </div>

          {/* Net Pay Card */}
          <div className="payslip-net-pay-card">
            <div className="payslip-net-pay-val-box">
              <div className="payslip-net-pay-amount">{formatCurrency(netPay)}</div>
              <div className="payslip-net-pay-subtitle">Employee Net Pay</div>
            </div>
            <div className="payslip-net-pay-stats-box">
              <div className="payslip-stat-row">
                <span className="payslip-stat-label">Paid Days</span>
                <span className="payslip-stat-value">: {formData.paidDays}</span>
              </div>
              <div className="payslip-stat-row">
                <span className="payslip-stat-label">LOP Days</span>
                <span className="payslip-stat-value">: {formData.lopDays}</span>
              </div>
            </div>
          </div>
        </div>

        {/* PF & UAN Bar */}
        <div className="payslip-pf-uan-bar">
          <div className="payslip-pf-uan-item">
            <span className="payslip-pf-uan-label">PF A/C Number</span>
            <span className="payslip-pf-uan-val">: {formData.pfAccountNumber}</span>
          </div>
          <div className="payslip-pf-uan-item">
            <span className="payslip-pf-uan-label">UAN</span>
            <span className="payslip-pf-uan-val">: {formData.uan}</span>
          </div>
        </div>

        {/* Tables block */}
        <div className="payslip-tables-section">
          {/* Earnings side */}
          <div className="payslip-table-col">
            <table className="payslip-table">
              <thead>
                <tr>
                  <th className="text-left">EARNINGS</th>
                  <th className="text-right">AMOUNT</th>
                  <th className="text-right">YTD</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-left">Basic</td>
                  <td className="text-right">{formatCurrency(basic)}</td>
                  <td className="text-right">{formatCurrency(ytdBasic)}</td>
                </tr>
                <tr>
                  <td className="text-left">House Rent Allowance</td>
                  <td className="text-right">{formatCurrency(hra)}</td>
                  <td className="text-right">{formatCurrency(ytdHra)}</td>
                </tr>
                <tr>
                  <td className="text-left">Conveyance Allowance</td>
                  <td className="text-right">{formatCurrency(conveyance)}</td>
                  <td className="text-right">{formatCurrency(ytdConveyance)}</td>
                </tr>
                <tr>
                  <td className="text-left">Children Education Allowance</td>
                  <td className="text-right">{formatCurrency(children)}</td>
                  <td className="text-right">{formatCurrency(ytdChildren)}</td>
                </tr>
                <tr>
                  <td className="text-left">Fixed Allowance</td>
                  <td className="text-right">{formatCurrency(fixed)}</td>
                  <td className="text-right">{formatCurrency(ytdFixed)}</td>
                </tr>
                <tr className="payslip-total-row">
                  <td className="text-left font-bold">Gross Earnings</td>
                  <td className="text-right font-bold">{formatCurrency(grossEarnings)}</td>
                  <td className="text-right font-bold">{formatCurrency(grossEarningsYtd)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Deductions side */}
          <div className="payslip-table-col">
            <table className="payslip-table">
              <thead>
                <tr>
                  <th className="text-left">DEDUCTIONS</th>
                  <th className="text-right">AMOUNT</th>
                  <th className="text-right">YTD</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-left">EPF Contribution</td>
                  <td className="text-right">{formatCurrency(epf)}</td>
                  <td className="text-right">{formatCurrency(ytdEpf)}</td>
                </tr>
                <tr>
                  <td className="text-left">Professional Tax</td>
                  <td className="text-right">{formatCurrency(profTax)}</td>
                  <td className="text-right">{formatCurrency(ytdProfTax)}</td>
                </tr>
                {/* Empty spacer rows to align bottom with earnings table */}
                <tr>
                  <td className="text-left">&nbsp;</td>
                  <td className="text-right">&nbsp;</td>
                  <td className="text-right">&nbsp;</td>
                </tr>
                <tr>
                  <td className="text-left">&nbsp;</td>
                  <td className="text-right">&nbsp;</td>
                  <td className="text-right">&nbsp;</td>
                </tr>
                <tr>
                  <td className="text-left">&nbsp;</td>
                  <td className="text-right">&nbsp;</td>
                  <td className="text-right">&nbsp;</td>
                </tr>
                <tr className="payslip-total-row">
                  <td className="text-left font-bold">Total Deductions</td>
                  <td className="text-right font-bold">{formatCurrency(totalDeductions)}</td>
                  <td className="text-right font-bold">{formatCurrency(totalDeductionsYtd)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Net Payable Bar */}
        <div className="payslip-net-payable-bar">
          <div className="payslip-net-payable-label">
            <div className="payslip-np-title">TOTAL NET PAYABLE</div>
            <div className="payslip-np-subtitle">Gross Earnings - Total Deductions</div>
          </div>
          <div className="payslip-net-payable-amount-badge">
            {formatCurrency(netPay)}
          </div>
        </div>

        {/* Amount in words */}
        <div className="payslip-words-footer">
          <strong>Amount In Words:</strong> <span className="payslip-words-text">{numberToWords(netPay)}</span>
        </div>
      </div>
    );
  };

  // ── PPO (Pre-Placement Offer) single-page template ──
  const ppoHTML = () => {
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
            <div className="contact-item"><Phone size={10} className="contact-icon" /><span>+91 98765 43210</span></div>
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

  // ── Helper to parse scope & feature breakdown for Quotation generator ──
  const parseQuotationScope = (text) => {
    if (!text) return [];
    const lines = text.split('\n');
    const sections = [];
    let currentSection = null;
    let currentCat = null;

    lines.forEach(line => {
      const trimmed = line.trim();
      if (!trimmed) return;

      if (trimmed === '[PAGE]') {
        currentSection = { isPageBreak: true };
        sections.push(currentSection);
        currentCat = null;
      } else if (trimmed.startsWith('[SECTION]')) {
        const sectionTitle = trimmed.replace('[SECTION]', '').trim();
        currentSection = { title: sectionTitle, categories: [] };
        sections.push(currentSection);
        currentCat = null;
      } else if (/^\d+\./.test(trimmed)) {
        if (!currentSection || currentSection.isPageBreak) {
          currentSection = { title: 'Scope & Features', categories: [] };
          sections.push(currentSection);
        }
        currentCat = { title: trimmed, items: [] };
        currentSection.categories.push(currentCat);
      } else if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
        const bullet = trimmed.replace(/^[•\-\*]\s*/, '').trim();
        if (currentCat) {
          currentCat.items.push(bullet);
        } else {
          if (!currentSection || currentSection.isPageBreak) {
            currentSection = { title: 'Scope & Features', categories: [] };
            sections.push(currentSection);
          }
          if (!currentCat) {
            currentCat = { title: 'General', items: [] };
            currentSection.categories.push(currentCat);
          }
          currentCat.items.push(bullet);
        }
      } else {
        if (!currentSection || currentSection.isPageBreak) {
          currentSection = { title: 'Scope & Features', categories: [] };
          sections.push(currentSection);
        }
        if (!currentCat) {
          currentCat = { title: trimmed, items: [] };
          currentSection.categories.push(currentCat);
        } else {
          currentCat.items.push(trimmed);
        }
      }
    });

    return sections;
  };

  // ── Quotation multi-page layout renderer ──
  const renderQuotationPages = (isPrintableContainer = false) => {
    const sections = parseQuotationScope(formData.quotationScopeText);
    
    // Flatten categories with section header association and explicit page breaks
    const allCategories = [];
    sections.forEach(sec => {
      if (sec.isPageBreak) {
        allCategories.push({ isExplicitPageBreak: true });
        return;
      }
      sec.categories.forEach((cat, idx) => {
        allCategories.push({
          sectionTitle: idx === 0 ? sec.title : null,
          category: cat
        });
      });
    });

    // Pagination chunks (Auto + Explicit [PAGE] breaks)
    const pages = [];
    let currentPage = [];
    let currentLimit = 4; // Page 1 limit due to header & cards

    allCategories.forEach(item => {
      if (item.isExplicitPageBreak) {
        if (currentPage.length > 0) {
          pages.push(currentPage);
          currentPage = [];
          currentLimit = 6;
        }
      } else {
        currentPage.push(item);
        if (currentPage.length >= currentLimit) {
          pages.push(currentPage);
          currentPage = [];
          currentLimit = 6;
        }
      }
    });
    if (currentPage.length > 0) {
      pages.push(currentPage);
    }
    if (pages.length === 0) {
      pages.push([]);
    }

    const totalPages = pages.length;
    const qty = Number(formData.quotationQuantity) || 1;
    const rate = Number(formData.quotationRate) || 0;
    const amount = qty * rate;
    const formattedAmount = formatCurrency(amount);

    return pages.map((pageItems, pageIdx) => {
      const isFirstPage = pageIdx === 0;
      const isLastPage = pageIdx === totalPages - 1;

      return (
        <div 
          key={pageIdx} 
          className={`paper-page quotation ${isPrintableContainer ? 'printable-quotation-page' : ''}`}
          style={{ marginBottom: isPrintableContainer ? '0' : '1.5rem' }}
        >
          {/* Header on Page 1 */}
          {isFirstPage ? (
            <>
              <div className="quotation-header">
                <div>
                  <h1 className="quotation-title-main">{formData.quotationProjectTitle || 'Project Quotation'}</h1>
                  <p className="quotation-subtitle">{formData.quotationProjectSub}</p>
                  
                  <div className="quotation-meta-table">
                    <span className="quotation-meta-label">Quotation No #</span>
                    <span className="quotation-meta-val">{formData.quotationNo}</span>

                    <span className="quotation-meta-label">Quotation Date</span>
                    <span className="quotation-meta-val">{formatDateLong(formData.quotationDate)}</span>

                    <span className="quotation-meta-label">Valid Till Date</span>
                    <span className="quotation-meta-val">{formatDateLong(formData.validTillDate)}</span>

                    {formData.quotationMobile && (
                      <>
                        <span className="quotation-meta-label">Mobile No.</span>
                        <span className="quotation-meta-val">{formData.quotationMobile}</span>
                      </>
                    )}

                    {formData.quotationEmail && (
                      <>
                        <span className="quotation-meta-label">Email id</span>
                        <span className="quotation-meta-val">{formData.quotationEmail}</span>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <img src={companyLogo} alt={formData.companyName} className="quotation-logo" crossOrigin="anonymous" />
                </div>
              </div>

              {/* Info Cards */}
              <div className="quotation-cards-row">
                <div className="quotation-card">
                  <div className="quotation-card-title">Quotation From</div>
                  <div className="quotation-card-name">{formData.quotationFromCompany}</div>
                  <div className="quotation-card-address">{formData.quotationFromAddress}</div>
                </div>

                <div className="quotation-card">
                  <div className="quotation-card-title">Quotation For</div>
                  <div className="quotation-card-name">{formData.quotationForClient}</div>
                  <div className="quotation-card-address">{formData.quotationForAddress}</div>
                </div>
              </div>
            </>
          ) : (
            /* Header on Page 2+ */
            <div className="quotation-header" style={{ borderBottom: '1px solid #e2d9f3', paddingBottom: '10px', marginBottom: '12px' }}>
              <div>
                <h1 className="quotation-title-main" style={{ fontSize: '18px' }}>{formData.quotationProjectTitle}</h1>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                  Quotation No: <strong>{formData.quotationNo}</strong> | For: <strong>{formData.quotationForClient}</strong>
                </div>
              </div>
              <img src={companyLogo} alt={formData.companyName} style={{ maxHeight: '40px' }} crossOrigin="anonymous" />
            </div>
          )}

          {/* Table */}
          <div className="quotation-table-wrapper" style={{ flex: 1 }}>
            <table className="quotation-table">
              <thead>
                <tr>
                  <th style={{ width: '55%' }}>Item</th>
                  <th style={{ width: '12%', textAlign: 'center' }}>Quantity</th>
                  <th style={{ width: '16%', textAlign: 'right' }}>Rate</th>
                  <th style={{ width: '17%', textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {isFirstPage && (
                      <div style={{ marginBottom: '10px', fontWeight: 600, color: '#334155' }}>
                        1. &nbsp; {formData.quotationItemCode}
                      </div>
                    )}

                    {pageItems.map((item, idx) => (
                      <div key={idx}>
                        {item.sectionTitle && (
                          <div className="quotation-section-heading">
                            {item.sectionTitle}
                          </div>
                        )}
                        <div className="quotation-category-title">{item.category.title}</div>
                        {item.category.items && item.category.items.length > 0 && (
                          <ul className="quotation-bullet-list">
                            {item.category.items.map((bullet, bIdx) => (
                              <li key={bIdx} className="quotation-bullet-item">
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}>{isFirstPage ? qty : ''}</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>{isFirstPage ? formatCurrency(rate) : ''}</td>
                  <td style={{ textAlign: 'right', fontWeight: 700 }}>{isFirstPage ? formattedAmount : ''}</td>
                </tr>

                {/* Total row on Last Page */}
                {isLastPage && (
                  <tr className="quotation-total-row">
                    <td colSpan={3} style={{ textAlign: 'right', fontWeight: 700, padding: '12px' }}>
                      Total Amount:
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 700, fontSize: '13px', color: '#652bbf', padding: '12px' }}>
                      {formattedAmount}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {isLastPage && (
              <div style={{ padding: '10px 14px', background: '#fcfaff', borderTop: '1px solid #e2d9f3', fontSize: '11px' }}>
                <strong>Amount in Words:</strong> {numberToWords(amount)}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="quotation-footer">
            <div className="quotation-footer-left">
              <span><strong>Quotation No:</strong> {formData.quotationNo}</span>
              <span><strong>Quotation Date:</strong> {formatDateLong(formData.quotationDate)}</span>
              <span><strong>Quotation For:</strong> {formData.quotationForClient}</span>
            </div>
            <div>
              <strong>Page {pageIdx + 1} of {totalPages}</strong>
            </div>
          </div>
        </div>
      );
    });
  };

  const page1HTML = () => {
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
              <span>+91 98765 43210</span>
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
            {replacePlaceholders(formData.letterIntro)}
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
            {replacePlaceholders(formData.letterClosing)}
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

  const page2HTML = () => {
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

  const isCertificate = formData.letterType === 'Internship Certificate';
  const isPayslip = formData.letterType === 'Salary Slip';
  const isPPO = formData.letterType === 'PPO Letter';
  const isQuotation = formData.letterType === 'Quotation';

  // Uniqueness check flags for real-time sidebar warnings
  const isRefDuplicate = formData.refNumber && registeredRecords.some(r => r.trim().toLowerCase() === formData.refNumber.trim().toLowerCase());
  const isCertDuplicate = formData.certificateId && registeredRecords.some(r => r.trim().toLowerCase() === formData.certificateId.trim().toLowerCase());
  const isQuotDuplicate = formData.quotationNo && registeredRecords.some(r => r.trim().toLowerCase() === formData.quotationNo.trim().toLowerCase());

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      {/* Premium Header */}
      <header className="app-header">
        <div className="logo-brand">
          <img src={companyLogo} style={{ height: '32px', width: 'auto', borderRadius: '4px' }} alt="Brand Logo" />
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
            {/* Section 0: Document Configuration */}
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
                <FileSignature size={16} /> Document Configuration
              </div>

              <div className="form-group">
                <label htmlFor="letterType">Letter Type</label>
                <select 
                  id="letterType" 
                  name="letterType"
                  value={formData.letterType}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="Offer Letter">Offer Letter</option>
                  <option value="Joining Letter">Joining Letter</option>
                  <option value="Internship Certificate">Internship Certificate</option>
                  <option value="PPO Letter">PPO Letter</option>
                  <option value="Salary Slip">Salary Slip</option>
                  <option value="Quotation">Quotation</option>
                </select>
              </div>

              {/* Google Sheets Webhook URL */}
              <div className="form-group">
                <label htmlFor="sheetsUrl" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>📊</span> Google Sheets URL
                </label>
                <input
                  type="url"
                  id="sheetsUrl"
                  value={sheetsUrl}
                  onChange={handleSheetsUrlChange}
                  placeholder="Paste your Apps Script Web App URL here..."
                  className="input-field"
                  style={{ fontSize: '0.8rem' }}
                />
                {sheetsUrl && sheetsUrl.startsWith('https://') && (
                  <span style={{ fontSize: '0.72rem', color: 'var(--success)', marginTop: '0.2rem', display: 'block' }}>
                    ✓ Connected — each download will log to your Sheet
                  </span>
                )}
                {sheetsUrl && !sheetsUrl.startsWith('https://') && (
                  <span style={{ fontSize: '0.72rem', color: 'var(--danger)', marginTop: '0.2rem', display: 'block' }}>
                    ⚠ URL must start with https://
                  </span>
                )}
              </div>

              

              {!isPayslip && !isQuotation && (
              <>
              <div className="form-group">
                <label htmlFor="letterIntro">Intro Paragraph</label>
                <textarea 
                  id="letterIntro" 
                  name="letterIntro"
                  value={formData.letterIntro}
                  onChange={handleInputChange}
                  placeholder="Enter introductory text..."
                  className="input-field"
                  rows={3}
                  style={{ resize: 'vertical', minHeight: '60px', fontSize: '0.85rem', lineHeight: '1.4' }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="letterClosing">Closing Paragraph</label>
                <textarea 
                  id="letterClosing" 
                  name="letterClosing"
                  value={formData.letterClosing}
                  onChange={handleInputChange}
                  placeholder="Enter closing text..."
                  className="input-field"
                  rows={2}
                  style={{ resize: 'vertical', minHeight: '50px', fontSize: '0.85rem', lineHeight: '1.4' }}
                />
              </div>
              </>
              )}
            </div>

            {/* Section 1: Candidate Info - Letter/Certificate only */}
            {!isPayslip && !isQuotation && (
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
                  placeholder="Aman Singh"
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
                  placeholder="aman.singh@email.com"
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

              <div className="form-group">
                <label htmlFor="candidateAddress">Home Address</label>
                <textarea 
                  id="candidateAddress" 
                  name="candidateAddress"
                  value={formData.candidateAddress}
                  onChange={handleInputChange}
                  placeholder="123, Green Park..."
                  className="input-field"
                  rows={2}
                  style={{ resize: 'vertical', minHeight: '60px' }}
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
                  placeholder="Software Engineer"
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
                  placeholder="Engineering"
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label htmlFor="rolesResponsibilities">Roles & Responsibilities (Page 2)</label>
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
            )}

            {/* Section 1.6: PPO Letter Fields */}
            {isPPO && (
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.9rem', fontWeight:'700', marginBottom:'0.75rem', color:'var(--primary-500)', borderBottom:'1px solid var(--border-color)', paddingBottom:'0.25rem' }}>
                <User size={16} /> Candidate Details
              </div>

              <div className="form-group">
                <label htmlFor="candidateName">Intern's Name</label>
                <input type="text" id="candidateName" name="candidateName" value={formData.candidateName} onChange={handleInputChange} placeholder="Aman Singh" className="input-field" />
              </div>
              <div className="input-row">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="candidateEmail" value={formData.candidateEmail} onChange={handleInputChange} placeholder="aman@email.com" className="input-field" />
                </div>
                <div className="form-group">
                  <label>Mobile</label>
                  <input type="text" name="candidateMobile" value={formData.candidateMobile} onChange={handleInputChange} placeholder="+91 98765 43210" className="input-field" />
                </div>
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea name="candidateAddress" value={formData.candidateAddress} onChange={handleInputChange} className="input-field" rows={2} style={{ resize:'vertical', minHeight:'50px' }} />
              </div>
              <div className="input-row">
                <div className="form-group">
                  <label>Department</label>
                  <input type="text" name="department" value={formData.department} onChange={handleInputChange} placeholder="Engineering" className="input-field" />
                </div>
                <div className="form-group">
                  <label>Issue Date</label>
                  <input type="date" name="issueDate" value={formData.issueDate} onChange={handleInputChange} className="input-field" />
                </div>
              </div>

              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.9rem', fontWeight:'700', marginTop:'0.5rem', marginBottom:'0.75rem', color:'var(--primary-500)', borderBottom:'1px solid var(--border-color)', paddingBottom:'0.25rem' }}>
                <Calendar size={16} /> Internship Period
              </div>
              <div className="input-row">
                <div className="form-group">
                  <label>Internship Start</label>
                  <input type="date" name="internshipStartDate" value={formData.internshipStartDate} onChange={handleInputChange} className="input-field" />
                </div>
                <div className="form-group">
                  <label>Internship End</label>
                  <input type="date" name="internshipEndDate" value={formData.internshipEndDate} onChange={handleInputChange} className="input-field" />
                </div>
              </div>

              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.9rem', fontWeight:'700', marginTop:'0.5rem', marginBottom:'0.75rem', color:'var(--primary-500)', borderBottom:'1px solid var(--border-color)', paddingBottom:'0.25rem' }}>
                <Briefcase size={16} /> Full-Time Offer Details
              </div>
              <div className="input-row">
                <div className="form-group">
                  <label>Full-Time Role</label>
                  <input type="text" name="ppoFullTimeRole" value={formData.ppoFullTimeRole} onChange={handleInputChange} placeholder="Software Engineer" className="input-field" />
                </div>
                <div className="form-group">
                  <label>CTC Offered</label>
                  <input type="text" name="ppoCTC" value={formData.ppoCTC} onChange={handleInputChange} placeholder="₹ 6,00,000/- PA" className="input-field" />
                </div>
              </div>
              <div className="input-row">
                <div className="form-group">
                  <label>Joining Date</label>
                  <input type="date" name="ppoJoiningDate" value={formData.ppoJoiningDate} onChange={handleInputChange} className="input-field" />
                </div>
                <div className="form-group">
                  <label>Accept By</label>
                  <input type="date" name="ppoAcceptDeadline" value={formData.ppoAcceptDeadline} onChange={handleInputChange} className="input-field" />
                </div>
              </div>
              <div className="input-row">
                <div className="form-group">
                  <label>Probation Period</label>
                  <input type="text" name="ppoProbation" value={formData.ppoProbation} onChange={handleInputChange} placeholder="6 Months" className="input-field" />
                </div>
                <div className="form-group">
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <label>Ref Number</label>
                    <button type="button" onClick={generateUniqueRefNumber} style={{ fontSize:'0.68rem', background:'none', border:'none', color:'var(--primary-500)', cursor:'pointer', fontWeight:'600' }}>
                      ⚡ Generate Unique
                    </button>
                  </div>
                  <input type="text" name="refNumber" value={formData.refNumber} onChange={handleInputChange} placeholder="MMSS/HR/PPO/2025/001" className="input-field" />
                  {isRefDuplicate && (
                    <span style={{ color: '#ef4444', fontSize: '0.72rem', fontWeight: 'bold', marginTop: '0.2rem', display: 'block' }}>
                      ⚠️ Ref No "{formData.refNumber}" is ALREADY registered!
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.9rem', fontWeight:'700', marginTop:'0.5rem', marginBottom:'0.75rem', color:'var(--primary-500)', borderBottom:'1px solid var(--border-color)', paddingBottom:'0.25rem' }}>
                <ShieldCheck size={16} /> Reporting & Signatory
              </div>
              <div className="input-row">
                <div className="form-group">
                  <label>Reporting Manager</label>
                  <input type="text" name="reportingManager" value={formData.reportingManager} onChange={handleInputChange} placeholder="Engineering Manager" className="input-field" />
                </div>
                <div className="form-group">
                  <label>Manager Designation</label>
                  <input type="text" name="managerDesignation" value={formData.managerDesignation} onChange={handleInputChange} placeholder="CTO" className="input-field" />
                </div>
              </div>
              <div className="input-row">
                <div className="form-group">
                  <label>Signatory Name</label>
                  <input type="text" name="signatoryName" value={formData.signatoryName} onChange={handleInputChange} placeholder="Aman Singh" className="input-field" />
                </div>
                <div className="form-group">
                  <label>Signatory Role</label>
                  <input type="text" name="signatoryDesignation" value={formData.signatoryDesignation} onChange={handleInputChange} placeholder="HR Manager" className="input-field" />
                </div>
              </div>
              <div className="form-group">
                <label>Digital Signature</label>
                <input type="text" name="signatureText" value={formData.signatureText} onChange={handleInputChange} placeholder="Aman Singh" className="input-field" />
              </div>

              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.9rem', fontWeight:'700', marginTop:'0.5rem', marginBottom:'0.75rem', color:'var(--primary-500)', borderBottom:'1px solid var(--border-color)', paddingBottom:'0.25rem' }}>
                <FileText size={16} /> PPO Terms &amp; Conditions
              </div>
              <div className="form-group">
                <textarea name="ppoTerms" value={formData.ppoTerms} onChange={handleInputChange} className="input-field" rows={5} style={{ resize:'vertical', minHeight:'100px', fontSize:'0.82rem', lineHeight:'1.5' }} />
                <span style={{ fontSize:'0.72rem', color:'var(--text-secondary)' }}>
                  Use <code>{`{ppoProbation}`}</code> and <code>{`{ppoAcceptDeadline}`}</code> as placeholders.
                </span>
              </div>
            </div>
            )}

            {/* Section 1.7: Quotation Fields */}
            {isQuotation && (
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.9rem', fontWeight:'700', marginBottom:'0.75rem', color:'var(--primary-500)', borderBottom:'1px solid var(--border-color)', paddingBottom:'0.25rem' }}>
                <FileText size={16} /> Quotation Overview
              </div>

              <div className="input-row">
                <div className="form-group">
                  <label>Quotation No #</label>
                  <input type="text" name="quotationNo" value={formData.quotationNo} onChange={handleInputChange} placeholder="A000029" className="input-field" />
                  {isQuotDuplicate && (
                    <span style={{ color: '#ef4444', fontSize: '0.72rem', fontWeight: 'bold', marginTop: '0.2rem', display: 'block' }}>
                      ⚠️ Quotation No "{formData.quotationNo}" is ALREADY registered!
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <label>Quotation Date</label>
                  <input type="date" name="quotationDate" value={formData.quotationDate} onChange={handleInputChange} className="input-field" />
                </div>
              </div>
              <div className="input-row">
                <div className="form-group">
                  <label>Valid Till Date</label>
                  <input type="date" name="validTillDate" value={formData.validTillDate} onChange={handleInputChange} className="input-field" />
                </div>
                <div className="form-group">
                  <label>Item Code</label>
                  <input type="text" name="quotationItemCode" value={formData.quotationItemCode} onChange={handleInputChange} placeholder="Hellobite028" className="input-field" />
                </div>
              </div>
              <div className="input-row">
                <div className="form-group">
                  <label>Contact Mobile</label>
                  <input type="text" name="quotationMobile" value={formData.quotationMobile} onChange={handleInputChange} placeholder="+91 70115 02461" className="input-field" />
                </div>
                <div className="form-group">
                  <label>Contact Email</label>
                  <input type="email" name="quotationEmail" value={formData.quotationEmail} onChange={handleInputChange} placeholder="Info.mindmanthan@gmail.com" className="input-field" />
                </div>
              </div>

              <div className="form-group">
                <label>Project Title</label>
                <input type="text" name="quotationProjectTitle" value={formData.quotationProjectTitle} onChange={handleInputChange} placeholder="Hellobites" className="input-field" />
              </div>
              <div className="form-group">
                <label>Project Subtitle / Scope Summary</label>
                <textarea name="quotationProjectSub" value={formData.quotationProjectSub} onChange={handleInputChange} className="input-field" rows={2} style={{ resize:'vertical', minHeight:'50px' }} />
              </div>

              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.9rem', fontWeight:'700', marginTop:'0.5rem', marginBottom:'0.75rem', color:'var(--primary-500)', borderBottom:'1px solid var(--border-color)', paddingBottom:'0.25rem' }}>
                <User size={16} /> Parties (From &amp; For)
              </div>
              <div className="form-group">
                <label>Quotation From (Company Name)</label>
                <input type="text" name="quotationFromCompany" value={formData.quotationFromCompany} onChange={handleInputChange} placeholder="Mind Manthan IT Solutions" className="input-field" />
              </div>
              <div className="form-group">
                <label>Quotation From Address</label>
                <textarea name="quotationFromAddress" value={formData.quotationFromAddress} onChange={handleInputChange} className="input-field" rows={2} style={{ resize:'vertical', minHeight:'50px' }} />
              </div>
              <div className="form-group">
                <label>Quotation For (Client Name)</label>
                <input type="text" name="quotationForClient" value={formData.quotationForClient} onChange={handleInputChange} placeholder="Hello Bites" className="input-field" />
              </div>
              <div className="form-group">
                <label>Quotation For Address</label>
                <textarea name="quotationForAddress" value={formData.quotationForAddress} onChange={handleInputChange} className="input-field" rows={2} style={{ resize:'vertical', minHeight:'50px' }} />
              </div>

              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.9rem', fontWeight:'700', marginTop:'0.5rem', marginBottom:'0.75rem', color:'var(--primary-500)', borderBottom:'1px solid var(--border-color)', paddingBottom:'0.25rem' }}>
                <IndianRupee size={16} /> Pricing
              </div>
              <div className="input-row">
                <div className="form-group">
                  <label>Quantity</label>
                  <input type="number" name="quotationQuantity" value={formData.quotationQuantity} onChange={handleInputChange} className="input-field" />
                </div>
                <div className="form-group">
                  <label>Rate (₹)</label>
                  <input type="number" name="quotationRate" value={formData.quotationRate} onChange={handleInputChange} className="input-field" />
                </div>
              </div>

              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'0.5rem', marginBottom:'0.75rem', borderBottom:'1px solid var(--border-color)', paddingBottom:'0.25rem' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.9rem', fontWeight:'700', color:'var(--primary-500)' }}>
                  <Briefcase size={16} /> Scope &amp; Features Manager
                </div>
                <button 
                  type="button" 
                  onClick={() => setShowRawEditor(!showRawEditor)}
                  style={{ fontSize:'0.72rem', background:'none', border:'none', color:'var(--primary-500)', cursor:'pointer', textDecoration:'underline', fontWeight:'600' }}
                >
                  {showRawEditor ? '👁️ Easy Visual Buttons' : '✏️ Raw Text Area'}
                </button>
              </div>

              {/* 1-Click Action Toolbar */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem', marginBottom:'0.75rem' }}>
                <button
                  type="button"
                  onClick={handleAddPageBreak}
                  style={{ padding:'0.35rem 0.6rem', fontSize:'0.75rem', borderRadius:'6px', background:'#f3eefc', border:'1px solid #d8cbeb', color:'#652bbf', fontWeight:'600', cursor:'pointer', display:'flex', alignItems:'center', gap:'0.3rem' }}
                >
                  📄 + Add New Page Break
                </button>

                <button
                  type="button"
                  onClick={handleAddSection}
                  style={{ padding:'0.35rem 0.6rem', fontSize:'0.75rem', borderRadius:'6px', background:'#f8fafc', border:'1px solid #cbd5e1', color:'#334155', fontWeight:'600', cursor:'pointer', display:'flex', alignItems:'center', gap:'0.3rem' }}
                >
                  🏷️ + Add Section Header
                </button>
              </div>

              {/* Add New Category Box */}
              <form onSubmit={handleAddQuickCategory} style={{ display:'flex', gap:'0.4rem', marginBottom:'0.5rem' }}>
                <input
                  type="text"
                  value={quickCatText}
                  onChange={(e) => setQuickCatText(e.target.value)}
                  placeholder="e.g. 9. Payment Gateway"
                  className="input-field"
                  style={{ fontSize:'0.8rem', padding:'0.35rem 0.6rem', flex:1 }}
                />
                <button
                  type="submit"
                  className="btn btn-secondary"
                  style={{ padding:'0.35rem 0.75rem', fontSize:'0.75rem', whiteSpace:'nowrap' }}
                >
                  + Add Category
                </button>
              </form>

              {/* Add New Line / Bullet Box */}
              <form onSubmit={handleAddQuickLine} style={{ display:'flex', gap:'0.4rem', marginBottom:'0.75rem' }}>
                <input
                  type="text"
                  value={quickLineText}
                  onChange={(e) => setQuickLineText(e.target.value)}
                  placeholder="Type new feature line here..."
                  className="input-field"
                  style={{ fontSize:'0.8rem', padding:'0.35rem 0.6rem', flex:1 }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding:'0.35rem 0.75rem', fontSize:'0.75rem', whiteSpace:'nowrap' }}
                >
                  + Add Line
                </button>
              </form>

              {showRawEditor ? (
                <div className="form-group">
                  <label>Raw Scope Text</label>
                  <textarea name="quotationScopeText" value={formData.quotationScopeText} onChange={handleInputChange} className="input-field" rows={12} style={{ resize:'vertical', minHeight:'180px', fontSize:'0.82rem', lineHeight:'1.5' }} />
                </div>
              ) : (
                <div style={{ background:'var(--bg-card, #f8fafc)', border:'1px solid var(--border-color)', borderRadius:'8px', padding:'0.6rem', fontSize:'0.78rem', maxHeight:'280px', overflowY:'auto' }}>
                  <div style={{ fontWeight:'600', color:'var(--text-secondary)', marginBottom:'0.5rem', fontSize:'0.72rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span>List Items (Click line to edit, 🗑️ to delete):</span>
                    <span style={{ fontSize:'0.68rem', color:'var(--primary-500)' }}>{(formData.quotationScopeText || '').split('\n').filter(l => l.trim()).length} items</span>
                  </div>

                  {(formData.quotationScopeText || '').split('\n').map((lineStr, lineIdx) => {
                    const trimmed = lineStr.trim();
                    if (!trimmed) return null;

                    if (trimmed === '[PAGE]') {
                      return (
                        <div key={lineIdx} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', background:'#f3eefc', border:'1px dashed #652bbf', padding:'0.3rem 0.5rem', borderRadius:'6px', margin:'0.3rem 0' }}>
                          <span style={{ fontWeight:'700', color:'#652bbf', fontSize:'0.75rem' }}>📄 PAGE BREAK</span>
                          <button type="button" onClick={() => handleDeleteLine(lineIdx)} style={{ background:'none', border:'none', color:'#ef4444', cursor:'pointer', fontSize:'0.85rem' }} title="Remove Page Break">
                            🗑️
                          </button>
                        </div>
                      );
                    }

                    if (trimmed.startsWith('[SECTION]')) {
                      const secTitle = trimmed.replace('[SECTION]', '').trim();
                      return (
                        <div key={lineIdx} style={{ display:'flex', alignItems:'center', gap:'0.3rem', background:'#f8fafc', border:'1px solid #cbd5e1', padding:'0.3rem 0.5rem', borderRadius:'6px', margin:'0.4rem 0' }}>
                          <span style={{ fontSize:'0.7rem', fontWeight:'700', color:'#334155' }}>🏷️</span>
                          <input 
                            type="text" 
                            value={secTitle}
                            onChange={(e) => handleEditLine(lineIdx, `[SECTION] ${e.target.value}`)}
                            style={{ flex:1, border:'none', background:'transparent', fontWeight:'700', color:'#1e293b', fontSize:'0.78rem' }}
                          />
                          <button type="button" onClick={() => handleDeleteLine(lineIdx)} style={{ background:'none', border:'none', color:'#ef4444', cursor:'pointer', fontSize:'0.85rem' }} title="Delete Section">
                            🗑️
                          </button>
                        </div>
                      );
                    }

                    return (
                      <div key={lineIdx} style={{ display:'flex', alignItems:'center', gap:'0.3rem', padding:'0.15rem 0' }}>
                        <input 
                          type="text" 
                          value={lineStr}
                          onChange={(e) => handleEditLine(lineIdx, e.target.value)}
                          className="input-field"
                          style={{ flex:1, fontSize:'0.75rem', padding:'0.25rem 0.4rem', borderRadius:'4px' }}
                        />
                        <button 
                          type="button" 
                          onClick={() => handleDeleteLine(lineIdx)} 
                          style={{ background:'none', border:'none', color:'#ef4444', cursor:'pointer', fontSize:'0.85rem', padding:'0 0.2rem' }} 
                          title="Delete Line"
                        >
                          🗑️
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            )}

            {/* Section 1.5: Salary Slip Employee & Pay Details */}
            {isPayslip && (

            <div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.75rem',
                color: 'var(--primary-500)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem'
              }}>
                <User size={16} /> Employee Information
              </div>

              <div className="form-group">
                <label htmlFor="candidateName">Employee Name</label>
                <input type="text" id="candidateName" name="candidateName"
                  value={formData.candidateName} onChange={handleInputChange}
                  placeholder="Employee Name" className="input-field" />
              </div>

              <div className="input-row">
                <div className="form-group">
                  <label htmlFor="designation">Designation</label>
                  <input type="text" id="designation" name="designation"
                    value={formData.designation} onChange={handleInputChange}
                    placeholder="Software Engineer" className="input-field" />
                </div>
                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <input type="text" id="department" name="department"
                    value={formData.department} onChange={handleInputChange}
                    placeholder="Engineering" className="input-field" />
                </div>
              </div>

              <div className="input-row">
                <div className="form-group">
                  <label htmlFor="employeeId">Employee ID</label>
                  <input type="text" id="employeeId" name="employeeId"
                    value={formData.employeeId} onChange={handleInputChange}
                    placeholder="43521" className="input-field" />
                </div>
                <div className="form-group">
                  <label htmlFor="joiningDate">Date of Joining</label>
                  <input type="date" id="joiningDate" name="joiningDate"
                    value={formData.joiningDate} onChange={handleInputChange}
                    className="input-field" />
                </div>
              </div>

              <div className="input-row">
                <div className="form-group">
                  <label htmlFor="payPeriod">Pay Period</label>
                  <input type="text" id="payPeriod" name="payPeriod"
                    value={formData.payPeriod} onChange={handleInputChange}
                    placeholder="March 2024" className="input-field" />
                </div>
                <div className="form-group">
                  <label htmlFor="payDate">Pay Date</label>
                  <input type="date" id="payDate" name="payDate"
                    value={formData.payDate} onChange={handleInputChange}
                    className="input-field" />
                </div>
              </div>

              <div className="input-row">
                <div className="form-group">
                  <label htmlFor="paidDays">Paid Days</label>
                  <input type="number" id="paidDays" name="paidDays"
                    value={formData.paidDays} onChange={handleInputChange}
                    placeholder="31" className="input-field" />
                </div>
                <div className="form-group">
                  <label htmlFor="lopDays">LOP Days</label>
                  <input type="number" id="lopDays" name="lopDays"
                    value={formData.lopDays} onChange={handleInputChange}
                    placeholder="0" className="input-field" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="pfAccountNumber">PF Account Number</label>
                <input type="text" id="pfAccountNumber" name="pfAccountNumber"
                  value={formData.pfAccountNumber} onChange={handleInputChange}
                  placeholder="AA/AAA/9999999/99G/9899999" className="input-field" />
              </div>

              <div className="form-group">
                <label htmlFor="uan">UAN Number</label>
                <input type="text" id="uan" name="uan"
                  value={formData.uan} onChange={handleInputChange}
                  placeholder="111111111111" className="input-field" />
              </div>

              {/* Earnings */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontSize: '0.9rem', fontWeight: '700', marginTop: '0.5rem', marginBottom: '0.75rem',
                color: 'var(--primary-500)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem'
              }}>
                <Briefcase size={16} /> Earnings (Monthly / YTD)
              </div>

              <div className="input-row">
                <div className="form-group"><label>Basic (₹/mo)</label>
                  <input type="number" name="earningBasic" value={formData.earningBasic} onChange={handleInputChange} className="input-field" /></div>
                <div className="form-group"><label>Basic YTD</label>
                  <input type="number" name="ytdBasic" value={formData.ytdBasic} onChange={handleInputChange} className="input-field" /></div>
              </div>
              <div className="input-row">
                <div className="form-group"><label>HRA (₹/mo)</label>
                  <input type="number" name="earningHra" value={formData.earningHra} onChange={handleInputChange} className="input-field" /></div>
                <div className="form-group"><label>HRA YTD</label>
                  <input type="number" name="ytdHra" value={formData.ytdHra} onChange={handleInputChange} className="input-field" /></div>
              </div>
              <div className="input-row">
                <div className="form-group"><label>Conveyance (₹/mo)</label>
                  <input type="number" name="earningConveyance" value={formData.earningConveyance} onChange={handleInputChange} className="input-field" /></div>
                <div className="form-group"><label>Conv. YTD</label>
                  <input type="number" name="ytdConveyance" value={formData.ytdConveyance} onChange={handleInputChange} className="input-field" /></div>
              </div>
              <div className="input-row">
                <div className="form-group"><label>Children Ed. (₹/mo)</label>
                  <input type="number" name="earningChildren" value={formData.earningChildren} onChange={handleInputChange} className="input-field" /></div>
                <div className="form-group"><label>Child. YTD</label>
                  <input type="number" name="ytdChildren" value={formData.ytdChildren} onChange={handleInputChange} className="input-field" /></div>
              </div>
              <div className="input-row">
                <div className="form-group"><label>Fixed Allow. (₹/mo)</label>
                  <input type="number" name="earningFixed" value={formData.earningFixed} onChange={handleInputChange} className="input-field" /></div>
                <div className="form-group"><label>Fixed YTD</label>
                  <input type="number" name="ytdFixed" value={formData.ytdFixed} onChange={handleInputChange} className="input-field" /></div>
              </div>

              {/* Deductions */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontSize: '0.9rem', fontWeight: '700', marginTop: '0.5rem', marginBottom: '0.75rem',
                color: 'var(--primary-500)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem'
              }}>
                <ShieldCheck size={16} /> Deductions (Monthly / YTD)
              </div>

              <div className="input-row">
                <div className="form-group"><label>EPF (₹/mo)</label>
                  <input type="number" name="deductionEpf" value={formData.deductionEpf} onChange={handleInputChange} className="input-field" /></div>
                <div className="form-group"><label>EPF YTD</label>
                  <input type="number" name="ytdEpf" value={formData.ytdEpf} onChange={handleInputChange} className="input-field" /></div>
              </div>
              <div className="input-row">
                <div className="form-group"><label>Prof. Tax (₹/mo)</label>
                  <input type="number" name="deductionProfTax" value={formData.deductionProfTax} onChange={handleInputChange} className="input-field" /></div>
                <div className="form-group"><label>Prof. Tax YTD</label>
                  <input type="number" name="ytdProfTax" value={formData.ytdProfTax} onChange={handleInputChange} className="input-field" /></div>
              </div>

              {/* Company Signatory for Payslip */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                fontSize: '0.9rem', fontWeight: '700', marginTop: '0.5rem', marginBottom: '0.75rem',
                color: 'var(--primary-500)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem'
              }}>
                <ShieldCheck size={16} /> HR / Signatory
              </div>
              <div className="input-row">
                <div className="form-group">
                  <label htmlFor="signatoryName">Signatory Name</label>
                  <input type="text" id="signatoryName" name="signatoryName"
                    value={formData.signatoryName} onChange={handleInputChange}
                    placeholder="Aman Singh" className="input-field" />
                </div>
                <div className="form-group">
                  <label htmlFor="signatoryDesignation">Signatory Role</label>
                  <input type="text" id="signatoryDesignation" name="signatoryDesignation"
                    value={formData.signatoryDesignation} onChange={handleInputChange}
                    placeholder="HR Manager" className="input-field" />
                </div>
              </div>
            </div>
            )}

            {/* Section 2: Schedule & Terms - Letter only */}
            {!isPayslip && !isQuotation && (
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
                <Calendar size={16} /> Schedule & Conditions
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
                  <label htmlFor="startDate">Start Date</label>
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
                  <label htmlFor="ctcOffered">CTC Offered</label>
                  <input 
                    type="text" 
                    id="ctcOffered" 
                    name="ctcOffered"
                    value={formData.ctcOffered}
                    onChange={handleInputChange}
                    placeholder="â‚¹ 6,00,000/- Per Annum"
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
                    placeholder="6 Months"
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
                    placeholder="9:00 AM to 6:00 PM"
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
            </div>
            )}

            {/* Section 2.5: Certificate Settings (Only if letterType is Certificate) */}
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
                    <button type="button" onClick={generateUniqueCertificateId} style={{ fontSize:'0.68rem', background:'none', border:'none', color:'var(--primary-500)', cursor:'pointer', fontWeight:'600' }}>
                      ⚡ Generate Unique
                    </button>
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
                  {isCertDuplicate && (
                    <span style={{ color: '#ef4444', fontSize: '0.72rem', fontWeight: 'bold', marginTop: '0.2rem', display: 'block' }}>
                      ⚠️ Certificate ID "{formData.certificateId}" is ALREADY registered!
                    </span>
                  )}
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

                <div className="form-group">
                  <label htmlFor="certDescription">Appraisal Description</label>
                  <textarea 
                    id="certDescription" 
                    name="certDescription"
                    value={formData.certDescription}
                    onChange={handleInputChange}
                    placeholder="Enter appraisal..."
                    className="input-field"
                    rows={3}
                    style={{ resize: 'vertical', minHeight: '60px', fontSize: '0.85rem', lineHeight: '1.4' }}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Use <code>{`{pronounSubject}`}</code> (he/she/they) as placeholder.
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="certClosingText">Future Wishes Text</label>
                  <textarea 
                    id="certClosingText" 
                    name="certClosingText"
                    value={formData.certClosingText}
                    onChange={handleInputChange}
                    placeholder="Enter closing wishes..."
                    className="input-field"
                    rows={2}
                    style={{ resize: 'vertical', minHeight: '40px', fontSize: '0.85rem', lineHeight: '1.4' }}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Use <code>{`{pronounObject}`}</code> (him/her/them) and <code>{`{pronounPossessive}`}</code> (his/her/their).
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="certAppreciationText">Appreciation Ribbon</label>
                  <input 
                    type="text" 
                    id="certAppreciationText" 
                    name="certAppreciationText"
                    value={formData.certAppreciationText}
                    onChange={handleInputChange}
                    placeholder="We appreciate your contributions..."
                    className="input-field"
                  />
                </div>
              </div>
            )}

            {/* Section 3: Manager & Reference - Letter only */}
            {!isPayslip && !isQuotation && (
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
                    placeholder="Engineering Manager"
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
                    placeholder="Aman Singh"
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
                    placeholder="HR Manager"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="input-row">
                <div className="form-group">
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <label htmlFor="refNumber">Ref Number</label>
                    <button type="button" onClick={generateUniqueRefNumber} style={{ fontSize:'0.68rem', background:'none', border:'none', color:'var(--primary-500)', cursor:'pointer', fontWeight:'600' }}>
                      ⚡ Generate Unique
                    </button>
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
                  {isRefDuplicate && (
                    <span style={{ color: '#ef4444', fontSize: '0.72rem', fontWeight: 'bold', marginTop: '0.2rem', display: 'block' }}>
                      ⚠️ Ref No "{formData.refNumber}" is ALREADY registered!
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="signatureText">Digital Signature</label>
                  <input 
                    type="text" 
                    id="signatureText" 
                    name="signatureText"
                    value={formData.signatureText}
                    onChange={handleInputChange}
                    placeholder="Aman Singh"
                    className="input-field"
                  />
                </div>
              </div>
            </div>
            )}

            {/* Section 4: Web Company Details - Letter only */}
            {!isPayslip && !isQuotation && (
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

              <div className="form-group">
                <label htmlFor="companyAddress">Company Address</label>
                <input 
                  type="text" 
                  id="companyAddress" 
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleInputChange}
                  placeholder="A90, Sector 4, Noida, Uttar Pradesh, 201301"
                  className="input-field"
                />
              </div>
            </div>
            )}
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', paddingTop: '1.5rem' }}>
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
              <span>{isCertificate ? 'Live A4 Landscape Certificate Preview' : isPayslip ? 'Live A4 Salary Slip Preview' : isPPO ? 'Live A4 PPO Letter Preview' : isQuotation ? 'Live Dynamic Quotation Preview' : 'Live 2-Page A4 Letterhead Preview'}</span>
              <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--border-color)', padding: '2px 8px', borderRadius: '12px' }}>
                {isCertificate ? '1123 x 794 px' : '794 x 1123 px'}
              </span>
            </div>
            
            {/* Visual Live Preview */}
            {isQuotation ? (
              renderQuotationPages(false)
            ) : (
              <>
                <div id="live-preview-letter-1" className={`paper-page ${isCertificate ? 'landscape' : isPayslip ? 'payslip' : ''}`}>
                  {isCertificate ? certificateHTML() : isPayslip ? payslipHTML() : isPPO ? ppoHTML() : page1HTML()}
                </div>

                {/* Visual Live Preview - Page 2 */}
                {!isCertificate && !isPayslip && !isPPO && (
                  <div id="live-preview-letter-2" className="paper-page" style={{ marginTop: '1.5rem' }}>
                    {page2HTML()}
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* 
        This is an off-screen container that renders the exact same A4 page but is 
        NEVER scaled down or affected by media queries. html2canvas will snapshot this 
        for flawless high-resolution vector extraction.
      */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        {isQuotation ? (
          renderQuotationPages(true)
        ) : (
          <>
            <div id="printable-page-1" className={`paper-page ${isCertificate ? 'landscape' : isPayslip ? 'payslip' : ''}`} style={{ transform: 'none', boxShadow: 'none' }}>
              {isCertificate ? certificateHTML() : isPayslip ? payslipHTML() : isPPO ? ppoHTML() : page1HTML()}
            </div>
            {!isCertificate && !isPayslip && !isPPO && (
              <div id="printable-page-2" className="paper-page" style={{ transform: 'none', boxShadow: 'none' }}>
                {page2HTML()}
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Keyframe animation for spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes slideInToast {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
      `}</style>

      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.75rem 1.25rem',
          borderRadius: '10px',
          fontSize: '0.875rem',
          fontWeight: '600',
          boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
          animation: 'slideInToast 0.3s ease',
          backgroundColor: toast.type === 'success' ? '#10b981' : '#ef4444',
          color: '#ffffff',
          fontFamily: 'var(--font-sans)'
        }}>
          <span style={{ fontSize: '1.1rem' }}>{toast.type === 'success' ? '📊' : '⚠️'}</span>
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default App;