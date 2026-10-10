import { 
  CandidateProfile, 
  JobMatchItem, 
  SkillGapItem, 
  RoadmapMilestone, 
  RecruiterCandidate, 
  DuplicatePair, 
  TalentMetrics, 
  NotificationItem 
} from '../types';

export const initialCandidateProfile: CandidateProfile = {
  name: "Alex Morgan",
  headline: "Aspiring Data & AI Analyst | Python & Cloud Enthusiast",
  email: "alex.morgan@techpulse.io",
  location: "San Francisco, CA (Open to Remote)",
  phone: "+1 (555) 438-9201",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  careerReadiness: 86,
  scores: {
    resumeHealth: 87,
    jobCompatibility: 82,
    skillStrength: 91,
    profileCompleteness: 76,
  },
  dimensions: {
    technicalSkills: 88,
    experience: 82,
    projects: 91,
    education: 85,
    certifications: 74,
  },
  actionableSteps: [
    { id: 1, title: "Learn Docker fundamentals & containerization", impact: "+4 pts", category: "DevOps", completed: false },
    { id: 2, title: "Build one end-to-end Cloud Data Pipeline (AWS S3 + Lambda)", impact: "+3 pts", category: "Cloud", completed: false },
    { id: 3, title: "Improve System Design & Distributed Data architecture", impact: "+2 pts", category: "Architecture", completed: false },
    { id: 4, title: "Quantify project outcomes with measurable business metrics (% latency, $ saved)", impact: "+1 pt", category: "Resume", completed: true },
  ],
  skills: [
    { name: "Python", category: "core", level: 94, years: 3.5, strength: "high" },
    { name: "SQL (PostgreSQL / Snowflake)", category: "data", level: 90, years: 3.0, strength: "high" },
    { name: "AWS (S3, EC2, Lambda)", category: "cloud", level: 78, years: 2.0, strength: "medium" },
    { name: "Java", category: "core", level: 75, years: 2.0, strength: "medium" },
    { name: "Machine Learning (Scikit-Learn)", category: "data", level: 82, years: 2.0, strength: "high" },
    { name: "HTML / CSS / Tailwind", category: "framework", level: 85, years: 3.0, strength: "high" },
    { name: "Data Visualization (Tableau)", category: "data", level: 72, years: 1.5, strength: "medium" },
    { name: "Git & CI/CD Basics", category: "core", level: 80, years: 2.5, strength: "high" },
  ],
  experience: [
    {
      title: "Data Analytics & Engineering Intern",
      company: "Nexus Insights Lab",
      period: "Jun 2024 - Dec 2024 (7 mos)",
      bullets: [
        "Architected automated ETL pipelines in Python & SQL processing 2.4M daily telemetry events.",
        "Integrated AWS S3 storage buckets with automated event triggers, cutting manual data sync by 85%.",
        "Developed executive dashboard reports tracking customer churn predictors with 91% accuracy.",
      ]
    },
    {
      title: "Junior Software Developer Apprentice",
      company: "Kinetix Digital Solutions",
      period: "Jan 2024 - May 2024 (5 mos)",
      bullets: [
        "Implemented RESTful API endpoints in Java Spring Boot serving analytics metrics to web clients.",
        "Refactored relational database queries, improving average response time from 420ms to 110ms.",
      ]
    }
  ],
  projects: [
    {
      name: "AI Resume & Career Fit Analyzer",
      tech: ["Python", "OpenAI Embeddings", "FastAPI", "PostgreSQL"],
      description: "Automated semantic parsing system that extracts candidate skill vectors and scores JD match similarity.",
      impact: "Reduced candidate screening time by 65% across 500+ pilot applications."
    },
    {
      name: "Health Portal Analytics Engine",
      tech: ["Python", "AWS Lambda", "SQL", "Tableau"],
      description: "HIPAA-compliant streaming telemetry dashboard monitoring patient intake throughput and resource bottlenecks.",
      impact: "Visualized ICU capacity in real-time, adopted by 3 regional medical clinics."
    }
  ],
  education: [
    {
      degree: "B.S. in Computer Science & Data Science",
      institution: "California Institute of Technology & Computing",
      year: "Graduating May 2025",
      score: "3.85 / 4.00 GPA"
    }
  ],
  certifications: [
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      year: "2024"
    },
    {
      name: "Professional Data Analyst Specialization",
      issuer: "Google / DeepLearning.AI",
      year: "2023"
    }
  ]
};

