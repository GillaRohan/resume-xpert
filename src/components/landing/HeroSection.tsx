import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  FileText,
  Target,
  BrainCircuit,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Zap,
  Play,
  ChevronRight,
  Star,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const TYPING_PHRASES = [
  'AI-Powered Career Intelligence',
  'Vector Skill DNA & Role Matching',
  'Explainable AI Candidate Ranking',
  'Personalized Learning Roadmaps',
];

const STATS = [
  { value: '98.7%', label: 'Parse Precision', color: 'text-blue-600' },
  { value: '3.2×', label: 'Screen Velocity', color: 'text-violet-600' },
  { value: '500K+', label: 'Skills Vectorized', color: 'text-emerald-600' },
  { value: '92%', label: 'Match Accuracy', color: 'text-cyan-600' },
];

const WORKFLOW_STEPS = [
  { icon: FileText,     label: 'Resume Ingestion',   sub: 'PDF · DOCX Parsing',   color: 'text-blue-600',    bg: 'bg-blue-100', border: 'border-blue-200' },
  { icon: BrainCircuit, label: 'Bedrock Extraction', sub: 'NLP & Skill DNA',       color: 'text-violet-600',  bg: 'bg-violet-100', border: 'border-violet-200' },
  { icon: Target,       label: 'Vector Matching',    sub: 'Cosine Similarity',     color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-200' },
  { icon: TrendingUp,   label: 'Career Execution',   sub: 'Roadmap & Coaching',    color: 'text-cyan-600',    bg: 'bg-cyan-100', border: 'border-cyan-200' },
];

const AWS_BADGES = [
  { label: 'Amazon Bedrock', icon: Cpu },
  { label: 'AWS Textract', icon: FileText },
  { label: 'OpenSearch', icon: Target },
  { label: 'Bedrock Guardrails', icon: ShieldCheck },
];

export const HeroSection: React.FC = () => {
  const { setRoleMode, setIsAuthModalOpen } = useApp();
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting) {
      if (charIdx < phrase.length) {
        timeout = setTimeout(() => {
          setDisplayText(phrase.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        }, 48);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2400);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setDisplayText(phrase.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        }, 22);
      } else {
        setIsDeleting(false);
        setPhraseIdx(i => (i + 1) % TYPING_PHRASES.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, phraseIdx]);

  return (
    <section className="hero-dark dot-grid-dark relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden py-24">

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Product Badge */}
      <div className="relative z-10 mb-8 flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-slate-200 shadow-sm cursor-default">
        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
        <span className="text-xs font-semibold text-slate-700 font-mono uppercase tracking-[0.15em]">
          Resume Xpert Enterprise AI v2.0
        </span>
        <span className="flex items-center gap-1 ml-1">
          <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
          <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
          <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
          <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
          <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
        </span>
      </div>

      {/* Main Headline */}
      <div className="relative z-10 text-center px-4 max-w-5xl space-y-6">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-slate-900">
          AI-Powered Career &<br />
          <span className="gradient-text-blue">Talent Intelligence</span>
        </h1>

        {/* Typewriter */}
        <div className="h-8 flex items-center justify-center">
          <p className="text-sm sm:text-base font-semibold font-mono" style={{ color: '#60a5fa' }}>
            <span className="opacity-60 mr-1">▶</span>
            {displayText}
            <span className="inline-block w-0.5 h-4 bg-blue-400 ml-0.5 animate-pulse align-middle rounded-sm" />
          </p>
        </div>

        <p className="max-w-2xl mx-auto text-base text-slate-600 leading-relaxed font-light">
          Engineered for engineering students, recruiters, and placement teams. Multi-layer resume parsing, semantic role matching, and explainable candidate ranking — powered by AWS Generative AI.
        </p>
      </div>

      {/* CTA Role Cards */}
      <div className="relative z-10 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg px-4">
        <button
          onClick={() => setRoleMode('candidate')}
          className="btn-glow-blue w-full sm:w-auto px-8 py-4 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold tracking-wide shadow-lg"
        >
          <FileText className="w-5 h-5" />
          Student Workspace
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => setRoleMode('recruiter')}
          className="btn-glow-emerald w-full sm:w-auto px-8 py-4 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold tracking-wide shadow-lg"
        >
          <Zap className="w-5 h-5" />
          Recruiter Hub
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Demo Link */}
      <div className="relative z-10 mt-4">
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-800 transition-colors font-mono"
        >
          <Play className="w-3 h-3" />
          View Demo / Sign In
        </button>
      </div>

      {/* Stats Row */}
      <div className="relative z-10 mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl px-4">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-white/70 border border-slate-200 rounded-xl p-5 text-center shadow-sm">
            <div className={`text-2xl font-extrabold font-mono ${stat.color}`}>{stat.value}</div>
            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-1 font-mono">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Pipeline Steps */}
      <div className="relative z-10 mt-8 max-w-4xl w-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {WORKFLOW_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className={`bg-white border p-4 rounded-xl flex items-center gap-3 shadow-sm ${step.border}`}>
                <div className={`p-2 rounded-xl ${step.bg} flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${step.color}`} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">{step.label}</div>
                  <div className={`text-[10px] font-mono ${step.color}`}>{step.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AWS Technology Strip */}
      <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-3 px-4">
        <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest mr-2">Powered by</span>
        {AWS_BADGES.map(({ label, icon: Icon }, i) => (
          <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-600 font-mono shadow-sm">
            <Icon className="w-3 h-3 text-orange-500" />
            {label}
          </div>
        ))}
      </div>
    </section>
  );
};
