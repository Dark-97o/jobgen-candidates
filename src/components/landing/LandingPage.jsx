import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowUpRight, 
  ArrowRight, 
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
  X, 
  RotateCcw,
  SlidersHorizontal,
  MapPin,
  Flame,
  Award
} from 'lucide-react';

// ==========================================
// STATIC DATA & CONTENT FROM CANDIDATES.JOBGEN.AI
// ==========================================

const TRUST_LOGOS = [
  { name: 'Atlassian', src: '/logos/atlassian.webp', scale: 1.15 },
  { name: 'Canva', src: '/logos/canva.webp', scale: 1.12 },
  { name: 'ANZ Bank', src: '/logos/anz.webp', scale: 1.0 },
  { name: 'Afterpay', src: '/logos/afterpay.webp', scale: 0.95 },
  { name: 'Deloitte', src: '/logos/deloitte.webp', scale: 0.82 },
  { name: 'Microsoft', src: '/logos/microsoft.webp', scale: 0.88 },
  { name: 'Amazon', src: '/logos/amazon.webp', scale: 0.95 },
  { name: 'Visa', src: '/logos/visa.webp', scale: 0.92 }
];

const FEATURES_DATA = [
  {
    id: 'resume-builder',
    title: 'AI Resume Studio & Tailor',
    tag: 'ATS Optimization',
    navLabel: 'Resume Builder',
    description: 'Create an ATS-proof master resume, connect target job descriptions, and tailor each section with precision evidence you control.',
    image: '/features/feature-resume-builder-BYG5dBEM.webp',
    imageAlt: 'JobGen Resume Builder showing tailored suggestions and live preview',
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
    navLabel: 'Job Tracker',
    description: 'Never lose track of an opportunity. Manage applications across Bookmarked, Applied, Screening, Interviewing, and Offer stages in one real-time workspace.',
    image: '/features/feature-job-tracker-z3Bsjg1I.webp',
    imageAlt: 'JobGen Kanban Board and Application Tracking Pipeline',
    bulletPoints: [
      'Live status Kanban with drag-and-drop interview milestones',
      'Salary benchmarking & equity tier transparency',
      'Follow-up reminders so you never miss a recruiter deadline'
    ]
  },
  {
    id: 'chrome-extension',
    title: '1-Click Chrome Extension',
    tag: 'Instant Capture',
    navLabel: 'Chrome Extension',
    description: 'Save job openings instantly from LinkedIn, Seek, and Indeed directly into your JobGen candidate dashboard with auto-parsed salary and requirements.',
    image: '/features/feature-chrome-extension-yfyi6583.webp',
    imageAlt: 'JobGen Chrome Extension bookmarking jobs from LinkedIn and Seek',
    bulletPoints: [
      'Auto-extract company data, hiring manager details, and job descriptions',
      'Instant match score preview while browsing job boards',
      'Pre-fills complex multi-step application forms in seconds'
    ]
  },
  {
    id: 'interview-prep',
    title: 'Virtual Interview Prep Lab',
    tag: 'Copilot Coaching',
    navLabel: 'Interview Prep',
    description: 'Walk into every interview with unfair preparation. Emma generates custom role-specific questions across HR, technical, hiring manager, and executive stages.',
    image: '/features/feature-interview-prep-lhiGrxOf.webp',
    imageAlt: 'JobGen Interview Prep Coach with question breakdown',
    bulletPoints: [
      '10 tailored questions per round matching actual company rubrics',
      'STAR-framework model answers based on your background',
      'Strategic reverse-questions to ask the interview panel'
    ]
  },
  {
    id: 'career-pathway',
    title: '12-Week Career Pathway',
    tag: 'Strategic Growth',
    navLabel: 'Career Plan',
    description: 'A personalized autonomous career roadmap guiding your weekly goals, networking reach-outs, compensation targets, and offer negotiation strategy.',
    image: '/features/feature-career-pathway-CVhyt92q.webp',
    imageAlt: 'JobGen 12-week Career Roadmap',
    bulletPoints: [
      'Targeted company reach-out email templates that get replies',
      'Compensation negotiation scripts that unlocked 20%+ higher offers',
      'Weekly milestones to maintain aggressive job-search momentum'
    ]
  }
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
    quote: "JobGen.AI turned my rejection streak around. The keyword matching showed me exactly what was missing from every resume I had sent.",
    name: "Daniel W.",
    role: "Growth Manager → landed at REA Group",
    initials: "DW",
    accent: "#0891B2",
    verified: true
  },
  {
    quote: "The cover letter generator saves me at least an hour per application. Every letter feels genuinely tailored, not templated.",
    name: "Aisha N.",
    role: "Business Consultant → landed at Deloitte",
    initials: "AN",
    accent: "#BE185D",
    verified: true
  }
];

