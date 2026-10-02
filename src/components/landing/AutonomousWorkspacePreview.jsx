import React from 'react';

export default function AutonomousWorkspacePreview({ onLaunchApp }) {
  return (
    <section 
      id="features"
      style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        paddingTop: '60px',
        paddingBottom: '70px',
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
        @media (max-width: 768px) {
          .workspace-header-overlay {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            width: 100% !important;
            margin-bottom: 24px !important;
          }
        }
      `}</style>

      {/* Main Container */}
      <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        
        {/* Aspect-Ratio 16:9 Video Canvas Frame (Prevents fall.mp4 from zooming in) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1920 / 1080',
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px -15px rgba(15, 23, 42, 0.08)'
          }}
        >
          {/* 1. Background Video fall.mp4 (Natural 1920x1080, No Zoom, No Distortion) */}
          <video
            autoPlay
            loop
            muted
            playsInline
            src="/fall.mp4"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          {/* 2. Top-Left Header Overlay in the open white area */}
          <div
            className="workspace-header-overlay"
            style={{
              position: 'absolute',
              top: '6.5%',
              left: '4.5%',
              width: '46%',
              zIndex: 10,
              textAlign: 'left'
            }}
          >
            {/* Main Title */}
            <h2
              style={{
                fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: 'clamp(22px, 3.2vw, 48px)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1.08,
                color: '#090D16',
                margin: '0 0 12px 0'
              }}
            >
              Explore the Autonomous<br />Candidate Workspace
            </h2>

            {/* Subtitle Paragraph */}
            <p
              style={{
                fontSize: 'clamp(11px, 1.15vw, 15px)',
                lineHeight: 1.5,
                color: '#475569',
                maxWidth: '480px',
                margin: '0 0 18px 0',
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
                  filter: 'blur(12px)',
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
                  gap: '6px',
                  padding: 'clamp(8px, 0.9vw, 12px) clamp(16px, 1.8vw, 26px)',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.96)',
                  border: '1px solid rgba(251, 146, 60, 0.65)',
                  boxShadow: '0 4px 18px rgba(249, 115, 22, 0.3)',
                  color: '#0F172A',
                  fontSize: 'clamp(10px, 0.9vw, 12.5px)',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(249, 115, 22, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 18px rgba(249, 115, 22, 0.3)';
                }}
              >
                <span>SEE IN ACTION</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* 3. macOS Window with pic1 contained inside the exact black rectangle on fall.mp4 */}
          <div
            style={{
              position: 'absolute',
              left: '18.39%',
              top: '50.93%',
              width: '53.23%',
              height: '49.07%',
              borderRadius: '12px 12px 0 0',
              overflow: 'hidden',
              backgroundColor: '#090D16',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              borderBottom: 'none',
              boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 8
            }}
          >
            {/* macOS Title Bar Header */}
            <div
              style={{
                flexShrink: 0,
                height: 'clamp(22px, 3.2%, 36px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 12px',
                backgroundColor: '#0F131D',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                userSelect: 'none'
              }}
            >
              {/* macOS Window Traffic Lights */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FF5F56', border: '0.5px solid #E0443E', display: 'inline-block' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFBD2E', border: '0.5px solid #DEA123', display: 'inline-block' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#27C93F', border: '0.5px solid #1AAB29', display: 'inline-block' }} />
              </div>

              {/* Status Pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '2px 12px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#94A3B8',
                  fontSize: 'clamp(9px, 0.8vw, 11.5px)',
                  fontWeight: 500
                }}
              >
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                candidates.jobgen.ai/workspace
              </div>

              {/* Spacer for symmetry */}
              <div style={{ width: '36px' }} />
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

        {/* Bottom Marquee Ticker */}
        <div style={{ marginTop: '40px', overflow: 'hidden', position: 'relative', zIndex: 10 }}>
          <p style={{ fontSize: '12px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px', textAlign: 'center' }}>
            Everything you need for autonomous career advancement:
          </p>
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
                    fontSize: '13px', 
                    fontWeight: 650, 
                    color: '#334155' 
                  }}
                >
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#1A53CF' }} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
