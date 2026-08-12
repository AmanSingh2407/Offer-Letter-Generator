// Helper to parse scope & feature breakdown for Quotation generator
export const parseQuotationScope = (text) => {
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
