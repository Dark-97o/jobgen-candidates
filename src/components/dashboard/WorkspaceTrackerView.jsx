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
  Briefcase,
  Trash2,
  Copy,
  Mail
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
    },
    { 
      id: 'job-11', 
      company: 'Canva', 
      title: 'Staff Frontend Architect', 
      salary: '$200k - $230k AUD', 
      location: 'Sydney (Surry Hills)', 
      score: 95, 
      source: 'LinkedIn', 
      date: 'Saved 3d ago',
      tags: ['React 19', 'Design Tokens', 'Web Vitals', 'Module Federation'],
      resumeId: 'res-canva'
    },
    { 
      id: 'job-12', 
      company: 'SafetyCulture', 
      title: 'Principal Backend Engineer', 
      salary: '$190k - $215k AUD', 
      location: 'Sydney (Hybrid)', 
      score: 92, 
      source: 'Seek', 
      date: 'Saved 5d ago',
      tags: ['Go', 'gRPC', 'Distributed Systems', 'PostgreSQL'],
      resumeId: null
    },
    { 
      id: 'job-21', 
      company: 'Qantas Loyalty', 
      title: 'Staff Systems Architect', 
      salary: '$195k - $220k AUD', 
      location: 'Sydney (Mascot)', 
      score: 93, 
      source: 'Seek', 
      date: 'Saved 1d ago',
      tags: ['Enterprise Arch', 'Event-Driven', 'Kafka', 'PCI-DSS'],
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
    },
    { 
      id: 'job-13', 
      company: 'Atlassian', 
      title: 'Group Product Manager', 
      salary: '$210k - $235k AUD', 
      location: 'Sydney (Remote)', 
      score: 94, 
      source: 'Internal Referral', 
      date: 'Applied 1w ago', 
      status: 'Recruiter Screen Passed',
      tags: ['SaaS Growth', 'Platform APIs', 'Enterprise ARR', 'Team Playbooks'],
      resumeId: 'res-atlassian'
    },
    { 
      id: 'job-14', 
      company: 'Macquarie Bank', 
      title: 'Principal Solution Architect', 
      salary: '$195k AUD + Bonus', 
      location: 'Sydney (Barangaroo)', 
      score: 91, 
      source: 'LinkedIn', 
      date: 'Applied 1w ago', 
      status: 'Hiring Manager Review',
      tags: ['FinTech', 'Cloud Transformation', 'AWS', 'Zero Trust'],
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
    },
    { 
      id: 'job-15', 
      company: 'Google Cloud', 
      title: 'Staff Solutions Engineer', 
      salary: '$230k - $260k AUD', 
      location: 'Sydney (Pyrmont)', 
      score: 95, 
      source: 'Seek Premium', 
      date: 'Round 1 Scheduled', 
      nextEvent: 'Monday 11:30 AM (Distributed Architecture Screen)',
      tags: ['Kubernetes', 'GCP AI', 'Large-Scale Systems', 'Client Eng'],
      resumeId: null
    },
    { 
      id: 'job-16', 
      company: 'Wise', 
      title: 'Principal Platform Architect', 
      salary: '$205k - $230k AUD', 
      location: 'Melbourne (Remote-first)', 
      score: 93, 
      source: 'Internal Referral', 
      date: 'Round 3 Scheduled', 
      nextEvent: 'Wednesday 3:00 PM (Executive Leadership Round)',
      tags: ['Multi-Region', 'FX Rails', 'Compliance', 'Platform Scale'],
      resumeId: null
    },
    { 
      id: 'job-17', 
      company: 'Telstra Purple', 
      title: 'Lead Cloud Solutions Consultant', 
      salary: '$190k AUD + Super', 
      location: 'Sydney (Hybrid)', 
      score: 90, 
      source: 'LinkedIn', 
      date: 'Final Loop', 
      nextEvent: 'Thursday 1:00 PM (Customer Advisory Simulation)',
      tags: ['Cloud Strategy', 'Azure', 'Enterprise Architecture'],
      resumeId: null
    },
    { 
      id: 'job-22', 
      company: 'Airtasker', 
      title: 'Head of Engineering Operations', 
      salary: '$205k - $230k AUD', 
      location: 'Sydney (Surry Hills)', 
      score: 92, 
      source: 'LinkedIn', 
      date: 'Round 2 Scheduled', 
      nextEvent: 'Tuesday 2:00 PM (Org Design & Architecture Loop)',
      tags: ['Engineering Leadership', 'Microservices', 'Ruby/Go', 'Scale'],
      resumeId: null
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
    },
    { 
      id: 'job-18', 
      company: 'Salesforce', 
      title: 'Lead Solutions Architect', 
      salary: '$225,000 Total Package AUD', 
      location: 'Sydney (Sydney Tower Hybrid)', 
      score: 96, 
      source: 'Executive Search', 
      date: 'Offer Received 3d ago', 
      expiry: 'Decision Required by Oct 8, 2026',
      tags: ['Agentforce', 'Enterprise Scale', 'Data Cloud', 'Financial Services'],
      resumeId: null
    },
    { 
      id: 'job-19', 
      company: 'Snowflake', 
      title: 'Senior Solutions Engineer', 
      salary: '$210,000 Base + RSUs AUD', 
      location: 'Sydney (CBD)', 
      score: 94, 
      source: 'Direct Referral', 
      date: 'Offer Received Yesterday', 
      expiry: 'Decision Required by Oct 6, 2026',
      tags: ['Data Cloud', 'Data Warehousing', 'Python', 'Customer Engineering'],
      resumeId: null
    },
    { 
      id: 'job-20', 
      company: 'Adobe', 
      title: 'Senior Product Manager', 
      salary: '$195,000 AUD + Bonus', 
      location: 'Sydney (Hybrid)', 
      score: 92, 
      source: 'LinkedIn', 
      date: 'Offer In Final Review', 
      expiry: 'Signing Window Opens Friday',
      tags: ['Firefly AI', 'Design Ecosystem', 'SaaS Growth', 'B2B Licensing'],
      resumeId: null
    },
    { 
      id: 'job-23', 
      company: 'Atlassian', 
      title: 'Principal Cloud Architect', 
      salary: '$220,000 Base + RSUs AUD', 
      location: 'Sydney (Remote)', 
      score: 97, 
      source: 'Executive Referral', 
      date: 'Offer Extended 2d ago', 
      expiry: 'Decision Required by Oct 10, 2026',
      tags: ['Jira Platform', 'Microservices', 'Distributed Systems', 'Cloud Scale'],
      resumeId: 'res-atlassian'
    },
    { 
      id: 'job-24', 
      company: 'Amazon Web Services', 
      title: 'Enterprise Solutions Director', 
      salary: '$240,000 Total Package AUD', 
      location: 'Sydney (Barangaroo)', 
      score: 95, 
      source: 'Recruiter Loop', 
      date: 'Offer Received 1d ago', 
      expiry: 'Decision Required by Oct 12, 2026',
      tags: ['AWS Cloud', 'Multi-Region', 'Enterprise ARR', 'Executive Discovery'],
      resumeId: null
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

// Cover Letters tailored for target roles (Section 2: Document Manager)
const TAILORED_COVER_LETTERS = [
  {
    id: 'cov-canva',
    jobId: 'job-4',
    targetRole: 'Lead Product Manager',
    company: 'Canva',
    matchScore: 97,
    updatedAt: '2 hours ago',
    tone: 'Strategic & Visionary',
    wordCount: 385,
    summary: 'Emphasizes enterprise design systems adoption, creator ecosystem monetization, and API developer platform scaling.',
    opening: 'Dear Canva Hiring Team, having spearheaded high-velocity product initiatives and enterprise design systems across hyper-growth ecosystems, I was thrilled to see the Lead Product Manager opening for Canva’s Creator and Enterprise Platform.',
    body: 'Throughout my tenure driving product architecture across APAC, I have prioritized telemetry-backed feature discovery and engineering pod velocity. At my current organization, I led the cross-functional rollout of design tokens and federated modules that cut release friction by 35% while expanding tier-1 enterprise API adoption by 180%. Canva’s commitment to empowering the world to design deeply aligns with my passion for zero-friction user experiences and developer platforms.',
    bullets: [
      'Scaled enterprise API adoption by 180% across 40+ Tier-1 banking partners through iterative sprint restructuring.',
      'Governed design system standardization adopted by 14 distributed engineering teams, reducing frontend cycle times by 35%.',
      'Championed data-driven product telemetry resulting in 24% MAU growth across self-serve creator workflows.'
    ],
    closing: 'I look forward to discussing how my product execution playbook and technical depth can accelerate Canva’s next phase of enterprise platform dominance.',
    signOff: 'Warm regards,\nAlexander Wright'
  },
  {
    id: 'cov-atlassian',
    jobId: 'job-1',
    targetRole: 'Senior Staff Frontend Architect',
    company: 'Atlassian',
    matchScore: 95,
    updatedAt: 'Yesterday',
    tone: 'Technical & Architectural',
    wordCount: 410,
    summary: 'Tailored for Jira Cloud platform scale, micro-frontend module federation, and sub-second Web Vitals.',
    opening: 'Dear Atlassian Engineering Leadership, as an architect dedicated to large-scale distributed frontend systems, I am writing to express my strong enthusiasm for the Senior Staff Frontend Architect role at Atlassian.',
    body: 'Atlassian’s mission to unleash the potential of every team resonates with my decade of experience architecting resilient, decentralized web platforms. Most recently, I led the migration of a monolithic enterprise UI into 14 federated micro-frontends, cutting release turnaround from weeks to continuous daily deploys while reducing Core Web Vitals LCP by 48%.',
    bullets: [
      'Architected module-federated micro-frontend platform supporting 2M+ daily active sessions with zero downtime.',
      'Authored decentralized state hydration RFC adopted across 6 cross-regional engineering centers.',
      'Established automated bundle analyzer tooling and performance budgets saving 620KB per initial client payload.'
    ],
    closing: 'I would welcome the opportunity to dive deep into your platform roadmap and discuss how my distributed frontend experience can benefit Jira Cloud.',
    signOff: 'Best regards,\nAlexander Wright'
  },
  {
    id: 'cov-stripe',
    jobId: 'job-8',
    targetRole: 'Product Operations Lead',
    company: 'Stripe',
    matchScore: 93,
    updatedAt: '3 days ago',
    tone: 'Operational & High-Reliability',
    wordCount: 395,
    summary: 'Focused on high-concurrency payment reliability, idempotent APIs, and partner integration velocity.',
    opening: 'Dear Stripe Talent Team, with deep expertise scaling financial infrastructure operations and mission-critical developer workflows, I am eager to contribute to Stripe as Product Operations Lead.',
    body: 'Having operated at the intersection of high-availability payment rails and developer experience, I understand the paramount importance of 99.999% reliability. In my previous role, I instituted automated incident command escalation protocols that decreased mean time to resolution by 42% while managing $120M+ monthly throughput.',
    bullets: [
      'Streamlined incident escalation protocols for high-concurrency payment transactions, upholding 99.995% SLA.',
      'Compressed partner integration onboarding cycles from 18 days to 4 days through standardized API checklists.',
      'Partnered directly with risk engineering to deploy automated anomaly filters processing high-velocity settlement traffic.'
    ],
    closing: 'I am excited by Stripe’s relentless focus on increasing the GDP of the internet and look forward to speaking with the team.',
    signOff: 'Sincerely,\nAlexander Wright'
  },
  {
    id: 'cov-microsoft',
    jobId: 'job-10',
    targetRole: 'Principal Azure PM',
    company: 'Microsoft',
    matchScore: 96,
    updatedAt: '4 days ago',
    tone: 'Executive & Strategic',
    wordCount: 425,
    summary: 'Emphasizes enterprise cloud roadmap execution, hybrid cloud security frameworks, and multi-million ARR expansion.',
    opening: 'Dear Microsoft Cloud Recruiting Team, I am writing to submit my application for the Principal Azure PM opportunity, bringing a proven history of multi-million dollar cloud enablement blueprints and enterprise transformation.',
    body: 'Leading enterprise cloud initiatives across Asia-Pacific has shown me that technical excellence must be paired with trusted advisory relationships. Over the past four years, I have architected and delivered hybrid infrastructure solutions securing over $14M in ARR, while directly steering executive steering committees through rigorous compliance validations.',
    bullets: [
      'Delivered multi-year cloud enablement blueprint securing $14M enterprise ARR across Tier-1 APAC institutions.',
      'Orchestrated technical discovery loops aligning cognitive AI accelerators with bank-grade security protocols.',
      'Mobilized cross-division solution taskforces through quarterly executive reviews with c-suite sponsors.'
    ],
    closing: 'I look forward to discussing how my experience driving enterprise cloud adoption can support Azure’s mission.',
    signOff: 'Respectfully,\nAlexander Wright'
  },
  {
    id: 'cov-afterpay',
    jobId: 'job-2',
    targetRole: 'Lead Full-Stack Engineer',
    company: 'Afterpay',
    matchScore: 91,
    updatedAt: '5 days ago',
    tone: 'Full-Stack Performance',
    wordCount: 375,
    summary: 'Engineered for sub-100ms merchant checkout SDKs, real-time risk worker pipelines, and event-driven architecture.',
    opening: 'Dear Afterpay Engineering Team, I am thrilled to apply for the Lead Full-Stack Engineer role, combining full-stack execution with real-time distributed systems engineering.',
    body: 'Afterpay revolutionized modern consumer commerce, and building high-throughput consumer checkout experiences requires obsessive attention to latency and fault tolerance. In my recent work, I built event-driven worker pipelines capable of handling 3,200 requests/sec with sub-100ms response targets.',
    bullets: [
      'Designed event-driven fraud assessment worker pipeline handling 3,200 req/sec with Redis cluster caching.',
      'Optimized React checkout SDK asset delivery, reducing merchant iframe load overhead by 40%.',
      'Implemented robust end-to-end integration test harnesses covering 450+ unit and latency degradation scenarios.'
    ],
    closing: 'I would love the opportunity to contribute to Afterpay’s engineering culture and next-generation payments stack.',
    signOff: 'Warm regards,\nAlexander Wright'
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

        const currentAlpha = p.baseAlpha * (0.8 + 0.3 * Math.sin(p.phase));

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        if (p.isAccent) {
          // Soft cyan / sky-blue mist
          grad.addColorStop(0, `rgba(59, 130, 246, ${currentAlpha * 0.45})`);
          grad.addColorStop(0.5, `rgba(147, 197, 253, ${currentAlpha * 0.28})`);
          grad.addColorStop(1, 'rgba(219, 234, 254, 0)');
        } else {
          // Soft icy azure mist
          grad.addColorStop(0, `rgba(147, 197, 253, ${currentAlpha * 0.55})`);
          grad.addColorStop(0.5, `rgba(191, 219, 254, ${currentAlpha * 0.35})`);
          grad.addColorStop(1, 'rgba(239, 246, 255, 0)');
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

// Real Company Logos rendered from high-res WebP assets, authentic brand SVGs, or dynamic logo services
function TrackerCompanyLogo({ company, size = 20, style = {} }) {
  const [imgError, setImgError] = React.useState(false);
  const normalized = (company || '').toLowerCase();

  // 1. Direct WebP high-res authentic brand assets available in public/logos/
  if (normalized.includes('canva')) {
    return (
      <img 
        src="/logos/canva.webp" 
        alt="Canva" 
        style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', borderRadius: '5px', flexShrink: 0, ...style }} 
      />
    );
  }
  if (normalized.includes('atlassian')) {
    return (
      <img 
        src="/logos/atlassian.webp" 
        alt="Atlassian" 
        style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', borderRadius: '5px', flexShrink: 0, ...style }} 
      />
    );
  }
  if (normalized.includes('afterpay')) {
    return (
      <img 
        src="/logos/afterpay.webp" 
        alt="Afterpay" 
        style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', borderRadius: '5px', flexShrink: 0, ...style }} 
      />
    );
  }
  if (normalized.includes('microsoft')) {
    return (
      <img 
        src="/logos/microsoft.webp" 
        alt="Microsoft" 
        style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', borderRadius: '5px', flexShrink: 0, ...style }} 
      />
    );
  }
  if (normalized.includes('amazon') || normalized.includes('aws')) {
    return (
      <img 
        src="/logos/amazon.webp" 
        alt="Amazon" 
        style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', borderRadius: '5px', flexShrink: 0, ...style }} 
      />
    );
  }
  if (normalized.includes('anz')) {
    return (
      <img 
        src="/logos/anz.webp" 
        alt="ANZ" 
        style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', borderRadius: '5px', flexShrink: 0, ...style }} 
      />
    );
  }
  if (normalized.includes('deloitte')) {
    return (
      <img 
        src="/logos/deloitte.webp" 
        alt="Deloitte" 
        style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', borderRadius: '5px', flexShrink: 0, ...style }} 
      />
    );
  }
  if (normalized.includes('visa')) {
    return (
      <img 
        src="/logos/visa.webp" 
        alt="Visa" 
        style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', borderRadius: '5px', flexShrink: 0, ...style }} 
      />
    );
  }

  // 2. High-precision vector SVGs for Stripe, Google, Wise, Macquarie, Telstra, Airtasker, etc.
  if (normalized.includes('stripe')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ borderRadius: '5px', flexShrink: 0, ...style }}>
        <rect width="32" height="32" rx="6" fill="#635BFF" />
        <path d="M16.8 12.8c-1.3-.4-2.1-.8-2.1-1.5 0-.8.8-1.3 2.1-1.3 1.5 0 2.8.5 3.7 1.2l.9-2.1c-1.1-.8-2.8-1.3-4.6-1.3-3.2 0-5.3 1.7-5.3 4.4 0 2.4 1.7 3.5 4.3 4.3 1.5.5 2.1.9 2.1 1.7 0 .9-.9 1.4-2.3 1.4-1.8 0-3.4-.7-4.4-1.6l-1 2.2c1.3 1.1 3.2 1.7 5.4 1.7 3.4 0 5.6-1.7 5.6-4.5 0-2.6-1.8-3.7-4.4-4.6z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (normalized.includes('google')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ borderRadius: '5px', flexShrink: 0, ...style }}>
        <rect width="32" height="32" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <path d="M22.8 16.2c0-.5-.04-1-.13-1.5H16v2.9h3.8c-.16.9-.67 1.7-1.43 2.2v1.8h2.3c1.36-1.3 2.13-3.1 2.13-5.4z" fill="#4285F4" />
        <path d="M16 23.2c1.9 0 3.6-.6 4.8-1.7l-2.3-1.8c-.6.4-1.5.7-2.5.7-1.9 0-3.5-1.3-4.1-3.1H9.4v1.9c1.2 2.4 3.7 4 6.6 4z" fill="#34A853" />
        <path d="M11.9 17.3c-.2-.5-.3-1-.3-1.6s.1-1.1.3-1.6V12.2H9.4c-.5 1-1 2.3-1 3.8s.5 2.8 1 3.8l2.5-2.5z" fill="#FBBC05" />
        <path d="M16 11.5c1.1 0 2 .4 2.8 1.1l2.1-2.1C19.5 9.4 17.9 8.8 16 8.8c-2.9 0-5.4 1.6-6.6 4l2.5 1.9c.6-1.8 2.2-3.2 4.1-3.2z" fill="#EA4335" />
      </svg>
    );
  }

  if (normalized.includes('wise')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ borderRadius: '5px', flexShrink: 0, ...style }}>
        <rect width="32" height="32" rx="6" fill="#9FE870" />
        <path d="M9 10h6l-3.5 12h-3L9 10zm7.5 0h6.5l-4.5 12h-3l2.5-7.5h-2.5l1-4.5z" fill="#163300" />
      </svg>
    );
  }

  if (normalized.includes('macquarie')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ borderRadius: '5px', flexShrink: 0, ...style }}>
        <rect width="32" height="32" rx="6" fill="#000000" />
        <circle cx="16" cy="16" r="8" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
        <circle cx="16" cy="16" r="3.5" fill="#FFFFFF" />
      </svg>
    );
  }

  if (normalized.includes('telstra')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ borderRadius: '5px', flexShrink: 0, ...style }}>
        <rect width="32" height="32" rx="6" fill="#0057B8" />
        <path d="M10 11h12v3.2h-4.3V22h-3.4v-7.8H10V11z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (normalized.includes('airtasker')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ borderRadius: '5px', flexShrink: 0, ...style }}>
        <rect width="32" height="32" rx="6" fill="#00C48C" />
        <path d="M11 21l5-11 5 11h-3l-2-4.5-2 4.5h-3zm3.5-6h3l-1.5-3.5-1.5 3.5z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (normalized.includes('commbank') || normalized.includes('commonwealth')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ borderRadius: '5px', flexShrink: 0, ...style }}>
        <rect width="32" height="32" rx="6" fill="#FFCC00" />
        <polygon points="16,8 24,16 16,24 8,16" fill="#000000" />
      </svg>
    );
  }

  // Fallback: Dynamic domain favicon or stylized monogram
  const domainGuess = normalized.replace(/[^a-z0-9]/g, '') + '.com';
  if (!imgError) {
    return (
      <img
        src={`https://www.google.com/s2/favicons?domain=${domainGuess}&sz=64`}
        alt={company}
        onError={() => setImgError(true)}
        style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', borderRadius: '5px', flexShrink: 0, ...style }}
      />
    );
  }

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '5px',
        backgroundColor: '#1A53CF',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 900,
        fontSize: `${Math.round(size * 0.5)}px`,
        flexShrink: 0,
        ...style
      }}
    >
      {(company || 'J').charAt(0).toUpperCase()}
    </div>
  );
}

