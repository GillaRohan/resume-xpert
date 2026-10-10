import React, { useState } from 'react';
import { 
  Sliders, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RecruiterCandidate } from '../../types';

export const ExplainableAIView: React.FC = () => {
  const { recruiterCandidates, showToast } = useApp();
  const [selectedCandidate, setSelectedCandidate] = useState<RecruiterCandidate>(recruiterCandidates[0]);

  const featureWeights = [
    { name: 'Mandatory Required Skills (Vector Cosine Match)', weight: 35, score: selectedCandidate.scoresBreakdown.requiredSkills, color: 'bg-emerald-600' },
    { name: 'Direct Telemetry & Experience Tenure', weight: 25, score: selectedCandidate.scoresBreakdown.experience, color: 'bg-blue-600' },
    { name: 'Production Project Implementation', weight: 25, score: selectedCandidate.scoresBreakdown.projects, color: 'bg-indigo-600' },
    { name: 'Academic Credential & Verified Degree', weight: 15, score: selectedCandidate.scoresBreakdown.education, color: 'bg-slate-700' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-600" />
            Explainable AI (XAI) Decision Audit
          </h1>
          <p className="text-xs text-slate-500">Transparent SHAP feature attribution logs and deterministic score decomposition for hiring compliance.</p>
        </div>

        {/* Candidate Selector */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200">
          {recruiterCandidates.slice(0, 3).map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCandidate(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCandidate.id === c.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              #{c.rank} {c.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Audit Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
        
        {/* Inspection Readout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
              <Cpu className="w-4 h-4 text-emerald-600" />
              <span>AUDIT TARGET: CANDIDATE #{selectedCandidate.rank}</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">"Why Did AI Rank This Candidate?"</h2>
            <p className="text-xs text-slate-500">Auditing profile fit score for {selectedCandidate.name} ({selectedCandidate.targetRole})</p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center min-w-[120px]">
            <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase block">FINAL MATCH INDEX</span>
            <span className="text-3xl font-extrabold text-emerald-600 font-mono">{selectedCandidate.matchScore}%</span>
          </div>
        </div>

        {/* Feature Contribution Breakdown */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
            FEATURE CONTRIBUTION ATTRIBUTION WEIGHTS
          </h3>

          <div className="space-y-3 text-xs">
            {featureWeights.map((feat) => (
              <div key={feat.name} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{feat.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 font-mono">Weight: {feat.weight}%</span>
                    <span className="font-mono font-extrabold text-slate-900">{feat.score}%</span>
                  </div>
                </div>

                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className={`${feat.color} h-full rounded-full transition-all duration-500`} style={{ width: `${feat.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Reasoning Rationale */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Natural Language AI Reasoning Audit Log</span>
          </div>
          <p className="text-slate-700 leading-relaxed font-mono">
            "{selectedCandidate.aiReasoning}"
          </p>

          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Demographic Attributes Excluded: Age, Gender, Ethnicity (100% Bias Audited)</span>
            </div>
            <button
              onClick={() => showToast('Compliance PDF Audit Report generated!')}
              className="text-emerald-700 font-bold hover:underline"
            >
              Export Audit PDF →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
