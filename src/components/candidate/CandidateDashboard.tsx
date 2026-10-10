import React from 'react';
import {
  FileText,
  Target,
  Zap,
  Compass,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  Clock,
  Briefcase,
  BookOpen,
  Sparkles,
  Activity,
  ChevronRight,
  Star,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CandidateDashboard: React.FC = () => {
  const { profile, setCandidateTab, jobMatches, skillGaps } = useApp();
  const activeGaps = skillGaps.filter(g => g.status !== 'completed');

  const METRIC_CARDS = [
    {
      label: 'Career Readiness',
      value: profile.careerReadiness,
      suffix: '/100',
      sub: 'Top 8% percentile nationwide',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      progress: profile.careerReadiness,
      progressColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
      icon: TrendingUp,
      iconColor: 'text-blue-600',
    },
    {
      label: 'Resume Health',
      value: profile.scores.resumeHealth,
      suffix: '%',
      sub: 'ATS-verified · Explicit skill provenance',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      progress: profile.scores.resumeHealth,
      progressColor: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      icon: FileText,
      iconColor: 'text-emerald-600',
    },
    {
      label: 'Top Job Compatibility',
      value: 92,
      suffix: '%',
      sub: 'Data Analyst · Stripe Metrics',
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      border: 'border-violet-100',
      progress: 92,
      progressColor: 'bg-gradient-to-r from-violet-500 to-violet-600',
      icon: Target,
      iconColor: 'text-violet-600',
    },
    {
      label: 'Skill Gaps',
      value: activeGaps.length,
      suffix: '',
      sub: 'Docker · Power BI · PySpark',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      progress: 60,
      progressColor: 'bg-gradient-to-r from-amber-400 to-amber-500',
      icon: Zap,
      iconColor: 'text-amber-600',
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <h1 className="text-xl font-bold text-slate-900">
              Candidate Dashboard
            </h1>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-blue-50 border border-blue-100 text-blue-700">
              Target: Data Analyst — AI & Growth
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Welcome back, <span className="font-semibold text-slate-700">{profile.name}</span>. Review your career readiness score, skill gaps, and AI match telemetry.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCandidateTab('resume')}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
          >
            Upload Resume
          </button>
          <button
            onClick={() => setCandidateTab('jobs')}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold transition-all shadow-sm shadow-blue-500/20 hover:from-blue-700 hover:to-blue-800 flex items-center gap-1.5"
          >
            <Target className="w-3.5 h-3.5" />
            View Job Matches ({jobMatches.length})
          </button>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRIC_CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className={`saas-card p-5 space-y-3 border ${card.border}`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">{card.label}</span>
                <div className={`p-1.5 rounded-lg ${card.bg}`}>
                  <Icon className={`w-3.5 h-3.5 ${card.iconColor}`} />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-3xl font-extrabold font-mono ${card.color}`}>{card.value}</span>
                <span className="text-sm font-semibold text-slate-400">{card.suffix}</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full ${card.progressColor} transition-all duration-1000`}
                  style={{ width: `${card.progress}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Column */}
        <div className="lg:col-span-7 space-y-5">

          {/* AWS AI Engine Status Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 flex items-center justify-between gap-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-violet-600/10 pointer-events-none" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-500/30">
                <BrainCircuit className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Amazon Bedrock Engine Active</div>
                <div className="text-[10px] font-mono text-slate-400">Claude 3.5 Sonnet · Vector Embedding · OpenSearch</div>
              </div>
            </div>
            <div className="relative z-10 flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400 flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Demo Active
            </div>
          </div>

          {/* Top Job Matches */}
          <div className="saas-card p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-50">
                  <Target className="w-3.5 h-3.5 text-blue-600" />
                </div>
                Recommended Role Matches
              </h3>
              <button
                onClick={() => setCandidateTab('jobs')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {jobMatches.slice(0, 3).map((job) => (
                <div
                  key={job.id}
                  onClick={() => setCandidateTab('jobs')}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-slate-900">{job.title}</span>
                        <span className="text-[9px] font-bold font-mono px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                          {job.matchTag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{job.company} · {job.location}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <span className="text-lg font-extrabold text-blue-600 font-mono">{job.matchScore}%</span>
                      <div className="flex items-center gap-0.5 justify-end mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-2.5 h-2.5 ${i < Math.round(job.matchScore / 20) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Log */}
          <div className="saas-card p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="p-1.5 rounded-lg bg-slate-100">
                <Activity className="w-3.5 h-3.5 text-slate-500" />
              </div>
              AI Processing Log
            </h3>
            <div className="space-y-3">
              {[
                {
                  icon: CheckCircle2,
                  color: 'text-emerald-600',
                  bg: 'bg-emerald-50',
                  title: 'Resume Parsed Successfully',
                  desc: 'Extracted 8 core skills, 2 work experiences, and 2 projects with explicit provenance.',
                },
                {
                  icon: BrainCircuit,
                  color: 'text-blue-600',
                  bg: 'bg-blue-50',
                  title: 'Amazon Bedrock Embedding Generated',
                  desc: 'Mapped 1536-dim candidate vector against OpenSearch role index — 12ms latency.',
                },
                {
                  icon: Target,
                  color: 'text-violet-600',
                  bg: 'bg-violet-50',
                  title: 'Vector Match Completed',
                  desc: 'Cosine similarity matched against 284 active job roles with 92% top score.',
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className={`p-1.5 rounded-lg ${item.bg} flex-shrink-0 mt-0.5`}>
                      <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 space-y-5">

          {/* Skill Gaps */}
          <div className="saas-card p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-50">
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                </div>
                Priority Skill Gaps
              </h3>
              <button
                onClick={() => setCandidateTab('gaps')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Manage Gaps →
              </button>
            </div>
            <div className="space-y-3">
              {skillGaps.slice(0, 3).map((gap) => (
                <div key={gap.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-200 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-900">{gap.name}</span>
                    <span className={`px-2 py-0.5 text-[9px] font-mono font-bold rounded-full ${
                      gap.priority === 'HIGH'   ? 'bg-red-100 text-red-700' :
                      gap.priority === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                                                   'bg-slate-100 text-slate-600'
                    }`}>
                      {gap.priority}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">{gap.recommendedCourse}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Plan */}
          <div className="saas-card p-5 space-y-3 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
            <h3 className="text-xs font-bold text-blue-900 flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-white/80">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              </div>
              Recommended Action Plan
            </h3>
            <ul className="space-y-2.5">
              {[
                'Complete 2-hour Docker fundamentals tutorial',
                'Build 1 cloud pipeline project (AWS S3 + Lambda)',
                'Earn Power BI Data Analyst Associate cert',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-blue-800">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setCandidateTab('roadmap')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all mt-1"
            >
              <Compass className="w-3.5 h-3.5" />
              View Full Learning Roadmap
            </button>
          </div>

          {/* Quick Navigation */}
          <div className="saas-card p-4 space-y-2">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono px-1 mb-3">Quick Access</h3>
            {[
              { tab: 'interview' as any, label: 'AI Interview Coach', icon: BrainCircuit, color: 'text-violet-600', bg: 'bg-violet-50' },
              { tab: 'coach' as any,     label: 'Career Coach Chat',  icon: Sparkles,    color: 'text-blue-600',   bg: 'bg-blue-50' },
              { tab: 'readiness' as any, label: 'Career Readiness',   icon: Activity,    color: 'text-emerald-600', bg: 'bg-emerald-50' },
            ].map(({ tab, label, icon: Icon, color, bg }) => (
              <button
                key={tab}
                onClick={() => setCandidateTab(tab)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${bg}`}>
                    <Icon className={`w-3.5 h-3.5 ${color}`} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">{label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
