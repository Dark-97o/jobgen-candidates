import React, { useState } from 'react';
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
  ChevronDown
} from 'lucide-react';

const TEMPLATES = [
  { id: 'classic', name: 'Classic ATS (Jake)' },
  { id: 'advisory', name: 'Consultant Polished' },
  { id: 'bureau', name: 'London Bureau' },
  { id: 'portfolio', name: 'Architect Portfolio' },
  { id: 'precision', name: 'Operations Precision' }
];

export default function ResumeStudioView() {
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [activeResumeVersion, setActiveResumeVersion] = useState('canva');
  const [diffMode, setDiffMode] = useState('tailored'); // 'original' | 'tailored'

  return (
    <div style={{ paddingBottom: '40px' }}>
      
      {/* Top Toolbar */}
      <div className="liquid-glass-card" style={{ padding: '14px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        
        {/* Resume Version Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>Active Document:</span>
          <div style={{ display: 'flex', background: '#F1F5F9', padding: '3px', borderRadius: '8px', gap: '2px' }}>
            {[
              { id: 'canva', label: 'Canva Lead PM (Tailored)' },
              { id: 'atlassian', label: 'Atlassian Staff FE (Tailored)' },
              { id: 'master', label: 'Master Profile (Default)' }
            ].map(v => (
              <button
                key={v.id}
                onClick={() => setActiveResumeVersion(v.id)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: activeResumeVersion === v.id ? '#FFFFFF' : 'transparent',
                  color: activeResumeVersion === v.id ? '#1A53CF' : '#64748B',
                  border: 'none',
                  boxShadow: activeResumeVersion === v.id ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
                }}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Template Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>ATS Template:</span>
          <div style={{ display: 'flex', background: '#F8FAFC', padding: '2px', borderRadius: '8px', gap: '4px', border: '1px solid #E2E8F0' }}>
            {TEMPLATES.slice(0, 3).map(tpl => (
              <button
                key={tpl.id}
                onClick={() => setSelectedTemplate(tpl.id)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: selectedTemplate === tpl.id ? '#090C15' : 'transparent',
                  color: selectedTemplate === tpl.id ? '#FFFFFF' : '#64748B',
                  border: 'none'
                }}
              >
                {tpl.name}
              </button>
            ))}
          </div>

          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '8px',
              background: '#090C15',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Download size={14} />
            <span>Export Clean ATS PDF</span>
          </button>
        </div>

      </div>

      {/* 2-Column Studio: Left Resume Document / Right ATS Intelligence Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 0.9fr)', gap: '20px', alignItems: 'start' }}>
        
        {/* Left: ProseMirror Resume Canvas */}
        <div className="liquid-glass-card" style={{ padding: '36px', minHeight: '750px' }}>
          
          {/* Resume Header */}
          <div style={{ textAlign: 'center', paddingBottom: '20px', borderBottom: '1px solid #E2E8F0', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#090C15', letterSpacing: '-0.02em' }}>
              ALEXANDER WRIGHT
            </h1>
            <p style={{ fontSize: '13px', color: '#1A53CF', fontWeight: 700, marginTop: '2px' }}>
              Lead Product Manager · Growth & Scaled Systems
            </p>
            <p style={{ fontSize: '11.5px', color: '#64748B', marginTop: '6px' }}>
              Sydney, Australia · alexander.wright@email.com · +61 400 123 456 · linkedin.com/in/alexanderwright
            </p>
          </div>

          {/* Professional Summary */}
          <div style={{ marginBottom: '22px' }}>
            <h3 style={{ fontSize: '12.5px', fontWeight: 800, color: '#090C15', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #090C15', paddingBottom: '3px', marginBottom: '8px' }}>
              PROFESSIONAL SUMMARY
            </h3>
            <p style={{ fontSize: '12px', color: '#334155', lineHeight: 1.55 }}>
              Results-driven Lead Product Manager with 7+ years directing high-velocity engineering pods across FinTech and SaaS ecosystems. Track record of scaling API adoption by 180% and unifying design systems across 40+ Tier-1 enterprise partners. Expert in growth funnels, iterative discovery, and executive stakeholder alignment.
            </p>
          </div>

          {/* Work Experience */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #090C15', paddingBottom: '3px', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '12.5px', fontWeight: 800, color: '#090C15', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                PROFESSIONAL EXPERIENCE
              </h3>
              
              {/* Diff Toggle */}
              <div style={{ display: 'flex', background: '#F1F5F9', padding: '2px', borderRadius: '6px', gap: '2px' }}>
                <button
                  onClick={() => setDiffMode('original')}
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    background: diffMode === 'original' ? '#FFFFFF' : 'transparent',
                    color: diffMode === 'original' ? '#090C15' : '#64748B'
                  }}
                >
                  Original
                </button>
                <button
                  onClick={() => setDiffMode('tailored')}
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    background: diffMode === 'tailored' ? '#1A53CF' : 'transparent',
                    color: diffMode === 'tailored' ? '#FFFFFF' : '#64748B'
                  }}
                >
                  Tailored (AI Diff)
                </button>
              </div>
            </div>

            {/* Role 1 */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                <strong style={{ color: '#090C15' }}>Lead Product Manager — FinTech Corp</strong>
                <span style={{ color: '#64748B', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>2022 – Present · Sydney</span>
              </div>

              <ul style={{ paddingLeft: '16px', marginTop: '6px', fontSize: '12px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>
                  {diffMode === 'tailored' ? (
                    <span style={{ background: '#ECFDF5', color: '#065F46', padding: '2px 4px', borderRadius: '4px', border: '1px solid #A7F3D0' }}>
                      + Scaled enterprise API adoption by 180% across 40+ Tier-1 banking partners
                    </span>
                  ) : (
                    <span>Managed core banking partner API integrations</span>
                  )} through iterative sprint restructuring and automated compliance testing.
                </li>
                <li>
                  Partnered with UX researchers and design systems team to unify mobile and web design systems, cutting production turnaround times by 3 weeks.
                </li>
                <li>
                  Orchestrated A/B activation funnels across 1.2M monthly users, yielding an incremental $450k ARR expansion in Q3.
                </li>
              </ul>
            </div>

            {/* Role 2 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                <strong style={{ color: '#090C15' }}>Senior Product Manager — Growth Labs</strong>
                <span style={{ color: '#64748B', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>2019 – 2022 · Melbourne</span>
              </div>
              <ul style={{ paddingLeft: '16px', marginTop: '6px', fontSize: '12px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>
                  Led a cross-functional squad of 11 engineers and designers to launch self-service onboarding, reducing user activation churn from 24% to 11%.
                </li>
                <li>
                  Instituted weekly continuous discovery habits with enterprise account leads, prioritizing high-impact customer feature requests.
                </li>
              </ul>
            </div>

          </div>

          {/* Education & Core Competencies */}
          <div>
            <h3 style={{ fontSize: '12.5px', fontWeight: 800, color: '#090C15', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #090C15', paddingBottom: '3px', marginBottom: '8px' }}>
              CORE COMPETENCIES & TECHNICAL SKILLS
            </h3>
            <p style={{ fontSize: '11.5px', color: '#334155', lineHeight: 1.5 }}>
              <strong>Methodologies:</strong> Product Strategy, Growth Funnels, Sprint Restructuring, Continuous Discovery, OKR Planning, A/B Testing.<br />
              <strong>Tools & Tech:</strong> Jira, Figma, Amplitude, SQL, GraphQL, Segment, Postman, ProseMirror, React Systems.
            </p>
          </div>

        </div>

        {/* Right: ATS Intelligence & Live Feedback Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Score Gauge Card */}
          <div className="liquid-glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#090C15', textTransform: 'uppercase' }}>
                Live ATS Compatibility
              </span>
              <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700 }}>
                Canva PM Role
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#ECFDF5', border: '3px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 900, color: '#059669', fontFamily: 'var(--font-mono)' }}>
                96%
              </div>
              <div style={{ fontSize: '12px', color: '#475569' }}>
                <strong style={{ color: '#090C15', display: 'block' }}>Greenhouse & Workday Ready</strong>
                Zero parsing errors detected. Clear section hierarchy and high-impact action verbs.
              </div>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11.5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
                <span>✓ Keyword Density</span>
                <strong>High (88/100)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
                <span>✓ Quantified Metrics</span>
                <strong>6 Verified Bullets</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669' }}>
                <span>✓ Single-Page Standard</span>
                <strong>Optimal 480 words</strong>
              </div>
            </div>
          </div>

          {/* Matched Keyword Tags */}
          <div className="liquid-glass-card" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#090C15', marginBottom: '10px' }}>
              Keywords Matched for Target Role
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['Product Strategy', 'Growth Funnels', 'Sprint Restructuring', 'Design Systems', 'API Adoption', 'Continuous Discovery'].map((k, i) => (
                <span key={i} style={{ fontSize: '11px', fontWeight: 600, background: '#EFF6FF', color: '#1A53CF', padding: '3px 8px', borderRadius: '6px' }}>
                  ✓ {k}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
