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
      className="login-root-container"
      style={{
        display: 'flex',
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#FFFFFF',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        color: '#090C15',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <style>{`
        @keyframes loginFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        @media (max-width: 900px) {
          .login-root-container {
            flex-direction: column !important;
            overflow-y: auto !important;
            height: auto !important;
          }
          .login-spline-pane {
            height: 380px !important;
            flex: none !important;
            border-right: none !important;
            border-bottom: 1px solid #F1F5F9 !important;
          }
          .login-form-pane {
            height: auto !important;
            flex: none !important;
            padding: 32px 20px !important;
          }
        }
      `}</style>

      {/* ================= LEFT HALF: SPLINE 3D MASCOT ================= */}
      <div 
        className="login-spline-pane"
        style={{
          flex: 1,
          minWidth: 0,
          height: '100vh',
          backgroundColor: '#FFFFFF',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRight: '1px solid #F1F5F9',
          overflow: 'hidden'
        }}
      >
        {/* Subtle decorative radial background glow behind 3D canvas */}
        <div 
          style={{
            position: 'absolute',
            width: '550px',
            height: '550px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, rgba(99, 102, 241, 0.05) 50%, transparent 75%)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        {/* Floating Top-Left Brand & Interactive Indicator */}
        <div 
          style={{
            position: 'absolute',
            top: '32px',
            left: '36px',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid #E2E8F0',
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

        {/* Spline 3D Embed Canvas */}
        <div 
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            zIndex: 1
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

        {/* Bottom subtle guidance pill */}
        <div 
          style={{
            position: 'absolute',
            bottom: '24px',
            zIndex: 10,
            pointerEvents: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            padding: '6px 16px',
            borderRadius: '999px',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <MousePointerClick size={13} color="#64748B" />
          <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 550 }}>
            Move your cursor across the screen to interact
          </span>
        </div>
      </div>

      {/* ================= RIGHT HALF: LOGIN THINGS ================= */}
      <div 
        className="login-form-pane"
        style={{
          flex: 1,
          minWidth: 0,
          height: '100vh',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 32px',
          overflowY: 'auto',
          position: 'relative'
        }}
      >
        <div 
          style={{
            width: '100%',
            maxWidth: '430px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Brand Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div 
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 18px rgba(26, 83, 207, 0.28)',
                color: '#FFFFFF'
              }}
            >
              <Sparkles size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span 
                  style={{ 
                    fontSize: '20px', 
                    fontWeight: 800, 
                    color: '#090C15', 
                    letterSpacing: '-0.03em' 
                  }}
                >
                  JobGen<span style={{ color: '#1A53CF' }}>.ai</span>
                </span>
                <span 
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 750,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    backgroundColor: '#EFF6FF',
                    color: '#1A53CF',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    border: '1px solid rgba(37, 99, 235, 0.2)'
                  }}
                >
                  Candidates
                </span>
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 500, marginTop: '1px' }}>
                Autonomous Career Agent
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 
            style={{ 
              fontSize: '26px', 
              fontWeight: 800, 
              color: '#090C15', 
              letterSpacing: '-0.025em',
              lineHeight: 1.25,
              marginBottom: '8px'
            }}
          >
            Welcome Back
          </h1>
          <p 
            style={{ 
              fontSize: '14px', 
              color: '#64748B', 
              lineHeight: 1.5, 
              marginBottom: '22px' 
            }}
          >
            Sign in with your candidate credentials to access your autonomous pipeline and AI copilot.
          </p>

          {/* Hardcoded Credentials Helper Card */}
          <div 
            style={{
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '12px 14px',
              marginBottom: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div 
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '8px',
                  backgroundColor: '#EFF6FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1A53CF',
                  flexShrink: 0
                }}
              >
                <ShieldCheck size={16} />
              </div>
              <div>
                <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#0F172A' }}>
                  Demo Access Credentials:
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '1px' }}>
                  ID: <code style={{ color: '#1A53CF', fontWeight: 700 }}>Candidate</code> &bull; Password: <code style={{ color: '#1A53CF', fontWeight: 700 }}>Jobgen</code>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleQuickFill}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                padding: '6px 11px',
                borderRadius: '8px',
                fontSize: '11.5px',
                fontWeight: 650,
                color: '#1E293B',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
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
                padding: '11px 14px',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#DC2626',
                fontSize: '12.5px',
                fontWeight: 600,
                animation: 'shake 0.3s ease'
              }}
            >
              <AlertCircle size={16} color="#DC2626" style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Username / Candidate ID */}
            <div>
              <label 
                style={{ 
                  display: 'block', 
                  fontSize: '13px', 
                  fontWeight: 650, 
                  color: '#0F172A', 
                  marginBottom: '6px' 
                }}
              >
                Candidate Username / ID
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div 
                  style={{ 
                    position: 'absolute', 
                    left: '14px', 
                    color: '#94A3B8', 
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <User size={17} />
                </div>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder="Enter 'Candidate'"
                  required
                  style={{
                    width: '100%',
                    height: '46px',
                    padding: '0 14px 0 42px',
                    borderRadius: '10px',
                    border: '1.5px solid #E2E8F0',
                    backgroundColor: '#FFFFFF',
                    color: '#090C15',
                    fontSize: '14px',
                    fontWeight: 500,
                    outline: 'none',
                    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)'
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
                  fontSize: '13px', 
                  fontWeight: 650, 
                  color: '#0F172A', 
                  marginBottom: '6px' 
                }}
              >
                Password
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div 
                  style={{ 
                    position: 'absolute', 
                    left: '14px', 
                    color: '#94A3B8', 
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Lock size={17} />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter 'Jobgen'"
                  required
                  style={{
                    width: '100%',
                    height: '46px',
                    padding: '0 42px 0 42px',
                    borderRadius: '10px',
                    border: '1.5px solid #E2E8F0',
                    backgroundColor: '#FFFFFF',
                    color: '#090C15',
                    fontSize: '14px',
                    fontWeight: 500,
                    outline: 'none',
                    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.02)'
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
                    right: '12px',
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
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Help */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                fontSize: '13px'
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', userSelect: 'none' }}>
                <input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)} 
                  style={{ accentColor: '#1A53CF', width: '15px', height: '15px', cursor: 'pointer' }}
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
                  fontWeight: 600, 
                  cursor: 'pointer',
                  padding: 0
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
                marginTop: '8px',
                height: '48px',
                borderRadius: '10px',
                background: isSuccess 
                  ? '#10B981' 
                  : 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '14.5px',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                cursor: (isLoading || isSuccess) ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: isSuccess 
                  ? '0 6px 20px rgba(16, 185, 129, 0.4)' 
                  : '0 6px 20px rgba(37, 99, 235, 0.35)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: 'translateY(0)'
              }}
              onMouseEnter={(e) => {
                if (!isLoading && !isSuccess) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 10px 24px rgba(37, 99, 235, 0.45)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading && !isSuccess) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.35)';
                }
              }}
            >
              {isSuccess ? (
                <>
                  <CheckCircle2 size={18} />
                  <span>Access Granted! Loading...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div 
            style={{ 
              marginTop: '36px', 
              paddingTop: '20px', 
              borderTop: '1px solid #F1F5F9',
              textAlign: 'center',
              fontSize: '12px',
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
