import React from 'react';
import {
  Users,
  Sparkles,
  Filter,
  ArrowRight,
  UploadCloud,
  CheckCircle2,
  Briefcase,
  Layers,
  ChevronRight,
  ShieldCheck,
  Cpu,
  BarChart3,
  TrendingUp,
  Clock,
  Zap,
  Target,
  BrainCircuit,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RecruiterCommandCenter: React.FC = () => {
  const { setRecruiterTab, setIsJobCreateOpen } = useApp();

  const funnelSteps = [
    { stage: 'APPLICATIONS', count: '1,284', sub: 'Total Ingested Resumes',          rate: '100%',  icon: Users,        color: 'text-blue-600',   bg: 'bg-blue-50',   border: 'border-blue-100', barWidth: '100%', barColor: 'bg-blue-500' },
    { stage: 'AI SCREENING', count: '342',   sub: 'Passed Mandatory Criteria',        rate: '26.6%', icon: Filter,       color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100', barWidth: '27%', barColor: 'bg-violet-500' },
    { stage: 'SHORTLIST',    count: '87',    sub: 'High Match Index (80%+ Vector)',   rate: '6.8%',  icon: Layers,       color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', barWidth: '7%', barColor: 'bg-emerald-500' },
    { stage: 'INTERVIEW',    count: '24',    sub: 'Technical & Behavioral Ready',     rate: '1.9%',  icon: Cpu,          color: 'text-amber-600',  bg: 'bg-amber-50',  border: 'border-amber-100', barWidth: '2%', barColor: 'bg-amber-500' },
    { stage: 'SELECTED',     count: '6',     sub: 'Final Offer Candidates',           rate: '0.5%',  icon: CheckCircle2, color: 'text-rose-600',   bg: 'bg-rose-50',   border: 'border-rose-100', barWidth: '0.5%', barColor: 'bg-rose-500' },
  ];

  const quickActions = [
    { tab: 'upload' as any,       label: 'Bulk Resume Upload',    icon: UploadCloud, color: 'text-blue-600',    bg: 'bg-blue-50',    border: 'border-blue-100' },
    { tab: 'search' as any,       label: 'Smart Candidate Search', icon: Target,     color: 'text-violet-600',  bg: 'bg-violet-50',  border: 'border-violet-100' },
    { tab: 'ranking' as any,      label: 'Candidate Ranking',      icon: Users,      color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { tab: 'intelligence' as any, label: 'Talent Insights',        icon: BarChart3,  color: 'text-amber-600',   bg: 'bg-amber-50',   border: 'border-amber-100' },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 mb-1">
            <div className="p-1.5 rounded-lg bg-emerald-50">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
            </div>
            Recruitment Overview & Pipeline Telemetry
          </h1>
          <p className="text-xs text-slate-500">
            Active requisitions, applicant conversion funnel, and candidate processing intelligence.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setRecruiterTab('upload')}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center gap-1.5"
          >
            <UploadCloud className="w-3.5 h-3.5 text-emerald-600" />
            Bulk Upload
          </button>
          <button
            onClick={() => setIsJobCreateOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs font-bold transition-all shadow-sm shadow-emerald-500/20 hover:from-emerald-700 hover:to-emerald-800 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Create Job Profile
          </button>
        </div>
      </div>

      {/* AWS Engine Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 flex items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-blue-600/10 pointer-events-none" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
            <BrainCircuit className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Bedrock Screening Engine Active</div>
            <div className="text-[10px] font-mono text-slate-400">Human-in-the-Loop · Guardrails · Blind Screening</div>
          </div>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Demo Mode
          </div>
          <button
            onClick={() => setRecruiterTab('explainable')}
            className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-300 hover:bg-emerald-500/30 transition-colors flex items-center gap-1"
          >
            <Zap className="w-3 h-3" />
            View SHAP
          </button>
        </div>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Ingested Pool',    value: '1,284', sub: 'Across 4 requisitions',          color: 'text-blue-600',    border: 'border-blue-100',    bg: 'bg-blue-50',    icon: Users },
          { label: 'Qualified Applicants',   value: '342',   sub: 'Passed mandatory skill filters', color: 'text-emerald-600', border: 'border-emerald-100', bg: 'bg-emerald-50', icon: CheckCircle2 },
          { label: 'Shortlisted Candidates', value: '87',    sub: 'Vector similarity > 80% cosine', color: 'text-violet-600',  border: 'border-violet-100',  bg: 'bg-violet-50',  icon: Layers },
          { label: 'Finalists Ready',        value: '6',     sub: 'Verified by human review',       color: 'text-amber-600',   border: 'border-amber-100',   bg: 'bg-amber-50',   icon: ShieldCheck },
        ].map(({ label, value, sub, color, border, bg, icon: Icon }, i) => (
          <div key={i} className={`saas-card p-5 space-y-3 border ${border}`}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">{label}</span>
              <div className={`p-1.5 rounded-lg ${bg}`}>
                <Icon className={`w-3.5 h-3.5 ${color}`} />
              </div>
            </div>
            <div className={`text-3xl font-extrabold font-mono ${color}`}>{value}</div>
            <p className="text-[11px] text-slate-500 leading-snug">{sub}</p>
          </div>
        ))}
      </div>

      {/* Conversion Funnel */}
      <div className="saas-card p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Active Recruitment Conversion Funnel</h3>
            <p className="text-[11px] text-slate-500 mt-0.5 font-mono">Target: Senior Data Analyst · 4 Active Requisitions</p>
          </div>
          <button
            onClick={() => setRecruiterTab('ranking')}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            Full Analysis <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {funnelSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.stage}
                onClick={() => setRecruiterTab('ranking')}
                className={`p-4 rounded-xl border ${step.border} bg-slate-50/60 hover:bg-white hover:shadow-sm transition-all cursor-pointer group`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${step.bg}`}>
                      <Icon className={`w-4 h-4 ${step.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 uppercase font-mono">{step.stage}</span>
                        <span className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded-full ${step.bg} ${step.color}`}>
                          {step.rate}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{step.sub}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-lg font-extrabold font-mono ${step.color}`}>{step.count}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                  </div>
                </div>
                {/* Progress bar */}
                <div className="h-1 rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full ${step.barColor} transition-all duration-700`}
                    style={{ width: step.barWidth }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quickActions.map(({ tab, label, icon: Icon, color, bg, border }) => (
          <button
            key={tab}
            onClick={() => setRecruiterTab(tab)}
            className={`saas-card p-4 flex flex-col items-start gap-3 hover:shadow-md transition-all group border ${border} text-left`}
          >
            <div className={`p-2 rounded-xl ${bg}`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">{label}</div>
              <div className={`text-[10px] font-mono ${color} mt-0.5 flex items-center gap-1`}>
                Open <ChevronRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
