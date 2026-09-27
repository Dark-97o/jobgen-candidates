import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Bot, 
  SlidersHorizontal, 
  Calendar as CalendarIcon, 
  Briefcase, 
  DollarSign, 
  X, 
  ChevronDown,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

// 9 Required Locations with dedicated real photography & bold white text
const LOCATION_CARDS = [
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80',
    tag: 'Tech & Fintech Hub'
  },
  {
    id: 'melbourne',
    name: 'Melbourne',
    country: 'Australia',
    image: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=600&q=80',
    tag: 'Design & Culture'
  },
  {
    id: 'san-francisco',
    name: 'San Francisco',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80',
    tag: 'Silicon Valley'
  },
  {
    id: 'canberra',
    name: 'Canberra',
    country: 'Australia',
    image: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=600&q=80',
    tag: 'GovTech & Defense'
  },
  {
    id: 'new-delhi',
    name: 'New Delhi',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80',
    tag: 'Enterprise & Startups'
  },
  {
    id: 'bangalore',
    name: 'Bangalore',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80',
    tag: 'Silicon Plateau'
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    country: 'India',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
    tag: 'Growing Tech Hub'
  },
  {
    id: 'california',
    name: 'California',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=600&q=80',
    tag: 'Innovation Coast'
  },
  {
    id: 'new-york',
    name: 'New York',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80',
    tag: 'Silicon Alley & FinTech'
  }
];

