import React from 'react';
import companyLogo from '../../assets/logo.png';
import { formatDateLong, capitalizeName, formatCurrency, numberToWords } from '../../utils/formatters';

export const PayslipTemplate = ({ formData }) => {
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
