import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  RoleMode, 
  CandidateTab, 
  RecruiterTab, 
  CandidateProfile, 
  RecruiterCandidate, 
  NotificationItem, 
  JobMatchItem, 
  SkillGapItem 
} from '../types';
import { 
  initialCandidateProfile, 
  mockRecruiterCandidates, 
  mockNotifications, 
  mockJobMatches, 
  mockSkillGaps 
} from '../data/mockData';

interface AppContextType {
  roleMode: RoleMode;
  setRoleMode: (mode: RoleMode) => void;
  candidateTab: CandidateTab;
  setCandidateTab: (tab: CandidateTab) => void;
  recruiterTab: RecruiterTab;
  setRecruiterTab: (tab: RecruiterTab) => void;
  
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Modals & Panels
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'signup';
  setAuthMode: (mode: 'login' | 'signup') => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  isJobCreateOpen: boolean;
  setIsJobCreateOpen: (open: boolean) => void;

  // Data & State
  profile: CandidateProfile;
  setProfile: React.Dispatch<React.SetStateAction<CandidateProfile>>;
  recruiterCandidates: RecruiterCandidate[];
  setRecruiterCandidates: React.Dispatch<React.SetStateAction<RecruiterCandidate[]>>;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  jobMatches: JobMatchItem[];
  setJobMatches: React.Dispatch<React.SetStateAction<JobMatchItem[]>>;
  skillGaps: SkillGapItem[];
  closeSkillGap: (id: string) => void;
  toggleActionStep: (id: number) => void;

  // Active notification toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roleMode, setRoleMode] = useState<RoleMode>('landing');
  const [candidateTab, setCandidateTab] = useState<CandidateTab>('overview');
  const [recruiterTab, setRecruiterTab] = useState<RecruiterTab>('overview');
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') !== 'light';
  });

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isJobCreateOpen, setIsJobCreateOpen] = useState(false);

  const [profile, setProfile] = useState<CandidateProfile>(initialCandidateProfile);
  const [recruiterCandidates, setRecruiterCandidates] = useState<RecruiterCandidate[]>(mockRecruiterCandidates);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [jobMatches, setJobMatches] = useState<JobMatchItem[]>(mockJobMatches);
  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>(mockSkillGaps);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync dark mode with document root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Global keyboard shortcuts (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const closeSkillGap = (id: string) => {
    setSkillGaps(prev => prev.map(g => g.id === id ? { ...g, status: 'completed' } : g));
    setProfile(prev => ({
      ...prev,
      careerReadiness: Math.min(100, prev.careerReadiness + 3),
      scores: {
        ...prev.scores,
        skillStrength: Math.min(100, prev.scores.skillStrength + 2),
      }
    }));
    showToast("Skill gap marked as in-progress! Readiness score boosted +3.");
  };

  const toggleActionStep = (id: number) => {
    setProfile(prev => {
      const updated = prev.actionableSteps.map(step => 
        step.id === id ? { ...step, completed: !step.completed } : step
      );
      const newlyCompleted = updated.find(s => s.id === id)?.completed;
      const scoreDelta = newlyCompleted ? 3 : -3;
      return {
        ...prev,
        careerReadiness: Math.max(0, Math.min(100, prev.careerReadiness + scoreDelta)),
        actionableSteps: updated
      };
    });
    showToast("Readiness target updated!");
  };

  return (
    <AppContext.Provider
      value={{
        roleMode,
        setRoleMode,
        candidateTab,
        setCandidateTab,
        recruiterTab,
        setRecruiterTab,
        isDarkMode,
        toggleDarkMode,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isNotificationOpen,
        setIsNotificationOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        isOnboardingOpen,
        setIsOnboardingOpen,
        isJobCreateOpen,
        setIsJobCreateOpen,
        profile,
        setProfile,
        recruiterCandidates,
        setRecruiterCandidates,
        notifications,
        markNotificationAsRead,
        jobMatches,
        setJobMatches,
        skillGaps,
        closeSkillGap,
        toggleActionStep,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
