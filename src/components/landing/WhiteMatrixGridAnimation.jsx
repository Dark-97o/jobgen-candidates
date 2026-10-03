import React, { useEffect, useRef } from 'react';

/**
 * WhiteMatrixGridAnimation
 * 
 * Clean white background with:
 * 1. A uniform grey matrix of subtle dots across the canvas.
 * 2. Clusters of thin static lines positioned on the right side of the section.
 * 3. High-DPR crisp rendering without battery drain or continuous animation overhead.
 * 4. Zero glowing dots.
 */
export default function WhiteMatrixGridAnimation({ style = {} }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const SPACING = 38; // Dot matrix grid spacing
    const BASE_DOT_RADIUS = 1.35;
    const BASE_DOT_COLOR = 'rgba(148, 163, 184, 0.40)'; // Clean subtle grey dot

    // Palette of refined tech electric blue and cyan tones for the right-side static line clusters
    const BLUE_PALETTE = [
      { rgb: '37, 99, 235', hex: '#2563EB' },   // Electric Royal Blue
      { rgb: '56, 189, 248', hex: '#38BDF8' },  // Vibrant Cyan / Sky
      { rgb: '2, 132, 199', hex: '#0284C7' },   // Deep Ocean Blue
      { rgb: '96, 165, 250', hex: '#60A5FA' },  // Soft Blue
      { rgb: '79, 70, 229', hex: '#4F46E5' }    // Indigo Accent
    ];

    const draw = () => {
      const container = containerRef.current || canvas.parentElement;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const width = Math.max(300, Math.floor(rect.width || container.clientWidth || window.innerWidth));
      const height = Math.max(300, Math.floor(rect.height || container.clientHeight || 800));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 1. Fill solid crisp white background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Uniform Grey Matrix of Dots
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      ctx.fillStyle = BASE_DOT_COLOR;
      ctx.beginPath();
      for (let c = 0; c < cols; c++) {
        const x = c * SPACING;
        for (let r = 0; r < rows; r++) {
          const y = r * SPACING;
          ctx.moveTo(x + BASE_DOT_RADIUS, y);
          ctx.arc(x, y, BASE_DOT_RADIUS, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // 3. Draw Clusters of Thin Static Lines on the Right Side
      // Placed strictly in the right region (from 52% to 96% of section width)
      const rightMinX = width * 0.54;
      const rightMaxX = width * 0.96;
      const availableWidth = rightMaxX - rightMinX;

      // Define static line clusters vertically distributed across the right side
      const clusters = [
        {
          yRatio: 0.12,
          lines: [
            { offset: -16, lenRatio: 0.55, startRatio: 0.25, theme: BLUE_PALETTE[0], width: 0.9, opacity: 0.55 },
            { offset: -10, lenRatio: 0.85, startRatio: 0.05, theme: BLUE_PALETTE[1], width: 1.1, opacity: 0.75 },
            { offset: -4,  lenRatio: 0.40, startRatio: 0.45, theme: BLUE_PALETTE[2], width: 0.8, opacity: 0.45 },
            { offset: 4,   lenRatio: 0.92, startRatio: 0.02, theme: BLUE_PALETTE[0], width: 1.2, opacity: 0.85 },
            { offset: 12,  lenRatio: 0.65, startRatio: 0.20, theme: BLUE_PALETTE[3], width: 0.85, opacity: 0.50 },
            { offset: 18,  lenRatio: 0.35, startRatio: 0.50, theme: BLUE_PALETTE[1], width: 1.0, opacity: 0.65 }
          ],
          ticks: [
            { xRatio: 0.88, topOffset: -22, height: 44, theme: BLUE_PALETTE[1], opacity: 0.45 },
            { xRatio: 0.45, topOffset: -12, height: 26, theme: BLUE_PALETTE[0], opacity: 0.40 }
          ]
        },
        {
          yRatio: 0.28,
          lines: [
            { offset: -20, lenRatio: 0.38, startRatio: 0.55, theme: BLUE_PALETTE[3], width: 0.8, opacity: 0.40 },
            { offset: -12, lenRatio: 0.72, startRatio: 0.18, theme: BLUE_PALETTE[0], width: 1.0, opacity: 0.65 },
            { offset: -5,  lenRatio: 0.48, startRatio: 0.35, theme: BLUE_PALETTE[1], width: 0.85, opacity: 0.55 },
            { offset: 3,   lenRatio: 0.95, startRatio: 0.00, theme: BLUE_PALETTE[1], width: 1.15, opacity: 0.80 },
            { offset: 11,  lenRatio: 0.60, startRatio: 0.28, theme: BLUE_PALETTE[2], width: 0.9, opacity: 0.60 },
            { offset: 19,  lenRatio: 0.30, startRatio: 0.62, theme: BLUE_PALETTE[0], width: 0.8, opacity: 0.45 }
          ],
          ticks: [
            { xRatio: 0.92, topOffset: -24, height: 48, theme: BLUE_PALETTE[0], opacity: 0.40 },
            { xRatio: 0.35, topOffset: -8,  height: 24, theme: BLUE_PALETTE[2], opacity: 0.35 }
          ]
        },
        {
          yRatio: 0.48,
          lines: [
            { offset: -24, lenRatio: 0.45, startRatio: 0.48, theme: BLUE_PALETTE[2], width: 0.8, opacity: 0.45 },
            { offset: -16, lenRatio: 0.80, startRatio: 0.12, theme: BLUE_PALETTE[1], width: 1.1, opacity: 0.70 },
            { offset: -8,  lenRatio: 0.98, startRatio: 0.00, theme: BLUE_PALETTE[0], width: 1.25, opacity: 0.90 },
            { offset: 0,   lenRatio: 0.50, startRatio: 0.32, theme: BLUE_PALETTE[3], width: 0.8, opacity: 0.50 },
            { offset: 8,   lenRatio: 0.88, startRatio: 0.08, theme: BLUE_PALETTE[1], width: 1.0, opacity: 0.75 },
            { offset: 16,  lenRatio: 0.62, startRatio: 0.25, theme: BLUE_PALETTE[0], width: 0.85, opacity: 0.55 },
            { offset: 24,  lenRatio: 0.32, startRatio: 0.60, theme: BLUE_PALETTE[4], width: 0.75, opacity: 0.40 }
          ],
          ticks: [
            { xRatio: 0.95, topOffset: -30, height: 60, theme: BLUE_PALETTE[1], opacity: 0.50 },
            { xRatio: 0.68, topOffset: -16, height: 32, theme: BLUE_PALETTE[0], opacity: 0.45 },
            { xRatio: 0.12, topOffset: -10, height: 20, theme: BLUE_PALETTE[2], opacity: 0.35 }
          ]
        },
        {
          yRatio: 0.68,
          lines: [
            { offset: -18, lenRatio: 0.52, startRatio: 0.38, theme: BLUE_PALETTE[0], width: 0.85, opacity: 0.50 },
            { offset: -10, lenRatio: 0.90, startRatio: 0.04, theme: BLUE_PALETTE[1], width: 1.2, opacity: 0.85 },
            { offset: -2,  lenRatio: 0.68, startRatio: 0.22, theme: BLUE_PALETTE[2], width: 0.95, opacity: 0.60 },
            { offset: 6,   lenRatio: 0.42, startRatio: 0.50, theme: BLUE_PALETTE[3], width: 0.8, opacity: 0.45 },
            { offset: 14,  lenRatio: 0.82, startRatio: 0.10, theme: BLUE_PALETTE[0], width: 1.05, opacity: 0.70 },
            { offset: 22,  lenRatio: 0.28, startRatio: 0.65, theme: BLUE_PALETTE[1], width: 0.75, opacity: 0.40 }
          ],
          ticks: [
            { xRatio: 0.90, topOffset: -22, height: 46, theme: BLUE_PALETTE[0], opacity: 0.45 },
            { xRatio: 0.40, topOffset: -14, height: 28, theme: BLUE_PALETTE[1], opacity: 0.35 }
          ]
        },
        {
          yRatio: 0.86,
          lines: [
            { offset: -14, lenRatio: 0.40, startRatio: 0.52, theme: BLUE_PALETTE[3], width: 0.8, opacity: 0.40 },
            { offset: -7,  lenRatio: 0.78, startRatio: 0.15, theme: BLUE_PALETTE[0], width: 1.0, opacity: 0.65 },
            { offset: 0,   lenRatio: 0.92, startRatio: 0.02, theme: BLUE_PALETTE[1], width: 1.15, opacity: 0.80 },
            { offset: 8,   lenRatio: 0.58, startRatio: 0.30, theme: BLUE_PALETTE[2], width: 0.85, opacity: 0.55 },
            { offset: 16,  lenRatio: 0.34, startRatio: 0.60, theme: BLUE_PALETTE[0], width: 0.75, opacity: 0.45 }
          ],
          ticks: [
            { xRatio: 0.86, topOffset: -18, height: 38, theme: BLUE_PALETTE[1], opacity: 0.40 },
            { xRatio: 0.55, topOffset: -10, height: 22, theme: BLUE_PALETTE[0], opacity: 0.35 }
          ]
        }
      ];

      // Render each cluster of thin static lines
      clusters.forEach((cluster) => {
        const centerY = height * cluster.yRatio;

        // Render horizontal thin lines in the cluster
        cluster.lines.forEach((line) => {
          const y = Math.round(centerY + line.offset) + 0.5; // Half-pixel offset for razor-sharp 1px lines
          const x1 = rightMinX + availableWidth * line.startRatio;
          const lineLength = Math.max(40, availableWidth * line.lenRatio);
          const x2 = Math.min(rightMaxX, x1 + lineLength);

          ctx.save();
          ctx.lineWidth = line.width;
          ctx.lineCap = 'round';

          // Sleek gradient fade on endpoints
          const grad = ctx.createLinearGradient(x1, y, x2, y);
          grad.addColorStop(0, `rgba(${line.theme.rgb}, 0.05)`);
          grad.addColorStop(0.2, `rgba(${line.theme.rgb}, ${line.opacity * 0.75})`);
          grad.addColorStop(0.8, `rgba(${line.theme.rgb}, ${line.opacity})`);
          grad.addColorStop(1, `rgba(${line.theme.rgb}, 0.1)`);

          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.stroke();
          ctx.restore();
        });

        // Render delicate vertical accent tick marks / brackets in the cluster
        if (cluster.ticks) {
          cluster.ticks.forEach((tick) => {
            const x = Math.round(rightMinX + availableWidth * tick.xRatio) + 0.5;
            const y1 = centerY + tick.topOffset;
            const y2 = y1 + tick.height;

            ctx.save();
            ctx.lineWidth = 0.85;
            ctx.lineCap = 'round';

            const grad = ctx.createLinearGradient(x, y1, x, y2);
            grad.addColorStop(0, `rgba(${tick.theme.rgb}, 0.0)`);
            grad.addColorStop(0.3, `rgba(${tick.theme.rgb}, ${tick.opacity})`);
            grad.addColorStop(0.7, `rgba(${tick.theme.rgb}, ${tick.opacity})`);
            grad.addColorStop(1, `rgba(${tick.theme.rgb}, 0.0)`);

            ctx.strokeStyle = grad;
            ctx.beginPath();
            ctx.moveTo(x, y1);
            ctx.lineTo(x, y2);
            ctx.stroke();
            ctx.restore();
          });
        }
      });
    };

    // Initial draw
    draw();

    // Re-draw on resize using ResizeObserver for precise container tracking
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(draw, 60);
    };

    window.addEventListener('resize', onResize);

    const container = containerRef.current || canvas.parentElement;
    let observer;
    if (typeof ResizeObserver !== 'undefined' && container) {
      observer = new ResizeObserver(() => {
        onResize();
      });
      observer.observe(container);
    }

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      if (observer) {
        observer.disconnect();
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
