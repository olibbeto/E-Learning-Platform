'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  CheckCircle, 
  PlayCircle,
  TrendingUp, 
  Award, 
  ChevronRight,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { useApp } from '@/context/AppContext';

export default function DashboardPage() {
  const { enrolledCourses, allCourses, assignments, currentUser } = useApp();
  const [greeting, setGreeting] = useState('Good morning');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setGreeting('Good afternoon');
    else if (hour >= 17) setGreeting('Good evening');
    else setGreeting('Good morning');
  }, []);

  const upcomingAssignments = assignments
    ? assignments.filter((a: any) => a.status === 'not_submitted' && new Date(a.dueDate) >= new Date())
    : [];

  const recommendedCourses = allCourses
    ? allCourses.filter((c: any) => !enrolledCourses?.some((ec: any) => ec.courseId === c.id || ec.id === c.id)).slice(0, 3)
    : [];

  const lessonsCompleted = enrolledCourses?.reduce((acc: number, curr: any) => {
    return acc + Math.floor(((curr.progress || 0) / 100) * (curr.course?.totalLessons || 10));
  }, 0) || 0;

  const averageGrade = assignments && assignments.length > 0 
    ? Math.round(assignments.filter((a:any) => a.grade).reduce((acc:number, curr:any) => acc + curr.grade, 0) / (assignments.filter((a:any) => a.grade).length || 1))
    : 0;

  return (
    <div className="min-h-screen bg-[#081726] text-white flex flex-col font-sans selection:bg-[#D8FF00] selection:text-black">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 flex-1 w-full">
        
        {/* Welcome Banner */}
        <div className="bg-[#0D2232] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {greeting}, <span className="text-[#D8FF00]">{currentUser?.name?.split(' ')[0] || 'Alex'}</span> 👋
            </h1>
            <p className="text-white/60 mt-1 text-sm sm:text-base">Here's your learning overview and tasks for today.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="bg-[#102C40] border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-white">
              <BookOpen className="w-4 h-4 text-[#D8FF00]" />
              <span>{enrolledCourses?.length || 0} enrolled courses</span>
            </div>
            <div className="bg-[#102C40] border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 text-xs font-semibold text-white">
              <Calendar className="w-4 h-4 text-[#D8FF00]" />
              <span>{upcomingAssignments?.length || 0} assignments due</span>
            </div>
          </div>
        </div>

        {/* Overall Progress Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatCard title="Courses in Progress" value={enrolledCourses?.length || 0} icon={<TrendingUp className="w-5 h-5 text-[#D8FF00]" />} />
          <StatCard title="Courses Completed" value={0} icon={<CheckCircle className="w-5 h-5 text-emerald-400" />} />
          <StatCard title="Lessons Completed" value={lessonsCompleted} icon={<PlayCircle className="w-5 h-5 text-[#D8FF00]" />} />
          <StatCard title="Average Grade" value={averageGrade > 0 ? `${averageGrade}%` : 'No grades yet'} icon={<Award className="w-5 h-5 text-[#D8FF00]" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white tracking-tight">Continue Learning</h2>
                <Link href="/my-learning" className="text-xs font-bold text-[#D8FF00] hover:underline flex items-center gap-1">
                  View all <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {enrolledCourses && enrolledCourses.length > 0 ? (
                  enrolledCourses.map((ec: any) => (
                    <div key={ec.courseId || ec.id} className="bg-[#0D2232] hover:bg-[#112d42] rounded-2xl border border-white/10 hover:border-[#D8FF00]/40 p-5 flex flex-col transition-all shadow-lg">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center text-black font-black text-lg bg-[#D8FF00] shadow-[0_0_12px_rgba(216,255,0,0.3)]`}>
                          {(ec.course?.title || ec.title)?.charAt(0) || 'C'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white truncate text-base">{ec.course?.title || ec.title}</h3>
                          <p className="text-xs text-white/60 truncate mt-0.5">
                            {typeof ec.instructor === 'string' ? ec.instructor : ec.instructor?.name || ec.course?.instructor?.name || 'Instructor'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-auto space-y-3 pt-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-white/60">Progress</span>
                          <span className="text-[#D8FF00]">{ec.progress || 0}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                          <div className="bg-[#D8FF00] h-full rounded-full shadow-[0_0_8px_#D8FF00]" style={{ width: `${ec.progress || 0}%` }}></div>
                        </div>
                        
                        <Link 
                          href={`/learn/${ec.courseId || ec.id}/${ec.lastLessonId || 'l1'}`}
                          className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-[#D8FF00] text-black py-2.5 rounded-full text-xs font-bold hover:bg-[#cbf000] shadow-[0_0_12px_rgba(216,255,0,0.25)] transition-all"
                        >
                          <span>Continue Learning</span>
                          <ChevronRight className="w-4 h-4 text-black" />
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 bg-[#0D2232] rounded-2xl border border-white/10 p-8 text-center">
                    <p className="text-white/60 text-sm">You haven't enrolled in any courses yet.</p>
                    <Link href="/courses" className="mt-4 inline-block text-xs font-bold text-black bg-[#D8FF00] px-5 py-2.5 rounded-full hover:bg-[#cbf000] shadow-[0_0_12px_rgba(216,255,0,0.25)] transition-all">
                      Explore courses
                    </Link>
                  </div>
                )}
              </div>
            </section>

            {/* Upcoming Deadlines Table */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white tracking-tight">Upcoming Deadlines</h2>
              </div>
              
              <div className="bg-[#0D2232] rounded-2xl border border-white/10 shadow-xl overflow-hidden">
                {upcomingAssignments && upcomingAssignments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-white/10 text-sm">
                      <thead className="bg-[#081726]/60">
                        <tr>
                          <th className="px-6 py-3.5 text-left text-xs font-bold text-white/50 uppercase tracking-wider">Assignment</th>
                          <th className="px-6 py-3.5 text-left text-xs font-bold text-white/50 uppercase tracking-wider">Course</th>
                          <th className="px-6 py-3.5 text-left text-xs font-bold text-white/50 uppercase tracking-wider">Due</th>
                          <th className="px-6 py-3.5 text-left text-xs font-bold text-white/50 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3.5 text-right text-xs font-bold text-white/50 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {upcomingAssignments.map((assignment: any) => (
                          <tr key={assignment.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="font-bold text-white">{assignment.title}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-white/60">
                              {assignment.courseName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-white/70">
                              <div className="flex items-center gap-1.5 text-[#D8FF00] font-semibold">
                                <Clock className="w-3.5 h-3.5" />
                                {formatRelativeDate(assignment.dueDate)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-full bg-amber-400/15 text-amber-400 border border-amber-400/30">
                                Pending
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-bold">
                              <Link href={`/assignments/${assignment.id}`} className="text-[#D8FF00] hover:underline">
                                View &rarr;
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                    <p className="text-white font-bold text-sm">You're all caught up!</p>
                    <p className="text-xs text-white/50 mt-1">No pending assignments right now.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            {/* Recommended Courses */}
            <section>
              <h2 className="text-xl font-bold text-white tracking-tight mb-4">Recommended for You</h2>
              <div className="space-y-3.5">
                {recommendedCourses.map((course: any) => (
                  <div key={course.id} className="bg-[#0D2232] hover:bg-[#112d42] rounded-2xl border border-white/10 hover:border-[#D8FF00]/40 p-4 flex gap-4 transition-all group">
                    <div className="w-14 h-14 rounded-xl shrink-0 flex items-center justify-center text-black font-black text-xl bg-[#D8FF00] shadow-[0_0_10px_rgba(216,255,0,0.25)]">
                      {course.title.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-sm line-clamp-1 group-hover:text-[#D8FF00] transition-colors">{course.title}</h3>
                      <p className="text-xs text-white/60 mt-0.5">{course.category}</p>
                      <Link 
                        href={`/courses/${course.id}`}
                        className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#D8FF00] hover:underline"
                      >
                        <span>Enroll now</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#D8FF00]" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) {
  return (
    <div className="bg-[#0D2232] rounded-2xl border border-white/10 p-5 flex items-center gap-4 shadow-lg hover:border-[#D8FF00]/40 transition-all">
      <div className="p-3 rounded-xl bg-[#102C40] border border-white/10">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-white/50">{title}</p>
        <p className="text-2xl font-black text-white mt-1">{value}</p>
      </div>
    </div>
  );
}

function formatRelativeDate(dateString: string) {
  const due = new Date(dateString);
  const now = new Date();
  const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Due today';
  if (diffDays === 1) return 'Due tomorrow';
  if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
  return due.toLocaleDateString();
}
