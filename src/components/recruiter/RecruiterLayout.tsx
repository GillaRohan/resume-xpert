import React from 'react';
import {
  LayoutDashboard,
  Briefcase,
  UploadCloud,
  Search,
  Users,
  GitCompare,
  BarChart3,
  Sliders,
  PlusCircle,
  ArrowLeft,
  ShieldCheck,
  Cpu,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RecruiterTab } from '../../types';

interface RecruiterLayoutProps {
  children: React.ReactNode;
}

export const RecruiterLayout: React.FC<RecruiterLayoutProps> = ({ children }) => {
  const { recruiterTab, setRecruiterTab, setRoleMode, setIsJobCreateOpen } = useApp();

  const navItems: { id: RecruiterTab; label: string; icon: any; badge?: string; badgeColor?: string }[] = [
    { id: 'overview',     label: 'Recruitment Overview',  icon: LayoutDashboard },
    { id: 'jobs',         label: 'Job Requirements',      icon: Briefcase,    badge: '4 Active',  badgeColor: 'bg-emerald-100 text-emerald-700' },
    { id: 'upload',       label: 'Bulk Resume Upload',    icon: UploadCloud,  badge: '1,284',     badgeColor: 'bg-blue-100 text-blue-700' },
    { id: 'search',       label: 'Smart Search',          icon: Search },
    { id: 'ranking',      label: 'Candidate Ranking',     icon: Users,        badge: '342',       badgeColor: 'bg-violet-100 text-violet-700' },
    { id: 'compare',      label: 'Compare & Shortlist',   icon: GitCompare,   badge: 'Top 3',     badgeColor: 'bg-amber-100 text-amber-700' },
    { id: 'explainable',  label: 'Explainable AI',        icon: Zap },
    { id: 'intelligence', label: 'Talent Insights',       icon: BarChart3 },
    { id: 'duplicates',   label: 'Duplicate Detection',   icon: ShieldCheck },
    { id: 'settings',     label: 'Settings',              icon: Sliders },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-0 bg-slate-50 text-slate-900 flex">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 bg-white sticky top-16 h-[calc(100vh-4rem)] justify-between z-30 shadow-sm">

        <div className="flex flex-col h-full overflow-hidden">
          {/* Recruiter Identity Banner */}
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-black flex items-center justify-center text-xs flex-shrink-0 shadow-lg shadow-emerald-500/20">
                HQ
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-white" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-900 truncate">Talent Acquisition</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-[9px] font-bold text-emerald-700 font-mono uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Recruiter Workspace
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Post Job Quick Action */}
          <div className="p-3 border-b border-slate-100 bg-gradient-to-r from-emerald-50/60 to-slate-50">
            <button
              onClick={() => setIsJobCreateOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs font-bold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-sm shadow-emerald-500/20"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Post New Job Profile
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto scroll-area">
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] font-mono px-3 py-2">
              Recruiter Modules
            </div>
            {navItems.map(({ id, label, icon: Icon, badge, badgeColor }) => {
              const isActive = recruiterTab === id || (id === 'ranking' && recruiterTab === 'screening');
              return (
                <button
                  key={id}
                  onClick={() => setRecruiterTab(id)}
                  className={`sidebar-item w-full flex items-center justify-between px-3 py-2.5 text-left transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold shadow-sm shadow-emerald-500/20'
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
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-700 font-semibold">
                <Cpu className="w-3 h-3 text-orange-500" />
                <span>Bedrock Screening Engine</span>
              </div>
              <div className="flex items-center gap-1 text-[9px] font-mono text-slate-400">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span>Human-in-the-Loop Active</span>
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
            const isActive = recruiterTab === id || (id === 'ranking' && recruiterTab === 'screening');
            return (
              <button
                key={id}
                onClick={() => setRecruiterTab(id)}
                className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl transition-all min-w-0 ${
                  isActive
                    ? 'text-emerald-600'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-emerald-50' : ''}`}>
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
