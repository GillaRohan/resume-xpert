import React, { useState } from 'react';
import { 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sliders, 
  Users, 
  Search, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  FileText, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RecruiterCandidate } from '../../types';

export const AIScreeningView: React.FC = () => {
  const { recruiterCandidates, setRecruiterTab, showToast } = useApp();
  const [selectedCandidate, setSelectedCandidate] = useState<RecruiterCandidate>(recruiterCandidates[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'experience' | 'name'>('score');
  const [deiBlindMode, setDeiBlindMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [humanReviewed, setHumanReviewed] = useState<Record<string, boolean>>({});

  // Filter & Sort
  const filtered = recruiterCandidates
    .filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.targetRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.aiReasoning.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'score') return b.matchScore - a.matchScore;
      if (sortBy === 'experience') return b.yearsExperience - a.yearsExperience;
      return a.name.localeCompare(b.name);
    });

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map(c => c.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleHumanReview = (id: string) => {
    setHumanReviewed(prev => ({ ...prev, [id]: true }));
    showToast(`Human review confirmed for ${deiBlindMode ? `Candidate #${selectedCandidate.rank}` : selectedCandidate.name}.`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Page Title & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            Candidate Ranking & Smart AI Screening
          </h1>
          <p className="text-xs text-zinc-500">Vector-based matching driven by Amazon Bedrock embeddings and explainable feature attribution.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* DEI Blind Screening Toggle */}
          <button
            onClick={() => {
              setDeiBlindMode(!deiBlindMode);
              showToast(deiBlindMode ? "PII Unmasked." : "DEI Blind Screening Active (PII Redacted).");
            }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              deiBlindMode 
                ? 'bg-purple-50 border-purple-300 text-purple-800 ring-2 ring-purple-500/20' 
                : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-100'
            }`}
          >
            {deiBlindMode ? <EyeOff className="w-4 h-4 text-purple-600" /> : <Eye className="w-4 h-4 text-zinc-500" />}
            <span>DEI Blind Mode</span>
          </button>

          <button
            onClick={() => setRecruiterTab('compare')}
            className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-all flex items-center gap-1.5"
          >
            <Users className="w-4 h-4 text-emerald-600" />
            Compare Top Candidates
          </button>

          <button
            onClick={() => setRecruiterTab('explainable')}
            className="px-3 py-1.5 rounded-xl bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-all flex items-center gap-1.5"
          >
            <Sliders className="w-4 h-4" />
            Explainable AI Weights
          </button>
        </div>
      </div>

      {/* Mandatory Human-in-the-Loop Governance Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <span className="font-extrabold block text-amber-950 mb-0.5">
            ⚖️ Responsible AI Governance & Human Review Policy
          </span>
          AI match scores represent suitability indices calculated from vector similarity and skill evidence. Match scores **do not constitute proof of future job performance**. Demographic attributes (age, gender, ethnicity) are strictly excluded from AI ranking algorithms. **Human recruiter verification is required prior to final hiring decisions.**
        </div>
      </div>

      {/* Filter & Table Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by candidate or skill..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Sort & Bulk Select */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <span className="text-xs font-semibold text-zinc-500 font-mono">Sort By:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-white border border-zinc-200 text-xs font-semibold text-zinc-800 focus:outline-none"
          >
            <option value="score">Match Score (High to Low)</option>
            <option value="experience">Years Experience</option>
            <option value="name">Candidate Name</option>
          </select>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 5 Cols: Candidate List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 font-mono px-1">
            <span>SHOWING {filtered.length} CANDIDATES</span>
            <span>{selectedIds.length} SELECTED</span>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filtered.map(c => {
              const isSelected = selectedCandidate.id === c.id;
              const isChecked = selectedIds.includes(c.id);
              const displayName = deiBlindMode ? `Candidate #${c.rank}` : c.name;
              const displayAvatar = deiBlindMode ? `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80` : c.avatar;

              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCandidate(c)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                      : 'bg-white border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => { e.stopPropagation(); toggleSelectOne(c.id); }}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                      <div className="relative">
                        <img
                          src={displayAvatar}
                          alt={displayName}
                          className="w-10 h-10 rounded-xl object-cover border border-zinc-200"
                        />
                        <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-zinc-900 text-white text-[9px] font-bold font-mono flex items-center justify-center">
                          #{c.rank}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                          {displayName}
                          {humanReviewed[c.id] && (
                            <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[9px] rounded font-mono font-bold">REVIEWED</span>
                          )}
                        </h3>
                        <p className="text-[10px] text-zinc-500">{c.targetRole} • {c.yearsExperience} yrs exp</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-extrabold text-emerald-600 font-mono">
                        {c.matchScore}%
                      </span>
                      <p className="text-[9px] font-bold text-zinc-500 uppercase">{c.label}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-zinc-100 text-[10px] text-zinc-500 font-mono">
                    <span>Req Skills: {c.requiredSkillsMet}/{c.requiredSkillsTotal}</span>
                    <span>Pref Skills: {c.preferredSkillsMet}/{c.preferredSkillsTotal}</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      Audit Profile <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 7 Cols: Detailed Candidate Audit */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm space-y-6">
            
            {/* Header Readout */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-4">
                <img
                  src={deiBlindMode ? `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80` : selectedCandidate.avatar}
                  alt={deiBlindMode ? `Candidate #${selectedCandidate.rank}` : selectedCandidate.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-zinc-200"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded">
                      #{selectedCandidate.rank} RANKED APPLICANT
                    </span>
                    <span className="text-[11px] text-zinc-500">• {selectedCandidate.yearsExperience} yrs experience</span>
                  </div>
                  <h2 className="text-xl font-bold text-zinc-900 mt-1">
                    {deiBlindMode ? `Candidate #${selectedCandidate.rank}` : selectedCandidate.name}
                  </h2>
                  <p className="text-xs text-zinc-500">{deiBlindMode ? '[Institution Redacted for DEI Blind Screening]' : selectedCandidate.education}</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-50 border border-emerald-200 min-w-[100px]">
                <span className="text-2xl font-black text-emerald-600 font-mono">
                  {selectedCandidate.matchScore}%
                </span>
                <span className="text-[9px] font-bold text-emerald-800 uppercase font-mono">
                  {selectedCandidate.label}
                </span>
              </div>
            </div>

            {/* Score Breakdown Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                <span className="text-[9px] font-bold text-zinc-400 font-mono uppercase">Required Skills</span>
                <p className="text-base font-extrabold text-zinc-900 font-mono mt-0.5">
                  {selectedCandidate.requiredSkillsMet}/{selectedCandidate.requiredSkillsTotal}
                </p>
                <span className="text-[9px] text-emerald-600 font-semibold">Explicitly Verified</span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                <span className="text-[9px] font-bold text-zinc-400 font-mono uppercase">Preferred Skills</span>
                <p className="text-base font-extrabold text-zinc-900 font-mono mt-0.5">
                  {selectedCandidate.preferredSkillsMet}/{selectedCandidate.preferredSkillsTotal}
                </p>
                <span className="text-[9px] text-zinc-500 font-semibold">80% Overlap</span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                <span className="text-[9px] font-bold text-zinc-400 font-mono uppercase">Project Relevance</span>
                <p className="text-base font-extrabold text-zinc-900 font-mono mt-0.5">
                  {selectedCandidate.projectRelevance}%
                </p>
                <span className="text-[9px] text-zinc-500 font-semibold">High Complexity</span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                <span className="text-[9px] font-bold text-zinc-400 font-mono uppercase">Evidence Provenance</span>
                <p className="text-xs font-extrabold text-blue-600 mt-1">
                  Line Provenance
                </p>
                <span className="text-[9px] text-zinc-500 font-semibold">Explicit Quotes</span>
              </div>
            </div>

            {/* WHY THIS CANDIDATE (AI Reason) */}
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  WHY THIS CANDIDATE? (AI MATCH REASONING)
                </h4>
              </div>

              <div className="space-y-1.5">
                {selectedCandidate.whyThisCandidate.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SKILL PROVENANCE BREAKDOWN (Explicit vs Inferred) */}
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
              <h4 className="text-xs font-bold text-zinc-900 font-mono uppercase">
                SKILL TAXONOMY PROVENANCE
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white border border-zinc-200 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold font-mono">
                    <span className="text-blue-700 uppercase">Explicitly Stated Evidence</span>
                    <span className="px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded">Text Verified</span>
                  </div>
                  <p className="text-[11px] text-zinc-600">
                    "Architected automated ETL pipelines in Python & SQL processing 2.4M daily telemetry events."
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-zinc-200 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold font-mono">
                    <span className="text-purple-700 uppercase">Inferred Information</span>
                    <span className="px-1.5 py-0.2 bg-purple-100 text-purple-800 rounded">Context Derived</span>
                  </div>
                  <p className="text-[11px] text-zinc-600">
                    Inferred data warehousing & distributed systems knowledge based on 2.4M daily event volume.
                  </p>
                </div>
              </div>
            </div>

            {/* IDENTIFIED SKILL GAPS */}
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2">
              <div className="flex items-center gap-2 text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                  IDENTIFIED SKILL GAPS & RECOMMENDATIONS
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedCandidate.skillGaps.map(gap => (
                  <span key={gap} className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-xs font-semibold text-amber-900">
                    ⚠️ {gap}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => handleHumanReview(selectedCandidate.id)}
                className={`flex-1 w-full py-3 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                  humanReviewed[selectedCandidate.id]
                    ? 'bg-emerald-700 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {humanReviewed[selectedCandidate.id] ? 'Human Review Confirmed ✓' : 'Confirm Human Review & Shortlist'}
                </span>
              </button>

              <button
                onClick={() => setRecruiterTab('explainable')}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-800 hover:bg-zinc-200 text-xs font-semibold transition-all"
              >
                Inspect SHAP Feature Attribution
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
