import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export default function LoginView({ onLogin, onBackToLanding }) {
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
      style={{
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1A53CF 0%, #1A53CF 50%, #FFFFFF 50%, #FFFFFF 100%)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        color: '#090C15',
        overflow: 'hidden',
        padding: '24px',
        boxSizing: 'border-box'
      }}
    >
      {/* Back Button */}
      {onBackToLanding && (
        <button
          onClick={onBackToLanding}
          style={{
            position: 'absolute',
            top: '28px',
            right: '36px',
            zIndex: 100,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            borderRadius: '999px',
            padding: '8px 20px',
            fontSize: '13px',
            fontWeight: 700,
            color: '#1A53CF',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(12px)',
            transition: 'transform 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(26, 83, 207, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.92)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
          }}
        >
          <span>Back</span>
        </button>
      )}

      {/* 1. Blue Side Top Corner: Vertical Text "Candidates" in Crisp White */}
      <div
        className="login-corner-text"
        style={{
          position: 'absolute',
          top: '36px',
          left: '38px',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          fontSize: 'clamp(34px, 4.2vw, 62px)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          color: '#FFFFFF',
          fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, -apple-system, sans-serif',
          lineHeight: 1,
          opacity: 0.95,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1,
        }}
      >
        Candidates
      </div>

      {/* 2. White Side Bottom Corner: Vertical Text "JobGen.AI" in Vibrant Brand Blue */}
      <div
        className="login-corner-text"
        style={{
          position: 'absolute',
          bottom: '36px',
          right: '38px',
          writingMode: 'vertical-rl',
          fontSize: 'clamp(34px, 4.2vw, 62px)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          color: '#1A53CF',
          fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, -apple-system, sans-serif',
          lineHeight: 1,
          opacity: 0.95,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1,
        }}
      >
        JobGen.AI
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        @keyframes cardPop {
          from { opacity: 0; transform: scale(0.97) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @media (max-width: 900px) {
          .unified-login-card {
            flex-direction: column !important;
            height: auto !important;
            max-height: 90vh !important;
            overflow-y: auto !important;
          }
          .login-image-pane {
            width: 100% !important;
            height: 260px !important;
            flex: none !important;
          }
          .login-cand-img {
            object-fit: cover !important;
          }
          .form-right-pane {
            padding: 24px 20px !important;
          }
        }
        @media (max-width: 820px) {
          .login-corner-text {
            display: none !important;
          }
        }
      `}</style>

      {/* ================= ONE UNIFIED FLOATING CARD ================= */}
      <div 
        className="unified-login-card"
        style={{
          width: 'min(1040px, 94vw)',
          height: 'min(590px, 90vh)',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 25px 70px -15px rgba(15, 23, 42, 0.22), 0 0 0 1px rgba(226, 232, 240, 0.8)',
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 5,
          animation: 'cardPop 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          boxSizing: 'border-box'
        }}
      >
        {/* ================= 1. LEFT PANE: SIGN IN IMAGE (/signimg.png) FADING TOWARDS RIGHT ================= */}
        <div 
          className="login-image-pane"
          style={{
            flex: '1.05',
            minWidth: 0,
            height: '100%',
            position: 'relative',
            backgroundColor: '#FFFFFF',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img 
            src="/signimg.jpg" 
            alt="JobGen Sign In" 
            className="login-cand-img"
            onError={(e) => {
              e.currentTarget.src = '/signimg.png';
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 15%',
              display: 'block'
            }}
          />
        </div>

        {/* ================= 2. RIGHT PANE: LOGIN FORM ================= */}
        <div 
          className="form-right-pane"
          style={{
            flex: '0.95',
            minWidth: 0,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '36px 42px',
            boxSizing: 'border-box',
            overflowY: 'auto',
            backgroundColor: '#FFFFFF'
          }}
        >
          <div style={{ width: '100%', maxWidth: '380px', margin: '0 auto' }}>
            {/* Correct Company Logo & Name: JobGen.AI (Right Aligned) */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginBottom: '18px' }}>
              <div 
                style={{
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <img 
                  src="/jobgen-logo.png" 
                  alt="JobGen.AI" 
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    objectFit: 'contain',
                    display: 'block'
                  }} 
                />
              </div>
              <span 
                style={{ 
                  fontFamily: 'var(--font-title, sans-serif)',
                  fontSize: '20px', 
                  fontWeight: 800, 
                  color: '#090C15', 
                  letterSpacing: '-0.025em',
                  lineHeight: 1
                }}
              >
                JobGen.AI
              </span>
            </div>

            {/* Heading (Right Aligned) */}
            <h1 
              style={{ 
                fontSize: '22px', 
                fontWeight: 800, 
                color: '#090C15', 
                letterSpacing: '-0.025em',
                lineHeight: 1.25,
                marginBottom: '18px',
                textAlign: 'right'
              }}
            >
              Candidate Sign In
            </h1>

            {/* Demo Credentials Helper Banner */}
            <div 
              style={{
                backgroundColor: 'rgba(248, 250, 252, 0.95)',
                backdropFilter: 'blur(8px)',
                border: '1px solid #E2E8F0',
                borderRadius: '11px',
                padding: '9px 12px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                <div 
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '7px',
                    backgroundColor: '#EFF6FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1A53CF',
                    flexShrink: 0
                  }}
                >
                  <ShieldCheck size={14} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#0F172A' }}>
                    Demo Credentials:
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '1px' }}>
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
                  padding: '5px 9px',
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

            {/* Error Message */}
            {errorMessage && (
              <div 
                style={{
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: '9px',
                  padding: '9px 12px',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#DC2626',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  animation: 'shake 0.3s ease'
                }}
              >
                <AlertCircle size={14} color="#DC2626" style={{ flexShrink: 0 }} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
              {/* Username Input */}
              <div>
                <label 
                  style={{ 
                    display: 'block', 
                    fontSize: '12px', 
                    fontWeight: 650, 
                    color: '#0F172A', 
                    marginBottom: '4px' 
                  }}
                >
                  Candidate Username / ID
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <div 
                    style={{ 
                      position: 'absolute', 
                      left: '11px', 
                      color: '#94A3B8', 
                      pointerEvents: 'none',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <User size={15} />
                  </div>
                  <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Enter 'Candidate'"
                    required
                    style={{
                      width: '100%',
                      height: '40px',
                      padding: '0 12px 0 36px',
                      borderRadius: '8px',
                      border: '1.5px solid #E2E8F0',
                      backgroundColor: '#FFFFFF',
                      color: '#090C15',
                      fontSize: '13px',
                      fontWeight: 500,
                      outline: 'none',
                      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
                      boxSizing: 'border-box'
                    }}
                    onFocusCapture={(e) => {
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

              {/* Password Input */}
              <div>
                <label 
                  style={{ 
                    display: 'block', 
                    fontSize: '12px', 
                    fontWeight: 650, 
                    color: '#0F172A', 
                    marginBottom: '4px' 
                  }}
                >
                  Password
                </label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <div 
                    style={{ 
                      position: 'absolute', 
                      left: '11px', 
                      color: '#94A3B8', 
                      pointerEvents: 'none',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Lock size={15} />
                  </div>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter 'Jobgen'"
                    required
                    style={{
                      width: '100%',
                      height: '40px',
                      padding: '0 36px 0 36px',
                      borderRadius: '8px',
                      border: '1.5px solid #E2E8F0',
                      backgroundColor: '#FFFFFF',
                      color: '#090C15',
                      fontSize: '13px',
                      fontWeight: 500,
                      outline: 'none',
                      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)',
                      boxSizing: 'border-box'
                    }}
                    onFocusCapture={(e) => {
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
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Help */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  fontSize: '11.5px'
                }}
              >
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', userSelect: 'none' }}>
                  <input 
                    type="checkbox" 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)} 
                    style={{ accentColor: '#1A53CF', width: '13px', height: '13px', cursor: 'pointer' }}
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
                    fontSize: '11.5px'
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
                  height: '42px',
                  borderRadius: '9px',
                  background: isSuccess 
                    ? '#10B981' 
                    : 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  cursor: (isLoading || isSuccess) ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '7px',
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
                    <CheckCircle2 size={16} />
                    <span>Access Granted! Loading...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Candidate Portal</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Footer note */}
            <div 
              style={{ 
                marginTop: '16px', 
                paddingTop: '12px', 
                borderTop: '1px solid #F1F5F9',
                textAlign: 'center',
                fontSize: '10.5px',
                color: '#94A3B8'
              }}
            >
              Secured by JobGen AI Identity &bull; Privacy Protected
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
