import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  Bot, 
  Volume2
} from 'lucide-react';

export default function InterviewPrepView() {
  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState('canva');
  const [activeStarTab, setActiveStarTab] = useState('action');

  const ROOMS = [
    { id: 'canva', name: 'Canva Hiring Loop', role: 'Senior Product Manager', interviewer: 'Emma (Lead Interview AI)', round: 'Round 2: System Architecture' },
    { id: 'atlassian', name: 'Atlassian Technical Loop', role: 'Staff Frontend Architect', interviewer: 'Emma (Tech Architecture AI)', round: 'Round 3: Micro-Frontend Scaling' },
    { id: 'stripe', name: 'Stripe Behavioral Round', role: 'Product Operations Lead', interviewer: 'Emma (Culture & Operations AI)', round: 'Round 2: Cross-Functional Alignment' }
  ];

  const currentRoom = ROOMS.find(r => r.id === selectedRoom) || ROOMS[0];

  return (
    <div style={{ paddingBottom: '40px' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#090C15' }}>
            STAR Mock Interview Rehearsal Room
          </h2>
          <p style={{ fontSize: '12.5px', color: '#64748B' }}>
            Practice behavioral questions in real-time with instant AI grading and voice confidence scoring.
          </p>
        </div>

        {/* Room Switcher */}
        <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', padding: '3px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.85)', gap: '2px', boxShadow: '0 2px 8px rgba(15,23,42,0.02)' }}>
          {ROOMS.map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRoom(r.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '11.5px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: selectedRoom === r.id ? '#090C15' : 'transparent',
                color: selectedRoom === r.id ? '#FFFFFF' : '#475569'
              }}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Stage: Left Virtual Office Video Stage / Right STAR Evaluation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: '20px', alignItems: 'start' }}>
        
        {/* Left: Floating Video Stage (Matching Reference Image 2) */}
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
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#090C15' }}>{currentRoom.name} · {currentRoom.round}</span>
            </div>
            <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700, background: '#ECFDF5', padding: '2px 8px', borderRadius: '9999px' }}>
              ● Live Audio Active
            </span>
          </div>

          {/* Floating Video Window (Exact match to Reference Image 2) */}
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
                  AW
                </div>
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '4px', fontSize: '10.5px', color: '#FFFFFF' }}>
                  Alexander Wright (Candidate)
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
                    <span style={{ fontSize: '9.5px', color: '#10B981' }}>Listening for metrics</span>
                  </div>
                </div>

                <div style={{ background: '#111827', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '11px' }}>
                    CP
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#FFFFFF', fontWeight: 700, display: 'block' }}>Craig Press (Canva)</span>
                    <span style={{ fontSize: '9.5px', color: '#94A3B8' }}>Hiring Director</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Meeting Controls (Reference Image 2) */}
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

          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#090C15', marginBottom: '14px' }}>
            "Tell me about a time you handled a technical deadlock between senior engineering leads."
          </h4>

          {/* STAR Accordion Blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ padding: '10px 12px', borderRadius: '8px', background: '#F8FAFC', borderLeft: '3px solid #1A53CF' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#1A53CF', textTransform: 'uppercase' }}>Situation</span>
              <p style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>
                Q3 enterprise contract required custom SSO, while engineering planned core DB migration.
              </p>
            </div>

            <div style={{ padding: '10px 12px', borderRadius: '8px', background: '#F8FAFC', borderLeft: '3px solid #10B981' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#10B981', textTransform: 'uppercase' }}>Task</span>
              <p style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>
                Protect database reliability while unblocking $450k ARR expansion revenue.
              </p>
            </div>

            <div style={{ padding: '10px 12px', borderRadius: '8px', background: '#F8FAFC', borderLeft: '3px solid #F59E0B' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#F59E0B', textTransform: 'uppercase' }}>Action (AI Highlight)</span>
              <p style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>
                Organized a 2-day technical spike to unbundle SSO into an isolated OAuth proxy micro-pod.
              </p>
            </div>

            <div style={{ padding: '10px 12px', borderRadius: '8px', background: '#F8FAFC', borderLeft: '3px solid #8B5CF6' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#8B5CF6', textTransform: 'uppercase' }}>Result</span>
              <p style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>
                Closed enterprise customer 1 week early with 99.98% SLA and zero migration rollbacks.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#64748B' }}>Emma Coach: High executive presence</span>
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