// Rich Jobs Data matching requested locations, platforms, work types, career levels, and salary ranges
const ALL_JOBS = [
  {
    id: 'canva-pm',
    company: 'Canva',
    initial: 'C',
    title: 'Lead Product Manager (Creator Ecosystem)',
    location: 'Sydney',
    locationFull: 'Sydney, Australia',
    workType: 'Hybrid',
    careerLevel: 'Lead / Executive',
    salaryNum: 210000,
    salary: '$195k - $225k AUD',
    equity: '$65k - $80k Canva Options / yr',
    department: 'Creator Studio & Multi-Surface Ecosystem',
    platform: 'LinkedIn',
    datePosted: 'Past 24 Hours',
    postedTime: '2h ago',
    score: 96,
    jobDarkImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    description: 'Lead the next generation of Canva creator tools used by 180M+ monthly active users. Drive multi-surface product roadmaps across web and mobile pods with deep empathy for creators.',
    teamMission: 'Empower over 180 million creators, educators, and enterprise marketing teams to turn ideas into professional visual communications in under 60 seconds with zero design training.',
    responsibilities: [
      'Own end-to-end product roadmaps for the desktop, web, and tablet visual editor suites.',
      'Lead a high-velocity pod of 14 senior engineers, 3 product designers, and 2 data scientists.',
      'Architect experimental growth funnels and AI-powered layout generation workflows.',
      'Synthesize real-time creator telemetries into prioritized quarter-by-quarter sprint backlogs.',
      'Partner closely with executive leadership to establish Canva as the default enterprise brand studio.'
    ],
    requirementsMust: [
      '6+ years scaling consumer-facing or creator-first SaaS applications to 10M+ MAUs.',
      'Demonstrated mastery in data-driven user funnel optimization and A/B multivariate testing.',
      'Deep fluency with modern browser graphics capabilities, SVG manipulation, and UI frameworks.',
      'Proven record leading cross-functional squads across product, design, and distributed engineering.'
    ],
    requirementsNice: [
      'Prior founding or early-stage product experience in design or generative media startups.',
      'Familiarity with WebAssembly, Canvas rendering pipelines, or vector layout engines.'
    ],
    perks: [
      { label: 'Base Salary', value: '$195k - $225k AUD' },
      { label: 'Annual Equity', value: '$65k - $80k Options' },
      { label: 'Health & Dental', value: '100% Comprehensive' },
      { label: 'Remote / WFH Stipend', value: '$3,500 Setup Budget' }
    ],
    hiringStages: [
      { step: '1', title: 'Recruiter Screen', time: '30 min' },
      { step: '2', title: 'Product Architecture Case', time: '60 min' },
      { step: '3', title: 'Squad & Leadership Loop', time: '90 min' },
      { step: '4', title: 'Executive Offer Alignment', time: '30 min' }
    ],
    matchedSkills: ['Product Strategy', 'Growth Funnels', 'Cross-Functional Leadership', 'Sprint Restructuring'],
    missingSkills: ['B2B Enterprise Governance', 'Localization Scaling'],
    starQuestions: [
      'Tell me about a time you drove a product pivot that increased engagement by over 20%.',
      'How do you manage disagreements between design leaders and backend infrastructure engineers?'
    ]
  },
  {
    id: 'atlassian-fe',
    company: 'Atlassian',
    initial: 'A',
    title: 'Senior Staff Frontend Architect',
    location: 'Sydney',
    locationFull: 'Sydney, Australia',
    workType: 'Remote',
    careerLevel: 'Mid-Senior',
    salaryNum: 225000,
    salary: '$210k - $240k AUD',
    equity: '$75k Atlassian RSUs (NASDAQ: TEAM)',
    department: 'Jira & Confluence Cloud Foundation Core',
    platform: 'Seek',
    datePosted: 'Past 24 Hours',
    postedTime: '5h ago',
    score: 94,
    jobDarkImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    description: 'Architect foundational micro-frontend infrastructure across Jira and Confluence cloud. Scale component library tokens, design system performance, and developer velocity across 14 distributed squads.',
    teamMission: 'Unify Atlassian Cloud onto a zero-latency, modular micro-frontend architecture with sub-100ms interaction response times for 300,000+ enterprise organizations globally.',
    responsibilities: [
      'Architect the next-generation micro-frontend runtime powering Jira and Confluence global workspaces.',
      'Standardize design system tokens, CSS performance budgets, and AST code-generation utilities.',
      'Diagnose and eliminate client memory leaks, rendering jank, and bundle bloat across 14 squads.',
      'Mentor senior and lead engineers on progressive hydration, React 19 Server Components, and Web Workers.',
      'Champion developer experience tooling that reduces CI build times and local hot-reload latency by 40%.'
    ],
    requirementsMust: [
      '8+ years building high-scale, enterprise-grade web applications in TypeScript and modern React.',
      'Deep expertise in Webpack/Vite module federation, micro-frontend runtimes, and bundle splitting.',
      'Mastery of browser rendering lifecycles, memory profiling, and Chrome DevTools tracing.',
      'Experience authoring shared NPM component libraries and design system token architectures.'
    ],
    requirementsNice: [
      'Contributions to open-source UI libraries, compilers, or TC39 ECMAScript standards.',
      'Experience with Rust-based frontend tooling (SWC, Biome, Turbopack).'
    ],
    perks: [
      { label: 'Base Salary', value: '$210k - $240k AUD' },
      { label: 'Annual RSUs', value: '$75k TEAM Stock' },
      { label: 'Work Anywhere', value: 'Team Anywhere Policy' },
      { label: 'Wellness Bonus', value: '$2,400 / yr Allowance' }
    ],
    hiringStages: [
      { step: '1', title: 'Initial Screening', time: '30 min' },
      { step: '2', title: 'System Architecture & Live Code', time: '75 min' },
      { step: '3', title: 'Values & Team Collaboration', time: '60 min' },
      { step: '4', title: 'VP Engineering Offer Call', time: '30 min' }
    ],
    matchedSkills: ['React 19 & TypeScript', 'Micro-Frontends', 'Design System Tokens', 'Web Performance'],
    missingSkills: ['GraphQL Federation', 'Distributed Tracing'],
    starQuestions: [
      'Describe a time you refactored a legacy frontend without breaking ongoing sprint commitments.',
      'How do you establish engineering benchmarks across 12 distributed squads?'
    ]
  },
  {
    id: 'stripe-ops',
    company: 'Stripe',
    initial: 'S',
    title: 'Product Strategy & Operations Lead',
    location: 'Melbourne',
    locationFull: 'Melbourne, Australia',
    workType: 'Hybrid',
    careerLevel: 'Lead / Executive',
    salaryNum: 195000,
    salary: '$180k - $210k AUD',
    equity: '$70k Stripe Equity Value Units',
    department: 'APAC Treasury & Global Payments Network',
    platform: 'Indeed',
    datePosted: 'Past Week',
    postedTime: '1d ago',
    score: 91,
    jobDarkImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
    description: 'Scale financial infrastructure onboarding across APAC enterprise platforms. Unify developer documentation, payment API SLAs, and regulatory compliance frameworks.',
    teamMission: 'Increase the GDP of the internet by engineering frictionless, fault-tolerant financial settlement rails for billions of dollars in daily cross-border digital transactions.',
    responsibilities: [
      'Scale payment orchestration APIs across Australia, New Zealand, and Southeast Asian merchant rails.',
      'Maintain 99.999% uptime SLAs across real-time fraud mitigation and automated chargeback resolution.',
      'Synthesize regulatory frameworks (APRA, RBA, MAS) into streamlined API developer experiences.',
      'Lead quarterly business reviews with Tier-1 enterprise platforms and institutional banking partners.',
      'Drive data analytics models tracking merchant transaction conversion rates and authorization boosts.'
    ],
    requirementsMust: [
      '7+ years operating in high-scale FinTech, payments, or developer-first API platforms.',
      'Deep analytical capability with SQL, Python, and statistical merchant conversion modeling.',
      'Proven expertise navigating financial regulatory standards, AML/KYC, and payment card schemes.',
      'Exceptional stakeholder communication across engineering, finance, legal, and executive teams.'
    ],
    requirementsNice: [
      'Experience with multi-currency cross-border clearing mechanisms and stablecoin liquidity rails.',
      'Prior engineering background or direct technical API product management experience.'
    ],
    perks: [
      { label: 'Base Salary', value: '$180k - $210k AUD' },
      { label: 'Stripe Equity', value: '$70k Annual Units' },
      { label: 'Healthcare', value: 'Comprehensive Premium' },
      { label: 'Parental Leave', value: '24 Weeks Fully Paid' }
    ],
    hiringStages: [
      { step: '1', title: 'Recruiter Chat', time: '30 min' },
      { step: '2', title: 'Quantitative Analytics Case', time: '60 min' },
      { step: '3', title: 'Product & Systems Loop', time: '90 min' },
      { step: '4', title: 'Managing Director Fit', time: '45 min' }
    ],
    matchedSkills: ['FinTech APIs', 'Enterprise SLAs', 'Developer Experience', 'Roadmap Prioritization'],
    missingSkills: ['APRA Prudential Standards', 'Multi-Currency Clearing'],
    starQuestions: [
      'How have you reconciled fast feature velocity with stringent financial compliance audits?',
      'Walk through how you analyzed churn in an API-driven enterprise product.'
    ]
  },
  {
    id: 'openai-ml',
    company: 'OpenAI',
    initial: 'O',
    title: 'Staff Research Engineer (Multimodal Reasoning)',
    location: 'San Francisco',
    locationFull: 'San Francisco, CA',
    workType: 'On-site',
    careerLevel: 'Lead / Executive',
    salaryNum: 260000,
    salary: '$240k - $285k USD + Equity',
    equity: '$150k - $250k OpenAI PPU Equity',
    department: 'Frontier Foundation Models & Audio-Visual Alignment',
    platform: 'LinkedIn',
    datePosted: 'Past 24 Hours',
    postedTime: '4h ago',
    score: 95,
    jobDarkImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80',
    description: 'Pioneer frontier foundation models advancing vision-language reasoning, chain-of-thought orchestration, and real-time interactive audio agent intelligence.',
    teamMission: 'Build safe, generally capable multimodal artificial intelligence that elevates human creative potential and accelerates scientific discovery across civilization.',
    responsibilities: [
      'Architect novel transformer architectures for unified vision, speech, and symbolic reasoning.',
      'Optimize distributed training runs across clusters of 10,000+ NVIDIA Blackwell GPUs.',
      'Engineer custom CUDA / Triton kernels to maximize token throughput and minimize inference latency.',
      'Develop reinforcement learning with human feedback (RLHF) and automated synthetic self-play rubrics.',
      'Publish breakthrough research methodologies while shipping production capabilities to ChatGPT.'
    ],
    requirementsMust: [
      'Extensive track record training and fine-tuning frontier foundation models (>50B parameters).',
      'Mastery of PyTorch, Megatron-LM, DeepSpeed, and distributed NCCL communication topologies.',
      'Demonstrated expertise writing high-performance GPU kernels in Triton or raw CUDA.',
      'Strong research publications in top-tier conferences (NeurIPS, ICML, CVPR) or equivalent open-source impact.'
    ],
    requirementsNice: [
      'Experience with FP8 / FP4 low-precision quantization kernels and FlashAttention optimizations.',
      'Track record building real-time bidirectional audio streaming neural codecs.'
    ],
    perks: [
      { label: 'Base Salary', value: '$240k - $285k USD' },
      { label: 'OpenAI Equity', value: '$180k+ Profit Units' },
      { label: 'Catering & Meals', value: '3x Daily Gourmet' },
      { label: 'Hardware Access', value: 'Dedicated GPU Clusters' }
    ],
    hiringStages: [
      { step: '1', title: 'Research Director Screen', time: '30 min' },
      { step: '2', title: 'Distributed Systems & CUDA', time: '90 min' },
      { step: '3', title: 'Multimodal Research Presentation', time: '60 min' },
      { step: '4', title: 'Founding Team Alignment', time: '45 min' }
    ],
    matchedSkills: ['PyTorch / CUDA', 'LLM Alignment', 'Distributed Training', 'Latency Optimization'],
    missingSkills: ['FP8 Quantization Kernels'],
    starQuestions: [
      'Describe your strategy for diagnosing divergence in large distributed model training runs.',
      'How do you approach latency reduction for interactive voice agent inference?'
    ]
  },
  {
    id: 'databricks-de',
    company: 'Databricks',
    initial: 'D',
    title: 'Senior Distributed Systems Engineer',
    location: 'California',
    locationFull: 'California, USA',
    workType: 'Remote',
    careerLevel: 'Mid-Senior',
    salaryNum: 215000,
    salary: '$190k - $225k USD',
    equity: '$85k Annual Databricks Pre-IPO RSUs',
    department: 'Photon Vectorized Lakehouse Query Engine',
    platform: 'Indeed',
    datePosted: 'Past Week',
    postedTime: '3d ago',
    score: 92,
    jobDarkImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    description: 'Build scalable query execution engines for Lakehouse architectures. Optimize Apache Spark kernels, photon caching layers, and high-throughput analytical query planning.',
    teamMission: 'Power the open data intelligence platform that helps over 10,000 enterprises unify data engineering, analytics, and generative AI on a single lakehouse architecture.',
    responsibilities: [
      'Develop C++ vectorized execution primitives for the Photon query engine.',
      'Eliminate memory copy overhead across multi-terabyte analytical queries and Spark shuffle files.',
      'Design adaptive query optimization heuristics based on runtime data distribution statistics.',
      'Implement lock-free synchronization primitives for hyper-threaded CPU and GPU acceleration.',
      'Collaborate with the Delta Lake open-source community to establish cutting-edge storage standards.'
    ],
    requirementsMust: [
      '5+ years writing production systems code in Modern C++ (C++17/20) or Rust.',
      'Deep knowledge of computer architecture: cache hierarchies, SIMD vectorization, and memory barriers.',
      'Practical experience with database internals: query planners, cost optimizers, and columnar storage.',
      'Proven ability to profile, benchmark, and eliminate sub-microsecond latency bottlenecks.'
    ],
    requirementsNice: [
      'Prior contributions to Apache Spark, Arrow, DuckDB, or ClickHouse codebases.',
      'Familiarity with cloud object store latency profiles (S3, GCS, Azure Blob).'
    ],
    perks: [
      { label: 'Base Salary', value: '$190k - $225k USD' },
      { label: 'Pre-IPO Equity', value: '$85k Annual RSUs' },
      { label: 'Home Office Fund', value: '$2,500 Initial + $1k/yr' },
      { label: '401(k) Match', value: '6% Dollar for Dollar' }
    ],
    hiringStages: [
      { step: '1', title: 'Engineering Screen', time: '30 min' },
      { step: '2', title: 'C++ Systems Architecture', time: '60 min' },
      { step: '3', title: 'Concurrency & Performance', time: '60 min' },
      { step: '4', title: 'Core Systems Director Call', time: '45 min' }
    ],
    matchedSkills: ['C++ / Rust', 'Distributed Consensus', 'Query Optimization', 'Apache Spark'],
    missingSkills: ['Vectorized SIMD intrinsics'],
    starQuestions: [
      'How do you design zero-copy data serialization pipelines under strict memory ceilings?',
      'Explain a distributed deadlock issue you debugged and solved in a production cluster.'
    ]
  },
  {
    id: 'google-delhi',
    company: 'Google',
    initial: 'G',
    title: 'Lead Cloud Infrastructure Architect',
    location: 'New Delhi',
    locationFull: 'New Delhi, India',
    workType: 'Hybrid',
    careerLevel: 'Lead / Executive',
    salaryNum: 165000,
    salary: '₹65L - ₹85L INR (~$165k USD)',
    equity: '₹35L Google GSUs (NASDAQ: GOOGL)',
    department: 'Google Cloud Platform (GCP) Enterprise Sovereign Infra',
    platform: 'Naukri',
    datePosted: 'Past 24 Hours',
    postedTime: '8h ago',
    score: 93,
    jobDarkImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    description: 'Design hyperscale cloud architectures for sovereign enterprise clients and digital public infrastructure across India and South Asia.',
    teamMission: 'Deliver resilient, ultra-secure sovereign cloud foundations that power digital public goods, large-scale financial networks, and nation-state enterprises across South Asia.',
    responsibilities: [
      'Architect multi-region high availability architectures across Delhi and Mumbai GCP cloud regions.',
      'Lead sovereign data residency designs complying with strict government localization laws.',
      'Optimize Kubernetes (GKE), Cloud Spanner, and Anthos deployments for 10M+ concurrent queries.',
      'Direct executive technical briefings with Chief Technology Officers and regulatory ministries.',
      'Oversee disaster recovery game days achieving zero data loss (RPO=0) during catastrophic simulations.'
    ],
    requirementsMust: [
      '10+ years architecting enterprise distributed cloud solutions on GCP, AWS, or Azure.',
      'Google Cloud Certified Professional Cloud Architect or equivalent industry certification.',
      'Mastery of software-defined networking, BGP routing, zero-trust security, and IAM federation.',
      'Proven experience leading technical cloud migrations for banking, defense, or telecom institutions.'
    ],
    requirementsNice: [
      'Experience architecting solutions on India Stack (UPI, DigiLocker, Account Aggregator).',
      'Knowledge of confidential computing and hardware security modules (HSM).'
    ],
    perks: [
      { label: 'Annual Package', value: '₹65L - ₹85L INR' },
      { label: 'Google Stock', value: '₹35L Annual GSUs' },
      { label: 'Healthcare', value: 'Full Family Health Coverage' },
      { label: 'Campus Perks', value: 'Micro-kitchens & Shuttles' }
    ],
    hiringStages: [
      { step: '1', title: 'Recruiter Assessment', time: '30 min' },
      { step: '2', title: 'Cloud Architecture Scenario', time: '60 min' },
      { step: '3', title: 'Googleyness & Leadership', time: '45 min' },
      { step: '4', title: 'Hiring Committee Review', time: 'Offline' }
    ],
    matchedSkills: ['Kubernetes / GCP', 'Multi-Region High Availability', 'Enterprise Security', 'Disaster Recovery'],
    missingSkills: ['Government Data Localization Protocols'],
    starQuestions: [
      'How do you plan multi-region failovers with near-zero RPO/RTO for financial workloads?',
      'Describe how you led migration of a legacy monolithic banking core to cloud-native microservices.'
    ]
  },
  {
    id: 'flipkart-sde',
    company: 'Flipkart',
    initial: 'F',
    title: 'Senior Full Stack Engineer (Checkout & Payments)',
    location: 'Bangalore',
    locationFull: 'Bangalore, India',
    workType: 'Hybrid',
    careerLevel: 'Mid-Senior',
    salaryNum: 145000,
    salary: '₹45L - ₹60L INR (~$145k USD)',
    equity: '₹18L Flipkart ESOP Grants',
    department: 'Consumer Funnels & High-Scale Payments',
    platform: 'Naukri',
    datePosted: 'Past Week',
    postedTime: '2d ago',
    score: 90,
    jobDarkImage: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=600&q=80',
    description: 'Build ultra-low latency checkout funnels handling 50k+ transactions per second during Big Billion Days. Deliver seamless UPI, card tokenization, and pay-later integrations.',
    teamMission: 'Make digital commerce effortless and instantaneous for 500 million Indian consumers through ultra-responsive frontend interactions and bulletproof checkout rails.',
    responsibilities: [
      'Engineer sub-second mobile web checkout funnels that gracefully degrade across spotty 4G networks.',
      'Build idempotent payment state machines handling 50,000 requests per second at peak festival sales.',
      'Integrate next-gen UPI AutoPay, biometric payment authentications, and credit line integrations.',
      'Benchmark frontend bundle footprints to keep initial render weight below 120KB gzipped.',
      'Lead automated chaos testing across payment gateways to guarantee automatic failover within 250ms.'
    ],
    requirementsMust: [
      '5+ years building high-traffic web applications in React, Node.js, and Java microservices.',
      'Hands-on expertise with distributed message brokers (Kafka, RabbitMQ) and caching (Redis).',
      'Solid grasp of relational and NoSQL databases (MySQL, Cassandra, PostgreSQL) under extreme load.',
      'Strong fundamentals in web performance optimization, Web Vitals, and mobile-first responsive design.'
    ],
    requirementsNice: [
      'Prior experience working with Indian payment systems (NPCI, UPI Intent, Payment Gateways).',
      'Experience with Progressive Web Apps (PWA) and service worker caching strategies.'
    ],
    perks: [
      { label: 'Base Compensation', value: '₹45L - ₹60L INR' },
      { label: 'Annual ESOPs', value: '₹18L Stock Allocation' },
      { label: 'Wellness Allowance', value: '₹50,000 Annual Fund' },
      { label: 'Flexible Work', value: 'Hybrid 2 Days Office' }
    ],
    hiringStages: [
      { step: '1', title: 'Coding Round', time: '60 min' },
      { step: '2', title: 'Low-Level Machine Coding', time: '90 min' },
      { step: '3', title: 'System Design & Scalability', time: '60 min' },
      { step: '4', title: 'Engineering Manager Fit', time: '45 min' }
    ],
    matchedSkills: ['React & Node.js', 'Kafka / Redis', 'High-Concurrency DBs', 'Payment Gateways'],
    missingSkills: ['Chaos Engineering Mesh'],
    starQuestions: [
      'How do you architect payment workflows to handle idempotency under network partitions?',
      'Explain how you optimize frontend bundle sizes to ensure sub-second loads on mobile 4G.'
    ]
  },
  {
    id: 'infosys-jaipur',
    company: 'Infosys Innovation Lab',
    initial: 'I',
    title: 'AI Solutions Architect',
    location: 'Jaipur',
    locationFull: 'Jaipur, India',
    workType: 'Hybrid',
    careerLevel: 'Mid-Senior',
    salaryNum: 115000,
    salary: '₹30L - ₹42L INR (~$115k USD)',
    equity: '₹10L Infosys Stock Incentives',
    department: 'Applied Generative AI & Cognitive Automation',
    platform: 'Naukri',
    datePosted: 'Past Month',
    postedTime: '5d ago',
    score: 88,
    jobDarkImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80',
    description: 'Develop enterprise generative AI copilots, document intelligence pipelines, and automated customer success agents for international Fortune 500 clients.',
    teamMission: 'Bridge cutting-edge LLMs and multi-agent frameworks into production enterprise workflows that deliver quantifiable ROI and measurable operational efficiency.',
    responsibilities: [
      'Architect enterprise Retrieval-Augmented Generation (RAG) systems over multi-million document stores.',
      'Fine-tune open-source models (Llama 3, Mistral) on client-specific domain knowledge bases.',
      'Deploy autonomous agent swarms utilizing LangChain, AutoGen, and LangGraph.',
      'Establish guardrail filters for hallucinations, PII data leaks, and enterprise role-based security.',
      'Conduct client discovery workshops to identify and prototype high-impact AI pilot applications.'
    ],
    requirementsMust: [
      '4+ years building production software in Python, FastAPI, and asynchronous backend services.',
      'Proven hands-on experience building RAG architectures using vector databases (Pinecone, Qdrant, Milvus).',
      'Solid theoretical and practical grasp of embeddings, semantic search, and prompt engineering.',
      'Experience containerizing and deploying AI pipelines via Docker, Kubernetes, and cloud GPUs.'
    ],
    requirementsNice: [
      'Experience with enterprise identity management (Okta, Azure AD, OAuth2).',
      'Knowledge of model evaluation frameworks like RAGAS and TruLens.'
    ],
    perks: [
      { label: 'Base Package', value: '₹30L - ₹42L INR' },
      { label: 'Stock Grant', value: '₹10L Performance RSUs' },
      { label: 'Certifications', value: '100% Reimbursed Cloud AI' },
      { label: 'Campus Facility', value: 'State-of-art Jaipur Lab' }
    ],
    hiringStages: [
      { step: '1', title: 'Technical Screen', time: '30 min' },
      { step: '2', title: 'Generative AI Case Study', time: '60 min' },
      { step: '3', title: 'System Architecture Round', time: '60 min' },
      { step: '4', title: 'Practice Head Discussion', time: '30 min' }
    ],
    matchedSkills: ['LangChain / RAG', 'Python & FastAPI', 'Vector Databases', 'OpenAI APIs'],
    missingSkills: ['Enterprise SSO Federation'],
    starQuestions: [
      'How do you evaluate and benchmark retrieval accuracy in production RAG systems?',
      'Describe a client workshop where you guided non-technical stakeholders to identify high-ROI AI use cases.'
    ]
  },
  {
    id: 'cyber-canberra',
    company: 'Australian Cyber Security Centre',
    initial: 'A',
    title: 'Principal Threat Intelligence Engineer',
    location: 'Canberra',
    locationFull: 'Canberra, Australia',
    workType: 'On-site',
    careerLevel: 'Lead / Executive',
    salaryNum: 185000,
    salary: '$170k - $200k AUD + Super',
    equity: '15.4% Australian Superannuation Match',
    department: 'National Critical Infrastructure Threat Telemetry',
    platform: 'Seek',
    datePosted: 'Past Week',
    postedTime: '4d ago',
    score: 91,
    jobDarkImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    description: 'Lead national critical infrastructure threat telemetry, zero-day threat analysis, and automated incident triage systems protecting sovereign digital networks.',
    teamMission: 'Safeguard Australia’s national sovereignty, critical power and telecommunications infrastructure, and digital economy against sophisticated state-sponsored cyber adversaries.',
    responsibilities: [
      'Monitor and correlate nation-state advanced persistent threat (APT) campaign telemetry.',
      'Reverse-engineer novel malware samples, rootkits, and exploit payloads in isolated sandbox enclaves.',
      'Build automated intelligence feeds distributing machine-readable threat indicators (STIX/TAXII).',
      'Author classified defensive advisories for federal government departments and infrastructure operators.',
      'Coordinate rapid incident response protocols during live national-scale cyber security incursions.'
    ],
    requirementsMust: [
      'Australian Citizenship with ability to obtain and maintain an NV1 / NV2 Security Clearance.',
      '7+ years experience in cyber threat intelligence, digital forensics, or reverse engineering.',
      'Deep fluency in x86/ARM disassembly (IDA Pro, Ghidra), network packet inspection (Wireshark), and SIEM.',
      'Comprehensive understanding of the MITRE ATT&CK framework and adversary threat tradecraft.'
    ],
    requirementsNice: [
      'Active Australian NV2 clearance or current commonwealth agency experience.',
      'Contributions to public vulnerability disclosures or CVE authoring.'
    ],
    perks: [
      { label: 'Base Remuneration', value: '$170k - $200k AUD' },
      { label: 'Superannuation', value: '15.4% Commonwealth Rate' },
      { label: 'Security Clearance', value: 'Government Sponsored' },
      { label: 'Training Budget', value: 'SANS & BlackHat Passes' }
    ],
    hiringStages: [
      { step: '1', title: 'Security & Integrity Assessment', time: '45 min' },
      { step: '2', title: 'Forensic Malware Analysis Lab', time: '90 min' },
      { step: '3', title: 'Threat Intelligence Briefing', time: '60 min' },
      { step: '4', title: 'Board Clearance & Appointment', time: 'Official' }
    ],
    matchedSkills: ['Threat Modeling', 'Reverse Engineering', 'SIEM / Splunk', 'Network Forensics'],
    missingSkills: ['NV1 / NV2 Australian Security Clearance'],
    starQuestions: [
      'Walk through how you analyzed an advanced persistent threat (APT) campaign from initial indicators to remediation.',
      'How do you communicate high-severity vulnerability impacts to executive policymakers?'
    ]
  },
  {
    id: 'goldman-ny',
    company: 'Goldman Sachs',
    initial: 'G',
    title: 'Vice President - Algorithmic Trading Systems',
    location: 'New York',
    locationFull: 'New York, NY',
    workType: 'Hybrid',
    careerLevel: 'Lead / Executive',
    salaryNum: 250000,
    salary: '$225k - $275k USD + Bonus',
    equity: '$120k+ Discretionary Performance Bonus',
    department: 'Global Markets Division · Quantitative Execution Architecture',
    platform: 'LinkedIn',
    datePosted: 'Past 24 Hours',
    postedTime: '3h ago',
    score: 94,
    jobDarkImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
    description: 'Engineer ultra-low latency quantitative market-making execution platforms. Optimize order book matching, FPGA feed handlers, and high-frequency risk controls.',
    teamMission: 'Execute millions of multi-asset financial trades daily with sub-microsecond precision, delivering premier liquidity across global equity and derivatives exchanges.',
    responsibilities: [
      'Architect sub-microsecond algorithmic order routing engines in Modern C++20 on tuned Linux kernels.',
      'Optimize network interface cards (Solarflare Onload) and kernel-bypass UDP multicast market feeds.',
      'Engineer fail-safe real-time pre-trade risk controls processing 500,000 trade events per second.',
      'Collaborate with quantitative researchers to productionize mathematical statistical arbitrage strategies.',
      'Diagnose hardware-level cache thrashing, branch mispredictions, and lock contention on bare metal.'
    ],
    requirementsMust: [
      '7+ years writing low-latency systems in C++ (C++17/C++20) within financial trading or high-frequency systems.',
      'Expertise in Linux kernel tuning, CPU core pinning, NUMA memory architecture, and lock-free queues.',
      'Deep working knowledge of market microstructure, order books, and exchange protocols (FIX, ITCH, OUCH).',
      'Demonstrated track record of delivering resilient, high-throughput systems where downtime carries direct financial loss.'
    ],
    requirementsNice: [
      'Experience with FPGA / ASIC hardware acceleration (Verilog / VHDL).',
      'Advanced degree in Computer Engineering, Electrical Engineering, or Physics.'
    ],
    perks: [
      { label: 'Base Salary', value: '$225k - $275k USD' },
      { label: 'Performance Bonus', value: '40% - 70% Target' },
      { label: 'Healthcare & 401k', value: 'Tier 1 Platinum Benefit' },
      { label: 'New York HQ', value: '200 West Street Campus' }
    ],
    hiringStages: [
      { step: '1', title: 'Quant Systems Screen', time: '45 min' },
      { step: '2', title: 'Low-Latency C++ Deep Dive', time: '90 min' },
      { step: '3', title: 'Risk Systems & Concurrency', time: '60 min' },
      { step: '4', title: 'Managing Director Partnership Loop', time: '60 min' }
    ],
    matchedSkills: ['Modern C++20', 'Low-Latency Linux Kernel', 'Multithreading Lock-Free Queues', 'Market Microstructure'],
    missingSkills: ['Fixed Income Derivatives Pricing'],
    starQuestions: [
      'How do you minimize cache misses and branch mispredictions in critical algorithmic execution loops?',
      'Describe an edge case in high-frequency trading risk throttles that you engineered fail-safes for.'
    ]
  },
  {
    id: 'bloomberg-ny',
    company: 'Bloomberg LP',
    initial: 'B',
    title: 'Senior Software Engineer (Real-Time Terminal)',
    location: 'New York',
    locationFull: 'New York, NY',
    workType: 'On-site',
    careerLevel: 'Mid-Senior',
    salaryNum: 205000,
    salary: '$185k - $215k USD',
    equity: '$45k Annual Profit-Sharing Allocation',
    department: 'Bloomberg Core Terminal · Market Data Visualizations',
    platform: 'Indeed',
    datePosted: 'Past Week',
    postedTime: '2d ago',
    score: 92,
    jobDarkImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80',
    description: 'Develop responsive data visualization engines delivering millisecond-grade financial charts, news feeds, and analytics to over 350,000 global financial professionals.',
    teamMission: 'Provide the global financial elite with the most trusted, indispensable, real-time market data interface on earth with 100% rendering reliability and instant responsiveness.',
    responsibilities: [
      'Build GPU-accelerated financial chart visualization engines in TypeScript, WebGL, and C++.',
      'Process high-frequency WebSocket streams pushing 100,000 tick updates per second to the client viewport.',
      'Design modular dashboard widgets allowing traders to customize real-time multi-asset monitors.',
      'Optimize DOM virtual scrolling hierarchies to eliminate layout thrashing during peak market volatility.',
      'Collaborate with Bloomberg News and market analysts to launch interactive economic data features.'
    ],
    requirementsMust: [
      '5+ years building complex, data-dense client applications using TypeScript, React, and Canvas/WebGL.',
      'Solid grasp of real-time communication protocols (WebSockets, Server-Sent Events, WebTransport).',
      'Deep understanding of browser rendering performance, memory management, and event loop mechanics.',
      'Experience designing robust state management solutions for continuous high-frequency data streams.'
    ],
    requirementsNice: [
      'Familiarity with financial instruments (Equities, FX, Fixed Income, Derivatives).',
      'Experience with WebAssembly (Wasm) modules for client-side analytical calculations.'
    ],
    perks: [
      { label: 'Base Salary', value: '$185k - $215k USD' },
      { label: 'Profit Sharing', value: 'Annual Bloomberg Payout' },
      { label: '731 Lexington Ave', value: 'Iconic Global HQ' },
      { label: 'Retirement Plan', value: 'Generous 401(k) Match' }
    ],
    hiringStages: [
      { step: '1', title: 'Technical Phone Screen', time: '45 min' },
      { step: '2', title: 'Data Structures & Algorithms', time: '60 min' },
      { step: '3', title: 'Client Systems Architecture', time: '60 min' },
      { step: '4', title: 'Engineering Manager & Team Fit', time: '45 min' }
    ],
    matchedSkills: ['TypeScript / C++', 'WebSocket Protocols', 'Canvas / WebGL Rendering', 'System Architecture'],
    missingSkills: ['Options Volatility Surfaces'],
    starQuestions: [
      'How do you maintain 60 FPS client rendering when processing thousands of incoming tick updates per second?',
      'Explain a challenging race condition you diagnosed in a multi-threaded client environment.'
    ]
  },
  {
    id: 'figma-sf',
    company: 'Figma',
    initial: 'F',
    title: 'Senior Product Designer (Collaborative Systems)',
    location: 'San Francisco',
    locationFull: 'San Francisco, CA',
    workType: 'Hybrid',
    careerLevel: 'Mid-Senior',
    salaryNum: 195000,
    salary: '$180k - $210k USD + Equity',
    equity: '$90k Figma Annual RSUs',
    department: 'Multiplayer Design Engine & Design Systems',
    platform: 'LinkedIn',
    datePosted: 'Past 24 Hours',
    postedTime: '6h ago',
    score: 95,
    jobDarkImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
    description: 'Shape the next era of multiplayer canvas interactions, variable font tools, and AI generative design canvas features used by millions of creators globally.',
    teamMission: 'Make design accessible, collaborative, and joyful for every product team on earth by inventing intuitive interaction models for the modern creative web.',
    responsibilities: [
      'Design revolutionary multiplayer interaction patterns for the Figma infinite vector canvas.',
      'Lead UX specifications for auto-layout enhancements, design tokens, and developer mode handoff.',
      'Prototype novel micro-interactions and tactile physics feedback for variable font and stroke tools.',
      'Conduct rigorous usability studies with world-leading product design teams and design system architects.',
      'Partner closely with C++ / WebAssembly engineers to turn audacious design concepts into performant reality.'
    ],
    requirementsMust: [
      '5+ years crafting consumer-grade creative tools, complex web apps, or operating system interfaces.',
      'Exceptional craft in typography, spatial layouts, motion choreography, and design systems.',
      'Ability to prototype complex interaction models using code (React, HTML/CSS, Framer, or WebGL).',
      'Strong storytelling and systems thinking ability, balancing granular micro-polish with macroscopic architecture.'
    ],
    requirementsNice: [
      'Experience with vector graphics math (Bézier curves, affine transformations, shaders).',
      'Direct experience contributing to widely adopted open-source design systems or design tool plugins.'
    ],
    perks: [
      { label: 'Base Salary', value: '$180k - $210k USD' },
      { label: 'Figma RSUs', value: '$90k Annual Equity' },
      { label: 'Wellness Stipend', value: '$2,000 Annual Budget' },
      { label: 'Creative Fund', value: '$1,500 Hardware Grant' }
    ],
    hiringStages: [
      { step: '1', title: 'Portfolio Walkthrough', time: '45 min' },
      { step: '2', title: 'Interactive Design Jam', time: '75 min' },
      { step: '3', title: 'Cross-Functional Collaboration', time: '60 min' },
      { step: '4', title: 'VP Design & Offer Session', time: '30 min' }
    ],
    matchedSkills: ['Product Strategy', 'Design Systems', 'Micro-Interactions', 'Multiplayer UX'],
    missingSkills: ['WebGL Shader Prototyping'],
    starQuestions: [
      'Walk through a complex interaction model you distilled into an intuitive, invisible design experience.',
      'How do you bridge the gap between design tokens and production code in engineering systems?'
    ]
  }
];

