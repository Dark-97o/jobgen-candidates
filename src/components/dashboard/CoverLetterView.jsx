import React, { useState } from 'react';
import { 
  Mail, 
  Download, 
  Copy, 
  Sparkles, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';

export default function CoverLetterView() {
  const [targetCompany, setTargetCompany] = useState('Canva');
  const [copied, setCopied] = useState(false);

  const COVER_LETTERS = {
    Canva: {
      recipient: 'Canva Hiring Team & Craig Press',
      role: 'Lead Product Manager (Creator Ecosystem)',
      body: `Dear Canva Hiring Team,

I am writing to express my strong enthusiasm for the Lead Product Manager role within Canva’s Creator Ecosystem. Having scaled enterprise API adoption by 180% across 40+ Tier-1 banking partners at FinTech Corp and directed cross-functional pods uniting mobile and web design systems, I have long admired Canva's relentless dedication to empowering visual creators worldwide.

In my current capacity, I specialize in iterative growth funnels and design-led product velocity. When our team identified user activation drop-off, I established bi-weekly discovery loops between UX researchers and engineers, reducing activation churn from 24% to 11% while driving an incremental $450k in ARR expansion. I am particularly excited by Canva’s challenge of scaling multi-surface creation tools across 180M+ monthly users without compromising simplicity.

I look forward to discussing how my experience in growth architecture and design system scaling will help Canva accelerate creator engagement. Thank you for your time and consideration.

Warm regards,
Alexander Wright`
    },
    Atlassian: {
      recipient: 'Atlassian Engineering Recruitment',
      role: 'Senior Staff Frontend Architect',
      body: `Dear Atlassian Engineering Leadership,

I am writing to apply for the Senior Staff Frontend Architect role across Jira and Confluence cloud. Having spent the last 4 years architecting micro-frontend platforms and unifying design system tokens across 14 distributed squads, I have experienced firsthand the transformative leverage of high-performance developer tooling.

At FinTech Corp, I spearheaded our micro-frontend decoupling initiative, reducing production build times by 3 weeks and eliminating critical release rollbacks. My approach aligns directly with Atlassian’s values: open work, rigorous architectural governance, and empowering autonomous squads.

I would welcome the opportunity to dive into how my background in React 19 systems and micro-frontends can contribute to Atlassian’s cloud scale.

Sincerely,
Alexander Wright`
    }
  };

  const currentLetter = COVER_LETTERS[targetCompany] || COVER_LETTERS['Canva'];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentLetter.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ paddingBottom: '40px' }}>
      
      {/* Header */}
      <div className="liquid-glass-card" style={{ padding: '14px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>Target Employer:</span>
          <div style={{ display: 'flex', background: '#F1F5F9', padding: '3px', borderRadius: '8px', gap: '4px' }}>
            {['Canva', 'Atlassian'].map(c => (
              <button
                key={c}
                onClick={() => setTargetCompany(c)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: targetCompany === c ? '#FFFFFF' : 'transparent',
                  color: targetCompany === c ? '#1A53CF' : '#64748B',
                  border: 'none',
                  boxShadow: targetCompany === c ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '8px',
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              color: '#090C15',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {copied ? <CheckCircle2 size={14} color="#10B981" /> : <Copy size={14} />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Letter'}</span>
          </button>

          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '8px',
              background: '#090C15',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Download size={14} />
            <span>Download Clean PDF</span>
          </button>
        </div>
      </div>

      {/* Letter Canvas */}
      <div className="liquid-glass-card" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '24px', borderBottom: '1px solid #E2E8F0', paddingBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#090C15' }}>Alexander Wright</h3>
          <p style={{ fontSize: '12px', color: '#64748B' }}>Sydney, Australia · alexander.wright@email.com · +61 400 123 456</p>
          <p style={{ fontSize: '12px', color: '#1A53CF', fontWeight: 700, marginTop: '6px' }}>
            Application for: {currentLetter.role} at {targetCompany}
          </p>
        </div>

        <div style={{ fontSize: '13px', color: '#334155', lineHeight: 1.65, whiteSpace: 'pre-line' }}>
          {currentLetter.body}
        </div>
      </div>

    </div>
  );
}
