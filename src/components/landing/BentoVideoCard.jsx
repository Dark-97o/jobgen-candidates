import React, { useRef, useEffect } from 'react';

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
  objectPosition = 'center',
  onHoverChange,
  style = {}
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
    onHoverChange?.(true);
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
    onHoverChange?.(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
  };

  return (
    <div
      className={`productivity-card-${colSpan === 8 ? 'rect' : 'square'}`}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        width: '100%',
        height: '380px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '24px',
        border: 'none',
        outline: 'none',
        boxShadow: '0 0 30px 4px rgba(180, 205, 245, 0.32), 0 20px 40px -10px rgba(37, 99, 235, 0.16)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: '#0F172A',
        cursor: 'pointer',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
        ...style
      }}
    >
      {/* ================= macOS WINDOW TOP TITLE BAR (FROSTED GLASS) ================= */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '38px',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.04) 80%, transparent 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.14)',
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
      </div>

      {/* Video Canvas (Full-Bleed) */}
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
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
            fontSize: 'clamp(26px, 2.3vw, 32px)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
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
