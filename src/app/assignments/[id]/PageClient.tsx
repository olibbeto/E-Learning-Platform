'use client';

import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FileText, Upload, CheckCircle2, Clock, Calendar, AlertCircle } from 'lucide-react';

interface AssignmentDetail {
  id: string;
  title: string;
  course: string;
  status: 'not_submitted' | 'submitted' | 'graded';
  dueDate: string;
  maxScore: number;
  description: string;
  instructions: string[];
  resources: { name: string; url: string; size: string }[];
  grade?: number;
  feedback?: string;
  submissionDate?: string;
}

const mockAssignments: Record<string, AssignmentDetail> = {
  '1': {
    id: '1', title: 'React Basics', course: 'Frontend Web Development', status: 'not_submitted', dueDate: '2026-09-05T23:59:59', maxScore: 100,
    description: 'Build a simple React component that displays a list of items passed as props.',
    instructions: ['Initialize a new React component.', 'Accept an array of items as a prop.', 'Map over the array and render a list item for each.'],
    resources: [{ name: 'Starter template.zip', url: '#', size: '2MB' }]
  },
  '2': {
    id: '2', title: 'State Management', course: 'Frontend Web Development', status: 'submitted', dueDate: '2026-09-01T23:59:59', maxScore: 100,
    description: 'Implement complex state using useReducer.',
    instructions: ['Create a reducer function.', 'Use useReducer hook.', 'Dispatch actions to update state.'],
    resources: [],
    submissionDate: '2026-08-30T10:00:00'
  },
  '3': {
    id: '3', title: 'UI Design Patterns', course: 'UI/UX Design', status: 'graded', dueDate: '2026-08-25T23:59:59', maxScore: 100,
    description: 'Analyze modern UI design patterns.',
    instructions: ['Pick 3 popular apps.', 'Identify patterns used.', 'Write a report.'],
    resources: [],
    submissionDate: '2026-08-23T15:00:00',
    grade: 95,
    feedback: 'Excellent analysis. Keep it up!'
  }
};

function useApp() {
  const submitAssignment = (id: string, file: File) => {
    console.log(`Submitted assignment ${id} with file ${file.name}`);
  };
  return { assignments: mockAssignments, submitAssignment };
}

