import React, { useState } from 'react';
import { User, Mail, MapPin, Phone, Award, Shield, CheckCircle2, Save, Cpu, Bell, Key } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CandidateProfileView: React.FC = () => {
  const { profile, setProfile, showToast } = useApp();
  const [formData, setFormData] = useState({
    name: profile.name,
    headline: profile.headline,
    email: profile.email,
    location: profile.location,
    phone: profile.phone,
    targetRole: 'Data Analyst — Growth & AI',
    bedrockModel: 'Claude 3.5 Sonnet (AWS Bedrock us-east-1)',
    emailAlerts: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(prev => ({
      ...prev,
      name: formData.name,
      headline: formData.headline,
      email: formData.email,
      location: formData.location,
      phone: formData.phone,
    }));
    showToast('Profile & AI Settings updated successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            My Profile & Preferences
          </h1>
          <p className="text-xs text-zinc-500">Manage your student credentials, target career preferences, and AI model parameters.</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all shadow-sm"
        >
          <Save className="w-4 h-4" />
          Save Preferences
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Summary Card */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-blue-600 text-white font-extrabold text-2xl flex items-center justify-center mx-auto shadow-md">
              {formData.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900">{formData.name}</h2>
              <p className="text-xs text-zinc-500 mt-1">{formData.headline}</p>
            </div>

            <div className="pt-4 border-t border-zinc-200 grid grid-cols-2 gap-2 text-left">
              <div className="p-3 rounded-xl bg-white border border-zinc-200">
                <div className="text-[9px] font-bold text-zinc-400 font-mono uppercase">Readiness</div>
                <div className="text-sm font-extrabold text-blue-600 mt-0.5">{profile.careerReadiness}/100</div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-zinc-200">
                <div className="text-[9px] font-bold text-zinc-400 font-mono uppercase">Resume Health</div>
                <div className="text-sm font-extrabold text-emerald-600 mt-0.5">{profile.scores.resumeHealth}%</div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
            <h3 className="text-xs font-bold text-blue-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600" />
              AWS Bedrock Model Config
            </h3>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Your resume analysis and career roadmap are executed using Amazon Bedrock foundation models with low-latency JSON schema validation.
            </p>
            <div className="p-2.5 rounded-lg bg-white border border-blue-200 text-[11px] font-mono text-blue-900">
              Model: {formData.bedrockModel}
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Editable Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-6">
            <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-100 pb-3">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Full Name</label>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50 focus-within:bg-white focus-within:border-blue-500">
                  <User className="w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="flex-1 bg-transparent text-xs text-zinc-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Email Address</label>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50 focus-within:bg-white focus-within:border-blue-500">
                  <Mail className="w-4 h-4 text-zinc-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="flex-1 bg-transparent text-xs text-zinc-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Location</label>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50 focus-within:bg-white focus-within:border-blue-500">
                  <MapPin className="w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="flex-1 bg-transparent text-xs text-zinc-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Phone Number</label>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50 focus-within:bg-white focus-within:border-blue-500">
                  <Phone className="w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="flex-1 bg-transparent text-xs text-zinc-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Professional Headline</label>
              <input
                type="text"
                value={formData.headline}
                onChange={e => setFormData({ ...formData, headline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50 text-xs text-zinc-900 focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            <h3 className="text-sm font-bold text-zinc-900 border-b border-zinc-100 pb-3 pt-4">
              AI Engine & Notification Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">Default Foundation Model</label>
                <select
                  value={formData.bedrockModel}
                  onChange={e => setFormData({ ...formData, bedrockModel: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50 text-xs text-zinc-900 focus:outline-none"
                >
                  <option value="Claude 3.5 Sonnet (AWS Bedrock us-east-1)">Anthropic Claude 3.5 Sonnet (AWS Bedrock)</option>
                  <option value="Meta Llama 3 70B (AWS Bedrock us-east-1)">Meta Llama 3 70B Instruct (AWS Bedrock)</option>
                  <option value="Amazon Titan Text Express">Amazon Titan Text Express v1</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-zinc-500" />
                  <div>
                    <div className="text-xs font-bold text-zinc-900">Career Match Alerts</div>
                    <div className="text-[10px] text-zinc-500">Receive email alerts when a job match score exceeds 90%</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.emailAlerts}
                  onChange={e => setFormData({ ...formData, emailAlerts: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
