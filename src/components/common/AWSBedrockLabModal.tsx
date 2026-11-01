import React, { useState, useEffect } from 'react';
import { 
  X, 
  Cpu, 
  Sparkles, 
  Send, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Copy, 
  Check, 
  RefreshCw,
  Database,
  FileCheck,
  Server,
  Code
} from 'lucide-react';
import { apiService } from '../../services/api';

interface AWSBedrockLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: string;
  defaultCandidateName?: string;
}

export const AWSBedrockLabModal: React.FC<AWSBedrockLabModalProps> = ({ 
  isOpen, 
  onClose,
  defaultRole = 'Cloud & Data Platform Engineer',
  defaultCandidateName = 'Candidate'
}) => {
  const [activeTab, setActiveTab] = useState<'studio' | 'telemetry'>('studio');
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>('bullet_optimizer');
  const [selectedModel, setSelectedModel] = useState<string>('anthropic.claude-3-5-sonnet-20240620-v1:0');
  const [temperature, setTemperature] = useState<number>(0.7);
  const [prompt, setPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const [copied, setCopied] = useState<boolean>(false);
  
  // Telemetry state
  const [telemetry, setTelemetry] = useState<any>(null);
  const [isLoadingTelemetry, setIsLoadingTelemetry] = useState<boolean>(false);

  const workflowPresets: Record<string, { label: string; icon: string; defaultPrompt: string; desc: string }> = {
    bullet_optimizer: {
      label: 'STAR Bullet Optimizer',
      icon: '⚡',
      desc: 'Transforms weak resume bullet points into high-impact STAR framework statements with cloud metrics.',
      defaultPrompt: 'Transform this resume bullet: "Helped maintain databases and built scripts to process data on cloud." into 3 high-impact, quantified bullets emphasizing AWS S3, Lambda, and query performance optimization.'
    },
    cover_letter: {
      label: 'Bedrock Cover Letter Generator',
      icon: '✉️',
      desc: 'Generates a tailored, professional cover letter matching applicant skills to target cloud requirements.',
      defaultPrompt: `Generate a compelling, data-centric cover letter for a ${defaultRole} role highlighting AWS services, high-throughput pipeline design, and vector search matching.`
    },
    guardrails_audit: {
      label: 'DEI & PII Guardrails Audit',
      icon: '🛡️',
      desc: 'Simulates Bedrock Guardrails to detect and redact candidate PII, ensuring DEI-compliant recruitment.',
      defaultPrompt: 'Audit candidate profile data for PII compliance: Candidate Alex Morgan (email: alex.m@nexus.io, phone: 415-555-0199) applied for Senior Cloud Engineer. Ensure zero demographic bias and redact personal identifiers.'
    },
    rubric_generator: {
      label: 'Technical Interview Rubric',
      icon: '📋',
      desc: 'Produces an objective, 5-pillar candidate scoring rubric with weighted competencies and pass thresholds.',
      defaultPrompt: `Synthesize a standardized 5-pillar evaluation rubric for assessing a ${defaultRole} with weighted criteria across cloud architecture, SQL, system design, and communication.`
    },
    custom: {
      label: 'Custom Bedrock Prompt',
      icon: '✨',
      desc: 'Direct interactive prompt access to Amazon Bedrock foundation models with configurable parameters.',
      defaultPrompt: 'Explain how Amazon Bedrock Titan Text Embeddings (1536-dimensional) achieve sub-50ms candidate-to-job cosine similarity matching in Resume Xpert.'
    }
  };

  useEffect(() => {
    if (workflowPresets[selectedWorkflow]) {
      setPrompt(workflowPresets[selectedWorkflow].defaultPrompt);
    }
  }, [selectedWorkflow]);

  useEffect(() => {
    if (isOpen) {
      loadTelemetry();
    }
  }, [isOpen]);

  const loadTelemetry = async () => {
    setIsLoadingTelemetry(true);
    try {
      const data = await apiService.getBedrockTelemetry();
      setTelemetry(data);
    } catch (err) {
      console.error("Failed to load telemetry:", err);
    } finally {
      setIsLoadingTelemetry(false);
    }
  };

  const handleRunInference = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setResult(null);

    try {
      const response = await apiService.generateBedrockPrompt({
        prompt,
        workflowType: selectedWorkflow,
        modelId: selectedModel,
        temperature,
        targetRole: defaultRole,
        candidateName: defaultCandidateName
      });
      setResult(response);
    } catch (err) {
      setResult({
        success: false,
        generatedText: "Error communicating with Amazon Bedrock API. Please check your AWS credentials or network connection.",
        latencyMs: 0,
        tokensUsed: 0,
        modelId: selectedModel
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!result?.generatedText) return;
    navigator.clipboard.writeText(result.generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20 text-white">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">Amazon Bedrock GenAI Studio</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  LIVE WORKSPACE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Interactive Foundation Model Playground, STAR Optimizer & Real-Time Cloud Telemetry
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-800 px-6 bg-slate-900/60">
          <button
            onClick={() => setActiveTab('studio')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'studio'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            GenAI Workflow Studio
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'telemetry'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            AWS Telemetry & Metrics
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'studio' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Controls & Prompt */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Workflow Selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Select GenAI Workflow
                  </label>
                  <div className="space-y-1.5">
                    {Object.entries(workflowPresets).map(([key, item]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedWorkflow(key)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl border text-xs transition-all flex items-start gap-2.5 ${
                          selectedWorkflow === key
                            ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                            : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                        }`}
                      >
                        <span className="text-base leading-none">{item.icon}</span>
                        <div>
                          <div className="font-semibold">{item.label}</div>
                          <div className="text-[11px] text-slate-400 leading-snug line-clamp-1">{item.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Model Selector */}
                <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                      Foundation Model
                    </label>
                    <span className="text-[10px] text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded">
                      Amazon Bedrock
                    </span>
                  </div>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="anthropic.claude-3-5-sonnet-20240620-v1:0">
                      Anthropic Claude 3.5 Sonnet (Recommended)
                    </option>
                    <option value="anthropic.claude-3-haiku-20240307-v1:0">
                      Anthropic Claude 3 Haiku (Ultra-Fast)
                    </option>
                    <option value="amazon.titan-text-express-v1">
                      Amazon Titan Text Express v1
                    </option>
                    <option value="meta.llama3-70b-instruct-v1:0">
                      Meta Llama 3 70B Instruct (Bedrock Hosted)
                    </option>
                  </select>

                  {/* Temperature slider */}
                  <div className="pt-2">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Temperature (Creativity)</span>
                      <span className="font-mono text-indigo-400">{temperature}</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 h-1.5 bg-slate-700 rounded cursor-pointer"
                    />
                  </div>
                </div>

                {/* Prompt Textarea */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Prompt Instruction
                    </label>
                    <span className="text-[11px] text-slate-500">
                      {prompt.length} chars
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter prompt instruction for Bedrock..."
                    className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none font-sans"
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleRunInference}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Invocating Amazon Bedrock Engine...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Run Bedrock Inference
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: Output & Performance Card */}
              <div className="lg:col-span-7 flex flex-col h-full bg-slate-850 border border-slate-800 rounded-2xl p-5 space-y-4">
                
                {/* Output Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Bedrock Foundation Model Response
                    </span>
                  </div>

                  {result && (
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        ⚡ {result.latencyMs} ms
                      </span>
                      <span className="text-[11px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                        🎯 {result.tokensUsed} tokens
                      </span>
                      <button
                        onClick={handleCopy}
                        className="p-1.5 text-slate-400 hover:text-white rounded bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1 text-xs"
                        title="Copy to Clipboard"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}
                </div>

                {/* Output Display */}
                <div className="flex-1 bg-slate-900/90 border border-slate-800/80 rounded-xl p-4 overflow-y-auto min-h-[300px]">
                  {isGenerating ? (
                    <div className="h-full flex flex-col items-center justify-center space-y-3 py-16 text-slate-400">
                      <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                      <p className="text-xs font-medium animate-pulse">
                        Executing inference across Amazon Bedrock runtime...
                      </p>
                      <span className="text-[11px] text-slate-500 font-mono">
                        Model: {selectedModel}
                      </span>
                    </div>
                  ) : result ? (
                    <div className="space-y-4">
                      <div className="prose prose-invert max-w-none text-xs leading-relaxed text-slate-200 whitespace-pre-wrap font-sans">
                        {result.generatedText}
                      </div>
                      
                      {result.guardrailsPassed && (
                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                          <span className="flex items-center gap-1.5 text-emerald-400">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Amazon Bedrock Guardrails Passed (PII Masked, DEI Verified)
                          </span>
                          <span className="font-mono text-slate-500">{result.engine}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center py-16 text-slate-500 space-y-2">
                      <Sparkles className="w-8 h-8 text-slate-600 mb-1" />
                      <p className="text-xs font-medium text-slate-400">No Bedrock response generated yet</p>
                      <p className="text-[11px] text-slate-500 text-center max-w-xs">
                        Select a preset workflow on the left or enter a custom prompt, then click "Run Bedrock Inference".
                      </p>
                    </div>
                  )}
                </div>

                {/* Quick Info Footer */}
                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <span className="block text-[10px] text-slate-400">Target Role</span>
                    <span className="text-xs font-semibold text-slate-200 truncate block">{defaultRole}</span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <span className="block text-[10px] text-slate-400">Vector Engine</span>
                    <span className="text-xs font-semibold text-indigo-300">Titan Embeddings (1536d)</span>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                    <span className="block text-[10px] text-slate-400">OCR Extraction</span>
                    <span className="text-xs font-semibold text-emerald-300">AWS Textract Multi-Page</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeTab === 'telemetry' && (
            <div className="space-y-6">
              
              {/* Telemetry Refresh Bar */}
              <div className="flex items-center justify-between bg-slate-800/40 border border-slate-700/60 p-3.5 rounded-xl">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Live AWS Architecture Metrics
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Real-time ingestion and inference throughput telemetry across connected AWS services
                  </p>
                </div>
                <button
                  onClick={loadTelemetry}
                  disabled={isLoadingTelemetry}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingTelemetry ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>

              {telemetry ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Bedrock Telemetry Card */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-indigo-400" />
                        <h4 className="text-xs font-bold text-white uppercase">Amazon Bedrock GenAI</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        Operational
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[11px] text-slate-400 block">Total Invocations</span>
                        <span className="font-bold text-white text-base font-mono">{telemetry.bedrock.totalInvocations}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">Tokens Processed</span>
                        <span className="font-bold text-white text-base font-mono">{telemetry.bedrock.totalTokensProcessed.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">Average Latency</span>
                        <span className="font-bold text-emerald-400 text-sm font-mono">{telemetry.bedrock.averageLatencyMs} ms</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">Guardrail Blocks</span>
                        <span className="font-bold text-amber-400 text-sm font-mono">{telemetry.bedrock.guardrailViolationsBlocked} PII</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-700/40 text-[11px] text-slate-400">
                      <span className="text-slate-500">Active Models: </span>
                      {telemetry.bedrock.activeModels.join(', ')}
                    </div>
                  </div>

                  {/* Textract Telemetry Card */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-xs font-bold text-white uppercase">AWS Textract OCR</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Operational
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[11px] text-slate-400 block">Resumes Ingested</span>
                        <span className="font-bold text-white text-base font-mono">{telemetry.textract.documentsIngested}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">Pages Parsed</span>
                        <span className="font-bold text-white text-base font-mono">{telemetry.textract.pagesParsed}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">Average OCR Confidence</span>
                        <span className="font-bold text-emerald-400 text-sm font-mono">{telemetry.textract.averageConfidence}%</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">Avg Parse Time</span>
                        <span className="font-bold text-indigo-300 text-sm font-mono">{telemetry.textract.averageProcessingTimeSec}s</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-700/40 text-[11px] text-slate-400">
                      <span className="text-slate-500">Extraction Features: </span>
                      Raw Text, Key-Value Pairs, Complex Tabular Layouts
                    </div>
                  </div>

                  {/* S3 Storage Card */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-amber-400" />
                        <h4 className="text-xs font-bold text-white uppercase">Amazon S3 Document Lake</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Encrypted
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[11px] text-slate-400 block">Target S3 Bucket</span>
                        <span className="font-mono text-white text-xs truncate block">{telemetry.s3.bucket}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">Storage Consumed</span>
                        <span className="font-bold text-white text-base font-mono">{telemetry.s3.storageUsedMb} MB</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">Encryption Standard</span>
                        <span className="font-bold text-emerald-400 text-xs font-mono">{telemetry.s3.encryption}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">Security Perimeter</span>
                        <span className="font-bold text-indigo-300 text-xs">{telemetry.s3.publicAccessBlock}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-700/40 text-[11px] text-slate-400">
                      <span className="text-slate-500">Target Region: </span>
                      {telemetry.s3.region}
                    </div>
                  </div>

                  {/* Titan Vector OpenSearch Card */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-purple-400" />
                        <h4 className="text-xs font-bold text-white uppercase">Titan Embeddings & Vectors</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        1536-Dim
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[11px] text-slate-400 block">Indexed Vectors</span>
                        <span className="font-bold text-white text-base font-mono">{telemetry.opensearch_vectors.vectorCount}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">Vector Queries Served</span>
                        <span className="font-bold text-white text-base font-mono">{telemetry.opensearch_vectors.vectorQueriesServed.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">Mean Cosine Match</span>
                        <span className="font-bold text-purple-300 text-sm font-mono">{telemetry.opensearch_vectors.averageCosineSimilarity}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">Query Latency</span>
                        <span className="font-bold text-emerald-400 text-sm font-mono">{telemetry.opensearch_vectors.queryLatencyMs} ms</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-700/40 text-[11px] text-slate-400">
                      <span className="text-slate-500">Vector Model: </span>
                      amazon.titan-embed-text-v1
                    </div>
                  </div>

                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 text-xs">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-400" />
                  Connecting to AWS CloudWatch & Bedrock Telemetry...
                </div>
              )}

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>AWS Bedrock Runtime Connected</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors"
          >
            Close Studio
          </button>
        </div>

      </div>
    </div>
  );
};

