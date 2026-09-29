import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Download, 
  Copy, 
  Sparkles, 
  CheckCircle2, 
  FileText,
  Sliders,
  Check,
  ArrowLeft,
  Edit3,
  RefreshCw,
  Send,
  Building2,
  Calendar,
  MapPin,
  Trash2,
  Plus,
  BookOpen,
  Award,
  Zap,
  User,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const COVER_LETTER_TEMPLATES = [
  {
    id: 'jake',
    name: 'Classic ATS',
    subtitle: 'ATS-friendly serif',
    description: 'ATS-friendly serif letterhead matching the Classic resume style with clean divider keyline.',
    font: 'serif',
    accentColor: '#171717'
  },
  {
    id: 'modern',
    name: 'Modern Clean',
    subtitle: 'Contemporary sans',
    description: 'Clean header, subtle JobGen accent, and crisp application spacing.',
    font: 'sans',
    accentColor: '#1A53CF'
  },
  {
    id: 'balanced',
    name: 'Balanced Executive',
    subtitle: 'Structured header',
    description: 'Premium structured header with strong spacing and grouped contact details.',
    font: 'sans',
    accentColor: '#0F172A'
  },
  {
    id: 'initials',
    name: 'Initials Monogram',
    subtitle: 'Monogram crest',
    description: 'Elegant monogram letterhead with a polished personal-brand feel.',
    font: 'serif',
    accentColor: '#047857'
  },
  {
    id: 'sidebar',
    name: 'Sidebar Rail',
    subtitle: 'Left identity column',
    description: 'Strong left identity rail with focused contact details and a clean writing area.',
    font: 'sans',
    accentColor: '#171717'
  }
];

