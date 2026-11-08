'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useApp } from '@/context/AppContext';
import { Award, ChevronDown, ChevronUp, FileText } from 'lucide-react';

export default function GradesPage() {
  const { grades } = useApp();
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const gradeEntries = grades && grades.length > 0 ? grades : [
    { id: '1', assignment: 'React Basics', course: 'Web Development', type: 'Assignment', score: 95, maxScore: 100, date: '2026-08-25' },
    { id: '2', assignment: 'State Management Quiz', course: 'Web Development', type: 'Quiz', score: 80, maxScore: 100, date: '2026-08-28' },
    { id: '3', assignment: 'UI Design Patterns', course: 'HCI', type: 'Assignment', score: 88, maxScore: 100, date: '2026-08-20' },
    { id: '4', assignment: 'Color Theory', course: 'HCI', type: 'Quiz', score: 100, maxScore: 100, date: '2026-08-15' },
    { id: '5', assignment: 'Algorithms', course: 'Programming', type: 'Assignment', score: 72, maxScore: 100, date: '2026-08-10' },
  ];

  // Computed data
  const totalScore = gradeEntries.reduce((acc: number, g: any) => acc + (g.score / g.maxScore) * 100, 0);
  const overallAverage = Math.round(totalScore / gradeEntries.length);
  
  const getLetter = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  // Group by course
  const coursesMap = gradeEntries.reduce((acc: any, entry: any) => {
    const cName = entry.courseName || entry.course || 'General';
    if (!acc[cName]) acc[cName] = { entries: [], total: 0 };
    acc[cName].entries.push(entry);
    acc[cName].total += (entry.score / entry.maxScore) * 100;
    return acc;
  }, {});

  const courses = Object.keys(coursesMap).map(courseName => ({
    name: courseName,
    average: Math.round(coursesMap[courseName].total / coursesMap[courseName].entries.length),
    entries: coursesMap[courseName].entries
  }));

  const chartData = courses.map(c => ({
    name: c.name,
    score: c.average
  }));

  return (
    <div className="min-h-screen bg-[#081726] text-white flex flex-col font-sans selection:bg-[#D8FF00] selection:text-black">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10 flex-1 w-full">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Grades & <span className="text-[#D8FF00]">Performance</span>
          </h1>
          <p className="text-white/60 mt-1.5 text-sm sm:text-base">
            Detailed performance breakdown, GPA indicators, and individual assignment scores.
          </p>
        </div>

        {/* Top Section: Overall & Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Overall Average Card */}
          <div className="bg-[#0D2232] rounded-3xl border border-white/10 p-8 shadow-2xl flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3">Overall Academic Average</span>
            <div className="flex items-baseline justify-center gap-4 mb-3">
              <span className="text-6xl font-black text-white tracking-tight">{overallAverage}%</span>
              <span className="text-4xl font-black text-[#D8FF00] drop-shadow-[0_0_10px_rgba(216,255,0,0.4)]">
                {getLetter(overallAverage)}
              </span>
            </div>
            <p className="text-xs text-white/50">Calculated across {gradeEntries.length} evaluated tasks</p>
          </div>

          {/* Bar Chart Section */}
          <div className="lg:col-span-2 bg-[#0D2232] rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base font-bold text-white">Course Performance Comparison</h2>
              <span className="text-xs font-semibold text-[#D8FF00]">Average Scores (%)</span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} domain={[0, 100]} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#102C40', borderColor: 'rgba(255,255,255,0.15)', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#D8FF00' }}
                  />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#D8FF00" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Course Breakdown List */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight">Course Breakdown</h2>
          
          <div className="space-y-4">
            {courses.map(c => {
              const isExpanded = expandedCourse === c.name;
              return (
                <div key={c.name} className="bg-[#0D2232] rounded-2xl border border-white/10 shadow-lg overflow-hidden transition-all">
                  <div 
                    onClick={() => setExpandedCourse(isExpanded ? null : c.name)}
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <div>
                      <h3 className="text-base font-bold text-white">{c.name}</h3>
                      <p className="text-xs text-white/50 mt-0.5">{c.entries.length} graded assignments</p>
                    </div>
                    
                    <div className="flex items-center gap-5">
                      <div className="text-right">
                        <span className="text-xl font-black text-[#D8FF00]">{c.average}%</span>
                        <span className="text-xs font-bold text-white/50 ml-2">({getLetter(c.average)})</span>
                      </div>
                      <div className="p-1 rounded-full bg-white/5 text-white/70">
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-white/10 space-y-2">
                      {c.entries.map((entry: any) => (
                        <div key={entry.id} className="flex items-center justify-between p-3 rounded-xl bg-[#081726]/60 border border-white/5 text-xs">
                          <div className="flex items-center gap-2.5">
                            <FileText className="w-4 h-4 text-[#D8FF00]" />
                            <span className="font-bold text-white">{entry.assignment || entry.title}</span>
                            <span className="text-white/40">({entry.type})</span>
                          </div>
                          <div className="font-bold text-[#D8FF00]">
                            {entry.score} / {entry.maxScore} ({Math.round((entry.score / entry.maxScore) * 100)}%)
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