const FAQ_ITEMS = [
  {
    q: "Is JobGen.AI free, and do I need a credit card?",
    a: "Yes. You can start with JobGen.AI Free without a credit card. It includes your first resume score, your first 5 job match scores, one AI-tailored resume each month, job saving, and application tracking. Premium adds unlimited AI resumes, cover letters, matching, and interview preparation."
  },
  {
    q: "Can I upload and edit my existing resume?",
    a: "Yes. Upload your existing PDF or DOCX and JobGen.AI will extract its content into the resume studio. You can edit every section, create tailored versions for different jobs, and export the finished resume when you are ready."
  },
  {
    q: "How do the ATS match score and resume tailoring work?",
    a: "JobGen.AI compares your resume with the job description to identify relevant keywords, skills, and experience. It then shows where the match can be improved and helps you tailor the wording for that role while keeping your resume grounded in your real background."
  },
  {
    q: "Will the AI invent or change my experience?",
    a: "No. JobGen.AI works strictly from the experience and evidence you provide rather than manufacturing qualifications, employers, or achievements. You remain in full control: review every suggestion, make your own edits, and choose what belongs in the final document."
  },
  {
    q: "What does the Chrome extension do — and does JobGen.AI apply automatically?",
    a: "The extension helps you save jobs while browsing LinkedIn, Seek, and Indeed, bring them into your tracker, and fill supported application fields faster. It assists with the application process, but you always review the information and control the final submission."
  },
  {
    q: "How is my resume and personal data protected?",
    a: "Your uploads are encrypted in transit and at rest. JobGen.AI does not sell your personal data or use your resume to train public AI models, and you can export or delete your information at any time."
  }
];

