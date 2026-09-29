import React, { useState, useEffect } from 'react';
import { 
  Play, 
  X, 
  ExternalLink, 
  Share2, 
  Sparkles, 
  Clock, 
  RotateCcw, 
  Check, 
  ChevronRight
} from 'lucide-react';

// YouTube & LinkedIn Brand Logos (SVGs for crisp rendering)
const YouTubeIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const LinkedInIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

// Real Company Logos from project public assets
const PARTNER_LOGOS = [
  { name: 'JobGen', src: '/NewLogo.webp' },
  { name: 'Canva', src: '/logos/canva.webp' },
  { name: 'Atlassian', src: '/logos/atlassian.webp' },
  { name: 'Afterpay', src: '/logos/afterpay.webp' },
  { name: 'Amazon', src: '/logos/amazon.webp' },
  { name: 'Microsoft', src: '/logos/microsoft.webp' },
  { name: 'Deloitte', src: '/logos/deloitte.webp' },
  { name: 'Visa', src: '/logos/visa.webp' },
];

// Hero Video Information
const HERO_VIDEO = {
  id: '7qV35lbOalw',
  title: 'How to Build a Career That Works Across Industries',
  url: 'https://www.youtube.com/watch?v=7qV35lbOalw',
  channelSubscribeUrl: 'https://www.youtube.com/@JobGenConnect?sub_confirmation=1',
  linkedinUrl: 'https://www.linkedin.com/company/jobgenai/'
};

// Collection Videos (User Provided)
const COLLECTION_VIDEOS = [
  {
    id: 'b5MiRIcVlxI',
    title: "Why I’m Betting on AI and Networking for Your Career Growth",
    author: 'JOBGEN AI',
    url: 'https://youtu.be/b5MiRIcVlxI?si=F12HzCJmEQqlRfNa',
    duration: '18:42',
    views: '9.2K views',
    category: 'AI & Career Acceleration',
    description: 'A candid breakdown of how AI shifts traditional technical hiring into high-leverage relationships, inbound referrals, and specialized domain positioning.'
  },
  {
    id: 'R7nhBXUdurM',
    title: "What Employers Really Fear When Hiring Migrants — Ryan Shrestha | JobGen Connect",
    author: 'JOBGEN AI',
    url: 'https://youtu.be/R7nhBXUdurM?si=Oc-K_gJRnlqjbKhw',
    duration: '24:15',
    views: '14.8K views',
    category: 'Hiring Insights',
    description: 'Ryan Shrestha unpacks the unspoken compliance, visa timing, and communication risks hiring managers worry about — and how candidates can eliminate them upfront.'
  },
  {
    id: 'vRGtOl5lQ9I',
    title: "How do recruiters get hired?",
    author: 'JOBGEN AI',
    url: 'https://youtu.be/vRGtOl5lQ9I?si=X42EuIqLAgb3dc7Y',
    duration: '12:30',
    views: '8.1K views',
    category: 'Recruiter Playbook',
    description: 'A fascinating peak behind the curtain into how executive search consultants, talent partners, and recruitment agencies evaluate their own hiring and performance.'
  },
  {
    id: 'lflyAlD2Mxo',
    title: "Recruiter Secrets: Why You Didn't Get The Call Back",
    author: 'JOBGEN AI',
    url: 'https://youtu.be/lflyAlD2Mxo?si=L4-DW2GIXlKK1q6z',
    duration: '16:04',
    views: '22.5K views',
    category: 'Recruiter Secrets',
    description: 'The real, unvarnished reasons candidates get silently ghosted or rejected after Round 1, and the 3 subtle behavioral green flags that turn a maybe into a quick yes.'
  },
  {
    id: '6v_ns_4sruo',
    title: "AI for Tech Job Seekers: Tailor, Track & Research",
    author: 'JOBGEN AI',
    url: 'https://youtu.be/6v_ns_4sruo?si=Sv1DY1czle2P6jRJ',
    duration: '21:40',
    views: '11.3K views',
    category: 'AI & Tools',
    description: 'Practical automation workflows to tailor resumes to strict applicant tracking systems, keep track of multi-stage interviews, and conduct deep company research.'
  },
  {
    id: 'xbL2VFVfgxE',
    title: "AI That Makes Screening Calls for Recruiters — Live JobGen.AI Demo",
    author: 'JOBGEN AI',
    url: 'https://youtu.be/xbL2VFVfgxE?si=VjdM6_G3xaRkaaL4',
    duration: '19:55',
    views: '17.6K views',
    category: 'Live Demo',
    description: 'Live interactive demonstration showing how JobGen AI conducts autonomous voice screening calls, scores technical fit, and generates deep candidate dossiers.'
  }
];

