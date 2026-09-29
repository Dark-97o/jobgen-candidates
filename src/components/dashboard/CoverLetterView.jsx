import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Mail, 
  Download, 
  CheckCircle2, 
  Check, 
  ArrowLeft, 
  ArrowRight,
  FileText,
  Edit3, 
  RefreshCw, 
  Building2, 
  Calendar, 
  MapPin, 
  Trash2, 
  Plus, 
  Briefcase, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight, 
  GripVertical, 
  Eye, 
  EyeOff, 
  X, 
  Sparkles 
} from 'lucide-react';
import AddJobModal from './AddJobModal';
import GlowingGridBackground from './GlowingGridBackground';

const COVER_LETTER_TEMPLATES = [
  {
    id: 'jake',
    name: 'Classic ATS',
    subtitle: 'ATS-friendly serif',
    font: 'serif',
    accentColor: '#171717'
  },
  {
    id: 'modern',
    name: 'Modern Clean',
    subtitle: 'Contemporary sans',
    font: 'sans',
    accentColor: '#1A53CF'
  },
  {
    id: 'balanced',
    name: 'Executive',
    subtitle: 'Structured header',
    font: 'sans',
    accentColor: '#0F172A'
  },
  {
    id: 'initials',
    name: 'Monogram',
    subtitle: 'Monogram crest',
    font: 'serif',
    accentColor: '#047857'
  },
  {
    id: 'sidebar',
    name: 'Left Rail',
    subtitle: 'Identity column',
    font: 'sans',
    accentColor: '#171717'
  }
];

// Clean White Background Skeletal Framework Wireframes (No Text)
function CoverLetterSkeletonPreview({ templateId }) {
  return (
    <div 
      style={{ 
        width: '100%', 
        height: '144px', 
        backgroundColor: '#FFFFFF', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        overflow: 'hidden', 
        padding: '8px',
        boxSizing: 'border-box'
      }}
    >
      <svg 
        viewBox="0 0 100 135" 
        style={{ 
          width: '100%', 
          height: '100%', 
          display: 'block',
          filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.06))'
        }}
      >
        {/* White Paper Base */}
        <rect x="4" y="3" width="92" height="129" rx="2" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />

        {/* 1. Classic ATS (Jake Single-Column Serif) */}
        {templateId === 'jake' && (
          <g>
            <rect x="12" y="9" width="36" height="4.5" rx="1" fill="#0F172A" />
            <rect x="12" y="16" width="60" height="2" rx="0.5" fill="#94A3B8" />
            <line x1="12" y1="21" x2="88" y2="21" stroke="#0F172A" strokeWidth="0.8" />
            {/* Recipient */}
            <rect x="12" y="26" width="24" height="2" rx="0.5" fill="#94A3B8" />
            <rect x="12" y="30" width="32" height="2.2" rx="0.5" fill="#0F172A" />
            <rect x="12" y="34" width="28" height="2" rx="0.5" fill="#64748B" />
            {/* Paragraph 1 */}
            <rect x="12" y="42" width="76" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="46" width="76" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="50" width="58" height="1.8" rx="0.5" fill="#CBD5E1" />
            {/* Paragraph 2 */}
            <rect x="12" y="56" width="76" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="60" width="76" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="64" width="48" height="1.8" rx="0.5" fill="#CBD5E1" />
            {/* Bullets */}
            <circle cx="14" cy="72" r="1.2" fill="#0F172A" />
            <rect x="18" y="71" width="70" height="1.8" rx="0.5" fill="#94A3B8" />
            <circle cx="14" cy="77" r="1.2" fill="#0F172A" />
            <rect x="18" y="76" width="65" height="1.8" rx="0.5" fill="#94A3B8" />
            {/* Closing */}
            <rect x="12" y="85" width="76" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="89" width="42" height="1.8" rx="0.5" fill="#CBD5E1" />
            {/* Signoff */}
            <rect x="12" y="98" width="22" height="2" rx="0.5" fill="#64748B" />
            <rect x="12" y="104" width="28" height="3" rx="0.5" fill="#0F172A" />
          </g>
        )}

        {/* 2. Modern Clean (Blue Accent Bar) */}
        {templateId === 'modern' && (
          <g>
            <rect x="4" y="3" width="92" height="4" fill="#1A53CF" />
            <rect x="12" y="12" width="38" height="4.5" rx="1" fill="#1A53CF" />
            <rect x="12" y="19" width="54" height="2" rx="0.5" fill="#94A3B8" />
            <line x1="12" y1="24" x2="88" y2="24" stroke="#BFDBFE" strokeWidth="0.8" />
            {/* Recipient */}
            <rect x="12" y="29" width="26" height="2" rx="0.5" fill="#94A3B8" />
            <rect x="12" y="33" width="34" height="2.2" rx="0.5" fill="#0F172A" />
            <rect x="12" y="37" width="28" height="2" rx="0.5" fill="#1A53CF" />
            {/* Paragraphs */}
            <rect x="12" y="45" width="76" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="49" width="76" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="53" width="60" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="59" width="76" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="63" width="76" height="1.8" rx="0.5" fill="#CBD5E1" />
            {/* Bullets with blue pills */}
            <rect x="12" y="70" width="3" height="3" rx="0.8" fill="#1A53CF" />
            <rect x="18" y="71" width="70" height="1.8" rx="0.5" fill="#94A3B8" />
            <rect x="12" y="76" width="3" height="3" rx="0.8" fill="#1A53CF" />
            <rect x="18" y="77" width="66" height="1.8" rx="0.5" fill="#94A3B8" />
            {/* Signoff */}
            <rect x="12" y="88" width="76" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="102" width="24" height="2.8" rx="0.5" fill="#0F172A" />
          </g>
        )}

        {/* 3. Executive (Structured Dark Header) */}
        {templateId === 'balanced' && (
          <g>
            <rect x="4" y="3" width="92" height="18" fill="#0F172A" />
            <rect x="10" y="8" width="40" height="4.5" rx="1" fill="#FFFFFF" />
            <rect x="10" y="14" width="55" height="2" rx="0.5" fill="#94A3B8" />
            {/* Recipient */}
            <rect x="12" y="27" width="28" height="2" rx="0.5" fill="#64748B" />
            <rect x="12" y="31" width="34" height="2.4" rx="0.5" fill="#0F172A" />
            <rect x="12" y="35" width="24" height="2" rx="0.5" fill="#94A3B8" />
            {/* Body */}
            <rect x="12" y="44" width="76" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="48" width="76" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="52" width="55" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="58" width="76" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="62" width="76" height="1.8" rx="0.5" fill="#CBD5E1" />
            {/* Highlight Box */}
            <rect x="12" y="69" width="76" height="16" rx="1.5" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.6" />
            <rect x="16" y="73" width="68" height="1.8" rx="0.5" fill="#64748B" />
            <rect x="16" y="78" width="62" height="1.8" rx="0.5" fill="#64748B" />
            {/* Signoff */}
            <rect x="12" y="93" width="76" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="104" width="26" height="2.5" rx="0.5" fill="#0F172A" />
          </g>
        )}

        {/* 4. Initials Monogram (Crest on top) */}
        {templateId === 'initials' && (
          <g>
            <circle cx="18" cy="14" r="6" fill="#047857" />
            <circle cx="18" cy="14" r="4.2" fill="#FFFFFF" />
            <rect x="28" y="11" width="34" height="4" rx="1" fill="#0F172A" />
            <rect x="28" y="17" width="50" height="2" rx="0.5" fill="#64748B" />
            <line x1="12" y1="24" x2="88" y2="24" stroke="#A7F3D0" strokeWidth="0.8" />
            {/* Recipient */}
            <rect x="12" y="29" width="24" height="2" rx="0.5" fill="#64748B" />
            <rect x="12" y="33" width="32" height="2.2" rx="0.5" fill="#0F172A" />
            {/* Paragraphs */}
            <rect x="12" y="42" width="76" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="46" width="76" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="50" width="65" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="57" width="76" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="61" width="76" height="1.8" rx="0.5" fill="#CBD5E1" />
            {/* Bullets */}
            <circle cx="14" cy="69" r="1.2" fill="#047857" />
            <rect x="18" y="68" width="68" height="1.8" rx="0.5" fill="#94A3B8" />
            <circle cx="14" cy="74" r="1.2" fill="#047857" />
            <rect x="18" y="73" width="64" height="1.8" rx="0.5" fill="#94A3B8" />
            {/* Signoff */}
            <rect x="12" y="85" width="76" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="100" width="24" height="2.5" rx="0.5" fill="#047857" />
          </g>
        )}

        {/* 5. Left Rail (Sidebar Identity) */}
        {templateId === 'sidebar' && (
          <g>
            {/* Left sidebar background */}
            <rect x="4" y="3" width="28" height="129" fill="#F8FAFC" />
            <line x1="32" y1="3" x2="32" y2="132" stroke="#E2E8F0" strokeWidth="0.8" />
            {/* Left rail elements */}
            <rect x="7" y="10" width="22" height="3" rx="0.5" fill="#0F172A" />
            <rect x="7" y="15" width="18" height="1.8" rx="0.5" fill="#94A3B8" />
            <rect x="7" y="24" width="20" height="1.5" rx="0.5" fill="#CBD5E1" />
            <rect x="7" y="28" width="20" height="1.5" rx="0.5" fill="#CBD5E1" />
            <rect x="7" y="32" width="16" height="1.5" rx="0.5" fill="#CBD5E1" />
            {/* Right main area: Recipient & Body */}
            <rect x="38" y="12" width="22" height="2" rx="0.5" fill="#94A3B8" />
            <rect x="38" y="16" width="30" height="2.4" rx="0.5" fill="#0F172A" />
            <rect x="38" y="26" width="52" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="38" y="30" width="52" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="38" y="34" width="42" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="38" y="42" width="52" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="38" y="46" width="52" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="38" y="54" width="50" height="1.8" rx="0.5" fill="#94A3B8" />
            <rect x="38" y="58" width="48" height="1.8" rx="0.5" fill="#94A3B8" />
            <rect x="38" y="70" width="52" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="38" y="84" width="22" height="2.5" rx="0.5" fill="#0F172A" />
          </g>
        )}
      </svg>
    </div>
  );
}

