import React, { useState } from 'react';
import { 
  Compass, 
  BookOpen, 
  Layers, 
  Award, 
  Send, 
  CheckCircle2, 
  Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockRoadmap } from '../../data/mockData';

export const CareerRoadmapTimeline: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'ALL' | '30 DAYS' | '60 DAYS' | '90 DAYS' | '6 MONTHS'>('ALL');
  const { showToast } = useApp();

  const filteredRoadmap = selectedPeriod === 'ALL' 
    ? mockRoadmap 
    : mockRoadmap.filter(m => m.period === selectedPeriod);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Compass className="w-5 h-5 text-blue-600" />
            AI Learning Roadmap Timeline
          </h1>
          <p className="text-xs text-slate-500">Milestone execution plan bridging candidate skill gaps over 30, 60, 90 days and 6 months.</p>
        </div>

        {/* Timeframe Filter Buttons */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200">
          {(['ALL', '30 DAYS', '60 DAYS', '90 DAYS', '6 MONTHS'] as const).map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedPeriod === period
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Container */}
      <div className="space-y-6">
        {filteredRoadmap.map((milestone) => (
          <div key={milestone.period} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold font-mono uppercase bg-blue-100 text-blue-800">
                    {milestone.period}
                  </span>
                  <span className="text-xs text-slate-500">• {milestone.duration}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{milestone.title}</h3>
                <p className="text-xs text-slate-500">{milestone.phase}</p>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                milestone.status === 'current'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {milestone.status === 'current' ? 'IN PROGRESS' : 'UPCOMING'}
              </span>
            </div>

            {/* Task Items */}
            <div className="space-y-2.5 text-xs">
              {milestone.items.map((item, idx) => {
                const getIcon = () => {
                  switch (item.type) {
                    case 'learn': return <BookOpen className="w-4 h-4 text-blue-600" />;
                    case 'project': return <Layers className="w-4 h-4 text-indigo-600" />;
                    case 'cert': return <Award className="w-4 h-4 text-emerald-600" />;
                    case 'apply': return <Send className="w-4 h-4 text-amber-600" />;
                  }
                };

                return (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                        {getIcon()}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{item.task}</div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase">Category: {item.type}</span>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {item.impact}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Verified Milestone Criteria
              </span>
              <button
                onClick={() => showToast(`Synchronized ${milestone.period} calendar alert!`)}
                className="text-blue-600 font-bold hover:underline"
              >
                Add to Calendar →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
