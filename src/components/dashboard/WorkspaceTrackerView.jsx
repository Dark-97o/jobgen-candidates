import React, { useState } from 'react';
import AddJobModal from './AddJobModal';
import { 
  Bookmark, 
  Send, 
  Calendar, 
  Award, 
  ArrowLeft, 
  ArrowRight, 
  Plus, 
  Search, 
  FileText, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  Download, 
  Eye, 
  Edit3, 
  X, 
  Building2, 
  DollarSign, 
  MapPin, 
  Clock, 
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Tag,
  Briefcase
} from 'lucide-react';

// Initial Pipeline Data across the 4 stages
const INITIAL_PIPELINE = {
  saved: [
    { 
      id: 'job-1', 
      company: 'Atlassian', 
      title: 'Senior Staff Frontend Architect', 
      salary: '$210k - $240k AUD', 
      location: 'Sydney (Hybrid)', 
      score: 94, 
      source: 'Seek', 
      date: 'Saved yesterday',
      tags: ['React 19', 'Micro-Frontends', 'TypeScript', 'Design Systems'],
      resumeId: 'res-atlassian'
    },
    { 
      id: 'job-2', 
      company: 'Afterpay', 
      title: 'Lead Full-Stack Engineer', 
      salary: '$175k - $195k AUD', 
      location: 'Sydney (On-site)', 
      score: 89, 
      source: 'LinkedIn', 
      date: 'Saved 2d ago',
      tags: ['Node.js', 'Distributed Systems', 'Kafka', 'Redis'],
      resumeId: 'res-afterpay'
    },
    { 
      id: 'job-3', 
      company: 'Deloitte', 
      title: 'Principal Cloud Strategist', 
      salary: '$185k - $215k AUD', 
      location: 'Melbourne (Remote)', 
      score: 88, 
      source: 'JobGen AI', 
      date: 'Saved 4d ago',
      tags: ['Cloud Governance', 'Enterprise AI', 'AWS', 'Client Advisory'],
      resumeId: null
    }
  ],
  applied: [
    { 
      id: 'job-4', 
      company: 'Canva', 
      title: 'Lead Product Manager', 
      salary: '$195k - $225k AUD', 
      location: 'Sydney (Surry Hills)', 
      score: 96, 
      source: 'LinkedIn EasyApply', 
      date: 'Applied 2d ago', 
      status: 'Profile Viewed by Hiring Team',
      tags: ['Product Velocity', 'Design Systems', 'API Ecosystem', 'B2B Growth'],
      resumeId: 'res-canva'
    },
    { 
      id: 'job-5', 
      company: 'Amazon Web Services', 
      title: 'Senior Technical PM', 
      salary: '$215k AUD + RSUs', 
      location: 'Sydney (CBD)', 
      score: 92, 
      source: 'Seek Premium', 
      date: 'Applied 4d ago', 
      status: 'Application Acknowledged',
      tags: ['Distributed Compute', 'SLAs', 'Enterprise Cloud', 'Customer Obsession'],
      resumeId: null
    },
    { 
      id: 'job-6', 
      company: 'Commonwealth Bank', 
      title: 'Principal Solution PM', 
      salary: '$180k AUD + Super', 
      location: 'Sydney (Hybrid)', 
      score: 90, 
      source: 'Indeed Direct', 
      date: 'Applied 5d ago', 
      status: 'Under Recruiter Review',
      tags: ['Open Banking', 'API Compliance', 'Core Banking', 'Security'],
      resumeId: null
    },
    { 
      id: 'job-7', 
      company: 'WooliesX', 
      title: 'Lead Digital Architect', 
      salary: '$190k AUD', 
      location: 'Sydney (Bella Vista)', 
      score: 91, 
      source: 'LinkedIn', 
      date: 'Applied 1w ago', 
      status: 'Review in Progress',
      tags: ['High Concurrency', 'eCommerce', 'Checkout Microservices', 'GCP'],
      resumeId: null
    }
  ],
  interviewing: [
    { 
      id: 'job-8', 
      company: 'Stripe', 
      title: 'Product Operations Lead', 
      salary: '$180k - $210k AUD', 
      location: 'Melbourne (Remote-first)', 
      score: 91, 
      source: 'Indeed', 
      date: 'Round 2 Scheduled', 
      nextEvent: 'Tomorrow 2:00 PM (System Arch & Idempotency Loop)',
      tags: ['Payment Rails', 'API Idempotency', 'Ledger Integrity', 'Cross-Border FX'],
      resumeId: 'res-stripe'
    },
    { 
      id: 'job-9', 
      company: 'Canva', 
      title: 'Group PM (Ecosystem Growth)', 
      salary: '$210k AUD Base', 
      location: 'Sydney (Hybrid)', 
      score: 96, 
      source: 'Internal Referral', 
      date: 'Round 3 (Final Stage)', 
      nextEvent: 'Friday 10:00 AM (Executive Leadership Loop with Melanie & Cameron)',
      tags: ['Platform Ecosystem', 'Creator Economy', 'Developer APIs', 'Monetization'],
      resumeId: 'res-canva'
    }
  ],
  offers: [
    { 
      id: 'job-10', 
      company: 'Microsoft', 
      title: 'Principal Azure PM', 
      salary: '$215,000 Base + $45,000 Equity AUD', 
      location: 'Sydney (North Sydney Hybrid)', 
      score: 95, 
      source: 'Executive Referral', 
      date: 'Offer Received Yesterday', 
      expiry: 'Decision Required by Oct 5, 2026',
      tags: ['Azure AI Services', 'Enterprise Scale', 'Cross-Divisional Pods', 'Enterprise ARR'],
      resumeId: 'res-microsoft'
    }
  ]
};

