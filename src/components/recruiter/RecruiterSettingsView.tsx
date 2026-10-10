import React, { useState } from 'react';
import { Sliders, ShieldCheck, Users, Lock, Save, Cpu, CheckCircle2, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RecruiterSettingsView: React.FC = () => {
  const { showToast } = useApp();
  const [settings, setSettings] = useState({
    deiAnonymization: true,
    humanInTheLoop: true,
    requiredSkillWeight: 40,
    experienceWeight: 30,
    projectWeight: 20,
    educationWeight: 10,
    bedrockModel: 'Claude 3.5 Sonnet (AWS Bedrock)',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Recruitment pipeline weights and DEI guardrails saved!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-600" />
            Recruiter Settings & Governance
          </h1>
          <p className="text-xs text-zinc-500">Configure AI screening weights, DEI blind evaluation guardrails, and human review policies.</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Governance Info */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
            <h3 className="text-xs font-bold text-emerald-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Responsible AI & Human-in-the-Loop
            </h3>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              Match scores are suitability indicators derived from vector embeddings. They are never treated as proof of future job performance.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-900">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Human Review Mandated for Hiring</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
            <h3 className="text-xs font-bold text-zinc-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-600" />
              Amazon Bedrock Engine
            </h3>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              AI screening calculations and candidate summary reasoning are generated using AWS Bedrock foundation models with SHAP-style explainability.
            </p>
          </div>
        </div>

        {/* Right 2 Columns: Settings Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-6">
            
            {/* DEI & Guardrails */}
            <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-100 pb-3">
              DEI Guardrails & Blind Screening
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                <div>
                  <div className="text-xs font-bold text-zinc-900">Amazon Bedrock PII Masking (Blind Hiring)</div>
                  <div className="text-[10px] text-zinc-500">Automatically redacts candidate names, phone, email, and photos during initial AI ranking</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.deiAnonymization}
                  onChange={e => setSettings({ ...settings, deiAnonymization: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                <div>
                  <div className="text-xs font-bold text-zinc-900">Enforce Human-in-the-Loop Review Banner</div>
                  <div className="text-[10px] text-zinc-500">Requires a recruiter sign-off checkmark before candidate shortlist status is confirmed</div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.humanInTheLoop}
                  onChange={e => setSettings({ ...settings, humanInTheLoop: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
              </div>
            </div>

            {/* AI Ranking Weights */}
            <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-100 pb-3 pt-4">
              AI Ranking Feature Weights
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-700 mb-1">
                  <span>Mandatory Required Skills</span>
                  <span>{settings.requiredSkillWeight}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={settings.requiredSkillWeight}
                  onChange={e => setSettings({ ...settings, requiredSkillWeight: Number(e.target.value) })}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-700 mb-1">
                  <span>Experience & Longevity</span>
                  <span>{settings.experienceWeight}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={settings.experienceWeight}
                  onChange={e => setSettings({ ...settings, experienceWeight: Number(e.target.value) })}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-zinc-700 mb-1">
                  <span>Project Relevance & Complexity</span>
                  <span>{settings.projectWeight}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="40"
                  value={settings.projectWeight}
                  onChange={e => setSettings({ ...settings, projectWeight: Number(e.target.value) })}
                  className="w-full accent-emerald-600"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
