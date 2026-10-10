import React, { useState } from 'react';
import {
  FileSearch,
  Sparkles,
  Target,
  TrendingUp,
  ShieldAlert,
  BarChart3,
  CopyCheck,
  Users,
  Brain,
  ArrowRight,
  Cpu,
  Lock,
} from 'lucide-react';

const FEATURES = [
  {
    icon: FileSearch,
    title: 'Multi-Format Resume Parser',
    tag: 'AWS Textract + NLP',
    desc: 'Extracts skills, experience, and education with high precision using validated JSON schemas.',
    preview: ['JSON Extraction', 'Multi-Column PDF', 'Explicit Evidence', 'Structured Facts'],
    color: 'blue',
    accent: 'from-blue-500/10 to-blue-600/5',
    border: 'group-hover:border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    tagStyle: 'bg-blue-50 text-blue-700 border-blue-100',
  },
  {
    icon: Target,
    title: 'Vector Job Match Engine',
    tag: 'OpenSearch Embeddings',
    desc: 'Calculates cosine similarity embeddings across candidate Skill DNA and job requirements.',
    preview: ['1536-dim Vectors', 'Cosine Similarity', 'Skill Overlap', 'Match Score'],
    color: 'violet',
    accent: 'from-violet-500/10 to-violet-600/5',
    border: 'group-hover:border-violet-200',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    tagStyle: 'bg-violet-50 text-violet-700 border-violet-100',
  },
  {
    icon: TrendingUp,
    title: 'Career Readiness Index',
    tag: '5D Assessment',
    desc: 'Multi-dimensional evaluation across technical skills, experience, projects, education, and certs.',
    preview: ['Technical Score', 'Project Impact', 'Readiness Index', 'Action Steps'],
    color: 'emerald',
    accent: 'from-emerald-500/10 to-emerald-600/5',
    border: 'group-hover:border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    tagStyle: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  },
  {
    icon: ShieldAlert,
    title: 'Skill Gap Intelligence',
    tag: 'Gap Optimization',
    desc: 'Pinpoints missing technical requirements and translates them into actionable learning goals.',
    preview: ['Priority Gaps', 'Estimated Weeks', 'Recommended Projects', 'Certifications'],
    color: 'amber',
    accent: 'from-amber-500/10 to-amber-600/5',
    border: 'group-hover:border-amber-200',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    tagStyle: 'bg-amber-50 text-amber-700 border-amber-100',
  },
  {
    icon: Brain,
    title: 'AI Career Coach',
    tag: 'Amazon Bedrock LLM',
    desc: 'Conversational assistant for resume refinement, technical drill practice, and career roadmap guidance.',
    preview: ['Claude 3.5 Sonnet', 'Prompt Shortcuts', 'Interview Drills', 'Context Aware'],
    color: 'blue',
    accent: 'from-blue-500/10 to-indigo-600/5',
    border: 'group-hover:border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    tagStyle: 'bg-blue-50 text-blue-700 border-blue-100',
  },
  {
    icon: BarChart3,
    title: 'Talent Intelligence',
    tag: 'Recruiter Analytics',
    desc: 'Workforce analytics tracking candidate funnel metrics, skill availability, and experience bands.',
    preview: ['Funnel Telemetry', 'Skill Availability', 'Experience Bands', 'Strategic Insights'],
    color: 'emerald',
    accent: 'from-emerald-500/10 to-teal-600/5',
    border: 'group-hover:border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    tagStyle: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  },
  {
    icon: CopyCheck,
    title: 'Duplicate Detection',
    tag: 'Fingerprint Dedup',
    desc: 'Vector fingerprinting identifies rephrased or duplicate candidate submissions across batches.',
    preview: ['Vector Audit', 'Review Diff', 'Merge Profiles', 'Flagged Pairs'],
    color: 'rose',
    accent: 'from-rose-500/10 to-rose-600/5',
    border: 'group-hover:border-rose-200',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    tagStyle: 'bg-rose-50 text-rose-700 border-rose-100',
  },
  {
    icon: Users,
    title: 'Candidate Comparison',
    tag: 'Side-by-Side Audit',
    desc: 'Benchmark up to 3 candidates simultaneously across required skills, experience, and evidence.',
    preview: ['Side-by-Side', 'Winner Badges', 'Requirement Audit', 'PDF Export'],
    color: 'indigo',
    accent: 'from-indigo-500/10 to-indigo-600/5',
    border: 'group-hover:border-indigo-200',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    tagStyle: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  },
];

export const FeatureShowcase: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 bg-white border-b border-slate-200 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-50/80 via-violet-50/50 to-emerald-50/80 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 font-mono uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-slate-500" />
            AI Platform Capabilities
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive AI Engine &{' '}
            <span className="gradient-text-blue">Feature Suite</span>
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Eight specialized AI modules delivering end-to-end career intelligence and recruitment automation, powered by AWS Generative AI services.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            const isHovered = hoveredIdx === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative p-6 rounded-2xl bg-white border border-slate-200 shadow-sm group feature-card-hover cursor-default space-y-4 flex flex-col justify-between overflow-hidden ${f.border} transition-all duration-300`}
              >
                {/* Gradient accent bg on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl`} />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className={`p-2.5 rounded-xl ${f.iconBg} shadow-sm`}>
                      <Icon className={`w-5 h-5 ${f.iconColor}`} />
                    </div>
                    <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-lg border ${f.tagStyle}`}>
                      {f.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1.5">{f.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>

                <div className="relative z-10 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {f.preview.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-slate-50 border border-slate-200 text-[10px] font-mono text-slate-600 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom AWS CTA Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-emerald-600/10 pointer-events-none" />

          <div className="relative z-10 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-orange-500/20 border border-orange-500/30">
              <Sparkles className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Fully Integrated AWS Generative AI Stack</div>
              <div className="text-xs text-slate-400 mt-0.5 font-mono">Amazon Bedrock · Textract · OpenSearch Serverless · Guardrails</div>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-semibold">
              <Lock className="w-3.5 h-3.5" />
              Enterprise Security Ready
            </div>
            <div className="w-px h-5 bg-slate-700" />
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">v2.0 Production</span>
          </div>
        </div>

      </div>
    </section>
  );
};
