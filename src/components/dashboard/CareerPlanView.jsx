import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Lock, 
  Unlock, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  Calendar, 
  Target, 
  Briefcase, 
  TrendingUp, 
  Award, 
  Filter, 
  Search, 
  Play, 
  RotateCcw,
  Check,
  ShieldCheck,
  AlertCircle,
  Layers,
  Zap,
  Activity
} from 'lucide-react';

// 12 Weeks Structured Roadmap for Lead Product Manager & AI Solutions Architect
const DEFAULT_PHASES_DATA = [
  {
    phase: 1,
    title: 'Onboarding & Ecosystem Absorption',
    theme: 'Stakeholder Mapping, Access Protocols & System Audits',
    timeframe: 'Week 1',
    description: 'Establish foundational context, secure full production observability access, and map organizational decision lines across engineering, design, and executive leadership.',
    tasks: [
      { id: 't1-1', title: 'Audit AWS & GCP Production Access Permissions', desc: 'Verify IAM role assignments, CloudWatch log streams, and production deployment pipeline permissions with Security Ops.', duration: '2.5 hrs', category: 'Security & Access' },
      { id: 't1-2', title: 'Schedule 1-on-1 Discovery with Head of Engineering', desc: 'Conduct 45-minute architectural alignment to identify top 3 technical bottlenecks in the current sprint release cycles.', duration: '1.5 hrs', category: 'Stakeholders' },
      { id: 't1-3', title: 'Review JIRA Cloud Product Backlog & Technical Debt', desc: 'Analyze the top 20 prioritized sprint items and identify lingering unresolved architectural debt tickets.', duration: '3.0 hrs', category: 'Backlog & Audit' },
      { id: 't1-4', title: 'Establish Local Dev Environment & Smoke Test', desc: 'Clone monorepo, configure Docker containers, run end-to-end integration tests, and submit a verification test PR.', duration: '4.5 hrs', category: 'Environment' },
      { id: 't1-5', title: 'Map Primary Customer Personas & ICP Segments', desc: 'Review current product persona decks, subscription tiers, and churn diagnostics with Product Marketing.', duration: '2.0 hrs', category: 'Product Strategy' },
      { id: 't1-6', title: 'Audit Data Privacy & SOC2 / ISO27001 Policies', desc: 'Examine candidate data retention policies, GDPR telemetry compliance, and encryption at rest protocols.', duration: '3.0 hrs', category: 'Compliance' },
      { id: 't1-7', title: 'Join Daily Engineering Standups as Observer', desc: 'Shadow daily standup meetings across core application pod and platform infrastructure pod to evaluate rituals.', duration: '1.0 hr', category: 'Rituals' },
      { id: 't1-8', title: 'Review Amplitude / Mixpanel Telemetry Dashboards', desc: 'Inspect current user funnel drop-offs, daily active candidate ratios, and search latency percentiles.', duration: '3.5 hrs', category: 'Analytics' },
      { id: 't1-9', title: 'Review Customer Support Escalation Registers', desc: 'Read the last 30 high-priority Zendesk support tickets to identify common customer frustrations and UI friction points.', duration: '2.5 hrs', category: 'Voice of Customer' },
      { id: 't1-10', title: 'Meet with Lead Product Designer on Design Tokens', desc: 'Audit Figma component libraries, mobile responsive guidelines, and accessibility standards (WCAG 2.1 AA).', duration: '2.0 hrs', category: 'Design Systems' },
      { id: 't1-11', title: 'Inspect CI/CD GitHub Actions Build Durations', desc: 'Examine current test suite execution times and identify flaky integration test steps causing pipeline delays.', duration: '3.0 hrs', category: 'DevOps' },
      { id: 't1-12', title: 'Draft Week 1 Synthesis & 90-Day Vision Doc', desc: 'Document initial observations, team strengths, risks, and quick win candidates in Notion/Confluence.', duration: '4.0 hrs', category: 'Documentation' },
      { id: 't1-13', title: 'Align with Direct Manager on 30-Day Success Criteria', desc: 'Finalize explicit deliverables and measurable KPIs expected for the first month in role.', duration: '1.5 hrs', category: 'Manager Alignment' },
      { id: 't1-14', title: 'Complete Company Security Training Modules', desc: 'Complete mandatory compliance, phishing prevention, and data handling accreditation courses.', duration: '1.5 hrs', category: 'Compliance' }
    ]
  },
  {
    phase: 2,
    title: 'Deep Technical Discovery & Architecture Review',
    theme: 'Microservices, Data Flow, and API Contracts',
    timeframe: 'Week 2',
    description: 'Deep dive into service boundaries, database queries, latency bottlenecks, and external third-party API dependencies.',
    tasks: [
      { id: 't2-1', title: 'Trace End-to-End Application Submission Flow', desc: 'Map data serialization from frontend form submit through worker queues to PostgreSQL relational persistence.', duration: '4.0 hrs', category: 'Architecture' },
      { id: 't2-2', title: 'Inspect GraphQL / REST API Contract Schemas', desc: 'Verify contract versioning, pagination mechanisms, and payload overhead across mobile and desktop endpoints.', duration: '3.0 hrs', category: 'API Design' },
      { id: 't2-3', title: 'Profile Database Slow Queries with PgBouncer', desc: 'Run query plans on top 5 heaviest candidate search queries and identify missing composite indexes.', duration: '3.5 hrs', category: 'Database' },
      { id: 't2-4', title: 'Review Redis Caching Topology & TTL Policies', desc: 'Audit cache eviction rates, session token TTLs, and cache invalidation consistency during user updates.', duration: '2.5 hrs', category: 'Infrastructure' },
      { id: 't2-5', title: 'Evaluate Third-Party API Rate Limits (Seek & LinkedIn)', desc: 'Document current API quotas, webhook retries, and fallback mechanisms during external service degradation.', duration: '2.0 hrs', category: 'Integrations' },
      { id: 't2-6', title: 'Shadow Technical Support on Live Incident Call', desc: 'Observe incident commander protocols, Slack channel coordination, and post-mortem template usage.', duration: '2.5 hrs', category: 'Operations' },
      { id: 't2-7', title: 'Audit AI Model Prompt Pipeline & Token Cost', desc: 'Review LLM routing architectures, latency per completion, and token expenditure monitoring.', duration: '4.0 hrs', category: 'AI Architecture' },
      { id: 't2-8', title: 'Meet with Principal Security Architect', desc: 'Review OAuth2 / SAML authentication flow, session revocation, and cross-site scripting mitigations.', duration: '2.0 hrs', category: 'Security' },
      { id: 't2-9', title: 'Inspect Web Vitals Metrics on Core Dashboard', desc: 'Analyze LCP, INP, and CLS scores across desktop and mobile devices via Google Search Console and Datadog.', duration: '2.5 hrs', category: 'Performance' },
      { id: 't2-10', title: 'Review Automated Testing Coverage Reports', desc: 'Identify critical service paths with under 60% test coverage and prioritize integration test additions.', duration: '3.0 hrs', category: 'Quality' },
      { id: 't2-11', title: 'Formulate Technical Dependency Matrix', desc: 'Create visual diagram of all internal microservices and external SaaS dependencies.', duration: '3.5 hrs', category: 'Architecture' },
      { id: 't2-12', title: 'Document Quick Win Candidates for Sprint Planning', desc: 'Isolate 3 low-complexity, high-impact improvements that can be safely shipped in Week 4.', duration: '2.5 hrs', category: 'Sprint Planning' },
      { id: 't2-13', title: 'Sync with QA Lead on Regression Test Cycles', desc: 'Examine staging environment promotion gates and manual regression test timelines.', duration: '2.0 hrs', category: 'Release Management' },
      { id: 't2-14', title: 'Publish Week 2 Architecture Findings Memo', desc: 'Share architectural discovery findings with team leads and gather engineering feedback.', duration: '2.5 hrs', category: 'Communication' }
    ]
  },
  {
    phase: 3,
    title: 'User Telemetry & Metric Baselines',
    theme: 'Funnel Analytics, Drop-off Heatmaps & Business Baselines',
    timeframe: 'Week 3',
    description: 'Establish indisputable quantitative baselines for candidate onboarding, resume creation velocity, and application conversion.',
    tasks: [
      { id: 't3-1', title: 'Build Full Candidate Onboarding Funnel in Amplitude', desc: 'Track step-by-step conversion from landing sign-up through profile completion and first job search.', duration: '4.0 hrs', category: 'Analytics' },
      { id: 't3-2', title: 'Analyze Resume Export Drop-off Rates', desc: 'Quantify percentage of candidates who start tailoring a resume but abandon before downloading PDF.', duration: '3.0 hrs', category: 'Funnel' },
      { id: 't3-3', title: 'Configure Hotjar / FullStory Session Replays', desc: 'Review 20 recorded candidate sessions on the Resume Studio and Cover Letter views to observe friction.', duration: '3.5 hrs', category: 'UX Research' },
      { id: 't3-4', title: 'Define North Star Metric & Input KPI Tree', desc: 'Map relationship between Weekly Active Job Seekers (WAJS) and tailored application volume.', duration: '3.0 hrs', category: 'Product Strategy' },
      { id: 't3-5', title: 'Audit Tracking Pixel & Event Schema Naming', desc: 'Standardize event naming taxonomy (e.g. `resume_builder_export_clicked`) across web and mobile clients.', duration: '2.5 hrs', category: 'Data Governance' },
      { id: 't3-6', title: 'Conduct Quantitative Survey of 50 Recent Users', desc: 'Deploy automated in-app micro-survey capturing primary reason for using JobGen over competitors.', duration: '2.5 hrs', category: 'User Feedback' },
      { id: 't3-7', title: 'Calculate Current Net Promoter Score (NPS)', desc: 'Aggregate customer satisfaction scores across cohorts to benchmark customer sentiment.', duration: '2.0 hrs', category: 'Metrics' },
      { id: 't3-8', title: 'Review Unit Economics & Customer Acquisition Cost', desc: 'Collaborate with Growth Lead to examine paid marketing CAC versus organic referral rates.', duration: '3.0 hrs', category: 'Finance' },
      { id: 't3-9', title: 'Inspect Mobile vs Desktop Usage Distribution', desc: 'Determine screen size breakdown to guide mobile-first versus desktop workstation development priority.', duration: '2.0 hrs', category: 'Analytics' },
      { id: 't3-10', title: 'Establish Weekly Metrics Review Cadence', desc: 'Set up automated Slack reporting bot publishing core product metrics every Monday morning.', duration: '2.5 hrs', category: 'Automation' },
      { id: 't3-11', title: 'Present Telemetry Findings in Product Review', desc: 'Deliver slide deck highlighting the 3 highest friction steps in the candidate journey.', duration: '3.0 hrs', category: 'Leadership' },
      { id: 't3-12', title: 'Prioritize Week 4 Quick Win PR Specifications', desc: 'Finalize functional spec and user story criteria for the first production release.', duration: '3.5 hrs', category: 'Specs' },
      { id: 't3-13', title: 'Review A/B Testing Framework Capabilities', desc: 'Verify LaunchDarkly / Statsig feature flag configuration and traffic allocation rules.', duration: '2.0 hrs', category: 'Experimentation' }
    ]
  },
  {
    phase: 4,
    title: 'First High-Visibility Quick Win & Production Deploy',
    theme: 'Shipping Value, Release Discipline & Early Impact',
    timeframe: 'Week 4',
    description: 'Implement and ship your first meaningful product enhancement to production, verifying release discipline and building team trust.',
    tasks: [
      { id: 't4-1', title: 'Finalize Feature Branch & Code Implementation', desc: 'Complete development of targeted UX enhancement (e.g. 1-click ATS scan or rapid export modal).', duration: '6.0 hrs', category: 'Engineering' },
      { id: 't4-2', title: 'Write Comprehensive Unit & E2E Cypress Tests', desc: 'Ensure 100% test coverage on new feature branch code path and edge cases.', duration: '3.5 hrs', category: 'Testing' },
      { id: 't4-3', title: 'Conduct Peer Code Review with Staff Engineer', desc: 'Walk through diff, address architectural comments, and adhere to strict design system tokens.', duration: '2.0 hrs', category: 'Code Review' },
      { id: 't4-4', title: 'Deploy Feature to Staging Environment', desc: 'Trigger CI/CD pipeline deployment to staging cluster and verify database migration scripts.', duration: '1.5 hrs', category: 'Deployment' },
      { id: 't4-5', title: 'Execute QA Test Matrix Across Browsers', desc: 'Test functionality on Chrome, Safari, Firefox, and mobile viewport resolutions.', duration: '2.5 hrs', category: 'QA' },
      { id: 't4-6', title: 'Configure Feature Flag for Incremental Canary Rollout', desc: 'Set up 10% canary traffic allocation via feature flags to monitor error rate anomalies.', duration: '2.0 hrs', category: 'Canary' },
      { id: 't4-7', title: 'Monitor Datadog APM & Sentry Error Spikes', desc: 'Watch real-time error logs and API latency percentiles during the initial 10% release window.', duration: '2.0 hrs', category: 'Observability' },
      { id: 't4-8', title: 'Ramp Feature Flag to 100% Production Traffic', desc: 'Promote release to full candidate population upon zero error regressions over 4 hours.', duration: '1.0 hr', category: 'Release' },
      { id: 't4-9', title: 'Verify Amplitude Event Ingestion in Production', desc: 'Confirm user engagement events are firing accurately and populating telemetry funnels.', duration: '1.5 hrs', category: 'Analytics' },
      { id: 't4-10', title: 'Draft Release Notes & Internal Changelog Entry', desc: 'Document what changed, why it matters, and user impact for customer success and marketing.', duration: '1.5 hrs', category: 'Changelog' },
      { id: 't4-11', title: 'Collect First 48 Hours of User Reaction Data', desc: 'Evaluate engagement rates and support ticket volume following the new release.', duration: '2.5 hrs', category: 'Validation' },
      { id: 't4-12', title: 'Conduct Post-Release Retrospective with Pod', desc: 'Discuss pipeline bottlenecks, deployment friction, and celebrate early delivery velocity.', duration: '1.5 hrs', category: 'Retrospective' },
      { id: 't4-13', title: 'Share Quick Win Metrics in Company All-Hands', desc: 'Present early conversion lift and positive candidate feedback to leadership.', duration: '2.0 hrs', category: 'Showcase' },
      { id: 't4-14', title: 'Complete 30-Day Check-in with Manager', desc: 'Review Phase 1-4 deliverables and calibrate roadmap priorities for Month 2.', duration: '1.5 hrs', category: 'Milestone' }
    ]
  },
  {
    phase: 5,
    title: 'Sprint Cadence & Cross-Functional Alignment',
    theme: 'Agile Rhythms, Backlog Grooming & Velocity Scaling',
    timeframe: 'Week 5',
    description: 'Refine team engineering rhythms, establish predictable sprint point estimation, and align design, data, and dev pods.',
    tasks: [
      { id: 't5-1', title: 'Audit Story Point Velocity Across Last 4 Sprints', desc: 'Calculate average completed story points and variance to establish predictable sprint capacity.', duration: '3.0 hrs', category: 'Agile' },
      { id: 't5-2', title: 'Re-architect JIRA Epic Hierarchy & Roadmaps', desc: 'Structure backlog into clear strategic Epics aligned with quarterly company OKRs.', duration: '3.5 hrs', category: 'Project Management' },
      { id: 't5-3', title: 'Establish Definition of Done (DoD) Standard', desc: 'Codify requirement checklist (tests, docs, accessibility, metrics) for every shipped ticket.', duration: '2.5 hrs', category: 'Standards' },
      { id: 't5-4', title: 'Lead Sprint Planning Session for Next Cycle', desc: 'Facilitate story grooming, estimate complexity, and commit to realistic sprint deliverables.', duration: '3.0 hrs', category: 'Facilitation' },
      { id: 't5-5', title: 'Coordinate Bi-Weekly Design-Engineering Critique', desc: 'Bridge gap between Figma mockups and CSS implementation details with frontend engineers.', duration: '2.0 hrs', category: 'Design Ops' },
      { id: 't5-6', title: 'Streamline PR Review SLA to Under 8 Hours', desc: 'Implement automated GitHub Slack bot notifying reviewers of stale open pull requests.', duration: '2.5 hrs', category: 'Velocity' },
      { id: 't5-7', title: 'Establish Bug Triage Priority Matrix', desc: 'Define P0, P1, P2 resolution timeframes and on-call escalation rotation schedule.', duration: '2.5 hrs', category: 'Quality' },
      { id: 't5-8', title: 'Meet with Data Engineering on Pipeline Latency', desc: 'Review batch ETL schedule and evaluate streaming options for real-time recommendation updates.', duration: '3.0 hrs', category: 'Data' },
      { id: 't5-9', title: 'Align Product Roadmap with Marketing Campaigns', desc: 'Sync feature release dates with SEO content releases and newsletter announcements.', duration: '2.0 hrs', category: 'Growth' },
      { id: 't5-10', title: 'Conduct 1-on-1s with Core Pod Engineers', desc: 'Understand individual developer career aspirations, tooling pain points, and blockers.', duration: '4.0 hrs', category: 'People' },
      { id: 't5-11', title: 'Optimize Daily Standup Duration to 12 Minutes', desc: 'Refocus standup ritual on blockers and cross-pod handoffs rather than status recounting.', duration: '1.0 hr', category: 'Process' },
      { id: 't5-12', title: 'Introduce User Story Mapping Technique', desc: 'Run collaborative visual story mapping workshop for the upcoming major feature initiative.', duration: '3.5 hrs', category: 'Workshop' },
      { id: 't5-13', title: 'Publish Sprint Cadence Operating Principles', desc: 'Document team norms, PR guidelines, and communication SLA in central handbook.', duration: '2.5 hrs', category: 'Documentation' }
    ]
  },
  {
    phase: 6,
    title: 'Customer Discovery Loops & Qualitative Insights',
    theme: 'Candidate Interviews, Recruiter Panels & Pain Discovery',
    timeframe: 'Week 6',
    description: 'Conduct deep qualitative research sessions with active tech job seekers and senior recruiters to uncover unaddressed needs.',
    tasks: [
      { id: 't6-1', title: 'Recruit 10 Active Job Seekers for 1-on-1 Discovery', desc: 'Screen candidate participants across Mid, Senior, and Staff engineering tiers.', duration: '3.5 hrs', category: 'User Research' },
      { id: 't6-2', title: 'Conduct 5 Live Interview Observations', desc: 'Watch candidates use competing tools versus JobGen to tailor applications in real-time.', duration: '5.0 hrs', category: 'Usability' },
      { id: 't6-3', title: 'Interview 3 Executive Talent Acquisition Partners', desc: 'Extract insider recruiter screening habits, ATS filter setups, and rejection triggers.', duration: '3.5 hrs', category: 'Market Research' },
      { id: 't6-4', title: 'Synthesize Qualitative Interview Affinity Map', desc: 'Categorize recurring pain patterns into thematic clusters (e.g. salary opacity, ATS anxiety).', duration: '3.5 hrs', category: 'Synthesis' },
      { id: 't6-5', title: 'Map Emotional Journey Curve for Job Search', desc: 'Identify moments of highest user anxiety and design proactive AI reassurance touchpoints.', duration: '3.0 hrs', category: 'UX Strategy' },
      { id: 't6-6', title: 'Extract Top 5 Unmet Feature Requests', desc: 'Rank feature requests by user frequency, implementation effort, and revenue impact.', duration: '2.5 hrs', category: 'Prioritization' },
      { id: 't6-7', title: 'Review Competitor Feature Releases & Pricing', desc: 'Audit Teal, Huntr, and Careerflow pricing changes, browser extensions, and feature sets.', duration: '3.0 hrs', category: 'Competitive Intel' },
      { id: 't6-8', title: 'Record Video Clip Highlights Reel for Team', desc: 'Compile impactful 5-minute video reel of candidates sharing breakthrough moments.', duration: '3.0 hrs', category: 'Storytelling' },
      { id: 't6-9', title: 'Host Customer Discovery Readout for Stakeholders', desc: 'Present qualitative findings to CEO, Head of Product, and engineering leadership.', duration: '2.0 hrs', category: 'Presentation' },
      { id: 't6-10', title: 'Draft Problem Definition Brief for Core Initiative', desc: 'Translate customer findings into structured Problem Brief framing the Phase 8 major feature.', duration: '3.5 hrs', category: 'Product Brief' },
      { id: 't6-11', title: 'Validate Problem Statements with Survey Cohort', desc: 'Send quantitative ranking poll to verify if discovery pains resonate across wider base.', duration: '2.5 hrs', category: 'Validation' },
      { id: 't6-12', title: 'Update Persona Documentation with New Quotes', desc: 'Enrich product personas with real candidate quotes, salary goals, and frustration points.', duration: '2.0 hrs', category: 'Personas' },
      { id: 't6-13', title: 'Archive Research Notes in Searchable Repository', desc: 'Tag customer interview transcripts with keywords for future product team reference.', duration: '2.0 hrs', category: 'Knowledge Ops' }
    ]
  },
  {
    phase: 7,
    title: 'Scalability Hardening & Performance Governance',
    theme: 'Low Latency, Fault Tolerance & SLA Benchmarks',
    timeframe: 'Week 7',
    description: 'Ensure application architecture maintains sub-second responsiveness, zero memory leaks, and high uptime under heavy traffic.',
    tasks: [
      { id: 't7-1', title: 'Conduct k6 Load Testing on Application API Endpoints', desc: 'Simulate 5,000 concurrent candidate searches and identify API throughput tipping points.', duration: '4.5 hrs', category: 'Performance' },
      { id: 't7-2', title: 'Audit Client-Side Bundle Sizes & Tree Shaking', desc: 'Analyze Webpack / Vite bundle visualizer to trim heavy third-party packages.', duration: '3.5 hrs', category: 'Frontend' },
      { id: 't7-3', title: 'Implement Redis Query Result Caching Layer', desc: 'Cache repeated job search queries to reduce database read load by up to 60%.', duration: '4.0 hrs', category: 'Backend' },
      { id: 't7-4', title: 'Optimize Critical Rendering Path for Mobile Viewports', desc: 'Defer non-critical JavaScript chunks and preconnect to Google Fonts and CDN domains.', duration: '3.0 hrs', category: 'Web Vitals' },
      { id: 't7-5', title: 'Review Database Connection Pooling Settings', desc: 'Tune maximum client connections and idle pool timeouts in PgBouncer.', duration: '2.5 hrs', category: 'Database' },
      { id: 't7-6', title: 'Establish Service Level Objectives (SLOs) & Error Budgets', desc: 'Define 99.9% uptime target and 250ms p95 latency threshold across core services.', duration: '3.0 hrs', category: 'Site Reliability' },
      { id: 't7-7', title: 'Implement Graceful Degradation for AI Features', desc: 'Design clean fallback states when external LLM APIs experience rate limits or high latency.', duration: '3.5 hrs', category: 'Resilience' },
      { id: 't7-8', title: 'Perform Memory Leak Diagnostics on Frontend Spas', desc: 'Profile Chrome DevTools heap snapshots to detect uncleared event listeners or timers.', duration: '3.0 hrs', category: 'Diagnostics' },
      { id: 't7-9', title: 'Automate Daily Database Backup Verification', desc: 'Set up automated snapshot recovery tests verifying point-in-time recovery capabilities.', duration: '2.5 hrs', category: 'Disaster Recovery' },
      { id: 't7-10', title: 'Implement Rate Limiting on Authentication Endpoints', desc: 'Deploy Cloudflare WAF rules preventing brute force credential stuffing attacks.', duration: '2.5 hrs', category: 'Security' },
      { id: 't7-11', title: 'Audit API Error Responses & Status Code Consistency', desc: 'Ensure standard RFC 7807 problem details payloads across all API exception handlers.', duration: '2.0 hrs', category: 'Standards' },
      { id: 't7-12', title: 'Review Cloud Infrastructure Monthly Invoices', desc: 'Identify unattached EBS volumes, oversized RDS instances, and cost savings opportunities.', duration: '2.5 hrs', category: 'FinOps' },
      { id: 't7-13', title: 'Publish Mid-Quarter Performance Health Report', desc: 'Document 35% latency drop and uptime metrics for executive engineering review.', duration: '2.5 hrs', category: 'Reporting' }
    ]
  },
  {
    phase: 8,
    title: 'Core Initiative Ownership & Multi-Pod Rollout',
    theme: 'Flagship Feature Design, Development & Launch',
    timeframe: 'Week 8',
    description: 'Lead end-to-end execution of your major designated product feature, synchronizing frontend, backend, design, and growth.',
    tasks: [
      { id: 't8-1', title: 'Complete Product Requirement Document (PRD)', desc: 'Finalize functional requirements, edge cases, acceptance criteria, and technical architecture.', duration: '5.0 hrs', category: 'Product Spec' },
      { id: 't8-2', title: 'Review Interactive Figma Prototypes with Users', desc: 'Validate usability of multi-page pagination and rapid ATS feedback widgets.', duration: '3.5 hrs', category: 'Design Review' },
      { id: 't8-3', title: 'Break Epic into 18 Detailed Development Stories', desc: 'Author clear JIRA tickets with testable acceptance criteria and dependencies.', duration: '4.0 hrs', category: 'Planning' },
      { id: 't8-4', title: 'Kick Off Architecture Technical Spikes with Engineers', desc: 'Direct spike exploring PDF rendering performance and dynamic pagination calculations.', duration: '4.0 hrs', category: 'Engineering' },
      { id: 't8-5', title: 'Implement Frontend UI Components in Design System', desc: 'Build responsive components ensuring token adherence and smooth animations.', duration: '6.0 hrs', category: 'Frontend' },
      { id: 't8-6', title: 'Develop Backend Data Persistence & Validation Logic', desc: 'Create REST endpoints with schema validation, transactional integrity, and audits.', duration: '5.0 hrs', category: 'Backend' },
      { id: 't8-7', title: 'Coordinate Multi-Pod Integration Points', desc: 'Ensure candidate profile updates propagate seamlessly across Tracker and Studio.', duration: '3.0 hrs', category: 'Coordination' },
      { id: 't8-8', title: 'Conduct Mid-Sprint Quality Assurance Walkthrough', desc: 'Test end-to-end user flows in staging environment and log UI polish tickets.', duration: '3.5 hrs', category: 'QA' },
      { id: 't8-9', title: 'Configure LaunchDarkly Experimentation Variants', desc: 'Set up 50/50 A/B test tracking conversion lift against the legacy experience.', duration: '2.5 hrs', category: 'A/B Testing' },
      { id: 't8-10', title: 'Draft Customer Onboarding Tooltips & Guidance', desc: 'Write interactive walkthrough micro-copy guiding candidates through new features.', duration: '2.5 hrs', category: 'UX Copy' },
      { id: 't8-11', title: 'Train Customer Support & Success Teams', desc: 'Deliver 30-minute demonstration and FAQ guide to support team members.', duration: '2.0 hrs', category: 'Enablement' },
      { id: 't8-12', title: 'Deploy Feature to Closed Beta User Group', desc: 'Activate feature flag for 100 VIP power users and gather real-time telemetry.', duration: '2.0 hrs', category: 'Beta Launch' },
      { id: 't8-13', title: 'Address Immediate Beta User Feedback Tickets', desc: 'Triage and patch minor cosmetic and usability edge cases within 24 hours.', duration: '3.0 hrs', category: 'Bug Fixing' },
      { id: 't8-14', title: 'Approve General Availability (GA) Production Release', desc: 'Authorize 100% rollout following zero critical errors in beta cohort.', duration: '1.5 hrs', category: 'GA Release' },
      { id: 't8-15', title: 'Publish Major Feature Announcement Post', desc: 'Collaborate with marketing on product release blog, email blast, and LinkedIn post.', duration: '2.5 hrs', category: 'Marketing' }
    ]
  },
  {
    phase: 9,
    title: 'Developer Productivity & Automation',
    theme: 'CI/CD Pipelines, Test Automation & Friction Removal',
    timeframe: 'Week 9',
    description: 'Eliminate developer friction, shorten deployment cycles, and automate repetitive testing and verification routines.',
    tasks: [
      { id: 't9-1', title: 'Compress CI/CD Pipeline Duration Below 5 Minutes', desc: 'Parallelize test execution matrix and cache node_modules across GitHub Actions runners.', duration: '4.0 hrs', category: 'DevOps' },
      { id: 't9-2', title: 'Automate Design Token Synchronization from Figma', desc: 'Implement automated GitHub Action pulling design token JSON directly into CSS variables.', duration: '3.5 hrs', category: 'Design Ops' },
      { id: 't9-3', title: 'Deploy Storybook Documentation for UI Library', desc: 'Host live component catalog showcasing interactive states, buttons, cards, and inputs.', duration: '4.5 hrs', category: 'Storybook' },
      { id: 't9-4', title: 'Implement Automated Lighthouse CI Audits on Pull Requests', desc: 'Block merges that degrade performance, accessibility, or SEO scores below 90.', duration: '3.0 hrs', category: 'Code Quality' },
      { id: 't9-5', title: 'Refactor Legacy CSS Redundancies into Utility Classes', desc: 'Clean up duplicated inline styles across legacy dashboard views.', duration: '3.5 hrs', category: 'Refactoring' },
      { id: 't9-6', title: 'Create Automated Seed Data Generators for Local Dev', desc: 'Build faker scripts generating 50 realistic candidate profiles and job cards.', duration: '3.0 hrs', category: 'Developer Experience' },
      { id: 't9-7', title: 'Set Up Automated Weekly Dependency Vulnerability Scans', desc: 'Configure Snyk / Dependabot alerting for outdated NPM packages and security advisories.', duration: '2.0 hrs', category: 'Security' },
      { id: 't9-8', title: 'Document Engineering Onboarding Guide 2.0', desc: 'Update repository README so new developers can set up working environment in under 20 minutes.', duration: '2.5 hrs', category: 'Docs' },
      { id: 't9-9', title: 'Conduct Tooling Retrospective with Engineering Pod', desc: 'Collect votes on top developer frustrations and establish action items.', duration: '2.0 hrs', category: 'Team Health' },
      { id: 't9-10', title: 'Introduce Pre-Commit Husky Linting & Typecheck Hooks', desc: 'Catch syntax errors, broken imports, and unused variables prior to git commit.', duration: '2.0 hrs', category: 'Tooling' },
      { id: 't9-11', title: 'Automate API Documentation Generation from Schemas', desc: 'Generate interactive Swagger / OpenAPI documentation automatically upon PR merge.', duration: '2.5 hrs', category: 'API Docs' },
      { id: 't9-12', title: 'Streamline Staging Environment Ephemeral Previews', desc: 'Configure pull request preview URLs allowing designers to review live UI before merge.', duration: '3.5 hrs', category: 'Infrastructure' },
      { id: 't9-13', title: 'Publish Engineering Velocity Benchmark Results', desc: 'Demonstrate 42% decrease in build times and 30% increase in weekly PR merge volume.', duration: '2.5 hrs', category: 'Metrics' }
    ]
  },
  {
    phase: 10,
    title: 'Executive Alignment & Business Impact',
    theme: 'QBR Presentation, Revenue Metrics & Strategy Validation',
    timeframe: 'Week 10',
    description: 'Synthesize quantitative results, demonstrate clear business return on investment, and align executive stakeholders.',
    tasks: [
      { id: 't10-1', title: 'Aggregate 60-Day Business Metrics & KPI Lift', desc: 'Quantify user activation increase, retention rate delta, and resume generation volume.', duration: '4.0 hrs', category: 'Business Metrics' },
      { id: 't10-2', title: 'Build Comprehensive Executive Slide Deck', desc: 'Draft 12-slide presentation detailing problem, solution, validation metrics, and roadmap.', duration: '5.0 hrs', category: 'Executive Deck' },
      { id: 't10-3', title: 'Calculate Direct Revenue Impact from Shipped Features', desc: 'Collaborate with Finance to determine conversion lift into paid candidate subscriptions.', duration: '3.5 hrs', category: 'Finance' },
      { id: 't10-4', title: 'Conduct Dry Run Presentation with Direct Manager', desc: 'Incorporate feedback, refine data narrative, and anticipate executive probing questions.', duration: '2.0 hrs', category: 'Preparation' },
      { id: 't10-5', title: 'Deliver Quarterly Business Review (QBR) to C-Suite', desc: 'Present accomplishments and strategic vision to CEO, CTO, and Head of Product.', duration: '2.5 hrs', category: 'Executive Review' },
      { id: 't10-6', title: 'Secure Executive Sponsorship for H2 Initiatives', desc: 'Gain formal approval and headcount allocation for next-generation AI features.', duration: '2.0 hrs', category: 'Strategy' },
      { id: 't10-7', title: 'Document Executive Feedback & Action Directives', desc: 'Translate leadership suggestions into concrete product planning priorities.', duration: '2.0 hrs', category: 'Alignment' },
      { id: 't10-8', title: 'Align Product Direction with Sales & Partnerships', desc: 'Brief sales reps on upcoming enterprise features to support employer recruitment sales.', duration: '2.5 hrs', category: 'Commercial' },
      { id: 't10-9', title: 'Review Legal & Intellectual Property Considerations', desc: 'Ensure new proprietary resume scoring algorithms are documented for IP protection.', duration: '2.5 hrs', category: 'Legal' },
      { id: 't10-10', title: 'Benchmark JobGen Metrics Against Industry SaaS Standards', desc: 'Compare churn, LTV, and CAC metrics with leading B2C career technology benchmarks.', duration: '3.0 hrs', category: 'Benchmarking' },
      { id: 't10-11', title: 'Publish All-Hands Summary Memo', desc: 'Share key business outcomes and thank cross-functional teammates for collaborative wins.', duration: '2.0 hrs', category: 'Company Culture' },
      { id: 't10-12', title: 'Calibrate Team Performance & OKR Progress Scores', desc: 'Score team key results and identify remaining targets for final two weeks of quarter.', duration: '2.5 hrs', category: 'OKRs' },
      { id: 't10-13', title: 'Refine Long-term Strategic Theses', desc: 'Draft one-page visionary memo exploring autonomous job application submission futures.', duration: '3.0 hrs', category: 'Vision' },
      { id: 't10-14', title: 'Host Team Dinner / Recognition Toast', desc: 'Celebrate high-stakes QBR success and recognize outstanding engineering contributions.', duration: '2.5 hrs', category: 'Culture' }
    ]
  },
  {
    phase: 11,
    title: 'Team Mentorship & Knowledge Scaling',
    theme: 'Coaching, Interview Pods & Institutional Memory',
    timeframe: 'Week 11',
    description: 'Invest in peer growth, mentor junior teammates, participate in candidate hiring loops, and fortify institutional knowledge.',
    tasks: [
      { id: 't11-1', title: 'Establish Bi-Weekly Mentorship for Associate PMs', desc: 'Conduct structured coaching sessions on PRD writing, metric modeling, and prioritization.', duration: '3.0 hrs', category: 'Mentorship' },
      { id: 't11-2', title: 'Lead Technical Interview Loop for Senior Full-Stack Candidates', desc: 'Conduct system design interviews and write detailed calibration hiring feedback.', duration: '4.0 hrs', category: 'Hiring' },
      { id: 't11-3', title: 'Host Internal Lunch & Learn on AI Prompt Engineering', desc: 'Present best practices for token optimization, few-shot prompting, and evaluation harnesses.', duration: '3.0 hrs', category: 'Knowledge Sharing' },
      { id: 't11-4', title: 'Author Architectural Decision Records (ADRs)', desc: 'Document the rationale for key technical tradeoffs made during Phase 8 implementation.', duration: '3.5 hrs', category: 'Documentation' },
      { id: 't11-5', title: 'Review Team Work-Life Balance & Burnout Indicators', desc: 'Check on-call fatigue, sprint overtime, and redistribute backlog tickets if needed.', duration: '2.0 hrs', category: 'Team Health' },
      { id: 't11-6', title: 'Build Reusable Product Experimentation Template', desc: 'Create standardized hypothesis testing worksheet for team product discovery.', duration: '2.5 hrs', category: 'Templates' },
      { id: 't11-7', title: 'Participate in Engineering Bar Raiser Calibration', desc: 'Standardize hiring rubrics to ensure new recruits elevate overall engineering rigor.', duration: '2.5 hrs', category: 'Hiring' },
      { id: 't11-8', title: 'Pair Program with Junior Engineer on Production Bug', desc: 'Guide root-cause analysis, unit test reproduction, and safe canary deployment.', duration: '3.0 hrs', category: 'Coaching' },
      { id: 't11-9', title: 'Curate Internal Engineering Tech Radar', desc: 'Classify languages, frameworks, and tools into Adopt, Trial, Assess, and Hold tiers.', duration: '3.0 hrs', category: 'Technology' },
      { id: 't11-10', title: 'Draft Product Ops Playbook for Cross-Pod Launches', desc: 'Document standard checklists for legal, security, marketing, and support coordination.', duration: '3.5 hrs', category: 'Operations' },
      { id: 't11-11', title: 'Conduct 360-Degree Peer Feedback Sessions', desc: 'Gather constructive observations from engineers, designers, and peers on collaboration.', duration: '2.5 hrs', category: 'Feedback' },
      { id: 't11-12', title: 'Recognize Teammate Contributions in Public Channels', desc: 'Spotlight unsung engineering contributions that enabled recent milestone shipments.', duration: '1.5 hrs', category: 'Culture' },
      { id: 't11-13', title: 'Update Central Onboarding Curricula for Future Hires', desc: 'Ensure all newly created documentation and diagrams are integrated into onboarding tracks.', duration: '2.5 hrs', category: 'Onboarding' }
    ]
  },
  {
    phase: 12,
    title: 'Promotion Positioning & H2 Strategic Roadmap',
    theme: 'Leadership Transition, Vision Defense & Formal Promotion Case',
    timeframe: 'Week 12',
    description: 'Synthesize the completed 90-day arc into an undeniable promotion case, establish next-half OKRs, and cement your leadership standing.',
    tasks: [
      { id: 't12-1', title: 'Compile Formal 90-Day Achievement Dossier', desc: 'Document delivered features, measurable revenue impact, code shipped, and leadership initiatives.', duration: '5.0 hrs', category: 'Promotion Case' },
      { id: 't12-2', title: 'Gather Executive & Peer Endorsement Letters', desc: 'Obtain written testimonials from Head of Engineering, Design Lead, and Key Stakeholders.', duration: '3.0 hrs', category: 'Endorsements' },
      { id: 't12-3', title: 'Draft Comprehensive H2 Product Vision & OKR Blueprint', desc: 'Define top 3 strategic bets for the next two quarters with financial projections.', duration: '5.5 hrs', category: 'Strategic Vision' },
      { id: 't12-4', title: 'Conduct Formal Performance Review with Manager', desc: 'Present self-evaluation dossier and advocate for next-level title advancement and equity refresh.', duration: '2.5 hrs', category: 'Compensation' },
      { id: 't12-5', title: 'Formulate Architecture Roadmap for Autonomous Agents', desc: 'Map integration milestones for automated interview scheduling and recruiter voice AI.', duration: '4.0 hrs', category: 'AI Innovation' },
      { id: 't12-6', title: 'Establish Annual Budget Allocation Proposal', desc: 'Forecast cloud computing, third-party API licensing, and tooling software budgets.', duration: '3.5 hrs', category: 'Budgeting' },
      { id: 't12-7', title: 'Present H2 Roadmap at All-Hands Strategy Session', desc: 'Inspire entire company with compelling preview of upcoming candidate features.', duration: '3.0 hrs', category: 'Keynote' },
      { id: 't12-8', title: 'Transition from Execution Lead to Strategic Driver', desc: 'Delegate operational sprint grooming to team leads to focus on high-leverage initiatives.', duration: '2.5 hrs', category: 'Delegation' },
      { id: 't12-9', title: 'Publish External Thought Leadership Article', desc: 'Author deep technical case study on JobGen engineering blog discussing micro-frontend architecture.', duration: '4.0 hrs', category: 'Branding' },
      { id: 't12-10', title: 'Audit Personal Professional Development Goals', desc: 'Identify executive coaching, public speaking, or conference opportunities for the coming year.', duration: '2.0 hrs', category: 'Growth' },
      { id: 't12-11', title: 'Finalize Next-Quarter Team Hiring Headcount Requisitions', desc: 'Open job descriptions for Senior Frontend Engineer and Machine Learning Specialist.', duration: '3.0 hrs', category: 'Talent' },
      { id: 't12-12', title: 'Establish Cross-Company Community Roundtables', desc: 'Host roundtable with product leaders from Canva, Atlassian, and Stripe on hiring automation.', duration: '3.0 hrs', category: 'Industry Leadership' },
      { id: 't12-13', title: 'Archive 90-Day Roadmap & Celebrate Full Completion', desc: 'Mark entire 12-phase onboarding journey as successfully completed and archive milestone.', duration: '2.0 hrs', category: 'Milestone' },
      { id: 't12-14', title: 'Cement Standing as Mission-Critical Technology Leader', desc: 'Review long-term equity vesting and transition permanently into Senior Leadership tier.', duration: '1.5 hrs', category: 'Leadership' }
    ]
  }
];

