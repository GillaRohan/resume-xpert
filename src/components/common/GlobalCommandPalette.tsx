import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  ArrowRight,
  Command,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GlobalCommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    setRoleMode,
    setCandidateTab,
    setRecruiterTab,
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCommandPaletteOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const quickActions = [
    {
      category: 'Candidates',
      items: [
        { title: 'Alex Morgan — Data Analyst (92% Match)', action: () => { setRoleMode('recruiter'); setRecruiterTab('screening'); setIsCommandPaletteOpen(false); } },
        { title: 'Devon Chen — Analytics Engineer (87% Match)', action: () => { setRoleMode('recruiter'); setRecruiterTab('screening'); setIsCommandPaletteOpen(false); } },
        { title: 'Elena Rostova — BI Developer (82% Match)', action: () => { setRoleMode('recruiter'); setRecruiterTab('screening'); setIsCommandPaletteOpen(false); } },
      ],
    },
    {
      category: 'Job Requisitions',
      items: [
        { title: 'Data Analyst — Product & Growth', action: () => { setRoleMode('candidate'); setCandidateTab('jobs'); setIsCommandPaletteOpen(false); } },
        { title: 'Associate AI & ML Engineer', action: () => { setRoleMode('candidate'); setCandidateTab('jobs'); setIsCommandPaletteOpen(false); } },
      ],
    },
    {
      category: 'AI Tools',
      items: [
        { title: 'Open Skill DNA & Resume Parser', action: () => { setRoleMode('candidate'); setCandidateTab('analysis'); setIsCommandPaletteOpen(false); } },
        { title: 'Review Explainable AI (SHAP Weights)', action: () => { setRoleMode('recruiter'); setRecruiterTab('explainable'); setIsCommandPaletteOpen(false); } },
        { title: 'Practice Mock Interview', action: () => { setRoleMode('candidate'); setCandidateTab('interview'); setIsCommandPaletteOpen(false); } },
      ],
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) setIsCommandPaletteOpen(false); }}
    >
      <div className="w-full max-w-xl rounded-2xl bg-white border border-black/[0.12] shadow-2xl shadow-black/20 overflow-hidden">

        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-black/[0.08]">
          <Search className="w-4 h-4 text-black/40 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search candidates, jobs, skills, modules..."
            className="flex-1 bg-transparent text-sm text-black placeholder-black/30 focus:outline-none font-mono"
          />
          <div className="flex items-center gap-1.5">
            <kbd className="text-[9px] font-mono bg-black/[0.06] text-black/40 px-1.5 py-0.5 rounded border border-black/[0.08]">ESC</kbd>
            <button onClick={() => setIsCommandPaletteOpen(false)} className="p-1 rounded hover:bg-black/[0.06] transition-colors">
              <X className="w-3.5 h-3.5 text-black/40" />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {query.trim() && (
            <div className="px-3 py-2 rounded-xl bg-black/[0.04] border border-black/[0.07] text-[10px] font-mono text-black/50">
              ⚡ Showing results for "{query}" across 1,284 records and 18 open roles.
            </div>
          )}
          {quickActions.map((sec) => {
            const filtered = sec.items.filter(it =>
              it.title.toLowerCase().includes(query.toLowerCase())
            );
            if (!filtered.length) return null;
            return (
              <div key={sec.category} className="space-y-0.5">
                <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-black/35 block px-3 py-1">
                  {sec.category}
                </span>
                {filtered.map((item, i) => (
                  <button
                    key={i}
                    onClick={item.action}
                    className="w-full px-3 py-2.5 rounded-xl text-left hover:bg-black/[0.05] flex items-center justify-between text-xs text-black/70 hover:text-black group transition-all duration-150"
                  >
                    <span>{item.title}</span>
                    <ArrowRight className="w-3 h-3 text-black/30 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-zinc-50 border-t border-black/[0.06] flex items-center justify-between">
          <span className="text-[9px] text-black/40 font-mono">Global AI Search</span>
          <div className="flex items-center gap-1">
            <Command className="w-2.5 h-2.5 text-black/40" />
            <span className="text-[9px] text-black/40 font-mono">K</span>
          </div>
        </div>
      </div>
    </div>
  );
};
