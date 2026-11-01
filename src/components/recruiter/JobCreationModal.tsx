import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Briefcase, 
  DollarSign, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  RotateCw,
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { apiService } from '../../services/api';

export const JobCreationModal: React.FC = () => {
  const { isJobCreateOpen, setIsJobCreateOpen, showToast } = useApp();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [title, setTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [preferredSkills, setPreferredSkills] = useState('');
  const [education, setEducation] = useState('');
  const [responsibilities, setResponsibilities] = useState('');

  if (!isJobCreateOpen) return null;

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    showToast("Amazon Bedrock is generating optimized job requisition...");
    try {
      const generated = await apiService.generateJobDescription(title || "Senior Data & Intelligence Engineer");
      setTitle(generated.title);
      setExperience(generated.experience);
      setLocation("San Francisco, CA (Hybrid / Remote)");
      setSalary(generated.salary);
      setRequiredSkills(generated.requiredSkills.join(', '));
      setPreferredSkills(generated.preferredSkills.join(', '));
      setEducation("B.S. or M.S. in Computer Science, Data Science, or related quantitative field");
      setResponsibilities(generated.responsibilities.map(r => `• ${r}`).join('\n'));
      showToast("Job requisition fields populated with AI market standards!");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      showToast("Please provide a Job Title.");
      return;
    }
    showToast(`Requisition for ${title} created and published to talent matching pool!`);
    setIsJobCreateOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="rounded-3xl bg-zinc-50 border border-black/[0.12] w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/20 relative">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-black/[0.08] flex items-center justify-between sticky top-0 bg-zinc-50/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black/[0.08] text-black flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-black">Create New Job Requisition</h2>
              <p className="text-xs text-black/50">Target requirements for automated candidate matching</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* "GENERATE WITH AI" Button */}
            <button
              type="button"
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className="px-3.5 py-2 rounded-xl bg-black text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-black/90 transition-all"
            >
              <Sparkles className={`w-3.5 h-3.5 text-white ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'AI Generating...' : 'Generate with AI'}</span>
            </button>

            <button
              onClick={() => setIsJobCreateOpen(false)}
              className="p-2 rounded-xl text-black/40 hover:text-black hover:bg-black/[0.05] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleCreateJob} className="p-6 sm:p-8 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono font-bold text-black/70 block mb-1.5 uppercase">
                Job Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Data Analyst & AI Engineer"
                className="w-full bg-white border border-black/[0.07] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-black focus:outline-none focus:ring-1 focus:ring-black/30"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-bold text-black/70 block mb-1.5 uppercase">
                Experience Range
              </label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g. 2 - 4 years"
                className="w-full bg-white border border-black/[0.07] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-black focus:outline-none focus:ring-1 focus:ring-black/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono font-bold text-black/70 block mb-1.5 uppercase">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA (Hybrid / Remote)"
                className="w-full bg-white border border-black/[0.07] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-black focus:outline-none focus:ring-1 focus:ring-black/30"
              />
            </div>

            <div>
              <label className="text-xs font-mono font-bold text-black/70 block mb-1.5 uppercase">
                Salary Benchmark
              </label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="e.g. $125,000 - $155,000 + Equity"
                className="w-full bg-white border border-black/[0.07] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-black focus:outline-none focus:ring-1 focus:ring-black/30"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono font-bold text-black/70 block mb-1.5 uppercase">
              Required Core Skills (Comma Separated) *
            </label>
            <input
              type="text"
              value={requiredSkills}
              onChange={(e) => setRequiredSkills(e.target.value)}
              placeholder="e.g. Python, SQL, AWS S3/Lambda, Git, CI/CD"
              className="w-full bg-white border border-black/[0.07] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-black focus:outline-none focus:ring-1 focus:ring-black/30"
            />
          </div>

          <div>
            <label className="text-xs font-mono font-bold text-black/70 block mb-1.5 uppercase">
              Preferred Differentiator Skills
            </label>
            <input
              type="text"
              value={preferredSkills}
              onChange={(e) => setPreferredSkills(e.target.value)}
              placeholder="e.g. Docker, Power BI, FastAPI Microservices, Scikit-Learn"
              className="w-full bg-white border border-black/[0.07] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-black focus:outline-none focus:ring-1 focus:ring-black/30"
            />
          </div>

          <div>
            <label className="text-xs font-mono font-bold text-black/70 block mb-1.5 uppercase">
              Education & Degrees
            </label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="e.g. B.S. in Computer Science or quantitative field"
              className="w-full bg-white border border-black/[0.07] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-black focus:outline-none focus:ring-1 focus:ring-black/30"
            />
          </div>

          <div>
            <label className="text-xs font-mono font-bold text-black/70 block mb-1.5 uppercase">
              Key Responsibilities & Deliverables
            </label>
            <textarea
              rows={3}
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              placeholder="• Architect and maintain high-volume data telemetry pipelines..."
              className="w-full bg-white border border-black/[0.07] rounded-xl p-3 text-xs sm:text-sm text-black focus:outline-none focus:ring-1 focus:ring-black/30"
            />
          </div>

          <div className="pt-4 border-t border-black/[0.07] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsJobCreateOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-black/40 hover:text-black"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-black hover:bg-black/90 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Publish Requisition & Match Pool</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