// Official Company Logos rendered as crisp authentic vector SVGs
function CompanyLogo({ company, size = 28, style = {} }) {
  const normalized = (company || '').toLowerCase();

  if (normalized.includes('canva')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ borderRadius: '7px', flexShrink: 0, ...style }}>
        <rect width="32" height="32" rx="7" fill="#00C4CC" />
        <path d="M19 10.5c-3.8 0-6.8 2.8-6.8 7.2 0 3.8 2.6 6.5 6.2 6.5 2.8 0 4.8-1.5 5.6-3.5l-2.4-1c-.5 1.3-1.7 2.1-3.2 2.1-2.1 0-3.6-1.5-3.8-3.8h9.8c.1-.4.1-.8.1-1.3 0-3.7-2.1-6.2-5.5-6.2zm-3.9 5.8c.3-1.9 1.7-3.4 3.9-3.4 2 0 3.3 1.4 3.6 3.4h-7.5z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (normalized.includes('atlassian')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ borderRadius: '7px', flexShrink: 0, ...style }}>
        <rect width="32" height="32" rx="7" fill="#0052CC" />
        <path d="M15.4 7c-.3.4-.6 1-.7 1.6-1.3 5.4 1.1 10.3 4.2 14.4.2.3.6.4 1 .2.3-.2.4-.6.2-1-3-4.4-4.8-8.8-3.7-13.8.1-.5-.1-1-.6-1.4-.2-.1-.3 0-.4 0z" fill="#2684FF" />
        <path d="M11.6 15.6c-.3.4-.4.9-.3 1.4 1.1 4.5 4.3 8 7.9 10.8.3.2.7.2 1-.1.2-.3.2-.7-.1-1-3.6-2.9-6.3-6.1-7.2-10.3-.1-.5-.5-.8-1-.8-.1 0-.2 0-.3 0z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (normalized.includes('stripe')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ borderRadius: '7px', flexShrink: 0, ...style }}>
        <rect width="32" height="32" rx="7" fill="#635BFF" />
        <path d="M16.8 12.8c-1.3-.4-2.1-.8-2.1-1.5 0-.8.8-1.3 2.1-1.3 1.5 0 2.8.5 3.7 1.2l.9-2.1c-1.1-.8-2.8-1.3-4.6-1.3-3.2 0-5.3 1.7-5.3 4.4 0 2.4 1.7 3.5 4.3 4.3 1.5.5 2.1.9 2.1 1.7 0 .9-.9 1.4-2.3 1.4-1.8 0-3.4-.7-4.4-1.6l-1 2.2c1.3 1.1 3.2 1.7 5.4 1.7 3.4 0 5.6-1.7 5.6-4.5 0-2.6-1.8-3.7-4.4-4.6z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (normalized.includes('openai')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ borderRadius: '7px', flexShrink: 0, ...style }}>
        <rect width="32" height="32" rx="7" fill="#10A37F" />
        <path d="M22.8 14.1a4.2 4.2 0 0 0-.3-3.1 4.3 4.3 0 0 0-4.1-2.2 4.2 4.2 0 0 0-2.8-1.1 4.3 4.3 0 0 0-4 2.9 4.2 4.2 0 0 0-2.9 1.4 4.3 4.3 0 0 0-.6 4.6 4.2 4.2 0 0 0 .3 3.1 4.3 4.3 0 0 0 4.1 2.2 4.2 4.2 0 0 0 2.8 1.1 4.3 4.3 0 0 0 4-2.9 4.2 4.2 0 0 0 2.9-1.4 4.3 4.3 0 0 0 .6-4.6zm-5.9 7.5a2.8 2.8 0 0 1-2.1-.1l1.2-2.1a1.4 1.4 0 0 0 1.6-.3l2.4 1.4a2.9 2.9 0 0 1-3.1 1.1zm-4.9-2.2a2.8 2.8 0 0 1-.4-2l2.4-.2a1.4 1.4 0 0 0 .9 1.4l-1.2 2.4a2.9 2.9 0 0 1-1.7-1.6zm-1.5-5.1a2.8 2.8 0 0 1 1.6-1.3v2.4a1.4 1.4 0 0 0-.7 1.5l-2.4-.2a2.9 2.9 0 0 1 1.5-2.4zm7.4-1.8l-1.2 2.1a1.4 1.4 0 0 0-1.6.3L14.7 13.5a2.9 2.9 0 0 1 5.2-1zm3.3 4a2.8 2.8 0 0 1 .4 2l-2.4.2a1.4 1.4 0 0 0-.9-1.4l1.2-2.4a2.9 2.9 0 0 1 1.7 1.6zm-1.8 3.3a1.4 1.4 0 0 0 .7-1.5l2.4.2a2.9 2.9 0 0 1-1.5 2.4l-1.6-1.1z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (normalized.includes('databricks')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ borderRadius: '7px', flexShrink: 0, ...style }}>
        <rect width="32" height="32" rx="7" fill="#FF3621" />
        <path d="M16 6.5l8 4.6v3.2l-8-4.6-8 4.6v-3.2l8-4.6zm8 7.8v3.2l-8 4.6-8-4.6v-3.2l8 4.6 8-4.6zm0 6.4v3.2l-8 4.6-8-4.6v-3.2l8 4.6 8-4.6z" fill="#FFFFFF" />
      </svg>
    );
  }

  if (normalized.includes('google')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ borderRadius: '7px', flexShrink: 0, ...style }}>
        <rect width="32" height="32" rx="7" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <path d="M22.8 16.2c0-.5-.04-1-.13-1.5H16v2.9h3.8c-.16.9-.67 1.7-1.43 2.2v1.8h2.3c1.36-1.3 2.13-3.1 2.13-5.4z" fill="#4285F4" />
        <path d="M16 23.2c1.9 0 3.6-.6 4.8-1.7l-2.3-1.8c-.6.4-1.5.7-2.5.7-1.9 0-3.5-1.3-4.1-3.1H9.4v1.9c1.2 2.4 3.7 4 6.6 4z" fill="#34A853" />
        <path d="M11.9 17.3c-.2-.5-.3-1-.3-1.6s.1-1.1.3-1.6V12.2H9.4c-.5 1-1 2.3-1 3.8s.5 2.8 1 3.8l2.5-2.5z" fill="#FBBC05" />
        <path d="M16 11.5c1.1 0 2 .4 2.8 1.1l2.1-2.1C19.5 9.4 17.9 8.8 16 8.8c-2.9 0-5.4 1.6-6.6 4l2.5 1.9c.6-1.8 2.2-3.2 4.1-3.2z" fill="#EA4335" />
      </svg>
    );
  }

  if (normalized.includes('flipkart')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ borderRadius: '7px', flexShrink: 0, ...style }}>
        <rect width="32" height="32" rx="7" fill="#2874F0" />
        <path d="M12 9h8l1 3H11l1-3zm-1 4h10l-1.5 10.5c-.1.8-.8 1.5-1.6 1.5h-5.8c-.8 0-1.5-.7-1.6-1.5L9 13h2zm3 3v6h2v-6h-2zm4 0v6h2v-6h-2z" fill="#FFDF00" />
      </svg>
    );
  }

  if (normalized.includes('infosys')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ borderRadius: '7px', flexShrink: 0, ...style }}>
        <rect width="32" height="32" rx="7" fill="#007CC3" />
        <text x="16" y="20" fill="#FFFFFF" fontSize="10.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">INFY</text>
      </svg>
    );
  }

  if (normalized.includes('cyber') || normalized.includes('australian')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ borderRadius: '7px', flexShrink: 0, ...style }}>
        <rect width="32" height="32" rx="7" fill="#0F172A" />
        <path d="M16 6.5l7 3v6c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10v-6l7-3z" fill="#1E293B" stroke="#00D2FF" strokeWidth="1.2" />
        <path d="M16 11a3.5 3.5 0 0 0-3.5 3.5v1.8h7v-1.8a3.5 3.5 0 0 0-3.5-3.5zm-1.8 5.3v-1.8a1.8 1.8 0 1 1 3.6 0v1.8h-3.6z" fill="#00D2FF" />
      </svg>
    );
  }

  if (normalized.includes('goldman')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ borderRadius: '7px', flexShrink: 0, ...style }}>
        <rect width="32" height="32" rx="7" fill="#7399C6" />
        <text x="16" y="15" fill="#FFFFFF" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">GS</text>
        <text x="16" y="22" fill="#FFFFFF" fontSize="5.5" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">QUANT</text>
      </svg>
    );
  }

  if (normalized.includes('bloomberg')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ borderRadius: '7px', flexShrink: 0, ...style }}>
        <rect width="32" height="32" rx="7" fill="#111827" />
        <text x="16" y="22" fill="#FF5E00" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">B</text>
      </svg>
    );
  }

  if (normalized.includes('figma')) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ borderRadius: '7px', flexShrink: 0, ...style }}>
        <rect width="32" height="32" rx="7" fill="#1E1E1E" />
        <path d="M12 7h4v4h-4a2 2 0 0 1-2-2 2 2 0 0 1 2-2z" fill="#F24E1E" />
        <path d="M16 7h4a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-4V7z" fill="#FF7262" />
        <path d="M16 11h4a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-4v-4z" fill="#1ABCFE" />
        <path d="M12 11h4v4h-4a2 2 0 0 1-2-2 2 2 0 0 1 2-2z" fill="#A259FF" />
        <path d="M12 15h4v4a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-4z" fill="#0ACF83" />
      </svg>
    );
  }

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '7px',
        backgroundColor: '#090C15',
        color: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 900,
        fontSize: `${size * 0.45}px`,
        flexShrink: 0,
        ...style
      }}
    >
      {company.charAt(0)}
    </div>
  );
}