export default function CareerPlanView() {
  // Load saved tasks state or initialize defaults
  const [phases, setPhases] = useState(() => {
    try {
      const saved = localStorage.getItem('jobgen_career_plan_v2_12phases');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    
    // Default initial states: Phase 1 has some completed and in-progress tasks to showcase the styling immediately!
    return DEFAULT_PHASES_DATA.map((p, idx) => {
      if (idx === 0) {
        return {
          ...p,
          tasks: p.tasks.map((t, tIdx) => {
            if (tIdx < 4) return { ...t, status: 'done' };
            if (tIdx === 4 || tIdx === 5) return { ...t, status: 'in_progress' };
            return { ...t, status: 'todo' };
          })
        };
      }
      return {
        ...p,
        tasks: p.tasks.map(t => ({ ...t, status: 'todo' }))
      };
    });
  });

  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [selectedRole, setSelectedRole] = useState('Lead Product Manager & AI Solutions Architect');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'todo' | 'in_progress' | 'done'
  const [searchQuery, setSearchQuery] = useState('');
  const [lockedToast, setLockedToast] = useState('');

  // Save to local storage on change
  useEffect(() => {
    try {
      localStorage.setItem('jobgen_career_plan_v2_12phases', JSON.stringify(phases));
    } catch (e) {}
  }, [phases]);

  const showLockedAlert = (msg) => {
    setLockedToast(msg);
    setTimeout(() => setLockedToast(''), 3400);
  };

  // Helper: check if a phase is unlocked
  // Phases can ONLY be progressed when all tasks in all preceding phases are marked 'done'!
  const isPhaseUnlocked = (phaseNumber) => {
    if (phaseNumber === 1) return true;
    // Check all previous phases up to phaseNumber - 1
    for (let pIdx = 0; pIdx < phaseNumber - 1; pIdx++) {
      const p = phases[pIdx];
      const allDone = p.tasks.every(t => t.status === 'done');
      if (!allDone) {
        return false;
      }
    }
    return true;
  };

  const handleSelectPhase = (targetIndex) => {
    const targetPhaseNum = targetIndex + 1;
    if (isPhaseUnlocked(targetPhaseNum)) {
      setActivePhaseIndex(targetIndex);
    } else {
      // Find the first blocked phase
      let blockerPhase = 1;
      for (let i = 0; i < targetIndex; i++) {
        const notDone = phases[i].tasks.some(t => t.status !== 'done');
        if (notDone) {
          blockerPhase = i + 1;
          break;
        }
      }
      const unfinishedCount = phases[blockerPhase - 1].tasks.filter(t => t.status !== 'done').length;
      showLockedAlert(`Phase ${targetPhaseNum} is Locked! Complete all remaining ${unfinishedCount} tasks in Phase ${blockerPhase} to unlock.`);
    }
  };

  // Toggle task status: todo -> in_progress -> done -> todo
  const cycleTaskStatus = (taskIndex) => {
    setPhases(prevPhases => {
      const updated = [...prevPhases];
      const currentTasks = [...updated[activePhaseIndex].tasks];
      const currentStatus = currentTasks[taskIndex].status;

      let nextStatus = 'in_progress';
      if (currentStatus === 'todo') nextStatus = 'in_progress';
      else if (currentStatus === 'in_progress') nextStatus = 'done';
      else nextStatus = 'todo';

      currentTasks[taskIndex] = { ...currentTasks[taskIndex], status: nextStatus };
      updated[activePhaseIndex] = { ...updated[activePhaseIndex], tasks: currentTasks };
      return updated;
    });
  };

  // Mark all tasks in active phase done
  const handleMarkAllActiveDone = () => {
    setPhases(prevPhases => {
      const updated = [...prevPhases];
      const currentTasks = updated[activePhaseIndex].tasks.map(t => ({ ...t, status: 'done' }));
      updated[activePhaseIndex] = { ...updated[activePhaseIndex], tasks: currentTasks };
      return updated;
    });
  };

  // Current active phase
  const activePhase = phases[activePhaseIndex];

  // Filter tasks based on search & status
  const filteredTasks = useMemo(() => {
    return activePhase.tasks.map((task, originalIndex) => ({ ...task, originalIndex }))
      .filter(task => {
        if (filterStatus !== 'all' && task.status !== filterStatus) return false;
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return task.title.toLowerCase().includes(q) || 
               task.desc.toLowerCase().includes(q) || 
               task.category.toLowerCase().includes(q);
      });
  }, [activePhase, filterStatus, searchQuery]);

  // Overall Statistics across all 12 phases
  const stats = useMemo(() => {
    let totalTasks = 0;
    let completedTasks = 0;
    let inProgressTasks = 0;
    let completedPhasesCount = 0;

    phases.forEach(p => {
      totalTasks += p.tasks.length;
      const doneInP = p.tasks.filter(t => t.status === 'done').length;
      const inProgInP = p.tasks.filter(t => t.status === 'in_progress').length;
      completedTasks += doneInP;
      inProgressTasks += inProgInP;
      if (doneInP === p.tasks.length) {
        completedPhasesCount++;
      }
    });

    const activePhaseDone = activePhase.tasks.filter(t => t.status === 'done').length;
    const activePhaseTotal = activePhase.tasks.length;
    const isCurrentPhaseComplete = activePhaseDone === activePhaseTotal;

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      completedPhasesCount,
      overallPercent: Math.round((completedTasks / totalTasks) * 100),
      activePhaseDone,
      activePhaseTotal,
      activePhasePercent: Math.round((activePhaseDone / activePhaseTotal) * 100),
      isCurrentPhaseComplete
    };
  }, [phases, activePhase]);

  return (
    <div style={{ paddingBottom: '70px', paddingRight: '28px', maxWidth: '1440px', margin: '0 auto', position: 'relative' }}>
      
      {/* Scoped CSS Animations for 60fps Smooth Continuous Blue Wipe Effect & Mist Blue Atmosphere */}
      <style>{`
        @keyframes blueContinuousWipe {
          0% {
            background-position: -250% 0;
          }
          100% {
            background-position: 250% 0;
          }
        }
        @keyframes bluePulseGlow {
          0%, 100% {
            box-shadow: 0 4px 14px rgba(37, 99, 235, 0.08), 0 0 0 1px rgba(37, 99, 235, 0.22);
          }
          50% {
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.16), 0 0 0 1.5px rgba(37, 99, 235, 0.4);
          }
        }
        @keyframes pulseSuccess {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes mistDriftOne {
          0% {
            transform: translate(-10%, -10%) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translate(12%, 14%) scale(1.2);
            opacity: 0.85;
          }
          100% {
            transform: translate(-10%, -10%) scale(1);
            opacity: 0.5;
          }
        }
        @keyframes mistDriftTwo {
          0% {
            transform: translate(15%, 25%) scale(1.1);
            opacity: 0.65;
          }
          50% {
            transform: translate(-12%, -8%) scale(0.9);
            opacity: 0.4;
          }
          100% {
            transform: translate(15%, 25%) scale(1.1);
            opacity: 0.65;
          }
        }
        @keyframes mistDriftThree {
          0% {
            transform: translate(0%, 15%) scale(1);
            opacity: 0.45;
          }
          50% {
            transform: translate(8%, -12%) scale(1.25);
            opacity: 0.75;
          }
          100% {
            transform: translate(0%, 15%) scale(1);
            opacity: 0.45;
          }
        }
        .mist-blue-orb-1 {
          position: absolute;
          top: -12%;
          right: -8%;
          width: 550px;
          height: 550px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(147, 197, 253, 0.45) 0%, rgba(59, 130, 246, 0.22) 45%, transparent 75%);
          filter: blur(65px);
          animation: mistDriftOne 14s ease-in-out infinite;
          will-change: transform, opacity;
          pointer-events: none;
        }
        .mist-blue-orb-2 {
          position: absolute;
          bottom: 2%;
          left: 5%;
          width: 620px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(191, 219, 254, 0.5) 0%, rgba(96, 165, 250, 0.2) 48%, transparent 75%);
          filter: blur(80px);
          animation: mistDriftTwo 18s ease-in-out infinite;
          will-change: transform, opacity;
          pointer-events: none;
        }
        .mist-blue-orb-3 {
          position: absolute;
          top: 35%;
          right: 20%;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, rgba(37, 99, 235, 0.18) 50%, transparent 75%);
          filter: blur(75px);
          animation: mistDriftThree 16s ease-in-out infinite;
          will-change: transform, opacity;
          pointer-events: none;
        }
        .career-task-card {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .career-task-card:hover {
          transform: translateY(-3px);
        }
      `}</style>

      {/* =========================================================================
          TOAST NOTIFICATION (FOR LOCKED PHASES & ACTIONS)
          ========================================================================= */}
      {lockedToast && (
        <div 
          style={{
            position: 'fixed',
            bottom: '28px',
            right: '28px',
            zIndex: 9999,
            backgroundColor: '#090C15',
            color: '#FFFFFF',
            padding: '14px 22px',
            borderRadius: '14px',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '13px',
            fontWeight: 700,
            maxWidth: '460px'
          }}
        >
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Lock size={16} color="#FFFFFF" />
          </div>
          <span style={{ lineHeight: 1.45 }}>{lockedToast}</span>
        </div>
      )}

      {/* =========================================================================
          TOP BANNER: PERSONALIZED CAREER ROADMAP HEADER (ALL CAPS HALF BLACK HALF BLUE)
          ========================================================================= */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
          paddingTop: '18px',
          paddingBottom: '4px'
        }}
      >
        <div>
          <h1 
            style={{ 
              fontSize: '36px', 
              fontWeight: 900, 
              letterSpacing: '-0.025em', 
              margin: 0, 
              textTransform: 'uppercase', 
              lineHeight: 1.15,
              textShadow: '0 4px 16px rgba(15, 23, 42, 0.08)'
            }}
          >
            <span style={{ color: '#090C15' }}>PERSONALIZED CAREER </span>
            <span style={{ color: '#1A53CF', textShadow: '0 4px 18px rgba(26, 83, 207, 0.28)' }}>ROADMAP</span>
          </h1>
        </div>

        {/* Global Progress Statistics Card (Compact) */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            backgroundColor: '#FFFFFF',
            padding: '8px 14px',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 4px rgba(15, 23, 42, 0.04)'
          }}
        >
          {/* Progress Circular Dial */}
          <div style={{ textAlign: 'center', paddingRight: '2px' }}>
            <span style={{ fontSize: '18px', fontWeight: 900, color: '#1A53CF', display: 'block', lineHeight: 1 }}>
              {stats.overallPercent}%
            </span>
            <span style={{ fontSize: '9px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
              Overall Progress
            </span>
          </div>

          <div style={{ width: '1px', height: '26px', backgroundColor: '#E2E8F0' }} />

          {/* Phases Done Counter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', fontWeight: 800, color: '#090C15' }}>
              <Layers size={12} color="#1A53CF" />
              <span>{stats.completedPhasesCount} of 12 Phases Completed</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
              <CheckCircle2 size={11} color="#10B981" />
              <span>{stats.completedTasks} of {stats.totalTasks} Tasks Done</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN WORKSPACE-STYLE CONTAINER WITH LEFT-STACKED PHASE TABS
          ========================================================================= */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'flex-start',
          position: 'relative'
        }}
      >
        {/* Left Column: 12 Stacked Phase Tabs (matching Workspace layout) */}
        <div 
          style={{ 
            width: '210px', 
            flexShrink: 0, 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '6px',
            zIndex: 5,
            paddingRight: '0px'
          }}
        >
          {phases.map((p, idx) => {
            const phaseNum = p.phase;
            const isUnlocked = isPhaseUnlocked(phaseNum);
            const isSelected = activePhaseIndex === idx;
            const doneCount = p.tasks.filter(t => t.status === 'done').length;
            const isAllDone = doneCount === p.tasks.length;

            return (
              <button
                key={phaseNum}
                onClick={() => handleSelectPhase(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderTopLeftRadius: '16px',
                  borderBottomLeftRadius: '16px',
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px',
                  backgroundColor: isSelected ? '#1A53CF' : '#FFFFFF',
                  background: isSelected 
                    ? 'linear-gradient(135deg, #1A53CF 0%, #2563EB 100%)' 
                    : (isUnlocked ? '#FFFFFF' : '#F1F5F9'),
                  color: isSelected ? '#FFFFFF' : (isUnlocked ? '#090C15' : '#64748B'),
                  border: isSelected 
                    ? '1.5px solid #1A53CF' 
                    : '1px solid #E2E8F0',
                  borderRight: 'none',
                  cursor: isUnlocked ? 'pointer' : 'not-allowed',
                  opacity: isUnlocked ? 1 : 0.6,
                  position: 'relative',
                  textAlign: 'left',
                  boxShadow: isSelected 
                    ? '0 6px 18px rgba(26, 83, 207, 0.35)' 
                    : '0 1px 3px rgba(15, 23, 42, 0.02)',
                  transition: 'all 0.18s ease',
                  transform: isSelected ? 'translateX(2px)' : 'translateX(0)',
                  zIndex: isSelected ? 8 : 4,
                  minHeight: '52px'
                }}
                onMouseEnter={(e) => {
                  if (isUnlocked && !isSelected) {
                    e.currentTarget.style.backgroundColor = '#F8FAFC';
                    e.currentTarget.style.transform = 'translateX(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isUnlocked && !isSelected) {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span 
                    style={{ 
                      fontSize: '13px', 
                      fontWeight: 800, 
                      color: isSelected ? '#FFFFFF' : (isUnlocked ? '#090C15' : '#64748B'),
                      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif'
                    }}
                  >
                    Phase {phaseNum}
                  </span>
                  <span style={{ fontSize: '10.5px', color: isSelected ? '#BFDBFE' : '#64748B', fontWeight: 600 }}>
                    {p.timeframe} • {doneCount}/{p.tasks.length}
                  </span>
                </div>

                <div>
                  {isAllDone ? (
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: isSelected ? '#FFFFFF' : '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={11} color={isSelected ? '#1A53CF' : '#FFFFFF'} strokeWidth={3} />
                    </div>
                  ) : isUnlocked ? (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isSelected ? '#FFFFFF' : '#2563EB' }} />
                  ) : (
                    <Lock size={13} color="#94A3B8" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Main Container */}
        <div 
          style={{
            flex: 1,
            minWidth: 0,
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '24px',
            borderBottomRightRadius: '24px',
            borderBottomLeftRadius: '24px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            boxShadow: '0 6px 24px rgba(15, 23, 42, 0.05)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          {/* Ambient Mist Blue Animation Atmosphere */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
              pointerEvents: 'none',
              zIndex: 0
            }}
          >
            <div className="mist-blue-orb-1" />
            <div className="mist-blue-orb-2" />
            <div className="mist-blue-orb-3" />
          </div>

          {/* Active Phase Header Banner */}
          <div 
            style={{
              padding: '24px 28px',
              backgroundColor: 'rgba(255, 255, 255, 0.86)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderBottom: '1px solid #F1F5F9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              position: 'relative',
              zIndex: 2
            }}
          >
            <div style={{ maxWidth: '820px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                <span 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '5px',
                    padding: '4px 10px', 
                    borderRadius: '999px', 
                    backgroundColor: '#EFF6FF', 
                    color: '#1A53CF', 
                    fontSize: '11px', 
                    fontWeight: 800,
                    textTransform: 'uppercase' 
                  }}
                >
                  <Calendar size={12} />
                  <span>Phase {activePhase.phase} of 12</span>
                </span>

                <span 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '5px',
                    padding: '4px 10px', 
                    borderRadius: '999px', 
                    backgroundColor: '#FEF3C7', 
                    color: '#D97706', 
                    fontSize: '11px', 
                    fontWeight: 800 
                  }}
                >
                  <Clock size={12} />
                  <span>Time Allocation: 1 Week</span>
                </span>

                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>
                  • {activePhase.tasks.length} Targeted Tasks
                </span>
              </div>

              <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#090C15', letterSpacing: '-0.02em', margin: 0 }}>
                {activePhase.title}
              </h2>
            </div>

            {/* Phase Completion Progress & Action Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '140px', height: '8px', borderRadius: '999px', backgroundColor: '#F1F5F9', overflow: 'hidden' }}>
                  <div 
                    style={{
                      height: '100%',
                      width: `${stats.activePhasePercent}%`,
                      backgroundColor: stats.isCurrentPhaseComplete ? '#10B981' : '#1A53CF',
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
                <span style={{ fontSize: '12.5px', fontWeight: 800, color: stats.isCurrentPhaseComplete ? '#10B981' : '#090C15' }}>
                  {stats.activePhaseDone} / {stats.activePhaseTotal} Done
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {!stats.isCurrentPhaseComplete && (
                  <button
                    onClick={handleMarkAllActiveDone}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      backgroundColor: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      color: '#1A53CF',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    <CheckCircle2 size={13} />
                    <span>Mark All Done</span>
                  </button>
                )}

                {stats.isCurrentPhaseComplete && activePhaseIndex < 11 && (
                  <button
                    onClick={() => handleSelectPhase(activePhaseIndex + 1)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      borderRadius: '999px',
                      backgroundColor: '#10B981',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
                      animation: 'pulseSuccess 2s infinite ease-in-out'
                    }}
                  >
                    <span>Unlock Phase {activePhase.phase + 1}</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Task Filters & Search Bar */}
          <div 
            style={{
              padding: '14px 28px',
              backgroundColor: 'rgba(248, 250, 252, 0.82)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              position: 'relative',
              zIndex: 2
            }}
          >
            <div style={{ display: 'flex', gap: '6px' }}>
              {[
                { id: 'all', label: `All Tasks (${activePhase.tasks.length})` },
                { id: 'in_progress', label: `In Progress (${activePhase.tasks.filter(t => t.status === 'in_progress').length})` },
                { id: 'todo', label: `To Do (${activePhase.tasks.filter(t => t.status === 'todo').length})` },
                { id: 'done', label: `Done (${activePhase.tasks.filter(t => t.status === 'done').length})` }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterStatus(f.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: filterStatus === f.id ? '#090C15' : '#FFFFFF',
                    color: filterStatus === f.id ? '#FFFFFF' : '#475569',
                    border: filterStatus === f.id ? '1px solid #090C15' : '1px solid #E2E8F0'
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '999px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                boxShadow: '0 1px 2px rgba(15, 23, 42, 0.03)'
              }}
            >
              <Search size={13} color="#94A3B8" />
              <input 
                type="text"
                placeholder="Search phase tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  fontSize: '12px',
                  width: '160px',
                  color: '#090C15'
                }}
              />
            </div>
          </div>

          {/* Tasks Grid without description */}
          <div 
            style={{
              padding: '24px 28px 36px 28px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '16px',
              backgroundColor: 'transparent',
              position: 'relative',
              zIndex: 2,
              minHeight: '380px'
            }}
          >
            {filteredTasks.map(task => {
              const isDone = task.status === 'done';
              const isInProgress = task.status === 'in_progress';

              return (
                <div
                  key={task.id}
                  onClick={() => cycleTaskStatus(task.originalIndex)}
                  className="career-task-card"
                  style={{
                    position: 'relative',
                    borderRadius: '16px',
                    padding: '18px 20px',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '128px',

                    ...(isDone && {
                      backgroundColor: '#1A53CF',
                      backgroundImage: 'linear-gradient(135deg, #1A53CF 0%, #1545B0 100%)',
                      color: '#FFFFFF',
                      border: '1.5px solid #1A53CF',
                      boxShadow: '0 8px 24px rgba(26, 83, 207, 0.32)'
                    }),

                    ...(isInProgress && {
                      backgroundColor: 'rgba(255, 255, 255, 0.88)',
                      backgroundImage: 'linear-gradient(115deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.92) 28%, rgba(219, 234, 254, 0.45) 44%, rgba(59, 130, 246, 0.3) 50%, rgba(219, 234, 254, 0.45) 56%, rgba(255, 255, 255, 0.92) 72%, rgba(255, 255, 255, 0.92) 100%)',
                      backgroundSize: '250% 100%',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      animation: 'blueContinuousWipe 6.5s infinite linear, bluePulseGlow 3.6s infinite ease-in-out',
                      color: '#090C15',
                      border: '1.5px solid rgba(37, 99, 235, 0.45)'
                    }),

                    ...(!isDone && !isInProgress && {
                      backgroundColor: '#FFFFFF',
                      color: '#090C15',
                      border: '1.5px solid #E2E8F0',
                      boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
                    })
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          ...(isDone ? {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            color: '#FFFFFF'
                          } : isInProgress ? {
                            backgroundColor: '#EFF6FF',
                            color: '#1A53CF',
                            border: '1px solid #BFDBFE'
                          } : {
                            backgroundColor: '#F1F5F9',
                            color: '#475569'
                          })
                        }}
                      >
                        {task.category}
                      </span>

                      <div 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '5px',
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          ...(isDone ? {
                            backgroundColor: 'rgba(255, 255, 255, 0.16)',
                            color: '#FFFFFF'
                          } : {
                            backgroundColor: '#F8FAFC',
                            color: '#64748B',
                            border: '1px solid #E2E8F0'
                          })
                        }}
                        title="Estimated duration to complete"
                      >
                        <Clock size={11} color={isDone ? '#FFFFFF' : '#1A53CF'} />
                        <span>{task.duration}</span>
                      </div>
                    </div>

                    <h3 
                      style={{
                        fontSize: '14.5px',
                        fontWeight: 800,
                        lineHeight: 1.35,
                        margin: '0 0 14px 0',
                        color: isDone ? '#FFFFFF' : '#090C15'
                      }}
                    >
                      {task.title}
                    </h3>
                  </div>

                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '10px',
                      borderTop: isDone ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #F1F5F9'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {isDone ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', fontWeight: 800, color: '#FFFFFF' }}>
                          <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Check size={12} color="#1A53CF" strokeWidth={3} />
                          </div>
                          <span>Marked Done</span>
                        </div>
                      ) : isInProgress ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', fontWeight: 800, color: '#2563EB' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563EB', display: 'inline-block' }} />
                          <span>In Progress (Continuous Wipe)</span>
                        </div>
                      ) : (
                        <span style={{ fontSize: '11.5px', color: '#94A3B8', fontWeight: 600 }}>
                          Click to Start
                        </span>
                      )}
                    </div>

                    <span 
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: isDone ? '#FFFFFF' : '#1A53CF',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>{isDone ? 'Reset' : isInProgress ? 'Mark Done' : 'Start Task'}</span>
                      <ChevronRight size={12} />
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Bottom Corner Graphic Accent from public/bgimg.png (reduced by 25%) */}
          <img 
            src="/bgimg.png" 
            alt="" 
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '285px',
              maxWidth: '34%',
              pointerEvents: 'none',
              zIndex: 1,
              borderBottomRightRadius: '24px',
              userSelect: 'none'
            }}
          />

        </div>
      </div>

    </div>
  );
}
