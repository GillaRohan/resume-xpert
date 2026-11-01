import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  FileText,
  Search,
  Bell,
  User,
  Briefcase,
  Menu,
  X,
  ChevronRight,
  Zap,
  Cpu,
  LogIn,
  Database,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AWSArchitectureModal } from './AWSArchitectureModal';
import { AWSBedrockLabModal } from './AWSBedrockLabModal';
import { DatasetExplorerModal } from './DatasetExplorerModal';

export const Navbar: React.FC = () => {
  const {
    roleMode,
    setRoleMode,
    notifications,
    setIsCommandPaletteOpen,
    setIsNotificationOpen,
    setIsAuthModalOpen,
  } = useApp();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAwsModalOpen, setIsAwsModalOpen] = useState(false);
  const [isBedrockLabOpen, setIsBedrockLabOpen] = useState(false);
  const [isDatasetModalOpen, setIsDatasetModalOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isOnDark = roleMode === 'landing' && !scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled || roleMode !== 'landing'
            ? 'bg-white/95 backdrop-blur-2xl border-b border-slate-200/80 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <button
              onClick={() => setRoleMode('landing')}
              className="flex items-center gap-2.5 group flex-shrink-0"
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className={`absolute inset-0 rounded-xl transition-colors duration-300 ${
                  isOnDark
                    ? 'bg-white/10 group-hover:bg-white/20 border border-white/20'
                    : 'bg-blue-50 group-hover:bg-blue-100 border border-blue-100'
                }`} />
                <FileText className={`relative w-4 h-4 ${isOnDark ? 'text-white' : 'text-blue-600'}`} />
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-sm">
                  <Sparkles className="w-1.5 h-1.5 text-white" />
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className={`font-black text-sm tracking-widest uppercase transition-colors ${
                  isOnDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Resume<span className={isOnDark ? 'text-blue-400' : 'text-blue-600'}>Xpert</span>
                </span>
                <span className={`text-[9px] tracking-[0.25em] uppercase font-mono transition-colors ${
                  isOnDark ? 'text-white/40' : 'text-slate-400'
                }`}>
                  AI Platform
                </span>
              </div>
            </button>

            {/* Center: Mode Switcher (desktop) */}
            <div className={`hidden md:flex items-center gap-1 p-1 rounded-xl transition-all ${
              isOnDark
                ? 'bg-white/[0.08] border border-white/10'
                : 'bg-slate-100 border border-slate-200'
            }`}>
              {[
                { mode: 'landing',    icon: Zap,      label: 'Home' },
                { mode: 'candidate',  icon: User,     label: 'Student Mode' },
                { mode: 'recruiter',  icon: Briefcase, label: 'Recruiter Mode' },
              ].map(({ mode, icon: Icon, label }) => (
                <button
                  key={mode}
                  onClick={() => setRoleMode(mode as any)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
                    roleMode === mode
                      ? mode === 'candidate'
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                        : mode === 'recruiter'
                        ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/30'
                        : isOnDark
                        ? 'bg-white/20 text-white'
                        : 'bg-white text-slate-900 shadow-sm'
                      : isOnDark
                      ? 'text-white/50 hover:text-white hover:bg-white/10'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* AWS GenAI Specs */}
              <button
                onClick={() => setIsAwsModalOpen(true)}
                className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isOnDark
                    ? 'bg-orange-500/15 border border-orange-500/20 text-orange-300 hover:bg-orange-500/25'
                    : 'bg-orange-50 border border-orange-200 text-orange-700 hover:bg-orange-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <Cpu className="w-3.5 h-3.5 text-orange-500" />
                <span>AWS GenAI Live</span>
              </button>

              {/* Bedrock Studio */}
              <button
                onClick={() => setIsBedrockLabOpen(true)}
                className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isOnDark
                    ? 'bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/25'
                    : 'bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Bedrock Studio</span>
              </button>

              {/* Dataset & Backend Data */}
              <button
                onClick={() => setIsDatasetModalOpen(true)}
                className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isOnDark
                    ? 'bg-purple-500/15 border border-purple-500/30 text-purple-300 hover:bg-purple-500/25'
                    : 'bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-100'
                }`}
              >
                <Database className="w-3.5 h-3.5 text-purple-500" />
                <span>Dataset & APIs</span>
              </button>

              {/* Search */}
              <button
                onClick={() => setIsCommandPaletteOpen(true)}
                className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all group ${
                  isOnDark
                    ? 'bg-white/[0.08] border border-white/10 hover:bg-white/15'
                    : 'bg-slate-100 border border-slate-200 hover:bg-slate-200/70'
                }`}
              >
                <Search className={`w-3.5 h-3.5 ${isOnDark ? 'text-white/40 group-hover:text-white/70' : 'text-slate-400 group-hover:text-slate-600'} transition-colors`} />
                <span className={`text-xs font-mono ${isOnDark ? 'text-white/30' : 'text-slate-400'}`}>⌘K</span>
              </button>

              {/* Notifications */}
              <button
                onClick={() => setIsNotificationOpen(true)}
                className={`relative w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                  isOnDark
                    ? 'bg-white/[0.08] border border-white/10 hover:bg-white/15'
                    : 'bg-slate-100 border border-slate-200 hover:bg-slate-200/70'
                }`}
              >
                <Bell className={`w-3.5 h-3.5 ${isOnDark ? 'text-white/60' : 'text-slate-600'}`} />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Sign In */}
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all shadow-sm ${
                  isOnDark
                    ? 'bg-white text-slate-900 hover:bg-white/90'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-blue-500/20'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign In / Demo
              </button>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                  isOnDark
                    ? 'bg-white/[0.08] border border-white/10 text-white'
                    : 'bg-slate-100 border border-slate-200 text-slate-700'
                }`}
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className={`md:hidden border-t backdrop-blur-2xl ${
            roleMode === 'landing'
              ? 'border-white/10 bg-slate-900/95'
              : 'border-slate-200 bg-white/98'
          }`}>
            <div className="px-4 py-4 space-y-2">
              {[
                { mode: 'landing',   icon: Zap,      label: 'Home / Overview' },
                { mode: 'candidate', icon: User,     label: 'Student Workspace' },
                { mode: 'recruiter', icon: Briefcase, label: 'Recruiter Hub' },
              ].map(({ mode, icon: Icon, label }) => (
                <button
                  key={mode}
                  onClick={() => { setRoleMode(mode as any); setMobileOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    roleMode === mode
                      ? mode === 'candidate'
                        ? 'bg-blue-600 text-white'
                        : mode === 'recruiter'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
              <div className="pt-2 border-t border-slate-200/50 space-y-2">
                <button
                  onClick={() => { setIsAuthModalOpen(true); setMobileOpen(false); }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold"
                >
                  Sign In / Demo Mode
                </button>
                <button
                  onClick={() => { setIsAwsModalOpen(true); setMobileOpen(false); }}
                  className="w-full py-2.5 rounded-xl bg-orange-50 border border-orange-100 text-orange-700 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  AWS Architecture
                </button>
                <button
                  onClick={() => { setIsBedrockLabOpen(true); setMobileOpen(false); }}
                  className="w-full py-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Bedrock Studio
                </button>
                <button
                  onClick={() => { setIsDatasetModalOpen(true); setMobileOpen(false); }}
                  className="w-full py-2.5 rounded-xl bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Database className="w-3.5 h-3.5" />
                  Dataset & APIs
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer (only add for non-hero pages) */}
      {roleMode !== 'landing' && <div className="h-16" />}

      {/* AWS Architecture, Bedrock & Dataset Modals */}
      <AWSArchitectureModal isOpen={isAwsModalOpen} onClose={() => setIsAwsModalOpen(false)} />
      <AWSBedrockLabModal isOpen={isBedrockLabOpen} onClose={() => setIsBedrockLabOpen(false)} />
      <DatasetExplorerModal isOpen={isDatasetModalOpen} onClose={() => setIsDatasetModalOpen(false)} />
    </>
  );
};
