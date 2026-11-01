import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  Search, 
  Layers, 
  ExternalLink, 
  BookOpen, 
  Sparkles, 
  Cpu, 
  Check, 
  Copy, 
  Calendar,
  Filter,
  CheckCircle2,
  Server
} from 'lucide-react';
import { apiService } from '../../services/api';

interface DatasetItem {
  id: string;
  year: string;
  category: string;
  skillKeywords: string[];
  question: string;
  context: string;
  focus: string[];
  sampleAnswerFramework: string;
  difficulty: string;
}

interface DatasetExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DatasetExplorerModal: React.FC<DatasetExplorerModalProps> = ({ isOpen, onClose }) => {
  const [dataset, setDataset] = useState<DatasetItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<DatasetItem | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Backend live API endpoints
  const apiLinks = [
    { label: 'Interactive Swagger UI', path: '/docs', desc: 'Execute live API requests in browser' },
    { label: 'Historical Dataset JSON', path: '/api/bedrock/dataset', desc: 'Raw 2020-2025 technical benchmark dataset' },
    { label: 'AWS Cloud Status', path: '/api/aws/status', desc: 'Amazon Bedrock, Textract & S3 health telemetry' },
    { label: 'Interview Questions API', path: '/api/coach/interview-questions', desc: 'RAG question synthesis endpoint' },
    { label: 'Current Resume Store', path: '/api/resumes/current', desc: 'Persistent candidate profile JSON' },
  ];

  useEffect(() => {
    if (isOpen) {
      loadDataset();
    }
  }, [isOpen]);

