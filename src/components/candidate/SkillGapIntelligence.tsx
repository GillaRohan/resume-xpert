import React from 'react';
import { 
  Zap, 
  Clock, 
  BookOpen, 
  Layers, 
  Award, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  ArrowRight,
  Target
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SkillGapIntelligence: React.FC = () => {
  const { skillGaps, closeSkillGap, setCandidateTab } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-600" />
            Skill Gap Analysis & ROI Recommendations
          </h1>
          <p className="text-xs text-slate-500">Algorithmic diagnostic identifying requirements missing between candidate profile and target job descriptions.</p>
        </div>

        <button
          onClick={() => setCandidateTab('roadmap')}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all shadow-sm flex items-center gap-1.5"
        >
          <span>View 4-Phase Roadmap</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Transformation Step Matrix */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
          SKILL BRIDGE TRANSFORMATION MATRIX
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 font-mono">STEP 01</span>
            <div className="font-bold text-slate-900 mt-1">Current Skills</div>
            <p className="text-[10px] text-slate-500 mt-0.5">Python, SQL, AWS</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
            <span className="text-[10px] font-bold text-amber-600 font-mono">STEP 02</span>
            <div className="font-bold text-amber-900 mt-1">Skill Gaps</div>
            <p className="text-[10px] text-amber-700 mt-0.5">Docker, PySpark</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
            <span className="text-[10px] font-bold text-blue-600 font-mono">STEP 03</span>
            <div className="font-bold text-blue-900 mt-1">Learning Goal</div>
            <p className="text-[10px] text-blue-700 mt-0.5">Hands-on Lab</p>
          </div>
          <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200">
            <span className="text-[10px] font-bold text-indigo-600 font-mono">STEP 04</span>
            <div className="font-bold text-indigo-900 mt-1">Project Build</div>
            <p className="text-[10px] text-indigo-700 mt-0.5">Deploy to AWS</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-[10px] font-bold text-emerald-600 font-mono">STEP 05</span>
            <div className="font-bold text-emerald-900 mt-1">Job Ready</div>
            <p className="text-[10px] text-emerald-700 mt-0.5">Readiness 95+</p>
          </div>
        </div>
      </div>

      {/* Skill Gap Priority Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-500 font-mono uppercase">
          PRIORITY SKILL GAPS RANKED BY ROI
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillGaps.map((gap) => {
            const isCompleted = gap.status === 'completed';
            return (
              <div
                key={gap.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 text-[9px] font-mono font-bold bg-amber-100 text-amber-800 rounded">
                      {gap.priority} PRIORITY
                    </span>
                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {gap.estimatedWeeks} weeks
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">{gap.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Target Role: {gap.targetRole}</p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                    <div className="flex items-start gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">Course</span>
                        <span className="text-slate-800 font-medium">{gap.recommendedCourse}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Layers className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">Project</span>
                        <span className="text-slate-800 font-medium">{gap.recommendedProject}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Award className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">Credential</span>
                        <span className="text-slate-800 font-medium">{gap.recommendedCert}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => closeSkillGap(gap.id)}
                  disabled={isCompleted}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                    isCompleted
                      ? 'bg-slate-100 text-slate-500 cursor-default'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Gap Marked In-Progress (+3 Pts)</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Close This Skill Gap</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