const TARGET_COMPANIES_DATA = {
  Canva: {
    role: 'Lead Product Manager (Creator Ecosystem)',
    recipient: 'Hiring Team & Craig Press',
    address: 'Canva HQ, 110 Kippax St, Surry Hills NSW 2010',
    tone: 'Strategic & Visionary',
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
    tone: 'Technical & Architectural',
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
  Stripe: {
    role: 'Product Operations Lead',
    recipient: 'Global Talent Acquisition',
    address: 'Stripe, 100 Mount St, North Sydney NSW 2060',
    tone: 'Operational & High-Reliability',
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

export default function CoverLetterView({ onBackToDocuments }) {
  const [selectedCompany, setSelectedCompany] = useState('Canva');
  const [letterData, setLetterData] = useState(() => {
    try {
      const saved = sessionStorage.getItem('jobgen_active_cover_builder');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      documentName: 'Canva - Lead Product Manager Cover Letter',
      template: 'jake',
      tone: 'Strategic & Visionary',
      date: 'September 29, 2026',
      candidateName: 'Alexander Wright',
      candidateTitle: 'Senior Staff Frontend Architect & Product Lead',
      email: 'alexander.wright@jobgen.ai',
      phone: '+61 400 123 456',
      location: 'Sydney, NSW, Australia',
      linkedin: 'linkedin.com/in/alexander-wright',
      ...TARGET_COMPANIES_DATA['Canva']
    };
  });

  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'design' | 'emma' | 'master'
  const [activeAccordion, setActiveAccordion] = useState('target'); // 'target' | 'recipient' | 'opening' | 'body' | 'highlights' | 'closing'
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  // Emma Chat
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      text: 'Hi Alexander! I\'ve reviewed your cover letter for Canva. The tone is strategic and backs up every claim with verified metrics. Would you like me to tailor the opening hook or tighten the closing call-to-action?'
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isEmmaTyping, setIsEmmaTyping] = useState(false);

  // Autosave
  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem('jobgen_active_cover_builder', JSON.stringify(letterData));
      } catch (e) {}
      setIsSaving(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [letterData]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSwitchCompany = (comp) => {
    setSelectedCompany(comp);
    const preset = TARGET_COMPANIES_DATA[comp] || TARGET_COMPANIES_DATA['Canva'];
    setLetterData(prev => ({
      ...prev,
      documentName: `${comp} - ${preset.role} Cover Letter`,
      ...preset
    }));
    showToast(`Loaded cover letter draft for ${comp}`);
  };

  const handleCopyText = () => {
    const fullText = `${letterData.candidateName}
${letterData.location} · ${letterData.email} · ${letterData.phone}

Date: ${letterData.date}
To: ${letterData.recipient}
Company: ${selectedCompany}
Application: ${letterData.role}

${letterData.opening}

${letterData.body}

Key Strategic & Technical Highlights:
${letterData.bullets.map(b => '• ' + b).join('\n')}

${letterData.closing}

${letterData.signOff}`;

    navigator.clipboard?.writeText(fullText);
    showToast('Copied full cover letter to clipboard! ✨');
  };

  const handleSendChatMessage = (textToSend = userInput) => {
    if (!textToSend.trim()) return;
    setChatMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setUserInput('');
    setIsEmmaTyping(true);

    setTimeout(() => {
      let reply = '';
      if (textToSend.toLowerCase().includes('hook') || textToSend.toLowerCase().includes('opening')) {
        reply = 'Here is a bold, high-converting opening hook:\n\n"Dear Canva Hiring Team, after spending four years scaling enterprise design token systems and growing Tier-1 partner API adoption by 180%, I was ecstatic to see the Lead Product Manager role for Canva\'s Creator Ecosystem."\n\nClick below to apply this directly!';
      } else if (textToSend.toLowerCase().includes('shorten')) {
        reply = 'I\'ve tightened your body paragraph to exactly 280 words while retaining all 3 key metrics (180% API adoption, 35% cycle time reduction, 24% MAU growth). Ready to apply!';
      } else {
        reply = 'Your highlighted bullet points are crisp and impactful. Ensure you mention Canva\'s recent multi-surface creation push during the interview loop!';
      }

      setChatMessages(prev => [...prev, { role: 'assistant', text: reply }]);
      setIsEmmaTyping(false);
    }, 900);
  };

  // Word count calculation
  const totalWords = [letterData.opening, letterData.body, ...letterData.bullets, letterData.closing]
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;

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
              color: '#475569'
            }}
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
                  <span>{letterData.documentName}</span>
                  <Edit3 size={13} color="#94A3B8" />
                </h2>
              )}

              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Check size={12} color="#10B981" />
                <span>Saved</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Word Count, Tone, Generate with AI, Copy, PDF */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          <span 
            style={{ 
              fontSize: '11.5px', 
              fontWeight: 700, 
              color: '#475569', 
              backgroundColor: '#F1F5F9', 
              padding: '6px 12px', 
              borderRadius: '999px',
              border: '1px solid #E2E8F0'
            }}
          >
            {totalWords} words · 1 Page
          </span>

          <span 
            style={{ 
              fontSize: '11.5px', 
              fontWeight: 700, 
              color: '#1A53CF', 
              backgroundColor: '#EFF6FF', 
              padding: '6px 12px', 
              borderRadius: '999px',
              border: '1px solid #BFDBFE'
            }}
          >
            {letterData.tone}
          </span>

          <button
            onClick={() => setShowGenerateModal(true)}
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
              boxShadow: '0 3px 12px rgba(26, 83, 207, 0.3)'
            }}
          >
            <Sparkles size={14} />
            <span>Generate with AI</span>
          </button>

          <button
            onClick={handleCopyText}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '9px',
              backgroundColor: '#F8FAFC',
              color: '#090C15',
              border: '1px solid #CBD5E1',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Copy size={13} />
            <span>Copy Text</span>
          </button>

          <button
            onClick={() => window.print()}
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
              cursor: 'pointer'
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
          {/* Mode Tabs */}
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
              { id: 'editor', label: 'Editor', icon: Mail },
              { id: 'design', label: 'Design', icon: Sliders },
              { id: 'emma', label: 'Ask Emma', icon: Sparkles },
              { id: 'master', label: 'Master Voice', icon: BookOpen }
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
                    cursor: 'pointer'
                  }}
                >
                  <Icon size={14} color={isSelected ? '#1A53CF' : '#64748B'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Editor */}
          {activeTab === 'editor' && (
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              {/* Target Job Quick Switcher */}
              <div style={{ padding: '12px 14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>
                    Linked Job Opportunity:
                  </span>
                  <span style={{ fontSize: '11px', color: '#1A53CF', fontWeight: 700 }}>
                    97% Role Match
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['Canva', 'Atlassian', 'Stripe'].map(comp => (
                    <button
                      key={comp}
                      onClick={() => handleSwitchCompany(comp)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '7px',
                        border: selectedCompany === comp ? '1.5px solid #1A53CF' : '1px solid #CBD5E1',
                        backgroundColor: selectedCompany === comp ? '#EFF6FF' : '#FFFFFF',
                        color: selectedCompany === comp ? '#1A53CF' : '#475569',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {comp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Accordion 1: Recipient & Letter Meta */}
              <div style={{ borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === 'recipient' ? null : 'recipient')}
                  style={{ width: '100%', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: 'none', backgroundColor: '#FAFAFA', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Building2 size={16} color="#1A53CF" />
                    <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#090C15' }}>Recipient & Addressee</span>
                  </div>
                  {activeAccordion === 'recipient' ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
                </button>

                {activeAccordion === 'recipient' && (
                  <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Recipient Name / Team</label>
                      <input 
                        type="text" 
                        value={letterData.recipient}
                        onChange={(e) => setLetterData(prev => ({ ...prev, recipient: e.target.value }))}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '7px', border: '1px solid #CBD5E1', fontSize: '12.5px', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Target Role</label>
                      <input 
                        type="text" 
                        value={letterData.role}
                        onChange={(e) => setLetterData(prev => ({ ...prev, role: e.target.value }))}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '7px', border: '1px solid #CBD5E1', fontSize: '12.5px', outline: 'none' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Opening Paragraph */}
              <div style={{ borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === 'opening' ? null : 'opening')}
                  style={{ width: '100%', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: 'none', backgroundColor: '#FAFAFA', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Mail size={16} color="#1A53CF" />
                    <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#090C15' }}>Opening Paragraph & Hook</span>
                  </div>
                  {activeAccordion === 'opening' ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
                </button>

                {activeAccordion === 'opening' && (
                  <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <textarea 
                      value={letterData.opening}
                      onChange={(e) => setLetterData(prev => ({ ...prev, opening: e.target.value }))}
                      rows={4}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12.5px', lineHeight: 1.55, outline: 'none' }}
                    />
                  </div>
                )}
              </div>

              {/* Accordion 3: Body & Career Highlights */}
              <div style={{ borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === 'body' ? null : 'body')}
                  style={{ width: '100%', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: 'none', backgroundColor: '#FAFAFA', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={16} color="#1A53CF" />
                    <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#090C15' }}>Body & Highlights</span>
                  </div>
                  {activeAccordion === 'body' ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
                </button>

                {activeAccordion === 'body' && (
                  <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <textarea 
                      value={letterData.body}
                      onChange={(e) => setLetterData(prev => ({ ...prev, body: e.target.value }))}
                      rows={5}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12.5px', lineHeight: 1.55, outline: 'none' }}
                    />

                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>
                      Key Bullet Highlights:
                    </span>
                    {letterData.bullets.map((b, i) => (
                      <div key={i} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
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
                          onClick={() => {
                            setLetterData(prev => ({
                              ...prev,
                              bullets: prev.bullets.filter((_, idx) => idx !== i)
                            }));
                          }}
                          style={{ padding: '5px 7px', borderRadius: '6px', backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', cursor: 'pointer' }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Accordion 4: Closing & Call to Action */}
              <div style={{ borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === 'closing' ? null : 'closing')}
                  style={{ width: '100%', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: 'none', backgroundColor: '#FAFAFA', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={16} color="#1A53CF" />
                    <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#090C15' }}>Closing & Sign-off</span>
                  </div>
                  {activeAccordion === 'closing' ? <ChevronUp size={16} color="#64748B" /> : <ChevronDown size={16} color="#64748B" />}
                </button>

                {activeAccordion === 'closing' && (
                  <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Closing Statement</label>
                      <textarea 
                        value={letterData.closing}
                        onChange={(e) => setLetterData(prev => ({ ...prev, closing: e.target.value }))}
                        rows={3}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12.5px', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>Formal Sign-off</label>
                      <textarea 
                        value={letterData.signOff}
                        onChange={(e) => setLetterData(prev => ({ ...prev, signOff: e.target.value }))}
                        rows={2}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12.5px', outline: 'none' }}
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Tab 2: Design */}
          {activeTab === 'design' && (
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#090C15', margin: '0 0 10px 0' }}>
                  Letterhead Templates
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {COVER_LETTER_TEMPLATES.map(tpl => {
                    const isSelected = letterData.template === tpl.id;
                    return (
                      <button
                        key={tpl.id}
                        onClick={() => setLetterData(prev => ({ ...prev, template: tpl.id }))}
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
            </div>
          )}

          {/* Tab 3: Ask Emma AI */}
          {activeTab === 'emma' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFC' }}>
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
                    Emma is reviewing the letter...
                  </div>
                )}
              </div>

              <div style={{ padding: '8px 16px', borderTop: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', display: 'flex', gap: '6px', overflowX: 'auto' }}>
                {['Make more assertive', 'Shorten to 300 words', 'Emphasize leadership'].map(prompt => (
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

              <div style={{ padding: '12px 16px', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '8px' }}>
                <input 
                  type="text"
                  placeholder="Ask Emma to refine your cover letter..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                  style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #CBD5E1', fontSize: '12.5px', outline: 'none' }}
                />
                <button
                  onClick={() => handleSendChatMessage()}
                  style={{ padding: '8px 14px', borderRadius: '8px', background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)', color: '#FFFFFF', border: 'none', fontWeight: 700, cursor: 'pointer' }}
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Tab 4: Master Voice */}
          {activeTab === 'master' && (
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: 800, color: '#1E40AF', margin: '0 0 6px 0' }}>
                  Authentic Master Voice
                </h4>
                <p style={{ fontSize: '12px', color: '#1E3A8A', margin: 0, lineHeight: 1.5 }}>
                  JobGen AI analyzes your historical writing style and past letters so every generated application sounds authentically like you, not generic AI slop.
                </p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#090C15', marginBottom: '6px' }}>
                  Your Sample Voice Reference (Paste or Edit)
                </label>
                <textarea 
                  rows={8}
                  defaultValue="I have spent 9+ years delivering product architecture that blends engineering precision with commercial growth. My leadership philosophy centers on empowering autonomous engineering pods through clear telemetry..."
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', lineHeight: 1.55, outline: 'none' }}
                />
                <button
                  onClick={() => showToast('Saved Master Voice sample! ✨')}
                  style={{ marginTop: '8px', padding: '8px 14px', borderRadius: '8px', backgroundColor: '#090C15', color: '#FFFFFF', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Save Master Voice
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Live A4 Letterhead Canvas */}
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

          {/* Letterhead Paper Canvas */}
          <div 
            style={{
              width: '794px',
              minHeight: '1123px',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 18px 50px rgba(15, 23, 42, 0.12), 0 2px 10px rgba(0, 0, 0, 0.04)',
              borderRadius: '2px',
              padding: '64px 72px',
              boxSizing: 'border-box',
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
              fontFamily: letterData.template === 'modern' || letterData.template === 'balanced' || letterData.template === 'sidebar' ? 'Inter, "Segoe UI", Arial, sans-serif' : '"Noto Serif", Georgia, serif',
              color: '#111827',
              transition: 'transform 0.15s ease'
            }}
          >
            {/* Letterhead Header */}
            <div style={{ marginBottom: '24px' }}>
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

              {/* Horizontal Keyline Rule */}
              <div style={{ height: '1.5px', backgroundColor: letterData.template === 'modern' ? '#1A53CF' : '#D1D5DB', marginTop: '14px' }} />
            </div>

            {/* Recipient Block & Date */}
            <div style={{ marginBottom: '24px', fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>
              <p style={{ margin: '0 0 4px 0', fontWeight: 600 }}>{letterData.date}</p>
              <p style={{ margin: '0 0 2px 0', fontWeight: 800, color: '#0F172A', fontSize: '13px' }}>{letterData.recipient}</p>
              <p style={{ margin: '0 0 2px 0', fontWeight: 700, color: '#111827' }}>{selectedCompany}</p>
              <p style={{ margin: '0 0 6px 0' }}>{letterData.address}</p>
              <p style={{ margin: 0, fontWeight: 800, color: '#1A53CF' }}>Re: Application for {letterData.role}</p>
            </div>

            {/* Letter Body */}
            <div style={{ fontSize: '12.5px', lineHeight: 1.7, color: '#334155', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'justify' }}>
              <p style={{ margin: 0 }}>
                {letterData.opening}
              </p>

              <p style={{ margin: 0 }}>
                {letterData.body}
              </p>

              {letterData.bullets && letterData.bullets.length > 0 && (
                <div>
                  <span style={{ fontWeight: 800, color: '#0F172A', display: 'block', marginBottom: '8px' }}>
                    Key Strategic & Technical Highlights:
                  </span>
                  <ul style={{ margin: 0, paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {letterData.bullets.map((b, bIdx) => (
                      <li key={bIdx} style={{ color: '#334155' }}>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p style={{ margin: 0 }}>
                {letterData.closing}
              </p>

              <div style={{ marginTop: '16px', paddingTop: '16px', whiteSpace: 'pre-line', fontWeight: 800, color: '#0F172A', fontSize: '13px' }}>
                {letterData.signOff}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Generate with AI Modal */}
      {showGenerateModal && (
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
          onClick={() => setShowGenerateModal(false)}
        >
          <div 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              maxWidth: '520px',
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
                  Generate Tailored Cover Letter
                </h3>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0 0' }}>
                  AI drafts a targeted cover letter matching {selectedCompany}’s exact needs
                </p>
              </div>
            </div>

            <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', marginBottom: '18px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#1A53CF', textTransform: 'uppercase' }}>Target Role:</span>
              <p style={{ fontSize: '14px', fontWeight: 800, color: '#090C15', margin: '2px 0' }}>
                {selectedCompany} · {letterData.role}
              </p>
              <span style={{ fontSize: '11.5px', color: '#059669', fontWeight: 700 }}>
                Pulls verified impact metrics from your master profile
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowGenerateModal(false)}
                style={{ flex: 1, padding: '11px', borderRadius: '10px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF', color: '#475569', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowGenerateModal(false);
                  showToast(`Generated tailored cover letter for ${selectedCompany}! ✨`);
                }}
                style={{ flex: 2, padding: '11px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)', color: '#FFFFFF', fontSize: '13px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 14px rgba(26, 83, 207, 0.35)' }}
              >
                Generate Draft ✨
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
