import React from 'react';
import {
  FileText,
  Cpu,
  Shield,
  ArrowRight,
  Sparkles,
  Globe,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setRoleMode, setCandidateTab, setRecruiterTab } = useApp();

  const links = {
    Candidates: [
      { label: 'Resume Analysis',  action: () => { setRoleMode('candidate'); setCandidateTab('resume'); } },
      { label: 'Job Matcher',      action: () => { setRoleMode('candidate'); setCandidateTab('jobs'); } },
      { label: 'Career Roadmap',   action: () => { setRoleMode('candidate'); setCandidateTab('roadmap'); } },
      { label: 'AI Career Coach',  action: () => { setRoleMode('candidate'); setCandidateTab('coach'); } },
      { label: 'Skill Gap Intel',  action: () => { setRoleMode('candidate'); setCandidateTab('gaps'); } },
    ],
    Recruiters: [
      { label: 'Candidate Ranking',  action: () => { setRoleMode('recruiter'); setRecruiterTab('ranking'); } },
      { label: 'Bulk Resume Upload', action: () => { setRoleMode('recruiter'); setRecruiterTab('upload'); } },
      { label: 'Smart Candidate Search', action: () => { setRoleMode('recruiter'); setRecruiterTab('search'); } },
      { label: 'Compare Candidates', action: () => { setRoleMode('recruiter'); setRecruiterTab('compare'); } },
      { label: 'Talent Insights',    action: () => { setRoleMode('recruiter'); setRecruiterTab('intelligence'); } },
    ],
    Platform: [
      { label: 'AWS GenAI Blueprint', action: () => {} },
      { label: 'API Reference',       action: () => {} },
      { label: 'System Status',       action: () => {} },
      { label: 'Privacy & Security',  action: () => {} },
      { label: 'Documentation',       action: () => {} },
    ],
  };

  const trustBadges = [
    { icon: Shield, label: 'SOC 2 Ready' },
    { icon: Lock, label: 'Encrypted at Rest' },
    { icon: Globe, label: 'GDPR Compliant' },
    { icon: CheckCircle2, label: 'DEI Guardrails' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 relative overflow-hidden">
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      {/* Glow orbs */}
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 pb-12 border-b border-slate-800/60">

          {/* Brand Block */}
          <div className="col-span-1 md:col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <span className="font-black text-base text-white tracking-widest uppercase">
                  Resume<span className="text-blue-400">Xpert</span>
                </span>
                <div className="text-[9px] text-slate-500 font-mono uppercase tracking-[0.2em]">AI Platform</div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Next-generation AI career & talent intelligence platform powering vector resume extraction, explainable candidate ranking, and personalized skill gap optimization.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[10px] font-mono text-blue-400">
                <Cpu className="w-3 h-3" />
                AWS Bedrock Powered
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-400">
                <Sparkles className="w-3 h-3 text-violet-400" />
                v2.0 Enterprise
              </span>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              {trustBadges.map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                  <Icon className="w-3 h-3 text-emerald-500/70" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] font-mono">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {items.map(({ label, action }) => (
                  <li key={label}>
                    <button
                      onClick={action}
                      className="text-xs text-slate-500 hover:text-slate-200 transition-colors text-left flex items-center gap-1 group"
                    >
                      <span className="group-hover:underline underline-offset-2">{label}</span>
                      <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-mono text-slate-600">
            © 2026 Resume Xpert · Enterprise AI Career & Recruitment Intelligence Platform
          </p>
          <div className="flex items-center gap-4 text-[10px] font-mono text-slate-600">
            <span>Security Audited</span>
            <span className="text-slate-700">·</span>
            <span>DEI Compliant</span>
            <span className="text-slate-700">·</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
