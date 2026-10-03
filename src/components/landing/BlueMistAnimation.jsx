import React from 'react';

/**
 * BlueMistAnimation
 * 
 * Elegant, lightweight ambient background featuring exactly 2 floating blue spheres per section,
 * sized at 50% scale (780px and 880px) with smooth multi-axis orbital floating keyframes.
 * Hardware-accelerated with GPU containment, zero main-thread CPU overhead, and pure CSS transforms.
 */
export default function BlueMistAnimation() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
      aria-hidden="true"
    >
      {/* =========================================================================
          EXACTLY 2 FLOATING SPHERES PER SECTION (REDUCED 50% IN SIZE)
          ========================================================================= */}

      {/* Floating Sphere 1 - Top Left / Center (780px, 50% of previous 1550px) */}
      <div
        className="circular-mist-orb orb-1"
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-10%',
          width: '780px',
          height: '780px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.20) 0%, rgba(56, 189, 248, 0.12) 36%, rgba(147, 197, 253, 0.04) 62%, transparent 78%)',
          filter: 'blur(40px)',
          animation: 'mistCircleFloat1 24s ease-in-out infinite alternate',
          transformOrigin: 'center center',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          contain: 'strict'
        }}
      />

      {/* Floating Sphere 2 - Right / Bottom (880px, 50% of previous 1850px) */}
      <div
        className="circular-mist-orb orb-2"
        style={{
          position: 'absolute',
          top: '20%',
          right: '-12%',
          width: '880px',
          height: '880px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.22) 0%, rgba(2, 132, 199, 0.14) 38%, rgba(224, 242, 254, 0.05) 64%, transparent 80%)',
          filter: 'blur(42px)',
          animation: 'mistCircleFloat2 28s ease-in-out infinite alternate',
          transformOrigin: 'center center',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          contain: 'strict'
        }}
      />

      {/* Smooth Multi-Axis Circular Floating Keyframes */}
      <style>{`
        @keyframes mistCircleFloat1 {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          33% {
            transform: translate3d(80px, 60px, 0) scale(1.06);
          }
          66% {
            transform: translate3d(-50px, 90px, 0) scale(0.96);
          }
          100% {
            transform: translate3d(40px, -40px, 0) scale(1.03);
          }
        }

        @keyframes mistCircleFloat2 {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          33% {
            transform: translate3d(-90px, -60px, 0) scale(0.95);
          }
          66% {
            transform: translate3d(-60px, 80px, 0) scale(1.08);
          }
          100% {
            transform: translate3d(70px, -35px, 0) scale(0.98);
          }
        }
      `}</style>
    </div>
  );
}
