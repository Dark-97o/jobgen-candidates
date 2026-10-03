import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { RollingText } from '@/components/v1/skiper27';
import { CrowdCanvas } from '@/components/v1/skiper39';

// Authentic Official 4-Color Google Logo SVG
function GoogleLogo({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
    </svg>
  );
}

// Authentic Official 4-Color Chrome Wheel SVG
function ChromeLogo({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path fill="#EA4335" d="M12 0C6.91 0 2.55 3.16.73 7.64l5.3 9.18L10.3 9H23.3C21.6 3.67 17.2 0 12 0z"/>
      <path fill="#4285F4" d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6z"/>
      <path fill="#FBBC05" d="M23.3 9H10.3l-4.27 7.4 3.7 6.4C10.45 22.92 11.21 23 12 23c6.07 0 11.1-4.5 11.9-10.42L23.3 9z"/>
      <path fill="#34A853" d="M.73 7.64A12 12 0 0 0 12 24l4.27-7.4-4.27-7.4H.73z"/>
      <circle cx="12" cy="12" r="4.2" fill="#FFFFFF"/>
      <circle cx="12" cy="12" r="3.2" fill="#1A73E8"/>
    </svg>
  );
}

const CURATED_STORIES = [
  {
    id: 'marcus-t',
    quote: "I used to spend 3 hours tailoring my resume for each job. With JobGen.AI it takes 5 minutes. Got 4 interviews in my first week.",
    name: "Marcus T.",
    role: "Software Engineer → landed at Atlassian",
    source: 'google',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    initials: "MT",
    accent: "#1A53CF"
  },
  {
    id: 'daniel-bae',
    quote: "This is the best, works perfectly. Helped me be much more productive",
    name: "Daniel Bae",
    role: "Verified Chrome User · Feb 23, 2026",
    source: 'chrome',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    initials: "DB",
    accent: "#0284C7"
  },
  {
    id: 'priya-m',
    quote: "Every other tool felt like it was upselling me. JobGen.AI actually works on the free tier. Then I upgraded because I wanted to, not because I had to.",
    name: "Priya M.",
    role: "Product Manager → landed at Canva",
    source: 'google',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    initials: "PM",
    accent: "#0284C7"
  },
  {
    id: 'janak-m',
    quote: "JobGen.AI is a genuinely helpful job search assistant that makes applying so much faster and more organized. It saves roles in one click, tailors applications, and keeps everything tracked in one place. The interface is clean and intuitive, and it removes a lot of the repetitive work.\n\nMade my search so much easier & efficient.",
    name: "Janak M",
    role: "Chrome Web Store · Dec 18, 2025",
    source: 'chrome',
    initials: "JM",
    accent: "#0D9488"
  },
  {
    id: 'james-k',
    quote: "The ATS score feature alone is worth it. I could see exactly why my resume was getting rejected and fix it in seconds.",
    name: "James K.",
    role: "Data Analyst → landed at ANZ Bank",
    source: 'google',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    initials: "JK",
    accent: "#2563EB"
  },
  {
    id: 'kulbir-kaur',
    quote: "Been using JobGen.AI since the beta - and I'm hooked! It saves me 10+ hours a week and tripled my interview hit rate. Feels like having an AI job coach + recruiter in one. The \"auto-apply\" feature is genius!",
    name: "Kulbir Kaur",
    role: "Chrome Web Store · Nov 2, 2025",
    source: 'chrome',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    initials: "KK",
    accent: "#D97706"
  },
  {
    id: 'sophie-r',
    quote: "Applied to 20 roles in a weekend. Previously that would have taken me two weeks. The interview prep coach is genuinely scary good.",
    name: "Sophie R.",
    role: "UX Designer → landed at Afterpay",
    source: 'google',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    initials: "SR",
    accent: "#7C3AED"
  },
  {
    id: 'akash-shelly',
    quote: "Made job hunting so much easier! JobGen.AI completely simplified my job search. I can now save jobs directly from LinkedIn, Seek, and Indeed with one click - no more juggling multiple tabs or messy spreadsheets. It automatically tailors my resume to each job description and even tracks all my applications in one place.",
    name: "Akash Shelly",
    role: "Chrome Web Store · Oct 25, 2025",
    source: 'chrome',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    initials: "AS",
    accent: "#4F46E5"
  },
  {
    id: 'daniel-w',
    quote: "JobGen.AI turned my rejection streak around. The keyword matching showed me exactly what was missing from every resume I had sent.",
    name: "Daniel W.",
    role: "Marketing Manager → landed at REA Group",
    source: 'google',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    initials: "DW",
    accent: "#0891B2"
  },
  {
    id: 'madhu',
    quote: "JobGen.AI has simplified my job search with a seamless one-click system to save, review, and apply for jobs.",
    name: "Madhu",
    role: "Chrome Web Store · Oct 20, 2025",
    source: 'chrome',
    initials: "M",
    accent: "#0284C7"
  },
  {
    id: 'aisha-n',
    quote: "The cover letter generator saves me at least an hour per application. Every letter feels genuinely tailored, not templated.",
    name: "Aisha N.",
    role: "Business Analyst → landed at Deloitte",
    source: 'google',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
    initials: "AN",
    accent: "#BE185D"
  },
  {
    id: 'gautam-malik',
    quote: "JobGen.AI helped me create a tailored resume in minutes, match it perfectly to each job, and even track my applications - all in one place. The AI suggestions felt personal and accurate, not generic like other tools. You can tell it's built by people who really understand the job search journey.\n\nHighly recommend it for anyone who wants to save time, stand out, and feel confident while applying for jobs.",
    name: "Gautam Malik",
    role: "Chrome Web Store · Oct 17, 2025",
    source: 'chrome',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    initials: "GM",
    accent: "#1A53CF"
  }
];

