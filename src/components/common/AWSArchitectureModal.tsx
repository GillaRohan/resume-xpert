import React from 'react';
import { X, Cpu, Database, ShieldCheck, FileText, Layers, ExternalLink, CheckCircle2, AlertTriangle } from 'lucide-react';

interface AWSArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AWSArchitectureModal: React.FC<AWSArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-zinc-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-600 font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                AWS Generative AI Architecture
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-100 text-blue-700 rounded-full">
                  Enterprise Ready
                </span>
              </h2>
              <p className="text-xs text-zinc-500">Cloud Blueprint & Generative AI Pipeline Specifications</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Honest Demo Notice */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">Prototype & Simulated Data Notice</span>
              This frontend prototype demonstrates the production-ready AWS GenAI architecture interface. Active AI results, model scoring, and telemetry are rendered using high-fidelity mock data unless a live AWS backend endpoint is connected.
            </div>
          </div>

          {/* Architecture Diagram Steps */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
              Pipeline Workflow & AWS Services
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Step 1 */}
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white font-mono text-xs flex items-center justify-center font-bold">
                    1
                  </div>
                  <span className="text-xs font-bold text-zinc-900">Document Ingestion & OCR</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-600">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-semibold text-zinc-800">AWS Textract + Amazon S3</span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  PDF & DOCX files are securely uploaded to Amazon S3 buckets. AWS Textract parses raw text, multi-column tables, and structured resume layouts.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-orange-600 text-white font-mono text-xs flex items-center justify-center font-bold">
                    2
                  </div>
                  <span className="text-xs font-bold text-zinc-900">LLM Feature Extraction</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-600">
                  <Cpu className="w-3.5 h-3.5 text-orange-600" />
                  <span className="font-semibold text-zinc-800">Amazon Bedrock (Claude 3.5 Sonnet)</span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Extracts candidate skills, education, work experience, and project metrics into a validated JSON schema with explicit line-level provenance.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-mono text-xs flex items-center justify-center font-bold">
                    3
                  </div>
                  <span className="text-xs font-bold text-zinc-900">Vector Embeddings & RAG</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-600">
                  <Database className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-semibold text-zinc-800">OpenSearch Serverless + Titan Embeddings</span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Generates 1536-dimensional vector embeddings for candidate Skill DNA and performs cosine similarity search against job descriptions.
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-mono text-xs flex items-center justify-center font-bold">
                    4
                  </div>
                  <span className="text-xs font-bold text-zinc-900">Responsible AI & Guardrails</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-600">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="font-semibold text-zinc-800">Amazon Bedrock Guardrails</span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Filters PII (Personally Identifiable Information) for blind candidate screening, prevents toxic outputs, and ensures bias-free evaluation.
                </p>
              </div>

            </div>
          </div>

          {/* Security & Credentials */}
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 space-y-2">
            <h4 className="text-xs font-bold text-blue-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              Security & Credential Best Practices
            </h4>
            <ul className="text-[11px] text-blue-800 space-y-1 list-disc list-inside">
              <li>All AWS credentials (IAM Access Keys, Secrets) are executed exclusively on server-side AWS Lambda / ECS endpoints.</li>
              <li>Frontend code strictly communicates via API Gateway using JWT OAuth authorization headers.</li>
              <li>S3 bucket permissions enforce server-side encryption (SSE-KMS) and zero public read access.</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-100 bg-zinc-50">
          <span className="text-xs text-zinc-500 font-mono">AWS Region: us-east-1 (N. Virginia)</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
