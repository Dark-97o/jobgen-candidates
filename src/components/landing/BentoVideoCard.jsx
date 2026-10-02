import React, { useRef, useEffect } from 'react';
import { Lock } from 'lucide-react';

/**
 * BentoVideoCard
 * Renders a full-bleed bento card styled as a native macOS window:
 * - Iconic macOS traffic lights (red, yellow, green)
 * - Frosted macOS top title bar with security/file indicator
 * - Mac-style double-bezel border with specular glass rim
 * - Muted video that only plays on card hover
 * - Bottom atmospheric black fade with half-white half-blue headline typography
 */
export default function BentoVideoCard({
  src,
  headline,
  whiteText,
  blueText,
  fileName,
  colSpan = 8,
  objectPosition = 'center'
}) {
  const videoRef = useRef(null);

  // Guarantee the first frame renders immediately when the video metadata loads
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const handleLoadedData = () => {
      try {
        if (video.currentTime === 0) {
          video.currentTime = 0.05;
        }
      } catch {}
    };

    video.addEventListener('loadeddata', handleLoadedData);
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [src]);

  const handlePointerEnter = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  };

  const handlePointerLeave = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
  };

  // Sleek macOS window label (clean, without .app)
  const rawLabel = fileName || (
    blueText ? blueText.toLowerCase().replace(/\s+/g, '-') : 'jobgen'
  );
  const windowLabel = rawLabel.replace(/\.app$/i, '');

  return (
    <div
      className={`white-bento-card productivity-card-${colSpan === 8 ? 'rect' : 'square'}`}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        gridColumn: `span ${colSpan}`,
        height: '380px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '22px',
        // macOS Liquid Glass & Double-Bezel Border
        border: '1.5px solid rgba(255, 255, 255, 0.28)',
        boxShadow: `
          0 0 0 1px rgba(15, 23, 42, 0.1),
          0 24px 50px -12px rgba(15, 23, 42, 0.18),
          0 8px 24px -4px rgba(26, 83, 207, 0.1),
          inset 0 1.5px 1.5px rgba(255, 255, 255, 0.5),
          inset 0 0 0 1px rgba(255, 255, 255, 0.1)
        `,
        backgroundColor: '#0F172A',
        cursor: 'pointer'
      }}
    >
      {/* ================= macOS WINDOW TOP TITLE BAR ================= */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '38px',
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.78) 0%, rgba(15, 23, 42, 0.45) 75%, transparent 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          boxSizing: 'border-box',
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      >
        {/* macOS Traffic Lights */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#FF5F56',
              border: '0.5px solid #E0443E',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
              display: 'inline-block'
            }}
          />
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#FFBD2E',
              border: '0.5px solid #DEA123',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
              display: 'inline-block'
            }}
          />
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#27C93F',
              border: '0.5px solid #1AAB29',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
              display: 'inline-block'
            }}
          />
        </div>

        {/* Center Mac Window Tab / File Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '2px 10px',
            borderRadius: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: '#94A3B8',
            fontSize: '11px',
            fontFamily: '"JetBrains Mono", monospace',
            letterSpacing: '0.02em',
            boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.3)'
          }}
        >
          <Lock size={9} color="#64748B" />
          <span>{windowLabel}</span>
        </div>

        {/* Right Corner Placeholder to Balance Flex Layout */}
        <div style={{ width: '44px' }} />
      </div>

      {/* Video Canvas (Full-Bleed) */}
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        className="bento-img-hover"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition,
          display: 'block'
        }}
      />

      {/* Bottom Black Fade Overlay with Headline Text */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: colSpan === 8 ? '52px 32px 26px 32px' : '52px 28px 26px 28px',
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.94) 0%, rgba(0, 0, 0, 0.72) 45%, rgba(0, 0, 0, 0.2) 80%, transparent 100%)',
          display: 'flex',
          alignItems: 'flex-end',
          pointerEvents: 'none',
          zIndex: 2
        }}
      >
        <h3
          style={{
            fontSize: '22px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
            margin: 0,
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.9)'
          }}
        >
          {whiteText || blueText ? (
            <>
              <span style={{ color: '#FFFFFF' }}>{whiteText}</span>
              <span style={{ color: '#60A5FA' }}>{blueText}</span>
            </>
          ) : (
            <span style={{ color: '#FFFFFF' }}>{headline}</span>
          )}
        </h3>
      </div>
    </div>
  );
}
