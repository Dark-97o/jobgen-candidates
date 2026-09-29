import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Copy, 
  Eye, 
  Edit3,
  Sliders,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Plus, 
  Trash2, 
  Award, 
  Check, 
  Building2, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  RefreshCw, 
  Search, 
  Zap, 
  Briefcase, 
  GraduationCap, 
  FolderGit2, 
  Globe, 
  Mail, 
  Phone, 
  User,
  X
} from 'lucide-react';

// Resume Templates with high-res visual mockups
const RESUME_TEMPLATES = [
  {
    id: 'jake',
    name: 'Classic ATS',
    subtitle: 'Standard Single-Column',
    description: 'Gold-standard ATS-friendly format preferred by Fortune 500 recruiters.',
    image: '/templates/template_jake.jpg',
    font: 'serif',
    accentColor: '#171717',
    badge: '98% ATS'
  },
  {
    id: 'consultantpolished',
    name: 'Advisory',
    subtitle: 'Executive Consulting',
    description: 'Polished layout with navy headings and crisp consultant-style section rules.',
    image: '/templates/template_advisory.jpg',
    font: 'serif',
    accentColor: '#1E3A8A',
    badge: 'Executive'
  },
  {
    id: 'architectsportfolio',
    name: 'Portfolio',
    subtitle: 'Architectural Tech',
    description: 'Airy architectural resume with tech stack pills and project impact.',
    image: '/templates/template_portfolio.jpg',
    font: 'sans',
    accentColor: '#334155',
    badge: 'Tech Lead'
  },
  {
    id: 'londonbureau',
    name: 'Bureau',
    subtitle: 'Editorial Typography',
    description: 'Swiss-inspired editorial resume with refined typographic hierarchy.',
    image: '/templates/template_bureau.jpg',
    font: 'serif',
    accentColor: '#2563EB',
    badge: 'Editorial'
  },
  {
    id: 'operationsprecision',
    name: 'Precision',
    subtitle: 'DevOps & Systems',
    description: 'High-density layout for engineering, DevOps, and systems operations.',
    image: '/templates/template_precision.jpg',
    font: 'sans',
    accentColor: '#0D9488',
    badge: 'DevOps'
  },
  {
    id: 'nordicminimal',
    name: 'Minimalist',
    subtitle: 'Nordic Clean Modern',
    description: 'Ample whitespace, subtle dividers, and clean Scandinavian aesthetics.',
    image: '/templates/template_minimal.jpg',
    font: 'sans',
    accentColor: '#475569',
    badge: 'Minimalist'
  }
];

// Initial Resume Data (Alexander Wright, Verified Master Profile)
const INITIAL_RESUME_DATA = {
  documentName: 'Alexander Wright - Staff Architect Resume',
  template: 'jake',
  fontFamily: 'Noto Serif, Georgia, serif',
  spacing: 'standard', // compact | standard | relaxed
  accentColor: '#171717',
  
  personalDetails: {
    fullName: 'Alexander Wright',
    headline: 'Senior Staff Frontend Architect & Product Engineering Lead',
    email: 'alexander.wright@jobgen.ai',
    phone: '+61 400 123 456',
    location: 'Sydney, NSW, Australia',
    linkedin: 'linkedin.com/in/alexander-wright',
    github: 'github.com/alexwright',
    website: 'alexwright.dev'
  },

  targetJob: {
    company: 'Canva',
    title: 'Lead Product Manager (Creator Ecosystem)',
    matchScore: 96,
    keywords: ['API Adoption', 'Sprint Restructuring', 'Product Strategy', 'Design System Governance', 'Cross-Pod Scaling', 'Micro-Frontends']
  },

  summary: 'Staff Frontend Architect and Engineering Lead with 9+ years scaling design systems, micro-frontends, and distributed creator tools. Spearheaded core web platforms powering 14M+ monthly active creators, accelerating build performance by 48% and driving $3.2M incremental enterprise ARR through strategic API integrations.',

  experience: [
    {
      id: 'exp-1',
      title: 'Staff Frontend Architect (Core Platform)',
      company: 'Canva',
      location: 'Sydney, Australia',
      startDate: '2023',
      endDate: 'Present',
      bullets: [
        'Architected Next.js and Module Federation infrastructure used by 85+ product teams, eliminating duplicated code and reducing bundle sizes by 38%.',
        'Led technical discovery for Creator Ecosystem APIs, driving a 180% quarter-over-quarter surge in third-party developer integrations.',
        'Mentored 14 senior engineers across distributed squads, implementing rigorous automated bundle size gating in CI/CD with 99.98% pipeline uptime.'
      ]
    },
    {
      id: 'exp-2',
      title: 'Lead Full-Stack Systems Engineer',
      company: 'Afterpay',
      location: 'Sydney, Australia',
      startDate: '2021',
      endDate: '2023',
      bullets: [
        'Designed high-throughput merchant checkout SDK processing over $450M AUD in annual transaction volume with zero critical tier-1 outages.',
        'Spearheaded transition from monolith to event-driven Kafka microservices, cutting P99 latency from 320ms to 42ms under peak Cyber Week traffic.',
        'Implemented end-to-end telemetry and OpenTelemetry distributed tracing, reducing Mean Time to Resolution (MTTR) by 64%.'
      ]
    },
    {
      id: 'exp-3',
      title: 'Senior Software Engineer',
      company: 'Atlassian',
      location: 'Sydney, Australia',
      startDate: '2018',
      endDate: '2021',
      bullets: [
        'Developed Jira Cloud collaborative rich-text canvas with operational transform state synchronization, serving 250k+ daily concurrent users.',
        'Championed accessibility initiative elevating WCAG 2.1 compliance to AA level across 100% of core dialog and navigation surfaces.',
        'Engineered reusable design token library in TypeScript adopted by 12 cross-functional product groups across APAC.'
      ]
    }
  ],

  skills: {
    languages: ['TypeScript', 'JavaScript (ESNext)', 'Python', 'Go', 'SQL', 'HTML5/CSS3'],
    frameworks: ['React 19', 'Next.js 15', 'Node.js', 'TailwindCSS', 'GraphQL', 'Redux Toolkit'],
    architecture: ['Micro-Frontends', 'Distributed Systems', 'Design Systems', 'Module Federation', 'RESTful APIs'],
    cloudAndTools: ['AWS (ECS, Lambda)', 'Docker', 'Kubernetes', 'Kafka', 'PostgreSQL', 'Terraform', 'CI/CD Pipelines']
  },

  education: [
    {
      id: 'edu-1',
      institution: 'University of New South Wales (UNSW)',
      degree: 'Bachelor of Science in Computer Science',
      graduationDate: '2018',
      honors: 'First Class Honours | Dean’s Honour List'
    }
  ]
};

