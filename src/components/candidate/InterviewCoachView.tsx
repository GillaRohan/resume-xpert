import React, { useState } from 'react';
import { 
  Mic, 
  Sparkles, 
  Play, 
  RefreshCw, 
  CheckCircle2, 
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockApiService } from '../../services/mockApi';

export const InterviewCoachView: React.FC = () => {
  const { profile, showToast } = useApp();
  const [activeCategory, setActiveCategory] = useState<'technical' | 'hr' | 'behavioral' | 'project'>('technical');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMockRunning, setIsMockRunning] = useState(false);
  const [mockFeedbackShown, setMockFeedbackShown] = useState(false);
  const [userAnswerText, setUserAnswerText] = useState('');

  const questionsDatabase = {
    technical: {
      question: "How did you optimize your SQL queries to reduce response times from 420ms down to 110ms?",
      context: "Experience: Software Developer Apprentice at Kinetix",
      focus: ["B-Tree vs Hash Indexing", "EXPLAIN ANALYZE execution plans", "Query restructuring"],
    },
    hr: {
      question: "Why are you targeting Data Analyst & AI Pipeline roles right now?",
      context: "Career Readiness Evaluation",
      focus: ["Passion for telemetry derivation", "Connecting raw metrics with business revenue"],
    },
    behavioral: {
      question: "Describe a situation where unexpected data anomalies threatened a reporting deadline.",
      context: "STAR Method Drill",
      focus: ["Situation with corrupted CSV feeds", "Pydantic schema validation", "100% data integrity outcome"],
    },
    project: {
      question: "Walk us through how your AI Resume Analyzer parses and compares skill vectors.",
      context: "Project: AI Resume & Career Fit Analyzer",
      focus: ["Vector embeddings cosine similarity", "Handling synonyms", "FastAPI performance"],
    }
  };

  const currentQ = questionsDatabase[activeCategory];

  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    showToast("Synthesizing context-grounded interview questions...");
    await mockApiService.generateInterviewQuestions(activeCategory);
    setIsGenerating(false);
    showToast("Questions refreshed based on current profile!");
  };

  const handleStartMock = () => {
    setIsMockRunning(true);
    setMockFeedbackShown(false);
    showToast("Mock interview session started. Enter your answer below.");
  };

  const handleSubmitMock = () => {
    setIsMockRunning(false);
    setMockFeedbackShown(true);
    showToast("AI Feedback synthesized across 4 core interview metrics!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Mic className="w-5 h-5 text-blue-600" />
            Mock Interview Coach & Debrief
          </h1>
          <p className="text-xs text-slate-500">Practice role-specific technical, HR, behavioral, and project interview questions.</p>
        </div>

        <div className="p-3 px-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center gap-3">
          <div>
            <div className="text-[10px] font-mono font-bold text-blue-800 uppercase">Interview Readiness</div>
            <div className="text-xl font-extrabold text-blue-600 font-mono">78%</div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200">
        {(['technical', 'hr', 'behavioral', 'project'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setMockFeedbackShown(false); }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
              activeCategory === cat ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {cat} Drills
          </button>
        ))}
      </div>

      {/* Main Question Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-mono font-bold text-blue-600 uppercase">{currentQ.context}</span>
          <span className="text-xs font-mono text-slate-400">AI Curated Question</span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          "{currentQ.question}"
        </h3>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
          <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">Recommended Focus Dimensions:</span>
          <div className="flex flex-wrap gap-1.5">
            {currentQ.focus.map((f) => (
              <span key={f} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-medium">
                • {f}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={handleStartMock}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all shadow-sm flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Practice Drill</span>
          </button>

          <button
            onClick={handleGenerateQuestions}
            disabled={isGenerating}
            className="px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 text-xs font-semibold transition-all flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>Generate New Questions</span>
          </button>
        </div>

        {/* Mock Input */}
        {isMockRunning && (
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-3 pt-4">
            <div className="flex items-center justify-between text-xs font-bold text-blue-900 font-mono">
              <span>Answer Recording / Text Input</span>
              <span>Live Session Active</span>
            </div>
            <textarea
              rows={3}
              value={userAnswerText}
              onChange={(e) => setUserAnswerText(e.target.value)}
              placeholder="Type your structured answer here (STAR method: Situation, Task, Action, Result)..."
              className="w-full p-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleSubmitMock}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all shadow-sm"
              >
                Submit for Instant AI Debrief
              </button>
            </div>
          </div>
        )}

        {/* Feedback Report */}
        {mockFeedbackShown && (
          <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-emerald-900 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>AI Debrief Feedback (Overall Rating: 88% - Strong Performance)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-2">
              <div className="p-2.5 rounded-lg bg-white border border-emerald-200">
                <span className="text-[9px] font-bold text-slate-400 font-mono uppercase">Communication</span>
                <p className="text-sm font-extrabold text-emerald-600 font-mono mt-0.5">90%</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-emerald-200">
                <span className="text-[9px] font-bold text-slate-400 font-mono uppercase">Tech Accuracy</span>
                <p className="text-sm font-extrabold text-emerald-600 font-mono mt-0.5">85%</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-emerald-200">
                <span className="text-[9px] font-bold text-slate-400 font-mono uppercase">Relevance</span>
                <p className="text-sm font-extrabold text-emerald-600 font-mono mt-0.5">92%</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-emerald-200">
                <span className="text-[9px] font-bold text-slate-400 font-mono uppercase">Confidence</span>
                <p className="text-sm font-extrabold text-emerald-600 font-mono mt-0.5">86%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
