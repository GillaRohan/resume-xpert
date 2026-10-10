import React from 'react';
import {
  LayoutDashboard,
  FileText,
  Target,
  Zap,
  Compass,
  MessageSquare,
  User,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Cpu,
  BrainCircuit,
  Activity,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CandidateTab } from '../../types';

interface CandidateLayoutProps {
  children: React.ReactNode;
}

export const CandidateLayout: React.FC<CandidateLayoutProps> = ({ children }) => {
  const { candidateTab, setCandidateTab, setRoleMode, profile } = useApp();

  const navItems: { id: CandidateTab; label: string; icon: any; badge?: string; badgeColor?: string }[] = [
    { id: 'overview',  label: 'Overview',             icon: LayoutDashboard },
    { id: 'resume',    label: 'Resume Analyzer',      icon: FileText,       badge: '87%',    badgeColor: 'bg-blue-100 text-blue-700' },
    { id: 'jobs',      label: 'Career & Job Matcher', icon: Target,         badge: '92%',    badgeColor: 'bg-indigo-100 text-indigo-700' },
    { id: 'gaps',      label: 'Skill Gap Analysis',   icon: Zap,            badge: '3 Gaps', badgeColor: 'bg-amber-100 text-amber-700' },
    { id: 'roadmap',   label: 'AI Learning Roadmap',  icon: Compass },
    { id: 'coach',     label: 'AI Career Coach',      icon: MessageSquare },
    { id: 'interview', label: 'Interview Coach',       icon: BrainCircuit },
    { id: 'readiness', label: 'Career Readiness',     icon: Activity },
    { id: 'profile',   label: 'My Profile & Settings', icon: User },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0 bg-slate-50 text-slate-900 flex">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 bg-white sticky top-16 h-[calc(100vh-4rem)] justify-between z-30 shadow-sm">

        <div className="flex flex-col h-full overflow-hidden">
          {/* Student Identity Banner */}
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold flex items-center justify-center text-sm flex-shrink-0 shadow-lg shadow-blue-500/20">
                {profile.name.charAt(0)}
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-white" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-900 truncate">{profile.name}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-[9px] font-bold text-blue-700 font-mono uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    Student Workspace
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-blue-50/60 to-slate-50">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-xs font-extrabold text-blue-600 font-mono">{profile.careerReadiness}<span className="text-[9px] text-slate-400">/100</span></div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">Readiness</div>
              </div>
              <div className="text-center">
                <div className="text-xs font-extrabold text-indigo-600 font-mono">92%</div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">Top Match</div>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto scroll-area">
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] font-mono px-3 py-2">
              Student Modules
            </div>
            {navItems.map(({ id, label, icon: Icon, badge, badgeColor }) => {
              const isActive = candidateTab === id || (id === 'resume' && candidateTab === 'analysis');
              return (
                <button
                  key={id}
                  onClick={() => setCandidateTab(id)}
                  className={`sidebar-item w-full flex items-center justify-between px-3 py-2.5 text-left transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold shadow-sm shadow-blue-500/20'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="text-xs">{label}</span>
                  </div>
                  {badge && (
                    <span className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : badgeColor
                    }`}>
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer info */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/80 space-y-3">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-blue-700 font-semibold">
                <Cpu className="w-3 h-3 text-orange-500" />
                <span>AWS Bedrock Engine</span>
              </div>
              <div className="flex items-center gap-1 text-[9px] font-mono text-slate-400">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>Guardrails Active · Demo Mode</span>
              </div>
            </div>
            <button
              onClick={() => setRoleMode('landing')}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-all text-xs font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-1 py-2 shadow-lg">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 5).map(({ id, label, icon: Icon }) => {
            const isActive = candidateTab === id || (id === 'resume' && candidateTab === 'analysis');
            return (
              <button
                key={id}
                onClick={() => setCandidateTab(id)}
                className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl transition-all min-w-0 ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-blue-50' : ''}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[8px] font-bold truncate max-w-[48px]">{label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
