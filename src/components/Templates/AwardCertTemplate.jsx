import React from 'react';
import { Award, Trophy, Star, ShieldCheck, MapPin, Globe, Mail, Phone } from 'lucide-react';
import companyLogo from '../../assets/logo.png';
import { formatDateLong, capitalizeName } from '../../utils/formatters';

export const AwardCertTemplate = ({ formData }) => {
  const formattedIssueDate = formatDateLong(formData.issueDate);

  const awardTitle = formData.awardType || 'EMPLOYEE OF THE MONTH';
  const awardPeriod = formData.awardPeriod || 'August 2026';
  const citationText = formData.awardCitation || 'In recognition of outstanding performance, exceptional dedication, and remarkable contributions toward achieving organizational excellence.';

  return (
    <div className="award-cert-container" style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#ffffff',
      color: '#0f172a',
      fontFamily: "'Outfit', 'Inter', sans-serif",
      position: 'relative',
      boxSizing: 'border-box',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'hidden'
    }}>
      {/* Luxury Gold & Navy Double Outer Frame */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        right: '12px',
        bottom: '12px',
        border: '3px solid #1e3a8a',
        borderRadius: '6px',
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '18px',
        left: '18px',
        right: '18px',
        bottom: '18px',
        border: '1px solid #d97706',
        borderRadius: '4px',
        pointerEvents: 'none'
      }}></div>

      {/* Top Header Section with Logo & Company Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src={companyLogo} 
            alt={formData.companyName} 
            style={{ height: '48px', objectFit: 'contain' }}
            crossOrigin="anonymous"
          />
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1e3a8a', letterSpacing: '0.5px' }}>
              {formData.companyName}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '600' }}>
              {formData.companyTagline}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right', fontSize: '0.72rem', color: '#475569', lineHeight: '1.4' }}>
          <div><strong>Cert ID:</strong> <span style={{ color: '#d97706', fontWeight: 700 }}>{formData.certificateId || 'MMSS/AWD/CERT/2026/0894'}</span></div>
          <div><strong>Date:</strong> {formattedIssueDate}</div>
        </div>
      </div>

      {/* Main Certificate Title & Badge */}
      <div style={{ textAlign: 'center', margin: '8px 0', zIndex: 2 }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          backgroundColor: '#fef3c7', 
          color: '#b45309', 
          padding: '4px 16px', 
          borderRadius: '20px', 
          fontSize: '0.75rem', 
          fontWeight: '700',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginBottom: '6px',
          border: '1px solid #fde68a'
        }}>
          <Trophy size={14} /> {awardPeriod} HONOREE
        </div>

        <h1 style={{
          fontSize: '2.2rem',
          fontWeight: '900',
          color: '#1e3a8a',
          margin: '4px 0',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-heading)'
        }}>
          CERTIFICATE OF EXCELLENCE
        </h1>

        <div style={{
          fontSize: '0.85rem',
          color: '#64748b',
          fontWeight: '600',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          marginTop: '2px'
        }}>
          THIS CERTIFICATE IS PROUDLY PRESENTED TO
        </div>
      </div>

      {/* Recipient Name Area */}
      <div style={{ textAlign: 'center', margin: '4px 0', zIndex: 2 }}>
        <div style={{
          fontSize: '2.1rem',
          fontWeight: '800',
          color: '#0f172a',
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: 'italic',
          paddingBottom: '4px'
        }}>
          {capitalizeName(formData.candidateName)}
        </div>
        
        <div style={{
          width: '260px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #d97706, #1e3a8a, #d97706, transparent)',
          margin: '0 auto 6px auto'
        }}></div>

        {formData.designation && (
          <div style={{ fontSize: '0.9rem', color: '#1e3a8a', fontWeight: '700' }}>
            {formData.designation} {formData.department ? `— ${formData.department}` : ''}
          </div>
        )}
      </div>

      {/* Citation Body */}
      <div style={{ 
        maxWidth: '82%', 
        margin: '0 auto', 
        textAlign: 'center', 
        fontSize: '0.82rem', 
        color: '#334155', 
        lineHeight: '1.5',
        fontStyle: 'italic',
        zIndex: 2 
      }}>
        "{citationText}"
      </div>

      {/* Gold Seal & Dual Signatures Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '12px', zIndex: 2 }}>
        
        {/* Left Signature Block */}
        <div style={{ textAlign: 'center', minWidth: '150px' }}>
          {formData.signatureText && (
            <div style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: '1.4rem',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '2px'
            }}>
              {capitalizeName(formData.signatoryName || 'Aman Singh')}
            </div>
          )}
          <div style={{ width: '130px', height: '1px', backgroundColor: '#94a3b8', margin: '0 auto 4px auto' }}></div>
          <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#0f172a' }}>
            {capitalizeName(formData.signatoryName || 'Aman Singh')}
          </div>
          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
            {formData.signatoryDesignation || 'HR Manager'}
          </div>
        </div>

        {/* Center Golden Award Badge */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b, #d97706, #b45309)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(217, 119, 6, 0.35)',
            border: '3px solid #ffffff'
          }}>
            <Star size={32} fill="#ffffff" />
          </div>
          <div style={{ fontSize: '0.65rem', fontWeight: '800', color: '#b45309', marginTop: '4px', letterSpacing: '1px' }}>
            OFFICIAL AWARD
          </div>
        </div>

        {/* Right Signature Block */}
        <div style={{ textAlign: 'center', minWidth: '150px' }}>
          <div style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '1.4rem',
            fontWeight: '700',
            color: '#0f172a',
            marginBottom: '2px'
          }}>
            {formData.secondarySignatoryName || 'Managing Director'}
          </div>
          <div style={{ width: '130px', height: '1px', backgroundColor: '#94a3b8', margin: '0 auto 4px auto' }}></div>
          <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#0f172a' }}>
            {formData.secondarySignatoryName || 'Director'}
          </div>
          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
            Executive Director
          </div>
        </div>

      </div>

      {/* Bottom Ribbon Contact Strip (Cleanly fitted within border lines) */}
      <div style={{
        backgroundColor: '#1e3a8a',
        color: '#ffffff',
        margin: '12px -8px -8px -8px',
        padding: '6px 16px',
        borderRadius: '0 0 4px 4px',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        fontSize: '0.68rem',
        zIndex: 2
      }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span><MapPin size={10} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {formData.companyAddress}</span>
          <span><Globe size={10} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {formData.companyWebsite}</span>
        </div>
        <div>
          <span><Phone size={10} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> {formData.companyMobile || '+91 92772 67732'}</span>
        </div>
      </div>
    </div>
  );
};
