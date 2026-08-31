// Helper: Format date into readable string, e.g. "08 May 2025"
export const formatDateLong = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

// Helper: Get pronouns based on selected gender
export const getGenderPronouns = (gender) => {
  const g = (gender || 'Male').toLowerCase();
  if (g === 'female') {
    return {
      subject: 'she',
      object: 'her',
      possessive: 'her',
      title: 'Ms.',
      relation: 'daughter of'
    };
  } else if (g === 'other') {
    return {
      subject: 'they',
      object: 'them',
      possessive: 'their',
      title: 'Mx.',
      relation: 'child of'
    };
  } else {
    return {
      subject: 'he',
      object: 'him',
      possessive: 'his',
      title: 'Mr.',
      relation: 'son of'
    };
  }
};

// Helper: Capitalize Name to Title Case
export const capitalizeName = (str) => {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Helper: Format Number into INR Currency representation
export const formatCurrency = (amount) => {
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) return '₹0.00';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numericAmount);
};

// Helper: Convert Number to formal Indian Rupee Word notation
export const numberToWords = (num) => {
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
export const replacePlaceholders = (text, formData) => {
  if (!text) return '';
  const pronouns = getGenderPronouns(formData.candidateGender);
  return text
    .replace(/{candidateName}/g, capitalizeName(formData.candidateName))
    .replace(/{parentName}/g, capitalizeName(formData.parentName))
    .replace(/{relation}/g, pronouns.relation)
    .replace(/{designation}/g, formData.designation)
    .replace(/{companyName}/g, formData.companyName)
    .replace(/{companyEmail}/g, formData.companyEmail)
    .replace(/{companyMobile}/g, formData.companyMobile)
    .replace(/{department}/g, formData.department)
    .replace(/{startDate}/g, formatDateLong(formData.startDate))
    .replace(/{employmentType}/g, formData.employmentType)
    .replace(/{probationPeriod}/g, formData.probationPeriod)
    .replace(/{companyWebsite}/g, formData.companyWebsite)
    .replace(/{certificateId}/g, formData.certificateId)
    .replace(/{internshipStartDate}/g, formatDateLong(formData.internshipStartDate))
    .replace(/{internshipEndDate}/g, formatDateLong(formData.internshipEndDate))
    .replace(/{experienceStartDate}/g, formatDateLong(formData.experienceStartDate || formData.startDate))
    .replace(/{experienceEndDate}/g, formatDateLong(formData.experienceEndDate || formData.issueDate))
    .replace(/{pronounSubject}/g, pronouns.subject)
    .replace(/{pronounObject}/g, pronouns.object)
    .replace(/{pronounPossessive}/g, pronouns.possessive)
    .replace(/{pronounSubjectCap}/g, pronouns.subject.charAt(0).toUpperCase() + pronouns.subject.slice(1))
    .replace(/{pronounObjectCap}/g, pronouns.object.charAt(0).toUpperCase() + pronouns.object.slice(1))
    .replace(/{pronounPossessiveCap}/g, pronouns.possessive.charAt(0).toUpperCase() + pronouns.possessive.slice(1))
    .replace(/{titlePronoun}/g, pronouns.title);
};
