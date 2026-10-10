import React, { useState } from 'react';
import { Briefcase, PlusCircle, Sparkles, Filter, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RecruiterJobRequirementsView: React.FC = () => {
  const { setIsJobCreateOpen } = useApp();

  const mockJobs = [
    {
      id: 'job-req-1',
      title: 'Senior Data Analyst — Telemetry & Growth',
      department: 'Data Intelligence',
      location: 'San Francisco, CA / Remote',
      type: 'Full-Time',
      candidatesCount: 342,
      mandatorySkills: ['Python', 'SQL', 'Data Pipelines', 'Git'],
      preferredSkills: ['AWS S3/Lambda', 'Tableau', 'Docker'],
      minExperience: '2 - 4 years',
      status: 'Active Recruiting',
    },
    {
      id: 'job-req-2',
      title: 'Associate Cloud AI Engineer',
      department: 'AI & Engineering',
      location: 'Austin, TX / Remote',
      type: 'Full-Time',
      candidatesCount: 184,
      mandatorySkills: ['Python', 'Machine Learning', 'FastAPI'],
      preferredSkills: ['PyTorch', 'AWS Bedrock', 'Docker', 'PostgreSQL'],
      minExperience: '1 - 3 years',
      status: 'Active Recruiting',
    },
    {
      id: 'job-req-3',
      title: 'Full Stack Web Developer (React / TS)',
      department: 'Frontend Products',
      location: 'New York, NY / Hybrid',
      type: 'Full-Time',
      candidatesCount: 520,
      mandatorySkills: ['React', 'TypeScript', 'Tailwind CSS', 'REST API'],
      preferredSkills: ['Next.js', 'Vite', 'Jest', 'CI/CD'],
      minExperience: '3 - 5 years',
      status: 'Reviewing Shortlist',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-600" />
            Job Requirements & Requisitions
          </h1>
          <p className="text-xs text-zinc-500">Define mandatory and preferred skills to drive Amazon Bedrock vector matching for candidate ranking.</p>
        </div>
        <button
          onClick={() => setIsJobCreateOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          Create New Job Profile
        </button>
      </div>

      {/* Requisition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockJobs.map(job => (
          <div key={job.id} className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:border-emerald-300 transition-all space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold font-mono uppercase bg-emerald-100 text-emerald-800">
                  {job.status}
                </span>
                <h3 className="text-sm font-bold text-zinc-900 mt-2">{job.title}</h3>
                <p className="text-[11px] text-zinc-500">{job.department} • {job.location}</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-100">
              <div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Mandatory Skills</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {job.mandatorySkills.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] font-semibold text-zinc-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Preferred Skills</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {job.preferredSkills.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded bg-emerald-50 text-[10px] font-semibold text-emerald-800">
                      + {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold">
              <span className="text-zinc-500 font-mono text-[11px]">{job.candidatesCount} Candidates Applied</span>
              <button
                onClick={() => setIsJobCreateOpen(true)}
                className="text-emerald-700 hover:text-emerald-900 underline text-[11px]"
              >
                Edit Criteria
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
