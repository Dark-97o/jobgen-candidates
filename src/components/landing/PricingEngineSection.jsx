import React, { useState, useEffect } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap, Globe, ChevronDown } from 'lucide-react';
import BlueMistAnimation from './BlueMistAnimation';
import WhiteMatrixGridAnimation from './WhiteMatrixGridAnimation';
import { RollingText } from '@/components/v1/skiper27';

/**
 * Regional Currency Configuration
 * Provides localized pricing matrix matching the exact user specifications:
 * Reference INR (₹):
 * - Monthly: ₹799/mo | Billed monthly
 * - Quarterly: ₹600/mo (was ₹799) | Billed ₹1,799 / quarter | Most Popular
 * - Yearly: ₹400/mo (was ₹799) | Billed ₹4,799 / year | Best Value
 */
const REGION_PRICING = {
  INR: {
    code: 'INR',
    symbol: '₹',
    countryName: 'India',
    flag: '🇮🇳',
    free: {
      price: '₹0',
      period: '/ forever',
      billing: 'No credit card · free forever'
    },
    monthly: {
      price: '₹799',
      period: '/mo',
      billedText: 'Billed monthly. 7 days free, cancel anytime.',
      savingsText: null,
      badge: null
    },
    quarterly: {
      originalPrice: '₹799',
      price: '₹600',
      period: '/mo',
      billedText: 'Billed ₹1,799 / quarter. 7 days free, cancel anytime.',
      savingsText: 'Save 25%',
      badge: 'Most Popular'
    },
    yearly: {
      originalPrice: '₹799',
      price: '₹400',
      period: '/mo',
      billedText: 'Billed ₹4,799 / year. 7 days free, cancel anytime.',
      savingsText: 'Save 50%',
      badge: 'Best Value'
    }
  },
  USD: {
    code: 'USD',
    symbol: '$',
    countryName: 'United States & Global',
    flag: '🇺🇸',
    free: {
      price: '$0',
      period: '/ forever',
      billing: 'No credit card · free forever'
    },
    monthly: {
      price: '$19',
      period: '/mo',
      billedText: 'Billed monthly. 7 days free, cancel anytime.',
      savingsText: null,
      badge: null
    },
    quarterly: {
      originalPrice: '$19',
      price: '$14',
      period: '/mo',
      billedText: 'Billed $42 / quarter. 7 days free, cancel anytime.',
      savingsText: 'Save 26%',
      badge: 'Most Popular'
    },
    yearly: {
      originalPrice: '$19',
      price: '$9',
      period: '/mo',
      billedText: 'Billed $108 / year. 7 days free, cancel anytime.',
      savingsText: 'Save 53%',
      badge: 'Best Value'
    }
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    countryName: 'United Kingdom',
    flag: '🇬🇧',
    free: {
      price: '£0',
      period: '/ forever',
      billing: 'No credit card · free forever'
    },
    monthly: {
      price: '£15',
      period: '/mo',
      billedText: 'Billed monthly. 7 days free, cancel anytime.',
      savingsText: null,
      badge: null
    },
    quarterly: {
      originalPrice: '£15',
      price: '£11',
      period: '/mo',
      billedText: 'Billed £33 / quarter. 7 days free, cancel anytime.',
      savingsText: 'Save 27%',
      badge: 'Most Popular'
    },
    yearly: {
      originalPrice: '£15',
      price: '£7.50',
      period: '/mo',
      billedText: 'Billed £90 / year. 7 days free, cancel anytime.',
      savingsText: 'Save 50%',
      badge: 'Best Value'
    }
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    countryName: 'Europe',
    flag: '🇪🇺',
    free: {
      price: '€0',
      period: '/ forever',
      billing: 'No credit card · free forever'
    },
    monthly: {
      price: '€18',
      period: '/mo',
      billedText: 'Billed monthly. 7 days free, cancel anytime.',
      savingsText: null,
      badge: null
    },
    quarterly: {
      originalPrice: '€18',
      price: '€13',
      period: '/mo',
      billedText: 'Billed €39 / quarter. 7 days free, cancel anytime.',
      savingsText: 'Save 28%',
      badge: 'Most Popular'
    },
    yearly: {
      originalPrice: '€18',
      price: '€8.50',
      period: '/mo',
      billedText: 'Billed €102 / year. 7 days free, cancel anytime.',
      savingsText: 'Save 53%',
      badge: 'Best Value'
    }
  },
  AUD: {
    code: 'AUD',
    symbol: 'A$',
    countryName: 'Australia',
    flag: '🇦🇺',
    free: {
      price: 'A$0',
      period: '/ forever',
      billing: 'No credit card · free forever'
    },
    monthly: {
      price: 'A$29',
      period: '/mo',
      billedText: 'Billed monthly. 7 days free, cancel anytime.',
      savingsText: null,
      badge: null
    },
    quarterly: {
      originalPrice: 'A$29',
      price: 'A$21',
      period: '/mo',
      billedText: 'Billed A$63 / quarter. 7 days free, cancel anytime.',
      savingsText: 'Save 28%',
      badge: 'Most Popular'
    },
    yearly: {
      originalPrice: 'A$29',
      price: 'A$14',
      period: '/mo',
      billedText: 'Billed A$168 / year. 7 days free, cancel anytime.',
      savingsText: 'Save 52%',
      badge: 'Best Value'
    }
  },
  CAD: {
    code: 'CAD',
    symbol: 'C$',
    countryName: 'Canada',
    flag: '🇨🇦',
    free: {
      price: 'C$0',
      period: '/ forever',
      billing: 'No credit card · free forever'
    },
    monthly: {
      price: 'C$26',
      period: '/mo',
      billedText: 'Billed monthly. 7 days free, cancel anytime.',
      savingsText: null,
      badge: null
    },
    quarterly: {
      originalPrice: 'C$26',
      price: 'C$19',
      period: '/mo',
      billedText: 'Billed C$57 / quarter. 7 days free, cancel anytime.',
      savingsText: 'Save 27%',
      badge: 'Most Popular'
    },
    yearly: {
      originalPrice: 'C$26',
      price: 'C$12.50',
      period: '/mo',
      billedText: 'Billed C$150 / year. 7 days free, cancel anytime.',
      savingsText: 'Save 52%',
      badge: 'Best Value'
    }
  }
};

