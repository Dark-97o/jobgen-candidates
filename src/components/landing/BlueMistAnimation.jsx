import React from 'react';

/**
 * BlueMistAnimation
 * 
 * Tangible, luminous 3D circular floating spheres (not faded/hazy mist).
 * Features:
 * - Exactly 2 distinct circular spheres per section with defined spherical curvature
 * - 3D radial specular lighting, realistic spherical shadow depth, and glossy specular reflection glints
 * - 50% scale reduction (~440px and ~500px) with zero blur haze
 * - Hardware-accelerated GPU floating transforms
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
          EXACTLY 2 TANGIBLE 3D CIRCULAR SPHERES (CLEAR PERIMETER, NOT FADED)
          ========================================================================= */}

      {/* Floating 3D Circular Sphere 1 — Top Left Margin */}
      <div
        className="floating-circular-sphere sphere-1"
        style={{
          position: 'absolute',
          top: '3%',
          left: '-4%',
          width: '440px',
          height: '440px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 32% 28%, #FFFFFF 0%, #7DD3FC 14%, #38BDF8 28%, #2563EB 58%, #1D4ED8 82%, #1E3A8A 100%)',
          boxShadow: `
            inset 8px 10px 24px rgba(255, 255, 255, 0.65),
            inset -18px -24px 44px rgba(10, 25, 75, 0.7),
            0 24px 60px -12px rgba(37, 99, 235, 0.38),
            0 0 35px rgba(56, 189, 248, 0.25)
          `,
          opacity: 0.82,
          animation: 'sphereFloat1 22s ease-in-out infinite alternate',
          transformOrigin: 'center center',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          contain: 'strict'
        }}
      >
        {/* Specular Curved Glint Reflection for 3D Gloss */}
        <div
          style={{
            position: 'absolute',
            top: '12%',
            left: '18%',
            width: '38%',
            height: '22%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0) 72%)',
            transform: 'rotate(-32deg)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Floating 3D Circular Sphere 2 — Bottom Right Margin */}
      <div
        className="floating-circular-sphere sphere-2"
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 26%, #E0F2FE 0%, #38BDF8 18%, #0284C7 44%, #1D4ED8 72%, #172554 100%)',
          boxShadow: `
            inset 10px 12px 28px rgba(255, 255, 255, 0.6),
            inset -20px -28px 50px rgba(8, 20, 60, 0.75),
            0 28px 70px -15px rgba(2, 132, 199, 0.4),
            0 0 40px rgba(37, 99, 235, 0.25)
          `,
          opacity: 0.78,
          animation: 'sphereFloat2 26s ease-in-out infinite alternate',
          transformOrigin: 'center center',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          contain: 'strict'
        }}
      >
        {/* Specular Curved Glint Reflection */}
        <div
          style={{
            position: 'absolute',
            top: '11%',
            left: '20%',
            width: '36%',
            height: '20%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0) 70%)',
            transform: 'rotate(-30deg)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Smooth Multi-Axis Orbital Floating Keyframes */}
      <style>{`
        @keyframes sphereFloat1 {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          33% {
            transform: translate3d(45px, 35px, 0) scale(1.04);
          }
          66% {
            transform: translate3d(-35px, 50px, 0) scale(0.97);
          }
          100% {
            transform: translate3d(25px, -25px, 0) scale(1.02);
          }
        }

        @keyframes sphereFloat2 {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          33% {
            transform: translate3d(-50px, -35px, 0) scale(0.96);
          }
          66% {
            transform: translate3d(-35px, 45px, 0) scale(1.05);
          }
          100% {
            transform: translate3d(40px, -20px, 0) scale(0.98);
          }
        }
      `}</style>
    </div>
  );
}
