import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  FileText, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Copy, 
  Eye, 
  EyeOff,
  GripVertical,
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
  BookOpen,
  ArrowLeft,
  ArrowRight,
  X
} from 'lucide-react';
import AddJobModal from './AddJobModal';
import GlowingGridBackground from './GlowingGridBackground';

// Resume Templates list with clean style names
const RESUME_TEMPLATES = [
  {
    id: 'jake',
    name: 'Classic ATS',
    font: 'serif',
    accentColor: '#171717'
  },
  {
    id: 'consultantpolished',
    name: 'Advisory',
    font: 'serif',
    accentColor: '#1E3A8A'
  },
  {
    id: 'architectsportfolio',
    name: 'Portfolio',
    font: 'sans',
    accentColor: '#334155'
  },
  {
    id: 'londonbureau',
    name: 'Bureau',
    font: 'serif',
    accentColor: '#2563EB'
  },
  {
    id: 'operationsprecision',
    name: 'Precision',
    font: 'sans',
    accentColor: '#0D9488'
  },
  {
    id: 'nordicminimal',
    name: 'Minimalist',
    font: 'sans',
    accentColor: '#475569'
  }
];

// Clean White Background Skeletal Framework Wireframes (No Text)
function ResumeSkeletonPreview({ templateId }) {
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

        {/* 1. Classic ATS (Jake Single-Column) */}
        {templateId === 'jake' && (
          <g>
            {/* Centered Name & Subline */}
            <rect x="34" y="9" width="32" height="4.5" rx="1.5" fill="#0F172A" />
            <rect x="24" y="16" width="52" height="2" rx="0.5" fill="#94A3B8" />
            <line x1="10" y1="21" x2="90" y2="21" stroke="#0F172A" strokeWidth="0.8" />
            {/* Section 1 */}
            <rect x="10" y="25" width="22" height="2.8" rx="0.5" fill="#0F172A" />
            <rect x="10" y="30" width="80" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="10" y="34" width="76" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="10" y="38" width="52" height="1.8" rx="0.5" fill="#CBD5E1" />
            <line x1="10" y1="43" x2="90" y2="43" stroke="#E2E8F0" strokeWidth="0.6" />
            {/* Section 2 */}
            <rect x="10" y="47" width="26" height="2.8" rx="0.5" fill="#0F172A" />
            <rect x="10" y="52" width="30" height="2" rx="0.5" fill="#334155" />
            <rect x="70" y="52" width="20" height="1.8" rx="0.5" fill="#94A3B8" />
            <circle cx="12" cy="58" r="0.9" fill="#0F172A" />
            <rect x="16" y="57" width="74" height="1.8" rx="0.5" fill="#CBD5E1" />
            <circle cx="12" cy="63" r="0.9" fill="#0F172A" />
            <rect x="16" y="62" width="68" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="10" y="68" width="26" height="2" rx="0.5" fill="#334155" />
            <rect x="72" y="68" width="18" height="1.8" rx="0.5" fill="#94A3B8" />
            <circle cx="12" cy="74" r="0.9" fill="#0F172A" />
            <rect x="16" y="73" width="74" height="1.8" rx="0.5" fill="#CBD5E1" />
            <circle cx="12" cy="79" r="0.9" fill="#0F172A" />
            <rect x="16" y="78" width="60" height="1.8" rx="0.5" fill="#CBD5E1" />
            <line x1="10" y1="84" x2="90" y2="84" stroke="#E2E8F0" strokeWidth="0.6" />
            {/* Section 3 Skills */}
            <rect x="10" y="88" width="20" height="2.8" rx="0.5" fill="#0F172A" />
            <rect x="10" y="93" width="80" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="10" y="97" width="65" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="10" y="104" width="22" height="2.8" rx="0.5" fill="#0F172A" />
            <rect x="10" y="109" width="80" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="10" y="113" width="58" height="1.8" rx="0.5" fill="#CBD5E1" />
          </g>
        )}

        {/* 2. Advisory (Executive Two-Column with Navy Header) */}
        {templateId === 'consultantpolished' && (
          <g>
            <rect x="4" y="3" width="92" height="14" rx="2" fill="#1E3A8A" />
            <rect x="10" y="8" width="34" height="4" rx="1" fill="#FFFFFF" />
            <rect x="58" y="9" width="30" height="2" rx="0.5" fill="#93C5FD" opacity="0.8" />
            <line x1="33" y1="21" x2="33" y2="126" stroke="#E2E8F0" strokeWidth="0.8" />
            {/* Left Column */}
            <rect x="8" y="24" width="16" height="2.5" rx="0.5" fill="#1E3A8A" />
            <rect x="8" y="29" width="20" height="1.6" rx="0.5" fill="#94A3B8" />
            <rect x="8" y="33" width="18" height="1.6" rx="0.5" fill="#94A3B8" />
            <rect x="8" y="37" width="14" height="1.6" rx="0.5" fill="#94A3B8" />
            <rect x="8" y="46" width="18" height="2.5" rx="0.5" fill="#1E3A8A" />
            <rect x="8" y="51" width="20" height="1.6" rx="0.5" fill="#CBD5E1" />
            <rect x="8" y="55" width="18" height="1.6" rx="0.5" fill="#CBD5E1" />
            <rect x="8" y="59" width="20" height="1.6" rx="0.5" fill="#CBD5E1" />
            <rect x="8" y="68" width="15" height="2.5" rx="0.5" fill="#1E3A8A" />
            <rect x="8" y="73" width="19" height="1.6" rx="0.5" fill="#CBD5E1" />
            <rect x="8" y="77" width="16" height="1.6" rx="0.5" fill="#CBD5E1" />
            {/* Right Column */}
            <rect x="38" y="24" width="28" height="2.8" rx="0.5" fill="#1E3A8A" />
            <rect x="38" y="29" width="54" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="38" y="33" width="50" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="38" y="42" width="30" height="2.8" rx="0.5" fill="#1E3A8A" />
            <rect x="38" y="48" width="34" height="2" rx="0.5" fill="#0F172A" />
            <rect x="38" y="52" width="54" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="38" y="56" width="48" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="38" y="60" width="52" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="38" y="68" width="32" height="2" rx="0.5" fill="#0F172A" />
            <rect x="38" y="72" width="54" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="38" y="76" width="46" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="38" y="85" width="26" height="2.8" rx="0.5" fill="#1E3A8A" />
            <rect x="38" y="90" width="54" height="1.8" rx="0.5" fill="#CBD5E1" />
          </g>
        )}

        {/* 3. Portfolio (Architectural Tech) */}
        {templateId === 'architectsportfolio' && (
          <g>
            <circle cx="16" cy="13" r="5" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="0.8" />
            <rect x="25" y="9" width="32" height="4" rx="1" fill="#334155" />
            <rect x="25" y="15" width="42" height="2" rx="0.5" fill="#94A3B8" />
            {/* Tech Chips */}
            <rect x="8" y="23" width="18" height="4.5" rx="2.2" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="0.6" />
            <rect x="29" y="23" width="22" height="4.5" rx="2.2" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="0.6" />
            <rect x="54" y="23" width="18" height="4.5" rx="2.2" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="0.6" />
            <rect x="75" y="23" width="16" height="4.5" rx="2.2" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="0.6" />
            {/* Project Box Cards */}
            <rect x="8" y="32" width="39" height="22" rx="2.5" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />
            <rect x="12" y="36" width="20" height="2" rx="0.5" fill="#334155" />
            <rect x="12" y="40" width="31" height="1.5" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="43" width="26" height="1.5" rx="0.5" fill="#CBD5E1" />
            <rect x="52" y="32" width="39" height="22" rx="2.5" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />
            <rect x="56" y="36" width="20" height="2" rx="0.5" fill="#334155" />
            <rect x="56" y="40" width="31" height="1.5" rx="0.5" fill="#CBD5E1" />
            <rect x="56" y="43" width="26" height="1.5" rx="0.5" fill="#CBD5E1" />
            {/* Experience Track */}
            <rect x="8" y="60" width="26" height="2.8" rx="0.5" fill="#334155" />
            <line x1="8" y1="65" x2="92" y2="65" stroke="#E2E8F0" strokeWidth="0.6" />
            <rect x="8" y="70" width="34" height="2" rx="0.5" fill="#0F172A" />
            <rect x="8" y="74" width="84" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="8" y="78" width="76" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="8" y="85" width="30" height="2" rx="0.5" fill="#0F172A" />
            <rect x="8" y="89" width="84" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="8" y="93" width="68" height="1.8" rx="0.5" fill="#CBD5E1" />
          </g>
        )}

        {/* 4. Bureau (Editorial Typography) */}
        {templateId === 'londonbureau' && (
          <g>
            <rect x="10" y="10" width="50" height="6.5" rx="1" fill="#2563EB" />
            <rect x="10" y="19" width="32" height="2" rx="0.5" fill="#94A3B8" />
            <line x1="10" y1="24" x2="90" y2="24" stroke="#2563EB" strokeWidth="1" />
            {/* Asymmetric Section 1 */}
            <rect x="10" y="30" width="16" height="2" rx="0.5" fill="#64748B" />
            <rect x="30" y="30" width="32" height="2.8" rx="0.5" fill="#0F172A" />
            <rect x="30" y="35" width="60" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="30" y="39" width="56" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="30" y="43" width="48" height="1.8" rx="0.5" fill="#CBD5E1" />
            {/* Asymmetric Section 2 */}
            <rect x="10" y="53" width="16" height="2" rx="0.5" fill="#64748B" />
            <rect x="30" y="53" width="36" height="2.8" rx="0.5" fill="#0F172A" />
            <rect x="30" y="58" width="60" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="30" y="62" width="52" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="30" y="66" width="58" height="1.8" rx="0.5" fill="#CBD5E1" />
            {/* Asymmetric Section 3 */}
            <rect x="10" y="76" width="16" height="2" rx="0.5" fill="#64748B" />
            <rect x="30" y="76" width="30" height="2.8" rx="0.5" fill="#0F172A" />
            <rect x="30" y="81" width="60" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="30" y="85" width="46" height="1.8" rx="0.5" fill="#CBD5E1" />
            {/* Editorial Tags */}
            <rect x="30" y="94" width="18" height="5" rx="1.5" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />
            <rect x="51" y="94" width="20" height="5" rx="1.5" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />
            <rect x="74" y="94" width="16" height="5" rx="1.5" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.8" />
          </g>
        )}

        {/* 5. Precision (Operations & DevOps) */}
        {templateId === 'operationsprecision' && (
          <g>
            <rect x="8" y="8" width="84" height="10" rx="2" fill="#F0FDFA" stroke="#0D9488" strokeWidth="0.8" />
            <rect x="14" y="11.5" width="30" height="3" rx="0.5" fill="#0D9488" />
            <rect x="58" y="12" width="30" height="2" rx="0.5" fill="#14B8A6" />
            {/* Timeline track */}
            <line x1="16" y1="24" x2="16" y2="120" stroke="#CCFBF1" strokeWidth="1.2" />
            {/* Node 1 */}
            <circle cx="16" cy="30" r="2" fill="#0D9488" />
            <rect x="23" y="28.5" width="28" height="2.5" rx="0.5" fill="#0F172A" />
            <rect x="23" y="33" width="68" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="23" y="37" width="62" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="23" y="41" width="56" height="1.8" rx="0.5" fill="#CBD5E1" />
            {/* Node 2 */}
            <circle cx="16" cy="56" r="2" fill="#0D9488" />
            <rect x="23" y="54.5" width="32" height="2.5" rx="0.5" fill="#0F172A" />
            <rect x="23" y="59" width="68" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="23" y="63" width="64" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="23" y="67" width="50" height="1.8" rx="0.5" fill="#CBD5E1" />
            {/* Node 3 */}
            <circle cx="16" cy="82" r="2" fill="#0D9488" />
            <rect x="23" y="80.5" width="26" height="2.5" rx="0.5" fill="#0F172A" />
            <rect x="23" y="85" width="68" height="1.8" rx="0.5" fill="#CBD5E1" />
            <rect x="23" y="89" width="58" height="1.8" rx="0.5" fill="#CBD5E1" />
          </g>
        )}

        {/* 6. Minimalist (Nordic Clean Scandinavian) */}
        {templateId === 'nordicminimal' && (
          <g>
            <rect x="12" y="12" width="32" height="3.5" rx="0.5" fill="#475569" />
            <rect x="12" y="18" width="22" height="1.8" rx="0.5" fill="#94A3B8" />
            <line x1="12" y1="24" x2="88" y2="24" stroke="#E2E8F0" strokeWidth="0.5" />
            {/* Airy section 1 */}
            <rect x="12" y="32" width="18" height="2.2" rx="0.5" fill="#64748B" />
            <rect x="12" y="38" width="76" height="1.6" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="43" width="62" height="1.6" rx="0.5" fill="#CBD5E1" />
            {/* Airy section 2 */}
            <rect x="12" y="55" width="22" height="2.2" rx="0.5" fill="#64748B" />
            <rect x="12" y="61" width="76" height="1.6" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="66" width="68" height="1.6" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="71" width="56" height="1.6" rx="0.5" fill="#CBD5E1" />
            {/* Airy section 3 */}
            <rect x="12" y="83" width="16" height="2.2" rx="0.5" fill="#64748B" />
            <rect x="12" y="89" width="76" height="1.6" rx="0.5" fill="#CBD5E1" />
            <rect x="12" y="94" width="50" height="1.6" rx="0.5" fill="#CBD5E1" />
          </g>
        )}
      </svg>
    </div>
  );
}

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
  ],

  projects: [
    {
      id: 'proj-1',
      title: 'Distributed Micro-Frontend Architecture',
      subtitle: 'Lead Architect & Creator',
      link: 'github.com/alexwright/mfe-platform',
      date: '2023 - 2024',
      description: 'Engineered module federation system scaling to 14M+ active creators, reducing client load times by 38% and standardizing CI/CD bundle gating.'
    },
    {
      id: 'proj-2',
      title: 'Design Token Compiler & Theme Engine',
      subtitle: 'Creator',
      link: 'tokens.alexwright.dev',
      date: '2022',
      description: 'Automated multi-platform design token synchronization across React, iOS, and Android with automated WCAG AA compliance verification.'
    }
  ],

  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      date: '2023',
      credentialId: 'AWS-PSA-94812'
    },
    {
      id: 'cert-2',
      name: 'Certified Kubernetes Application Developer (CKAD)',
      issuer: 'Cloud Native Computing Foundation (CNCF)',
      date: '2022',
      credentialId: 'CKAD-2022-8371'
    }
  ],

  awards: [
    {
      id: 'award-1',
      title: 'Canva Engineering Impact Award',
      issuer: 'Canva',
      date: '2023',
      description: 'Recognized for pioneering cross-pod architecture that accelerated developer velocity by 48% across enterprise suites.'
    },
    {
      id: 'award-2',
      title: 'Atlassian Global ShipIt Winner',
      issuer: 'Atlassian',
      date: '2020',
      description: 'Awarded 1st place among 40+ global teams for real-time collaborative document synchronization engine.'
    }
  ],

  publications: [
    {
      id: 'pub-1',
      title: 'Scaling Distributed Micro-Frontends at Enterprise Scale',
      publisher: 'IEEE Software Architecture Journal',
      date: '2023',
      link: 'doi.org/10.1109/MS.2023.0182'
    },
    {
      id: 'pub-2',
      title: 'Real-Time State Synchronization in Web Collaboration',
      publisher: 'ACM Queue Publications',
      date: '2021',
      link: 'queue.acm.org/detail.cfm?id=349281'
    }
  ],

  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native / Bilingual' },
    { id: 'lang-2', language: 'Japanese', proficiency: 'Professional Working Proficiency' },
    { id: 'lang-3', language: 'German', proficiency: 'Elementary Proficiency' }
  ],

  customSections: []
};

