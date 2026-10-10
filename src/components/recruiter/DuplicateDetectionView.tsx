import React, { useState } from 'react';
import { 
  CopyCheck, 
  CheckCircle2, 
  Merge, 
  X, 
  Eye, 
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockDuplicatePairs } from '../../data/mockData';
import { DuplicatePair } from '../../types';

export const DuplicateDetectionView: React.FC = () => {
  const [duplicateList, setDuplicateList] = useState<DuplicatePair[]>(mockDuplicatePairs);
  const { showToast } = useApp();

  const handleMerge = (id: string, name: string) => {
    setDuplicateList(prev => prev.map(d => d.id === id ? { ...d, status: 'merged' } : d));
    showToast(`Merged duplicate profile history for ${name}!`);
  };

  const handleIgnore = (id: string) => {
    setDuplicateList(prev => prev.map(d => d.id === id ? { ...d, status: 'ignored' } : d));
    showToast('Duplicate alert ignored for this candidate pair.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CopyCheck className="w-5 h-5 text-emerald-600" />
            Duplicate Candidate Detection & Consolidation
          </h1>
          <p className="text-xs text-slate-500">Identifies candidate re-submissions, alternative email identities, and duplicate ATS records via vector fingerprinting.</p>
        </div>

        <span className="text-xs font-mono text-slate-500">2 Active Flagged Pairs</span>
      </div>

      {/* Duplicate Pairs */}
      <div className="space-y-4">
        {duplicateList.map((pair) => {
          const isResolved = pair.status !== 'flagged';

          return (
            <div
              key={pair.id}
              className={`p-6 rounded-2xl border transition-all space-y-4 ${
                isResolved ? 'bg-slate-50 border-slate-200 opacity-70' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">Pair #{pair.id}</span>
                  {isResolved && (
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-200 text-slate-700 uppercase">
                      {pair.status}
                    </span>
                  )}
                </div>
                <div className="text-right font-mono">
                  <span className="text-base font-extrabold text-emerald-600">{pair.similarity}%</span>
                  <span className="text-[10px] text-slate-400 uppercase block">Vector Similarity</span>
                </div>
              </div>

              {/* Side-by-Side Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">RECORD A</span>
                  <div className="font-bold text-slate-900">{pair.candidateA.name}</div>
                  <div className="text-slate-500">{pair.candidateA.email}</div>
                  <div className="text-slate-500">{pair.candidateA.experience} • {pair.candidateA.education}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">RECORD B</span>
                  <div className="font-bold text-slate-900">{pair.candidateB.name}</div>
                  <div className="text-slate-500">{pair.candidateB.email}</div>
                  <div className="text-slate-500">{pair.candidateB.experience} • {pair.candidateB.education}</div>
                </div>
              </div>

              {/* AI Reasons */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono block">Detection Rationale:</span>
                <ul className="text-slate-700 space-y-0.5">
                  {pair.reasons.map((r, rIdx) => (
                    <li key={rIdx} className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              {!isResolved && (
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => handleIgnore(pair.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-all"
                  >
                    Ignore Alert
                  </button>
                  <button
                    onClick={() => handleMerge(pair.id, pair.candidateA.name)}
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Merge className="w-3.5 h-3.5" />
                    <span>Merge Profiles</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
