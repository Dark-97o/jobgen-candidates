import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';

export default function JobIntro({ onComplete }) {
  const videoRef = useRef(null);
  const [isFading, setIsFading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const completedRef = useRef(false);

  const finishIntro = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsFading(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 600);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Strict 1.25x speed requirement
    const applySpeed = () => {
      video.playbackRate = 1.25;
    };

    applySpeed();
    video.addEventListener('loadedmetadata', applySpeed);
    video.addEventListener('canplay', applySpeed);
    video.addEventListener('play', applySpeed);
    video.addEventListener('ratechange', () => {
      if (video.playbackRate !== 1.25) {
        video.playbackRate = 1.25;
      }
    });

    // Start video playback
    const startPlay = async () => {
      try {
        await video.play();
      } catch (err) {
        // If unmuted autoplay is blocked by browser policy, fallback to muted
        video.muted = true;
        setIsMuted(true);
        try {
          await video.play();
        } catch {
          // If still blocked, fallback timer will complete
        }
      }
    };
    startPlay();

    // Safety timeout: 4s / 1.25 = 3.2s + 2.3s buffer
    const safetyTimer = setTimeout(() => {
      finishIntro();
    }, 5500);

    // Keyboard shortcuts to skip
    const handleKeyDown = (e) => {
      if (['Escape', ' ', 'Enter'].includes(e.key)) {
        finishIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener('keydown', handleKeyDown);
      video.removeEventListener('loadedmetadata', applySpeed);
      video.removeEventListener('canplay', applySpeed);
      video.removeEventListener('play', applySpeed);
    };
  }, []);

  const toggleSound = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <div
      onClick={finishIntro}
      title="Click anywhere to enter"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
        opacity: isFading ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isFading ? 'scale(1.02)' : 'scale(1)',
        pointerEvents: isFading ? 'none' : 'auto',
      }}
    >
      <video
        ref={videoRef}
        src="/jobintro.mp4"
        playsInline
        autoPlay
        muted={isMuted}
        onEnded={finishIntro}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Top Controls: Sound toggle & Skip button */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(20px, 3vh, 36px)',
          right: 'clamp(20px, 3.5vw, 48px)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 10,
        }}
      >
        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          type="button"
          title={isMuted ? 'Unmute' : 'Mute'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            color: '#FFFFFF',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(15, 23, 42, 0.7)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        {/* Skip Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            finishIntro();
          }}
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 20px',
            borderRadius: '9999px',
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.45)';
            e.currentTarget.style.transform = 'translateX(2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(15, 23, 42, 0.7)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'none';
          }}
        >
          <span>Skip</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Discreet bottom progress indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'rgba(255, 255, 255, 0.12)',
          overflow: 'hidden',
          zIndex: 10,
        }}
      >
        <div
          style={{
            height: '100%',
            width: '100%',
            background: 'linear-gradient(90deg, #38BDF8, #6366F1, #EC4899)',
            animation: 'introProgressBar 3.2s linear forwards',
            transformOrigin: 'left',
          }}
        />
      </div>

      <style>{`
        @keyframes introProgressBar {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
