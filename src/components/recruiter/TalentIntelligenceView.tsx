import React from 'react';
import { 
  BarChart3, 
  Sparkles, 
  Download, 
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockTalentMetrics } from '../../data/mockData';

export const TalentIntelligenceView: React.FC = () => {
  const { showToast } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            Talent Insights & Workforce Analytics
          </h1>
          <p className="text-xs text-slate-500">Macro workforce intelligence across 1,284 ingested candidate resumes, skill availability, and experience distributions.</p>
        </div>

        <button
          onClick={() => showToast('Exported Talent Intelligence Analytics report (PDF/CSV)...')}
          className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
        >
          <Download className="w-4 h-4 text-emerald-600" />
          <span>Export Analytics Report</span>
        </button>
      </div>

      {/* AI Strategic Takeaways */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>AI Executive Talent Takeaways</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {mockTalentMetrics.aiInsights.map((insight, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="text-slate-700 font-medium">{insight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Skill Prevalence */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Skill Prevalence Across Candidate Pool</h3>
            <span className="text-xs font-mono text-slate-500">1,284 Resumes</span>
          </div>

          <div className="space-y-3 text-xs">
            {mockTalentMetrics.topSkills.map((sk) => (
              <div key={sk.name} className="space-y-1">
                <div className="flex items-center justify-between font-semibold text-slate-700">
                  <span>{sk.name}</span>
                  <span className="font-mono text-emerald-600 font-bold">{sk.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full transition-all duration-500" style={{ width: `${sk.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Seniority Distribution */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Experience Seniority Distribution</h3>
            <span className="text-xs font-mono text-slate-500">4 Bands</span>
          </div>

          <div className="space-y-3 text-xs">
            {mockTalentMetrics.experienceDistribution.map((exp) => (
              <div key={exp.range} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{exp.range}</span>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-slate-500">{exp.count} applicants</span>
                    <span className="text-emerald-600 font-bold">{exp.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-slate-700 h-full rounded-full transition-all duration-500" style={{ width: `${exp.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>42% of candidates fall in the 1–3 years experience tier, representing high growth potential.</span>
          </div>
        </div>

      </div>
    </div>
  );
};
