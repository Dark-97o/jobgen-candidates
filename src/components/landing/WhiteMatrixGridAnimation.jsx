import React, { useEffect, useRef } from 'react';

/**
 * WhiteMatrixGridAnimation
 * 
 * Clean white background with:
 * 1. A uniform grey matrix of subtle dots.
 * 2. Random dots across the matrix glowing with smooth sapphire/electric blue pulses.
 * 3. Thin, laser-crisp blue lines traveling randomly along horizontal and vertical matrix tracks.
 * 
 * Silky 60fps performance on Retina & High-DPR screens.
 */
export default function WhiteMatrixGridAnimation({ style = {} }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const SPACING = 38; // Matrix dot grid spacing
    const BASE_DOT_RADIUS = 1.4;
    const BASE_DOT_COLOR = 'rgba(148, 163, 184, 0.42)'; // Refined grey dot

    // Palette of vibrant blue glow tones for glowing dots and thin lines
    const BLUE_PALETTE = [
      { hex: '#2563EB', rgb: '37, 99, 235' },   // Electric Royal Blue
      { hex: '#1D4ED8', rgb: '29, 78, 216' },   // Deep Sapphire
      { hex: '#0284C7', rgb: '2, 132, 199' },   // Sky Blue
      { hex: '#38BDF8', rgb: '56, 189, 248' },  // Bright Cyan Highlight
      { hex: '#4F46E5', rgb: '79, 70, 229' }    // Indigo Accent
    ];

    // --- State: Glowing Dots ---
    const MAX_GLOWING_DOTS = 28;
    const glowingDots = [];

    const spawnGlowingDot = (cols, rows) => {
      if (cols <= 0 || rows <= 0) return null;
      const col = Math.floor(Math.random() * cols);
      const row = Math.floor(Math.random() * rows);
      const theme = BLUE_PALETTE[Math.floor(Math.random() * BLUE_PALETTE.length)];
      return {
        col,
        row,
        x: col * SPACING,
        y: row * SPACING,
        progress: 0,
        speed: Math.random() * 0.015 + 0.008, // Slow, elegant breathing pulse
        maxRadius: Math.random() * 1.6 + 2.2,
        theme,
        maxGlow: Math.random() * 8 + 6
      };
    };

    // --- State: Thin Blue Lines ---
    const MAX_LINES = 7;
    const lines = [];

    const spawnLine = (cols, rows) => {
      if (!width || !height) return null;
      const isHorizontal = Math.random() > 0.5;
      const theme = BLUE_PALETTE[Math.floor(Math.random() * BLUE_PALETTE.length)];
      const speed = (Math.random() * 1.8 + 1.2) * (Math.random() > 0.5 ? 1 : -1);
      const length = Math.random() * 180 + 130;

      if (isHorizontal) {
        const row = Math.floor(Math.random() * (rows + 1));
        const y = row * SPACING;
        const x = speed > 0 ? -length : width + length;
        return {
          axis: 'h',
          track: y,
          pos: x,
          speed,
          length,
          theme,
          width: Math.random() > 0.6 ? 1.5 : 1.0,
          opacity: Math.random() * 0.35 + 0.55
        };
      } else {
        const col = Math.floor(Math.random() * (cols + 1));
        const x = col * SPACING;
        const y = speed > 0 ? -length : height + length;
        return {
          axis: 'v',
          track: x,
          pos: y,
          speed,
          length,
          theme,
          width: Math.random() > 0.6 ? 1.5 : 1.0,
          opacity: Math.random() * 0.35 + 0.55
        };
      }
    };

    // --- Mouse Interaction ---
    const mouse = { x: -1000, y: -1000, active: false };
    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const container = containerRef.current || canvas.parentElement;
    if (container) {
      container.addEventListener('pointermove', handlePointerMove, { passive: true });
      container.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    }

    // --- Resize Handler ---
    const handleResize = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      width = Math.max(300, Math.floor(rect.width || container.clientWidth || window.innerWidth));
      height = Math.max(300, Math.floor(rect.height || container.clientHeight || 800));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Pre-seed glowing dots and lines
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      while (glowingDots.length < MAX_GLOWING_DOTS) {
        const dot = spawnGlowingDot(cols, rows);
        if (dot) {
          dot.progress = Math.random(); // Stagger initial phases
          glowingDots.push(dot);
        }
      }

      while (lines.length < MAX_LINES) {
        const line = spawnLine(cols, rows);
        if (line) {
          // Pre-position lines randomly along their track
          line.pos = Math.random() * (line.axis === 'h' ? width : height);
          lines.push(line);
        }
      }
    };

    handleResize();

    let resizeRaf;
    const onResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(handleResize);
    };
    window.addEventListener('resize', onResize);

    // --- Main Render Loop ---
    const render = () => {
      if (!width || !height) {
        animId = requestAnimationFrame(render);
        return;
      }

      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      // 1. Clear with crisp solid white background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Base Grey Matrix of Dots
      ctx.fillStyle = BASE_DOT_COLOR;
      ctx.beginPath();
      for (let c = 0; c < cols; c++) {
        const x = c * SPACING;
        for (let r = 0; r < rows; r++) {
          const y = r * SPACING;

          // Mouse proximity slight brightening
          let rad = BASE_DOT_RADIUS;
          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 14400) { // 120px radius
              const factor = 1 - Math.sqrt(distSq) / 120;
              rad += factor * 0.9;
            }
          }

          ctx.moveTo(x + rad, y);
          ctx.arc(x, y, rad, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // 3. Draw Thin Blue Lines (Randomly moving along matrix tracks)
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        line.pos += line.speed;

        // Check if line exited canvas bounds
        const isOutOfBounds = line.speed > 0
          ? line.pos - line.length > (line.axis === 'h' ? width : height)
          : line.pos + line.length < 0;

        if (isOutOfBounds) {
          const freshLine = spawnLine(cols, rows);
          if (freshLine) {
            lines[i] = freshLine;
          }
          continue;
        }

        ctx.save();
        ctx.lineWidth = line.width;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${line.theme.rgb}, 0.8)`;

        if (line.axis === 'h') {
          const x1 = line.pos - (line.speed > 0 ? line.length : -line.length);
          const x2 = line.pos;
          const grad = ctx.createLinearGradient(x1, line.track, x2, line.track);
          grad.addColorStop(0, `rgba(${line.theme.rgb}, 0)`);
          grad.addColorStop(0.65, `rgba(${line.theme.rgb}, ${line.opacity * 0.7})`);
          grad.addColorStop(1, `rgba(${line.theme.rgb}, ${line.opacity})`);

          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(x1, line.track);
          ctx.lineTo(x2, line.track);
          ctx.stroke();
        } else {
          const y1 = line.pos - (line.speed > 0 ? line.length : -line.length);
          const y2 = line.pos;
          const grad = ctx.createLinearGradient(line.track, y1, line.track, y2);
          grad.addColorStop(0, `rgba(${line.theme.rgb}, 0)`);
          grad.addColorStop(0.65, `rgba(${line.theme.rgb}, ${line.opacity * 0.7})`);
          grad.addColorStop(1, `rgba(${line.theme.rgb}, ${line.opacity})`);

          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(line.track, y1);
          ctx.lineTo(line.track, y2);
          ctx.stroke();
        }
        ctx.restore();
      }

      // 4. Draw Randomly Glowing Dots Across Matrix
      for (let i = 0; i < glowingDots.length; i++) {
        const dot = glowingDots[i];
        dot.progress += dot.speed;

        if (dot.progress >= 1.0) {
          const fresh = spawnGlowingDot(cols, rows);
          if (fresh) {
            glowingDots[i] = fresh;
          }
          continue;
        }

        // Sinusoidal pulse: 0 -> 1 -> 0
        const pulse = Math.sin(dot.progress * Math.PI);
        const radius = BASE_DOT_RADIUS + (dot.maxRadius - BASE_DOT_RADIUS) * pulse;
        const alpha = Math.min(1, pulse * 1.15);

        ctx.save();
        ctx.shadowBlur = dot.maxGlow * pulse;
        ctx.shadowColor = `rgba(${dot.theme.rgb}, ${0.9 * pulse})`;
        ctx.fillStyle = `rgba(${dot.theme.rgb}, ${alpha})`;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // High-intensity white center spark at peak pulse
        if (pulse > 0.6) {
          const sparkAlpha = (pulse - 0.6) / 0.4;
          ctx.fillStyle = `rgba(255, 255, 255, ${sparkAlpha * 0.95})`;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, radius * 0.55, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      window.removeEventListener('resize', onResize);
      if (container) {
        container.removeEventListener('pointermove', handlePointerMove);
        container.removeEventListener('pointerleave', handlePointerLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        backgroundColor: '#FFFFFF',
        ...style
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
}
