import React, { useState } from 'react';
import { Star } from 'lucide-react';

const CURATED_STORIES = [
  {
    id: 'marcus-t',
    quote: "I used to spend 3 hours tailoring my resume for each job. With JobGen.AI it takes 5 minutes. Got 4 interviews in my first week.",
    name: "Marcus T.",
    role: "Software Engineer → landed at Atlassian",
    initials: "MT",
    accent: "#1A53CF",
    isVerified: false
  },
  {
    id: 'daniel-bae',
    quote: "This is the best, works perfectly. Helped me be much more productive",
    name: "Daniel Bae",
    role: "Chrome Web Store · Feb 23, 2026",
    initials: "D",
    accent: "#0284C7",
    isVerified: true
  },
  {
    id: 'priya-m',
    quote: "Every other tool felt like it was upselling me. JobGen.AI actually works on the free tier. Then I upgraded because I wanted to, not because I had to.",
    name: "Priya M.",
    role: "Product Manager → landed at Canva",
    initials: "PM",
    accent: "#059669",
    isVerified: false
  },
  {
    id: 'janak-m',
    quote: "JobGen.AI is a genuinely helpful job search assistant that makes applying so much faster and more organized. It saves roles in one click, tailors applications, and keeps everything tracked in one place. The interface is clean and intuitive, and it removes a lot of the repetitive work.\n\nMade my search so much easier & efficient.",
    name: "Janak M",
    role: "Chrome Web Store · Dec 18, 2025",
    initials: "J",
    accent: "#10B981",
    isVerified: true
  },
  {
    id: 'james-k',
    quote: "The ATS score feature alone is worth it. I could see exactly why my resume was getting rejected and fix it in seconds.",
    name: "James K.",
    role: "Data Analyst → landed at ANZ Bank",
    initials: "JK",
    accent: "#D97706",
    isVerified: false
  },
  {
    id: 'kulbir-kaur',
    quote: "Been using JobGen.AI since the beta - and I'm hooked! It saves me 10+ hours a week and tripled my interview hit rate. Feels like having an AI job coach + recruiter in one. The \"auto-apply\" feature is genius!",
    name: "Kulbir Kaur",
    role: "Chrome Web Store · Nov 2, 2025",
    initials: "K",
    accent: "#D97706",
    isVerified: true
  },
  {
    id: 'sophie-r',
    quote: "Applied to 20 roles in a weekend. Previously that would have taken me two weeks. The interview prep coach is genuinely scary good.",
    name: "Sophie R.",
    role: "UX Designer → landed at Afterpay",
    initials: "SR",
    accent: "#7C3AED",
    isVerified: false
  },
  {
    id: 'akash-shelly',
    quote: "Made job hunting so much easier! JobGen.AI completely simplified my job search. I can now save jobs directly from LinkedIn, Seek, and Indeed with one click - no more juggling multiple tabs or messy spreadsheets. It automatically tailors my resume to each job description and even tracks all my applications in one place.",
    name: "Akash Shelly",
    role: "Chrome Web Store · Oct 25, 2025",
    initials: "A",
    accent: "#7C3AED",
    isVerified: true
  },
  {
    id: 'daniel-w',
    quote: "JobGen.AI turned my rejection streak around. The keyword matching showed me exactly what was missing from every resume I had sent.",
    name: "Daniel W.",
    role: "Marketing Manager → landed at REA Group",
    initials: "DW",
    accent: "#0891B2",
    isVerified: false
  },
  {
    id: 'madhu',
    quote: "JobGen.AI has simplified my job search with a seamless one-click system to save, review, and apply for jobs.",
    name: "Madhu",
    role: "Chrome Web Store · Oct 20, 2025",
    initials: "M",
    accent: "#0891B2",
    isVerified: true
  },
  {
    id: 'aisha-n',
    quote: "The cover letter generator saves me at least an hour per application. Every letter feels genuinely tailored, not templated.",
    name: "Aisha N.",
    role: "Business Analyst → landed at Deloitte",
    initials: "AN",
    accent: "#BE185D",
    isVerified: false
  },
  {
    id: 'gautam-malik',
    quote: "JobGen.AI helped me create a tailored resume in minutes, match it perfectly to each job, and even track my applications - all in one place. The AI suggestions felt personal and accurate, not generic like other tools. You can tell it's built by people who really understand the job search journey.\n\nHighly recommend it for anyone who wants to save time, stand out, and feel confident while applying for jobs.",
    name: "Gautam Malik",
    role: "Chrome Web Store · Oct 17, 2025",
    initials: "G",
    accent: "#BE185D",
    isVerified: true
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
        backgroundColor: '#F8FAFC',
        borderTop: '1px solid #E2E8F0',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 48px auto' }}>
          <div 
            style={{
              display: 'inline-block',
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#1A53CF',
              marginBottom: '10px'
            }}
          >
            Success stories
          </div>
          <h2
            style={{
              fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: 'clamp(32px, 4.2vw, 50px)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: 1.12,
              color: '#0F172A',
              marginBottom: '14px'
            }}
          >
            From applications to <span style={{ color: '#1A53CF' }}>offers.</span>
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: '#64748B',
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
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                borderTop: story.isVerified ? '3px solid #0D9488' : '3px solid #E2E8F0',
                padding: '24px',
                boxShadow: '0 4px 18px rgba(15, 23, 42, 0.04)',
                transition: 'transform 0.22s ease, box-shadow 0.22s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              className="offers-card"
            >
              {story.isVerified && (
                <div 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '3px 9px',
                    borderRadius: '9999px',
                    backgroundColor: '#F0FDFA',
                    border: '1px solid #99F6E4',
                    color: '#0F766E',
                    fontSize: '10.5px',
                    fontWeight: 600,
                    marginBottom: '14px',
                    width: 'fit-content'
                  }}
                >
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#0D9488' }} />
                  Verified Chrome Web Store review
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
                  color: '#334155',
                  marginBottom: '18px',
                  whiteSpace: 'pre-line'
                }}
              >
                “{story.quote}”
              </p>

              {/* Author footer */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  paddingTop: '16px',
                  borderTop: '1px solid #F1F5F9',
                  marginTop: 'auto'
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: story.accent,
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    flexShrink: 0
                  }}
                >
                  {story.initials}
                </div>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>
                    {story.name}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '1px' }}>
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
                border: '1px solid #CBD5E1',
                backgroundColor: '#FFFFFF',
                color: '#0F172A',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1A53CF';
                e.currentTarget.style.color = '#1A53CF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#CBD5E1';
                e.currentTarget.style.color = '#0F172A';
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
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08) !important;
        }
      `}</style>
    </section>
  );
}
