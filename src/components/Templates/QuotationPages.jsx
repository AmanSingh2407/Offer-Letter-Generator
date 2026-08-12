import React from 'react';
import companyLogo from '../../assets/logo.png';
import { formatDateLong, formatCurrency, numberToWords } from '../../utils/formatters';
import { parseQuotationScope } from '../../utils/quotationParser';

export const QuotationPages = ({ formData, isPrintableContainer = false }) => {
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