export default function WorkspaceTrackerView({ onNavigateToJobSearch, onNavigateToResume, onNavigateToCoverLetter }) {
  // Section 1: Active Stage Selection for the 4-Card Attached Design
  // 'saved' | 'applied' | 'interviewing' | 'offers'
  const [activeStage, setActiveStage] = useState('applied');
  const [pipeline, setPipeline] = useState(() => {
    try {
      // Clear all legacy pipeline keys that may contain single-row stale data
      sessionStorage.removeItem('jobgen_candidate_pipeline');
      sessionStorage.removeItem('jobgen_candidate_pipeline_v2');
      sessionStorage.removeItem('jobgen_candidate_pipeline_v3');
      const saved = sessionStorage.getItem('jobgen_pipeline_v6_fixed2rows');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed.saved?.length >= 4 &&
          parsed.applied?.length >= 4 &&
          parsed.interviewing?.length >= 4 &&
          parsed.offers?.length >= 4
        ) {
          return parsed;
        }
      }
    } catch (e) {}
    return INITIAL_PIPELINE;
  });

  // Ensure pipeline always has enough items for 2 full rows across all stages
  React.useEffect(() => {
    setPipeline(prev => {
      let needsUpdate = false;
      const next = { ...prev };
      for (const stage of ['saved', 'applied', 'interviewing', 'offers']) {
        if (!next[stage] || next[stage].length < 4) {
          next[stage] = INITIAL_PIPELINE[stage];
          needsUpdate = true;
        }
      }
      if (needsUpdate) {
        try {
          sessionStorage.setItem('jobgen_pipeline_v6_fixed2rows', JSON.stringify(next));
        } catch (e) {}
        return next;
      }
      return prev;
    });
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [actionToast, setActionToast] = useState(null);
  const [showAddJobModal, setShowAddJobModal] = useState(false);

  // Section 2: Document Manager State
  const [activeDocTab, setActiveDocTab] = useState('resumes'); // 'resumes' | 'coverLetters'
  const [docSearchQuery, setDocSearchQuery] = useState('');
  const [previewResume, setPreviewResume] = useState(null);
  const [previewCoverLetter, setPreviewCoverLetter] = useState(null);
  const [showAddDocModal, setShowAddDocModal] = useState(false);

  // Stored resumes & cover letters lists with sessionStorage persistence
  const [resumesList, setResumesList] = useState(() => {
    try {
      const saved = sessionStorage.getItem('jobgen_resumes_list_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return TAILORED_RESUMES;
  });

  const [coverLettersList, setCoverLettersList] = useState(() => {
    try {
      const saved = sessionStorage.getItem('jobgen_coverletters_list_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return TAILORED_COVER_LETTERS;
  });

  const handleDeleteResume = (id) => {
    const doc = resumesList.find(r => r.id === id);
    setResumesList(prev => {
      const updated = prev.filter(r => r.id !== id);
      try {
        sessionStorage.setItem('jobgen_resumes_list_v2', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    showToast(`Deleted resume tailored for ${doc?.company || 'job'}`);
  };

  const handleDeleteCoverLetter = (id) => {
    const doc = coverLettersList.find(c => c.id === id);
    setCoverLettersList(prev => {
      const updated = prev.filter(c => c.id !== id);
      try {
        sessionStorage.setItem('jobgen_coverletters_list_v2', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    showToast(`Deleted cover letter tailored for ${doc?.company || 'job'}`);
  };

  const handleAddNewDocument = (newDoc, docType = 'resume') => {
    if (docType === 'resume') {
      setResumesList(prev => {
        const updated = [newDoc, ...prev];
        try {
          sessionStorage.setItem('jobgen_resumes_list_v2', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      setActiveDocTab('resumes');
      showToast(`Generated tailored resume for ${newDoc.company}`);
    } else {
      setCoverLettersList(prev => {
        const updated = [newDoc, ...prev];
        try {
          sessionStorage.setItem('jobgen_coverletters_list_v2', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      setActiveDocTab('coverLetters');
      showToast(`Generated tailored cover letter for ${newDoc.company}`);
    }
  };

  // 2 Document Tabs (Resumes and Cover Letters)
  const DOC_TABS = [
    {
      id: 'resumes',
      label: 'Resumes',
      icon: FileText,
      count: resumesList.length,
      badgeColor: '#1A53CF',
      badgeBg: '#EFF6FF'
    },
    {
      id: 'coverLetters',
      label: 'Cover Letters',
      icon: Mail,
      count: coverLettersList.length,
      badgeColor: '#2563EB',
      badgeBg: '#DBEAFE'
    }
  ];

  const filteredResumes = resumesList.filter(res => {
    if (!docSearchQuery.trim()) return true;
    const q = docSearchQuery.toLowerCase();
    return res.company.toLowerCase().includes(q) ||
           res.targetRole.toLowerCase().includes(q) ||
           (res.summary && res.summary.toLowerCase().includes(q));
  });

  const filteredCoverLetters = coverLettersList.filter(cov => {
    if (!docSearchQuery.trim()) return true;
    const q = docSearchQuery.toLowerCase();
    return cov.company.toLowerCase().includes(q) ||
           cov.targetRole.toLowerCase().includes(q) ||
           (cov.summary && cov.summary.toLowerCase().includes(q)) ||
           (cov.tone && cov.tone.toLowerCase().includes(q));
  });

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
        sessionStorage.setItem('jobgen_pipeline_v6_fixed2rows', JSON.stringify(updated));
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

    setPipeline(prev => {
      const updated = {
        ...prev,
        [fromCol]: prev[fromCol].filter(c => c.id !== cardId),
        [toCol]: [card, ...prev[toCol]]
      };
      try {
        sessionStorage.setItem('jobgen_pipeline_v6_fixed2rows', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    showToast(`Moved ${card.company} (${card.title}) to ${label}`);
  };

  // Delete card from a stage
  const handleDeleteJob = (cardId, stageKey) => {
    const card = pipeline[stageKey]?.find(c => c.id === cardId);
    setPipeline(prev => {
      const updated = {
        ...prev,
        [stageKey]: (prev[stageKey] || []).filter(c => c.id !== cardId)
      };
      try {
        sessionStorage.setItem('jobgen_pipeline_v6_fixed2rows', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    showToast(`Deleted ${card ? `${card.title} at ${card.company}` : 'job card'}`);
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
    <div style={{ paddingBottom: '60px', paddingRight: '28px', maxWidth: '1440px', margin: '0 auto', position: 'relative' }}>

      {/* 2 Thick Blue Lines on Right Side Running Behind Tracker & Document Containers (Fading smoothly before JOBGEN.AI) */}
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          bottom: '-10px',
          right: '134px',
          width: '160px',
          display: 'flex',
          justifyContent: 'space-between',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {/* Blue Line 1 (63px - 70% of previous thickness, not rounded at top) */}
        <div 
          style={{
            width: '63px',
            height: '100%',
            borderRadius: '0 0 999px 999px',
            background: 'linear-gradient(to bottom, #1A53CF 0%, #2563EB 60%, rgba(37, 99, 235, 0.75) 75%, rgba(37, 99, 235, 0.25) 88%, transparent 98%)',
            boxShadow: '0 0 28px rgba(37, 99, 235, 0.42)'
          }}
        />
        {/* Blue Line 2 (63px - 70% of previous thickness, not rounded at top) */}
        <div 
          style={{
            width: '63px',
            height: '100%',
            borderRadius: '0 0 999px 999px',
            background: 'linear-gradient(to bottom, #2563EB 0%, #3B82F6 60%, rgba(59, 130, 246, 0.75) 75%, rgba(59, 130, 246, 0.25) 88%, transparent 98%)',
            boxShadow: '0 0 28px rgba(59, 130, 246, 0.42)'
          }}
        />
      </div>

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

      {/* Section 1: Attached Stage Tracker */}
      <section style={{ marginBottom: '48px', marginTop: '22px', position: 'relative', zIndex: 1 }}>

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
          {/* Left Column: 4 Stacked Tab Cards Tucked Under Big Container */}
          <div 
            style={{ 
              width: '210px', 
              flexShrink: 0, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '6px',
              zIndex: 5,
              paddingRight: '0px'
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
                    backgroundColor: isSelected ? '#1A53CF' : '#FFFFFF',
                    background: isSelected 
                      ? 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)' 
                      : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#090C15',
                    border: isSelected 
                      ? '1px solid #1A53CF' 
                      : '1px solid #E2E8F0',
                    borderRight: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    textAlign: 'left',
                    boxShadow: isSelected 
                      ? '0 6px 20px rgba(26, 83, 207, 0.4)' 
                      : '0 2px 6px rgba(15, 23, 42, 0.04)',
                    transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isSelected ? 'translateX(2px)' : 'translateX(0)',
                    zIndex: isSelected ? 8 : 4,
                    minHeight: '76px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = '#F8FAFC';
                      e.currentTarget.style.transform = 'translateX(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }
                  }}
                >
                  {/* Card Content: Icon and Name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div 
                      style={{ 
                        width: '36px', 
                        height: '36px', 
                        borderRadius: '10px', 
                        backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.22)' : '#F1F5F9',
                        border: isSelected ? '1px solid rgba(255, 255, 255, 0.35)' : '1px solid #E2E8F0',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Icon size={18} color={isSelected ? '#FFFFFF' : '#090C15'} strokeWidth={2.4} />
                    </div>

                    <span 
                      style={{ 
                        fontSize: '15.5px', 
                        fontWeight: 800, 
                        color: isSelected ? '#FFFFFF' : '#090C15',
                        fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                        letterSpacing: '-0.015em',
                        transition: 'color 0.2s ease'
                      }}
                    >
                      {stage.label}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Circular Pulsating Add Job Button directly below the Offers card */}
            <div 
              style={{ 
                marginTop: '46px', 
                marginLeft: '-13px',
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '8px' 
              }}
            >
              <button
                onClick={() => setShowAddJobModal(true)}
                title="Add New Job Opportunity"
                className="pulsating-add-job-btn"
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
                  color: '#FFFFFF',
                  border: '3px solid #FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  animation: 'pulseAddJobButton 2.2s infinite ease-in-out',
                  transition: 'transform 0.2s ease, filter 0.2s ease',
                  boxShadow: '0 6px 20px rgba(26, 83, 207, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.filter = 'brightness(1.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.filter = 'brightness(1)';
                }}
              >
                <Plus size={34} strokeWidth={2.8} />
              </button>
              <span 
                style={{ 
                  fontSize: '11px', 
                  fontWeight: 800, 
                  color: '#1A53CF', 
                  letterSpacing: '0.04em', 
                  textTransform: 'uppercase' 
                }}
              >
                Add Job
              </span>
            </div>
          </div>

          {/* Right Main Container Wrapper: keeps the right container and zagged edge outline strictly matching in height and bounds */}
          <div 
            style={{ 
              flex: 1, 
              position: 'relative', 
              height: '520px', 
              minHeight: '520px', 
              maxHeight: '520px',
              marginLeft: '-14px',
              zIndex: 15
            }}
          >
            {/* White container with bluish mist, brought OVER the left cards with zig-zag edge on right */}
            <div 
              style={{ 
                width: '100%',
                height: '100%',
                backgroundColor: '#FFFFFF', 
                borderTopLeftRadius: '16px',
                borderBottomLeftRadius: '16px',
                borderTopRightRadius: '0px',
                borderBottomRightRadius: '0px',
                border: '1px solid #E2E8F0',
                borderLeft: '1.5px solid #E2E8F0',
                padding: '36px 38px 24px 28px',
                boxShadow: '-8px 0 24px rgba(15, 23, 42, 0.08), 0 16px 40px -8px rgba(15, 23, 42, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
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
              @keyframes pulseAddJobButton {
                0% {
                  box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7), 0 6px 20px rgba(26, 83, 207, 0.4);
                  transform: scale(1);
                }
                60% {
                  box-shadow: 0 0 0 18px rgba(37, 99, 235, 0), 0 8px 28px rgba(26, 83, 207, 0.5);
                  transform: scale(1.05);
                }
                100% {
                  box-shadow: 0 0 0 0 rgba(37, 99, 235, 0), 0 6px 20px rgba(26, 83, 207, 0.4);
                  transform: scale(1);
                }
              }
              .custom-stage-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: #CBD5E1 #F8FAFC;
                overscroll-behavior: auto;
              }
              .custom-stage-scrollbar::-webkit-scrollbar {
                width: 6px;
              }
              .custom-stage-scrollbar::-webkit-scrollbar-track {
                background: #F8FAFC;
                border-radius: 999px;
              }
              .custom-stage-scrollbar::-webkit-scrollbar-thumb {
                background: #CBD5E1;
                border-radius: 999px;
              }
              .custom-stage-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #94A3B8;
              }
            `}</style>

            {/* Canvas-Driven Dynamic Bluish Mist Simulation */}
            <MistCanvas />

            {/* Layered Atmospheric Glowing Bluish Mist Clouds */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse 65% 50% at 20% 25%, rgba(191, 219, 254, 0.45) 0%, transparent 70%), radial-gradient(ellipse 70% 60% at 85% 75%, rgba(186, 230, 253, 0.4) 0%, transparent 70%)',
                filter: 'blur(36px)',
                pointerEvents: 'none',
                zIndex: 2,
                animation: 'mistDriftAmbient 16s ease-in-out infinite alternate'
              }}
            />
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(219, 234, 254, 0.35) 0%, transparent 65%)',
                filter: 'blur(28px)',
                pointerEvents: 'none',
                zIndex: 2
              }}
            />

            {/* Ambient Deep Blue Radial Atmosphere continuing inward */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: '0px',
                width: '180px',
                pointerEvents: 'none',
                zIndex: 3,
                background: 'radial-gradient(ellipse 95% 65% at 100% 50%, rgba(37, 99, 235, 0.28) 0%, rgba(59, 130, 246, 0.14) 40%, rgba(147, 197, 253, 0.05) 75%, transparent 100%)',
                filter: 'blur(16px)'
              }}
            />
            {/* Extended Slow Blue Fade along the Jagged Teeth - Deep inward dissolution */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: '0px',
                width: '140px',
                pointerEvents: 'none',
                zIndex: 4,
                background: 'linear-gradient(to left, rgba(37, 99, 235, 0.48) 0%, rgba(37, 99, 235, 0.35) 16px, rgba(59, 130, 246, 0.22) 42px, rgba(96, 165, 250, 0.12) 75px, rgba(147, 197, 253, 0.04) 110px, transparent 100%)',
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
            />
            {/* Soft luminous gradient on the teeth tips themselves (gradient polygon without hard stroke line) */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: '0px',
                width: '16px',
                pointerEvents: 'none',
                zIndex: 5,
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='26' viewBox='0 0 16 26'%3E%3Cdefs%3E%3ClinearGradient id='softFade' x1='100%25' y1='0%25' x2='0%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%232563EB' stop-opacity='0.68'/%3E%3Cstop offset='45%25' stop-color='%233B82F6' stop-opacity='0.34'/%3E%3Cstop offset='100%25' stop-color='%2393C5FD' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpolygon points='0,0 16,13 0,26' fill='url(%23softFade)'/%3E%3C/svg%3E")`,
                backgroundSize: '16px 26px',
                backgroundPosition: 'right top',
                backgroundRepeat: 'repeat-y',
                filter: 'drop-shadow(-2px 0 6px rgba(37, 99, 235, 0.35))'
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
                borderBottom: '1.5px solid #F1F5F9',
                position: 'relative',
                zIndex: 5,
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div>
                {/* Big Caps TRACKER Header */}
                <h3 
                  style={{ 
                    fontSize: '32px', 
                    fontWeight: 900, 
                    margin: 0,
                    letterSpacing: '-0.025em',
                    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    lineHeight: 1
                  }}
                >
                  <span style={{ color: '#090C15' }}>TRA</span>
                  <span 
                    style={{ 
                      color: '#2563EB', 
                      background: 'linear-gradient(135deg, #2563EB 0%, #1A53CF 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 2px 8px rgba(37, 99, 235, 0.25))'
                    }}
                  >
                    CKER
                  </span>
                </h3>
              </div>

              {/* Search filter for this stage - Clean White Search Pill */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  backgroundColor: '#FFFFFF',
                  padding: '7px 14px',
                  borderRadius: '999px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
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
                    backgroundColor: '#F1F5F9', 
                    border: '1px solid #E2E8F0',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '14px',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)'
                  }}
                >
                  <Briefcase size={22} color="#64748B" />
                </div>
                <h4 style={{ fontSize: '15.5px', fontWeight: 800, color: '#090C15', margin: '0 0 6px 0' }}>
                  No roles currently in {currentStageInfo.label}
                </h4>
                <p style={{ fontSize: '12.5px', color: '#64748B', maxWidth: '340px', margin: '0 0 16px 0' }}>
                  Move opportunities here from other stages or explore verified openings.
                </p>
                {onNavigateToJobSearch && (
                  <button
                    onClick={onNavigateToJobSearch}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '999px',
                      backgroundColor: '#090C15',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)'
                    }}
                  >
                    Find Roles in Job Hunt →
                  </button>
                )}
              </div>
            ) : (
              <div 
                className="custom-stage-scrollbar"
                onWheel={(e) => {
                  const el = e.currentTarget;
                  const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 2;
                  const isAtTop = el.scrollTop <= 0;
                  if ((isAtBottom && e.deltaY > 0) || (isAtTop && e.deltaY < 0)) {
                    window.scrollBy({ top: e.deltaY, behavior: 'auto' });
                  }
                }}
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', 
                  gap: '12px',
                  alignContent: 'start',
                  alignItems: 'start',
                  gridAutoRows: '142px',
                  position: 'relative',
                  zIndex: 20,
                  height: '385px',
                  minHeight: '385px',
                  maxHeight: '385px',
                  overflowY: 'auto',
                  overscrollBehavior: 'auto',
                  paddingRight: '6px',
                  paddingBottom: '36px'
                }}
              >
                {filteredJobs.map((job) => {
                  return (
                    <div 
                      key={job.id}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.72)',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.62) 100%)',
                        backdropFilter: 'blur(16px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                        borderRadius: '14px',
                        border: '1.5px solid rgba(255, 255, 255, 0.88)',
                        padding: '12px 14px',
                        height: '142px',
                        minHeight: '142px',
                        maxHeight: '142px',
                        boxSizing: 'border-box',
                        boxShadow: '0 10px 25px -4px rgba(15, 23, 42, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.04), inset 0 1px 1.5px rgba(255, 255, 255, 0.95)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '6px',
                        position: 'relative',
                        zIndex: 20,
                        transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease, border-color 0.22s ease, background 0.22s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.borderColor = 'rgba(191, 219, 254, 0.95)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.76) 100%)';
                        e.currentTarget.style.boxShadow = '0 16px 36px -4px rgba(37, 99, 235, 0.16), 0 6px 14px -2px rgba(15, 23, 42, 0.06), inset 0 1px 2px rgba(255, 255, 255, 1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.88)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.62) 100%)';
                        e.currentTarget.style.boxShadow = '0 10px 25px -4px rgba(15, 23, 42, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.04), inset 0 1px 1.5px rgba(255, 255, 255, 0.95)';
                      }}
                    >
                      {/* Top: Company Header & Red Dustbin Delete Button */}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', minWidth: 0, overflow: 'hidden' }}>
                            <TrackerCompanyLogo company={job.company} size={20} />
                            <span 
                              style={{ 
                                fontSize: '12px', 
                                fontWeight: 900, 
                                color: '#1A53CF', 
                                textTransform: 'uppercase', 
                                letterSpacing: '0.04em',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {job.company}
                            </span>
                          </div>

                          {/* Small Red Dustbin Button to Delete Job */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteJob(job.id, activeStage);
                            }}
                            title="Delete job opportunity"
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '6px',
                              border: '1px solid #FECACA',
                              backgroundColor: '#FEF2F2',
                              color: '#DC2626',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              padding: 0,
                              transition: 'all 0.15s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#DC2626';
                              e.currentTarget.style.color = '#FFFFFF';
                              e.currentTarget.style.borderColor = '#B91C1C';
                              e.currentTarget.style.boxShadow = '0 2px 8px rgba(220, 38, 38, 0.35)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#FEF2F2';
                              e.currentTarget.style.color = '#DC2626';
                              e.currentTarget.style.borderColor = '#FECACA';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            <Trash2 size={13} strokeWidth={2.4} />
                          </button>
                        </div>

                        {/* Title: Bigger, Prominent, Highly Readable */}
                        <h4 
                          style={{ 
                            fontSize: '14.5px', 
                            fontWeight: 800, 
                            color: '#090C15', 
                            margin: '0 0 3px 0', 
                            lineHeight: 1.25,
                            letterSpacing: '-0.015em'
                          }}
                        >
                          {job.title}
                        </h4>

                        {/* Salary & Location: Bigger and Clean */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#475569', fontWeight: 600, flexWrap: 'wrap' }}>
                          <span style={{ color: '#0F172A', fontWeight: 700 }}>{job.salary}</span>
                          <span>•</span>
                          <span>{job.location}</span>
                        </div>
                      </div>

                      {/* Card Footer: Prominent Action Buttons */}
                      <div 
                        style={{ 
                          paddingTop: '8px', 
                          borderTop: '1px solid #F1F5F9', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          gap: '6px' 
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
                              padding: '6px 11px',
                              borderRadius: '7px',
                              border: '1.5px solid #CBD5E1',
                              backgroundColor: '#F8FAFC',
                              color: '#334155',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                            title="Move back to Saved"
                          >
                            <ArrowLeft size={11} />
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
                              padding: '6px 11px',
                              borderRadius: '7px',
                              border: '1.5px solid #CBD5E1',
                              backgroundColor: '#F8FAFC',
                              color: '#334155',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                            title="Move back to Applied"
                          >
                            <ArrowLeft size={11} />
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
                              padding: '6px 11px',
                              borderRadius: '7px',
                              border: '1.5px solid #CBD5E1',
                              backgroundColor: '#F8FAFC',
                              color: '#334155',
                              fontSize: '11px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                            title="Move back to Interviewing"
                          >
                            <ArrowLeft size={11} />
                            <span>Interviewing</span>
                          </button>
                        )}

                        {/* Center / Fallback spacer when no previous button */}
                        {activeStage === 'saved' && (
                          <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>{job.date}</span>
                        )}

                        {/* NEXT BUTTON (disabled/hidden if in 'offers') */}
                        {activeStage === 'saved' && (
                          <button
                            onClick={() => moveCard(job.id, 'saved', 'applied', 'Applied')}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '6.5px 13px',
                              borderRadius: '7px',
                              border: 'none',
                              background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
                              color: '#FFFFFF',
                              fontSize: '11.5px',
                              fontWeight: 800,
                              cursor: 'pointer',
                              boxShadow: '0 3px 10px rgba(26, 83, 207, 0.35)',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <span>To Applied</span>
                            <ArrowRight size={11} />
                          </button>
                        )}

                        {activeStage === 'applied' && (
                          <button
                            onClick={() => moveCard(job.id, 'applied', 'interviewing', 'Interviewing')}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '6.5px 13px',
                              borderRadius: '7px',
                              border: 'none',
                              background: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
                              color: '#FFFFFF',
                              fontSize: '11.5px',
                              fontWeight: 800,
                              cursor: 'pointer',
                              boxShadow: '0 3px 10px rgba(217, 119, 6, 0.35)',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <span>To Interview</span>
                            <ArrowRight size={11} />
                          </button>
                        )}

                        {activeStage === 'interviewing' && (
                          <button
                            onClick={() => moveCard(job.id, 'interviewing', 'offers', 'Offers')}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '6.5px 13px',
                              borderRadius: '7px',
                              border: 'none',
                              background: 'linear-gradient(135deg, #16A34A 0%, #22C55E 100%)',
                              color: '#FFFFFF',
                              fontSize: '11.5px',
                              fontWeight: 800,
                              cursor: 'pointer',
                              boxShadow: '0 3px 10px rgba(22, 163, 74, 0.35)',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <span>To Offer 🎉</span>
                            <ArrowRight size={11} />
                          </button>
                        )}

                        {activeStage === 'offers' && (
                          <button
                            onClick={() => showToast(`Congratulations! Accepted offer for ${job.title} at ${job.company}`)}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '6.5px 13px',
                              borderRadius: '7px',
                              border: 'none',
                              background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
                              color: '#FFFFFF',
                              fontSize: '11.5px',
                              fontWeight: 800,
                              cursor: 'pointer',
                              boxShadow: '0 3px 10px rgba(5, 150, 105, 0.35)',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <span>Accept 🎉</span>
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
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: DOCUMENT MANAGER (RESUMES & COVER LETTERS)
          - Attached Geometry matching Tracker: 2 Left Tabs + Right Container with Zagged Edge, Mist & Blur
          ========================================================================= */}
      <section style={{ marginBottom: '48px', marginTop: '22px', position: 'relative', zIndex: 1 }}>
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'stretch',
            position: 'relative',
            borderRadius: '28px',
            overflow: 'visible'
          }}
        >
          {/* Left Column: 2 Stacked Tab Cards (Resumes & Cover Letters) + Pulsating Add Doc Button */}
          <div 
            style={{ 
              width: '210px', 
              flexShrink: 0, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '6px',
              zIndex: 5,
              paddingRight: '0px'
            }}
          >
            {DOC_TABS.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeDocTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveDocTab(tab.id);
                    setDocSearchQuery('');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 20px',
                    borderTopLeftRadius: '18px',
                    borderBottomLeftRadius: '18px',
                    borderTopRightRadius: '0px',
                    borderBottomRightRadius: '0px',
                    backgroundColor: isSelected ? '#1A53CF' : '#FFFFFF',
                    background: isSelected 
                      ? 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)' 
                      : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#090C15',
                    border: isSelected 
                      ? '1px solid #1A53CF' 
                      : '1px solid #E2E8F0',
                    borderRight: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    textAlign: 'left',
                    boxShadow: isSelected 
                      ? '0 6px 20px rgba(26, 83, 207, 0.4)' 
                      : '0 2px 6px rgba(15, 23, 42, 0.04)',
                    transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isSelected ? 'translateX(2px)' : 'translateX(0)',
                    zIndex: isSelected ? 8 : 4,
                    minHeight: '76px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = '#F8FAFC';
                      e.currentTarget.style.transform = 'translateX(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }
                  }}
                >
                  {/* Card Content: Icon and Name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div 
                      style={{ 
                        width: '36px', 
                        height: '36px', 
                        borderRadius: '10px', 
                        backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.22)' : '#F1F5F9',
                        border: isSelected ? '1px solid rgba(255, 255, 255, 0.35)' : '1px solid #E2E8F0',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <Icon size={18} color={isSelected ? '#FFFFFF' : '#090C15'} strokeWidth={2.4} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span 
                        style={{ 
                          fontSize: '15.5px', 
                          fontWeight: 800, 
                          color: isSelected ? '#FFFFFF' : '#090C15',
                          fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                          letterSpacing: '-0.015em',
                          transition: 'color 0.2s ease',
                          lineHeight: 1.2
                        }}
                      >
                        {tab.label}
                      </span>
                      <span 
                        style={{ 
                          fontSize: '11px', 
                          fontWeight: 700, 
                          color: isSelected ? 'rgba(255, 255, 255, 0.85)' : '#64748B',
                          marginTop: '2px'
                        }}
                      >
                        {tab.count} {tab.count === 1 ? 'doc' : 'docs'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Circular Pulsating Add Doc Button directly below Cover Letters card */}
            <div 
              style={{ 
                marginTop: '46px', 
                marginLeft: '-13px',
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '8px' 
              }}
            >
              <button
                onClick={() => setShowAddDocModal(true)}
                title="Create New Tailored Document"
                className="pulsating-add-job-btn"
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
                  color: '#FFFFFF',
                  border: '3px solid #FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  animation: 'pulseAddJobButton 2.2s infinite ease-in-out',
                  transition: 'transform 0.2s ease, filter 0.2s ease',
                  boxShadow: '0 6px 20px rgba(26, 83, 207, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.filter = 'brightness(1.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.filter = 'brightness(1)';
                }}
              >
                <Plus size={34} strokeWidth={2.8} />
              </button>
              <span 
                style={{ 
                  fontSize: '11px', 
                  fontWeight: 800, 
                  color: '#1A53CF', 
                  letterSpacing: '0.04em', 
                  textTransform: 'uppercase' 
                }}
              >
                New Doc
              </span>
            </div>
          </div>

          {/* Right Main Container Wrapper: 520px height, jagged edge with deep blue fade */}
          <div 
            style={{ 
              flex: 1, 
              position: 'relative', 
              height: '520px', 
              minHeight: '520px', 
              maxHeight: '520px',
              marginLeft: '-14px',
              zIndex: 15
            }}
          >
            {/* White container with bluish mist, brought OVER the left cards with zig-zag edge on right */}
            <div 
              style={{ 
                width: '100%',
                height: '100%',
                backgroundColor: '#FFFFFF', 
                borderTopLeftRadius: '16px',
                borderBottomLeftRadius: '16px',
                borderTopRightRadius: '0px',
                borderBottomRightRadius: '0px',
                border: '1px solid #E2E8F0',
                borderLeft: '1.5px solid #E2E8F0',
                padding: '36px 38px 24px 28px',
                boxShadow: '-8px 0 24px rgba(15, 23, 42, 0.08), 0 16px 40px -8px rgba(15, 23, 42, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
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
              {/* Canvas-Driven Dynamic Bluish Mist Simulation */}
              <MistCanvas />

              {/* Layered Atmospheric Glowing Bluish Mist Clouds */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(ellipse 65% 50% at 20% 25%, rgba(191, 219, 254, 0.45) 0%, transparent 70%), radial-gradient(ellipse 70% 60% at 85% 75%, rgba(186, 230, 253, 0.4) 0%, transparent 70%)',
                  filter: 'blur(36px)',
                  pointerEvents: 'none',
                  zIndex: 2,
                  animation: 'mistDriftAmbient 16s ease-in-out infinite alternate'
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(219, 234, 254, 0.35) 0%, transparent 65%)',
                  filter: 'blur(28px)',
                  pointerEvents: 'none',
                  zIndex: 2
                }}
              />

              {/* Ambient Deep Blue Radial Atmosphere continuing inward */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: '0px',
                  width: '180px',
                  pointerEvents: 'none',
                  zIndex: 3,
                  background: 'radial-gradient(ellipse 95% 65% at 100% 50%, rgba(37, 99, 235, 0.28) 0%, rgba(59, 130, 246, 0.14) 40%, rgba(147, 197, 253, 0.05) 75%, transparent 100%)',
                  filter: 'blur(16px)'
                }}
              />
              {/* Extended Slow Blue Fade along the Jagged Teeth - Deep inward dissolution */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: '0px',
                  width: '140px',
                  pointerEvents: 'none',
                  zIndex: 4,
                  background: 'linear-gradient(to left, rgba(37, 99, 235, 0.48) 0%, rgba(37, 99, 235, 0.35) 16px, rgba(59, 130, 246, 0.22) 42px, rgba(96, 165, 250, 0.12) 75px, rgba(147, 197, 253, 0.04) 110px, transparent 100%)',
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
              />
              {/* Soft luminous gradient on the teeth tips themselves */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: '0px',
                  width: '16px',
                  pointerEvents: 'none',
                  zIndex: 5,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='26' viewBox='0 0 16 26'%3E%3Cdefs%3E%3ClinearGradient id='softFadeDoc' x1='100%25' y1='0%25' x2='0%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%232563EB' stop-opacity='0.68'/%3E%3Cstop offset='45%25' stop-color='%233B82F6' stop-opacity='0.34'/%3E%3Cstop offset='100%25' stop-color='%2393C5FD' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpolygon points='0,0 16,13 0,26' fill='url(%23softFadeDoc)'/%3E%3C/svg%3E")`,
                  backgroundSize: '16px 26px',
                  backgroundPosition: 'right top',
                  backgroundRepeat: 'repeat-y',
                  filter: 'drop-shadow(-2px 0 6px rgba(37, 99, 235, 0.35))'
                }}
              />

              {/* Header inside the Document Manager container */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  marginBottom: '18px', 
                  paddingBottom: '14px', 
                  borderBottom: '1.5px solid #F1F5F9',
                  position: 'relative',
                  zIndex: 5,
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <h3 
                    style={{ 
                      fontSize: '32px', 
                      fontWeight: 900, 
                      margin: 0,
                      letterSpacing: '-0.025em',
                      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                      display: 'flex',
                      alignItems: 'center',
                      lineHeight: 1
                    }}
                  >
                    <span style={{ color: '#090C15' }}>DOC</span>
                    <span 
                      style={{ 
                        color: '#2563EB', 
                        background: 'linear-gradient(135deg, #2563EB 0%, #1A53CF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 2px 8px rgba(37, 99, 235, 0.25))'
                      }}
                    >
                      UMENTS
                    </span>
                  </h3>
                </div>

                {/* Search filter pill */}
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    backgroundColor: '#FFFFFF',
                    padding: '7px 14px',
                    borderRadius: '999px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
                  }}
                >
                  <Search size={14} color="#64748B" />
                  <input 
                    type="text"
                    placeholder={`Search ${activeDocTab === 'resumes' ? 'resumes' : 'cover letters'}...`}
                    value={docSearchQuery}
                    onChange={(e) => setDocSearchQuery(e.target.value)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontSize: '12px',
                      color: '#090C15',
                      width: '180px'
                    }}
                  />
                  {docSearchQuery && (
                    <button 
                      onClick={() => setDocSearchQuery('')}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <X size={13} color="#64748B" />
                    </button>
                  )}
                </div>
              </div>

              {/* Tab 1: Resumes List */}
              {activeDocTab === 'resumes' && (
                filteredResumes.length === 0 ? (
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
                        backgroundColor: '#F1F5F9', 
                        border: '1px solid #E2E8F0',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginBottom: '14px',
                        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)'
                      }}
                    >
                      <FileText size={22} color="#64748B" />
                    </div>
                    <h4 style={{ fontSize: '15.5px', fontWeight: 800, color: '#090C15', margin: '0 0 6px 0' }}>
                      No tailored resumes found
                    </h4>
                    <p style={{ fontSize: '12.5px', color: '#64748B', maxWidth: '340px', margin: '0 0 16px 0' }}>
                      Generate custom ATS-tailored resumes for your saved and target roles.
                    </p>
                    <button
                      onClick={() => setShowAddDocModal(true)}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '999px',
                        backgroundColor: '#090C15',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)'
                      }}
                    >
                      + Generate Tailored Resume
                    </button>
                  </div>
                ) : (
                  <div 
                    className="custom-stage-scrollbar"
                    onWheel={(e) => {
                      const el = e.currentTarget;
                      const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 2;
                      const isAtTop = el.scrollTop <= 0;
                      if ((isAtBottom && e.deltaY > 0) || (isAtTop && e.deltaY < 0)) {
                        window.scrollBy({ top: e.deltaY, behavior: 'auto' });
                      }
                    }}
                    style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', 
                      gap: '12px',
                      alignContent: 'start',
                      alignItems: 'start',
                      gridAutoRows: '142px',
                      position: 'relative',
                      zIndex: 20,
                      height: '385px',
                      minHeight: '385px',
                      maxHeight: '385px',
                      overflowY: 'auto',
                      overscrollBehavior: 'auto',
                      paddingRight: '6px',
                      paddingBottom: '36px'
                    }}
                  >
                    {filteredResumes.map((res) => {
                      return (
                        <div 
                          key={res.id}
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.72)',
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.62) 100%)',
                            backdropFilter: 'blur(16px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                            borderRadius: '14px',
                            border: '1.5px solid rgba(255, 255, 255, 0.88)',
                            padding: '12px 14px',
                            height: '142px',
                            minHeight: '142px',
                            maxHeight: '142px',
                            boxSizing: 'border-box',
                            boxShadow: '0 10px 25px -4px rgba(15, 23, 42, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.04), inset 0 1px 1.5px rgba(255, 255, 255, 0.95)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '6px',
                            position: 'relative',
                            zIndex: 20,
                            transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease, border-color 0.22s ease, background 0.22s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.borderColor = 'rgba(191, 219, 254, 0.95)';
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.76) 100%)';
                            e.currentTarget.style.boxShadow = '0 16px 36px -4px rgba(37, 99, 235, 0.16), 0 6px 14px -2px rgba(15, 23, 42, 0.06), inset 0 1px 2px rgba(255, 255, 255, 1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.88)';
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.62) 100%)';
                            e.currentTarget.style.boxShadow = '0 10px 25px -4px rgba(15, 23, 42, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.04), inset 0 1px 1.5px rgba(255, 255, 255, 0.95)';
                          }}
                        >
                          {/* Top: Logo & Company Name + ATS Badge & Red Dustbin */}
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', minWidth: 0, overflow: 'hidden' }}>
                                <TrackerCompanyLogo company={res.company} size={20} />
                                <span 
                                  style={{ 
                                    fontSize: '12px', 
                                    fontWeight: 900, 
                                    color: '#1A53CF', 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '0.04em',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                  }}
                                >
                                  {res.company}
                                </span>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span 
                                  style={{ 
                                    fontSize: '10.5px', 
                                    fontWeight: 900, 
                                    color: '#059669', 
                                    backgroundColor: '#ECFDF5', 
                                    padding: '2px 6px', 
                                    borderRadius: '5px',
                                    border: '1px solid #A7F3D0'
                                  }}
                                >
                                  {res.matchScore}% ATS
                                </span>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteResume(res.id);
                                  }}
                                  title="Delete resume"
                                  style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '6px',
                                    border: '1px solid #FECACA',
                                    backgroundColor: '#FEF2F2',
                                    color: '#DC2626',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    padding: 0,
                                    transition: 'all 0.15s ease'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#DC2626';
                                    e.currentTarget.style.color = '#FFFFFF';
                                    e.currentTarget.style.borderColor = '#B91C1C';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#FEF2F2';
                                    e.currentTarget.style.color = '#DC2626';
                                    e.currentTarget.style.borderColor = '#FECACA';
                                  }}
                                >
                                  <Trash2 size={12} strokeWidth={2.5} />
                                </button>
                              </div>
                            </div>

                            {/* Target Role Title */}
                            <h4 
                              style={{ 
                                fontSize: '13.5px', 
                                fontWeight: 900, 
                                color: '#090C15', 
                                margin: '2px 0 2px 0',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                letterSpacing: '-0.015em'
                              }}
                              title={res.targetRole}
                            >
                              {res.targetRole}
                            </h4>

                            {/* Subtext: Template & Pages & Updated */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                              <span>{res.template}</span>
                              <span>·</span>
                              <span>{res.pages} Pages</span>
                              <span>·</span>
                              <span style={{ color: '#94A3B8' }}>{res.updatedAt}</span>
                            </div>
                          </div>

                          {/* Bottom: Action Buttons */}
                          <div 
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'space-between', 
                              paddingTop: '6px', 
                              borderTop: '1px solid rgba(226, 232, 240, 0.7)',
                              marginTop: 'auto'
                            }}
                          >
                            <span 
                              style={{ 
                                fontSize: '10.5px', 
                                color: '#1A53CF', 
                                fontWeight: 700,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '130px'
                              }}
                            >
                              {res.keywords ? `${res.keywords.slice(0, 2).join(', ')}` : 'Tailored'}
                            </span>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                              {onNavigateToResume && (
                                <button
                                  onClick={() => onNavigateToResume()}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '3px',
                                    padding: '5px 8px',
                                    borderRadius: '6px',
                                    backgroundColor: '#EFF6FF',
                                    color: '#1A53CF',
                                    border: '1px solid #BFDBFE',
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                  }}
                                  title="Open in Resume Builder"
                                >
                                  <Edit3 size={11} />
                                  <span>Builder</span>
                                </button>
                              )}
                              <button
                                onClick={() => setPreviewResume(res)}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '3px',
                                  padding: '5px 10px',
                                  borderRadius: '6px',
                                  backgroundColor: '#F1F5F9',
                                  color: '#090C15',
                                  border: '1px solid #E2E8F0',
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  transition: 'background 0.15s ease'
                                }}
                                title="Preview this tailored resume"
                              >
                                <Eye size={12} />
                                <span>Preview</span>
                              </button>

                              <button
                                onClick={() => showToast(`Downloaded PDF for ${res.company} (${res.targetRole})`)}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '3px',
                                  padding: '5px 10px',
                                  borderRadius: '6px',
                                  background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
                                  color: '#FFFFFF',
                                  border: 'none',
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  boxShadow: '0 2px 6px rgba(26, 83, 207, 0.25)'
                                }}
                              >
                                <Download size={12} />
                                <span>PDF</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              )}

              {/* Tab 2: Cover Letters List */}
              {activeDocTab === 'coverLetters' && (
                filteredCoverLetters.length === 0 ? (
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
                        backgroundColor: '#F1F5F9', 
                        border: '1px solid #E2E8F0',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginBottom: '14px',
                        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)'
                      }}
                    >
                      <Mail size={22} color="#64748B" />
                    </div>
                    <h4 style={{ fontSize: '15.5px', fontWeight: 800, color: '#090C15', margin: '0 0 6px 0' }}>
                      No tailored cover letters found
                    </h4>
                    <p style={{ fontSize: '12.5px', color: '#64748B', maxWidth: '340px', margin: '0 0 16px 0' }}>
                      Generate custom company-specific cover letters highlighting your verified achievements.
                    </p>
                    <button
                      onClick={() => setShowAddDocModal(true)}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '999px',
                        backgroundColor: '#090C15',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)'
                      }}
                    >
                      + Generate Cover Letter
                    </button>
                  </div>
                ) : (
                  <div 
                    className="custom-stage-scrollbar"
                    onWheel={(e) => {
                      const el = e.currentTarget;
                      const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 2;
                      const isAtTop = el.scrollTop <= 0;
                      if ((isAtBottom && e.deltaY > 0) || (isAtTop && e.deltaY < 0)) {
                        window.scrollBy({ top: e.deltaY, behavior: 'auto' });
                      }
                    }}
                    style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', 
                      gap: '12px',
                      alignContent: 'start',
                      alignItems: 'start',
                      gridAutoRows: '142px',
                      position: 'relative',
                      zIndex: 20,
                      height: '385px',
                      minHeight: '385px',
                      maxHeight: '385px',
                      overflowY: 'auto',
                      overscrollBehavior: 'auto',
                      paddingRight: '6px',
                      paddingBottom: '36px'
                    }}
                  >
                    {filteredCoverLetters.map((cov) => {
                      return (
                        <div 
                          key={cov.id}
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.72)',
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.62) 100%)',
                            backdropFilter: 'blur(16px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                            borderRadius: '14px',
                            border: '1.5px solid rgba(255, 255, 255, 0.88)',
                            padding: '12px 14px',
                            height: '142px',
                            minHeight: '142px',
                            maxHeight: '142px',
                            boxSizing: 'border-box',
                            boxShadow: '0 10px 25px -4px rgba(15, 23, 42, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.04), inset 0 1px 1.5px rgba(255, 255, 255, 0.95)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '6px',
                            position: 'relative',
                            zIndex: 20,
                            transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease, border-color 0.22s ease, background 0.22s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.borderColor = 'rgba(191, 219, 254, 0.95)';
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.76) 100%)';
                            e.currentTarget.style.boxShadow = '0 16px 36px -4px rgba(37, 99, 235, 0.16), 0 6px 14px -2px rgba(15, 23, 42, 0.06), inset 0 1px 2px rgba(255, 255, 255, 1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.88)';
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.62) 100%)';
                            e.currentTarget.style.boxShadow = '0 10px 25px -4px rgba(15, 23, 42, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.04), inset 0 1px 1.5px rgba(255, 255, 255, 0.95)';
                          }}
                        >
                          {/* Top: Logo & Company Name + Match Badge & Red Dustbin */}
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', minWidth: 0, overflow: 'hidden' }}>
                                <TrackerCompanyLogo company={cov.company} size={20} />
                                <span 
                                  style={{ 
                                    fontSize: '12px', 
                                    fontWeight: 900, 
                                    color: '#1A53CF', 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '0.04em',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                  }}
                                >
                                  {cov.company}
                                </span>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span 
                                  style={{ 
                                    fontSize: '10.5px', 
                                    fontWeight: 900, 
                                    color: '#2563EB', 
                                    backgroundColor: '#EFF6FF', 
                                    padding: '2px 6px', 
                                    borderRadius: '5px',
                                    border: '1px solid #BFDBFE'
                                  }}
                                >
                                  {cov.matchScore}% Match
                                </span>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteCoverLetter(cov.id);
                                  }}
                                  title="Delete cover letter"
                                  style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '6px',
                                    border: '1px solid #FECACA',
                                    backgroundColor: '#FEF2F2',
                                    color: '#DC2626',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    padding: 0,
                                    transition: 'all 0.15s ease'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#DC2626';
                                    e.currentTarget.style.color = '#FFFFFF';
                                    e.currentTarget.style.borderColor = '#B91C1C';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#FEF2F2';
                                    e.currentTarget.style.color = '#DC2626';
                                    e.currentTarget.style.borderColor = '#FECACA';
                                  }}
                                >
                                  <Trash2 size={12} strokeWidth={2.5} />
                                </button>
                              </div>
                            </div>

                            {/* Target Role Title */}
                            <h4 
                              style={{ 
                                fontSize: '13.5px', 
                                fontWeight: 900, 
                                color: '#090C15', 
                                margin: '2px 0 2px 0',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                letterSpacing: '-0.015em'
                              }}
                              title={cov.targetRole}
                            >
                              {cov.targetRole}
                            </h4>

                            {/* Subtext: Tone & Word Count & Updated */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                              <span>{cov.tone}</span>
                              <span>·</span>
                              <span>{cov.wordCount} words</span>
                              <span>·</span>
                              <span style={{ color: '#94A3B8' }}>{cov.updatedAt}</span>
                            </div>
                          </div>

                          {/* Bottom: Action Buttons */}
                          <div 
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'space-between', 
                              paddingTop: '6px', 
                              borderTop: '1px solid rgba(226, 232, 240, 0.7)',
                              marginTop: 'auto'
                            }}
                          >
                            <span 
                              style={{ 
                                fontSize: '10.5px', 
                                color: '#2563EB', 
                                fontWeight: 700,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '130px'
                              }}
                            >
                              Tailored Narrative
                            </span>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                              {onNavigateToCoverLetter && (
                                <button
                                  onClick={() => onNavigateToCoverLetter()}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '3px',
                                    padding: '5px 8px',
                                    borderRadius: '6px',
                                    backgroundColor: '#EFF6FF',
                                    color: '#1A53CF',
                                    border: '1px solid #BFDBFE',
                                    fontSize: '11px',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                  }}
                                  title="Open in Cover Letter Builder"
                                >
                                  <Edit3 size={11} />
                                  <span>Builder</span>
                                </button>
                              )}
                              <button
                                onClick={() => setPreviewCoverLetter(cov)}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '3px',
                                  padding: '5px 10px',
                                  borderRadius: '6px',
                                  backgroundColor: '#F1F5F9',
                                  color: '#090C15',
                                  border: '1px solid #E2E8F0',
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  transition: 'background 0.15s ease'
                                }}
                                title="Preview this tailored cover letter"
                              >
                                <Eye size={12} />
                                <span>Preview</span>
                              </button>

                              <button
                                onClick={() => {
                                  const text = `${cov.opening}\n\n${cov.body}\n\nKey Highlights:\n${cov.bullets.map(b => '• ' + b).join('\n')}\n\n${cov.closing}\n\n${cov.signOff}`;
                                  navigator.clipboard?.writeText(text);
                                  showToast(`Copied cover letter for ${cov.company} to clipboard!`);
                                }}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '3px',
                                  padding: '5px 10px',
                                  borderRadius: '6px',
                                  background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
                                  color: '#FFFFFF',
                                  border: 'none',
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  boxShadow: '0 2px 6px rgba(26, 83, 207, 0.25)'
                                }}
                              >
                                <Copy size={12} />
                                <span>Copy</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              )}

            </div>
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
                {onNavigateToResume && (
                  <button
                    onClick={() => {
                      setPreviewResume(null);
                      onNavigateToResume();
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      backgroundColor: '#EFF6FF',
                      color: '#1A53CF',
                      fontSize: '12px',
                      fontWeight: 700,
                      border: '1px solid #BFDBFE',
                      cursor: 'pointer'
                    }}
                  >
                    <Edit3 size={13} />
                    <span>Open Builder</span>
                  </button>
                )}
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

      {/* =========================================================================
          COVER LETTER PREVIEW MODAL
          ========================================================================= */}
      {previewCoverLetter && (
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
          onClick={() => setPreviewCoverLetter(null)}
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
                  <Mail size={18} color="#1A53CF" />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#090C15', margin: 0 }}>
                    {previewCoverLetter.targetRole} — {previewCoverLetter.company}
                  </h3>
                  <span style={{ fontSize: '11.5px', color: '#64748B' }}>
                    {previewCoverLetter.tone} · {previewCoverLetter.matchScore}% Alignment · {previewCoverLetter.wordCount} words
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => {
                    const text = `${previewCoverLetter.opening}\n\n${previewCoverLetter.body}\n\nKey Highlights:\n${previewCoverLetter.bullets.map(b => '• ' + b).join('\n')}\n\n${previewCoverLetter.closing}\n\n${previewCoverLetter.signOff}`;
                    navigator.clipboard?.writeText(text);
                    showToast(`Copied ${previewCoverLetter.company} cover letter to clipboard`);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#F1F5F9',
                    color: '#090C15',
                    fontSize: '12px',
                    fontWeight: 700,
                    border: '1px solid #E2E8F0',
                    cursor: 'pointer'
                  }}
                >
                  <Copy size={13} />
                  <span>Copy</span>
                </button>

                {onNavigateToCoverLetter && (
                  <button
                    onClick={() => {
                      setPreviewCoverLetter(null);
                      onNavigateToCoverLetter();
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      backgroundColor: '#EFF6FF',
                      color: '#1A53CF',
                      fontSize: '12px',
                      fontWeight: 700,
                      border: '1px solid #BFDBFE',
                      cursor: 'pointer'
                    }}
                  >
                    <Edit3 size={13} />
                    <span>Open Builder</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    showToast(`Exported ${previewCoverLetter.company} cover letter PDF`);
                    setPreviewCoverLetter(null);
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
                  <span>PDF</span>
                </button>

                <button
                  onClick={() => setPreviewCoverLetter(null)}
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
                padding: '32px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}
            >
              {/* Candidate Info Header */}
              <div style={{ textAlign: 'center', borderBottom: '2px solid #090C15', paddingBottom: '14px', marginBottom: '22px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 900, color: '#090C15', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>
                  ALEXANDER WRIGHT
                </h2>
                <p style={{ fontSize: '11.5px', color: '#475569', margin: '0 0 6px 0', fontWeight: 600 }}>
                  Sydney, NSW, Australia · alexander.wright@jobgen.ai · +61 400 123 456
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', fontSize: '11px', color: '#1A53CF', fontWeight: 700 }}>
                  <span>linkedin.com/in/alexander-wright</span>
                  <span>•</span>
                  <span>github.com/alexwright</span>
                </div>
              </div>

              {/* Date & Addressee */}
              <div style={{ marginBottom: '18px', fontSize: '12px', color: '#475569' }}>
                <p style={{ margin: '0 0 6px 0', fontWeight: 600 }}>Date: September 28, 2026</p>
                <p style={{ margin: '0 0 2px 0', fontWeight: 800, color: '#090C15' }}>Hiring Team, {previewCoverLetter.company}</p>
                <p style={{ margin: 0, fontWeight: 700, color: '#1A53CF' }}>Application: {previewCoverLetter.targetRole}</p>
              </div>

              {/* Letter Body */}
              <div style={{ fontSize: '12.5px', color: '#334155', lineHeight: 1.65, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p style={{ margin: 0 }}>
                  {previewCoverLetter.opening}
                </p>

                <p style={{ margin: 0 }}>
                  {previewCoverLetter.body}
                </p>

                {previewCoverLetter.bullets && (
                  <div>
                    <span style={{ fontWeight: 800, color: '#090C15', display: 'block', marginBottom: '6px' }}>
                      Key Strategic & Technical Highlights:
                    </span>
                    <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {previewCoverLetter.bullets.map((b, bIdx) => (
                        <li key={bIdx} style={{ color: '#334155' }}>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <p style={{ margin: 0 }}>
                  {previewCoverLetter.closing}
                </p>

                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #F1F5F9', whiteSpace: 'pre-line', fontWeight: 700, color: '#090C15' }}>
                  {previewCoverLetter.signOff}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          ADD NEW DOCUMENT MODAL
          ========================================================================= */}
      {showAddDocModal && (
        <AddDocumentModal 
          isOpen={showAddDocModal}
          onClose={() => setShowAddDocModal(false)}
          onAddDocument={handleAddNewDocument}
        />
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

// Inline Helper Modal for Generating Tailored Documents
function AddDocumentModal({ isOpen, onClose, onAddDocument }) {
  const [docType, setDocType] = React.useState('resume');
  const [company, setCompany] = React.useState('');
  const [role, setRole] = React.useState('');
  const [tone, setTone] = React.useState('Strategic & Visionary');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;

    if (docType === 'resume') {
      const newResume = {
        id: `res-${Date.now()}`,
        jobId: `job-${Date.now()}`,
        targetRole: role.trim(),
        company: company.trim(),
        matchScore: Math.floor(Math.random() * 6) + 94, // 94-99%
        updatedAt: 'Just now',
        template: 'Executive Modern',
        pages: 2,
        summary: `Tailored for ${company.trim()} high-impact initiatives, verified metrics, and technical leadership in ${role.trim()}.`,
        keywords: ['Distributed Systems', 'Enterprise Architecture', 'API Scaling', 'Execution Velocity', 'Zero-Downtime'],
        bullets: [
          `Spearheaded core platform initiatives at scale, driving 35% improvements in engineering throughput.`,
          `Architected reliable production systems meeting 99.99% availability targets across enterprise workloads.`,
          `Governed cross-functional alignment loops and technical design specifications for tier-1 partner integrations.`
        ],
        skills: ['System Design', 'TypeScript/React', 'Cloud Services', 'Telemetry', 'Cross-Pod Scaling']
      };
      onAddDocument(newResume, 'resume');
    } else {
      const newCoverLetter = {
        id: `cov-${Date.now()}`,
        jobId: `job-${Date.now()}`,
        targetRole: role.trim(),
        company: company.trim(),
        matchScore: Math.floor(Math.random() * 5) + 95, // 95-99%
        updatedAt: 'Just now',
        tone: tone,
        wordCount: 395,
        summary: `Custom cover letter emphasizing verified track record, mission alignment, and leadership for ${company.trim()}.`,
        opening: `Dear ${company.trim()} Hiring Team, I am writing to submit my application for the ${role.trim()} position, bringing a proven background of software engineering excellence and leadership.`,
        body: `Throughout my career, I have focused on delivering demonstrable business impact, reducing latency, and building scalable developer ecosystems. ${company.trim()}'s culture of innovation and execution makes this the ideal platform for my skills.`,
        bullets: [
          `Delivered high-throughput systems scaling to millions of daily requests with sub-100ms response latencies.`,
          `Partnered across product and executive teams to compress integration cycles by over 40%.`,
          `Instituted automated quality gates and engineering standards adopted cross-functionally.`
        ],
        closing: `I welcome the opportunity to speak with your team and discuss how my expertise can accelerate ${company.trim()}'s key objectives.`,
        signOff: `Warm regards,\nAlexander Wright`
      };
      onAddDocument(newCoverLetter, 'coverLetter');
    }

    onClose();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(9, 12, 21, 0.72)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '22px',
          maxWidth: '520px',
          width: '100%',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
          padding: '28px',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Plus size={20} color="#FFFFFF" />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 900, color: '#090C15', margin: 0 }}>
                Create Tailored Document
              </h3>
              <p style={{ fontSize: '11.5px', color: '#64748B', margin: '2px 0 0 0' }}>
                Dynamically generated with verified metrics & ATS keywords
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <X size={18} color="#64748B" />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#090C15', marginBottom: '8px' }}>
              Document Type
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setDocType('resume')}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  border: docType === 'resume' ? '2px solid #1A53CF' : '1px solid #E2E8F0',
                  backgroundColor: docType === 'resume' ? '#EFF6FF' : '#FFFFFF',
                  color: docType === 'resume' ? '#1A53CF' : '#475569',
                  fontSize: '12.5px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Tailored Resume
              </button>
              <button
                type="button"
                onClick={() => setDocType('coverLetter')}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  border: docType === 'coverLetter' ? '2px solid #1A53CF' : '1px solid #E2E8F0',
                  backgroundColor: docType === 'coverLetter' ? '#EFF6FF' : '#FFFFFF',
                  color: docType === 'coverLetter' ? '#1A53CF' : '#475569',
                  fontSize: '12.5px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Cover Letter
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#090C15', marginBottom: '6px' }}>
              Company Name *
            </label>
            <input 
              type="text" 
              placeholder="e.g. Google, Stripe, Figma, Apple"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '9px',
                border: '1.5px solid #CBD5E1',
                fontSize: '13px',
                color: '#090C15',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#090C15', marginBottom: '6px' }}>
              Target Role *
            </label>
            <input 
              type="text" 
              placeholder="e.g. Lead Frontend Architect, Staff Product PM"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '9px',
                border: '1.5px solid #CBD5E1',
                fontSize: '13px',
                color: '#090C15',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {docType === 'coverLetter' && (
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#090C15', marginBottom: '6px' }}>
                Narrative Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '9px',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '13px',
                  color: '#090C15',
                  outline: 'none',
                  backgroundColor: '#FFFFFF',
                  boxSizing: 'border-box'
                }}
              >
                <option value="Strategic & Visionary">Strategic & Visionary</option>
                <option value="Technical & Architectural">Technical & Architectural</option>
                <option value="Operational & High-Reliability">Operational & High-Reliability</option>
                <option value="Executive & Commercial">Executive & Commercial</option>
              </select>
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '11px',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                color: '#475569',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
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
              Generate {docType === 'resume' ? 'Resume' : 'Cover Letter'} ✨
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
