import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  UploadCloud, 
  RefreshCw, 
  Cpu, 
  Award, 
  GraduationCap, 
  Briefcase, 
  AlertCircle,
  Info,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockApiService } from '../../services/mockApi';

export const ResumeAnalysisView: React.FC = () => {
  const { profile, setProfile, showToast } = useApp();
  const [isReanalyzing, setIsReanalyzing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    // Format validation
    const validFormats = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validFormats.includes(file.type) && !file.name.endsWith('.pdf') && !file.name.endsWith('.docx')) {
      setUploadError('Unsupported file format. Please upload a PDF or DOCX file.');
      return;
    }

    setIsReanalyzing(true);
    showToast('Executing AWS Textract & Bedrock extraction pipeline...');
    try {
      const res = await mockApiService.analyzeResume(file);
      setProfile(res.profile);
      showToast('Resume parsed cleanly! Extracted skills, experience, and education.');
    } catch (err) {
      setUploadError('Failed to parse resume. Please ensure the file is not corrupted.');
    } finally {
      setIsReanalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Resume Analyzer & Skill Extraction
          </h1>
          <p className="text-xs text-slate-500">Multi-layer document parsing with explicit line provenance and AI improvement recommendations.</p>
        </div>

        <label className="cursor-pointer px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all shadow-sm flex items-center gap-2">
          <UploadCloud className="w-4 h-4" />
          <span>Upload PDF / DOCX</span>
          <input type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={handleFileUpload} />
        </label>
      </div>

      {uploadError && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Upload Zone & Document Structure */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Dropzone Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-6 text-center space-y-2 bg-slate-50/50 transition-all cursor-pointer relative">
              <input type="file" accept=".pdf,.docx,.txt" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} />
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900">Drag & drop your resume file here, or browse</span>
                <p className="text-[11px] text-slate-500 mt-0.5">Supports PDF and DOCX files up to 10MB</p>
              </div>
            </div>

            {isReanalyzing && (
              <div className="space-y-2 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span>Parsing AWS Textract OCR & Bedrock LLM...</span>
                  <span>75%</span>
                </div>
                <div className="h-1.5 bg-blue-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full shimmer-bg" style={{ width: '75%' }} />
                </div>
              </div>
            )}
          </div>

          {/* Structured Resume Content */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Structured Extracted Facts</h3>
              <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                Verified Facts
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Extracted Skills</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {profile.skills.map((s) => (
                    <span key={s.name} className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 font-medium">
                      {s.name} ({s.level}%)
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Work Experience</span>
                {profile.experience.map((exp, idx) => (
                  <div key={idx} className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-slate-900">{exp.title}</div>
                    <div className="text-[11px] text-slate-500">{exp.company} • {exp.period}</div>
                  </div>
                ))}
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Education</span>
                <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900">{profile.education[0].degree}</div>
                  <div className="text-[11px] text-slate-500">{profile.education[0].institution} • {profile.education[0].score}</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Provenance & Recommendations */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Explicit vs Inferred Provenance */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Skill Provenance & Line Evidence
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold font-mono">
                  <span className="text-blue-800 uppercase">Explicit Stated Evidence</span>
                  <span className="px-1.5 py-0.2 bg-blue-600 text-white rounded">Text Match</span>
                </div>
                <p className="text-[11px] text-blue-900 font-mono">
                  "Architected automated ETL pipelines in Python & SQL processing 2.4M daily telemetry events."
                </p>
                <div className="text-[10px] text-blue-700">Source: Resume Line 55</div>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold font-mono">
                  <span className="text-purple-800 uppercase">AI Inferred Capability</span>
                  <span className="px-1.5 py-0.2 bg-purple-600 text-white rounded">Context Inferred</span>
                </div>
                <p className="text-[11px] text-purple-900 font-mono">
                  High-throughput data streaming & telemetry architecture inferred from 2.4M daily volume metric.
                </p>
                <div className="text-[10px] text-purple-700">Source: Amazon Bedrock Inference</div>
              </div>
            </div>
          </div>

          {/* AI Improvement Recommendations */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              AI Resume Improvement Suggestions
            </h3>

            <div className="space-y-3 text-xs">
              {[
                { title: 'Add Docker & Containerization Keywords', desc: 'Include containerization tools to match 85% of target Cloud Analyst positions.' },
                { title: 'Quantify Project Outcomes', desc: 'Specify percentage latency reduction or cost savings achieved in your Health Portal project.' },
                { title: 'Highlight AWS Certifications', desc: 'Prominently position AWS Certified Cloud Practitioner at the top of credentials.' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900">{item.title}</div>
                  <p className="text-[11px] text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
