import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Share2, 
  PhoneOff, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Bot,
  Zap,
  Award
} from 'lucide-react';

/**
 * MeetEmmaSection
 * 
 * Dark-themed showcase for Emma — AI Career Coach:
 * - Relevant futuristic AI graphics background (/emma_graphics_bg.jpg) with sleek vignette.
 * - Zero line grid.
 * - Resume section completely removed.
 * - Video call card with reduced, compact widescreen height.
 * - Interactive video controls & live HUD equalizer.
 */
export default function MeetEmmaSection({ onLaunchApp }) {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  return (
    <section 
      id="meet-emma"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#070A13',
        color: '#FFFFFF',
        padding: '90px 0 100px 0',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div id="interview-copilot" style={{ position: 'absolute', top: 0, left: 0 }} />
      <div id="ats-scanner" style={{ position: 'absolute', top: 0, left: 0 }} />

      {/* 1. RELEVANT GRAPHICS BACKGROUND IMAGE */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/emma_graphics_bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 45%',
          opacity: 0.32,
          filter: 'saturate(140%) brightness(0.9)',
          pointerEvents: 'none',
          zIndex: 0
        }}
        aria-hidden="true"
      />

      {/* 2. ATMOSPHERIC SOFT VIGNETTE OVERLAY (NO LINE GRID) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 90% 75% at 50% 45%, rgba(7, 10, 19, 0.55) 0%, #070A13 100%),
            linear-gradient(180deg, #070A13 0%, transparent 20%, transparent 80%, #070A13 100%)
          `,
          pointerEvents: 'none',
          zIndex: 0
        }}
        aria-hidden="true"
      />

      <style>{`
        @keyframes waveBar1 { 0%, 100% { height: 6px; } 50% { height: 16px; } }
        @keyframes waveBar2 { 0%, 100% { height: 14px; } 50% { height: 8px; } }
        @keyframes waveBar3 { 0%, 100% { height: 9px; } 50% { height: 18px; } }
        @keyframes waveBar4 { 0%, 100% { height: 16px; } 50% { height: 7px; } }

        .emma-hud-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: #FFFFFF;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .emma-hud-btn:hover {
          background: rgba(255, 255, 255, 0.22);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateY(-2px);
        }
        .emma-hud-btn-active-red {
          background: #DC2626 !important;
          border-color: #EF4444 !important;
          color: #FFFFFF !important;
        }
        .emma-hud-btn-active-red:hover {
          background: #B91C1C !important;
          transform: translateY(-2px) scale(1.05);
        }
      `}</style>

      <div 
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(59, 130, 246, 0.12)',
              border: '1px solid rgba(96, 165, 250, 0.3)',
              color: '#60A5FA',
              fontSize: '12.5px',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '18px'
            }}
          >
            <Bot size={14} color="#60A5FA" />
            <span>AI Copilot &bull; Live Interview Simulation</span>
          </div>

          <h2
            style={{
              fontFamily: '"Plus Jakarta Sans", var(--font-title, sans-serif)',
              fontSize: 'clamp(32px, 4.2vw, 54px)',
              fontWeight: 900,
              letterSpacing: '-0.035em',
              lineHeight: 1.08,
              color: '#FFFFFF',
              margin: '0 0 14px 0',
              textShadow: '0 4px 24px rgba(0, 0, 0, 0.6)'
            }}
          >
            Meet Emma
          </h2>

          <p
            style={{
              fontSize: 'clamp(15px, 1.8vw, 17px)',
              color: '#94A3B8',
              lineHeight: 1.6,
              margin: 0
            }}
          >
            Your autonomous interview coach. Emma simulates company rubrics, analyzes speech cadence in real-time, and guides you to offer-winning clarity.
          </p>
        </div>

        {/* Video Call Emma Card (Lesser Height / Compact Widescreen) */}
        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            backgroundColor: '#0B0F19',
            border: '1.5px solid rgba(255, 255, 255, 0.18)',
            boxShadow: `
              0 0 0 1px rgba(255, 255, 255, 0.08),
              0 24px 60px -10px rgba(0, 0, 0, 0.8),
              0 0 50px 6px rgba(37, 99, 235, 0.22)
            `
          }}
        >
          {/* macOS Window Top Title Bar */}
          <div
            style={{
              height: '38px',
              background: 'linear-gradient(180deg, rgba(20, 27, 45, 0.95) 0%, rgba(15, 22, 38, 0.85) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 16px',
              userSelect: 'none',
              zIndex: 10,
              position: 'relative'
            }}
          >
            {/* Traffic Lights */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF5F56', border: '0.5px solid #E0443E', display: 'inline-block' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFBD2E', border: '0.5px solid #DEA123', display: 'inline-block' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27C93F', border: '0.5px solid #1AAB29', display: 'inline-block' }} />
            </div>

            {/* Middle Title */}
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#E2E8F0', letterSpacing: '-0.01em' }}>
              Emma AI &bull; Executive Practice Lab
            </div>

            {/* Right Call Timer / Spec */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>
              <span style={{ padding: '1px 6px', borderRadius: '4px', backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#60A5FA', border: '1px solid rgba(59, 130, 246, 0.35)', fontSize: '9.5px', fontWeight: 800 }}>HD 60FPS</span>
              <span>14:28</span>
            </div>
          </div>

          {/* Emma Image & Video Call Overlays — Compact Widescreen (Lesser Height) */}
          <div 
            style={{ 
              position: 'relative', 
              width: '100%', 
              overflow: 'hidden', 
              height: 'clamp(240px, 32vh, 340px)', 
              backgroundColor: '#090D16' 
            }}
          >
            <img
              src="/Emma.jpeg"
              alt="Emma AI Career Coach"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 20%',
                display: 'block'
              }}
            />

            {/* Top-Left Live Status Pill */}
            <div
              style={{
                position: 'absolute',
                top: '14px',
                left: '16px',
                zIndex: 6,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(10, 15, 28, 0.78)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                fontSize: '12px',
                color: '#FFFFFF',
                fontWeight: 700
              }}
            >
              <span 
                style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: '#10B981',
                  boxShadow: '0 0 10px #10B981'
                }} 
              />
              <span>Live Simulation Active</span>
            </div>

            {/* Bottom Floating Video Call Controls HUD Over the Image */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 6,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 18px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(10, 15, 28, 0.85)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)'
              }}
            >
              {/* Microphone Toggle */}
              <button
                type="button"
                onClick={() => setIsMicOn(!isMicOn)}
                className="emma-hud-btn"
                title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
              >
                {isMicOn ? <Mic size={17} color="#60A5FA" /> : <MicOff size={17} color="#F87171" />}
              </button>

              {/* Video Camera Toggle */}
              <button
                type="button"
                onClick={() => setIsVideoOn(!isVideoOn)}
                className="emma-hud-btn"
                title={isVideoOn ? 'Turn Off Camera' : 'Turn On Camera'}
              >
                {isVideoOn ? <Video size={17} color="#60A5FA" /> : <VideoOff size={17} color="#F87171" />}
              </button>

              {/* Audio Frequency Bars Equalizer */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '3px',
                  padding: '0 6px',
                  height: '24px'
                }}
                title="Real-time Voice Waveform"
              >
                <div style={{ width: '3px', backgroundColor: '#38BDF8', borderRadius: '2px', animation: 'waveBar1 1.2s infinite ease-in-out' }} />
                <div style={{ width: '3px', backgroundColor: '#60A5FA', borderRadius: '2px', animation: 'waveBar2 1.4s infinite ease-in-out 0.2s' }} />
                <div style={{ width: '3px', backgroundColor: '#3B82F6', borderRadius: '2px', animation: 'waveBar3 1.1s infinite ease-in-out 0.4s' }} />
                <div style={{ width: '3px', backgroundColor: '#60A5FA', borderRadius: '2px', animation: 'waveBar4 1.3s infinite ease-in-out 0.1s' }} />
              </div>

              {/* Screen Share */}
              <button
                type="button"
                className="emma-hud-btn"
                title="Share Screen"
              >
                <Share2 size={16} color="#E2E8F0" />
              </button>

              {/* End Call Pill Button */}
              <button
                type="button"
                className="emma-hud-btn emma-hud-btn-active-red"
                title="End Coaching Session"
              >
                <PhoneOff size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Value Highlights Below the Video Card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '18px',
            maxWidth: '920px',
            margin: '32px auto 0 auto'
          }}
        >
          <div
            style={{
              padding: '18px 20px',
              borderRadius: '16px',
              backgroundColor: 'rgba(15, 23, 42, 0.55)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Zap size={16} color="#60A5FA" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                STAR Framework Scoring
              </div>
              <div style={{ fontSize: '12.5px', color: '#94A3B8', lineHeight: 1.5 }}>
                Instant metric evaluation matching actual Google, Atlassian, and Amazon hiring rubrics.
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '18px 20px',
              borderRadius: '16px',
              backgroundColor: 'rgba(15, 23, 42, 0.55)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={16} color="#38BDF8" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                Zero Hallucinations
              </div>
              <div style={{ fontSize: '12.5px', color: '#94A3B8', lineHeight: 1.5 }}>
                Coaching is strictly grounded in your verified career history and uploaded projects.
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '18px 20px',
              borderRadius: '16px',
              backgroundColor: 'rgba(15, 23, 42, 0.55)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(96, 165, 250, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Award size={16} color="#60A5FA" />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                Reverse-Question Tactics
              </div>
              <div style={{ fontSize: '12.5px', color: '#94A3B8', lineHeight: 1.5 }}>
                Targeted questions for interviewers that signal deep strategic ownership.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
