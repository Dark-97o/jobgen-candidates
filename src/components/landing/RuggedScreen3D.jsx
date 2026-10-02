import React, { useState, useRef, useEffect } from 'react';

/**
 * RuggedScreen3D
 * Recreates the rugged, industrial tactical tablet/monitor and morphs into a Laptop or Mobile randomly on hover.
 * Modes:
 * - 'screen': Heavy-duty industrial tactical tablet with hex bolts, chamfers, and cybernetic cord.
 * - 'laptop': Sleek modern space-gray laptop with 3D folding keyboard deck, glass trackpad, and camera notch.
 * - 'mobile': Modern flagship smartphone with dynamic island, curved titanium chassis, and side hardware.
 */
export default function RuggedScreen3D({
  containerRef,
  glintRef,
  videoSrc = '/jobs.mp4',
  poster = '/preview_clean.png',
  isActive = true,
  onPointerEnter,
  onPointerLeave
}) {
  const [deviceMode, setDeviceMode] = useState('screen'); // 'screen' | 'laptop' | 'mobile'
  const [isHovered, setIsHovered] = useState(false);
  const [isDistorting, setIsDistorting] = useState(false);
  const [distortKey, setDistortKey] = useState(0);
  const lastRandomModeRef = useRef('screen');
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

    if (!isActive) {
      if (!video.paused) {
        try { video.pause(); } catch {}
      }
      return;
    }

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const playVideo = () => {
      if (video.paused) {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {});
        }
      }
    };

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
  }, [videoSrc, isActive]);

  const handlePointerEnter = (e) => {
    setIsHovered(true);

    // Randomly choose between 'laptop' and 'mobile'
    const candidateModes = ['laptop', 'mobile'];
    let chosen = candidateModes[Math.floor(Math.random() * candidateModes.length)];
    if (chosen === lastRandomModeRef.current) {
      // Alternate for maximum variety on repeated hovers
      chosen = chosen === 'laptop' ? 'mobile' : 'laptop';
    }
    lastRandomModeRef.current = chosen;
    setDeviceMode(chosen);

    // Trigger physical liquid surface distortion during shape-shifting morph
    setDistortKey((prev) => prev + 1);
    setIsDistorting(true);
    if (distortTimerRef.current) clearTimeout(distortTimerRef.current);
    distortTimerRef.current = setTimeout(() => {
      setIsDistorting(false);
    }, 850);

    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    }
    if (onPointerEnter) onPointerEnter(e);
  };

  const handlePointerLeave = (e) => {
    setIsHovered(false);
    setIsDistorting(true);
    setDistortKey((prev) => prev + 1);

    // Revert smoothly to tactical screen on leave
    setDeviceMode('screen');

    if (distortTimerRef.current) clearTimeout(distortTimerRef.current);
    distortTimerRef.current = setTimeout(() => {
      setIsDistorting(false);
    }, 750);

    if (onPointerLeave) onPointerLeave(e);
  };

  const isScreen = deviceMode === 'screen';
  const isLaptop = deviceMode === 'laptop';
  const isMobile = deviceMode === 'mobile';

  // Dynamic geometry per morph state
  const containerWidth = isMobile
    ? 'clamp(210px, 22vw, 290px)'
    : isLaptop
    ? 'clamp(360px, 46vw, 640px)'
    : 'clamp(340px, 44vw, 620px)';

  const containerAspectRatio = isMobile ? '9 / 18.5' : '16 / 10';
  const containerRadius = isMobile ? '42px' : isLaptop ? '14px 14px 4px 4px' : '18px';
  const containerPadding = isMobile
    ? '9px'
    : isLaptop
    ? '8px 8px 14px 8px'
    : 'clamp(12px, 1.8vw, 18px)';

  return (
    <div
      ref={containerRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={() => {
        // Also allow clicking to cycle between all 3 modes
        const cycle = { screen: 'laptop', laptop: 'mobile', mobile: 'screen' };
        setDeviceMode((prev) => cycle[prev] || 'screen');
        setIsDistorting(true);
        if (distortTimerRef.current) clearTimeout(distortTimerRef.current);
        distortTimerRef.current = setTimeout(() => setIsDistorting(false), 750);
      }}
      style={{
        position: 'relative',
        width: containerWidth,
        aspectRatio: containerAspectRatio,
        transformStyle: 'preserve-3d',
        willChange: 'transform, width, aspect-ratio',
        cursor: 'pointer',
        pointerEvents: 'auto',
        filter: isMobile 
          ? 'drop-shadow(0 30px 60px rgba(1, 10, 45, 0.65)) drop-shadow(0 12px 24px rgba(0, 0, 0, 0.45))'
          : isLaptop
          ? 'drop-shadow(0 40px 75px rgba(1, 10, 45, 0.7)) drop-shadow(0 20px 30px rgba(0, 0, 0, 0.5))'
          : 'drop-shadow(0 35px 65px rgba(1, 10, 45, 0.65)) drop-shadow(0 15px 25px rgba(0, 0, 0, 0.45))',
        transition: 'width 0.7s cubic-bezier(0.34, 1.25, 0.64, 1), aspect-ratio 0.7s cubic-bezier(0.34, 1.25, 0.64, 1), filter 0.5s ease',
      }}
    >
      {/* SVG Pulse Wave Distortion Filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter id="screen-surface-distortion" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.045 0.06"
              numOctaves="3"
              result="turbulence"
            >
              <animate
                attributeName="baseFrequency"
                dur="1.8s"
                values="0.038 0.048; 0.058 0.072; 0.038 0.048"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="24"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
          </filter>
        </defs>
      </svg>

      {/* Holographic Device Identity Badge */}
      <div
        style={{
          position: 'absolute',
          top: isMobile ? '-38px' : '-34px',
          left: '50%',
          transform: 'translateX(-50%) translateZ(16px)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '7px',
          padding: '4px 14px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(10, 16, 32, 0.82)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          color: isMobile ? '#C084FC' : isLaptop ? '#60A5FA' : '#34D399',
          fontSize: '10.5px',
          fontWeight: 800,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          boxShadow: '0 6px 18px rgba(0, 10, 40, 0.4)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 20,
          whiteSpace: 'nowrap'
        }}
      >
        <span 
          style={{ 
            width: '6px', 
            height: '6px', 
            borderRadius: '50%', 
            backgroundColor: 'currentColor', 
            boxShadow: '0 0 8px currentColor' 
          }} 
        />
        <span>
          {isScreen && 'Tactical Workstation'}
          {isLaptop && 'MacBook Pro 16"'}
          {isMobile && 'iPhone 16 Pro'}
        </span>
        <span style={{ opacity: 0.55, fontSize: '9px', marginLeft: '2px' }}>
          • {isScreen ? 'Hover to Morph' : 'Morphed'}
        </span>
      </div>

      {/* ================= 1. LEFT CABLE CONNECTOR & LOOPING CORD (TACTICAL ONLY) ================= */}
      <div
        style={{
          position: 'absolute',
          left: '-48px',
          top: '32%',
          width: '58px',
          height: '180px',
          pointerEvents: 'none',
          zIndex: 8,
          transform: isScreen ? 'translateZ(12px) scale(1)' : 'translateZ(0px) scale(0.6)',
          opacity: isScreen ? 1 : 0,
          transition: 'opacity 0.4s ease, transform 0.45s ease'
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

      {/* ================= 2. MAIN CHASSIS (MORPHING HOUSING) ================= */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: containerRadius,
          background: isMobile
            ? 'linear-gradient(145deg, #334155 0%, #1E293B 40%, #0F172A 100%)'
            : isLaptop
            ? 'linear-gradient(145deg, #374151 0%, #1F2937 45%, #111827 100%)'
            : 'linear-gradient(145deg, #2D333F 0%, #1A1E27 45%, #0F1218 100%)',
          boxShadow: isMobile
            ? 'inset 0 1px 1px rgba(255,255,255,0.35), inset 0 -2px 4px rgba(0,0,0,0.8), 0 0 0 2px #334155, 0 16px 36px rgba(0,0,0,0.5)'
            : isLaptop
            ? 'inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.8), 0 0 0 1.5px #374151, 0 20px 40px rgba(0,0,0,0.5)'
            : 'inset 0 2px 1px rgba(255,255,255,0.18), inset 0 -2px 4px rgba(0,0,0,0.8), 0 20px 40px rgba(0,0,0,0.5)',
          border: isMobile
            ? '1.5px solid rgba(255,255,255,0.22)'
            : '1px solid rgba(255,255,255,0.14)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: containerPadding,
          boxSizing: 'border-box',
          transition: 'all 0.65s cubic-bezier(0.34, 1.25, 0.64, 1)'
        }}
      >
        {/* Tactical Grip Ridges on Top & Bottom (Screen mode only) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '25%',
            right: '25%',
            height: '6px',
            background: 'repeating-linear-gradient(90deg, #11141B, #11141B 6px, #374151 6px, #374151 8px)',
            opacity: isScreen ? 0.85 : 0,
            borderBottom: '1px solid rgba(0,0,0,0.8)',
            transition: 'opacity 0.4s ease'
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
            opacity: isScreen ? 0.85 : 0,
            borderTop: '1px solid rgba(0,0,0,0.8)',
            transition: 'opacity 0.4s ease'
          }}
        />

        {/* ================= 3. INNER SCREEN BEZEL & RECESSED FRAME ================= */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: isMobile ? '34px' : isLaptop ? '8px' : '10px',
            backgroundColor: '#05070B',
            boxShadow: 'inset 0 0 16px rgba(0,0,0,0.9), 0 0 0 1.5px #11141B',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-radius 0.65s ease'
          }}
        >
          {/* Active Video Player */}
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
              filter: isDistorting ? 'url(#screen-surface-distortion)' : 'none',
              transform: isDistorting ? 'scale(1.03)' : 'scale(1.0)',
              transition: isDistorting ? 'transform 0.3s ease' : 'transform 0.4s ease, filter 0.25s ease'
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>

          {/* Mobile Dynamic Island */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: isMobile ? '76px' : '0px',
              height: isMobile ? '20px' : '0px',
              borderRadius: '20px',
              backgroundColor: '#000000',
              border: isMobile ? '1px solid rgba(255,255,255,0.1)' : 'none',
              zIndex: 14,
              opacity: isMobile ? 1 : 0,
              pointerEvents: 'none',
              transition: 'all 0.5s cubic-bezier(0.34, 1.25, 0.64, 1)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 8px',
              boxSizing: 'border-box'
            }}
          >
            {/* Camera lens */}
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #1E3A8A 0%, #000000 70%)',
                border: '1px solid #1E293B'
              }}
            />
            {/* Sensor / status dot */}
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                boxShadow: '0 0 6px #10B981'
              }}
            />
          </div>

          {/* Mobile Bottom Home Bar Indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: isMobile ? '38%' : '0px',
              height: isMobile ? '4px' : '0px',
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              borderRadius: '9999px',
              zIndex: 14,
              opacity: isMobile ? 1 : 0,
              pointerEvents: 'none',
              transition: 'all 0.4s ease'
            }}
          />

          {/* Laptop Webcam Notch */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: isLaptop ? '86px' : '0px',
              height: isLaptop ? '13px' : '0px',
              backgroundColor: '#000000',
              borderRadius: '0 0 7px 7px',
              zIndex: 14,
              opacity: isLaptop ? 1 : 0,
              pointerEvents: 'none',
              transition: 'all 0.45s cubic-bezier(0.34, 1.25, 0.64, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #1E3A8A 0%, #000 70%)',
                border: '1px solid #334155'
              }}
            />
            <div
              style={{
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                boxShadow: '0 0 4px #10B981'
              }}
            />
          </div>

          {/* CRT Scanline / Tactical Texture (Screen mode only) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1.5px, transparent 1.5px, transparent 3px)',
              mixBlendMode: 'multiply',
              opacity: isScreen ? 0.75 : 0,
              zIndex: 3,
              transition: 'opacity 0.45s ease'
            }}
          />

          {/* Specular Dynamic Glass Glint */}
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

      {/* ================= 4. INDUSTRIAL CORNER PROTECTIVE BUMPERS (TACTICAL ONLY) ================= */}
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
          transform: isScreen ? 'translateZ(10px) scale(1)' : 'translateZ(0px) scale(0.6)',
          opacity: isScreen ? 1 : 0,
          transition: 'opacity 0.45s ease, transform 0.45s ease'
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
          transform: isScreen ? 'translateZ(10px) scale(1)' : 'translateZ(0px) scale(0.6)',
          opacity: isScreen ? 1 : 0,
          transition: 'opacity 0.45s ease, transform 0.45s ease'
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
          transform: isScreen ? 'translateZ(10px) scale(1)' : 'translateZ(0px) scale(0.6)',
          opacity: isScreen ? 1 : 0,
          transition: 'opacity 0.45s ease, transform 0.45s ease'
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
          transform: isScreen ? 'translateZ(10px) scale(1)' : 'translateZ(0px) scale(0.6)',
          opacity: isScreen ? 1 : 0,
          transition: 'opacity 0.45s ease, transform 0.45s ease'
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

      {/* ================= 5. LAPTOP 3D BASE DECK (UNFOLDS IN 3D PERSPECTIVE) ================= */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(100% - 2px)',
          left: '-4%',
          right: '-4%',
          height: 'clamp(140px, 17vw, 210px)',
          transformOrigin: 'top center',
          transform: isLaptop 
            ? 'perspective(900px) rotateX(62deg) translateY(-2px) scale(1)' 
            : 'perspective(900px) rotateX(75deg) translateY(-24px) scale(0.75)',
          opacity: isLaptop ? 1 : 0,
          pointerEvents: isLaptop ? 'auto' : 'none',
          transition: 'all 0.65s cubic-bezier(0.34, 1.25, 0.64, 1)',
          borderRadius: '0 0 16px 16px',
          background: 'linear-gradient(180deg, #1E232E 0%, #161A22 55%, #0F1218 100%)',
          boxShadow: '0 28px 50px rgba(0,0,0,0.65), inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.8)',
          border: '1px solid rgba(255,255,255,0.12)',
          padding: '10px 18px 14px 18px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 7
        }}
      >
        {/* CNC Center Hinge Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '20%',
            right: '20%',
            height: '4px',
            backgroundColor: '#0B0D12',
            borderRadius: '0 0 3px 3px'
          }}
        />

        {/* Inset Keyboard Tray */}
        <div
          style={{
            width: '86%',
            height: '58%',
            backgroundColor: '#0A0C10',
            borderRadius: '6px',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.8)',
            padding: '5px 7px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '3px'
          }}
        >
          {/* Key Rows */}
          {[14, 14, 13, 11].map((keysInRow, rIdx) => (
            <div key={rIdx} style={{ display: 'flex', gap: '3px', width: '100%', height: '22%' }}>
              {Array.from({ length: keysInRow }).map((_, kIdx) => {
                const isSpace = rIdx === 3 && kIdx === 5;
                return (
                  <div
                    key={kIdx}
                    style={{
                      flex: isSpace ? 4.5 : 1,
                      height: '100%',
                      backgroundColor: '#1E232E',
                      borderRadius: '2.5px',
                      border: '0.5px solid rgba(255,255,255,0.08)',
                      boxShadow: '0 1px 0 #000000, inset 0 0.5px 0 rgba(255,255,255,0.2)'
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Large Glass Trackpad */}
        <div
          style={{
            width: '38%',
            height: '32%',
            borderRadius: '6px',
            backgroundColor: '#191D26',
            border: '1px solid rgba(255,255,255,0.09)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.06)'
          }}
        />

        {/* Front Edge Lip Scoop */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '43%',
            width: '14%',
            height: '3.5px',
            borderRadius: '4px 4px 0 0',
            backgroundColor: '#090B0F'
          }}
        />
      </div>

      {/* ================= 6. SMARTPHONE PHYSICAL SIDE BUTTONS ================= */}
      {/* Left side: Action Button + Volume Buttons */}
      <div
        style={{
          position: 'absolute',
          left: '-4px',
          top: '22%',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          opacity: isMobile ? 1 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.4s ease',
          zIndex: 8
        }}
      >
        <div style={{ width: '4px', height: '14px', backgroundColor: '#64748B', borderRadius: '2px 0 0 2px' }} />
        <div style={{ width: '4px', height: '24px', backgroundColor: '#64748B', borderRadius: '2px 0 0 2px' }} />
        <div style={{ width: '4px', height: '24px', backgroundColor: '#64748B', borderRadius: '2px 0 0 2px' }} />
      </div>

      {/* Right side: Power Button */}
      <div
        style={{
          position: 'absolute',
          right: '-4px',
          top: '26%',
          opacity: isMobile ? 1 : 0,
          pointerEvents: 'none',
          transition: 'opacity 0.4s ease',
          zIndex: 8
        }}
      >
        <div style={{ width: '4px', height: '36px', backgroundColor: '#64748B', borderRadius: '0 2px 2px 0' }} />
      </div>
    </div>
  );
}
