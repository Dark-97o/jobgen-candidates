import React, { useEffect, useRef } from 'react';

/**
 * GlowingGridBackground
 * 
 * An animated square grid with smooth glowing laser lines that glide along
 * horizontal and vertical grid paths without dots or pulsing effects.
 */
export default function GlowingGridBackground({
  gridSize = 40,
  opacity = 1,
  backgroundColor = 'transparent',
  showAtmosphere = true,
  style = {}
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Palette of glowing beam colors
    const BEAM_COLORS = [
      { glow: '#2563EB', rgb: '37, 99, 235' }, // Electric Blue
      { glow: '#06B6D4', rgb: '6, 182, 212' }, // Neon Cyan
      { glow: '#3B82F6', rgb: '59, 130, 246' }, // Sky Blue
      { glow: '#6366F1', rgb: '99, 102, 241' }, // Indigo
    ];

    // Energy beams traveling along grid lines
    const maxBeams = 8;
    const beams = [];

    const spawnBeam = (forceAxis) => {
      if (!width || !height) return null;
      const isHorizontal = forceAxis !== undefined ? forceAxis === 'h' : Math.random() > 0.45;
      const theme = BEAM_COLORS[Math.floor(Math.random() * BEAM_COLORS.length)];
      const speed = (Math.random() * 1.6 + 1.2) * (Math.random() > 0.5 ? 1 : -1);
      const length = Math.random() * 150 + 110;

      if (isHorizontal) {
        const rows = Math.floor(height / gridSize);
        const row = Math.floor(Math.random() * (rows + 1));
        const y = row * gridSize;
        const x = speed > 0 ? -length : width + length;
        return {
          axis: 'h',
          pos: y,
          coord: x,
          speed,
          length,
          theme,
          width: Math.random() > 0.6 ? 2 : 1.5,
          alpha: Math.random() * 0.3 + 0.65
        };
      } else {
        const cols = Math.floor(width / gridSize);
        const col = Math.floor(Math.random() * (cols + 1));
        const x = col * gridSize;
        const y = speed > 0 ? -length : height + length;
        return {
          axis: 'v',
          pos: x,
          coord: y,
          speed,
          length,
          theme,
          width: Math.random() > 0.6 ? 2 : 1.5,
          alpha: Math.random() * 0.3 + 0.65
        };
      }
    };

    const updateSize = () => {
      const parent = containerRef.current || canvas.parentElement;
      if (!parent) return;

      const rectWidth = parent.scrollWidth || parent.clientWidth || window.innerWidth;
      const rectHeight = parent.scrollHeight || parent.clientHeight || window.innerHeight;

      width = Math.max(rectWidth, parent.clientWidth || 800);
      height = Math.max(rectHeight, parent.clientHeight || 600);
      dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Seed initial beams across visible canvas
      if (beams.length === 0) {
        for (let i = 0; i < maxBeams; i++) {
          const b = spawnBeam(i % 2 === 0 ? 'h' : 'v');
          if (b) {
            b.coord = Math.random() * (b.axis === 'h' ? width : height);
            beams.push(b);
          }
        }
      }
    };

    updateSize();

    let ro = null;
    const parent = containerRef.current || canvas.parentElement;
    if (parent && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        updateSize();
      });
      ro.observe(parent);
    }
    window.addEventListener('resize', updateSize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Static Base Square Grid Lines
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.085)';

      // Vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
      }
      // Horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
      }
      ctx.stroke();

      // 2. Draw & Update Glowing Laser Lines along Grid Tracks
      for (let i = 0; i < beams.length; i++) {
        const b = beams[i];
        b.coord += b.speed;

        ctx.save();
        ctx.shadowColor = b.theme.glow;
        ctx.shadowBlur = 14;
        ctx.lineWidth = b.width;
        ctx.lineCap = 'round';

        let grad;
        if (b.axis === 'h') {
          const startX = b.speed > 0 ? b.coord - b.length : b.coord + b.length;
          const endX = b.coord;
          grad = ctx.createLinearGradient(startX, b.pos, endX, b.pos);
          grad.addColorStop(0, `rgba(${b.theme.rgb}, 0)`);
          grad.addColorStop(0.7, `rgba(${b.theme.rgb}, ${b.alpha * 0.45})`);
          grad.addColorStop(1, `rgba(${b.theme.rgb}, ${b.alpha})`);

          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(startX, b.pos);
          ctx.lineTo(endX, b.pos);
          ctx.stroke();
        } else {
          const startY = b.speed > 0 ? b.coord - b.length : b.coord + b.length;
          const endY = b.coord;
          grad = ctx.createLinearGradient(b.pos, startY, b.pos, endY);
          grad.addColorStop(0, `rgba(${b.theme.rgb}, 0)`);
          grad.addColorStop(0.7, `rgba(${b.theme.rgb}, ${b.alpha * 0.45})`);
          grad.addColorStop(1, `rgba(${b.theme.rgb}, ${b.alpha})`);

          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(b.pos, startY);
          ctx.lineTo(b.pos, endY);
          ctx.stroke();
        }
        ctx.restore();

        // Check if out of bounds -> respawn
        const isOut = b.axis === 'h'
          ? (b.speed > 0 && b.coord - b.length > width) || (b.speed < 0 && b.coord + b.length < 0)
          : (b.speed > 0 && b.coord - b.length > height) || (b.speed < 0 && b.coord + b.length < 0);

        if (isOut) {
          beams[i] = spawnBeam();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateSize);
      if (ro) ro.disconnect();
    };
  }, [gridSize]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
        backgroundColor,
        opacity,
        ...style
      }}
    >
      {/* Soft atmospheric gradient */}
      {showAtmosphere && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 75% 65% at 50% 45%, rgba(37, 99, 235, 0.08) 0%, rgba(6, 182, 212, 0.035) 45%, transparent 75%)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      )}

      {/* HTML5 Clean Grid & Glowing Lines Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2
        }}
      />
    </div>
  );
}
