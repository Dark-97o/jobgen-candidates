import React, { useState, useEffect } from 'react';

/**
 * CinematicIntro
 * 
 * High-Velocity Automatic Boot Sequence (Fast & Snappy):
 * - t = 80ms: Clouds part rapidly in 4 directions, revealing the capital skyline & greeting.
 * - t = 850ms: Person silhouette & full-width ground deck rise into place.
 * - t = 1850ms: Swiftly fades directly into the Candidate Dashboard.
 * - Total duration: ~2 seconds (Fast, responsive & cinematic).
 * - Instant entry on click or keypress.
 */
export default function CinematicIntro({ onComplete, onSkip }) {
  const [cloudsDispersed, setCloudsDispersed] = useState(false);
  const [step, setStep] = useState(1); // 1 = City & Welcome, 2 = Person & Deck, 3 = Fade to Dashboard

  useEffect(() => {
    // Stage 1: Part clouds (50ms)
    const t1 = setTimeout(() => {
      setCloudsDispersed(true);
    }, 50);

    // Stage 2: Reveal person silhouette & ground deck (500ms)
    const t2 = setTimeout(() => {
      setStep(2);
    }, 500);

    // Stage 3: Smoothly fade into dashboard at 1.55s, completing at exactly 2.0s
    const t3 = setTimeout(() => {
      setStep(3);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 450);
    }, 1550);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  // Click anywhere or press key to enter instantly
  const handleQuickSkip = () => {
    setStep(3);
    if (onSkip) {
      onSkip();
    } else if (onComplete) {
      onComplete();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['Escape', ' ', 'Enter'].includes(e.key)) {
        handleQuickSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      onClick={handleQuickSkip}
      title="Click to enter immediately"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: step >= 3 ? 'none' : 'auto',
        opacity: step >= 3 ? 0 : 1,
        transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
        backgroundColor: '#000000',
        userSelect: 'none',
        cursor: 'pointer',
      }}
    >
      {/* 1. SKYLINE BACKGROUND: Modern Capital */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/city-skyline.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 42%',
          opacity: cloudsDispersed ? 1 : 0.3,
          transform: cloudsDispersed ? 'scale(1)' : 'scale(1.05)',
          transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform, opacity',
        }}
      >
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.22) 75%, rgba(0,0,0,0.5) 100%)',
          }}
        />
      </div>

      {/* 2. BOLD & MINIMALISTIC TYPOGRAPHY */}
      <div 
        style={{
          position: 'absolute',
          top: step === 2 ? '18%' : '24%',
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 24px',
          opacity: cloudsDispersed && step >= 1 ? 1 : 0,
          transform: cloudsDispersed && step >= 1 ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        <h1 
          style={{
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            color: '#FFFFFF',
            margin: '0 0 6px 0',
            textShadow: '0 10px 40px rgba(0, 0, 0, 0.85), 0 2px 8px rgba(0, 0, 0, 0.7)',
            lineHeight: 1.05,
            fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
          }}
        >
          WELCOME BACK, <span style={{ color: '#FFFFFF' }}>ALEXANDER</span>
        </h1>

        <p 
          style={{
            fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
            fontWeight: 700,
            color: 'rgba(255, 255, 255, 0.95)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            margin: 0,
            textShadow: '0 4px 18px rgba(0,0,0,0.85)',
          }}
        >
          LEAD PRODUCT MANAGER · 94% ATS MATCH
        </p>
      </div>

      {/* 3. SOLID BLACK SILHOUETTE & FULL-WIDTH GROUND DECK */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          opacity: step >= 2 ? 1 : 0,
          transform: step >= 2 ? 'translateY(0) scale(1)' : 'translateY(90px) scale(0.95)',
          transformOrigin: '50% 95%',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            position: 'relative',
            marginBottom: '-2px',
          }}
        >
          <div 
            style={{
              position: 'absolute',
              bottom: -3,
              width: '130px',
              height: '14px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 80%)',
            }}
          />

          <img 
            src="/man-isolated.png" 
            alt="Person standing" 
            style={{
              height: 'clamp(230px, 42vh, 370px)',
              width: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 -4px 16px rgba(0,0,0,0.6))',
              position: 'relative',
              zIndex: 2,
            }}
          />
        </div>

        {/* Ground Deck: Full-width (100vw) */}
        <div 
          style={{
            width: '100%',
            height: 'clamp(65px, 9.5vh, 95px)',
            backgroundColor: '#000000',
            position: 'relative',
            zIndex: 3,
            boxShadow: '0 -15px 40px rgba(0,0,0,0.85)',
          }}
        >
          <svg 
            viewBox="0 0 1920 95" 
            preserveAspectRatio="none" 
            style={{ width: '100%', height: '100%', display: 'block' }}
          >
            <rect x="0" y="0" width="1920" height="95" fill="#000000" />
            <line x1="0" y1="1" x2="1920" y2="1" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
            <line x1="0" y1="5" x2="1920" y2="5" stroke="#111622" strokeWidth="2" />
            <line x1="0" y1="18" x2="1920" y2="18" stroke="#080C14" strokeWidth="1" />
            <line x1="120" y1="5" x2="60" y2="95" stroke="#0D131F" strokeWidth="1.5" />
            <line x1="380" y1="5" x2="330" y2="95" stroke="#0D131F" strokeWidth="1.5" />
            <line x1="640" y1="5" x2="610" y2="95" stroke="#0D131F" strokeWidth="1.5" />
            <line x1="960" y1="5" x2="960" y2="95" stroke="#0D131F" strokeWidth="1.5" />
            <line x1="1280" y1="5" x2="1310" y2="95" stroke="#0D131F" strokeWidth="1.5" />
            <line x1="1540" y1="5" x2="1590" y2="95" stroke="#0D131F" strokeWidth="1.5" />
            <line x1="1800" y1="5" x2="1860" y2="95" stroke="#0D131F" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* 4. VOLUMETRIC CLOUDS (SMOOTH & GRACEFUL DISSIPATION) */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 45%, rgba(255, 255, 255, 0.98) 0%, rgba(240, 245, 255, 0.92) 50%, rgba(255, 255, 255, 0.98) 100%)',
          opacity: cloudsDispersed ? 0 : 1,
          transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          zIndex: 29,
        }}
      />

      {/* Cloud 1: Left */}
      <div 
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-15%',
          width: '78vw',
          height: '110vh',
          opacity: cloudsDispersed ? 0 : 0.98,
          transform: cloudsDispersed 
            ? 'translate(-48vw, -28vh) scale(1.4) rotate(-6deg)' 
            : 'translate(0, 0) scale(1) rotate(0deg)',
          filter: cloudsDispersed ? 'blur(18px)' : 'blur(0px)',
          transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          zIndex: 30,
          willChange: 'transform, opacity, filter',
        }}
      >
        <img 
          src="/cloud1.png" 
          alt="Cloud left layer" 
          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
        />
      </div>

      {/* Cloud 2: Right */}
      <div 
        style={{
          position: 'absolute',
          top: '-18%',
          right: '-18%',
          width: '82vw',
          height: '112vh',
          opacity: cloudsDispersed ? 0 : 0.98,
          transform: cloudsDispersed 
            ? 'translate(48vw, -28vh) scale(1.4) rotate(6deg)' 
            : 'translate(0, 0) scale(1) rotate(0deg)',
          filter: cloudsDispersed ? 'blur(18px)' : 'blur(0px)',
          transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          zIndex: 31,
          willChange: 'transform, opacity, filter',
        }}
      >
        <img 
          src="/cloud2.png" 
          alt="Cloud right layer" 
          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
        />
      </div>

      {/* Cloud 3: Center Upper Crest */}
      <div 
        style={{
          position: 'absolute',
          top: '-8%',
          left: '18%',
          width: '64vw',
          height: '75vh',
          opacity: cloudsDispersed ? 0 : 0.92,
          transform: cloudsDispersed 
            ? 'translateY(-26vh) scale(1.3)' 
            : 'translateY(0) scale(1)',
          filter: cloudsDispersed ? 'blur(20px)' : 'blur(0px)',
          transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          zIndex: 32,
          willChange: 'transform, opacity, filter',
        }}
      >
        <img 
          src="/cloud1.png" 
          alt="Cloud center puff" 
          style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scaleX(-1)', display: 'block' }}
        />
      </div>

      {/* Cloud 4: Bottom Rolling Fog */}
      <div 
        style={{
          position: 'absolute',
          bottom: '-12%',
          left: '-5%',
          width: '110vw',
          height: '60vh',
          opacity: cloudsDispersed ? 0 : 0.96,
          transform: cloudsDispersed 
            ? 'translateY(42vh) scale(1.3)' 
            : 'translateY(0) scale(1)',
          filter: cloudsDispersed ? 'blur(18px)' : 'blur(0px)',
          transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          zIndex: 33,
          willChange: 'transform, opacity, filter',
        }}
      >
        <img 
          src="/cloud2.png" 
          alt="Cloud bottom shelf" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* 5. TOP BAR HUD (JobGen.AI Brand + Fast Skip Button) */}
      <div 
        style={{
          position: 'absolute',
          top: 24,
          left: 28,
          right: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 40,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img 
            src="/jobgen-logo.png" 
            alt="JobGen.AI" 
            style={{ 
              width: '32px', 
              height: '32px', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))'
            }} 
          />
          <span style={{ color: '#FFFFFF', fontWeight: 900, fontSize: '17px', letterSpacing: '-0.02em', textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}>
            JobGen.AI
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleQuickSkip();
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.14)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            color: '#FFFFFF',
            borderRadius: '999px',
            padding: '6px 14px',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'background-color 0.15s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)'}
        >
          Skip
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 4 15 12 5 20 5 4"></polygon>
            <line x1="19" y1="5" x2="19" y2="19"></line>
          </svg>
        </button>
      </div>

    </div>
  );
}
