import React, { useState } from 'react';
import {
  FileText,
  CheckCircle,
  Cpu,
  Layers,
  Award,
  Briefcase,
  Target,
  ArrowUpRight,
  Zap,
  Circle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const RESUME_SECTIONS = [
  { id: 'skills', label: 'Skills', score: 94, items: ['React', 'TypeScript', 'Python', 'Node.js'] },
  { id: 'exp', label: 'Experience', score: 88, items: ['3 roles', '5.5 years', 'Leadership'] },
  { id: 'edu', label: 'Education', score: 96, items: ['B.Tech CS', 'NIT Trichy', '8.9 CGPA'] },
  { id: 'certs', label: 'Certifications', score: 91, items: ['AWS SAA', 'GCP Pro', 'K8s Admin'] },
];

const JOB_MATCHES = [
  { title: 'Senior Frontend Eng.', company: 'Stripe', match: 94 },
  { title: 'Full Stack Developer', company: 'Razorpay', match: 89 },
  { title: 'UI/UX Engineer', company: 'Figma', match: 82 },
];

export const ResumeScannerInteractive: React.FC = () => {
  const { setRoleMode } = useApp();
  const [hovered, setHovered] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(true);

  const handleScan = () => {
    setScanning(true);
    setScanned(false);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 2400);
  };

  return (
    <section className="relative py-24 px-4 bg-white overflow-hidden border-b border-slate-200">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-5">
            <Cpu className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-xs font-bold text-slate-600 tracking-widest uppercase font-mono">Live AI Resume Scanner</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            See AI Analyze Your Resume{' '}
            <span className="gradient-text-blue">in Real-Time</span>
          </h2>
          <p className="mt-4 text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
            Our Amazon Bedrock NLP engine dissects every section — skills, experience, education — 
            then cross-matches against live job postings using vector similarity.
          </p>
        </div>

        {/* Main Interactive Demo */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Resume Card */}
          <div className="relative lg:col-span-1 rounded-2xl bg-zinc-50 border border-black/[0.08] overflow-hidden">
            {/* Scanning line */}
            {scanning && (
              <div
                className="absolute left-0 right-0 h-px bg-black/60 z-20 animate-scan shadow-sm"
                style={{ top: '20%' }}
              />
            )}

            {/* Header */}
            <div className="px-5 pt-5 pb-4 border-b border-black/[0.06]">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-black text-black text-sm">Ananya Krishnan</h3>
                  <p className="text-xs text-black/40 font-mono mt-0.5">Full Stack Developer</p>
                </div>
                <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono border transition-all duration-500 ${
                  scanned
                    ? 'bg-black/10 border-black/20 text-black'
                    : 'bg-black/5 border-black/10 text-black/40'
                }`}>
                  {scanning ? 'SCANNING...' : scanned ? '✓ VERIFIED' : 'PENDING'}
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="p-5 space-y-3">
              {RESUME_SECTIONS.map((sec) => {
                const isHov = hovered === sec.id;
                return (
                  <div
                    key={sec.id}
                    onMouseEnter={() => setHovered(sec.id)}
                    onMouseLeave={() => setHovered(null)}
                    className={`rounded-xl p-3.5 border cursor-default transition-all duration-300 ${
                      isHov
                        ? 'bg-black/[0.08] border-black/20'
                        : 'bg-black/[0.02] border-black/[0.06]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-black/80">{sec.label}</span>
                      <span className="text-xs font-black text-black font-mono">{scanned ? sec.score : '--'}%</span>
                    </div>
                    {/* Score bar */}
                    <div className="h-1 rounded-full bg-black/[0.08] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-black transition-all duration-1000 ease-out"
                        style={{ width: scanned ? `${sec.score}%` : '0%' }}
                      />
                    </div>
                    {isHov && (
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {sec.items.map((item) => (
                          <span key={item} className="px-1.5 py-0.5 rounded text-[9px] bg-black/[0.08] text-black/60 font-mono">
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Scan Button */}
            <div className="px-5 pb-5">
              <button
                onClick={handleScan}
                disabled={scanning}
                className="w-full py-2.5 rounded-xl bg-black text-white text-xs font-bold tracking-wide hover:bg-black/90 disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Cpu className="w-3.5 h-3.5" />
                {scanning ? 'Scanning...' : 'Re-scan Resume'}
              </button>
            </div>
          </div>

          {/* Center: AI Processing */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {/* AI Score */}
            <div className="rounded-2xl bg-zinc-50 border border-black/[0.08] p-6 flex flex-col items-center">
              <div className="relative w-28 h-28">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="white"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - (scanned ? 0.91 : 0))}`}
                    className="transition-all duration-1500 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-black">{scanned ? '91' : '--'}</span>
                  <span className="text-[9px] text-black/40 font-mono uppercase tracking-widest">Score</span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-sm font-bold text-black">Profile Strength</div>
                <div className="text-xs text-black/40 font-mono mt-0.5">Top 8% of candidates</div>
              </div>
            </div>

            {/* AI Tags */}
            <div className="rounded-2xl bg-zinc-50 border border-black/[0.08] p-5">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-3.5 h-3.5 text-black/50" />
                <span className="text-xs font-bold text-black/60 uppercase tracking-widest font-mono">AI Insights</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['ATS-Ready', 'Leadership', 'Full-Stack', 'Cloud-Native', 'Product-Minded', 'Data-Driven'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-black/[0.06] border border-black/[0.10] text-black/70">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: CheckCircle, label: 'ATS Pass', val: '✓' },
                { icon: Layers, label: 'Completeness', val: '96%' },
                { icon: Award, label: 'Keywords', val: '43/50' },
                { icon: Target, label: 'Relevance', val: '94%' },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="rounded-xl bg-zinc-50 border border-black/[0.06] p-3 flex flex-col gap-1">
                  <Icon className="w-3.5 h-3.5 text-black/35" />
                  <span className="text-base font-black text-black">{scanned ? val : '—'}</span>
                  <span className="text-[9px] text-black/35 font-mono uppercase tracking-widest">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Job Matches */}
          <div className="lg:col-span-1 rounded-2xl bg-zinc-50 border border-black/[0.08] overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-black/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-black/50" />
                <span className="text-xs font-bold text-black uppercase tracking-widest font-mono">Top Matches</span>
              </div>
              <span className="text-[9px] text-black/30 font-mono">{scanned ? '847 jobs' : '...'}</span>
            </div>
            <div className="flex-1 p-5 space-y-3">
              {JOB_MATCHES.map((job, i) => (
                <div
                  key={i}
                  className="group p-4 rounded-xl bg-black/[0.03] border border-black/[0.06] hover:bg-black/[0.07] hover:border-black/[0.14] transition-all duration-300 cursor-pointer"
                  onClick={() => setRoleMode('candidate')}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-bold text-black group-hover:text-black/90">{job.title}</div>
                      <div className="text-[10px] text-black/40 font-mono mt-0.5">{job.company}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-sm font-black text-black">{scanned ? job.match : '--'}%</span>
                      <ArrowUpRight className="w-3 h-3 text-black/30 group-hover:text-black/60 transition-colors" />
                    </div>
                  </div>
                  <div className="mt-2.5 h-1 rounded-full bg-black/[0.07]">
                    <div
                      className="h-full rounded-full bg-black transition-all duration-1000"
                      style={{ width: scanned ? `${job.match}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 pb-5">
              <button
                onClick={() => setRoleMode('candidate')}
                className="w-full py-2.5 rounded-xl border border-black/[0.12] text-black/70 text-xs font-semibold hover:bg-black/[0.06] hover:text-black transition-all duration-200"
              >
                View All 847 Matches →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
