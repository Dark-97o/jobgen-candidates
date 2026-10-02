import React from 'react';

export default function AutonomousWorkspacePreview({ onLaunchApp }) {
  return (
    <section 
      id="features"
      style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        paddingTop: '96px',
        paddingBottom: '100px',
        overflow: 'hidden'
      }}
    >
      {/* Background Video: /fall.mp4 */}
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
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Main Container */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        
        {/* =========================================================================
            1. LEFT-ALIGNED HEADER
            ========================================================================= */}
        <div style={{ textAlign: 'left', maxWidth: '780px', marginBottom: '46px', position: 'relative', zIndex: 12 }}>
          {/* Main Title */}
          <h2
            style={{
              fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: 'clamp(38px, 5.2vw, 70px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: '#090D16',
              margin: '0 0 18px 0'
            }}
          >
            Explore the Autonomous<br />Candidate Workspace
          </h2>

          {/* Subtitle Paragraph */}
          <p
            style={{
              fontSize: 'clamp(15px, 1.5vw, 17px)',
              lineHeight: 1.6,
              color: '#475569',
              maxWidth: '560px',
              margin: '0 0 28px 0',
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
                filter: 'blur(16px)',
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
                border: '1px solid rgba(251, 146, 60, 0.55)',
                boxShadow: '0 4px 22px rgba(249, 115, 22, 0.28), 0 1px 3px rgba(0, 0, 0, 0.08)',
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
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(249, 115, 22, 0.42)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 22px rgba(249, 115, 22, 0.28)';
              }}
            >
              <span>SEE IN ACTION</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            2. MACOS BORDER WINDOW WITH BLACK CANVAS & PIC1 IMAGE
            ========================================================================= */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            borderRadius: '16px',
            backgroundColor: '#090D16',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            boxShadow: '0 30px 90px -10px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.08)',
            overflow: 'hidden',
            zIndex: 10
          }}
        >
          {/* macOS Title Bar Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 18px',
              backgroundColor: '#0F131D',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              userSelect: 'none'
            }}
          >
            {/* macOS Window Traffic Lights */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FF5F56', border: '0.5px solid #E0443E', display: 'inline-block' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FFBD2E', border: '0.5px solid #DEA123', display: 'inline-block' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27C93F', border: '0.5px solid #1AAB29', display: 'inline-block' }} />
            </div>

            {/* Address Bar / Status Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 20px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#94A3B8',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.01em'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              candidates.jobgen.ai/workspace
            </div>

            {/* Spacer for symmetry */}
            <div style={{ width: '56px' }} />
          </div>

          {/* Black Canvas with pic1.png inside */}
          <div style={{ position: 'relative', width: '100%', backgroundColor: '#090D16', overflow: 'hidden' }}>
            <img
              src="/pic1.png"
              alt="Autonomous Candidate Workspace"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>

        {/* =========================================================================
            3. BOTTOM MARQUEE TICKER (FEATURE HIGHLIGHTS)
            ========================================================================= */}
        <div style={{ marginTop: '54px', overflow: 'hidden', position: 'relative', zIndex: 10 }}>
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
