import React, { useEffect, useRef } from 'react';

const COMPANIES = [
  { name: 'Atlassian', src: '/logos/atlassian.webp', brandColor: '#0052CC' },
  { name: 'Canva', src: '/logos/canva.webp', brandColor: '#00C4CC' },
  { name: 'ANZ Bank', src: '/logos/anz.webp', brandColor: '#004165' },
  { name: 'Afterpay', src: '/logos/afterpay.webp', brandColor: '#00B887' },
  { name: 'Deloitte', src: '/logos/deloitte.webp', brandColor: '#86BC25' },
  { name: 'Microsoft', src: '/logos/microsoft.webp', brandColor: '#00A4EF' },
  { name: 'Amazon', src: '/logos/amazon.webp', brandColor: '#FF9900' },
  { name: 'Visa', src: '/logos/visa.webp', brandColor: '#1A1F71' }
];

export default function InteractiveLogoBallsBand() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let isDestroyed = false;

    // Load logo images
    const loadedImages = {};
    COMPANIES.forEach((comp) => {
      const img = new Image();
      img.src = comp.src;
      img.onload = () => {
        loadedImages[comp.name] = img;
      };
    });

    let width = canvas.clientWidth || 560;
    let height = canvas.clientHeight || 170;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    // 2D Physics Ball Setup (proportional to compact band height)
    const radius = Math.max(25, Math.min(29, Math.floor(width / 18)));
    const balls = COMPANIES.map((comp, idx) => {
      const colStep = (width - radius * 4) / Math.max(1, COMPANIES.length - 1);
      const startX = radius * 2;
      return {
        company: comp,
        radius,
        x: startX + colStep * idx + (Math.random() - 0.5) * 12,
        // Spawn staggered above top edge so they fall smoothly into the band
        y: -radius - 20 - idx * 35 - Math.random() * 20,
        vx: (Math.random() - 0.5) * 35,
        vy: 35 + Math.random() * 50,
        isDragging: false
      };
    });

    // Pointer Interaction State
    let draggedBall = null;
    let dragOffset = { x: 0, y: 0 };
    let lastPointer = { x: 0, y: 0, time: 0 };
    let pointerVelocity = { x: 0, y: 0 };

    const getPointerPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const onPointerDown = (e) => {
      const pos = getPointerPos(e);
      // Find top-most ball clicked
      for (let i = balls.length - 1; i >= 0; i--) {
        const ball = balls[i];
        const dist = Math.hypot(pos.x - ball.x, pos.y - ball.y);
        if (dist <= ball.radius + 4) {
          if (e.cancelable) e.preventDefault();
          draggedBall = ball;
          dragOffset.x = ball.x - pos.x;
          dragOffset.y = ball.y - pos.y;
          lastPointer = { x: pos.x, y: pos.y, time: performance.now() };
          pointerVelocity = { x: 0, y: 0 };
          canvas.style.cursor = 'grabbing';
          // Move grabbed ball to top of stack
          balls.splice(i, 1);
          balls.push(ball);
          break;
        }
      }
    };

    const onPointerMove = (e) => {
      const pos = getPointerPos(e);

      if (draggedBall) {
        if (e.cancelable) e.preventDefault();
        const now = performance.now();
        const dt = Math.max(0.005, (now - lastPointer.time) * 0.001);

        const targetX = pos.x + dragOffset.x;
        const targetY = pos.y + dragOffset.y;

        pointerVelocity.x = (targetX - lastPointer.x) / dt;
        pointerVelocity.y = (targetY - lastPointer.y) / dt;

        draggedBall.x = Math.max(draggedBall.radius, Math.min(width - draggedBall.radius, targetX));
        draggedBall.y = Math.max(draggedBall.radius, Math.min(height - draggedBall.radius, targetY));

        draggedBall.vx = 0;
        draggedBall.vy = 0;

        lastPointer = { x: targetX, y: targetY, time: now };
      } else {
        // Check hover
        let hovering = false;
        for (let i = 0; i < balls.length; i++) {
          const ball = balls[i];
          if (Math.hypot(pos.x - ball.x, pos.y - ball.y) <= ball.radius + 2) {
            hovering = true;
            break;
          }
        }
        canvas.style.cursor = hovering ? 'grab' : 'default';
      }
    };

    const onPointerUp = () => {
      if (draggedBall) {
        // Impart fling momentum
        draggedBall.vx = Math.max(-800, Math.min(800, pointerVelocity.x * 0.85));
        draggedBall.vy = Math.max(-800, Math.min(800, pointerVelocity.y * 0.85));
        draggedBall = null;
        canvas.style.cursor = 'default';
      }
    };

    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onPointerDown, { passive: false });
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(container);

    // Physics constants
    const gravity = 1100; // px/s^2
    const restitution = 0.62; // Bounciness
    const friction = 0.985; // Ground friction

    let lastTime = performance.now();

    const animate = () => {
      if (isDestroyed) return;

      const currentTime = performance.now();
      const elapsed = Math.min(0.04, (currentTime - lastTime) * 0.001);
      lastTime = currentTime;

      const subSteps = 3;
      const dt = elapsed / subSteps;

      for (let s = 0; s < subSteps; s++) {
        // 1. Move balls and handle boundary collisions
        balls.forEach((ball) => {
          if (ball === draggedBall) return;

          // Apply Gravity
          ball.vy += gravity * dt;

          // Air drag
          ball.vx *= (1 - 0.008);
          ball.vy *= (1 - 0.004);

          ball.x += ball.vx * dt;
          ball.y += ball.vy * dt;

          // Bottom Floor
          if (ball.y >= height - ball.radius) {
            ball.y = height - ball.radius;
            ball.vy = -ball.vy * restitution;
            if (Math.abs(ball.vy) < 22) ball.vy = 0;
            ball.vx *= friction;
          }

          // Left Wall
          if (ball.x <= ball.radius) {
            ball.x = ball.radius;
            ball.vx = -ball.vx * restitution;
          }

          // Right Wall
          if (ball.x >= width - ball.radius) {
            ball.x = width - ball.radius;
            ball.vx = -ball.vx * restitution;
          }

          // Top Ceiling (only if ball is moving upwards and inside the canvas)
          if (ball.y <= ball.radius && ball.vy < 0 && ball.y > -ball.radius) {
            ball.y = ball.radius;
            ball.vy = -ball.vy * restitution;
          }
        });

        // 2. Ball-to-Ball Elastic Collisions
        for (let i = 0; i < balls.length; i++) {
          for (let j = i + 1; j < balls.length; j++) {
            const b1 = balls[i];
            const b2 = balls[j];

            const dx = b2.x - b1.x;
            const dy = b2.y - b1.y;
            const dist = Math.hypot(dx, dy);
            const minDist = b1.radius + b2.radius;

            if (dist < minDist && dist > 0.001) {
              const nx = dx / dist;
              const ny = dy / dist;
              const overlap = minDist - dist;

              if (b1 === draggedBall) {
                b2.x += nx * overlap;
                b2.y += ny * overlap;
              } else if (b2 === draggedBall) {
                b1.x -= nx * overlap;
                b1.y -= ny * overlap;
              } else {
                b1.x -= nx * overlap * 0.5;
                b1.y -= ny * overlap * 0.5;
                b2.x += nx * overlap * 0.5;
                b2.y += ny * overlap * 0.5;
              }

              // Elastic momentum exchange
              const kx = b1.vx - b2.vx;
              const ky = b1.vy - b2.vy;
              const p = 2 * (nx * kx + ny * ky) / 2;

              if (nx * kx + ny * ky > 0) {
                const impulse = p * restitution;
                if (b1 !== draggedBall) {
                  b1.vx -= impulse * nx;
                  b1.vy -= impulse * ny;
                }
                if (b2 !== draggedBall) {
                  b2.vx += impulse * nx;
                  b2.vy += impulse * ny;
                }
              }
            }
          }
        }
      }

      // Render 2D Frame (Transparent background - no box)
      ctx.clearRect(0, 0, width, height);

      // Draw all balls
      balls.forEach((ball) => {
        if (ball.y < -ball.radius * 2) return;

        ctx.save();

        // 1. Soft Ambient Drop Shadow
        ctx.shadowColor = 'rgba(15, 23, 42, 0.12)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;

        // 2. 2D Ball Body (Crisp porcelain white)
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        const ballGrad = ctx.createRadialGradient(
          ball.x - ball.radius * 0.35,
          ball.y - ball.radius * 0.35,
          ball.radius * 0.1,
          ball.x,
          ball.y,
          ball.radius
        );
        ballGrad.addColorStop(0, '#FFFFFF');
        ballGrad.addColorStop(0.75, '#FFFFFF');
        ballGrad.addColorStop(1, '#F1F5F9');
        ctx.fillStyle = ballGrad;
        ctx.fill();

        // 3. Subtle Clean Outline Border
        ctx.shadowColor = 'transparent';
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#CBD5E1';
        ctx.stroke();

        // Subtle brand-colored hairline inner rim
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius - 2, 0, Math.PI * 2);
        ctx.lineWidth = 1;
        ctx.strokeStyle = ball.company.brandColor ? `${ball.company.brandColor}30` : 'rgba(226, 232, 240, 0.4)';
        ctx.stroke();

        // 4. STILL COMPANY LOGO ON TOP OF BALL (ALWAYS UPRIGHT, NEVER ROTATING)
        const img = loadedImages[ball.company.name];
        if (img && img.complete && img.naturalWidth > 0) {
          const maxLogoW = ball.radius * 1.25;
          const maxLogoH = ball.radius * 0.68;
          const aspect = img.naturalWidth / img.naturalHeight;
          let drawW = maxLogoW;
          let drawH = drawW / aspect;
          if (drawH > maxLogoH) {
            drawH = maxLogoH;
            drawW = drawH * aspect;
          }

          // Drawn strictly upright and centered on top of the ball
          ctx.drawImage(
            img,
            ball.x - drawW / 2,
            ball.y - drawH / 2,
            drawW,
            drawH
          );
        } else {
          ctx.font = 'bold 10px "Plus Jakarta Sans", system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#090D16';
          ctx.fillText(ball.company.name, ball.x, ball.y);
        }

        // 5. Subtle Top Gloss Highlight Arc
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius - 2.5, -Math.PI * 0.8, -Math.PI * 0.2);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.stroke();

        ctx.restore();
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      canvas.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
    };
  }, []);

  return (
    <section 
      style={{ 
        position: 'relative',
        padding: '24px 0', 
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
        backgroundColor: '#F8FAFC',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{ 
          maxWidth: '1240px', 
          margin: '0 auto', 
          padding: '0 24px'
        }}
      >
        {/* Half Text and Half Balls - Seamless, No Enclosing Box */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '32px'
          }}
        >
          {/* Half Text (Left-Aligned, Compact Height) */}
          <div style={{ textAlign: 'left', maxWidth: '520px' }}>
            <h2 
              style={{ 
                fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: 'clamp(20px, 2.4vw, 30px)', 
                fontWeight: 800, 
                letterSpacing: '-0.03em', 
                color: '#090D16', 
                margin: 0,
                textAlign: 'left',
                lineHeight: 1.2
              }}
            >
              JobGen candidates have landed dream roles at industry giants
            </h2>
          </div>

          {/* Half Balls (Borderless, Transparent Physics Band) */}
          <div 
            ref={containerRef}
            style={{ 
              position: 'relative', 
              width: '100%', 
              height: '160px',
              overflow: 'hidden',
              touchAction: 'none'
            }}
          >
            {/* 2D Physics Canvas on Natural Section Background */}
            <canvas 
              ref={canvasRef}
              style={{
                width: '100%',
                height: '100%',
                display: 'block'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
