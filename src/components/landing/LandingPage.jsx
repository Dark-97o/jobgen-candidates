import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowUpRight, 
  Check, 
  CheckCircle2, 
  Shield, 
  Zap, 
  FileText, 
  LayoutDashboard, 
  Video, 
  Compass, 
  Upload, 
  Search, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Bot, 
  TrendingUp, 
  Briefcase, 
  Clock, 
  Lock, 
  SlidersHorizontal,
  MapPin,
  Award,
  Terminal,
  Command,
  Cpu,
  Layers,
  ChevronRight,
  ExternalLink,
  Laptop
} from 'lucide-react';
import InteractiveFluidGradient from './InteractiveFluidGradient';
import HandwrittenSubtitle from './HandwrittenSubtitle';
import RevealingTitle from './RevealingTitle';
import AutonomousWorkspacePreview from './AutonomousWorkspacePreview';
import InteractiveLogoBallsBand from './InteractiveLogoBallsBand';
import BlueMistAnimation from './BlueMistAnimation';
import BentoVideoCard from './BentoVideoCard';
import MeetEmmaSection from './MeetEmmaSection';
import PricingEngineSection from './PricingEngineSection';

// ==========================================
// STATIC DATA & CONTENT FROM CANDIDATES.JOBGEN.AI
// ==========================================

const TRUST_LOGOS = [
  { name: 'Atlassian', src: '/logos/atlassian.webp' },
  { name: 'Canva', src: '/logos/canva.webp' },
  { name: 'ANZ Bank', src: '/logos/anz.webp' },
  { name: 'Afterpay', src: '/logos/afterpay.webp' },
  { name: 'Deloitte', src: '/logos/deloitte.webp' },
  { name: 'Microsoft', src: '/logos/microsoft.webp' },
  { name: 'Amazon', src: '/logos/amazon.webp' },
  { name: 'Visa', src: '/logos/visa.webp' }
];

const FEATURES_DATA = [
  {
    id: 'resume-builder',
    title: 'AI Resume Studio & Tailor',
    tag: 'ATS Optimization',
    navLabel: 'Resume Studio',
    subtitle: 'Zero hallucinations. Grounded in your real career evidence.',
    description: 'Create an ATS-proof master resume, connect target job descriptions, and tailor each section with precision evidence you control.',
    image: '/features/feature-resume-builder-BYG5dBEM.webp',
    stats: '94% ATS Match Rate',
    bulletPoints: [
      'Grounded in your real work history — no AI hallucinations',
      'One-click keyword alignment tailored to employer ATS algorithms',
      'Export to recruiter-preferred ATS-compliant PDF and DOCX'
    ]
  },
  {
    id: 'job-tracker',
    title: 'Autonomous Opportunity Tracker',
    tag: 'Application Pipeline',
    navLabel: 'Kanban Tracker',
    subtitle: 'Track every application, interview round, and offer in real-time.',
    description: 'Never lose track of an opportunity. Manage applications across Bookmarked, Applied, Screening, Interviewing, and Offer stages in one real-time workspace.',
    image: '/features/feature-job-tracker-z3Bsjg1I.webp',
    stats: '4.2x Faster Search',
    bulletPoints: [
      'Live status Kanban with drag-and-drop interview milestones',
      'Salary benchmarking & equity tier transparency',
      'Follow-up reminders so you never miss a recruiter deadline'
    ]
  },
  {
    id: 'interview-prep',
    title: 'Virtual Interview Prep Lab',
    tag: 'Copilot Coaching',
    navLabel: 'Interview Lab',
    subtitle: 'Walk into high-stakes loops with unfair preparation.',
    description: 'Emma generates custom role-specific questions across HR, technical, hiring manager, and executive stages with instant STAR scoring.',
    image: '/features/feature-interview-prep-lhiGrxOf.webp',
    stats: '10 Tailored Qs / Round',
    bulletPoints: [
      '10 tailored questions per round matching actual company rubrics',
      'STAR-framework model answers based on your background',
      'Strategic reverse-questions to ask the interview panel'
    ]
  },
  {
    id: 'career-pathway',
    title: '12-Week Strategic Roadmap',
    tag: 'Career Strategy',
    navLabel: 'Career Roadmap',
    subtitle: 'Structured weekly milestones, reach-outs, and negotiation scripts.',
    description: 'A personalized autonomous career roadmap guiding your weekly goals, networking reach-outs, compensation targets, and offer negotiation strategy.',
    image: '/features/feature-career-pathway-CVhyt92q.webp',
    stats: '+$24K Avg Offer Bump',
    bulletPoints: [
      'Targeted company reach-out email templates that get replies',
      'Compensation negotiation scripts that unlocked 20%+ higher offers',
      'Weekly milestones to maintain aggressive job-search momentum'
    ]
  },
  {
    id: 'chrome-extension',
    title: '1-Click Chrome Extension',
    tag: 'Instant Capture',
    navLabel: 'Chrome Extension',
    subtitle: 'Capture openings from LinkedIn, Seek, and Indeed in 1 second.',
    description: 'Save job openings instantly from LinkedIn, Seek, and Indeed directly into your JobGen candidate dashboard with auto-parsed salary and requirements.',
    image: '/features/feature-chrome-extension-yfyi6583.webp',
    stats: '1-Click Parsing',
    bulletPoints: [
      'Auto-extract company data, hiring manager details, and job descriptions',
      'Instant match score preview while browsing job boards',
      'Pre-fills complex multi-step application forms in seconds'
    ]
  }
];