export default function LandingPage({ onSignIn, onLaunchApp }) {
  const [activeFeatureTab, setActiveFeatureTab] = useState(0);
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [uploadedResumeName, setUploadedResumeName] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

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
        score: 88,
        matchRole: 'Senior Full Stack / Cloud Architect',
        missingKeywords: ['Distributed Tracing', 'Kubernetes Helm', 'Terraform CI/CD'],
        topStrengths: ['Strong React 19 / TypeScript depth', 'Proven scalable microservices', 'Clear measurable business impact metrics']
      });
    }, 1800);
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundColor: '#F8FAFD',
        color: '#090C15',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        backgroundImage: `
          radial-gradient(at 0% 0%, rgba(224, 242, 254, 0.75) 0px, transparent 45%),
          radial-gradient(at 100% 0%, rgba(238, 242, 255, 0.85) 0px, transparent 45%),
          radial-gradient(at 50% 40%, rgba(240, 249, 255, 0.6) 0px, transparent 55%),
          radial-gradient(at 100% 80%, rgba(224, 231, 255, 0.5) 0px, transparent 50%),
          radial-gradient(at 0% 100%, rgba(236, 253, 245, 0.45) 0px, transparent 50%)
        `,
        position: 'relative',
        overflowX: 'hidden'
      }}
    >
      <style>{`
        /* Smooth Custom Styling & Refraction Effects */
        .glass-panel {
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          box-shadow: 0 10px 35px -5px rgba(15, 23, 42, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.8) inset;
        }

        .glass-panel-interactive {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease;
        }
        .glass-panel-interactive:hover {
          transform: translateY(-3px);
          border-color: rgba(37, 99, 235, 0.3);
          box-shadow: 0 20px 45px -8px rgba(37, 99, 235, 0.12), 0 0 0 1px rgba(37, 99, 235, 0.2) inset;
        }

        @keyframes scanBeam {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }

        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes liveDotGlow {
          0%, 100% { transform: scale(1); opacity: 1; box-shadow: 0 0 6px #10B981; }
          50% { transform: scale(1.2); opacity: 0.8; box-shadow: 0 0 14px #10B981; }
        }

        @keyframes gradientGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* =========================================================================
          1. FLOATING LIQUID GLASS NAVBAR (Fixed, Responsive, Luminous)
          ========================================================================= */}
      <header
        style={{
          position: 'sticky',
          top: '16px',
          zIndex: 1000,
          margin: '0 auto',
          maxWidth: '1240px',
          padding: '0 16px',
          boxSizing: 'border-box'
        }}
      >
        <div
          className="glass-panel"
          style={{
            borderRadius: '999px',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            boxShadow: '0 12px 36px -4px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.9) inset'
          }}
        >
          {/* Logo & Brand Identity */}
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
              src="/jobgen-logo.png" 
              alt="JobGen Logo" 
              style={{ width: '32px', height: '32px', objectFit: 'contain' }}
            />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
              <span 
                style={{ 
                  fontFamily: 'var(--font-title, sans-serif)',
                  fontSize: '20px', 
                  fontWeight: 900, 
                  letterSpacing: '-0.03em', 
                  color: '#090C15' 
                }}
              >
                JobGen
              </span>
              <span 
                style={{ 
                  fontFamily: 'var(--font-mono, monospace)', 
                  fontSize: '12px', 
                  fontWeight: 800, 
                  color: '#1A53CF',
                  backgroundColor: '#EFF6FF',
                  padding: '2px 5px',
                  borderRadius: '5px',
                  letterSpacing: '0.02em'
                }}
              >
                AI
              </span>
            </div>
          </div>

          {/* Navigation Anchors (Desktop) */}
          <nav 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '24px' 
            }}
            className="hidden md:flex"
          >
            {[
              { label: 'Features', href: '#features' },
              { label: 'ATS Checker', href: '#ats-scanner' },
              { label: 'Meet Emma', href: '#emma-copilot' },
              { label: 'Stories', href: '#testimonials' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'FAQ', href: '#faq' }
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  textDecoration: 'none',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: '#475569',
                  transition: 'color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#1A53CF'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Button: Sign In */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={onSignIn}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#1A53CF',
                backgroundImage: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
                color: '#FFFFFF',
                fontSize: '13.5px',
                fontWeight: 700,
                padding: '9px 20px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 14px rgba(26, 83, 207, 0.35)',
                cursor: 'pointer',
                transition: 'transform 0.18s ease, box-shadow 0.18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(26, 83, 207, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(26, 83, 207, 0.35)';
              }}
            >
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. HERO SECTION: Cinematic, Asymmetric, Dashboard-Infused
          ========================================================================= */}
      <section
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '72px 24px 64px 24px',
          boxSizing: 'border-box'
        }}
      >
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '48px', 
            alignItems: 'center' 
          }}
        >
          {/* Left Column: Clear Value Prop Copy & Fast Action */}
          <div>
            {/* Live Kicker Pill */}
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '999px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(226, 232, 240, 0.95)',
                boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)',
                marginBottom: '22px'
              }}
            >
              <span 
                style={{
                  display: 'inline-block',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  animation: 'liveDotGlow 2s infinite ease-in-out'
                }}
              />
              <span 
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  color: '#1E293B',
                  textTransform: 'uppercase'
                }}
              >
                AI Career Workspace • ATS Optimized
              </span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-title, sans-serif)',
                fontSize: 'clamp(40px, 5.2vw, 68px)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                color: '#090C15',
                marginBottom: '22px'
              }}
            >
              Tired of applying blind? <br />
              <span 
                style={{
                  background: 'linear-gradient(135deg, #1A53CF 0%, #06B6D4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}
              >
                Apply smarter.
              </span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 'clamp(16px, 1.4vw, 19px)',
                lineHeight: 1.6,
                color: '#475569',
                maxWidth: '560px',
                marginBottom: '32px'
              }}
            >
              Tailor every resume to strict ATS algorithms, automatically track applications across LinkedIn & Seek, and ace interviews with Emma AI — all in one connected candidate workspace.
            </p>

            {/* CTAs */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '14px', 
                flexWrap: 'wrap', 
                marginBottom: '36px' 
              }}
            >
              <a
                href="#ats-scanner"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#1A53CF',
                  backgroundImage: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 800,
                  padding: '14px 26px',
                  borderRadius: '14px',
                  boxShadow: '0 8px 24px rgba(26, 83, 207, 0.35)',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(26, 83, 207, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(26, 83, 207, 0.35)';
                }}
              >
                <span>Free ATS Resume Score</span>
                <ArrowRight size={17} strokeWidth={2.4} />
              </a>

              <button
                onClick={onLaunchApp}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#FFFFFF',
                  color: '#090C15',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '15px',
                  fontWeight: 700,
                  padding: '13px 22px',
                  borderRadius: '14px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1A53CF';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#CBD5E1';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <LayoutDashboard size={17} color="#1A53CF" />
                <span>Explore Live Portal</span>
              </button>
            </div>

            {/* Quick Micro-Proofs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#10B981" strokeWidth={2.4} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>No credit card required</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shield size={16} color="#2563EB" strokeWidth={2.4} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748B' }}>100% Private & Encrypted</span>
              </div>
            </div>
          </div>

          {/* Right Column: Physical Floating Glass Stage with Live Dashboard Mockup */}
          <div style={{ position: 'relative' }}>
            {/* Ambient Refraction Blob */}
            <div 
              style={{
                position: 'absolute',
                top: '-15%',
                right: '-10%',
                width: '380px',
                height: '380px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(37, 99, 235, 0.1) 50%, transparent 70%)',
                filter: 'blur(50px)',
                zIndex: 0,
                pointerEvents: 'none'
              }}
            />

            {/* Main Interactive Stage Glass Card */}
            <div 
              className="glass-panel"
              style={{
                borderRadius: '24px',
                padding: '24px',
                position: 'relative',
                zIndex: 1,
                boxShadow: '0 25px 70px -15px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.9) inset'
              }}
            >
              {/* Window Bar */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  marginBottom: '18px', 
                  paddingBottom: '12px', 
                  borderBottom: '1px solid rgba(226, 232, 240, 0.8)' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                  <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B', marginLeft: '8px' }}>
                    JobGen AI Engine v4.2 • Autonomous Mode
                  </span>
                </div>
                <span 
                  style={{ 
                    fontSize: '11px', 
                    fontWeight: 800, 
                    color: '#10B981', 
                    backgroundColor: '#ECFDF5', 
                    padding: '3px 8px', 
                    borderRadius: '6px' 
                  }}
                >
                  LIVE SYNC ACTIVE
                </span>
              </div>

              {/* Real Feature Preview: Resume Tailor & ATS Card */}
              <div 
                style={{ 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                  position: 'relative'
                }}
              >
                <img 
                  src="/features/feature-resume-builder-BYG5dBEM.webp" 
                  alt="JobGen Resume Builder Preview" 
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                />
              </div>

              {/* Floating Pill Overlay 1: Real-time ATS Score Badge */}
              <div
                className="glass-panel"
                style={{
                  position: 'absolute',
                  top: '-18px',
                  left: '-18px',
                  padding: '10px 16px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)',
                  animation: 'subtleFloat 6s ease-in-out infinite'
                }}
              >
                <div 
                  style={{ 
                    width: '38px', 
                    height: '38px', 
                    borderRadius: '10px', 
                    backgroundColor: '#ECFDF5', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: '#059669'
                  }}
                >
                  <Award size={20} strokeWidth={2.4} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B' }}>ATS Match Score</div>
                  <div style={{ fontSize: '17px', fontWeight: 900, color: '#090C15', letterSpacing: '-0.02em' }}>
                    94% • High Priority
                  </div>
                </div>
              </div>

              {/* Floating Pill Overlay 2: Emma Copilot Activity */}
              <div
                className="glass-panel"
                style={{
                  position: 'absolute',
                  bottom: '-22px',
                  right: '-16px',
                  padding: '12px 18px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 16px 36px rgba(15, 23, 42, 0.14)',
                  animation: 'subtleFloat 7s ease-in-out infinite 1s'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <img 
                    src="/Emma.jpeg" 
                    alt="Emma Copilot" 
                    style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #2563EB' }}
                  />
                  <span style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981', border: '2px solid #FFFFFF' }} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#1A53CF', letterSpacing: '0.04em' }}>EMMA COPILOT</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#090C15' }}>
                    Tailored 6 bullet points for Canva
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. TRUST & SOCIAL PROOF STRIP (Logos of Top Tech Employers)
          ========================================================================= */}
      <section 
        style={{
          borderTop: '1px solid rgba(226, 232, 240, 0.8)',
          borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(12px)',
          padding: '38px 24px',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto', textAlign: 'center' }}>
          <p 
            style={{ 
              fontSize: '12.5px', 
              fontWeight: 800, 
              letterSpacing: '0.12em', 
              textTransform: 'uppercase', 
              color: '#64748B', 
              marginBottom: '24px' 
            }}
          >
            Trusted by candidates hired at leading companies
          </p>

          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: '40px 52px' 
            }}
          >
            {TRUST_LOGOS.map((logo) => (
              <img
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                title={logo.name}
                style={{
                  height: `${Math.round(28 * logo.scale)}px`,
                  width: 'auto',
                  filter: 'grayscale(100%) contrast(85%)',
                  opacity: 0.6,
                  transition: 'filter 0.2s ease, opacity 0.2s ease, transform 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'grayscale(0%)';
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'grayscale(100%) contrast(85%)';
                  e.currentTarget.style.opacity = '0.6';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            ))}
          </div>

          {/* Chrome Web Store Rating Pill */}
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              marginTop: '28px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)'
            }}
          >
            <div style={{ display: 'flex', gap: '2px' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={13} fill="#F59E0B" color="#F59E0B" />
              ))}
            </div>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#090C15' }}>
              4.9 / 5.0
            </span>
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              • Chrome Web Store Verified Candidate Rating
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. INTERACTIVE PRODUCT FEATURE SHOWCASE (Bento Grid / Multi-Pillar)
          ========================================================================= */}
      <section 
        id="features"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '88px 24px',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 48px auto' }}>
          <span 
            style={{ 
              fontSize: '12px', 
              fontWeight: 800, 
              letterSpacing: '0.14em', 
              textTransform: 'uppercase', 
              color: '#1A53CF' 
            }}
          >
            Autonomous Candidate Suite
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-title, sans-serif)',
              fontSize: 'clamp(30px, 3.6vw, 46px)',
              fontWeight: 900,
              letterSpacing: '-0.035em',
              color: '#090C15',
              marginTop: '10px',
              marginBottom: '14px'
            }}
          >
            Your complete job search engine, <br />
            <span style={{ color: '#1A53CF' }}>all in one place.</span>
          </h2>
          <p style={{ fontSize: '16px', color: '#64748B', lineHeight: 1.6 }}>
            Say goodbye to 15 browser tabs and generic chat prompts. JobGen connects every step of your application journey into a coherent, high-velocity workflow.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '8px', 
            flexWrap: 'wrap', 
            marginBottom: '32px' 
          }}
        >
          {FEATURES_DATA.map((feat, idx) => {
            const isActive = activeFeatureTab === idx;
            return (
              <button
                key={feat.id}
                onClick={() => setActiveFeatureTab(idx)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '12px',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: isActive ? '1.5px solid #1A53CF' : '1px solid rgba(226, 232, 240, 0.9)',
                  backgroundColor: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                  color: isActive ? '#1A53CF' : '#64748B',
                  boxShadow: isActive ? '0 4px 14px rgba(26, 83, 207, 0.12)' : 'none',
                  transition: 'all 0.18s ease'
                }}
              >
                <span>{feat.navLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Feature Showcase Stage */}
        {(() => {
          const current = FEATURES_DATA[activeFeatureTab];
          return (
            <div 
              className="glass-panel"
              style={{
                borderRadius: '24px',
                padding: 'clamp(20px, 3.5vw, 44px)',
                boxShadow: '0 20px 60px -10px rgba(15, 23, 42, 0.08)'
              }}
            >
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
                  gap: '36px', 
                  alignItems: 'center' 
                }}
              >
                {/* Details Column */}
                <div>
                  <span 
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#2563EB',
                      backgroundColor: '#EFF6FF',
                      padding: '4px 10px',
                      borderRadius: '6px'
                    }}
                  >
                    {current.tag}
                  </span>

                  <h3
                    style={{
                      fontFamily: 'var(--font-title, sans-serif)',
                      fontSize: 'clamp(24px, 2.4vw, 34px)',
                      fontWeight: 900,
                      letterSpacing: '-0.025em',
                      color: '#090C15',
                      margin: '14px 0'
                    }}
                  >
                    {current.title}
                  </h3>

                  <p style={{ fontSize: '15.5px', color: '#475569', lineHeight: 1.6, marginBottom: '24px' }}>
                    {current.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                    {current.bulletPoints.map((bp) => (
                      <div key={bp} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <div 
                          style={{ 
                            width: '20px', 
                            height: '20px', 
                            borderRadius: '50%', 
                            backgroundColor: '#ECFDF5', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: '2px'
                          }}
                        >
                          <Check size={13} color="#059669" strokeWidth={3} />
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B', lineHeight: 1.4 }}>
                          {bp}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={onLaunchApp}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#1A53CF',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      fontWeight: 800,
                      padding: '11px 22px',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(26, 83, 207, 0.3)',
                      transition: 'transform 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <span>Try in Candidate Workspace</span>
                    <ArrowRight size={15} strokeWidth={2.4} />
                  </button>
                </div>

                {/* Visual Image Stage */}
                <div 
                  style={{ 
                    borderRadius: '18px', 
                    overflow: 'hidden', 
                    border: '1.5px solid #E2E8F0',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 12px 40px rgba(15, 23, 42, 0.08)'
                  }}
                >
                  <img 
                    src={current.image} 
                    alt={current.imageAlt} 
                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
                  />
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* =========================================================================
          5. INTERACTIVE LIVE ATS RESUME CHECKER ("How it Works")
          ========================================================================= */}
      <section 
        id="ats-scanner"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '64px 24px',
          boxSizing: 'border-box'
        }}
      >
        <div 
          className="glass-panel"
          style={{
            borderRadius: '28px',
            padding: 'clamp(28px, 4vw, 56px)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 25px 65px -15px rgba(26, 83, 207, 0.12)'
          }}
        >
          {/* Top Header */}
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
            <span 
              style={{ 
                fontSize: '12px', 
                fontWeight: 800, 
                letterSpacing: '0.12em', 
                textTransform: 'uppercase', 
                color: '#10B981' 
              }}
            >
              Instant Interactive Demo
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-title, sans-serif)',
                fontSize: 'clamp(28px, 3.2vw, 42px)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                color: '#090C15',
                margin: '10px 0 14px 0'
              }}
            >
              Get your free <span style={{ color: '#1A53CF' }}>ATS resume score.</span>
            </h2>
            <p style={{ fontSize: '15.5px', color: '#64748B', lineHeight: 1.6 }}>
              See how well your resume matches real employer job descriptions and uncover the exact gaps before you apply.
            </p>
          </div>

          {/* 3 Step Pipeline Pills */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
              gap: '16px', 
              marginBottom: '36px' 
            }}
          >
            {[
              { step: '01', title: 'Upload Resume', desc: 'PDF, DOCX, or DOC formats' },
              { step: '02', title: 'Select Target Role', desc: 'Paste job description or link' },
              { step: '03', title: 'Instant Score & Fixes', desc: 'Keyword gaps & tailored bullets' }
            ].map((s) => (
              <div
                key={s.step}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div 
                  style={{ 
                    fontFamily: 'var(--font-mono, monospace)', 
                    fontSize: '15px', 
                    fontWeight: 800, 
                    color: '#1A53CF', 
                    backgroundColor: '#EFF6FF', 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '10px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {s.step}
                </div>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#090C15' }}>{s.title}</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Dropzone Container */}
          <div
            style={{
              border: '2px dashed #93C5FD',
              backgroundColor: 'rgba(239, 246, 255, 0.6)',
              borderRadius: '20px',
              padding: '48px 24px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'background 0.2s ease, border-color 0.2s ease'
            }}
          >
            {isScanning && (
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.88)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                }}
              >
                <div 
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '3px solid #E2E8F0',
                    borderTopColor: '#1A53CF',
                    animation: 'spin 0.8s linear infinite',
                    marginBottom: '16px'
                  }}
                />
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#090C15' }}>
                  Scanning {uploadedResumeName}...
                </div>
                <div style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
                  Evaluating ATS parsing tree, keyword densities, and quantifiable metrics
                </div>
              </div>
            )}

            <input 
              type="file" 
              accept=".pdf,.doc,.docx" 
              onChange={handleFileUpload}
              style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 5 }}
            />

            <div 
              style={{ 
                width: '54px', 
                height: '54px', 
                borderRadius: '16px', 
                backgroundColor: '#FFFFFF', 
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.15)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 16px auto',
                color: '#1A53CF'
              }}
            >
              <Upload size={26} strokeWidth={2.2} />
            </div>

            <div style={{ fontSize: '17px', fontWeight: 800, color: '#090C15', marginBottom: '6px' }}>
              {uploadedResumeName ? `Selected: ${uploadedResumeName}` : 'Drop your resume here or click to browse'}
            </div>
            <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '14px' }}>
              Supports PDF, DOCX, or DOC • Maximum file size 10 MB
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#2563EB' }}>
              <Lock size={13} strokeWidth={2.4} />
              <span>Private upload • Your resume is never shared with recruiters or employers</span>
            </div>
          </div>

          {/* Real-time Scan Result Pop-up Demo */}
          {scanResult && (
            <div 
              style={{
                marginTop: '28px',
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                border: '1.5px solid #10B981',
                padding: '24px',
                boxShadow: '0 12px 36px rgba(16, 185, 129, 0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div 
                    style={{ 
                      width: '48px', 
                      height: '48px', 
                      borderRadius: '12px', 
                      backgroundColor: '#ECFDF5', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: '18px', 
                      fontWeight: 900, 
                      color: '#059669' 
                    }}
                  >
                    {scanResult.score}%
                  </div>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 900, color: '#090C15' }}>
                      ATS Match Score Calculated!
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748B' }}>
                      Evaluated for: <strong>{scanResult.matchRole}</strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onLaunchApp}
                  style={{
                    backgroundColor: '#10B981',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px 18px',
                    fontSize: '13.5px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Apply Auto-Fixes in Studio</span>
                  <ArrowRight size={15} strokeWidth={2.4} />
                </button>
              </div>

              {/* Gaps Found */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#B91C1C', marginBottom: '8px' }}>
                    Missing High-Value Keywords:
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {scanResult.missingKeywords.map((kw) => (
                      <span key={kw} style={{ fontSize: '11.5px', fontWeight: 700, backgroundColor: '#FFFFFF', padding: '3px 8px', borderRadius: '6px', color: '#991B1B' }}>
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px', padding: '14px' }}>
                  <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#15803D', marginBottom: '8px' }}>
                    Identified Strengths:
                  </div>
                  <div style={{ fontSize: '12px', color: '#166534', lineHeight: 1.5 }}>
                    ✓ Strong quantifiable metric density <br />
                    ✓ Clear career progression hierarchy
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          6. MEET EMMA AI COPILOT (Deep Tech Luxury Section)
          ========================================================================= */}
      <section
        id="emma-copilot"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '64px 24px',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            borderRadius: '28px',
            backgroundColor: '#090C15',
            color: '#FFFFFF',
            padding: 'clamp(32px, 4.5vw, 64px)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 30px 80px -15px rgba(9, 12, 21, 0.4)'
          }}
        >
          {/* Ambient Cosmic Violet & Cyan Flare */}
          <div 
            style={{
              position: 'absolute',
              top: '-30%',
              right: '-10%',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(124, 58, 237, 0.28) 0%, rgba(37, 99, 235, 0.15) 45%, transparent 70%)',
              filter: 'blur(70px)',
              pointerEvents: 'none'
            }}
          />

          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '44px', 
              alignItems: 'center',
              position: 'relative',
              zIndex: 1
            }}
          >
            {/* Left Column: Emma Intro */}
            <div>
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(124, 58, 237, 0.2)',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                  padding: '5px 12px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#C4B5FD',
                  marginBottom: '20px'
                }}
              >
                <Bot size={14} color="#A78BFA" />
                <span>Candidate AI Copilot</span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-title, sans-serif)',
                  fontSize: 'clamp(30px, 3.5vw, 44px)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15,
                  marginBottom: '18px'
                }}
              >
                Job-search coaching with your <br />
                <span 
                  style={{
                    background: 'linear-gradient(135deg, #A78BFA 0%, #38BDF8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  exact career context.
                </span>
              </h2>

              <p style={{ fontSize: '15.5px', color: '#94A3B8', lineHeight: 1.65, marginBottom: '28px' }}>
                Emma lives inside your workspace. She understands your authentic master experience, analyzes the exact job requirements you are targeting, and gives hyper-specific tactical feedback before you click submit.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
                {[
                  'Reviews your resume with the target job in direct view',
                  'Prioritizes the exact quantifiable metrics hiring managers look for',
                  'Proposes wordings and interview answers that you review and approve'
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div 
                      style={{ 
                        width: '20px', 
                        height: '20px', 
                        borderRadius: '50%', 
                        backgroundColor: 'rgba(139, 92, 246, 0.25)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Check size={12} color="#C4B5FD" strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: '14px', color: '#E2E8F0', fontWeight: 600 }}>{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onLaunchApp}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#FFFFFF',
                  color: '#090C15',
                  fontSize: '14.5px',
                  fontWeight: 800,
                  padding: '13px 26px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <span>Talk with Emma in Portal</span>
                <ArrowRight size={16} strokeWidth={2.4} />
              </button>
            </div>

            {/* Right Column: Live Chat Simulation Card */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '20px',
                padding: '24px',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <img 
                  src="/Emma.jpeg" 
                  alt="Emma AI" 
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #8B5CF6' }}
                />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>Emma AI Copilot</div>
                  <div style={{ fontSize: '12px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                    Active • Tailoring for Canva Application
                  </div>
                </div>
              </div>

              {/* Chat Message 1: User Request */}
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '12px 16px', marginBottom: '14px', maxWidth: '85%', marginLeft: 'auto' }}>
                <div style={{ fontSize: '13px', color: '#F1F5F9', lineHeight: 1.4 }}>
                  "How can I emphasize my API scaling experience for Canva's Principal Engineer posting?"
                </div>
              </div>

              {/* Chat Message 2: Emma AI Response */}
              <div style={{ backgroundColor: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '12px', padding: '14px 16px', maxWidth: '92%' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#C4B5FD', marginBottom: '6px' }}>
                  EMMA SUGGESTION:
                </div>
                <div style={{ fontSize: '13px', color: '#E2E8F0', lineHeight: 1.5, marginBottom: '10px' }}>
                  Canva prioritizes product velocity and developer ecosystem growth. Based on your verified master experience, I’ve refined your bullet:
                </div>
                <div style={{ backgroundColor: 'rgba(9, 12, 21, 0.7)', padding: '10px 12px', borderRadius: '8px', borderLeft: '3px solid #8B5CF6', fontSize: '12.5px', color: '#F8FAFC', lineHeight: 1.4, fontStyle: 'italic' }}>
                  "Scaled enterprise API adoption by 180% across 40+ Tier-1 banking partners through automated SDK testing, directly matching Canva’s platform growth priority."
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. SUCCESS STORIES & TESTIMONIALS (Elevated Candidate Reviews)
          ========================================================================= */}
      <section
        id="testimonials"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '88px 24px',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px auto' }}>
          <span 
            style={{ 
              fontSize: '12px', 
              fontWeight: 800, 
              letterSpacing: '0.12em', 
              textTransform: 'uppercase', 
              color: '#1A53CF' 
            }}
          >
            Verified Success Stories
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-title, sans-serif)',
              fontSize: 'clamp(28px, 3.4vw, 44px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: '#090C15',
              margin: '10px 0 14px 0'
            }}
          >
            From applications to <span style={{ color: '#1A53CF' }}>offers.</span>
          </h2>
          <p style={{ fontSize: '15.5px', color: '#64748B', lineHeight: 1.6 }}>
            Hear from developers, product managers, and career switchers who accelerated their job search with JobGen.AI.
          </p>
        </div>

        {/* Masonry Review Cards */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '24px' 
          }}
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="glass-panel glass-panel-interactive"
              style={{
                borderRadius: '20px',
                padding: '26px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* 5 Stars */}
                <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={15} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>

                {/* Quote */}
                <p style={{ fontSize: '14.5px', color: '#334155', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '22px' }}>
                  "{t.quote}"
                </p>
              </div>

              {/* Author Strip */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  paddingTop: '16px', 
                  borderTop: '1px solid rgba(226, 232, 240, 0.8)' 
                }}
              >
                <div 
                  style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '50%', 
                    backgroundColor: t.accent, 
                    color: '#FFFFFF', 
                    fontSize: '12px', 
                    fontWeight: 900, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#090C15' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          8. TRANSPARENT PRICING SECTION
          ========================================================================= */}
      <section
        id="pricing"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '64px 24px',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
          <span 
            style={{ 
              fontSize: '12px', 
              fontWeight: 800, 
              letterSpacing: '0.12em', 
              textTransform: 'uppercase', 
              color: '#1A53CF' 
            }}
          >
            Transparent Plans
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-title, sans-serif)',
              fontSize: 'clamp(28px, 3.4vw, 44px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: '#090C15',
              margin: '10px 0 14px 0'
            }}
          >
            Start free. Upgrade for <span style={{ color: '#1A53CF' }}>the full engine.</span>
          </h2>
          <p style={{ fontSize: '15.5px', color: '#64748B', lineHeight: 1.6, marginBottom: '24px' }}>
            No credit card needed to begin. Unlock unlimited AI resumes, cover letters, and interview coaching when you are ready.
          </p>

          {/* Billing Cycle Toggle */}
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              backgroundColor: '#FFFFFF', 
              padding: '4px', 
              borderRadius: '999px',
              border: '1px solid #CBD5E1',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}
          >
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                border: 'none',
                backgroundColor: billingCycle === 'monthly' ? '#1A53CF' : 'transparent',
                color: billingCycle === 'monthly' ? '#FFFFFF' : '#475569',
                fontSize: '13px',
                fontWeight: 700,
                padding: '8px 18px',
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              style={{
                border: 'none',
                backgroundColor: billingCycle === 'yearly' ? '#1A53CF' : 'transparent',
                color: billingCycle === 'yearly' ? '#FFFFFF' : '#475569',
                fontSize: '13px',
                fontWeight: 700,
                padding: '8px 18px',
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Yearly <span style={{ fontSize: '11px', color: billingCycle === 'yearly' ? '#BBF7D0' : '#10B981', fontWeight: 800 }}>(Save 40%)</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
            gap: '28px', 
            maxWidth: '920px', 
            margin: '0 auto' 
          }}
        >
          {/* Card 1: Free Tier */}
          <div 
            className="glass-panel"
            style={{
              borderRadius: '24px',
              padding: '36px 30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                JobGen.AI Free
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', margin: '14px 0 16px 0' }}>
                <span style={{ fontSize: '42px', fontWeight: 900, color: '#090C15' }}>$0</span>
                <span style={{ fontSize: '14px', color: '#64748B' }}>/ forever</span>
              </div>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, marginBottom: '24px' }}>
                Perfect for organizing your active job hunt and scanning your initial resume.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {[
                  '1 Free ATS Resume Score scan',
                  '5 Target role match evaluations',
                  '1 Tailored resume per month',
                  'Unlimited Job Tracker Kanban access',
                  '1-Click Chrome Extension capture'
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Check size={16} color="#059669" strokeWidth={2.4} />
                    <span style={{ fontSize: '13.5px', color: '#334155' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onLaunchApp}
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: '12px',
                backgroundColor: '#FFFFFF',
                color: '#090C15',
                border: '1.5px solid #CBD5E1',
                fontSize: '14.5px',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'border-color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1A53CF'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#CBD5E1'}
            >
              Get Started Free
            </button>
          </div>

          {/* Card 2: Premium Tier (Highlighted) */}
          <div 
            className="glass-panel"
            style={{
              borderRadius: '24px',
              padding: '36px 30px',
              border: '2px solid #1A53CF',
              boxShadow: '0 20px 50px -10px rgba(26, 83, 207, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            {/* Recommended Pill */}
            <div 
              style={{
                position: 'absolute',
                top: '-12px',
                right: '28px',
                backgroundColor: '#1A53CF',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 900,
                letterSpacing: '0.08em',
                padding: '4px 12px',
                borderRadius: '999px',
                boxShadow: '0 4px 10px rgba(26, 83, 207, 0.4)'
              }}
            >
              RECOMMENDED
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#1A53CF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                JobGen.AI Premium
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', margin: '14px 0 16px 0' }}>
                <span style={{ fontSize: '42px', fontWeight: 900, color: '#090C15' }}>
                  {billingCycle === 'monthly' ? '$19' : '$11'}
                </span>
                <span style={{ fontSize: '14px', color: '#64748B' }}>/ month</span>
              </div>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5, marginBottom: '24px' }}>
                The full autonomous engine for serious candidates demanding high interview hit-rates.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {[
                  'Unlimited AI-tailored resumes & downloads',
                  'Unlimited tailored cover letter generation',
                  'Emma AI conversational copilot coaching',
                  'Virtual Interview Lab (HR, Technical & Leadership)',
                  '12-Week Strategic Career & Salary Roadmap',
                  'Priority recruiter cold outreach templates'
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Check size={16} color="#1A53CF" strokeWidth={3} />
                    <span style={{ fontSize: '13.5px', color: '#090C15', fontWeight: 600 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onLaunchApp}
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: '12px',
                backgroundColor: '#1A53CF',
                backgroundImage: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '14.5px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(26, 83, 207, 0.35)',
                transition: 'transform 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Unlock Full Engine
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. FREQUENTLY ASKED QUESTIONS (Accordion)
          ========================================================================= */}
      <section
        id="faq"
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          padding: '64px 24px',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span 
            style={{ 
              fontSize: '12px', 
              fontWeight: 800, 
              letterSpacing: '0.12em', 
              textTransform: 'uppercase', 
              color: '#1A53CF' 
            }}
          >
            Got Questions?
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-title, sans-serif)',
              fontSize: 'clamp(26px, 3vw, 38px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: '#090C15',
              marginTop: '8px'
            }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={item.q}
                className="glass-panel"
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  borderColor: isOpen ? 'rgba(37, 99, 235, 0.35)' : 'rgba(226, 232, 240, 0.85)',
                  transition: 'border-color 0.2s ease'
                }}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                  style={{
                    width: '100%',
                    padding: '18px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 800, color: isOpen ? '#1A53CF' : '#090C15' }}>
                    {item.q}
                  </span>
                  <div 
                    style={{ 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '50%', 
                      backgroundColor: isOpen ? '#EFF6FF' : '#F1F5F9', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: isOpen ? '#1A53CF' : '#64748B'
                    }}
                  >
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {isOpen && (
                  <div style={{ padding: '0 22px 20px 22px', fontSize: '14px', lineHeight: 1.65, color: '#475569' }}>
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          10. PRE-FOOTER CTA CARD (Direct Launch Into App)
          ========================================================================= */}
      <section 
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '48px 24px 80px 24px',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            borderRadius: '28px',
            backgroundColor: '#1A53CF',
            backgroundImage: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 50%, #06B6D4 100%)',
            color: '#FFFFFF',
            padding: 'clamp(40px, 5vw, 68px) 32px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 24px 60px -10px rgba(26, 83, 207, 0.4)'
          }}
        >
          {/* Subtle Ambient Ring */}
          <div 
            style={{
              position: 'absolute',
              top: '-50%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '700px',
              height: '700px',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              pointerEvents: 'none'
            }}
          />

          <h2
            style={{
              fontFamily: 'var(--font-title, sans-serif)',
              fontSize: 'clamp(32px, 4.2vw, 54px)',
              fontWeight: 900,
              letterSpacing: '-0.035em',
              lineHeight: 1.1,
              marginBottom: '18px'
            }}
          >
            Ready to take control of your career search?
          </h2>
          <p style={{ fontSize: '17px', color: 'rgba(255, 255, 255, 0.85)', maxWidth: '580px', margin: '0 auto 36px auto', lineHeight: 1.6 }}>
            Join thousands of ambitious candidates applying smarter, saving 10+ hours a week, and landing interviews faster.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={onLaunchApp}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#FFFFFF',
                color: '#1A53CF',
                fontSize: '15.5px',
                fontWeight: 900,
                padding: '14px 28px',
                borderRadius: '14px',
                border: 'none',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer',
                transition: 'transform 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span>Launch Candidate Workspace</span>
              <ArrowRight size={17} strokeWidth={2.6} />
            </button>

            <button
              onClick={onSignIn}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                fontSize: '15px',
                fontWeight: 700,
                padding: '13px 24px',
                borderRadius: '14px',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'background 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
            >
              Sign In to Existing Account
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. FOOTER (Clean, Modern, Responsive)
          ========================================================================= */}
      <footer
        style={{
          borderTop: '1px solid rgba(226, 232, 240, 0.8)',
          backgroundColor: '#FFFFFF',
          padding: '48px 24px 36px 24px',
          boxSizing: 'border-box'
        }}
      >
        <div 
          style={{ 
            maxWidth: '1240px', 
            margin: '0 auto', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            flexWrap: 'wrap', 
            gap: '24px' 
          }}
        >
          {/* Logo & Copyright */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/jobgen-logo.png" alt="JobGen Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            <span style={{ fontSize: '16px', fontWeight: 900, color: '#090C15' }}>JobGen.AI</span>
            <span style={{ fontSize: '13px', color: '#94A3B8', marginLeft: '12px' }}>
              © {new Date().getFullYear()} JobGen Candidates. All rights reserved.
            </span>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '13px', color: '#64748B' }}>
            <a href="#features" style={{ color: 'inherit', textDecoration: 'none' }}>Features</a>
            <a href="#ats-scanner" style={{ color: 'inherit', textDecoration: 'none' }}>ATS Score</a>
            <a href="#pricing" style={{ color: 'inherit', textDecoration: 'none' }}>Pricing</a>
            <a href="#faq" style={{ color: 'inherit', textDecoration: 'none' }}>FAQ</a>
            <button 
              onClick={onSignIn} 
              style={{ background: 'none', border: 'none', color: '#1A53CF', fontWeight: 700, cursor: 'pointer', padding: 0 }}
            >
              Sign In
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