// Resumes tailored for different job roles (Section 2)
const TAILORED_RESUMES = [
  {
    id: 'res-canva',
    jobId: 'job-4',
    targetRole: 'Lead Product Manager',
    company: 'Canva',
    matchScore: 96,
    updatedAt: '2 hours ago',
    template: 'Modern Advisory',
    pages: 2,
    summary: 'Tailored for user-led product velocity, enterprise design systems governance, and Canva creator ecosystem expansion.',
    keywords: ['API Adoption', 'Sprint Restructuring', 'Product Strategy', 'Design System Governance', 'Cross-Pod Scaling'],
    bullets: [
      'Scaled enterprise API adoption by 180% across 40+ Tier-1 banking partners through iterative sprint restructuring.',
      'Governed design system standardization adopted by 14 distributed engineering teams, reducing frontend cycle times by 35%.',
      'Established user-led telemetry loops that surfaced 12 high-impact feature optimizations, improving monthly active engagement by 24%.'
    ],
    skills: ['Product Lifecycle', 'Figma Design Tokens', 'Agile Governance', 'A/B Experimentation', 'API Systems']
  },
  {
    id: 'res-atlassian',
    jobId: 'job-1',
    targetRole: 'Senior Staff Frontend Architect',
    company: 'Atlassian',
    matchScore: 94,
    updatedAt: 'Yesterday',
    template: 'Tech Portfolio',
    pages: 2,
    summary: 'Engineered for Jira Cloud platform scale, micro-frontend module federation, and developer productivity metrics.',
    keywords: ['Component Federation', 'Distributed Systems', 'TypeScript', 'Performance Budgets', 'CI/CD Pipelines'],
    bullets: [
      'Spearheaded micro-frontend architecture migration across 14 pods, cutting production turnaround times by 3 weeks.',
      'Architected zero-runtime CSS design tokens and automated bundle analyzer tooling, lowering LCP by 48% across core views.',
      'Authored engineering RFC on decentralized state hydration adopted across 6 cross-regional engineering centers.'
    ],
    skills: ['React 19', 'TypeScript', 'Webpack Module Federation', 'Web Vitals', 'Design Tokens']
  },
  {
    id: 'res-stripe',
    jobId: 'job-8',
    targetRole: 'Product Operations Lead',
    company: 'Stripe',
    matchScore: 91,
    updatedAt: '3 days ago',
    template: 'Precision Standard',
    pages: 2,
    summary: 'Focused on high-volume payment processing reliability, idempotent ledger APIs, and developer operations.',
    keywords: ['Idempotency', 'Payment Rails', 'Multi-Currency Settlement', 'SLA Governance', 'Financial Compliance'],
    bullets: [
      'Streamlined incident escalation protocols for high-concurrency payment transactions, upholding 99.995% SLA.',
      'Partnered with risk engineering to deploy automated anomaly filters processing $120M+ monthly throughput.',
      'Established API developer onboarding checklists that compressed partner integration cycles from 18 to 4 days.'
    ],
    skills: ['Payment Operations', 'Idempotent REST APIs', 'SQL Analytics', 'Incident Command', 'Cross-Border FX']
  },
  {
    id: 'res-microsoft',
    jobId: 'job-10',
    targetRole: 'Principal Azure PM',
    company: 'Microsoft',
    matchScore: 95,
    updatedAt: '4 days ago',
    template: 'Bureau Executive',
    pages: 2,
    summary: 'Strategic enterprise cloud computing roadmap, hybrid infrastructure deployments, and executive loops.',
    keywords: ['Azure Cloud', 'Enterprise Architecture', 'Multi-Tenant Scale', 'Executive Stakeholder Loops', 'Compliance'],
    bullets: [
      'Authored multi-year cloud enablement blueprint securing $14M enterprise ARR across Asia-Pacific banking sector.',
      'Orchestrated cross-division technical discovery workshops aligning Azure AI accelerators with client security protocols.',
      'Led 24-person technical solution taskforce through executive quarterly reviews with Microsoft cloud leadership.'
    ],
    skills: ['Enterprise Cloud', 'Azure Cognitive Services', 'Executive Discovery', 'Security Compliance', 'P&L Pacing']
  },
  {
    id: 'res-afterpay',
    jobId: 'job-2',
    targetRole: 'Lead Full-Stack Engineer',
    company: 'Afterpay',
    matchScore: 89,
    updatedAt: '5 days ago',
    template: 'Classic Tech',
    pages: 2,
    summary: 'Tailored for real-time risk assessment microservices, merchant checkout widgets, and sub-100ms API latency.',
    keywords: ['React', 'Node.js', 'Redis Caching', 'Event-Driven Architecture', 'Kafka Streaming'],
    bullets: [
      'Designed event-driven fraud assessment worker pipeline handling 3,200 requests/sec with Redis cluster caching.',
      'Optimized React checkout SDK asset delivery, reducing third-party merchant iframe load overhead by 40%.',
      'Implemented automated regression suites spanning 450+ unit and end-to-end integration scenarios.'
    ],
    skills: ['Node.js', 'React', 'Kafka', 'Redis', 'Docker/K8s', 'Sub-100ms APIs']
  }
];

