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
  CheckCircle2, 
  ShieldCheck, 
  FileText,
  Volume2
} from 'lucide-react';

/**
 * MeetEmmaSection
 * Dark-themed section directly below the brands band featuring:
 * - Left: Emma's image (/Emma.jpeg) framed in an authentic macOS window with live video call HUD controls
 *   and narrative text: "Meet Emma : Emma can help eligible accounts make sense of their profile, resume,
 *   applications, linked jobs, and next steps while keeping important decisions in their hands."
 * - Right: Bold headline "Confident in your resume ?" and subhead "let emma score your resume"
 *   with an interactive diagnostic CTA.
 */
export default function MeetEmmaSection({ onLaunchApp, onScoreClick }) {
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
        padding: '110px 0 120px 0',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Dynamic Background Atmosphere (Dark Blue Nebula / Glow) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background: `
            radial-gradient(ellipse 650px 450px at 20% 45%, rgba(26, 83, 207, 0.22) 0%, transparent 70%),
            radial-gradient(ellipse 550px 400px at 80% 55%, rgba(37, 99, 235, 0.16) 0%, transparent 65%),
            radial-gradient(circle 350px at 50% 10%, rgba(14, 165, 233, 0.12) 0%, transparent 70%)
          `
        }}
        aria-hidden="true"
      />

      {/* Subtle Grid Lines Overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: `
            linear-gradient(to right, #FFFFFF 1px, transparent 1px),
            linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
          zIndex: 0
        }}
        aria-hidden="true"
      />

      <style>{`
        @keyframes pulseEmeraldDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.35); opacity: 0.6; }
        }
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

        @media (max-width: 960px) {
          .meet-emma-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>

      <div 
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div 
          className="meet-emma-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.08fr) minmax(0, 1fr)',
            gap: '64px',
            alignItems: 'center'
          }}
        >
          {/* =========================================================================
              LEFT COLUMN: EMMA IMAGE IN MAC BORDER WITH VIDEO CALL OPTIONS OVER IT
              ========================================================================= */}
          <div>
            {/* macOS Window Container */}
            <div
              style={{
                position: 'relative',
                borderRadius: '22px',
                overflow: 'hidden',
                backgroundColor: '#0B0F19',
                border: '1.5px solid rgba(255, 255, 255, 0.18)',
                boxShadow: `
                  0 0 0 1px rgba(255, 255, 255, 0.06),
                  0 28px 65px -12px rgba(0, 0, 0, 0.75),
                  0 0 45px 4px rgba(26, 83, 207, 0.22)
                `
              }}
            >
              {/* macOS Window Top Title Bar */}
              <div
                style={{
                  height: '40px',
                  background: 'linear-gradient(180deg, rgba(20, 27, 45, 0.95) 0%, rgba(15, 22, 38, 0.8) 100%)',
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

                {/* Center Title / Session Pill */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '2px 12px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    fontSize: '11px',
                    color: '#E2E8F0',
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  <span 
                    style={{ 
                      width: '6px', 
                      height: '6px', 
                      borderRadius: '50%', 
                      backgroundColor: '#10B981',
                      animation: 'pulseEmeraldDot 1.8s infinite ease-in-out',
                      display: 'inline-block'
                    }} 
                  />
                  <span>Emma AI &bull; Live Candidate Copilot</span>
                </div>

                {/* Right Call Quality Indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10.5px', color: '#94A3B8', fontWeight: 600 }}>
                  <span style={{ padding: '1px 6px', borderRadius: '4px', backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#60A5FA', border: '1px solid rgba(59, 130, 246, 0.35)', fontSize: '9.5px', fontWeight: 800 }}>HD</span>
                  <span>14:28</span>
                </div>
              </div>

              {/* Emma Image & Video Call Overlays */}
              <div style={{ position: 'relative', width: '100%', overflow: 'hidden', aspectRatio: '4 / 3', backgroundColor: '#090D16' }}>
                <img
                  src="/Emma.jpeg"
                  alt="Emma AI Career Coach"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 15%',
                    display: 'block'
                  }}
                />

                {/* Top Corner HUD Badge: Live Coach Profile */}
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '5px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(10, 15, 28, 0.75)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    zIndex: 5
                  }}
                >
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                  <span>Emma &bull; Principal AI Coach</span>
                </div>

                {/* Top Right Live Recording Pill */}
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(220, 38, 38, 0.25)',
                    border: '1px solid rgba(239, 68, 68, 0.45)',
                    color: '#FCA5A5',
                    fontSize: '10px',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    zIndex: 5
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                  <span>Active Loop</span>
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
                    backgroundColor: 'rgba(10, 15, 28, 0.82)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)'
                  }}
                >
                  {/* Microphone Toggle */}
                  <button
                    onClick={() => setIsMicOn(!isMicOn)}
                    className="emma-hud-btn"
                    title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
                  >
                    {isMicOn ? <Mic size={17} color="#60A5FA" /> : <MicOff size={17} color="#F87171" />}
                  </button>

                  {/* Video Camera Toggle */}
                  <button
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
                    className="emma-hud-btn"
                    title="Share Screen"
                  >
                    <Share2 size={16} color="#E2E8F0" />
                  </button>

                  {/* End Call Pill Button */}
                  <button
                    className="emma-hud-btn emma-hud-btn-active-red"
                    title="End Coaching Session"
                  >
                    <PhoneOff size={17} />
                  </button>
                </div>
              </div>
            </div>

            {/* Narrative Text Container (Directly Below Emma's Mac Window Container) */}
            <div
              style={{
                marginTop: '20px',
                padding: '18px 22px',
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)'
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: '14.5px',
                  lineHeight: 1.65,
                  color: '#CBD5E1'
                }}
              >
                <span
                  style={{
                    color: '#60A5FA',
                    fontWeight: 800,
                    marginRight: '6px'
                  }}
                >
                  Meet Emma :
                </span>
                Emma can help eligible accounts make sense of their profile, resume, applications, linked jobs, and next steps while keeping important decisions in their hands.
              </p>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: "Confident in your resume ?" & "let emma score your resume"
              ========================================================================= */}
          <div>
            {/* Top Pill Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(59, 130, 246, 0.14)',
                border: '1px solid rgba(96, 165, 250, 0.35)',
                color: '#93C5FD',
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: '20px'
              }}
            >
              <Sparkles size={13} color="#60A5FA" />
              <span>AI Resume Intelligence</span>
            </div>

            {/* Main Headline */}
            <h2
              style={{
                fontFamily: '"Plus Jakarta Sans", var(--font-title, sans-serif)',
                fontSize: 'clamp(36px, 4.8vw, 58px)',
                fontWeight: 900,
                letterSpacing: '-0.035em',
                lineHeight: 1.08,
                color: '#FFFFFF',
                margin: '0 0 16px 0',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
              }}
            >
              Confident in your resume ?
            </h2>

            {/* Description Subhead */}
            <p
              style={{
                fontSize: 'clamp(18px, 1.8vw, 24px)',
                fontWeight: 600,
                color: '#60A5FA',
                lineHeight: 1.4,
                margin: '0 0 32px 0',
                letterSpacing: '-0.015em'
              }}
            >
              let emma score your resume
            </p>

            {/* Feature Highlights Grid */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                marginBottom: '40px'
              }}
            >
              {[
                { title: 'Strict ATS Algorithm Match', desc: 'Identifies missing critical keywords and rubric gaps before recruiters filter you out.' },
                { title: 'Verifiable Impact Scoring', desc: 'Analyzes quantifiable metrics, leadership scope, and STAR alignment.' },
                { title: 'Executive-Grade Recommendations', desc: 'Clear, prioritized guidance to elevate your resume into the top 3% candidate pool.' }
              ].map((feat, i) => (
                <div 
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.07)'
                  }}
                >
                  <CheckCircle2 size={18} color="#10B981" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#F8FAFC', marginBottom: '2px' }}>
                      {feat.title}
                    </div>
                    <div style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.5 }}>
                      {feat.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={onScoreClick || onLaunchApp}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '14px 34px',
                  borderRadius: '9999px',
                  fontSize: '14.5px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 50%, #3B82F6 100%)',
                  border: 'none',
                  boxShadow: '0 8px 30px rgba(26, 83, 207, 0.45), 0 2px 8px rgba(26, 83, 207, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 38px rgba(26, 83, 207, 0.6), 0 4px 12px rgba(26, 83, 207, 0.4)';
                  e.currentTarget.style.filter = 'brightness(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(26, 83, 207, 0.45), 0 2px 8px rgba(26, 83, 207, 0.3)';
                  e.currentTarget.style.filter = 'brightness(1)';
                }}
              >
                <span>Score My Resume with Emma</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
