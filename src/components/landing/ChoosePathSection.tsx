import React from 'react';
import {
  User,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Target,
  Brain,
  Shield,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const CANDIDATE_FEATURES = [
  'Multi-layer PDF / DOCX Resume Parsing',
  '5-Dimensional Career Readiness Score',
  'Skill Gap Identification & Action Plan',
  'Interactive AI Career Coach & Interview Practice',
];

const RECRUITER_FEATURES = [
  'Batch Resume Ingestion & Processing Pipeline',
  'Explainable AI Candidate Ranking (SHAP)',
  'Amazon Bedrock Guardrails — Blind Screening',
  'Side-by-Side Candidate Comparison Matrix',
];

export const ChoosePathSection: React.FC = () => {
  const { setRoleMode } = useApp();

  return (
    <section className="py-24 px-4 gradient-mesh border-b border-slate-200 relative overflow-hidden">

      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/60 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-100/60 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-600 font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            Workspace Mode Selection
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Built for Candidates &{' '}
            <span className="gradient-text-blue">Enterprise Teams</span>
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Two specialized portals — one platform. Unlock tailored AI workflows, precision analytics, and intelligence tools for your role.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Candidate Card */}
          <div
            className="relative p-8 rounded-3xl bg-white border border-slate-200 shadow-sm cursor-pointer space-y-6 group feature-card-hover feature-card-hover-blue overflow-hidden"
            onClick={() => setRoleMode('candidate')}
          >
            {/* Background gradient accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-500/30">
                <User className="w-6 h-6" />
              </div>
              <span className="badge-blue text-[10px]">STUDENT PORTAL</span>
            </div>

            <div className="relative z-10 space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">Student & Candidate Intelligence</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Extract your Skill DNA, evaluate job compatibility, pinpoint skill gaps, and follow a personalized AI-powered career roadmap.
              </p>
            </div>

            <div className="relative z-10 space-y-2.5 pt-3 border-t border-slate-100">
              {CANDIDATE_FEATURES.map((text) => (
                <div key={text} className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Mini feature icons */}
            <div className="relative z-10 flex items-center gap-3 pt-2">
              {[Brain, Target, Zap, TrendingUp].map((Icon, i) => (
                <div key={i} className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              ))}
            </div>

            <div className="relative z-10 flex items-center justify-between font-bold text-sm text-blue-600 pt-1 border-t border-blue-50">
              <span>Launch Student Workspace</span>
              <div className="flex items-center gap-1 p-2 rounded-xl bg-blue-600 text-white group-hover:bg-blue-700 transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* Recruiter Card */}
          <div
            className="relative p-8 rounded-3xl bg-white border border-slate-200 shadow-sm cursor-pointer space-y-6 group feature-card-hover feature-card-hover-emerald overflow-hidden"
            onClick={() => setRoleMode('recruiter')}
          >
            {/* Background gradient accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-500/30">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="badge-emerald text-[10px]">RECRUITER PORTAL</span>
            </div>

            <div className="relative z-10 space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">Recruiter Talent Intelligence</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Screen applicant pools with SHAP-style feature attribution, DEI blind evaluation guardrails, and intelligent side-by-side candidate comparisons.
              </p>
            </div>

            <div className="relative z-10 space-y-2.5 pt-3 border-t border-slate-100">
              {RECRUITER_FEATURES.map((text) => (
                <div key={text} className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Mini feature icons */}
            <div className="relative z-10 flex items-center gap-3 pt-2">
              {[Shield, Brain, TrendingUp, Zap].map((Icon, i) => (
                <div key={i} className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              ))}
            </div>

            <div className="relative z-10 flex items-center justify-between font-bold text-sm text-emerald-600 pt-1 border-t border-emerald-50">
              <span>Launch Recruiter Workspace</span>
              <div className="flex items-center gap-1 p-2 rounded-xl bg-emerald-600 text-white group-hover:bg-emerald-700 transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Strip */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-50">
              <Sparkles className="w-4 h-4 text-orange-500" />
            </div>
            <span className="text-sm font-semibold text-slate-700">
              Fully integrated with <span className="text-orange-600 font-bold">Amazon Bedrock</span> foundation models and explicit skill provenance tracking.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Enterprise AI Engine Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
};
