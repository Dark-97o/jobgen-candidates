import React, { useRef, useEffect } from 'react';

/**
 * BentoVideoCard
 * Renders a full-bleed bento card containing a muted video that stays paused
 * by default and only plays while the user hovers over the card.
 * Overlaid with an atmospheric bottom black fade and headline text.
 */
export default function BentoVideoCard({
  src,
  headline,
  whiteText,
  blueText,
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
      // Seek slightly into the video to ensure browsers decode and paint the first frame
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
        borderRadius: '24px',
        border: '1px solid rgba(226, 232, 240, 0.85)',
        boxShadow: '0 10px 30px -5px rgba(26, 83, 207, 0.08), 0 2px 10px rgba(15, 23, 42, 0.04)',
        backgroundColor: '#0F172A',
        cursor: 'pointer'
      }}
    >
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
          padding: colSpan === 8 ? '48px 32px 26px 32px' : '48px 28px 26px 28px',
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
              <span style={{ color: '#60A5FA', textShadow: '0 0 16px rgba(96, 165, 250, 0.45)' }}>{blueText}</span>
            </>
          ) : (
            <span style={{ color: '#FFFFFF' }}>{headline}</span>
          )}
        </h3>
      </div>
    </div>
  );
}
