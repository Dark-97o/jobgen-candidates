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
import RuggedScreen3D from './RuggedScreen3D';
import HandwrittenSubtitle from './HandwrittenSubtitle';
import RevealingTitle from './RevealingTitle';

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

const REPLACEMENTS_DATA = [
  { name: 'LinkedIn Premium', cost: '$39.99 / mo', flaw: 'Passive inMails with low response rate' },
  { name: 'Jobscan ATS', cost: '$49.95 / mo', flaw: 'Clunky rigid keyword counters with zero tailoring' },
  { name: 'Teal HQ', cost: '$29.00 / mo', flaw: 'Basic spreadsheet clone without live interview AI' },
  { name: 'Interviewing.io', cost: '$250.00 / session', flaw: 'Exorbitant pricing for single-use mock rounds' },
  { name: 'Notion / Huntr Trackers', cost: '$15.00 / mo', flaw: 'Manual data entry for every applied role' }
];

const TESTIMONIALS = [
  {
    quote: "I used to spend 3 hours tailoring my resume for each job. With JobGen.AI it takes 5 minutes. Got 4 interviews in my first week.",
    name: "Marcus T.",
    role: "Software Engineer → landed at Atlassian",
    initials: "MT",
    accent: "#1A53CF",
    verified: true
  },
  {
    quote: "JobGen.AI is a genuinely helpful job search assistant that makes applying so much faster and more organized. The interface is clean and removes repetitive work.",
    name: "Janak M.",
    role: "Product Lead → landed at Canva",
    initials: "JM",
    accent: "#059669",
    verified: true
  },
  {
    quote: "The ATS score feature alone is worth it. I could see exactly why my resume was getting rejected and fix it in seconds.",
    name: "James K.",
    role: "Data Analyst → landed at ANZ Bank",
    initials: "JK",
    accent: "#2563EB",
    verified: true
  },
  {
    quote: "Applied to 20 roles in a weekend. Previously that would have taken me two weeks. The interview prep coach is genuinely scary good.",
    name: "Sophie R.",
    role: "Senior UX Designer → landed at Afterpay",
    initials: "SR",
    accent: "#7C3AED",
    verified: true
  },
  {
    quote: "The 12-week roadmap kept me focused when I felt overwhelmed. Negotiated an extra $24,000 on my base salary using the scripts.",
    name: "David L.",
    role: "DevOps Engineer → landed at Microsoft",
    initials: "DL",
    accent: "#0284C7",
    verified: true
  },
  {
    quote: "Best career tool investment I've made. The Chrome extension auto-extracting job requirements into my tracker saved countless hours.",
    name: "Priya S.",
    role: "Marketing Manager → landed at Deloitte",
    initials: "PS",
    accent: "#D97706",
    verified: true
  }
];

const FAQS = [
  {
    q: "How does JobGen.AI differ from generic ChatGPT or Claude?",
    a: "Generic LLMs hallucinate skills and produce generic, robotic bullet points that trigger ATS rejection filters. JobGen.AI is purpose-built on real employer ATS rubrics, strict factual grounding from your actual work history, and verifiable metrics that pass both machine screens and senior hiring managers."
  },
  {
    q: "Will an AI tailored resume pass Applicant Tracking Systems (ATS)?",
    a: "Yes, 100%. JobGen resumes use clean semantic ATS-compliant layouts with zero parsing bugs (no nested tables, text frames, or non-standard fonts that break ATS parsers like Workday, Greenhouse, or Lever). Every export matches recruiter-preferred standard formats."
  },
  {
    q: "What is included in the Free tier?",
    a: "You can start completely free without a credit card. It includes your first instant ATS resume score, your first 5 job match analyses, one AI-tailored master resume each month, Chrome extension job saving, and application pipeline tracking."
  },
  {
    q: "How does the Emma AI Interview Coach work?",
    a: "Emma conducts simulated interviews calibrated to specific companies (e.g. Canva, Atlassian, Stripe). She asks role-specific behavioral, situational, and technical questions, listens to your answers, and grades you on the STAR framework (Situation, Task, Action, Result) with real-time actionable coaching."
  },
  {
    q: "How does the 1-Click Chrome Extension work?",
    a: "The extension lets you save openings while browsing LinkedIn, Seek, and Indeed directly into your JobGen candidate dashboard with auto-extracted salary, recruiter info, and keywords, calculating your instant match score in real time."
  },
  {
    q: "How is my resume and personal data protected?",
    a: "Your data is encrypted in transit (TLS 1.3) and at rest (AES-256). JobGen never sells your data, does not use your resume to train public AI models, and you maintain complete ownership to export or delete your information at any time."
  }
];

