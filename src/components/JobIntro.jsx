import React, { useState, useEffect, useRef } from 'react';

export default function JobIntro({ onComplete }) {
  const videoRef = useRef(null);
  const [isFading, setIsFading] = useState(false);
  const completedRef = useRef(false);

  const finishIntro = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsFading(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 450);
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
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Ensure muted autoplay succeeds in all browsers
        video.muted = true;
        video.play().catch(() => {});
      });
    }

    // Safety timeout: 4s / 1.25 = 3.2s + 1.2s buffer
    const safetyTimer = setTimeout(() => {
      finishIntro();
    }, 4400);

    // Keyboard shortcuts or click to pass through
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
        opacity: isFading ? 0 : 1,
        transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isFading ? 'none' : 'auto',
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
        }}
      />
    </div>
  );
}
