import React, { useState, useRef, useEffect } from 'react';
import { Application } from '@splinetool/runtime';
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

export default function LoginView({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [useIframeFallback, setUseIframeFallback] = useState(false);
  
  const canvasRef = useRef(null);
  const splineAppRef = useRef(null);
  const cardRef = useRef(null);

  // Initialize native Spline runtime on the canvas
  useEffect(() => {
    let isMounted = true;
    let app = null;

    async function initSpline() {
      if (!canvasRef.current) return;
      try {
        app = new Application(canvasRef.current);
        splineAppRef.current = app;
        
        await app.load('https://my.spline.design/cutecomputerfollowcursor-kTcoNww7cfTrcF5RhfaBxgaq/scene.splinecode');
        
        if (isMounted) {
          setSplineLoaded(true);
        }
      } catch (err) {
        console.warn('Spline runtime failed to initialize, falling back to iframe:', err);
        if (isMounted) {
          setUseIframeFallback(true);
        }
      }
    }

    initSpline();

    return () => {
      isMounted = false;
      if (splineAppRef.current) {
        try {
          if (typeof splineAppRef.current.dispose === 'function') {
            splineAppRef.current.dispose();
          }
        } catch (e) {
          // ignore cleanup errors
        }
        splineAppRef.current = null;
      }
    };
  }, []);

  // Forward pointer / mouse coordinates to Spline canvas so interactivity works across inputs and card
  const forwardPointerToSpline = (clientX, clientY) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    
    const eventInit = {
      clientX,
      clientY,
      screenX: clientX,
      screenY: clientY,
      bubbles: true,
      cancelable: true,
      view: window
    };

    try {
      canvas.dispatchEvent(new PointerEvent('pointermove', eventInit));
      canvas.dispatchEvent(new MouseEvent('mousemove', eventInit));
    } catch (e) {
      // ignore
    }
  };

  // When user hovers over a text field or element
  const handleFieldHover = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    forwardPointerToSpline(rect.left + rect.width * 0.25, rect.top + rect.height * 0.5);
  };

  // When user types in username or password: computer actively reacts to keystrokes!
  const handleFieldTyping = (e, fieldType) => {
    const val = e.target.value;
    if (fieldType === 'user') {
      setUsername(val);
    } else {
      setPassword(val);
    }

    // Micro-jitter to simulate looking right at the typing cursor in the field
    const rect = e.target.getBoundingClientRect();
    const jitterX = (Math.random() - 0.5) * 16;
    const jitterY = (Math.random() - 0.5) * 10;
    forwardPointerToSpline(
      rect.left + Math.min(rect.width * 0.8, 50 + val.length * 7) + jitterX, 
      rect.top + rect.height * 0.5 + jitterY
    );
  };

  // When input is focused, computer swivels towards the field
  const handleFieldFocus = (e) => {
    const rect = e.target.getBoundingClientRect();
    forwardPointerToSpline(rect.left + rect.width * 0.3, rect.top + rect.height * 0.5);
  };

  // Global mouse move across the card: lets the spline follow smoothly
  const handleCardMouseMove = (e) => {
    forwardPointerToSpline(e.clientX, e.clientY);
  };

  const handleQuickFill = () => {
    setUsername('Candidate');
    setPassword('Jobgen');
    setErrorMessage('');
    // Look at the auto-fill button
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      forwardPointerToSpline(rect.left + rect.width * 0.75, rect.top + rect.height * 0.35);
    }
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
        backgroundColor: '#FFFFFF', // Clean pure white background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        color: '#090C15',
        overflow: 'hidden',
        padding: '24px',
        boxSizing: 'border-box'
      }}
      onMouseMove={(e) => forwardPointerToSpline(e.clientX, e.clientY)}
    >
      <style>{`
        #spline-watermark,
        .spline-watermark,
        a[href*="spline.design"],
        div[style*="spline.design"],
        #spline-logo {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
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
          .spline-bg-layer {
            position: relative !important;
            width: 100% !important;
            height: 280px !important;
            mask-image: none !important;
            -webkit-mask-image: none !important;
          }
          .form-foreground-layer {
            flex-direction: column !important;
          }
          .form-right-pane {
            padding: 24px 20px !important;
          }
        }
      `}</style>

      {/* ================= ONE UNIFIED FLOATING CARD ================= */}
      <div 
        ref={cardRef}
        className="unified-login-card"
        onMouseMove={handleCardMouseMove}
        style={{
          width: 'min(1040px, 94vw)',
          height: 'min(590px, 90vh)',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 20px 60px -15px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(226, 232, 240, 0.7)',
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
          animation: 'cardPop 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          boxSizing: 'border-box'
        }}
      >
        {/* ================= 1. SPLINE AS BACKGROUND (FADES TOWARDS INPUT AREA) ================= */}
        <div 
          className="spline-bg-layer"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '74%',
            height: '100%',
            backgroundColor: '#FFFFFF',
            zIndex: 1,
            overflow: 'hidden',
            // Fade out smoothly towards the right input area so no hard cutoff exists
            maskImage: 'linear-gradient(to right, black 0%, black 36%, rgba(0, 0, 0, 0.75) 50%, rgba(0, 0, 0, 0.2) 70%, transparent 92%)',
            WebkitMaskImage: 'linear-gradient(to right, black 0%, black 36%, rgba(0, 0, 0, 0.75) 50%, rgba(0, 0, 0, 0.2) 70%, transparent 92%)'
          }}
        >
          {/* Native Spline WebGL Canvas */}
          {!useIframeFallback ? (
            <canvas 
              ref={canvasRef}
              style={{
                width: '100%',
                height: 'calc(100% + 45px)',
                marginBottom: '-45px',
                display: 'block',
                outline: 'none',
                opacity: splineLoaded ? 1 : 0.85,
                transition: 'opacity 0.3s ease'
              }}
            />
          ) : (
            /* Fallback iframe embed pushed down slightly to clip any bottom watermark */
            <iframe 
              src="https://my.spline.design/cutecomputerfollowcursor-kTcoNww7cfTrcF5RhfaBxgaq/" 
              frameBorder="0" 
              width="100%" 
              height="calc(100% + 45px)" 
              title="JobGen 3D Interactive Mascot"
              style={{
                width: '100%',
                height: 'calc(100% + 45px)',
                marginBottom: '-45px',
                border: 'none',
                display: 'block'
              }}
            />
          )}
        </div>

        {/* ================= 2. SOFT WHITE OVERLAY ON RIGHT HALF ================= */}
        {/* Guarantees the input area has crystal-clear contrast and seamless white background */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: '58%',
            zIndex: 2,
            pointerEvents: 'none',
            background: 'linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.65) 18%, #FFFFFF 42%, #FFFFFF 100%)'
          }}
        />

        {/* ================= 3. FOREGROUND INTERACTIVE CONTENT ================= */}
        <div 
          className="form-foreground-layer"
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            height: '100%',
            display: 'flex',
            pointerEvents: 'none' // Allows mouse movements over empty spaces to reach Spline
          }}
        >
          {/* Left area allows direct cursor interaction with the 3D mascot */}
          <div 
            style={{
              flex: '1.05',
              minWidth: 0,
              height: '100%',
              pointerEvents: 'auto'
            }}
          />

          {/* Right Area: Login details and input fields */}
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
              pointerEvents: 'auto'
            }}
          >
            <div style={{ width: '100%', maxWidth: '380px', margin: '0 auto' }}>
              {/* Correct Company Logo & Name: JobGen.AI */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
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

              {/* Heading */}
              <h1 
                style={{ 
                  fontSize: '22px', 
                  fontWeight: 800, 
                  color: '#090C15', 
                  letterSpacing: '-0.025em',
                  lineHeight: 1.25,
                  marginBottom: '5px'
                }}
              >
                Candidate Sign In
              </h1>
              <p 
                style={{ 
                  fontSize: '12.5px', 
                  color: '#64748B', 
                  lineHeight: 1.45, 
                  marginBottom: '16px' 
                }}
              >
                Sign in with your Candidate credentials to access your autonomous pipeline.
              </p>

              {/* Demo Credentials Helper Banner */}
              <div 
                onMouseEnter={handleFieldHover}
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
                    handleFieldHover(e);
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
                <div onMouseEnter={handleFieldHover}>
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
                      onChange={(e) => handleFieldTyping(e, 'user')} 
                      onFocus={handleFieldFocus}
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
                        handleFieldFocus(e);
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#E2E8F0';
                        e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.02)';
                      }}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div onMouseEnter={handleFieldHover}>
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
                      onChange={(e) => handleFieldTyping(e, 'pass')} 
                      onFocus={handleFieldFocus}
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
                        handleFieldFocus(e);
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
                  onMouseEnter={handleFieldHover}
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
                  onMouseEnterCapture={(e) => {
                    if (!isLoading && !isSuccess) {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 8px 22px rgba(37, 99, 235, 0.45)';
                    }
                    handleFieldHover(e);
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
    </div>
  );
}
