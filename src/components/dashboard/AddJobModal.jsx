import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Briefcase, 
  Building2, 
  Link2, 
  FileText, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export default function AddJobModal({ isOpen, onClose, onAddJob }) {
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [stage, setStage] = useState('saved');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role.trim() || !company.trim()) {
      setErrorMsg('Please enter both the Job Role and Company.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const newJob = {
      id: 'job-' + Date.now(),
      title: role.trim(),
      company: company.trim(),
      url: url.trim(),
      description: description.trim(),
      salary: salary.trim() || '$180k - $210k AUD',
      location: location.trim() || 'Sydney (Hybrid)',
      score: 93, // Initial estimated ATS score based on profile match
      source: url.includes('linkedin') ? 'LinkedIn' : (url.includes('seek') ? 'Seek' : 'Direct Add'),
      date: 'Added just now',
      tags: ['Custom Tracked', 'Direct Add'],
      stage: stage || 'saved'
    };

    if (onAddJob) {
      onAddJob(newJob, stage);
    }

    // Reset and close
    setTimeout(() => {
      setIsSubmitting(false);
      setRole('');
      setCompany('');
      setUrl('');
      setDescription('');
      setSalary('');
      setLocation('');
      onClose();
    }, 250);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(9, 12, 21, 0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '560px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid rgba(226, 232, 240, 0.95)',
          boxShadow: '0 25px 70px -10px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.8)',
          padding: '28px',
          boxSizing: 'border-box',
          position: 'relative',
          maxHeight: '92vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #F1F5F9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div 
              style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '12px', 
                background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(26, 83, 207, 0.3)'
              }}
            >
              <Plus size={20} color="#FFFFFF" strokeWidth={2.6} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#090C15', margin: 0, letterSpacing: '-0.02em', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                Add New Job Opportunity
              </h3>
              <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0 0' }}>
                Track roles and let Emma optimize your tailored resume.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#F1F5F9',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              transition: 'background-color 0.15s ease'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {errorMsg && (
          <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#B91C1C', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 700, marginBottom: '16px' }}>
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Row 1: Job Role & Company */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#090C15', marginBottom: '6px' }}>
                Job Role <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Briefcase size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  placeholder="e.g. Lead Product Manager"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    borderRadius: '10px',
                    border: '1.5px solid #E2E8F0',
                    fontSize: '13px',
                    color: '#090C15',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.18s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#1A53CF'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#090C15', marginBottom: '6px' }}>
                Company <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Building2 size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  placeholder="e.g. Canva, Atlassian"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    borderRadius: '10px',
                    border: '1.5px solid #E2E8F0',
                    fontSize: '13px',
                    color: '#090C15',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.18s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#1A53CF'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
                  required
                />
              </div>
            </div>
          </div>

          {/* Row 2: Job URL */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#090C15', marginBottom: '6px' }}>
              Job URL
            </label>
            <div style={{ position: 'relative' }}>
              <Link2 size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              <input
                type="url"
                placeholder="https://www.linkedin.com/jobs/view/... or Seek / Indeed link"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 36px',
                  borderRadius: '10px',
                  border: '1.5px solid #E2E8F0',
                  fontSize: '13px',
                  color: '#090C15',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.18s ease'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#1A53CF'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
              />
            </div>
          </div>

          {/* Row 3: Initial Stage Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#090C15', marginBottom: '6px' }}>
              Initial Stage in Workspace
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {[
                { id: 'saved', label: '1. Saved' },
                { id: 'applied', label: '2. Applied' },
                { id: 'interviewing', label: '3. Interview' },
                { id: 'offers', label: '4. Offer' }
              ].map(st => (
                <button
                  type="button"
                  key={st.id}
                  onClick={() => setStage(st.id)}
                  style={{
                    padding: '8px 4px',
                    borderRadius: '8px',
                    border: stage === st.id ? '1.5px solid #1A53CF' : '1px solid #E2E8F0',
                    backgroundColor: stage === st.id ? '#EFF6FF' : '#F8FAFC',
                    color: stage === st.id ? '#1A53CF' : '#475569',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Row 4: Job Description */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 800, color: '#090C15' }}>
                Job Description Section
              </label>
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>
                Paste role responsibilities or full JD
              </span>
            </div>
            <textarea
              rows={5}
              placeholder="Paste the job description, core responsibilities, key requirements, or qualifications here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: '1.5px solid #E2E8F0',
                fontSize: '12.5px',
                color: '#090C15',
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
                resize: 'vertical',
                lineHeight: 1.5,
                transition: 'border-color 0.18s ease'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#1A53CF'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
            />
          </div>

          {/* Submit Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '9px 18px',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
                color: '#475569',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 22px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
                color: '#FFFFFF',
                fontSize: '12.5px',
                fontWeight: 800,
                border: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 14px rgba(26, 83, 207, 0.35)',
                opacity: isSubmitting ? 0.7 : 1,
                transition: 'transform 0.15s ease'
              }}
            >
              <Plus size={15} strokeWidth={2.6} />
              <span>{isSubmitting ? 'Adding...' : 'Add Job to Pipeline'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
