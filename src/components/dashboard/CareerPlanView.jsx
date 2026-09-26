import React, { useState } from 'react';
import { 
  Compass, 
  Calendar, 
  CheckCircle2, 
  Target, 
  Clock, 
  TrendingUp, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function CareerPlanView() {
  const [selectedPacing, setSelectedPacing] = useState('3mo');
  const [activeTab, setActiveTab] = useState('onboarding'); // 'onboarding' | 'pacing'

  const ROADMAP_STEPS = [
    {
      days: 'Days 1 – 30',
      title: 'Context Absorption & Quick Wins',
      items: [
        'Audit existing Canva / Atlassian product backlog and technical debt registers.',
        'Map out core decision-makers across design, engineering, and data science pods.',
        'Ship one minor high-visibility UI enhancement within the first 21 days.'
      ]
    },
    {
      days: 'Days 31 – 60',
      title: 'Initiative Ownership & Cross-Functional Alignment',
      items: [
        'Take full ownership of creator ecosystem growth sprint metrics.',
        'Establish automated SLA tracking for banking and payment integrations.',
        'Lead bi-weekly discovery sessions with high-value enterprise accounts.'
      ]
    },
    {
      days: 'Days 61 – 90',
      title: 'Strategic Impact & Promotion Positioning',
      items: [
        'Deliver quarterly business review presentation to Head of Product.',
        'Demonstrate 15%+ improvement in activation or retention metrics.',
        'Define long-term H2 roadmap and mentor junior product managers.'
      ]
    }
  ];

  return (
    <div style={{ paddingBottom: '40px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#090C15' }}>
            Career Growth & First 90 Days Roadmap
          </h2>
          <p style={{ fontSize: '12.5px', color: '#64748B' }}>
            A structured blueprint to help you transition from hired candidate to high-impact leader.
          </p>
        </div>

        {/* Pacing Switcher */}
        <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: '3px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.85)', gap: '2px', boxShadow: '0 2px 8px rgba(15,23,42,0.02)' }}>
          {[
            { id: '1mo', label: '1-Mo Sprint' },
            { id: '3mo', label: '3-Mo Balanced' },
            { id: '6mo', label: '6-Mo Strategic' }
          ].map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPacing(p.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '11.5px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: selectedPacing === p.id ? '#090C15' : 'transparent',
                color: selectedPacing === p.id ? '#FFFFFF' : '#64748B'
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Column Roadmap Stages */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '20px' }}>
        {ROADMAP_STEPS.map((step, idx) => (
          <div
            key={idx}
            className="liquid-glass-card"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EFF6FF', padding: '4px 10px', borderRadius: '9999px', marginBottom: '12px' }}>
                <Clock size={12} color="#1A53CF" />
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#1A53CF' }}>{step.days}</span>
              </div>

              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#090C15', marginBottom: '14px', lineHeight: 1.3 }}>
                {step.title}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {step.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#475569', lineHeight: 1.45 }}>
                    <CheckCircle2 size={15} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '14px', borderTop: '1px solid #F1F5F9', fontSize: '11px', color: '#64748B' }}>
              <span>Phase {idx + 1} of 3 · Milestone Tracked</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
