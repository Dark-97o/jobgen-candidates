import React from 'react';
import InteractiveFluidGradient from './InteractiveFluidGradient';

/**
 * ShotPage (/shot)
 * Clean, unobstructed 4K/HD recording view containing ONLY the background:
 * - Fullscreen Codegrid interactive WebGL fluid shader canvas
 * - No texts, no logo, no buttons, no 3D figure
 */
export default function ShotPage() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#1A53CF',
        overflow: 'hidden',
        userSelect: 'none',
        zIndex: 9999
      }}
    >
      {/* PURE INTERACTIVE FLUID GRADIENT WEBGL CANVAS */}
      <InteractiveFluidGradient />
    </div>
  );
}
