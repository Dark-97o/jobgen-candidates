import React from 'react';

export default function Footer() {
  return (
    <footer 
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1680px',
        margin: '35px auto 0 auto',
        padding: '0 clamp(16px, 2.5vw, 40px) 24px clamp(16px, 2.5vw, 40px)',
        boxSizing: 'border-box',
        zIndex: 2,
      }}
    >
      {/* Giant Condensed "JOBGEN.AI" with Minimal Letter Spacing & Atmospheric Transparency */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          userSelect: 'none',
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            fontSize: 'clamp(85px, 14.5vw, 230px)',
            fontWeight: 700,
            fontFamily: '"Teko", "Bebas Neue", sans-serif',
            letterSpacing: '-0.02em',
            lineHeight: 0.78,
            color: '#2563EB',
            opacity: 0.28,
            whiteSpace: 'nowrap',
            display: 'inline-block',
          }}
        >
          JOBGEN.AI
        </span>
      </div>

      {/* Horizontal Divider Line */}
      <div 
        style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.04) 0%, rgba(37, 99, 235, 0.28) 40%, rgba(37, 99, 235, 0.28) 60%, rgba(255, 255, 255, 0.04) 100%)',
          margin: '18px 0 14px 0',
        }}
      />

      {/* Copyrights & System Footer Bar */}
      <div 
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          paddingBottom: '8px',
          fontSize: 'clamp(11px, 0.9vw, 13px)',
          color: '#64748B',
          fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
        }}
      >
        {/* Copyright notice */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#94A3B8', fontWeight: 600 }}>
            © 2026 JobGen.AI Technologies Inc. All rights reserved.
          </span>
          <span style={{ color: '#475569' }}>•</span>
          <span style={{ color: '#64748B' }}>Built for ambitious candidates worldwide</span>
        </div>

        {/* Policy Links & Operational Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ cursor: 'pointer', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.target.style.color = '#94A3B8'} onMouseLeave={(e) => e.target.style.color = '#64748B'}>Privacy Policy</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.target.style.color = '#94A3B8'} onMouseLeave={(e) => e.target.style.color = '#64748B'}>Terms of Service</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.target.style.color = '#94A3B8'} onMouseLeave={(e) => e.target.style.color = '#64748B'}>Security</span>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.28)',
              padding: '3px 10px',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: 700,
              color: '#10B981',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 8px #10B981' }} />
            All Systems Operational
          </div>
        </div>
      </div>
    </footer>
  );
}