// Default Resume Sections Configuration (matching user specifications)
const DEFAULT_SECTIONS = [
  { id: 'details', title: 'Personal Information', deletable: false, hasEye: false, hasDrag: false },
  { id: 'summary', title: 'Professional Summary', deletable: false, hasEye: true, hasDrag: true },
  { id: 'skills', title: 'Skills & Interests', deletable: false, hasEye: true, hasDrag: true },
  { id: 'experience', title: 'Work Experience', deletable: false, hasEye: true, hasDrag: true },
  { id: 'education', title: 'Education', deletable: false, hasEye: true, hasDrag: true },
  { id: 'projects', title: 'Projects', deletable: true, hasEye: true, hasDrag: true },
  { id: 'certifications', title: 'Certifications', deletable: true, hasEye: true, hasDrag: true },
  { id: 'awards', title: 'Awards & Achievements', deletable: true, hasEye: true, hasDrag: true },
  { id: 'publications', title: 'Publications', deletable: true, hasEye: true, hasDrag: true },
  { id: 'languages', title: 'Languages', deletable: true, hasEye: true, hasDrag: true },
];

export default function ResumeStudioView({ onBackToDocuments, onOpenAtsScan }) {
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = sessionStorage.getItem('jobgen_active_resume');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_RESUME_DATA,
          ...parsed,
          projects: parsed.projects || INITIAL_RESUME_DATA.projects,
          certifications: parsed.certifications || INITIAL_RESUME_DATA.certifications,
          awards: parsed.awards || INITIAL_RESUME_DATA.awards,
          publications: parsed.publications || INITIAL_RESUME_DATA.publications,
          languages: parsed.languages || INITIAL_RESUME_DATA.languages,
          customSections: parsed.customSections || []
        };
      }
      return INITIAL_RESUME_DATA;
    } catch {
      return INITIAL_RESUME_DATA;
    }
  });

  const [activeSections, setActiveSections] = useState(() => {
    try {
      const saved = sessionStorage.getItem('jobgen_resume_sections');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return DEFAULT_SECTIONS;
  });

  const [hiddenSections, setHiddenSections] = useState(() => {
    try {
      const saved = sessionStorage.getItem('jobgen_hidden_sections');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [showAddSectionMenu, setShowAddSectionMenu] = useState(false);
  const [customSectionTitle, setCustomSectionTitle] = useState('');

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(85);
  const [autoFitZoom, setAutoFitZoom] = useState(85);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('frameworks');
  const [currentPage, setCurrentPage] = useState(1);

  // Dynamic Page Splitting for Physical A4 Sheets (1123px Fixed Height)
  const visibleResumeSections = useMemo(() => {
    return activeSections.filter(sec => sec.id !== 'details' && !hiddenSections[sec.id]);
  }, [activeSections, hiddenSections]);

  const resumePages = useMemo(() => {
    const getWeight = (id) => {
      switch (id) {
        case 'summary': return 85;
        case 'skills': return 110;
        case 'experience': return Math.max(120, (resumeData.experience?.length || 1) * 140);
        case 'education': return Math.max(90, (resumeData.education?.length || 1) * 60);
        case 'projects': return Math.max(100, (resumeData.projects?.length || 1) * 85);
        case 'certifications': return Math.max(70, (resumeData.certifications?.length || 1) * 45);
        case 'awards': return Math.max(70, (resumeData.awards?.length || 1) * 45);
        case 'publications': return Math.max(60, (resumeData.publications?.length || 1) * 40);
        case 'languages': return 65;
        default: return 90;
      }
    };

    // Usable height inside 1123px A4 sheet:
    // Page 1 budget: ~820px (after padding + header + continuation banner)
    // Page 2+ budget: ~920px (after padding + continuation header + footer)
    const PAGE_1_LIMIT = 820;
    const PAGE_N_LIMIT = 920;

    const pages = [[]];
    let currentLimit = PAGE_1_LIMIT;
    let currentHeight = 0;

    for (const sec of visibleResumeSections) {
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
  }, [visibleResumeSections, resumeData]);

  const totalPages = Math.max(1, resumePages.length);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const carouselRef = useRef(null);
  const rightCanvasRef = useRef(null);
  const leftEditorRef = useRef(null);

  // Auto-fit A4 paper to screen width on mount and window resize
  useEffect(() => {
    const calculateFit = () => {
      if (rightCanvasRef.current) {
        const containerWidth = rightCanvasRef.current.clientWidth;
        // Available width accounting for 40px padding (20px left + 20px right)
        const available = containerWidth - 40;
        if (available > 0) {
          // Fit A4 794px width with comfortable breathing room (divide by 814px)
          const fit = Math.max(50, Math.min(100, Math.floor((available / 814) * 100)));
          setAutoFitZoom(fit);
          setZoomLevel(prev => (prev === 85 || prev === autoFitZoom ? fit : prev));
        }
      }
    };

    calculateFit();
    const timer = setTimeout(calculateFit, 80);
    window.addEventListener('resize', calculateFit);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateFit);
    };
  }, []);

  // Saved Jobs for Dropdown
  const [savedJobsList, setSavedJobsList] = useState(() => {
    try {
      const stored = sessionStorage.getItem('jobgen_candidate_pipeline');
      if (stored) {
        const parsed = JSON.parse(stored);
        const allJobs = [
          ...(parsed.saved || []),
          ...(parsed.applied || []),
          ...(parsed.interviewing || []),
          ...(parsed.offers || [])
        ];
        if (allJobs.length > 0) return allJobs;
      }
    } catch {}
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

  // Requirement: Keep all editing sections NOT expanded when first opened
  const [openSections, setOpenSections] = useState({
    details: false,
    summary: false,
    experience: false,
    skills: false,
    education: false,
    projects: false,
    certifications: false,
    awards: false,
    publications: false,
    languages: false
  });

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Auto-save changes into sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('jobgen_resume_sections', JSON.stringify(activeSections));
    } catch (e) {}
  }, [activeSections]);

  useEffect(() => {
    try {
      sessionStorage.setItem('jobgen_hidden_sections', JSON.stringify(hiddenSections));
    } catch (e) {}
  }, [hiddenSections]);

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
    showToast('Applied Google XYZ formula enhancement.');
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

  const handleSelectJob = (jobId) => {
    setSelectedJobId(jobId);
    const job = savedJobsList.find(j => j.id === jobId);
    if (job) {
      setResumeData(prev => ({
        ...prev,
        targetJob: {
          ...prev.targetJob,
          company: job.company,
          title: job.title
        }
      }));
      showToast(`Selected ${job.company} — ${job.title}`);
    }
  };

  const updateEducation = (eduIndex, field, val) => {
    setResumeData(prev => {
      const education = [...prev.education];
      education[eduIndex] = { ...education[eduIndex], [field]: val };
      return { ...prev, education };
    });
  };

  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      institution: 'University / Institution',
      degree: 'Degree / Major',
      graduationDate: '2024',
      honors: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
    showToast('Added education entry');
  };

  const removeEducation = (eduIndex) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== eduIndex)
    }));
    showToast('Removed education entry');
  };

  // Projects mutators
  const updateProject = (projIndex, field, val) => {
    setResumeData(prev => {
      const projects = [...(prev.projects || [])];
      projects[projIndex] = { ...projects[projIndex], [field]: val };
      return { ...prev, projects };
    });
  };

  const addProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: 'New High-Impact Project',
      subtitle: 'Lead Architect',
      link: 'github.com/project',
      date: '2024',
      description: 'Architected high-scale platform improving overall performance and user engagement.'
    };
    setResumeData(prev => ({
      ...prev,
      projects: [...(prev.projects || []), newProj]
    }));
    showToast('Added project to resume!');
  };

  const removeProject = (projIndex) => {
    setResumeData(prev => ({
      ...prev,
      projects: (prev.projects || []).filter((_, i) => i !== projIndex)
    }));
    showToast('Removed project');
  };

  // Certifications mutators
  const updateCertification = (certIndex, field, val) => {
    setResumeData(prev => {
      const certifications = [...(prev.certifications || [])];
      certifications[certIndex] = { ...certifications[certIndex], [field]: val };
      return { ...prev, certifications };
    });
  };

  const addCertification = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      name: 'Professional Certificate / License',
      issuer: 'Issuing Organization',
      date: '2024',
      credentialId: ''
    };
    setResumeData(prev => ({
      ...prev,
      certifications: [...(prev.certifications || []), newCert]
    }));
    showToast('Added certification!');
  };

  const removeCertification = (certIndex) => {
    setResumeData(prev => ({
      ...prev,
      certifications: (prev.certifications || []).filter((_, i) => i !== certIndex)
    }));
    showToast('Removed certification');
  };

  // Awards mutators
  const updateAward = (awardIndex, field, val) => {
    setResumeData(prev => {
      const awards = [...(prev.awards || [])];
      awards[awardIndex] = { ...awards[awardIndex], [field]: val };
      return { ...prev, awards };
    });
  };

  const addAward = () => {
    const newAward = {
      id: `award-${Date.now()}`,
      title: 'Excellence or Industry Award',
      issuer: 'Awarding Organization / Company',
      date: '2024',
      description: 'Recognized for top tier performance and contributions.'
    };
    setResumeData(prev => ({
      ...prev,
      awards: [...(prev.awards || []), newAward]
    }));
    showToast('Added award & achievement!');
  };

  const removeAward = (awardIndex) => {
    setResumeData(prev => ({
      ...prev,
      awards: (prev.awards || []).filter((_, i) => i !== awardIndex)
    }));
    showToast('Removed award');
  };

  // Publications mutators
  const updatePublication = (pubIndex, field, val) => {
    setResumeData(prev => {
      const publications = [...(prev.publications || [])];
      publications[pubIndex] = { ...publications[pubIndex], [field]: val };
      return { ...prev, publications };
    });
  };

  const addPublication = () => {
    const newPub = {
      id: `pub-${Date.now()}`,
      title: 'Publication / Paper Title',
      publisher: 'Publisher / Journal / Conference',
      date: '2024',
      link: ''
    };
    setResumeData(prev => ({
      ...prev,
      publications: [...(prev.publications || []), newPub]
    }));
    showToast('Added publication!');
  };

  const removePublication = (pubIndex) => {
    setResumeData(prev => ({
      ...prev,
      publications: (prev.publications || []).filter((_, i) => i !== pubIndex)
    }));
    showToast('Removed publication');
  };

  // Languages mutators
  const updateLanguage = (langIndex, field, val) => {
    setResumeData(prev => {
      const languages = [...(prev.languages || [])];
      languages[langIndex] = { ...languages[langIndex], [field]: val };
      return { ...prev, languages };
    });
  };

  const addLanguage = () => {
    const newLang = {
      id: `lang-${Date.now()}`,
      language: 'New Language',
      proficiency: 'Professional Working Proficiency'
    };
    setResumeData(prev => ({
      ...prev,
      languages: [...(prev.languages || []), newLang]
    }));
    showToast('Added language!');
  };

  const removeLanguage = (langIndex) => {
    setResumeData(prev => ({
      ...prev,
      languages: (prev.languages || []).filter((_, i) => i !== langIndex)
    }));
    showToast('Removed language');
  };

  // Custom sections mutator
  const updateCustomSectionContent = (secId, content) => {
    setResumeData(prev => {
      const customSections = [...(prev.customSections || [])];
      const idx = customSections.findIndex(c => c.id === secId);
      if (idx >= 0) {
        customSections[idx] = { ...customSections[idx], content };
      } else {
        customSections.push({ id: secId, content });
      }
      return { ...prev, customSections };
    });
  };

  // Section Hide / Unhide Toggle
  const toggleHideSection = (secId) => {
    setHiddenSections(prev => {
      const next = { ...prev, [secId]: !prev[secId] };
      showToast(next[secId] ? 'Section hidden from resume' : 'Section visible on resume');
      return next;
    });
  };

  // Section Delete Handler
  const handleDeleteSection = (secId) => {
    const sec = activeSections.find(s => s.id === secId);
    setActiveSections(prev => prev.filter(s => s.id !== secId));
    showToast(`Deleted ${sec?.title || 'section'} from resume`);
  };

  // Re-add deleted section from defaults
  const handleAddDefaultSection = (secId) => {
    const templateSec = DEFAULT_SECTIONS.find(s => s.id === secId);
    if (templateSec && !activeSections.some(s => s.id === secId)) {
      setActiveSections(prev => [...prev, templateSec]);
      setShowAddSectionMenu(false);
      showToast(`Added ${templateSec.title} to resume`);
    }
  };

  // Add custom section
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
    setResumeData(prev => ({
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
    setActiveSections(prev => {
      const updated = [...prev];
      const [moved] = updated.splice(draggedIndex, 1);
      updated.splice(index, 0, moved);
      return updated;
    });
    setDraggedIndex(null);
    setDragOverIndex(null);
    showToast('Reordered resume sections.');
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleAddNewJob = (newJob) => {
    setSavedJobsList(prev => [newJob, ...prev]);
    setSelectedJobId(newJob.id);
    setResumeData(prev => ({
      ...prev,
      targetJob: {
        ...prev.targetJob,
        company: newJob.company,
        title: newJob.title
      }
    }));
    setShowAddJobModal(false);
    showToast(`Added ${newJob.company} — ${newJob.title}!`);
  };

  const renderResumeSection = (sec) => {
    const sectionId = sec.id;
    const sectionTitle = sec.title;
    const accentColor = resumeData.template === 'consultantpolished' ? '#1E3A8A' : (resumeData.template === 'operationsprecision' ? '#0D9488' : (resumeData.template === 'londonbureau' ? '#1E40AF' : (resumeData.template === 'nordicminimal' ? '#334155' : '#171717')));

    return (
      <div key={sec.id} style={{ marginBottom: '14px' }}>
        {/* Dynamic Section Heading */}
        <h3 
          style={{ 
            fontSize: '12px', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            letterSpacing: '0.08em', 
            color: accentColor,
            borderBottom: '1px solid #E2E8F0',
            paddingBottom: '3px',
            marginBottom: '7px'
          }}
        >
          {sectionTitle}
        </h3>

        {/* Dynamic Section Content based on sectionId */}
        {sectionId === 'summary' && (
          <p style={{ fontSize: '11px', lineHeight: 1.5, color: '#334155', margin: 0, textAlign: 'justify' }}>
            {resumeData.summary}
          </p>
        )}

        {sectionId === 'experience' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {resumeData.experience.map(exp => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                  <div>
                    <strong style={{ fontSize: '12px', color: '#111827', fontWeight: 800 }}>{exp.company}</strong>
                    <span style={{ fontSize: '11.5px', color: '#475569', fontStyle: 'italic' }}> — {exp.title}</span>
                  </div>
                  <span style={{ fontSize: '10.5px', color: '#475569', fontWeight: 600 }}>
                    {exp.startDate} – {exp.endDate} | {exp.location}
                  </span>
                </div>
                <ul style={{ margin: '3px 0 0 16px', padding: 0, fontSize: '10.5px', lineHeight: 1.4, color: '#334155' }}>
                  {exp.bullets.map((b, i) => (
                    <li key={i} style={{ marginBottom: '2px' }}>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {sectionId === 'skills' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '10.5px', color: '#334155', lineHeight: 1.45 }}>
            {resumeData.skills?.languages?.length > 0 && (
              <div>
                <strong style={{ color: '#111827' }}>Languages & Core: </strong>
                <span>{resumeData.skills.languages.join(', ')}</span>
              </div>
            )}
            {resumeData.skills?.frameworks?.length > 0 && (
              <div>
                <strong style={{ color: '#111827' }}>Frameworks & Libraries: </strong>
                <span>{resumeData.skills.frameworks.join(', ')}</span>
              </div>
            )}
            {resumeData.skills?.tools?.length > 0 && (
              <div>
                <strong style={{ color: '#111827' }}>Cloud & Architecture: </strong>
                <span>{resumeData.skills.tools.join(', ')}</span>
              </div>
            )}
            {resumeData.skills?.practices?.length > 0 && (
              <div>
                <strong style={{ color: '#111827' }}>Leadership & Engineering: </strong>
                <span>{resumeData.skills.practices.join(', ')}</span>
              </div>
            )}
          </div>
        )}

        {sectionId === 'education' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {resumeData.education.map(edu => (
              <div key={edu.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '11px' }}>
                  <div>
                    <strong style={{ color: '#111827' }}>{edu.institution}</strong>
                    <span style={{ color: '#475569' }}> — {edu.degree}</span>
                  </div>
                  <span style={{ color: '#64748B', fontSize: '10.5px' }}>{edu.startDate} – {edu.endDate}</span>
                </div>
                {edu.highlights && (
                  <p style={{ margin: '2px 0 0 0', fontSize: '10.5px', color: '#475569' }}>
                    {edu.highlights}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {sectionId === 'projects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {(resumeData.projects || []).map(proj => (
              <div key={proj.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '11px' }}>
                  <div>
                    <strong style={{ color: '#111827' }}>{proj.title}</strong>
                    <span style={{ color: '#1A53CF', fontSize: '10px', marginLeft: '6px' }}>({proj.link})</span>
                  </div>
                  <span style={{ color: '#64748B', fontSize: '10.5px' }}>{proj.technologies}</span>
                </div>
                <p style={{ margin: '2px 0 0 0', fontSize: '10.5px', lineHeight: 1.4, color: '#334155' }}>
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {sectionId === 'certifications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {(resumeData.certifications || []).map(cert => (
              <div key={cert.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '11px' }}>
                <div>
                  <strong style={{ color: '#111827' }}>{cert.name}</strong>
                  <span style={{ color: '#475569' }}> — {cert.issuer}</span>
                </div>
                <span style={{ color: '#64748B', fontSize: '10.5px' }}>{cert.date}</span>
              </div>
            ))}
          </div>
        )}

        {sectionId === 'awards' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {(resumeData.awards || []).map(award => (
              <div key={award.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '11px' }}>
                  <div>
                    <strong style={{ color: '#111827' }}>{award.title}</strong>
                    <span style={{ color: '#475569' }}> — {award.issuer}</span>
                  </div>
                  <span style={{ color: '#64748B', fontSize: '10.5px' }}>{award.date}</span>
                </div>
                {award.description && (
                  <p style={{ margin: '2px 0 0 0', fontSize: '10.5px', lineHeight: 1.4, color: '#334155' }}>
                    {award.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {sectionId === 'publications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {(resumeData.publications || []).map(pub => (
              <div key={pub.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '11px' }}>
                <div>
                  <strong style={{ color: '#111827' }}>"{pub.title}"</strong>
                  <span style={{ color: '#475569' }}> — {pub.publisher}</span>
                  {pub.link && <span style={{ color: '#1A53CF', fontSize: '10px', marginLeft: '6px' }}>({pub.link})</span>}
                </div>
                <span style={{ color: '#64748B', fontSize: '10.5px' }}>{pub.date}</span>
              </div>
            ))}
          </div>
        )}

        {sectionId === 'languages' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '10.5px', color: '#334155' }}>
            {(resumeData.languages || []).map(lang => (
              <div key={lang.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <strong style={{ color: '#111827' }}>{lang.language}:</strong>
                <span>{lang.proficiency}</span>
              </div>
            ))}
          </div>
        )}

        {/* Custom Sections */}
        {!['summary', 'experience', 'skills', 'education', 'projects', 'certifications', 'awards', 'publications', 'languages'].includes(sectionId) && (
          <p style={{ fontSize: '11px', lineHeight: 1.5, color: '#334155', margin: 0, whiteSpace: 'pre-wrap' }}>
            {resumeData.customSections?.find(c => c.id === sectionId)?.content || 'Custom section details...'}
          </p>
        )}
      </div>
    );
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

      {/* Top Action Bar: Title Left, Circular ATS Card + Export PDF Right */}
      <header 
        style={{ 
          height: '62px', 
          backgroundColor: '#FFFFFF', 
          borderBottom: '1px solid #E2E8F0', 
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          padding: '0 28px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexShrink: 0,
          zIndex: 40
        }}
      >
        {/* Left: Document Title & Saved Status */}
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

        {/* Right: Attached Green Circle + Pill showing ATS left next to Export PDF */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          
          {/* Attached ATS Score Badge: Green Circle with White Number (no %) + Attached Pill with text ATS */}
          <div
            onClick={onOpenAtsScan}
            title="ATS Match Score: 96 · Click to view keyword alignment"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              backgroundColor: '#F0FDF4',
              border: '1.5px solid #10B981',
              borderRadius: '999px',
              padding: '3px 12px 3px 3px',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.16)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(16, 185, 129, 0.32)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.16)';
            }}
          >
            {/* Green Circle with White Text showing the number (No percentage sign) */}
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13.5px',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                boxShadow: '0 2px 6px rgba(16, 185, 129, 0.35)',
                flexShrink: 0
              }}
            >
              96
            </div>

            {/* Attached Pill Text: ATS */}
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#065F46',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                lineHeight: 1
              }}
            >
              ATS
            </span>
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
        
        {/* Left Column: Expanded Width 580px */}
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
              CAROUSEL: SKELETAL FRAMEWORK OF DIFFERENT PAGES (NO TEXT, WHITE BACKGROUND)
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

            {/* Carousel Horizontal Scroll Track with Top Padding to Prevent Clipping */}
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
              {RESUME_TEMPLATES.map((tpl) => {
                const isSelected = resumeData.template === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => {
                      setResumeData(prev => ({ ...prev, template: tpl.id }));
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
                      <ResumeSkeletonPreview templateId={tpl.id} />
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

                    {/* Card Label: JUST THE STYLE NAME */}
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
              MODERN EDITING SECTIONS (ALL COLLAPSED INITIALLY, NO OVERLAP)
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
            {/* SAVED JOBS DROPDOWN SELECTOR WITH "+ ADD JOB" BUTTON BESIDE IT */}
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

            {/* Dynamic Reorderable, Hideable, Deletable Section Cards */}
            {activeSections.map((section, index) => {
              const isHidden = !!hiddenSections[section.id];
              const isOpen = !!openSections[section.id];
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
                  {/* Section Row Header matching user screenshot */}
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
                    {/* Left: Drag Handle (if draggable) + Green Checkmark Circle + Section Title */}
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

                      {/* Eye / EyeOff Icon (Hide/Show on resume) */}
                      {section.hasEye && (
                        <button
                          type="button"
                          onClick={() => toggleHideSection(section.id)}
                          title={isHidden ? "Show section on resume" : "Hide section from resume"}
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

                      {/* Trash2 Icon (Delete section) */}
                      {section.deletable && (
                        <button
                          type="button"
                          onClick={() => handleDeleteSection(section.id)}
                          title="Delete section from resume"
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#94A3B8',
                            borderRadius: '6px',
                            transition: 'color 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#EF4444'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Section Expanded Content Editor */}
                  {isOpen && (
                    <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#FFFFFF' }}>
                      {/* 1. Personal Details Form */}
                      {section.id === 'details' && (
                        <>
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

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 800, color: '#475569', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>GitHub</label>
                              <input 
                                type="text" 
                                value={resumeData.personalDetails.github || ''}
                                onChange={(e) => updatePersonal('github', e.target.value)}
                                style={{ width: '100%', padding: '9px 12px', borderRadius: '9px', border: '1.5px solid #E2E8F0', backgroundColor: '#F8FAFC', fontSize: '13px', color: '#090C15', outline: 'none', boxSizing: 'border-box' }}
                                onFocus={(e) => { e.target.style.borderColor = '#1A53CF'; e.target.style.backgroundColor = '#FFFFFF'; }}
                                onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}
                              />
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 800, color: '#475569', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Website / Portfolio</label>
                              <input 
                                type="text" 
                                value={resumeData.personalDetails.website || ''}
                                onChange={(e) => updatePersonal('website', e.target.value)}
                                style={{ width: '100%', padding: '9px 12px', borderRadius: '9px', border: '1.5px solid #E2E8F0', backgroundColor: '#F8FAFC', fontSize: '13px', color: '#090C15', outline: 'none', boxSizing: 'border-box' }}
                                onFocus={(e) => { e.target.style.borderColor = '#1A53CF'; e.target.style.backgroundColor = '#FFFFFF'; }}
                                onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {/* 2. Professional Summary Form */}
                      {section.id === 'summary' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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

                      {/* 3. Skills & Interests Form */}
                      {section.id === 'skills' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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

                      {/* 4. Work Experience Form */}
                      {section.id === 'experience' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', flexWrap: 'wrap' }}>
                                <div style={{ flex: 1, minWidth: '160px' }}>
                                  <input
                                    type="text"
                                    value={exp.title}
                                    onChange={(e) => {
                                      const updated = [...resumeData.experience];
                                      updated[expIdx] = { ...updated[expIdx], title: e.target.value };
                                      setResumeData(prev => ({ ...prev, experience: updated }));
                                    }}
                                    style={{ 
                                      fontSize: '13.5px', 
                                      fontWeight: 800, 
                                      color: '#090C15', 
                                      border: '1px solid transparent', 
                                      backgroundColor: 'transparent',
                                      borderRadius: '6px',
                                      padding: '2px 4px',
                                      width: '100%',
                                      boxSizing: 'border-box',
                                      outline: 'none'
                                    }}
                                    onFocus={(e) => e.target.style.border = '1px solid #CBD5E1'}
                                    onBlur={(e) => e.target.style.border = '1px solid transparent'}
                                  />
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px', flexWrap: 'wrap' }}>
                                    <input
                                      type="text"
                                      value={exp.company}
                                      onChange={(e) => {
                                        const updated = [...resumeData.experience];
                                        updated[expIdx] = { ...updated[expIdx], company: e.target.value };
                                        setResumeData(prev => ({ ...prev, experience: updated }));
                                      }}
                                      style={{ 
                                        fontSize: '12px', 
                                        fontWeight: 700, 
                                        color: '#1A53CF', 
                                        border: '1px solid transparent', 
                                        backgroundColor: 'transparent',
                                        borderRadius: '6px',
                                        padding: '1px 4px',
                                        width: '130px',
                                        outline: 'none'
                                      }}
                                      onFocus={(e) => e.target.style.border = '1px solid #CBD5E1'}
                                      onBlur={(e) => e.target.style.border = '1px solid transparent'}
                                    />
                                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>•</span>
                                    <input
                                      type="text"
                                      value={exp.location}
                                      onChange={(e) => {
                                        const updated = [...resumeData.experience];
                                        updated[expIdx] = { ...updated[expIdx], location: e.target.value };
                                        setResumeData(prev => ({ ...prev, experience: updated }));
                                      }}
                                      style={{ 
                                        fontSize: '11.5px', 
                                        color: '#64748B', 
                                        border: '1px solid transparent', 
                                        backgroundColor: 'transparent',
                                        borderRadius: '6px',
                                        padding: '1px 4px',
                                        width: '110px',
                                        outline: 'none'
                                      }}
                                      onFocus={(e) => e.target.style.border = '1px solid #CBD5E1'}
                                      onBlur={(e) => e.target.style.border = '1px solid transparent'}
                                    />
                                  </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                                    <input
                                      type="text"
                                      value={exp.startDate}
                                      onChange={(e) => {
                                        const updated = [...resumeData.experience];
                                        updated[expIdx] = { ...updated[expIdx], startDate: e.target.value };
                                        setResumeData(prev => ({ ...prev, experience: updated }));
                                      }}
                                      style={{ width: '54px', fontSize: '11px', padding: '2px 4px', borderRadius: '4px', border: '1px solid #CBD5E1', textAlign: 'center' }}
                                    />
                                    <span style={{ fontSize: '10px', color: '#94A3B8' }}>-</span>
                                    <input
                                      type="text"
                                      value={exp.endDate}
                                      onChange={(e) => {
                                        const updated = [...resumeData.experience];
                                        updated[expIdx] = { ...updated[expIdx], endDate: e.target.value };
                                        setResumeData(prev => ({ ...prev, experience: updated }));
                                      }}
                                      style={{ width: '54px', fontSize: '11px', padding: '2px 4px', borderRadius: '4px', border: '1px solid #CBD5E1', textAlign: 'center' }}
                                    />
                                  </div>
                                  {resumeData.experience.length > 1 && (
                                    <button
                                      onClick={() => removeExperienceRole(expIdx)}
                                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}
                                      onMouseEnter={(e) => { e.currentTarget.style.color = '#EF4444'; e.currentTarget.style.backgroundColor = '#FEE2E2'; }}
                                      onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                                      title="Delete position"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Bullets */}
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
                                >
                                  <Plus size={13} />
                                  <span>Add bullet</span>
                                </button>
                              </div>
                            </div>
                          ))}

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
                              cursor: 'pointer'
                            }}
                          >
                            <Plus size={15} />
                            <span>Add Work Experience Role</span>
                          </button>
                        </div>
                      )}

                      {/* 5. Education Form */}
                      {section.id === 'education' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {resumeData.education.map((edu, eduIdx) => (
                            <div key={edu.id} style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <input
                                  type="text"
                                  value={edu.institution}
                                  placeholder="Institution Name"
                                  onChange={(e) => updateEducation(eduIdx, 'institution', e.target.value)}
                                  style={{ fontSize: '13px', fontWeight: 800, color: '#090C15', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', flex: 1, backgroundColor: '#FFFFFF' }}
                                />
                                <button
                                  onClick={() => removeEducation(eduIdx)}
                                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '4px', marginLeft: '8px' }}
                                  onMouseEnter={(e) => e.currentTarget.style.color = '#EF4444'}
                                  onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px' }}>
                                <input
                                  type="text"
                                  value={edu.degree}
                                  placeholder="Degree / Major"
                                  onChange={(e) => updateEducation(eduIdx, 'degree', e.target.value)}
                                  style={{ fontSize: '12px', color: '#475569', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', backgroundColor: '#FFFFFF' }}
                                />
                                <input
                                  type="text"
                                  value={edu.graduationDate}
                                  placeholder="Graduation Year"
                                  onChange={(e) => updateEducation(eduIdx, 'graduationDate', e.target.value)}
                                  style={{ fontSize: '12px', color: '#64748B', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', backgroundColor: '#FFFFFF' }}
                                />
                              </div>
                              <input
                                type="text"
                                value={edu.honors || ''}
                                placeholder="Honors / GPA / Activities"
                                onChange={(e) => updateEducation(eduIdx, 'honors', e.target.value)}
                                style={{ fontSize: '12px', color: '#059669', fontWeight: 600, border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', backgroundColor: '#FFFFFF' }}
                              />
                            </div>
                          ))}
                          <button
                            onClick={addEducation}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px 12px', borderRadius: '8px', border: '1px dashed #CBD5E1', backgroundColor: '#FFFFFF', color: '#1A53CF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                          >
                            <Plus size={14} />
                            <span>Add Education Entry</span>
                          </button>
                        </div>
                      )}

                      {/* 6. Projects Form */}
                      {section.id === 'projects' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {(resumeData.projects || []).map((proj, pIdx) => (
                            <div key={proj.id} style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <input
                                  type="text"
                                  value={proj.title}
                                  placeholder="Project Title"
                                  onChange={(e) => updateProject(pIdx, 'title', e.target.value)}
                                  style={{ fontSize: '13px', fontWeight: 800, color: '#090C15', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', flex: 1, backgroundColor: '#FFFFFF' }}
                                />
                                <button
                                  onClick={() => removeProject(pIdx)}
                                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '4px', marginLeft: '8px' }}
                                  onMouseEnter={(e) => e.currentTarget.style.color = '#EF4444'}
                                  onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                                <input
                                  type="text"
                                  value={proj.subtitle || ''}
                                  placeholder="Role / Tag"
                                  onChange={(e) => updateProject(pIdx, 'subtitle', e.target.value)}
                                  style={{ fontSize: '12px', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', backgroundColor: '#FFFFFF' }}
                                />
                                <input
                                  type="text"
                                  value={proj.link || ''}
                                  placeholder="URL / Repo"
                                  onChange={(e) => updateProject(pIdx, 'link', e.target.value)}
                                  style={{ fontSize: '12px', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', backgroundColor: '#FFFFFF' }}
                                />
                                <input
                                  type="text"
                                  value={proj.date || ''}
                                  placeholder="Date / Year"
                                  onChange={(e) => updateProject(pIdx, 'date', e.target.value)}
                                  style={{ fontSize: '12px', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', backgroundColor: '#FFFFFF' }}
                                />
                              </div>
                              <textarea
                                value={proj.description || ''}
                                placeholder="Describe key achievements, architecture, and metrics..."
                                rows={2}
                                onChange={(e) => updateProject(pIdx, 'description', e.target.value)}
                                style={{ fontSize: '12px', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px', backgroundColor: '#FFFFFF', resize: 'vertical' }}
                              />
                            </div>
                          ))}
                          <button
                            onClick={addProject}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px 12px', borderRadius: '8px', border: '1px dashed #CBD5E1', backgroundColor: '#FFFFFF', color: '#1A53CF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                          >
                            <Plus size={14} />
                            <span>Add Project</span>
                          </button>
                        </div>
                      )}

                      {/* 7. Certifications Form */}
                      {section.id === 'certifications' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {(resumeData.certifications || []).map((cert, cIdx) => (
                            <div key={cert.id} style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <input
                                  type="text"
                                  value={cert.name}
                                  placeholder="Certification Name"
                                  onChange={(e) => updateCertification(cIdx, 'name', e.target.value)}
                                  style={{ fontSize: '13px', fontWeight: 800, color: '#090C15', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', flex: 1, backgroundColor: '#FFFFFF' }}
                                />
                                <button
                                  onClick={() => removeCertification(cIdx)}
                                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '4px', marginLeft: '8px' }}
                                  onMouseEnter={(e) => e.currentTarget.style.color = '#EF4444'}
                                  onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px' }}>
                                <input
                                  type="text"
                                  value={cert.issuer}
                                  placeholder="Issuer"
                                  onChange={(e) => updateCertification(cIdx, 'issuer', e.target.value)}
                                  style={{ fontSize: '12px', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', backgroundColor: '#FFFFFF' }}
                                />
                                <input
                                  type="text"
                                  value={cert.date}
                                  placeholder="Year / Date"
                                  onChange={(e) => updateCertification(cIdx, 'date', e.target.value)}
                                  style={{ fontSize: '12px', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', backgroundColor: '#FFFFFF' }}
                                />
                                <input
                                  type="text"
                                  value={cert.credentialId || ''}
                                  placeholder="ID / Link"
                                  onChange={(e) => updateCertification(cIdx, 'credentialId', e.target.value)}
                                  style={{ fontSize: '12px', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', backgroundColor: '#FFFFFF' }}
                                />
                              </div>
                            </div>
                          ))}
                          <button
                            onClick={addCertification}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px 12px', borderRadius: '8px', border: '1px dashed #CBD5E1', backgroundColor: '#FFFFFF', color: '#1A53CF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                          >
                            <Plus size={14} />
                            <span>Add Certification</span>
                          </button>
                        </div>
                      )}

                      {/* 8. Awards & Achievements Form */}
                      {section.id === 'awards' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {(resumeData.awards || []).map((award, aIdx) => (
                            <div key={award.id} style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <input
                                  type="text"
                                  value={award.title}
                                  placeholder="Award Title"
                                  onChange={(e) => updateAward(aIdx, 'title', e.target.value)}
                                  style={{ fontSize: '13px', fontWeight: 800, color: '#090C15', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', flex: 1, backgroundColor: '#FFFFFF' }}
                                />
                                <button
                                  onClick={() => removeAward(aIdx)}
                                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '4px', marginLeft: '8px' }}
                                  onMouseEnter={(e) => e.currentTarget.style.color = '#EF4444'}
                                  onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px' }}>
                                <input
                                  type="text"
                                  value={award.issuer}
                                  placeholder="Conferring Body / Issuer"
                                  onChange={(e) => updateAward(aIdx, 'issuer', e.target.value)}
                                  style={{ fontSize: '12px', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', backgroundColor: '#FFFFFF' }}
                                />
                                <input
                                  type="text"
                                  value={award.date}
                                  placeholder="Year / Date"
                                  onChange={(e) => updateAward(aIdx, 'date', e.target.value)}
                                  style={{ fontSize: '12px', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', backgroundColor: '#FFFFFF' }}
                                />
                              </div>
                              <textarea
                                value={award.description || ''}
                                placeholder="Description of achievement..."
                                rows={2}
                                onChange={(e) => updateAward(aIdx, 'description', e.target.value)}
                                style={{ fontSize: '12px', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px', backgroundColor: '#FFFFFF', resize: 'vertical' }}
                              />
                            </div>
                          ))}
                          <button
                            onClick={addAward}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px 12px', borderRadius: '8px', border: '1px dashed #CBD5E1', backgroundColor: '#FFFFFF', color: '#1A53CF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                          >
                            <Plus size={14} />
                            <span>Add Award</span>
                          </button>
                        </div>
                      )}

                      {/* 9. Publications Form */}
                      {section.id === 'publications' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {(resumeData.publications || []).map((pub, pIdx) => (
                            <div key={pub.id} style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <input
                                  type="text"
                                  value={pub.title}
                                  placeholder="Publication Title"
                                  onChange={(e) => updatePublication(pIdx, 'title', e.target.value)}
                                  style={{ fontSize: '13px', fontWeight: 800, color: '#090C15', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', flex: 1, backgroundColor: '#FFFFFF' }}
                                />
                                <button
                                  onClick={() => removePublication(pIdx)}
                                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '4px', marginLeft: '8px' }}
                                  onMouseEnter={(e) => e.currentTarget.style.color = '#EF4444'}
                                  onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px' }}>
                                <input
                                  type="text"
                                  value={pub.publisher}
                                  placeholder="Journal / Publisher"
                                  onChange={(e) => updatePublication(pIdx, 'publisher', e.target.value)}
                                  style={{ fontSize: '12px', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', backgroundColor: '#FFFFFF' }}
                                />
                                <input
                                  type="text"
                                  value={pub.date}
                                  placeholder="Year / Date"
                                  onChange={(e) => updatePublication(pIdx, 'date', e.target.value)}
                                  style={{ fontSize: '12px', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', backgroundColor: '#FFFFFF' }}
                                />
                                <input
                                  type="text"
                                  value={pub.link || ''}
                                  placeholder="DOI / Link"
                                  onChange={(e) => updatePublication(pIdx, 'link', e.target.value)}
                                  style={{ fontSize: '12px', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', backgroundColor: '#FFFFFF' }}
                                />
                              </div>
                            </div>
                          ))}
                          <button
                            onClick={addPublication}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px 12px', borderRadius: '8px', border: '1px dashed #CBD5E1', backgroundColor: '#FFFFFF', color: '#1A53CF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                          >
                            <Plus size={14} />
                            <span>Add Publication</span>
                          </button>
                        </div>
                      )}

                      {/* 10. Languages Form */}
                      {section.id === 'languages' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {(resumeData.languages || []).map((lang, lIdx) => (
                            <div key={lang.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '8px', alignItems: 'center', backgroundColor: '#F8FAFC', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                              <input
                                type="text"
                                value={lang.language}
                                placeholder="Language"
                                onChange={(e) => updateLanguage(lIdx, 'language', e.target.value)}
                                style={{ fontSize: '12.5px', fontWeight: 700, color: '#090C15', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', backgroundColor: '#FFFFFF' }}
                              />
                              <input
                                type="text"
                                value={lang.proficiency}
                                placeholder="Proficiency (e.g. Native, Fluent)"
                                onChange={(e) => updateLanguage(lIdx, 'proficiency', e.target.value)}
                                style={{ fontSize: '12px', color: '#475569', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '6px 8px', backgroundColor: '#FFFFFF' }}
                              />
                              <button
                                onClick={() => removeLanguage(lIdx)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '4px' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#EF4444'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={addLanguage}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px 12px', borderRadius: '8px', border: '1px dashed #CBD5E1', backgroundColor: '#FFFFFF', color: '#1A53CF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                          >
                            <Plus size={14} />
                            <span>Add Language</span>
                          </button>
                        </div>
                      )}

                      {/* Custom Section Form */}
                      {!['details', 'summary', 'skills', 'experience', 'education', 'projects', 'certifications', 'awards', 'publications', 'languages'].includes(section.id) && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748B' }}>
                            Section Content (Markdown or plain text):
                          </label>
                          <textarea
                            value={resumeData.customSections?.find(c => c.id === section.id)?.content || ''}
                            onChange={(e) => updateCustomSectionContent(section.id, e.target.value)}
                            rows={4}
                            placeholder="Enter section details, achievements, or items..."
                            style={{
                              width: '100%',
                              padding: '10px 12px',
                              borderRadius: '8px',
                              border: '1.5px solid #E2E8F0',
                              backgroundColor: '#F8FAFC',
                              fontSize: '12.5px',
                              lineHeight: 1.5,
                              color: '#090C15',
                              outline: 'none',
                              resize: 'vertical',
                              boxSizing: 'border-box'
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Option to Add Section below all sections */}
            <div style={{ position: 'relative', marginTop: '4px', marginBottom: '24px' }}>
              <button
                type="button"
                onClick={() => setShowAddSectionMenu(prev => !prev)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  backgroundColor: '#EFF6FF',
                  color: '#1A53CF',
                  border: '1.5px dashed #93C5FD',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.15s ease'
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
                <Plus size={16} strokeWidth={2.5} />
                <span>Add Section</span>
              </button>

              {/* Add Section Menu Dropdown */}
              {showAddSectionMenu && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    right: 0,
                    zIndex: 50,
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 12px 32px rgba(15, 23, 42, 0.14)',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#090C15', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Add Section to Resume
                    </span>
                    <button
                      onClick={() => setShowAddSectionMenu(false)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '2px' }}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Available Standard Sections that are currently not in activeSections */}
                  {DEFAULT_SECTIONS.filter(ds => !activeSections.some(as => as.id === ds.id)).length > 0 && (
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '8px' }}>
                        Restore Standard Sections:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {DEFAULT_SECTIONS.filter(ds => !activeSections.some(as => as.id === ds.id)).map(s => (
                          <button
                            key={s.id}
                            onClick={() => handleAddDefaultSection(s.id)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '6px 12px',
                              borderRadius: '8px',
                              border: '1px solid #CBD5E1',
                              backgroundColor: '#F8FAFC',
                              fontSize: '12px',
                              fontWeight: 700,
                              color: '#090C15',
                              cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#1A53CF'; e.currentTarget.style.backgroundColor = '#EFF6FF'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.backgroundColor = '#F8FAFC'; }}
                          >
                            <Plus size={13} color="#1A53CF" />
                            <span>{s.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Create Custom Section */}
                  <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '8px' }}>
                      Add Custom Section:
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="e.g. Volunteering, Patents, References..."
                        value={customSectionTitle}
                        onChange={(e) => setCustomSectionTitle(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleAddCustomSection(); }}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1.5px solid #E2E8F0',
                          fontSize: '12.5px',
                          outline: 'none',
                          backgroundColor: '#F8FAFC'
                        }}
                        onFocus={(e) => { e.target.style.borderColor = '#1A53CF'; e.target.style.backgroundColor = '#FFFFFF'; }}
                        onBlur={(e) => { e.target.style.borderColor = '#E2E8F0'; e.target.style.backgroundColor = '#F8FAFC'; }}
                      />
                      <button
                        onClick={handleAddCustomSection}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#1A53CF',
                          color: '#FFFFFF',
                          border: 'none',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          flexShrink: 0
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

        {/* =========================================================================
            RIGHT COLUMN: PHYSICAL A4 PAPER CONTAINER WITH GENEROUS CANVAS SPACE
            ========================================================================= */}
        <div 
          ref={rightCanvasRef}
          onWheel={(e) => {
            const el = e.currentTarget;
            const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= 6;
            const isAtTop = el.scrollTop <= 0;
            if ((isAtBottom && e.deltaY > 0) || (isAtTop && e.deltaY < 0)) {
              if (window.lenis) {
                window.lenis.scrollTo(window.scrollY + e.deltaY * 1.2, { duration: 0.5 });
              } else {
                window.scrollBy({ top: e.deltaY, left: 0, behavior: 'auto' });
              }
            }
          }}
          style={{ 
            flex: 1, 
            minWidth: 0,
            backgroundColor: '#EFF3F8', 
            overflowY: 'auto', 
            overflowX: 'auto', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '24px 20px 48px 20px',
            borderBottomRightRadius: '24px',
            position: 'relative'
          }}
          data-lenis-prevent="true"
        >
          {/* Animated Glowing Square Grid Canvas Background */}
          <GlowingGridBackground />

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
              onClick={() => setZoomLevel(prev => Math.max(50, prev - 10))}
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
              onClick={() => setZoomLevel(autoFitZoom)}
              title="Fit to screen width"
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
            {/* Authentic Physical A4 Paper Page Container (Fixed 794x1123px) */}
            <div 
              style={{
                width: '794px',
                height: '1123px',
                minHeight: '1123px',
                maxHeight: '1123px',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06), 0 20px 40px -15px rgba(15, 23, 42, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                borderRadius: '4px',
                padding: resumeData.spacing === 'compact' ? '40px 48px' : (resumeData.spacing === 'relaxed' ? '56px 60px' : '46px 52px'),
                boxSizing: 'border-box',
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top left',
                position: 'absolute',
                top: 0,
                left: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                fontFamily: resumeData.template === 'architectsportfolio' || resumeData.template === 'operationsprecision' || resumeData.template === 'nordicminimal' ? 'Inter, "Segoe UI", Arial, sans-serif' : '"Noto Serif", Georgia, serif',
                color: '#171717',
                transition: 'transform 0.15s ease'
              }}
            >
              {currentPage === 1 ? (
                <>
                  {/* Header: Candidate Identity */}
                  <div style={{ textAlign: resumeData.template === 'nordicminimal' ? 'left' : 'center', marginBottom: '14px' }}>
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

                  {/* Sections for Page 1 */}
                  <div style={{ flex: 1, minHeight: 0 }}>
                    {(resumePages[0] || []).map(sec => renderResumeSection(sec))}
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
              ) : (
                <>
                  {/* Continuation Header for Page 2+ */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1.5px solid #171717', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h2 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#111827', margin: 0 }}>
                        {resumeData.personalDetails.fullName}
                      </h2>
                      <span style={{ fontSize: '11px', color: '#64748B' }}>— Resume (Page {currentPage} of {totalPages})</span>
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
                  <div style={{ flex: 1, minHeight: 0 }}>
                    {(resumePages[currentPage - 1] || []).map(sec => renderResumeSection(sec))}
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
                </>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Add Job Modal Integration */}
      <AddJobModal 
        isOpen={showAddJobModal} 
        onClose={() => setShowAddJobModal(false)}
        onAddJob={handleAddNewJob}
      />

    </div>
  );
}
