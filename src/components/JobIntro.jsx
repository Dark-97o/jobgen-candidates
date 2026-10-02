import React, { useState, useEffect, useRef } from 'react';

export default function JobIntro({ onComplete }) {
  const videoRef = useRef(null);
  const completedRef = useRef(false);
  const [videoSrc, setVideoSrc] = useState('/jobintro.mp4');
  const blobUrlRef = useRef(null);

  const finishIntro = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (blobUrlRef.current) {
      try {
        URL.revokeObjectURL(blobUrlRef.current);
      } catch {
        // ignore
      }
    }
    if (onComplete) onComplete();
  };

  // Pre-load video data into memory buffer to guarantee stutter-free 60fps playback
  useEffect(() => {
    let isCancelled = false;

    fetch('/jobintro.mp4')
      .then((res) => {
        if (!res.ok) throw new Error('Fetch failed');
        return res.blob();
      })
      .then((blob) => {
        if (isCancelled) return;
        const objectUrl = URL.createObjectURL(blob);
        blobUrlRef.current = objectUrl;
        setVideoSrc(objectUrl);
      })
      .catch(() => {
        // Fallback to static URL
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Strict 1.25x speed
    const applySpeed = () => {
      video.playbackRate = 1.25;
    };

    applySpeed();
    video.addEventListener('loadedmetadata', applySpeed);
    video.addEventListener('canplay', applySpeed);
    video.addEventListener('play', applySpeed);

    // Play as soon as ready
    const playVideo = async () => {
      try {
        video.playbackRate = 1.25;
        await video.play();
      } catch {
        video.muted = true;
        video.playbackRate = 1.25;
        video.play().catch(() => {});
      }
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener('canplay', playVideo, { once: true });
    }

    // Safety timeout: 2.85s / 1.25 = 2.28s + 1.2s buffer = 3.5s
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
      video.removeEventListener('canplay', playVideo);
    };
  }, [videoSrc]);

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
        key={videoSrc}
        src={videoSrc}
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