// Mist-like organic particle and smoke simulation on HTML5 Canvas
function MistCanvas() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || 800);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create mist clouds / vapor puffs
    const particleCount = 28;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 150 + 90,
        vx: (Math.random() - 0.48) * 0.45,
        vy: (Math.random() - 0.5) * 0.22,
        baseAlpha: Math.random() * 0.085 + 0.035,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: Math.random() * 0.012 + 0.005,
        isAccent: Math.random() > 0.5
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += p.phaseSpeed;

        if (p.x < -p.radius) p.x = width + p.radius;
        if (p.x > width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = height + p.radius;
        if (p.y > height + p.radius) p.y = -p.radius;

        const currentAlpha = p.baseAlpha * (0.7 + 0.3 * Math.sin(p.phase));

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        if (p.isAccent) {
          // Subtle frosty blue mist
          grad.addColorStop(0, `rgba(186, 230, 253, ${currentAlpha})`);
          grad.addColorStop(0.45, `rgba(125, 211, 252, ${currentAlpha * 0.4})`);
          grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
        } else {
          // Ethereal white smoke mist
          grad.addColorStop(0, `rgba(240, 249, 255, ${currentAlpha})`);
          grad.addColorStop(0.5, `rgba(224, 242, 254, ${currentAlpha * 0.35})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.95
      }}
    />
  );
}

export default function WorkspaceTrackerView({ onNavigateToJobSearch }) {
  // Section 1: Active Stage Selection for the 4-Card Attached Design
  // 'saved' | 'applied' | 'interviewing' | 'offers'
  const [activeStage, setActiveStage] = useState('applied');
  const [pipeline, setPipeline] = useState(() => {
    try {
      const saved = sessionStorage.getItem('jobgen_candidate_pipeline');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_PIPELINE;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [actionToast, setActionToast] = useState(null);
  const [showAddJobModal, setShowAddJobModal] = useState(false);

  // Section 2: Resume Modal Preview State
  const [previewResume, setPreviewResume] = useState(null);

  const showToast = (message) => {
    setActionToast(message);
    setTimeout(() => setActionToast(null), 3200);
  };

  const handleAddNewJob = (newJob, targetStage = 'saved') => {
    const stageKey = targetStage || 'saved';
    setPipeline(prev => {
      const updated = {
        ...prev,
        [stageKey]: [newJob, ...(prev[stageKey] || [])]
      };
      try {
        sessionStorage.setItem('jobgen_candidate_pipeline', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    setActiveStage(stageKey);
    showToast(`Added ${newJob.title} at ${newJob.company} to ${stageKey.toUpperCase()}`);
  };

  // Move card between stages (Previous and Next)
  const moveCard = (cardId, fromCol, toCol, label) => {
    const card = pipeline[fromCol].find(c => c.id === cardId);
    if (!card) return;

    setPipeline(prev => ({
      ...prev,
      [fromCol]: prev[fromCol].filter(c => c.id !== cardId),
      [toCol]: [card, ...prev[toCol]]
    }));

    showToast(`Moved ${card.company} (${card.title}) to ${label}`);
  };

  // Configuration for the 4 Stacked Tab Cards (matching reference image)
  const STAGES = [
    { 
      id: 'saved', 
      label: 'Saved', 
      fullLabel: 'Saved Opportunities',
      icon: Bookmark, 
      count: pipeline.saved.length,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      badgeColor: '#1A53CF',
      badgeBg: '#EFF6FF',
      description: 'Bookmarked jobs tracked across LinkedIn, Seek, and Indeed ready for tailored application.'
    },
    { 
      id: 'applied', 
      label: 'Applied', 
      fullLabel: 'Applied Applications',
      icon: Send, 
      count: pipeline.applied.length,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
      badgeColor: '#2563EB',
      badgeBg: '#DBEAFE',
      description: 'Live applications currently submitted and tracked across recruiter applicant portals.'
    },
    { 
      id: 'interviewing', 
      label: 'Interviewing', 
      fullLabel: 'Interviewing Rounds',
      icon: Calendar, 
      count: pipeline.interviewing.length,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      badgeColor: '#D97706',
      badgeBg: '#FEF3C7',
      description: 'Active technical evaluations, system architecture rounds, and executive loops in flight.'
    },
    { 
      id: 'offers', 
      label: 'Offers', 
      fullLabel: 'Offers Received',
      icon: Award, 
      count: pipeline.offers.length,
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
      badgeColor: '#16A34A',
      badgeBg: '#DCFCE7',
      description: 'Secured formal offer packages, equity breakdowns, and decision deadlines.'
    }
  ];

  const currentStageInfo = STAGES.find(s => s.id === activeStage) || STAGES[0];
  const activeJobs = pipeline[activeStage] || [];

  // Filter jobs by search
  const filteredJobs = activeJobs.filter(job => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return job.company.toLowerCase().includes(q) || 
           job.title.toLowerCase().includes(q) || 
           job.location.toLowerCase().includes(q);
  });

  return (
    <div style={{ paddingBottom: '60px', paddingRight: '28px', maxWidth: '1440px', margin: '0 auto' }}>

      {/* Floating Action Toast Notification */}
      {actionToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '28px',
            right: '36px',
            zIndex: 9999,
            backgroundColor: '#090C15',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '999px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            animation: 'fadeInUp 0.25s ease'
          }}
        >
          <CheckCircle2 size={16} color="#34D399" />
          <span>{actionToast}</span>
        </div>
      )}

      {/* Top Action Bar with Add Job Button */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end', 
          marginBottom: '20px' 
        }}
      >
        <button
          onClick={() => setShowAddJobModal(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: 800,
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 4px 16px rgba(26, 83, 207, 0.35)',
            cursor: 'pointer',
            transition: 'transform 0.18s ease, box-shadow 0.18s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 22px rgba(26, 83, 207, 0.45)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(26, 83, 207, 0.35)';
          }}
        >
          <Plus size={16} strokeWidth={2.6} />
          <span>Add Job</span>
        </button>
      </div>

      <section style={{ marginBottom: '48px' }}>

        {/* =====================================================================
            ATTACHED GEOMETRY: 4 LEFT STACKED CARDS JOINED INTO LARGE RIGHT CONTAINER
            ===================================================================== */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'stretch',
            position: 'relative',
            borderRadius: '28px',
            overflow: 'visible'
          }}
        >
          {/* Left Column: 4 Stacked Tab Cards Attached Flush to Big Container */}
          <div 
            style={{ 
              width: '210px', 
              flexShrink: 0, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '6px',
              zIndex: 10,
              paddingRight: '0px',
              marginRight: '-1px'
            }}
          >
            {STAGES.map((stage) => {
              const Icon = stage.icon;
              const isSelected = activeStage === stage.id;

              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 20px',
                    borderTopLeftRadius: '18px',
                    borderBottomLeftRadius: '18px',
                    borderTopRightRadius: '0px',
                    borderBottomRightRadius: '0px',
                    backgroundImage: `url(${stage.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: '#FFFFFF',
                    border: isSelected 
                      ? '2px solid #FFFFFF' 
                      : '1px solid rgba(255, 255, 255, 0.2)',
                    borderRight: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    textAlign: 'left',
                    boxShadow: isSelected 
                      ? '-4px 0 22px rgba(255, 255, 255, 0.95), 0 -4px 16px rgba(255, 255, 255, 0.6), 0 4px 16px rgba(255, 255, 255, 0.6), inset 0 0 14px rgba(255, 255, 255, 0.4)' 
                      : '0 2px 8px rgba(0, 0, 0, 0.25)',
                    transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isSelected ? 'translateX(2px)' : 'translateX(0)',
                    zIndex: isSelected ? 25 : 5,
                    minHeight: '76px',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.transform = 'translateX(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.transform = 'translateX(0)';
                    }
                  }}
                >
                  {/* Dark overlay for contrast and crisp white text & icon */}
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: isSelected 
                        ? 'linear-gradient(90deg, rgba(9, 12, 21, 0.6) 0%, rgba(9, 12, 21, 0.45) 100%)' 
                        : 'linear-gradient(90deg, rgba(9, 12, 21, 0.8) 0%, rgba(9, 12, 21, 0.68) 100%)',
                      zIndex: 1,
                      transition: 'background 0.2s ease'
                    }}
                  />

                  {/* Card Content: Icon and Name only in white (no stage or number markings) */}
                  <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div 
                      style={{ 
                        width: '36px', 
                        height: '36px', 
                        borderRadius: '10px', 
                        backgroundColor: 'rgba(255, 255, 255, 0.22)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.35)',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
                        flexShrink: 0
                      }}
                    >
                      <Icon size={18} color="#FFFFFF" strokeWidth={2.4} />
                    </div>

                    <span 
                      style={{ 
                        fontSize: '15.5px', 
                        fontWeight: 800, 
                        color: '#FFFFFF',
                        fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                        letterSpacing: '-0.015em',
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.95)'
                      }}
                    >
                      {stage.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Main Container: Black canvas with mist animations, attached flush on left with zig-zag edge on right */}
          <div 
            style={{ 
              flex: 1, 
              backgroundColor: '#05070F', 
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '20px',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderLeft: 'none',
              padding: '26px 42px 26px 30px',
              boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.85), inset 0 1px 2px rgba(255, 255, 255, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '380px',
              position: 'relative',
              overflow: 'hidden',
              zIndex: 8,
              WebkitMaskImage: `
                linear-gradient(to right, #000 calc(100% - 16px), transparent calc(100% - 16px)),
                url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='26' viewBox='0 0 16 26'%3E%3Cpolygon points='0,0 16,13 0,26' fill='%23000'/%3E%3C/svg%3E")
              `,
              WebkitMaskSize: 'auto, 16px 26px',
              WebkitMaskPosition: 'left top, right top',
              WebkitMaskRepeat: 'no-repeat, repeat-y',
              maskImage: `
                linear-gradient(to right, #000 calc(100% - 16px), transparent calc(100% - 16px)),
                url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='26' viewBox='0 0 16 26'%3E%3Cpolygon points='0,0 16,13 0,26' fill='%23000'/%3E%3C/svg%3E")
              `,
              maskSize: 'auto, 16px 26px',
              maskPosition: 'left top, right top',
              maskRepeat: 'no-repeat, repeat-y',
            }}
          >
            {/* Ambient CSS Keyframe and Animation Styles */}
            <style>{`
              @keyframes mistDriftAmbient {
                0% { transform: scale(1) translate3d(-3%, -2%, 0); opacity: 0.45; }
                50% { transform: scale(1.1) translate3d(3%, 3%, 0); opacity: 0.75; }
                100% { transform: scale(1) translate3d(-3%, -2%, 0); opacity: 0.45; }
              }
              @keyframes liquidSheen {
                0% { opacity: 0.4; transform: translateX(-100%); }
                100% { opacity: 0.8; transform: translateX(200%); }
              }
            `}</style>

            {/* Canvas-Driven Dynamic Mist Simulation */}
            <MistCanvas />

            {/* Layered Atmospheric Glowing Mist Clouds */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse 65% 50% at 20% 25%, rgba(56, 189, 248, 0.12) 0%, transparent 70%), radial-gradient(ellipse 70% 60% at 85% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
                filter: 'blur(32px)',
                pointerEvents: 'none',
                zIndex: 2,
                animation: 'mistDriftAmbient 16s ease-in-out infinite alternate'
              }}
            />
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 65%)',
                filter: 'blur(24px)',
                pointerEvents: 'none',
                zIndex: 2
              }}
            />

            {/* Header inside the selected stage container */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                marginBottom: '18px', 
                paddingBottom: '14px', 
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                position: 'relative',
                zIndex: 5,
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div>
                <h3 
                  style={{ 
                    fontSize: '24px', 
                    fontWeight: 900, 
                    margin: 0,
                    letterSpacing: '-0.02em',
                    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    lineHeight: 1
                  }}
                >
                  <span style={{ color: '#FFFFFF', textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>Tra</span>
                  <span 
                    style={{ 
                      color: '#2563EB', 
                      background: 'linear-gradient(135deg, #3B82F6 0%, #1A53CF 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 16px rgba(37, 99, 235, 0.65))'
                    }}
                  >
                    cker
                  </span>
                </h3>
              </div>

              {/* Search filter for this stage - Liquid Glass Search Pill */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  padding: '7px 14px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
                }}
              >
                <Search size={14} color="rgba(255, 255, 255, 0.65)" />
                <input 
                  type="text"
                  placeholder={`Search ${currentStageInfo.label.toLowerCase()} jobs...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    fontSize: '12px',
                    color: '#FFFFFF',
                    width: '160px'
                  }}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <X size={13} color="rgba(255, 255, 255, 0.65)" />
                  </button>
                )}
              </div>
            </div>

            {/* Stage Job Cards List */}
            {filteredJobs.length === 0 ? (
              <div 
                style={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  padding: '48px 24px',
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 5
                }}
              >
                <div 
                  style={{ 
                    width: '52px', 
                    height: '52px', 
                    borderRadius: '50%', 
                    backgroundColor: 'rgba(255, 255, 255, 0.08)', 
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(12px)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '14px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <Briefcase size={22} color="#94A3B8" />
                </div>
                <h4 style={{ fontSize: '15.5px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 6px 0', textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}>
                  No roles currently in {currentStageInfo.label}
                </h4>
                <p style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.6)', maxWidth: '340px', margin: '0 0 16px 0' }}>
                  Move opportunities here from other stages or explore verified openings.
                </p>
                {onNavigateToJobSearch && (
                  <button
                    onClick={onNavigateToJobSearch}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '999px',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.08) 100%)',
                      backdropFilter: 'blur(12px)',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: 700,
                      border: '1px solid rgba(255, 255, 255, 0.28)',
                      cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    Find Roles in Job Hunt →
                  </button>
                )}
              </div>
            ) : (
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                  gap: '16px',
                  position: 'relative',
                  zIndex: 5
                }}
              >
                {filteredJobs.map((job) => {
                  return (
                    <div 
                      key={job.id}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.11) 0%, rgba(255, 255, 255, 0.02) 45%, rgba(255, 255, 255, 0.07) 100%)',
                        backdropFilter: 'blur(24px) saturate(190%)',
                        WebkitBackdropFilter: 'blur(24px) saturate(190%)',
                        borderRadius: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        padding: '18px 20px',
                        boxShadow: '0 12px 36px 0 rgba(0, 0, 0, 0.55), inset 0 1px 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.3)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '14px',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.22s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.45)';
                        e.currentTarget.style.boxShadow = '0 20px 45px -4px rgba(0, 0, 0, 0.75), 0 0 24px rgba(255, 255, 255, 0.18), inset 0 1px 2px 0 rgba(255, 255, 255, 0.7)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        e.currentTarget.style.boxShadow = '0 12px 36px 0 rgba(0, 0, 0, 0.55), inset 0 1px 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.3)';
                      }}
                    >
                      {/* Top Specular Liquid Light Sheen */}
                      <div 
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '42%',
                          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0) 100%)',
                          pointerEvents: 'none',
                          borderRadius: '20px 20px 0 0'
                        }}
                      />

                      {/* Card Header: Company, Source & ATS Score */}
                      <div style={{ position: 'relative', zIndex: 2 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span 
                            style={{ 
                              fontSize: '12px', 
                              fontWeight: 900, 
                              color: '#93C5FD', 
                              textTransform: 'uppercase', 
                              letterSpacing: '0.05em',
                              textShadow: '0 0 14px rgba(147, 197, 253, 0.45)'
                            }}
                          >
                            {job.company}
                          </span>
                          <span 
                            style={{ 
                              fontSize: '11px', 
                              fontWeight: 800, 
                              color: '#34D399', 
                              backgroundColor: 'rgba(16, 185, 129, 0.16)', 
                              border: '1px solid rgba(52, 211, 153, 0.4)',
                              padding: '3px 9px', 
                              borderRadius: '8px',
                              backdropFilter: 'blur(8px)',
                              boxShadow: '0 0 12px rgba(52, 211, 153, 0.22)'
                            }}
                          >
                            {job.score}% ATS Match
                          </span>
                        </div>

                        {/* Title */}
                        <h4 
                          style={{ 
                            fontSize: '15px', 
                            fontWeight: 800, 
                            color: '#FFFFFF', 
                            margin: '0 0 7px 0', 
                            lineHeight: 1.3,
                            letterSpacing: '-0.01em',
                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)'
                          }}
                        >
                          {job.title}
                        </h4>

                        {/* Salary & Location */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.72)', marginBottom: '10px', flexWrap: 'wrap' }}>
                          <span>{job.salary}</span>
                          <span style={{ color: 'rgba(255, 255, 255, 0.35)' }}>•</span>
                          <span>{job.location}</span>
                        </div>

                        {/* Stage Specific Badges */}
                        {job.status && (
                          <div 
                            style={{ 
                              backgroundColor: 'rgba(59, 130, 246, 0.15)', 
                              color: '#93C5FD', 
                              border: '1px solid rgba(96, 165, 250, 0.3)',
                              padding: '5px 10px', 
                              borderRadius: '8px', 
                              fontSize: '11px', 
                              fontWeight: 700, 
                              marginBottom: '8px',
                              backdropFilter: 'blur(6px)'
                            }}
                          >
                            ℹ️ {job.status}
                          </div>
                        )}

                        {job.nextEvent && (
                          <div 
                            style={{ 
                              backgroundColor: 'rgba(245, 158, 11, 0.15)', 
                              color: '#FCD34D', 
                              border: '1px solid rgba(251, 191, 36, 0.35)',
                              padding: '5px 10px', 
                              borderRadius: '8px', 
                              fontSize: '11px', 
                              fontWeight: 700, 
                              marginBottom: '8px',
                              backdropFilter: 'blur(6px)'
                            }}
                          >
                            🗓️ {job.nextEvent}
                          </div>
                        )}

                        {job.expiry && (
                          <div 
                            style={{ 
                              backgroundColor: 'rgba(16, 185, 129, 0.15)', 
                              color: '#6EE7B7', 
                              border: '1px solid rgba(52, 211, 153, 0.35)',
                              padding: '5px 10px', 
                              borderRadius: '8px', 
                              fontSize: '11px', 
                              fontWeight: 800, 
                              marginBottom: '8px',
                              backdropFilter: 'blur(6px)'
                            }}
                          >
                            🎉 {job.expiry}
                          </div>
                        )}

                        {/* Tag Chips */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '8px' }}>
                          {job.tags.slice(0, 3).map((tag, tIdx) => (
                            <span 
                              key={tIdx} 
                              style={{ 
                                fontSize: '10px', 
                                fontWeight: 600, 
                                backgroundColor: 'rgba(255, 255, 255, 0.08)', 
                                color: 'rgba(255, 255, 255, 0.85)', 
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                padding: '3px 8px', 
                                borderRadius: '6px',
                                backdropFilter: 'blur(6px)'
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer: Previous & Next Stage Move Buttons in Liquid Glass */}
                      <div 
                        style={{ 
                          paddingTop: '12px', 
                          borderTop: '1px solid rgba(255, 255, 255, 0.12)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          gap: '8px',
                          position: 'relative',
                          zIndex: 2
                        }}
                      >
                        {/* PREVIOUS BUTTON (disabled/hidden if in 'saved') */}
                        {activeStage === 'applied' && (
                          <button
                            onClick={() => moveCard(job.id, 'applied', 'saved', 'Saved')}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '7px 11px',
                              borderRadius: '8px',
                              border: '1px solid rgba(255, 255, 255, 0.22)',
                              backgroundColor: 'rgba(255, 255, 255, 0.08)',
                              color: 'rgba(255, 255, 255, 0.85)',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              backdropFilter: 'blur(8px)',
                              transition: 'all 0.15s ease'
                            }}
                            title="Move back to Saved"
                          >
                            <ArrowLeft size={12} />
                            <span>Saved</span>
                          </button>
                        )}

                        {activeStage === 'interviewing' && (
                          <button
                            onClick={() => moveCard(job.id, 'interviewing', 'applied', 'Applied')}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '7px 11px',
                              borderRadius: '8px',
                              border: '1px solid rgba(255, 255, 255, 0.22)',
                              backgroundColor: 'rgba(255, 255, 255, 0.08)',
                              color: 'rgba(255, 255, 255, 0.85)',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              backdropFilter: 'blur(8px)',
                              transition: 'all 0.15s ease'
                            }}
                            title="Move back to Applied"
                          >
                            <ArrowLeft size={12} />
                            <span>Applied</span>
                          </button>
                        )}

                        {activeStage === 'offers' && (
                          <button
                            onClick={() => moveCard(job.id, 'offers', 'interviewing', 'Interviewing')}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '7px 11px',
                              borderRadius: '8px',
                              border: '1px solid rgba(255, 255, 255, 0.22)',
                              backgroundColor: 'rgba(255, 255, 255, 0.08)',
                              color: 'rgba(255, 255, 255, 0.85)',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              backdropFilter: 'blur(8px)',
                              transition: 'all 0.15s ease'
                            }}
                            title="Move back to Interviewing"
                          >
                            <ArrowLeft size={12} />
                            <span>Interviewing</span>
                          </button>
                        )}

                        {/* Center / Fallback spacer when no previous button */}
                        {activeStage === 'saved' && (
                          <span style={{ fontSize: '10.5px', color: 'rgba(255, 255, 255, 0.55)' }}>{job.date}</span>
                        )}

                        {/* NEXT BUTTON (disabled/hidden if in 'offers') */}
                        {activeStage === 'saved' && (
                          <button
                            onClick={() => moveCard(job.id, 'saved', 'applied', 'Applied')}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '7px 13px',
                              borderRadius: '8px',
                              border: '1px solid rgba(255, 255, 255, 0.3)',
                              background: 'linear-gradient(135deg, rgba(26, 83, 207, 0.9) 0%, rgba(37, 99, 235, 0.9) 100%)',
                              color: '#FFFFFF',
                              fontSize: '11.5px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              backdropFilter: 'blur(8px)',
                              boxShadow: '0 4px 16px rgba(26, 83, 207, 0.45)',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <span>Move to Applied</span>
                            <ArrowRight size={12} />
                          </button>
                        )}

                        {activeStage === 'applied' && (
                          <button
                            onClick={() => moveCard(job.id, 'applied', 'interviewing', 'Interviewing')}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '7px 13px',
                              borderRadius: '8px',
                              border: '1px solid rgba(255, 255, 255, 0.3)',
                              background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.9) 0%, rgba(245, 158, 11, 0.9) 100%)',
                              color: '#FFFFFF',
                              fontSize: '11.5px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              backdropFilter: 'blur(8px)',
                              boxShadow: '0 4px 16px rgba(217, 119, 6, 0.45)',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <span>Move to Interview</span>
                            <ArrowRight size={12} />
                          </button>
                        )}

                        {activeStage === 'interviewing' && (
                          <button
                            onClick={() => moveCard(job.id, 'interviewing', 'offers', 'Offers')}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '7px 13px',
                              borderRadius: '8px',
                              border: '1px solid rgba(255, 255, 255, 0.3)',
                              background: 'linear-gradient(135deg, rgba(22, 163, 74, 0.9) 0%, rgba(34, 197, 94, 0.9) 100%)',
                              color: '#FFFFFF',
                              fontSize: '11.5px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              backdropFilter: 'blur(8px)',
                              boxShadow: '0 4px 16px rgba(22, 163, 74, 0.45)',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <span>Move to Offer 🎉</span>
                            <ArrowRight size={12} />
                          </button>
                        )}

                        {activeStage === 'offers' && (
                          <button
                            onClick={() => showToast(`Congratulations! Accepted offer for ${job.title} at ${job.company}`)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '7px 13px',
                              borderRadius: '8px',
                              border: '1px solid rgba(255, 255, 255, 0.4)',
                              background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.95) 0%, rgba(16, 185, 129, 0.95) 100%)',
                              color: '#FFFFFF',
                              fontSize: '11.5px',
                              fontWeight: 800,
                              cursor: 'pointer',
                              backdropFilter: 'blur(8px)',
                              boxShadow: '0 4px 18px rgba(16, 185, 129, 0.5)',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <span>Accept Offer 🎉</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: ROLE-TAILORED RESUMES VAULT
          - Container showing all resumes tailored for different job roles
          ========================================================================= */}
      <section>
        
        {/* Section Header */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1A53CF' }}>
              Section 2
            </span>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>•</span>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#090C15', margin: 0 }}>
              Role-Tailored Resumes Vault
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              {TAILORED_RESUMES.length} targeted versions generated
            </span>
          </div>
        </div>

        {/* Main Resumes Container */}
        <div 
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.95)',
            padding: '24px',
            boxShadow: '0 8px 32px rgba(15, 23, 42, 0.05), inset 0 1px 2px #FFFFFF'
          }}
        >
          {/* Subtitle / Vault Info Bar */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              paddingBottom: '16px', 
              marginBottom: '20px', 
              borderBottom: '1px solid #E2E8F0',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div>
              <p style={{ fontSize: '13px', color: '#475569', margin: 0 }}>
                Every resume is dynamically compiled from your verified master profile, incorporating ATS keywords and metrics specific to each target employer.
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  backgroundColor: '#F8FAFC', 
                  padding: '5px 12px', 
                  borderRadius: '999px',
                  border: '1px solid #E2E8F0',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: '#1A53CF'
                }}
              >
                <Sparkles size={13} color="#1A53CF" />
                <span>Zero-Hallucination Verified</span>
              </div>
            </div>
          </div>

          {/* Resumes Grid */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', 
              gap: '18px' 
            }}
          >
            {TAILORED_RESUMES.map((res) => (
              <div 
                key={res.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '18px',
                  border: '1.5px solid #E2E8F0',
                  padding: '20px',
                  boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 28px rgba(15, 23, 42, 0.08)';
                  e.currentTarget.style.borderColor = '#BFDBFE';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(15, 23, 42, 0.04)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                }}
              >
                {/* Resume Header */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div>
                      <span 
                        style={{ 
                          fontSize: '11px', 
                          fontWeight: 800, 
                          color: '#1A53CF', 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.06em' 
                        }}
                      >
                        Tailored for {res.company}
                      </span>
                      <h4 style={{ fontSize: '16px', fontWeight: 900, color: '#090C15', margin: '2px 0 0 0' }}>
                        {res.targetRole}
                      </h4>
                    </div>

                    <div 
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'flex-end',
                        gap: '2px'
                      }}
                    >
                      <span 
                        style={{ 
                          fontSize: '12px', 
                          fontWeight: 900, 
                          color: '#059669', 
                          backgroundColor: '#ECFDF5', 
                          padding: '3px 8px', 
                          borderRadius: '6px',
                          border: '1px solid #A7F3D0'
                        }}
                      >
                        {res.matchScore}% ATS
                      </span>
                      <span style={{ fontSize: '10px', color: '#94A3B8' }}>{res.updatedAt}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.45, margin: '0 0 12px 0' }}>
                    {res.summary}
                  </p>

                  {/* Matched Keywords Tags */}
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Keywords Injected:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {res.keywords.map((kw, kwIdx) => (
                        <span 
                          key={kwIdx}
                          style={{
                            fontSize: '10.5px',
                            fontWeight: 600,
                            backgroundColor: '#EFF6FF',
                            color: '#1A53CF',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            border: '1px solid #BFDBFE'
                          }}
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sample Tailored Bullet Point */}
                  <div 
                    style={{ 
                      backgroundColor: '#F8FAFC', 
                      borderRadius: '10px', 
                      padding: '10px 12px', 
                      border: '1px solid #E2E8F0',
                      fontSize: '11px',
                      color: '#334155',
                      lineHeight: 1.45
                    }}
                  >
                    <span style={{ fontWeight: 700, color: '#090C15' }}>Featured Bullet: </span>
                    "{res.bullets[0]}"
                  </div>
                </div>

                {/* Resume Card Action Buttons */}
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    paddingTop: '12px', 
                    borderTop: '1px solid #F1F5F9',
                    gap: '8px'
                  }}
                >
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                    {res.template} · {res.pages} Pages
                  </span>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => setPreviewResume(res)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        backgroundColor: '#F1F5F9',
                        color: '#090C15',
                        border: '1px solid #E2E8F0',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'background 0.15s ease'
                      }}
                      title="Preview this tailored resume"
                    >
                      <Eye size={13} />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => showToast(`Downloaded PDF for ${res.company} (${res.targetRole})`)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        backgroundColor: '#1A53CF',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(26, 83, 207, 0.25)'
                      }}
                    >
                      <Download size={13} />
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* =========================================================================
          RESUME PREVIEW MODAL
          ========================================================================= */}
      {previewResume && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(9, 12, 21, 0.75)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setPreviewResume(null)}
        >
          <div 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '780px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 24px 70px rgba(0, 0, 0, 0.4)',
              padding: '32px',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1.5px solid #E2E8F0', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={18} color="#1A53CF" />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#090C15', margin: 0 }}>
                    {previewResume.targetRole} — {previewResume.company}
                  </h3>
                  <span style={{ fontSize: '11.5px', color: '#64748B' }}>
                    {previewResume.template} · {previewResume.matchScore}% ATS Alignment
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => {
                    showToast(`Exported ${previewResume.company} resume PDF`);
                    setPreviewResume(null);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    backgroundColor: '#1A53CF',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </button>

                <button
                  onClick={() => setPreviewResume(null)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#F1F5F9',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X size={16} color="#475569" />
                </button>
              </div>
            </div>

            {/* Document Sheet Simulation */}
            <div 
              style={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #CBD5E1', 
                borderRadius: '12px', 
                padding: '28px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}
            >
              {/* Candidate Info Header */}
              <div style={{ textAlign: 'center', borderBottom: '2px solid #090C15', paddingBottom: '14px', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#090C15', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>
                  ALEXANDER WRIGHT
                </h2>
                <p style={{ fontSize: '11.5px', color: '#475569', margin: '0 0 6px 0', fontWeight: 600 }}>
                  {previewResume.targetRole} · Sydney, NSW, Australia · alexander.wright@jobgen.ai · +61 400 123 456
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', fontSize: '11px', color: '#1A53CF', fontWeight: 700 }}>
                  <span>linkedin.com/in/alexander-wright</span>
                  <span>•</span>
                  <span>github.com/alexwright</span>
                </div>
              </div>

              {/* Executive Summary */}
              <div style={{ marginBottom: '18px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#1A53CF', letterSpacing: '0.08em', margin: '0 0 6px 0' }}>
                  Professional Profile
                </h4>
                <p style={{ fontSize: '12px', color: '#334155', lineHeight: 1.5, margin: 0 }}>
                  {previewResume.summary} Proven track record across tier-1 software engineering ecosystems with demonstrable business outcomes, zero-hallucination metric validation, and cross-functional leadership.
                </p>
              </div>

              {/* Tailored Experience Highlights */}
              <div style={{ marginBottom: '18px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#1A53CF', letterSpacing: '0.08em', margin: '0 0 8px 0' }}>
                  Targeted Experience & Quantified Impact (For {previewResume.company})
                </h4>

                <div style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, color: '#090C15' }}>
                    <span>Principal Staff Lead — FinTech Scaler</span>
                    <span>2022 – Present</span>
                  </div>
                  <ul style={{ margin: '6px 0 0 0', paddingLeft: '18px', fontSize: '11.5px', color: '#334155', lineHeight: 1.55 }}>
                    {previewResume.bullets.map((b, bIdx) => (
                      <li key={bIdx} style={{ marginBottom: '4px' }}>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tailored Skills Checklist */}
              <div>
                <h4 style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#1A53CF', letterSpacing: '0.08em', margin: '0 0 6px 0' }}>
                  Verified ATS Skills & Competencies
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {previewResume.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      style={{ 
                        fontSize: '11px', 
                        fontWeight: 700, 
                        backgroundColor: '#F1F5F9', 
                        color: '#090C15', 
                        padding: '3px 8px', 
                        borderRadius: '4px' 
                      }}
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Add Job Modal Pop-Up */}
      <AddJobModal 
        isOpen={showAddJobModal} 
        onClose={() => setShowAddJobModal(false)} 
        onAddJob={handleAddNewJob} 
      />

    </div>
  );
}