const FREE_FEATURES = [
  'Save jobs in 1 click while you browse',
  'Job match score for your first 5 jobs',
  '1 AI-tailored resume every month',
  'Track all your applications',
  'Career guides & salary insights',
  '1 interview prep session',
  'Community support'
];

const PREMIUM_FEATURES = [
  'Unlimited AI resumes & cover letters',
  'Unlimited job match scoring',
  'Auto-fill job applications in 1 click',
  'Full interview prep + AI mock interview',
  'LinkedIn profile optimiser',
  'Personalised career pathway planner',
  'Recruiter outreach emails, written by AI',
  'Advanced application tracker with auto-sync',
  'Priority support'
];

export default function PricingEngineSection({ onLaunchApp }) {
  const [billingCycle, setBillingCycle] = useState('quarterly'); // 'monthly' | 'quarterly' | 'yearly'
  const [selectedCurrency, setSelectedCurrency] = useState('INR');

  // Client-Side Geolocation & Locale Detection
  useEffect(() => {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const userLangs = (navigator.languages || [navigator.language || '']).join(',').toLowerCase();

      let detected = 'USD';

      if (
        timeZone.includes('Calcutta') ||
        timeZone.includes('Kolkata') ||
        timeZone.includes('India') ||
        userLangs.includes('-in')
      ) {
        detected = 'INR';
      } else if (
        timeZone.includes('London') ||
        timeZone.includes('Belfast') ||
        userLangs.includes('-gb')
      ) {
        detected = 'GBP';
      } else if (
        timeZone.includes('Sydney') ||
        timeZone.includes('Melbourne') ||
        timeZone.includes('Brisbane') ||
        timeZone.includes('Perth') ||
        timeZone.includes('Adelaide') ||
        userLangs.includes('-au')
      ) {
        detected = 'AUD';
      } else if (
        timeZone.includes('Toronto') ||
        timeZone.includes('Vancouver') ||
        timeZone.includes('Montreal') ||
        userLangs.includes('-ca')
      ) {
        detected = 'CAD';
      } else if (
        timeZone.includes('Europe') ||
        timeZone.includes('Paris') ||
        timeZone.includes('Berlin') ||
        timeZone.includes('Madrid') ||
        timeZone.includes('Rome')
      ) {
        detected = 'EUR';
      }

      setSelectedCurrency(detected);

      // Fast non-blocking IP country lookup with 900ms abort
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 900);

      fetch('https://ipapi.co/json/', { signal: controller.signal })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          clearTimeout(timeoutId);
          if (!data) return;
          const country = (data.country_code || '').toUpperCase();
          if (country === 'IN') setSelectedCurrency('INR');
          else if (country === 'GB') setSelectedCurrency('GBP');
          else if (country === 'AU') setSelectedCurrency('AUD');
          else if (country === 'CA') setSelectedCurrency('CAD');
          else if (['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'IE', 'FI', 'PT', 'GR'].includes(country)) {
            setSelectedCurrency('EUR');
          } else if (country === 'US') {
            setSelectedCurrency('USD');
          }
        })
        .catch(() => {
          // Fallback silently kept on timezone detection
        });
    } catch {
      // Safe fallback to INR
      setSelectedCurrency('INR');
    }
  }, []);

  const pricingData = REGION_PRICING[selectedCurrency] || REGION_PRICING.INR;
  const currentPlan = pricingData[billingCycle] || pricingData.quarterly;

  const freeSignUpUrl = 'https://candidates.jobgen.ai/sign-up';
  const premiumSignUpUrl = `https://candidates.jobgen.ai/sign-up?plan=premium&cycle=${billingCycle}`;

  return (
    <section
      id="pricing"
      style={{
        position: 'relative',
        padding: '60px 0 68px 0',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden'
      }}
    >
      {/* =========================================================================
          ANIMATED BLUE MIST VAPOR BACKGROUND (PROCEDURAL CANVAS PARTICLES)
          ========================================================================= */}
      <BlueMistAnimation />
      <WhiteMatrixGridAnimation />

      {/* Atmospheric Soft Radials over White Theme */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `
            radial-gradient(circle at 50% 12%, rgba(219, 234, 254, 0.65) 0%, transparent 45%),
            radial-gradient(circle at 10% 80%, rgba(238, 242, 255, 0.7) 0%, transparent 40%),
            radial-gradient(circle at 90% 85%, rgba(224, 242, 254, 0.6) 0%, transparent 42%)
          `,
          zIndex: 1
        }}
      />

      <div
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* ================= HEADER & BILLING TOGGLES ================= */}
        <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto 32px auto' }}>
          

          {/* Main Title from Prompt */}
          <h2
            style={{
              fontFamily: '"Plus Jakarta Sans", var(--font-title, sans-serif)',
              fontSize: 'clamp(28px, 3.8vw, 46px)',
              fontWeight: 900,
              letterSpacing: '-0.035em',
              lineHeight: 1.2,
              color: '#090D16',
              margin: '0 0 12px 0'
            }}
          >
            <RollingText text="Start free. Upgrade when you want the " />
            <RollingText text="full engine" style={{ color: '#1A53CF' }} />
          </h2>

          <p
            style={{
              fontSize: 'clamp(14.5px, 1.6vw, 16px)',
              color: '#475569',
              lineHeight: 1.55,
              margin: '0 auto 24px auto',
              maxWidth: '600px'
            }}
          >
            Zero commitments. Begin with free autonomous tools and scale seamlessly with our 7-day all-access trial.
          </p>

          {/* Controls: Billing Cycle Selector + Region / Currency Switcher */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '14px'
            }}
          >
            {/* Cycle Selector */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '5px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #CBD5E1',
                boxShadow: '0 4px 18px rgba(15, 23, 42, 0.06)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Monthly */}
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: billingCycle === 'monthly' ? '#1A53CF' : 'transparent',
                  color: billingCycle === 'monthly' ? '#FFFFFF' : '#475569',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: billingCycle === 'monthly' ? '0 4px 12px rgba(26, 83, 207, 0.35)' : 'none'
                }}
              >
                Monthly
              </button>

              {/* Quarterly */}
              <button
                type="button"
                onClick={() => setBillingCycle('quarterly')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: billingCycle === 'quarterly' ? '#1A53CF' : 'transparent',
                  color: billingCycle === 'quarterly' ? '#FFFFFF' : '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: billingCycle === 'quarterly' ? '0 4px 12px rgba(26, 83, 207, 0.35)' : 'none'
                }}
              >
                <span>Quarterly</span>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 800,
                    padding: '2px 7px',
                    borderRadius: '9999px',
                    backgroundColor: billingCycle === 'quarterly' ? 'rgba(255, 255, 255, 0.25)' : '#ECFDF5',
                    color: billingCycle === 'quarterly' ? '#FFFFFF' : '#059669',
                    border: billingCycle === 'quarterly' ? '1px solid rgba(255, 255, 255, 0.35)' : '1px solid #A7F3D0'
                  }}
                >
                  Save 25%
                </span>
              </button>

              {/* Yearly */}
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '9999px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backgroundColor: billingCycle === 'yearly' ? '#1A53CF' : 'transparent',
                  color: billingCycle === 'yearly' ? '#FFFFFF' : '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: billingCycle === 'yearly' ? '0 4px 12px rgba(26, 83, 207, 0.35)' : 'none'
                }}
              >
                <span>Yearly</span>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 800,
                    padding: '2px 7px',
                    borderRadius: '9999px',
                    backgroundColor: billingCycle === 'yearly' ? 'rgba(255, 255, 255, 0.25)' : '#EFF6FF',
                    color: billingCycle === 'yearly' ? '#FFFFFF' : '#1D4ED8',
                    border: billingCycle === 'yearly' ? '1px solid rgba(255, 255, 255, 0.35)' : '1px solid #BFDBFE'
                  }}
                >
                  Save 50%
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* ================= COMPACT PRICING CARDS DUAL GRID ================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            alignItems: 'stretch',
            maxWidth: '860px',
            margin: '0 auto'
          }}
        >
          {/* =========================================================================
              CARD 1: JOBGEN.AI FREE (COMPACT)
              ========================================================================= */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1.5px solid #E2E8F0',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.02)',
              padding: '26px 24px 22px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease'
            }}
          >
            <div>
              {/* Plan Header */}
              <div style={{ marginBottom: '14px' }}>
                <h3
                  style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontSize: '20px',
                    fontWeight: 900,
                    color: '#090D16',
                    letterSpacing: '-0.02em',
                    margin: '0 0 4px 0'
                  }}
                >
                  JobGen.AI Free
                </h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748B', fontWeight: 500 }}>
                  Start with your first resume score.
                </p>
              </div>

              {/* Price Display */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
                <span
                  style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontSize: 'clamp(34px, 4vw, 42px)',
                    fontWeight: 900,
                    letterSpacing: '-0.035em',
                    color: '#090D16',
                    lineHeight: 1
                  }}
                >
                  {pricingData.free.price}
                </span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#64748B' }}>
                  {pricingData.free.period}
                </span>
              </div>

              {/* Sub-billing line */}
              <div style={{ fontSize: '12px', color: '#059669', fontWeight: 700, marginBottom: '14px' }}>
                {pricingData.free.billing}
              </div>

              {/* Divider */}
              <div style={{ height: '1px', backgroundColor: '#F1F5F9', marginBottom: '16px' }} />

              {/* Feature List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '22px' }}>
                {FREE_FEATURES.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px' }}>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: '#EFF6FF',
                        border: '1px solid #BFDBFE',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '1px'
                      }}
                    >
                      <Check size={11} color="#1D4ED8" strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: '13px', color: '#334155', lineHeight: 1.45, fontWeight: 500 }}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <a
                href={freeSignUpUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  width: '100%',
                  padding: '11px 20px',
                  borderRadius: '12px',
                  backgroundColor: '#F8FAFC',
                  border: '1.5px solid #CBD5E1',
                  color: '#090D16',
                  fontSize: '13.5px',
                  fontWeight: 800,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
                  boxSizing: 'border-box'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#EFF6FF';
                  e.currentTarget.style.borderColor = '#93C5FD';
                  e.currentTarget.style.color = '#1D4ED8';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                  e.currentTarget.style.borderColor = '#CBD5E1';
                  e.currentTarget.style.color = '#090D16';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>Get free ATS score</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* =========================================================================
              CARD 2: JOBGEN.AI PREMIUM (COMPACT HIGHLIGHTED)
              ========================================================================= */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '2px solid #2563EB',
              boxShadow: `
                0 0 0 1px rgba(37, 99, 235, 0.15),
                0 18px 40px -10px rgba(37, 99, 235, 0.16),
                0 4px 14px rgba(15, 23, 42, 0.04)
              `,
              padding: '26px 24px 22px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease'
            }}
          >
            {/* Top Pill / Badge (Most Popular / Best Value) */}
            {currentPlan.badge && (
              <div
                style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '24px',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
                  color: '#FFFFFF',
                  fontSize: '10.5px',
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)'
                }}
              >
                {currentPlan.badge}
              </div>
            )}

            <div>
              {/* Plan Header */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '4px' }}>
                  <h3
                    style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontSize: '20px',
                      fontWeight: 900,
                      color: '#090D16',
                      letterSpacing: '-0.02em',
                      margin: 0
                    }}
                  >
                    JobGen.AI Premium
                  </h3>
                  <Zap size={16} color="#2563EB" fill="#2563EB" />
                </div>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748B', fontWeight: 500 }}>
                  Complete autonomous job-search engine with Emma AI.
                </p>
              </div>

              {/* Price Display */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                {currentPlan.originalPrice && (
                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#94A3B8',
                      textDecoration: 'line-through'
                    }}
                  >
                    {currentPlan.originalPrice}
                  </span>
                )}

                <span
                  style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontSize: 'clamp(34px, 4vw, 42px)',
                    fontWeight: 900,
                    letterSpacing: '-0.035em',
                    color: '#1D4ED8',
                    lineHeight: 1
                  }}
                >
                  {currentPlan.price}
                </span>

                <span style={{ fontSize: '14px', fontWeight: 600, color: '#64748B' }}>
                  {currentPlan.period}
                </span>
              </div>

              {/* Sub-billing line */}
              <div style={{ fontSize: '12px', color: '#334155', fontWeight: 600, marginBottom: '14px' }}>
                {currentPlan.billedText}
              </div>

              {/* Divider */}
              <div style={{ height: '1px', backgroundColor: '#E2E8F0', marginBottom: '14px' }} />

              {/* "Everything in Free, plus:" label */}
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#1D4ED8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  marginBottom: '10px'
                }}
              >
                Everything in Free, plus:
              </div>

              {/* Feature List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '22px' }}>
                {PREMIUM_FEATURES.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px' }}>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: '#DBEAFE',
                        border: '1px solid #93C5FD',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '1px'
                      }}
                    >
                      <Check size={11} color="#1D4ED8" strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: '13px', color: '#0F172A', lineHeight: 1.45, fontWeight: 600 }}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <a
                href={premiumSignUpUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  width: '100%',
                  padding: '11px 20px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 800,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 6px 20px rgba(29, 78, 216, 0.32)',
                  boxSizing: 'border-box'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 10px 26px rgba(29, 78, 216, 0.42)';
                  e.currentTarget.style.filter = 'brightness(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(29, 78, 216, 0.32)';
                  e.currentTarget.style.filter = 'none';
                }}
              >
                <span>Start free trial</span>
                <ArrowRight size={15} />
              </a>

              <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '11.5px', color: '#64748B' }}>
                7 days free &bull; Cancel anytime with 1 click
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
