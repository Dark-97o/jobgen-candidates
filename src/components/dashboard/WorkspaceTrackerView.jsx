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
      // Color tones styled to reflect the reference image's layered card aesthetic
      bgCard: '#C8D2DC', // Lightest slate / blue-gray (active reference color)
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
      bgCard: '#9CA3AF', // Medium gray
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
      bgCard: '#E2E8F0', // Lighter off-white/gray
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
      bgCard: '#64748B', // Darker gray
      badgeColor: '#16A34A',
      badgeBg: '#DCFCE7',
      description: 'Secured formal offer packages, equity equity breakdowns, and decision deadlines.'
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
          {/* Left Column: 4 Stacked Horizontal Tab Cards with Rounded Left Edges */}
          <div 
            style={{ 
              width: '240px', 
              flexShrink: 0, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '10px',
              zIndex: 10,
              paddingRight: '0px'
            }}
          >
            {STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isSelected = activeStage === stage.id;

              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderTopLeftRadius: '22px',
                    borderBottomLeftRadius: '22px',
                    borderTopRightRadius: isSelected ? '0px' : '14px',
                    borderBottomRightRadius: isSelected ? '0px' : '14px',
                    backgroundColor: isSelected 
                      ? '#CBD5E1' // Matches the light blue-gray tone of the connected right canvas in the reference image
                      : stage.bgCard,
                    color: isSelected ? '#090C15' : (stage.id === 'offers' ? '#FFFFFF' : '#1E293B'),
                    border: 'none',
                    borderRight: isSelected ? 'none' : '1px solid rgba(0, 0, 0, 0.05)',
                    cursor: 'pointer',
                    position: 'relative',
                    textAlign: 'left',
                    boxShadow: isSelected 
                      ? '-4px 6px 20px rgba(15, 23, 42, 0.12)' 
                      : '0 2px 8px rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isSelected ? 'translateX(2px)' : 'translateX(0)',
                    zIndex: isSelected ? 15 : 5,
                    minHeight: '68px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.transform = 'translateX(-3px)';
                      e.currentTarget.style.filter = 'brightness(1.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.filter = 'none';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div 
                      style={{ 
                        width: '32px', 
                        height: '32px', 
                        borderRadius: '10px', 
                        backgroundColor: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        boxShadow: isSelected ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none'
                      }}
                    >
                      <Icon size={16} color={isSelected ? '#1A53CF' : '#0F172A'} strokeWidth={2.4} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 800, lineHeight: 1.2 }}>
                        {stage.label}
                      </div>
                      <div style={{ fontSize: '10.5px', opacity: 0.75, marginTop: '2px', fontWeight: 600 }}>
                        Stage {idx + 1}
                      </div>
                    </div>
                  </div>

                  {/* Count Pill */}
                  <span 
                    style={{ 
                      fontSize: '12px', 
                      fontWeight: 800, 
                      padding: '3px 9px', 
                      borderRadius: '999px',
                      backgroundColor: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)',
                      color: isSelected ? '#1A53CF' : '#0F172A',
                      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)'
                    }}
                  >
                    {stage.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Main Container: Seamlessly connects to the active left card (exact silhouette as attached) */}
          <div 
            style={{ 
              flex: 1, 
              backgroundColor: '#CBD5E1', // Connected body matching reference image
              borderTopRightRadius: '28px',
              borderBottomRightRadius: '28px',
              borderBottomLeftRadius: '28px',
              borderTopLeftRadius: activeStage === 'saved' ? '0px' : '18px', // Forms seamless inverted L when top is selected
              padding: '24px 28px',
              boxShadow: '0 16px 40px -8px rgba(15, 23, 42, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.95)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '380px',
              position: 'relative',
              zIndex: 8,
              transition: 'border-radius 0.2s ease'
            }}
          >
            {/* Header inside the selected stage container */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                marginBottom: '18px', 
                paddingBottom: '14px', 
                borderBottom: '1.5px solid rgba(255, 255, 255, 0.45)',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#090C15', margin: 0 }}>
                    {currentStageInfo.fullLabel}
                  </h3>
                  <span 
                    style={{ 
                      fontSize: '11.5px', 
                      fontWeight: 800, 
                      padding: '2px 8px', 
                      borderRadius: '999px',
                      backgroundColor: currentStageInfo.badgeBg,
                      color: currentStageInfo.badgeColor
                    }}
                  >
                    {activeJobs.length} active
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#475569', margin: '3px 0 0 0' }}>
                  {currentStageInfo.description}
                </p>
              </div>

              {/* Search filter for this stage */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.75)',
                  padding: '7px 14px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
              >
                <Search size={14} color="#64748B" />
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
                    color: '#090C15',
                    width: '160px'
                  }}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <X size={13} color="#64748B" />
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
                  textAlign: 'center'
                }}
              >
                <div 
                  style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '50%', 
                    backgroundColor: 'rgba(255, 255, 255, 0.6)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '12px'
                  }}
                >
                  <Briefcase size={22} color="#64748B" />
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#090C15', margin: '0 0 6px 0' }}>
                  No roles currently in {currentStageInfo.label}
                </h4>
                <p style={{ fontSize: '12.5px', color: '#475569', maxWidth: '340px', margin: '0 0 16px 0' }}>
                  Move opportunities here from other stages or explore verified openings.
                </p>
                {onNavigateToJobSearch && (
                  <button
                    onClick={onNavigateToJobSearch}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      backgroundColor: '#090C15',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Find Roles in Job Hunt →
                  </button>
                )}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px' }}>
                {filteredJobs.map((job) => {
                  return (
                    <div 
                      key={job.id}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.92)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '18px',
                        border: '1.5px solid rgba(255, 255, 255, 0.98)',
                        padding: '18px',
                        boxShadow: '0 6px 20px rgba(15, 23, 42, 0.06), inset 0 1px 2px #FFFFFF',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '12px',
                        transition: 'transform 0.18s ease, box-shadow 0.18s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 10px 28px rgba(15, 23, 42, 0.1), inset 0 1px 2px #FFFFFF';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(15, 23, 42, 0.06), inset 0 1px 2px #FFFFFF';
                      }}
                    >
                      {/* Card Header: Company, Source & ATS Score */}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span 
                            style={{ 
                              fontSize: '12px', 
                              fontWeight: 900, 
                              color: '#1A53CF', 
                              textTransform: 'uppercase', 
                              letterSpacing: '0.04em' 
                            }}
                          >
                            {job.company}
                          </span>
                          <span 
                            style={{ 
                              fontSize: '10.5px', 
                              fontWeight: 800, 
                              color: '#059669', 
                              backgroundColor: '#ECFDF5', 
                              padding: '2px 8px', 
                              borderRadius: '6px',
                              border: '1px solid #A7F3D0'
                            }}
                          >
                            {job.score}% ATS Match
                          </span>
                        </div>

                        {/* Title */}
                        <h4 style={{ fontSize: '14.5px', fontWeight: 800, color: '#090C15', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                          {job.title}
                        </h4>

                        {/* Salary & Location */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: '#64748B', marginBottom: '8px', flexWrap: 'wrap' }}>
                          <span>{job.salary}</span>
                          <span>•</span>
                          <span>{job.location}</span>
                        </div>

                        {/* Stage Specific Badges */}
                        {job.status && (
                          <div style={{ backgroundColor: '#EFF6FF', color: '#1A53CF', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, marginBottom: '8px' }}>
                            ℹ️ {job.status}
                          </div>
                        )}

                        {job.nextEvent && (
                          <div style={{ backgroundColor: '#FEF3C7', color: '#92400E', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 700, marginBottom: '8px' }}>
                            🗓️ {job.nextEvent}
                          </div>
                        )}

                        {job.expiry && (
                          <div style={{ backgroundColor: '#DCFCE7', color: '#15803D', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 800, marginBottom: '8px' }}>
                            🎉 {job.expiry}
                          </div>
                        )}

                        {/* Tag Chips */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                          {job.tags.slice(0, 3).map((tag, tIdx) => (
                            <span 
                              key={tIdx} 
                              style={{ 
                                fontSize: '10px', 
                                fontWeight: 600, 
                                backgroundColor: '#F1F5F9', 
                                color: '#475569', 
                                padding: '2px 7px', 
                                borderRadius: '4px' 
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer: Previous & Next Stage Move Buttons */}
                      <div 
                        style={{ 
                          paddingTop: '10px', 
                          borderTop: '1px solid #E2E8F0', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          gap: '8px' 
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
                              padding: '6px 10px',
                              borderRadius: '8px',
                              border: '1px solid #CBD5E1',
                              backgroundColor: '#FFFFFF',
                              color: '#475569',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              transition: 'background 0.15s ease'
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
                              padding: '6px 10px',
                              borderRadius: '8px',
                              border: '1px solid #CBD5E1',
                              backgroundColor: '#FFFFFF',
                              color: '#475569',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer'
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
                              padding: '6px 10px',
                              borderRadius: '8px',
                              border: '1px solid #CBD5E1',
                              backgroundColor: '#FFFFFF',
                              color: '#475569',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                            title="Move back to Interviewing"
                          >
                            <ArrowLeft size={12} />
                            <span>Interviewing</span>
                          </button>
                        )}

                        {/* Center / Fallback spacer when no previous button */}
                        {activeStage === 'saved' && (
                          <span style={{ fontSize: '10.5px', color: '#94A3B8' }}>{job.date}</span>
                        )}

                        {/* NEXT BUTTON (disabled/hidden if in 'offers') */}
                        {activeStage === 'saved' && (
                          <button
                            onClick={() => moveCard(job.id, 'saved', 'applied', 'Applied')}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '6px 12px',
                              borderRadius: '8px',
                              border: 'none',
                              backgroundColor: '#1A53CF',
                              color: '#FFFFFF',
                              fontSize: '11.5px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              boxShadow: '0 2px 8px rgba(26, 83, 207, 0.25)'
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
                              padding: '6px 12px',
                              borderRadius: '8px',
                              border: 'none',
                              backgroundColor: '#D97706',
                              color: '#FFFFFF',
                              fontSize: '11.5px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              boxShadow: '0 2px 8px rgba(217, 119, 6, 0.25)'
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
                              padding: '6px 12px',
                              borderRadius: '8px',
                              border: 'none',
                              backgroundColor: '#16A34A',
                              color: '#FFFFFF',
                              fontSize: '11.5px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              boxShadow: '0 2px 8px rgba(22, 163, 74, 0.25)'
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
                              padding: '6px 12px',
                              borderRadius: '8px',
                              border: 'none',
                              backgroundColor: '#059669',
                              color: '#FFFFFF',
                              fontSize: '11.5px',
                              fontWeight: 800,
                              cursor: 'pointer',
                              boxShadow: '0 2px 8px rgba(5, 150, 105, 0.3)'
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
