import React, { useState } from 'react';
import { 
  Bot, 
  Volume2,
  ChevronDown,
  Sparkles,
  Check,
  RefreshCw,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  Award,
  CheckCircle2,
  HelpCircle,
  PhoneCall,
  Users,
  Code2
} from 'lucide-react';

const STAGES = [
  { 
    id: 'screening', 
    name: 'Screening', 
    icon: PhoneCall, 
    color: '#1A53CF', 
    lightBg: '#EFF6FF', 
    border: '#BFDBFE' 
  },
  { 
    id: 'hr', 
    name: 'HR', 
    icon: Users, 
    color: '#6366F1', 
    lightBg: '#EEF2FF', 
    border: '#C7D2FE' 
  },
  { 
    id: 'technical', 
    name: 'Technical', 
    icon: Code2, 
    color: '#0284C7', 
    lightBg: '#E0F2FE', 
    border: '#BAE6FD' 
  },
  { 
    id: 'hiring_manager', 
    name: 'Hiring Manager', 
    icon: Briefcase, 
    color: '#D97706', 
    lightBg: '#FEF3C7', 
    border: '#FDE68A' 
  },
  { 
    id: 'final', 
    name: 'Final', 
    icon: Award, 
    color: '#16A34A', 
    lightBg: '#DCFCE7', 
    border: '#BBF7D0' 
  }
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
  // Pop-up modal state when opening Interview Prep page
  const [showJobModal, setShowJobModal] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState(SAVED_JOBS[0].id);
  const [confirmedJob, setConfirmedJob] = useState(SAVED_JOBS[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Active round stage tab: Screening, HR, Technical, Hiring Manager, Final
  const [activeStage, setActiveStage] = useState('screening');

  const currentJob = confirmedJob || SAVED_JOBS[0];
  const activeStageData = currentJob.stages?.[activeStage] || currentJob.stages?.screening;

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

  const handlePrevStage = () => {
    const currentIndex = STAGES.findIndex(s => s.id === activeStage);
    if (currentIndex > 0) {
      setActiveStage(STAGES[currentIndex - 1].id);
    } else {
      setActiveStage(STAGES[STAGES.length - 1].id);
    }
  };

  const activeStageConfig = STAGES.find(s => s.id === activeStage) || STAGES[0];

  return (
    <div style={{ paddingBottom: '60px', position: 'relative' }}>
      
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
          TOP BAR: ROLE PILL + SWITCH JOB
          ========================================================================= */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: '16px', 
          flexWrap: 'wrap', 
          gap: '12px' 
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
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

        {/* Global Progress Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B', fontWeight: 600 }}>
          <span>Stage {STAGES.findIndex(s => s.id === activeStage) + 1} of 5</span>
          <span>·</span>
          <span style={{ color: '#059669', fontWeight: 700 }}>{activeStageData.score} Score</span>
        </div>
      </div>

      {/* =========================================================================
          THE FOLDER CONTAINER (Matching user image with 5 Tabs across the top)
          ========================================================================= */}
      <div 
        style={{ 
          width: '100%', 
          maxWidth: '1100px', 
          margin: '0 auto',
          position: 'relative'
        }}
      >
        {/* Top 5 Folder Tabs Row with Icons (Screening , HR , Technical , Hiring Manager , Final) */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'flex-end', 
            gap: '4px', 
            position: 'relative', 
            zIndex: 10,
            marginBottom: '-1.5px',
            paddingLeft: '6px',
            paddingRight: '6px'
          }}
        >
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = (activeStage === stage.id);

            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                style={{
                  flex: 1,
                  minWidth: '110px',
                  height: isActive ? '54px' : '46px',
                  backgroundColor: isActive ? '#FFFFFF' : '#F8FAFC',
                  borderTopLeftRadius: isActive ? '16px' : '12px',
                  borderTopRightRadius: isActive ? '16px' : '12px',
                  borderBottomLeftRadius: '0px',
                  borderBottomRightRadius: '0px',
                  border: '1.5px solid #E2E8F0',
                  borderBottom: isActive ? '2.5px solid #FFFFFF' : '1.5px solid #E2E8F0',
                  borderTop: isActive ? `3px solid #1A53CF` : '1.5px solid #E2E8F0',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '0 14px',
                  color: isActive ? '#090C15' : '#64748B',
                  fontSize: isActive ? '13.5px' : '12.5px',
                  fontWeight: isActive ? 800 : 700,
                  letterSpacing: '-0.01em',
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  boxShadow: isActive 
                    ? '0 -4px 14px rgba(15, 23, 42, 0.05)' 
                    : 'none',
                  zIndex: isActive ? 25 : (10 - idx),
                  transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#EFF6FF';
                    e.currentTarget.style.color = '#1A53CF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#F8FAFC';
                    e.currentTarget.style.color = '#64748B';
                  }
                }}
              >
                {/* Tab Icon */}
                <div 
                  style={{ 
                    width: isActive ? '30px' : '26px', 
                    height: isActive ? '30px' : '26px', 
                    borderRadius: isActive ? '8px' : '7px', 
                    background: isActive 
                      ? 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)' 
                      : '#F1F5F9',
                    border: isActive 
                      ? '1px solid rgba(26, 83, 207, 0.3)' 
                      : '1px solid #E2E8F0',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: isActive ? '0 2px 8px rgba(26, 83, 207, 0.25)' : 'none',
                    transition: 'all 0.18s ease'
                  }}
                >
                  <Icon 
                    size={isActive ? 15 : 13} 
                    color={isActive ? '#FFFFFF' : '#64748B'} 
                    strokeWidth={isActive ? 2.4 : 2} 
                  />
                </div>

                <span>{stage.name}</span>

                {isActive && (
                  <span 
                    style={{ 
                      width: '6px', 
                      height: '6px', 
                      borderRadius: '50%', 
                      backgroundColor: '#10B981', 
                      marginLeft: '2px',
                      boxShadow: '0 0 8px #10B981',
                      flexShrink: 0
                    }} 
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Large Folder Body Container (Following Workspace Container Colors) */}
        <div 
          style={{ 
            backgroundColor: '#FFFFFF',
            borderRadius: '0 0 24px 24px',
            borderTopRightRadius: activeStage === 'final' ? '0px' : '20px',
            borderTopLeftRadius: activeStage === 'screening' ? '0px' : '20px',
            border: '1.5px solid #E2E8F0',
            padding: '36px 38px 36px 38px',
            boxShadow: '0 20px 50px -10px rgba(15, 23, 42, 0.08), 0 4px 14px rgba(15, 23, 42, 0.04)',
            position: 'relative',
            zIndex: 15,
            overflow: 'hidden'
          }}
        >
          {/* Atmospheric Glowing Bluish Mist Clouds inside container (matching workspace) */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 65% 50% at 20% 25%, rgba(191, 219, 254, 0.45) 0%, transparent 70%), radial-gradient(ellipse 70% 60% at 85% 75%, rgba(186, 230, 253, 0.4) 0%, transparent 70%)',
              filter: 'blur(36px)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          <div style={{ position: 'relative', zIndex: 5 }}>
            {/* Top Stage Header Inside Folder */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                marginBottom: '24px',
                flexWrap: 'wrap',
                gap: '14px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span 
                    style={{ 
                      fontSize: '11px', 
                      fontWeight: 800, 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.08em', 
                      backgroundColor: activeStageConfig.lightBg,
                      border: `1px solid ${activeStageConfig.border}`,
                      padding: '3px 12px',
                      borderRadius: '999px',
                      color: activeStageConfig.color
                    }}
                  >
                    {activeStageConfig.name} Round
                  </span>
                  <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
                    {activeStageData.roundName}
                  </span>
                </div>
                <h2 
                  style={{ 
                    fontSize: '26px', 
                    fontWeight: 900, 
                    color: '#090C15', 
                    margin: 0,
                    letterSpacing: '-0.025em',
                    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif'
                  }}
                >
                  {currentJob.company} — {currentJob.role}
                </h2>
              </div>

              {/* Interviewer Persona Card */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  backgroundColor: '#FFFFFF', 
                  padding: '8px 16px', 
                  borderRadius: '16px',
                  border: '1.5px solid #E2E8F0',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)'
                }}
              >
                <div 
                  style={{ 
                    width: '38px', 
                    height: '38px', 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)', 
                    color: '#FFFFFF',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '14px',
                    boxShadow: '0 3px 10px rgba(26, 83, 207, 0.25)'
                  }}
                >
                  <Bot size={20} color="#FFFFFF" />
                </div>
                <div>
                  <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#090C15', display: 'block' }}>
                    {activeStageData.interviewerName}
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>
                    {activeStageData.interviewerRole}
                  </span>
                </div>
              </div>
            </div>

            {/* Core Interview Question Card */}
            <div 
              style={{ 
                backgroundColor: '#FFFFFF', 
                borderRadius: '18px', 
                padding: '24px 28px', 
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)', 
                color: '#090C15',
                marginBottom: '24px',
                border: '1.5px solid #E2E8F0',
                borderLeft: '5px solid #1A53CF'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1A53CF' }}>
                  Primary Behavioral & Scenario Question
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', color: '#059669', fontWeight: 700, backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '3px 9px', borderRadius: '6px' }}>
                  <CheckCircle2 size={13} color="#059669" />
                  <span>AI Confidence: {activeStageData.score}</span>
                </div>
              </div>

              <h3 
                style={{ 
                  fontSize: '18px', 
                  fontWeight: 800, 
                  color: '#090C15', 
                  margin: '0 0 12px 0',
                  lineHeight: 1.45,
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif'
                }}
              >
                "{activeStageData.question}"
              </h3>

              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  color: '#475569', 
                  fontSize: '12px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  padding: '10px 14px'
                }}
              >
                <Sparkles size={15} color="#1A53CF" style={{ flexShrink: 0 }} />
                <span><strong style={{ color: '#090C15' }}>Emma AI Tip:</strong> {activeStageData.coachTip}</span>
              </div>
            </div>

            {/* STAR Method Structured Response Cards */}
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', 
                gap: '14px',
                marginBottom: '26px'
              }}
            >
              {/* Situation */}
              <div 
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  borderRadius: '14px', 
                  padding: '16px 18px',
                  color: '#090C15',
                  border: '1.5px solid #E2E8F0',
                  borderLeft: '4px solid #1A53CF',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)'
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#1A53CF', marginBottom: '4px' }}>
                  S — Situation
                </div>
                <p style={{ fontSize: '12.5px', color: '#334155', margin: 0, lineHeight: 1.55 }}>
                  {activeStageData.situation}
                </p>
              </div>

              {/* Task */}
              <div 
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  borderRadius: '14px', 
                  padding: '16px 18px',
                  color: '#090C15',
                  border: '1.5px solid #E2E8F0',
                  borderLeft: '4px solid #10B981',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)'
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#10B981', marginBottom: '4px' }}>
                  T — Task
                </div>
                <p style={{ fontSize: '12.5px', color: '#334155', margin: 0, lineHeight: 1.55 }}>
                  {activeStageData.task}
                </p>
              </div>

              {/* Action */}
              <div 
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  borderRadius: '14px', 
                  padding: '16px 18px',
                  color: '#090C15',
                  border: '1.5px solid #E2E8F0',
                  borderLeft: '4px solid #F59E0B',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)'
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#D97706', marginBottom: '4px' }}>
                  A — Action (High-Leverage Execution)
                </div>
                <p style={{ fontSize: '12.5px', color: '#334155', margin: 0, lineHeight: 1.55 }}>
                  {activeStageData.action}
                </p>
              </div>

              {/* Result */}
              <div 
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  borderRadius: '14px', 
                  padding: '16px 18px',
                  color: '#090C15',
                  border: '1.5px solid #E2E8F0',
                  borderLeft: '4px solid #8B5CF6',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)'
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#8B5CF6', marginBottom: '4px' }}>
                  R — Result (Quantified Impact)
                </div>
                <p style={{ fontSize: '12.5px', color: '#334155', margin: 0, lineHeight: 1.55 }}>
                  {activeStageData.result}
                </p>
              </div>
            </div>

            {/* Folder Action Footer */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                paddingTop: '20px',
                borderTop: '1.5px solid #E2E8F0',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <button
                onClick={handlePrevStage}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '12px',
                  backgroundColor: '#FFFFFF',
                  color: '#334155',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                  e.currentTarget.style.borderColor = '#94A3B8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#CBD5E1';
                }}
              >
                <ArrowLeft size={15} />
                <span>Previous Stage</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={handleNextStage}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 22px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '13px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(26, 83, 207, 0.35)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(26, 83, 207, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(26, 83, 207, 0.35)';
                  }}
                >
                  <span>Next Stage: {STAGES[(STAGES.findIndex(s => s.id === activeStage) + 1) % STAGES.length].name}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
