import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Bot 
} from 'lucide-react';
import confetti from 'canvas-confetti';

const ALL_JOBS = [
  {
    id: 'canva-pm',
    company: 'Canva',
    initial: 'C',
    color: '#00C4CC',
    bgLight: '#E6FAF8',
    title: 'Lead Product Manager (Creator Ecosystem)',
    location: 'Sydney, NSW · Hybrid',
    salary: '$195k - $225k AUD + Equity',
    source: 'LinkedIn EasyApply',
    score: 96,
    posted: '2 hours ago',
    description: 'Lead the next generation of Canva creator tools used by 180M+ monthly active users. Drive multi-surface product roadmaps across web and mobile pods with deep empathy for creators.',
    matchedSkills: ['Product Strategy', 'Growth Funnels', 'Cross-Functional Leadership', 'Sprint Restructuring', 'Mobile & Web Systems'],
    missingSkills: ['B2B Enterprise Governance', 'Localization Scaling'],
    starQuestions: [
      'Tell me about a time you drove a product pivot that increased engagement by over 20%.',
      'How do you manage disagreements between design leaders and backend infrastructure engineers?'
    ]
  },
  {
    id: 'atlassian-fe',
    company: 'Atlassian',
    initial: 'A',
    color: '#0052CC',
    bgLight: '#EFF6FF',
    title: 'Senior Staff Frontend Architect',
    location: 'Sydney, NSW · Remote Friendly',
    salary: '$210k - $240k AUD + Stocks',
    source: 'Seek Sync',
    score: 94,
    posted: '5 hours ago',
    description: 'Architect foundational micro-frontend infrastructure across Jira and Confluence cloud. Scale component library tokens, design system performance, and developer velocity across 14 distributed squads.',
    matchedSkills: ['React 19 & TypeScript', 'Micro-Frontends', 'Design System Tokens', 'Web Performance Optimization'],
    missingSkills: ['GraphQL Federation', 'Distributed Tracing'],
    starQuestions: [
      'Describe a time you refactored a legacy frontend without breaking ongoing sprint commitments.',
      'How do you establish engineering benchmarks across 12 distributed squads?'
    ]
  },
  {
    id: 'stripe-ops',
    company: 'Stripe',
    initial: 'S',
    color: '#635BFF',
    bgLight: '#EEF2FF',
    title: 'Product Strategy & Operations Lead',
    location: 'Melbourne, VIC · Hybrid',
    salary: '$180k - $210k AUD',
    source: 'Indeed Direct',
    score: 91,
    posted: '1 day ago',
    description: 'Scale financial infrastructure onboarding across APAC enterprise platforms. Unify developer documentation, payment API SLAs, and regulatory compliance frameworks.',
    matchedSkills: ['FinTech APIs', 'Enterprise SLAs', 'Developer Experience', 'Roadmap Prioritization'],
    missingSkills: ['APRA Prudential Standards', 'Multi-Currency Clearing'],
    starQuestions: [
      'How have you reconciled fast feature velocity with stringent financial compliance audits?',
      'Walk through how you analyzed churn in an API-driven enterprise product.'
    ]
  },
  {
    id: 'afterpay-fs',
    company: 'Afterpay (Block)',
    initial: 'B',
    color: '#00D18E',
    bgLight: '#ECFDF5',
    title: 'Lead Full-Stack Engineer (Consumer App)',
    location: 'Sydney, NSW · In-Office / Hybrid',
    salary: '$175k - $195k AUD',
    source: 'LinkedIn EasyApply',
    score: 89,
    posted: '1 day ago',
    description: 'Build low-latency payment verification flows for 20M+ mobile consumers across Australia, NZ, and the US.',
    matchedSkills: ['TypeScript / Node', 'Event-Driven Systems', 'High-Concurrency DBs', 'CI/CD Pipelines'],
    missingSkills: ['Kafka Partitioning', 'Fraud Mitigation ML'],
    starQuestions: [
      'Explain an architecture failure under high load and how you remediated it in production.',
      'How do you mentor mid-level engineers to write resilient transaction pipelines?'
    ]
  },
  {
    id: 'deloitte-strat',
    company: 'Deloitte Digital',
    initial: 'D',
    color: '#86BC25',
    bgLight: '#F7FEE7',
    title: 'Principal Experience Strategist',
    location: 'Melbourne, VIC · Client Site',
    salary: '$185k - $215k AUD + Bonus',
    source: 'JobGen Verified',
    score: 88,
    posted: '2 days ago',
    description: 'Advise ASX-50 executive leadership on digital modernization, AI workforce transformation, and candidate experience architecture.',
    matchedSkills: ['Stakeholder Engagement', 'Executive Advisory', 'Design Thinking Workshops', 'Digital Transformation'],
    missingSkills: ['Change Management Frameworks', 'Federal Gov Security Clearance'],
    starQuestions: [
      'Describe a client engagement where the executive sponsor resisted your strategic recommendations.',
      'How do you quantify ROI on long-term digital experience modernization programs?'
    ]
  }
];

