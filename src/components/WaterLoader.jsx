import React, { useState, useEffect, useRef } from 'react';

// Heavy assets to actively download and cache during the 5-second loading phase
const PRELOAD_IMAGES = [
  '/caln.png',
  '/jobgen-logo.png',
  '/back.png',
  '/free.png',
  '/clock-building.png',
  '/cloud1.png',
  '/cloud2.png',
  '/city-skyline.jpg',
  '/clouds.jpg',
];

const PRELOAD_VIDEOS = [
  '/herow.mp4',
  '/waves.mp4',
];

const SPLINE_IFRAME_URL = 'https://my.spline.design/cutecomputerfollowcursor-kTcoNww7cfTrcF5RhfaBxgaq/';
const SPLINE_SCENE_URL = 'https://my.spline.design/cutecomputerfollowcursor-kTcoNww7cfTrcF5RhfaBxgaq/scene.splinecode';

export default function WaterLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const startTimeRef = useRef(null);
  const DURATION = 5000; // Exactly 5 seconds

  // 1. Active Parallel Asset & Spline Downloader
  useEffect(() => {
    let completed = 0;
    const increment = () => {
      completed += 1;
      setLoadedCount(completed);
    };

    // A. Pre-download images into browser cache
    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      img.onload = increment;
      img.onerror = increment;
      img.src = src;
    });

    // B. Pre-download videos into browser media cache
    PRELOAD_VIDEOS.forEach((src) => {
      try {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.onloadeddata = increment;
        video.onerror = increment;
        video.src = src;
        video.load();

        // Also fetch to warm HTTP cache
        fetch(src, { cache: 'force-cache' }).catch(() => {});
      } catch {
        increment();
      }
    });

    // C. Pre-download Spline 3D Scene Binary
    try {
      fetch(SPLINE_SCENE_URL, { mode: 'no-cors', cache: 'force-cache' })
        .then(increment)
        .catch(increment);
    } catch {
      increment();
    }
  }, []);

  // 2. 5-Second Liquid Progress Timer Loop
  useEffect(() => {
    let animId;

    const tick = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const rawProgress = Math.min(100, (elapsed / DURATION) * 100);

      setProgress(rawProgress);

      if (elapsed < DURATION) {
        animId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setIsExiting(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 450);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  // Informative micro status tracking what is downloading
  const getSubStatus = (pct) => {
    if (pct < 24) return 'Downloading 3D interactive mascot & Spline runtime...';
    if (pct < 52) return 'Caching cinematic video streams & herow.mp4...';
    if (pct < 78) return 'Pre-buffering calendar textures & candidate assets...';
    if (pct < 98) return 'Optimizing neural pipeline & liquid workspace...';
    return 'Assets cached • Launching candidate portal';
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: '#FFFFFF',
        backgroundImage: `
          radial-gradient(at 50% 35%, rgba(224, 242, 254, 0.6) 0px, transparent 65%),
          radial-gradient(at 10% 90%, rgba(240, 249, 255, 0.5) 0px, transparent 50%),
          radial-gradient(at 90% 10%, rgba(238, 242, 255, 0.5) 0px, transparent 50%)
        `,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: isExiting ? 'none' : 'auto',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.02)' : 'scale(1)',
        transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        userSelect: 'none',
      }}
    >
      <style>{`
        @keyframes waterFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes waveOscillate {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-2px) rotate(1.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes bubbleFloat {
          0% { transform: translate(0, 4px) scale(0.6); opacity: 0; }
          40% { opacity: 0.8; }
          100% { transform: translate(-8px, -18px) scale(1.2); opacity: 0; }
        }
      `}</style>

      {/* Hidden Spline Preload iframe: fully loads & caches Spline WebGL shaders, scripts and WASM runtime in background */}
      <iframe
        src={SPLINE_IFRAME_URL}
        title="Spline Asset Preloader"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          opacity: 0.001,
          pointerEvents: 'none',
          zIndex: -1,
          border: 'none',
        }}
      />

      {/* Subtle Refraction Glow behind the loader */}
      <div
        style={{
          position: 'absolute',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, rgba(14, 165, 233, 0.06) 50%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* 1. Logo & JobGen.AI Brand Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px',
            animation: 'waveOscillate 3s ease-in-out infinite',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 8px 24px rgba(14, 165, 233, 0.18), 0 2px 6px rgba(0, 0, 0, 0.05)',
              border: '1.5px solid rgba(224, 242, 254, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '5px',
              boxSizing: 'border-box',
            }}
          >
            <img
              src="/jobgen-logo.png"
              alt="JobGen.AI"
              style={{
                width: '32px',
                height: '32px',
                objectFit: 'contain',
              }}
            />
          </div>

          <span
            style={{
              fontSize: 'clamp(26px, 2.6vw, 34px)',
              fontWeight: 800,
              fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
              color: '#090C15',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            JobGen.AI
          </span>
        </div>

        {/* 2. Loading Text + Counter Above Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '18px',
          }}
        >
          <span
            style={{
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#0284C7',
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            }}
          >
            Loading
          </span>
          <span
            style={{
              display: 'inline-block',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: '#0284C7',
              opacity: 0.6,
            }}
          />
          <span
            style={{
              fontSize: '13px',
              fontWeight: 700,
              fontFamily: 'monospace, monospace',
              color: '#64748B',
              letterSpacing: '0.04em',
              minWidth: '40px',
              textAlign: 'left',
            }}
          >
            {Math.round(progress)}%
          </span>
        </div>

        {/* 3. The Water Tank / Bar (Filling with Water) */}
        <div
          style={{
            width: 'clamp(280px, 42vw, 420px)',
            height: '32px',
            borderRadius: '999px',
            backgroundColor: 'rgba(241, 245, 249, 0.95)',
            border: '2px solid rgba(203, 213, 225, 0.85)',
            boxShadow: 'inset 0 3px 8px rgba(15, 23, 42, 0.08), 0 10px 28px rgba(14, 165, 233, 0.12)',
            position: 'relative',
            padding: '3px',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          {/* Water Liquid Body */}
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              borderRadius: '999px',
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(90deg, #38BDF8 0%, #0284C7 50%, #0369A1 100%)',
              backgroundSize: '200% 100%',
              animation: 'waterFlow 2.8s linear infinite',
              boxShadow: '0 2px 14px rgba(2, 132, 199, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.55)',
              transition: 'width 0.08s linear',
            }}
          >
            {/* Liquid Surface Gloss Reflection */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '48%',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.1) 80%, transparent 100%)',
                borderRadius: '999px',
                pointerEvents: 'none',
              }}
            />

            {/* Rising Micro-Bubbles inside water */}
            <div
              style={{
                position: 'absolute',
                right: '18px',
                bottom: '2px',
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.9)',
                animation: 'bubbleFloat 1.2s ease-in infinite',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: '34px',
                bottom: '3px',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.9)',
                animation: 'bubbleFloat 1.6s ease-in infinite 0.5s',
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
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 0 5px rgba(255, 255, 255, 0.9)',
                animation: 'bubbleFloat 1.4s ease-in infinite 0.9s',
              }}
            />

            {/* Leading Edge Water Splash / Glow Crest */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                width: '14px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.75))',
                borderRadius: '0 999px 999px 0',
                filter: 'blur(1px)',
              }}
            />
          </div>
        </div>

        {/* Live Asset Download Subtitle */}
        <div
          style={{
            marginTop: '14px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#64748B',
            letterSpacing: '0.04em',
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            minHeight: '18px',
            transition: 'color 0.2s ease',
          }}
        >
          {getSubStatus(progress)}
        </div>
      </div>
    </div>
  );
}
