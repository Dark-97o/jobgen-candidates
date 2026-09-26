import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Video, 
  Users, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Bell, 
  ChevronRight,
  Filter,
  Bookmark
} from 'lucide-react';

const EVENTS_DATA = [
  {
    id: 1,
    title: 'Atlassian Senior/Lead PM Virtual AMA & Engineering Deep Dive',
    host: 'Atlassian Talent Team & Craig Press (VP Product)',
    date: 'Oct 3, 2026',
    time: '4:00 PM – 5:30 PM AEST',
    type: 'AMA & Networking',
    attendees: 342,
    badge: 'High Priority',
    badgeColor: '#0052FF',
    status: 'Registered',
    link: 'https://zoom.us/j/atlassian-lead-pm-ama',
    description: 'Direct panel with Atlassian product directors discussing Jira Cloud team scaling, micro-frontends roadmap, and what they look for in Lead PM case studies.'
  },
  {
    id: 2,
    title: 'Canva Design Velocity & Candidate Interview Prep Masterclass',
    host: 'Canva Product Operations & JobGen AI',
    date: 'Oct 8, 2026',
    time: '2:00 PM – 3:15 PM AEST',
    type: 'Interview Prep',
    attendees: 512,
    badge: 'Target Company',
    badgeColor: '#10B981',
    status: 'Upcoming',
    link: 'https://meet.google.com/canva-velocity',
    description: 'Learn how Canva evaluates candidate STAR responses for user-led growth, cross-functional engineering empathy, and global design governance.'
  },
  {
    id: 3,
    title: 'Sydney Tech Leadership Mixer: Product & AI Founders',
    host: 'Sydney Tech Collective',
    date: 'Oct 14, 2026',
    time: '6:00 PM – 9:00 PM AEST',
    type: 'In-Person Mixer',
    location: 'Surry Hills Tech Hub, Sydney NSW',
    attendees: 180,
    badge: 'Networking',
    badgeColor: '#8B5CF6',
    status: 'Upcoming',
    description: 'Private networking evening with heads of product, tech founders, and executive search recruiters across Australia & APAC tech ecosystems.'
  },
  {
    id: 4,
    title: 'Stripe APAC Engineering & Infrastructure Architecture Summit',
    host: 'Stripe Engineering Leadership',
    date: 'Oct 21, 2026',
    time: '11:00 AM – 1:00 PM AEST',
    type: 'Technical Summit',
    attendees: 890,
    badge: 'Tech Summit',
    badgeColor: '#00E5FF',
    status: 'Upcoming',
    description: 'Deep dive on API reliability, payment orchestration across southeast Asia, and cross-border fintech scalability.'
  }
];

export default function CareerEventsView() {
  const [filterType, setFilterType] = useState('all');
  const [registeredIds, setRegisteredIds] = useState([1]);

  const toggleRegister = (id) => {
    if (registeredIds.includes(id)) {
      setRegisteredIds(registeredIds.filter(item => item !== id));
    } else {
      setRegisteredIds([...registeredIds, id]);
    }
  };

  const filteredEvents = EVENTS_DATA.filter(event => {
    if (filterType === 'registered') return registeredIds.includes(event.id);
    if (filterType === 'virtual') return !event.location;
    if (filterType === 'in-person') return Boolean(event.location);
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header Banner */}
      <div 
        className="liquid-glass-card" 
        style={{ 
          padding: '28px 32px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '20px' 
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ 
              fontSize: '11px', 
              fontWeight: 800, 
              color: '#0052FF', 
              background: 'rgba(0, 82, 255, 0.1)', 
              padding: '4px 10px', 
              borderRadius: '9999px', 
              letterSpacing: '0.04em' 
            }}>
              CAREER EVENTS & EXCLUSIVE SESSIONS
            </span>
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              • {EVENTS_DATA.length} events scheduled for Alexander
            </span>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#090C15', letterSpacing: '-0.02em', margin: 0 }}>
            Career Events & Recruitment Mixers
          </h1>
          <p style={{ fontSize: '14px', color: '#475569', marginTop: '6px', maxWidth: '640px' }}>
            Curated hiring panels, technical AMAs with top tech leaders, and invite-only executive networking sessions matched to your profile.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255, 255, 255, 0.7)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
          {[
            { id: 'all', label: 'All Events' },
            { id: 'registered', label: 'My Registered' },
            { id: 'virtual', label: 'Virtual' },
            { id: 'in-person', label: 'In-Person' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: filterType === f.id ? '#090C15' : 'transparent',
                color: filterType === f.id ? '#FFFFFF' : '#475569',
                transition: 'all 0.15s ease'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '20px' }}>
        {filteredEvents.map(event => {
          const isRegistered = registeredIds.includes(event.id);

          return (
            <div 
              key={event.id} 
              className="liquid-glass-card" 
              style={{ 
                padding: '24px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              <div>
                {/* Event Top Meta */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <span style={{ 
                    fontSize: '11px', 
                    fontWeight: 800, 
                    color: event.badgeColor, 
                    background: `${event.badgeColor}18`, 
                    padding: '3px 9px', 
                    borderRadius: '6px',
                    border: `1px solid ${event.badgeColor}33`
                  }}>
                    {event.badge}
                  </span>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B' }}>
                    <Users size={14} />
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>

                {/* Title & Host */}
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#090C15', lineHeight: 1.35, marginBottom: '6px' }}>
                  {event.title}
                </h3>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#0052FF', marginBottom: '12px' }}>
                  {event.host}
                </p>

                {/* Event Schedule Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '12px', background: 'rgba(255, 255, 255, 0.55)', borderRadius: '10px', border: '1px solid rgba(0, 0, 0, 0.05)', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#334155' }}>
                    <CalendarIcon size={14} color="#0052FF" />
                    <strong>{event.date}</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#475569' }}>
                    <Clock size={14} color="#64748B" />
                    <span>{event.time}</span>
                  </div>
                  {event.location ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#475569' }}>
                      <MapPin size={14} color="#EF4444" />
                      <span>{event.location}</span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#475569' }}>
                      <Video size={14} color="#10B981" />
                      <span>Live Virtual Session (Interactive Q&A)</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                  {event.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(0, 0, 0, 0.06)' }}>
                <button
                  onClick={() => toggleRegister(event.id)}
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: isRegistered ? '#10B981' : '#0052FF',
                    color: '#FFFFFF',
                    boxShadow: isRegistered ? '0 4px 12px rgba(16, 185, 129, 0.3)' : '0 4px 12px rgba(0, 82, 255, 0.3)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {isRegistered ? (
                    <>
                      <CheckCircle2 size={15} />
                      Registered (Add to Cal)
                    </>
                  ) : (
                    <>
                      <Sparkles size={15} />
                      RSVP Free Seat
                    </>
                  )}
                </button>

                {event.link && (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 0, 0, 0.12)',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      color: '#090C15',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      textDecoration: 'none'
                    }}
                    title="Open Link"
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
