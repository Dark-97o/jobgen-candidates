import React, { useRef, useEffect, useState } from 'react';
import { Settings, User, LogOut, X, ShieldCheck, Sparkles } from 'lucide-react';

/**
 * HeaderRightSmokeAnimation
 * 
 * Silky, volumetric ethereal smoke / mist drifting fluidly across the right side of the top bar:
 * - Soft layered smoke puffs with electric blue, cyan, and translucent white mist gradients
 * - Organic turbulence and fluid eddy curls
 * - Mouse swirl dispersion interaction
 * - Backlit ambient illumination
 * - 60fps lightweight canvas rendering
 */
function HeaderRightSmokeAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth || 550);
    let height = (canvas.height = canvas.parentElement.clientHeight || 70);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const mouse = { x: -1000, y: -1000, vx: 0, vy: 0, active: false };
    let lastMouseX = -1000;
    let lastMouseY = -1000;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      mouse.vx = currentX - lastMouseX;
      mouse.vy = currentY - lastMouseY;
      mouse.x = currentX;
      mouse.y = currentY;
      mouse.active = true;
      lastMouseX = currentX;
      lastMouseY = currentY;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    // Initialize 40 layered volumetric smoke puff particles
    const particleCount = 42;
    const particles = [];

    const createParticle = (spawnInitial = false) => {
      const x = spawnInitial 
        ? Math.random() * width
        : width + Math.random() * 20;
      const y = height * 0.2 + Math.random() * (height * 0.7);
      const radius = 24 + Math.random() * 36;
      const maxAlpha = 0.02 + Math.random() * 0.04; // Ethereal lighter smoke
      const hueType = Math.random(); // 0 = blue, 1 = cyan, 2 = white mist

      return {
        x,
        y,
        vx: -(0.35 + Math.random() * 0.55),
        vy: (Math.random() - 0.52) * 0.25,
        radius,
        growth: 0.05 + Math.random() * 0.08,
        alpha: spawnInitial ? Math.random() * maxAlpha : 0,
        maxAlpha,
        life: spawnInitial ? Math.random() * 300 : 0,
        maxLife: 260 + Math.random() * 180,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.008,
        swirlPhase: Math.random() * Math.PI * 2,
        hueType,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true));
    }

    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // 1. Soft glowing ambient mist pool extending directly to the right edge
      const ambientGlow = ctx.createRadialGradient(
        width, height * 0.5, 10,
        width, height * 0.5, 300
      );
      ambientGlow.addColorStop(0, 'rgba(56, 189, 248, 0.06)');
      ambientGlow.addColorStop(0.45, 'rgba(37, 99, 235, 0.03)');
      ambientGlow.addColorStop(1, 'rgba(37, 99, 235, 0)');
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Render and update smoke puffs with organic fluid physics
      particles.forEach((p, idx) => {
        p.life++;
        p.radius += p.growth;
        p.rotation += p.rotationSpeed;

        // Life cycle opacity curve (smooth fade-in and graceful dissipation)
        const progress = p.life / p.maxLife;
        if (progress < 0.25) {
          p.alpha = (progress / 0.25) * p.maxAlpha;
        } else {
          p.alpha = Math.max(0, (1 - progress) * p.maxAlpha);
        }

        // Fluid sinusoidal turbulence
        const turbulenceY = Math.sin(time * 0.8 + p.swirlPhase + p.x * 0.01) * 0.22;
        const turbulenceX = Math.cos(time * 0.6 + p.swirlPhase) * 0.12;

        p.x += p.vx + turbulenceX;
        p.y += p.vy + turbulenceY;

        // Interactive mouse curl & eddy dispersal
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90 && dist > 1) {
            const force = (1 - dist / 90) * 1.5;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force + (mouse.vy * 0.1);
            p.rotation += 0.02;
          }
        }

        // Render soft radial smoke puff
        if (p.alpha > 0.002) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);

          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.radius);
          if (p.hueType < 0.45) {
            // Cyan-tinted mist
            grad.addColorStop(0, `rgba(186, 230, 253, ${p.alpha * 1.2})`);
            grad.addColorStop(0.35, `rgba(56, 189, 248, ${p.alpha * 0.75})`);
            grad.addColorStop(0.7, `rgba(37, 99, 235, ${p.alpha * 0.3})`);
            grad.addColorStop(1, 'rgba(37, 99, 235, 0)');
          } else if (p.hueType < 0.8) {
            // Royal / Electric blue ethereal smoke
            grad.addColorStop(0, `rgba(224, 231, 255, ${p.alpha * 1.1})`);
            grad.addColorStop(0.35, `rgba(99, 102, 241, ${p.alpha * 0.7})`);
            grad.addColorStop(0.7, `rgba(37, 99, 235, ${p.alpha * 0.25})`);
            grad.addColorStop(1, 'rgba(37, 99, 235, 0)');
          } else {
            // Translucent white cloud smoke
            grad.addColorStop(0, `rgba(255, 255, 255, ${p.alpha * 1.3})`);
            grad.addColorStop(0.4, `rgba(241, 245, 249, ${p.alpha * 0.8})`);
            grad.addColorStop(0.75, `rgba(203, 213, 225, ${p.alpha * 0.25})`);
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          }

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Recycle particle if life expired or drifted far past left
        if (p.life >= p.maxLife || p.x < -p.radius * 2) {
          particles[idx] = createParticle(false);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 10px, black 30px)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 10px, black 30px)',
        pointerEvents: 'none',
      }}
    >
      <canvas 
        ref={canvasRef} 
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}