export default function AssignmentDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { assignments, submitAssignment } = useApp();
  const assignment = assignments[id];

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(assignment?.status !== 'not_submitted');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!assignment) {
    return (
      <div className="min-h-screen bg-[#081726] text-white">
        <Navbar />
        <div className="p-8 text-center text-white/50">Assignment not found.</div>
      </div>
    );
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const validateFile = (f: File) => {
    const ext = f.name.split('.').pop()?.toLowerCase();
    if (['pdf', 'docx', 'zip'].includes(ext || '')) {
      setFile(f);
      setError('');
    } else {
      setError('Invalid file type. Only PDF, DOCX, and ZIP are allowed.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateFile(e.target.files[0]);
    }
  };

  const handleConfirmSubmit = () => {
    if (file) {
      submitAssignment(id, file);
      setSubmitted(true);
      setShowModal(false);
    }
  };

  const timeRelative = (dateStr: string) => {
    const due = new Date(dateStr);
    const now = new Date();
    const diff = due.getTime() - now.getTime();
    if (diff < 0) return 'Overdue';
    const days = Math.ceil(diff / (1000 * 3600 * 24));
    return `In ${days} day${days !== 1 ? 's' : ''}`;
  };

  return (
    <div className="min-h-screen bg-[#081726] text-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-white/50 mb-6 flex space-x-2 items-center">
          <Link href="/my-learning" className="hover:text-white transition-colors">My Learning</Link>
          <span>/</span>
          <Link href="/assignments" className="hover:text-white transition-colors">Assignments</Link>
          <span>/</span>
          <span className="text-[#D8FF00] font-medium truncate">{assignment.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                {assignment.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#102C40] text-white/90 border border-white/10">
                  {assignment.course}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  assignment.status === 'not_submitted' 
                    ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30' 
                    : assignment.status === 'submitted' 
                    ? 'bg-blue-400/10 text-blue-300 border border-blue-400/30' 
                    : 'bg-[#D8FF00]/15 text-[#D8FF00] border border-[#D8FF00]/40'
                }`}>
                  {assignment.status.replace('_', ' ').toUpperCase()}
                </span>
                <span className="text-xs text-white/50 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-white/40" />
                  Due: {new Date(assignment.dueDate).toLocaleDateString()} ({timeRelative(assignment.dueDate)})
                </span>
              </div>
            </div>

            <div className="bg-[#0D2232] rounded-2xl border border-[#102C40] p-6 sm:p-8 space-y-6">
              <section>
                <h2 className="text-lg font-bold text-white mb-2">Description</h2>
                <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{assignment.description}</p>
              </section>
              
              <hr className="border-[#102C40]" />

              <section>
                <h3 className="text-base font-bold text-white mb-3">Instructions</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-white/70">
                  {assignment.instructions.map((inst, idx) => (
                    <li key={idx}><span className="text-white/80">{inst}</span></li>
                  ))}
                </ol>
              </section>

              {assignment.resources.length > 0 && (
                <>
                  <hr className="border-[#102C40]" />
                  <section>
                    <h3 className="text-base font-bold text-white mb-3">Attached Resources</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {assignment.resources.map((res, idx) => (
                        <a key={idx} href={res.url} className="flex items-center p-3 border border-[#102C40] rounded-xl hover:border-[#D8FF00]/50 bg-[#0A1926] transition-colors">
                          <FileText className="w-5 h-5 text-[#D8FF00] mr-3 shrink-0" />
                          <div>
                            <p className="text-xs font-medium text-white">{res.name}</p>
                            <p className="text-[11px] text-white/40">{res.size}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </section>
                </>
              )}
            </div>

            {/* Submission Section */}
            <div className="bg-[#0D2232] rounded-2xl border border-[#102C40] p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white mb-4">Submission</h2>
              
              {!submitted ? (
                <div>
                  <div 
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="border-2 border-dashed border-[#102C40] hover:border-[#D8FF00]/60 rounded-2xl p-8 text-center transition-colors bg-[#0A1926]/60 cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mx-auto h-10 w-10 text-white/40 mb-3" />
                    <p className="text-sm text-white font-medium">Drag and drop your file here, or browse</p>
                    <p className="mt-1 text-xs text-white/40">Accepted: PDF, DOCX, ZIP (Max 25MB)</p>
                    <div className="mt-4">
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }} 
                        className="px-4 py-2 bg-[#102C40] hover:bg-[#153852] border border-white/10 rounded-xl text-xs font-semibold text-white transition-colors"
                      >
                        Browse files
                      </button>
                      <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept=".pdf,.docx,.zip" />
                    </div>
                  </div>

                  {error && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  {file && (
                    <div className="mt-4 p-4 bg-[#0A1926] border border-[#102C40] rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#D8FF00]" />
                        <div>
                          <p className="text-xs font-medium text-white">{file.name}</p>
                          <p className="text-[11px] text-white/40">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setFile(null)}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setShowModal(true)}
                      disabled={!file}
                      className="px-6 py-2.5 bg-[#D8FF00] hover:bg-[#cbf200] text-black font-semibold rounded-xl text-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(216,255,0,0.3)]"
                    >
                      Submit Assignment
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-[#0A1926] border border-[#102C40] rounded-2xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 bg-[#D8FF00]/15 text-[#D8FF00] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white">Assignment Submitted!</h3>
                  <p className="text-xs text-white/60 max-w-md mx-auto">
                    Your work has been submitted successfully for evaluation. Your instructor will grade it shortly.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column / Metadata */}
          <div className="space-y-6">
            <div className="bg-[#0D2232] rounded-2xl border border-[#102C40] p-6 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Assignment Details</h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-2 border-b border-[#102C40]">
                  <span className="text-white/50">Max Score</span>
                  <span className="font-bold text-white">{assignment.maxScore} pts</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#102C40]">
                  <span className="text-white/50">Submission Type</span>
                  <span className="font-medium text-white">File Upload</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#102C40]">
                  <span className="text-white/50">Status</span>
                  <span className="font-semibold text-[#D8FF00] capitalize">{assignment.status.replace('_', ' ')}</span>
                </div>
                {assignment.grade !== undefined && (
                  <div className="flex justify-between items-center py-2 border-b border-[#102C40]">
                    <span className="text-white/50">Grade</span>
                    <span className="font-bold text-[#D8FF00] text-sm">{assignment.grade}/{assignment.maxScore}</span>
                  </div>
                )}
                {assignment.feedback && (
                  <div className="pt-2">
                    <span className="text-white/50 block mb-1">Feedback</span>
                    <p className="p-3 bg-[#0A1926] border border-[#102C40] rounded-xl text-white/80 italic text-xs">
                      "{assignment.feedback}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0D2232] border border-[#102C40] rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2">Confirm Submission</h3>
            <p className="text-xs text-white/70 mb-6">
              Are you sure you want to submit <strong className="text-white">{file?.name}</strong>? You can only submit once.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-transparent hover:bg-white/5 text-white/70 hover:text-white rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="px-4 py-2 bg-[#D8FF00] text-black font-semibold rounded-xl text-xs shadow-[0_0_15px_rgba(216,255,0,0.4)]"
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