// =========================================================================
// SOLID BLUE JOBGEN.IO SECTION WITH FLUID WATER SPLASH SHADER (PRE-FOOTER)
// =========================================================================
function FluidBlueHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 40);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '300px',
        height: 'clamp(280px, 36vh, 380px)',
        backgroundColor: '#1A53CF',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none'
      }}
    >
      {/* 1. INTERACTIVE FLUID GRADIENT WEBGL BACKGROUND (CODEGRID SHADER) */}
      <InteractiveFluidGradient />

      {/* 2. HEADLINE: "JobGen.IO" WITH LOGO IN FRONT & SUBTITLE "Land your next dream job" */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1240px',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
          boxSizing: 'border-box',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div 
          style={{ 
            display: 'inline-flex', 
            flexDirection: 'column', 
            alignItems: 'stretch', 
            position: 'relative'
          }}
        >
          <h2
            style={{
              fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: 'clamp(46px, 8vw, 120px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.96,
              color: '#FFFFFF',
              WebkitTextStroke: '1.2px #FFFFFF',
              margin: '0 auto',
              textShadow: '0 16px 45px rgba(0, 18, 70, 0.55), 0 0 3px #FFFFFF',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(8px, 1.25vw, 20px)',
              userSelect: 'none'
            }}
          >
            <img 
              src="/Whitelogo.webp" 
              alt="JobGen Logo" 
              style={{ 
                width: 'clamp(52px, 8.5vw, 130px)', 
                height: 'clamp(52px, 8.5vw, 130px)', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 14px 32px rgba(0, 18, 70, 0.65))',
                flexShrink: 0
              }}
              onError={(e) => {
                e.currentTarget.src = '/jobgen-logo.png';
                e.currentTarget.style.filter = 'brightness(0) invert(1)';
              }}
            />
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              <RevealingTitle text="JobGen.IO" delay={200} />
            </span>
          </h2>
          <HandwrittenSubtitle
            text="Land your next dream job"
            delay={550}
            style={{
              margin: 'clamp(-8px, -1.2vh, -2px) 0 0 0',
              alignSelf: 'flex-end'
            }}
          />
        </div>
      </div>

      {/* 3. 5X5 GRID OF SLOWLY GLOWING WHITE DOTS IN BOTTOM CORNER */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(18px, 2.8vh, 28px)',
          left: 'clamp(20px, 3.5vw, 48px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 5px)',
          gridTemplateRows: 'repeat(5, 5px)',
          gap: '8px',
          zIndex: 5,
          pointerEvents: 'none',
          opacity: mounted ? 0.75 : 0,
          transition: 'opacity 1.0s ease 0.38s',
        }}
        aria-hidden="true"
      >
        {Array.from({ length: 25 }).map((_, i) => {
          const row = Math.floor(i / 5);
          const col = i % 5;
          const delay = ((row + col) * 0.24).toFixed(2);
          return (
            <div
              key={`dot-${i}`}
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                animation: 'slowDotGlow 3.6s ease-in-out infinite',
                animationDelay: `${delay}s`,
                willChange: 'opacity, transform, box-shadow'
              }}
            />
          );
        })}
      </div>

      {/* Crisp White Line Separator before footer */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: '#FFFFFF',
          zIndex: 35,
          pointerEvents: 'none'
        }}
      />
    </section>
  );
}

