import React, { useState, useRef, useEffect } from 'react';
import { 
  Home,
  Search, 
  KanbanSquare, 
  FileText, 
  Mail, 
  Briefcase,
  Mic, 
  Calendar,
  Compass,
  Crown,
  HelpCircle,
  Puzzle,
  GraduationCap,
  Sparkles,
  X,
  CheckCircle2,
  ArrowRight,
  Settings,
  LogOut,
  User,
  ShieldCheck
} from 'lucide-react';

export default function Sidebar({ currentTab, onSelectTab }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [activeActionToast, setActiveActionToast] = useState(null);
  const sidebarRef = useRef(null);

  const NAV_ITEMS = [
    { id: 'overview', label: 'Home', icon: Home },
    { id: 'jobs', label: 'Job Hunt', icon: Search },
    { id: 'workspace', label: 'Workspace', icon: Briefcase },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'coverletter', label: 'Cover letter', icon: Mail },
    { id: 'interview', label: 'Interview prep', icon: Mic },
    { id: 'events', label: 'Career events', icon: Calendar },
    { id: 'careerplan', label: 'Career plan', icon: Compass }
  ];

  const handlePillClick = (label, message) => {
    setActiveActionToast({ label, message });
    setTimeout(() => {
      setActiveActionToast(null);
    }, 3200);
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'fixed',
          left: 0,
          top: '20px',
          bottom: '20px',
          height: 'calc(100vh - 40px)',
          width: isHovered ? '264px' : '68px',
          backgroundColor: '#090C15',
          borderTopRightRadius: '22px',
          borderBottomRightRadius: '22px',
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderLeft: 'none',
          boxShadow: isHovered 
            ? '18px 0 54px -4px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.15)' 
            : '8px 0 28px -4px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 100,
          transition: 'width 0.32s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.32s ease',
          overflow: 'hidden',
          padding: '16px 0 12px 0',
        }}
      >
        {/* 1. Brand Header: JobGen logo and JobGen.AI text nothing else */}
        <div 
          style={{ 
            padding: isHovered ? '2px 18px 14px 18px' : '2px 0 14px 0', 
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isHovered ? 'flex-start' : 'center',
            gap: '12px',
            position: 'relative',
            zIndex: 2,
            minHeight: '42px',
            flexShrink: 0
          }}
        >
          {/* JobGen Logo Image */}
          <div 
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            title="JobGen.AI"
          >
            <img 
              src="/jobgen-logo.png" 
              alt="JobGen.AI" 
              style={{ 
                width: '28px', 
                height: '28px', 
                objectFit: 'contain',
                display: 'block'
              }} 
            />
          </div>

          {/* Company Name: Shown only when expanded */}
          {isHovered && (
            <span 
              style={{ 
                fontFamily: 'var(--font-title)', 
                fontWeight: 800, 
                fontSize: '18px', 
                color: '#FFFFFF', 
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
              }}
            >
              JobGen.AI
            </span>
          )}
        </div>

        {/* 2. Options in sidebar: Home, Job Hunt, Tracker, Resume, Cover letter, Workspace, Interview prep, Career events, Career plan */}
        <nav 
          style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '3px',
            padding: isHovered ? '10px 10px 6px 10px' : '10px 0 6px 0',
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollbarWidth: 'none',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id || (item.id === 'workspace' && (currentTab === 'pipeline' || currentTab === 'emma'));

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                title={!isHovered ? item.label : undefined}
                style={{
                  width: isHovered ? '100%' : '44px',
                  height: '42px',
                  margin: isHovered ? '0' : '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isHovered ? 'flex-start' : 'center',
                  padding: isHovered ? '0 14px' : '0',
                  borderRadius: '12px',
                  backgroundColor: isActive ? '#0052FF' : 'transparent',
                  color: '#FFFFFF',
                  border: isActive ? '1px solid rgba(255, 255, 255, 0.25)' : 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.16s ease',
                  position: 'relative',
                  textDecoration: 'none',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {/* Icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  <Icon 
                    size={20} 
                    color={isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.75)'} 
                    style={{ flexShrink: 0 }} 
                  />
                  
                  {/* Text: only when expanded */}
                  {isHovered && (
                    <span 
                      style={{ 
                        fontSize: '14.5px', 
                        fontWeight: isActive ? 700 : 550, 
                        color: '#FFFFFF',
                        letterSpacing: '-0.01em',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        {/* 3. Three Pill Shape Buttons: Help & Support, Chrome Extension, Academy */}
        <div 
          style={{ 
            padding: isHovered ? '8px 12px 6px 12px' : '6px 0 6px 0', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px',
            flexShrink: 0
          }}
        >
          {isHovered ? (
            <>
              {/* Help & Support Pill */}
              <button
                onClick={() => handlePillClick('Help & Support', 'Connecting to JobGen.AI Support & Live Candidate Assistance...')}
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '0 16px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.16s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.14)';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.07)';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                }}
              >
                <HelpCircle size={17} color="#00E5FF" style={{ flexShrink: 0 }} />
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Help & Support
                </span>
              </button>

              {/* Chrome Extension Pill */}
              <button
                onClick={() => handlePillClick('Chrome Extension', 'Opening JobGen.AI Chrome Web Store extension installer...')}
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '0 16px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.16s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.14)';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.07)';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                }}
              >
                <Puzzle size={17} color="#38BDF8" style={{ flexShrink: 0 }} />
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Chrome Extension
                </span>
              </button>

              {/* Academy Pill */}
              <button
                onClick={() => handlePillClick('Academy', 'Launching JobGen Candidate Academy & Career Masterclasses...')}
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '0 16px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.07)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.16s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.14)';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.borderColor = 'rgba(167, 139, 250, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.07)';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                }}
              >
                <GraduationCap size={16} color="#A78BFA" style={{ flexShrink: 0 }} />
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Academy
                </span>
              </button>
            </>
          ) : (
            /* Collapsed 3 Compact Icon Pills */
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => handlePillClick('Help & Support', 'Connecting to JobGen.AI Support...')}
                title="Help & Support"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'rgba(255, 255, 255, 0.85)',
                  transition: 'all 0.16s ease'
                }}
              >
                <HelpCircle size={16} color="#00E5FF" />
              </button>
              <button
                onClick={() => handlePillClick('Chrome Extension', 'JobGen.AI Chrome Extension')}
                title="Chrome Extension"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'rgba(255, 255, 255, 0.85)',
                  transition: 'all 0.16s ease'
                }}
              >
                <Puzzle size={16} color="#38BDF8" />
              </button>
              <button
                onClick={() => handlePillClick('Academy', 'JobGen Academy')}
                title="Academy"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'rgba(255, 255, 255, 0.85)',
                  transition: 'all 0.16s ease'
                }}
              >
                <GraduationCap size={16} color="#A78BFA" />
              </button>
            </div>
          )}
        </div>

        {/* 4. Card Showing the Option to Go Premium (Positioned Just Above Profile with Solid Gold Aesthetic) */}
        <div style={{ padding: isHovered ? '6px 12px 8px 12px' : '4px 0 6px 0', flexShrink: 0 }}>
          {isHovered ? (
            <div 
              style={{
                borderRadius: '14px',
                backgroundColor: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid #D4AF37',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)'
              }}
            >
              {/* Top Header of Card */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <div 
                    style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '7px', 
                      backgroundColor: 'rgba(212, 175, 55, 0.22)', 
                      border: '1px solid #D4AF37',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}
                  >
                    <Crown size={14} color="#D4AF37" />
                  </div>
                  <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                    Go Premium
                  </span>
                </div>
                <span 
                  style={{ 
                    fontSize: '9px', 
                    fontWeight: 900, 
                    color: '#090C15', 
                    backgroundColor: '#D4AF37', 
                    padding: '2px 7px', 
                    borderRadius: '9999px',
                    letterSpacing: '0.05em'
                  }}
                >
                  PRO
                </span>
              </div>

              {/* Card Description */}
              <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.78)', margin: 0, lineHeight: 1.35 }}>
                Unlimited ATS tailorings & 1-click auto applications
              </p>

              {/* Upgrade CTA Pill Button - Solid Gold (No Gradient) */}
              <button
                onClick={() => setShowPremiumModal(true)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '9999px',
                  backgroundColor: '#D4AF37',
                  color: '#090C15',
                  border: 'none',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(212, 175, 55, 0.35)',
                  transition: 'transform 0.15s ease, filter 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.08)'}
                onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}
              >
                <Sparkles size={13} color="#090C15" />
                <span>Upgrade to Pro</span>
              </button>
            </div>
          ) : (
            /* Collapsed Solid Gold Crown Icon Button */
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={() => setShowPremiumModal(true)}
                title="Go Premium"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(212, 175, 55, 0.16)',
                  border: '1px solid #D4AF37',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.16s ease'
                }}
              >
                <Crown size={18} color="#D4AF37" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Action Feedback Toast */}
      {activeActionToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '28px',
            left: '90px',
            zIndex: 9999,
            backgroundColor: '#090C15',
            color: '#FFFFFF',
            padding: '12px 18px',
            borderRadius: '12px',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
            fontWeight: 600,
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <Sparkles size={16} color="#00E5FF" />
          <span>{activeActionToast.message}</span>
        </div>
      )}

      {/* Go Premium Modal */}
      {showPremiumModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setShowPremiumModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '520px',
              backgroundColor: '#090C15',
              borderRadius: '20px',
              border: '1px solid #D4AF37',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 35px rgba(212, 175, 55, 0.25)',
              padding: '28px',
              color: '#FFFFFF',
              position: 'relative'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPremiumModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>

            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div 
                style={{ 
                  width: '42px', 
                  height: '42px', 
                  borderRadius: '12px', 
                  backgroundColor: '#D4AF37', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(212, 175, 55, 0.35)'
                }}
              >
                <Crown size={22} color="#090C15" />
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>
                  Upgrade to JobGen Pro
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', margin: '2px 0 0 0' }}>
                  Supercharge your job search with unlimited AI power
                </p>
              </div>
            </div>

            {/* Features List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '20px 0' }}>
              {[
                'Unlimited ATS Resume tailored versions (Canva, Atlassian, Stripe)',
                '1-Click automated application submission across Seek & LinkedIn',
                'Real-time recruiter application view alerts & interview invites',
                'Priority Emma 2.0 Copilot with deep STAR answer generation',
                'Dedicated Executive Career Coach consultation once a month'
              ].map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                  <CheckCircle2 size={16} color="#D4AF37" style={{ flexShrink: 0 }} />
                  <span style={{ color: 'rgba(255, 255, 255, 0.85)' }}>{feat}</span>
                </div>
              ))}
            </div>

            {/* Price Box */}
            <div 
              style={{ 
                padding: '16px', 
                borderRadius: '12px', 
                backgroundColor: 'rgba(212, 175, 55, 0.1)', 
                border: '1px solid #D4AF37', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '20px'
              }}
            >
              <div>
                <div style={{ fontSize: '12px', color: '#D4AF37', fontWeight: 700 }}>Candidate Pro Pass</div>
                <div style={{ fontSize: '22px', fontWeight: 900, color: '#FFFFFF', marginTop: '2px' }}>
                  $29 <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255, 255, 255, 0.6)' }}>/ month</span>
                </div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#090C15', backgroundColor: '#D4AF37', padding: '4px 10px', borderRadius: '6px' }}>
                7-Day Free Trial
              </span>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => {
                setShowPremiumModal(false);
                handlePillClick('Premium Activated', 'Welcome to JobGen.AI Pro! All limits unlocked.');
              }}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                backgroundColor: '#D4AF37',
                color: '#090C15',
                border: 'none',
                fontSize: '14px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(212, 175, 55, 0.4)'
              }}
            >
              <span>Start 7-Day Free Trial</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
