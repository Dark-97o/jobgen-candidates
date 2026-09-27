import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck,
  MousePointerClick
} from 'lucide-react';

export default function LoginView({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleQuickFill = () => {
    setUsername('Candidate');
    setPassword('Jobgen');
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    const trimmedUser = username.trim();
    // Validate hardcoded credentials: Username: Candidate, Password: Jobgen
    if (trimmedUser.toLowerCase() === 'candidate' && password === 'Jobgen') {
      setIsLoading(true);
      setIsSuccess(true);
      setTimeout(() => {
        if (onLogin) {
          onLogin({ username: 'Candidate' });
        }
      }, 550);
    } else {
      setErrorMessage('Invalid credentials. Username is "Candidate" and Password is "Jobgen".');
    }
  };

  return (
    <div 
      className="login-viewport-root"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#FFFFFF',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        color: '#090C15',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        @keyframes cardPopIn {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 860px) {
          .login-card-container {
            justify-content: center !important;
            padding: 20px !important;
          }
          .login-spline-fade {
            background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.6) 40%, rgba(255, 255, 255, 0.95) 80%, #FFFFFF 100%) !important;
          }
        }
      `}</style>

      {/* ================= BACKGROUND: SPLINE 3D MASCOT CANVAS ================= */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          backgroundColor: '#FFFFFF',
          overflow: 'hidden'
        }}
      >
        <iframe 
          src="https://my.spline.design/cutecomputerfollowcursor-kTcoNww7cfTrcF5RhfaBxgaq/" 
          frameBorder="0" 
          width="100%" 
          height="100%" 
          title="JobGen 3D Interactive Mascot"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block'
          }}
        />
      </div>

      {/* ================= SPLINE FADE OVERLAY TOWARDS INPUT DETAILS ================= */}
      {/* Soft gradient fade that seamlessly transitions the 3D scene towards the white input card */}
      <div 
        className="login-spline-fade"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          pointerEvents: 'none',
          background: 'linear-gradient(90deg, transparent 0%, transparent 35%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.75) 68%, rgba(255, 255, 255, 0.95) 85%, #FFFFFF 98%)'
        }}
      />

      {/* Floating Top-Left Brand & Interactive Indicator */}
      <div 
        style={{
          position: 'absolute',
          top: '28px',
          left: '32px',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          pointerEvents: 'none'
        }}
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '999px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)'
          }}
        >
          <div 
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 8px #10B981'
            }}
          />
          <span style={{ fontSize: '12px', fontWeight: 650, color: '#334155', letterSpacing: '-0.01em' }}>
            Interactive 3D Workspace
          </span>
        </div>
      </div>

      {/* Floating Bottom Guidance Pill */}
      <div 
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '32px',
          zIndex: 10,
          pointerEvents: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          padding: '6px 14px',
          borderRadius: '999px',
          border: '1px solid rgba(226, 232, 240, 0.85)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}
      >
        <MousePointerClick size={13} color="#64748B" />
        <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 550 }}>
          Move your cursor around to interact with the computer
        </span>
      </div>

      {/* ================= FLOATING LOGIN CARD CONTAINER ================= */}
      <div 
        className="login-card-container"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: 'clamp(28px, 6vw, 110px)',
          paddingLeft: '24px',
          pointerEvents: 'none', // Allows cursor tracking across all surrounding space directly into Spline
          boxSizing: 'border-box'
        }}
      >
        {/* Compact, Elevated Floating Glass Card */}
        <div 
          style={{
            pointerEvents: 'auto', // Card itself captures clicks & typing
            width: '415px',
            maxWidth: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            borderRadius: '24px',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            boxShadow: '0 25px 60px -12px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.9), 0 8px 24px -4px rgba(15, 23, 42, 0.04)',
            padding: '28px 30px',
            animation: 'cardPopIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            boxSizing: 'border-box'
          }}
        >
          {/* Card Brand Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
            <div 
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '11px',
                background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(26, 83, 207, 0.28)',
                color: '#FFFFFF'
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span 
                  style={{ 
                    fontSize: '18px', 
                    fontWeight: 800, 
                    color: '#090C15', 
                    letterSpacing: '-0.03em' 
                  }}
                >
                  JobGen<span style={{ color: '#1A53CF' }}>.ai</span>
                </span>
                <span 
                  style={{
                    fontSize: '10px',
                    fontWeight: 750,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    backgroundColor: '#EFF6FF',
                    color: '#1A53CF',
                    padding: '2px 7px',
                    borderRadius: '999px',
                    border: '1px solid rgba(37, 99, 235, 0.2)'
                  }}
                >
                  Candidates
                </span>
              </div>
              <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 500, marginTop: '1px' }}>
                Autonomous Career Agent
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 
            style={{ 
              fontSize: '22px', 
              fontWeight: 800, 
              color: '#090C15', 
              letterSpacing: '-0.025em',
              lineHeight: 1.25,
              marginBottom: '6px'
            }}
          >
            Candidate Sign In
          </h1>
          <p 
            style={{ 
              fontSize: '13px', 
              color: '#64748B', 
              lineHeight: 1.45, 
              marginBottom: '16px' 
            }}
          >
            Access your curated job pipeline, resume studio, and AI copilot.
          </p>

          {/* Hardcoded Credentials Helper Card */}
          <div 
            style={{
              backgroundColor: 'rgba(248, 250, 252, 0.85)',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '10px 12px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
              <div 
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '7px',
                  backgroundColor: '#EFF6FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1A53CF',
                  flexShrink: 0
                }}
              >
                <ShieldCheck size={15} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A' }}>
                  Demo Credentials:
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  ID: <code style={{ color: '#1A53CF', fontWeight: 700 }}>Candidate</code> &bull; Pass: <code style={{ color: '#1A53CF', fontWeight: 700 }}>Jobgen</code>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleQuickFill}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                padding: '5px 10px',
                borderRadius: '7px',
                fontSize: '11px',
                fontWeight: 650,
                color: '#1E293B',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EFF6FF';
                e.currentTarget.style.borderColor = '#93C5FD';
                e.currentTarget.style.color = '#1A53CF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.borderColor = '#CBD5E1';
                e.currentTarget.style.color = '#1E293B';
              }}
            >
              Auto-fill
            </button>
          </div>

          {/* Error Message Banner */}
          {errorMessage && (
            <div 
              style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: '10px',
                padding: '9px 12px',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#DC2626',
                fontSize: '12px',
                fontWeight: 600,
                animation: 'shake 0.3s ease'
              }}
            >
              <AlertCircle size={15} color="#DC2626" style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Username / Candidate ID */}
            <div>
              <label 
                style={{ 
                  display: 'block', 
                  fontSize: '12.5px', 
                  fontWeight: 650, 
                  color: '#0F172A', 
                  marginBottom: '5px' 
                }}
              >
                Candidate Username / ID
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div 
                  style={{ 
                    position: 'absolute', 
                    left: '12px', 
                    color: '#94A3B8', 
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <User size={16} />
                </div>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder="Enter 'Candidate'"
                  required
                  style={{
                    width: '100%',
                    height: '42px',
                    padding: '0 12px 0 38px',
                    borderRadius: '9px',
                    border: '1.5px solid #E2E8F0',
                    backgroundColor: '#FFFFFF',
                    color: '#090C15',
                    fontSize: '13.5px',
                    fontWeight: 500,
                    outline: 'none',
                    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2563EB';
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E2E8F0';
                    e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.02)';
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label 
                style={{ 
                  display: 'block', 
                  fontSize: '12.5px', 
                  fontWeight: 650, 
                  color: '#0F172A', 
                  marginBottom: '5px' 
                }}
              >
                Password
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div 
                  style={{ 
                    position: 'absolute', 
                    left: '12px', 
                    color: '#94A3B8', 
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Lock size={16} />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter 'Jobgen'"
                  required
                  style={{
                    width: '100%',
                    height: '42px',
                    padding: '0 38px 0 38px',
                    borderRadius: '9px',
                    border: '1.5px solid #E2E8F0',
                    backgroundColor: '#FFFFFF',
                    color: '#090C15',
                    fontSize: '13.5px',
                    fontWeight: 500,
                    outline: 'none',
                    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2563EB';
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E2E8F0';
                    e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.02)';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    background: 'none',
                    border: 'none',
                    color: '#94A3B8',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px'
                  }}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Help */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                fontSize: '12px'
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', userSelect: 'none' }}>
                <input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)} 
                  style={{ accentColor: '#1A53CF', width: '14px', height: '14px', cursor: 'pointer' }}
                />
                <span style={{ color: '#475569', fontWeight: 500 }}>Remember for 30 days</span>
              </label>

              <button 
                type="button" 
                onClick={handleQuickFill}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#1A53CF', 
                  fontWeight: 650, 
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: '12px'
                }}
              >
                Forgot credentials?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              style={{
                marginTop: '4px',
                height: '44px',
                borderRadius: '10px',
                background: isSuccess 
                  ? '#10B981' 
                  : 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                cursor: (isLoading || isSuccess) ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: isSuccess 
                  ? '0 6px 18px rgba(16, 185, 129, 0.4)' 
                  : '0 6px 18px rgba(37, 99, 235, 0.35)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                if (!isLoading && !isSuccess) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 8px 22px rgba(37, 99, 235, 0.45)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading && !isSuccess) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(37, 99, 235, 0.35)';
                }
              }}
            >
              {isSuccess ? (
                <>
                  <CheckCircle2 size={17} />
                  <span>Access Granted! Loading...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Candidate Portal</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div 
            style={{ 
              marginTop: '20px', 
              paddingTop: '14px', 
              borderTop: '1px solid rgba(241, 245, 249, 0.9)',
              textAlign: 'center',
              fontSize: '11px',
              color: '#94A3B8'
            }}
          >
            Secured by JobGen AI Identity &bull; Privacy Protected
          </div>
        </div>
      </div>
    </div>
  );
}
