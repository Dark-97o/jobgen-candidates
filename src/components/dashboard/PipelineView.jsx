import React, { useState } from 'react';
import { 
  KanbanSquare, 
  Plus, 
  MoreHorizontal, 
  Calendar, 
  TrendingUp, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Building2,
  DollarSign
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

export default function PipelineView({ onNavigateToJobSearch }) {
  const [pipeline, setPipeline] = useState(INITIAL_PIPELINE);

  const moveCard = (cardId, fromCol, toCol) => {
    const card = pipeline[fromCol].find(c => c.id === cardId);
    if (!card) return;

    setPipeline({
      ...pipeline,
      [fromCol]: pipeline[fromCol].filter(c => c.id !== cardId),
      [toCol]: [card, ...pipeline[toCol]]
    });
  };

  const COLUMNS = [
    { id: 'saved', label: '1. Saved Opportunities', count: pipeline.saved.length, color: '#64748B', bg: '#F8FAFC' },
    { id: 'applied', label: '2. Applied Applications', count: pipeline.applied.length, color: '#1A53CF', bg: '#EFF6FF' },
    { id: 'interviewing', label: '3. Interviewing Rounds', count: pipeline.interviewing.length, color: '#D97706', bg: '#FEF3C7' },
    { id: 'offers', label: '4. Offers Received', count: pipeline.offers.length, color: '#16A34A', bg: '#DCFCE7' }
  ];

  return (
    <div style={{ paddingBottom: '40px' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#090C15' }}>
            Application Pipeline Kanban
          </h2>
          <p style={{ fontSize: '12.5px', color: '#64748B' }}>
            Auto-synced with Seek, LinkedIn EasyApply, and your email confirmations.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={onNavigateToJobSearch}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: '#090C15',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            + Add Opportunity from Search
          </button>
        </div>
      </div>

      {/* 4-Column Kanban Board */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '16px', alignItems: 'start' }}>
        {COLUMNS.map((col) => (
          <div 
            key={col.id}
            style={{
              background: 'rgba(255, 255, 255, 0.45)',
              backdropFilter: 'blur(24px) saturate(190%)',
              WebkitBackdropFilter: 'blur(24px) saturate(190%)',
              borderRadius: '18px',
              border: '1px solid rgba(255, 255, 255, 0.85)',
              padding: '16px',
              boxShadow: '0 8px 30px -4px rgba(15,23,42,0.04), inset 0 1px 2px rgba(255,255,255,0.95)'
            }}
          >
            {/* Column Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#090C15' }}>{col.label}</span>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: col.color, background: col.bg, padding: '2px 8px', borderRadius: '9999px' }}>
                {col.count}
              </span>
            </div>

            {/* Column Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {pipeline[col.id].map((card) => (
                <div
                  key={card.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.72)',
                    backdropFilter: 'blur(16px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                    borderRadius: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.95)',
                    padding: '14px',
                    boxShadow: '0 4px 14px rgba(15,23,42,0.03), inset 0 1px 2px #FFFFFF',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#1A53CF' }}>
                      {card.company}
                    </span>
                    <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#059669', background: '#ECFDF5', padding: '1px 6px', borderRadius: '4px' }}>
                      {card.score}% ATS
                    </span>
                  </div>

                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#090C15', lineHeight: 1.3, marginBottom: '6px' }}>
                    {card.title}
                  </h4>

                  <p style={{ fontSize: '11px', color: '#64748B', marginBottom: '8px' }}>
                    {card.salary} · {card.location}
                  </p>

                  {/* Stage-specific alert tags */}
                  {card.nextEvent && (
                    <div style={{ background: '#FEF3C7', color: '#92400E', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 700, marginBottom: '8px' }}>
                      🗓️ {card.nextEvent}
                    </div>
                  )}

                  {card.expiry && (
                    <div style={{ background: '#DCFCE7', color: '#15803D', padding: '4px 8px', borderRadius: '6px', fontSize: '10.5px', fontWeight: 700, marginBottom: '8px' }}>
                      🎉 Offer: {card.expiry}
                    </div>
                  )}

                  {/* Move quick action buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #F1F5F9', fontSize: '10.5px' }}>
                    <span style={{ color: '#94A3B8' }}>{card.date}</span>

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
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
