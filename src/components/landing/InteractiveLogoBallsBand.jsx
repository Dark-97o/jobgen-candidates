import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, RotateCcw, Hand } from 'lucide-react';

const COMPANIES = [
  { name: 'Atlassian', src: '/logos/atlassian.webp', brandColor: '#0052CC', role: 'Staff Software Engineer' },
  { name: 'Canva', src: '/logos/canva.webp', brandColor: '#00C4CC', role: 'Senior Product Designer' },
  { name: 'ANZ Bank', src: '/logos/anz.webp', brandColor: '#004165', role: 'Lead Data Analyst' },
  { name: 'Afterpay', src: '/logos/afterpay.webp', brandColor: '#00B887', role: 'Full Stack Engineer' },
  { name: 'Deloitte', src: '/logos/deloitte.webp', brandColor: '#86BC25', role: 'Management Consultant' },
  { name: 'Microsoft', src: '/logos/microsoft.webp', brandColor: '#00A4EF', role: 'Senior Cloud Architect' },
  { name: 'Amazon', src: '/logos/amazon.webp', brandColor: '#FF9900', role: 'Operations & Engineering Lead' },
  { name: 'Visa', src: '/logos/visa.webp', brandColor: '#1A1F71', role: 'FinTech Solutions Director' }
];