export default function JobSearchView({ onNavigateToInterview, onNavigateToResume }) {
  const [selectedJobId, setSelectedJobId] = useState('canva-pm');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [tailorSuccess, setTailorSuccess] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState(['canva-pm']);
  const [isApplying, setIsApplying] = useState(false);

  const selectedJob = ALL_JOBS.find(j => j.id === selectedJobId) || ALL_JOBS[0];

  const filteredJobs = ALL_JOBS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.matchedSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLoc = selectedLocation === 'All' ? true : job.location.toLowerCase().includes(selectedLocation.toLowerCase());
    return matchesSearch && matchesLoc;
  });

  const handleTailorResume = () => {
    setTailorSuccess(true);
    setTimeout(() => {
      setTailorSuccess(false);
    }, 4000);
  };

  const handleOneClickApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      if (!appliedJobs.includes(selectedJob.id)) {
        setAppliedJobs([...appliedJobs, selectedJob.id]);
      }
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }, 1200);
  };

  const isApplied = appliedJobs.includes(selectedJob.id);

  return (
    <div style={{ paddingBottom: '40px' }}>
      
      {/* Top Filter and Search Bar */}
      <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '20px', display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
        
        {/* Search Input */}
        <div style={{ flex: '1 1 320px', position: 'relative' }}>
          <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            placeholder="Search by role, target skill (e.g. React, FinTech), or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 40px',
              borderRadius: '10px',
              border: '1px solid #CBD5E1',
              fontSize: '13px',
              outline: 'none',
              color: '#090C15'
            }}
          />
        </div>

        {/* Location Pills */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {['All', 'Sydney', 'Melbourne', 'Remote'].map((loc) => (
            <button
              key={loc}
              onClick={() => setSelectedLocation(loc)}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                background: selectedLocation === loc ? '#090C15' : '#F8FAFC',
                color: selectedLocation === loc ? '#FFFFFF' : '#475569',
                border: '1px solid #E2E8F0'
              }}
            >
              {loc === 'All' ? 'All Locations' : loc}
            </button>
          ))}
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748B' }}>
          <span>Showing <strong>{filteredJobs.length}</strong> opportunities</span>
        </div>
      </div>

      {/* 2-Column Job Discovery Workstation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1.45fr)', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Column: Job Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', paddingRight: '4px' }}>
          {filteredJobs.map((job) => {
            const isSelected = job.id === selectedJobId;
            const hasApplied = appliedJobs.includes(job.id);

            return (
              <div
                key={job.id}
                onClick={() => setSelectedJobId(job.id)}
                style={{
                  background: isSelected ? 'rgba(239, 246, 255, 0.75)' : 'rgba(255, 255, 255, 0.55)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  borderRadius: '16px',
                  border: isSelected ? '1.5px solid #2563EB' : '1px solid rgba(255, 255, 255, 0.85)',
                  padding: '16px',
                  cursor: 'pointer',
                  boxShadow: isSelected 
                    ? '0 8px 24px rgba(37, 99, 235, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.95)' 
                    : '0 4px 14px rgba(15, 23, 42, 0.03), inset 0 1px 2px rgba(255, 255, 255, 0.95)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div 
                      style={{ 
                        width: '38px', 
                        height: '38px', 
                        borderRadius: '10px', 
                        background: job.bgLight, 
                        color: job.color, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '16px',
                        border: `1px solid ${job.color}33`
                      }}
                    >
                      {job.initial}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#090C15' }}>{job.title}</h4>
                      <p style={{ fontSize: '11.5px', color: '#64748B' }}>
                        <strong style={{ color: '#090C15' }}>{job.company}</strong> · {job.location}
                      </p>
                    </div>
                  </div>

                  <span 
                    style={{ 
                      fontSize: '12px', 
                      fontWeight: 800, 
                      fontFamily: 'var(--font-mono)',
                      color: job.score >= 90 ? '#059669' : '#1A53CF',
                      background: job.score >= 90 ? '#ECFDF5' : '#EFF6FF',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      border: `1px solid ${job.score >= 90 ? '#A7F3D0' : '#BFDBFE'}`
                    }}
                  >
                    {job.score}% ATS
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(0,0,0,0.05)', fontSize: '11px', color: '#64748B' }}>
                  <span style={{ fontWeight: 600, color: '#1E293B' }}>{job.salary}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>{job.source}</span>
                    {hasApplied && (
                      <span style={{ color: '#10B981', fontWeight: 700, background: '#ECFDF5', padding: '1px 6px', borderRadius: '4px' }}>
                        ✓ Applied
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep Job Inspection & 1-Click Action Terminal */}
        <div className="liquid-glass-card" style={{ padding: '24px' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', paddingBottom: '18px', borderBottom: '1px solid #F1F5F9' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#1A53CF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Active Opportunity Inspector
              </span>
              <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#090C15', marginTop: '4px' }}>
                {selectedJob.title}
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', marginTop: '2px' }}>
                <strong>{selectedJob.company}</strong> · {selectedJob.location} · {selectedJob.salary}
              </p>
            </div>

            <div style={{ textAlign: 'center', background: '#F8FAFC', padding: '10px 16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '24px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: tailorSuccess ? '#059669' : '#1A53CF' }}>
                {tailorSuccess ? '99%' : `${selectedJob.score}%`}
              </span>
              <span style={{ display: 'block', fontSize: '10px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
                ATS Compatibility
              </span>
            </div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <h5 style={{ fontSize: '12.5px', fontWeight: 700, color: '#090C15', marginBottom: '6px' }}>Role Overview</h5>
            <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.5 }}>
              {selectedJob.description}
            </p>
          </div>

          {/* Profile Keyword Alignment */}
          <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '16px', border: '1px solid #E2E8F0', marginTop: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#090C15', textTransform: 'uppercase' }}>
                Master Profile Keyword Alignment
              </span>
              <span style={{ fontSize: '11px', color: '#059669', fontWeight: 700 }}>
                {selectedJob.matchedSkills.length} Matched / {selectedJob.missingSkills.length} Gap
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
              {selectedJob.matchedSkills.map((s, idx) => (
                <span key={idx} style={{ fontSize: '11px', fontWeight: 600, background: '#ECFDF5', color: '#059669', padding: '3px 8px', borderRadius: '6px', border: '1px solid #A7F3D0' }}>
                  ✓ {s}
                </span>
              ))}
            </div>

            <div style={{ borderTop: '1px dashed #CBD5E1', paddingTop: '10px' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#B45309', textTransform: 'uppercase' }}>
                Missing Keywords:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                {selectedJob.missingSkills.map((s, idx) => (
                  <span key={idx} style={{ fontSize: '11px', fontWeight: 600, background: tailorSuccess ? '#ECFDF5' : '#FEF3C7', color: tailorSuccess ? '#059669' : '#B45309', padding: '3px 8px', borderRadius: '6px', border: `1px solid ${tailorSuccess ? '#A7F3D0' : '#FCD34D'}` }}>
                    {tailorSuccess ? `✓ Bridged: ${s}` : `+ Need: ${s}`}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Success Toast */}
          {tailorSuccess && (
            <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '10px', padding: '12px', marginTop: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="#059669" />
              <span style={{ fontSize: '12px', color: '#065F46', fontWeight: 600 }}>
                ATS Resume Optimized! Integrated {selectedJob.missingSkills.join(' & ')}. Match jumped to 99%.
              </span>
            </div>
          )}

          {/* Interactive Actions Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '18px' }}>
            <button
              onClick={handleTailorResume}
              style={{
                padding: '12px',
                borderRadius: '10px',
                background: '#FFFFFF',
                border: '1px solid #1A53CF',
                color: '#1A53CF',
                fontSize: '12.5px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <Sparkles size={15} />
              <span>1-Click ATS Tailor</span>
            </button>

            <button
              onClick={handleOneClickApply}
              disabled={isApplying || isApplied}
              style={{
                padding: '12px',
                borderRadius: '10px',
                background: isApplied ? '#10B981' : '#090C15',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '12.5px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: isApplied ? 'default' : 'pointer'
              }}
            >
              {isApplying ? (
                <span>Auto-Filling 14 Fields...</span>
              ) : isApplied ? (
                <>
                  <CheckCircle2 size={15} />
                  <span>Applied via EasyApply</span>
                </>
              ) : (
                <>
                  <Zap size={15} />
                  <span>1-Click AutoFill Apply</span>
                </>
              )}
            </button>
          </div>

          {/* Emma AI Interview Prompt Box */}
          <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '14px', border: '1px solid #E2E8F0', marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Bot size={15} color="#1A53CF" />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#090C15' }}>
                Practice {selectedJob.company} Interview Questions
              </span>
            </div>
            <p style={{ fontSize: '11.5px', color: '#475569', fontStyle: 'italic', marginBottom: '10px' }}>
              "{selectedJob.starQuestions[0]}"
            </p>
            <button
              onClick={() => onNavigateToInterview()}
              style={{
                fontSize: '11.5px',
                fontWeight: 700,
                color: '#1A53CF',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Open in Mock Interview Room →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
