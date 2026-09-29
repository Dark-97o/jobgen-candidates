import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  Bot, 
  Volume2,
  ChevronDown,
  Sparkles,
  Check,
  RefreshCw,
  Briefcase
} from 'lucide-react';

const SAVED_JOBS = [
  {
    id: 'canva',
    company: 'Canva',
    role: 'Lead Product Manager',
    round: 'Round 2: System Architecture & Product Velocity',
    interviewerName: 'Craig Press',
    interviewerRole: 'Hiring Director',
    interviewerInitials: 'CP',
    question: 'Tell me about a time you handled a technical deadlock between senior engineering leads and business stakeholders.',
    situation: 'Q3 enterprise contract required custom SSO, while engineering planned core DB migration.',
    task: 'Protect database reliability while unblocking $450k ARR expansion revenue.',
    action: 'Organized a 2-day technical spike to unbundle SSO into an isolated OAuth proxy micro-pod.',
    result: 'Closed enterprise customer 1 week early with 99.98% SLA and zero migration rollbacks.',
    coachTip: 'High executive presence · Clear metrics quantification'
  },
  {
    id: 'atlassian',
    company: 'Atlassian',
    role: 'Senior Staff Frontend Architect',
    round: 'Round 3: Micro-Frontend Scaling & Performance',
    interviewerName: 'David Green',
    interviewerRole: 'Head of Web Architecture',
    interviewerInitials: 'DG',
    question: 'How do you design a scalable micro-frontend architecture while maintaining sub-1.5s LCP across distributed squads?',
    situation: 'Legacy monolithic frontend caused 45-minute build pipelines and deployment gridlocks across 14 teams.',
    task: 'Architect a federated runtime architecture with zero regression to bundle size and core web vitals.',
    action: 'Implemented Webpack Module Federation with decentralized routing and isolated shared design tokens.',
    result: 'Cut build times by 70%, improved LCP by 48%, and scaled autonomous release velocity across 14 pods.',
    coachTip: 'Exceptional systems thinking · Excellent tradeoff articulation'
  },
  {
    id: 'stripe',
    company: 'Stripe',
    role: 'Product Operations Lead',
    round: 'Round 2: High-Volume Operational Resiliency',
    interviewerName: 'Claire Hughes',
    interviewerRole: 'VP of Global Operations',
    interviewerInitials: 'CH',
    question: 'Describe an instance where a payment settlement pipeline degraded, and how you managed cross-functional incident response.',
    situation: 'High concurrency during Black Friday payment surges caused idempotent ledger reconciliation delays.',
    task: 'Maintain 99.995% SLA without double-settling or dropping transactions for enterprise merchants.',
    action: 'Staged an automated queue backpressure protocol and dispatched real-time merchant status notifications.',
    result: 'Reconciled 100% of $120M daily throughput with zero financial discrepancies.',
    coachTip: 'Calm under pressure · Customer-centric communication'
  },
  {
    id: 'afterpay',
    company: 'Afterpay',
    role: 'Lead Full-Stack Engineer',
    round: 'Round 2: Distributed Real-Time Architecture',
    interviewerName: 'Marcus Chen',
    interviewerRole: 'Staff Engineering Lead',
    interviewerInitials: 'MC',
    question: 'Walk me through how you designed a low-latency fraud evaluation worker pipeline handling thousands of requests per second.',
    situation: 'Checkout approval API was spiking past 250ms during peak merchant flash sales.',
    task: 'Refactor the risk assessment pipeline to consistently achieve sub-80ms p99 latency targets.',
    action: 'Architected an event-driven worker pool with Kafka and a tiered Redis cluster caching layer.',
    result: 'Maintained 65ms p99 response times at 3,200 req/sec with zero service disruptions.',
    coachTip: 'Rigorous engineering execution · Metric-driven results'
  },
  {
    id: 'safetyculture',
    company: 'SafetyCulture',
    role: 'Principal Backend Engineer',
    round: 'Round 3: Distributed Systems & gRPC',
    interviewerName: 'Sarah Jenkins',
    interviewerRole: 'Platform Engineering Lead',
    interviewerInitials: 'SJ',
    question: 'How do you ensure data consistency across multiple microservices without introducing synchronous distributed locks?',
    situation: 'Audit inspection sync failed when mobile clients reconnected in low-connectivity offline mode.',
    task: 'Design an idempotent eventual consistency synchronization protocol across PostgreSQL shards.',
    action: 'Introduced an event-sourcing outbox pattern with vector clocks to resolve conflict merges deterministically.',
    result: 'Eliminated 100% of data collision errors for 75,000+ frontline enterprise field workers.',
    coachTip: 'Deep distributed systems mastery · Clear domain modeling'
  },
  {
    id: 'qantas',
    company: 'Qantas Loyalty',
    role: 'Staff Systems Architect',
    round: 'Round 2: Event-Driven Enterprise Architecture',
    interviewerName: 'Robert Vance',
    interviewerRole: 'Enterprise Technology Director',
    interviewerInitials: 'RV',
    question: 'Describe how you scaled an event-driven points ledger while complying with strict financial audit and PCI-DSS requirements.',
    situation: 'Partner redemption spikes were locking core transactional loyalty ledgers during promotional campaigns.',
    task: 'Decouple points accrual and redemption into high-throughput partitioned streams with immutable audit trails.',
    action: 'Engineered an event-sourced ledger on Apache Kafka with encrypted change-data-capture pipelines.',
    result: 'Handled 5x peak redemption volume with cryptographic audit guarantees and zero lock contention.',
    coachTip: 'Outstanding enterprise vision · Rigorous security posture'
  }
];

