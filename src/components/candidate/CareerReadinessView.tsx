import React from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  Award, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  Layers, 
  ArrowRight,
  Target
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CareerReadinessView: React.FC = () => {
  const { profile, toggleActionStep, setCandidateTab } = useApp();

  const dimensions = [
    { label: "Technical Skills", score: profile.dimensions.technicalSkills, icon: Code2, color: "brand" },
    { label: "Experience Relevance", score: profile.dimensions.experience, icon: Briefcase, color: "indigo" },
    { label: "Production Projects", score: profile.dimensions.projects, icon: Layers, color: "cyan" },
    { label: "Academic Foundations", score: profile.dimensions.education, icon: GraduationCap, color: "purple" },
    { label: "Industry Certifications", score: profile.dimensions.certifications, icon: Award, color: "amber" },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-black/[0.10] dark:border-black/[0.07]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-black tracking-tight">
              Career Readiness Diagnostic
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-black/10 text-black/70 dark:text-black/60 border border-black/15 text-xs font-mono font-bold">
              Top 14% Percentile
            </span>
          </div>
          <p className="text-sm text-white/50 dark:text-black/40 mt-1">
            Multidimensional capability matrix and personalized prescriptive blueprint to reach 95/100.
          </p>
        </div>

        <button
          onClick={() => setCandidateTab('roadmap')}
          className="px-4 py-2 rounded-xl bg-black/10 hover:bg-black/10 text-black font-bold text-xs shadow-md shadow-black/40 transition-all flex items-center gap-2"
        >
          <Compass className="w-4 h-4 text-black" />
          <span>View 90-Day Execution Roadmap</span>
        </button>
      </div>

      {/* Main Score Hero Card */}
      <div className="rounded-3xl bg-gradient-to-br from-white via-zinc-100 to-zinc-100 dark:from-white dark:via-zinc-100/90 dark:to-zinc-50 border border-black/[0.10] dark:border-black/[0.07] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Big Score Readout */}
          <div className="lg:col-span-5 text-center sm:text-left border-b lg:border-b-0 lg:border-r border-black/[0.10] dark:border-black/[0.07] pb-6 lg:pb-0 lg:pr-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 text-black dark:text-black text-xs font-mono font-bold mb-3 border border-black/20">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>CAREER READINESS INDEX</span>
            </div>

            <div className="flex items-baseline justify-center sm:justify-start gap-3 my-2">
              <span className="text-6xl sm:text-7xl font-black tracking-tight text-white dark:text-black">
                {profile.careerReadiness}
              </span>
              <span className="text-2xl font-bold text-black/40">/ 100</span>
            </div>

            <div className="inline-block px-3 py-1 rounded-xl bg-black/10 text-black/70 dark:text-black/60 border border-black/15 text-xs font-bold tracking-wide uppercase mt-1">
              "Strong Candidate Profile"
            </div>

            <p className="text-xs text-white/50 dark:text-black/40 mt-4 leading-relaxed">
              Your profile demonstrates high analytical execution. Closing your containerization gap and adding cloud deployment will position you in the 95th percentile.
            </p>
          </div>

          {/* 5 Visual Dimensions (Bar/Radial hybrid) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-black/40 dark:text-black/30 mb-2">
              The 5 Foundational Evaluation Dimensions
            </h3>

            <div className="space-y-3.5">
              {dimensions.map((dim) => {
                const Icon = dim.icon;
                return (
                  <div key={dim.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-black/50 dark:text-black/90 flex items-center gap-2">
                        <Icon className="w-4 h-4 text-black" />
                        {dim.label}
                      </span>
                      <span className="font-mono text-black dark:text-black">{dim.score}%</span>
                    </div>
                    <div className="w-full bg-zinc-50 dark:bg-zinc-100 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-black to-white h-full rounded-full transition-all duration-700" 
                        style={{ width: `${dim.score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* "HOW TO REACH 95" Personal AI Coach Blueprint */}
      <div className="rounded-3xl bg-black dark:bg-zinc-50/70 border border-black/[0.10] dark:border-black/[0.07] p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-black/[0.10] dark:border-black/[0.07]">
          <div>
            <h3 className="text-lg font-extrabold text-white dark:text-black flex items-center gap-2">
              <Target className="w-5 h-5 text-black" />
              HOW TO REACH 95 — PRESCRIPTIVE AI BLUEPRINT
            </h3>
            <p className="text-xs text-black/30 mt-0.5">
              Check off milestones to track your calculated score elevation in real time.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-black dark:text-black bg-black/10 px-3 py-1 rounded-xl">
            Target Score: 95/100 (+9 pts)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.actionableSteps.map((step) => (
            <div
              key={step.id}
              onClick={() => toggleActionStep(step.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                step.completed
                  ? 'bg-black/10 border-black/20'
                  : 'bg-zinc-900 dark:bg-black/70 border-black/[0.10] dark:border-black/[0.07] hover:border-black/20'
              }`}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center border mt-0.5 shrink-0 ${
                  step.completed ? 'bg-black border-black/20 text-black/50' : 'border-black/10'
                }`}>
                  {step.completed && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-black/40">{step.category}</span>
                    <span className="text-[10px] font-mono font-bold text-black bg-black/10 px-1.5 py-0.5 rounded">
                      {step.impact}
                    </span>
                  </div>
                  <h4 className={`text-xs sm:text-sm font-bold mt-1 ${
                    step.completed ? 'line-through text-black/40' : 'text-white dark:text-black'
                  }`}>
                    {step.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-black/[0.10]/60 dark:border-black/[0.07]/80">
                <span className="text-[11px] text-black/30">
                  {step.completed ? '✓ Completed' : 'Action pending'}
                </span>
                <span className="text-xs font-bold text-black dark:text-black">
                  {step.completed ? 'Score applied' : 'Mark complete →'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-black/08 border border-black/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-black/60 shrink-0" />
            <p className="text-xs text-black/50 dark:text-black/70">
              Need step-by-step guidance on completing your Docker containerization project?
            </p>
          </div>
          <button
            onClick={() => setCandidateTab('coach')}
            className="px-4 py-2 rounded-xl bg-black/10 hover:bg-black/10 text-black font-bold text-xs shrink-0 flex items-center gap-1.5"
          >
            <span>Ask Xpert AI Coach</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
