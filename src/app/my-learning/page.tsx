'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { withBasePath } from '@/lib/basePath';
import {
  BookOpen, Award, Clock, ChevronRight,
  CalendarDays, AlertCircle, CheckCircle2, SortAsc,
  Play,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { useApp } from '@/context/AppContext';
import { getTotalLessons, getCompletedLessons, formatShortDate } from '@/lib/utils';
import type { Course } from '@/types';

// ─── Helpers ────────────────────────────────────────────────────────────────

function computeProgress(course: Course): number {
  const total = getTotalLessons(course);
  if (total === 0) return 0;
  return Math.round((getCompletedLessons(course) / total) * 100);
}

function getNextLesson(course: Course): { title: string; id: string } | null {
  for (const mod of course.modules) {
    for (const lesson of mod.lessons) {
      if (!lesson.completed) return { title: lesson.title, id: lesson.id };
    }
  }
  return null;
}

function CourseImageWithFallback({
  src,
  alt,
  colorClass,
}: {
  src: string;
  alt: string;
  colorClass: string;
}) {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center overflow-hidden ${
        !showImage ? colorClass || 'bg-[#102C40]' : ''
      }`}
    >
      {showImage ? (
        <img
          src={withBasePath(src)}
          alt={alt}
          loading="lazy"
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <BookOpen className="w-14 h-14 text-white/30" aria-hidden="true" />
      )}
    </div>
  );
}

// ─── Skeleton card while loading ────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      className="bg-[#0D2232] rounded-2xl border border-white/10 overflow-hidden flex flex-col sm:flex-row animate-pulse"
      aria-hidden="true"
    >
      <div className="sm:w-56 h-40 sm:h-auto bg-[#102C40] shrink-0" />
      <div className="p-6 flex-1 space-y-3">
        <div className="h-5 bg-white/10 rounded w-3/4" />
        <div className="h-4 bg-white/5 rounded w-1/2" />
        <div className="h-3 bg-white/5 rounded w-full mt-6" />
        <div className="h-10 bg-[#D8FF00]/20 rounded-full w-36 ml-auto" />
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function MyLearningPage() {
  const { enrolledCourses, grades, assignments } = useApp();

  const [activeTab, setActiveTab] = useState<'All' | 'In Progress' | 'Completed'>('All');
  const [sortBy, setSortBy] = useState<'recent' | 'progress-desc' | 'title-asc'>('recent');
  const [isLoaded, setIsLoaded] = useState(false);

  // Brief load state for graceful mount
  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  // ── Computed stats ────────────────────────────────────────────────────────
  const totalEnrolled = enrolledCourses.length;
  const completedCourses = enrolledCourses.filter(c => computeProgress(c) >= 100);
  const inProgressCourses = enrolledCourses.filter(c => computeProgress(c) < 100);

  const avgGrade = useMemo(() => {
    if (!grades.length) return null;
    const sum = grades.reduce((acc, g) => acc + (g.score / g.maxScore) * 100, 0);
    return Math.round(sum / grades.length);
  }, [grades]);

  // ── Upcoming deadlines ────────────────────────────────────────────────────
  const now = new Date();
  const upcomingDeadlines = useMemo(
    () =>
      assignments
        .filter(a => a.status === 'not_submitted' && new Date(a.dueDate) > now)
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
    [assignments]
  );

  // ── Tab filter + sort ─────────────────────────────────────────────────────
  const filteredAndSorted = useMemo(() => {
    let list = [...enrolledCourses];

    if (activeTab === 'In Progress') list = list.filter(c => computeProgress(c) < 100);
    if (activeTab === 'Completed') list = list.filter(c => computeProgress(c) >= 100);

    if (sortBy === 'recent') {
      list.sort((a, b) => {
        const ta = a.lastAccessed ? new Date(a.lastAccessed).getTime() : 0;
        const tb = b.lastAccessed ? new Date(b.lastAccessed).getTime() : 0;
        return tb - ta;
      });
    } else if (sortBy === 'progress-desc') {
      list.sort((a, b) => computeProgress(b) - computeProgress(a));
    } else {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [enrolledCourses, activeTab, sortBy]);

  const tabCounts: Record<string, number> = {
    All: totalEnrolled,
    'In Progress': inProgressCourses.length,
    Completed: completedCourses.length,
  };

  function daysUntil(dateStr: string) {
    const diff = Math.ceil((new Date(dateStr).getTime() - now.getTime()) / 86400000);
    if (diff === 0) return 'Due today';
    if (diff === 1) return 'Due tomorrow';
    return `Due in ${diff} days`;
  }

  return (
    <div className="min-h-screen bg-[#081726] text-white flex flex-col font-sans selection:bg-[#D8FF00] selection:text-black">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-[#D8FF00] focus:text-black focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-bold"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">

        {/* ── Page heading ─────────────────────────────────────────────── */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            My <span className="text-[#D8FF00]">Learning</span>
          </h1>
          <p className="text-white/60 mt-1.5 text-sm sm:text-base">
            Track your progress, continue courses, and manage your upcoming assignments.
          </p>
        </div>

        {/* ── Stats grid ───────────────────────────────────────────────── */}
        <section aria-labelledby="stats-heading" className="mb-10">
          <h2 id="stats-heading" className="sr-only">Learning Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="bg-[#0D2232] p-5 rounded-2xl border border-white/10 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Total Enrolled</p>
              <p className="text-3xl font-black text-white mt-2">{totalEnrolled}</p>
            </div>
            
            <div className="bg-[#0D2232] p-5 rounded-2xl border border-white/10 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">In Progress</p>
              <p className="text-3xl font-black text-[#D8FF00] mt-2">{inProgressCourses.length}</p>
            </div>
            
            <div className="bg-[#0D2232] p-5 rounded-2xl border border-white/10 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Completed</p>
              <p className="text-3xl font-black text-emerald-400 mt-2">{completedCourses.length}</p>
            </div>
            
            <div className="bg-[#0D2232] p-5 rounded-2xl border border-white/10 shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Average Grade</p>
              <p className="text-3xl font-black text-white mt-2">
                {avgGrade !== null ? (
                  <span className="text-[#D8FF00]">{avgGrade}%</span>
                ) : (
                  <span className="text-white/40 text-base font-medium">No grades yet</span>
                )}
              </p>
            </div>

          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Left: course list ───────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Tabs + Sort row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              
              {/* Tabs */}
              <div
                role="tablist"
                aria-label="Filter courses"
                className="flex gap-2"
              >
                {(['All', 'In Progress', 'Completed'] as const).map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    aria-controls={`tabpanel-${tab.replace(' ', '-')}`}
                    id={`tab-${tab.replace(' ', '-')}`}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap py-2 px-4 rounded-full text-xs font-bold transition-all min-h-[38px] ${
                      activeTab === tab
                        ? 'bg-[#D8FF00] text-black shadow-[0_0_15px_rgba(216,255,0,0.3)]'
                        : 'bg-[#0D2232] text-white/70 hover:text-white hover:bg-[#122e44] border border-white/10'
                    }`}
                  >
                    {tab}
                    <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full ${
                      activeTab === tab ? 'bg-black/20 text-black' : 'bg-white/10 text-white/70'
                    }`}>
                      {tabCounts[tab]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Sort */}
              <label className="flex items-center gap-2 text-xs text-white/60 shrink-0">
                <SortAsc className="w-4 h-4 text-[#D8FF00]" aria-hidden="true" />
                <span className="sr-only sm:not-sr-only">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="bg-[#0D2232] border border-white/10 rounded-full px-3 py-1.5 text-xs text-white/90 font-medium focus:outline-none focus:border-[#D8FF00]"
                  aria-label="Sort courses"
                >
                  <option value="recent">Recently Accessed</option>
                  <option value="progress-desc">Progress: High to Low</option>
                  <option value="title-asc">Title: A–Z</option>
                </select>
              </label>
            </div>

            {/* Course list */}
            <div
              id={`tabpanel-${activeTab.replace(' ', '-')}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab.replace(' ', '-')}`}
            >
              {!isLoaded ? (
                <ul className="space-y-5" aria-label="Loading courses">
                  {[1, 2, 3].map(i => <li key={i}><SkeletonCard /></li>)}
                </ul>
              ) : filteredAndSorted.length > 0 ? (
                <ul className="space-y-5">
                  {filteredAndSorted.map((course) => {
                    const total = getTotalLessons(course);
                    const completed = getCompletedLessons(course);
                    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
                    const nextLesson = getNextLesson(course);
                    const instructorName =
                      typeof course.instructor === 'string'
                        ? course.instructor
                        : course.instructor?.name ?? 'Instructor';
                    const continueId = nextLesson?.id ?? course.lastLessonId ?? 'l1';
                    const continueLabel = nextLesson
                      ? `Continue: ${nextLesson.title}`
                      : 'Review Course';
                    const isDone = pct >= 100;

                    return (
                      <li key={course.id}>
                        <article className="bg-[#0D2232] hover:bg-[#112d42] rounded-2xl border border-white/10 hover:border-[#D8FF00]/40 overflow-hidden shadow-lg transition-all duration-300 flex flex-col sm:flex-row group">
                          
                          {/* Thumbnail */}
                          <div className="sm:w-60 h-44 sm:h-auto shrink-0 relative overflow-hidden" style={{ aspectRatio: '3/2' }}>
                            <CourseImageWithFallback
                              src={course.image}
                              alt={
                                course.id === 'c1'
                                  ? 'Illustration of a wireframe interface with a cursor'
                                  : course.id === 'c2'
                                  ? 'Illustration of code on a browser screen'
                                  : course.id === 'c3'
                                  ? 'Illustration of a padlock and shield for cybersecurity'
                                  : `${course.title} course illustration`
                              }
                              colorClass={course.color}
                            />
                            <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-white/90 border border-white/10">
                              {course.category}
                            </span>
                          </div>

                          {/* Content */}
                          <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start gap-4 mb-2">
                                <div>
                                  <h3 className="text-lg font-bold text-white group-hover:text-[#D8FF00] transition-colors leading-snug">
                                    {course.title}
                                  </h3>
                                  <p className="text-xs text-white/60 mt-1">{instructorName}</p>
                                </div>
                                {isDone && (
                                  <span className="flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded-full text-xs font-bold shrink-0">
                                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                                    Completed
                                  </span>
                                )}
                              </div>

                              {course.lastAccessed && (
                                <p className="text-xs text-white/40 flex items-center gap-1.5 mb-4">
                                  <Clock className="w-3.5 h-3.5 text-[#D8FF00]" aria-hidden="true" />
                                  Last accessed: {formatShortDate(course.lastAccessed)}
                                </p>
                              )}
                            </div>

                            <div className="pt-4 border-t border-white/10 space-y-3">
                              {/* Progress bar */}
                              <div>
                                <div className="flex justify-between text-xs font-semibold mb-1.5">
                                  <span className="text-[#D8FF00]">{pct}% complete</span>
                                  <span className="text-white/60 font-normal">
                                    {completed} of {total} lesson{total !== 1 ? 's' : ''} completed
                                  </span>
                                </div>
                                <div
                                  className="w-full bg-white/10 rounded-full h-2 overflow-hidden"
                                  role="progressbar"
                                  aria-valuenow={pct}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                  aria-label={`${course.title} progress: ${pct}%`}
                                >
                                  <div
                                    className="h-2 rounded-full bg-[#D8FF00] shadow-[0_0_8px_#D8FF00] transition-all duration-500"
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                              </div>

                              {/* Action row */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                                {nextLesson && !isDone ? (
                                  <p className="text-xs text-white/60 truncate">
                                    <span className="font-semibold text-white/90">Up next:</span>{' '}
                                    {nextLesson.title}
                                  </p>
                                ) : <div />}

                                <Link
                                  href={`/learn/${course.id}/${continueId}`}
                                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#D8FF00] text-black hover:bg-[#cbf000] shadow-[0_0_15px_rgba(216,255,0,0.3)] transition-all min-h-[38px] shrink-0"
                                >
                                  <span>{continueLabel}</span>
                                  <ChevronRight className="w-4 h-4 text-black" aria-hidden="true" />
                                </Link>
                              </div>
                            </div>

                          </div>
                        </article>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                /* Empty state */
                <div
                  className="bg-[#0D2232] rounded-2xl border border-white/10 py-16 px-4 text-center"
                  role="status"
                >
                  <BookOpen className="w-14 h-14 text-white/20 mx-auto mb-4" aria-hidden="true" />
                  <h3 className="text-lg font-bold text-white">No courses in this section</h3>
                  <p className="text-white/50 text-sm mt-1 max-w-sm mx-auto">
                    {activeTab === 'Completed'
                      ? 'Keep working through your lessons! Completed courses will show here.'
                      : 'Explore the courses catalog to start learning.'}
                  </p>
                  <Link
                    href="/courses"
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#D8FF00] text-black font-bold rounded-full text-sm hover:bg-[#cbf000] shadow-[0_0_15px_rgba(216,255,0,0.3)] transition-all"
                  >
                    <span>Explore Courses</span>
                    <ChevronRight className="w-4 h-4 text-black" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* ── Right: Upcoming Deadlines panel ────────────────────────── */}
          <aside className="lg:w-80 shrink-0" aria-labelledby="deadlines-heading">
            <div className="bg-[#0D2232] rounded-2xl border border-white/10 shadow-xl p-5 sticky top-24 space-y-4">
              <h2
                id="deadlines-heading"
                className="text-base font-bold text-white flex items-center gap-2"
              >
                <CalendarDays className="w-4 h-4 text-[#D8FF00]" aria-hidden="true" />
                Upcoming Deadlines
              </h2>

              {upcomingDeadlines.length === 0 ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" aria-hidden="true" />
                  <p className="text-sm text-white/90 font-bold">You&apos;re all caught up! 🎉</p>
                  <p className="text-xs text-white/50 mt-1">No pending assignments right now.</p>
                </div>
              ) : (
                <ul className="space-y-2.5">
                  {upcomingDeadlines.map((a) => (
                    <li key={a.id}>
                      <Link
                        href={`/assignments/${a.id}`}
                        className="flex items-start gap-3 p-3 rounded-xl bg-[#081726]/60 border border-white/5 hover:border-[#D8FF00]/40 transition-all group"
                      >
                        <AlertCircle
                          className="w-4 h-4 text-[#D8FF00] mt-0.5 shrink-0"
                          aria-hidden="true"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-white group-hover:text-[#D8FF00] truncate transition-colors">
                            {a.title}
                          </p>
                          <p className="text-[11px] text-white/50 truncate mt-0.5">{a.courseName}</p>
                          <p className="text-[11px] text-[#D8FF00] font-semibold mt-1">
                            {daysUntil(a.dueDate)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              <div className="pt-3 border-t border-white/10 flex gap-2">
                <Link
                  href="/assignments"
                  className="flex-1 text-center text-xs font-bold text-black bg-[#D8FF00] hover:bg-[#cbf000] py-2 rounded-full transition-all shadow-[0_0_10px_rgba(216,255,0,0.2)]"
                >
                  Assignments
                </Link>
                <Link
                  href="/calendar"
                  className="flex-1 text-center text-xs font-semibold text-white bg-white/10 hover:bg-white/15 py-2 rounded-full transition-colors border border-white/10"
                >
                  Calendar
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}
