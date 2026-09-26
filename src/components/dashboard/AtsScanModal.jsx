import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Zap 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AtsScanModal({ isOpen, onClose }) {
  const [scanning, setScanning] = useState(false);
  const [score, setScore] = useState(null);

  if (!isOpen) return null;

  const runSampleScan = () => {
    setScanning(true);
    setScore(null);
    let s = 40;
    const interval = setInterval(() => {
      s += 6;
      if (s >= 94) {
        s = 94;
        clearInterval(interval);
        setScanning(false);
        setScore(94);
        try {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore
        }
      }
    }, 80);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(9, 12, 21, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          maxWidth: '560px',
          width: '100%',
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '32px',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A53CF', margin: '0 auto 12px auto' }}>
            <Upload size={24} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#090C15' }}>Instant ATS Resume Scan</h3>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>
            Test your resume against real Greenhouse, Lever, and Workday ATS algorithms.
          </p>
        </div>

        {/* Dropzone Container */}
        <div 
          onClick={runSampleScan}
          style={{
            border: '2px dashed #93C5FD',
            borderRadius: '16px',
            background: '#F8FAFC',
            padding: '32px 20px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {scanning && (
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #1A53CF, #3B82F6, #10B981)',
                animation: 'pulse 1s infinite'
              }}
            />
          )}

          <FileText size={32} color="#1A53CF" style={{ margin: '0 auto 10px auto' }} />
          <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#090C15' }}>
            {scanning ? 'Scanning Resume Structure & Keywords...' : 'Click to Run Sample ATS Scan (Alexander_Wright.pdf)'}
          </h4>
          <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
            Supports PDF, DOCX (Up to 10MB)
          </p>
        </div>

        {/* Scan Results */}
        {score && (
          <div style={{ marginTop: '20px', padding: '16px', borderRadius: '14px', background: '#ECFDF5', border: '1px solid #A7F3D0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={18} color="#059669" />
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#065F46' }}>High ATS Compatibility Score</span>
              </div>
              <span style={{ fontSize: '20px', fontWeight: 900, color: '#059669', fontFamily: 'var(--font-mono)' }}>
                {score}%
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#065F46', lineHeight: 1.45 }}>
              ✓ Clean single-column layout passes all Greenhouse parsers.<br />
              ✓ High action verb density with 6 quantified achievement metrics.<br />
              ✓ Ready to submit on Canva, Atlassian, and Seek.
            </p>
          </div>
        )}

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            onClick={onClose}
            style={{ padding: '8px 16px', borderRadius: '8px', background: '#090C15', color: '#FFFFFF', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
