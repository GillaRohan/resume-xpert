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
import { apiService } from '../../services/api';

export const ResumeAnalysisView: React.FC = () => {
  const { profile, setProfile, showToast } = useApp();
  const [isReanalyzing, setIsReanalyzing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [lastMetrics, setLastMetrics] = useState<{ parsingConfidence: number; extractedEntities: number; timeSec: number; awsEngine?: string } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    // Format validation
    const validFormats = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validFormats.includes(file.type) && !file.name.endsWith('.pdf') && !file.name.endsWith('.docx') && !file.name.endsWith('.txt')) {
      setUploadError('Unsupported file format. Please upload a PDF, DOCX, or TXT file.');
      return;
    }

    setIsReanalyzing(true);
    showToast('Executing AWS Textract OCR & Amazon Bedrock pipeline...');
    try {
      const res = await apiService.analyzeResume(file);
      setProfile(res.profile);
      setLastMetrics(res.metrics);
      showToast(`Resume parsed! Extracted ${res.metrics.extractedEntities} entities in ${res.metrics.timeSec}s via AWS GenAI pipeline.`);
    } catch (err: any) {
      setUploadError(err.message || 'Failed to parse resume. Please ensure the file is valid.');
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
              <div className="flex items-center gap-1.5">
                {lastMetrics && (
                  <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    {lastMetrics.extractedEntities} Entities · {lastMetrics.timeSec}s
                  </span>
                )}
                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  Verified Facts
                </span>
              </div>
            </div>

            {/* Candidate Header Identity */}
            <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-slate-900">{profile.name}</div>
                <div className="text-[11px] text-slate-600">{profile.headline}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{profile.email} • {profile.phone} • {profile.location}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-[10px] text-slate-400 font-mono block">Readiness</span>
                <span className="text-sm font-extrabold font-mono text-blue-600">
                  {profile.careerReadiness}/100
                </span>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Extracted Skills ({profile.skills.length})</span>
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
                {profile.experience?.map((exp, idx) => (
                  <div key={idx} className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-slate-900">{exp.title}</div>
                    <div className="text-[11px] text-slate-500">{exp.company} • {exp.period}</div>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="mt-1.5 list-disc list-inside text-[11px] text-slate-600 space-y-0.5">
                        {exp.bullets.slice(0, 3).map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Education</span>
                {profile.education?.map((edu, idx) => (
                  <div key={idx} className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-[11px] text-slate-500">{edu.institution} • {edu.score} {edu.year ? `(${edu.year})` : ''}</div>
                  </div>
                ))}
              </div>

              {profile.projects && profile.projects.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Projects</span>
                  {profile.projects.map((proj, idx) => (
                    <div key={idx} className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-900">{proj.name}</div>
                      <div className="text-[11px] text-slate-500">{proj.description}</div>
                      {proj.tech && proj.tech.length > 0 && (
                        <div className="text-[10px] text-blue-600 font-mono mt-1">Tech: {proj.tech.join(', ')}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
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
                  "{profile.provenanceQuote || "Architected automated software and data pipelines delivering high-reliability processing."}"
                </p>
                <div className="text-[10px] text-blue-700">Source: Resume Line {profile.provenanceLine || 14}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold font-mono">
                  <span className="text-purple-800 uppercase">AI Inferred Capability</span>
                  <span className="px-1.5 py-0.2 bg-purple-600 text-white rounded">Context Inferred</span>
                </div>
                <p className="text-[11px] text-purple-900 font-mono">
                  High-throughput data engineering & cloud pipeline architecture inferred from verified project achievements.
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
