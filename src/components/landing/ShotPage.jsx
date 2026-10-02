import React, { useRef, useEffect } from 'react';
import InteractiveFluidGradient from './InteractiveFluidGradient';
import RuggedScreen3D from './RuggedScreen3D';
import HandwrittenSubtitle from './HandwrittenSubtitle';
import RevealingTitle from './RevealingTitle';

/**
 * ShotPage (/shot)
 * Clean, unobstructed 4K/HD recording view containing ONLY the hero section animation:
 * - Codegrid interactive fluid WebGL shader
 * - 3D Logo & Live sequential title reveal ("JobGen.IO")
 * - 3D Handwritten subtitle ("Land your next dream job")
 * - 3D Rugged tactical screen with real jobs video & surface displacement
 * - 5x5 glowing dots array
 * - Seamless pointer tracking + idle cinematic drift
 * - Completely free of buttons, navigation bars, scroll cues, or text overlays
 */
export default function ShotPage() {
  const resumeContainerRef = useRef(null);
  const titleWrapperRef = useRef(null);
  const glintRef = useRef(null);
  const lastPointerTimeRef = useRef(0);

  // 3D Screen pointer & motion tracking
  const rotRef = useRef({
    currentX: 3,
    currentY: -4,
    targetX: 3,
    targetY: -4,
    transX: 0,
    transY: 0,
    currentScale: 1,
    targetScale: 1
  });

  // 3D Title & Logo tracking
  const titleRotRef = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    transX: 0,
    transY: 0,
    targetTransX: 0,
    targetTransY: 0
  });

  useEffect(() => {
    let animId;
    const animate = () => {
      const now = Date.now();
      const isIdle = now - lastPointerTimeRef.current > 1200;

      // When pointer is still/idle, apply a gentle organic cinematic drift
      if (isIdle) {
        const t = now * 0.001;
        const driftX = (Math.sin(t * 0.65) * 0.5 + Math.cos(t * 0.35) * 0.35);
        const driftY = (Math.cos(t * 0.55) * 0.4 + Math.sin(t * 0.28) * 0.25);

        rotRef.current.targetY = driftX * 18;
        rotRef.current.targetX = -driftY * 14;
        rotRef.current.transX = driftX * 12;
        rotRef.current.transY = driftY * 8;

        titleRotRef.current.targetY = driftX * 14;
        titleRotRef.current.targetX = -driftY * 11;
        titleRotRef.current.targetTransX = driftX * 10;
        titleRotRef.current.targetTransY = driftY * 7;
      }

      const r = rotRef.current;
      r.currentX += (r.targetX - r.currentX) * 0.075;
      r.currentY += (r.targetY - r.currentY) * 0.075;
      r.currentScale += (r.targetScale - r.currentScale) * 0.085;

      const lev = Math.sin(now * 0.0018) * 8;

      if (resumeContainerRef.current) {
        resumeContainerRef.current.style.transform = `perspective(1100px) rotateX(${r.currentX.toFixed(2)}deg) rotateY(${r.currentY.toFixed(2)}deg) translate3d(${r.transX.toFixed(2)}px, ${(r.transY + lev).toFixed(2)}px, 45px) scale(${r.currentScale.toFixed(3)})`;
      }

      if (glintRef.current) {
        const angle = 115 + r.currentY * 2.0;
        glintRef.current.style.background = `linear-gradient(${angle}deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 52%, rgba(0, 0, 0, 0.04) 100%)`;
      }

      // Title & Logo 3D gaze tracking
      const tr = titleRotRef.current;
      tr.currentX += (tr.targetX - tr.currentX) * 0.075;
      tr.currentY += (tr.targetY - tr.currentY) * 0.075;
      tr.transX += (tr.targetTransX - tr.transX) * 0.075;
      tr.transY += (tr.targetTransY - tr.transY) * 0.075;

      const titleLev = Math.sin(now * 0.0016 + 1.2) * 5;

      if (titleWrapperRef.current) {
        titleWrapperRef.current.style.transform = `perspective(1000px) rotateX(${tr.currentX.toFixed(2)}deg) rotateY(${tr.currentY.toFixed(2)}deg) translate3d(${tr.transX.toFixed(2)}px, ${(tr.transY + titleLev).toFixed(2)}px, 20px)`;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handlePointerMove = (e) => {
    lastPointerTimeRef.current = Date.now();

    const container = resumeContainerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const cx = rect.left + rect.width * 0.5;
    const cy = rect.top + rect.height * 0.5;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    const maxDistX = Math.max(300, window.innerWidth * 0.5);
    const maxDistY = Math.max(250, window.innerHeight * 0.5);

    const normX = Math.max(-1, Math.min(1, dx / maxDistX));
    const normY = Math.max(-1, Math.min(1, dy / maxDistY));

    // Turn 3D Screen to look towards the pointer
    rotRef.current.targetY = normX * 28;
    rotRef.current.targetX = -normY * 24;
    rotRef.current.transX = normX * 18;
    rotRef.current.transY = normY * 14;

    // Turn Logo & Texts to gaze towards the pointer
    titleRotRef.current.targetY = normX * 22;
    titleRotRef.current.targetX = -normY * 18;
    titleRotRef.current.targetTransX = normX * 16;
    titleRotRef.current.targetTransY = normY * 12;
  };

  const handleScreenPointerEnter = () => {
    rotRef.current.targetScale = 1.055;
  };

  const handleScreenPointerLeave = () => {
    rotRef.current.targetScale = 1.0;
  };

  const handlePointerLeave = () => {
    lastPointerTimeRef.current = 0; // resume ambient drift immediately
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#1A53CF',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        zIndex: 9999
      }}
    >
      {/* 1. INTERACTIVE FLUID GRADIENT WEBGL BACKGROUND */}
      <InteractiveFluidGradient />

      {/* 2. HEADLINE: "JobGen.IO" WITH LOGO & SUBTITLE */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(68px, calc(9.5vh + 12px), 116px)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '1340px',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 2,
          pointerEvents: 'none',
          boxSizing: 'border-box'
        }}
      >
        <div 
          ref={titleWrapperRef}
          style={{ 
            display: 'inline-flex', 
            flexDirection: 'column', 
            alignItems: 'stretch', 
            position: 'relative',
            transformStyle: 'preserve-3d',
            willChange: 'transform'
          }}
        >
          <h1
            style={{
              fontFamily: '"Plus Jakarta Sans", -apple-system, sans-serif',
              fontSize: 'clamp(58px, 10.5vw, 168px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.96,
              color: '#FFFFFF',
              WebkitTextStroke: '1.2px #FFFFFF',
              margin: '0 auto',
              textShadow: '0 16px 45px rgba(0, 18, 70, 0.55), 0 0 3px #FFFFFF',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(8px, 1.25vw, 20px)',
              userSelect: 'none',
              transformStyle: 'preserve-3d'
            }}
          >
            <img 
              src="/Whitelogo.webp" 
              alt="JobGen Logo" 
              style={{ 
                width: 'clamp(75px, 13.1vw, 202px)', 
                height: 'clamp(75px, 13.1vw, 202px)', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 14px 32px rgba(0, 18, 70, 0.65))',
                flexShrink: 0,
                transform: 'translateZ(26px)',
                willChange: 'transform'
              }}
              onError={(e) => {
                e.currentTarget.src = '/jobgen-logo.png';
                e.currentTarget.style.filter = 'brightness(0) invert(1)';
              }}
            />
            <span style={{ transform: 'translateZ(18px)', display: 'inline-flex', alignItems: 'center' }}>
              <RevealingTitle text="JobGen.IO" delay={200} />
            </span>
          </h1>
          <HandwrittenSubtitle
            text="Land your next dream job"
            delay={720}
            style={{
              margin: 'clamp(-12px, -1.8vh, -4px) 0 0 0',
              alignSelf: 'flex-end',
              transform: 'translateZ(12px)',
              willChange: 'transform'
            }}
          />
        </div>
      </div>

      {/* 3. 3D RUGGED TACTICAL SCREEN PLAYING JOBS VIDEO */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          marginTop: 'clamp(200px, 28vh, 276px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'auto'
        }}
      >
        <RuggedScreen3D
          containerRef={resumeContainerRef}
          glintRef={glintRef}
          videoSrc="/jobs.mp4"
          onPointerEnter={handleScreenPointerEnter}
          onPointerLeave={handleScreenPointerLeave}
        />
      </div>

      {/* 4. 5X5 GLOWING DOTS ARRAY IN BOTTOM CORNER */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(24px, 4.2vh, 42px)',
          left: 'clamp(24px, 4.5vw, 56px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 6px)',
          gridTemplateRows: 'repeat(5, 6px)',
          gap: '10px',
          zIndex: 10,
          pointerEvents: 'none'
        }}
        aria-hidden="true"
      >
        {Array.from({ length: 25 }).map((_, i) => {
          const row = Math.floor(i / 5);
          const col = i % 5;
          const delay = ((row + col) * 0.24).toFixed(2);
          return (
            <div
              key={`dot-${i}`}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                animation: 'slowDotGlow 3.6s ease-in-out infinite',
                animationDelay: `${delay}s`,
                willChange: 'opacity, transform, box-shadow'
              }}
            />
          );
        })}
      </div>

      <style>{`
        @keyframes slowDotGlow {
          0%, 100% {
            opacity: 0.18;
            transform: scale(0.9);
            box-shadow: none;
          }
          50% {
            opacity: 0.85;
            transform: scale(1.15);
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
          }
        }
      `}</style>
    </div>
  );
}
