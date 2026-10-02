import React, { useState } from 'react';
import { 
  Bell, 
  Calendar, 
  CheckSquare, 
  Clock, 
  Video, 
  Plus, 
  MoreHorizontal, 
  SlidersHorizontal, 
  Kanban as KanbanIcon, 
  List as ListIcon, 
  Clock3, 
  X, 
  Check, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function AutonomousWorkspacePreview({ onLaunchApp }) {
  const [activeBoardView, setActiveBoardView] = useState('kanban'); // 'kanban' | 'list' | 'timeline'
  const [activeInboxTab, setActiveInboxTab] = useState('all'); // 'all' | 'tasks' | 'chat'
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section 
      id="features"
      style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.08) 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px',
        paddingTop: '96px',
        paddingBottom: '110px',
        overflow: 'hidden'
      }}
    >
      <style>{`
        @keyframes floatingCardHover {
          0%, 100% { transform: translateY(0px) rotate(-1.5deg); }
          50% { transform: translateY(-4px) rotate(-1deg); }
        }
        @media (max-width: 990px) {
          .workspace-window-grid {
            grid-template-columns: 52px 1fr !important;
          }
          .workspace-window-grid > div:last-child {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .workspace-window-grid {
            grid-template-columns: 1fr !important;
          }
          .workspace-window-grid > div:first-child {
            display: none !important;
          }
        }
      `}</style>

      {/* Main Container */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        
        {/* =========================================================================
            2. LEFT-ALIGNED HEADER (STRICT REFERENCE LAYOUT)
            ========================================================================= */}
        <div style={{ textAlign: 'left', maxWidth: '780px', marginBottom: '46px', position: 'relative', zIndex: 12 }}>
          {/* Main Title */}
          <h2
            style={{
              fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: 'clamp(38px, 5.2vw, 70px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: '#090D16',
              margin: '0 0 18px 0'
            }}
          >
            Explore the Autonomous<br />Candidate Workspace
          </h2>

          {/* Subtitle Paragraph */}
          <p
            style={{
              fontSize: 'clamp(15px, 1.5vw, 17px)',
              lineHeight: 1.6,
              color: '#475569',
              maxWidth: '560px',
              margin: '0 0 28px 0',
              fontWeight: 500
            }}
          >
            JobGen, an AI-powered autonomous platform, serves as an all-in-one workspace replacing fragmented job boards, manual trackers, and generic interview prep.
          </p>

          {/* Pill CTA Button with Ambient Amber Halo (Exact Match to Reference) */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* Radiant Amber Halo Glow behind button */}
            <div
              style={{
                position: 'absolute',
                inset: '-4px',
                borderRadius: '9999px',
                background: 'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.7) 0%, rgba(249, 115, 22, 0) 75%)',
                filter: 'blur(16px)',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />

            <button
              onClick={onLaunchApp}
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.96)',
                border: '1px solid rgba(251, 146, 60, 0.55)',
                boxShadow: '0 4px 22px rgba(249, 115, 22, 0.28), 0 1px 3px rgba(0, 0, 0, 0.08)',
                color: '#0F172A',
                fontSize: '12.5px',
                fontWeight: 800,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(249, 115, 22, 0.42)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 22px rgba(249, 115, 22, 0.28)';
              }}
            >
              <span>SEE IN ACTION</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            3. DARK WORKSPACE APPLICATION WINDOW (STRICT REFERENCE LAYOUT)
            ========================================================================= */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            borderRadius: '20px',
            backgroundColor: '#090D16',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 35px 90px -15px rgba(0, 10, 45, 0.45), 0 -2px 20px rgba(59, 130, 246, 0.35)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '58px 1fr 280px',
            minHeight: '620px',
            color: '#E2E8F0',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            textAlign: 'left'
          }}
          className="workspace-window-grid"
        >
          {/* Luminous Top Bezel Highlight from Blue Streak */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent 15%, rgba(59, 130, 246, 0.4) 35%, #FFFFFF 68%, rgba(59, 130, 246, 0.6) 82%, transparent 100%)',
              zIndex: 10,
              pointerEvents: 'none',
              boxShadow: '0 0 14px #60A5FA'
            }}
          />

          {/* ================= A. LEFT SIDEBAR NAVIGATION RAIL ================= */}
          <div
            style={{
              backgroundColor: '#06080F',
              borderRight: '1px solid rgba(255, 255, 255, 0.07)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '14px 0',
              gap: '18px',
              zIndex: 2
            }}
          >
            {/* Top Amber Logo Square */}
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(249, 115, 22, 0.35)',
                cursor: 'pointer'
              }}
            >
              <Sparkles size={16} color="#FFFFFF" />
            </div>

            {/* Circular Progress Gauge (56% TO DO from reference) */}
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'conic-gradient(#F59E0B 0% 56%, rgba(255, 255, 255, 0.08) 56% 100%)',
                padding: '2.5px',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: '#06080F',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span style={{ fontSize: '9px', fontWeight: 900, color: '#F59E0B', lineHeight: 1 }}>56%</span>
                <span style={{ fontSize: '6px', fontWeight: 700, color: '#94A3B8', marginTop: '1px' }}>TO DO</span>
              </div>
            </div>

            {/* Navigation Icons Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
              {/* Notifications / Bell */}
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748B',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '6px',
                  position: 'relative'
                }}
              >
                <Bell size={17} />
                <span style={{ position: 'absolute', top: '5px', right: '5px', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#3B82F6' }} />
              </button>

              {/* Calendar */}
              <button style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '6px' }}>
                <Calendar size={17} />
              </button>

              {/* Active Kanban Board Button (Highlighted like in reference) */}
              <button
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#EF4444',
                  cursor: 'pointer',
                  padding: '7px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(239, 68, 68, 0.25)'
                }}
              >
                <KanbanIcon size={16} />
              </button>

              {/* Checkbox / Tasks */}
              <button style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '6px' }}>
                <CheckSquare size={17} />
              </button>

              {/* Clock / Timer */}
              <button style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '6px' }}>
                <Clock size={17} />
              </button>

              {/* Video Call */}
              <button style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '6px' }}>
                <Video size={17} />
              </button>

              {/* Add New */}
              <button
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  width: '26px',
                  height: '26px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '8px'
                }}
              >
                <Plus size={13} />
              </button>
            </div>
          </div>

          {/* ================= B. CENTER TRACKER & KANBAN ISSUES BOARD ================= */}
          <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#090D16', overflow: 'hidden' }}>
            
            {/* Top Workspace Header & Breadcrumbs */}
            <div
              style={{
                padding: '14px 20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Your projects</span>
                  <span>/</span>
                  <span>CRM</span>
                  <span>/</span>
                  <span style={{ color: '#94A3B8' }}>Issues</span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px', letterSpacing: '-0.02em' }}>
                  Issues
                </div>
              </div>

              {/* Avatar Stack & Action Menu */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '4px' }}>
                  {['/signimg.jpg', '/city-skyline.jpg', '/loadingbg.png'].map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="User"
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: '2px solid #090D16',
                        marginLeft: i === 0 ? 0 : '-7px',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ))}
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: '#1E293B',
                      border: '2px solid #090D16',
                      marginLeft: '-7px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '9px',
                      fontWeight: 700,
                      color: '#94A3B8'
                    }}
                  >
                    +5
                  </div>
                </div>

                <button style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '4px' }}>
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>

            {/* Board View Switcher Tabs (Kanban, List, Timeline, Filter) */}
            <div
              style={{
                padding: '8px 20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(0, 0, 0, 0.15)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setActiveBoardView('kanban')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: activeBoardView === 'kanban' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    color: activeBoardView === 'kanban' ? '#FFFFFF' : '#64748B'
                  }}
                >
                  <KanbanIcon size={12} />
                  <span>Kanban</span>
                </button>

                <button
                  onClick={() => setActiveBoardView('list')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: activeBoardView === 'list' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    color: activeBoardView === 'list' ? '#FFFFFF' : '#64748B'
                  }}
                >
                  <ListIcon size={12} />
                  <span>List</span>
                </button>

                <button
                  onClick={() => setActiveBoardView('timeline')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: activeBoardView === 'timeline' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    color: activeBoardView === 'timeline' ? '#FFFFFF' : '#64748B'
                  }}
                >
                  <Clock3 size={12} />
                  <span>Timeline</span>
                </button>
              </div>

              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: 'none',
                  border: 'none',
                  color: '#64748B',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <SlidersHorizontal size={11} />
                <span>Filter</span>
              </button>
            </div>

            {/* Kanban Columns Grid */}
            <div
              style={{
                flex: 1,
                padding: '16px 18px',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '14px',
                overflowX: 'auto',
                position: 'relative'
              }}
            >
              {/* ============ COLUMN 1: BACKLOG ============ */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Column Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px 6px 4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
                    <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.04em', color: '#94A3B8' }}>BACKLOG</span>
                    <span style={{ fontSize: '10px', color: '#475569', fontWeight: 700 }}>10</span>
                  </div>
                  <Plus size={13} color="#64748B" style={{ cursor: 'pointer' }} />
                </div>

                {/* Card 1: Cluster Monitoring */}
                <div
                  onMouseEnter={() => setHoveredCard('c1')}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    backgroundColor: '#111622',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    border: hoveredCard === 'c1' ? '1px solid rgba(96, 165, 250, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.15s ease',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: '12.5px', fontWeight: 650, color: '#F1F5F9', lineHeight: 1.4, marginBottom: '10px' }}>
                    Set up cluster monitoring
                  </div>

                  {/* Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#1E3A8A', color: '#93C5FD' }}>
                      Low
                    </span>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#7C2D12', color: '#FDBA74' }}>
                      Devops
                    </span>
                  </div>

                  {/* Progress & Brand */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#64748B' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #F59E0B' }} />
                      <span style={{ fontWeight: 700, color: '#94A3B8' }}>12%</span>
                    </div>
                    <span style={{ fontSize: '10px', color: '#64748B' }}>freelynk</span>
                  </div>
                </div>

                {/* Floating Preview Card (Drag effect exactly matching reference) */}
                <div
                  style={{
                    backgroundColor: '#171E2E',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    border: '1px solid rgba(96, 165, 250, 0.55)',
                    boxShadow: '0 18px 40px -8px rgba(0, 0, 0, 0.75), 0 0 20px rgba(59, 130, 246, 0.25)',
                    animation: 'floatingCardHover 3.5s ease-in-out infinite',
                    cursor: 'grab',
                    zIndex: 8,
                    marginTop: '2px'
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.35, marginBottom: '10px' }}>
                    Analyze, cluster, and understand search queries
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#1E3A8A', color: '#93C5FD' }}>
                      Low
                    </span>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#7C2D12', color: '#FDBA74' }}>
                      Devops
                    </span>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#3730A3', color: '#C7D2FE' }}>
                      Research
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#64748B' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #64748B' }} />
                      <span style={{ color: '#94A3B8' }}>0%</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#3B82F6', fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>3</div>
                    </div>
                  </div>
                </div>

                {/* Card 3: Benchmarks */}
                <div
                  style={{
                    backgroundColor: '#111622',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    opacity: 0.8
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#CBD5E1', marginBottom: '8px' }}>
                    Collect the LinkedIn's integration benchmarks
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ fontSize: '9.5px', padding: '1px 6px', borderRadius: '4px', backgroundColor: '#1E293B', color: '#94A3B8' }}>Medium</span>
                    <span style={{ fontSize: '9.5px', padding: '1px 6px', borderRadius: '4px', backgroundColor: '#831843', color: '#FBCFE8' }}>Marketing</span>
                  </div>
                </div>
              </div>

              {/* ============ COLUMN 2: TO DO ============ */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Column Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px 6px 4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                    <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.04em', color: '#94A3B8' }}>TO DO</span>
                    <span style={{ fontSize: '10px', color: '#475569', fontWeight: 700 }}>24</span>
                  </div>
                  <Plus size={13} color="#64748B" style={{ cursor: 'pointer' }} />
                </div>

                {/* Card 1: Sales planning */}
                <div
                  onMouseEnter={() => setHoveredCard('c2')}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    backgroundColor: '#111622',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    border: hoveredCard === 'c2' ? '1px solid rgba(96, 165, 250, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.15s ease',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: '12.5px', fontWeight: 650, color: '#F1F5F9', lineHeight: 1.4, marginBottom: '10px' }}>
                    Sales planning and monitoring of important transactions
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#1E3A8A', color: '#93C5FD' }}>
                      Low
                    </span>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#831843', color: '#FBCFE8' }}>
                      Sales
                    </span>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#7C2D12', color: '#FDBA74' }}>
                      Marketing
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#64748B' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #F59E0B' }} />
                      <span style={{ fontWeight: 700, color: '#94A3B8' }}>20%</span>
                    </div>
                    <span style={{ fontSize: '10px', color: '#64748B' }}>freelynk</span>
                  </div>
                </div>

                {/* Card 2: User Onboarding with Image Banner */}
                <div
                  onMouseEnter={() => setHoveredCard('c3')}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    backgroundColor: '#111622',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    border: hoveredCard === 'c3' ? '1px solid rgba(96, 165, 250, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: '12.5px', fontWeight: 650, color: '#F1F5F9', marginBottom: '8px' }}>
                    User onboarding
                  </div>

                  {/* Thumbnail Image Banner */}
                  <div
                    style={{
                      height: '68px',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      marginBottom: '10px',
                      backgroundImage: 'url(/city-skyline.jpg)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#1E293B', color: '#94A3B8' }}>
                      Medium
                    </span>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#701A75', color: '#F5D0FE' }}>
                      Design
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94A3B8' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #F59E0B' }} />
                    <span style={{ fontWeight: 700 }}>25%</span>
                  </div>
                </div>
              </div>

              {/* ============ COLUMN 3: IN PROGRESS ============ */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Column Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px 6px 4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#3B82F6' }} />
                    <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.04em', color: '#94A3B8' }}>IN PROGRESS</span>
                    <span style={{ fontSize: '10px', color: '#475569', fontWeight: 700 }}>3</span>
                  </div>
                  <Plus size={13} color="#64748B" style={{ cursor: 'pointer' }} />
                </div>

                {/* Card 1: Moderated testing */}
                <div
                  onMouseEnter={() => setHoveredCard('c4')}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    backgroundColor: '#111622',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    border: hoveredCard === 'c4' ? '1px solid rgba(96, 165, 250, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: '12.5px', fontWeight: 650, color: '#F1F5F9', lineHeight: 1.4, marginBottom: '10px' }}>
                    Find the respondents for the moderated testing
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#1E293B', color: '#94A3B8' }}>
                      Medium
                    </span>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#14532D', color: '#86EFAC' }}>
                      QA
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94A3B8' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #3B82F6' }} />
                    <span style={{ fontWeight: 700 }}>50%</span>
                  </div>
                </div>

                {/* Card 2: Custdev interview */}
                <div
                  onMouseEnter={() => setHoveredCard('c5')}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    backgroundColor: '#111622',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    border: hoveredCard === 'c5' ? '1px solid rgba(96, 165, 250, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: '12.5px', fontWeight: 650, color: '#F1F5F9', lineHeight: 1.4, marginBottom: '10px' }}>
                    Conduct custdev interview w/ existing client
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#1E293B', color: '#94A3B8' }}>
                      Medium
                    </span>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: '#14532D', color: '#86EFAC' }}>
                      QA
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94A3B8' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #10B981' }} />
                    <span style={{ fontWeight: 700, color: '#10B981' }}>90%</span>
                  </div>
                </div>

                {/* Card 3: MVP Deal screen */}
                <div
                  style={{
                    backgroundColor: '#111622',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    opacity: 0.8
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#CBD5E1', marginBottom: '8px' }}>
                    Add view-resource for MVP Deal Screen
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ fontSize: '9.5px', padding: '1px 6px', borderRadius: '4px', backgroundColor: '#7F1D1D', color: '#FCA5A5' }}>High</span>
                    <span style={{ fontSize: '9.5px', padding: '1px 6px', borderRadius: '4px', backgroundColor: '#1E3A8A', color: '#93C5FD' }}>Frontend</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= C. RIGHT-HAND INBOX DRAWER (EXACT FROM REFERENCE) ================= */}
          <div
            style={{
              backgroundColor: '#070A11',
              borderLeft: '1px solid rgba(255, 255, 255, 0.07)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 2
            }}
          >
            {/* Inbox Header */}
            <div
              style={{
                padding: '14px 16px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>Inbox</span>
              <X size={15} color="#64748B" style={{ cursor: 'pointer' }} />
            </div>

            {/* Inbox Filter Tabs (All, Tasks 2, Chat) */}
            <div
              style={{
                padding: '8px 14px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <button
                onClick={() => setActiveInboxTab('all')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: activeInboxTab === 'all' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  color: activeInboxTab === 'all' ? '#FFFFFF' : '#64748B'
                }}
              >
                All
              </button>

              <button
                onClick={() => setActiveInboxTab('tasks')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: activeInboxTab === 'tasks' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  color: activeInboxTab === 'tasks' ? '#FFFFFF' : '#64748B'
                }}
              >
                <span>Tasks</span>
                <span style={{ backgroundColor: '#2563EB', color: '#FFF', fontSize: '9px', padding: '1px 5px', borderRadius: '4px' }}>2</span>
              </button>

              <button
                onClick={() => setActiveInboxTab('chat')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  backgroundColor: activeInboxTab === 'chat' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  color: activeInboxTab === 'chat' ? '#FFFFFF' : '#64748B'
                }}
              >
                Chat
              </button>
            </div>

            {/* Notification / Activity Stream (Exact items from Reference Image) */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
              {[
                {
                  name: 'Elizabeth Reynolds',
                  action: 'mentioned you in a page',
                  time: '10 min ago',
                  project: 'Marketing and PM',
                  unread: true,
                  avatar: '/signimg.jpg',
                  initials: 'ER',
                  bg: '#3B82F6'
                },
                {
                  name: 'Sonya Wolf',
                  action: 'joined to Next Platform project',
                  time: '16 min ago',
                  project: 'Next Platform',
                  unread: true,
                  avatar: '/city-skyline.jpg',
                  initials: 'SW',
                  bg: '#8B5CF6'
                },
                {
                  name: 'Kenny Osinski',
                  action: 'in #General @everyone Hi there! Let\'s discu...',
                  time: '1 hour ago',
                  project: 'General',
                  unread: false,
                  initials: 'KO',
                  bg: '#EC4899'
                },
                {
                  name: 'Alexey Zinovyev',
                  action: 'added new tag to the Issues page',
                  time: '3 hours ago',
                  project: 'CRM',
                  unread: false,
                  initials: 'AZ',
                  bg: '#10B981'
                },
                {
                  name: 'Billy Christiansen',
                  action: 'changed status UBER-5871 to In Progress',
                  time: '4 hours ago',
                  project: 'Marketing and PM',
                  unread: false,
                  initials: 'BC',
                  bg: '#64748B'
                },
                {
                  name: 'Warren Thompson',
                  action: 'added new task to the Issues page',
                  time: '6 hours ago',
                  project: 'CRM',
                  unread: false,
                  initials: 'WT',
                  bg: '#F59E0B'
                },
                {
                  name: 'Sheila Price',
                  action: 'mentioned you in a page',
                  time: 'yesterday',
                  project: 'Design',
                  unread: false,
                  initials: 'SP',
                  bg: '#6366F1'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 14px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {/* User Avatar with fallback */}
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: item.bg,
                      color: '#FFFFFF',
                      fontSize: '10px',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {item.initials}
                  </div>

                  {/* Body */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span style={{ fontSize: '11.5px', fontWeight: 750, color: '#F1F5F9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </span>
                      {item.unread && (
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#3B82F6', flexShrink: 0 }} />
                      )}
                    </div>

                    <div style={{ fontSize: '11px', color: '#94A3B8', lineHeight: 1.35, marginBottom: '4px' }}>
                      {item.action}
                    </div>

                    <div style={{ fontSize: '9.5px', color: '#64748B' }}>
                      {item.time} &bull; {item.project}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            4. BOTTOM MARQUEE TICKER (CLEAN WHITE THEME)
            ========================================================================= */}
        <div style={{ marginTop: '58px', overflow: 'hidden' }}>
          <p style={{ fontSize: '12px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '14px', textAlign: 'center' }}>
            Everything you need for autonomous career advancement:
          </p>
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', position: 'relative' }}>
            <div className="animate-white-marquee">
              {[
                'ATS Resume Studio',
                'Opportunity Kanban Pipeline',
                'Real-time AI Match Scoring',
                'STAR Interview Prep Copilot',
                '12-Week Strategic Career Plan',
                'Tailored Cover Letter Studio',
                '1-Click Chrome Extension',
                'Salary & Equity Benchmark'
              ].concat([
                'ATS Resume Studio',
                'Opportunity Kanban Pipeline',
                'Real-time AI Match Scoring',
                'STAR Interview Prep Copilot',
                '12-Week Strategic Career Plan',
                'Tailored Cover Letter Studio',
                '1-Click Chrome Extension',
                'Salary & Equity Benchmark'
              ]).map((item, idx) => (
                <span 
                  key={idx} 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    marginRight: '36px', 
                    fontSize: '13px', 
                    fontWeight: 650, 
                    color: '#334155' 
                  }}
                >
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#1A53CF' }} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