export default function ResumeStudioView({ onBackToDocuments }) {
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = sessionStorage.getItem('jobgen_active_resume');
      return saved ? JSON.parse(saved) : INITIAL_RESUME_DATA;
    } catch {
      return INITIAL_RESUME_DATA;
    }
  });

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('frameworks');

  const carouselRef = useRef(null);

  // Section Open/Collapse States (Independently toggled, no squishing)
  const [openSections, setOpenSections] = useState({
    details: true,
    summary: true,
    experience: true,
    skills: true,
    education: true
  });

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Auto-save changes into sessionStorage
  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem('jobgen_active_resume', JSON.stringify(resumeData));
      } catch (e) {}
      setIsSaving(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [resumeData]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Mutators for nested fields
  const updatePersonal = (field, val) => {
    setResumeData(prev => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, [field]: val }
    }));
  };

  const updateSummary = (val) => {
    setResumeData(prev => ({ ...prev, summary: val }));
  };

  const updateExperienceBullet = (expIndex, bulletIndex, val) => {
    setResumeData(prev => {
      const expList = [...prev.experience];
      const bullets = [...expList[expIndex].bullets];
      bullets[bulletIndex] = val;
      expList[expIndex] = { ...expList[expIndex], bullets };
      return { ...prev, experience: expList };
    });
  };

  const enhanceBulletXYZ = (expIndex, bulletIndex) => {
    const raw = resumeData.experience[expIndex].bullets[bulletIndex];
    let enhanced = raw;
    if (!raw.includes('%') && !raw.includes('$')) {
      enhanced = raw + ' — resulting in a 42% increase in developer throughput and $1.4M saved in cloud infrastructure.';
    } else {
      enhanced = 'Accomplished ' + raw.charAt(0).toLowerCase() + raw.slice(1);
    }
    updateExperienceBullet(expIndex, bulletIndex, enhanced);
    showToast('Applied Google XYZ formula enhancement ✨');
  };

  const handleApplyAISummary = () => {
    updateSummary('Staff Architect & Product Engineering Lead with 9+ years scaling design systems, micro-frontends, and partner APIs. Proven track record growing enterprise API adoption by 180% and decreasing latency by 48% across tier-1 cloud platforms.');
    showToast('Updated professional summary with AI recommendation!');
  };

  const handleExportPDF = () => {
    window.print();
  };

  const addExperienceRole = () => {
    const newRole = {
      id: `exp-${Date.now()}`,
      title: 'Senior Software Engineer',
      company: 'Tech Company',
      location: 'Sydney, Australia',
      startDate: '2024',
      endDate: 'Present',
      bullets: [
        'Engineered high-scale web systems improving end-user conversion by 26% and reducing response latency.'
      ]
    };
    setResumeData(prev => ({
      ...prev,
      experience: [newRole, ...prev.experience]
    }));
    showToast('Added new position to Work Experience');
  };

  const removeExperienceRole = (expIndex) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== expIndex)
    }));
    showToast('Removed role from experience');
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && newSkillInput.trim()) {
      const skill = newSkillInput.trim();
      setResumeData(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          [selectedSkillCategory]: [...(prev.skills[selectedSkillCategory] || []), skill]
        }
      }));
      setNewSkillInput('');
      showToast(`Added ${skill} to skills!`);
    }
  };

  const handleRemoveSkill = (category, skillToRemove) => {
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter(s => s !== skillToRemove)
      }
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)', overflow: 'hidden', backgroundColor: '#F8FAFC' }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div 
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '28px',
            zIndex: 9999,
            backgroundColor: '#090C15',
            color: '#FFFFFF',
            padding: '10px 18px',
            borderRadius: '999px',
            fontSize: '12.5px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.15)',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <CheckCircle2 size={16} color="#34D399" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modern Top Bar: Title Left, Circular ATS Card + Export PDF Right */}
      <header 
        style={{ 
          height: '62px', 
          backgroundColor: '#FFFFFF', 
          borderBottom: '1px solid #E2E8F0', 
          padding: '0 28px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexShrink: 0,
          zIndex: 40
        }}
      >
        {/* Left: Editable Document Title & Saved Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isEditingTitle ? (
                <input 
                  type="text"
                  value={resumeData.documentName}
                  onChange={(e) => setResumeData(prev => ({ ...prev, documentName: e.target.value }))}
                  onBlur={() => setIsEditingTitle(false)}
                  onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                  autoFocus
                  style={{
                    fontSize: '15px',
                    fontWeight: 800,
                    color: '#090C15',
                    border: '1.5px solid #1A53CF',
                    borderRadius: '8px',
                    padding: '3px 10px',
                    outline: 'none',
                    backgroundColor: '#F8FAFC'
                  }}
                />
              ) : (
                <h2 
                  onClick={() => setIsEditingTitle(true)}
                  style={{ 
                    fontSize: '15.5px', 
                    fontWeight: 800, 
                    color: '#090C15', 
                    margin: 0,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7px'
                  }}
                  title="Click to rename document"
                >
                  <span>{resumeData.documentName}</span>
                  <Edit3 size={13} color="#94A3B8" />
                </h2>
              )}

              <span 
                style={{ 
                  fontSize: '11.5px', 
                  color: isSaving ? '#D97706' : '#64748B', 
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: '#F1F5F9',
                  padding: '2px 8px',
                  borderRadius: '999px'
                }}
              >
                {isSaving ? (
                  <>
                    <RefreshCw size={11} className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check size={12} color="#10B981" />
                    <span>Saved</span>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Circular Card showing ATS left next to Export PDF */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          
          {/* Circular Card showing ATS */}
          <div
            title="ATS Readiness Score: 96%"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '2px solid #10B981',
              boxShadow: '0 2px 10px rgba(16, 185, 129, 0.22), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(16, 185, 129, 0.38)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(16, 185, 129, 0.22)';
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#059669', lineHeight: 1 }}>96%</span>
            <span style={{ fontSize: '7.5px', fontWeight: 800, color: '#047857', letterSpacing: '0.04em', lineHeight: 1, marginTop: '1px' }}>ATS</span>
          </div>

          {/* Export PDF Button */}
          <button
            onClick={handleExportPDF}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '8px 18px',
              borderRadius: '10px',
              backgroundColor: '#090C15',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(9, 12, 21, 0.18)',
              transition: 'all 0.18s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1E293B';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#090C15';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Download size={15} />
            <span>Export PDF</span>
          </button>
        </div>
      </header>

      {/* Main Split Body: Left Editor Workspace + Right A4 Paper Canvas */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        
        {/* Left Column: Fixed Width 640px with Dedicated Carousel & Modern Editing Sections */}
        <div 
          style={{ 
            width: '640px', 
            flexShrink: 0, 
            display: 'flex', 
            flexDirection: 'column', 
            backgroundColor: '#FFFFFF', 
            borderRight: '1px solid #E2E8F0',
            overflow: 'hidden'
          }}
        >
          {/* =========================================================================
              CAROUSEL: SHOWCASING DIFFERENT DESIGNS OF RESUMES WITH PREVIEW IMAGES
              ========================================================================= */}
          <div 
            style={{ 
              backgroundColor: '#F8FAFC', 
              borderBottom: '1px solid #E2E8F0', 
              padding: '14px 20px', 
              flexShrink: 0 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '7px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={14} color="#1A53CF" />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#090C15' }}>Resume Designs</span>
                <span style={{ fontSize: '10.5px', fontWeight: 700, backgroundColor: '#EFF6FF', color: '#1A53CF', padding: '1px 7px', borderRadius: '999px', border: '1px solid #BFDBFE' }}>
                  6 Styles
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <button
                  onClick={() => carouselRef.current?.scrollBy({ left: -220, behavior: 'smooth' })}
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '7px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#475569',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                  title="Previous templates"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  onClick={() => carouselRef.current?.scrollBy({ left: 220, behavior: 'smooth' })}
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '7px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#475569',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                  title="Next templates"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>

            {/* Carousel Horizontal Scroll Track */}
            <div
              ref={carouselRef}
              style={{
                display: 'flex',
                gap: '12px',
                overflowX: 'auto',
                paddingBottom: '4px',
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {RESUME_TEMPLATES.map((tpl) => {
                const isSelected = resumeData.template === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => {
                      setResumeData(prev => ({ ...prev, template: tpl.id }));
                      showToast(`Switched layout to ${tpl.name}! ✨`);
                    }}
                    style={{
                      width: '130px',
                      flexShrink: 0,
                      borderRadius: '12px',
                      backgroundColor: '#FFFFFF',
                      border: isSelected ? '2px solid #1A53CF' : '1px solid #E2E8F0',
                      boxShadow: isSelected ? '0 6px 18px rgba(26, 83, 207, 0.22)' : '0 1.5px 5px rgba(15, 23, 42, 0.04)',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      position: 'relative',
                      scrollSnapAlign: 'start',
                      transform: isSelected ? 'translateY(-2px)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = '#93C5FD';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 14px rgba(15, 23, 42, 0.08)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = '#E2E8F0';
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = '0 1.5px 5px rgba(15, 23, 42, 0.04)';
                      }
                    }}
                  >
                    {/* Visual Preview Image */}
                    <div style={{ position: 'relative', height: '144px', overflow: 'hidden', backgroundColor: '#F1F5F9' }}>
                      <img
                        src={tpl.image}
                        alt={tpl.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                      {/* ATS Score Tag */}
                      <span
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          backgroundColor: 'rgba(9, 12, 21, 0.78)',
                          backdropFilter: 'blur(6px)',
                          color: '#FFFFFF',
                          fontSize: '8.5px',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '999px',
                          letterSpacing: '0.02em'
                        }}
                      >
                        {tpl.badge}
                      </span>
                      {isSelected && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '6px',
                            left: '6px',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: '#1A53CF',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(26, 83, 207, 0.4)'
                          }}
                        >
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </div>

                    {/* Card Label */}
                    <div style={{ padding: '7px 9px', backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF' }}>
                      <p style={{ margin: 0, fontSize: '11.5px', fontWeight: 800, color: isSelected ? '#1A53CF' : '#090C15', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {tpl.name}
                      </p>
                      <p style={{ margin: '1px 0 0 0', fontSize: '9.5px', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {tpl.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              MODERN EDITING SECTIONS (INDEPENDENT CARDS — NO EXPANSION DISRUPTION)
              ========================================================================= */}
          <div 
            style={{ 
              flex: 1, 
              minHeight: 0, 
              overflowY: 'auto', 
              padding: '18px 20px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '14px',
              backgroundColor: '#FFFFFF'
            }}
            data-lenis-prevent="true"
          >
            {/* Target Job Quick Banner */}
            <div 
              style={{ 
                flexShrink: 0,
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '12px 16px', 
                borderRadius: '12px', 
                backgroundColor: '#F0FDF4', 
                border: '1px solid #BBF7D0',
                boxShadow: '0 1px 3px rgba(16, 185, 129, 0.06)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building2 size={15} color="#16A34A" />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#166534' }}>Target Opening:</span>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#090C15' }}>Canva · Lead Product Manager</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#15803D', fontWeight: 600 }}>96% Verified Keyword Alignment</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                {['compact', 'standard', 'relaxed'].map(sp => (
                  <button
                    key={sp}
                    onClick={() => setResumeData(prev => ({ ...prev, spacing: sp }))}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: resumeData.spacing === sp ? '1px solid #16A34A' : '1px solid #E2E8F0',
                      backgroundColor: resumeData.spacing === sp ? '#DCFCE7' : '#FFFFFF',
                      color: resumeData.spacing === sp ? '#166534' : '#64748B',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      textTransform: 'capitalize',
                      cursor: 'pointer'
                    }}
                  >
                    {sp}
                  </button>
                ))}
              </div>
            </div>

            {/* Section 1: Personal Details */}
            <div 
              style={{ 
                flexShrink: 0,
                borderRadius: '14px', 
                border: '1px solid #E2E8F0', 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)',
                overflow: 'hidden'
              }}
            >
              <button 
                onClick={() => toggleSection('details')}
                style={{ 
                  width: '100%', 
                  padding: '14px 18px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  border: 'none',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  borderBottom: openSections.details ? '1px solid #F1F5F9' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={15} color="#1A53CF" />
                  </div>
                  <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#090C15' }}>Personal Details</span>
                </div>
                {openSections.details ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
              </button>

              {openSections.details && (
                <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#FFFFFF' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 800, color: '#475569', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Full Name</label>
                      <input 
                        type="text" 
                        value={resumeData.personalDetails.fullName}
                        onChange={(e) => updatePersonal('fullName', e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '9px', border: '1.5px solid #E2E8F0', backgroundColor: '#F8FAFC', fontSize: '13px', color: '#090C15', outline: 'none', boxSizing: 'border-box' }}
                        onFocus={(e) => { e.target.style.borderColor = '#1A53CF'; e.target.style.backgroundColor = '#FFFFFF'; }}
                        onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 800, color: '#475569', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Headline</label>
                      <input 
                        type="text" 
                        value={resumeData.personalDetails.headline}
                        onChange={(e) => updatePersonal('headline', e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '9px', border: '1.5px solid #E2E8F0', backgroundColor: '#F8FAFC', fontSize: '13px', color: '#090C15', outline: 'none', boxSizing: 'border-box' }}
                        onFocus={(e) => { e.target.style.borderColor = '#1A53CF'; e.target.style.backgroundColor = '#FFFFFF'; }}
                        onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 800, color: '#475569', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Email</label>
                      <input 
                        type="email" 
                        value={resumeData.personalDetails.email}
                        onChange={(e) => updatePersonal('email', e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '9px', border: '1.5px solid #E2E8F0', backgroundColor: '#F8FAFC', fontSize: '13px', color: '#090C15', outline: 'none', boxSizing: 'border-box' }}
                        onFocus={(e) => { e.target.style.borderColor = '#1A53CF'; e.target.style.backgroundColor = '#FFFFFF'; }}
                        onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 800, color: '#475569', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Phone</label>
                      <input 
                        type="text" 
                        value={resumeData.personalDetails.phone}
                        onChange={(e) => updatePersonal('phone', e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '9px', border: '1.5px solid #E2E8F0', backgroundColor: '#F8FAFC', fontSize: '13px', color: '#090C15', outline: 'none', boxSizing: 'border-box' }}
                        onFocus={(e) => { e.target.style.borderColor = '#1A53CF'; e.target.style.backgroundColor = '#FFFFFF'; }}
                        onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 800, color: '#475569', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Location</label>
                      <input 
                        type="text" 
                        value={resumeData.personalDetails.location}
                        onChange={(e) => updatePersonal('location', e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '9px', border: '1.5px solid #E2E8F0', backgroundColor: '#F8FAFC', fontSize: '13px', color: '#090C15', outline: 'none', boxSizing: 'border-box' }}
                        onFocus={(e) => { e.target.style.borderColor = '#1A53CF'; e.target.style.backgroundColor = '#FFFFFF'; }}
                        onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 800, color: '#475569', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>LinkedIn</label>
                      <input 
                        type="text" 
                        value={resumeData.personalDetails.linkedin}
                        onChange={(e) => updatePersonal('linkedin', e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '9px', border: '1.5px solid #E2E8F0', backgroundColor: '#F8FAFC', fontSize: '13px', color: '#090C15', outline: 'none', boxSizing: 'border-box' }}
                        onFocus={(e) => { e.target.style.borderColor = '#1A53CF'; e.target.style.backgroundColor = '#FFFFFF'; }}
                        onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 2: Professional Summary */}
            <div 
              style={{ 
                flexShrink: 0,
                borderRadius: '14px', 
                border: '1px solid #E2E8F0', 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)',
                overflow: 'hidden'
              }}
            >
              <button 
                onClick={() => toggleSection('summary')}
                style={{ 
                  width: '100%', 
                  padding: '14px 18px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  border: 'none',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  borderBottom: openSections.summary ? '1px solid #F1F5F9' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={15} color="#1A53CF" />
                  </div>
                  <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#090C15' }}>Professional Summary</span>
                </div>
                {openSections.summary ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
              </button>

              {openSections.summary && (
                <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#FFFFFF' }}>
                  <textarea 
                    value={resumeData.summary}
                    onChange={(e) => updateSummary(e.target.value)}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid #E2E8F0',
                      backgroundColor: '#F8FAFC',
                      fontSize: '13px',
                      lineHeight: 1.6,
                      color: '#090C15',
                      outline: 'none',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#1A53CF'; e.target.style.backgroundColor = '#FFFFFF'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}
                  />

                  {/* AI Quick Enhancers */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <button
                      onClick={handleApplyAISummary}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        backgroundColor: '#EFF6FF',
                        color: '#1A53CF',
                        border: '1px solid #BFDBFE',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DBEAFE'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#EFF6FF'}
                    >
                      <Sparkles size={12} />
                      <span>Rewrite for Impact</span>
                    </button>
                    <button
                      onClick={() => updateSummary(resumeData.summary.slice(0, 240) + '...')}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        backgroundColor: '#F8FAFC',
                        color: '#475569',
                        border: '1px solid #E2E8F0',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Make Concise
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Work Experience (Completely Isolated & Expandable with Zero Layout Disruption) */}
            <div 
              style={{ 
                flexShrink: 0,
                borderRadius: '14px', 
                border: '1px solid #E2E8F0', 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)',
                overflow: 'hidden'
              }}
            >
              <button 
                onClick={() => toggleSection('experience')}
                style={{ 
                  width: '100%', 
                  padding: '14px 18px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  border: 'none',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  borderBottom: openSections.experience ? '1px solid #F1F5F9' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Briefcase size={15} color="#1A53CF" />
                  </div>
                  <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#090C15' }}>
                    Work Experience ({resumeData.experience.length})
                  </span>
                </div>
                {openSections.experience ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
              </button>

              {openSections.experience && (
                <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: '#FFFFFF' }}>
                  {resumeData.experience.map((exp, expIdx) => (
                    <div 
                      key={exp.id}
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        border: '1px solid #E2E8F0',
                        backgroundColor: '#F8FAFC',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <input
                            type="text"
                            value={exp.title}
                            onChange={(e) => {
                              const updated = [...resumeData.experience];
                              updated[expIdx] = { ...updated[expIdx], title: e.target.value };
                              setResumeData(prev => ({ ...prev, experience: updated }));
                            }}
                            style={{ 
                              fontSize: '14px', 
                              fontWeight: 800, 
                              color: '#090C15', 
                              border: '1px solid transparent', 
                              backgroundColor: 'transparent',
                              borderRadius: '6px',
                              padding: '2px 4px',
                              width: '280px',
                              outline: 'none'
                            }}
                            onFocus={(e) => e.target.style.border = '1px solid #CBD5E1'}
                            onBlur={(e) => e.target.style.border = '1px solid transparent'}
                          />
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => {
                                const updated = [...resumeData.experience];
                                updated[expIdx] = { ...updated[expIdx], company: e.target.value };
                                setResumeData(prev => ({ ...prev, experience: updated }));
                              }}
                              style={{ 
                                fontSize: '12.5px', 
                                fontWeight: 700, 
                                color: '#1A53CF', 
                                border: '1px solid transparent', 
                                backgroundColor: 'transparent',
                                borderRadius: '6px',
                                padding: '1px 4px',
                                width: '140px',
                                outline: 'none'
                              }}
                              onFocus={(e) => e.target.style.border = '1px solid #CBD5E1'}
                              onBlur={(e) => e.target.style.border = '1px solid transparent'}
                            />
                            <span style={{ fontSize: '11px', color: '#94A3B8' }}>•</span>
                            <span style={{ fontSize: '11.5px', color: '#64748B' }}>{exp.location}</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, backgroundColor: '#FFFFFF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                            {exp.startDate} - {exp.endDate}
                          </span>
                          {resumeData.experience.length > 1 && (
                            <button
                              onClick={() => removeExperienceRole(expIdx)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#94A3B8',
                                padding: '4px',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.color = '#EF4444'; e.currentTarget.style.backgroundColor = '#FEE2E2'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                              title="Delete position"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Quantified Bullets List */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Quantified Achievement Bullets:
                        </span>
                        {exp.bullets.map((b, bIdx) => (
                          <div key={bIdx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#1A53CF', marginTop: '14px', flexShrink: 0 }} />
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <textarea
                                value={b}
                                onChange={(e) => updateExperienceBullet(expIdx, bIdx, e.target.value)}
                                rows={2}
                                style={{
                                  width: '100%',
                                  padding: '10px 12px',
                                  borderRadius: '9px',
                                  border: '1.5px solid #E2E8F0',
                                  backgroundColor: '#FFFFFF',
                                  fontSize: '12.5px',
                                  lineHeight: 1.5,
                                  color: '#090C15',
                                  outline: 'none',
                                  resize: 'vertical',
                                  boxSizing: 'border-box'
                                }}
                                onFocus={(e) => { e.target.style.borderColor = '#1A53CF'; }}
                                onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; }}
                              />
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <button
                                  onClick={() => enhanceBulletXYZ(expIdx, bIdx)}
                                  title="Enhance with Google XYZ formula"
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    padding: '4px 10px',
                                    borderRadius: '7px',
                                    backgroundColor: '#EFF6FF',
                                    color: '#1A53CF',
                                    border: '1px solid #BFDBFE',
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                  }}
                                >
                                  <Sparkles size={11} />
                                  <span>Google XYZ Formula</span>
                                </button>
                                {exp.bullets.length > 1 && (
                                  <button
                                    onClick={() => {
                                      const newBullets = exp.bullets.filter((_, i) => i !== bIdx);
                                      const updated = [...resumeData.experience];
                                      updated[expIdx] = { ...updated[expIdx], bullets: newBullets };
                                      setResumeData(prev => ({ ...prev, experience: updated }));
                                    }}
                                    title="Remove bullet"
                                    style={{
                                      background: 'none',
                                      border: 'none',
                                      color: '#94A3B8',
                                      cursor: 'pointer',
                                      padding: '4px',
                                      borderRadius: '6px',
                                      display: 'flex',
                                      alignItems: 'center'
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.color = '#EF4444'; e.currentTarget.style.backgroundColor = '#FEE2E2'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Add Bullet Button */}
                        <button
                          onClick={() => {
                            const updated = [...resumeData.experience];
                            updated[expIdx] = {
                              ...updated[expIdx],
                              bullets: [...updated[expIdx].bullets, '']
                            };
                            setResumeData(prev => ({ ...prev, experience: updated }));
                          }}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            border: '1px dashed #CBD5E1',
                            backgroundColor: '#FFFFFF',
                            color: '#1A53CF',
                            fontSize: '11.5px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            width: 'fit-content'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#1A53CF';
                            e.currentTarget.style.backgroundColor = '#EFF6FF';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#CBD5E1';
                            e.currentTarget.style.backgroundColor = '#FFFFFF';
                          }}
                        >
                          <Plus size={13} />
                          <span>Add bullet</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add New Experience Role Button */}
                  <button
                    onClick={addExperienceRole}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '11px 16px',
                      borderRadius: '10px',
                      backgroundColor: '#EFF6FF',
                      color: '#1A53CF',
                      border: '1.5px dashed #93C5FD',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.18s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#DBEAFE';
                      e.currentTarget.style.borderColor = '#1A53CF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#EFF6FF';
                      e.currentTarget.style.borderColor = '#93C5FD';
                    }}
                  >
                    <Plus size={15} />
                    <span>Add Work Experience Role</span>
                  </button>
                </div>
              )}
            </div>

            {/* Section 4: Skills & Competencies */}
            <div 
              style={{ 
                flexShrink: 0,
                borderRadius: '14px', 
                border: '1px solid #E2E8F0', 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)',
                overflow: 'hidden'
              }}
            >
              <button 
                onClick={() => toggleSection('skills')}
                style={{ 
                  width: '100%', 
                  padding: '14px 18px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  border: 'none',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  borderBottom: openSections.skills ? '1px solid #F1F5F9' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sliders size={15} color="#1A53CF" />
                  </div>
                  <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#090C15' }}>Skills & Competencies</span>
                </div>
                {openSections.skills ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
              </button>

              {openSections.skills && (
                <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#FFFFFF' }}>
                  {Object.entries(resumeData.skills).map(([cat, list]) => (
                    <div key={cat}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {cat === 'languages' ? 'Languages & Core' : (cat === 'frameworks' ? 'Frameworks & Frontend' : (cat === 'architecture' ? 'Architecture' : 'Cloud & DevOps'))}:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                        {list.map((s, sIdx) => (
                          <span 
                            key={sIdx}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '4px 10px',
                              borderRadius: '999px',
                              backgroundColor: '#F1F5F9',
                              border: '1px solid #E2E8F0',
                              fontSize: '11.5px',
                              fontWeight: 600,
                              color: '#1E293B'
                            }}
                          >
                            <span>{s}</span>
                            <button
                              onClick={() => handleRemoveSkill(cat, s)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#94A3B8', display: 'flex', alignItems: 'center' }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#EF4444'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Add Skill Input */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    <select
                      value={selectedSkillCategory}
                      onChange={(e) => setSelectedSkillCategory(e.target.value)}
                      style={{ padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #E2E8F0', fontSize: '12px', outline: 'none', backgroundColor: '#F8FAFC' }}
                    >
                      <option value="frameworks">Frameworks</option>
                      <option value="languages">Languages</option>
                      <option value="architecture">Architecture</option>
                      <option value="cloudAndTools">Cloud & DevOps</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Type skill & press Enter..."
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      onKeyDown={handleAddSkill}
                      style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #E2E8F0', fontSize: '12.5px', outline: 'none' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Section 5: Education & Credentials */}
            <div 
              style={{ 
                flexShrink: 0,
                borderRadius: '14px', 
                border: '1px solid #E2E8F0', 
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)',
                overflow: 'hidden',
                marginBottom: '20px'
              }}
            >
              <button 
                onClick={() => toggleSection('education')}
                style={{ 
                  width: '100%', 
                  padding: '14px 18px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  border: 'none',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  borderBottom: openSections.education ? '1px solid #F1F5F9' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <GraduationCap size={15} color="#1A53CF" />
                  </div>
                  <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#090C15' }}>Education & Credentials</span>
                </div>
                {openSections.education ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
              </button>

              {openSections.education && (
                <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#FFFFFF' }}>
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '13px', fontWeight: 800, color: '#090C15' }}>{edu.institution}</span>
                        <span style={{ fontSize: '11px', color: '#94A3B8' }}>{edu.graduationDate}</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#475569', margin: '3px 0 0 0' }}>{edu.degree}</p>
                      <p style={{ fontSize: '11.5px', color: '#059669', margin: '3px 0 0 0', fontWeight: 700 }}>{edu.honors}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: AUTHENTIC A4 PAPER CONTAINER WITH GENEROUS SURROUNDING SPACE
            ========================================================================= */}
        <div 
          style={{ 
            flex: 1, 
            backgroundColor: '#E5E9F0', 
            overflowY: 'auto', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '36px 48px 80px 48px',
            position: 'relative'
          }}
          data-lenis-prevent="true"
        >
          {/* Floating Zoom & Canvas Controls */}
          <div 
            style={{ 
              position: 'sticky', 
              top: '0px', 
              zIndex: 30, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '6px 14px', 
              borderRadius: '999px', 
              backgroundColor: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.08)',
              border: '1px solid rgba(226, 232, 240, 0.95)',
              marginBottom: '24px'
            }}
          >
            <button 
              onClick={() => setZoomLevel(prev => Math.max(70, prev - 10))}
              style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 800, color: '#475569', padding: '0 4px' }}
            >
              -
            </button>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#090C15', minWidth: '40px', textAlign: 'center' }}>
              {zoomLevel}%
            </span>
            <button 
              onClick={() => setZoomLevel(prev => Math.min(140, prev + 10))}
              style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 800, color: '#475569', padding: '0 4px' }}
            >
              +
            </button>
            <span style={{ color: '#CBD5E1' }}>|</span>
            <button 
              onClick={() => setZoomLevel(100)}
              style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 700, color: '#1A53CF' }}
            >
              Fit
            </button>
            <span style={{ color: '#CBD5E1' }}>|</span>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
              Page 1 of 1
            </span>
          </div>

          {/* Authentic Physical A4 Paper Page Container with Space Around It */}
          <div 
            style={{
              width: '794px',
              minHeight: '1123px',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06), 0 20px 40px -15px rgba(15, 23, 42, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)',
              borderRadius: '4px',
              padding: resumeData.spacing === 'compact' ? '44px 50px' : (resumeData.spacing === 'relaxed' ? '68px 68px' : '56px 60px'),
              boxSizing: 'border-box',
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
              fontFamily: resumeData.template === 'architectsportfolio' || resumeData.template === 'operationsprecision' || resumeData.template === 'nordicminimal' ? 'Inter, "Segoe UI", Arial, sans-serif' : '"Noto Serif", Georgia, serif',
              color: '#171717',
              transition: 'transform 0.15s ease',
              margin: '0 auto'
            }}
          >
            {/* Header: Candidate Identity */}
            <div style={{ textAlign: resumeData.template === 'nordicminimal' ? 'left' : 'center', marginBottom: '16px' }}>
              <h1 
                style={{ 
                  fontSize: '24px', 
                  fontWeight: 900, 
                  letterSpacing: resumeData.template === 'nordicminimal' ? '-0.02em' : '0.04em', 
                  textTransform: resumeData.template === 'nordicminimal' ? 'none' : 'uppercase', 
                  color: resumeData.template === 'consultantpolished' ? '#1E3A8A' : (resumeData.template === 'operationsprecision' ? '#0D9488' : (resumeData.template === 'londonbureau' ? '#1E40AF' : '#111827')),
                  margin: '0 0 6px 0' 
                }}
              >
                {resumeData.personalDetails.fullName}
              </h1>

              {/* Contact Line */}
              <div 
                style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  justifyContent: resumeData.template === 'nordicminimal' ? 'flex-start' : 'center', 
                  gap: '6px 12px', 
                  fontSize: '11px', 
                  color: '#475569', 
                  fontWeight: 500 
                }}
              >
                <span>{resumeData.personalDetails.location}</span>
                <span>•</span>
                <span>{resumeData.personalDetails.phone}</span>
                <span>•</span>
                <span style={{ color: '#1A53CF', fontWeight: 600 }}>{resumeData.personalDetails.email}</span>
                <span>•</span>
                <span>{resumeData.personalDetails.linkedin}</span>
                <span>•</span>
                <span>{resumeData.personalDetails.github}</span>
              </div>
            </div>

            {/* Horizontal Keyline Rule */}
            <div 
              style={{ 
                height: '1.5px', 
                backgroundColor: resumeData.template === 'consultantpolished' ? '#1E3A8A' : (resumeData.template === 'operationsprecision' ? '#0D9488' : (resumeData.template === 'nordicminimal' ? '#CBD5E1' : '#171717')), 
                marginBottom: '14px' 
              }} 
            />

            {/* Section: Professional Summary */}
            <div style={{ marginBottom: '16px' }}>
              <h3 
                style={{ 
                  fontSize: '12px', 
                  fontWeight: 800, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.08em', 
                  color: resumeData.template === 'consultantpolished' ? '#1E3A8A' : (resumeData.template === 'operationsprecision' ? '#0D9488' : (resumeData.template === 'nordicminimal' ? '#334155' : '#171717')),
                  borderBottom: '1px solid #E2E8F0',
                  paddingBottom: '3px',
                  marginBottom: '6px'
                }}
              >
                Professional Summary
              </h3>
              <p style={{ fontSize: '11px', lineHeight: 1.5, color: '#334155', margin: 0, textAlign: 'justify' }}>
                {resumeData.summary}
              </p>
            </div>

            {/* Section: Work Experience */}
            <div style={{ marginBottom: '16px' }}>
              <h3 
                style={{ 
                  fontSize: '12px', 
                  fontWeight: 800, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.08em', 
                  color: resumeData.template === 'consultantpolished' ? '#1E3A8A' : (resumeData.template === 'operationsprecision' ? '#0D9488' : (resumeData.template === 'nordicminimal' ? '#334155' : '#171717')),
                  borderBottom: '1px solid #E2E8F0',
                  paddingBottom: '3px',
                  marginBottom: '10px'
                }}
              >
                Work Experience
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {resumeData.experience.map(exp => (
                  <div key={exp.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                      <div>
                        <strong style={{ fontSize: '12.5px', color: '#111827', fontWeight: 800 }}>{exp.company}</strong>
                        <span style={{ fontSize: '11.5px', color: '#475569', fontStyle: 'italic' }}> — {exp.title}</span>
                      </div>
                      <span style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>
                        {exp.startDate} – {exp.endDate} | {exp.location}
                      </span>
                    </div>

                    <ul style={{ margin: '4px 0 0 16px', padding: 0, fontSize: '11px', lineHeight: 1.45, color: '#334155' }}>
                      {exp.bullets.map((b, i) => (
                        <li key={i} style={{ marginBottom: '3px' }}>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Technical Skills */}
            <div style={{ marginBottom: '16px' }}>
              <h3 
                style={{ 
                  fontSize: '12px', 
                  fontWeight: 800, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.08em', 
                  color: resumeData.template === 'consultantpolished' ? '#1E3A8A' : (resumeData.template === 'operationsprecision' ? '#0D9488' : (resumeData.template === 'nordicminimal' ? '#334155' : '#171717')),
                  borderBottom: '1px solid #E2E8F0',
                  paddingBottom: '3px',
                  marginBottom: '8px'
                }}
              >
                Technical Skills & Architecture
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px', color: '#334155', lineHeight: 1.5 }}>
                <div>
                  <strong style={{ color: '#111827' }}>Languages & Core: </strong>
                  <span>{resumeData.skills.languages.join(', ')}</span>
                </div>
                <div>
                  <strong style={{ color: '#111827' }}>Frameworks & Frontend: </strong>
                  <span>{resumeData.skills.frameworks.join(', ')}</span>
                </div>
                <div>
                  <strong style={{ color: '#111827' }}>Architecture & Cloud: </strong>
                  <span>{resumeData.skills.architecture.join(', ')} · {resumeData.skills.cloudAndTools.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Section: Education */}
            <div>
              <h3 
                style={{ 
                  fontSize: '12px', 
                  fontWeight: 800, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.08em', 
                  color: resumeData.template === 'consultantpolished' ? '#1E3A8A' : (resumeData.template === 'operationsprecision' ? '#0D9488' : (resumeData.template === 'nordicminimal' ? '#334155' : '#171717')),
                  borderBottom: '1px solid #E2E8F0',
                  paddingBottom: '3px',
                  marginBottom: '8px'
                }}
              >
                Education
              </h3>

              {resumeData.education.map(edu => (
                <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '11.5px' }}>
                  <div>
                    <strong style={{ color: '#111827' }}>{edu.institution}</strong>
                    <span style={{ color: '#475569' }}> — {edu.degree} ({edu.honors})</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>{edu.graduationDate}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