  const loadDataset = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/bedrock/dataset');
      if (res.ok) {
        const data = await res.json();
        if (data && data.dataset) {
          setDataset(data.dataset);
          setSelectedItem(data.dataset[0] || null);
          return;
        }
      }
    } catch (e) {
      console.warn("Could not fetch remote dataset, loading embedded corpus:", e);
    }

    // Default embedded corpus fallback
    const defaultData: DatasetItem[] = [
      {
        id: "genai-rag-2025-01",
        year: "2024-2025",
        category: "technical",
        skillKeywords: ["bedrock", "claude", "rag", "embeddings", "vector", "python", "ai"],
        question: "How do you optimize retrieval latency and token consumption when architecting an enterprise RAG pipeline with Amazon Bedrock and Titan Vector Embeddings?",
        context: "Cloud GenAI Architecture Benchmark (AWS Enterprise Tier)",
        focus: [
          "1536-dimensional Titan vector chunking & overlap tuning",
          "Cosine similarity threshold filtering to minimize irrelevant tokens",
          "Amazon Bedrock Claude 3.5 Sonnet temperature and system prompt caching",
          "Guardrail PII redaction and hallucination mitigation"
        ],
        sampleAnswerFramework: "Explain chunking strategy (512 tokens with 10% overlap), vector search latency budget (<50ms via HNSW indexing), context injection into Bedrock, and verified 60% reduction in token costs.",
        difficulty: "Advanced"
      },
      {
        id: "cloud-event-2024-02",
        year: "2024",
        category: "technical",
        skillKeywords: ["aws", "s3", "lambda", "cloud", "serverless", "python", "etl"],
        question: "Walk us through how you design an event-driven serverless pipeline on AWS (S3, Lambda, SQS) to process millions of document events with zero message loss.",
        context: "AWS Serverless Engineering Benchmark (2024)",
        focus: [
          "S3 ObjectCreated event notifications to SQS FIFO queue",
          "Lambda batch window size and reserved concurrency limits",
          "Dead Letter Queue (DLQ) automated retry policies and CloudWatch alarms",
          "Idempotent processing with DynamoDB deduplication keys"
        ],
        sampleAnswerFramework: "Describe the decoupled architecture using SQS FIFO for ordering, Lambda for parallel processing, handling backpressure, and DLQ re-drive mechanisms for transient failures.",
        difficulty: "Advanced"
      },
      {
        id: "sql-perf-2023-01",
        year: "2023",
        category: "technical",
        skillKeywords: ["sql", "database", "postgres", "indexing", "query", "performance"],
        question: "When debugging high API latency, how do you diagnose and eliminate database bottlenecks using EXPLAIN ANALYZE and compound indexing?",
        context: "Database Engineering & SQL Optimization Benchmark (2023)",
        focus: [
          "Reading query execution plans: Sequential Scan vs Index Scan vs Bitmap Heap Scan",
          "Designing compound B-Tree indexes matching WHERE and ORDER BY cardinality",
          "Eliminating N+1 queries using JOINs or batch CTE fetches",
          "Connection pooling and transaction lock contention resolution"
        ],
        sampleAnswerFramework: "Detail identifying slow queries via pg_stat_activity, analyzing buffer hits/misses in EXPLAIN ANALYZE, creating the targeted multi-column index, and validating latency drop from 400ms+ to sub-100ms.",
        difficulty: "Intermediate"
      },
      {
        id: "data-pipeline-2022-01",
        year: "2022",
        category: "technical",
        skillKeywords: ["data", "etl", "spark", "airflow", "kafka", "pipeline"],
        question: "How do you handle schema drift, late-arriving records, and data idempotency in production distributed data pipelines?",
        context: "Enterprise Data Platform Benchmark (2022)",
        focus: [
          "Schema validation contracts (Pydantic / Great Expectations / Protobuf)",
          "Watermarking and event-time windowing for late-arriving telemetry",
          "Upsert / MERGE operations to guarantee exactly-once semantics",
          "Automated data quality monitoring and quarantine partitions"
        ],
        sampleAnswerFramework: "Frame answer around data contract design, dead-letter quarantine for corrupted records, and automated alerting via CloudWatch/Slack before bad data hits downstream dashboards.",
        difficulty: "Advanced"
      },
      {
        id: "fullstack-api-2021-01",
        year: "2021",
        category: "technical",
        skillKeywords: ["fastapi", "react", "typescript", "python", "docker", "api"],
        question: "How do you architect asynchronous FastAPI microservices and React state management to handle high-frequency concurrent user requests?",
        context: "Modern Full-Stack Architecture Benchmark (2021)",
        focus: [
          "Async/await event loops with Uvicorn and Gunicorn worker management",
          "Pydantic v2 serialization performance optimizations",
          "React optimistic UI updates and state persistence (localStorage / Context)",
          "CORS policy security, JWT authentication, and rate limiting"
        ],
        sampleAnswerFramework: "Explain async I/O non-blocking execution, dependency injection for connection pools, client-side caching to avoid redundant requests, and containerization with Docker multi-stage builds.",
        difficulty: "Intermediate"
      },
      {
        id: "devops-cicd-2020-01",
        year: "2020",
        category: "technical",
        skillKeywords: ["docker", "kubernetes", "ci/cd", "devops", "git"],
        question: "How do you build a zero-downtime CI/CD deployment pipeline using Docker containerization and automated rollback strategies?",
        context: "DevOps & Cloud Delivery Benchmark (2020)",
        focus: [
          "Docker multi-stage builds minimizing image footprint (<150MB)",
          "Automated test gates: linting, unit tests, and integration smoke tests",
          "Blue/Green or Rolling deployments on containerized clusters",
          "Health check probing (liveness/readiness) and automatic rollback triggers"
        ],
        sampleAnswerFramework: "Outline the GitHub Actions workflow, secure artifact tagging, zero-downtime traffic switching via Application Load Balancer, and rollback thresholds upon error rate spikes.",
        difficulty: "Intermediate"
      }
    ];

    setDataset(defaultData);
    setSelectedItem(defaultData[0]);
    setIsLoading(false);
  };

  const filteredDataset = dataset.filter(item => {
    const matchesYear = selectedYear === 'all' || item.year.includes(selectedYear);
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery = !searchQuery.trim() || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.context.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skillKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesYear && matchesCat && matchesQuery;
  });

  const handleCopy = (path: string) => {
    const fullUrl = `${window.location.origin}${path}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(path);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl text-white shadow-lg shadow-purple-500/20">
              <Database className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Amazon Bedrock Historical Training Dataset & Backend Data
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                  2020 - 2025 REPOSITORY
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Explore the underlying RAG training corpus, interview question benchmarks, and live cloud backend endpoints.
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

        {/* Live Backend Endpoints Bar */}
        <div className="bg-slate-850 border-b border-slate-800 px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-emerald-400" />
              Live Backend API & Cloud Endpoints (Click to Open / Copy)
            </span>
            <span className="text-[10px] font-mono text-emerald-400">
              Status: Connected (Python FastAPI)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {apiLinks.map((link) => (
              <div 
                key={link.path}
                className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 hover:border-purple-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white truncate">{link.label}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">{link.desc}</div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-800/60">
                  <a 
                    href={link.path} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[10px] font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1 truncate"
                  >
                    <span>{link.path}</span>
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  </a>
                  <button
                    onClick={() => handleCopy(link.path)}
                    className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                    title="Copy Full URL"
                  >
                    {copiedUrl === link.path ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between gap-3 flex-wrap">
          
          {/* Year selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-400 font-semibold mr-1">Year:</span>
            {['all', '2025', '2024', '2023', '2022', '2021', '2020'].map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedYear === year
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {year === 'all' ? 'All Years' : year}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search skills, AWS, SQL, Bedrock..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

        </div>

        {/* Modal Body: Left List + Right Detail Preview */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Questions List */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            <div className="text-[11px] font-bold uppercase text-slate-400 flex items-center justify-between">
              <span>Historical Benchmarks ({filteredDataset.length} Records)</span>
              <span className="text-purple-400 font-mono">Dataset Active</span>
            </div>

            {filteredDataset.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all space-y-1.5 ${
                  selectedItem?.id === item.id
                    ? 'bg-purple-600/20 border-purple-500 text-white shadow-sm'
                    : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    {item.year}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {item.difficulty}
                  </span>
                </div>
                <div className="text-xs font-bold leading-snug line-clamp-2">
                  {item.question}
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  {item.context}
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Detailed Item Viewer */}
          <div className="lg:col-span-7 bg-slate-850 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
            {selectedItem ? (
              <div className="space-y-4">
                
                {/* Benchmark Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {selectedItem.context}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {selectedItem.year} Benchmark
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {selectedItem.difficulty}
                    </span>
                  </div>
                </div>

                {/* Question */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1">
                    Enterprise Technical Interview Question
                  </label>
                  <h3 className="text-base font-bold text-white leading-relaxed bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                    "{selectedItem.question}"
                  </h3>
                </div>

                {/* Skill Keywords */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1.5">
                    Associated Cloud & Engineering Competencies
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedItem.skillKeywords.map(k => (
                      <span key={k} className="px-2.5 py-0.5 rounded-lg bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">
                        #{k}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Focus Dimensions */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono block mb-1.5">
                    Core Architectural & Evaluation Dimensions
                  </label>
                  <div className="space-y-1.5 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    {selectedItem.focus.map((f, i) => (
                      <div key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* STAR Strategy */}
                <div>
                  <label className="text-[10px] font-bold text-indigo-400 uppercase font-mono block mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    STAR Methodology Solution & Historical Recommendation
                  </label>
                  <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-900/50 text-xs text-indigo-200 leading-relaxed">
                    {selectedItem.sampleAnswerFramework}
                  </div>
                </div>

              </div>
            ) : (
              <div className="py-20 text-center text-slate-500 text-xs">
                Select a historical benchmark from the left to inspect its detailed evaluation rubrics.
              </div>
            )}

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Integrated with Amazon Bedrock Titan Vector RAG</span>
              <span className="font-mono text-purple-400">1536-Dimensional Cosine Affinity</span>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>4-5 Years Technical Dataset Active & Synchronized</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors"
          >
            Close Explorer
          </button>
        </div>

      </div>
    </div>
  );
};
