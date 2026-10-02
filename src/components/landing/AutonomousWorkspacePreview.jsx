import React from 'react';
import { 
  FileEdit, 
  Puzzle, 
  TrendingUp, 
  FileCheck, 
  Kanban, 
  Zap, 
  Bot, 
  Calendar 
} from 'lucide-react';

const FEATURES = [
  { label: 'Tailored Cover Letter Studio', icon: FileEdit, color: '#F472B6' },
  { label: '1-Click Chrome Extension', icon: Puzzle, color: '#60A5FA' },
  { label: 'Salary & Equity Benchmark', icon: TrendingUp, color: '#10B981' },
  { label: 'ATS Resume Studio', icon: FileCheck, color: '#38BDF8' },
  { label: 'Opportunity Kanban Pipeline', icon: Kanban, color: '#818CF8' },
  { label: 'Real-time AI Match Scoring', icon: Zap, color: '#FBBF24' },
  { label: 'STAR Interview Prep Copilot', icon: Bot, color: '#A78BFA' },
  { label: '12-Week Strategic Career Plan', icon: Calendar, color: '#34D399' }
];

export default function AutonomousWorkspacePreview() {
  return (
    <section 
      id="features"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#FFFFFF',
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
          animation: whiteMarquee 26s linear infinite;
        }
        .animate-white-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* 1. Full-Bleed Background Video & pic1 Window (Scaled 1.5x) */}
      <div 
        style={{ 
          position: 'relative', 
          width: '100%', 
          overflow: 'hidden',
          backgroundColor: '#FFFFFF'
        }}
      >
        {/* 150% Width Wrapper (Centered with -25% margin, shifted up by 100px so it crops from above) */}
        <div
          style={{
            position: 'relative',
            width: '150%',
            marginLeft: '-25%',
            marginTop: '-100px',
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

        {/* 2. Text Overlay: Placed Directly Above the Background Only */}
        <div 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 12,
            pointerEvents: 'none'
          }}
        >
          <div 
            style={{ 
              maxWidth: '1240px', 
              margin: '0 auto', 
              padding: 'clamp(32px, 4vw, 56px) 24px 0 24px', 
              textAlign: 'left'
            }}
          >
            <div style={{ maxWidth: '640px' }}>
              {/* Main Title */}
              <h2
                style={{
                  fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: 'clamp(28px, 4vw, 54px)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.08,
                  color: '#090D16',
                  margin: '0 0 16px 0'
                }}
              >
                Explore the Autonomous<br />Candidate Workspace
              </h2>

              {/* Subtitle Paragraph */}
              <p
                style={{
                  fontSize: 'clamp(14px, 1.3vw, 17px)',
                  lineHeight: 1.6,
                  color: '#475569',
                  maxWidth: '520px',
                  margin: 0,
                  fontWeight: 500
                }}
              >
                JobGen, an AI-powered autonomous platform, serves as an all-in-one workspace replacing fragmented job boards, manual trackers, and generic interview prep.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Black Fade at the bottom of the video background to seamlessly blend with the black band */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '180px',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(9, 13, 22, 0.35) 30%, rgba(9, 13, 22, 0.85) 75%, #090D16 100%)',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* 4. Dedicated Black Band with Bigger Feature Ticker & Favicons */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#090D16',
          padding: '28px 0 32px 0',
          zIndex: 15
        }}
      >
        <div style={{ width: '100%', overflow: 'hidden' }}>
          {/* Marquee ticker with larger text & favicons */}
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', position: 'relative' }}>
            <div className="animate-white-marquee">
              {FEATURES.concat(FEATURES).map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <span
                    key={idx}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginRight: '48px',
                      verticalAlign: 'middle'
                    }}
                  >
                    {/* Direct Favicon Icon (No Card Box) */}
                    <IconComponent size={22} color={item.color} style={{ flexShrink: 0 }} />

                    {/* Bigger Feature Text */}
                    <span
                      style={{
                        fontSize: 'clamp(17px, 1.4vw, 21px)',
                        fontWeight: 750,
                        letterSpacing: '-0.02em',
                        color: '#F8FAFC'
                      }}
                    >
                      {item.label}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