// =========================================================================
// FULL-SCREEN SOLID BLUE HERO WITH FLUID WATER SPLASH POINTER & 3D REAL RESUME
// =========================================================================
function FluidBlueHero({ onSignIn, onLaunchApp, onScanClick, onProductivityClick, onPricingClick }) {
  const resumeContainerRef = useRef(null);
  const glintRef = useRef(null);

  // 3D Resume look-towards-pointer tracking
  const rotRef = useRef({
    currentX: 3,
    currentY: -4,
    targetX: 3,
    targetY: -4,
    transX: 0,
    transY: 0,
    currentScale: 1,
    targetScale: 1
  });

  useEffect(() => {
    let animId;
    const animate = () => {
      const r = rotRef.current;
      r.currentX += (r.targetX - r.currentX) * 0.085;
      r.currentY += (r.targetY - r.currentY) * 0.085;
      r.currentScale += (r.targetScale - r.currentScale) * 0.095;

      const lev = Math.sin(Date.now() * 0.0018) * 8;

      if (resumeContainerRef.current) {
        resumeContainerRef.current.style.transform = `perspective(1100px) rotateX(${r.currentX}deg) rotateY(${r.currentY}deg) translate3d(${r.transX}px, ${r.transY + lev}px, 45px) scale(${r.currentScale})`;
      }

      if (glintRef.current) {
        const angle = 115 + r.currentY * 2.0;
        glintRef.current.style.background = `linear-gradient(${angle}deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 52%, rgba(0, 0, 0, 0.04) 100%)`;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handlePointerMove = (e) => {
    const container = resumeContainerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const cx = rect.left + rect.width * 0.5;
    const cy = rect.top + rect.height * 0.5;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    const maxDistX = Math.max(300, window.innerWidth * 0.5);
    const maxDistY = Math.max(250, window.innerHeight * 0.5);

    const normX = Math.max(-1, Math.min(1, dx / maxDistX));
    const normY = Math.max(-1, Math.min(1, dy / maxDistY));

    // Turn face to look directly towards the pointer
    rotRef.current.targetY = normX * 28;
    rotRef.current.targetX = -normY * 24;
    rotRef.current.transX = normX * 18;
    rotRef.current.transY = normY * 14;
  };

  const handleScreenPointerEnter = () => {
    // Grow slightly when pointer touches the 3D screen
    rotRef.current.targetScale = 1.055;
  };

  const handleScreenPointerLeave = () => {
    // Return smoothly to normal scale
    rotRef.current.targetScale = 1.0;
  };

  const handlePointerLeave = () => {
    rotRef.current.targetX = 3;
    rotRef.current.targetY = -4;
    rotRef.current.transX = 0;
    rotRef.current.transY = 0;
    rotRef.current.targetScale = 1.0;
  };

  return (
    <section
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        height: '100vh',
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

      {/* 1b. TOP HEADER ON HERO SECTION: BUTTON GROUP (PRODUCTIVITY, PRICING, SIGN IN) */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(26px, 3.8vh, 42px)',
          right: 'clamp(28px, 4.5vw, 68px)',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(8px, 1.1vw, 14px)',
          zIndex: 25,
          pointerEvents: 'auto',
          boxSizing: 'border-box'
        }}
      >
        {/* Productivity Button */}
        <button
          onClick={onProductivityClick}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '9999px',
            padding: '8px 20px',
            fontSize: '13.5px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0, 18, 70, 0.2)',
            transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.55)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 18, 70, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 18, 70, 0.2)';
          }}
        >
          Productivity
        </button>

        {/* Pricing Button */}
        <button
          onClick={onPricingClick}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            color: '#FFFFFF',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '9999px',
            padding: '8px 20px',
            fontSize: '13.5px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0, 18, 70, 0.2)',
            transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.55)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 18, 70, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 18, 70, 0.2)';
          }}
        >
          Pricing
        </button>

        {/* Sign In Button (Prominent White Pill) */}
        <button
          onClick={onSignIn}
          style={{
            backgroundColor: '#FFFFFF',
            color: '#1A53CF',
            border: 'none',
            borderRadius: '9999px',
            padding: '8px 24px',
            fontSize: '13.5px',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0, 18, 70, 0.25)',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 18, 70, 0.35)';
            e.currentTarget.style.backgroundColor = '#F8FAFC';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 18, 70, 0.25)';
            e.currentTarget.style.backgroundColor = '#FFFFFF';
          }}
        >
          Sign In
        </button>
      </div>

      {/* 2. HEADLINE: "JobGen.IO" WITH LOGO IN FRONT & SUBTITLE "Land your next dream job" (LOWERED & LIVE REVEAL) */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(68px, calc(9.5vh + 12px), 116px)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '1340px',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 2,
          pointerEvents: 'none',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'stretch', position: 'relative' }}>
          <h1
            style={{
              fontFamily: '"Plus Jakarta Sans", -apple-system, sans-serif',
              fontSize: 'clamp(58px, 10.5vw, 168px)',
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
                width: 'clamp(75px, 13.1vw, 202px)', 
                height: 'clamp(75px, 13.1vw, 202px)', 
                objectFit: 'contain',
                filter: 'drop-shadow(0 14px 32px rgba(0, 18, 70, 0.65))',
                flexShrink: 0
              }}
              onError={(e) => {
                e.currentTarget.src = '/jobgen-logo.png';
                e.currentTarget.style.filter = 'brightness(0) invert(1)';
              }}
            />
            <RevealingTitle text="JobGen.IO" delay={200} />
          </h1>
          <HandwrittenSubtitle
            text="Land your next dream job"
            delay={720}
            style={{
              margin: 'clamp(-12px, -1.8vh, -4px) 0 0 0',
              alignSelf: 'flex-end'
            }}
          />
        </div>
      </div>

      {/* 3. 3D FLOATING & POINTER-LOOKING RUGGED TACTICAL SCREEN (PLAYING VIDEO) */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          marginTop: 'clamp(200px, 28vh, 276px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pointerEvents: 'auto'
        }}
      >
        <RuggedScreen3D
          containerRef={resumeContainerRef}
          glintRef={glintRef}
          videoSrc="/jobs.mp4"
          onPointerEnter={handleScreenPointerEnter}
          onPointerLeave={handleScreenPointerLeave}
        />
      </div>

      {/* 4. 5X5 GRID OF SLOWLY GLOWING WHITE DOTS IN BOTTOM CORNER */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(24px, 4.2vh, 42px)',
          left: 'clamp(24px, 4.5vw, 56px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 6px)',
          gridTemplateRows: 'repeat(5, 6px)',
          gap: '10px',
          zIndex: 10,
          pointerEvents: 'none'
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
                width: '6px',
                height: '6px',
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

      {/* 5. BOTTOM SCROLL CUE */}
      <div
        style={{
          position: 'absolute',
          bottom: '18px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          color: 'rgba(255, 255, 255, 0.75)',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          pointerEvents: 'none'
        }}
      >
        <span>Scroll to explore</span>
        <ChevronDown size={14} style={{ animation: 'bounce 1.5s infinite' }} />
      </div>
    </section>
  );
}

