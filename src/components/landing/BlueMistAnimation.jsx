import React, { useEffect, useRef } from 'react';

/**
 * BlueMistAnimation
 * High-performance, silky-smooth animated blue mist / vapor background.
 * Uses procedural Canvas 2D mist particles with harmonic flow fields and
 * mouse-interactive fluid repulsion, layered over soft ambient color waves.
 * Zero image dependencies.
 */
export default function BlueMistAnimation() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Mouse tracking for mist parting / swirl
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isActive: false
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const container = containerRef.current || canvas;
    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    // Resize handling with high DPR
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(canvas);

    // Mist particle configuration
    // Palettes: Soft electric blues, sky blues, cyan mist, and soft vapor whites
    const COLOR_PALETTES = [
      { r: 59, g: 130, b: 246 },  // #3B82F6 Vibrant blue
      { r: 37, g: 99, b: 235 },   // #2563EB Royal blue
      { r: 96, g: 165, b: 250 },  // #60A5FA Sky mist
      { r: 147, g: 197, b: 253 }, // #93C5FD Soft azure
      { r: 6, g: 182, b: 212 },   // #06B6D4 Subtle cyan mist
      { r: 29, g: 78, b: 216 }    // #1D4ED8 Deep sapphire
    ];

    const PARTICLE_COUNT = 28;
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const color = COLOR_PALETTES[i % COLOR_PALETTES.length];
      particles.push({
        x: Math.random() * (width + 400) - 200,
        y: Math.random() * (height + 200) - 100,
        baseRadius: 180 + Math.random() * 220,
        radius: 180 + Math.random() * 220,
        vx: 0.18 + Math.random() * 0.35, // Horizontal drift speed
        vy: (Math.random() - 0.5) * 0.2, // Vertical drift
        flowFreqX: 0.0006 + Math.random() * 0.0008,
        flowFreqY: 0.0008 + Math.random() * 0.001,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.001 + Math.random() * 0.0015,
        alpha: 0.09 + Math.random() * 0.14,
        color
      });
    }

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Draw each mist puff
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Harmonic fluid wave displacement
        p.x += p.vx + Math.sin(time * p.flowFreqX + p.phase) * 0.45;
        p.y += p.vy + Math.cos(time * p.flowFreqY + p.phase) * 0.35;

        // Interactive mouse dispersion (mist gently parts around cursor)
        if (mouse.isActive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 260;
          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 1.8;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Breathing size oscillation
        const scale = 1 + Math.sin(time * p.pulseSpeed + p.phase) * 0.16;
        const currentRadius = p.baseRadius * scale;

        // Wrap around boundaries seamlessly
        if (p.x - currentRadius > width + 100) {
          p.x = -currentRadius - 50;
          p.y = Math.random() * height;
        } else if (p.x + currentRadius < -150) {
          p.x = width + currentRadius + 50;
        }

        if (p.y - currentRadius > height + 100) {
          p.y = -currentRadius;
        } else if (p.y + currentRadius < -100) {
          p.y = height + currentRadius;
        }

        // Create multi-stop radial gradient for ethereal soft volumetric smoke
        const grad = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          currentRadius
        );

        const { r, g, b } = p.color;
        const a = p.alpha;

        grad.addColorStop(0.0, `rgba(${r}, ${g}, ${b}, ${a * 1.1})`);
        grad.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${a * 0.75})`);
        grad.addColorStop(0.65, `rgba(${r}, ${g}, ${b}, ${a * 0.28})`);
        grad.addColorStop(1.0, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      {/* Dynamic Ambient Fluid Mist Waves (Layer 1 - CSS Hardware Accelerated) */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-15%',
          width: '70vw',
          height: '70vw',
          maxWidth: '900px',
          maxHeight: '900px',
          borderRadius: '45% 55% 63% 37% / 42% 44% 56% 58%',
          background: 'radial-gradient(circle at 35% 35%, rgba(59, 130, 246, 0.25) 0%, rgba(147, 197, 253, 0.12) 45%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'mistMorph1 18s ease-in-out infinite alternate',
          transformOrigin: 'center center'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-25%',
          right: '-15%',
          width: '75vw',
          height: '75vw',
          maxWidth: '950px',
          maxHeight: '950px',
          borderRadius: '58% 42% 38% 62% / 54% 60% 40% 46%',
          background: 'radial-gradient(circle at 65% 65%, rgba(37, 99, 235, 0.22) 0%, rgba(96, 165, 250, 0.1) 50%, transparent 72%)',
          filter: 'blur(70px)',
          animation: 'mistMorph2 22s ease-in-out infinite alternate',
          transformOrigin: 'center center'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '25%',
          width: '55vw',
          height: '45vw',
          maxWidth: '700px',
          maxHeight: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.14) 0%, rgba(59, 130, 246, 0.08) 45%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'mistMorph3 16s ease-in-out infinite alternate'
        }}
      />

      {/* Procedural Mist Canvas (Layer 2 - Particle Vapor Engine) */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />

      {/* Keyframe Styles for Mist Morphology */}
      <style>{`
        @keyframes mistMorph1 {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            border-radius: 45% 55% 63% 37% / 42% 44% 56% 58%;
          }
          50% {
            transform: translate3d(50px, 30px, 0) rotate(90deg) scale(1.12);
            border-radius: 58% 42% 48% 52% / 55% 40% 60% 45%;
          }
          100% {
            transform: translate3d(-30px, 40px, 0) rotate(180deg) scale(0.96);
            border-radius: 40% 60% 55% 45% / 48% 52% 48% 52%;
          }
        }

        @keyframes mistMorph2 {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            border-radius: 58% 42% 38% 62% / 54% 60% 40% 46%;
          }
          50% {
            transform: translate3d(-40px, -35px, 0) rotate(-75deg) scale(1.08);
            border-radius: 46% 54% 58% 42% / 40% 50% 50% 60%;
          }
          100% {
            transform: translate3d(35px, -20px, 0) rotate(-150deg) scale(0.94);
            border-radius: 62% 38% 45% 55% / 60% 45% 55% 40%;
          }
        }

        @keyframes mistMorph3 {
          0% {
            transform: translate3d(-20px, -15px, 0) scale(0.95);
            opacity: 0.65;
          }
          50% {
            transform: translate3d(25px, 20px, 0) scale(1.15);
            opacity: 0.95;
          }
          100% {
            transform: translate3d(-10px, 30px, 0) scale(1.02);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}
