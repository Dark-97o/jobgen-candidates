import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  Bot, 
  Volume2,
  ChevronDown,
  Sparkles,
  Check,
  RefreshCw,
  Briefcase
} from 'lucide-react';

const STAGES = [
  { id: 'screening', name: 'Screening' },
  { id: 'hr', name: 'HR' },
  { id: 'technical', name: 'Technical' },
  { id: 'hiring_manager', name: 'Hiring Manager' },
  { id: 'final', name: 'Final' }
];

const SAVED_JOBS = [
  {
    id: 'canva',
    company: 'Canva',
    role: 'Lead Product Manager',
    stages: {
      screening: {
        roundName: 'Round 1: Talent Screening',
        interviewerName: 'Sarah Jenkins',
        interviewerRole: 'Senior Technical Recruiter',
        interviewerInitials: 'SJ',
        score: '94 / 100',
        question: 'Can you walk me through your background and what excites you about leading product velocity at Canva?',
        situation: 'Applying as a Lead Product Manager candidate scaling visual design ecosystems for 170M+ active users.',
        task: 'Articulate career trajectory, product principles, and alignment with Canva’s values of simplicity and empowerment.',
        action: 'Framed previous track record around reducing user friction, shipping viral micro-experiences, and accelerating squad velocity.',
        result: 'Recruiter noted exceptional clarity, cultural resonance, and fast-tracked to system loops.',
        coachTip: 'High energy · Crisply articulated narrative under 2 minutes'
      },
      hr: {
        roundName: 'Round 2: Culture & Values Alignment',
        interviewerName: 'Elena Rostova',
        interviewerRole: 'Director of People Experience',
        interviewerInitials: 'ER',
        score: '98 / 100',
        question: 'Tell me about a time you worked through cross-functional resistance while launching a paradigm-shifting feature.',
        situation: 'Design and sales pods had conflicting priorities during the launch of Canva’s enterprise collaboration toolkit.',
        task: 'Resolve stakeholder friction, protect team morale, and hit the Q2 enterprise conference deadline.',
        action: 'Facilitated collaborative customer empathy interviews and aligned both teams on a unified value metric.',
        result: 'Turned organizational tension into shared ownership, shipping on time with 99.4% CSAT.',
        coachTip: 'Superb emotional intelligence · Emphasized collaborative bridge-building'
      },
      technical: {
        roundName: 'Round 3: System Architecture & Product Mechanics',
        interviewerName: 'Craig Press',
        interviewerRole: 'Hiring Director & Head of Product',
        interviewerInitials: 'CP',
        score: '96 / 100',
        question: 'Tell me about a time you handled a technical deadlock between senior engineering leads and business stakeholders.',
        situation: 'Q3 enterprise contract required custom SSO, while engineering planned core DB migration.',
        task: 'Protect database reliability while unblocking $450k ARR expansion revenue.',
        action: 'Organized a 2-day technical spike to unbundle SSO into an isolated OAuth proxy micro-pod.',
        result: 'Closed enterprise customer 1 week early with 99.98% SLA and zero migration rollbacks.',
        coachTip: 'High executive presence · Clear metrics quantification'
      },
      hiring_manager: {
        roundName: 'Round 4: Hiring Manager & Leadership Loop',
        interviewerName: 'Melanie Perkins',
        interviewerRole: 'VP of Product Engineering',
        interviewerInitials: 'MP',
        score: '95 / 100',
        question: 'How do you prioritize between high-velocity feature experiments and platform technical debt when resources are constrained?',
        situation: 'Rapid sprint velocity was producing 15% regression rates in template rendering microservices.',
        task: 'Re-balance development bandwidth to sustain speed without compromising user trust.',
        action: 'Introduced an automated 70/20/10 capacity allocation rule and instituted real-time Web Vitals budgets.',
        result: 'Cut regression tickets by 60% while maintaining quarterly feature delivery targets.',
        coachTip: 'Visionary thinking · Grounded in disciplined execution frameworks'
      },
      final: {
        roundName: 'Round 5: Executive Vision & Offer Alignment',
        interviewerName: 'Cameron Adams',
        interviewerRole: 'Chief Product Officer & Co-Founder',
        interviewerInitials: 'CA',
        score: '99 / 100',
        question: 'Looking at your first 90 days at Canva, where will you drive disproportionate leverage across our ecosystem?',
        situation: 'Transitioning into a pivotal product leadership post during global B2B expansion.',
        task: 'Establish cross-functional trust, diagnose workflow bottlenecks, and execute an outsized strategic win.',
        action: 'Proposed a 30-60-90 discovery framework: audit squad friction in 30, ship low-hanging workflow optimizations in 60, scale in 90.',
        result: 'Unanimous executive panel alignment with offer package recommended for sign-off.',
        coachTip: 'Executive-level poise · Clear, compelling multi-year roadmap vision'
      }
    }
  },
  {
    id: 'atlassian',
    company: 'Atlassian',
    role: 'Senior Staff Frontend Architect',
    stages: {
      screening: {
        roundName: 'Round 1: Recruiter Phone Screen',
        interviewerName: 'Tom Bradley',
        interviewerRole: 'Lead Engineering Recruiter',
        interviewerInitials: 'TB',
        score: '92 / 100',
        question: 'What motivated you to explore the Senior Staff Frontend Architect role on the Jira Cloud platform?',
        situation: 'Seeking to architect planet-scale developer tools with 300M+ monthly interactions.',
        task: 'Demonstrate deep mastery of micro-frontend federation, performance budgets, and engineering leadership.',
        action: 'Summarized experience leading large-scale frontend modernizations and bundle optimization tooling.',
        result: 'Recruiter highlighted immediate architecture loop advancement.',
        coachTip: 'Crisp summary · Directly mapped past achievements to Atlassian’s tech stack'
      },
      hr: {
        roundName: 'Round 2: Values & "Open Company, No Bullshit"',
        interviewerName: 'Kylie Morris',
        interviewerRole: 'Head of People Partnering',
        interviewerInitials: 'KM',
        score: '96 / 100',
        question: 'Give an example of when you had to share difficult technical feedback with leadership or challenge an established consensus.',
        situation: 'An executive initiative proposed an unsustainable third-party SDK that increased bundle size by 350KB.',
        task: 'Uphold performance standards and transparency without being perceived as obstructionist.',
        action: 'Authored an open RFC with benchmark metrics illustrating impact on 3G mobile conversions, suggesting a lighter alternative.',
        result: 'Leadership adopted the alternative RFC, saving 1.2s in page load times across the ecosystem.',
        coachTip: 'Embodied Atlassian core value · Data-backed constructive candor'
      },
      technical: {
        roundName: 'Round 3: Micro-Frontend Scaling & Performance',
        interviewerName: 'David Green',
        interviewerRole: 'Head of Web Architecture',
        interviewerInitials: 'DG',
        score: '97 / 100',
        question: 'How do you design a scalable micro-frontend architecture while maintaining sub-1.5s LCP across distributed squads?',
        situation: 'Legacy monolithic frontend caused 45-minute build pipelines and deployment gridlocks across 14 teams.',
        task: 'Architect a federated runtime architecture with zero regression to bundle size and core web vitals.',
        action: 'Implemented Webpack Module Federation with decentralized routing and isolated shared design tokens.',
        result: 'Cut build times by 70%, improved LCP by 48%, and scaled autonomous release velocity across 14 pods.',
        coachTip: 'Exceptional systems thinking · Excellent tradeoff articulation'
      },
      hiring_manager: {
        roundName: 'Round 4: Architecture Team Leadership',
        interviewerName: 'Mike Cannon',
        interviewerRole: 'Head of Cloud Platform Engineering',
        interviewerInitials: 'MC',
        score: '95 / 100',
        question: 'How do you ensure 40+ engineering pods adhere to strict performance budgets without slowing down their daily velocity?',
        situation: 'Autonomous squads were accidentally introducing redundant dependencies into shared vendor bundles.',
        task: 'Establish guardrails that empower squads while mechanically enforcing bundle budgets in CI/CD.',
        action: 'Built automated PR bundle analyzers that provide instant bot feedback with suggested tree-shakable alternatives.',
        result: 'Achieved 99.8% compliance rate without delaying any sprint deployments.',
        coachTip: 'Pragmatic leadership · Built tools instead of bureaucratic process'
      },
      final: {
        roundName: 'Round 5: Executive Technical Loop',
        interviewerName: 'Scott Farquhar',
        interviewerRole: 'Chief Technology Strategist',
        interviewerInitials: 'SF',
        score: '98 / 100',
        question: 'How do you see web client architecture evolving over the next 5 years with WebAssembly and local-first offline syncing?',
        situation: 'Next-generation cloud applications require instantaneous offline-first responsiveness.',
        task: 'Define a long-range client-side storage, CRDT, and state hydration strategy for Jira Cloud.',
        action: 'Outlined a hybrid local SQLite/Wasm caching tier synchronized via background web workers.',
        result: 'Executive panel rated proposal as visionary and immediate fit for Principal Staff level.',
        coachTip: 'World-class architectural foresight · Clear technical depth'
      }
    }
  },
  {
    id: 'stripe',
    company: 'Stripe',
    role: 'Product Operations Lead',
    stages: {
      screening: {
        roundName: 'Round 1: Operations Screening',
        interviewerName: 'David Lee',
        interviewerRole: 'Lead Talent Partner, FinTech',
        interviewerInitials: 'DL',
        score: '93 / 100',
        question: 'What draws you to managing high-stakes payments operations and developer tooling at Stripe?',
        situation: 'Targeting a mission-critical role operating global payments infrastructure with 99.999% reliability.',
        task: 'Demonstrate deep operational rigor, empathy for developers, and metric-focused problem solving.',
        action: 'Highlighted past ownership of high-concurrency payment rails, reconciliation workflows, and incident command.',
        result: 'Passed phone screen with recruiter rating candidate in top quartile.',
        coachTip: 'Polished delivery · Immediate credibility in FinTech mechanics'
      },
      hr: {
        roundName: 'Round 2: Operating Principles & Culture',
        interviewerName: 'Amanda Zhang',
        interviewerRole: 'Global People Business Partner',
        interviewerInitials: 'AZ',
        score: '95 / 100',
        question: 'Tell me about a time you identified an operational failure that no one else was addressing. How did you take ownership?',
        situation: 'Discrepancies in multi-currency FX settlement were causing partner invoice delays at month-end.',
        task: 'Diagnose the edge-case root causes and build automated reconciliation safeguards.',
        action: 'Volunteered to run a deep-dive forensic audit, pinpointed floating-point rounding mismatches, and built automated ledger alerts.',
        result: 'Saved $340k in annual reconciliation overhead and eliminated month-end closing delays.',
        coachTip: 'Unrelenting ownership · Refused to accept sub-par status quo'
      },
      technical: {
        roundName: 'Round 3: High-Volume Operational Resiliency',
        interviewerName: 'Claire Hughes',
        interviewerRole: 'VP of Global Operations',
        interviewerInitials: 'CH',
        score: '97 / 100',
        question: 'Describe an instance where a payment settlement pipeline degraded, and how you managed cross-functional incident response.',
        situation: 'High concurrency during Black Friday payment surges caused idempotent ledger reconciliation delays.',
        task: 'Maintain 99.995% SLA without double-settling or dropping transactions for enterprise merchants.',
        action: 'Staged an automated queue backpressure protocol and dispatched real-time merchant status notifications.',
        result: 'Reconciled 100% of $120M daily throughput with zero financial discrepancies.',
        coachTip: 'Calm under pressure · Customer-centric communication'
      },
      hiring_manager: {
        roundName: 'Round 4: FinTech Scaling & Incident Command',
        interviewerName: 'Patrick Collison',
        interviewerRole: 'Head of Payment Operations',
        interviewerInitials: 'PC',
        score: '96 / 100',
        question: 'How do you design incident response playbooks for distributed payment networks operating across 190+ countries?',
        situation: 'Regional banking partner maintenance windows were triggering false-positive incident alarms in EMEA.',
        task: 'Refactor anomaly detection thresholds to reflect regional banking schedules without masking true outages.',
        action: 'Architected dynamic timezone-aware alert thresholds integrated with real-time merchant volume baselines.',
        result: 'Reduced alert noise by 82% while improving MTTR on actual incidents to sub-4 minutes.',
        coachTip: 'High operational clarity · Deep understanding of global banking rails'
      },
      final: {
        roundName: 'Round 5: Executive Leadership & Strategic Bet',
        interviewerName: 'John Collison',
        interviewerRole: 'President & Co-Founder',
        interviewerInitials: 'JC',
        score: '99 / 100',
        question: 'What is the biggest operational leverage point that Stripe has yet to fully unlock in global commerce?',
        situation: 'Evaluating international enterprise expansion and next-generation payments orchestration.',
        task: 'Articulate high-conviction thesis on cross-border settlement, localized payment methods, and automated compliance.',
        action: 'Presented a framework for autonomous regulatory compliance engines that compress enterprise onboarding from weeks to seconds.',
        result: 'Executive committee extended formal offer with senior strategic remit.',
        coachTip: 'Exceptional strategic altitude · Crisp macro perspective'
      }
    }
  },
  {
    id: 'afterpay',
    company: 'Afterpay',
    role: 'Lead Full-Stack Engineer',
    stages: {
      screening: {
        roundName: 'Round 1: Engineering Talent Screen',
        interviewerName: 'Liam O’Connor',
        interviewerRole: 'Engineering Talent Partner',
        interviewerInitials: 'LO',
        score: '94 / 100',
        question: 'Tell me about your experience scaling real-time merchant checkout widgets and distributed event queues.',
        situation: 'Exploring lead engineering role building sub-100ms merchant checkout SDKs.',
        task: 'Convey mastery of Node.js, React, distributed caching, and microservices.',
        action: 'Shared track record optimizing iframe asset delivery and designing high-throughput worker pools.',
        result: 'Immediate referral to technical loop.',
        coachTip: 'Clear technical articulation · Strong fundamentals'
      },
      hr: {
        roundName: 'Round 2: Culture & Autonomous Execution',
        interviewerName: 'Jessica Bell',
        interviewerRole: 'People Business Lead',
        interviewerInitials: 'JB',
        score: '96 / 100',
        question: 'How do you foster a culture of engineering excellence and rapid iteration without burning out your squad?',
        situation: 'Tight product deadlines during merchant onboarding crunch threatened engineer well-being.',
        task: 'Protect sprint sustainability while upholding commercial go-live commitments.',
        action: 'Instituted no-meeting focus Wednesdays, automated routine test harnesses, and re-scoped scope realistically.',
        result: 'Achieved 100% on-time release with zero team turnover.',
        coachTip: 'Empathetic leadership · Practical operational hygiene'
      },
      technical: {
        roundName: 'Round 3: Distributed Real-Time Architecture',
        interviewerName: 'Marcus Chen',
        interviewerRole: 'Staff Engineering Lead',
        interviewerInitials: 'MC',
        score: '96 / 100',
        question: 'Walk me through how you designed a low-latency fraud evaluation worker pipeline handling thousands of requests per second.',
        situation: 'Checkout approval API was spiking past 250ms during peak merchant flash sales.',
        task: 'Refactor the risk assessment pipeline to consistently achieve sub-80ms p99 latency targets.',
        action: 'Architected an event-driven worker pool with Kafka and a tiered Redis cluster caching layer.',
        result: 'Maintained 65ms p99 response times at 3,200 req/sec with zero service disruptions.',
        coachTip: 'Rigorous engineering execution · Metric-driven results'
      },
      hiring_manager: {
        roundName: 'Round 4: Engineering Management & Roadmapping',
        interviewerName: 'Nick Molnar',
        interviewerRole: 'VP of Consumer Engineering',
        interviewerInitials: 'NM',
        score: '95 / 100',
        question: 'How do you handle technical debt when product managers demand continuous feature releases?',
        situation: 'Legacy checkout codebase had accrued technical debt that was slowing down feature velocity.',
        task: 'Convince PMs to dedicate 20% of every sprint to code refactoring and observability tooling.',
        action: 'Mapped code debt directly to merchant abandonment rates, showing that a 50ms latency cut increases checkout completion by 2.1%.',
        result: 'PMs enthusiastically sponsored dedicated weekly refactoring sprints.',
        coachTip: 'Speaks the language of business · Aligns code quality with revenue'
      },
      final: {
        roundName: 'Round 5: Executive Engineering Bar Raiser',
        interviewerName: 'Anthony Eisen',
        interviewerRole: 'Co-Founder & Executive Lead',
        interviewerInitials: 'AE',
        score: '98 / 100',
        question: 'Where will BNPL consumer commerce be in 5 years, and how should our core architecture prepare today?',
        situation: 'Emergence of AI-agent commerce and instant biometric checkout.',
        task: 'Outline an API-first headless checkout framework ready for autonomous agentic commerce.',
        action: 'Described headless tokenized authentication and intent-based checkout APIs.',
        result: 'Panel approved candidate for senior leadership track.',
        coachTip: 'Strong future-proofing vision · Rock-solid technical authority'
      }
    }
  },
  {
    id: 'safetyculture',
    company: 'SafetyCulture',
    role: 'Principal Backend Engineer',
    stages: {
      screening: {
        roundName: 'Round 1: Initial Technical Screen',
        interviewerName: 'Ben Wright',
        interviewerRole: 'Senior Platform Recruiter',
        interviewerInitials: 'BW',
        score: '93 / 100',
        question: 'What excites you about building high-resilience systems for 75,000+ frontline enterprise inspection workers?',
        situation: 'Applying to lead core distributed services handling millions of daily safety audits.',
        task: 'Demonstrate distributed systems fundamentals, Go / gRPC experience, and offline-first syncing.',
        action: 'Discussed past architectural wins in idempotent APIs and event-driven data streaming.',
        result: 'Candidate advanced with strong recruiter endorsement.',
        coachTip: 'Clear passion for frontline worker productivity · High technical fluency'
      },
      hr: {
        roundName: 'Round 2: Culture of Customer Obsession',
        interviewerName: 'Chloe Bennett',
        interviewerRole: 'Culture & People Director',
        interviewerInitials: 'CB',
        score: '97 / 100',
        question: 'Tell me about a time you went out of your way to understand the lived reality of an end-user before writing code.',
        situation: 'Engineers assumed field workers always had reliable 4G coverage on remote construction sites.',
        task: 'Bridge the empathy gap between office engineers and rugged frontline field realities.',
        action: 'Spent 2 days shadowing mining safety inspectors on-site to observe real-world device drops and network dropouts.',
        result: 'Redesigned the sync engine with robust local disk journaling, eliminating 100% of field data loss.',
        coachTip: 'Customer obsession in action · Refused to rely on assumptions'
      },
      technical: {
        roundName: 'Round 3: Distributed Systems & gRPC',
        interviewerName: 'Sarah Jenkins',
        interviewerRole: 'Platform Engineering Lead',
        interviewerInitials: 'SJ',
        score: '97 / 100',
        question: 'How do you ensure data consistency across multiple microservices without introducing synchronous distributed locks?',
        situation: 'Audit inspection sync failed when mobile clients reconnected in low-connectivity offline mode.',
        task: 'Design an idempotent eventual consistency synchronization protocol across PostgreSQL shards.',
        action: 'Introduced an event-sourcing outbox pattern with vector clocks to resolve conflict merges deterministically.',
        result: 'Eliminated 100% of data collision errors for 75,000+ frontline enterprise field workers.',
        coachTip: 'Deep distributed systems mastery · Clear domain modeling'
      },
      hiring_manager: {
        roundName: 'Round 4: Platform Scalability & Reliability',
        interviewerName: 'Luke Anear',
        interviewerRole: 'VP of Platform Engineering',
        interviewerInitials: 'LA',
        score: '96 / 100',
        question: 'How do you design platform services to survive sudden 10x traffic spikes during critical emergency safety alerts?',
        situation: 'National weather emergencies were causing 12x audit spikes that degraded database connection pools.',
        task: 'Harden ingestion pipelines with graceful degradation and adaptive rate-limiting.',
        action: 'Implemented token-bucket rate limiters and decoupled non-essential analytics processing to asynchronous queues.',
        result: 'Platform withstood 15x emergency volume with zero dropped inspection records.',
        coachTip: 'Battle-tested reliability mindset · Graceful degradation architecture'
      },
      final: {
        roundName: 'Round 5: Executive Architecture Review',
        interviewerName: 'Mark Adams',
        interviewerRole: 'Chief Technology Officer',
        interviewerInitials: 'MA',
        score: '99 / 100',
        question: 'If you were rebuilding our core distributed data tier from scratch today, what foundational choices would you make?',
        situation: 'Planning next-decade data architecture for multi-region global compliance.',
        task: 'Present a blueprint for distributed data sharding, zero-trust security, and real-time event analytics.',
        action: 'Presented a cloud-native architecture combining CockroachDB for multi-region transactional consistency with Kafka.',
        result: 'Full executive loop endorsement with Principal offer.',
        coachTip: 'Uncompromising engineering bar · Visionary and pragmatic'
      }
    }
  },
  {
    id: 'qantas',
    company: 'Qantas Loyalty',
    role: 'Staff Systems Architect',
    stages: {
      screening: {
        roundName: 'Round 1: Enterprise Talent Screen',
        interviewerName: 'Danielle Cooper',
        interviewerRole: 'Talent Acquisition Partner',
        interviewerInitials: 'DC',
        score: '92 / 100',
        question: 'What motivates you to architect loyalty ledgers and high-concurrency redemption systems at Qantas scale?',
        situation: 'Targeting Staff Systems Architect role modernizing mission-critical loyalty pipelines.',
        task: 'Convey expertise in event-driven architecture, financial auditability, and mission-critical uptime.',
        action: 'Framed previous architectural leadership around distributed ledgers and PCI-DSS compliance.',
        result: 'Recruiter commended high-impact architectural background and advanced candidate.',
        coachTip: 'Strong enterprise authority · Composed and articulate'
      },
      hr: {
        roundName: 'Round 2: Enterprise Stakeholder Collaboration',
        interviewerName: 'Simon Walsh',
        interviewerRole: 'Head of People & Culture',
        interviewerInitials: 'SW',
        score: '95 / 100',
        question: 'Describe how you bring non-technical enterprise executives along on complex architectural transformations.',
        situation: 'Board members and commercial leads were hesitant about the multi-million dollar cost of event-driven migration.',
        task: 'Demystify technical concepts and align enterprise leaders around risk reduction and commercial upside.',
        action: 'Created simplified visual capability models demonstrating how modern architecture enables instant partner point promotions.',
        result: 'Secured full executive board approval and multi-year budget sign-off.',
        coachTip: 'Masterful stakeholder translation · Translates code into business value'
      },
      technical: {
        roundName: 'Round 3: Event-Driven Enterprise Architecture',
        interviewerName: 'Robert Vance',
        interviewerRole: 'Enterprise Technology Director',
        interviewerInitials: 'RV',
        score: '97 / 100',
        question: 'Describe how you scaled an event-driven points ledger while complying with strict financial audit and PCI-DSS requirements.',
        situation: 'Partner redemption spikes were locking core transactional loyalty ledgers during promotional campaigns.',
        task: 'Decouple points accrual and redemption into high-throughput partitioned streams with immutable audit trails.',
        action: 'Engineered an event-sourced ledger on Apache Kafka with encrypted change-data-capture pipelines.',
        result: 'Handled 5x peak redemption volume with cryptographic audit guarantees and zero lock contention.',
        coachTip: 'Outstanding enterprise vision · Rigorous security posture'
      },
      hiring_manager: {
        roundName: 'Round 4: Governance & Systems Modernization',
        interviewerName: 'Olivia Scott',
        interviewerRole: 'General Manager of Technology',
        interviewerInitials: 'OS',
        score: '96 / 100',
        question: 'How do you execute a core transactional system migration without a single second of maintenance downtime?',
        situation: 'Replacing a 15-year-old mainframe ledger with a modern cloud-native event-sourced architecture.',
        task: 'Design a strangler-fig migration pattern with zero risk of transaction discrepancy.',
        action: 'Deployed dual-write and shadow-read comparison pipelines, running in parallel for 90 days before cutover.',
        result: 'Executed cutover seamlessly with 100% data parity and zero customer impact.',
        coachTip: 'Unwavering risk mitigation · Flawless execution methodology'
      },
      final: {
        roundName: 'Round 5: Executive Board & Strategic Alignment',
        interviewerName: 'Vanessa Hudson',
        interviewerRole: 'Group Executive Director',
        interviewerInitials: 'VH',
        score: '98 / 100',
        question: 'How can modern technology architecture unlock completely new revenue channels for our loyalty ecosystem?',
        situation: 'Expanding points economy into retail banking, travel micro-services, and real-time merchant POS.',
        task: 'Formulate an open partner API ecosystem that enables third-party retailers to integrate points in days.',
        action: 'Architected a developer portal with self-service sandboxes, instant webhooks, and automated compliance certs.',
        result: 'Unanimous executive board sign-off on Staff Architect appointment.',
        coachTip: 'Strategic visionary · Transforms cost centers into growth engines'
      }
    }
  }
];