export const mockJobMatches: JobMatchItem[] = [
  {
    id: "job-1",
    title: "Data Analyst — Product & Growth",
    company: "Stripe Metrics Co.",
    location: "San Francisco, CA (Hybrid)",
    type: "Full-Time",
    salary: "$115,000 - $140,000",
    matchScore: 92,
    matchTag: "PERFECT FIT",
    skillsComparison: {
      matched: ["Python", "SQL", "Excel", "Data Visualization", "Git"],
      partial: ["AWS Cloud", "Tableau"],
      missing: ["Docker", "Power BI"]
    },
    aiExplanation: "Exceptional semantic alignment with your Python/SQL portfolio. Your 7-month internship at Nexus Insights directly mirrors their required telemetry pipeline responsibilities.",
    postedAgo: "2 days ago"
  },
  {
    id: "job-2",
    title: "Associate AI & ML Engineer",
    company: "Cognitive Vertex AI",
    location: "Remote",
    type: "Full-Time",
    salary: "$120,000 - $155,000",
    matchScore: 86,
    matchTag: "STRONG MATCH",
    skillsComparison: {
      matched: ["Python", "Machine Learning", "Git", "PostgreSQL"],
      partial: ["AWS (Lambda/S3)", "FastAPI"],
      missing: ["PyTorch / Deep Learning", "MLflow", "Docker"]
    },
    aiExplanation: "High overlap with your Scikit-Learn modeling and embeddings project. Bridging the containerization (Docker) gap will elevate your profile to top 5% candidate percentile.",
    postedAgo: "1 day ago"
  },
  {
    id: "job-3",
    title: "Cloud Data Solutions Specialist",
    company: "Apex Cloud Systems",
    location: "Austin, TX (Remote Available)",
    type: "Full-Time",
    salary: "$105,000 - $130,000",
    matchScore: 81,
    matchTag: "STRONG MATCH",
    skillsComparison: {
      matched: ["SQL", "AWS S3/EC2", "Python", "Java"],
      partial: ["CI/CD Pipelines", "System Design"],
      missing: ["Terraform", "Kubernetes", "Snowflake Modeling"]
    },
    aiExplanation: "Solid baseline cloud foundations. Your AWS Cloud Practitioner credential confirms core competency; acquiring Infrastructure as Code (Terraform) will guarantee interview fast-track.",
    postedAgo: "4 days ago"
  }
];

export const mockSkillGaps: SkillGapItem[] = [
  {
    id: "gap-1",
    name: "Docker & Containerization",
    priority: "HIGH",
    estimatedWeeks: 3,
    category: "DevOps & Cloud Deployment",
    targetRole: "Data Analyst & ML Engineer",
    recommendedCourse: "Docker for Data Science & Engineering Bootcamp",
    recommendedProject: "Containerize your AI Resume Analyzer with Docker Compose & deploy to AWS ECS",
    recommendedCert: "Docker Certified Associate (DCA)",
    status: "in_progress"
  },
  {
    id: "gap-2",
    name: "Power BI Advanced DAX Modeling",
    priority: "HIGH",
    estimatedWeeks: 2,
    category: "Enterprise Business Intelligence",
    targetRole: "Product Data Analyst",
    recommendedCourse: "Microsoft PL-300: Power BI Data Analyst Mastery",
    recommendedProject: "Build dynamic financial executive KPI dashboard with automated DAX measures",
    recommendedCert: "Microsoft Certified: Power BI Data Analyst",
    status: "pending"
  },
  {
    id: "gap-3",
    name: "Distributed Data with Apache Spark / Databricks",
    priority: "MEDIUM",
    estimatedWeeks: 4,
    category: "Big Data Processing",
    targetRole: "Cloud Analytics Specialist",
    recommendedCourse: "PySpark & Big Data Architecture Masterclass",
    recommendedProject: "Process 10GB NYC Taxi dataset using PySpark RDDs and DataFrames",
    recommendedCert: "Databricks Certified Associate Developer",
    status: "pending"
  }
];

