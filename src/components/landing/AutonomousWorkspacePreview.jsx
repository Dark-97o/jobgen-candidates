import React from 'react';
import { RollingText } from '@/components/v1/skiper27';
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
  { label: 'Opportunity Kanban', icon: Kanban, color: '#818CF8' },
  { label: 'Real-time AI Match Scoring', icon: Zap, color: '#FBBF24' },
  { label: 'STAR Interview Prep Copilot', icon: Bot, color: '#A78BFA' },
  { label: '12-Week Strategic Career Plan', icon: Calendar, color: '#34D399' }
];

export default function AutonomousWorkspacePreview({ 
  onSignIn, 
  onLaunchApp, 
  onProductivityClick, 
  onPricingClick 
}) {
  return (
    <section 
      id="autonomous-workspace"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#193cbe',
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
          backgroundColor: '#193cbe'
        }}
      >
        {/* 150% Width Wrapper (Centered with -25% margin, shifted up by 200px to clip top by 100px) */}
        <div
          style={{
            position: 'relative',
            width: '150%',
            marginLeft: '-25%',
            marginTop: '-200px',
            marginBottom: '-60px',
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

        {/* 2. Top Header Bar: Corner Logo (Clean, No Pill Shape) & Top-Right Action Buttons */}
        <div 
          style={{ 
            position: 'absolute',
            top: 'clamp(24px, 3.5vh, 40px)',
            left: 0,
            right: 0,
            zIndex: 25,
            pointerEvents: 'none'
          }}
        >
          <div 
            style={{ 
              maxWidth: '1240px', 
              margin: '0 auto', 
              padding: '0 24px', 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            {/* Top-Left Corner Brand: Pure logo + typography, NO pill shape */}
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '10px',
                cursor: 'pointer',
                userSelect: 'none',
                pointerEvents: 'auto',
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <img 
                src="/Whitelogo.webp" 
                alt="JobGen.IO" 
                style={{ 
                  width: '28px', 
                  height: '28px', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(0, 18, 70, 0.4))'
                }}
                onError={(e) => {
                  e.currentTarget.src = '/jobgen-logo.png';
                  e.currentTarget.style.filter = 'brightness(0) invert(1)';
                }}
              />
              <span 
                style={{ 
                  fontFamily: '"Plus Jakarta Sans", var(--font-title, -apple-system, sans-serif)',
                  fontSize: 'clamp(18px, 1.6vw, 21px)', 
                  fontWeight: 900, 
                  color: '#FFFFFF', 
                  letterSpacing: '-0.03em',
                  textShadow: '0 2px 10px rgba(0, 18, 70, 0.35)'
                }}
              >
                JobGen.IO
              </span>
            </div>

            {/* Top-Right Header Action Buttons */}
            {(onSignIn || onProductivityClick || onPricingClick) && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(8px, 1.1vw, 14px)',
                  pointerEvents: 'auto'
                }}
              >
                {onProductivityClick && (
                  <button
                    onClick={onProductivityClick}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      borderRadius: '9999px',
                      padding: '8px 20px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(0, 18, 70, 0.2)',
                      transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.55)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 18, 70, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 18, 70, 0.2)';
                    }}
                  >
                    Productivity
                  </button>
                )}

                {onPricingClick && (
                  <button
                    onClick={onPricingClick}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      borderRadius: '9999px',
                      padding: '8px 20px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(0, 18, 70, 0.2)',
                      transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.55)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 18, 70, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 18, 70, 0.2)';
                    }}
                  >
                    Pricing
                  </button>
                )}

                {onSignIn && (
                  <button
                    onClick={onSignIn}
                    style={{
                      backgroundColor: '#FFFFFF',
                      color: '#1A53CF',
                      border: 'none',
                      borderRadius: '9999px',
                      padding: '8px 24px',
                      fontSize: '13.5px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(0, 18, 70, 0.25)',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 18, 70, 0.35)';
                      e.currentTarget.style.backgroundColor = '#F8FAFC';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 18, 70, 0.25)';
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                    }}
                  >
                    Sign In
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 3. Hero Text Overlay: Headline & Subtitle placed cleanly below top corner bar */}
        <div 
          style={{ 
            position: 'absolute',
            top: 'clamp(84px, 12vh, 126px)',
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
              padding: '0 24px', 
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
                  color: '#FFFFFF',
                  textShadow: '0 2px 24px rgba(0, 0, 0, 0.4)',
                  margin: '0 0 16px 0'
                }}
              >
                <RollingText text="Explore Autonomous Candidate Workspace" />
              </h2>

              {/* Subtitle Paragraph */}
              <p
                style={{
                  fontSize: 'clamp(14px, 1.3vw, 17px)',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.88)',
                  textShadow: '0 1px 12px rgba(0, 0, 0, 0.3)',
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
            height: '220px',
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
          {/* Marquee ticker with 30% smaller refined text & favicons */}
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
                      gap: '9px',
                      marginRight: '40px',
                      verticalAlign: 'middle'
                    }}
                  >
                    {/* Direct Favicon Icon */}
                    <IconComponent size={16} color={item.color} style={{ flexShrink: 0 }} />

                    {/* Feature Text (30% Smaller) */}
                    <span
                      style={{
                        fontSize: 'clamp(12px, 1vw, 14.5px)',
                        fontWeight: 650,
                        letterSpacing: '-0.01em',
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
