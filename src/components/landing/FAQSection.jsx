import React, { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: "Is JobGen.AI free, and do I need a credit card?",
    answer: "Yes. You can start with JobGen.AI Free without a credit card. It includes your first resume score, your first 5 job match scores, one AI-tailored resume each month, job saving and application tracking. Premium adds unlimited AI resumes, cover letters, matching and interview preparation."
  },
  {
    question: "Can I upload and edit my existing resume?",
    answer: "Yes. Upload your existing PDF or DOCX and JobGen.AI will extract its content into the resume builder. You can edit every section, create tailored versions for different jobs and export the finished resume when you are ready."
  },
  {
    question: "How do the ATS match score and resume tailoring work?",
    answer: "JobGen.AI compares your resume with the job description to identify relevant keywords, skills and experience. It then shows where the match can be improved and helps you tailor the wording for that role while keeping your resume grounded in your real background."
  },
  {
    question: "Will the AI invent or change my experience?",
    answer: "JobGen.AI works from the experience and evidence you provide rather than manufacturing qualifications, employers or achievements. You remain in control: review every suggestion, make your own edits and choose what belongs in the final resume. JobGen.AI will not submit an application or send your resume to an employer without your action."
  },
  {
    question: "What does the Chrome extension do—and does JobGen.AI apply automatically?",
    answer: "The extension helps you save jobs while browsing, bring them into your tracker and fill supported application fields faster. It assists with the application process, but you review the information and control the final submission."
  },
  {
    question: "How is my resume and personal data protected?",
    answer: "Your uploads are encrypted in transit and at rest. JobGen.AI does not sell your personal data or use your resume to train public AI models, and you can export or delete your information when you choose."
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
        padding: '80px 0 90px 0',
        borderTop: '1px solid #E2E8F0',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Ambient Light Gradient */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `
            radial-gradient(circle at 15% 20%, rgba(224, 242, 254, 0.4) 0%, transparent 45%),
            radial-gradient(circle at 85% 80%, rgba(238, 242, 255, 0.5) 0%, transparent 45%)
          `,
          zIndex: 0
        }}
      />

      <div
        style={{
          maxWidth: '896px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px auto' }}>

          <h2
            style={{
              fontFamily: '"Plus Jakarta Sans", var(--font-title, sans-serif)',
              fontSize: 'clamp(32px, 4.2vw, 50px)',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: 1.12,
              color: '#0F172A',
              margin: '0 0 14px 0'
            }}
          >
            Have more <span style={{ color: '#1A53CF' }}>questions?</span>
          </h2>

          <p
            style={{
              fontSize: '16px',
              color: '#64748B',
              lineHeight: 1.6,
              margin: 0
            }}
          >
            Everything you need to know about JobGen.AI, billing, and your data.
          </p>
        </div>

        {/* Accordion FAQ List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                style={{
                  borderRadius: '16px',
                  backgroundColor: '#FFFFFF',
                  border: isOpen ? '1.5px solid rgba(26, 83, 207, 0.35)' : '1px solid #E2E8F0',
                  boxShadow: isOpen 
                    ? '0 8px 24px -4px rgba(26, 83, 207, 0.08), 0 2px 6px rgba(15, 23, 42, 0.03)' 
                    : '0 1px 3px rgba(15, 23, 42, 0.03)',
                  transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                  overflow: 'hidden'
                }}
              >
                {/* Question Trigger */}
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
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
                  aria-expanded={isOpen}
                >
                  <span
                    style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontSize: '15.5px',
                      fontWeight: 700,
                      color: isOpen ? '#1A53CF' : '#1E293B',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.4,
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
                      backgroundColor: isOpen ? '#1A53CF' : '#F1F5F9',
                      color: isOpen ? '#FFFFFF' : '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {isOpen ? <Minus size={15} strokeWidth={2.5} /> : <Plus size={15} strokeWidth={2.5} />}
                  </div>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div
                    style={{
                      padding: '0 24px 20px 24px',
                      color: '#475569',
                      fontSize: '14.5px',
                      lineHeight: 1.65
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
            marginTop: '44px',
            padding: '22px 28px',
            borderRadius: '16px',
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
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', marginBottom: '3px' }}>
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
              boxShadow: '0 4px 14px rgba(26, 83, 207, 0.25)',
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
