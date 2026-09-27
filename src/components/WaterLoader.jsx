import React, { useState, useEffect, useRef } from 'react';

// Heavy assets to actively download and cache during loading
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
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [currentAssetLabel, setCurrentAssetLabel] = useState('Downloading 3D mascot & assets...');

  // Tracking real download progress
  const completedCountRef = useRef(0);
  const totalAssetsCount = PRELOAD_IMAGES.length + PRELOAD_VIDEOS.length + 2; // +2 for Spline iframe and scene
  const targetProgressRef = useRef(5);
  const isDoneRef = useRef(false);
  const startTimeRef = useRef(Date.now());
  const MIN_DISPLAY_TIME = 2000; // Minimum 2s so animation feels smooth even on fast cache

  // 1. Actively download all assets and Spline things in parallel
  useEffect(() => {
    let active = true;

    const handleOneAssetLoaded = (label) => {
      if (!active) return;
      completedCountRef.current += 1;
      const count = completedCountRef.current;
      
      // Calculate real download percentage (up to 95% while loading; hits 100% when everything is done)
      const realRatio = count / totalAssetsCount;
      const computedTarget = Math.min(95, Math.max(targetProgressRef.current, realRatio * 95));
      targetProgressRef.current = computedTarget;

      if (label) {
        setCurrentAssetLabel(label);
      }

      // When all assets have completed downloading
      if (count >= totalAssetsCount) {
        targetProgressRef.current = 100;
        setCurrentAssetLabel('Assets cached • Launching candidate portal');
      }
    };

    // A. Preload Images
    PRELOAD_IMAGES.forEach((src) => {
      const img = new Image();
      img.onload = () => handleOneAssetLoaded(`Cached ${src.replace('/', '')}`);
      img.onerror = () => handleOneAssetLoaded();
      img.src = src;
    });

    // B. Preload Videos
    PRELOAD_VIDEOS.forEach((src) => {
      try {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.onloadeddata = () => handleOneAssetLoaded(`Streamed ${src.replace('/', '')}`);
        video.onerror = () => handleOneAssetLoaded();
        video.src = src;
        video.load();

        fetch(src, { cache: 'force-cache' }).catch(() => {});
      } catch {
        handleOneAssetLoaded();
      }
    });

    // C. Preload Spline Scene Binary
    try {
      fetch(SPLINE_SCENE_URL, { mode: 'no-cors', cache: 'force-cache' })
        .then(() => handleOneAssetLoaded('3D Mascot Scene Code Downloaded'))
        .catch(() => handleOneAssetLoaded());
    } catch {
      handleOneAssetLoaded();
    }

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

  // 2. Monotonic Forward-Only RAF Loop (Guarantees no reverse animation or jumping)
  useEffect(() => {
    let animId;
    let currentVal = 0;

    const loop = () => {
      const target = targetProgressRef.current;
      const elapsed = Date.now() - startTimeRef.current;

      // Smooth forward lerp towards target
      if (currentVal < target) {
        const diff = target - currentVal;
        // Natural fluid acceleration: faster if far behind, gentle as it approaches
        const step = Math.max(0.2, diff * 0.07);
        currentVal = Math.min(target, currentVal + step);
      }

      setDisplayProgress(currentVal);

      // Check if all downloads finished AND minimum graceful time elapsed AND progress is 100%
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
        transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        userSelect: 'none',
      }}
    >
      <style>{`
        /* Forward-only wave shimmer across water (Left to Right) */
        @keyframes waterShimmerForward {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        /* Forward-only micro-ripples */
        @keyframes waterFlowForward {
          0% { background-position: 0% 50%; }
          100% { background-position: -200% 50%; }
        }

        @keyframes waveOscillate {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }

        /* Bubbles drift gently upward and forward with the current */
        @keyframes bubbleFloatForward {
          0% { transform: translate(0, 4px) scale(0.6); opacity: 0; }
          40% { opacity: 0.85; }
          100% { transform: translate(6px, -18px) scale(1.15); opacity: 0; }
        }
      `}</style>

      {/* Hidden Spline Preload iframe: fully downloads and caches WebGL shaders and WASM */}
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
        onLoad={() => {
          completedCountRef.current += 1;
          const count = completedCountRef.current;
          const realRatio = count / totalAssetsCount;
          targetProgressRef.current = Math.min(95, Math.max(targetProgressRef.current, realRatio * 95));
          setCurrentAssetLabel('3D Mascot & Spline Runtime Cached');
        }}
      />

      {/* Ambient Atmospheric Refraction Glow */}
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
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
            {Math.round(displayProgress)}%
          </span>
        </div>

        {/* 3. The Water Tank / Bar (Forward Filling with Liquid Water) */}
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
          {/* Water Liquid Body - Strictly Forward-Moving Direct Width (No conflicting CSS transitions) */}
          <div
            style={{
              height: '100%',
              width: `${displayProgress}%`,
              borderRadius: '999px',
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(90deg, #38BDF8 0%, #0284C7 60%, #0369A1 100%)',
              boxShadow: '0 2px 14px rgba(2, 132, 199, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.55)',
              transition: 'none', // Strictly disabled to avoid conflicting with RAF ticks
            }}
          >
            {/* Forward-Flowing Surface Highlight Stream */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                width: '60%',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.45) 50%, transparent 100%)',
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
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.1) 80%, transparent 100%)',
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
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.9)',
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
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.9)',
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
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 0 5px rgba(255, 255, 255, 0.9)',
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
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.85))',
                borderRadius: '0 999px 999px 0',
                filter: 'blur(1px)',
              }}
            />
          </div>
        </div>

        {/* Live Asset Download Status Subtitle */}
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
          {currentAssetLabel}
        </div>
      </div>
    </div>
  );
}