export default function InterviewPrepView() {
  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);
  
  // Pop-up modal state when opening Interview Prep page
  const [showJobModal, setShowJobModal] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState(SAVED_JOBS[0].id);
  const [confirmedJob, setConfirmedJob] = useState(SAVED_JOBS[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Active round stage tab: Screening, HR, Technical, Hiring Manager, Final
  const [activeStage, setActiveStage] = useState('technical');

  const currentJob = confirmedJob || SAVED_JOBS[0];
  const activeStageData = currentJob.stages?.[activeStage] || currentJob.stages?.technical;

  const handleConfirmJob = () => {
    const job = SAVED_JOBS.find(j => j.id === selectedJobId) || SAVED_JOBS[0];
    setConfirmedJob(job);
    setShowJobModal(false);
  };

  const handleNextStage = () => {
    const currentIndex = STAGES.findIndex(s => s.id === activeStage);
    if (currentIndex < STAGES.length - 1) {
      setActiveStage(STAGES[currentIndex + 1].id);
    } else {
      setActiveStage(STAGES[0].id);
    }
  };

  return (
    <div style={{ paddingBottom: '40px', position: 'relative' }}>
      
      {/* =========================================================================
          POP-UP MODAL WITH COFFEE IMAGE: SELECT SAVED JOB BEFORE SHOWING PAGE
          ========================================================================= */}
      {showJobModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(9, 12, 21, 0.72)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '460px',
              width: '100%',
              padding: '36px 32px 30px 32px',
              boxShadow: '0 25px 60px -12px rgba(15, 23, 42, 0.3), 0 0 0 1px rgba(226, 232, 240, 0.9)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              animation: 'modalSlideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Coffee Image Display */}
            <div style={{ marginBottom: '16px', position: 'relative' }}>
              <img 
                src="/cofe.png" 
                alt="Coffee" 
                style={{ 
                  height: '76px', 
                  width: 'auto', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 6px 18px rgba(37, 99, 235, 0.18))'
                }} 
              />
            </div>

            <h3 
              style={{ 
                fontSize: '21px', 
                fontWeight: 900, 
                color: '#090C15', 
                margin: '0 0 8px 0',
                letterSpacing: '-0.025em',
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif'
              }}
            >
              Select a Saved Job to Practice
            </h3>

            <p 
              style={{ 
                fontSize: '13px', 
                color: '#64748B', 
                lineHeight: 1.5, 
                margin: '0 0 24px 0',
                maxWidth: '360px'
              }}
            >
              Choose your target role to launch a personalized mock interview rehearsal room with Emma AI.
            </p>

            {/* Saved Jobs Dropdown */}
            <div style={{ width: '100%', marginBottom: '24px', position: 'relative', textAlign: 'left' }}>
              <label 
                style={{ 
                  display: 'block', 
                  fontSize: '11px', 
                  fontWeight: 800, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em', 
                  color: '#475569', 
                  marginBottom: '8px' 
                }}
              >
                Target Saved Role
              </label>

              {/* Styled Dropdown Trigger */}
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid #CBD5E1',
                  backgroundColor: '#F8FAFC',
                  color: '#090C15',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'border-color 0.18s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                  <Briefcase size={16} color="#1A53CF" style={{ flexShrink: 0 }} />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {SAVED_JOBS.find(j => j.id === selectedJobId)?.company} — {SAVED_JOBS.find(j => j.id === selectedJobId)?.role}
                  </span>
                </div>
                <ChevronDown size={16} color="#64748B" style={{ flexShrink: 0, transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
              </button>

              {/* Dropdown Menu Options */}
              {dropdownOpen && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    marginTop: '6px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 16px 40px rgba(15, 23, 42, 0.18)',
                    padding: '6px',
                    maxHeight: '230px',
                    overflowY: 'auto',
                    zIndex: 50
                  }}
                >
                  {SAVED_JOBS.map((job) => {
                    const isSelected = (job.id === selectedJobId);
                    return (
                      <div
                        key={job.id}
                        onClick={() => {
                          setSelectedJobId(job.id);
                          setDropdownOpen(false);
                        }}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: isSelected ? '#EFF6FF' : 'transparent',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) e.currentTarget.style.backgroundColor = '#F8FAFC';
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 800, color: isSelected ? '#1A53CF' : '#090C15' }}>
                            {job.company}
                          </div>
                          <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>
                            {job.role}
                          </div>
                        </div>
                        {isSelected && <Check size={16} color="#1A53CF" />}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Confirm & Start Button */}
            <button
              onClick={handleConfirmJob}
              style={{
                width: '100%',
                padding: '13px 20px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
                color: '#FFFFFF',
                fontSize: '13.5px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(26, 83, 207, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(26, 83, 207, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(26, 83, 207, 0.35)';
              }}
            >
              <span>Enter Interview Room</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          TOP BAR: ACTIVE TARGET ROLE + STAGE TABS: Screening , HR , Technical , Hiring Manager , Final
          ========================================================================= */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: '20px', 
          paddingBottom: '14px',
          borderBottom: '1px solid rgba(226, 232, 240, 0.75)',
          flexWrap: 'wrap', 
          gap: '12px' 
        }}
      >
        {/* Left: Active Role Pill & Switch Job Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              backgroundColor: '#FFFFFF', 
              padding: '6px 14px', 
              borderRadius: '999px', 
              border: '1.5px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#090C15' }}>
              {currentJob.company}
            </span>
            <span style={{ color: '#94A3B8' }}>·</span>
            <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#475569' }}>
              {currentJob.role}
            </span>
          </div>

          {/* Change Target Job Button to re-open Coffee Modal */}
          <button
            onClick={() => {
              setSelectedJobId(currentJob.id);
              setShowJobModal(true);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '6px 12px',
              borderRadius: '999px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              color: '#1A53CF',
              fontSize: '11.5px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#1A53CF';
              e.currentTarget.style.backgroundColor = '#EFF6FF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#CBD5E1';
              e.currentTarget.style.backgroundColor = '#FFFFFF';
            }}
          >
            <img src="/cofe.png" alt="" style={{ height: '16px', width: 'auto', objectFit: 'contain' }} />
            <span>Switch Job</span>
          </button>
        </div>

        {/* Right: The 5 Stage Tabs: Screening , HR , Technical , Hiring Manager , Final */}
        <div 
          style={{ 
            display: 'flex', 
            background: 'rgba(255, 255, 255, 0.72)', 
            backdropFilter: 'blur(20px)', 
            WebkitBackdropFilter: 'blur(20px)', 
            padding: '4px', 
            borderRadius: '14px', 
            border: '1px solid rgba(226, 232, 240, 0.85)', 
            gap: '3px', 
            boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)',
            flexWrap: 'wrap'
          }}
        >
          {STAGES.map((stg) => {
            const isActive = (activeStage === stg.id);
            return (
              <button
                key={stg.id}
                onClick={() => setActiveStage(stg.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '10px',
                  fontSize: '11.5px',
                  fontWeight: isActive ? 800 : 600,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: isActive ? '#090C15' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#475569',
                  boxShadow: isActive ? '0 2px 8px rgba(9, 12, 21, 0.18)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {stg.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column Stage: Left Virtual Office Video Stage / Right STAR Evaluation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: '20px', alignItems: 'start' }}>
        
        {/* Left: Floating Video Stage */}
        <div 
          style={{ 
            background: 'linear-gradient(180deg, #F8FAFC 0%, #EFF6FF 100%)',
            borderRadius: '24px',
            border: '1px solid #E2E8F0',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(15,23,42,0.04)',
            position: 'relative'
          }}
        >
          {/* Top Stage Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#090C15' }}>
                {currentJob.company} · {activeStageData.roundName}
              </span>
            </div>
            <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700, background: '#ECFDF5', padding: '2px 8px', borderRadius: '9999px' }}>
              ● Live Audio Active
            </span>
          </div>

          {/* Floating Video Window */}
          <div 
            style={{ 
              background: '#090C15', 
              borderRadius: '20px', 
              border: '4px solid #FFFFFF', 
              boxShadow: '0 16px 40px rgba(0,0,0,0.25)', 
              overflow: 'hidden' 
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', height: '300px' }}>
              
              {/* Candidate Stream */}
              <div style={{ position: 'relative', background: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6 0%, #1A53CF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 800, color: '#FFFFFF', boxShadow: '0 0 30px rgba(59,130,246,0.5)' }}>
                  SB
                </div>
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '4px', fontSize: '10.5px', color: '#FFFFFF' }}>
                  Subhranil Baul (Candidate)
                </div>
                <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,0,0,0.6)', padding: '3px 8px', borderRadius: '9999px' }}>
                  <Volume2 size={12} color="#10B981" />
                  <span style={{ fontSize: '10px', color: '#10B981', fontWeight: 700 }}>Speaking</span>
                </div>
              </div>

              {/* AI Interviewer Grid */}
              <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '2px', background: '#090C15' }}>
                <div style={{ background: '#111827', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#1A53CF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={15} color="#FFFFFF" />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#FFFFFF', fontWeight: 700, display: 'block' }}>Emma AI (Host)</span>
                    <span style={{ fontSize: '9.5px', color: '#10B981' }}>Live STAR grading active</span>
                  </div>
                </div>

                <div style={{ background: '#111827', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 700, fontSize: '11px' }}>
                    {activeStageData.interviewerInitials}
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#FFFFFF', fontWeight: 700, display: 'block' }}>
                      {activeStageData.interviewerName} ({currentJob.company})
                    </span>
                    <span style={{ fontSize: '9.5px', color: '#94A3B8' }}>{activeStageData.interviewerRole}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Meeting Controls */}
            <div style={{ padding: '10px 16px', background: '#090C15', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <button 
                onClick={() => setMicActive(!micActive)}
                style={{ width: '34px', height: '34px', borderRadius: '50%', background: micActive ? 'rgba(255,255,255,0.12)' : '#EF4444', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', cursor: 'pointer' }}
              >
                {micActive ? <Mic size={15} /> : <MicOff size={15} />}
              </button>
              <button 
                style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#EF4444', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', cursor: 'pointer', boxShadow: '0 4px 12px rgba(239,68,68,0.4)' }}
              >
                <PhoneOff size={16} />
              </button>
              <button 
                onClick={() => setVideoActive(!videoActive)}
                style={{ width: '34px', height: '34px', borderRadius: '50%', background: videoActive ? 'rgba(255,255,255,0.12)' : '#EF4444', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', cursor: 'pointer' }}
              >
                {videoActive ? <Video size={15} /> : <VideoOff size={15} />}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live STAR Method Breakdown & Score Evaluation */}
        <div className="liquid-glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#1A53CF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Real-Time Behavioral STAR Score
            </span>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#059669', background: '#ECFDF5', padding: '2px 10px', borderRadius: '9999px', border: '1px solid #A7F3D0' }}>
              {activeStageData.score}
            </span>
          </div>

          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#090C15', marginBottom: '14px', lineHeight: 1.4 }}>
            "{activeStageData.question}"
          </h4>

          {/* STAR Accordion Blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ padding: '10px 12px', borderRadius: '8px', background: '#F8FAFC', borderLeft: '3px solid #1A53CF' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#1A53CF', textTransform: 'uppercase' }}>Situation</span>
              <p style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>
                {activeStageData.situation}
              </p>
            </div>

            <div style={{ padding: '10px 12px', borderRadius: '8px', background: '#F8FAFC', borderLeft: '3px solid #10B981' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#10B981', textTransform: 'uppercase' }}>Task</span>
              <p style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>
                {activeStageData.task}
              </p>
            </div>

            <div style={{ padding: '10px 12px', borderRadius: '8px', background: '#F8FAFC', borderLeft: '3px solid #F59E0B' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#F59E0B', textTransform: 'uppercase' }}>Action (AI Highlight)</span>
              <p style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>
                {activeStageData.action}
              </p>
            </div>

            <div style={{ padding: '10px 12px', borderRadius: '8px', background: '#F8FAFC', borderLeft: '3px solid #8B5CF6' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#8B5CF6', textTransform: 'uppercase' }}>Result</span>
              <p style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>
                {activeStageData.result}
              </p>
            </div>
          </div>

          <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#64748B' }}>Emma Coach: {activeStageData.coachTip}</span>
            <button
              onClick={handleNextStage}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                background: '#090C15',
                color: '#FFFFFF',
                fontSize: '11.5px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1E293B'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#090C15'}
            >
              Next Stage →
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
