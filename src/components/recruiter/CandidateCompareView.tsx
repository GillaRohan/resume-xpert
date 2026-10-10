import React from 'react';
import { 
  Users, 
  Trophy, 
  CheckCircle2, 
  Code2,
  Briefcase,
  Layers,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CandidateCompareView: React.FC = () => {
  const { recruiterCandidates, setRecruiterTab, showToast } = useApp();

  const candidates = recruiterCandidates.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            Candidate Benchmark Comparison Matrix
          </h1>
          <p className="text-xs text-slate-500">Side-by-side evaluation matrix across required skills, experience, project relevance, and education.</p>
        </div>

        <button
          onClick={() => setRecruiterTab('ranking')}
          className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all"
        >
          Return to Candidate Ranking
        </button>
      </div>

      {/* 3-Candidate Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {candidates.map((cand, idx) => {
          const isWinner = idx === 0;

          return (
            <div
              key={cand.id}
              className={`p-6 rounded-2xl border transition-all space-y-4 flex flex-col justify-between ${
                isWinner
                  ? 'bg-emerald-50/50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="space-y-4">
                {isWinner && (
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-mono font-bold uppercase">
                    <Trophy className="w-3 h-3 text-white" />
                    Overall Leader
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <img
                    src={cand.avatar}
                    alt={cand.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400">RANK #{cand.rank}</span>
                    <h3 className="text-sm font-bold text-slate-900">{cand.name}</h3>
                    <p className="text-[11px] text-slate-500">{cand.targetRole}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-500 uppercase">Match Score</span>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-emerald-600 font-mono">{cand.matchScore}%</span>
                    <span className="text-[9px] text-slate-400 font-mono uppercase block">{cand.label}</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs pt-2 border-t border-slate-100">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Skills Met</span>
                    <p className="font-bold text-slate-900 mt-0.5">{cand.requiredSkillsMet} / {cand.requiredSkillsTotal} Required</p>
                    <span className="text-[10px] text-slate-500">{cand.preferredSkillsMet} Preferred Met</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Experience</span>
                    <p className="font-bold text-slate-900 mt-0.5">{cand.yearsExperience} Years Industry</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Project Alignment</span>
                    <p className="font-bold text-slate-900 mt-0.5">{cand.projectRelevance}% Direct Overlap</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                    <span className="text-[10px] font-bold text-amber-800 font-mono uppercase block">Missing Skills</span>
                    <p className="font-semibold text-amber-900 text-[11px] mt-0.5">{cand.skillGaps.join(', ')}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => showToast(`Shortlisted candidate ${cand.name}!`)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                  isWinner
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Shortlist Candidate #{cand.rank}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