const TARGET_COMPANIES_DATA = {
  Canva: {
    role: 'Lead Product Manager (Creator Ecosystem)',
    recipient: 'Hiring Team & Craig Press',
    address: 'Canva HQ, 110 Kippax St, Surry Hills NSW 2010',
    opening: 'Dear Canva Hiring Team, having spearheaded high-velocity product initiatives and enterprise design systems across hyper-growth ecosystems, I was thrilled to see the Lead Product Manager opening for Canva’s Creator and Enterprise Platform. I have long admired Canva’s relentless dedication to democratizing design worldwide.',
    body: 'Throughout my tenure driving product architecture across APAC, I have prioritized telemetry-backed feature discovery and engineering pod velocity. At my current organization, I led the cross-functional rollout of design tokens and federated modules that cut release friction by 35% while expanding tier-1 enterprise API adoption by 180%. Canva’s commitment to empowering the world to design deeply aligns with my passion for zero-friction user experiences and developer platforms.',
    bullets: [
      'Scaled enterprise API adoption by 180% across 40+ Tier-1 banking partners through iterative sprint restructuring.',
      'Governed design system standardization adopted by 14 distributed engineering teams, reducing frontend cycle times by 35%.',
      'Championed data-driven product telemetry resulting in 24% MAU growth across self-serve creator workflows.'
    ],
    closing: 'I look forward to discussing how my product execution playbook and technical depth can accelerate Canva’s next phase of enterprise platform dominance.',
    signOff: 'Warm regards,\nAlexander Wright'
  },
  Atlassian: {
    role: 'Senior Staff Frontend Architect',
    recipient: 'Engineering Leadership Loop',
    address: 'Atlassian, 341 George St, Sydney NSW 2000',
    opening: 'Dear Atlassian Engineering Leadership, as an architect dedicated to large-scale distributed frontend systems, I am writing to express my strong enthusiasm for the Senior Staff Frontend Architect role at Atlassian across Jira and Confluence cloud.',
    body: 'Atlassian’s mission to unleash the potential of every team resonates with my decade of experience architecting resilient, decentralized web platforms. Most recently, I led the migration of a monolithic enterprise UI into 14 federated micro-frontends, cutting release turnaround from weeks to continuous daily deploys while reducing Core Web Vitals LCP by 48%.',
    bullets: [
      'Architected module-federated micro-frontend platform supporting 2M+ daily active sessions with zero downtime.',
      'Authored decentralized state hydration RFC adopted across 6 cross-regional engineering centers.',
      'Established automated bundle analyzer tooling and performance budgets saving 620KB per initial client payload.'
    ],
    closing: 'I would welcome the opportunity to dive deep into your platform roadmap and discuss how my distributed frontend experience can benefit Jira Cloud.',
    signOff: 'Best regards,\nAlexander Wright'
  },
  Afterpay: {
    role: 'Lead Full-Stack Engineer',
    recipient: 'Global Engineering Hiring Team',
    address: 'Afterpay, Queen & Collins, Melbourne VIC 3000',
    opening: 'Dear Afterpay Engineering Team, I am thrilled to apply for the Lead Full-Stack Engineer position, bringing extensive experience engineering high-throughput, low-latency financial systems.',
    body: 'In my recent architectural roles, I designed event-driven worker pipelines handling 3,200 req/sec while optimizing checkout iframe load overhead by 40%. Afterpay’s engineering culture and dedication to frictionless payments deeply inspires me.',
    bullets: [
      'Designed event-driven fraud assessment worker pipeline handling 3,200 req/sec with Redis cluster caching.',
      'Optimized React checkout SDK asset delivery, reducing merchant iframe load overhead by 40%.',
      'Implemented robust end-to-end integration test harnesses covering 450+ unit and latency degradation scenarios.'
    ],
    closing: 'I would love the opportunity to contribute to Afterpay’s next-generation payments architecture.',
    signOff: 'Warm regards,\nAlexander Wright'
  },
  Stripe: {
    role: 'Product Operations Lead',
    recipient: 'Global Talent Acquisition',
    address: 'Stripe, 100 Mount St, North Sydney NSW 2060',
    opening: 'Dear Stripe Talent Team, with deep expertise scaling financial infrastructure operations and mission-critical developer workflows, I am eager to contribute to Stripe as Product Operations Lead.',
    body: 'Having operated at the intersection of high-availability payment rails and developer experience, I understand the paramount importance of 99.999% reliability. In my previous role, I instituted automated incident command escalation protocols that decreased mean time to resolution by 42% while managing $120M+ monthly throughput.',
    bullets: [
      'Streamlined incident escalation protocols for high-concurrency payment transactions, upholding 99.995% SLA.',
      'Compressed partner integration onboarding cycles from 18 days to 4 days through standardized API checklists.',
      'Partnered directly with risk engineering to deploy automated anomaly filters processing high-velocity settlement traffic.'
    ],
    closing: 'I am excited by Stripe’s relentless focus on increasing the GDP of the internet and look forward to speaking with the team.',
    signOff: 'Sincerely,\nAlexander Wright'
  }
};