export const mockRoadmap: RoadmapMilestone[] = [
  {
    period: "30 DAYS",
    title: "DevOps & Production Readiness",
    phase: "Phase 1: Closing High Priority Gaps",
    duration: "Weeks 1 - 4",
    status: "current",
    items: [
      { task: "Strengthen Advanced SQL (Window functions, CTEs & Index tuning)", type: "learn", impact: "+2 Readiness pts" },
      { task: "Master Docker containerization for Python API applications", type: "learn", impact: "+4 Readiness pts" },
      { task: "Package Resume Analyzer as containerized microservice", type: "project", impact: "Portfolio boost" }
    ]
  },
  {
    period: "60 DAYS",
    title: "BI Mastery & Cloud Pipelines",
    phase: "Phase 2: Enterprise Marketability",
    duration: "Weeks 5 - 8",
    status: "upcoming",
    items: [
      { task: "Learn Power BI and complete Microsoft PL-300 curriculum", type: "learn", impact: "+3 Readiness pts" },
      { task: "Build end-to-end telemetry pipeline on AWS Lambda + S3", type: "project", impact: "High recruiter attraction" },
      { task: "Complete AWS Solutions Architect Associate mock exams", type: "cert", impact: "Verified credential" }
    ]
  },
  {
    period: "90 DAYS",
    title: "Interview Drill & Placement Launch",
    phase: "Phase 3: Active Recruitment Campaign",
    duration: "Weeks 9 - 12",
    status: "upcoming",
    items: [
      { task: "Complete 20 Technical System Design & SQL live mock drills", type: "apply", impact: "85% interview pass rate" },
      { task: "Targeted applications to 25 verified high-compatibility roles", type: "apply", impact: "3+ interview invitations" }
    ]
  },
  {
    period: "6 MONTHS",
    title: "Career Elevation & Senior Trajectory",
    phase: "Phase 4: Mid-Level Engineering Transition",
    duration: "Month 4 - 6",
    status: "upcoming",
    items: [
      { task: "Publish technical case study on high-throughput data processing", type: "project", impact: "Thought leadership" },
      { task: "Evaluate compensation benchmarks & secure competitive offer", type: "apply", impact: "Target $120k+ compensation" }
    ]
  }
];

export const mockRecruiterCandidates: RecruiterCandidate[] = [
  {
    id: "cand-1",
    name: "Alex Morgan",
    rank: 1,
    matchScore: 92,
    label: "Excellent Match",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    targetRole: "Data Analyst & Pipeline Specialist",
    yearsExperience: 3.2,
    education: "B.S. Computer Science & Data (3.85 GPA)",
    requiredSkillsMet: 5,
    requiredSkillsTotal: 5,
    preferredSkillsMet: 4,
    preferredSkillsTotal: 5,
    projectRelevance: 91,
    whyThisCandidate: [
      "Matches all 5 required skills (Python, SQL, Cloud storage, REST APIs, Git)",
      "Strong direct project relevance with end-to-end data analytics and telemetry",
      "Demonstrated measurable business impact in previous internship (-85% sync time)",
      "Verified Cloud Practitioner credential and top-tier academic background"
    ],
    skillGaps: ["Docker containerization", "Kubernetes"],
    scoresBreakdown: {
      requiredSkills: 100,
      experience: 90,
      projects: 88,
      education: 82,
    },
    aiReasoning: "The candidate shows an exemplary combination of algorithmic proficiency and applied telemetry ETL engineering. Their projects directly align with our high-volume analytics infrastructure."
  },
  {
    id: "cand-2",
    name: "Devon Chen",
    rank: 2,
    matchScore: 87,
    label: "Strong Fit",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    targetRole: "Analytics Engineer",
    yearsExperience: 2.8,
    education: "B.S. Information Systems",
    requiredSkillsMet: 5,
    requiredSkillsTotal: 5,
    preferredSkillsMet: 3,
    preferredSkillsTotal: 5,
    projectRelevance: 85,
    whyThisCandidate: [
      "Solid PostgreSQL and Snowflake database schema design experience",
      "Demonstrated mastery of dbt transformations and data modeling",
      "Hands-on experience with modern BI dashboards"
    ],
    skillGaps: ["Advanced Python ML", "AWS Lambda event streaming"],
    scoresBreakdown: {
      requiredSkills: 94,
      experience: 86,
      projects: 84,
      education: 80,
    },
    aiReasoning: "Strong database core with practical data warehouse modeling. Slightly less focused on machine learning algorithms compared to Candidate #1."
  },
  {
    id: "cand-3",
    name: "Elena Rostova",
    rank: 3,
    matchScore: 82,
    label: "Strong Fit",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    targetRole: "Business Intelligence Developer",
    yearsExperience: 3.5,
    education: "M.S. Applied Statistics",
    requiredSkillsMet: 4,
    requiredSkillsTotal: 5,
    preferredSkillsMet: 4,
    preferredSkillsTotal: 5,
    projectRelevance: 79,
    whyThisCandidate: [
      "Advanced statistical hypothesis testing and A/B test evaluation",
      "Expert-level Power BI and Tableau visualization delivery",
      "Master's level rigor in quantitative modeling"
    ],
    skillGaps: ["Cloud infrastructure provisioning", "Production Python microservices"],
    scoresBreakdown: {
      requiredSkills: 82,
      experience: 88,
      projects: 78,
      education: 94,
    },
    aiReasoning: "Exceptional analytical and statistical foundation. Better suited for business KPI derivation than raw data engineering pipeline construction."
  },
  {
    id: "cand-4",
    name: "Marcus Vance",
    rank: 4,
    matchScore: 78,
    label: "Borderline Fit",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    targetRole: "Data Analyst",
    yearsExperience: 1.5,
    education: "B.A. Economics",
    requiredSkillsMet: 4,
    requiredSkillsTotal: 5,
    preferredSkillsMet: 2,
    preferredSkillsTotal: 5,
    projectRelevance: 72,
    whyThisCandidate: [
      "Strong econometric modeling background and financial acumen",
      "Proficient in Excel, SQL and basic Python scripting"
    ],
    skillGaps: ["Cloud engineering", "Production ETL", "FastAPI"],
    scoresBreakdown: {
      requiredSkills: 75,
      experience: 70,
      projects: 74,
      education: 78,
    },
    aiReasoning: "Solid foundational aptitude but requires 3-6 months ramp up for cloud-scale pipeline operations."
  }
];

