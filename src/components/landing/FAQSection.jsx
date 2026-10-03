import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: "How does Emma AI ensure zero hallucinations during interview prep?",
    answer: "Emma is strictly context-grounded in your verified career history, actual projects, and targeted employer rubrics. Rather than generating generic AI platitudes, Emma analyzes real hiring signals from companies like Atlassian, Google, and Canva to prepare you for actual questions you will encounter."
  },
  {
    question: "Will my tailored resume pass enterprise ATS screeners like Workday and Greenhouse?",
    answer: "Yes, 100%. JobGen resumes are engineered to adhere strictly to single-column, ATS-parseable standards. They contain zero multi-column layout glitches, nested tables, or unreadable vector glyphs that commonly trip up automated applicant tracking systems."
  },
  {
    question: "How does the 7-day all-access trial work?",
    answer: "You get full, unrestricted access to all JobGen Premium features — including unlimited AI tailored resumes, personalized career roadmap milestones, and live interview coaching with Emma. You can cancel anytime with a single click before the 7 days conclude with zero charge."
  },
  {
    question: "Can I export my generated resumes in both PDF and Word (DOCX) formats?",
    answer: "Absolutely. With one click, you can export recruiter-ready PDFs designed for digital submission, or fully editable DOCX files if an agency recruiter requests a custom format."
  },
  {
    question: "How does JobGen protect my career data and confidential documents?",
    answer: "We treat your career privacy with bank-grade security. All uploaded resumes and application histories are encrypted at rest with AES-256 and in transit via TLS 1.3. Your data is strictly private to your account and is never used to train public foundation models."
  },
  {
    question: "Can I track applications from LinkedIn, Seek, and Indeed in one place?",
    answer: "Yes. Our 1-Click Chrome Extension automatically captures job descriptions, salary benchmarks, and hiring manager details directly from LinkedIn, Seek, and Indeed, syncing them in real-time to your candidate Kanban board."
  }
];

export default function FAQSection({ onLaunchApp }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      style={{
        position: 'relative',
        backgroundColor: '#FFFFFF',
        color: '#090D16',
        padding: '110px 0 120px 0',
        borderTop: '1px solid #E2E8F0',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Ambient Light Gradients */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `
            radial-gradient(circle at 15% 20%, rgba(224, 242, 254, 0.5) 0%, transparent 45%),
            radial-gradient(circle at 85% 80%, rgba(238, 242, 255, 0.6) 0%, transparent 45%)
          `,
          zIndex: 0
        }}
      />

      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 56px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              color: '#1D4ED8',
              fontSize: '12.5px',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '18px'
            }}
          >
            <HelpCircle size={14} color="#1D4ED8" />
            <span>Got Questions? We Have Answers</span>
          </div>

          <h2
            style={{
              fontFamily: '"Plus Jakarta Sans", var(--font-title, sans-serif)',
              fontSize: 'clamp(32px, 4.2vw, 52px)',
              fontWeight: 900,
              letterSpacing: '-0.035em',
              lineHeight: 1.1,
              color: '#090D16',
              margin: '0 0 14px 0'
            }}
          >
            Frequently Asked Questions
          </h2>

          <p
            style={{
              fontSize: 'clamp(15px, 1.8vw, 17px)',
              color: '#64748B',
              lineHeight: 1.6,
              margin: 0
            }}
          >
            Everything you need to know about our autonomous candidate engine, ATS validation, and Emma AI.
          </p>
        </div>

        {/* Accordion FAQ List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                style={{
                  borderRadius: '16px',
                  backgroundColor: isOpen ? '#F8FAFC' : '#FFFFFF',
                  border: isOpen ? '1.5px solid #93C5FD' : '1px solid #E2E8F0',
                  boxShadow: isOpen 
                    ? '0 8px 24px -4px rgba(26, 83, 207, 0.08), 0 2px 6px rgba(15, 23, 42, 0.03)' 
                    : '0 1px 3px rgba(15, 23, 42, 0.03)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  overflow: 'hidden'
                }}
              >
                {/* Question Trigger */}
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  style={{
                    width: '100%',
                    padding: '22px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontSize: '16.5px',
                      fontWeight: 800,
                      color: isOpen ? '#1A53CF' : '#0F172A',
                      letterSpacing: '-0.015em',
                      lineHeight: 1.35,
                      transition: 'color 0.2s ease'
                    }}
                  >
                    {item.question}
                  </span>

                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isOpen ? '#EFF6FF' : '#F1F5F9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease'
                    }}
                  >
                    <ChevronDown size={17} color={isOpen ? '#1D4ED8' : '#64748B'} strokeWidth={2.5} />
                  </div>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div
                    style={{
                      padding: '0 24px 22px 24px',
                      color: '#475569',
                      fontSize: '14.5px',
                      lineHeight: 1.65,
                      borderTop: '1px solid rgba(226, 232, 240, 0.6)',
                      paddingTop: '16px'
                    }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Support Callout Card */}
        <div
          style={{
            marginTop: '48px',
            padding: '24px 28px',
            borderRadius: '18px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#090D16', marginBottom: '4px' }}>
              Still have questions about JobGen?
            </div>
            <div style={{ fontSize: '13.5px', color: '#64748B' }}>
              Our team and Emma are always ready to walk you through our platform.
            </div>
          </div>

          <button
            type="button"
            onClick={onLaunchApp}
            style={{
              padding: '10px 22px',
              borderRadius: '9999px',
              backgroundColor: '#1A53CF',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(26, 83, 207, 0.3)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.backgroundColor = '#2563EB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.backgroundColor = '#1A53CF';
            }}
          >
            <span>Explore App</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}