// Default Cover Letter Sections configuration for drag, collapse, eye-hide, and delete
const DEFAULT_COVER_SECTIONS = [
  { id: 'recipient', title: 'Recipient & Addressee', deletable: false, hasEye: true, hasDrag: true },
  { id: 'opening', title: 'Opening Paragraph & Hook', deletable: false, hasEye: true, hasDrag: true },
  { id: 'body', title: 'Core Narrative & Impact', deletable: false, hasEye: true, hasDrag: true },
  { id: 'highlights', title: 'Key Highlights & Metrics', deletable: true, hasEye: true, hasDrag: true },
  { id: 'closing', title: 'Closing & Call to Action', deletable: false, hasEye: true, hasDrag: true },
  { id: 'signoff', title: 'Formal Sign-off', deletable: false, hasEye: true, hasDrag: true }
];

export default function CoverLetterView({ onBackToDocuments }) {
  const [selectedCompany, setSelectedCompany] = useState('Canva');
  const [letterData, setLetterData] = useState(() => {
    try {
      const saved = sessionStorage.getItem('jobgen_active_cover_builder_v4');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      documentName: 'Canva - Lead Product Manager Cover Letter',
      template: 'jake',
      date: 'September 29, 2026',
      candidateName: 'Alexander Wright',
      candidateTitle: 'Senior Staff Frontend Architect & Product Lead',
      email: 'alexander.wright@jobgen.ai',
      phone: '+61 400 123 456',
      location: 'Sydney, NSW, Australia',
      linkedin: 'linkedin.com/in/alexander-wright',
      customSections: [],
      ...TARGET_COMPANIES_DATA['Canva']
    };
  });

  // Preview zoom level set by default to 90% as requested
  const [zoomLevel, setZoomLevel] = useState(90);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Saved Jobs state matching Resume Studio
  const [savedJobsList, setSavedJobsList] = useState(() => {
    try {
      const saved = sessionStorage.getItem('jobgen_candidate_saved_jobs');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { id: 'job-canva', company: 'Canva', title: 'Lead Product Manager (Creator Ecosystem)' },
      { id: 'job-atlassian', company: 'Atlassian', title: 'Senior Staff Frontend Architect' },
      { id: 'job-afterpay', company: 'Afterpay', title: 'Lead Full-Stack Engineer' },
      { id: 'job-deloitte', company: 'Deloitte', title: 'Principal Cloud Strategist' },
      { id: 'job-safetyculture', company: 'SafetyCulture', title: 'Principal Backend Engineer' }
    ];
  });
  const [selectedJobId, setSelectedJobId] = useState('job-canva');
  const [showAddJobModal, setShowAddJobModal] = useState(false);

  // Dynamic Section Management States
  const [activeSections, setActiveSections] = useState(() => {
    try {
      const saved = sessionStorage.getItem('jobgen_cover_active_sections_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_COVER_SECTIONS;
  });

  const [openSections, setOpenSections] = useState({
    recipient: true,
    opening: false,
    body: false,
    highlights: false,
    closing: false,
    signoff: false
  });

  const [hiddenSections, setHiddenSections] = useState({});
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [showAddSectionMenu, setShowAddSectionMenu] = useState(false);
  const [customSectionTitle, setCustomSectionTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Dynamic Page Splitting for Physical A4 Sheet (1123px Fixed Height)
  const visibleLetterSections = useMemo(() => {
    return activeSections.filter(sec => !hiddenSections[sec.id]);
  }, [activeSections, hiddenSections]);

  const coverPages = useMemo(() => {
    // Estimate section heights in cover letter
    const getWeight = (id) => {
      switch (id) {
        case 'recipient': return 100;
        case 'opening': return Math.max(90, Math.ceil((letterData.openingParagraph?.length || 100) / 3.8));
        case 'body': return Math.max(120, Math.ceil((letterData.bodyParagraph?.length || 150) / 3.8));
        case 'highlights': return Math.max(100, (letterData.highlightBullets?.length || 2) * 55);
        case 'closing': return Math.max(80, Math.ceil((letterData.closingParagraph?.length || 80) / 3.8));
        case 'signoff': return 120;
        default: return 120;
      }
    };

    // Usable height inside 1123px A4 sheet:
    // Page 1 budget: ~800px (after 96px padding + 140px header + continuation footer)
    // Page 2 budget: ~920px (after 96px padding + 50px continuation header)
    const PAGE_1_LIMIT = 800;
    const PAGE_N_LIMIT = 920;

    const pages = [[]];
    let currentLimit = PAGE_1_LIMIT;
    let currentHeight = 0;

    for (const sec of visibleLetterSections) {
      const w = getWeight(sec.id);
      if (pages.length === 1 && currentHeight + w > currentLimit && pages[0].length > 0) {
        pages.push([sec]);
        currentLimit = PAGE_N_LIMIT;
        currentHeight = w;
      } else if (pages.length > 1 && currentHeight + w > currentLimit && pages[pages.length - 1].length > 0) {
        pages.push([sec]);
        currentHeight = w;
      } else {
        pages[pages.length - 1].push(sec);
        currentHeight += w;
      }
    }

    return pages;
  }, [visibleLetterSections, letterData]);

  const totalPages = Math.max(1, coverPages.length);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const carouselRef = useRef(null);
  const leftEditorRef = useRef(null);

  // Autosave
  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem('jobgen_active_cover_builder_v4', JSON.stringify(letterData));
        sessionStorage.setItem('jobgen_cover_active_sections_v2', JSON.stringify(activeSections));
      } catch (e) {}
      setIsSaving(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [letterData, activeSections]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSection = (secId) => {
    setOpenSections(prev => ({ ...prev, [secId]: !prev[secId] }));
  };

  const toggleHideSection = (secId) => {
    setHiddenSections(prev => {
      const next = { ...prev, [secId]: !prev[secId] };
      showToast(next[secId] ? 'Section hidden from cover letter' : 'Section visible on cover letter');
      return next;
    });
  };

  const handleDeleteSection = (secId) => {
    const sec = activeSections.find(s => s.id === secId);
    setActiveSections(prev => prev.filter(s => s.id !== secId));
    showToast(`Deleted ${sec?.title || 'section'} from cover letter`);
  };

  const handleAddDefaultSection = (secId) => {
    const templateSec = DEFAULT_COVER_SECTIONS.find(s => s.id === secId);
    if (templateSec && !activeSections.some(s => s.id === secId)) {
      setActiveSections(prev => [...prev, templateSec]);
      setShowAddSectionMenu(false);
      showToast(`Added ${templateSec.title} to cover letter`);
    }
  };

  const handleAddCustomSection = () => {
    if (!customSectionTitle.trim()) return;
    const newId = `custom-${Date.now()}`;
    const newSec = {
      id: newId,
      title: customSectionTitle.trim(),
      deletable: true,
      hasEye: true,
      hasDrag: true
    };
    setActiveSections(prev => [...prev, newSec]);
    setLetterData(prev => ({
      ...prev,
      customSections: [...(prev.customSections || []), { id: newId, title: customSectionTitle.trim(), content: '' }]
    }));
    setCustomSectionTitle('');
    setShowAddSectionMenu(false);
    showToast(`Added section: ${newSec.title}`);
  };

  // Drag & drop handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    const updated = [...activeSections];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, moved);
    setActiveSections(updated);
    setDraggedIndex(null);
    setDragOverIndex(null);
    showToast('Reordered section! Changes updated on preview.');
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Selecting a job from the dropdown (matching Resume Studio)
  const handleSelectJob = (jobId, list = savedJobsList) => {
    setSelectedJobId(jobId);
    const job = list.find(j => j.id === jobId);
    if (job) {
      setSelectedCompany(job.company);
      const preset = TARGET_COMPANIES_DATA[job.company];
      setLetterData(prev => ({
        ...prev,
        documentName: `${job.company} - ${job.title} Cover Letter`,
        role: job.title,
        ...(preset || {})
      }));
      showToast(`Linked ${job.company} — ${job.title}`);
    }
  };

  // Adding a job from AddJobModal
  const handleAddCustomJob = (newJob) => {
    const updated = [newJob, ...savedJobsList];
    setSavedJobsList(updated);
    try {
      sessionStorage.setItem('jobgen_candidate_saved_jobs', JSON.stringify(updated));
    } catch (e) {}
    handleSelectJob(newJob.id, updated);
    setShowAddJobModal(false);
    showToast(`Added ${newJob.company} — ${newJob.title}!`);
  };

  // Total word count calculation
  const totalWords = [letterData.opening, letterData.body, ...(letterData.bullets || []), letterData.closing]
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;

  // Helper to render dynamic sections on the live paper canvas in exact order
  const renderCanvasSection = (secId) => {
    if (secId === 'recipient') {
      return (
        <div key="recipient" style={{ marginBottom: '22px', fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
          <p style={{ margin: '0 0 4px 0', fontWeight: 600 }}>{letterData.date}</p>
          <p style={{ margin: '0 0 2px 0', fontWeight: 800, color: '#0F172A', fontSize: '13px' }}>{letterData.recipient}</p>
          <p style={{ margin: '0 0 2px 0', fontWeight: 700, color: '#111827' }}>{selectedCompany}</p>
          <p style={{ margin: '0 0 6px 0' }}>{letterData.address}</p>
          <p style={{ margin: 0, fontWeight: 800, color: letterData.template === 'modern' ? '#1A53CF' : '#0F172A' }}>
            Re: Application for {letterData.role}
          </p>
        </div>
      );
    }

    if (secId === 'opening') {
      return (
        <p key="opening" style={{ margin: '0 0 16px 0', fontSize: '12.5px', lineHeight: 1.7, color: '#334155', textAlign: 'justify' }}>
          {letterData.opening}
        </p>
      );
    }

    if (secId === 'body') {
      return (
        <p key="body" style={{ margin: '0 0 16px 0', fontSize: '12.5px', lineHeight: 1.7, color: '#334155', textAlign: 'justify' }}>
          {letterData.body}
        </p>
      );
    }

    if (secId === 'highlights') {
      if (!letterData.bullets || letterData.bullets.length === 0) return null;
      return (
        <div key="highlights" style={{ margin: '0 0 16px 0' }}>
          <span style={{ fontWeight: 800, color: '#0F172A', display: 'block', marginBottom: '8px', fontSize: '12.5px' }}>
            Key Strategic & Technical Highlights:
          </span>
          <ul style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {letterData.bullets.map((b, bIdx) => (
              <li key={bIdx} style={{ color: '#334155', fontSize: '12.5px', lineHeight: 1.6 }}>
                {b}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (secId === 'closing') {
      return (
        <p key="closing" style={{ margin: '0 0 16px 0', fontSize: '12.5px', lineHeight: 1.7, color: '#334155', textAlign: 'justify' }}>
          {letterData.closing}
        </p>
      );
    }

    if (secId === 'signoff') {
      return (
        <div key="signoff" style={{ marginTop: '16px', paddingTop: '8px', whiteSpace: 'pre-line', fontWeight: 800, color: '#0F172A', fontSize: '13px' }}>
          {letterData.signOff}
        </div>
      );
    }

    // Custom section rendering
    const customSec = (letterData.customSections || []).find(c => c.id === secId);
    if (customSec) {
      return (
        <div key={secId} style={{ margin: '0 0 16px 0' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', margin: '0 0 6px 0' }}>
            {customSec.title}
          </h4>
          <p style={{ margin: 0, fontSize: '12.5px', lineHeight: 1.7, color: '#334155', whiteSpace: 'pre-line', textAlign: 'justify' }}>
            {customSec.content || 'Custom section content...'}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '1320px', 
        minHeight: '1320px',
        maxHeight: '1320px',
        overflow: 'hidden', 
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '1.5px solid #E2E8F0',
        boxShadow: '0 20px 50px -10px rgba(15, 23, 42, 0.08), 0 4px 14px rgba(15, 23, 42, 0.04)',
        boxSizing: 'border-box',
        position: 'relative',
        width: '100%',
        maxWidth: '1440px',
        margin: '0 auto'
      }}
    >
      
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

      {/* Top Action Bar */}
      <header 
        style={{ 
          height: '62px', 
          backgroundColor: '#FFFFFF', 
          borderBottom: '1px solid #E2E8F0', 
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
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
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EFF6FF'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
          >
            <ArrowLeft size={16} />
          </button>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isEditingTitle ? (
                <input 
                  type="text"
                  value={letterData.documentName}
                  onChange={(e) => setLetterData(prev => ({ ...prev, documentName: e.target.value }))}
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
                  <span>{letterData.documentName}</span>
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

        {/* Right: Word Count Indicator (Replacing ATS) + Export PDF */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          
          {/* Word Count Indicator replacing ATS */}
          <div
            title={`Total Word Count: ${totalWords} words · 1 Page`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              cursor: 'default',
              flexShrink: 0,
              backgroundColor: '#F0FDF4',
              border: '1.5px solid #10B981',
              borderRadius: '999px',
              padding: '3px 12px 3px 3px',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.16)'
            }}
          >
            {/* Green Circle with Word Count Number */}
            <div
              style={{
                minWidth: '32px',
                height: '32px',
                padding: '0 8px',
                borderRadius: '16px',
                backgroundColor: '#10B981',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12.5px',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                boxShadow: '0 2px 6px rgba(16, 185, 129, 0.35)',
                flexShrink: 0
              }}
            >
              {totalWords}
            </div>

            {/* Attached Text: Words · 1 Page */}
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#065F46',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                lineHeight: 1
              }}
            >
              Words · 1 Page
            </span>
          </div>

          {/* Export PDF Button */}
          <button
            onClick={() => window.print()}
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
            <Download size={14} />
            <span>Export PDF</span>
          </button>
        </div>
      </header>

      {/* Main Split Body: Left Editor Workspace + Right A4 Paper Canvas */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        
        {/* Left Column: Fixed Width 580px */}
        <div 
          style={{ 
            width: '580px', 
            minWidth: '580px',
            maxWidth: '580px',
            flexShrink: 0, 
            display: 'flex', 
            flexDirection: 'column', 
            backgroundColor: '#FFFFFF', 
            borderRight: '1px solid #E2E8F0',
            borderBottomLeftRadius: '24px',
            overflow: 'hidden'
          }}
        >
          {/* =========================================================================
              CAROUSEL: SKELETAL FRAMEWORK OF COVER LETTER DESIGNS
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
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#090C15' }}>Letter Designs</span>
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
                  title="Previous styles"
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
                  title="Next styles"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>

            {/* Carousel Horizontal Scroll Track with Top Padding */}
            <div
              ref={carouselRef}
              style={{
                display: 'flex',
                gap: '12px',
                overflowX: 'auto',
                paddingTop: '10px',
                paddingBottom: '12px',
                paddingLeft: '4px',
                paddingRight: '4px',
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {COVER_LETTER_TEMPLATES.map((tpl) => {
                const isSelected = letterData.template === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => {
                      setLetterData(prev => ({ ...prev, template: tpl.id }));
                      showToast(`Applied ${tpl.name} design.`);
                    }}
                    style={{
                      width: '122px',
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
                    {/* Skeletal Framework Preview on Pure White Background (No Text) */}
                    <div style={{ position: 'relative', height: '144px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #F1F5F9' }}>
                      <CoverLetterSkeletonPreview templateId={tpl.id} />
                      {isSelected && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '6px',
                            left: '6px',
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            backgroundColor: '#1A53CF',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(26, 83, 207, 0.4)'
                          }}
                        >
                          <Check size={11} strokeWidth={3} />
                        </div>
                      )}
                    </div>

                    {/* Card Label */}
                    <div style={{ padding: '8px 10px', backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF', textAlign: 'center' }}>
                      <p style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: isSelected ? '#1A53CF' : '#090C15', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {tpl.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              EDITING WORKSPACE (SAVED JOBS DROPDOWN + DRAGGABLE SECTIONS)
              ========================================================================= */}
          <div 
            ref={leftEditorRef}
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
            onWheel={(e) => {
              const el = e.currentTarget;
              const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= 4;
              const isAtTop = el.scrollTop <= 0;
              if ((isAtBottom && e.deltaY > 0) || (isAtTop && e.deltaY < 0)) {
                if (window.lenis) {
                  window.lenis.scrollTo(window.scrollY + e.deltaY * 1.2, { duration: 0.5 });
                } else {
                  window.scrollBy({ top: e.deltaY, left: 0, behavior: 'auto' });
                }
              }
            }}
          >
            {/* SAVED JOBS DROPDOWN SELECTOR WITH "+ ADD JOB" BUTTON BESIDE IT (Matches Resume Builder) */}
            <div 
              style={{ 
                flexShrink: 0,
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                padding: '12px 14px', 
                borderRadius: '12px', 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E2E8F0',
                boxShadow: '0 1px 4px rgba(15, 23, 42, 0.04)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Briefcase size={15} color="#1A53CF" />
                </div>
                <select
                  value={selectedJobId}
                  onChange={(e) => handleSelectJob(e.target.value)}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #E2E8F0',
                    backgroundColor: '#F8FAFC',
                    color: '#090C15',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    outline: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#1A53CF'; e.target.style.backgroundColor = '#FFFFFF'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}
                >
                  {savedJobsList.map(job => (
                    <option key={job.id} value={job.id}>
                      {job.company} — {job.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Button Beside Dropdown: Add Job */}
              <button
                type="button"
                onClick={() => setShowAddJobModal(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#1A53CF',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  flexShrink: 0,
                  boxShadow: '0 2px 6px rgba(26, 83, 207, 0.25)',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1545B0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1A53CF'}
              >
                <Plus size={14} strokeWidth={2.5} />
                <span>Add Job</span>
              </button>
            </div>

            {/* Draggable Section Rows matching user screenshot */}
            {activeSections.map((section, index) => {
              const isOpen = !!openSections[section.id];
              const isHidden = !!hiddenSections[section.id];
              const isBeingDragged = draggedIndex === index;
              const isDragOver = dragOverIndex === index;

              return (
                <div 
                  key={section.id}
                  draggable={section.hasDrag}
                  onDragStart={(e) => section.hasDrag && handleDragStart(e, index)}
                  onDragOver={(e) => section.hasDrag && handleDragOver(e, index)}
                  onDrop={(e) => section.hasDrag && handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  style={{ 
                    flexShrink: 0,
                    borderRadius: '12px', 
                    border: isDragOver ? '2px solid #1A53CF' : '1px solid #E2E8F0', 
                    backgroundColor: '#FFFFFF',
                    boxShadow: isDragOver ? '0 4px 14px rgba(26, 83, 207, 0.18)' : '0 1.5px 5px rgba(15, 23, 42, 0.03)',
                    overflow: 'hidden',
                    opacity: isBeingDragged ? 0.45 : 1,
                    transition: 'border 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease'
                  }}
                >
                  {/* Section Row Header */}
                  <div 
                    onClick={() => toggleSection(section.id)}
                    style={{ 
                      width: '100%', 
                      padding: '13px 16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      backgroundColor: '#FFFFFF', 
                      cursor: 'pointer',
                      borderBottom: isOpen ? '1px solid #F1F5F9' : 'none',
                      userSelect: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    {/* Left: Drag Handle + Green Checkmark Circle + Section Title */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                      {section.hasDrag ? (
                        <div 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            color: '#94A3B8', 
                            cursor: 'grab', 
                            flexShrink: 0,
                            padding: '2px 0'
                          }}
                          title="Drag to reorder section"
                          onMouseDown={(e) => e.stopPropagation()}
                        >
                          <GripVertical size={16} />
                        </div>
                      ) : (
                        <div style={{ width: '6px', flexShrink: 0 }} />
                      )}

                      {/* Green circle with checkmark badge */}
                      <div 
                        style={{ 
                          width: '20px', 
                          height: '20px', 
                          borderRadius: '50%', 
                          backgroundColor: '#DCFCE7', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          flexShrink: 0 
                        }}
                      >
                        <Check size={12} color="#10B981" strokeWidth={3} />
                      </div>

                      {/* Section Title */}
                      <span 
                        style={{ 
                          fontSize: '13.5px', 
                          fontWeight: 800, 
                          color: isHidden ? '#94A3B8' : '#090C15',
                          textDecoration: isHidden ? 'line-through' : 'none',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {section.title}
                        {isHidden && (
                          <span style={{ fontSize: '11px', fontWeight: 600, color: '#94A3B8', textDecoration: 'none', marginLeft: '6px' }}>
                            (Hidden)
                          </span>
                        )}
                      </span>
                    </div>

                    {/* Right: Chevron + Eye/EyeOff + Trash2 */}
                    <div 
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Chevron Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleSection(section.id)}
                        title={isOpen ? "Collapse section" : "Expand section"}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          color: '#94A3B8',
                          borderRadius: '6px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#475569'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                      >
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      {/* Eye / EyeOff Icon (Hide/Show on cover letter) */}
                      {section.hasEye && (
                        <button
                          type="button"
                          onClick={() => toggleHideSection(section.id)}
                          title={isHidden ? "Show section on cover letter" : "Hide section from cover letter"}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            color: isHidden ? '#CBD5E1' : '#94A3B8',
                            borderRadius: '6px',
                            transition: 'color 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = isHidden ? '#1A53CF' : '#090C15'}
                          onMouseLeave={(e) => e.currentTarget.style.color = isHidden ? '#CBD5E1' : '#94A3B8'}
                        >
                          {isHidden ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      )}

                      {/* Delete Dustbin Icon (for deletable sections) */}
                      {section.deletable && (
                        <button
                          type="button"
                          onClick={() => handleDeleteSection(section.id)}
                          title="Delete section from cover letter"
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#EF4444',
                            borderRadius: '6px'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#B91C1C'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#EF4444'}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expandable Section Body Fields */}
                  {isOpen && (
                    <div style={{ padding: '16px 18px', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      
                      {/* 1. Recipient & Addressee */}
                      {section.id === 'recipient' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Date</label>
                              <input 
                                type="text" 
                                value={letterData.date}
                                onChange={(e) => setLetterData(prev => ({ ...prev, date: e.target.value }))}
                                style={{ width: '100%', padding: '8px 10px', borderRadius: '7px', border: '1px solid #CBD5E1', fontSize: '12px', outline: 'none' }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Recipient Name / Team</label>
                              <input 
                                type="text" 
                                value={letterData.recipient}
                                onChange={(e) => setLetterData(prev => ({ ...prev, recipient: e.target.value }))}
                                style={{ width: '100%', padding: '8px 10px', borderRadius: '7px', border: '1px solid #CBD5E1', fontSize: '12px', outline: 'none' }}
                              />
                            </div>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Target Role</label>
                              <input 
                                type="text" 
                                value={letterData.role}
                                onChange={(e) => setLetterData(prev => ({ ...prev, role: e.target.value }))}
                                style={{ width: '100%', padding: '8px 10px', borderRadius: '7px', border: '1px solid #CBD5E1', fontSize: '12px', outline: 'none' }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Office Address</label>
                              <input 
                                type="text" 
                                value={letterData.address}
                                onChange={(e) => setLetterData(prev => ({ ...prev, address: e.target.value }))}
                                style={{ width: '100%', padding: '8px 10px', borderRadius: '7px', border: '1px solid #CBD5E1', fontSize: '12px', outline: 'none' }}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 2. Opening Paragraph & Hook */}
                      {section.id === 'opening' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <textarea 
                            value={letterData.opening}
                            onChange={(e) => setLetterData(prev => ({ ...prev, opening: e.target.value }))}
                            rows={4}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12.5px', lineHeight: 1.55, outline: 'none', boxSizing: 'border-box' }}
                          />
                        </div>
                      )}

                      {/* 3. Core Narrative & Impact */}
                      {section.id === 'body' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <textarea 
                            value={letterData.body}
                            onChange={(e) => setLetterData(prev => ({ ...prev, body: e.target.value }))}
                            rows={5}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12.5px', lineHeight: 1.55, outline: 'none', boxSizing: 'border-box' }}
                          />
                        </div>
                      )}

                      {/* 4. Key Highlights & Metrics */}
                      {section.id === 'highlights' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {(letterData.bullets || []).map((b, i) => (
                            <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                              <span style={{ color: '#1A53CF', fontWeight: 800, marginTop: '4px' }}>•</span>
                              <textarea
                                value={b}
                                onChange={(e) => {
                                  const next = [...letterData.bullets];
                                  next[i] = e.target.value;
                                  setLetterData(prev => ({ ...prev, bullets: next }));
                                }}
                                rows={2}
                                style={{ flex: 1, padding: '6px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '11.5px', outline: 'none' }}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setLetterData(prev => ({
                                    ...prev,
                                    bullets: prev.bullets.filter((_, idx) => idx !== i)
                                  }));
                                }}
                                style={{ padding: '5px 7px', borderRadius: '6px', backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', cursor: 'pointer' }}
                                title="Delete metric bullet"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              setLetterData(prev => ({
                                ...prev,
                                bullets: [...(prev.bullets || []), 'Authored mission-critical strategy resulting in 25% efficiency gains.']
                              }));
                            }}
                            style={{
                              alignSelf: 'flex-start',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                              padding: '5px 10px',
                              borderRadius: '6px',
                              border: '1px dashed #CBD5E1',
                              backgroundColor: '#F8FAFC',
                              color: '#1A53CF',
                              fontSize: '11.5px',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                          >
                            <Plus size={13} />
                            <span>Add Highlight Metric</span>
                          </button>
                        </div>
                      )}

                      {/* 5. Closing & Call to Action */}
                      {section.id === 'closing' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <textarea 
                            value={letterData.closing}
                            onChange={(e) => setLetterData(prev => ({ ...prev, closing: e.target.value }))}
                            rows={3}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12.5px', outline: 'none', boxSizing: 'border-box' }}
                          />
                        </div>
                      )}

                      {/* 6. Formal Sign-off */}
                      {section.id === 'signoff' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <textarea 
                            value={letterData.signOff}
                            onChange={(e) => setLetterData(prev => ({ ...prev, signOff: e.target.value }))}
                            rows={2}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12.5px', outline: 'none', boxSizing: 'border-box' }}
                          />
                        </div>
                      )}

                      {/* Custom Section Body */}
                      {section.id.startsWith('custom-') && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <textarea 
                            value={(letterData.customSections || []).find(c => c.id === section.id)?.content || ''}
                            onChange={(e) => {
                              const text = e.target.value;
                              setLetterData(prev => {
                                const customSections = [...(prev.customSections || [])];
                                const idx = customSections.findIndex(c => c.id === section.id);
                                if (idx >= 0) {
                                  customSections[idx] = { ...customSections[idx], content: text };
                                } else {
                                  customSections.push({ id: section.id, title: section.title, content: text });
                                }
                                return { ...prev, customSections };
                              });
                            }}
                            rows={3}
                            placeholder="Enter custom section notes, postscript, or references..."
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12.5px', outline: 'none', boxSizing: 'border-box' }}
                          />
                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })}

            {/* =========================================================================
                "+ ADD SECTION" BUTTON BELOW ALL SECTIONS
                ========================================================================= */}
            <div style={{ position: 'relative', marginTop: '4px', marginBottom: '20px' }}>
              <button
                type="button"
                onClick={() => setShowAddSectionMenu(!showAddSectionMenu)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1.5px dashed #CBD5E1',
                  backgroundColor: '#F8FAFC',
                  color: '#1A53CF',
                  fontSize: '13px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1A53CF';
                  e.currentTarget.style.backgroundColor = '#EFF6FF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#CBD5E1';
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                }}
              >
                <Plus size={16} />
                <span>Add Section</span>
              </button>

              {/* Add Section Menu Dropdown */}
              {showAddSectionMenu && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    marginTop: '8px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 12px 32px rgba(15, 23, 42, 0.12)',
                    padding: '14px',
                    zIndex: 50,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#090C15' }}>Add to Cover Letter</span>
                    <button 
                      onClick={() => setShowAddSectionMenu(false)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
                    >
                      <X size={14} />
                    </button>
                  </div>

                  {/* Restore Deleted Standard Sections */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Standard Letterhead Modules:</span>
                    {DEFAULT_COVER_SECTIONS.filter(ds => !activeSections.some(as => as.id === ds.id)).length === 0 ? (
                      <span style={{ fontSize: '11.5px', color: '#94A3B8', fontStyle: 'italic' }}>All standard sections are currently added</span>
                    ) : (
                      DEFAULT_COVER_SECTIONS.filter(ds => !activeSections.some(as => as.id === ds.id)).map(ds => (
                        <button
                          key={ds.id}
                          onClick={() => handleAddDefaultSection(ds.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: '1px solid #E2E8F0',
                            backgroundColor: '#FFFFFF',
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#090C15',
                            cursor: 'pointer',
                            textAlign: 'left'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EFF6FF'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                        >
                          <span>+ {ds.title}</span>
                          <Plus size={13} color="#1A53CF" />
                        </button>
                      ))
                    )}
                  </div>

                  {/* Create Custom Section */}
                  <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Or Create Custom Section:</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input 
                        type="text"
                        placeholder="e.g. Postscript / P.S., Portfolio References"
                        value={customSectionTitle}
                        onChange={(e) => setCustomSectionTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddCustomSection()}
                        style={{ flex: 1, padding: '7px 10px', borderRadius: '7px', border: '1px solid #CBD5E1', fontSize: '12px', outline: 'none' }}
                      />
                      <button
                        onClick={handleAddCustomSection}
                        style={{
                          padding: '7px 14px',
                          borderRadius: '7px',
                          backgroundColor: '#1A53CF',
                          color: '#FFFFFF',
                          border: 'none',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right Column: Live A4 Letterhead Canvas (Default 90% Scale) */}
        <div 
          style={{ 
            flex: 1, 
            backgroundColor: '#EFF3F8', 
            overflowY: 'auto', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '24px 24px 48px 24px',
            borderBottomRightRadius: '24px',
            position: 'relative'
          }}
        >
          {/* Animated Glowing Square Grid Canvas Background */}
          <GlowingGridBackground />

          {/* Zoom bar */}
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
              onClick={() => setZoomLevel(90)}
              style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 700, color: '#1A53CF' }}
            >
              Fit
            </button>
            <span style={{ color: '#CBD5E1' }}>|</span>
            
            {/* Page Navigation Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                title="Previous Page"
                style={{ 
                  border: 'none', 
                  background: 'none', 
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer', 
                  opacity: currentPage === 1 ? 0.35 : 1,
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '2px 4px', 
                  color: '#334155' 
                }}
              >
                <ChevronLeft size={14} />
              </button>
              
              <span style={{ fontSize: '11px', color: '#090C15', fontWeight: 700, minWidth: '68px', textAlign: 'center' }}>
                Page {currentPage} of {totalPages}
              </span>

              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                title="Next Page"
                style={{ 
                  border: 'none', 
                  background: 'none', 
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', 
                  opacity: currentPage === totalPages ? 0.35 : 1,
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '2px 4px', 
                  color: '#334155' 
                }}
              >
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Option to go to next page if there is more content */}
            {totalPages > 1 && currentPage < totalPages && (
              <>
                <span style={{ color: '#CBD5E1' }}>|</span>
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    backgroundColor: '#1A53CF',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(26, 83, 207, 0.28)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1541A6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1A53CF'}
                >
                  <span>Next Page</span>
                  <ArrowRight size={12} />
                </button>
              </>
            )}
          </div>

          {/* Quick Page Indicator Pills if Multi-page */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '8px',
                    border: currentPage === pageNum ? '1.5px solid #1A53CF' : '1px solid #CBD5E1',
                    backgroundColor: currentPage === pageNum ? '#EFF6FF' : '#FFFFFF',
                    color: currentPage === pageNum ? '#1A53CF' : '#64748B',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: currentPage === pageNum ? '0 2px 8px rgba(26, 83, 207, 0.15)' : 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <FileText size={12} />
                  <span>Page {pageNum}</span>
                </button>
              ))}
            </div>
          )}

          {/* Scaled paper bounding box wrapper with fixed physical A4 aspect bounds */}
          <div 
            style={{
              width: `${794 * (zoomLevel / 100)}px`,
              height: `${1123 * (zoomLevel / 100)}px`,
              minHeight: `${1123 * (zoomLevel / 100)}px`,
              maxHeight: `${1123 * (zoomLevel / 100)}px`,
              position: 'relative',
              zIndex: 10,
              flexShrink: 0,
              margin: '0 auto',
              transition: 'width 0.15s ease, height 0.15s ease'
            }}
          >
            {/* Authentic Physical A4 Letterhead Paper (Fixed 794x1123px) */}
            <div 
              style={{
                width: '794px',
                height: '1123px',
                minHeight: '1123px',
                maxHeight: '1123px',
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 18px 50px rgba(15, 23, 42, 0.12), 0 2px 10px rgba(0, 0, 0, 0.04)',
                borderRadius: '4px',
                padding: letterData.template === 'sidebar' ? '0px' : '48px 60px',
                boxSizing: 'border-box',
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top left',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: letterData.template === 'sidebar' ? 'row' : 'column',
                fontFamily: letterData.template === 'modern' || letterData.template === 'balanced' || letterData.template === 'sidebar' ? 'Inter, "Segoe UI", Arial, sans-serif' : '"Noto Serif", Georgia, serif',
                color: '#111827',
                transition: 'transform 0.15s ease'
              }}
            >
              {currentPage === 1 ? (
                <>
                  {/* Sidebar Template Layout for Page 1 */}
                  {letterData.template === 'sidebar' ? (
                    <>
                      {/* Left Identity Column */}
                      <div style={{ width: '240px', backgroundColor: '#F8FAFC', borderRight: '1px solid #E2E8F0', padding: '52px 28px', boxSizing: 'border-box' }}>
                        <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: '#0F172A', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 900, marginBottom: '20px' }}>
                          AW
                        </div>
                        <h1 style={{ fontSize: '20px', fontWeight: 900, color: '#0F172A', margin: '0 0 6px 0', lineHeight: 1.2 }}>
                          {letterData.candidateName}
                        </h1>
                        <p style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600, margin: '0 0 24px 0' }}>
                          {letterData.candidateTitle}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '11px', color: '#475569' }}>
                          <div>
                            <span style={{ display: 'block', fontWeight: 800, color: '#090C15', textTransform: 'uppercase', fontSize: '10px' }}>Location</span>
                            <span>{letterData.location}</span>
                          </div>
                          <div>
                            <span style={{ display: 'block', fontWeight: 800, color: '#090C15', textTransform: 'uppercase', fontSize: '10px' }}>Email</span>
                            <span style={{ color: '#1A53CF', wordBreak: 'break-all' }}>{letterData.email}</span>
                          </div>
                          <div>
                            <span style={{ display: 'block', fontWeight: 800, color: '#090C15', textTransform: 'uppercase', fontSize: '10px' }}>Phone</span>
                            <span>{letterData.phone}</span>
                          </div>
                          <div>
                            <span style={{ display: 'block', fontWeight: 800, color: '#090C15', textTransform: 'uppercase', fontSize: '10px' }}>LinkedIn</span>
                            <span style={{ wordBreak: 'break-all' }}>{letterData.linkedin}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Body Column */}
                      <div style={{ flex: 1, padding: '52px 44px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ flex: 1, minHeight: 0 }}>
                          {(coverPages[0] || []).map(sec => renderCanvasSection(sec.id))}
                        </div>

                        {/* Option to go to next page if there is more content */}
                        {totalPages > 1 && (
                          <div 
                            onClick={() => setCurrentPage(2)}
                            style={{
                              marginTop: 'auto',
                              paddingTop: '8px',
                              borderTop: '1px dashed #CBD5E1',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              fontSize: '11px',
                              color: '#1A53CF',
                              fontWeight: 700,
                              userSelect: 'none'
                            }}
                          >
                            <span style={{ color: '#64748B', fontWeight: 500, fontStyle: 'italic' }}>
                              Page 1 of {totalPages} · Continued on Page 2
                            </span>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              Go to Next Page <ArrowRight size={13} />
                            </span>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    /* Standard Letterhead Templates (Classic, Modern, Executive, Balanced) */
                    <>
                      {/* Letterhead Header according to template */}
                      <div style={{ marginBottom: '20px' }}>
                        {letterData.template === 'initials' && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                            <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid #047857', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#047857', fontSize: '15px' }}>
                              AW
                            </div>
                            <div>
                              <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#047857', margin: 0 }}>
                                {letterData.candidateName}
                              </h1>
                              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                                {letterData.candidateTitle}
                              </p>
                            </div>
                          </div>
                        )}

                        {letterData.template === 'balanced' && (
                          <div style={{ padding: '16px 20px', backgroundColor: '#0F172A', color: '#FFFFFF', borderRadius: '8px', marginBottom: '16px' }}>
                            <h1 style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.02em', margin: '0 0 4px 0', color: '#FFFFFF' }}>
                              {letterData.candidateName}
                            </h1>
                            <div style={{ display: 'flex', gap: '8px 14px', flexWrap: 'wrap', fontSize: '11px', color: '#94A3B8' }}>
                              <span>{letterData.location}</span>
                              <span>•</span>
                              <span>{letterData.phone}</span>
                              <span>•</span>
                              <span style={{ color: '#60A5FA' }}>{letterData.email}</span>
                            </div>
                          </div>
                        )}

                        {letterData.template !== 'balanced' && letterData.template !== 'initials' && (
                          <div>
                            <h1 
                              style={{ 
                                fontSize: '26px', 
                                fontWeight: 900, 
                                letterSpacing: '-0.02em', 
                                color: letterData.template === 'modern' ? '#1A53CF' : '#0F172A',
                                margin: '0 0 6px 0' 
                              }}
                            >
                              {letterData.candidateName}
                            </h1>
                            
                            <div style={{ display: 'flex', gap: '8px 14px', flexWrap: 'wrap', fontSize: '11.5px', color: '#475569', fontWeight: 500 }}>
                              <span>{letterData.location}</span>
                              <span>•</span>
                              <span>{letterData.phone}</span>
                              <span>•</span>
                              <span style={{ color: '#1A53CF', fontWeight: 600 }}>{letterData.email}</span>
                              <span>•</span>
                              <span>{letterData.linkedin}</span>
                            </div>
                          </div>
                        )}

                        {/* Horizontal Divider Keyline */}
                        <div 
                          style={{ 
                            height: letterData.template === 'modern' ? '2.5px' : '1.5px', 
                            backgroundColor: letterData.template === 'modern' ? '#1A53CF' : letterData.template === 'initials' ? '#A7F3D0' : '#D1D5DB', 
                            marginTop: '12px' 
                          }} 
                        />
                      </div>

                      {/* Dynamic Content Sections in exact user-ordered & unhidden sequence */}
                      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                        {(coverPages[0] || []).map(sec => renderCanvasSection(sec.id))}
                      </div>

                      {/* Option to go to next page if there is more content */}
                      {totalPages > 1 && (
                        <div 
                          onClick={() => setCurrentPage(2)}
                          style={{
                            marginTop: 'auto',
                            paddingTop: '8px',
                            borderTop: '1px dashed #CBD5E1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            fontSize: '11px',
                            color: '#1A53CF',
                            fontWeight: 700,
                            userSelect: 'none'
                          }}
                        >
                          <span style={{ color: '#64748B', fontWeight: 500, fontStyle: 'italic' }}>
                            Page 1 of {totalPages} · Continued on Page 2
                          </span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            Go to Next Page <ArrowRight size={13} />
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                /* Page 2+ for Cover Letter */
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Continuation Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1.5px solid #111827', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h2 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#111827', margin: 0 }}>
                        {letterData.candidateName}
                      </h2>
                      <span style={{ fontSize: '11px', color: '#64748B' }}>— Cover Letter (Page {currentPage} of {totalPages})</span>
                    </div>
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: 'none',
                        border: 'none',
                        color: '#1A53CF',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        padding: '2px 6px'
                      }}
                    >
                      <ArrowLeft size={12} />
                      <span>Previous Page</span>
                    </button>
                  </div>

                  {/* Sections for Page 2+ */}
                  <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                    {(coverPages[currentPage - 1] || []).map(sec => renderCanvasSection(sec.id))}
                  </div>

                  {/* Bottom Footer for Page 2+ */}
                  <div 
                    style={{
                      marginTop: 'auto',
                      paddingTop: '8px',
                      borderTop: '1px solid #F1F5F9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '10.5px',
                      color: '#94A3B8'
                    }}
                  >
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: 'none',
                        border: 'none',
                        color: '#1A53CF',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      <ArrowLeft size={12} />
                      <span>Back to Page 1</span>
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Add Job Modal matching Resume Studio */}
      <AddJobModal 
        isOpen={showAddJobModal} 
        onClose={() => setShowAddJobModal(false)} 
        onAddJob={handleAddCustomJob} 
      />

    </div>
  );
}
