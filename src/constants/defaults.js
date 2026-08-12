// Default initial state matching all constraints requested by the user
export const DEFAULTS = {
  candidateName: 'Aman Singh',
  candidateEmail: 'aman.singh@email.com',
  candidateAddress: '123, Green Park, Kushinagar, Uttar Pradesh - 274402',
  candidateMobile: '+91 98765 43210',
  ctcOffered: '₹ 6,00,000/- Per Annum',
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
  companyMobile: '+91 92772 67732',
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
  ppoCTC: '₹ 6,00,000/- Per Annum',
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
  // Increment Letter default parameters
  previousCTC: '₹ 6,00,000/- Per Annum',
  revisedCTC: '₹ 7,50,000/- Per Annum',
  incrementPercentage: '25% Hike (₹ 1,50,000/- PA)',
  incrementEffectiveDate: '2026-04-01',
  incrementIntro: 'In recognition of your exceptional performance, dedication, and invaluable contributions to {companyName}, management is pleased to announce a revision in your compensation package. We appreciate your hard work and commitment toward driving our organizational goals.',
  incrementClosing: 'We look forward to your continued effort, leadership, and dedication toward scaling new heights with {companyName}. Congratulations once again!',
  // NDA (Non-Disclosure Agreement) default parameters
  ndaPartyType: 'Employee / Contractor',
  ndaEffectiveDate: '2026-08-12',
  ndaDuration: '2 Years Post Termination',
  ndaJurisdiction: 'Noida, Uttar Pradesh',
  ndaPurpose: 'WHEREAS, Disclosing Party and Receiving Party wish to explore or engage in business discussions, employment, or project collaboration during which Disclosing Party may disclose confidential, proprietary, and technical information to Receiving Party.',
  // Termination Letter default parameters
  terminationLastDay: '2026-08-31',
  terminationNoticeStatus: '30 Days Notice Served',
  terminationReason: 'End of Fixed-Term Contract',
  terminationIntro: 'This letter serves as formal notification that your employment with {companyName} as {designation} will terminate effective on {terminationLastDay}. We appreciate your contributions during your tenure with us and wish to ensure a smooth transition process.',
  terminationClosing: 'We thank you for your service with {companyName} and wish you success in your future professional endeavors.',
  // Employee Award Certificate default parameters
  awardType: 'EMPLOYEE OF THE MONTH',
  awardPeriod: 'August 2026',
  awardCitation: 'In recognition of outstanding performance, exceptional dedication, and remarkable contributions toward achieving organizational excellence at Mind Manthan Software Solutions.',
  secondarySignatoryName: 'Managing Director',
  // Quotation Default parameters
  quotationNo: 'A000029',
  quotationDate: '2026-07-29',
  validTillDate: '2026-08-08',
  quotationMobile: '+91 92772 67732',
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

export const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbw3ugfSNJqd26i5oI2jpk_n6pp61uibF-vTeYs4Fa8Pn168eEKs3x6ui7yOLShwtx8/exec';
