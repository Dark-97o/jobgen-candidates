import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  TrendingUp,
  Briefcase,
  Calendar,
  ArrowRight,
  Sparkles,
  Zap,
  Mic,
  MicOff,
  ChevronRight,
  ChevronLeft,
  Plus,
  Bot,
  Send,
  Award,
  VolumeX,
  Volume2,
  Bookmark,
  Video,
  VideoOff,
  Maximize2,
  Minimize2,
  Trophy,
  FileText,
  Clock,
  Check,
  Shuffle,
  Mail,
  MessageCircle,
  Users,
  X,
  UserPlus,
  CheckCircle2
} from 'lucide-react';
import freeCardsImg from '../../assets/free.png';
import AddJobModal from './AddJobModal';

// Persist in memory across SPA tab navigation so herow.mp4 only plays on first website load
let globalHasSeenHeroVideo = false;

const checkHasSeenHero = () => {
  if (globalHasSeenHeroVideo) return true;
  try {
    return sessionStorage.getItem('jobgen_has_seen_hero') === 'true';
  } catch {
    return false;
  }
};

export default function OverviewView({ onNavigate }) {
  const heroVideoRef = useRef(null);
  const hasSeen = checkHasSeenHero();
  const [heroPlaying, setHeroPlaying] = useState(!hasSeen);
  const [heroFading, setHeroFading] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(hasSeen);

  // Interactive selected day in calendar widget (0-13 for 2 weeks, defaulting to Wednesday index 2)
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(2);
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [overviewToast, setOverviewToast] = useState(null);

  const handleAddNewJob = (newJob, targetStage = 'saved') => {
    try {
      const existing = sessionStorage.getItem('jobgen_candidate_pipeline');
      let pipeline = existing ? JSON.parse(existing) : null;
      if (!pipeline) {
        pipeline = { saved: [], applied: [], interviewing: [], offers: [] };
      }
      pipeline[targetStage] = [newJob, ...(pipeline[targetStage] || [])];
      sessionStorage.setItem('jobgen_candidate_pipeline', JSON.stringify(pipeline));
    } catch (e) {}
    setOverviewToast(`Added ${newJob.title} at ${newJob.company} to pipeline!`);
    setTimeout(() => setOverviewToast(null), 3500);
  };

  // Live real-time clock (hours & mins)
  const [liveTime, setLiveTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Events / Tasks per day matching reference image checkboxes (14 days across 2 weeks)
  const [dayEvents, setDayEvents] = useState({
    0: [
      { id: 1, text: 'Automated testing assessment', done: true },
      { id: 2, text: 'Initial usability assessment', done: false },
      { id: 3, text: 'Updating documentation & notes', done: false }
    ],
    1: [
      { id: 4, text: 'Update ATS keywords on CV', done: true },
      { id: 5, text: 'Stripe screening call prep', done: true },
      { id: 6, text: 'Mock behavioral interview rehearsal', done: false }
    ],
    2: [
      { id: 7, text: 'Automated testing assessment', done: true },
      { id: 8, text: 'Initial usability assessment', done: false },
      { id: 9, text: 'Updating documentation & notes', done: false }
    ],
    3: [
      { id: 10, text: 'Canva System Design Rehearsal', done: true },
      { id: 11, text: 'Portfolio walkthrough with mentor', done: false },
      { id: 12, text: 'Submit take-home project code', done: false }
    ],
    4: [
      { id: 13, text: 'Technical challenge submission', done: true },
      { id: 14, text: 'Follow-up email to Google recruiter', done: false },
      { id: 15, text: 'Review compensation benchmarks', done: false }
    ],
    5: [
      { id: 16, text: 'Weekly mock interview session', done: true },
      { id: 17, text: 'Optimize LinkedIn presence', done: false },
      { id: 18, text: 'Connect with 5 hiring managers', done: false }
    ],
    6: [
      { id: 19, text: 'Plan next sprint applications', done: true },
      { id: 20, text: 'Prepare interview talking points', done: false },
      { id: 21, text: 'Audit GitHub repositories', done: false }
    ],
    7: [
      { id: 22, text: 'Final Round: Canva On-site prep', done: false },
      { id: 23, text: 'Review Staff Talent offer guidelines', done: false },
      { id: 24, text: 'System Architecture briefing', done: true }
    ],
    8: [
      { id: 25, text: 'Mock salary negotiation call', done: false },
      { id: 26, text: 'Update portfolio case study metrics', done: true },
      { id: 27, text: 'Sync with mentor on offer options', done: false }
    ],
    9: [
      { id: 28, text: 'Atlassian System Design round', done: false },
      { id: 29, text: 'Sync with recruiter Sarah (Stripe)', done: false },
      { id: 30, text: 'Send post-interview thank you email', done: false }
    ],
    10: [
      { id: 31, text: 'Review team fit presentation slides', done: false },
      { id: 32, text: 'Coffee chat with Engineering Director', done: false },
      { id: 33, text: 'Follow-up on references status', done: true }
    ],
    11: [
      { id: 34, text: 'Compare equity & compensation tiers', done: false },
      { id: 35, text: 'Submit background check documents', done: false },
      { id: 36, text: 'Schedule final team match chat', done: false }
    ],
    12: [
      { id: 37, text: 'Weekend career sprint recap', done: false },
      { id: 38, text: 'Review next quarter job market trends', done: false }
    ],
    13: [
      { id: 39, text: 'Plan upcoming sprint goals & targets', done: false },
      { id: 40, text: 'Refine executive CV summary', done: false }
    ],
  });

  // Task Popup Modal State
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [taskTitleInput, setTaskTitleInput] = useState('');
  const [taskTargetDay, setTaskTargetDay] = useState(2);

  // Recruiter Contacts State & Popup Modal
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Sarah', company: 'Stripe', role: 'Tech Recruiter', status: 'Active', avatarBg: '#6366F1', initial: 'S', statusColor: '#10B981', statusBg: 'rgba(16, 185, 129, 0.16)' },
    { id: 2, name: 'David', company: 'Google', role: 'Staff Talent', status: 'Interview', avatarBg: '#3B82F6', initial: 'D', statusColor: '#38BDF8', statusBg: 'rgba(56, 189, 248, 0.16)' },
    { id: 3, name: 'Elena', company: 'Canva', role: 'Eng Director', status: 'Offer', avatarBg: '#EC4899', initial: 'E', statusColor: '#EC4899', statusBg: 'rgba(236, 72, 153, 0.16)' },
  ]);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [contactNameInput, setContactNameInput] = useState('');
  const [contactCompanyInput, setContactCompanyInput] = useState('');
  const [contactRoleInput, setContactRoleInput] = useState('');
  const [contactStatusInput, setContactStatusInput] = useState('Active');

  const toggleEvent = (dayIdx, eventId) => {
    setDayEvents(prev => ({
      ...prev,
      [dayIdx]: (prev[dayIdx] || []).map(ev => ev.id === eventId ? { ...ev, done: !ev.done } : ev)
    }));
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!taskTitleInput.trim()) return;
    const newEv = { id: Date.now(), text: taskTitleInput.trim(), done: false };
    setDayEvents(prev => ({
      ...prev,
      [taskTargetDay]: [...(prev[taskTargetDay] || []), newEv]
    }));
    setSelectedCalendarDay(taskTargetDay);
    setTaskTitleInput('');
    setShowAddTaskModal(false);
  };

  const handleCreateContact = (e) => {
    e.preventDefault();
    if (!contactNameInput.trim() || !contactCompanyInput.trim()) return;

    const palette = ['#6366F1', '#3B82F6', '#EC4899', '#10B981', '#8B5CF6', '#F59E0B', '#06B6D4'];
    const chosenColor = palette[contacts.length % palette.length];

    let statusColor = '#10B981';
    let statusBg = 'rgba(16, 185, 129, 0.16)';
    if (contactStatusInput === 'Interview') {
      statusColor = '#38BDF8';
      statusBg = 'rgba(56, 189, 248, 0.16)';
    } else if (contactStatusInput === 'Offer') {
      statusColor = '#EC4899';
      statusBg = 'rgba(236, 72, 153, 0.16)';
    } else if (contactStatusInput === 'Screening') {
      statusColor = '#F59E0B';
      statusBg = 'rgba(245, 158, 11, 0.16)';
    }

    const newContact = {
      id: Date.now(),
      name: contactNameInput.trim(),
      company: contactCompanyInput.trim(),
      role: contactRoleInput.trim() || 'Recruiter',
      status: contactStatusInput,
      avatarBg: chosenColor,
      initial: contactNameInput.trim().charAt(0).toUpperCase() || 'C',
      statusColor,
      statusBg
    };

    setContacts(prev => [newContact, ...prev]);
    setContactNameInput('');
    setContactCompanyInput('');
    setContactRoleInput('');
    setContactStatusInput('Active');
    setShowAddContactModal(false);
  };

  // 4 Cards inside monitor screen when video finishes: Applied, Saved, Interviewing, Offers
  const PIPELINE_CARDS = [
    {
      label: 'APPLIED',
      value: '14',
      route: 'jobs',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    },
    {
      label: 'SAVED',
      value: '8',
      route: 'pipeline',
      icon: Bookmark,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    },
    {
      label: 'INTERVIEWING',
      value: '3',
      route: 'interview',
      icon: Video,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      label: 'OFFERS',
      value: '2',
      route: 'jobs',
      icon: Award,
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    },
  ];

  // Recent Tech Job News with dedicated imagery for each news item
  const JOB_NEWS_ITEMS = [
    {
      id: 1,
      title: 'Canva & Atlassian open 450+ remote engineering & product roles',
      source: 'Sydney Pulse',
      time: '12m ago',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      title: 'Senior Staff & Principal Engineers see 14% compensation rise in APAC',
      source: 'Global Comp',
      time: '42m ago',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'Stripe expands APAC operations with new Melbourne innovation center',
      source: 'Fintech Daily',
      time: '2h ago',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      title: '82% of top tech firms fast-track candidates with AI-assisted portfolios',
      source: 'Talent Trends',
      time: '3h ago',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80'
    },
  ];
  const [currentNewsIdx, setCurrentNewsIdx] = useState(0);



  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNewsIdx(prev => (prev + 1) % JOB_NEWS_ITEMS.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [JOB_NEWS_ITEMS.length]);

  const handleNextNews = (e) => {
    e?.stopPropagation();
    setCurrentNewsIdx(prev => (prev + 1) % JOB_NEWS_ITEMS.length);
  };

  const handlePrevNews = (e) => {
    e?.stopPropagation();
    setCurrentNewsIdx(prev => (prev - 1 + JOB_NEWS_ITEMS.length) % JOB_NEWS_ITEMS.length);
  };

  // Dynamic 2-week calendar (This week + Next week) matching user reference layout
  const calendarWeeks = useMemo(() => {
    const now = new Date();
    const currentDay = now.getDay();
    // Monday as start of current week
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(now);
    monday.setDate(now.getDate() + mondayOffset);

    const dayInitials = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const dotsPatternCurrent = [true, false, true, true, false, true, false]; // Current week events
    const dotsPatternNext = [false, true, true, false, true, false, true]; // Next week events

    const currentWeek = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      currentWeek.push({
        index: i,
        initial: dayInitials[i],
        dateNum: d.getDate(),
        hasDot: dotsPatternCurrent[i],
        isToday: d.toDateString() === now.toDateString(),
        fullDate: d,
        weekLabel: 'This week',
      });
    }

    const nextMonday = new Date(monday);
    nextMonday.setDate(monday.getDate() + 7);

    const nextWeek = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(nextMonday);
      d.setDate(nextMonday.getDate() + i);
      nextWeek.push({
        index: i + 7,
        initial: dayInitials[i],
        dateNum: d.getDate(),
        hasDot: dotsPatternNext[i],
        isToday: d.toDateString() === now.toDateString(),
        fullDate: d,
        weekLabel: 'Next week',
      });
    }

    const nextSunday = new Date(nextMonday);
    nextSunday.setDate(nextMonday.getDate() + 6);
    const rangeText = `${monday.toLocaleDateString('en-US', { month: 'short' })} ${monday.getDate()} - ${nextSunday.toLocaleDateString('en-US', { month: 'short' })} ${nextSunday.getDate()}`;

    return {
      rangeText,
      currentWeek,
      nextWeek,
      allDays: [...currentWeek, ...nextWeek],
    };
  }, []);

  // Dynamic time-of-day greeting (Good morning / Good afternoon / Good evening)
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Play hero video with AUDIO UNMUTED on first website load
  useEffect(() => {
    const video = heroVideoRef.current;
    if (heroPlaying && video) {
      video.muted = false;
      video.volume = 1;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay with sound restricted by browser policy; starting playback and unmuting on first interaction:', err);
          video.muted = true;
          video.play().then(() => {
            const handleFirstGesture = () => {
              if (heroVideoRef.current) {
                heroVideoRef.current.muted = false;
                heroVideoRef.current.volume = 1;
              }
              ['click', 'pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(ev =>
                window.removeEventListener(ev, handleFirstGesture)
              );
            };
            ['click', 'pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(ev =>
              window.addEventListener(ev, handleFirstGesture, { once: true, passive: true })
            );
          });
        });
      }
    }
  }, [heroPlaying]);

  // Global listener to ensure audio is unmuted on earliest interaction
  useEffect(() => {
    const unmuteOnInteraction = () => {
      if (heroVideoRef.current) {
        heroVideoRef.current.muted = false;
        heroVideoRef.current.volume = 1;
      }
      ['pointerdown', 'click', 'keydown', 'touchstart'].forEach(ev =>
        window.removeEventListener(ev, unmuteOnInteraction)
      );
    };

    ['pointerdown', 'click', 'keydown', 'touchstart'].forEach(ev =>
      window.addEventListener(ev, unmuteOnInteraction, { once: true, passive: true })
    );

    return () => {
      ['pointerdown', 'click', 'keydown', 'touchstart'].forEach(ev =>
        window.removeEventListener(ev, unmuteOnInteraction)
      );
    };
  }, []);

  const handleHeroEnd = () => {
    globalHasSeenHeroVideo = true;
    try {
      sessionStorage.setItem('jobgen_has_seen_hero', 'true');
    } catch { }
    setHeroFading(true);
    setTimeout(() => {
      setHeroPlaying(false);
      setHeroFading(false);
      setCardsVisible(true);
    }, 600);
  };

  // Video Call Meeting Floating Bar States (Screen Share, Mute, End Call, Camera Off, Fullscreen)
  const [videoMuted, setVideoMuted] = useState(false);
  const [videoCameraOff, setVideoCameraOff] = useState(false);
  const [videoFullscreen, setVideoFullscreen] = useState(false);
  const [videoScreenShared, setVideoScreenShared] = useState(false);

  useEffect(() => {
    const onFsChange = () => setVideoFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const handleToggleMute = (e) => {
    e.stopPropagation();
    if (heroVideoRef.current) {
      const nextMuted = !heroVideoRef.current.muted;
      heroVideoRef.current.muted = nextMuted;
      setVideoMuted(nextMuted);
    }
  };

  const handleToggleCamera = (e) => {
    e.stopPropagation();
    setVideoCameraOff(prev => !prev);
  };

  const handleToggleScreenShare = (e) => {
    e.stopPropagation();
    setVideoScreenShared(prev => !prev);
  };

  const handleToggleFullscreen = (e) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      if (heroVideoRef.current?.requestFullscreen) {
        heroVideoRef.current.requestFullscreen().catch(() => {});
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const handleEndCall = (e) => {
    e.stopPropagation();
    handleHeroEnd();
  };

  return (
    <div style={{ position: 'relative', overflowX: 'clip', overflowY: 'visible', paddingBottom: '0px', width: '100%', paddingRight: '0' }}>

      {/* ATMOSPHERIC GLOW FLARES */}
      <div className="glow-flare-cyan" style={{ top: '-100px', right: '5%', opacity: 0.6 }} />
      <div className="glow-flare-blue" style={{ top: '250px', left: '-100px', opacity: 0.4 }} />

      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>

        {/* ==========================================================================
            FIRST SECTION: BLENDED WAVES BACKGROUND (FIXED POSITION, ZERO SHIFT)
            ========================================================================== */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 'none',
            margin: '0 0 28px 0',
            aspectRatio: '3840 / 2370',
            overflow: 'visible',
          }}
        >
          {/* Dynamic Greeting & Action Buttons on Left, Progressive Circular Cards on Right */}
          <div
            style={{
              position: 'absolute',
              top: 'clamp(36px, 3.8vw, 54px)',
              left: '24px',
              right: '28px',
              zIndex: 25,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {/* Left Column: Big Greeting + Animated Name & Two Rounded Rectangle Buttons (Shifted up 15px) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingTop: '6px', transform: 'translateY(-15px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', lineHeight: 1, flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: 'clamp(28px, 3.4vw, 48px)',
                  fontWeight: 800,
                  color: '#090C15',
                  letterSpacing: '-0.03em',
                  fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
                  textShadow: '0 2px 14px rgba(255, 255, 255, 0.9)',
                  lineHeight: 1
                }}>
                  Good Morning,
                </span>
                <span
                  className="animated-hero-name"
                  style={{
                    fontSize: 'clamp(30px, 3.8vw, 54px)',
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                    fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
                    lineHeight: 1
                  }}
                >
                  Jax Miller
                </span>
                <img 
                  src="/cofe.png" 
                  alt="Coffee" 
                  style={{ 
                    height: 'clamp(54px, 6.4vw, 82px)', 
                    width: 'auto', 
                    objectFit: 'contain',
                    verticalAlign: 'middle',
                    marginLeft: '-9px',
                    filter: 'drop-shadow(0 4px 14px rgba(0, 0, 0, 0.09))',
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }} 
                />
              </div>

              {/* Motivational Tagline: Tight spacing directly below greeting, enlarged text */}
              <p
                style={{
                  margin: '3px 0 6px 0',
                  fontSize: 'clamp(14.5px, 1.35vw, 18px)',
                  fontWeight: 650,
                  color: '#334155',
                  letterSpacing: '-0.015em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
                  textShadow: '0 1px 10px rgba(255, 255, 255, 0.9)',
                  lineHeight: 1.25,
                }}
              >
                <Sparkles size={16} color="#1A53CF" style={{ flexShrink: 0 }} />
                <span>Let’s get started for today — your next career breakthrough is just one application away.</span>
              </p>

              {/* Two Rounded Rectangle Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', pointerEvents: 'auto', marginTop: '2px' }}>
                {/* Button 1: Add Job */}
                <button
                  onClick={() => setShowAddJobModal(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #1A53CF 0%, #0070F3 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    boxShadow: '0 4px 14px rgba(26, 83, 207, 0.35)',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    letterSpacing: '-0.01em',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1.5px)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(26, 83, 207, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(26, 83, 207, 0.35)';
                  }}
                >
                  <Plus size={15} color="#FFFFFF" strokeWidth={2.5} />
                  <span>Add Job</span>
                </button>

                {/* Button 2: Add Resume */}
                <button
                  onClick={() => onNavigate('resume')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    color: '#090C15',
                    border: '1px solid rgba(226, 232, 240, 0.95)',
                    boxShadow: '0 2px 10px rgba(15, 23, 42, 0.08)',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    letterSpacing: '-0.01em',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1.5px)';
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(15, 23, 42, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(15, 23, 42, 0.08)';
                  }}
                >
                  <FileText size={15} color="#1A53CF" strokeWidth={2.2} />
                  <span>Add Resume</span>
                </button>
              </div>
            </div>

            {/* Right Column: Progressive Smaller Circular Cards */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                pointerEvents: 'auto',
                flexShrink: 0
              }}
            >
              {/* 1. Large: Circular Liquid Glass Date Card */}
              <div
                style={{
                  width: 'clamp(74px, 6.6vw, 92px)',
                  height: 'clamp(74px, 6.6vw, 92px)',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.55)',
                  backdropFilter: 'blur(20px) saturate(190%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(190%)',
                  border: '1.5px solid rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 12px 36px rgba(15, 23, 42, 0.12), inset 0 2px 10px rgba(255, 255, 255, 0.9), 0 0 20px rgba(56, 189, 248, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                {/* Glossy Liquid Sheen Reflection */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '-20%',
                    right: '-20%',
                    height: '55%',
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.05) 100%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                  }}
                />

                {/* Day */}
                <span
                  style={{
                    fontSize: 'clamp(8.5px, 0.8vw, 10.5px)',
                    fontWeight: 800,
                    color: '#1A53CF',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    lineHeight: 1,
                    fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
                    marginBottom: '2px',
                    zIndex: 2,
                  }}
                >
                  {new Date().toLocaleDateString('en-US', { weekday: 'short' })}
                </span>

                {/* Date Number */}
                <span
                  style={{
                    fontSize: 'clamp(20px, 2.1vw, 30px)',
                    fontWeight: 900,
                    color: '#090C15',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
                    zIndex: 2,
                  }}
                >
                  {new Date().getDate()}
                </span>

                {/* Month */}
                <span
                  style={{
                    fontSize: 'clamp(8.5px, 0.8vw, 10.5px)',
                    fontWeight: 800,
                    color: '#64748B',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    lineHeight: 1,
                    fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
                    marginTop: '2px',
                    zIndex: 2,
                  }}
                >
                  {new Date().toLocaleDateString('en-US', { month: 'short' })}
                </span>
              </div>

              {/* 2. Medium: Black Circular Card with GitHub Button */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                title="GitHub Profile"
                style={{
                  width: 'clamp(46px, 4.2vw, 56px)',
                  height: 'clamp(46px, 4.2vw, 56px)',
                  borderRadius: '50%',
                  backgroundColor: '#090C15',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1.5px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.6), 0 0 16px rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.35)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                }}
              >
                {/* Specular sheen */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '-20%',
                    right: '-20%',
                    height: '50%',
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 100%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                  }}
                />
                <svg 
                  width="30" 
                  height="30" 
                  viewBox="0 0 24 24" 
                  fill="#FFFFFF"
                  style={{ 
                    width: 'clamp(26px, 2.4vw, 32px)', 
                    height: 'clamp(26px, 2.4vw, 32px)', 
                    filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5))' 
                  }}
                >
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>

              {/* 3. Small: Progressively Smaller Circular Card with LinkedIn Button */}
              <a
                href="https://www.linkedin.com/company/jobgenai/"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn Profile"
                style={{
                  width: 'clamp(36px, 3.4vw, 44px)',
                  height: 'clamp(36px, 3.4vw, 44px)',
                  borderRadius: '50%',
                  backgroundColor: '#0A66C2',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1.5px solid rgba(255, 255, 255, 0.4)',
                  boxShadow: '0 6px 20px rgba(10, 102, 194, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.12) translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(10, 102, 194, 0.6), 0 0 15px rgba(56, 189, 248, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(10, 102, 194, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.5)';
                }}
              >
                {/* Specular sheen */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '-20%',
                    right: '-20%',
                    height: '50%',
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, transparent 100%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                  }}
                />
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="#FFFFFF"
                  style={{ 
                    width: 'clamp(22px, 2vw, 26px)', 
                    height: 'clamp(22px, 2vw, 26px)', 
                    filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.4))' 
                  }}
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z" />
                </svg>
              </a>
            </div>
          </div>
          {/* Scaled Scene Wrapper: Scales the waves bg video, monitor screen, herow.mp4, and cards together in 1:1 lockstep */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              transform: 'scale(1.024)',
              transformOrigin: '54% 49%',
              pointerEvents: 'auto',
            }}
          >
            {/* Waves Video: Fully Blended with Background, Attached with Zero Right Gap */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: 0,
                maskImage: 'radial-gradient(ellipse 78% 70% at 50% 50%, rgba(0,0,0,1) 45%, rgba(0,0,0,0.85) 72%, rgba(0,0,0,0) 98%)',
                WebkitMaskImage: 'radial-gradient(ellipse 78% 70% at 50% 50%, rgba(0,0,0,1) 45%, rgba(0,0,0,0.85) 72%, rgba(0,0,0,0) 98%)',
              }}
            >
              <video
                key="/waves.mp4"
                src="/waves.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.98,
                  filter: 'contrast(1.22) saturate(1.08)',
                  display: 'block',
                }}
              >
                <source src="/waves.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Subtle Black Fade Shadow Overlay Around the White Plate / Lane */}
            <div
              style={{
                position: 'absolute',
                left: '28.86%',
                top: '25.0%',
                width: '50.86%',
                height: '47.69%',
                borderRadius: '26px',
                pointerEvents: 'none',
                zIndex: 5,
                boxShadow: '0 10px 36px -4px rgba(0, 0, 0, 0.22), 0 3px 10px -2px rgba(0, 0, 0, 0.12), inset 0 0 1px 1px rgba(0, 0, 0, 0.06)',
              }}
            />

            {/* The White Space: Precisely Locked to the White Card Screen inside waves.mp4 */}
            <div
              style={{
                position: 'absolute',
                left: 'calc(28.86% - 12px)',
                top: 'calc(26.6% - 12.5px)',
                width: 'calc(50.86% + 24px)',
                height: 'calc(44.6% + 25px)',
                zIndex: 10,
                borderRadius: '26px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
              }}
            >
              {/* When Hero Video is Playing - Video Call Meeting Control Bar */}
              {heroPlaying ? (
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#000000',
                    opacity: heroFading ? 0 : 1,
                    transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <video
                    ref={heroVideoRef}
                    src="/herow.mp4"
                    playsInline
                    autoPlay
                    onEnded={handleHeroEnd}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      filter: videoCameraOff ? 'brightness(0)' : 'none',
                      transition: 'filter 0.3s ease',
                    }}
                  />

                  {/* Video Call Action Buttons (Auto-Disappears When Video Ends) */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 'clamp(10px, 1.4vw, 22px)',
                      left: '50%',
                      transform: heroFading ? 'translateX(-50%) translateY(12px) scale(0.92)' : 'translateX(-50%) translateY(0) scale(1)',
                      opacity: heroFading ? 0 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'clamp(6px, 0.8vw, 12px)',
                      zIndex: 35,
                      pointerEvents: heroFading ? 'none' : 'auto',
                      transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {/* 1. Screen Share Button */}
                    <button
                      type="button"
                      onClick={handleToggleScreenShare}
                      title={videoScreenShared ? 'Stop Sharing Screen' : 'Share Screen'}
                      style={{
                        width: 'clamp(30px, 2.4vw, 42px)',
                        height: 'clamp(30px, 2.4vw, 42px)',
                        borderRadius: '50%',
                        backgroundColor: videoScreenShared ? 'rgba(59, 130, 246, 0.9)' : 'rgba(75, 78, 85, 0.82)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'transform 0.18s ease, background-color 0.2s ease, box-shadow 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.backgroundColor = videoScreenShared ? 'rgba(37, 99, 235, 0.95)' : 'rgba(95, 100, 110, 0.95)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.backgroundColor = videoScreenShared ? 'rgba(59, 130, 246, 0.9)' : 'rgba(75, 78, 85, 0.82)';
                      }}
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h6" />
                        <path d="M4 4v6" />
                        <path d="M4 4l7 7" />
                        <path d="M15 4h5a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1" />
                        <path d="M12 16v4" />
                        <path d="M8 20h8" />
                      </svg>
                    </button>

                    {/* 2. Microphone Mute / Unmute Button */}
                    <button
                      type="button"
                      onClick={handleToggleMute}
                      title={videoMuted ? 'Unmute Microphone' : 'Mute Microphone'}
                      style={{
                        width: 'clamp(30px, 2.4vw, 42px)',
                        height: 'clamp(30px, 2.4vw, 42px)',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(75, 78, 85, 0.82)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'transform 0.18s ease, background-color 0.2s ease, box-shadow 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.backgroundColor = 'rgba(95, 100, 110, 0.95)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.backgroundColor = 'rgba(75, 78, 85, 0.82)';
                      }}
                    >
                      {videoMuted ? (
                        <MicOff size={18} strokeWidth={2.3} />
                      ) : (
                        <Mic size={18} strokeWidth={2.3} />
                      )}
                    </button>

                    {/* 3. Red End Call 'X' Button (Prominent Center Button) */}
                    <button
                      type="button"
                      onClick={handleEndCall}
                      title="End Call / Skip Video"
                      style={{
                        width: 'clamp(34px, 2.8vw, 48px)',
                        height: 'clamp(34px, 2.8vw, 48px)',
                        borderRadius: '50%',
                        backgroundColor: '#FF4A4A',
                        backgroundImage: 'linear-gradient(135deg, #FF5C5C 0%, #EA3B3B 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.28)',
                        boxShadow: '0 4px 18px rgba(239, 68, 68, 0.5), 0 2px 6px rgba(0, 0, 0, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, filter 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.12)';
                        e.currentTarget.style.filter = 'brightness(1.12)';
                        e.currentTarget.style.boxShadow = '0 6px 24px rgba(239, 68, 68, 0.7)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.filter = 'none';
                        e.currentTarget.style.boxShadow = '0 4px 18px rgba(239, 68, 68, 0.5), 0 2px 6px rgba(0, 0, 0, 0.35)';
                      }}
                    >
                      <X size={21} strokeWidth={2.9} color="#FFFFFF" />
                    </button>

                    {/* 4. Camera Video Off / On Button */}
                    <button
                      type="button"
                      onClick={handleToggleCamera}
                      title={videoCameraOff ? 'Turn Camera On' : 'Turn Camera Off'}
                      style={{
                        width: 'clamp(30px, 2.4vw, 42px)',
                        height: 'clamp(30px, 2.4vw, 42px)',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(75, 78, 85, 0.82)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'transform 0.18s ease, background-color 0.2s ease, box-shadow 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.backgroundColor = 'rgba(95, 100, 110, 0.95)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.backgroundColor = 'rgba(75, 78, 85, 0.82)';
                      }}
                    >
                      {videoCameraOff ? (
                        <VideoOff size={18} strokeWidth={2.3} />
                      ) : (
                        <Video size={18} strokeWidth={2.3} />
                      )}
                    </button>

                    {/* 5. Maximize / Fullscreen Button */}
                    <button
                      type="button"
                      onClick={handleToggleFullscreen}
                      title={videoFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                      style={{
                        width: 'clamp(30px, 2.4vw, 42px)',
                        height: 'clamp(30px, 2.4vw, 42px)',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(75, 78, 85, 0.82)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'transform 0.18s ease, background-color 0.2s ease, box-shadow 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.backgroundColor = 'rgba(95, 100, 110, 0.95)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.backgroundColor = 'rgba(75, 78, 85, 0.82)';
                      }}
                    >
                      {videoFullscreen ? (
                        <Minimize2 size={18} strokeWidth={2.3} />
                      ) : (
                        <Maximize2 size={18} strokeWidth={2.3} />
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* When Hero Video finishes: 4 Cards inside this white space only */
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    padding: 'clamp(14px, 1.5vw, 22px) clamp(16px, 1.8vw, 26px)',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'stretch',
                    opacity: cardsVisible ? 1 : 0,
                    transform: cardsVisible ? 'scale(1)' : 'scale(0.97)',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {/* 4 Cards Grid - Sits 100% Inside the White Monitor Screen */}
                  <div
                    style={{
                      flex: 1,
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                      gap: 'clamp(10px, 1.1vw, 16px)',
                      alignItems: 'stretch'
                    }}
                  >
                    {PIPELINE_CARDS.map((card, idx) => (
                      <div
                        key={idx}
                        onClick={() => onNavigate(card.route)}
                        style={{
                          position: 'relative',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
                          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                          minWidth: 0,
                          backgroundColor: '#0F172A',
                          border: '1px solid rgba(255, 255, 255, 0.16)',
                          display: 'flex',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.35)';
                          const img = e.currentTarget.querySelector('.card-bg-img');
                          if (img) img.style.transform = 'scale(1.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.2)';
                          const img = e.currentTarget.querySelector('.card-bg-img');
                          if (img) img.style.transform = 'scale(1)';
                        }}
                      >
                        {/* Background Image with Zoom Transition */}
                        <div
                          className="card-bg-img"
                          style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `url(${card.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                          }}
                        />

                        {/* Dark Contrast Gradient Overlay */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.3) 0%, rgba(15, 23, 42, 0.78) 100%)',
                          }}
                        />

                        {/* White Favicon Placed Directly Over the Image */}
                        <div
                          style={{
                            position: 'absolute',
                            top: 'clamp(12px, 1.3vw, 18px)',
                            left: 'clamp(12px, 1.3vw, 18px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 6,
                            filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 6px rgba(0, 0, 0, 0.8))',
                          }}
                        >
                          <card.icon
                            style={{
                              width: 'clamp(22px, 2.3vw, 30px)',
                              height: 'clamp(22px, 2.3vw, 30px)',
                            }}
                            color="#FFFFFF"
                            fill="#FFFFFF"
                            strokeWidth={2.4}
                          />
                        </div>

                        {/* Horizontal Number at Bottom Left: Even Bigger size */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 'clamp(10px, 1.2vw, 15px)',
                            left: 'clamp(10px, 1.2vw, 15px)',
                            fontSize: 'clamp(32px, 3.8vw, 50px)',
                            fontWeight: 900,
                            color: '#FFFFFF',
                            lineHeight: 1,
                            letterSpacing: '-0.03em',
                            textShadow: '0 2px 18px rgba(0, 0, 0, 0.98)',
                            fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
                            zIndex: 5,
                          }}
                        >
                          {card.value}
                        </div>

                        {/* Vertical Text Label: Even Bigger typography for maximum readability */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 'clamp(10px, 1.2vw, 15px)',
                            right: 'clamp(10px, 1.2vw, 15px)',
                            writingMode: 'vertical-rl',
                            transform: 'rotate(180deg)',
                            fontSize: 'clamp(17px, 1.9vw, 25px)',
                            fontWeight: 900,
                            color: '#FFFFFF',
                            letterSpacing: '0.10em',
                            textTransform: 'uppercase',
                            textShadow: '0 2px 16px rgba(0, 0, 0, 0.98), 0 0 24px rgba(0, 0, 0, 0.85)',
                            fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
                            lineHeight: 1,
                            zIndex: 5,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {card.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ==========================================================================
          WORKSPACE HUB: Strictly Matching Reference Image (media_1790430342092.png)
          - Top-Left: CALENDAR (Wide horizontal rounded card, white transparent glass)
          - Bottom-Left: NEWS (Rounded card, white transparent glass)
          - Center-Right: FREE.PNG (Dark obsidian joined flowing shape with S-curve neck)
            - Top-Right card: "Create tasks" & personal events checklist
            - Bottom-Middle card: "Take notes" & sprint documentation
          - Bottom-Right: TIME (Perfect CIRCLE card, white transparent glass)
          ========================================================================== */}
        <div
          style={{
            width: '96%',
            maxWidth: '1584px',
            margin: '-115px auto 65px auto',
            position: 'relative',
            zIndex: 25,
            aspectRatio: '675 / 362',
            boxSizing: 'border-box',
          }}
        >
          {/* ==========================================================================
            BACKGROUND BEHIND CARDS:
            1. THIN VERTICAL LINES ON RIGHT SIDE
            2. MOVING BLUE MIST ANIMATION
            ========================================================================== */}
          {/* 1. Thin Vertical Lines on Right Side behind Cards (Smoothly Faded on All Edges with Extended Gradient) */}
          <div
            style={{
              position: 'absolute',
              right: '-2%',
              top: '-6%',
              width: '46%',
              height: '118%',
              pointerEvents: 'none',
              zIndex: 0,
              maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.95) 8%, rgba(0, 0, 0, 0.9) 60%, rgba(0, 0, 0, 0.4) 78%, rgba(0, 0, 0, 0.1) 90%, transparent 98%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.95) 8%, rgba(0, 0, 0, 0.9) 60%, rgba(0, 0, 0, 0.4) 78%, rgba(0, 0, 0, 0.1) 90%, transparent 98%)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                maskImage: 'linear-gradient(to left, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.5) 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to left, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.5) 60%, transparent 100%)',
              }}
            >
              {/* Dense thin vertical tech lines */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'repeating-linear-gradient(90deg, rgba(56, 189, 248, 0.28) 0px, rgba(56, 189, 248, 0.28) 1px, transparent 1px, transparent 18px)',
                }}
              />
              {/* Subtle accent vertical lines with slightly higher contrast */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'repeating-linear-gradient(90deg, rgba(37, 99, 235, 0.42) 0px, rgba(37, 99, 235, 0.42) 1.5px, transparent 1.5px, transparent 90px)',
                  opacity: 0.85,
                }}
              />
            </div>
          </div>

          {/* 2. Blue Mist Animation Moving Around (Smooth Drifting Atmospheric Clouds with Bottom Fade) */}
          <div
            style={{
              position: 'absolute',
              inset: '-12% -10% -12% -10%',
              pointerEvents: 'none',
              zIndex: 0,
              overflow: 'visible',
              maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 1) 12%, rgba(0, 0, 0, 1) 65%, rgba(0, 0, 0, 0.35) 82%, transparent 95%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 1) 12%, rgba(0, 0, 0, 1) 65%, rgba(0, 0, 0, 0.35) 82%, transparent 95%)',
            }}
          >
            {/* Blue Mist Cloud 1 - Drifting Cyan / Sky Blue */}
            <div
              style={{
                position: 'absolute',
                left: '12%',
                top: '8%',
                width: '54%',
                height: '68%',
                background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(56, 189, 248, 0.45) 0%, rgba(14, 165, 233, 0.22) 50%, transparent 72%)',
                filter: 'blur(58px)',
                animation: 'blueMistDrift1 15s ease-in-out infinite',
                willChange: 'transform, opacity',
              }}
            />

            {/* Blue Mist Cloud 2 - Deep Electric Sapphire / Royal Azure Swirling */}
            <div
              style={{
                position: 'absolute',
                right: '6%',
                top: '20%',
                width: '52%',
                height: '72%',
                background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(37, 99, 235, 0.38) 0%, rgba(59, 130, 246, 0.2) 48%, transparent 75%)',
                filter: 'blur(65px)',
                animation: 'blueMistDrift2 19s ease-in-out infinite',
                willChange: 'transform, opacity',
              }}
            />

            {/* Blue Mist Cloud 3 - Vibrant Turquoise / Aqua Floating Pool */}
            <div
              style={{
                position: 'absolute',
                left: '38%',
                bottom: '2%',
                width: '46%',
                height: '60%',
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.36) 0%, rgba(30, 58, 138, 0.18) 46%, transparent 72%)',
                filter: 'blur(52px)',
                animation: 'blueMistDrift3 13s ease-in-out infinite',
                willChange: 'transform, opacity',
              }}
            />
          </div>

          {/* Ambient Radiant Glow Flare Across Center S-Curve Neck */}
          <div
            style={{
              position: 'absolute',
              left: '60%',
              top: '48%',
              transform: 'translate(-50%, -50%)',
              width: '46%',
              height: '46%',
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(37, 99, 235, 0.18) 50%, transparent 75%)',
              filter: 'blur(36px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* ================= 1. CALENDAR (TOP-LEFT): Glass Card with Visible Calendar Video Background ================= */}
          <div
            style={{
              position: 'absolute',
              left: '0%',
              top: '0%',
              width: '65.8%',
              height: '45.5%',
              backgroundColor: 'transparent',
              border: '5px solid #FFFFFF',
              borderRadius: 'clamp(20px, 2.5vw, 36px)',
              padding: 'clamp(12px, 1.6vw, 24px)',
              boxShadow: '0 0 32px rgba(255, 255, 255, 0.45), 0 24px 60px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
              zIndex: 2,
              overflow: 'hidden',
            }}
          >
            {/* Calendar Background Still Image from public/caln.png */}
            <img
              src="/caln.png"
              alt="Calendar Still Background"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />

            {/* Clean Soft Vignette for Crisp Contrast */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(9, 12, 21, 0.45) 0%, rgba(9, 12, 21, 0.08) 35%, rgba(9, 12, 21, 0.08) 65%, rgba(9, 12, 21, 0.5) 100%)',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            />

            {/* Header: 'Calendar' (Bigger) + Week Indicator (Range Pill Removed) */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontSize: 'clamp(20px, 1.9vw, 28px)',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    letterSpacing: '-0.015em',
                    fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
                    textShadow: '0 2px 12px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  Calendar
                </span>
              </div>
              <span
                style={{
                  fontSize: 'clamp(9px, 0.8vw, 11.5px)',
                  fontWeight: 700,
                  color: '#E2E8F0',
                  backgroundColor: 'rgba(15, 23, 42, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '2px 8px',
                  borderRadius: '6px',
                }}
              >
                {selectedCalendarDay < 7 ? 'Viewing This Week' : 'Viewing Next Week'}
              </span>
            </div>

            {/* 2 Rows of Date Columns: Row 1 This Week, Row 2 Next Week */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(3px, 0.45vw, 7px)',
                margin: '1px 0',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {/* Row 1: This Week */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2px' }}>
                  <span style={{ fontSize: 'clamp(8.5px, 0.7vw, 10.5px)', fontWeight: 700, color: 'rgba(255, 255, 255, 0.75)', textTransform: 'uppercase', letterSpacing: '0.04em', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                    This Week
                  </span>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gap: 'clamp(3px, 0.55vw, 8px)',
                    alignItems: 'center',
                  }}
                >
                  {calendarWeeks.currentWeek.map((item) => {
                    const isSelected = selectedCalendarDay === item.index;
                    return (
                      <div
                        key={item.index}
                        onClick={() => setSelectedCalendarDay(item.index)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 'clamp(3px, 0.42vw, 6px) clamp(2px, 0.35vw, 5px)',
                          borderRadius: '9px',
                          backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.14)' : 'rgba(15, 23, 42, 0.55)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: isSelected ? '2px solid #FFFFFF' : '1px solid rgba(255, 255, 255, 0.18)',
                          boxShadow: isSelected ? '0 0 12px rgba(255, 255, 255, 0.5), inset 0 0 6px rgba(255, 255, 255, 0.18)' : '0 2px 4px rgba(0, 0, 0, 0.2)',
                          cursor: 'pointer',
                          transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                          userSelect: 'none',
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.55)';
                        }}
                      >
                        <span
                          style={{
                            fontSize: 'clamp(8.5px, 0.75vw, 11px)',
                            fontWeight: 700,
                            color: isSelected ? '#FFFFFF' : '#94A3B8',
                            lineHeight: 1,
                            fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
                            textShadow: isSelected ? '0 1px 3px rgba(0, 0, 0, 0.6)' : 'none',
                          }}
                        >
                          {item.initial}
                        </span>
                        <span
                          style={{
                            fontSize: 'clamp(11px, 1.1vw, 16px)',
                            fontWeight: 800,
                            color: '#FFFFFF',
                            lineHeight: 1,
                            marginTop: '2px',
                            fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.7)',
                          }}
                        >
                          {item.dateNum}
                        </span>
                        <div
                          style={{
                            width: '3.5px',
                            height: '3.5px',
                            borderRadius: '50%',
                            backgroundColor: item.hasDot ? (isSelected ? '#FFFFFF' : '#38BDF8') : 'transparent',
                            marginTop: '2px',
                            boxShadow: item.hasDot ? (isSelected ? '0 0 5px #FFFFFF' : '0 0 5px rgba(56, 189, 248, 0.8)') : 'none',
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Row 2: Next Week */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2px' }}>
                  <span style={{ fontSize: 'clamp(8.5px, 0.7vw, 10.5px)', fontWeight: 700, color: 'rgba(255, 255, 255, 0.75)', textTransform: 'uppercase', letterSpacing: '0.04em', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                    Next Week
                  </span>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gap: 'clamp(3px, 0.55vw, 8px)',
                    alignItems: 'center',
                  }}
                >
                  {calendarWeeks.nextWeek.map((item) => {
                    const isSelected = selectedCalendarDay === item.index;
                    return (
                      <div
                        key={item.index}
                        onClick={() => setSelectedCalendarDay(item.index)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 'clamp(3px, 0.42vw, 6px) clamp(2px, 0.35vw, 5px)',
                          borderRadius: '9px',
                          backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.14)' : 'rgba(15, 23, 42, 0.55)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: isSelected ? '2px solid #FFFFFF' : '1px solid rgba(255, 255, 255, 0.18)',
                          boxShadow: isSelected ? '0 0 12px rgba(255, 255, 255, 0.5), inset 0 0 6px rgba(255, 255, 255, 0.18)' : '0 2px 4px rgba(0, 0, 0, 0.2)',
                          cursor: 'pointer',
                          transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                          userSelect: 'none',
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.55)';
                        }}
                      >
                        <span
                          style={{
                            fontSize: 'clamp(8.5px, 0.75vw, 11px)',
                            fontWeight: 700,
                            color: isSelected ? '#FFFFFF' : '#94A3B8',
                            lineHeight: 1,
                            fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
                            textShadow: isSelected ? '0 1px 3px rgba(0, 0, 0, 0.6)' : 'none',
                          }}
                        >
                          {item.initial}
                        </span>
                        <span
                          style={{
                            fontSize: 'clamp(11px, 1.1vw, 16px)',
                            fontWeight: 800,
                            color: '#FFFFFF',
                            lineHeight: 1,
                            marginTop: '2px',
                            fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.7)',
                          }}
                        >
                          {item.dateNum}
                        </span>
                        <div
                          style={{
                            width: '3.5px',
                            height: '3.5px',
                            borderRadius: '50%',
                            backgroundColor: item.hasDot ? (isSelected ? '#FFFFFF' : '#38BDF8') : 'transparent',
                            marginTop: '2px',
                            boxShadow: item.hasDot ? (isSelected ? '0 0 5px #FFFFFF' : '0 0 5px rgba(56, 189, 248, 0.8)') : 'none',
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selected Day Status Tag (No Seasons Mentioned, Clean Brand Indicator) */}
            <div
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.68)',
                borderRadius: '10px',
                padding: '5px 12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                zIndex: 2,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#38BDF8', boxShadow: '0 0 8px #38BDF8' }} />
                <span style={{ fontSize: 'clamp(11px, 0.95vw, 14px)', fontWeight: 800, color: '#FFFFFF' }}>
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][selectedCalendarDay % 7]} {calendarWeeks.allDays[selectedCalendarDay]?.dateNum} ({selectedCalendarDay < 7 ? 'This Week' : 'Next Week'})
                </span>
              </div>
              <span style={{ fontSize: 'clamp(9.5px, 0.85vw, 12.5px)', color: '#CBD5E1', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#94A3B8' }}>Scheduled</span>
                <span>•</span>
                <span style={{ color: '#38BDF8', fontWeight: 700 }}>{(dayEvents[selectedCalendarDay] || []).length} events</span>
              </span>
            </div>
          </div>

          {/* ================= 2. NEWS (BOTTOM-LEFT): White Transparent Glass Card ================= */}
          <div
            style={{
              position: 'absolute',
              left: '0%',
              top: '51.5%',
              width: '38.5%',
              height: '48.5%',
              backgroundColor: 'rgba(255, 255, 255, 0.76)',
              backdropFilter: 'blur(28px) saturate(190%)',
              WebkitBackdropFilter: 'blur(28px) saturate(190%)',
              border: '1.5px solid rgba(255, 255, 255, 0.55)',
              borderRadius: 'clamp(20px, 2.5vw, 36px)',
              padding: 'clamp(12px, 1.4vw, 22px)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.16), 0 0 32px rgba(255, 255, 255, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
              zIndex: 2,
              overflow: 'hidden',
            }}
          >
            {/* Top Row: News image + Content + Shuffle Controls */}
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              <div>
                {/* Image banner with controls overlaid */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 'clamp(120px, 13vw, 175px)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    marginBottom: '10px',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <img
                    key={JOB_NEWS_ITEMS[currentNewsIdx].id}
                    src={JOB_NEWS_ITEMS[currentNewsIdx].image}
                    alt={JOB_NEWS_ITEMS[currentNewsIdx].title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.4s ease',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 100%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Shuffle Controls on Top-Right of Image */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      zIndex: 3,
                    }}
                  >
                    <button
                      onClick={handlePrevNews}
                      title="Previous news"
                      style={{
                        border: 'none',
                        background: 'rgba(255, 255, 255, 0.88)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        borderRadius: '8px',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#090C15',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <ChevronLeft size={13} />
                    </button>
                    <button
                      onClick={handleNextNews}
                      title="Next news"
                      style={{
                        border: 'none',
                        background: 'rgba(255, 255, 255, 0.88)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        borderRadius: '8px',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#090C15',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>

                {/* Just the news headline */}
                <p
                  key={currentNewsIdx}
                  style={{
                    margin: 0,
                    fontSize: 'clamp(13px, 1.25vw, 18.5px)',
                    fontWeight: 800,
                    color: '#090C15',
                    lineHeight: 1.35,
                    letterSpacing: '-0.015em',
                    fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
                  }}
                >
                  {JOB_NEWS_ITEMS[currentNewsIdx].title}
                </p>
              </div>

              {/* Bottom: Just the source and time posted + dots */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(0, 0, 0, 0.06)', paddingTop: '8px', marginTop: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: 'clamp(11px, 1.05vw, 14.5px)', color: '#0F172A', fontWeight: 700 }}>
                    {JOB_NEWS_ITEMS[currentNewsIdx].source}
                  </span>
                  <span style={{ color: '#94A3B8' }}>•</span>
                  <span style={{ fontSize: 'clamp(10.5px, 1vw, 14px)', color: '#64748B', fontWeight: 500 }}>
                    {JOB_NEWS_ITEMS[currentNewsIdx].time}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {JOB_NEWS_ITEMS.map((_, i) => (
                    <span
                      key={i}
                      style={{
                        width: i === currentNewsIdx ? '14px' : '5px',
                        height: '5px',
                        borderRadius: '999px',
                        backgroundColor: i === currentNewsIdx ? '#0284C7' : 'rgba(0, 0, 0, 0.18)',
                        transition: 'all 0.25s ease'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ================= 3. ENLARGED FREE.PNG BACKBONE & JOINED CARDS ================= */}
          <div
            style={{
              position: 'absolute',
              left: '37.0%',
              top: '-5.0%',
              width: '63.5%',
              height: '110.0%',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          >
            {/* Flowing Joined Shape Backbone Image */}
            <img
              src={freeCardsImg}
              alt="Flowing Joined Shape"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 22px 46px rgba(0, 0, 0, 0.6))',
              }}
            />

            {/* ================= 4. TASK (TOP-RIGHT CARD OF FREE.PNG) ================= */}
            <div
              style={{
                position: 'absolute',
                left: '49.0%',
                top: '4.5%',
                width: '47.5%',
                height: '43.5%',
                padding: 'clamp(12px, 1.6vw, 26px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
                zIndex: 2,
                pointerEvents: 'auto',
                borderRadius: 'clamp(24px, 2.8vw, 36px)',
                overflow: 'hidden',
              }}
            >
              {/* Smoky Blue Mist Background Effect - Strictly clipped inside rounded card */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 'clamp(24px, 2.8vw, 36px)',
                  overflow: 'hidden',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 60% 40%, rgba(56, 189, 248, 0.28) 0%, rgba(37, 99, 235, 0.2) 40%, rgba(15, 23, 42, 0.35) 80%, transparent 100%)',
                    filter: 'blur(16px)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 70% 30%, rgba(14, 165, 233, 0.22) 0%, rgba(99, 102, 241, 0.12) 45%, transparent 70%)',
                    filter: 'blur(22px)',
                  }}
                />
              </div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                {/* Headline & Add Button - Shifted towards the right */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '10px' }}>
                  <h4 style={{ fontSize: 'clamp(20px, 1.9vw, 28px)', fontWeight: 800, color: '#FFFFFF', margin: 0, fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', letterSpacing: '-0.015em', textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)' }}>
                    Task
                  </h4>

                  <button
                    onClick={() => setShowAddTaskModal(true)}
                    title="Add new task"
                    style={{
                      border: '1.5px solid rgba(255, 255, 255, 0.35)',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 100%)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      borderRadius: '10px',
                      padding: '4px 12px',
                      marginRight: '18px',
                      color: '#FFFFFF',
                      fontSize: 'clamp(11px, 1.0vw, 13px)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.35)',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                      e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(37, 99, 235, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                      e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.35)';
                    }}
                  >
                    <Plus size={14} strokeWidth={2.5} />
                    <span>Add</span>
                  </button>
                </div>

                {/* Checkboxes Matching Reference Image (with 8px right padding) */}
                <div data-lenis-prevent="true" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4px, 0.5vw, 8px)', paddingRight: '8px', maxHeight: '145px', overflowY: 'auto' }}>
                  {(dayEvents[selectedCalendarDay] || []).slice(0, 4).map((ev) => (
                    <div
                      key={ev.id}
                      onClick={() => toggleEvent(selectedCalendarDay, ev.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '9px',
                        padding: 'clamp(6px, 0.7vw, 10px) clamp(8px, 0.9vw, 14px)',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(15, 23, 42, 0.94)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.14)',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.98)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.94)'; }}
                    >
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '5px',
                          backgroundColor: ev.done ? '#3B82F6' : 'rgba(255, 255, 255, 0.08)',
                          border: ev.done ? '1px solid #60A5FA' : '1px solid rgba(255, 255, 255, 0.25)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {ev.done && <Check size={10} color="#FFFFFF" strokeWidth={3.5} />}
                      </div>
                      <span
                        style={{
                          fontSize: 'clamp(12px, 1.1vw, 16px)',
                          color: ev.done ? '#64748B' : '#E2E8F0',
                          textDecoration: ev.done ? 'line-through' : 'none',
                          fontWeight: 500,
                          lineHeight: 1.25,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {ev.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ================= 5. CONTACT (BOTTOM-MIDDLE CARD OF FREE.PNG) ================= */}
            <div
              style={{
                position: 'absolute',
                left: '5.5%',
                top: '52.5%',
                width: '47.5%',
                height: '43.5%',
                padding: 'clamp(12px, 1.6vw, 26px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
                zIndex: 2,
                pointerEvents: 'auto',
                borderRadius: 'clamp(24px, 2.8vw, 36px)',
                overflow: 'hidden',
              }}
            >
              {/* Smoky Blue Mist Background Effect - Strictly clipped inside rounded card */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 'clamp(24px, 2.8vw, 36px)',
                  overflow: 'hidden',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 50% 50%, rgba(56, 189, 248, 0.28) 0%, rgba(37, 99, 235, 0.2) 40%, rgba(15, 23, 42, 0.35) 80%, transparent 100%)',
                    filter: 'blur(16px)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 30% 70%, rgba(14, 165, 233, 0.22) 0%, rgba(99, 102, 241, 0.12) 45%, transparent 70%)',
                    filter: 'blur(22px)',
                  }}
                />
              </div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                {/* Headline & Add Button - Shifted towards the right */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '10px' }}>
                  <h4 style={{ fontSize: 'clamp(20px, 1.9vw, 28px)', fontWeight: 800, color: '#FFFFFF', margin: 0, fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', letterSpacing: '-0.015em', textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)' }}>
                    Contact
                  </h4>
                  <button
                    onClick={() => setShowAddContactModal(true)}
                    title="Add new contact"
                    style={{
                      border: '1.5px solid rgba(255, 255, 255, 0.35)',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 100%)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      borderRadius: '10px',
                      padding: '4px 12px',
                      marginRight: '18px',
                      color: '#FFFFFF',
                      fontSize: 'clamp(11px, 1.0vw, 13px)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.35)',
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #6366F1 0%, #38BDF8 100%)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                      e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(99, 102, 241, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 100%)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                      e.currentTarget.style.transform = 'translateY(0px) scale(1)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.35)';
                    }}
                  >
                    <Plus size={14} strokeWidth={2.5} />
                    <span>Add</span>
                  </button>
                </div>

                {/* Recruiter Contact Cards (with 8px padding to the right on both container and cards) */}
                <div
                  data-lenis-prevent="true"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(4px, 0.5vw, 8px)',
                    paddingRight: '8px',
                    maxHeight: '145px',
                    overflowY: 'auto',
                  }}
                >
                  {contacts.slice(0, 4).map((c) => (
                    <div
                      key={c.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 'clamp(6px, 0.75vw, 11px) clamp(8px, 0.95vw, 14px)',
                        marginRight: '8px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(15, 23, 42, 0.94)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.98)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.94)'; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: c.avatarBg || '#6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, color: '#FFF', flexShrink: 0 }}>
                          {c.initial}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 'clamp(12px, 1.1vw, 16px)', fontWeight: 700, color: '#F8FAFC', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name} • {c.company}</div>
                          <div style={{ fontSize: 'clamp(9.5px, 0.9vw, 13px)', color: '#94A3B8' }}>{c.role}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: 'clamp(9.5px, 0.9vw, 13px)', fontWeight: 700, color: c.statusColor, backgroundColor: c.statusBg, padding: '2px 7px', borderRadius: '5px', flexShrink: 0 }}>
                        {c.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>


          {/* ================= 6. TIME (BOTTOM-RIGHT CIRCLE): Dark Graphics Circle with Long Font White Local Time & Alternating Stroke Subtitle ================= */}
          <div
            style={{
              position: 'absolute',
              left: '73.0%',
              top: '56.0%',
              width: '23.5%',
              aspectRatio: '1 / 1',
              borderRadius: '50%',
              backgroundColor: '#090C15',
              border: '5px solid #FFFFFF',
              boxShadow: '0 0 32px rgba(255, 255, 255, 0.45), 0 24px 48px rgba(0, 0, 0, 0.75)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              boxSizing: 'border-box',
              zIndex: 2,
              overflow: 'hidden',
              padding: 'clamp(8px, 1.2vw, 18px)',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px) scale(1)';
            }}
          >
            {/* Clock Background Image */}
            <img
              src="/clock.png"
              alt="Clock Background"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scale(1.05)',
                zIndex: 0,
                opacity: 0.88,
                pointerEvents: 'none',
              }}
            />

            {/* Subtle atmospheric glow behind text */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.12) 0%, rgba(14, 165, 233, 0.04) 50%, transparent 80%)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />

            {/* Concentric Right-Side Half Circle Strokes: 1 thick stroke followed by 1 slightly thinner stroke */}
            <svg
              viewBox="0 0 200 200"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            >
              <defs>
                <linearGradient id="clockStrokeGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="50%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
                <linearGradient id="clockStrokeGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {/* 1. Half Thick Circle Stroke at the Right Side */}
              <path
                d="M 100 18 A 82 82 0 0 1 100 182"
                fill="none"
                stroke="url(#clockStrokeGrad1)"
                strokeWidth="9"
                strokeLinecap="round"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.55))',
                }}
              />

              {/* 2. Followed by Another Slightly Thinner Half Circle Stroke */}
              <path
                d="M 100 34 A 66 66 0 0 1 100 166"
                fill="none"
                stroke="url(#clockStrokeGrad2)"
                strokeWidth="4.5"
                strokeLinecap="round"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.4))',
                }}
              />
            </svg>

            {/* Inner Content Stack: Time + Subtitle Message - Brought lower by additional 10px */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                margin: 'auto',
                paddingTop: '25px',
              }}
            >
              {/* Long Height Digital Local Time with Min Letter Spacing (-10% smaller) & Blue Minutes (No Glow) */}
              <span
                style={{
                  fontSize: 'clamp(45px, 5.2vw, 85px)',
                  fontWeight: 700,
                  fontFamily: '"Teko", "Bebas Neue", sans-serif',
                  lineHeight: 0.85,
                  letterSpacing: '-0.01em',
                  userSelect: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ color: '#FFFFFF' }}>
                  {liveTime.getHours().toString().padStart(2, '0')}
                </span>
                <span style={{ color: '#38BDF8', margin: '0 1px' }}>:</span>
                <span style={{ color: '#38BDF8' }}>
                  {liveTime.getMinutes().toString().padStart(2, '0')}
                </span>
              </span>

              {/* Alternating Text HYDRATING / GRINDING with Lightweight Casual Animation */}
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '1px',
                  width: '100%',
                  height: 'clamp(24px, 2.8vw, 42px)',
                  overflow: 'hidden',
                }}
              >
                <style>{`
                  @keyframes casualWordFlip {
                    0% {
                      opacity: 0;
                      transform: translateY(8px) scale(0.96);
                      filter: blur(2px);
                    }
                    60% {
                      opacity: 0.9;
                      transform: translateY(-1px) scale(1.01);
                      filter: blur(0px);
                    }
                    100% {
                      opacity: 1;
                      transform: translateY(0) scale(1);
                      filter: blur(0px);
                    }
                  }
                `}</style>
                <span
                  key={liveTime.getSeconds() % 2 === 0 ? 'HYDRATING' : 'GRINDING'}
                  style={{
                    position: 'relative',
                    fontSize: 'clamp(20px, 2.5vw, 40px)',
                    fontWeight: 800,
                    fontFamily: '"Teko", "Bebas Neue", sans-serif',
                    color: '#FFFFFF', // Solid opaque text fill
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    lineHeight: 0.9,
                    userSelect: 'none',
                    pointerEvents: 'none',
                    zIndex: 1,
                    whiteSpace: 'nowrap',
                    textShadow: '0 2px 12px rgba(0, 0, 0, 0.75), 0 0 20px rgba(56, 189, 248, 0.35)',
                    display: 'inline-block',
                    animation: 'casualWordFlip 0.38s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {liveTime.getSeconds() % 2 === 0 ? 'HYDRATING' : 'GRINDING'}
                </span>
              </div>
            </div>

            {/* Atmospheric Seamless Blend Bridge between Cards and Footer */}
            <div
              style={{
                position: 'absolute',
                left: '5%',
                right: '5%',
                bottom: '-45px',
                height: '160px',
                background: 'radial-gradient(ellipse 65% 55% at 50% 10%, rgba(56, 189, 248, 0.08) 0%, rgba(37, 99, 235, 0.03) 50%, transparent 85%)',
                filter: 'blur(35px)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
          </div>

        </div>



        {/* ==========================================================================
          ADD TASK MODAL POPUP
          ========================================================================== */}
        {showAddTaskModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(9, 12, 21, 0.78)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}
            onClick={() => setShowAddTaskModal(false)}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '440px',
                backgroundColor: '#0F172A',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 32px rgba(59, 130, 246, 0.25)',
                color: '#FFFFFF',
                boxSizing: 'border-box',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={18} color="#60A5FA" />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#FFFFFF', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                      Add New Task
                    </h3>
                    <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#94A3B8' }}>
                      Track your daily interview and job prep milestones
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddTaskModal(false)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: 'none',
                    borderRadius: '8px',
                    width: '30px',
                    height: '30px',
                    color: '#94A3B8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleCreateTask}>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
                    Task Description
                  </label>
                  <input
                    type="text"
                    autoFocus
                    required
                    value={taskTitleInput}
                    onChange={(e) => setTaskTitleInput(e.target.value)}
                    placeholder="e.g. System Design Prep with Emma AI"
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
                    Assign to Date
                  </label>
                  <select
                    value={taskTargetDay}
                    onChange={(e) => setTaskTargetDay(Number(e.target.value))}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      backgroundColor: '#1E293B',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      color: '#FFFFFF',
                      fontSize: '13.5px',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {calendarWeeks.allDays.map((d) => (
                      <option key={d.index} value={d.index}>
                        {d.weekLabel}: {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][d.index % 7]} (Day {d.dateNum})
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setShowAddTaskModal(false)}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '10px',
                      padding: '9px 16px',
                      color: '#E2E8F0',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#2563EB',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '9px 20px',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(37, 99, 235, 0.5)',
                    }}
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==========================================================================
          ADD CONTACT MODAL POPUP
          ========================================================================== */}
        {showAddContactModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(9, 12, 21, 0.78)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}
            onClick={() => setShowAddContactModal(false)}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '440px',
                backgroundColor: '#0F172A',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 32px rgba(99, 102, 241, 0.25)',
                color: '#FFFFFF',
                boxSizing: 'border-box',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(99, 102, 241, 0.2)', border: '1px solid rgba(99, 102, 241, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={18} color="#818CF8" />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#FFFFFF', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                      Add Recruiter Contact
                    </h3>
                    <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#94A3B8' }}>
                      Save hiring manager & talent contacts for fast follow-up
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddContactModal(false)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: 'none',
                    borderRadius: '8px',
                    width: '30px',
                    height: '30px',
                    color: '#94A3B8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleCreateContact}>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
                    Recruiter / Contact Name
                  </label>
                  <input
                    type="text"
                    autoFocus
                    required
                    value={contactNameInput}
                    onChange={(e) => setContactNameInput(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '10px',
                      padding: '9px 14px',
                      color: '#FFFFFF',
                      fontSize: '13.5px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
                      Company
                    </label>
                    <input
                      type="text"
                      required
                      value={contactCompanyInput}
                      onChange={(e) => setContactCompanyInput(e.target.value)}
                      placeholder="e.g. Figma"
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '10px',
                        padding: '9px 14px',
                        color: '#FFFFFF',
                        fontSize: '13.5px',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
                      Role / Title
                    </label>
                    <input
                      type="text"
                      value={contactRoleInput}
                      onChange={(e) => setContactRoleInput(e.target.value)}
                      placeholder="e.g. Lead Talent"
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '10px',
                        padding: '9px 14px',
                        color: '#FFFFFF',
                        fontSize: '13.5px',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#CBD5E1', marginBottom: '6px' }}>
                    Status Stage
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                    {['Active', 'Interview', 'Offer', 'Screening'].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setContactStatusInput(st)}
                        style={{
                          padding: '7px 4px',
                          borderRadius: '8px',
                          border: contactStatusInput === st ? '1.5px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.15)',
                          backgroundColor: contactStatusInput === st ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255, 255, 255, 0.05)',
                          color: contactStatusInput === st ? '#38BDF8' : '#CBD5E1',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          textAlign: 'center',
                        }}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setShowAddContactModal(false)}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '10px',
                      padding: '9px 16px',
                      color: '#E2E8F0',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#6366F1',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '9px 20px',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(99, 102, 241, 0.5)',
                    }}
                  >
                    Add Contact
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Job Modal Pop-Up */}
        <AddJobModal 
          isOpen={showAddJobModal} 
          onClose={() => setShowAddJobModal(false)} 
          onAddJob={handleAddNewJob} 
        />

        {/* Action Toast */}
        {overviewToast && (
          <div
            style={{
              position: 'fixed',
              bottom: '28px',
              right: '36px',
              zIndex: 9999,
              backgroundColor: '#090C15',
              color: '#FFFFFF',
              padding: '12px 20px',
              borderRadius: '999px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <CheckCircle2 size={16} color="#34D399" />
            <span>{overviewToast}</span>
          </div>
        )}

      </div>

    </div>
  );
}
