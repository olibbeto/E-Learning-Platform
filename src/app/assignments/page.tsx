'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Clock, CheckCircle2, AlertCircle, FileCheck, ArrowRight } from 'lucide-react';

function AssignmentCard({ assignment }: { assignment: any }) {
  const isGraded = assignment.status === 'graded';
  const isSubmitted = assignment.status === 'submitted';

  return (
    <div className="border border-white/10 hover:border-[#D8FF00]/40 rounded-2xl p-5 bg-[#0D2232] hover:bg-[#112d42] shadow-lg transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <h3 className="text-base font-bold text-white group-hover:text-[#D8FF00] transition-colors">
            {assignment.title}
          </h3>
          {isGraded ? (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#D8FF00]/15 text-[#D8FF00] border border-[#D8FF00]/30">
              Graded: {assignment.score ?? assignment.grade ?? 95}%
            </span>
          ) : isSubmitted ? (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
              Submitted
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400/15 text-amber-400 border border-amber-400/30">
              Pending
            </span>
          )}
        </div>
        <p className="text-xs text-white/60">{assignment.courseName || assignment.course}</p>
        <p className="text-xs text-white/40 mt-1 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#D8FF00]" />
          Due: {new Date(assignment.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      <div>
        <Link 
          href={`/assignments/${assignment.id}`} 
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-black bg-[#D8FF00] hover:bg-[#cbf000] shadow-[0_0_12px_rgba(216,255,0,0.25)] transition-all"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default function AssignmentsPage() {
  const { assignments } = useApp();
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Submitted' | 'Graded'>('Upcoming');

  const list = assignments || [];
  const upcoming = list.filter((a: any) => a.status === 'not_submitted');
  const submitted = list.filter((a: any) => a.status === 'submitted');
  const graded = list.filter((a: any) => a.status === 'graded');

  const getActiveList = () => {
    switch (activeTab) {
      case 'Upcoming': return upcoming;
      case 'Submitted': return submitted;
      case 'Graded': return graded;
      default: return [];
    }
  };

  const activeList = getActiveList();

  return (
    <div className="min-h-screen bg-[#081726] text-white flex flex-col font-sans selection:bg-[#D8FF00] selection:text-black">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 flex-1 w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Course <span className="text-[#D8FF00]">Assignments</span>
          </h1>
          <p className="text-white/60 mt-1.5 text-sm sm:text-base">
            Track submissions, deadlines, and instructor feedback across all enrolled courses.
          </p>
        </div>

        {/* Summary Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0D2232] p-5 rounded-2xl border border-white/10 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Total Assignments</p>
            <p className="text-2xl font-black text-white mt-1.5">{list.length}</p>
          </div>
          <div className="bg-[#0D2232] p-5 rounded-2xl border border-white/10 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Pending Due</p>
            <p className="text-2xl font-black text-[#D8FF00] mt-1.5">{upcoming.length}</p>
          </div>
          <div className="bg-[#0D2232] p-5 rounded-2xl border border-white/10 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Submitted</p>
            <p className="text-2xl font-black text-blue-400 mt-1.5">{submitted.length}</p>
          </div>
          <div className="bg-[#0D2232] p-5 rounded-2xl border border-white/10 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Graded</p>
            <p className="text-2xl font-black text-emerald-400 mt-1.5">{graded.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['Upcoming', 'Submitted', 'Graded'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap py-2 px-5 rounded-full text-xs font-bold transition-all min-h-[38px]
                ${activeTab === tab 
                  ? 'bg-[#D8FF00] text-black shadow-[0_0_15px_rgba(216,255,0,0.3)]' 
                  : 'bg-[#0D2232] text-white/70 hover:text-white border border-white/10 hover:bg-[#122e44]'}
              `}
            >
              {tab} ({tab === 'Upcoming' ? upcoming.length : tab === 'Submitted' ? submitted.length : graded.length})
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-4">
          {activeList.length === 0 ? (
            <div className="text-center py-16 bg-[#0D2232] rounded-2xl border border-white/10">
              <CheckCircle2 className="w-12 h-12 text-[#D8FF00]/40 mx-auto mb-3" />
              <p className="text-white font-bold text-base">No assignments in this category.</p>
              <p className="text-xs text-white/50 mt-1">You are up to date on all work!</p>
            </div>
          ) : (
            activeList.map((assignment: any) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
