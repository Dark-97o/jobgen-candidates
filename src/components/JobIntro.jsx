import React, { useEffect, useRef } from 'react';

export default function JobIntro({ onComplete }) {
  const videoRef = useRef(null);
  const completedRef = useRef(false);

  const finishIntro = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (onComplete) onComplete();
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

    // Start video playback cleanly
    const startPlay = async () => {
      try {
        video.playbackRate = 1.25;
        await video.play();
      } catch {
        // Fallback for strict browser autoplay
        video.muted = true;
        video.playbackRate = 1.25;
        video.play().catch(() => {});
      }
    };
    startPlay();

    // Safety timeout: 4.0s / 1.25 = 3.2s + 0.4s buffer = 3.6s
    const safetyTimer = setTimeout(() => {
      finishIntro();
    }, 3600);

    // Keyboard shortcuts or click to pass through instantly
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

  return (
    <div
      onClick={finishIntro}
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
      }}
    >
      <video
        ref={videoRef}
        src="/jobintro.mp4"
        playsInline
        autoPlay
        muted
        preload="auto"
        onEnded={finishIntro}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transform: 'translateZ(0)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      />
    </div>
  );
}
