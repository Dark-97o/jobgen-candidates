import React, { useState } from 'react';
import { 
  KanbanSquare, 
  Bot, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Plus, 
  Search, 
  Building2, 
  DollarSign, 
  Calendar, 
  Clock, 
  TrendingUp, 
  ExternalLink, 
  Layers, 
  Columns, 
  Maximize2, 
  FileText, 
  MessageSquare,
  Bookmark,
  ChevronRight,
  Filter
} from 'lucide-react';

const INITIAL_PIPELINE = {
  saved: [
    { id: '1', company: 'Atlassian', title: 'Senior Staff Frontend Architect', salary: '$210k - $240k AUD', location: 'Sydney', score: 94, source: 'Seek', date: 'Saved yesterday' },
    { id: '2', company: 'Afterpay', title: 'Lead Full-Stack Engineer', salary: '$175k - $195k AUD', location: 'Sydney', score: 89, source: 'LinkedIn', date: 'Saved 2d ago' },
    { id: '3', company: 'Deloitte', title: 'Principal Strategist', salary: '$185k - $215k AUD', location: 'Melbourne', score: 88, source: 'JobGen', date: 'Saved 4d ago' }
  ],
  applied: [
    { id: '4', company: 'Canva', title: 'Lead Product Manager', salary: '$195k - $225k AUD', location: 'Sydney', score: 96, source: 'LinkedIn EasyApply', date: 'Applied 2d ago', status: 'Profile Viewed' },
    { id: '5', company: 'Amazon Web Services', title: 'Senior Technical PM', salary: '$215k AUD + RSUs', location: 'Sydney', score: 92, source: 'Seek', date: 'Applied 4d ago', status: 'Application Acknowledged' },
    { id: '6', company: 'Commonwealth Bank', title: 'Principal Solution PM', salary: '$180k AUD', location: 'Sydney', score: 90, source: 'Indeed', date: 'Applied 5d ago', status: 'Under Review' },
    { id: '7', company: 'WooliesX', title: 'Lead Digital Architect', salary: '$190k AUD', location: 'Sydney', score: 91, source: 'LinkedIn', date: 'Applied 1w ago', status: 'Pending Review' }
  ],
  interviewing: [
    { id: '8', company: 'Stripe', title: 'Product Operations Lead', salary: '$180k - $210k AUD', location: 'Melbourne', score: 91, source: 'Indeed', date: 'Round 2', nextEvent: 'Tomorrow 2:00 PM (System Arch)' },
    { id: '9', company: 'Canva', title: 'Group PM (Ecosystem)', salary: '$210k AUD', location: 'Sydney', score: 96, source: 'LinkedIn', date: 'Round 3', nextEvent: 'Friday 10:00 AM (Executive Loop)' }
  ],
  offers: [
    { id: '10', company: 'Microsoft', title: 'Principal Azure PM', salary: '$215,000 Base + $45k Equity', location: 'Sydney (Hybrid)', score: 95, source: 'Referral', date: 'Received Yesterday', expiry: 'Decision by Oct 5' }
  ]
};

const EMMA_PROMPTS = [
  {
    id: 'tailor',
    label: '✨ Tailor resume for Canva Lead PM',
    query: 'How should I tailor my experience bullet for Canva’s Senior PM role?',
    response: 'Canva prioritizes user-led product velocity and design system governance. Based on your verified master experience at FinTech Corp, I’ve refined your bullet:\n\n"Scaled enterprise API adoption by 180% across 40+ Tier-1 banking partners through iterative sprint restructuring and automated compliance testing."\n\nNotice this retains 100% of your authentic metrics while directly matching Canva’s must-have ATS keywords: "API adoption" and "sprint restructuring".'
  },
  {
    id: 'outreach',
    label: '✉️ Draft recruiter outreach note for Atlassian',
    query: 'Draft a short, compelling LinkedIn note to Craig Press (Head of Product at Atlassian).',
    response: 'Hi Craig — noticed Atlassian is expanding the Jira cloud architecture team. Over the last 4 years at FinTech Corp, I spearheaded micro-frontend scaling across 14 distributed pods, cutting production turnaround times by 3 weeks. Would love to share insights on how we solved component federation if you have 5 minutes next week. Best, Alexander'
  },
  {
    id: 'salary',
    label: '💰 Salary benchmarks for Sydney Tech',
    query: 'What is the current base salary and equity range for Lead PM in Sydney?',
    response: 'For a Lead Product Manager in Sydney (Tier-1 Tech: Canva, Atlassian, Stripe):\n• Median Base: $195,000 – $225,000 AUD\n• Superannuation: 11.5% statutory\n• Annual Equity Grant: $35,000 – $60,000 AUD in RSUs\n• Total Target Comp: $240,000 – $290,000 AUD.'
  },
  {
    id: 'interview_loop',
    label: '🎯 Mock interview prep for Stripe Round 2',
    query: 'What architectural questions should I prepare for Stripe Round 2 tomorrow?',
    response: 'Stripe’s Round 2 for Product Operations/Tech focuses heavily on transaction idempotency, multi-currency ledger reconciliation, and API developer experience. Expect:\n1. "Design an API endpoint that guarantees zero duplicate billing under network timeouts."\n2. "Walk through how you prioritized SLAs across 10+ payment processing gateways."'
  }
];