export default function InteractiveLogoBallsBand() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const dropTriggerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animId;
    let isDestroyed = false;

    // Dimensions
    let width = container.clientWidth || 1200;
    const height = 310; // Band height in pixels

    // Three.js Scene, Camera & Renderer
    const scene = new THREE.Scene();

    // Perspective Camera calibrated so 1 world unit = 1 pixel at z = 0
    const fov = 45;
    const fovRad = (fov * Math.PI) / 180;
    let cameraZ = height / (2 * Math.tan(fovRad / 2));
    const camera = new THREE.PerspectiveCamera(fov, width / height, 10, cameraZ + 600);
    camera.position.set(0, 0, cameraZ);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    // Lighting setup for glossy 3D spheres
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(-width * 0.35, height * 0.9, cameraZ * 0.7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.1);
    fillLight.position.set(width * 0.4, -height * 0.4, cameraZ * 0.5);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x38bdf8, 2.8, cameraZ * 1.6);
    rimLight.position.set(0, height * 0.7, cameraZ * 0.3);
    scene.add(rimLight);

    // Ball radius
    const ballRadius = Math.max(34, Math.min(42, Math.floor(width / 32)));
    const sphereGeo = new THREE.SphereGeometry(ballRadius, 48, 48);

    // Contact shadow geometry
    const shadowGeo = new THREE.PlaneGeometry(ballRadius * 2.2, ballRadius * 0.8);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 64;
    const sCtx = shadowCanvas.getContext('2d');
    const sGrad = sCtx.createRadialGradient(64, 32, 0, 64, 32, 32);
    sGrad.addColorStop(0, 'rgba(15, 23, 42, 0.45)');
    sGrad.addColorStop(0.5, 'rgba(15, 23, 42, 0.18)');
    sGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 128, 64);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);

    // Helper: Create high-res 1024x512 canvas texture with company logo on both sides
    const createBallTexture = (company) => {
      const texCanvas = document.createElement('canvas');
      texCanvas.width = 1024;
      texCanvas.height = 512;
      const ctx = texCanvas.getContext('2d');

      // Pristine porcelain white surface
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 1024, 512);

      // Subtle gradient shading around poles and equator
      const grad = ctx.createLinearGradient(0, 0, 0, 512);
      grad.addColorStop(0, 'rgba(241, 245, 249, 0.5)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(1, 'rgba(226, 232, 240, 0.6)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 512);

      // Brand accent equator ribbon
      ctx.strokeStyle = company.brandColor || '#E2E8F0';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(0, 508);
      ctx.lineTo(1024, 508);
      ctx.stroke();

      const texture = new THREE.CanvasTexture(texCanvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;

      const img = new Image();
      img.src = company.src;
      img.onload = () => {
        const renderFace = (cx) => {
          // Circular brand badge underlay with soft shadow
          ctx.save();
          ctx.beginPath();
          ctx.arc(cx, 256, 172, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = 'rgba(15, 23, 42, 0.15)';
          ctx.shadowBlur = 24;
          ctx.shadowOffsetY = 8;
          ctx.fill();

          ctx.strokeStyle = '#F1F5F9';
          ctx.lineWidth = 4;
          ctx.stroke();
          ctx.restore();

          // Logo image fit
          const maxLogoW = 200;
          const maxLogoH = 95;
          const aspect = img.width / img.height;
          let drawW = maxLogoW;
          let drawH = drawW / aspect;
          if (drawH > maxLogoH) {
            drawH = maxLogoH;
            drawW = drawH * aspect;
          }

          ctx.drawImage(img, cx - drawW / 2, 235 - drawH / 2, drawW, drawH);

          // Company label below
          ctx.font = 'bold 36px "Plus Jakarta Sans", system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = '#090D16';
          ctx.fillText(company.name, cx, 326);

          // Subtitle
          ctx.font = '600 22px system-ui, sans-serif';
          ctx.fillStyle = '#64748B';
          ctx.fillText('Landed Role', cx, 360);
        };

        // Front face (u = 0.25 -> x = 256)
        renderFace(256);
        // Back face (u = 0.75 -> x = 768)
        renderFace(768);

        texture.needsUpdate = true;
      };

      return texture;
    };

    // Physics Ball Objects
    const balls = [];

    // Falling entrance initializer
    const resetBalls = () => {
      const count = COMPANIES.length;
      const usableWidth = width - ballRadius * 4;
      const stepX = count > 1 ? usableWidth / (count - 1) : 0;
      const startX = -usableWidth / 2;

      balls.forEach((ball, i) => {
        const spawnX = startX + stepX * i + (Math.random() - 0.5) * 25;
        // Staggered heights above top boundary to cascade naturally
        const spawnY = height / 2 + ballRadius + 40 + i * 55 + Math.random() * 30;

        ball.x = Math.max(-width / 2 + ballRadius, Math.min(width / 2 - ballRadius, spawnX));
        ball.y = spawnY;
        ball.vx = (Math.random() - 0.5) * 50;
        ball.vy = -Math.random() * 80 - 60; // Initial downward drop speed

        ball.rotX = (Math.random() - 0.5) * 1.5;
        ball.rotY = (Math.random() - 0.5) * 2.5;
        ball.rotZ = (Math.random() - 0.5) * 1.5;

        ball.mesh.position.set(ball.x, ball.y, 0);
        ball.mesh.rotation.set(0, 0, 0);

        if (ball.shadowMesh) {
          ball.shadowMesh.position.set(ball.x, -height / 2 + 2, -1);
          ball.shadowMesh.scale.set(0.2, 0.2, 1);
          ball.shadowMat.opacity = 0;
        }
      });
    };

    COMPANIES.forEach((company) => {
      const texture = createBallTexture(company);

      const mat = new THREE.MeshPhysicalMaterial({
        map: texture,
        roughness: 0.16,
        metalness: 0.08,
        clearcoat: 0.75,
        clearcoatRoughness: 0.12,
        reflectivity: 0.9,
        ior: 1.48
      });

      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.userData = { company };
      scene.add(mesh);

      // Soft contact shadow plane on floor
      const shadowMat = new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        opacity: 0.5,
        depthWrite: false
      });
      const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
      shadowMesh.position.set(0, -height / 2 + 2, -2);
      scene.add(shadowMesh);

      balls.push({
        mesh,
        shadowMesh,
        shadowMat,
        company,
        radius: ballRadius,
        x: 0,
        y: height + 300,
        vx: 0,
        vy: 0,
        rotX: 0,
        rotY: 0,
        rotZ: 0
      });
    });

    dropTriggerRef.current = resetBalls;
    resetBalls();

    // Interaction & Raycasting State
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2(-999, -999);
    let draggedBall = null;
    let dragOffset = { x: 0, y: 0 };
    let lastPointerPos = { x: 0, y: 0, time: 0 };
    let pointerVelocity = { x: 0, y: 0 };

    const getCanvasCoords = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      // Convert to 3D world space (centered at 0, 0)
      const worldX = x - width / 2;
      const worldY = height / 2 - y;
      return { x, y, worldX, worldY, clientX, clientY };
    };

    const updateMouseNDC = (x, y) => {
      mouseNDC.x = (x / width) * 2 - 1;
      mouseNDC.y = -(y / height) * 2 + 1;
    };

    const onPointerDown = (e) => {
      const coords = getCanvasCoords(e);
      updateMouseNDC(coords.x, coords.y);
      raycaster.setFromCamera(mouseNDC, camera);

      const intersects = raycaster.intersectObjects(balls.map(b => b.mesh));
      if (intersects.length > 0) {
        if (e.cancelable) e.preventDefault();
        const hitMesh = intersects[0].object;
        const ball = balls.find(b => b.mesh === hitMesh);
        if (ball) {
          draggedBall = ball;
          dragOffset.x = ball.x - coords.worldX;
          dragOffset.y = ball.y - coords.worldY;
          lastPointerPos = { x: coords.worldX, y: coords.worldY, time: performance.now() };
          pointerVelocity = { x: 0, y: 0 };
          canvas.style.cursor = 'grabbing';
          setHasInteracted(true);
          setActiveTooltip({
            name: ball.company.name,
            role: ball.company.role,
            brandColor: ball.company.brandColor,
            screenX: coords.clientX,
            screenY: coords.clientY
          });
        }
      }
    };

    const onPointerMove = (e) => {
      const coords = getCanvasCoords(e);
      updateMouseNDC(coords.x, coords.y);

      if (draggedBall) {
        if (e.cancelable) e.preventDefault();
        const now = performance.now();
        const dt = Math.max(0.005, (now - lastPointerPos.time) * 0.001);

        const targetX = coords.worldX + dragOffset.x;
        const targetY = coords.worldY + dragOffset.y;

        pointerVelocity.x = (targetX - lastPointerPos.x) / dt;
        pointerVelocity.y = (targetY - lastPointerPos.y) / dt;

        draggedBall.x = targetX;
        draggedBall.y = targetY;

        // Clamp inside band bounds while dragging
        draggedBall.x = Math.max(-width / 2 + ballRadius, Math.min(width / 2 - ballRadius, draggedBall.x));
        draggedBall.y = Math.max(-height / 2 + ballRadius, Math.min(height / 2 - ballRadius, draggedBall.y));

        // Spin ball while dragging
        draggedBall.rotY += pointerVelocity.x * 0.0003;
        draggedBall.rotX -= pointerVelocity.y * 0.0003;

        lastPointerPos = { x: targetX, y: targetY, time: now };

        setActiveTooltip({
          name: draggedBall.company.name,
          role: draggedBall.company.role,
          brandColor: draggedBall.company.brandColor,
          screenX: coords.clientX,
          screenY: coords.clientY
        });
      } else {
        raycaster.setFromCamera(mouseNDC, camera);
        const intersects = raycaster.intersectObjects(balls.map(b => b.mesh));
        if (intersects.length > 0) {
          canvas.style.cursor = 'grab';
          const ball = balls.find(b => b.mesh === intersects[0].object);
          if (ball) {
            setActiveTooltip({
              name: ball.company.name,
              role: ball.company.role,
              brandColor: ball.company.brandColor,
              screenX: coords.clientX,
              screenY: coords.clientY
            });
          }
        } else {
          canvas.style.cursor = 'default';
          setActiveTooltip(null);
        }
      }
    };

    const onPointerUp = () => {
      if (draggedBall) {
        // Release with throw momentum
        draggedBall.vx = Math.max(-850, Math.min(850, pointerVelocity.x * 0.85));
        draggedBall.vy = Math.max(-850, Math.min(850, pointerVelocity.y * 0.85));
        draggedBall = null;
        canvas.style.cursor = 'default';
        setActiveTooltip(null);
      }
    };

    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onPointerDown, { passive: false });
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);

    // Resize Observer for dynamic responsive resizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = Math.floor(entry.contentRect.width);
        if (newWidth > 100 && newWidth !== width) {
          width = newWidth;
          camera.aspect = width / height;
          cameraZ = height / (2 * Math.tan(fovRad / 2));
          camera.position.z = cameraZ;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      }
    });

    resizeObserver.observe(container);

    // Physics Loop Parameters
    const gravity = 1250; // px / s^2
    const restitution = 0.68; // Bounciness
    const friction = 0.985; // Ground damping

    let lastTime = performance.now();

    const animate = () => {
      if (isDestroyed) return;

      const currentTime = performance.now();
      const elapsed = Math.min(0.04, (currentTime - lastTime) * 0.001);
      lastTime = currentTime;

      // Sub-step physics 3 times per frame
      const subSteps = 3;
      const dt = elapsed / subSteps;

      for (let s = 0; s < subSteps; s++) {
        // 1. Update ball positions & boundary collisions
        balls.forEach((ball) => {
          if (ball === draggedBall) {
            ball.mesh.position.set(ball.x, ball.y, 0);
            if (ball.shadowMesh) {
              const floorDist = Math.max(0, ball.y - (-height / 2 + ball.radius));
              const shadowScale = Math.max(0.3, 1.0 - floorDist / 200);
              ball.shadowMesh.position.set(ball.x, -height / 2 + 2, -1);
              ball.shadowMesh.scale.set(shadowScale, shadowScale, 1);
              ball.shadowMat.opacity = Math.max(0.05, 0.45 * shadowScale);
            }
            return;
          }

          // Gravity
          ball.vy -= gravity * dt;

          // Drag / friction
          ball.vx *= (1 - 0.006);
          ball.vy *= (1 - 0.003);

          ball.x += ball.vx * dt;
          ball.y += ball.vy * dt;

          // Floor collision (Bottom)
          const floorY = -height / 2 + ball.radius;
          if (ball.y <= floorY) {
            ball.y = floorY;
            ball.vy = -ball.vy * restitution;
            if (Math.abs(ball.vy) < 25) ball.vy = 0;

            // Rolling friction & rotation impulse from horizontal motion
            ball.vx *= friction;
            ball.rotZ -= (ball.vx / ball.radius) * dt * 1.5;
          }

          // Left Wall collision
          const minX = -width / 2 + ball.radius;
          if (ball.x <= minX) {
            ball.x = minX;
            ball.vx = -ball.vx * restitution;
            ball.rotY += ball.vy * 0.002;
          }

          // Right Wall collision
          const maxX = width / 2 - ball.radius;
          if (ball.x >= maxX) {
            ball.x = maxX;
            ball.vx = -ball.vx * restitution;
            ball.rotY -= ball.vy * 0.002;
          }

          // Ceiling collision (Top) - ONLY apply when inside band moving upward
          const ceilY = height / 2 - ball.radius;
          if (ball.y >= ceilY && ball.vy > 0 && ball.y < height / 2 + ball.radius) {
            ball.y = ceilY;
            ball.vy = -ball.vy * restitution;
          }

          // Apply rotation
          ball.mesh.rotation.x += ball.rotX * dt;
          ball.mesh.rotation.y += ball.rotY * dt;
          ball.mesh.rotation.z += ball.rotZ * dt;

          // Gentle rotation decay
          ball.rotX *= 0.996;
          ball.rotY *= 0.996;

          ball.mesh.position.set(ball.x, ball.y, 0);

          // Update floor contact shadow
          if (ball.shadowMesh) {
            const floorDist = Math.max(0, ball.y - floorY);
            const shadowScale = Math.max(0.2, 1.0 - floorDist / 220);
            ball.shadowMesh.position.set(ball.x, -height / 2 + 2, -1);
            ball.shadowMesh.scale.set(shadowScale, shadowScale, 1);
            ball.shadowMat.opacity = Math.max(0.04, 0.45 * (1.0 - Math.min(1, floorDist / 180)));
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

              // Positional separation
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
                  b1.rotY += (Math.random() - 0.5) * 1.5;
                }
                if (b2 !== draggedBall) {
                  b2.vx += impulse * nx;
                  b2.vy += impulse * ny;
                  b2.rotY += (Math.random() - 0.5) * 1.5;
                }
              }
            }
          }
        }
      }

      renderer.render(scene, camera);
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
      renderer.dispose();
    };
  }, []);

  return (
    <section 
      style={{ 
        position: 'relative',
        padding: '54px 0 44px 0', 
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
        backgroundColor: '#F8FAFC',
        overflow: 'hidden'
      }}
    >
      <div 
        ref={containerRef}
        style={{ 
          maxWidth: '1240px', 
          margin: '0 auto', 
          padding: '0 24px', 
          position: 'relative'
        }}
      >
        {/* Left-Aligned Header strictly adhering to user prompt */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '22px',
            textAlign: 'left'
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(37, 99, 235, 0.08)',
                border: '1px solid rgba(37, 99, 235, 0.18)',
                color: '#2563EB',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '10px'
              }}
            >
              <Sparkles size={12} /> Verified Placements
            </div>

            <h2 
              style={{ 
                fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: 'clamp(22px, 2.6vw, 32px)', 
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
            <p 
              style={{ 
                margin: '6px 0 0 0', 
                fontSize: '14px', 
                color: '#64748B', 
                fontWeight: 500,
                textAlign: 'left'
              }}
            >
              Interactive physics band — grab, roll, and toss real candidate placement spheres.
            </p>
          </div>

          {/* Interactive Actions / Re-drop Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => {
                if (dropTriggerRef.current) dropTriggerRef.current();
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#334155',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F1F5F9';
                e.currentTarget.style.borderColor = '#94A3B8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = '#CBD5E1';
              }}
            >
              <RotateCcw size={13} /> Drop Balls Again
            </button>

            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px dashed #CBD5E1',
                color: '#64748B',
                fontSize: '12px',
                fontWeight: 500
              }}
            >
              <Hand size={13} /> Click & drag to toss
            </div>
          </div>
        </div>

        {/* 3D Falling Balls Physics Band */}
        <div 
          style={{ 
            position: 'relative', 
            width: '100%', 
            height: '310px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            boxShadow: 'inset 0 2px 8px rgba(15, 23, 42, 0.03), 0 4px 20px -2px rgba(15, 23, 42, 0.04)',
            overflow: 'hidden',
            touchAction: 'none'
          }}
        >
          {/* Subtle Grid / Floor Ambient in Band */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(148, 163, 184, 0.18) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              pointerEvents: 'none',
              opacity: 0.7
            }}
          />

          {/* Three.js Canvas */}
          <canvas 
            ref={canvasRef}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              position: 'relative',
              zIndex: 2
            }}
          />

          {/* Floating hint on first view */}
          {!hasInteracted && (
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                right: '18px',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(8px)',
                color: '#FFFFFF',
                padding: '6px 12px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 600,
                pointerEvents: 'none',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#38BDF8' }} />
              Try grabbing & tossing the spheres
            </div>
          )}
        </div>
      </div>

      {/* Floating Hover/Drag Tooltip */}
      {activeTooltip && (
        <div 
          style={{
            position: 'fixed',
            left: `${activeTooltip.screenX}px`,
            top: `${activeTooltip.screenY - 70}px`,
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            zIndex: 9999,
            backgroundColor: '#090D16',
            color: '#FFFFFF',
            padding: '6px 12px',
            borderRadius: '8px',
            boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            transition: 'top 0.05s ease, left 0.05s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span 
              style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                backgroundColor: activeTooltip.brandColor || '#38BDF8' 
              }} 
            />
            <span style={{ fontSize: '13px', fontWeight: 800 }}>{activeTooltip.name}</span>
          </div>
          <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500 }}>
            {activeTooltip.role}
          </span>
        </div>
      )}
    </section>
  );
}