export default function CareerEventsView() {
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return sessionStorage.getItem('jobgen_career_intro_played') !== 'true';
    } catch (e) {
      return false;
    }
  });
  const [introFading, setIntroFading] = useState(false);
  const [selectedModalVideo, setSelectedModalVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [copyToast, setCopyToast] = useState('');
  const videoRef = React.useRef(null);

  // Guarantee muted audio and autoplay compliance
  useEffect(() => {
    if (showIntro) {
      try {
        sessionStorage.setItem('jobgen_career_intro_played', 'true');
      } catch (e) {}

      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.volume = 0;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    }
  }, [showIntro]);

  const handleVideoEnded = () => {
    setIntroFading(true);
    try {
      sessionStorage.setItem('jobgen_career_intro_played', 'true');
    } catch (e) {}
    setTimeout(() => {
      setShowIntro(false);
    }, 450);
  };

  const handleSkipIntro = () => {
    setIntroFading(true);
    try {
      sessionStorage.setItem('jobgen_career_intro_played', 'true');
    } catch (e) {}
    setTimeout(() => {
      setShowIntro(false);
    }, 300);
  };

  // Keyboard shortcut (Escape, Space, Enter) to skip intro or close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showIntro && ['Escape', ' ', 'Enter'].includes(e.key)) {
        handleSkipIntro();
      } else if (e.key === 'Escape' && selectedModalVideo) {
        setSelectedModalVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIntro, selectedModalVideo]);

  const showToastNotification = (msg) => {
    setCopyToast(msg);
    setTimeout(() => setCopyToast(''), 3000);
  };

  const filteredCollection = activeCategory === 'all' 
    ? COLLECTION_VIDEOS 
    : COLLECTION_VIDEOS.filter(v => v.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      
      {/* Scoped CSS Styles for Smooth 60fps Animations & Marquees */}
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-12px) scale(1.04); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.45; transform: scale(0.98); }
          50% { opacity: 0.85; transform: scale(1.05); }
        }
        @keyframes marqueeScrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeScrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes shimmerLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes modalEnter {
          0% { opacity: 0; transform: scale(0.95) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .events-video-card:hover .play-overlay-btn {
          transform: scale(1.15);
          background-color: #FF0000 !important;
          box-shadow: 0 8px 24px rgba(255, 0, 0, 0.45) !important;
        }
        .events-video-card:hover img {
          transform: scale(1.04);
        }
        .strap-banner-yt:hover {
          filter: brightness(1.08);
          box-shadow: 0 16px 36px rgba(220, 38, 38, 0.5) !important;
        }
        .strap-banner-li:hover {
          filter: brightness(1.08);
          box-shadow: 0 16px 36px rgba(10, 102, 194, 0.5) !important;
        }
      `}</style>

      {/* =========================================================================
          1. VIDEO INTRO OVERLAY (intronew.mp4 played once with sound muted)
          ========================================================================= */}
      {showIntro && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: introFading ? 0 : 1,
            pointerEvents: introFading ? 'none' : 'auto',
            transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
            overflow: 'hidden'
          }}
        >
          <video
            ref={videoRef}
            src="/intronew.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnded}
            onError={handleVideoEnded}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      )}

      {/* =========================================================================
          2. TOAST NOTIFICATION
          ========================================================================= */}
      {copyToast && (
        <div 
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 999,
            backgroundColor: '#090C15',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '13px',
            fontWeight: 700,
            animation: 'modalEnter 0.2s ease-out'
          }}
        >
          <Check size={16} color="#10B981" />
          <span>{copyToast}</span>
        </div>
      )}

      {/* =========================================================================
          3. HERO SECTION: PURE YOUTUBE VIDEO PLAYING (NO CLUTTER)
          ========================================================================= */}
      <div 
        style={{
          borderRadius: '24px',
          backgroundColor: '#000000',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          boxShadow: '0 20px 48px rgba(15, 23, 42, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06)',
          overflow: 'hidden',
          position: 'relative',
          marginBottom: '36px',
          marginTop: '6px'
        }}
      >
        {/* Embedded YouTube Player Cinema Screen */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            paddingTop: '56.25%', // 16:9 Aspect Ratio
            backgroundColor: '#000000'
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${HERO_VIDEO.id}?autoplay=0&rel=0&enablejsapi=1`}
            title={HERO_VIDEO.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none'
            }}
          />
        </div>
      </div>

      {/* =========================================================================
          4. FULL SCREEN WIDTH DIAGONAL STRAPS (YOUTUBE RED & LINKEDIN BLUE)
             - Spans full screen width with zero side padding constraints
             - Band 1: YouTube Red with redirect to subscription page
             - Band 2: LinkedIn Blue with redirect to LinkedIn
             - Company logos embedded on both bands
          ========================================================================= */}
      <div 
        style={{
          position: 'relative',
          // Negative margins break out of <main> container padding to span full edge-to-edge
          width: 'calc(100% + 64px)',
          marginLeft: '-28px',
          marginRight: '-36px',
          height: '180px',
          overflow: 'hidden',
          margin: '20px -36px 48px -28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Ambient Glow */}
        <div 
          style={{
            position: 'absolute',
            width: '600px',
            height: '90px',
            background: 'radial-gradient(ellipse, rgba(26, 83, 207, 0.16) 0%, transparent 70%)',
            filter: 'blur(32px)',
            pointerEvents: 'none'
          }}
        />

        {/* -------------------------------------------------------------
            STRAP 1: YOUTUBE RED DIAGONAL BAND (ANGLED AT -2.8 DEGREES)
            ------------------------------------------------------------- */}
        <div
          onClick={() => window.open(HERO_VIDEO.channelSubscribeUrl, '_blank')}
          title="Click to Subscribe to our YouTube Channel"
          className="strap-banner-yt"
          style={{
            position: 'absolute',
            top: '36px',
            left: '-15%',
            width: '130%',
            height: '56px',
            transform: 'rotate(-2.8deg)',
            backgroundColor: '#FF0000',
            backgroundImage: 'linear-gradient(90deg, #CC0000 0%, #FF0000 35%, #E60000 70%, #CC0000 100%)',
            boxShadow: '0 12px 30px rgba(220, 38, 38, 0.38), 0 2px 6px rgba(0, 0, 0, 0.12)',
            zIndex: 10,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            borderTop: '2px solid rgba(255, 255, 255, 0.35)',
            borderBottom: '2px solid rgba(0, 0, 0, 0.25)',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Continuous Infinite Marquee Scroll Left */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              whiteSpace: 'nowrap',
              animation: 'marqueeScrollLeft 30s linear infinite',
              willChange: 'transform'
            }}
          >
            {[0, 1].map((copyIndex) => (
              <div key={copyIndex} style={{ display: 'flex', alignItems: 'center', gap: '32px', paddingRight: '32px' }}>
                
                {/* Segment 1 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                    <YouTubeIcon size={18} color="#FF0000" />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    SUBSCRIBE TO OUR YOUTUBE CHANNEL
                  </span>
                </div>

                {/* Company Logo Mini Pills */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {PARTNER_LOGOS.slice(0, 4).map((logo, lIdx) => (
                    <div 
                      key={lIdx} 
                      style={{ 
                        width: '26px', 
                        height: '26px', 
                        borderRadius: '50%', 
                        backgroundColor: '#FFFFFF', 
                        padding: '3px', 
                        boxShadow: '0 2px 4px rgba(0,0,0,0.18)',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}
                      title={logo.name}
                    >
                      <img src={logo.src} alt={logo.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                  ))}
                </div>

                <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFE4E6', letterSpacing: '0.04em' }}>
                  • 1-CLICK SUBSCRIBE FOR NEW MASTERCLASSES •
                </span>

                {/* Segment 2 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                    <YouTubeIcon size={18} color="#FF0000" />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    @JOBGENCONNECT YOUTUBE
                  </span>
                </div>

                {/* Company Logo Mini Pills 2 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {PARTNER_LOGOS.slice(4).map((logo, lIdx) => (
                    <div 
                      key={lIdx} 
                      style={{ 
                        width: '26px', 
                        height: '26px', 
                        borderRadius: '50%', 
                        backgroundColor: '#FFFFFF', 
                        padding: '3px', 
                        boxShadow: '0 2px 4px rgba(0,0,0,0.18)',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}
                      title={logo.name}
                    >
                      <img src={logo.src} alt={logo.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                  ))}
                </div>

                <div 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    backgroundColor: '#FFFFFF',
                    color: '#CC0000',
                    fontSize: '11px',
                    fontWeight: 900,
                    letterSpacing: '0.04em',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                >
                  <span>SUBSCRIBE NOW</span>
                  <ExternalLink size={11} strokeWidth={3} />
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* -------------------------------------------------------------
            STRAP 2: LINKEDIN BLUE DIAGONAL BAND (ANGLED AT +2.8 DEGREES)
            ------------------------------------------------------------- */}
        <div
          onClick={() => window.open(HERO_VIDEO.linkedinUrl, '_blank')}
          title="Click to Follow us on LinkedIn"
          className="strap-banner-li"
          style={{
            position: 'absolute',
            top: '76px',
            left: '-15%',
            width: '130%',
            height: '56px',
            transform: 'rotate(2.8deg)',
            backgroundColor: '#0A66C2',
            backgroundImage: 'linear-gradient(90deg, #005582 0%, #0A66C2 35%, #0077B5 70%, #005582 100%)',
            boxShadow: '0 14px 34px rgba(10, 102, 194, 0.42), 0 2px 6px rgba(0, 0, 0, 0.15)',
            zIndex: 12,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            borderTop: '2px solid rgba(255, 255, 255, 0.38)',
            borderBottom: '2px solid rgba(0, 0, 0, 0.3)',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Continuous Infinite Marquee Scroll Right */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              whiteSpace: 'nowrap',
              animation: 'marqueeScrollRight 32s linear infinite',
              willChange: 'transform'
            }}
          >
            {[0, 1].map((copyIndex) => (
              <div key={copyIndex} style={{ display: 'flex', alignItems: 'center', gap: '32px', paddingRight: '32px' }}>
                
                {/* Segment 1 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                    <LinkedInIcon size={18} color="#0A66C2" />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    CONNECT WITH US ON LINKEDIN
                  </span>
                </div>

                {/* Company Logo Mini Pills */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {PARTNER_LOGOS.map((logo, lIdx) => (
                    <div 
                      key={lIdx} 
                      style={{ 
                        width: '26px', 
                        height: '26px', 
                        borderRadius: '50%', 
                        backgroundColor: '#FFFFFF', 
                        padding: '3px', 
                        boxShadow: '0 2px 4px rgba(0,0,0,0.18)',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}
                      title={logo.name}
                    >
                      <img src={logo.src} alt={logo.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                  ))}
                </div>

                <span style={{ fontSize: '13px', fontWeight: 800, color: '#BAE6FD', letterSpacing: '0.04em' }}>
                  • JOIN 25,000+ TECH CANDIDATES & HIRING MANAGERS •
                </span>

                {/* Segment 2 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                    <LinkedInIcon size={18} color="#0A66C2" />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    JOBGEN CANDIDATES ON LINKEDIN
                  </span>
                </div>

                <div 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    backgroundColor: '#FFFFFF',
                    color: '#0A66C2',
                    fontSize: '11px',
                    fontWeight: 900,
                    letterSpacing: '0.04em',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                >
                  <span>FOLLOW PAGE</span>
                  <ExternalLink size={11} strokeWidth={3} />
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* =========================================================================
          5. CURATED PLAYLIST (HALF BLACK, HALF BLUE)
          ========================================================================= */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '60px' }}>
        
        {/* Section Header: CURATED PLAYLIST */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 900, letterSpacing: '-0.025em', margin: 0, textTransform: 'uppercase' }}>
            <span style={{ color: '#090C15' }}>CURATED </span>
            <span style={{ color: '#1A53CF' }}>PLAYLIST</span>
          </h2>

          {/* Category Filter Pills */}
          <div 
            style={{ 
              display: 'flex', 
              gap: '6px', 
              backgroundColor: '#FFFFFF', 
              padding: '4px', 
              borderRadius: '12px', 
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
            }}
          >
            {[
              { id: 'all', label: 'All Videos' },
              { id: 'recruiter', label: 'Recruiter Secrets' },
              { id: 'ai', label: 'AI & Automation' },
              { id: 'insights', label: 'Hiring Insights' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeCategory === cat.id ? '#090C15' : 'transparent',
                  color: activeCategory === cat.id ? '#FFFFFF' : '#475569',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Video Cards Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '24px'
          }}
        >
          {filteredCollection.map(video => (
            <div
              key={video.id}
              onClick={() => setSelectedModalVideo(video)}
              className="events-video-card"
              style={{
                borderRadius: '18px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.05)',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 14px 32px rgba(15, 23, 42, 0.12)';
                e.currentTarget.style.borderColor = '#BFDBFE';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(15, 23, 42, 0.05)';
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
            >
              {/* Thumbnail Area with Duration & Play Button */}
              <div 
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '56.25%', // 16:9 Aspect Ratio
                  backgroundColor: '#0F172A',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`;
                  }}
                />

                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)',
                    pointerEvents: 'none'
                  }}
                />

                {/* Duration Badge */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Clock size={10} color="#CBD5E1" />
                  <span>{video.duration}</span>
                </div>

                {/* Center Hover Play Button */}
                <div 
                  className="play-overlay-btn"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#090C15',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <Play size={20} fill="currentColor" style={{ marginLeft: '3px' }} />
                </div>
              </div>

              {/* Card Body Content */}
              <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#1A53CF' }}>
                        {video.author}
                      </span>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#1A53CF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={8} color="#FFFFFF" strokeWidth={3} />
                      </div>
                    </div>
                    <span style={{ fontSize: '11.5px', color: '#94A3B8', fontWeight: 600 }}>
                      {video.views}
                    </span>
                  </div>

                  <h3 
                    style={{
                      fontSize: '15px',
                      fontWeight: 800,
                      color: '#090C15',
                      lineHeight: 1.4,
                      margin: '0 0 8px 0',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {video.title}
                  </h3>

                  <p 
                    style={{
                      fontSize: '12.5px',
                      color: '#64748B',
                      lineHeight: 1.5,
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {video.description}
                  </p>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* =========================================================================
          6. POP-UP VIDEO MODAL (NO HEADER - DIRECT FULL-FRAME CINEMA PLAYER)
          ========================================================================= */}
      {selectedModalVideo && (
        <div 
          onClick={() => setSelectedModalVideo(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: 'rgba(9, 12, 21, 0.9)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          {/* Modal Card Window - Directly Video Player without any top header bar */}
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '960px',
              borderRadius: '20px',
              backgroundColor: '#000000',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(26, 83, 207, 0.3)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              animation: 'modalEnter 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Floating Close Button in Top-Right Corner */}
            <button
              onClick={() => setSelectedModalVideo(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 30,
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#EF4444'; e.currentTarget.style.borderColor = '#EF4444'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.65)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)'; }}
              title="Close (Esc)"
            >
              <X size={18} />
            </button>

            {/* Embedded 16:9 YouTube Player */}
            <div 
              style={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%', // 16:9 Aspect Ratio
                backgroundColor: '#000000'
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${selectedModalVideo.id}?autoplay=1&mute=0&rel=0&enablejsapi=1`}
                title={selectedModalVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
              />
            </div>

            {/* Bottom Actions Bar (Share & Watch on YouTube) */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 20px',
                backgroundColor: '#090C15',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>
                  {selectedModalVideo.title}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedModalVideo.url);
                    showToastNotification('Video URL copied to clipboard!');
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#E2E8F0',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
                >
                  <Share2 size={13} />
                  <span>Share</span>
                </button>

                <a
                  href={selectedModalVideo.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#FF0000',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 800,
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(255, 0, 0, 0.3)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#CC0000'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF0000'}
                >
                  <YouTubeIcon size={14} color="#FFFFFF" />
                  <span>Watch on YouTube</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
