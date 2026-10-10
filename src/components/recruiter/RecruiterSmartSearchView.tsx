import React, { useState } from 'react';
import { Search, Filter, Sparkles, User, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RecruiterSmartSearchView: React.FC = () => {
  const { recruiterCandidates, setRecruiterTab } = useApp();
  const [query, setQuery] = useState('');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('All');

  const filtered = recruiterCandidates.filter(c => {
    const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.targetRole.toLowerCase().includes(query.toLowerCase()) ||
      c.aiReasoning.toLowerCase().includes(query.toLowerCase());
    
    if (selectedSkillFilter === 'All') return matchesQuery;
    return matchesQuery && c.whyThisCandidate.some(reason => reason.toLowerCase().includes(selectedSkillFilter.toLowerCase()));
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-emerald-600" />
            Smart Candidate Search & Semantic Query
          </h1>
          <p className="text-xs text-zinc-500">Perform natural language search across candidate Skill DNA and vector embeddings.</p>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-zinc-300 shadow-sm focus-within:border-emerald-500">
          <Search className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search candidates by skills (e.g. Python, AWS, SQL), experience, or university..."
            className="flex-1 bg-transparent text-xs text-zinc-900 focus:outline-none placeholder-zinc-400"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-xs font-semibold text-zinc-400 hover:text-zinc-600">
              Clear
            </button>
          )}
        </div>

        {/* Filter Tags */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1">
          <span className="text-[10px] font-bold text-zinc-400 font-mono uppercase">Quick Filters:</span>
          {['All', 'Python', 'SQL', 'AWS', 'Machine Learning', 'Tableau'].map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedSkillFilter(tag)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedSkillFilter === tag
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-500 font-mono">Found {filtered.length} Candidate Profiles</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(c => (
            <div key={c.id} className="p-5 rounded-2xl bg-white border border-zinc-200 space-y-4 hover:border-emerald-300 transition-all shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-900">{c.name}</h3>
                    <p className="text-[10px] text-zinc-500">{c.targetRole} • {c.yearsExperience} yrs exp</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-emerald-600">{c.matchScore}%</div>
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {c.label}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-zinc-100">
                <div className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Extracted Match Highlights</div>
                <ul className="text-[11px] text-zinc-600 space-y-1">
                  {c.whyThisCandidate.slice(0, 2).map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-400">Explicit Evidence Verified</span>
                <button
                  onClick={() => setRecruiterTab('ranking')}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                >
                  View Candidate Profile
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
