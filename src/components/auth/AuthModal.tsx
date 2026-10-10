import React, { useState } from 'react';
import {
  X,
  FileText,
  ArrowRight,
  Lock,
  Mail,
  Sparkles,
  CheckCircle2,
  Eye,
  EyeOff,
  User,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    setRoleMode,
    setCandidateTab,
    setRecruiterTab,
    showToast,
  } = useApp();

  const [email, setEmail] = useState('alex.morgan@techpulse.io');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [targetRole, setTargetRole] = useState<'candidate' | 'recruiter'>('candidate');
  const [error, setError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    showToast(`Welcome back! Logged in as ${targetRole === 'candidate' ? 'Student' : 'Recruiter'} (Demo Mode).`);
    setIsAuthModalOpen(false);

    if (targetRole === 'candidate') {
      setRoleMode('candidate');
      setCandidateTab('overview');
    } else {
      setRoleMode('recruiter');
      setRecruiterTab('overview');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) setIsAuthModalOpen(false); }}
    >
      <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-zinc-200 grid md:grid-cols-2 min-h-[540px] relative bg-white">

        {/* Close */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors text-zinc-500"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Branding & Role Selection */}
        <div className="bg-zinc-50 p-8 flex flex-col justify-between border-r border-zinc-200">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-zinc-900 text-sm tracking-widest uppercase">ResumeXpert</div>
                <div className="text-[9px] font-mono text-zinc-400 tracking-[0.2em]">AWS GenAI Intelligence</div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-zinc-900 leading-snug mb-2">
              Select Your Workspace & Sign In
            </h2>
            <p className="text-xs text-zinc-500 leading-relaxed mb-6">
              Access role-specific AI tools designed for student career growth or high-velocity recruiter screening.
            </p>

            {/* Role Cards */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setTargetRole('candidate')}
                className={`w-full p-4 rounded-xl text-left border transition-all flex items-start gap-3.5 ${
                  targetRole === 'candidate'
                    ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                    : 'bg-white border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className={`p-2 rounded-lg ${targetRole === 'candidate' ? 'bg-blue-600 text-white' : 'bg-zinc-100 text-zinc-600'}`}>
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900 flex items-center gap-2">
                    Student Mode
                    {targetRole === 'candidate' && <span className="text-[9px] px-1.5 py-0.2 bg-blue-600 text-white rounded font-mono">SELECTED</span>}
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Resume analysis, ATS job matcher, skill gap blueprint & AI interview coach.</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTargetRole('recruiter')}
                className={`w-full p-4 rounded-xl text-left border transition-all flex items-start gap-3.5 ${
                  targetRole === 'recruiter'
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                    : 'bg-white border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className={`p-2 rounded-lg ${targetRole === 'recruiter' ? 'bg-emerald-600 text-white' : 'bg-zinc-100 text-zinc-600'}`}>
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-900 flex items-center gap-2">
                    Recruiter Mode
                    {targetRole === 'recruiter' && <span className="text-[9px] px-1.5 py-0.2 bg-emerald-600 text-white rounded font-mono">SELECTED</span>}
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Bulk resume ingestion, candidate ranking, SHAP explainability & talent analytics.</p>
                </div>
              </button>
            </div>
          </div>

          {/* Demo Auth Notice */}
          <div className="mt-6 pt-4 border-t border-zinc-200 text-[10px] text-zinc-400 font-mono flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>[Demo Mode Active — Instant Authentication]</span>
          </div>
        </div>

        {/* Right: Auth Form */}
        <div className="p-8 flex flex-col justify-center bg-white">
          {/* Tab switcher */}
          <div className="flex gap-1 p-1 rounded-xl bg-zinc-100 mb-6">
            {(['login', 'signup'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => { setAuthMode(mode); setError(null); }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                  authMode === mode ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Email Address</label>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus-within:bg-white focus-within:border-zinc-400 transition-colors">
                <Mail className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none"
                  placeholder="name@university.edu or company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Password</label>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 focus-within:bg-white focus-within:border-zinc-400 transition-colors">
                <Lock className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent text-xs text-zinc-900 focus:outline-none"
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-zinc-400 hover:text-zinc-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-xl text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                targetRole === 'candidate' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {authMode === 'login' 
                ? `Enter ${targetRole === 'candidate' ? 'Student' : 'Recruiter'} Workspace` 
                : `Register for ${targetRole === 'candidate' ? 'Student' : 'Recruiter'} Mode`}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 space-y-2 border-t border-zinc-100 pt-4">
            {[
              'Enterprise-grade security & encryption',
              'Explicit vs inferred skill provenance tracking',
              'Amazon Bedrock LLM powered insights',
            ].map((t) => (
              <div key={t} className="flex items-center gap-2 text-xs text-zinc-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