// Helper to render official platform badge with brand colors and icons
function PlatformBadge({ platform }) {
  const configs = {
    LinkedIn: {
      bg: 'rgba(10, 102, 194, 0.12)',
      border: 'rgba(10, 102, 194, 0.3)',
      text: '#0A66C2',
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z"/>
        </svg>
      )
    },
    Seek: {
      bg: 'rgba(230, 2, 120, 0.12)',
      border: 'rgba(230, 2, 120, 0.3)',
      text: '#E60278',
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" fill="#E60278"/>
          <path d="M16 8.5c-.8-.5-1.9-.8-3.1-.8-2.6 0-4.2 1.4-4.2 3.5 0 2.2 1.7 3.1 3.5 3.6 1.4.4 2.2.8 2.2 1.6 0 .9-.8 1.5-2.2 1.5-1.4 0-2.6-.5-3.3-1.1l-.8 1.5c1 .8 2.5 1.3 4.1 1.3 2.8 0 4.5-1.5 4.5-3.8 0-2.3-1.8-3.2-3.6-3.7-1.3-.4-2-.8-2-1.5 0-.8.7-1.4 1.9-1.4 1.1 0 2.1.4 2.8.9l.7-1.5z" fill="#FFFFFF"/>
        </svg>
      )
    },
    Indeed: {
      bg: 'rgba(33, 100, 243, 0.12)',
      border: 'rgba(33, 100, 243, 0.3)',
      text: '#2164F3',
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.6 2.3c-2.3 0-4.2 1.6-4.6 3.8h.1c.9-.7 2.1-1.1 3.3-1.1 3 0 5.4 2.4 5.4 5.4v1.8c-.8-.5-1.9-.8-3.1-.8-3.6 0-6.5 2.9-6.5 6.5 0 3.6 2.9 6.5 6.5 6.5 2.1 0 3.9-.9 5.1-2.4v2h2.5V11.8c0-5.2-3.9-9.5-8.7-9.5zm.9 19.6c-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2c1.3 0 2.4.6 3.1 1.5v4.5c-.8 1.4-1.9 2.4-3.1 2.4z"/>
        </svg>
      )
    },
    Naukri: {
      bg: 'rgba(0, 120, 219, 0.12)',
      border: 'rgba(0, 120, 219, 0.3)',
      text: '#0078DB',
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-5h2v5zm0-7h-2V7.5h2V9.5z"/>
        </svg>
      )
    }
  };

  const cfg = configs[platform] || configs.LinkedIn;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '3px 8px',
        borderRadius: '7px',
        backgroundColor: cfg.bg,
        border: `1px solid ${cfg.border}`,
        color: cfg.text,
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.01em',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)'
      }}
      title={`Posted via ${platform}`}
    >
      {cfg.icon}
      <span>{platform}</span>
    </div>
  );
}

