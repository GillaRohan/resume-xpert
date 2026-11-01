/**
 * Resume Xpert API service adapter
 * Seamlessly interfaces frontend components with the FastAPI AWS Generative AI backend,
 * while maintaining graceful offline resilience.
 */

import { apiService } from './api';
import { 
  CandidateProfile, 
  JobMatchItem, 
  RecruiterCandidate, 
  RoadmapMilestone, 
  DuplicatePair,
  TalentMetrics 
} from '../types';

export const mockApiService = {
  analyzeResume: (file?: File) => {
    if (file) {
      return apiService.analyzeResume(file);
    }
    // Return default analysis with dummy file
    return apiService.analyzeResume(new File(["Sample Resume"], "Alex_Morgan_Resume.pdf", { type: "application/pdf" }));
  },

  extractSkills: async (resumeText: string) => {
    const res = await apiService.analyzeResume(new File([resumeText], "resume.txt", { type: "text/plain" }));
    return res.profile.skills;
  },

  matchJob: (candidateId: string, jobId?: string) => {
    return apiService.matchJobs();
  },

  calculateReadiness: async (profile: CandidateProfile) => {
    return {
      overallScore: profile.careerReadiness,
      dimensions: profile.dimensions,
      actionSteps: profile.actionableSteps,
    };
  },

  generateRoadmap: (role: string) => {
    return apiService.generateRoadmap(role);
  },

  screenCandidates: (jobRequirement: string) => {
    return apiService.bulkScreenResumes(undefined, jobRequirement).then(res => res.candidates);
  },

  rankCandidates: async (candidates: RecruiterCandidate[]) => {
    return [...candidates].sort((a, b) => b.matchScore - a.matchScore);
  },

  compareCandidates: (ids: string[]) => {
    return apiService.compareCandidates(ids);
  },

  detectDuplicates: () => {
    return apiService.getDuplicates();
  },

  generateInsights: () => {
    return apiService.getTalentMetrics();
  },

  generateInterviewQuestions: (category: 'technical' | 'hr' | 'behavioral' | 'project') => {
    return apiService.getInterviewQuestions(category);
  },

  generateJobDescription: (roleTitle: string) => {
    return apiService.generateJobDescription(roleTitle);
  }
};
