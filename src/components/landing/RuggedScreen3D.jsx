import React, { useState, useRef, useEffect } from 'react';

/**
 * RuggedScreen3D
 * Recreates the rugged, industrial tactical tablet/monitor from the reference image.
 * Features:
 * - Heavy-duty industrial corner protective bumpers with hex bolts and metallic chamfers.
 * - Recessed widescreen display running an auto-playing muted looping video.
 * - Left cybernetic data/power cable connector with realistic curving wire.
 * - Dynamic HUD telemetry indicators (REC status, AI Copilot Link, crosshairs).
 * - Specular glass reflection layer synchronized to 3D pointer tilt.
 * - Single-pulse glowing energy aura and growth response whenever touched by the pointer.
 */
export default function RuggedScreen3D({
  containerRef,
  glintRef,
  videoSrc = '/jobs.mp4',
  poster = '/preview_clean.png',
  onPointerEnter,
  onPointerLeave
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDistorting, setIsDistorting] = useState(false);
  const [distortKey, setDistortKey] = useState(0);
  const [pulseOrigin, setPulseOrigin] = useState({ x: 50, y: 50 });
  const distortTimerRef = useRef(null);
  const videoRef = useRef(null);

  // Clean up distortion timer on unmount
  useEffect(() => {
    return () => {
      if (distortTimerRef.current) clearTimeout(distortTimerRef.current);
    };
  }, []);

  // Guarantee seamless video playback across all browsers & autoplay policies
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const playVideo = () => {
      if (video.paused) {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch((err) => {
            console.warn('[RuggedScreen3D] Autoplay blocked, waiting for user gesture:', err);
          });
        }
      }
    };

    // Attempt immediate play
    playVideo();

    video.addEventListener('loadeddata', playVideo);
    video.addEventListener('canplay', playVideo);

    const onUserInteraction = () => {
      playVideo();
      window.removeEventListener('pointerdown', onUserInteraction);
      window.removeEventListener('touchstart', onUserInteraction);
      window.removeEventListener('keydown', onUserInteraction);
    };

    window.addEventListener('pointerdown', onUserInteraction, { once: true });
    window.addEventListener('touchstart', onUserInteraction, { once: true });
    window.addEventListener('keydown', onUserInteraction, { once: true });

    return () => {
      video.removeEventListener('loadeddata', playVideo);
      video.removeEventListener('canplay', playVideo);
      window.removeEventListener('pointerdown', onUserInteraction);
      window.removeEventListener('touchstart', onUserInteraction);
      window.removeEventListener('keydown', onUserInteraction);
    };
  }, [videoSrc]);

  const handlePointerEnter = (e) => {
    setIsHovered(true);
    // Track pointer entry coordinates for localized pulse wave origin
    if (e && e.clientX && e.clientY) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.max(8, Math.min(92, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(8, Math.min(92, ((e.clientY - rect.top) / rect.height) * 100));
      setPulseOrigin({ x, y });
    } else {
      setPulseOrigin({ x: 50, y: 50 });
    }

    // Trigger one-shot pulse wave distortion across the figure
    setDistortKey((prev) => prev + 1);
    setIsDistorting(true);
    if (distortTimerRef.current) clearTimeout(distortTimerRef.current);
    distortTimerRef.current = setTimeout(() => {
      setIsDistorting(false);
    }, 1150);

    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    }
    if (onPointerEnter) onPointerEnter(e);
  };

  const handlePointerLeave = (e) => {
    setIsHovered(false);
    setIsDistorting(false);
    if (distortTimerRef.current) clearTimeout(distortTimerRef.current);
    if (onPointerLeave) onPointerLeave(e);
  };

  return (
    <div
      ref={containerRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        position: 'relative',
        width: 'clamp(340px, 44vw, 620px)',
        aspectRatio: '16 / 10',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        cursor: 'pointer',
        pointerEvents: 'auto',
        filter: 'drop-shadow(0 35px 65px rgba(1, 10, 45, 0.65)) drop-shadow(0 15px 25px rgba(0, 0, 0, 0.45))'
      }}
    >
      {/* SVG Pulse Wave Distortion Filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter key={`pulse-filter-${distortKey}`} id="screen-pulse-wave-distortion" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02 0.04"
              numOctaves="3"
              result="waveTurbulence"
            >
              <animate
                attributeName="baseFrequency"
                dur="1.15s"
                values="0.008 0.016; 0.038 0.075; 0.065 0.11; 0.015 0.02"
                keyTimes="0; 0.35; 0.7; 1"
                repeatCount="1"
                begin="0s"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="waveTurbulence"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            >
              <animate
                attributeName="scale"
                dur="1.15s"
                values="0; 38; 20; 0"
                keyTimes="0; 0.28; 0.65; 1"
                repeatCount="1"
                begin="0s"
              />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      {/* ================= 1. LEFT CABLE CONNECTOR & LOOPING CORD ================= */}
      <div
        style={{
          position: 'absolute',
          left: '-48px',
          top: '32%',
          width: '58px',
          height: '180px',
          pointerEvents: 'none',
          zIndex: 8,
          transform: 'translateZ(12px)'
        }}
      >
        {/* Molded Rubber Connector Plug */}
        <div
          style={{
            position: 'absolute',
            right: '0',
            top: '0',
            width: '18px',
            height: '14px',
            borderRadius: '3px 0 0 3px',
            background: 'linear-gradient(180deg, #374151 0%, #1F2937 60%, #111827 100%)',
            boxShadow: '-2px 2px 6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
            border: '1px solid #111827'
          }}
        />
        {/* Flexible Cable Arc (SVG Curve) */}
        <svg
          width="58"
          height="180"
          viewBox="0 0 58 180"
          fill="none"
          style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}
        >
          {/* Cable Shadow */}
          <path
            d="M 40 7 C 8 18, -4 68, 12 110 C 24 140, 44 156, 48 178"
            stroke="rgba(0, 0, 0, 0.4)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Cable Outer Body */}
          <path
            d="M 40 7 C 8 18, -4 68, 12 110 C 24 140, 44 156, 48 178"
            stroke="#1E293B"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Cable Highlighting */}
          <path
            d="M 40 7 C 8 18, -4 68, 12 110 C 24 140, 44 156, 48 178"
            stroke="#475569"
            strokeWidth="1.5"
            strokeDasharray="2 3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ================= 2. MAIN CHASSIS (RUGGED HOUSING) ================= */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '18px',
          background: 'linear-gradient(145deg, #2D333F 0%, #1A1E27 45%, #0F1218 100%)',
          boxShadow: 'inset 0 2px 1px rgba(255,255,255,0.18), inset 0 -2px 4px rgba(0,0,0,0.8), 0 20px 40px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.14)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(12px, 1.8vw, 18px)',
          boxSizing: 'border-box'
        }}
      >
        {/* Subtle Metallic Brushed Texture & Grip Ridges on Top & Bottom */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '25%',
            right: '25%',
            height: '6px',
            background: 'repeating-linear-gradient(90deg, #11141B, #11141B 6px, #374151 6px, #374151 8px)',
            opacity: 0.85,
            borderBottom: '1px solid rgba(0,0,0,0.8)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '25%',
            right: '25%',
            height: '6px',
            background: 'repeating-linear-gradient(90deg, #11141B, #11141B 6px, #374151 6px, #374151 8px)',
            opacity: 0.85,
            borderTop: '1px solid rgba(0,0,0,0.8)'
          }}
        />

        {/* ================= 3. INNER SCREEN BEZEL & RECESSED FRAME ================= */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            backgroundColor: '#05070B',
            boxShadow: 'inset 0 0 16px rgba(0,0,0,0.9), 0 0 0 1.5px #11141B',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Active Video Player with Physical Liquid Surface Distortion (Playing Once on Enter) */}
          <video
            ref={videoRef}
            key={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              backgroundColor: '#000000',
              filter: isDistorting ? 'url(#screen-pulse-wave-distortion)' : 'none',
              transform: isDistorting ? 'scale(1.02)' : 'scale(1.0)',
              transition: isDistorting ? 'transform 0.3s ease' : 'transform 0.4s ease, filter 0.25s ease'
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>

          {/* Traveling Pulse Wave Shockwave Across the 3D Figure */}
          {isDistorting && (
            <div
              key={`pulse-overlay-${distortKey}`}
              style={{
                position: 'absolute',
                left: `${pulseOrigin.x}%`,
                top: `${pulseOrigin.y}%`,
                width: '100px',
                height: '100px',
                pointerEvents: 'none',
                zIndex: 4,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Primary Pulse Wavefront */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '2px solid rgba(56, 189, 248, 0.85)',
                  boxShadow: '0 0 24px 3px rgba(56, 189, 248, 0.5), inset 0 0 16px 2px rgba(255, 255, 255, 0.4)',
                  animation: 'pulseWaveFront 1.15s cubic-bezier(0.12, 0.7, 0.15, 1) forwards',
                  backdropFilter: 'contrast(1.15) brightness(1.08)',
                  WebkitBackdropFilter: 'contrast(1.15) brightness(1.08)',
                }}
              />

              {/* Secondary Trailing Echo Ripple */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-15px',
                  borderRadius: '50%',
                  border: '1.5px solid rgba(147, 197, 253, 0.65)',
                  boxShadow: '0 0 18px 2px rgba(99, 102, 241, 0.35)',
                  animation: 'pulseWaveEcho 1.15s cubic-bezier(0.18, 0.75, 0.2, 1) forwards',
                }}
              />

              {/* Atmospheric Water Caustic Gradient Mesh */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-30px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(99, 102, 241, 0.1) 40%, transparent 70%)',
                  animation: 'pulseWaveGlow 1.15s cubic-bezier(0.15, 0.8, 0.2, 1) forwards',
                }}
              />
            </div>
          )}

          {/* CRT Scanline / Tactical Bezel Texture Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1.5px, transparent 1.5px, transparent 3px)',
              mixBlendMode: 'multiply',
              opacity: 0.75,
              zIndex: 3
            }}
          />

          {/* Specular Dynamic Glass Glint (Synchronized to 3D mouse gaze angle) */}
          <div
            ref={glintRef}
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 5,
              mixBlendMode: 'screen',
              background: 'linear-gradient(115deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 52%, rgba(0, 0, 0, 0.08) 100%)'
            }}
          />
        </div>
      </div>

      {/* ================= 4. INDUSTRIAL CORNER PROTECTIVE BUMPERS ================= */}
      {/* Corner 1: TOP-LEFT BUMPER */}
      <div
        style={{
          position: 'absolute',
          top: '-4px',
          left: '-4px',
          width: 'clamp(46px, 7vw, 76px)',
          height: 'clamp(46px, 7vw, 76px)',
          pointerEvents: 'none',
          zIndex: 6,
          transform: 'translateZ(10px)'
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 76 76" fill="none">
          <path
            d="M 4 22 L 22 4 L 72 4 L 72 18 L 26 18 L 18 26 L 18 72 L 4 72 Z"
            fill="url(#goldGrad)"
            stroke="#2B1B04"
            strokeWidth="1.5"
          />
          <path
            d="M 6 23 L 23 6 L 70 6"
            stroke="rgba(255, 240, 180, 0.7)"
            strokeWidth="1.2"
          />
          <circle cx="12" cy="12" r="4.5" fill="#1C1917" stroke="#9A6B1A" strokeWidth="1.2" />
          <circle cx="12" cy="12" r="1.8" fill="#FDE68A" />
        </svg>
      </div>

      {/* Corner 2: TOP-RIGHT BUMPER */}
      <div
        style={{
          position: 'absolute',
          top: '-4px',
          right: '-4px',
          width: 'clamp(46px, 7vw, 76px)',
          height: 'clamp(46px, 7vw, 76px)',
          pointerEvents: 'none',
          zIndex: 6,
          transform: 'translateZ(10px)'
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 76 76" fill="none">
          <path
            d="M 72 22 L 54 4 L 4 4 L 4 18 L 50 18 L 58 26 L 58 72 L 72 72 Z"
            fill="url(#goldGrad)"
            stroke="#2B1B04"
            strokeWidth="1.5"
          />
          <path
            d="M 70 23 L 53 6 L 6 6"
            stroke="rgba(255, 240, 180, 0.7)"
            strokeWidth="1.2"
          />
          <circle cx="64" cy="12" r="4.5" fill="#1C1917" stroke="#9A6B1A" strokeWidth="1.2" />
          <circle cx="64" cy="12" r="1.8" fill="#FDE68A" />
        </svg>
      </div>

      {/* Corner 3: BOTTOM-LEFT BUMPER */}
      <div
        style={{
          position: 'absolute',
          bottom: '-4px',
          left: '-4px',
          width: 'clamp(46px, 7vw, 76px)',
          height: 'clamp(46px, 7vw, 76px)',
          pointerEvents: 'none',
          zIndex: 6,
          transform: 'translateZ(10px)'
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 76 76" fill="none">
          <path
            d="M 4 54 L 22 72 L 72 72 L 72 58 L 26 58 L 18 50 L 18 4 L 4 4 Z"
            fill="url(#goldGrad)"
            stroke="#2B1B04"
            strokeWidth="1.5"
          />
          <path
            d="M 6 53 L 23 70 L 70 70"
            stroke="rgba(255, 240, 180, 0.7)"
            strokeWidth="1.2"
          />
          <circle cx="12" cy="64" r="4.5" fill="#1C1917" stroke="#9A6B1A" strokeWidth="1.2" />
          <circle cx="12" cy="64" r="1.8" fill="#FDE68A" />
        </svg>
      </div>

      {/* Corner 4: BOTTOM-RIGHT BUMPER */}
      <div
        style={{
          position: 'absolute',
          bottom: '-4px',
          right: '-4px',
          width: 'clamp(46px, 7vw, 76px)',
          height: 'clamp(46px, 7vw, 76px)',
          pointerEvents: 'none',
          zIndex: 6,
          transform: 'translateZ(10px)'
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 76 76" fill="none">
          <path
            d="M 72 54 L 54 72 L 4 72 L 4 58 L 50 58 L 58 50 L 58 4 L 72 4 Z"
            fill="url(#goldGrad)"
            stroke="#2B1B04"
            strokeWidth="1.5"
          />
          <path
            d="M 70 53 L 53 70 L 6 70"
            stroke="rgba(255, 240, 180, 0.7)"
            strokeWidth="1.2"
          />
          <circle cx="64" cy="64" r="4.5" fill="#1C1917" stroke="#9A6B1A" strokeWidth="1.2" />
          <circle cx="64" cy="64" r="1.8" fill="#FDE68A" />

          {/* Master Gradient Definitions */}
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="28%" stopColor="#D97706" />
              <stop offset="70%" stopColor="#92400E" />
              <stop offset="100%" stopColor="#451A03" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
