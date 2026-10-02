import React from 'react';

export default function VideoShowcaseSection() {
  return (
    <section 
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        height: '100%',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(28px, 4vw, 56px) 24px'
      }}
    >
      {/* Framed Window - Sharp Corners, No JobGen URL, No Unmute Button */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1180px',
          borderRadius: '0px',
          overflow: 'hidden',
          backgroundColor: '#0F131D',
          border: '1px solid #CBD5E1',
          boxShadow: '0 25px 70px -15px rgba(0, 0, 0, 0.16), 0 0 1px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* macOS Desktop Header Bar with Traffic Lights */}
        <div
          style={{
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            backgroundColor: '#0F131D',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            userSelect: 'none',
            flexShrink: 0
          }}
        >
          {/* Traffic Light Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#FF5F56', display: 'inline-block' }} />
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#FFBD2E', display: 'inline-block' }} />
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#27C93F', display: 'inline-block' }} />
          </div>
        </div>

        {/* Foreground Video (Sharp Corners, Zero Border Radius) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/videoplayback.mp4"
          style={{
            width: '100%',
            aspectRatio: '16 / 9',
            objectFit: 'cover',
            display: 'block',
            borderRadius: '0px'
          }}
        />
      </div>
    </section>
  );
}