export default function LandingPage({ onSignIn, onLaunchApp }) {
  // Intro Animation State (disabled by default so blue hero loads instantly)
  const [showIntro, setShowIntro] = useState(false);
  const [introPhase, setIntroPhase] = useState('enter'); // 'enter' | 'zoom' | 'reveal'

  const [activeFeatureTab, setActiveFeatureTab] = useState(0);
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [uploadedResumeName, setUploadedResumeName] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Navbar only visible after the full-height hero section is scrolled up
      const heroThreshold = Math.max(300, window.innerHeight * 0.7);
      setIsScrolled(window.scrollY > heroThreshold);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Phase 1: Pure white logo sits on solid black background
    const t1 = setTimeout(() => {
      setIntroPhase('zoom'); // Triggers dramatic zoom-in while background stays solid black
    }, 850);

    // Phase 2: After zoom engulfs viewport, fade out black overlay to reveal white webpage
    const t2 = setTimeout(() => {
      setIntroPhase('reveal');
    }, 1900);

    // Phase 3: Unmount intro overlay
    const t3 = setTimeout(() => {
      setShowIntro(false);
    }, 2450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Keyboard shortcut (Escape, Space, Enter) or click to skip intro
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showIntro && ['Escape', ' ', 'Enter'].includes(e.key)) {
        setShowIntro(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIntro]);

  // Simulated ATS file upload & scan
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedResumeName(file.name);
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        score: 94,
        matchRole: 'Senior Full Stack / Product Architect',
        missingKeywords: ['Distributed Tracing', 'Kubernetes Helm', 'System Resiliency'],
        topStrengths: ['Deep React 19 / TypeScript depth', 'Measurable enterprise revenue impact', 'Scalable distributed systems']
      });
    }, 1600);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
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
          INTRO ANIMATION: SOLID BLACK BACKGROUND -> PURE WHITE LOGO -> ZOOM IN WITH LOADINGBG -> REVEAL WHITE WEBPAGE
          ========================================================================= */}
      {showIntro && (
        <div
          onClick={() => setShowIntro(false)}
          title="Click to skip intro"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            backgroundColor: '#000000',
            opacity: introPhase === 'reveal' ? 0 : 1,
            pointerEvents: introPhase === 'reveal' ? 'none' : 'auto',
            transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Loading Background (loadingbg.png) replacing plain white bg during zoom */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/loadingbg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: introPhase === 'zoom' || introPhase === 'reveal' ? 1 : 0,
              transition: 'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 1
            }}
          >
            {/* Atmospheric overlay to blend smoothly */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(9, 12, 21, 0.6) 0%, rgba(9, 12, 21, 0.35) 50%, rgba(9, 12, 21, 0.75) 100%)',
              }}
            />
          </div>

          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: introPhase === 'enter' 
                ? 'scale(1)' 
                : 'scale(70)',
              transition: introPhase === 'zoom' || introPhase === 'reveal'
                ? 'transform 1.2s cubic-bezier(0.7, 0, 0.25, 1)' 
                : 'none',
              willChange: 'transform'
            }}
          >
            <img 
              src="/Whitelogo.webp" 
              alt="JobGen Logo" 
              style={{
                width: '130px',
                height: '130px',
                objectFit: 'contain',
                filter: 'brightness(0) invert(1) drop-shadow(0 0 45px rgba(255, 255, 255, 0.95))',
                userSelect: 'none'
              }}
            />
          </div>
        </div>
      )}

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
            backgroundColor: 'rgba(15, 23, 42, 0.84)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 16px 36px -4px rgba(0, 0, 0, 0.35)'
          }}
        >
          {/* Logo & Brand: Pure White Logo with text JobGen.AI */}
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
              alt="JobGen.AI" 
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
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
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
                JobGen
              </span>
              <span 
                style={{ 
                  fontSize: '11px', 
                  fontWeight: 900, 
                  color: '#FFFFFF',
                  backgroundColor: 'rgba(255, 255, 255, 0.18)',
                  border: '1px solid rgba(255, 255, 255, 0.35)',
                  padding: '1px 6px',
                  borderRadius: '5px',
                  letterSpacing: '0.04em',
                  textShadow: '0 1px 4px rgba(0, 18, 70, 0.25)'
                }}
              >
                AI
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '22px' }} className="nav-desktop">
            {[
              { label: 'Features', id: 'features' },
              { label: 'Productivity', id: 'productivity' },
              { label: 'Interview Lab', id: 'interview-copilot' },
              { label: 'ATS Scanner', id: 'ats-scanner' },
              { label: 'Pricing', id: 'pricing' },
              { label: 'FAQ', id: 'faq' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '13px',
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

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={onSignIn}
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                borderRadius: '9999px',
                padding: '7px 18px',
                fontSize: '12.5px',
                fontWeight: 700,
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FFFFFF';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Sign In
            </button>

            <button
              onClick={onLaunchApp}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 20px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 800,
                color: '#1A53CF',
                backgroundColor: '#FFFFFF',
                border: 'none',
                boxShadow: '0 4px 16px rgba(0, 18, 70, 0.25)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 18, 70, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 18, 70, 0.25)';
              }}
            >
              <span>Launch App</span>
              <ArrowRight size={13} style={{ marginLeft: '6px' }} />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. FULL-SCREEN SOLID BLUE HERO WITH FLUID WATER SPLASH POINTER & 3D REALISTIC RESUME
          ========================================================================= */}
      <FluidBlueHero 
        onSignIn={onSignIn} 
        onLaunchApp={onLaunchApp} 
        onScanClick={() => scrollToSection('ats-scanner')} 
        onProductivityClick={() => scrollToSection('productivity')}
        onPricingClick={() => scrollToSection('pricing')}
      />

      {/* =========================================================================
          3. INTERACTIVE AUTONOMOUS WORKSPACE PREVIEW (WHITE THEME)
          ========================================================================= */}
      <section 
        id="features"
        className="white-huly-canvas light-grid-mesh"
        style={{
          position: 'relative',
          paddingTop: '80px',
          paddingBottom: '90px',
          textAlign: 'center',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
          
          {/* Module Heading */}
          <div style={{ display: 'inline-flex', marginBottom: '20px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 18px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #BFDBFE',
                boxShadow: '0 4px 14px rgba(26, 83, 207, 0.08)'
              }}
            >
              <span className="radar-live" style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#1A53CF' }}>
                Interactive Candidate Suite
              </span>
              <span style={{ color: '#CBD5E1' }}>•</span>
              <span style={{ fontSize: '11.5px', color: '#475569', fontWeight: 600 }}>Real Evidence Grounded</span>
            </div>
          </div>

          <h2 
            className="white-hero-title"
            style={{
              fontSize: 'clamp(34px, 4.8vw, 64px)',
              fontWeight: 900,
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
              margin: '0 auto 16px auto',
              maxWidth: '860px'
            }}
          >
            Explore the Autonomous Candidate Workspace
          </h2>

          <p
            style={{
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              lineHeight: 1.55,
              color: '#475569',
              maxWidth: '660px',
              margin: '0 auto 36px auto',
              fontWeight: 500
            }}
          >
            Switch between modules to preview how Emma AI tailors resumes, runs simulated mock interviews, benchmark offers, and tracks applications in real-time.
          </p>

          {/* Hero Interactive Window Preview with Huly-style Tabs on White */}
          <div 
            style={{
              maxWidth: '1080px',
              margin: '0 auto',
              padding: '10px',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              boxShadow: '0 30px 80px -20px rgba(15, 23, 42, 0.12), 0 0 0 1px #E2E8F0',
              border: '1px solid #CBD5E1'
            }}
          >
            {/* Window Header */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 18px',
                borderBottom: '1px solid #F1F5F9',
                backgroundColor: '#F8FAFC',
                borderRadius: '16px 16px 0 0'
              }}
            >
              {/* macOS Dots */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                <div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                <div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              </div>

              {/* Command Bar Pill */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '9999px',
                  padding: '4px 14px',
                  fontSize: '11.5px',
                  color: '#475569',
                  boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)'
                }}
              >
                <Command size={12} color="#1A53CF" />
                <span>JobGen Candidate OS &bull; 4 active interview loops</span>
                <span style={{ backgroundColor: '#F1F5F9', padding: '1px 6px', borderRadius: '4px', fontSize: '10px', color: '#1E293B', fontWeight: 700 }}>⌘K</span>
              </div>

              {/* Status Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#10B981', fontWeight: 700 }}>
                <span className="radar-live" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                <span>Online</span>
              </div>
            </div>

            {/* Interactive Module Switcher Tabs */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 14px',
                backgroundColor: '#F1F5F9',
                borderBottom: '1px solid #E2E8F0',
                overflowX: 'auto'
              }}
            >
              {FEATURES_DATA.map((feat, idx) => {
                const isActive = activeFeatureTab === idx;
                return (
                  <button
                    key={feat.id}
                    onClick={() => setActiveFeatureTab(idx)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: isActive ? '1px solid #BFDBFE' : '1px solid transparent',
                      backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                      color: isActive ? '#1A53CF' : '#64748B',
                      boxShadow: isActive ? '0 2px 6px rgba(15, 23, 42, 0.05)' : 'none',
                      transition: 'all 0.15s ease',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>{feat.navLabel}</span>
                    <span 
                      style={{ 
                        fontSize: '10px', 
                        padding: '1px 6px', 
                        borderRadius: '4px',
                        backgroundColor: isActive ? '#EFF6FF' : '#E2E8F0',
                        color: isActive ? '#1A53CF' : '#64748B'
                      }}
                    >
                      {feat.stats}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Feature Display Surface on White */}
            <div 
              style={{ 
                position: 'relative', 
                backgroundColor: '#FFFFFF', 
                borderRadius: '0 0 16px 16px',
                overflow: 'hidden'
              }}
            >
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
                  gap: '28px',
                  padding: '28px',
                  alignItems: 'center',
                  textAlign: 'left'
                }}
                className="hero-feature-grid"
              >
                {/* Feature Image / Live Visual */}
                <div 
                  style={{
                    borderRadius: '14px',
                    overflow: 'hidden',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 10px 25px rgba(15, 23, 42, 0.06)',
                    backgroundColor: '#F8FAFC'
                  }}
                >
                  <img 
                    src={FEATURES_DATA[activeFeatureTab].image} 
                    alt={FEATURES_DATA[activeFeatureTab].title}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '440px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>

                {/* Feature Description & Highlights */}
                <div>
                  <div 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      backgroundColor: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      color: '#1A53CF',
                      fontSize: '11px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      marginBottom: '12px'
                    }}
                  >
                    <Sparkles size={11} />
                    <span>{FEATURES_DATA[activeFeatureTab].tag}</span>
                  </div>

                  <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#090C15', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                    {FEATURES_DATA[activeFeatureTab].title}
                  </h3>

                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
                    {FEATURES_DATA[activeFeatureTab].description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                    {FEATURES_DATA[activeFeatureTab].bulletPoints.map((pt, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                          <Check size={10} color="#059669" strokeWidth={3} />
                        </div>
                        <span style={{ fontSize: '13px', color: '#1E293B', lineHeight: 1.4 }}>{pt}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={onLaunchApp}
                    className="white-secondary-btn"
                    style={{ fontSize: '12.5px', padding: '10px 22px' }}
                  >
                    <span>Open in Candidate Workspace</span>
                    <ArrowRight size={13} style={{ marginLeft: '6px' }} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Everything you need ticker on White */}
          <div style={{ marginTop: '54px', overflow: 'hidden' }}>
            <p style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px' }}>
              Everything you need for autonomous career advancement:
            </p>
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', position: 'relative' }}>
              <div className="animate-white-marquee">
                {[
                  'ATS Resume Studio',
                  'Opportunity Kanban Pipeline',
                  'Real-time AI Match Scoring',
                  'STAR Interview Prep Copilot',
                  '12-Week Strategic Career Plan',
                  'Tailored Cover Letter Studio',
                  '1-Click Chrome Extension',
                  'Salary & Equity Benchmark'
                ].concat([
                  'ATS Resume Studio',
                  'Opportunity Kanban Pipeline',
                  'Real-time AI Match Scoring',
                  'STAR Interview Prep Copilot',
                  '12-Week Strategic Career Plan',
                  'Tailored Cover Letter Studio',
                  '1-Click Chrome Extension',
                  'Salary & Equity Benchmark'
                ]).map((item, idx) => (
                  <span 
                    key={idx} 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '8px', 
                      marginRight: '36px', 
                      fontSize: '13.5px', 
                      fontWeight: 650, 
                      color: '#334155' 
                    }}
                  >
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#1A53CF' }} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. SOCIAL PROOF / EMPLOYER LOGOS MARQUEE (WHITE BACKGROUND)
          ========================================================================= */}
      <section 
        style={{ 
          padding: '40px 0', 
          borderTop: '1px solid #E2E8F0',
          borderBottom: '1px solid #E2E8F0',
          backgroundColor: '#F8FAFC'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748B', marginBottom: '24px' }}>
            JobGen candidates have landed dream roles at industry giants
          </p>

          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '40px', 
              flexWrap: 'wrap'
            }}
          >
            {TRUST_LOGOS.map((company, idx) => (
              <div 
                key={idx} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  opacity: 0.8,
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0.8';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <img 
                  src={company.src} 
                  alt={company.name} 
                  style={{ height: '24px', objectFit: 'contain' }}
                />
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#090C15' }}>{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. UNMATCHED PRODUCTIVITY — LIGHT ASYMMETRIC BENTO GRID
          ========================================================================= */}
      <section 
        id="productivity"
        style={{
          padding: '100px 0',
          position: 'relative',
          backgroundColor: '#FFFFFF'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          
          {/* Section Header */}
          <div style={{ maxWidth: '680px', marginBottom: '56px' }}>
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '9999px',
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                color: '#1A53CF',
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px'
              }}
            >
              <Cpu size={12} />
              <span>Unmatched Productivity</span>
            </div>

            <h2 
              style={{
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                color: '#090C15',
                marginBottom: '16px'
              }}
            >
              Engineered for candidates who demand an unfair advantage.
            </h2>

            <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.6 }}>
              JobGen integrates resume engineering, opportunity tracking, behavioral coaching, and career strategy into one hyper-fluid workspace.
            </p>
          </div>

          {/* Asymmetric Bento Grid on White */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '20px'
            }}
          >
            {/* Bento 1: Keyboard Shortcuts / Command Bar (Col 4) */}
            <div 
              className="white-bento-card" 
              style={{ 
                gridColumn: 'span 4', 
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '360px'
              }}
            >
              <div>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', border: '1px solid #BFDBFE' }}>
                  <Command size={20} color="#1A53CF" />
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#090C15', marginBottom: '8px' }}>
                  Keyboard shortcuts & command bar
                </h3>
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.5 }}>
                  Work at high velocity with instant ⌘K search, stage flipping, and document switching.
                </p>
              </div>

              {/* Simulated Command Palette UI */}
              <div 
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: '#1A53CF', padding: '6px 8px', borderRadius: '6px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Search size={12} color="#1A53CF" />
                    <span style={{ fontWeight: 700 }}>Search target roles...</span>
                  </div>
                  <span style={{ fontSize: '10px', padding: '2px 5px', borderRadius: '4px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', color: '#090C15' }}>⌘K</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11.5px', color: '#475569', padding: '4px 8px' }}>
                  <span>Tailor resume for Canva</span>
                  <span style={{ fontSize: '10px', color: '#64748B' }}>⌘T</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11.5px', color: '#475569', padding: '4px 8px' }}>
                  <span>Start Mock Round with Emma</span>
                  <span style={{ fontSize: '10px', color: '#64748B' }}>⌘E</span>
                </div>
              </div>
            </div>

            {/* Bento 2: Autonomous Kanban Pipeline (Col 8) */}
            <div 
              className="white-bento-card" 
              style={{ 
                gridColumn: 'span 8', 
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '360px'
              }}
            >
              <div>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', border: '1px solid #A7F3D0' }}>
                  <LayoutDashboard size={20} color="#059669" />
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#090C15', marginBottom: '8px' }}>
                  Autonomous Kanban Pipeline & Opportunity Tracking
                </h3>
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.5, maxWidth: '580px' }}>
                  Track applications across Bookmarked, Applied, Screening, Interviewing, and Offer stages with salary benchmarking and automated follow-up alerts.
                </p>
              </div>

              {/* Simulated Kanban Columns */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  marginTop: '20px'
                }}
              >
                {/* Column 1 */}
                <div style={{ backgroundColor: '#F8FAFC', borderRadius: '10px', padding: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '11px', fontWeight: 800, color: '#64748B' }}>
                    <span>APPLIED (12)</span>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1A53CF' }} />
                  </div>
                  <div style={{ backgroundColor: '#FFFFFF', borderRadius: '6px', padding: '8px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)' }}>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#090C15' }}>Canva &bull; Product Lead</div>
                    <div style={{ fontSize: '10.5px', color: '#059669', marginTop: '2px', fontWeight: 700 }}>$195K &bull; 92% Match</div>
                  </div>
                </div>

                {/* Column 2 */}
                <div style={{ backgroundColor: '#F8FAFC', borderRadius: '10px', padding: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '11px', fontWeight: 800, color: '#D97706' }}>
                    <span>INTERVIEWING (4)</span>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                  </div>
                  <div style={{ backgroundColor: '#FFFFFF', borderRadius: '6px', padding: '8px', border: '1px solid #FDE68A', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)' }}>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#090C15' }}>Atlassian &bull; Staff Architect</div>
                    <div style={{ fontSize: '10.5px', color: '#D97706', marginTop: '2px', fontWeight: 700 }}>Round 3: System Design</div>
                  </div>
                </div>

                {/* Column 3 */}
                <div style={{ backgroundColor: '#F8FAFC', borderRadius: '10px', padding: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '11px', fontWeight: 800, color: '#059669' }}>
                    <span>OFFERS (2)</span>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                  </div>
                  <div style={{ backgroundColor: '#ECFDF5', borderRadius: '6px', padding: '8px', border: '1px solid #A7F3D0' }}>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#065F46' }}>Stripe &bull; Tech Lead</div>
                    <div style={{ fontSize: '10.5px', color: '#059669', marginTop: '2px', fontWeight: 700 }}>$230K Base + Equity</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento 3: Precision ATS Scoring (Col 8) */}
            <div 
              className="white-bento-card" 
              style={{ 
                gridColumn: 'span 8', 
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '360px'
              }}
            >
              <div>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', border: '1px solid #E9D5FF' }}>
                  <FileText size={20} color="#7C3AED" />
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#090C15', marginBottom: '8px' }}>
                  ATS Scoring Engine & Precision Keyword Calibration
                </h3>
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.5, maxWidth: '580px' }}>
                  Never guess what recruiters want. JobGen scans target job descriptions and aligns your experience to strict keyword rubrics.
                </p>
              </div>

              {/* Simulated ATS Calibration Gauge */}
              <div 
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                  marginTop: '20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: '#ECFDF5', border: '2px solid #10B981', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '18px', fontWeight: 900, color: '#059669', lineHeight: 1 }}>94</span>
                    <span style={{ fontSize: '8px', color: '#047857', fontWeight: 800 }}>ATS</span>
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#090C15' }}>Workday & Greenhouse Optimized</div>
                    <div style={{ fontSize: '11.5px', color: '#64748B' }}>99.8% Semantic Parse Accuracy Verified</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {['+ TypeScript 5.4', '+ System Architecture', '+ Micro-Frontends'].map((kw, idx) => (
                    <span key={idx} style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', backgroundColor: '#ECFDF5', color: '#065F46', border: '1px solid #A7F3D0' }}>
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bento 4: 12-Week Strategic Roadmap (Col 4) */}
            <div 
              className="white-bento-card" 
              style={{ 
                gridColumn: 'span 4', 
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '360px'
              }}
            >
              <div>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', border: '1px solid #FDE68A' }}>
                  <Compass size={20} color="#D97706" />
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#090C15', marginBottom: '8px' }}>
                  12-Week Strategic Roadmap
                </h3>
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.5 }}>
                  Structured milestone time-blocking, recruiter reach-out templates, and compensation scripts.
                </p>
              </div>

              {/* Simulated Roadmap Progress */}
              <div 
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '12px',
                  padding: '12px',
                  border: '1px solid #E2E8F0'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', fontWeight: 800, marginBottom: '6px' }}>
                  <span style={{ color: '#090C15' }}>Phase 4: Technical Deep-Dive</span>
                  <span style={{ color: '#D97706' }}>8/10 Done</span>
                </div>
                <div style={{ width: '100%', height: '6px', borderRadius: '9999px', backgroundColor: '#E2E8F0', overflow: 'hidden' }}>
                  <div style={{ width: '80%', height: '100%', backgroundColor: '#D97706', borderRadius: '9999px' }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          5. "PREPARE WITH AI" INTERVIEW SIMULATOR (WHITE / LIGHT PALETTE)
          ========================================================================= */}
      <section 
        id="interview-copilot"
        style={{
          padding: '100px 0',
          borderTop: '1px solid #E2E8F0',
          backgroundColor: '#F8FAFC',
          position: 'relative'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px auto' }}>
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '9999px',
                backgroundColor: '#ECFDF5',
                border: '1px solid #A7F3D0',
                color: '#059669',
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                marginBottom: '16px'
              }}
            >
              <Video size={12} />
              <span>Real-Time Voice & Behavioral Simulation</span>
            </div>

            <h2 
              style={{
                fontSize: 'clamp(32px, 4.5vw, 54px)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                color: '#090C15',
                marginBottom: '16px'
              }}
            >
              Prepare with AI. Like in the real interview room.
            </h2>

            <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.6 }}>
              Step into high-stakes loops with custom role-specific questions across HR, technical, hiring manager, and executive stages.
            </p>
          </div>

          {/* Video Call HUD Simulator on White */}
          <div 
            style={{
              maxWidth: '980px',
              margin: '0 auto',
              padding: '24px',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 24px 60px -10px rgba(15, 23, 42, 0.08)'
            }}
          >
            {/* Call Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="radar-live" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#090C15' }}>Emma AI &bull; Mock Round 3: System Design & Leadership</span>
              </div>
              <span style={{ fontSize: '11.5px', color: '#64748B', fontFamily: 'monospace', fontWeight: 700 }}>00:14:28 / 45:00</span>
            </div>

            {/* Video HUD Grid */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
                gap: '20px',
                marginTop: '20px'
              }}
              className="interview-sim-grid"
            >
              {/* Left: Emma AI Coach Active Tile */}
              <div 
                style={{
                  position: 'relative',
                  borderRadius: '14px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  overflow: 'hidden',
                  minHeight: '260px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '20px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, backgroundColor: '#EFF6FF', color: '#1A53CF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #BFDBFE' }}>
                    EXECUTIVE INTERVIEWER
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '3px', height: '12px', backgroundColor: '#10B981', borderRadius: '2px' }} />
                    <div style={{ width: '3px', height: '18px', backgroundColor: '#10B981', borderRadius: '2px' }} />
                    <div style={{ width: '3px', height: '8px', backgroundColor: '#10B981', borderRadius: '2px' }} />
                    <div style={{ width: '3px', height: '14px', backgroundColor: '#10B981', borderRadius: '2px' }} />
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: '14px', color: '#090C15', fontStyle: 'italic', lineHeight: 1.5, marginBottom: '8px', fontWeight: 500 }}>
                    "Tell me about a time you had to resolve a high-severity microservices latency spike while squads were pushing conflicting changes."
                  </p>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Target Rubric: Canva / Atlassian Lead Level</span>
                </div>
              </div>

              {/* Right: Live STAR Feedback & Scoring */}
              <div 
                style={{
                  borderRadius: '14px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#1A53CF', textTransform: 'uppercase', marginBottom: '12px' }}>
                    Real-Time STAR Evaluation
                  </div>
                  
                  {[
                    { label: 'Situation (Context clarity)', score: '95%', color: '#059669' },
                    { label: 'Task (Ownership & scope)', score: '92%', color: '#059669' },
                    { label: 'Action (Technical depth)', score: '98%', color: '#1A53CF' },
                    { label: 'Result (Quantified metric)', score: '94%', color: '#059669' }
                  ].map((s, idx) => (
                    <div key={idx} style={{ marginBottom: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', marginBottom: '3px' }}>
                        <span style={{ color: '#475569', fontWeight: 600 }}>{s.label}</span>
                        <span style={{ fontWeight: 800, color: s.color }}>{s.score}</span>
                      </div>
                      <div style={{ width: '100%', height: '5px', backgroundColor: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                        <div style={{ width: s.score, height: '100%', backgroundColor: s.color, borderRadius: '9999px' }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ padding: '8px 12px', borderRadius: '8px', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', fontSize: '11.5px', color: '#065F46', fontWeight: 600 }}>
                  ✓ Coach Tip: Excellent job citing the 42% latency reduction upfront!
                </div>
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
              <button 
                onClick={onLaunchApp}
                className="white-primary-btn"
                style={{ padding: '10px 24px', fontSize: '12.5px' }}
              >
                <span>Launch Emma Interview Copilot</span>
                <ArrowRight size={13} style={{ marginLeft: '6px' }} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          6. "REPLACES ALL YOUR SUBSCRIPTIONS" COMPARISON (WHITE TABLE)
          ========================================================================= */}
      <section 
        style={{
          padding: '100px 0',
          backgroundColor: '#FFFFFF'
        }}
      >
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 24px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#090C15', letterSpacing: '-0.03em', marginBottom: '14px' }}>
              One platform. Replaces all fragmented subscriptions.
            </h2>
            <p style={{ fontSize: '16px', color: '#475569' }}>
              Stop juggling 5 different apps and paying $380+ every month during your career search.
            </p>
          </div>

          <div 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 8px 30px rgba(15, 23, 42, 0.05)',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.6fr', padding: '16px 24px', borderBottom: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', fontSize: '12px', fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>
              <span>Old Fragmented Tool</span>
              <span>Typical Cost</span>
              <span>Why Candidates Switch to JobGen</span>
            </div>

            {REPLACEMENTS_DATA.map((tool, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr 1.6fr',
                  padding: '16px 24px',
                  borderBottom: idx === REPLACEMENTS_DATA.length - 1 ? 'none' : '1px solid #F1F5F9',
                  alignItems: 'center',
                  fontSize: '13px'
                }}
              >
                <span style={{ fontWeight: 800, color: '#090C15' }}>{tool.name}</span>
                <span style={{ color: '#DC2626', fontWeight: 700 }}>{tool.cost}</span>
                <span style={{ color: '#475569' }}>{tool.flaw}</span>
              </div>
            ))}

            {/* Total Highlight Bar */}
            <div 
              style={{
                padding: '20px 24px',
                backgroundColor: '#EFF6FF',
                borderTop: '1px solid #BFDBFE',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#090C15' }}>Total Traditional Stack: </span>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#DC2626', textDecoration: 'line-through' }}>$380+ / mo</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>JobGen Autonomous Hub:</span>
                <span style={{ fontSize: '15px', fontWeight: 900, color: '#065F46', backgroundColor: '#ECFDF5', padding: '3px 10px', borderRadius: '6px', border: '1px solid #A7F3D0' }}>
                  $0 Free Forever or $19 Pro
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. INTERACTIVE ATS RESUME SCANNER (LIGHT THEME)
          ========================================================================= */}
      <section 
        id="ats-scanner"
        style={{
          padding: '100px 0',
          borderTop: '1px solid #E2E8F0',
          backgroundColor: '#F8FAFC'
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '9999px',
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              color: '#1A53CF',
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}
          >
            <Upload size={12} />
            <span>Interactive Diagnostic</span>
          </div>

          <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, color: '#090C15', letterSpacing: '-0.03em', marginBottom: '14px' }}>
            Check your ATS resume score in 5 seconds.
          </h2>

          <p style={{ fontSize: '16px', color: '#475569', maxWidth: '600px', margin: '0 auto 40px auto' }}>
            Upload your resume PDF or DOCX to see how modern Applicant Tracking Systems parse your experience.
          </p>

          <div 
            className="white-bento-card"
            style={{
              padding: '36px',
              position: 'relative'
            }}
          >
            {isScanning && <div className="laser-line" />}

            {!scanResult ? (
              <label 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '48px 24px',
                  borderRadius: '14px',
                  border: '2px dashed #93C5FD',
                  backgroundColor: '#F8FAFD',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1A53CF';
                  e.currentTarget.style.backgroundColor = '#EFF6FF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#93C5FD';
                  e.currentTarget.style.backgroundColor = '#F8FAFD';
                }}
              >
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />

                <div style={{ width: '56px', height: '56px', borderRadius: '14px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Upload size={24} color="#1A53CF" />
                </div>

                <div style={{ fontSize: '16px', fontWeight: 800, color: '#090C15', marginBottom: '6px' }}>
                  {uploadedResumeName || 'Drop your resume file here or click to browse'}
                </div>

                <div style={{ fontSize: '12.5px', color: '#64748B' }}>
                  Supports PDF, DOCX (Max 15MB) &bull; Encrypted & Private
                </div>
              </label>
            ) : (
              <div style={{ textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#1A53CF' }}>TARGET MATCH:</span>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#090C15' }}>{scanResult.matchRole}</h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#ECFDF5', border: '2px solid #10B981', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '20px', fontWeight: 900, color: '#059669' }}>{scanResult.score}</span>
                      <span style={{ fontSize: '9px', color: '#047857', fontWeight: 800 }}>ATS</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ backgroundColor: '#FEF2F2', borderRadius: '10px', padding: '14px', border: '1px solid #FECACA' }}>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#DC2626', marginBottom: '8px' }}>
                      MISSING KEYWORDS DETECTED:
                    </div>
                    {scanResult.missingKeywords.map((k, i) => (
                      <div key={i} style={{ fontSize: '12.5px', color: '#991B1B', marginBottom: '4px', fontWeight: 600 }}>&bull; {k}</div>
                    ))}
                  </div>

                  <div style={{ backgroundColor: '#ECFDF5', borderRadius: '10px', padding: '14px', border: '1px solid #A7F3D0' }}>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#059669', marginBottom: '8px' }}>
                      VERIFIED STRENGTHS:
                    </div>
                    {scanResult.topStrengths.map((s, i) => (
                      <div key={i} style={{ fontSize: '12.5px', color: '#065F46', marginBottom: '4px', fontWeight: 600 }}>✓ {s}</div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <button
                    onClick={() => { setScanResult(null); setUploadedResumeName(null); }}
                    style={{ background: 'none', border: 'none', color: '#64748B', fontSize: '12.5px', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Scan Another File
                  </button>

                  <button
                    onClick={onLaunchApp}
                    className="white-primary-btn"
                    style={{ padding: '8px 24px', fontSize: '12.5px' }}
                  >
                    <span>Auto-Fix In Resume Studio</span>
                    <ArrowRight size={13} style={{ marginLeft: '6px' }} />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* =========================================================================
          8. TESTIMONIALS (WALL OF VERIFIED OUTCOMES)
          ========================================================================= */}
      <section 
        style={{
          padding: '100px 0',
          backgroundColor: '#FFFFFF'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, color: '#090C15', letterSpacing: '-0.03em', marginBottom: '14px' }}>
              Backed by real candidate outcomes.
            </h2>
            <p style={{ fontSize: '16px', color: '#475569' }}>
              From initial resume screen to final compensation offer negotiation.
            </p>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '20px'
            }}
          >
            {TESTIMONIALS.map((t, idx) => (
              <div 
                key={idx} 
                className="white-bento-card"
                style={{
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <p style={{ fontSize: '14.5px', color: '#1E293B', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '20px' }}>
                    "{t.quote}"
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div 
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: '#EFF6FF',
                      border: `1.5px solid ${t.accent}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 800,
                      color: t.accent
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#090C15' }}>{t.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748B' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          9. FAIR & TRANSPARENT PRICING
          ========================================================================= */}
      <section 
        id="pricing"
        style={{
          padding: '100px 0',
          borderTop: '1px solid #E2E8F0',
          backgroundColor: '#F8FAFC'
        }}
      >
        <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '9999px',
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              color: '#1A53CF',
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}
          >
            <Award size={12} />
            <span>Fair & Transparent Pricing</span>
          </div>

          <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, color: '#090C15', letterSpacing: '-0.03em', marginBottom: '14px' }}>
            Invest in your career. Not subscriptions.
          </h2>

          <p style={{ fontSize: '16px', color: '#475569', marginBottom: '32px' }}>
            Start completely free. Upgrade only when you want unlimited tailoring and AI interview prep.
          </p>

          {/* Billing Toggle */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px', borderRadius: '9999px', backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', marginBottom: '50px', boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)' }}>
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                padding: '6px 16px',
                borderRadius: '9999px',
                border: 'none',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: billingCycle === 'monthly' ? '#1A53CF' : 'transparent',
                color: billingCycle === 'monthly' ? '#FFFFFF' : '#64748B'
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              style={{
                padding: '6px 16px',
                borderRadius: '9999px',
                border: 'none',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: billingCycle === 'yearly' ? '#1A53CF' : 'transparent',
                color: billingCycle === 'yearly' ? '#FFFFFF' : '#64748B',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>Yearly</span>
              <span style={{ fontSize: '10px', padding: '1px 5px', borderRadius: '4px', backgroundColor: '#10B981', color: '#FFFFFF', fontWeight: 800 }}>Save 40%</span>
            </button>
          </div>

          {/* Pricing Cards Grid on White */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              textAlign: 'left'
            }}
          >
            {/* Tier 1: Free Forever */}
            <div className="white-bento-card" style={{ padding: '36px 30px' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#64748B', marginBottom: '8px' }}>Free Forever</div>
              <div style={{ fontSize: '42px', fontWeight: 900, color: '#090C15', marginBottom: '4px' }}>$0</div>
              <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '24px' }}>No credit card required</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {[
                  '1 Master ATS Resume',
                  '5 Target Job Match Scans',
                  'Application Pipeline Kanban',
                  'Chrome Extension Bookmarking',
                  'Standard Email Support'
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#334155' }}>
                    <Check size={14} color="#059669" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onLaunchApp}
                className="white-secondary-btn"
                style={{ width: '100%' }}
              >
                Start Free
              </button>
            </div>

            {/* Tier 2: Candidate Pro (Highlighted) */}
            <div 
              className="white-bento-card" 
              style={{ 
                padding: '36px 30px', 
                border: '2px solid #1A53CF',
                boxShadow: '0 12px 36px rgba(26, 83, 207, 0.16)',
                position: 'relative'
              }}
            >
              <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', padding: '3px 8px', borderRadius: '4px', backgroundColor: '#1A53CF', color: '#FFFFFF' }}>
                Most Popular
              </div>

              <div style={{ fontSize: '14px', fontWeight: 800, color: '#1A53CF', marginBottom: '8px' }}>Candidate Pro</div>
              <div style={{ fontSize: '42px', fontWeight: 900, color: '#090C15', marginBottom: '4px' }}>
                {billingCycle === 'monthly' ? '$19' : '$12'}
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#64748B' }}> / mo</span>
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '24px' }}>Billed {billingCycle}</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {[
                  'Unlimited AI-Tailored Resumes',
                  'Unlimited Cover Letter Generator',
                  'Emma AI Voice & Behavioral Simulator',
                  '12-Week Strategic Career Roadmap',
                  'Salary Benchmarking & Equity Calculator',
                  'Priority Real-Time ATS Feedback'
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#090C15', fontWeight: 600 }}>
                    <Check size={14} color="#1A53CF" strokeWidth={3} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onLaunchApp}
                className="white-primary-btn"
                style={{ width: '100%' }}
              >
                Launch Pro Hub
              </button>
            </div>

            {/* Tier 3: Executive Loop */}
            <div className="white-bento-card" style={{ padding: '36px 30px' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#7C3AED', marginBottom: '8px' }}>Executive Loop</div>
              <div style={{ fontSize: '42px', fontWeight: 900, color: '#090C15', marginBottom: '4px' }}>
                {billingCycle === 'monthly' ? '$49' : '$29'}
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#64748B' }}> / mo</span>
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '24px' }}>For Staff, Lead & VP loops</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {[
                  'Everything in Candidate Pro',
                  '1-on-1 Human Executive Resume Audit',
                  'Custom Compensation Negotiation Script',
                  'Executive Headhunter Direct Intro',
                  'Private Dedicated Coach Channel'
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#334155' }}>
                    <Check size={14} color="#7C3AED" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onLaunchApp}
                className="white-secondary-btn"
                style={{ width: '100%' }}
              >
                Join Executive Loop
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          10. FAQ ACCORDION (WHITE / CLEAN)
          ========================================================================= */}
      <section 
        id="faq"
        style={{
          padding: '100px 0',
          backgroundColor: '#FFFFFF'
        }}
      >
        <div style={{ maxWidth: '820px', margin: '0 auto', padding: '0 24px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#090C15', letterSpacing: '-0.03em', marginBottom: '14px' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: '15px', color: '#475569' }}>
              Everything you need to know about the product, privacy, and algorithms.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="white-bento-card"
                  style={{
                    padding: '20px 24px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: isOpen ? '#1A53CF' : '#090C15' }}>
                      {faq.q}
                    </span>
                    <span style={{ color: '#64748B' }}>
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </div>

                  {isOpen && (
                    <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.6, marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          11. FINAL MONUMENTAL CTA BANNER (CLEAN LIGHT THEME)
          ========================================================================= */}
      <section 
        style={{
          padding: '120px 0',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#F8FAFC',
          borderTop: '1px solid #E2E8F0',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
          
          <h2 
            className="white-hero-title"
            style={{
              fontSize: 'clamp(36px, 5.5vw, 68px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: '20px'
            }}
          >
            Ready to accelerate your career?
          </h2>

          <p style={{ fontSize: '18px', color: '#475569', maxWidth: '580px', margin: '0 auto 36px auto', lineHeight: 1.5 }}>
            Join over 45,000 ambitious developers, designers, and product leaders who landed dream offers with JobGen.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button 
              onClick={onLaunchApp}
              className="white-primary-btn"
              style={{ padding: '14px 40px', fontSize: '14px' }}
            >
              <span>Launch JobGen AI</span>
              <ArrowRight size={15} style={{ marginLeft: '8px' }} />
            </button>
          </div>

          <p style={{ fontSize: '12px', color: '#64748B', marginTop: '16px' }}>
            No credit card needed &bull; Instant access &bull; Free ATS check included
          </p>
        </div>
      </section>

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
              <span style={{ cursor: 'pointer' }} onClick={() => scrollToSection('pricing')}>Pricing</span>
              <span style={{ cursor: 'pointer' }} onClick={() => scrollToSection('faq')}>FAQ</span>
              <span style={{ cursor: 'pointer' }} onClick={onSignIn}>Sign In</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
