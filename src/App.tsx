import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/landing/HeroSection';
import { ResumeScannerInteractive } from './components/landing/ResumeScannerInteractive';
import { ChoosePathSection } from './components/landing/ChoosePathSection';
import { FeatureShowcase } from './components/landing/FeatureShowcase';

// Student / Candidate Views
import { CandidateLayout } from './components/candidate/CandidateLayout';
import { CandidateDashboard } from './components/candidate/CandidateDashboard';
import { ResumeAnalysisView } from './components/candidate/ResumeAnalysisView';
import { CareerReadinessView } from './components/candidate/CareerReadinessView';
import { JobMatchExplorer } from './components/candidate/JobMatchExplorer';
import { SkillGapIntelligence } from './components/candidate/SkillGapIntelligence';
import { CareerRoadmapTimeline } from './components/candidate/CareerRoadmapTimeline';
import { AICareerCoach } from './components/candidate/AICareerCoach';
import { InterviewCoachView } from './components/candidate/InterviewCoachView';
import { CandidateProfileView } from './components/candidate/CandidateProfileView';

// Recruiter Views
import { RecruiterLayout } from './components/recruiter/RecruiterLayout';
import { RecruiterCommandCenter } from './components/recruiter/RecruiterCommandCenter';
import { BulkUploadView } from './components/recruiter/BulkUploadView';
import { AIScreeningView } from './components/recruiter/AIScreeningView';
import { CandidateCompareView } from './components/recruiter/CandidateCompareView';
import { ExplainableAIView } from './components/recruiter/ExplainableAIView';
import { TalentIntelligenceView } from './components/recruiter/TalentIntelligenceView';
import { DuplicateDetectionView } from './components/recruiter/DuplicateDetectionView';
import { JobCreationModal } from './components/recruiter/JobCreationModal';
import { RecruiterSettingsView } from './components/recruiter/RecruiterSettingsView';
import { RecruiterJobRequirementsView } from './components/recruiter/RecruiterJobRequirementsView';
import { RecruiterSmartSearchView } from './components/recruiter/RecruiterSmartSearchView';

// Modals
import { GlobalCommandPalette } from './components/common/GlobalCommandPalette';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingModal } from './components/auth/OnboardingModal';

export const AppContent: React.FC = () => {
  const {
    roleMode,
    candidateTab,
    recruiterTab,
    toastMessage
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-colors duration-300">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Role-Specific View */}
      <div className="flex-1">
        {roleMode === 'landing' && (
          <main className="-mt-16">
            <HeroSection />
            <ResumeScannerInteractive />
            <ChoosePathSection />
            <FeatureShowcase />
            <Footer />
          </main>
        )}

        {roleMode === 'candidate' && (
          <CandidateLayout>
            {candidateTab === 'overview'  && <CandidateDashboard />}
            {candidateTab === 'resume'    && <ResumeAnalysisView />}
            {candidateTab === 'analysis'  && <ResumeAnalysisView />}
            {candidateTab === 'jobs'      && <JobMatchExplorer />}
            {candidateTab === 'readiness' && <CareerReadinessView />}
            {candidateTab === 'gaps'      && <SkillGapIntelligence />}
            {candidateTab === 'roadmap'   && <CareerRoadmapTimeline />}
            {candidateTab === 'coach'     && <AICareerCoach />}
            {candidateTab === 'interview' && <InterviewCoachView />}
            {candidateTab === 'profile'   && <CandidateProfileView />}
          </CandidateLayout>
        )}

        {roleMode === 'recruiter' && (
          <RecruiterLayout>
            {recruiterTab === 'overview'      && <RecruiterCommandCenter />}
            {recruiterTab === 'jobs'          && <RecruiterJobRequirementsView />}
            {recruiterTab === 'upload'        && <BulkUploadView />}
            {recruiterTab === 'search'        && <RecruiterSmartSearchView />}
            {recruiterTab === 'ranking'       && <AIScreeningView />}
            {recruiterTab === 'screening'     && <AIScreeningView />}
            {recruiterTab === 'compare'       && <CandidateCompareView />}
            {recruiterTab === 'explainable'   && <ExplainableAIView />}
            {recruiterTab === 'intelligence'  && <TalentIntelligenceView />}
            {recruiterTab === 'duplicates'    && <DuplicateDetectionView />}
            {recruiterTab === 'settings'      && <RecruiterSettingsView />}
          </RecruiterLayout>
        )}
      </div>

      {/* Global Modals & Drawers */}
      <GlobalCommandPalette />
      <NotificationDrawer />
      <AuthModal />
      <OnboardingModal />
      <JobCreationModal />

      {/* Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 toast-enter">
          <div className="px-5 py-3.5 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl text-xs font-semibold text-white flex items-center gap-3 backdrop-blur-xl max-w-sm">
            <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <span className="leading-snug">{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppContent;