export default function WorkspaceTrackerView({ onNavigateToJobSearch, initialMode = 'split' }) {
  // View mode: 'split' | 'tracker' | 'copilot'
  const [viewMode, setViewMode] = useState(initialMode);
  const [pipeline, setPipeline] = useState(INITIAL_PIPELINE);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobForEmma, setSelectedJobForEmma] = useState(null);

  // Emma Chat State
  const [activePrompt, setActivePrompt] = useState(EMMA_PROMPTS[0]);
  const [messages, setMessages] = useState([
    { sender: 'emma', text: EMMA_PROMPTS[0].response }
  ]);
  const [inputVal, setInputVal] = useState('');

  // Kanban Card Drag / Move
  const moveCard = (cardId, fromCol, toCol) => {
    const card = pipeline[fromCol].find(c => c.id === cardId);
    if (!card) return;

    setPipeline({
      ...pipeline,
      [fromCol]: pipeline[fromCol].filter(c => c.id !== cardId),
      [toCol]: [card, ...pipeline[toCol]]
    });
  };

  // Cross-link: Send job directly to Emma Copilot
  const handleConsultEmmaForJob = (job) => {
    setSelectedJobForEmma(job);
    const query = `Analyze my fit and tailor my pitch for ${job.title} at ${job.company} (${job.salary}, ATS match: ${job.score}%). What key strengths should I highlight?`;
    const response = `Analyzing verified profile against ${job.company}'s requirements for ${job.title}...\n\n🎯 ATS Fit Score: ${job.score}%\n\nKey Strategic Levers:\n1. Lead with your quantifiable scaling metrics (${job.company} indexes heavily on autonomous execution).\n2. Highlight your cross-pod leadership and modern systems design.\n3. Address their primary keyword requirements directly in your initial summary.\n\nWould you like me to draft an ATS-tailored cover letter or generate 3 targeted interview talking points for ${job.company}?`;
    
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: query },
      { sender: 'emma', text: response }
    ]);

    // If in full tracker mode, switch to split view so user sees Emma responding immediately
    if (viewMode === 'tracker') {
      setViewMode('split');
    }
  };

  const handleSelectPrompt = (prompt) => {
    setActivePrompt(prompt);
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: prompt.query },
      { sender: 'emma', text: prompt.response }
    ]);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal;
    setInputVal('');
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText },
      { 
        sender: 'emma', 
        text: `Grounded in your verified career history and active pipeline context: For "${userText}", I’ve matched your 7+ years of track record against current Australian tech benchmarks to provide high-precision guidance with zero hallucination.` 
      }
    ]);
  };

  // Filter pipeline cards by search query
  const getFilteredCards = (cards) => {
    if (!searchQuery.trim()) return cards;
    const q = searchQuery.toLowerCase();
    return cards.filter(c => 
      c.company.toLowerCase().includes(q) || 
      c.title.toLowerCase().includes(q) || 
      c.location.toLowerCase().includes(q)
    );
  };

  const COLUMNS = [
    { id: 'saved', label: '1. Saved Opportunities', count: pipeline.saved.length, color: '#64748B', bg: '#F8FAFC', accent: '#94A3B8' },
    { id: 'applied', label: '2. Applied Applications', count: pipeline.applied.length, color: '#1A53CF', bg: '#EFF6FF', accent: '#3B82F6' },
    { id: 'interviewing', label: '3. Interviewing Rounds', count: pipeline.interviewing.length, color: '#D97706', bg: '#FEF3C7', accent: '#F59E0B' },
    { id: 'offers', label: '4. Offers Received', count: pipeline.offers.length, color: '#16A34A', bg: '#DCFCE7', accent: '#22C55E' }
  ];

  const totalInFlight = pipeline.applied.length + pipeline.interviewing.length;
  const totalOffers = pipeline.offers.length;

  return (
    <div style={{ paddingBottom: '48px', paddingRight: '28px' }}>
      
      {/* =========================================================================
          1. UNIFIED COMMAND HEADER: Workspace & Tracker Controls
          ========================================================================= */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: '22px', 
          flexWrap: 'wrap', 
          gap: '16px',
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.95)',
          padding: '18px 24px',
          boxShadow: '0 8px 32px rgba(15, 23, 42, 0.05), inset 0 1px 2px #FFFFFF'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#090C15', letterSpacing: '-0.02em', margin: 0 }}>
              Workspace
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#ECFDF5', padding: '3px 10px', borderRadius: '999px', border: '1px solid #A7F3D0' }}>
              <ShieldCheck size={13} color="#059669" />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669' }}>Live Auto-Sync Active</span>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>
            Unified application pipeline, interview milestones, and real-time Emma AI copilot in one workspace.
          </p>
        </div>

        {/* Action Controls & View Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          
          {/* View Mode Pill Switcher */}
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              background: '#F1F5F9', 
              padding: '4px', 
              borderRadius: '999px',
              border: '1px solid #E2E8F0'
            }}
          >
            <button
              onClick={() => setViewMode('split')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '999px',
                border: 'none',
                background: viewMode === 'split' ? '#090C15' : 'transparent',
                color: viewMode === 'split' ? '#FFFFFF' : '#475569',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
              title="View both Tracker Kanban and Emma AI side-by-side"
            >
              <Columns size={13} />
              <span>Split Workspace</span>
            </button>

            <button
              onClick={() => setViewMode('tracker')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '999px',
                border: 'none',
                background: viewMode === 'tracker' ? '#090C15' : 'transparent',
                color: viewMode === 'tracker' ? '#FFFFFF' : '#475569',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
              title="Full-width Application Tracker Kanban"
            >
              <KanbanSquare size={13} />
              <span>Tracker Kanban</span>
            </button>

            <button
              onClick={() => setViewMode('copilot')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '999px',
                border: 'none',
                background: viewMode === 'copilot' ? '#090C15' : 'transparent',
                color: viewMode === 'copilot' ? '#FFFFFF' : '#475569',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
              title="Full-width Emma 2.0 AI Career Copilot"
            >
              <Bot size={13} />
              <span>Emma AI</span>
            </button>
          </div>

          {/* Add Opportunity Button */}
          {onNavigateToJobSearch && (
            <button
              onClick={onNavigateToJobSearch}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 18px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
                color: '#FFFFFF',
                fontSize: '12.5px',
                fontWeight: 700,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 14px rgba(26, 83, 207, 0.3)',
                cursor: 'pointer',
                transition: 'transform 0.18s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>Add from Job Hunt</span>
            </button>
          )}

        </div>
      </div>

      {/* =========================================================================
          2. METRICS STRIP: Real-Time Sync Summary
          ========================================================================= */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '14px', 
          marginBottom: '20px' 
        }}
      >
        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(16px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            padding: '14px 18px',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Saved Queue</span>
            <Bookmark size={15} color="#64748B" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: '#090C15', marginTop: '4px' }}>
            {pipeline.saved.length} <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>roles</span>
          </div>
        </div>

        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(16px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            padding: '14px 18px',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#1A53CF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>In-Flight Applications</span>
            <TrendingUp size={15} color="#1A53CF" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: '#1A53CF', marginTop: '4px' }}>
            {totalInFlight} <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>active</span>
          </div>
        </div>

        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(16px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            padding: '14px 18px',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Interview Loops</span>
            <Calendar size={15} color="#D97706" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: '#D97706', marginTop: '4px' }}>
            {pipeline.interviewing.length} <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>rounds</span>
          </div>
        </div>

        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(16px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            padding: '14px 18px',
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Offers Secured</span>
            <DollarSign size={15} color="#16A34A" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: '#16A34A', marginTop: '4px' }}>
            {totalOffers} <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>($260k AUD pkg)</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. MAIN UNIFIED WORKSPACE SURFACE
          ========================================================================= */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: viewMode === 'split' 
            ? 'minmax(0, 1.35fr) minmax(0, 0.95fr)' 
            : '1fr',
          gap: '20px',
          alignItems: 'start'
        }}
      >
        
        {/* =========================================================
            PANEL A: PIPELINE TRACKER KANBAN (Shown in 'split' or 'tracker')
            ========================================================= */}
        {(viewMode === 'split' || viewMode === 'tracker') && (
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px' 
            }}
          >
            {/* Search Filter Bar */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(12px)',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                padding: '8px 14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                <Search size={14} color="#94A3B8" />
                <input
                  type="text"
                  placeholder="Filter pipeline by company, title, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    fontSize: '12.5px',
                    color: '#090C15',
                    width: '100%'
                  }}
                />
              </div>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                {Object.values(pipeline).reduce((a, b) => a + b.length, 0)} total opportunities
              </span>
            </div>

            {/* Kanban Columns Grid */}
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: viewMode === 'split'
                  ? 'repeat(2, minmax(0, 1fr))'
                  : 'repeat(4, minmax(0, 1fr))', 
                gap: '14px', 
                alignItems: 'start' 
              }}
            >
              {COLUMNS.map((col) => {
                const filteredCards = getFilteredCards(pipeline[col.id]);
                return (
                  <div 
                    key={col.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.45)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.85)',
                      padding: '14px',
                      boxShadow: '0 8px 24px -4px rgba(15,23,42,0.03), inset 0 1px 2px rgba(255,255,255,0.95)'
                    }}
                  >
                    {/* Column Header */}
                    <div 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        marginBottom: '12px', 
                        paddingBottom: '8px', 
                        borderBottom: '1px solid rgba(255, 255, 255, 0.7)' 
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: col.accent }} />
                        <span style={{ fontSize: '12px', fontWeight: 800, color: '#090C15' }}>
                          {col.label}
                        </span>
                      </div>
                      <span 
                        style={{ 
                          fontSize: '11px', 
                          fontWeight: 800, 
                          color: col.color, 
                          background: col.bg, 
                          padding: '2px 8px', 
                          borderRadius: '999px',
                          border: `1px solid ${col.bg}`
                        }}
                      >
                        {filteredCards.length}
                      </span>
                    </div>

                    {/* Column Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {filteredCards.map((card) => {
                        const isSelected = selectedJobForEmma?.id === card.id;
                        return (
                          <div
                            key={card.id}
                            style={{
                              background: isSelected 
                                ? 'rgba(239, 246, 255, 0.95)' 
                                : 'rgba(255, 255, 255, 0.85)',
                              backdropFilter: 'blur(16px)',
                              WebkitBackdropFilter: 'blur(16px)',
                              borderRadius: '14px',
                              border: isSelected 
                                ? '1.5px solid #3B82F6' 
                                : '1px solid rgba(255, 255, 255, 0.95)',
                              padding: '13px',
                              boxShadow: isSelected
                                ? '0 6px 20px rgba(37, 99, 235, 0.15), inset 0 1px 2px #FFFFFF'
                                : '0 4px 14px rgba(15, 23, 42, 0.03), inset 0 1px 2px #FFFFFF',
                              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}
                          >
                            {/* Company & Score */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                              <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#1A53CF' }}>
                                {card.company}
                              </span>
                              <span style={{ fontSize: '10px', fontWeight: 800, color: '#059669', background: '#ECFDF5', padding: '1px 6px', borderRadius: '4px' }}>
                                {card.score}% ATS
                              </span>
                            </div>

                            {/* Job Title */}
                            <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: '#090C15', lineHeight: 1.3, margin: '0 0 6px 0' }}>
                              {card.title}
                            </h4>

                            {/* Salary & Location */}
                            <p style={{ fontSize: '11px', color: '#64748B', margin: '0 0 8px 0' }}>
                              {card.salary} · {card.location}
                            </p>

                            {/* Stage-Specific Badges */}
                            {card.nextEvent && (
                              <div style={{ background: '#FEF3C7', color: '#92400E', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 700, marginBottom: '8px' }}>
                                🗓️ {card.nextEvent}
                              </div>
                            )}

                            {card.expiry && (
                              <div style={{ background: '#DCFCE7', color: '#15803D', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 700, marginBottom: '8px' }}>
                                🎉 Offer: {card.expiry}
                              </div>
                            )}

                            {/* Card Footer: Emma Action Hook + Move Stage */}
                            <div 
                              style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between', 
                                paddingTop: '8px', 
                                borderTop: '1px solid #F1F5F9', 
                                fontSize: '10.5px' 
                              }}
                            >
                              {/* Connect to Emma Copilot */}
                              <button
                                onClick={() => handleConsultEmmaForJob(card)}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  padding: '3px 8px',
                                  borderRadius: '6px',
                                  background: 'linear-gradient(135deg, rgba(26, 83, 207, 0.08) 0%, rgba(37, 99, 235, 0.15) 100%)',
                                  color: '#1A53CF',
                                  border: '1px solid rgba(26, 83, 207, 0.2)',
                                  fontSize: '10px',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  transition: 'background 0.15s ease'
                                }}
                                title="Send this role directly to Emma Copilot for custom tailoring"
                              >
                                <Sparkles size={11} color="#1A53CF" />
                                <span>Tailor with Emma</span>
                              </button>

                              {/* Stage Transition Buttons */}
                              <div style={{ display: 'flex', gap: '4px' }}>
                                {col.id === 'saved' && (
                                  <button
                                    onClick={() => moveCard(card.id, 'saved', 'applied')}
                                    style={{ padding: '2px 6px', borderRadius: '4px', background: '#EFF6FF', color: '#1A53CF', border: '1px solid #BFDBFE', fontWeight: 700, cursor: 'pointer' }}
                                  >
                                    → Applied
                                  </button>
                                )}
                                {col.id === 'applied' && (
                                  <button
                                    onClick={() => moveCard(card.id, 'applied', 'interviewing')}
                                    style={{ padding: '2px 6px', borderRadius: '4px', background: '#FEF3C7', color: '#B45309', border: '1px solid #FCD34D', fontWeight: 700, cursor: 'pointer' }}
                                  >
                                    → Interview
                                  </button>
                                )}
                                {col.id === 'interviewing' && (
                                  <button
                                    onClick={() => moveCard(card.id, 'interviewing', 'offers')}
                                    style={{ padding: '2px 6px', borderRadius: '4px', background: '#DCFCE7', color: '#16A34A', border: '1px solid #86EFAC', fontWeight: 700, cursor: 'pointer' }}
                                  >
                                    → Offer!
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* =========================================================
            PANEL B: EMMA AI CAREER COPILOT (Shown in 'split' or 'copilot')
            ========================================================= */}
        {(viewMode === 'split' || viewMode === 'copilot') && (
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px' 
            }}
          >
            {/* Emma Terminal Card */}
            <div 
              style={{ 
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                borderRadius: '18px',
                border: '1px solid rgba(255, 255, 255, 0.95)',
                padding: '20px',
                boxShadow: '0 8px 32px rgba(15, 23, 42, 0.05), inset 0 1px 2px #FFFFFF',
                display: 'flex', 
                flexDirection: 'column', 
                height: viewMode === 'split' ? '680px' : '620px'
              }}
            >
              
              {/* Emma Terminal Header */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  paddingBottom: '12px', 
                  borderBottom: '1px solid #F1F5F9',
                  marginBottom: '14px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div 
                    style={{ 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(26, 83, 207, 0.35)'
                    }}
                  >
                    <Bot size={17} color="#FFFFFF" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#090C15', margin: 0 }}>
                      Emma 2.0 AI Career Copilot
                    </h3>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>
                      Context-Aware Intelligence Engine
                    </span>
                  </div>
                </div>

                {selectedJobForEmma && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#EFF6FF', padding: '3px 10px', borderRadius: '999px', border: '1px solid #BFDBFE' }}>
                    <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#1A53CF' }}>
                      Context: {selectedJobForEmma.company}
                    </span>
                  </div>
                )}
              </div>

              {/* Quick Prompt Pills */}
              <div 
                style={{ 
                  display: 'flex', 
                  gap: '6px', 
                  overflowX: 'auto', 
                  paddingBottom: '10px', 
                  borderBottom: '1px solid #F1F5F9', 
                  marginBottom: '14px',
                  scrollbarWidth: 'none'
                }}
              >
                {EMMA_PROMPTS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPrompt(p)}
                    style={{
                      padding: '5px 11px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      background: activePrompt.id === p.id ? '#EFF6FF' : '#F8FAFC',
                      color: activePrompt.id === p.id ? '#1A53CF' : '#475569',
                      border: `1px solid ${activePrompt.id === p.id ? '#BFDBFE' : '#E2E8F0'}`,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Messages Stream */}
              <div 
                style={{ 
                  flex: 1, 
                  overflowY: 'auto', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '12px', 
                  paddingRight: '6px' 
                }}
              >
                {messages.map((m, idx) => (
                  <div 
                    key={idx}
                    style={{
                      alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '90%',
                      background: m.sender === 'user' ? '#090C15' : '#F8FAFC',
                      color: m.sender === 'user' ? '#FFFFFF' : '#1E293B',
                      padding: '11px 15px',
                      borderRadius: '14px',
                      fontSize: '12px',
                      lineHeight: 1.55,
                      border: m.sender === 'user' ? 'none' : '1px solid #E2E8F0',
                      whiteSpace: 'pre-line',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
                    }}
                  >
                    {m.sender === 'emma' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
                        <Sparkles size={13} color="#1A53CF" />
                        <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#1A53CF' }}>Emma Copilot</span>
                      </div>
                    )}
                    {m.text}
                  </div>
                ))}
              </div>

              {/* Input Form */}
              <form 
                onSubmit={handleSend} 
                style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  marginTop: '14px', 
                  paddingTop: '12px', 
                  borderTop: '1px solid #F1F5F9' 
                }}
              >
                <input 
                  type="text"
                  placeholder="Ask Emma about your active applications, resume tweaks, or recruiter messages..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '9px 13px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '12px',
                    outline: 'none',
                    color: '#090C15',
                    backgroundColor: '#FFFFFF'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '9px 15px',
                    borderRadius: '10px',
                    background: '#1A53CF',
                    color: '#FFFFFF',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '12px',
                    fontWeight: 700
                  }}
                >
                  <Send size={13} />
                  <span>Send</span>
                </button>
              </form>

            </div>

            {/* Master Context Nodes (Shown in Copilot full-width or below in Split) */}
            <div 
              style={{ 
                background: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(16px)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                padding: '16px',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.03)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#090C15', margin: 0 }}>
                  Master Profile Memory Nodes
                </h4>
                <span style={{ fontSize: '10.5px', color: '#059669', fontWeight: 700 }}>● 3 Nodes Connected</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: viewMode === 'copilot' ? 'repeat(3, 1fr)' : '1fr', gap: '8px' }}>
                <div style={{ padding: '10px 12px', borderRadius: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#1A53CF', textTransform: 'uppercase' }}>Node 1: Career History</span>
                  <p style={{ fontSize: '11.5px', fontWeight: 700, color: '#090C15', margin: '2px 0 0 0' }}>Alexander Wright · 7 Yrs Exp</p>
                  <span style={{ fontSize: '10.5px', color: '#64748B' }}>14 core competencies mapped</span>
                </div>

                <div style={{ padding: '10px 12px', borderRadius: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#10B981', textTransform: 'uppercase' }}>Node 2: Active Target Pipeline</span>
                  <p style={{ fontSize: '11.5px', fontWeight: 700, color: '#090C15', margin: '2px 0 0 0' }}>Canva & Atlassian Specs</p>
                  <span style={{ fontSize: '10.5px', color: '#64748B' }}>Greenhouse parsed · 96% match</span>
                </div>

                <div style={{ padding: '10px 12px', borderRadius: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#8B5CF6', textTransform: 'uppercase' }}>Node 3: STAR Story Bank</span>
                  <p style={{ fontSize: '11.5px', fontWeight: 700, color: '#090C15', margin: '2px 0 0 0' }}>12 Behavioral Responses</p>
                  <span style={{ fontSize: '10.5px', color: '#64748B' }}>Zero-hallucination ground truth</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
