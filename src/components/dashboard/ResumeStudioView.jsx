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
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  Building2,
  Calendar,
  MapPin,
  ExternalLink,
  RefreshCw,
  Search,
  MessageSquare,
  Send,
  Zap,
  Layout,
  Type,
  Maximize2,
  Minimize2,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Globe,
  Mail,
  Phone,
  User
} from 'lucide-react';

// Resume Templates matching candidates.jobgen.ai
const RESUME_TEMPLATES = [
  {
    id: 'jake',
    name: 'Classic ATS',
    subtitle: 'ATS single-column',
    description: 'Clean ATS-friendly serif layout. Industry-standard single-column style.',
    font: 'serif',
    accentColor: '#171717'
  },
  {
    id: 'consultantpolished',
    name: 'Advisory',
    subtitle: 'Consulting polish',
    description: 'Polished serif resume with navy headings and crisp consultant-style section rules.',
    font: 'serif',
    accentColor: '#1E3A8A'
  },
  {
    id: 'architectsportfolio',
    name: 'Portfolio',
    subtitle: 'Architectural clarity',
    description: 'Airy architectural resume with precise keylines, restrained typography, and skill cards.',
    font: 'sans',
    accentColor: '#334155'
  },
  {
    id: 'londonbureau',
    name: 'Bureau',
    subtitle: 'Heritage editorial',
    description: 'Traditional editorial resume with serif hierarchy, compact rules, and outlined skill tags.',
    font: 'serif',
    accentColor: '#2563EB'
  },
  {
    id: 'operationsprecision',
    name: 'Precision',
    subtitle: 'Operations focused',
    description: 'Efficient teal-accent layout for operations, systems, and process-focused roles.',
    font: 'sans',
    accentColor: '#0D9488'
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

  summary: 'Staff-level Engineering & Product Architect with 9+ years directing high-throughput distributed systems, modular frontend platforms, and product velocity across APAC tech scale-ups. Spearheaded micro-frontend migrations reducing release turnaround by 35% and scaled enterprise API adoption across 40+ Tier-1 banking partners. Passionate about developer tooling, design token governance, and telemetry-backed user experiences.',

  experience: [
    {
      id: 'exp-1',
      company: 'Atlassian',
      title: 'Senior Staff Frontend Architect',
      location: 'Sydney, Australia',
      startDate: '2022',
      endDate: 'Present',
      ongoing: true,
      bullets: [
        'Spearheaded micro-frontend architecture migration across 14 pods, reducing production release cycle turnaround from 3 weeks to continuous daily deployments.',
        'Architected zero-runtime CSS design tokens and automated bundle analyzer tooling, lowering Largest Contentful Paint (LCP) by 48% across Jira Cloud core views.',
        'Authored engineering RFC on decentralized state hydration adopted across 6 cross-regional engineering centers with 2M+ active sessions.'
      ]
    },
    {
      id: 'exp-2',
      company: 'Canva',
      title: 'Lead Product Engineer & Pod Lead',
      location: 'Sydney, Australia',
      startDate: '2020',
      endDate: '2022',
      ongoing: false,
      bullets: [
        'Scaled enterprise API ecosystem and developer integration portal, expanding Tier-1 partner API adoption by 180% within 12 months.',
        'Governed design system standardization adopted by 14 distributed engineering teams, eliminating design drift and saving ~350 engineering hours quarterly.',
        'Established telemetry-driven product feedback loops that surfaced 12 high-leverage UX optimizations, accelerating creator monthly active engagement by 24%.'
      ]
    },
    {
      id: 'exp-3',
      company: 'FinTech Scaler',
      title: 'Senior Full-Stack Engineer',
      location: 'Sydney, Australia',
      startDate: '2017',
      endDate: '2020',
      ongoing: false,
      bullets: [
        'Designed real-time event-driven transaction ledger worker handling 3,200 req/sec with sub-100ms latency targets using Node.js, Redis, and Kafka.',
        'Instituted automated regression test harnesses covering 450+ unit and integration scenarios, preventing critical checkout regressions.'
      ]
    }
  ],

  skills: {
    languages: ['TypeScript', 'JavaScript (ES2024)', 'Go', 'Python', 'SQL'],
    frameworks: ['React 19', 'Next.js', 'Node.js', 'Module Federation', 'TailwindCSS'],
    architecture: ['Distributed Systems', 'Micro-Frontends', 'Event-Driven Architecture', 'Design Tokens', 'CI/CD Pipelines'],
    cloudAndTools: ['AWS (ECS, Lambda, S3)', 'Docker', 'Kubernetes', 'Redis', 'Kafka', 'GraphQL']
  },

  education: [
    {
      id: 'edu-1',
      institution: 'University of Sydney',
      degree: 'Bachelor of Science (Computer Science & Software Engineering)',
      location: 'Sydney, Australia',
      graduationDate: '2017',
      honors: 'First Class Honours · Dean\'s List for Academic Excellence'
    }
  ],

  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      year: '2023'
    }
  ]
};

