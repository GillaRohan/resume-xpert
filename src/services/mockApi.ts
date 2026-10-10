/**
 * Mock API services for Resume Xpert
 * Provides realistic async simulated processing for presentation and production readiness.
 * Clear separation for easy backend integration (FastAPI / NLP / Embeddings / Python backend).
 */

import { 
  CandidateProfile, 
  JobMatchItem, 
  RecruiterCandidate, 
  SkillGapItem, 
  RoadmapMilestone, 
  DuplicatePair,
  TalentMetrics 
} from '../types';
import { 
  initialCandidateProfile, 
  mockJobMatches, 
  mockSkillGaps, 
  mockRoadmap, 
  mockRecruiterCandidates, 
  mockDuplicatePairs, 
  mockTalentMetrics 
} from '../data/mockData';

// Simulated latency helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApiService = {
  /**
   * Simulates full resume parsing & NER extraction pipeline
   */
  async analyzeResume(file?: File): Promise<{
    profile: CandidateProfile;
    metrics: { parsingConfidence: number; extractedEntities: number; timeSec: number };
  }> {
    await delay(1200);
    return {
      profile: initialCandidateProfile,
      metrics: {
        parsingConfidence: 98.4,
        extractedEntities: 34,
        timeSec: 1.18,
      }
    };
  },

  /**
   * Simulates extracting skill DNA taxonomy with semantic strengths
   */
  async extractSkills(resumeText: string): Promise<CandidateProfile['skills']> {
    await delay(800);
    return initialCandidateProfile.skills;
  },

  /**
   * Calculates vector cosine similarity & semantic fit between candidate profile and a target job
   */
  async matchJob(candidateId: string, jobId?: string): Promise<JobMatchItem[]> {
    await delay(900);
    return mockJobMatches;
  },

  /**
   * Computes holistic Career Readiness index across 5 dimensions
   */
  async calculateReadiness(profile: CandidateProfile): Promise<{
    overallScore: number;
    dimensions: CandidateProfile['dimensions'];
    actionSteps: CandidateProfile['actionableSteps'];
  }> {
    await delay(700);
    return {
      overallScore: profile.careerReadiness,
      dimensions: profile.dimensions,
      actionSteps: profile.actionableSteps,
    };
  },

  /**
   * Generates customized 30/60/90-day actionable roadmap
   */
  async generateRoadmap(role: string): Promise<RoadmapMilestone[]> {
    await delay(1000);
    return mockRoadmap;
  },

  /**
   * Recruiter bulk screening simulator
   */
  async screenCandidates(jobRequirement: string): Promise<RecruiterCandidate[]> {
    await delay(1400);
    return mockRecruiterCandidates;
  },

  /**
   * Ranks candidates with explainable AI feature weights
   */
  async rankCandidates(candidates: RecruiterCandidate[]): Promise<RecruiterCandidate[]> {
    await delay(800);
    return [...candidates].sort((a, b) => b.matchScore - a.matchScore);
  },

  /**
   * Compares 2-3 candidates side by side
   */
  async compareCandidates(ids: string[]): Promise<RecruiterCandidate[]> {
    await delay(600);
    return mockRecruiterCandidates.filter(c => ids.includes(c.id));
  },

  /**
   * Scans talent pool for cross-resume duplicates & near-duplicates
   */
  async detectDuplicates(): Promise<DuplicatePair[]> {
    await delay(1100);
    return mockDuplicatePairs;
  },

  /**
   * Generates macro talent pool intelligence and distributions
   */
  async generateInsights(): Promise<TalentMetrics> {
    await delay(900);
    return mockTalentMetrics;
  },

  /**
   * Dynamic interview prep questions based on profile & skills
   */
  async generateInterviewQuestions(category: 'technical' | 'hr' | 'behavioral' | 'project'): Promise<{
    question: string;
    context: string;
    suggestedFocus: string[];
    sampleAnswerFramework: string;
  }[]> {
    await delay(800);
    const questionsDatabase = {
      technical: [
        {
          question: "How did you optimize your SQL queries to reduce latency from 420ms down to 110ms at Kinetix?",
          context: "Drawn from Experience: Junior Software Developer Apprentice",
          suggestedFocus: ["Indexing strategies (B-Tree vs Hash)", "Query execution plans (EXPLAIN ANALYZE)", "Eliminating N+1 queries"],
          sampleAnswerFramework: "Start with the bottleneck discovery via database logs, explain the index restructure and CTE rewrite, and end with the verified 73% latency reduction."
        },
        {
          question: "Explain the architecture of your AWS S3 to Lambda automated ingestion pipeline.",
          context: "Drawn from Experience: Nexus Insights Lab",
          suggestedFocus: ["S3 Event Notifications", "Lambda concurrency limits & IAM roles", "Error handling with DLQ (Dead Letter Queue)"],
          sampleAnswerFramework: "Detail the event-driven trigger, payload extraction, micro-batching, and safe upsert to PostgreSQL."
        }
      ],
      hr: [
        {
          question: "Why are you targeting Data Analyst & AI Pipeline roles right now?",
          context: "Drawn from Career Trajectory",
          suggestedFocus: ["Passion for high-impact metric derivation", "Desire to bridge raw telemetry with business revenue outcomes"],
          sampleAnswerFramework: "Highlight your academic training coupled with internship telemetry systems."
        }
      ],
      behavioral: [
        {
          question: "Describe a situation where unexpected data anomalies threatened a reporting deadline.",
          context: "STAR Method Evaluation",
          suggestedFocus: ["Situation with corrupted CSV feeds", "Action taken to validate schemas with Pydantic", "Result of 100% data integrity"],
          sampleAnswerFramework: "Emphasize composure, automated validation checks, and stakeholder transparency."
        }
      ],
      project: [
        {
          question: "Walk us through how your AI Resume Analyzer extracts and compares skill vectors.",
          context: "Drawn from Project: AI Resume & Career Fit Analyzer",
          suggestedFocus: ["Vector embeddings cosine similarity", "Handling synonyms (e.g. AWS vs Amazon Web Services)", "FastAPI performance"],
          sampleAnswerFramework: "Explain the tokenizer, vector embedding generation, high-dimensional vector search, and explainable score normalization."
        }
      ]
    };

    return questionsDatabase[category] || questionsDatabase.technical;
  },

  /**
   * Generates AI Job Description with structured fields
   */
  async generateJobDescription(roleTitle: string): Promise<{
    title: string;
    department: string;
    experience: string;
    salary: string;
    requiredSkills: string[];
    preferredSkills: string[];
    responsibilities: string[];
  }> {
    await delay(1200);
    return {
      title: roleTitle || "Senior Data & Intelligence Engineer",
      department: "Data Platform & AI",
      experience: "2 - 4 years",
      salary: "$125,000 - $155,000 + Equity",
      requiredSkills: ["Python (Pandas, Polars)", "SQL & Data Warehousing", "AWS Cloud Architecture", "CI/CD & Docker"],
      preferredSkills: ["FastAPI Microservices", "OpenAI / HuggingFace Embeddings", "Snowflake / BigQuery", "Kubernetes"],
      responsibilities: [
        "Architect and maintain mission-critical ingestion pipelines processing multi-gigabyte streaming feeds.",
        "Collaborate with Machine Learning researchers to integrate vector similarity scoring into production endpoints.",
        "Author clear technical design documents, telemetry dashboards, and unit/integration test suites."
      ]
    };
  }
};
