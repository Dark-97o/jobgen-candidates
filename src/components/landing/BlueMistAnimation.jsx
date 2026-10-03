import React, { useEffect, useRef } from 'react';

/**
 * BlueMistAnimation
 * 
 * Ethereal, silky-smooth animated blue mist composed of circular floating mist shapes / orbs.
 * Features:
 * 1. Clearly circular mist shapes floating gently in multi-axis orbital trajectories.
 * 2. Layer 1: Hardware-accelerated CSS floating circular mist orbs with rich blue/cyan radial gradients.
 * 3. Layer 2: High-DPR procedural HTML5 Canvas circular mist particles with organic buoyancy, harmonic wave float, and cursor interactivity.
 * 4. Zero harsh edges; ethereal feathered falloff retaining unmistakable circular morphology.
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

    // Circular mist orb color palettes: electric sapphire, royal blue, sky cyan, azure mist
    const PALETTES = [
      { r: 37, g: 99, b: 235 },   // Electric Royal Blue (#2563EB)
      { r: 56, g: 189, b: 248 },  // Sky Cyan Mist (#38BDF8)
      { r: 2, g: 132, b: 199 },   // Deep Ocean Azure (#0284C7)
      { r: 96, g: 165, b: 250 },  // Soft Powder Blue (#60A5FA)
      { r: 6, g: 182, b: 212 },   // Luminous Turquoise Cyan (#06B6D4)
      { r: 79, g: 70, b: 229 }    // Indigo Accent Mist (#4F46E5)
    ];

    const PARTICLE_COUNT = 24;
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const color = PALETTES[i % PALETTES.length];
      const baseRadius = 55 + Math.random() * 95; // 55px to 150px circular radius
      particles.push({
        x: Math.random() * (width + 200) - 100,
        y: Math.random() * (height + 200) - 100,
        baseRadius,
        radius: baseRadius,
        vx: (Math.random() - 0.5) * 0.45,       // gentle horizontal drift
        vy: -0.15 - Math.random() * 0.35,       // gentle upward buoyancy
        floatAngle: Math.random() * Math.PI * 2, // orbital floating angle
        floatSpeed: 0.008 + Math.random() * 0.012,
        orbitRadiusX: 25 + Math.random() * 45,
        orbitRadiusY: 18 + Math.random() * 35,
        pulseSpeed: 0.003 + Math.random() * 0.004,
        pulsePhase: Math.random() * Math.PI * 2,
        alpha: 0.16 + Math.random() * 0.16,     // subtle ethereal transparency on white
        color
      });
    }

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse position interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Linear drift + harmonic orbital circular float
        p.floatAngle += p.floatSpeed;
        const orbitX = Math.cos(p.floatAngle) * p.orbitRadiusX;
        const orbitY = Math.sin(p.floatAngle * 0.8) * p.orbitRadiusY;

        p.x += p.vx;
        p.y += p.vy;

        const currentX = p.x + orbitX;
        const currentY = p.y + orbitY;

        // Interactive mouse dispersion: gently floating around cursor
        if (mouse.isActive) {
          const dx = currentX - mouse.x;
          const dy = currentY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 240;
          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 1.6;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Circular breathing scale
        const scale = 1 + Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.12;
        const currentRadius = p.baseRadius * scale;

        // Seamless wrap around edges
        if (p.x - currentRadius > width + 100) {
          p.x = -currentRadius - 40;
        } else if (p.x + currentRadius < -100) {
          p.x = width + currentRadius + 40;
        }

        if (p.y + currentRadius < -120) {
          p.y = height + currentRadius + 40;
          p.x = Math.random() * width;
        } else if (p.y - currentRadius > height + 120) {
          p.y = -currentRadius - 40;
        }

        // Draw soft, ethereal circular mist shape
        const grad = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          currentRadius
        );

        const { r, g, b } = p.color;
        const a = p.alpha;

        grad.addColorStop(0.0, `rgba(${r}, ${g}, ${b}, ${a * 1.15})`);
        grad.addColorStop(0.35, `rgba(${r}, ${g}, ${b}, ${a * 0.75})`);
        grad.addColorStop(0.70, `rgba(${r}, ${g}, ${b}, ${a * 0.22})`);
        grad.addColorStop(1.0, `rgba(${r}, ${g}, ${b}, 0.0)`);

        ctx.save();
        ctx.fillStyle = grad;
        ctx.beginPath();
        // Explicitly circular mist shape
        ctx.arc(currentX, currentY, currentRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
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
      {/* =========================================================================
          LAYER 1: DISTINCT CIRCULAR MIST ORBS FLOATING AROUND (CSS ACCELERATED)
          ========================================================================= */}

      {/* Circular Mist Orb 1 - Floating Top Left */}
      <div
        className="circular-mist-orb orb-1"
        style={{
          position: 'absolute',
          top: '-8%',
          left: '8%',
          width: '460px',
          height: '460px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.28) 0%, rgba(56, 189, 248, 0.16) 45%, rgba(147, 197, 253, 0.04) 70%, transparent 100%)',
          filter: 'blur(45px)',
          animation: 'mistCircleFloat1 20s ease-in-out infinite alternate',
          transformOrigin: 'center center'
        }}
      />

      {/* Circular Mist Orb 2 - Floating Right Side */}
      <div
        className="circular-mist-orb orb-2"
        style={{
          position: 'absolute',
          top: '25%',
          right: '4%',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.30) 0%, rgba(2, 132, 199, 0.18) 45%, rgba(224, 242, 254, 0.05) 72%, transparent 100%)',
          filter: 'blur(52px)',
          animation: 'mistCircleFloat2 24s ease-in-out infinite alternate',
          transformOrigin: 'center center'
        }}
      />

      {/* Circular Mist Orb 3 - Floating Center / Bottom */}
      <div
        className="circular-mist-orb orb-3"
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '32%',
          width: '440px',
          height: '440px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(79, 70, 229, 0.22) 0%, rgba(37, 99, 235, 0.16) 48%, rgba(199, 210, 254, 0.04) 70%, transparent 100%)',
          filter: 'blur(48px)',
          animation: 'mistCircleFloat3 18s ease-in-out infinite alternate',
          transformOrigin: 'center center'
        }}
      />

      {/* Circular Mist Orb 4 - Floating Center Left */}
      <div
        className="circular-mist-orb orb-4"
        style={{
          position: 'absolute',
          top: '45%',
          left: '-5%',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.26) 0%, rgba(56, 189, 248, 0.14) 50%, transparent 72%)',
          filter: 'blur(38px)',
          animation: 'mistCircleFloat4 22s ease-in-out infinite alternate',
          transformOrigin: 'center center'
        }}
      />

      {/* Circular Mist Orb 5 - Floating Bottom Right */}
      <div
        className="circular-mist-orb orb-5"
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '20%',
          width: '340px',
          height: '340px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.22) 0%, rgba(96, 165, 250, 0.12) 52%, transparent 70%)',
          filter: 'blur(34px)',
          animation: 'mistCircleFloat5 16s ease-in-out infinite alternate',
          transformOrigin: 'center center'
        }}
      />

      {/* =========================================================================
          LAYER 2: PROCEDURAL CIRCULAR MIST CANVAS (PARTICLE BUOYANCY ENGINE)
          ========================================================================= */}
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

      {/* Smooth Multi-Axis Circular Floating Keyframes */}
      <style>{`
        @keyframes mistCircleFloat1 {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          33% {
            transform: translate3d(55px, 45px, 0) scale(1.08);
          }
          66% {
            transform: translate3d(-35px, 65px, 0) scale(0.95);
          }
          100% {
            transform: translate3d(25px, -30px, 0) scale(1.04);
          }
        }

        @keyframes mistCircleFloat2 {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          33% {
            transform: translate3d(-60px, -45px, 0) scale(0.94);
          }
          66% {
            transform: translate3d(-40px, 50px, 0) scale(1.10);
          }
          100% {
            transform: translate3d(45px, -20px, 0) scale(0.98);
          }
        }

        @keyframes mistCircleFloat3 {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          40% {
            transform: translate3d(-50px, -60px, 0) scale(1.12);
          }
          75% {
            transform: translate3d(60px, -35px, 0) scale(0.96);
          }
          100% {
            transform: translate3d(-20px, 40px, 0) scale(1.05);
          }
        }

        @keyframes mistCircleFloat4 {
          0% {
            transform: translate3d(0, 0, 0) scale(0.96);
          }
          50% {
            transform: translate3d(70px, -40px, 0) scale(1.10);
          }
          100% {
            transform: translate3d(40px, 50px, 0) scale(1.02);
          }
        }

        @keyframes mistCircleFloat5 {
          0% {
            transform: translate3d(0, 0, 0) scale(1.05);
          }
          50% {
            transform: translate3d(-45px, -50px, 0) scale(0.92);
          }
          100% {
            transform: translate3d(35px, 35px, 0) scale(1.08);
          }
        }
      `}</style>
    </div>
  );
}