export default function TopHeader({ currentTab, onLogout }) {
  // Profile & Settings state shifted to top bar
  const [candidateName, setCandidateName] = useState('Jax Miller');
  const [candidateRole, setCandidateRole] = useState('Lead Product Architect');
  const [imageError, setImageError] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const popoverRef = useRef(null);

  // Close profile menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    };
    if (profileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileMenuOpen]);

  // Page name definitions
  const PAGE_NAMES = {
    overview: 'Home',
    jobs: 'Job Hunt',
    workspace: 'Workspace',
    pipeline: 'Workspace',
    emma: 'Workspace',
    resume: 'Resume',
    coverletter: 'Cover Letter',
    interview: 'Interview Prep',
    events: 'Career Events',
    careerplan: 'Career Plan',
  };

  const pageTitle = PAGE_NAMES[currentTab] || (typeof currentTab === 'string' ? currentTab.charAt(0).toUpperCase() + currentTab.slice(1) : 'Dashboard');

  return (
    <>
      {/* SVG Distortion Filter for Liquid Glass Aesthetic (User Provided Spec) */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <filter id="lg">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="4" />
          </filter>
        </defs>
      </svg>

      <header 
        style={{
          height: 'var(--header-height)',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.72)',
          backdropFilter: 'blur(30px) saturate(190%)',
          WebkitBackdropFilter: 'blur(30px) saturate(190%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px 0 32px',
          position: 'sticky',
          top: 0,
          zIndex: 30,
          overflow: 'visible',
          userSelect: 'none',
        }}
      >
        {/* Thicker Gradient Line Separator at the Bottom */}
        <div 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2.5px',
            background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.95) 0%, rgba(37, 99, 235, 0.8) 25%, rgba(6, 182, 212, 0.55) 55%, rgba(148, 163, 184, 0.25) 80%, transparent 100%)',
            boxShadow: '0 1px 6px rgba(56, 189, 248, 0.35)',
            pointerEvents: 'none',
            zIndex: 20,
          }}
        />

        {/* Left: Prominent Page Name with /back.png image behind white text */}
        <div 
          style={{ 
            position: 'relative', 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '8px 46px 9px 46px', 
            minHeight: '44px',
            minWidth: '180px',
            zIndex: 10, 
            flexShrink: 0,
            overflow: 'visible',
          }}
        >
          {/* Background Image /back.png with side bleed so feathered bristles never clip */}
          <img 
            src="/back.png" 
            alt="Page Badge" 
            style={{ 
              position: 'absolute', 
              top: '-3px',
              bottom: '-3px',
              left: '-20px',
              right: '-20px',
              width: 'calc(100% + 40px)', 
              height: 'calc(100% + 6px)', 
              objectFit: 'fill', 
              pointerEvents: 'none', 
              zIndex: 0,
              filter: 'drop-shadow(0 4px 12px rgba(26, 83, 207, 0.35))',
            }} 
          />

          <h1 
            style={{ 
              position: 'relative',
              zIndex: 1,
              fontSize: '20px', 
              fontWeight: 800, 
              letterSpacing: '-0.02em', 
              margin: 0,
              color: '#FFFFFF',
              display: 'flex', 
              alignItems: 'center',
              lineHeight: 1,
              fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.45)',
              whiteSpace: 'nowrap',
            }}
          >
            {pageTitle}
          </h1>
        </div>

        {/* Smoke Animation: Starts softly beside the page title */}
        <div 
          style={{
            position: 'absolute',
            left: '210px',
            right: 0,
            top: 0,
            bottom: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <HeaderRightSmokeAnimation />
        </div>

        {/* Right Section: Candidate Profile, Refer & Earn Pill, Separator */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 10,
            position: 'relative',
          }}
        >
          {/* Green Pill for Refer & Earn: Same height as profile pill */}
          <button
            onClick={() => alert('Refer & Earn: Invite your friends and earn career credits!')}
            style={{
              height: '40px',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 16px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: '#FFFFFF',
              border: '1px solid rgba(16, 185, 129, 0.45)',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              lineHeight: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(16, 185, 129, 0.45)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.3)';
            }}
          >
            <Sparkles size={14} color="#FFFFFF" />
            <span>Refer & Earn</span>
          </button>

          {/* Subtle Vertical Separator */}
          <div 
            style={{
              width: '1px',
              height: '22px',
              backgroundColor: 'rgba(203, 213, 225, 0.8)',
            }}
          />

          {/* Profile Pill Trigger Button: Same height 40px */}
          <div
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            style={{
              height: '40px',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0 14px 0 5px',
              borderRadius: '999px',
              backgroundColor: profileMenuOpen ? 'rgba(9, 12, 21, 0.08)' : 'rgba(255, 255, 255, 0.55)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(226, 232, 240, 0.95)',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.05)',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.08)';
            }}
            onMouseLeave={(e) => {
              if (!profileMenuOpen) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.55)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(15, 23, 42, 0.05)';
              }
            }}
          >
            {/* User Avatar */}
            {!imageError ? (
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
                alt={candidateName}
                onError={() => setImageError(true)}
                style={{ 
                  width: '30px', 
                  height: '30px', 
                  borderRadius: '50%', 
                  objectFit: 'cover',
                  flexShrink: 0,
                  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.15)',
                  border: '1.5px solid #FFFFFF'
                }}
              />
            ) : (
              <div 
                style={{ 
                  width: '30px', 
                  height: '30px', 
                  borderRadius: '50%', 
                  background: '#1A53CF', 
                  color: '#FFFFFF', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontWeight: 800, 
                  fontSize: '11px', 
                  flexShrink: 0 
                }}
              >
                AW
              </div>
            )}

            {/* Name */}
            <span 
              style={{ 
                fontSize: '13px', 
                fontWeight: 700, 
                color: '#090C15', 
                letterSpacing: '-0.01em',
                lineHeight: 1,
              }}
            >
              {candidateName}
            </span>

            {/* Pill Badge showing 'PRO' */}
            <span 
              style={{
                backgroundColor: '#1E40AF',
                color: '#FFFFFF',
                fontSize: '9.5px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '999px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                lineHeight: '1.2',
                flexShrink: 0,
                boxShadow: '0 1px 4px rgba(30, 64, 175, 0.3)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
              }}
            >
              Pro
            </span>
          </div>

          {/* Floating Profile Popover Menu: Crisp White Theme */}
          {profileMenuOpen && (
            <div
              ref={popoverRef}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                top: '46px',
                right: '0',
                width: '220px',
                backgroundColor: 'rgba(255, 255, 255, 0.96)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(226, 232, 240, 0.95)',
                borderRadius: '14px',
                boxShadow: '0 20px 45px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(15, 23, 42, 0.06)',
                padding: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
                zIndex: 9999,
                animation: 'fadeIn 0.15s ease',
              }}
            >
              {/* Header info */}
              <div style={{ padding: '8px 10px', borderBottom: '1px solid rgba(241, 245, 249, 1)', marginBottom: '3px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#090C15' }}>{candidateName}</div>
                  <span 
                    style={{
                      backgroundColor: '#1E40AF',
                      color: '#FFFFFF',
                      fontSize: '9px',
                      fontWeight: 800,
                      padding: '1.5px 7px',
                      borderRadius: '999px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      lineHeight: '1.2',
                      flexShrink: 0,
                    }}
                  >
                    Pro
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', fontWeight: 500 }}>{candidateRole}</div>
              </div>

              {/* Option 1: Profile Settings */}
              <button
                onClick={() => {
                  setProfileMenuOpen(false);
                  setShowSettingsModal(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#0F172A',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(241, 245, 249, 0.9)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Settings size={15} color="#1A53CF" />
                <span>Profile Settings</span>
              </button>

              {/* Option 2: Log Out */}
              <button
                onClick={() => {
                  setProfileMenuOpen(false);
                  if (onLogout) {
                    onLogout();
                  } else {
                    alert('Logged out of JobGen.AI');
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#EF4444',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(254, 242, 242, 0.9)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <LogOut size={15} color="#EF4444" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Interactive Profile Settings Modal: White Aesthetic */}
      {showSettingsModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.55)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px'
          }}
          onClick={() => setShowSettingsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '520px',
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid rgba(226, 232, 240, 0.95)',
              boxShadow: '0 25px 60px rgba(15, 23, 42, 0.18), 0 0 30px rgba(0, 82, 255, 0.08)',
              padding: '28px',
              color: '#090C15',
              position: 'relative'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowSettingsModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#F1F5F9',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748B',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>

            {/* Modal Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div 
                style={{ 
                  width: '42px', 
                  height: '42px', 
                  borderRadius: '12px', 
                  backgroundColor: '#1A53CF', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              >
                <User size={22} color="#FFFFFF" />
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 900, margin: 0, color: '#090C15' }}>
                  Profile Settings
                </h3>
                <p style={{ fontSize: '13px', color: '#64748B', margin: '2px 0 0 0' }}>
                  Manage candidate identity, target career level, and privacy
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Full Legal Name
                </label>
                <input 
                  type="text" 
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    color: '#090C15',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Target Career Role / Title
                </label>
                <input 
                  type="text" 
                  value={candidateRole}
                  onChange={(e) => setCandidateRole(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    color: '#090C15',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Primary Email & Notification Routing
                </label>
                <input 
                  type="email" 
                  defaultValue="alexander.wright@jobgen.ai"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    color: '#090C15',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Status Note */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                <ShieldCheck size={16} color="#10B981" />
                <span style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>
                  ATS Master Sync Active • Canva & Atlassian profile verified
                </span>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={() => {
                setShowSettingsModal(false);
              }}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #1A53CF 0%, #00D2FF 100%)',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(26, 83, 207, 0.35)'
              }}
            >
              Save Profile Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
}
