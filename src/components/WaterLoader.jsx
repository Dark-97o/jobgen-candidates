import React, { useState, useEffect, useRef } from 'react';

// Heavy assets to actively download and cache during loading
const PRELOAD_IMAGES = [
  '/loadingbg.png',
  '/caln.png',
  '/jobgen-logo.png',
  '/back.png',
  '/free.png',
  '/clock.png',
  '/cloud1.png',
  '/cloud2.png',
  '/city-skyline.jpg',
  '/clouds.jpg',
  '/signimg.jpg',
];

const PRELOAD_VIDEOS = [
  '/jobs.mp4',
  '/waves.mp4',
  '/herow.mp4',
];

export default function WaterLoader({ onComplete }) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Tracking real download progress
  const completedCountRef = useRef(0);
  const totalAssetsCount = PRELOAD_IMAGES.length + PRELOAD_VIDEOS.length;
  const targetProgressRef = useRef(5);
  const isDoneRef = useRef(false);
  const startTimeRef = useRef(Date.now());
  const MIN_DISPLAY_TIME = 2200; // Minimum 2.2s so animation feels smooth even on fast cache

  // 1. Actively download all assets and Spline things in parallel
  useEffect(() => {
    let active = true;

    const handleOneAssetLoaded = () => {
      if (!active) return;
      completedCountRef.current += 1;
      const count = completedCountRef.current;
      
      const realRatio = count / totalAssetsCount;
      const computedTarget = Math.min(95, Math.max(targetProgressRef.current, realRatio * 95));
      targetProgressRef.current = computedTarget;

      if (count >= totalAssetsCount) {
        targetProgressRef.current = 100;
      }
    };

    // A. Preload Images
    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      img.onload = handleOneAssetLoaded;
      img.onerror = handleOneAssetLoaded;
      img.src = src;
    });

    // B. Preload Videos
    PRELOAD_VIDEOS.forEach((src) => {
      try {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.onloadeddata = handleOneAssetLoaded;
        video.onerror = handleOneAssetLoaded;
        video.src = src;
        video.load();

        fetch(src, { cache: 'force-cache' }).catch(() => {});
      } catch {
        handleOneAssetLoaded();
      }
    });

    // Safety fallback: if any asset stalls on network, finish after 15 seconds
    const safetyTimer = setTimeout(() => {
      if (!isDoneRef.current) {
        targetProgressRef.current = 100;
      }
    }, 15000);

    return () => {
      active = false;
      clearTimeout(safetyTimer);
    };
  }, [totalAssetsCount]);

  // 2. Monotonic Forward-Only RAF Loop
  useEffect(() => {
    let animId;
    let currentVal = 0;

    const loop = () => {
      const target = targetProgressRef.current;
      const elapsed = Date.now() - startTimeRef.current;

      if (currentVal < target) {
        const diff = target - currentVal;
        const step = Math.max(0.25, diff * 0.075);
        currentVal = Math.min(target, currentVal + step);
      }

      setDisplayProgress(currentVal);

      if (
        completedCountRef.current >= totalAssetsCount &&
        elapsed >= MIN_DISPLAY_TIME &&
        currentVal >= 99.8 &&
        !isDoneRef.current
      ) {
        isDoneRef.current = true;
        setDisplayProgress(100);
        setIsExiting(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 400);
        return;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [totalAssetsCount, onComplete]);

  // Contextual loading messages for candidate workflow
  const getLoadingMessage = (pct) => {
    if (pct < 20) return 'Connecting with Emma Copilot...';
    if (pct < 40) return 'Finding matching autonomous jobs & roles...';
    if (pct < 60) return 'Distributing salary benchmarks & equity tiers...';
    if (pct < 80) return 'Optimizing candidate credentials & ATS ranking...';
    if (pct < 98) return 'Downloading interactive 3D mascot & workspace...';
    return 'Candidate workspace ready • Launching portal';
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: '#090C15',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: isExiting ? 'none' : 'auto',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.02)' : 'scale(1)',
        transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      <style>{`
        /* Forward-only wave shimmer across water (Left to Right) */
        @keyframes waterShimmerForward {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        /* Bubbles drift gently upward and forward with the current */
        @keyframes bubbleFloatForward {
          0% { transform: translate(0, 4px) scale(0.6); opacity: 0; }
          40% { opacity: 0.85; }
          100% { transform: translate(6px, -18px) scale(1.15); opacity: 0; }
        }
      `}</style>

      {/* 1. Background Image (loadingbg.png) */}
      <img
        src="/loadingbg.png"
        alt="Loading Background"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* 2. Black Overlay over the background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(9, 12, 21, 0.72) 0%, rgba(9, 12, 21, 0.6) 50%, rgba(9, 12, 21, 0.85) 100%)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Atmospheric Radial Refraction Flare */}
      <div
        style={{
          position: 'absolute',
          width: '460px',
          height: '460px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(14, 165, 233, 0.05) 50%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* 1. Header: Just the pure white logo + JOBGEN.AI in ALL CAPS (Static, no animation) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '24px',
          }}
        >
          {/* Pure Logo Image in Crisp White */}
          <img
            src="/jobgen-logo.png"
            alt="JOBGEN.AI"
            style={{
              width: '44px',
              height: '44px',
              objectFit: 'contain',
              display: 'block',
              filter: 'brightness(0) invert(1) drop-shadow(0 2px 14px rgba(255, 255, 255, 0.4))',
            }}
          />

          {/* Company Name in ALL CAPS */}
          <span
            style={{
              fontSize: 'clamp(26px, 2.6vw, 36px)',
              fontWeight: 900,
              fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              textShadow: '0 2px 16px rgba(0, 0, 0, 0.8), 0 0 30px rgba(56, 189, 248, 0.35)',
            }}
          >
            JOBGEN.AI
          </span>
        </div>

        {/* 2. The Water Tank / Bar (Forward Filling with Liquid Water) */}
        <div
          style={{
            width: 'clamp(280px, 42vw, 420px)',
            height: '32px',
            borderRadius: '999px',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1.5px solid rgba(255, 255, 255, 0.22)',
            boxShadow: 'inset 0 3px 8px rgba(0, 0, 0, 0.7), 0 10px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.15)',
            position: 'relative',
            padding: '3px',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          {/* Water Liquid Body - Strictly Forward-Moving Direct Width */}
          <div
            style={{
              height: '100%',
              width: `${displayProgress}%`,
              borderRadius: '999px',
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(90deg, #38BDF8 0%, #0284C7 60%, #0369A1 100%)',
              boxShadow: '0 2px 16px rgba(2, 132, 199, 0.7), inset 0 2px 4px rgba(255, 255, 255, 0.65)',
              transition: 'none',
            }}
          >
            {/* Forward-Flowing Surface Highlight Stream */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                width: '60%',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 50%, transparent 100%)',
                animation: 'waterShimmerForward 2.2s linear infinite',
                pointerEvents: 'none',
              }}
            />

            {/* Top Gloss Surface Reflection */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '46%',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.15) 80%, transparent 100%)',
                borderRadius: '999px',
                pointerEvents: 'none',
              }}
            />

            {/* Rising Micro-Bubbles that float upward and forward with the stream */}
            <div
              style={{
                position: 'absolute',
                right: '16px',
                bottom: '2px',
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 0 5px rgba(255, 255, 255, 0.95)',
                animation: 'bubbleFloatForward 1.3s ease-in infinite',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: '32px',
                bottom: '3px',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                boxShadow: '0 0 5px rgba(255, 255, 255, 0.95)',
                animation: 'bubbleFloatForward 1.7s ease-in infinite 0.5s',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: '8px',
                bottom: '4px',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 0 6px rgba(255, 255, 255, 0.95)',
                animation: 'bubbleFloatForward 1.5s ease-in infinite 0.9s',
              }}
            />

            {/* Forward Leading Edge Wave Crest */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                width: '14px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9))',
                borderRadius: '0 999px 999px 0',
                filter: 'blur(1px)',
              }}
            />
          </div>
        </div>

        {/* Dynamic Candidate Workflow Loading Message */}
        <div
          style={{
            marginTop: '15px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#94A3B8',
            letterSpacing: '0.04em',
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            minHeight: '18px',
            textShadow: '0 1px 6px rgba(0, 0, 0, 0.8)',
            transition: 'color 0.2s ease',
          }}
        >
          {getLoadingMessage(displayProgress)}
        </div>
      </div>
    </div>
  );
}