export default function ResumeStudioView({ onBackToDocuments }) {
  // State
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = sessionStorage.getItem('jobgen_active_resume_builder');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_RESUME_DATA;
  });

  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'design' | 'emma' | 'score'
  const [activeAccordion, setActiveAccordion] = useState('personal'); // 'personal' | 'target' | 'summary' | 'experience' | 'skills' | 'education'
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState('Just now');
  const [toastMessage, setToastMessage] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [showTailorModal, setShowTailorModal] = useState(false);

  // Emma Chat State
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      text: 'Hello Alexander! I\'ve analyzed your resume against the Canva Lead Product Manager role. Your current ATS match is 96%. Would you like me to highlight missing target keywords or optimize your summary?'
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isEmmaTyping, setIsEmmaTyping] = useState(false);

  // Autosave simulation
  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem('jobgen_active_resume_builder', JSON.stringify(resumeData));
      } catch (e) {}
      setIsSaving(false);
      setLastSaved('Just now');
    }, 800);
    return () => clearTimeout(timer);
  }, [resumeData]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Updaters
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
      const nextExp = [...prev.experience];
      const nextBullets = [...nextExp[expIndex].bullets];
      nextBullets[bulletIndex] = val;
      nextExp[expIndex] = { ...nextExp[expIndex], bullets: nextBullets };
      return { ...prev, experience: nextExp };
    });
  };

  const addExperienceBullet = (expIndex) => {
    setResumeData(prev => {
      const nextExp = [...prev.experience];
      nextExp[expIndex] = {
        ...nextExp[expIndex],
        bullets: [...nextExp[expIndex].bullets, 'Spearheaded key technical initiative, increasing performance metrics by 25%.']
      };
      return { ...prev, experience: nextExp };
    });
  };

  const removeExperienceBullet = (expIndex, bulletIndex) => {
    setResumeData(prev => {
      const nextExp = [...prev.experience];
      nextExp[expIndex] = {
        ...nextExp[expIndex],
        bullets: nextExp[expIndex].bullets.filter((_, i) => i !== bulletIndex)
      };
      return { ...prev, experience: nextExp };
    });
  };

  const enhanceBulletXYZ = (expIndex, bulletIndex) => {
    const current = resumeData.experience[expIndex].bullets[bulletIndex];
    const enhanced = `Engineered automated pipeline optimization, reducing latency by 38% and saving $42,000 annually by refactoring core database queries.`;
    updateExperienceBullet(expIndex, bulletIndex, enhanced);
    showToast('Applied Google XYZ formula enhancement ✨');
  };

  // Emma prompt trigger
  const handleSendChatMessage = (textToSend = userInput) => {
    if (!textToSend.trim()) return;
    const userMsg = { role: 'user', text: textToSend };
    setChatMessages(prev => [...prev, userMsg]);
    setUserInput('');
    setIsEmmaTyping(true);

    setTimeout(() => {
      let reply = '';
      if (textToSend.toLowerCase().includes('canva') || textToSend.toLowerCase().includes('keywords')) {
        reply = 'I found 3 high-impact keywords in the Canva job description that could boost your alignment to 99%: "Creator Velocity", "Module Federation", and "Design System Governance". I\'ve highlighted where to insert them!';
      } else if (textToSend.toLowerCase().includes('summary')) {
        reply = 'Here is a high-converting punchy summary version:\n\n"Staff Architect & Product Engineering Lead with 9+ years scaling design systems, micro-frontends, and partner APIs. Proven track record growing enterprise API adoption by 180% and decreasing latency by 48% across tier-1 cloud platforms."\n\nClick below to apply this directly.';
      } else {
        reply = 'Your quantified metrics are exceptionally strong across all 3 roles. Consider emphasizing your cross-pod leadership in the Canva role bullet points to stand out even more to the executive hiring committee!';
      }

      setChatMessages(prev => [...prev, { role: 'assistant', text: reply }]);
      setIsEmmaTyping(false);
    }, 900);
  };

  const handleApplyAISummary = () => {
    updateSummary('Staff Architect & Product Engineering Lead with 9+ years scaling design systems, micro-frontends, and partner APIs. Proven track record growing enterprise API adoption by 180% and decreasing latency by 48% across tier-1 cloud platforms.');
    showToast('Updated professional summary with AI recommendation!');
  };

  const handleExportPDF = () => {
    window.print();
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

      {/* Top Action Bar (matching candidates.jobgen.ai) */}
      <header 
        style={{ 
          height: '62px', 
          backgroundColor: '#FFFFFF', 
          borderBottom: '1px solid #E2E8F0', 
          padding: '0 24px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexShrink: 0,
          zIndex: 40
        }}
      >
        {/* Left: Back & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button 
            onClick={onBackToDocuments || (() => window.history.back())}
            title="Back to Documents"
            style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '9px', 
              border: '1px solid #E2E8F0', 
              backgroundColor: '#F8FAFC', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#475569',
              transition: 'background 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
          >
            <ArrowLeft size={16} />
          </button>

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
                    fontSize: '14.5px',
                    fontWeight: 800,
                    color: '#090C15',
                    border: '1px solid #1A53CF',
                    borderRadius: '6px',
                    padding: '2px 8px',
                    outline: 'none'
                  }}
                />
              ) : (
                <h2 
                  onClick={() => setIsEditingTitle(true)}
                  style={{ 
                    fontSize: '15px', 
                    fontWeight: 800, 
                    color: '#090C15', 
                    margin: 0,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  title="Click to rename document"
                >
                  <span>{resumeData.documentName}</span>
                  <Edit3 size={13} color="#94A3B8" />
                </h2>
              )}

              <span 
                style={{ 
                  fontSize: '11px', 
                  color: isSaving ? '#D97706' : '#64748B', 
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
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

        {/* Right: ATS Score, Tailor Button, Download PDF */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* ATS Score Pill */}
          <button 
            onClick={() => setActiveTab('score')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              cursor: 'pointer',
              color: '#047857',
              fontSize: '12px',
              fontWeight: 800
            }}
          >
            <Award size={15} color="#059669" />
            <span>96% ATS Readiness</span>
          </button>

          {/* Tailor with AI Button */}
          <button
            onClick={() => setShowTailorModal(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 16px',
              borderRadius: '9px',
              background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 50%, #4F46E5 100%)',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 3px 12px rgba(26, 83, 207, 0.3)',
              transition: 'transform 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Sparkles size={14} />
            <span>Tailor with AI</span>
          </button>

          {/* Download PDF Button */}
          <button
            onClick={handleExportPDF}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 16px',
              borderRadius: '9px',
              backgroundColor: '#090C15',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(9, 12, 21, 0.15)'
            }}
          >
            <Download size={14} />
            <span>Export PDF</span>
          </button>
        </div>
      </header>

      {/* Main Split Body: Left Editor Workspace + Right A4 Canvas */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        
        {/* Left Column: Fixed Width 640px */}
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
          {/* Mode Tabs (Editor | Design | Ask Emma | Score) */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '10px 16px', 
              backgroundColor: '#FFFFFF', 
              borderBottom: '1px solid #E2E8F0',
              gap: '6px'
            }}
          >
            {[
              { id: 'editor', label: 'Editor', icon: FileText },
              { id: 'design', label: 'Design', icon: Sliders },
              { id: 'emma', label: 'Ask Emma', icon: Sparkles },
              { id: 'score', label: 'ATS Score', icon: Award }
            ].map(tab => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: isSelected ? '1px solid #BFDBFE' : '1px solid transparent',
                    backgroundColor: isSelected ? '#EFF6FF' : 'transparent',
                    color: isSelected ? '#1A53CF' : '#64748B',
                    fontSize: '12px',
                    fontWeight: isSelected ? 800 : 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={14} color={isSelected ? '#1A53CF' : '#64748B'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Editor / Content */}
          {activeTab === 'editor' && (
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* Master Resume Notice Banner */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  padding: '10px 14px', 
                  borderRadius: '10px', 
                  backgroundColor: '#EFF6FF', 
                  border: '1px solid #BFDBFE',
                  color: '#1E40AF',
                  fontSize: '12px',
                  fontWeight: 600
                }}
              >
                <Sparkles size={16} color="#1A53CF" style={{ flexShrink: 0 }} />
                <span>
                  <strong style={{ color: '#1A53CF' }}>Master Resume Mode:</strong> Tailored with verified metrics for {resumeData.targetJob.company}.
                </span>
              </div>

              {/* Accordion 1: Personal Details */}
              <div style={{ borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === 'personal' ? null : 'personal')}
                  style={{ 
                    width: '100%', 
                    padding: '14px 18px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    border: 'none',
                    backgroundColor: '#FAFAFA',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <User size={16} color="#1A53CF" />
                    <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#090C15' }}>Personal Details</span>
                  </div>
                  {activeAccordion === 'personal' ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
                </button>

                {activeAccordion === 'personal' && (
                  <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Full Name</label>
                        <input 
                          type="text" 
                          value={resumeData.personalDetails.fullName}
                          onChange={(e) => updatePersonal('fullName', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', borderRadius: '7px', border: '1px solid #CBD5E1', fontSize: '12.5px', outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Professional Headline</label>
                        <input 
                          type="text" 
                          value={resumeData.personalDetails.headline}
                          onChange={(e) => updatePersonal('headline', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', borderRadius: '7px', border: '1px solid #CBD5E1', fontSize: '12.5px', outline: 'none' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Email</label>
                        <input 
                          type="email" 
                          value={resumeData.personalDetails.email}
                          onChange={(e) => updatePersonal('email', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', borderRadius: '7px', border: '1px solid #CBD5E1', fontSize: '12.5px', outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Phone</label>
                        <input 
                          type="text" 
                          value={resumeData.personalDetails.phone}
                          onChange={(e) => updatePersonal('phone', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', borderRadius: '7px', border: '1px solid #CBD5E1', fontSize: '12.5px', outline: 'none' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Location</label>
                        <input 
                          type="text" 
                          value={resumeData.personalDetails.location}
                          onChange={(e) => updatePersonal('location', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', borderRadius: '7px', border: '1px solid #CBD5E1', fontSize: '12.5px', outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>LinkedIn</label>
                        <input 
                          type="text" 
                          value={resumeData.personalDetails.linkedin}
                          onChange={(e) => updatePersonal('linkedin', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', borderRadius: '7px', border: '1px solid #CBD5E1', fontSize: '12.5px', outline: 'none' }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Professional Summary */}
              <div style={{ borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === 'summary' ? null : 'summary')}
                  style={{ 
                    width: '100%', 
                    padding: '14px 18px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    border: 'none',
                    backgroundColor: '#FAFAFA',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={16} color="#1A53CF" />
                    <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#090C15' }}>Professional Summary</span>
                  </div>
                  {activeAccordion === 'summary' ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
                </button>

                {activeAccordion === 'summary' && (
                  <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <textarea 
                      value={resumeData.summary}
                      onChange={(e) => updateSummary(e.target.value)}
                      rows={5}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '12.5px',
                        lineHeight: 1.55,
                        color: '#090C15',
                        outline: 'none',
                        resize: 'vertical'
                      }}
                    />

                    {/* AI Helpers for Summary */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        onClick={handleApplyAISummary}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '6px',
                          backgroundColor: '#EFF6FF',
                          color: '#1A53CF',
                          border: '1px solid #BFDBFE',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Sparkles size={12} />
                        <span>Rewrite for Impact</span>
                      </button>
                      <button
                        onClick={() => updateSummary(resumeData.summary.slice(0, 260) + '...')}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '6px',
                          backgroundColor: '#F8FAFC',
                          color: '#475569',
                          border: '1px solid #E2E8F0',
                          fontSize: '11px',
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

              {/* Accordion 3: Work Experience */}
              <div style={{ borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === 'experience' ? null : 'experience')}
                  style={{ 
                    width: '100%', 
                    padding: '14px 18px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    border: 'none',
                    backgroundColor: '#FAFAFA',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Briefcase size={16} color="#1A53CF" />
                    <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#090C15' }}>
                      Work Experience ({resumeData.experience.length})
                    </span>
                  </div>
                  {activeAccordion === 'experience' ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
                </button>

                {activeAccordion === 'experience' && (
                  <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {resumeData.experience.map((exp, expIdx) => (
                      <div 
                        key={exp.id}
                        style={{
                          padding: '14px',
                          borderRadius: '10px',
                          border: '1px solid #E2E8F0',
                          backgroundColor: '#FAFAFA',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#090C15' }}>{exp.title}</span>
                            <span style={{ fontSize: '12px', color: '#64748B' }}> · {exp.company}</span>
                          </div>
                          <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>{exp.startDate} - {exp.endDate}</span>
                        </div>

                        {/* Bullets List */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>
                            Quantified Bullets:
                          </span>
                          {exp.bullets.map((b, bIdx) => (
                            <div key={bIdx} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                              <span style={{ color: '#1A53CF', fontWeight: 800, marginTop: '5px' }}>•</span>
                              <textarea
                                value={b}
                                onChange={(e) => updateExperienceBullet(expIdx, bIdx, e.target.value)}
                                rows={2}
                                style={{
                                  flex: 1,
                                  padding: '6px 8px',
                                  borderRadius: '6px',
                                  border: '1px solid #CBD5E1',
                                  fontSize: '11.5px',
                                  lineHeight: 1.45,
                                  outline: 'none',
                                  resize: 'vertical',
                                  backgroundColor: '#FFFFFF'
                                }}
                              />
                              <button
                                onClick={() => enhanceBulletXYZ(expIdx, bIdx)}
                                title="Enhance with Google XYZ formula"
                                style={{
                                  padding: '5px 7px',
                                  borderRadius: '6px',
                                  backgroundColor: '#EFF6FF',
                                  color: '#1A53CF',
                                  border: '1px solid #BFDBFE',
                                  cursor: 'pointer'
                                }}
                              >
                                <Sparkles size={13} />
                              </button>
                              <button
                                onClick={() => removeExperienceBullet(expIdx, bIdx)}
                                title="Delete bullet"
                                style={{
                                  padding: '5px 7px',
                                  borderRadius: '6px',
                                  backgroundColor: '#FEF2F2',
                                  color: '#DC2626',
                                  border: '1px solid #FECACA',
                                  cursor: 'pointer'
                                }}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          ))}

                          <button
                            onClick={() => addExperienceBullet(expIdx)}
                            style={{
                              alignSelf: 'flex-start',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              backgroundColor: '#FFFFFF',
                              border: '1px dashed #CBD5E1',
                              color: '#1A53CF',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            <Plus size={12} />
                            <span>Add Bullet Point</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 4: Skills */}
              <div style={{ borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === 'skills' ? null : 'skills')}
                  style={{ 
                    width: '100%', 
                    padding: '14px 18px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    border: 'none',
                    backgroundColor: '#FAFAFA',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Award size={16} color="#1A53CF" />
                    <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#090C15' }}>Technical Skills & Competencies</span>
                  </div>
                  {activeAccordion === 'skills' ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
                </button>

                {activeAccordion === 'skills' && (
                  <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {Object.entries(resumeData.skills).map(([category, list]) => (
                      <div key={category}>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>
                          {category}
                        </span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                          {list.map((skill, idx) => (
                            <span 
                              key={idx}
                              style={{
                                fontSize: '11px',
                                fontWeight: 600,
                                backgroundColor: '#F1F5F9',
                                color: '#090C15',
                                padding: '3px 8px',
                                borderRadius: '5px',
                                border: '1px solid #E2E8F0'
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 5: Education */}
              <div style={{ borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === 'education' ? null : 'education')}
                  style={{ 
                    width: '100%', 
                    padding: '14px 18px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    border: 'none',
                    backgroundColor: '#FAFAFA',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <GraduationCap size={16} color="#1A53CF" />
                    <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#090C15' }}>Education & Credentials</span>
                  </div>
                  {activeAccordion === 'education' ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
                </button>

                {activeAccordion === 'education' && (
                  <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {resumeData.education.map((edu) => (
                      <div key={edu.id} style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: '#FAFAFA', border: '1px solid #E2E8F0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: '#090C15' }}>{edu.institution}</span>
                          <span style={{ fontSize: '11px', color: '#94A3B8' }}>{edu.graduationDate}</span>
                        </div>
                        <p style={{ fontSize: '12px', color: '#475569', margin: '2px 0 0 0' }}>{edu.degree}</p>
                        <p style={{ fontSize: '11px', color: '#059669', margin: '2px 0 0 0', fontWeight: 700 }}>{edu.honors}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Tab 2: Design & Layout */}
          {activeTab === 'design' && (
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#090C15', margin: '0 0 10px 0' }}>
                  ATS Layout Templates
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {RESUME_TEMPLATES.map((tpl) => {
                    const isSelected = resumeData.template === tpl.id;
                    return (
                      <button
                        key={tpl.id}
                        onClick={() => setResumeData(prev => ({ ...prev, template: tpl.id }))}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 14px',
                          borderRadius: '10px',
                          border: isSelected ? '2px solid #1A53CF' : '1px solid #E2E8F0',
                          backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '13.5px', fontWeight: 800, color: isSelected ? '#1A53CF' : '#090C15' }}>
                              {tpl.name}
                            </span>
                            <span style={{ fontSize: '10.5px', fontWeight: 700, backgroundColor: '#F1F5F9', color: '#64748B', padding: '2px 6px', borderRadius: '4px' }}>
                              {tpl.subtitle}
                            </span>
                          </div>
                          <p style={{ fontSize: '11px', color: '#64748B', margin: '4px 0 0 0' }}>
                            {tpl.description}
                          </p>
                        </div>
                        {isSelected && <CheckCircle2 size={18} color="#1A53CF" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Spacing & Typography */}
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#090C15', margin: '0 0 10px 0' }}>
                  Spacing Density
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {['compact', 'standard', 'relaxed'].map(s => (
                    <button
                      key={s}
                      onClick={() => setResumeData(prev => ({ ...prev, spacing: s }))}
                      style={{
                        padding: '8px',
                        borderRadius: '8px',
                        border: resumeData.spacing === s ? '2px solid #1A53CF' : '1px solid #E2E8F0',
                        backgroundColor: resumeData.spacing === s ? '#EFF6FF' : '#FFFFFF',
                        color: resumeData.spacing === s ? '#1A53CF' : '#475569',
                        fontSize: '12px',
                        fontWeight: 700,
                        textTransform: 'capitalize',
                        cursor: 'pointer'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Ask Emma AI Copilot */}
          {activeTab === 'emma' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFC' }}>
              {/* Chat Message History */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {chatMessages.map((msg, i) => (
                  <div 
                    key={i}
                    style={{
                      alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                      padding: '12px 14px',
                      borderRadius: msg.role === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                      backgroundColor: msg.role === 'user' ? '#1A53CF' : '#FFFFFF',
                      color: msg.role === 'user' ? '#FFFFFF' : '#090C15',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      border: msg.role === 'user' ? 'none' : '1px solid #E2E8F0',
                      fontSize: '12.5px',
                      lineHeight: 1.5,
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {msg.text}
                  </div>
                ))}
                {isEmmaTyping && (
                  <div style={{ alignSelf: 'flex-start', padding: '8px 12px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px', color: '#64748B' }}>
                    Emma is analyzing your resume...
                  </div>
                )}
              </div>

              {/* Quick Prompt Pills */}
              <div style={{ padding: '8px 16px', borderTop: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', display: 'flex', gap: '6px', overflowX: 'auto' }}>
                {['Missing Keywords?', 'Enhance for Canva', 'Score Breakdown'].map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => handleSendChatMessage(prompt)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '999px',
                      backgroundColor: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      color: '#1A53CF',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Input Box */}
              <div style={{ padding: '12px 16px', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '8px' }}>
                <input 
                  type="text"
                  placeholder="Ask Emma to optimize any section..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '12.5px',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={() => handleSendChatMessage()}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Tab 4: ATS Score Audit */}
          {activeTab === 'score' && (
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ textAlign: 'center', padding: '20px', borderRadius: '14px', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0' }}>
                <span style={{ fontSize: '44px', fontWeight: 900, color: '#047857' }}>96</span>
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#059669' }}> / 100</span>
                <h4 style={{ fontSize: '14.5px', fontWeight: 800, color: '#065F46', margin: '4px 0 0 0' }}>ATS Ready · Excellent Alignment</h4>
                <p style={{ fontSize: '12px', color: '#047857', margin: '4px 0 0 0' }}>Optimized specifically for Canva Lead Product Manager</p>
              </div>

              {/* Criteria breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Target Keyword Coverage', score: '98%', status: '24/25 Keywords Injected' },
                  { label: 'Quantified Impact Metrics', score: '94%', status: 'Google XYZ Structure Followed' },
                  { label: 'ATS Format Compliance', score: '100%', status: 'Single-Column, Parser-Friendly' },
                  { label: 'Brevity & Word Balance', score: '92%', status: '485 Words (Optimal 1-2 Pages)' }
                ].map((item, i) => (
                  <div key={i} style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#090C15' }}>{item.label}</span>
                      <span style={{ fontSize: '12.5px', fontWeight: 900, color: '#1A53CF' }}>{item.score}</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Live A4 Document Canvas Preview Pane */}
        <div 
          style={{ 
            flex: 1, 
            backgroundColor: '#EEF2F6', 
            overflowY: 'auto', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '32px 24px',
            position: 'relative'
          }}
        >
          {/* Zoom & Canvas Controls */}
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
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(226, 232, 240, 0.9)',
              marginBottom: '20px'
            }}
          >
            <button 
              onClick={() => setZoomLevel(prev => Math.max(70, prev - 10))}
              style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 800, color: '#475569' }}
            >
              -
            </button>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#090C15', minWidth: '40px', textAlign: 'center' }}>
              {zoomLevel}%
            </span>
            <button 
              onClick={() => setZoomLevel(prev => Math.min(140, prev + 10))}
              style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 800, color: '#475569' }}
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

          {/* A4 Paper Sheet (Realistic Drop Shadow & Layout) */}
          <div 
            style={{
              width: '794px',
              minHeight: '1123px',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 18px 50px rgba(15, 23, 42, 0.12), 0 2px 10px rgba(0, 0, 0, 0.04)',
              borderRadius: '2px',
              padding: resumeData.spacing === 'compact' ? '42px 48px' : (resumeData.spacing === 'relaxed' ? '64px 64px' : '54px 56px'),
              boxSizing: 'border-box',
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
              fontFamily: resumeData.template === 'architectsportfolio' || resumeData.template === 'operationsprecision' ? 'Inter, "Segoe UI", Arial, sans-serif' : '"Noto Serif", Georgia, serif',
              color: '#171717',
              transition: 'transform 0.15s ease'
            }}
          >
            {/* Header: Candidate Identity */}
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <h1 
                style={{ 
                  fontSize: '24px', 
                  fontWeight: 900, 
                  letterSpacing: '0.04em', 
                  textTransform: 'uppercase', 
                  color: resumeData.template === 'consultantpolished' ? '#1E3A8A' : (resumeData.template === 'operationsprecision' ? '#0D9488' : '#111827'),
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
                  justifyContent: 'center', 
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
            <div style={{ height: '1.5px', backgroundColor: resumeData.template === 'consultantpolished' ? '#1E3A8A' : '#171717', marginBottom: '14px' }} />

            {/* Section: Professional Summary */}
            <div style={{ marginBottom: '16px' }}>
              <h3 
                style={{ 
                  fontSize: '12px', 
                  fontWeight: 800, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.08em', 
                  color: resumeData.template === 'consultantpolished' ? '#1E3A8A' : '#171717',
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
                  color: resumeData.template === 'consultantpolished' ? '#1E3A8A' : '#171717',
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

                    <ul style={{ margin: '4px 0 0 0', paddingLeft: '18px', fontSize: '11px', lineHeight: 1.48, color: '#334155' }}>
                      {exp.bullets.map((b, bIdx) => (
                        <li key={bIdx} style={{ marginBottom: '3px', textAlign: 'justify' }}>
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
                  color: resumeData.template === 'consultantpolished' ? '#1E3A8A' : '#171717',
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
                  color: resumeData.template === 'consultantpolished' ? '#1E3A8A' : '#171717',
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

      {/* Tailor with AI Modal */}
      {showTailorModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(9, 12, 21, 0.75)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setShowTailorModal(false)}
        >
          <div 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              maxWidth: '540px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.35)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={20} color="#FFFFFF" />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#090C15', margin: 0 }}>
                  Tailor for Target Opening
                </h3>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0 0' }}>
                  Auto-inject verified metrics & ATS keywords from your saved job
                </p>
              </div>
            </div>

            <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', marginBottom: '18px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#1A53CF', textTransform: 'uppercase' }}>Selected Target:</span>
              <p style={{ fontSize: '14px', fontWeight: 800, color: '#090C15', margin: '2px 0' }}>
                Canva · Lead Product Manager (Creator Ecosystem)
              </p>
              <span style={{ fontSize: '11.5px', color: '#059669', fontWeight: 700 }}>
                96% Match · 6 High-Priority Keywords Detected
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowTailorModal(false)}
                style={{
                  flex: 1,
                  padding: '11px',
                  borderRadius: '10px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  color: '#475569',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowTailorModal(false);
                  showToast('Auto-tailored resume for Canva Lead Product Manager! ✨');
                }}
                style={{
                  flex: 2,
                  padding: '11px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(26, 83, 207, 0.35)'
                }}
              >
                Apply Tailoring ✨
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
