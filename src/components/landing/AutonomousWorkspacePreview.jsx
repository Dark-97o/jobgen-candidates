import React, { useRef, useEffect, useState } from 'react';
import { 
  FileEdit, 
  Puzzle, 
  TrendingUp, 
  FileCheck, 
  Kanban, 
  Zap, 
  Bot, 
  Calendar,
  Volume2,
  VolumeX
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
  const bgVideoRef = useRef(null);
  const fgVideoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Synchronize background video with foreground framed video in lockstep
  useEffect(() => {
    const bg = bgVideoRef.current;
    const fg = fgVideoRef.current;
    if (!bg || !fg) return;

    const handleTimeUpdate = () => {
      if (Math.abs(bg.currentTime - fg.currentTime) > 0.15) {
        bg.currentTime = fg.currentTime;
      }
    };

    const handlePlay = () => {
      bg.play().catch(() => {});
    };

    const handlePause = () => {
      bg.pause();
    };

    fg.addEventListener('timeupdate', handleTimeUpdate);
    fg.addEventListener('play', handlePlay);
    fg.addEventListener('pause', handlePause);

    // Initial sync
    bg.currentTime = fg.currentTime;
    fg.play().catch(() => {});
    bg.play().catch(() => {});

    return () => {
      fg.removeEventListener('timeupdate', handleTimeUpdate);
      fg.removeEventListener('play', handlePlay);
      fg.removeEventListener('pause', handlePause);
    };
  }, []);

  const toggleMute = () => {
    if (fgVideoRef.current) {
      const nextMuted = !isMuted;
      fgVideoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <section 
      id="features"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#090D16',
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

      {/* 1. SECTION WRAPPER WITH BACKGROUND VIDEO & BLACK OVERLAY */}
      <div 
        style={{ 
          position: 'relative', 
          width: '100%', 
          overflow: 'hidden',
          backgroundColor: '#090D16'
        }}
      >
        {/* Background Video: videoplayback.mp4 */}
        <video
          ref={bgVideoRef}
          autoPlay
          loop
          muted
          playsInline
          src="/videoplayback.mp4"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scale(1.06)',
            filter: 'blur(3px)',
            pointerEvents: 'none'
          }}
        />

        {/* Black Overlay on Background Video */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />

        {/* Smooth Top & Bottom Dark Gradients for Seamless Blending */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(2, 6, 23, 0.5) 0%, transparent 18%, transparent 78%, #090D16 100%)',
            zIndex: 2,
            pointerEvents: 'none'
          }}
        />

        {/* 2. FOREGROUND FRAME: Playing the same videoplayback.mp4 video */}
        <div 
          style={{ 
            position: 'relative', 
            zIndex: 5, 
            maxWidth: '1240px', 
            margin: '0 auto', 
            padding: 'clamp(44px, 5.5vw, 84px) 24px clamp(56px, 6.5vw, 92px) 24px'
          }}
        >
          {/* Framed Window */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#090D16',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 25px 80px -15px rgba(0, 0, 0, 0.9), 0 0 50px rgba(0, 82, 255, 0.18), 0 1px 0 rgba(255, 255, 255, 0.2) inset',
              aspectRatio: '16 / 9'
            }}
          >
            {/* macOS / App Title Bar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 'clamp(28px, 3.4%, 40px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 16px',
                backgroundColor: 'rgba(15, 19, 29, 0.88)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                zIndex: 10,
                userSelect: 'none'
              }}
            >
              {/* Traffic Light Dots */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#FF5F56', display: 'inline-block' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#FFBD2E', display: 'inline-block' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#27C93F', display: 'inline-block' }} />
              </div>

              {/* Status Address Pill */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 16px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#94A3B8',
                  fontSize: 'clamp(10px, 0.8vw, 12px)',
                  fontWeight: 500,
                  letterSpacing: '0.01em'
                }}
              >
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                jobgen.ai / platform-overview
              </div>

              {/* Sound / Mute Toggle Button */}
              <button
                onClick={toggleMute}
                type="button"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '6px',
                  color: isMuted ? '#94A3B8' : '#38BDF8',
                  cursor: 'pointer',
                  padding: '3px 10px',
                  fontSize: '11px',
                  fontWeight: 600,
                  transition: 'all 0.2s ease'
                }}
              >
                {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                <span>{isMuted ? 'Unmute' : 'Mute'}</span>
              </button>
            </div>

            {/* Foreground Video: videoplayback.mp4 */}
            <video
              ref={fgVideoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              src="/videoplayback.mp4"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. DEDICATED BLACK BAND WITH BIGGER FEATURE TICKER & FAVICONS */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          backgroundColor: '#090D16',
          padding: '24px 0 32px 0',
          zIndex: 15,
          borderTop: '1px solid rgba(255, 255, 255, 0.06)'
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