export default function InterviewPrepView() {
  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);
  
  // Pop-up modal state when opening Interview Prep page
  const [showJobModal, setShowJobModal] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState(SAVED_JOBS[0].id);
  const [confirmedJob, setConfirmedJob] = useState(SAVED_JOBS[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentJob = confirmedJob || SAVED_JOBS[0];

  const handleConfirmJob = () => {
    const job = SAVED_JOBS.find(j => j.id === selectedJobId) || SAVED_JOBS[0];
    setConfirmedJob(job);
    setShowJobModal(false);
  };

  return (
    <div style={{ paddingBottom: '40px', position: 'relative' }}>
      
      {/* =========================================================================
          POP-UP MODAL WITH COFFEE IMAGE: SELECT SAVED JOB BEFORE SHOWING PAGE
          ========================================================================= */}
      {showJobModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(9, 12, 21, 0.72)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '460px',
              width: '100%',
              padding: '36px 32px 30px 32px',
              boxShadow: '0 25px 60px -12px rgba(15, 23, 42, 0.3), 0 0 0 1px rgba(226, 232, 240, 0.9)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              animation: 'modalSlideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Coffee Image Display */}
            <div style={{ marginBottom: '16px', position: 'relative' }}>
              <img 
                src="/cofe.png" 
                alt="Coffee" 
                style={{ 
                  height: '76px', 
                  width: 'auto', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 6px 18px rgba(37, 99, 235, 0.18))'
                }} 
              />
            </div>

            <h3 
              style={{ 
                fontSize: '21px', 
                fontWeight: 900, 
                color: '#090C15', 
                margin: '0 0 8px 0',
                letterSpacing: '-0.025em',
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif'
              }}
            >
              Select a Saved Job to Practice
            </h3>

            <p 
              style={{ 
                fontSize: '13px', 
                color: '#64748B', 
                lineHeight: 1.5, 
                margin: '0 0 24px 0',
                maxWidth: '360px'
              }}
            >
              Choose your target role to launch a personalized mock interview rehearsal room with Emma AI.
            </p>

            {/* Saved Jobs Dropdown */}
            <div style={{ width: '100%', marginBottom: '24px', position: 'relative', textAlign: 'left' }}>
              <label 
                style={{ 
                  display: 'block', 
                  fontSize: '11px', 
                  fontWeight: 800, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em', 
                  color: '#475569', 
                  marginBottom: '8px' 
                }}
              >
                Target Saved Role
              </label>

              {/* Styled Dropdown Trigger */}
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid #CBD5E1',
                  backgroundColor: '#F8FAFC',
                  color: '#090C15',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'border-color 0.18s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                  <Briefcase size={16} color="#1A53CF" style={{ flexShrink: 0 }} />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {SAVED_JOBS.find(j => j.id === selectedJobId)?.company} — {SAVED_JOBS.find(j => j.id === selectedJobId)?.role}
                  </span>
                </div>
                <ChevronDown size={16} color="#64748B" style={{ flexShrink: 0, transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
              </button>

              {/* Dropdown Menu Options */}
              {dropdownOpen && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    marginTop: '6px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 16px 40px rgba(15, 23, 42, 0.18)',
                    padding: '6px',
                    maxHeight: '230px',
                    overflowY: 'auto',
                    zIndex: 50
                  }}
                >
                  {SAVED_JOBS.map((job) => {
                    const isSelected = (job.id === selectedJobId);
                    return (
                      <div
                        key={job.id}
                        onClick={() => {
                          setSelectedJobId(job.id);
                          setDropdownOpen(false);
                        }}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: isSelected ? '#EFF6FF' : 'transparent',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) e.currentTarget.style.backgroundColor = '#F8FAFC';
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 800, color: isSelected ? '#1A53CF' : '#090C15' }}>
                            {job.company}
                          </div>
                          <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>
                            {job.role}
                          </div>
                        </div>
                        {isSelected && <Check size={16} color="#1A53CF" />}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Confirm & Start Button */}
            <button
              onClick={handleConfirmJob}
              style={{
                width: '100%',
                padding: '13px 20px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
                color: '#FFFFFF',
                fontSize: '13.5px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(26, 83, 207, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(26, 83, 207, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(26, 83, 207, 0.35)';
              }}
            >
              <span>Enter Interview Room</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          TOP BAR (Old titles and old loop buttons removed)
          ========================================================================= */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: '20px', 
          paddingBottom: '14px',
          borderBottom: '1px solid rgba(226, 232, 240, 0.75)',
          flexWrap: 'wrap', 
          gap: '12px' 
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              backgroundColor: '#FFFFFF', 
              padding: '6px 14px', 
              borderRadius: '999px', 
              border: '1.5px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#090C15' }}>
              {currentJob.company}
            </span>
            <span style={{ color: '#94A3B8' }}>·</span>
            <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#475569' }}>
              {currentJob.role}
            </span>
          </div>
        </div>

        {/* Change Target Job Button to re-open Coffee Modal */}
        <button
          onClick={() => {
            setSelectedJobId(currentJob.id);
            setShowJobModal(true);
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            padding: '7px 14px',
            borderRadius: '999px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #CBD5E1',
            color: '#1A53CF',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
            transition: 'all 0.15s ease'
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
          <img src="/cofe.png" alt="" style={{ height: '16px', width: 'auto', objectFit: 'contain' }} />
          <span>Switch Job</span>
        </button>
      </div>

      {/* 2-Column Stage: Left Virtual Office Video Stage / Right STAR Evaluation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: '20px', alignItems: 'start' }}>
        
        {/* Left: Floating Video Stage */}
        <div 
          style={{ 
            background: 'linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%)',
            borderRadius: '24px',
            border: '1px solid #E2E8F0',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(15,23,42,0.04)',
            position: 'relative'
          }}
        >
          {/* Top Stage Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#090C15' }}>
                {currentJob.company} · {currentJob.round}
              </span>
            </div>
            <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700, background: '#ECFDF5', padding: '2px 8px', borderRadius: '9999px' }}>
              ● Live Audio Active
            </span>
          </div>

          {/* Floating Video Window */}
          <div 
            style={{ 
              background: '#090C15', 
              borderRadius: '20px', 
              border: '4px solid #FFFFFF', 
              boxShadow: '0 16px 40px rgba(0,0,0,0.25)', 
              overflow: 'hidden' 
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', height: '300px' }}>
              
              {/* Candidate Stream */}
              <div style={{ position: 'relative', background: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6 0%, #1A53CF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 800, color: '#FFFFFF', boxShadow: '0 0 30px rgba(59,130,246,0.5)' }}>
                  SB
                </div>
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '4px', fontSize: '10.5px', color: '#FFFFFF' }}>
                  Subhranil Baul (Candidate)
                </div>
                <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,0,0,0.6)', padding: '3px 8px', borderRadius: '9999px' }}>
                  <Volume2 size={12} color="#10B981" />
                  <span style={{ fontSize: '10px', color: '#10B981', fontWeight: 700 }}>Speaking</span>
                </div>
              </div>

              {/* AI Interviewer Grid */}
              <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '2px', background: '#090C15' }}>
                <div style={{ background: '#111827', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#1A53CF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={15} color="#FFFFFF" />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#FFFFFF', fontWeight: 700, display: 'block' }}>Emma AI (Host)</span>
                    <span style={{ fontSize: '9.5px', color: '#10B981' }}>Analyzing response structure</span>
                  </div>
                </div>

                <div style={{ background: '#111827', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '11px' }}>
                    {currentJob.interviewerInitials}
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#FFFFFF', fontWeight: 700, display: 'block' }}>
                      {currentJob.interviewerName} ({currentJob.company})
                    </span>
                    <span style={{ fontSize: '9.5px', color: '#94A3B8' }}>{currentJob.interviewerRole}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Meeting Controls */}
            <div style={{ padding: '10px 16px', background: '#090C15', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <button 
                onClick={() => setMicActive(!micActive)}
                style={{ width: '34px', height: '34px', borderRadius: '50%', background: micActive ? 'rgba(255,255,255,0.12)' : '#EF4444', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', cursor: 'pointer' }}
              >
                {micActive ? <Mic size={15} /> : <MicOff size={15} />}
              </button>
              <button 
                style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#EF4444', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', cursor: 'pointer', boxShadow: '0 4px 12px rgba(239,68,68,0.4)' }}
              >
                <PhoneOff size={16} />
              </button>
              <button 
                onClick={() => setVideoActive(!videoActive)}
                style={{ width: '34px', height: '34px', borderRadius: '50%', background: videoActive ? 'rgba(255,255,255,0.12)' : '#EF4444', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', cursor: 'pointer' }}
              >
                {videoActive ? <Video size={15} /> : <VideoOff size={15} />}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live STAR Method Breakdown & Score Evaluation */}
        <div className="liquid-glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#1A53CF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Real-Time Behavioral STAR Score
            </span>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#059669', background: '#ECFDF5', padding: '2px 10px', borderRadius: '9999px', border: '1px solid #A7F3D0' }}>
              96 / 100
            </span>
          </div>

          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#090C15', marginBottom: '14px', lineHeight: 1.4 }}>
            "{currentJob.question}"
          </h4>

          {/* STAR Accordion Blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ padding: '10px 12px', borderRadius: '8px', background: '#F8FAFC', borderLeft: '3px solid #1A53CF' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#1A53CF', textTransform: 'uppercase' }}>Situation</span>
              <p style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>
                {currentJob.situation}
              </p>
            </div>

            <div style={{ padding: '10px 12px', borderRadius: '8px', background: '#F8FAFC', borderLeft: '3px solid #10B981' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#10B981', textTransform: 'uppercase' }}>Task</span>
              <p style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>
                {currentJob.task}
              </p>
            </div>

            <div style={{ padding: '10px 12px', borderRadius: '8px', background: '#F8FAFC', borderLeft: '3px solid #F59E0B' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#F59E0B', textTransform: 'uppercase' }}>Action (AI Highlight)</span>
              <p style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>
                {currentJob.action}
              </p>
            </div>

            <div style={{ padding: '10px 12px', borderRadius: '8px', background: '#F8FAFC', borderLeft: '3px solid #8B5CF6' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#8B5CF6', textTransform: 'uppercase' }}>Result</span>
              <p style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>
                {currentJob.result}
              </p>
            </div>
          </div>

          <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#64748B' }}>Emma Coach: {currentJob.coachTip}</span>
            <button
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                background: '#090C15',
                color: '#FFFFFF',
                fontSize: '11.5px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Next Question →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
