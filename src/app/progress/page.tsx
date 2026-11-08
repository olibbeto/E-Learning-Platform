'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle, Award, Star, Flame, Moon, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const achievements = [
  { id: 1, title: 'First Steps', description: 'Complete your first lesson', earnedDate: '2026-08-15', icon: CheckCircle, earned: true },
  { id: 2, title: 'Quiz Master', description: 'Score 100% on a quiz', earnedDate: '2026-08-20', icon: Award, earned: true },
  { id: 3, title: 'Assignment Ace', description: 'Submit 5 assignments', earnedDate: '2026-08-25', icon: Star, earned: true },
  { id: 4, title: 'Streak: 7 Days', description: 'Log in for 7 consecutive days', earnedDate: null, icon: Flame, earned: false },
  { id: 5, title: 'Night Owl', description: 'Complete a lesson after 10 PM', earnedDate: null, icon: Moon, earned: false },
];

const weeklyActivity = [
  { day: 'Mon', lessons: 2 },
  { day: 'Tue', lessons: 1 },
  { day: 'Wed', lessons: 3 },
  { day: 'Thu', lessons: 0 },
  { day: 'Fri', lessons: 2 },
  { day: 'Sat', lessons: 1 },
  { day: 'Sun', lessons: 0 },
];

export default function ProgressPage() {
  const router = useRouter();
  const { enrolledCourses } = useApp();

  const handleContinue = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };

  const coursesList = enrolledCourses && enrolledCourses.length > 0 ? enrolledCourses : [
    { id: 'c1', title: 'Human-Computer Interaction (HCI)', progress: 72 },
    { id: 'c2', title: 'Web Development Fundamentals', progress: 45 },
    { id: 'c3', title: 'Cybersecurity Fundamentals', progress: 28 },
  ];

  const overallProgress = 68;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallProgress / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#081726] text-white flex flex-col font-sans selection:bg-[#D8FF00] selection:text-black">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 flex-1 w-full">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Learning <span className="text-[#D8FF00]">Progress</span>
          </h1>
          <p className="text-white/60 mt-1.5 text-sm sm:text-base">
            Analytics, study velocity, course milestones, and earned certificates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Overall Progress Gauge */}
          <div className="bg-[#0D2232] p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-6">Overall Completion</span>
            <div className="relative flex items-center justify-center w-40 h-40">
              <svg className="transform -rotate-90 w-40 h-40">
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#D8FF00"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out drop-shadow-[0_0_10px_#D8FF00]"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-white tracking-tight">{overallProgress}%</span>
                <span className="text-[10px] text-[#D8FF00] font-bold uppercase tracking-wider mt-0.5">On Track</span>
              </div>
            </div>
            <p className="text-xs text-white/50 mt-6">Based on completed course modules</p>
          </div>

          {/* Course Progress */}
          <div className="bg-[#0D2232] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl lg:col-span-2 flex flex-col justify-between">
            <h2 className="text-base font-bold text-white mb-6">Enrolled Course Velocity</h2>
            <div className="space-y-6">
              {coursesList.map((course: any) => (
                <div key={course.id || course.courseId}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-white">{course.title || course.name}</span>
                    <span className="text-sm font-black text-[#D8FF00]">{course.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-[#D8FF00] h-full rounded-full shadow-[0_0_8px_#D8FF00] transition-all duration-500"
                      style={{ width: `${course.progress || 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Activity & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Activity Chart */}
          <div className="bg-[#0D2232] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-base font-bold text-white mb-6">Weekly Lesson Activity</h2>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity}>
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#102C40', borderColor: 'rgba(255,255,255,0.15)', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#D8FF00' }}
                  />
                  <Bar dataKey="lessons" fill="#D8FF00" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-[#0D2232] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-base font-bold text-white mb-6">Earned Achievements</h2>
            <div className="space-y-3">
              {achievements.map((item) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.id}
                    className={`flex items-center gap-4 p-3.5 rounded-2xl border transition-all ${
                      item.earned 
                        ? 'bg-[#081726]/60 border-[#D8FF00]/30 text-white' 
                        : 'bg-[#081726]/30 border-white/5 text-white/40 opacity-50'
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${item.earned ? 'bg-[#D8FF00] text-black shadow-[0_0_10px_#D8FF00]' : 'bg-white/10 text-white/40'}`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white">{item.title}</h4>
                      <p className="text-[11px] text-white/50">{item.description}</p>
                    </div>
                    {item.earned && (
                      <span className="text-[10px] font-bold text-[#D8FF00] bg-[#D8FF00]/15 px-2.5 py-0.5 rounded-full border border-[#D8FF00]/30">
                        Earned
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
