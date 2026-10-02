import React from 'react';

export default function AutonomousWorkspacePreview({ onLaunchApp }) {
  return (
    <section 
      id="features"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingTop: '72px',
        paddingBottom: '0',
        overflow: 'hidden'
      }}
    >
      <style>{`
        @keyframes whiteMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-white-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: whiteMarquee 28s linear infinite;
        }
        .animate-white-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header Container (Full-bleed section, clean left-aligned text) */}
      <div 
        style={{ 
          maxWidth: '1240px', 
          margin: '0 auto', 
          padding: '0 24px', 
          position: 'relative', 
          zIndex: 20, 
          textAlign: 'left',
          marginBottom: '20px'
        }}
      >
        <div style={{ maxWidth: '780px' }}>
          {/* Main Title */}
          <h2
            style={{
              fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: 'clamp(32px, 4.5vw, 64px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1.06,
              color: '#090D16',
              margin: '0 0 16px 0'
            }}
          >
            Explore the Autonomous<br />Candidate Workspace
          </h2>

          {/* Subtitle Paragraph */}
          <p
            style={{
              fontSize: 'clamp(14px, 1.4vw, 17px)',
              lineHeight: 1.6,
              color: '#475569',
              maxWidth: '560px',
              margin: '0 0 24px 0',
              fontWeight: 500
            }}
          >
            JobGen, an AI-powered autonomous platform, serves as an all-in-one workspace replacing fragmented job boards, manual trackers, and generic interview prep.
          </p>

          {/* Pill CTA Button with Radiant Amber Halo */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div
              style={{
                position: 'absolute',
                inset: '-4px',
                borderRadius: '9999px',
                background: 'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.7) 0%, rgba(249, 115, 22, 0) 75%)',
                filter: 'blur(14px)',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />

            <button
              onClick={onLaunchApp}
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.96)',
                border: '1px solid rgba(251, 146, 60, 0.65)',
                boxShadow: '0 4px 20px rgba(249, 115, 22, 0.3)',
                color: '#0F172A',
                fontSize: '12.5px',
                fontWeight: 800,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 26px rgba(249, 115, 22, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(249, 115, 22, 0.3)';
              }}
            >
              <span>SEE IN ACTION</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full-Bleed Section Video & pic1 (Scaled 1.5x, Fully Covering Section without Boxed Margin) */}
      <div 
        style={{ 
          position: 'relative', 
          width: '100%', 
          overflow: 'hidden',
          backgroundColor: '#FFFFFF'
        }}
      >
        {/* 150% Width Wrapper (Centered with -25% margin, scales fall.mp4 and pic1 by 50%) */}
        <div
          style={{
            position: 'relative',
            width: '150%',
            marginLeft: '-25%',
            aspectRatio: '1920 / 1080'
          }}
        >
          {/* Background Video fall.mp4 (Scaled 50% larger) */}
          <video
            autoPlay
            loop
            muted
            playsInline
            src="/fall.mp4"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              pointerEvents: 'none'
            }}
          />

          {/* pic1 Image inside the exact black rectangle on fall.mp4 with macOS window border */}
          <div
            style={{
              position: 'absolute',
              left: '18.39%',
              top: '50.93%',
              width: '53.23%',
              height: '49.07%',
              borderRadius: '14px 14px 0 0',
              overflow: 'hidden',
              backgroundColor: '#090D16',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              borderBottom: 'none',
              boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 5
            }}
          >
            {/* macOS Title Bar Header */}
            <div
              style={{
                flexShrink: 0,
                height: 'clamp(24px, 3.2%, 38px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 14px',
                backgroundColor: '#0F131D',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                userSelect: 'none'
              }}
            >
              {/* macOS Window Traffic Lights */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#FF5F56', border: '0.5px solid #E0443E', display: 'inline-block' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#FFBD2E', border: '0.5px solid #DEA123', display: 'inline-block' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#27C93F', border: '0.5px solid #1AAB29', display: 'inline-block' }} />
              </div>

              {/* Status Address Pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 14px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#94A3B8',
                  fontSize: 'clamp(9px, 0.8vw, 12px)',
                  fontWeight: 500
                }}
              >
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                candidates.jobgen.ai/workspace
              </div>

              <div style={{ width: '40px' }} />
            </div>

            {/* pic1 Image inside the black canvas */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden', backgroundColor: '#090D16' }}>
              <img
                src="/pic1.png"
                alt="Autonomous Candidate Workspace"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  display: 'block'
                }}
              />
            </div>
          </div>
        </div>

        {/* Black Fade at the bottom covering the base with the feature ticker ON the fade */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '240px',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(9, 13, 22, 0.45) 25%, rgba(9, 13, 22, 0.85) 60%, #090D16 85%, #090D16 100%)',
            zIndex: 15,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingBottom: '28px',
            pointerEvents: 'auto'
          }}
        >
          <div style={{ width: '100%', maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
            {/* Header text ON the black fade */}
            <p
              style={{
                fontSize: '12px',
                color: '#94A3B8',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '14px',
                textAlign: 'center'
              }}
            >
              Everything you need for autonomous career advancement:
            </p>

            {/* Marquee ticker ON the black fade */}
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', position: 'relative' }}>
              <div className="animate-white-marquee">
                {[
                  'ATS Resume Studio',
                  'Opportunity Kanban Pipeline',
                  'Real-time AI Match Scoring',
                  'STAR Interview Prep Copilot',
                  '12-Week Strategic Career Plan',
                  'Tailored Cover Letter Studio',
                  '1-Click Chrome Extension',
                  'Salary & Equity Benchmark'
                ].concat([
                  'ATS Resume Studio',
                  'Opportunity Kanban Pipeline',
                  'Real-time AI Match Scoring',
                  'STAR Interview Prep Copilot',
                  '12-Week Strategic Career Plan',
                  'Tailored Cover Letter Studio',
                  '1-Click Chrome Extension',
                  'Salary & Equity Benchmark'
                ]).map((item, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginRight: '36px',
                      fontSize: '13.5px',
                      fontWeight: 650,
                      color: '#F8FAFC'
                    }}
                  >
                    <span 
                      style={{ 
                        width: '6px', 
                        height: '6px', 
                        borderRadius: '50%', 
                        backgroundColor: '#38BDF8', 
                        boxShadow: '0 0 8px #38BDF8' 
                      }} 
                    />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
