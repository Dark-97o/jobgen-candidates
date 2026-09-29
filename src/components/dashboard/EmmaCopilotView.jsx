import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Briefcase,
  Copy
} from 'lucide-react';

const EMMA_PROMPTS = [
  {
    id: 'tailor',
    label: 'Tailor resume for Canva Lead PM',
    query: 'How should I tailor my experience bullet for Canva’s Senior PM role?',
    response: 'Canva prioritizes user-led product velocity and design system governance. Based on your verified master experience at FinTech Corp, I’ve refined your bullet:\n\n"Scaled enterprise API adoption by 180% across 40+ Tier-1 banking partners through iterative sprint restructuring and automated compliance testing."\n\nNotice this retains 100% of your authentic metrics while directly matching Canva’s must-have ATS keyword: "API adoption" and "sprint restructuring".'
  },
  {
    id: 'outreach',
    label: 'Draft recruiter outreach note for Atlassian',
    query: 'Draft a short, compelling LinkedIn note to Craig Press (Head of Product at Atlassian).',
    response: 'Hi Craig — noticed Atlassian is expanding the Jira cloud architecture team. Over the last 4 years at FinTech Corp, I spearheaded micro-frontend scaling across 14 distributed pods, cutting production turnaround times by 3 weeks. Would love to share insights on how we solved component federation if you have 5 minutes next week. Best, Alexander'
  },
  {
    id: 'salary',
    label: 'Salary benchmarks for Sydney Tech',
    query: 'What is the current base salary and equity range for Lead PM in Sydney?',
    response: 'For a Lead Product Manager in Sydney (Tier-1 Tech: Canva, Atlassian, Stripe):\n• Median Base: $195,000 – $225,000 AUD\n• Superannuation: 11.5% statutory\n• Annual Equity Grant: $35,000 – $60,000 AUD in RSUs\n• Total Target Comp: $240,000 – $290,000 AUD.'
  }
];

export default function EmmaCopilotView() {
  const [activePrompt, setActivePrompt] = useState(EMMA_PROMPTS[0]);
  const [messages, setMessages] = useState([
    { sender: 'emma', text: EMMA_PROMPTS[0].response }
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleSelectPrompt = (prompt) => {
    setActivePrompt(prompt);
    setMessages([
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
      { sender: 'emma', text: `Analyzing your master profile context... For "${userText}", I've verified your 7 years experience and recent Canva/Atlassian applications to ensure full alignment with zero hallucination.` }
    ]);
  };

  return (
    <div style={{ paddingBottom: '40px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#090C15' }}>
            Emma 2.0 AI Career Copilot
          </h2>
          <p style={{ fontSize: '12.5px', color: '#64748B' }}>
            Your contextual job search intelligence engine. Grounded exclusively in your verified career history.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#ECFDF5', padding: '4px 12px', borderRadius: '9999px', border: '1px solid #A7F3D0' }}>
          <ShieldCheck size={14} color="#059669" />
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#059669' }}>Zero-Hallucination Policy Active</span>
        </div>
      </div>

      {/* 2-Column Terminal: Left Chat Canvas / Right Master Context Vault */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.45fr) minmax(0, 0.95fr)', gap: '20px', alignItems: 'start' }}>
        
        {/* Chat Terminal */}
        <div className="liquid-glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '620px' }}>
          
          {/* Quick Prompt Pills */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '12px', borderBottom: '1px solid #F1F5F9', marginBottom: '16px' }}>
            {EMMA_PROMPTS.map(p => (
              <button
                key={p.id}
                onClick={() => handleSelectPrompt(p)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  background: activePrompt.id === p.id ? '#EFF6FF' : '#F8FAFC',
                  color: activePrompt.id === p.id ? '#1A53CF' : '#475569',
                  border: `1px solid ${activePrompt.id === p.id ? '#BFDBFE' : '#E2E8F0'}`
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '6px' }}>
            {messages.map((m, idx) => (
              <div 
                key={idx}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: m.sender === 'user' ? '#090C15' : '#F8FAFC',
                  color: m.sender === 'user' ? '#FFFFFF' : '#1E293B',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  fontSize: '12.5px',
                  lineHeight: 1.5,
                  border: m.sender === 'user' ? 'none' : '1px solid #E2E8F0',
                  whiteSpace: 'pre-line'
                }}
              >
                {m.sender === 'emma' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <Bot size={14} color="#1A53CF" />
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#1A53CF' }}>Emma AI Copilot</span>
                  </div>
                )}
                {m.text}
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
            <input 
              type="text"
              placeholder="Ask Emma about your resume, recruiter messages, or interviews..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                fontSize: '12.5px',
                outline: 'none',
                color: '#090C15'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '10px 16px',
                borderRadius: '10px',
                background: '#1A53CF',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 700
              }}
            >
              <Send size={14} />
              <span>Ask</span>
            </button>
          </form>

        </div>

        {/* Right: Master Context Graph Vault */}
        <div className="liquid-glass-card" style={{ padding: '22px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#090C15', marginBottom: '12px' }}>
            Master Profile Memory Nodes
          </h4>
          <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.45, marginBottom: '16px' }}>
            Emma accesses these 3 encrypted context nodes to generate tailored assets without hallucination.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ padding: '12px', borderRadius: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#1A53CF', textTransform: 'uppercase' }}>Node 1: Career History</span>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#090C15', marginTop: '2px' }}>Alexander Wright · 7 Yrs Exp</p>
              <span style={{ fontSize: '11px', color: '#64748B' }}>14 core competencies · 8 quantified projects</span>
            </div>

            <div style={{ padding: '12px', borderRadius: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#10B981', textTransform: 'uppercase' }}>Node 2: Target Jobs</span>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#090C15', marginTop: '2px' }}>Canva & Atlassian Specifications</p>
              <span style={{ fontSize: '11px', color: '#64748B' }}>Greenhouse parsed · 96% match score mapped</span>
            </div>

            <div style={{ padding: '12px', borderRadius: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#8B5CF6', textTransform: 'uppercase' }}>Node 3: STAR Story Bank</span>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#090C15', marginTop: '2px' }}>12 Behavioral Responses</p>
              <span style={{ fontSize: '11px', color: '#64748B' }}>Verified Situation, Task, Action, Result cases</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
