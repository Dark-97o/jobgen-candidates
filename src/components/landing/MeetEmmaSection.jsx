import React, { useState, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Share2, 
  PhoneOff, 
  Upload, 
  FileText, 
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';

/**
 * MeetEmmaSection
 * 
 * Dark-themed section featuring:
 * - Left: Emma's video call framed in a clean macOS window (un-cropped, full natural portrait framing so Emma is not cut out)
 *   and below it, "Meet Emma" headline with its narrative description.
 * - Right: Complete interactive Resume Checker ("Confident in your resume ? Let Emma score it")
 *   with drag-and-drop resume upload zone and instant ATS scoring.
 * - Background: Futuristic neural graphics background (/emma_graphics_bg.jpg) with atmospheric dark vignette.
 * - Zero line grid.
 */
export default function MeetEmmaSection({ onLaunchApp, onScoreClick }) {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  // Drag and drop upload state for Resume Checker
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isScoring, setIsScoring] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileProcess = (file) => {
    if (!file) return;
    setUploadedFile(file);
    setIsScoring(true);
    setScoreResult(null);

    // Simulate Emma's resume scoring
    setTimeout(() => {
      setIsScoring(false);
      setScoreResult({
        score: 93,
        status: 'Top 5% Candidate Pool',
        strengths: 'Strong Quantified Metrics & ATS Keyword Density',
        insights: 'Emma identified 2 high-leverage keywords to reach 98% ATS match'
      });
    }, 1500);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileProcess(files[0]);
    }
  };

  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileProcess(files[0]);
    }
  };

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
          opacity: 0.28,
          filter: 'saturate(140%) brightness(0.85)',
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
            radial-gradient(ellipse 85% 75% at 50% 45%, rgba(7, 10, 19, 0.6) 0%, #070A13 100%),
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
        @keyframes scanLaser {
          0% { top: 0%; opacity: 0.8; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0.8; }
        }

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

        .resume-drop-zone {
          border: 2px dashed rgba(96, 165, 250, 0.4);
          background: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .resume-drop-zone:hover, .resume-drop-zone.dragging {
          border-color: #60A5FA;
          background: rgba(30, 58, 138, 0.35);
          box-shadow: 0 0 35px rgba(59, 130, 246, 0.25), inset 0 0 20px rgba(59, 130, 246, 0.1);
          transform: translateY(-2px);
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
          maxWidth: '1280px',
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
            gridTemplateColumns: 'minmax(0, 60fr) minmax(0, 40fr)',
            gap: '48px',
            alignItems: 'center'
          }}
        >
          {/* =========================================================================
              LEFT COLUMN: EMMA IMAGE IN MAC BORDER WITH VIDEO CALL CONTROLS
              NATURAL PORTRAIT FRAMING (NOT CUT OUT) + NARRATIVE DESCRIPTION BELOW
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

                {/* Window Title */}
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#CBD5E1', letterSpacing: '-0.01em' }}>
                  Emma AI &bull; Executive Practice Lab
                </div>

                {/* Right Call Timer / Spec */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>
                  <span style={{ padding: '1px 6px', borderRadius: '4px', backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#60A5FA', border: '1px solid rgba(59, 130, 246, 0.35)', fontSize: '9.5px', fontWeight: 800 }}>HD</span>
                  <span>14:28</span>
                </div>
              </div>

              {/* Emma Image & Video Call Overlays — Natural 14:11 Framing (NOT CUT OUT) */}
              <div 
                style={{ 
                  position: 'relative', 
                  width: '100%', 
                  overflow: 'hidden', 
                  aspectRatio: '14 / 11',
                  maxHeight: '440px',
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
                    objectPosition: 'center 10%',
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

            {/* Narrative Text (OUT OF THE CARD) */}
            <div style={{ marginTop: '22px' }}>
              <h3
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: 'clamp(24px, 2.5vw, 32px)',
                  fontWeight: 800,
                  letterSpacing: '-0.025em',
                  color: '#60A5FA',
                  margin: '0 0 10px 0'
                }}
              >
                Meet Emma
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: '15px',
                  lineHeight: 1.65,
                  color: '#94A3B8',
                  maxWidth: '560px'
                }}
              >
                Emma can help eligible accounts make sense of their profile, resume, applications, linked jobs, and next steps while keeping important decisions in their hands.
              </p>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: RESUME CHECKER ("Confident in your resume ?" & "Let Emma score it")
              WITH DRAG AND DROP RESUME UPLOAD SECTION & INSTANT SCORING
              ========================================================================= */}
          <div style={{ marginTop: '-32px' }}>
            {/* Main Headline */}
            <h2
              style={{
                fontFamily: '"Plus Jakarta Sans", var(--font-title, sans-serif)',
                fontSize: 'clamp(34px, 4.2vw, 54px)',
                fontWeight: 900,
                letterSpacing: '-0.035em',
                lineHeight: 1.08,
                color: '#FFFFFF',
                margin: '0 0 12px 0',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
              }}
            >
              Confident in your resume ?
            </h2>

            {/* Description Subhead */}
            <p
              style={{
                fontSize: 'clamp(18px, 1.8vw, 26px)',
                fontWeight: 700,
                color: '#60A5FA',
                lineHeight: 1.35,
                margin: '0 0 28px 0',
                letterSpacing: '-0.02em'
              }}
            >
              Let Emma score it
            </p>

            {/* Drag & Drop Resume Section */}
            <div
              className={`resume-drop-zone ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                borderRadius: '20px',
                padding: '38px 26px',
                textAlign: 'center',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleInputChange}
                style={{ display: 'none' }}
              />

              {/* Scanning Laser Animation */}
              {isScoring && (
                <div 
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #38BDF8, #60A5FA, transparent)',
                    boxShadow: '0 0 16px #38BDF8',
                    animation: 'scanLaser 1.4s infinite ease-in-out'
                  }} 
                />
              )}

              {!uploadedFile && !scoreResult && (
                <div>
                  <div 
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      borderRadius: '16px', 
                      backgroundColor: 'rgba(59, 130, 246, 0.15)', 
                      border: '1px solid rgba(96, 165, 250, 0.35)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      margin: '0 auto 16px auto'
                    }}
                  >
                    <Upload size={26} color="#60A5FA" />
                  </div>

                  <div style={{ fontSize: '16.5px', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                    Drop your resume here, or <span style={{ color: '#60A5FA', textDecoration: 'underline' }}>browse</span>
                  </div>

                  <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>
                    Supports PDF, DOCX (Max 15MB) &bull; Encrypted & Private
                  </p>
                </div>
              )}

              {/* Analyzing State */}
              {isScoring && (
                <div style={{ padding: '16px 0' }}>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#60A5FA', marginBottom: '8px' }}>
                    Emma is scoring your resume...
                  </div>
                  <div style={{ fontSize: '13px', color: '#CBD5E1' }}>
                    Analyzing ATS keyword density, formatting compliance, and impact metrics
                  </div>
                </div>
              )}

              {/* Score Result State */}
              {scoreResult && (
                <div style={{ textAlign: 'left', padding: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FileText size={22} color="#60A5FA" />
                      <div>
                        <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#FFFFFF' }}>{uploadedFile?.name}</div>
                        <div style={{ fontSize: '11.5px', color: '#10B981', fontWeight: 600 }}>Analysis Complete &bull; {scoreResult.status}</div>
                      </div>
                    </div>

                    <div 
                      style={{ 
                        width: '52px', 
                        height: '52px', 
                        borderRadius: '50%', 
                        backgroundColor: 'rgba(16, 185, 129, 0.15)', 
                        border: '2px solid #10B981', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}
                    >
                      <span style={{ fontSize: '17px', fontWeight: 900, color: '#34D399' }}>{scoreResult.score}</span>
                      <span style={{ fontSize: '8.5px', fontWeight: 800, color: '#10B981' }}>SCORE</span>
                    </div>
                  </div>

                  <div style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '16px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#38BDF8', marginBottom: '4px' }}>
                      KEY TAKEAWAY:
                    </div>
                    <div style={{ fontSize: '13px', color: '#E2E8F0', lineHeight: 1.5 }}>
                      {scoreResult.insights}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadedFile(null);
                        setScoreResult(null);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#94A3B8',
                        fontSize: '12.5px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <RotateCcw size={13} />
                      <span>Upload different resume</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onLaunchApp) onLaunchApp();
                      }}
                      style={{
                        background: '#1A53CF',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '9999px',
                        padding: '8px 20px',
                        fontSize: '12.5px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 16px rgba(26, 83, 207, 0.4)'
                      }}
                    >
                      <span>Open in Resume Studio</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