export default function LandingPage({ onSignIn, onLaunchApp }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Navbar only visible after the top section is scrolled up
      const heroThreshold = Math.max(250, window.innerHeight * 0.45);
      setIsScrolled(window.scrollY > heroThreshold);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id) || 
      (id === 'features' ? document.getElementById('productivity') : null) ||
      (id === 'productivity' ? document.getElementById('features') : null);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        color: '#090C15',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        position: 'relative',
        overflowX: 'hidden'
      }}
    >
      {/* =========================================================================
          GLOBAL STYLES & LIGHT AESTHETIC CLASSES
          ========================================================================= */}
      <style>{`
        /* Luminous Light Canvas Background */
        .white-huly-canvas {
          background-color: #FFFFFF;
          background-image: 
            radial-gradient(at 0% 0%, rgba(224, 242, 254, 0.7) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(238, 242, 255, 0.8) 0px, transparent 50%),
            radial-gradient(at 50% 30%, rgba(240, 249, 255, 0.55) 0px, transparent 60%),
            radial-gradient(at 100% 100%, rgba(224, 231, 255, 0.45) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(236, 253, 245, 0.4) 0px, transparent 50%);
        }

        /* Clean 40px Grid Mesh */
        .light-grid-mesh {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(15, 23, 42, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.035) 1px, transparent 1px);
        }

        /* Headline Gradient: High-contrast Dark Slate to Royal Blue */
        .white-hero-title {
          background: linear-gradient(135deg, #090C15 25%, #1A53CF 80%, #2563EB 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Primary Action Button */
        .white-primary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 30px;
          border-radius: 9999px;
          font-size: 13.5px;
          font-weight: 800;
          color: #FFFFFF;
          background: linear-gradient(135deg, #1A53CF 0%, #2563EB 100%);
          border: none;
          box-shadow: 0 8px 24px rgba(26, 83, 207, 0.32), 0 2px 6px rgba(26, 83, 207, 0.2);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .white-primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 32px rgba(26, 83, 207, 0.42), 0 4px 10px rgba(26, 83, 207, 0.25);
          filter: brightness(1.05);
        }

        /* Secondary Action Button */
        .white-secondary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 28px;
          border-radius: 9999px;
          font-size: 13.5px;
          font-weight: 700;
          color: #090C15;
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .white-secondary-btn:hover {
          background: #F8FAFC;
          border-color: #94A3B8;
          color: #1A53CF;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);
        }

        /* Light Bento Card */
        .white-bento-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .white-bento-card:hover {
          transform: translateY(-3px);
          border-color: #BFDBFE;
          box-shadow: 0 20px 40px -10px rgba(26, 83, 207, 0.12), 0 2px 8px rgba(15, 23, 42, 0.04);
        }

        /* Marquee Scroll */
        @keyframes whiteMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-white-marquee {
          display: flex;
          width: 200%;
          animation: whiteMarquee 26s linear infinite;
        }
        .animate-white-marquee:hover {
          animation-play-state: paused;
        }

        /* Pulsing Radar Dot */
        @keyframes radarPulse {
          0%, 100% { transform: scale(1); opacity: 1; box-shadow: 0 0 6px #10B981; }
          50% { transform: scale(1.3); opacity: 0.7; box-shadow: 0 0 14px #10B981; }
        }
        .radar-live {
          animation: radarPulse 2s infinite ease-in-out;
        }

        /* Resume Scan Laser */
        @keyframes laserSweep {
          0% { top: 0%; opacity: 0.8; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0.8; }
        }
        .laser-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2.5px;
          background: linear-gradient(90deg, transparent, #1A53CF, #3B82F6, #1A53CF, transparent);
          box-shadow: 0 0 14px #1A53CF;
          animation: laserSweep 1.8s infinite ease-in-out;
        }



        .bento-img-hover {
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .productivity-card-rect, .productivity-card-square {
          border: 1.5px solid rgba(255, 255, 255, 0.9) !important;
          outline: none !important;
          box-shadow: 
            0 0 0 1px rgba(255, 255, 255, 0.9),
            0 0 22px 4px rgba(147, 197, 253, 0.65),
            0 0 45px 10px rgba(96, 165, 250, 0.45),
            0 0 75px 18px rgba(59, 130, 246, 0.28) !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .productivity-card-rect:hover, .productivity-card-square:hover {
          border-color: #FFFFFF !important;
          outline: none !important;
          transform: translateY(-4px) !important;
          box-shadow: 
            0 0 0 2px #FFFFFF,
            0 0 30px 6px rgba(147, 197, 253, 0.85),
            0 0 55px 14px rgba(96, 165, 250, 0.6),
            0 0 90px 22px rgba(59, 130, 246, 0.35) !important;
        }


        @media (max-width: 960px) {
          .productivity-grid {
            grid-template-columns: 1fr !important;
          }
          .productivity-card-rect, .productivity-card-square {
            grid-column: span 12 !important;
            height: 300px !important;
          }
        }
      `}</style>

      {/* =========================================================================
          1. FLOATING NAVBAR (ONLY VISIBLE AFTER HERO SECTION IS SCROLLED UP)
          ========================================================================= */}
      <header
        style={{
          position: 'fixed',
          top: '16px',
          left: 0,
          right: 0,
          zIndex: 1000,
          margin: '0 auto',
          maxWidth: '1220px',
          padding: '0 20px',
          boxSizing: 'border-box',
          opacity: isScrolled ? 1 : 0,
          transform: isScrolled ? 'translateY(0)' : 'translateY(-24px)',
          pointerEvents: isScrolled ? 'auto' : 'none',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div
          style={{
            borderRadius: '9999px',
            padding: '10px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.05) 45%, rgba(10, 16, 32, 0.35) 100%)',
            backgroundColor: 'rgba(15, 23, 42, 0.32)',
            backdropFilter: 'blur(30px) saturate(190%)',
            WebkitBackdropFilter: 'blur(30px) saturate(190%)',
            border: '1px solid rgba(255, 255, 255, 0.26)',
            boxShadow: `
              0 20px 48px -10px rgba(0, 0, 0, 0.3),
              0 0 0 1px rgba(255, 255, 255, 0.1),
              inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.35),
              inset 0 -1px 1px 0 rgba(0, 0, 0, 0.2)
            `
          }}
        >
          {/* Logo & Brand: Pure White Logo with text JobGen.IO */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <img 
              src="/Whitelogo.webp" 
              alt="JobGen.IO" 
              style={{ 
                width: '28px', 
                height: '28px', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 8px rgba(0, 18, 70, 0.3))'
              }}
              onError={(e) => {
                e.currentTarget.src = '/jobgen-logo.png';
                e.currentTarget.style.filter = 'brightness(0) invert(1)';
              }}
            />
            <span 
              style={{ 
                fontFamily: '"Plus Jakarta Sans", var(--font-title, sans-serif)',
                fontSize: '19px', 
                fontWeight: 900, 
                color: '#FFFFFF',
                letterSpacing: '-0.03em',
                textShadow: '0 2px 10px rgba(0, 18, 70, 0.35)'
              }}
            >
              JobGen.IO
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '26px' }} className="nav-desktop">
            {[
              { label: 'Features', id: 'features' },
              { label: 'ATS Scanner', id: 'ats-scanner' },
              { label: 'Pricing', id: 'pricing' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.85)',
                  cursor: 'pointer',
                  padding: '4px 0',
                  transition: 'all 0.15s ease',
                  textShadow: '0 1px 6px rgba(0, 18, 70, 0.25)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action: Sign In, nothing else */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={onSignIn}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.42)',
                borderRadius: '9999px',
                padding: '8px 22px',
                fontSize: '13px',
                fontWeight: 700,
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FFFFFF';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.16) 100%)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.42)';
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 100%)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. INTERACTIVE AUTONOMOUS WORKSPACE PREVIEW (NOW TOP HERO SECTION)
          ========================================================================= */}
      <AutonomousWorkspacePreview 
        onSignIn={onSignIn} 
        onLaunchApp={onLaunchApp} 
        onProductivityClick={() => scrollToSection('productivity')} 
        onPricingClick={() => scrollToSection('pricing')}
      />

      {/* =========================================================================
          3. UNMATCHED PRODUCTIVITY — LIGHT ASYMMETRIC BENTO GRID
          ========================================================================= */}
      <section 
        id="productivity"
        data-section="features"
        style={{
          padding: '110px 0 120px 0',
          position: 'relative',
          backgroundColor: '#F6FAFE',
          overflow: 'hidden'
        }}
      >
        <div id="features" style={{ position: 'absolute', top: 0, left: 0 }} />
        {/* Animated Procedural Blue Mist Background (Particle Flow + Fluid Mist Morphology) */}
        <BlueMistAnimation />

        {/* Section Content */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          
          {/* Section Header */}
          <div style={{ maxWidth: '720px', marginBottom: '52px' }}>
            <h2 
              style={{
                fontSize: 'clamp(34px, 4.8vw, 56px)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                color: '#090C15',
                marginBottom: '16px'
              }}
            >
              Unmatched Productivity
            </h2>

            <p style={{ fontSize: '16.5px', color: '#475569', lineHeight: 1.6, maxWidth: '640px' }}>
              JobGen integrates opportunity tracking, resume engineering, strategic roadmaps, and global role discovery into one hyper-fluid workspace.
            </p>
          </div>

          {/* Asymmetric Bento Grid: 2 Rectangles & 2 Squares */}
          <div 
            className="productivity-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '24px'
            }}
          >
            {/* ROW 1 — CARD 1: RECTANGLE (Col 8) — Track & Document (bento2.mp4) */}
            <BentoVideoCard
              src="/bento2.mp4"
              whiteText="Track and "
              blueText="Document"
              colSpan={8}
              objectPosition="top left"
            />

            {/* ROW 1 — CARD 2: SQUARE (Col 4) — Personalized Roadmap (bento4.mp4) */}
            <BentoVideoCard
              src="/bento4.mp4"
              whiteText="Personalized "
              blueText="Roadmap"
              colSpan={4}
              objectPosition="top center"
            />

            {/* ROW 2 — CARD 3: SQUARE (Col 4) — Resume Studio (bento3.mp4) */}
            <BentoVideoCard
              src="/bento3.mp4"
              whiteText="Resume "
              blueText="Studio"
              colSpan={4}
              objectPosition="top center"
            />

            {/* ROW 2 — CARD 4: RECTANGLE (Col 8) — Global Job Seeker (bento1.mp4) */}
            <BentoVideoCard
              src="/bento1.mp4"
              whiteText="Global "
              blueText="Job Seeker"
              colSpan={8}
              objectPosition="top left"
            />

          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SOCIAL PROOF / INTERACTIVE 3D FALLING LOGO BALLS
          ========================================================================= */}
      <InteractiveLogoBallsBand />

      {/* =========================================================================
          5. MEET EMMA: DARK THEME EMMA INTERVIEW & RESUME INTELLIGENCE SECTION
          ========================================================================= */}
      <MeetEmmaSection 
        onLaunchApp={onLaunchApp} 
        onScoreClick={() => scrollToSection('ats-scanner')} 
      />

      {/* =========================================================================
          6. PRICING ENGINE: WHITE THEME WITH BLUE MIST & DYNAMIC REGIONAL PRICING
          ========================================================================= */}
      <PricingEngineSection onLaunchApp={onLaunchApp} />

      {/* =========================================================================
          7. SOLID BLUE JOBGEN.IO CALLOUT WITH FLUID WATER SPLASH SHADER (PRE-FOOTER)
          ========================================================================= */}
      <FluidBlueHero />

      {/* =========================================================================
          12. MINIMALIST WHITE FOOTER
          ========================================================================= */}
      <footer 
        style={{
          padding: '50px 0 36px 0',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E2E8F0'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', paddingBottom: '30px', borderBottom: '1px solid #F1F5F9' }}>
            
            {/* Left: Brand Identity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img 
                src="/jobgen-logo.png" 
                alt="JobGen" 
                style={{ width: '24px', height: '24px', objectFit: 'contain' }}
              />
              <span style={{ fontSize: '16px', fontWeight: 900, color: '#090C15' }}>JobGen.AI</span>
              <span style={{ fontSize: '12px', color: '#64748B' }}>&bull; Everything App for Candidates</span>
            </div>

            {/* Right: Operational Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#059669', fontWeight: 600 }}>
              <span className="radar-live" style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              <span>All Systems Operational &bull; 99.98% Parsing Uptime</span>
            </div>
          </div>

          {/* Subfooter */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', paddingTop: '24px', fontSize: '12px', color: '#64748B' }}>
            <div>
              &copy; {new Date().getFullYear()} JobGen Connect Pty Ltd. All rights reserved.
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              <span style={{ cursor: 'pointer' }} onClick={() => scrollToSection('features')}>Features</span>
              <span style={{ cursor: 'pointer' }} onClick={() => scrollToSection('ats-scanner')}>ATS Scanner</span>
              <span style={{ cursor: 'pointer' }} onClick={() => scrollToSection('pricing')}>Pricing</span>
              <span style={{ cursor: 'pointer' }} onClick={onSignIn}>Sign In</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
