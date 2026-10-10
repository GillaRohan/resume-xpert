import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  User, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  UploadCloud, 
  Target, 
  Layers,
  ChevronLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OnboardingModal: React.FC = () => {
  const { 
    isOnboardingOpen, 
    setIsOnboardingOpen, 
    setRoleMode, 
    setCandidateTab, 
    setRecruiterTab,
    showToast 
  } = useApp();

  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<'candidate' | 'recruiter'>('candidate');
  const [goal, setGoal] = useState('Land a high-impact Data Analyst or ML role');
  const [targetRole, setTargetRole] = useState('Product Data Analyst');

  if (!isOnboardingOpen) return null;

  const handleFinish = () => {
    showToast("Your Career Intelligence Profile is ready!");
    setIsOnboardingOpen(false);
    if (selectedRole === 'candidate') {
      setRoleMode('candidate');
      setCandidateTab('overview');
    } else {
      setRoleMode('recruiter');
      setRecruiterTab('overview');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="rounded-3xl bg-white border border-black/[0.12] w-full max-w-xl shadow-2xl shadow-black/20 p-6 sm:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={() => setIsOnboardingOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl text-black/40 hover:text-black hover:bg-black/[0.05] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step Progress Indicators */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-mono font-bold flex items-center justify-center">
              {step}
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-black/50">
              STEP {step} OF 5
            </span>
          </div>

          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map(s => (
              <span
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  s === step ? 'w-6 bg-black' : s < step ? 'w-3 bg-black/40' : 'w-3 bg-black/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* STEP 1: Who are you? (Candidate vs Recruiter) */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-black">
                Who are you?
              </h3>
              <p className="text-xs sm:text-sm text-black/50 mt-1">
                Select your primary goal so we can calibrate your personalized intelligence model.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => setSelectedRole('candidate')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  selectedRole === 'candidate'
                    ? 'border-black bg-black text-white shadow-md'
                    : 'border-black/[0.10] bg-zinc-50 hover:bg-black/[0.04] text-black'
                }`}
              >
                <User className={`w-8 h-8 mb-3 ${selectedRole === 'candidate' ? 'text-white' : 'text-black'}`} />
                <h4 className="text-sm font-bold">Candidate</h4>
                <p className={`text-[11px] mt-1 ${selectedRole === 'candidate' ? 'text-white/70' : 'text-black/50'}`}>Analyze my resume, fix skill gaps, and explore jobs.</p>
              </div>

              <div
                onClick={() => setSelectedRole('recruiter')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  selectedRole === 'recruiter'
                    ? 'border-black bg-black text-white shadow-md'
                    : 'border-black/[0.10] bg-zinc-50 hover:bg-black/[0.04] text-black'
                }`}
              >
                <Briefcase className={`w-8 h-8 mb-3 ${selectedRole === 'recruiter' ? 'text-white' : 'text-black'}`} />
                <h4 className="text-sm font-bold">Recruiter / Employer</h4>
                <p className={`text-[11px] mt-1 ${selectedRole === 'recruiter' ? 'text-white/70' : 'text-black/50'}`}>Screen resumes, rank candidates, and eliminate bias.</p>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-xl bg-black hover:bg-black/90 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: What are you looking for? */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-black">
                What is your primary focus?
              </h3>
              <p className="text-xs sm:text-sm text-black/50 mt-1">
                Help AI prioritize your roadmap and recommendation weights.
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                "Targeting full-time placement in Data & AI Engineering",
                "Assessing my ATS resume health and ranking readiness",
                "Identifying the highest ROI skills to learn this month",
                "Preparing for senior-level technical interviews"
              ].map(opt => (
                <div
                  key={opt}
                  onClick={() => setGoal(opt)}
                  className={`p-3.5 rounded-xl border cursor-pointer text-xs font-semibold flex items-center justify-between transition-all ${
                    goal === opt
                      ? 'border-black bg-black text-white'
                      : 'border-black/[0.10] bg-zinc-50 text-black/70 hover:bg-black/[0.04]'
                  }`}
                >
                  <span>{opt}</span>
                  {goal === opt && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-3 rounded-xl border border-black/[0.12] text-xs font-bold text-black hover:bg-black/[0.04]"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3.5 rounded-xl bg-black hover:bg-black/90 text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Upload Resume / Profile */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-black">
                Upload your baseline profile
              </h3>
              <p className="text-xs sm:text-sm text-black/50 mt-1">
                Upload your existing resume, or use our pre-loaded Alex Morgan demo candidate data.
              </p>
            </div>

            <div className="p-8 rounded-2xl border-2 border-dashed border-black/20 text-center space-y-3 bg-zinc-50">
              <UploadCloud className="w-10 h-10 mx-auto text-black" />
              <div>
                <p className="text-xs font-bold text-black">
                  Alex_Morgan_DataAnalyst_CV.pdf (Preloaded Demo)
                </p>
                <p className="text-[11px] text-black/50 mt-0.5">34 entities detected • CalTech CS 2025</p>
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-black text-white text-[10px] font-mono font-bold">
                ✓ Ready for Vector Processing
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-3 rounded-xl border border-black/[0.12] text-xs font-bold text-black hover:bg-black/[0.04]"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 py-3.5 rounded-xl bg-black hover:bg-black/90 text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Choose Target Role */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-black">
                Select your target role
              </h3>
              <p className="text-xs sm:text-sm text-black/50 mt-1">
                This configures the rubric against which your skill gaps and compatibility are calculated.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "Product Data Analyst", match: "92% Fit" },
                { title: "Machine Learning Engineer", match: "86% Fit" },
                { title: "Analytics Engineer (dbt)", match: "84% Fit" },
                { title: "Cloud Solutions Specialist", match: "81% Fit" },
              ].map(item => (
                <div
                  key={item.title}
                  onClick={() => setTargetRole(item.title)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    targetRole === item.title
                      ? 'border-black bg-black text-white'
                      : 'border-black/[0.10] bg-zinc-50 hover:bg-black/[0.04] text-black'
                  }`}
                >
                  <p className="text-xs font-bold">{item.title}</p>
                  <span className={`text-[10px] font-mono font-bold ${targetRole === item.title ? 'text-white/70' : 'text-black/60'}`}>{item.match}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep(3)}
                className="px-4 py-3 rounded-xl border border-black/[0.12] text-xs font-bold text-black hover:bg-black/[0.04]"
              >
                Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="flex-1 py-3.5 rounded-xl bg-black hover:bg-black/90 text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2"
              >
                <span>Synthesize Profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: AI Generates Initial Profile */}
        {step === 5 && (
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-black flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-8 h-8 animate-pulse text-white" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-black/60">
                ● INITIALIZATION COMPLETE
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-black mt-1">
                "Your Career Intelligence Profile is ready."
              </h3>
              <p className="text-xs sm:text-sm text-black/50 mt-2 max-w-md mx-auto">
                Profile calibrated for <strong>{targetRole}</strong>. Career Readiness Index scored at <strong>86/100</strong> with 3 actionable gap milestones.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 border border-black/[0.10] max-w-sm mx-auto flex items-center justify-around">
              <div>
                <span className="text-2xl font-black text-black font-mono">86</span>
                <p className="text-[10px] font-mono text-black/40">READINESS</p>
              </div>
              <div className="h-8 w-px bg-black/[0.10]" />
              <div>
                <span className="text-2xl font-black text-black font-mono">92%</span>
                <p className="text-[10px] font-mono text-black/40">TOP FIT</p>
              </div>
              <div className="h-8 w-px bg-black/[0.10]" />
              <div>
                <span className="text-2xl font-black text-black font-mono">3</span>
                <p className="text-[10px] font-mono text-black/40">GAPS</p>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-4 rounded-xl bg-black hover:bg-black/90 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>ENTER CAREER DASHBOARD</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
