export type RoleMode = 'candidate' | 'recruiter' | 'landing';

export type CandidateTab = 
  | 'overview' 
  | 'resume' 
  | 'analysis' 
  | 'jobs' 
  | 'readiness' 
  | 'gaps' 
  | 'roadmap' 
  | 'coach' 
  | 'interview'
  | 'profile';

export type RecruiterTab = 
  | 'overview' 
  | 'jobs'
  | 'upload' 
  | 'search'
  | 'ranking'
  | 'screening' 
  | 'compare' 
  | 'explainable' 
  | 'intelligence' 
  | 'duplicates'
  | 'settings';

export interface SkillItem {
  name: string;
  category: 'core' | 'framework' | 'cloud' | 'data' | 'soft';
  level: number; // 0-100
  years: number;
  strength: 'high' | 'medium' | 'emerging';
}

export interface SkillGapItem {
  id: string;
  name: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  estimatedWeeks: number;
  category: string;
  targetRole: string;
  recommendedCourse: string;
  recommendedProject: string;
  recommendedCert: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface JobMatchItem {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  matchScore: number;
  matchTag: 'PERFECT FIT' | 'STRONG MATCH' | 'GOOD POTENTIAL';
  skillsComparison: {
    matched: string[];
    partial: string[];
    missing: string[];
  };
  aiExplanation: string;
  postedAgo: string;
}

export interface RoadmapMilestone {
  period: '30 DAYS' | '60 DAYS' | '90 DAYS' | '6 MONTHS';
  title: string;
  phase: string;
  duration: string;
  status: 'completed' | 'current' | 'upcoming';
  items: {
    task: string;
    type: 'learn' | 'project' | 'cert' | 'apply';
    impact: string;
  }[];
}

export interface CandidateProfile {
  name: string;
  headline: string;
  email: string;
  location: string;
  phone: string;
  avatar: string;
  careerReadiness: number;
  provenanceQuote?: string;
  provenanceLine?: number;
  scores: {
    resumeHealth: number;
    jobCompatibility: number;
    skillStrength: number;
    profileCompleteness: number;
  };
  dimensions: {
    technicalSkills: number;
    experience: number;
    projects: number;
    education: number;
    certifications: number;
  };
  actionableSteps: {
    id: number;
    title: string;
    impact: string;
    category: string;
    completed: boolean;
  }[];
  skills: SkillItem[];
  experience: {
    title: string;
    company: string;
    period: string;
    bullets: string[];
  }[];
  projects: {
    name: string;
    tech: string[];
    description: string;
    impact: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
    score: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    year: string;
  }[];
}

export interface RecruiterCandidate {
  id: string;
  name: string;
  rank: number;
  matchScore: number;
  label: 'Excellent Match' | 'Strong Fit' | 'Borderline Fit' | 'Review Required';
  avatar: string;
  targetRole: string;
  yearsExperience: number;
  education: string;
  requiredSkillsMet: number; // e.g. 5
  requiredSkillsTotal: number; // e.g. 5
  preferredSkillsMet: number;
  preferredSkillsTotal: number;
  projectRelevance: number;
  whyThisCandidate: string[];
  skillGaps: string[];
  scoresBreakdown: {
    requiredSkills: number;
    experience: number;
    projects: number;
    education: number;
  };
  aiReasoning: string;
  similarityGroup?: string;
}

export interface DuplicatePair {
  id: string;
  candidateA: {
    name: string;
    email: string;
    experience: string;
    education: string;
    file: string;
  };
  candidateB: {
    name: string;
    email: string;
    experience: string;
    education: string;
    file: string;
  };
  similarity: number;
  reasons: string[];
  status: 'flagged' | 'merged' | 'ignored';
}

export interface TalentMetrics {
  totalCandidates: number;
  qualified: number;
  shortlisted: number;
  interviewReady: number;
  finalCandidates: number;
  topSkills: { name: string; percentage: number }[];
  experienceDistribution: { range: string; count: number; percentage: number }[];
  aiInsights: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'alert' | 'job';
}