export default function JobSearchView({ onNavigateToInterview, onNavigateToResume }) {
  const [selectedJobId, setSelectedJobId] = useState('canva-pm');
  
  // Search & Filter States
  const [jobTitleSearch, setJobTitleSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [datePostedFilter, setDatePostedFilter] = useState('All');
  const [workTypeFilter, setWorkTypeFilter] = useState('All');
  const [careerLevelFilter, setCareerLevelFilter] = useState('All');
  const [minSalary, setMinSalary] = useState(60000);

  // Application & Tailoring States
  const [tailorSuccess, setTailorSuccess] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState(['canva-pm']);
  const [isApplying, setIsApplying] = useState(false);

  // Filter Jobs based on All User Filter Inputs
  const filteredJobs = useMemo(() => {
    return ALL_JOBS.filter((job) => {
      // 1. Job Title Search
      const matchesTitle = !jobTitleSearch.trim() || 
        job.title.toLowerCase().includes(jobTitleSearch.toLowerCase()) ||
        job.company.toLowerCase().includes(jobTitleSearch.toLowerCase()) ||
        job.matchedSkills.some(s => s.toLowerCase().includes(jobTitleSearch.toLowerCase()));

      // 2. Location
      const matchesLoc = selectedLocation === 'All' || 
        job.location.toLowerCase() === selectedLocation.toLowerCase() ||
        job.locationFull.toLowerCase().includes(selectedLocation.toLowerCase());

      // 3. Date Posted
      const matchesDate = datePostedFilter === 'All' || 
        job.datePosted === datePostedFilter;

      // 4. Work Type
      const matchesWorkType = workTypeFilter === 'All' || 
        job.workType.toLowerCase() === workTypeFilter.toLowerCase();

      // 5. Career Level
      const matchesLevel = careerLevelFilter === 'All' || 
        job.careerLevel.toLowerCase().includes(careerLevelFilter.toLowerCase());

      // 6. Salary Slider
      const matchesSalary = job.salaryNum >= minSalary;

      return matchesTitle && matchesLoc && matchesDate && matchesWorkType && matchesLevel && matchesSalary;
    });
  }, [jobTitleSearch, selectedLocation, datePostedFilter, workTypeFilter, careerLevelFilter, minSalary]);

  // Currently selected active job
  const selectedJob = filteredJobs.find(j => j.id === selectedJobId) || filteredJobs[0] || ALL_JOBS[0];

  const handleTailorResume = () => {
    setTailorSuccess(true);
    setTimeout(() => {
      setTailorSuccess(false);
    }, 4000);
  };

  const handleOneClickApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      if (!appliedJobs.includes(selectedJob.id)) {
        setAppliedJobs([...appliedJobs, selectedJob.id]);
      }
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }, 1200);
  };

  const handleResetFilters = () => {
    setJobTitleSearch('');
    setSelectedLocation('All');
    setDatePostedFilter('All');
    setWorkTypeFilter('All');
    setCareerLevelFilter('All');
    setMinSalary(60000);
  };

  const isApplied = appliedJobs.includes(selectedJob?.id);

  return (
    <div style={{ paddingTop: '20px', paddingBottom: '40px', width: '100%', boxSizing: 'border-box' }}>
      
      {/* =========================================================================
          TOP COMMAND SURFACE:
          1. SEARCH BAR FOR JOB TITLE
          2. LOCATION BUTTON WITH ICON (OPENS MODAL WITH 9 CITY PHOTO CARDS)
          3. DATE POSTED FILTER
          4. WORK TYPE (HYBRID / REMOTE / ON-SITE)
          5. CAREER LEVEL FILTER
          6. SALARY SLIDER
          ========================================================================= */}
      <div 
        style={{ 
          background: 'rgba(255, 255, 255, 0.85)', 
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '16px 20px', 
          borderRadius: '20px', 
          border: '1px solid rgba(226, 232, 240, 0.9)', 
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
          marginBottom: '32px', 
          display: 'flex', 
          flexDirection: 'column',
          gap: '14px',
          maxWidth: '1220px',
          marginLeft: 0,
        }}
      >
        {/* Row 1: Search Bar (Job Title) & Location Button with Icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          
          {/* 1. Job Title Search Input */}
          <div style={{ flex: '0 1 420px', minWidth: '280px', position: 'relative' }}>
            <Search 
              size={18} 
              color="#64748B" 
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} 
            />
            <input 
              type="text"
              placeholder="Search by job title (e.g. Frontend Engineer, Product Manager, ML Architect)..."
              value={jobTitleSearch}
              onChange={(e) => setJobTitleSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 42px 12px 46px',
                borderRadius: '12px',
                border: '1.5px solid #CBD5E1',
                fontSize: '13.5px',
                fontWeight: 500,
                outline: 'none',
                color: '#090C15',
                backgroundColor: '#FFFFFF',
                boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.04)',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#2563EB';
                e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.15)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#CBD5E1';
                e.target.style.boxShadow = 'inset 0 1px 2px rgba(0, 0, 0, 0.04)';
              }}
            />
            {jobTitleSearch && (
              <button
                onClick={() => setJobTitleSearch('')}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94A3B8',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* 2. Location Button with Map Icon -> Opens Modal with 9 City Image Cards */}
          <button
            onClick={() => setShowLocationModal(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '11px 18px',
              borderRadius: '12px',
              border: selectedLocation !== 'All' ? '1.5px solid #2563EB' : '1.5px solid #CBD5E1',
              backgroundColor: selectedLocation !== 'All' ? '#EFF6FF' : '#FFFFFF',
              color: selectedLocation !== 'All' ? '#1D4ED8' : '#0F172A',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#2563EB';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = selectedLocation !== 'All' ? '#2563EB' : '#CBD5E1';
              e.currentTarget.style.transform = 'translateY(0px)';
            }}
          >
            <MapPin size={16} color={selectedLocation !== 'All' ? '#2563EB' : '#3B82F6'} strokeWidth={2.4} />
            <span>{selectedLocation === 'All' ? 'Select Location' : selectedLocation}</span>
            <ChevronDown size={15} color={selectedLocation !== 'All' ? '#2563EB' : '#64748B'} />
          </button>

          {/* Quick Active Opportunity Count badge */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#64748B' }}>
            <span>Showing <strong style={{ color: '#090C15' }}>{filteredJobs.length}</strong> matching roles</span>
            {(selectedLocation !== 'All' || datePostedFilter !== 'All' || workTypeFilter !== 'All' || careerLevelFilter !== 'All' || minSalary > 60000 || jobTitleSearch) && (
              <button
                onClick={handleResetFilters}
                title="Reset all filters"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: 'none',
                  color: '#2563EB',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: '2px 6px',
                }}
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Secondary Filters: Date Posted, Work Type, Career Level, Salary Slider */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            flexWrap: 'wrap',
            paddingTop: '12px',
            borderTop: '1px solid rgba(226, 232, 240, 0.8)'
          }}
        >
          {/* Filter 1: Date Posted */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CalendarIcon size={14} color="#64748B" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>Date Posted:</span>
            <select
              value={datePostedFilter}
              onChange={(e) => setDatePostedFilter(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '12px',
                fontWeight: 600,
                color: '#090C15',
                backgroundColor: '#FFFFFF',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="All">Any Time</option>
              <option value="Past 24 Hours">Past 24 Hours</option>
              <option value="Past Week">Past Week</option>
              <option value="Past Month">Past Month</option>
            </select>
          </div>

          {/* Filter 2: Work Type (Hybrid / Remote / On-Site) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Briefcase size={14} color="#64748B" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>Work Type:</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {['All', 'Hybrid', 'Remote', 'On-site'].map((type) => (
                <button
                  key={type}
                  onClick={() => setWorkTypeFilter(type)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '7px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: workTypeFilter === type ? '1px solid #2563EB' : '1px solid #E2E8F0',
                    backgroundColor: workTypeFilter === type ? '#2563EB' : '#FFFFFF',
                    color: workTypeFilter === type ? '#FFFFFF' : '#475569',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {type === 'All' ? 'All Types' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Filter 3: Career Level */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <SlidersHorizontal size={14} color="#64748B" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>Level:</span>
            <select
              value={careerLevelFilter}
              onChange={(e) => setCareerLevelFilter(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '12px',
                fontWeight: 600,
                color: '#090C15',
                backgroundColor: '#FFFFFF',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="All">All Levels</option>
              <option value="Mid-Senior">Mid-Senior</option>
              <option value="Lead / Executive">Lead / Executive</option>
            </select>
          </div>

          {/* Filter 4: Salary Slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 240px', minWidth: '220px' }}>
            <DollarSign size={14} color="#64748B" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', whiteSpace: 'nowrap' }}>
              Min Salary: <strong style={{ color: '#2563EB' }}>${(minSalary / 1000).toFixed(0)}k+</strong>
            </span>
            <input 
              type="range"
              min="50000"
              max="250000"
              step="10000"
              value={minSalary}
              onChange={(e) => setMinSalary(Number(e.target.value))}
              style={{
                flex: 1,
                cursor: 'pointer',
                accentColor: '#2563EB',
                height: '5px',
              }}
            />
          </div>

        </div>
      </div>

      {/* =========================================================================
          LOCATION MODAL POPUP:
          9 Distinct City Cards with High-Res Images & Bold White Text Over Images
          (Sydney, Melbourne, San Francisco, Canberra, New Delhi, Bangalore, Jaipur, California, New York)
          ========================================================================= */}
      {showLocationModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(9, 12, 21, 0.72)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box',
          }}
          onClick={() => setShowLocationModal(false)}
        >
          <div 
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '820px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '28px',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)',
              boxSizing: 'border-box',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={22} color="#2563EB" />
                  <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#090C15', fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    Select Target Location
                  </h3>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
                  Filter curated opportunities across prime global innovation hubs
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => {
                    setSelectedLocation('All');
                    setShowLocationModal(false);
                  }}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    background: '#F8FAFC',
                    color: '#0F172A',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  View All Worldwide
                </button>
                <button 
                  onClick={() => setShowLocationModal(false)}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    border: '1px solid #E2E8F0',
                    backgroundColor: '#F8FAFC',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748B',
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* 3x3 Grid of Location Cards with Photography & Bold White Text */}
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', 
                gap: '14px' 
              }}
            >
              {LOCATION_CARDS.map((loc) => {
                const isCurrent = selectedLocation.toLowerCase() === loc.name.toLowerCase();
                return (
                  <div
                    key={loc.id}
                    onClick={() => {
                      setSelectedLocation(loc.name);
                      setShowLocationModal(false);
                    }}
                    style={{
                      position: 'relative',
                      height: '145px',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: isCurrent ? '3px solid #2563EB' : '1px solid rgba(0, 0, 0, 0.08)',
                      boxShadow: isCurrent ? '0 8px 24px rgba(37, 99, 235, 0.35)' : '0 4px 14px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.2)';
                      const img = e.currentTarget.querySelector('img');
                      if (img) img.style.transform = 'scale(1.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0px)';
                      e.currentTarget.style.boxShadow = isCurrent ? '0 8px 24px rgba(37, 99, 235, 0.35)' : '0 4px 14px rgba(0, 0, 0, 0.08)';
                      const img = e.currentTarget.querySelector('img');
                      if (img) img.style.transform = 'scale(1)';
                    }}
                  >
                    {/* Background City Image */}
                    <img 
                      src={loc.image} 
                      alt={loc.name}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />

                    {/* Gradient Overlay for Crisp White Text Contrast */}
                    <div 
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(9, 12, 21, 0.15) 0%, rgba(9, 12, 21, 0.45) 45%, rgba(9, 12, 21, 0.85) 100%)',
                      }}
                    />

                    {/* Active Selected Check Badge */}
                    {isCurrent && (
                      <div 
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          backgroundColor: '#2563EB',
                          color: '#FFFFFF',
                          borderRadius: '999px',
                          padding: '3px 8px',
                          fontSize: '11px',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
                        }}
                      >
                        ✓ Selected
                      </div>
                    )}

                    {/* White Text Over Image */}
                    <div 
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        left: '14px',
                        right: '14px',
                        zIndex: 2,
                        userSelect: 'none',
                      }}
                    >
                      <h4 
                        style={{
                          margin: 0,
                          fontSize: '19px',
                          fontWeight: 900,
                          color: '#FFFFFF',
                          fontFamily: '"Plus Jakarta Sans", sans-serif',
                          letterSpacing: '-0.02em',
                          textShadow: '0 2px 10px rgba(0, 0, 0, 0.95), 0 0 16px rgba(0, 0, 0, 0.7)',
                          lineHeight: 1.1,
                        }}
                      >
                        {loc.name}
                      </h4>
                      <p 
                        style={{
                          margin: '3px 0 0 0',
                          fontSize: '11.5px',
                          fontWeight: 650,
                          color: 'rgba(255, 255, 255, 0.9)',
                          textShadow: '0 1px 6px rgba(0, 0, 0, 0.8)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span>{loc.country}</span>
                        <span style={{ fontSize: '10.5px', color: '#60A5FA', fontWeight: 700 }}>{loc.tag}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          2-COLUMN DISCOVERY WORKSTATION:
          LEFT: JOB CARDS with Half-White Half-Black Blended Logo & Left/Right Text
                Top Right Icon Showing Where It Was Posted (LinkedIn, Seek, Indeed, Naukri)
          RIGHT: DEEP JOB INSPECTOR TERMINAL
          ========================================================================= */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: '380px minmax(460px, 780px)', 
          gap: '18px', 
          alignItems: 'start',
          maxWidth: '1220px',
          marginLeft: 0,
        }}
      >
        
        {/* Left Column: Job Cards List with Smooth Frictionless Scrolling */}
        <div 
          className="frictionless-scroll"
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '14px', 
            maxHeight: 'calc(100vh - 220px)', 
            overflowY: 'auto', 
            scrollBehavior: 'smooth',
            overscrollBehavior: 'contain',
            paddingTop: '8px',
            paddingBottom: '20px',
            paddingLeft: '4px',
            paddingRight: '6px', 
            width: '100%', 
            maxWidth: '380px',
            boxSizing: 'border-box'
          }}
        >
          {filteredJobs.length === 0 ? (
            <div 
              style={{ 
                padding: '40px 20px', 
                textAlign: 'center', 
                background: '#FFFFFF', 
                borderRadius: '16px', 
                border: '1px dashed #CBD5E1' 
              }}
            >
              <Briefcase size={36} color="#94A3B8" style={{ margin: '0 auto 10px auto' }} />
              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#090C15' }}>No roles match your filters</h4>
              <p style={{ margin: '6px 0 16px 0', fontSize: '13px', color: '#64748B' }}>Try resetting your location, salary slider, or search term</p>
              <button
                onClick={handleResetFilters}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  backgroundColor: '#2563EB',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const isSelected = job.id === selectedJob.id;
              const hasApplied = appliedJobs.includes(job.id);

              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  style={{
                    background: isSelected ? 'rgba(239, 246, 255, 0.88)' : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    borderRadius: '18px',
                    border: isSelected ? '2px solid #2563EB' : '1px solid rgba(226, 232, 240, 0.95)',
                    padding: '16px',
                    cursor: 'pointer',
                    boxShadow: isSelected 
                      ? '0 10px 30px rgba(37, 99, 235, 0.16), inset 0 1px 2px rgba(255, 255, 255, 0.95)' 
                      : '0 4px 16px rgba(15, 23, 42, 0.04), inset 0 1px 2px rgba(255, 255, 255, 0.95)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#93C5FD';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.95)';
                      e.currentTarget.style.transform = 'translateY(0px)';
                    }
                  }}
                >
                  {/* =================================================================
                      SPLIT BLENDED HEADER:
                      Left: Actual Company Logo & Pure Black Company Name
                      Right: Dark Job-Relevant Image with Pure White Text Over It
                      ================================================================= */}
                  <div
                    style={{
                      position: 'relative',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      marginBottom: '12px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(226, 232, 240, 0.9)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      minHeight: '44px',
                    }}
                  >
                    {/* Dark Job-Relevant Image on the Right with seamless blend to the Left */}
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: '68%',
                        overflow: 'hidden',
                        pointerEvents: 'none',
                      }}
                    >
                      <img
                        src={job.jobDarkImage}
                        alt={job.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          filter: 'brightness(0.55) contrast(1.25)',
                        }}
                      />
                      {/* Seamless Gradient Fade: Pure White on left fading into deep photo tint on right */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(90deg, #FFFFFF 0%, rgba(255, 255, 255, 0.95) 8%, rgba(9, 12, 21, 0.45) 45%, rgba(9, 12, 21, 0.85) 100%)',
                        }}
                      />
                    </div>

                    {/* Left Side: Half White with Black Text and Actual Company Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px', zIndex: 2 }}>
                      <CompanyLogo company={job.company} size={28} />
                      <span
                        style={{
                          fontSize: '13.5px',
                          fontWeight: 800,
                          color: '#090C15',
                          letterSpacing: '-0.015em',
                          fontFamily: '"Plus Jakarta Sans", sans-serif',
                        }}
                      >
                        {job.company}
                      </span>
                    </div>

                    {/* Right Side: Pure White Text Over the Dark Image */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', zIndex: 2 }}>
                      <span
                        style={{
                          fontSize: '11.5px',
                          fontWeight: 700,
                          color: '#FFFFFF',
                          fontFamily: '"Plus Jakarta Sans", sans-serif',
                          letterSpacing: '-0.01em',
                          textShadow: '0 1px 4px rgba(0, 0, 0, 0.9), 0 0 8px rgba(0, 0, 0, 0.7)',
                        }}
                      >
                        {job.workType} · {job.careerLevel}
                      </span>
                    </div>
                  </div>

                  {/* Role Title & Top Right Platform Badge */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '8px' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 
                        style={{ 
                          margin: 0, 
                          fontSize: '14.5px', 
                          fontWeight: 800, 
                          color: '#090C15', 
                          letterSpacing: '-0.015em',
                          fontFamily: '"Plus Jakarta Sans", sans-serif',
                          lineHeight: 1.25,
                        }}
                      >
                        {job.title}
                      </h4>
                      <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={13} color="#2563EB" />
                        <span>{job.locationFull}</span>
                      </p>
                    </div>

                    {/* Top Right Icon Showing Where It Was Posted (LinkedIn, Seek, Indeed, Naukri) */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                      <PlatformBadge platform={job.platform} />
                      <span style={{ fontSize: '10.5px', color: '#94A3B8', fontWeight: 600 }}>
                        {job.postedTime}
                      </span>
                    </div>
                  </div>

                  {/* Description Snippet */}
                  <p 
                    style={{ 
                      margin: '8px 0', 
                      fontSize: '12px', 
                      color: '#475569', 
                      lineHeight: 1.45,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {job.description}
                  </p>

                  {/* Skills tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', margin: '8px 0' }}>
                    {job.matchedSkills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '10.5px',
                          fontWeight: 650,
                          backgroundColor: '#F1F5F9',
                          color: '#334155',
                          padding: '2px 7px',
                          borderRadius: '5px',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                    {job.matchedSkills.length > 3 && (
                      <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#64748B', alignSelf: 'center' }}>
                        +{job.matchedSkills.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Bottom Strip: Salary & ATS Compatibility Match Score */}
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      marginTop: '10px', 
                      paddingTop: '10px', 
                      borderTop: '1px solid rgba(0, 0, 0, 0.06)', 
                      fontSize: '12px' 
                    }}
                  >
                    <span style={{ fontWeight: 800, color: '#090C15' }}>
                      {job.salary}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {hasApplied && (
                        <span style={{ color: '#10B981', fontWeight: 700, backgroundColor: '#ECFDF5', padding: '2px 7px', borderRadius: '5px', fontSize: '11px' }}>
                          ✓ Applied
                        </span>
                      )}
                      <span 
                        style={{ 
                          fontSize: '11.5px', 
                          fontWeight: 800, 
                          fontFamily: 'var(--font-mono)',
                          color: job.score >= 93 ? '#059669' : '#1A53CF',
                          backgroundColor: job.score >= 93 ? '#ECFDF5' : '#EFF6FF',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          border: `1px solid ${job.score >= 93 ? '#A7F3D0' : '#BFDBFE'}`
                        }}
                      >
                        {job.score}% ATS
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Deep Job Inspection & 1-Click Action Terminal with Smooth Frictionless Scrolling */}
        <div 
          className="frictionless-scroll"
          style={{ 
            background: 'rgba(255, 255, 255, 0.92)', 
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1.5px solid rgba(226, 232, 240, 0.95)',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.06)',
            padding: '26px',
            position: 'sticky',
            top: '20px',
            maxHeight: 'calc(100vh - 160px)',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
            overscrollBehavior: 'contain',
          }}
        >
          {/* Header with Actual Company Logo */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', paddingBottom: '18px', borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
              <CompanyLogo company={selectedJob.company} size={44} style={{ borderRadius: '10px', boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)' }} />
              
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#1A53CF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {selectedJob.department || 'Active Opportunity Inspector'}
                  </span>
                  <PlatformBadge platform={selectedJob.platform} />
                </div>
                
                <h3 style={{ margin: '2px 0 4px 0', fontSize: '20px', fontWeight: 900, color: '#090C15', fontFamily: '"Plus Jakarta Sans", sans-serif', letterSpacing: '-0.02em' }}>
                  {selectedJob.title}
                </h3>
                
                <p style={{ margin: 0, fontSize: '13px', color: '#475569', fontWeight: 500 }}>
                  <strong style={{ color: '#090C15' }}>{selectedJob.company}</strong> · {selectedJob.locationFull} · <span style={{ color: '#16A34A', fontWeight: 700 }}>{selectedJob.salary}</span>
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'center', background: '#F8FAFC', padding: '10px 16px', borderRadius: '14px', border: '1px solid #E2E8F0', flexShrink: 0 }}>
              <span style={{ fontSize: '26px', fontWeight: 900, fontFamily: 'var(--font-mono)', color: tailorSuccess ? '#059669' : '#1A53CF' }}>
                {tailorSuccess ? '99%' : `${selectedJob.score}%`}
              </span>
              <span style={{ display: 'block', fontSize: '10px', color: '#64748B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                ATS Match
              </span>
            </div>
          </div>

          {/* Dark Job-Relevant Image Preview Banner */}
          <div 
            style={{ 
              position: 'relative', 
              borderRadius: '14px', 
              overflow: 'hidden', 
              height: '72px', 
              marginTop: '16px',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)'
            }}
          >
            <img 
              src={selectedJob.jobDarkImage} 
              alt={selectedJob.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5) contrast(1.2)' }} 
            />
            <div 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'linear-gradient(90deg, rgba(9, 12, 21, 0.85) 0%, rgba(9, 12, 21, 0.4) 60%, rgba(9, 12, 21, 0.85) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 16px',
                color: '#FFFFFF'
              }}
            >
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Active Workstation Domain
                </span>
                <h5 style={{ margin: '2px 0 0 0', fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>
                  {selectedJob.department}
                </h5>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.25)' }}>
                {selectedJob.workType} · {selectedJob.careerLevel}
              </span>
            </div>
          </div>

          {/* Role Overview & Squad Mission Section */}
          <div style={{ marginTop: '18px' }}>
            <h5 style={{ fontSize: '13px', fontWeight: 800, color: '#090C15', marginBottom: '6px' }}>Role Overview</h5>
            <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, margin: '0 0 10px 0' }}>
              {selectedJob.description}
            </p>
            {selectedJob.teamMission && (
              <div style={{ padding: '10px 14px', background: '#F8FAFC', borderRadius: '10px', borderLeft: '3px solid #2563EB', fontSize: '12.5px', color: '#334155', fontStyle: 'italic', lineHeight: 1.5 }}>
                <strong style={{ fontStyle: 'normal', color: '#090C15' }}>Squad Mission: </strong> 
                "{selectedJob.teamMission}"
              </div>
            )}
          </div>

          {/* Key Responsibilities & Deliverables */}
          {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
            <div style={{ marginTop: '18px' }}>
              <h5 style={{ fontSize: '13px', fontWeight: 800, color: '#090C15', marginBottom: '8px' }}>Key Responsibilities & Deliverables</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedJob.responsibilities.map((resp, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', fontSize: '12.5px', color: '#475569', lineHeight: 1.45 }}>
                    <CheckCircle2 size={15} color="#2563EB" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Candidate Requirements & Qualifications */}
          {selectedJob.requirementsMust && selectedJob.requirementsMust.length > 0 && (
            <div style={{ marginTop: '18px' }}>
              <h5 style={{ fontSize: '13px', fontWeight: 800, color: '#090C15', marginBottom: '8px' }}>Candidate Requirements & Experience</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedJob.requirementsMust.map((req, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', fontSize: '12.5px', color: '#475569', lineHeight: 1.45 }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#090C15', flexShrink: 0, marginTop: '7px' }} />
                    <span>{req}</span>
                  </div>
                ))}
                {selectedJob.requirementsNice && selectedJob.requirementsNice.map((req, idx) => (
                  <div key={`nice-${idx}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', fontSize: '12.5px', color: '#64748B', lineHeight: 1.45 }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#94A3B8', flexShrink: 0, marginTop: '7px' }} />
                    <span><em>Preferred:</em> {req}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compensation, Equity & Perks Grid */}
          {selectedJob.perks && selectedJob.perks.length > 0 && (
            <div style={{ marginTop: '18px' }}>
              <h5 style={{ fontSize: '13px', fontWeight: 800, color: '#090C15', marginBottom: '8px' }}>Compensation & Benefits Package</h5>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {selectedJob.perks.map((perk, idx) => (
                  <div key={idx} style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <span style={{ display: 'block', fontSize: '11px', color: '#64748B', fontWeight: 700 }}>{perk.label}</span>
                    <strong style={{ fontSize: '12.5px', color: '#090C15', fontWeight: 800 }}>{perk.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hiring Stages & Timeline */}
          {selectedJob.hiringStages && selectedJob.hiringStages.length > 0 && (
            <div style={{ marginTop: '18px' }}>
              <h5 style={{ fontSize: '13px', fontWeight: 800, color: '#090C15', marginBottom: '8px' }}>Hiring Process & Timeline</h5>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                {selectedJob.hiringStages.map((stage, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '6px 10px', borderRadius: '8px', fontSize: '11.5px', color: '#1E40AF', fontWeight: 700 }}>
                      <span style={{ color: '#2563EB', marginRight: '4px' }}>#{stage.step}</span>
                      {stage.title} <span style={{ color: '#64748B', fontWeight: 600 }}>({stage.time})</span>
                    </div>
                    {idx < selectedJob.hiringStages.length - 1 && (
                      <span style={{ color: '#CBD5E1', fontSize: '12px' }}>→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Keyword Alignment */}
          <div style={{ background: '#F8FAFC', borderRadius: '14px', padding: '16px', border: '1px solid #E2E8F0', marginTop: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#090C15', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                Master Profile Keyword Alignment
              </span>
              <span style={{ fontSize: '11px', color: '#059669', fontWeight: 800 }}>
                {selectedJob.matchedSkills.length} Matched / {selectedJob.missingSkills.length} Gap
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
              {selectedJob.matchedSkills.map((s, idx) => (
                <span key={idx} style={{ fontSize: '11px', fontWeight: 700, background: '#ECFDF5', color: '#059669', padding: '3px 8px', borderRadius: '6px', border: '1px solid #A7F3D0' }}>
                  ✓ {s}
                </span>
              ))}
            </div>

            <div style={{ borderTop: '1px dashed #CBD5E1', paddingTop: '10px' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#B45309', textTransform: 'uppercase' }}>
                Missing Keywords:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                {selectedJob.missingSkills.map((s, idx) => (
                  <span key={idx} style={{ fontSize: '11px', fontWeight: 700, background: tailorSuccess ? '#ECFDF5' : '#FEF3C7', color: tailorSuccess ? '#059669' : '#B45309', padding: '3px 8px', borderRadius: '6px', border: `1px solid ${tailorSuccess ? '#A7F3D0' : '#FCD34D'}` }}>
                    {tailorSuccess ? `✓ Bridged: ${s}` : `+ Need: ${s}`}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '20px' }}>
            <button
              onClick={handleTailorResume}
              style={{
                padding: '12px',
                borderRadius: '12px',
                background: '#FFFFFF',
                border: '1.5px solid #2563EB',
                color: '#2563EB',
                fontSize: '13px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#EFF6FF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
            >
              <Sparkles size={15} color="#2563EB" />
              <span>1-Click ATS Tailor</span>
            </button>

            <button
              onClick={handleOneClickApply}
              disabled={isApplying || isApplied}
              style={{
                padding: '12px',
                borderRadius: '12px',
                background: isApplied ? '#10B981' : '#090C15',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: isApplied ? 'default' : 'pointer',
                boxShadow: isApplied ? '0 4px 14px rgba(16, 185, 129, 0.3)' : '0 4px 14px rgba(9, 12, 21, 0.3)',
                transition: 'all 0.15s ease'
              }}
            >
              {isApplying ? (
                <span>Auto-Filling 14 Fields...</span>
              ) : isApplied ? (
                <>
                  <CheckCircle2 size={16} />
                  <span>Applied via {selectedJob.platform}</span>
                </>
              ) : (
                <>
                  <Zap size={16} />
                  <span>1-Click AutoFill Apply</span>
                </>
              )}
            </button>
          </div>

          {/* Emma AI Interview Prompt Box */}
          <div style={{ background: '#F8FAFC', borderRadius: '14px', padding: '16px', border: '1px solid #E2E8F0', marginTop: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '8px' }}>
              <Bot size={16} color="#2563EB" />
              <span style={{ fontSize: '12.5px', fontWeight: 800, color: '#090C15' }}>
                Practice {selectedJob.company} Mock Interview Questions
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#475569', fontStyle: 'italic', margin: '0 0 12px 0', lineHeight: 1.45 }}>
              "{selectedJob.starQuestions[0]}"
            </p>
            <button
              onClick={() => onNavigateToInterview && onNavigateToInterview()}
              style={{
                fontSize: '12px',
                fontWeight: 800,
                color: '#2563EB',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: 0
              }}
            >
              Open in Mock Interview Room →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