export const mockDuplicatePairs: DuplicatePair[] = [
  {
    id: "dup-1",
    candidateA: {
      name: "Alex Morgan",
      email: "alex.morgan@techpulse.io",
      experience: "Nexus Insights Lab (Data Analytics Intern)",
      education: "California Institute of Technology (2025)",
      file: "Alex_Morgan_Resume_v2.pdf"
    },
    candidateB: {
      name: "Alexander Morgan",
      email: "alexm.caltech@gmail.com",
      experience: "Nexus Insights (Data Intern)",
      education: "CalTech Computer Science (2025)",
      file: "AlexMorgan_CV_2025.pdf"
    },
    similarity: 94,
    reasons: [
      "Exact match on primary phone number (+1 555-438-9201)",
      "96% semantic match across previous employment achievements",
      "Identical educational institution and graduation timeframe",
      "94% cosine similarity on skill vectors and project abstracts"
    ],
    status: "flagged"
  },
  {
    id: "dup-2",
    candidateA: {
      name: "Rahul Sharma",
      email: "rahul.sharma@outlook.com",
      experience: "Infosys - Senior Systems Engineer (3 yrs)",
      education: "B.Tech Computer Science (2021)",
      file: "Rahul_Sharma_Exp.pdf"
    },
    candidateB: {
      name: "Rahul K. Sharma",
      email: "rsharma.work@gmail.com",
      experience: "Infosys Ltd - Systems Engineer (3 yrs)",
      education: "B.E. Computer Engineering (2021)",
      file: "Resume_RahulSharma_Updated.pdf"
    },
    similarity: 91,
    reasons: [
      "Matching LinkedIn profile URL",
      "93% text overlap in project responsibilities",
      "Identical employer and date ranges"
    ],
    status: "flagged"
  }
];

export const mockTalentMetrics: TalentMetrics = {
  totalCandidates: 1284,
  qualified: 342,
  shortlisted: 87,
  interviewReady: 24,
  finalCandidates: 6,
  topSkills: [
    { name: "Python", percentage: 72 },
    { name: "SQL", percentage: 68 },
    { name: "Git & Version Control", percentage: 64 },
    { name: "AWS Cloud Services", percentage: 29 },
    { name: "Docker Containerization", percentage: 26 },
    { name: "Machine Learning (Scikit)", percentage: 38 },
    { name: "Power BI / Tableau", percentage: 41 },
  ],
  experienceDistribution: [
    { range: "< 1 year (Entry)", count: 320, percentage: 25 },
    { range: "1 - 3 years (Junior)", count: 540, percentage: 42 },
    { range: "3 - 5 years (Mid-Level)", count: 280, percentage: 22 },
    { range: "5+ years (Senior)", count: 144, percentage: 11 },
  ],
  aiInsights: [
    "Python is present in 72% of the current talent pool, serving as the dominant language.",
    "Only 29% have verified AWS/Cloud deployment experience — candidates with cloud skills should be prioritized.",
    "18% meet every required criterion for the Senior Data Analyst opening.",
    "Candidate quality score increased by 14% this week following targeted campus drive uploads."
  ]
};

export const mockNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Resume Analysis Completed",
    message: "Your resume was scanned with 98.4% parser fidelity. 18 skills and 2 projects verified.",
    time: "5m ago",
    read: false,
    type: "success"
  },
  {
    id: "notif-2",
    title: "Job Match Surge",
    message: "3 new jobs match your profile at 85%+ compatibility, including Stripe Metrics Co.",
    time: "1h ago",
    read: false,
    type: "job"
  },
  {
    id: "notif-3",
    title: "Recruiter Shortlist Alert",
    message: "A recruiter from Cognitive Vertex AI reviewed your explainable skill report.",
    time: "3h ago",
    read: true,
    type: "info"
  },
  {
    id: "notif-4",
    title: "Candidate Pool Synchronized",
    message: "Recruiter Mode: 1,284 resumes parsed with 94 duplicate candidates identified.",
    time: "Yesterday",
    read: true,
    type: "alert"
  }
];
