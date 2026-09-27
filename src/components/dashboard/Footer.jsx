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

        {/* Social Media Channels */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              border: '1px solid rgba(226, 232, 240, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#E1306C';
              e.currentTarget.style.borderColor = 'rgba(225, 48, 108, 0.4)';
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(225, 48, 108, 0.22)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#64748B';
              e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.95)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.04)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              border: '1px solid rgba(226, 232, 240, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#0A66C2';
              e.currentTarget.style.borderColor = 'rgba(10, 102, 194, 0.4)';
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(10, 102, 194, 0.22)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#64748B';
              e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.95)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.04)';
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z"/>
            </svg>
          </a>

          {/* X (Twitter) */}
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            title="X (Twitter)"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              border: '1px solid rgba(226, 232, 240, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#090C15';
              e.currentTarget.style.borderColor = 'rgba(9, 12, 21, 0.4)';
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(9, 12, 21, 0.18)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#64748B';
              e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.95)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.04)';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            title="YouTube"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              border: '1px solid rgba(226, 232, 240, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FF0000';
              e.currentTarget.style.borderColor = 'rgba(255, 0, 0, 0.4)';
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 0, 0, 0.22)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#64748B';
              e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.95)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.04)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
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