export default function ApplicationsToOffersSection() {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_COUNT = 6;
  const visibleStories = showAll ? CURATED_STORIES : CURATED_STORIES.slice(0, INITIAL_COUNT);
  const remainingCount = CURATED_STORIES.length - visibleStories.length;

  return (
    <section 
      id="testimonials" 
      className="landing-testimonials-section"
      style={{
        padding: '80px 0 90px 0',
        backgroundColor: '#090D16',
        color: '#FFFFFF',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Dark Ambient Radial Gradients */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `
            radial-gradient(circle at 15% 20%, rgba(30, 58, 138, 0.35) 0%, transparent 45%),
            radial-gradient(circle at 85% 80%, rgba(14, 116, 144, 0.25) 0%, transparent 45%)
          `,
          zIndex: 0
        }}
      />

      {/* Animated Walking Crowd Simulation (Skiper39) as Background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'invert(1) opacity(0.24)',
          maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.7) 65%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.7) 65%, transparent 100%)'
        }}
      >
        <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 48px auto' }}>
          <h2
            style={{
              fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: 'clamp(32px, 4.2vw, 50px)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: 1.12,
              color: '#FFFFFF',
              marginBottom: '14px'
            }}
          >
            <RollingText text="From applications to " />
            <RollingText text="offers." style={{ color: '#38BDF8' }} />
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: '#94A3B8',
              lineHeight: 1.6,
              margin: '0 auto'
            }}
          >
            See how job seekers across industries and career stages are moving forward with JobGen.
          </p>
        </div>

        {/* Masonry / Grid */}
        <div 
          style={{
            columnCount: 3,
            columnGap: '16px',
            maxWidth: '1140px',
            margin: '0 auto'
          }}
          className="offers-masonry"
        >
          {visibleStories.map((story) => (
            <div
              key={story.id}
              style={{
                breakInside: 'avoid',
                WebkitColumnBreakInside: 'avoid',
                marginBottom: '16px',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderTop: '1px solid rgba(255, 255, 255, 0.22)',
                padding: '24px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              className="offers-card"
            >
              {/* Official Review Source Badges */}
              {story.source === 'google' && (
                <div 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '4px 11px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    color: '#F1F5F9',
                    fontSize: '11px',
                    fontWeight: 600,
                    marginBottom: '14px',
                    width: 'fit-content'
                  }}
                >
                  <GoogleLogo size={13} />
                  <span>Google Review</span>
                </div>
              )}

              {story.source === 'chrome' && (
                <div 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '4px 11px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    color: '#F1F5F9',
                    fontSize: '11px',
                    fontWeight: 600,
                    marginBottom: '14px',
                    width: 'fit-content'
                  }}
                >
                  <ChromeLogo size={13} />
                  <span>Chrome Web Store</span>
                </div>
              )}

              {/* 5 Stars */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className="fill-amber-400 text-amber-400" 
                    style={{ fill: '#F59E0B', color: '#F59E0B' }} 
                  />
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: '1.68',
                  color: '#E2E8F0',
                  marginBottom: '18px',
                  whiteSpace: 'pre-line'
                }}
              >
                “{story.quote}”
              </p>

              {/* Author footer with Person Profile Photo or Initials */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  marginTop: 'auto'
                }}
              >
                {story.avatar ? (
                  <img
                    src={story.avatar}
                    alt={story.name}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1.5px solid rgba(255, 255, 255, 0.22)',
                      flexShrink: 0
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: story.accent,
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.04em',
                      flexShrink: 0
                    }}
                  >
                    {story.initials}
                  </div>
                )}
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#FFFFFF' }}>
                    {story.name}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#94A3B8', marginTop: '1px' }}>
                    {story.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Read More button */}
        {remainingCount > 0 && (
          <div style={{ marginTop: '36px', textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => setShowAll(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#38BDF8';
                e.currentTarget.style.color = '#38BDF8';
                e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              Read {remainingCount} more stories
            </button>
          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 980px) {
          .offers-masonry {
            column-count: 2 !important;
          }
        }
        @media (max-width: 640px) {
          .offers-masonry {
            column-count: 1 !important;
          }
        }
        .offers-card:hover {
          transform: translateY(-3px);
          border-color: rgba(56, 189, 248, 0.4) !important;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45) !important;
        }
      `}</style>
    </section>
  );
}
