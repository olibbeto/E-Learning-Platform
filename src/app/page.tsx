'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import {
  Play,
  ArrowRight,
  TrendingUp,
  BookOpen,
  Award,
  Clock,
  Star,
  Search,
  SlidersHorizontal,
  CheckCircle,
  Flame,
  Sparkles,
  Layers,
  Map,
  Bell,
  Upload,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { withBasePath } from '@/lib/basePath';

export default function LandingPage() {
  const { allCourses, enrolledCourses } = useApp();

  // Search & Filter state for the Explore Courses section
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [sortBy, setSortBy] = useState('Most Popular');

  const categories = [
    'All Categories',
    'Development',
    'Design',
    'Data Science',
    'Security',
    'Infrastructure',
  ];
  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
  const sortOptions = ['Most Popular', 'Highest Rated', 'Newest'];

  // Default featured courses matching the reference mockup visual styling
  const featuredMockCourses = [
    {
      id: 'c8',
      title: 'Python Programming',
      instructor: 'Dr. Alex Johnson',
      instructorAvatar: 'https://i.pravatar.cc/150?u=alex',
      category: 'Development',
      difficulty: 'Beginner',
      badge: 'Popular',
      badgeIcon: 'flame',
      rating: 4.8,
      reviews: '2.4k',
      price: 'Free',
      image: '/images/thumb-python.jpg',
    },
    {
      id: 'c1',
      title: 'UI/UX Design Basics',
      instructor: 'Sarah Mitchell',
      instructorAvatar: 'https://i.pravatar.cc/150?u=sarah',
      category: 'Design',
      difficulty: 'Beginner',
      badge: 'Beginner',
      rating: 4.7,
      reviews: '1.1k',
      price: '$49',
      image: '/images/thumb-uiux.jpg',
    },
    {
      id: 'c6',
      title: 'Data Science Essentials',
      instructor: 'Dr. Michael Chen',
      instructorAvatar: 'https://i.pravatar.cc/150?u=michael',
      category: 'Data Science',
      difficulty: 'Intermediate',
      badge: 'Intermediate',
      rating: 4.8,
      reviews: '1.8k',
      price: '$59',
      image: '/images/thumb-datascience.jpg',
    },
    {
      id: 'c2',
      title: 'Artificial Intelligence',
      instructor: 'Prof. David Kim',
      instructorAvatar: 'https://i.pravatar.cc/150?u=davidk',
      category: 'Development',
      difficulty: 'Advanced',
      badge: 'Trending',
      badgeIcon: 'sparkles',
      rating: 4.9,
      reviews: '3.2k',
      price: '$79',
      image: '/images/thumb-ai.jpg',
    },
  ];

  // Combined courses list with real app fallback
  const displayCourses = useMemo(() => {
    let list = featuredMockCourses;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }
    if (selectedCategory !== 'All Categories') {
      list = list.filter((c) => c.category === selectedCategory);
    }
    if (selectedLevel !== 'All Levels') {
      list = list.filter((c) => c.difficulty === selectedLevel);
    }
    return list;
  }, [searchQuery, selectedCategory, selectedLevel]);

  // Active enrolled course for the Continue Learning banner
  const activeCourse = enrolledCourses && enrolledCourses.length > 0 ? enrolledCourses[0] : null;

  return (
    <div className="min-h-screen bg-[#081726] text-white flex flex-col font-sans selection:bg-[#D8FF00] selection:text-black">
      <Navbar />

      {/* Atmospheric Glow Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Electric Lime Ambient Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#D8FF00]/10 rounded-full blur-[140px]" />
        {/* Cyan Ambient Glow */}
        <div className="absolute top-20 right-10 w-[500px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px]" />
        {/* Midnight Navy Deep Glow */}
        <div className="absolute top-[600px] left-10 w-[600px] h-[500px] bg-[#102C40]/40 rounded-full blur-[160px]" />
      </div>

      <main className="relative z-10 flex-1">
        {/* ========================================================================= */}
        {/* HERO SECTION                                                             */}
        {/* ========================================================================= */}
        <section className="pt-10 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-5 text-center lg:text-left space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.8rem] font-black tracking-tight leading-[1.08] text-white">
                Learn smarter. <br />
                <span className="text-[#D8FF00] drop-shadow-[0_0_20px_rgba(216,255,0,0.4)]">
                  Navigate
                </span>{' '}
                easier.
              </h1>

              <p className="text-base sm:text-lg text-white/70 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
                Build new skills, achieve your goals, and take control of your learning journey.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-bold bg-[#D8FF00] text-black hover:bg-[#cbf000] shadow-[0_0_25px_rgba(216,255,0,0.35)] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-5 h-5 text-black" />
                </Link>

                <Link
                  href="/my-learning"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-white bg-transparent border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-200"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Learning</span>
                </Link>
              </div>
            </div>

            {/* Center Visual: Student Studying with Laptop */}
            <div className="lg:col-span-4 relative flex justify-center items-center">
              <div className="relative w-full max-w-[380px] aspect-[4/3] rounded-3xl overflow-hidden flex items-center justify-center">
                <img
                  src={withBasePath('/images/hero-student.png')}
                  alt="Student studying with laptop and headphones"
                  className="w-full h-full object-cover filter contrast-105 drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                />
                {/* Backlight Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081726] via-transparent to-transparent opacity-60" />
              </div>
            </div>

            {/* Right Column: Floating Learning Progress Card */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end">
              <div className="w-full max-w-[320px] rounded-3xl bg-[#0D2232]/85 backdrop-blur-2xl border border-white/10 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-5">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    Your Learning Progress
                  </span>
                  <TrendingUp className="w-5 h-5 text-[#D8FF00] drop-shadow-[0_0_8px_#D8FF00]" />
                </div>

                {/* Big Percentage */}
                <div>
                  <div className="text-5xl font-black text-white tracking-tight">68%</div>
                </div>

                {/* Progress Bar in Electric Lime */}
                <div className="space-y-2">
                  <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden p-[1px]">
                    <div
                      className="bg-[#D8FF00] h-full rounded-full shadow-[0_0_12px_#D8FF00] transition-all duration-500"
                      style={{ width: '68%' }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#D8FF00] font-bold flex items-center gap-1">
                      Keep going! ↗
                    </span>
                  </div>
                </div>

                {/* Bottom 3 Stat Badges */}
                <div className="pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                  <div className="space-y-1">
                    <BookOpen className="w-4 h-4 mx-auto text-[#D8FF00]" />
                    <div className="text-sm font-bold text-white">12</div>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider">Courses</div>
                  </div>
                  <div className="space-y-1">
                    <Award className="w-4 h-4 mx-auto text-[#D8FF00]" />
                    <div className="text-sm font-bold text-white">4.8</div>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider">Rating</div>
                  </div>
                  <div className="space-y-1">
                    <Clock className="w-4 h-4 mx-auto text-[#D8FF00]" />
                    <div className="text-sm font-bold text-white">45h</div>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider">Learned</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* CONTINUE LEARNING BANNER                                                 */}
        {/* ========================================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-16">
          <div className="relative rounded-2xl bg-[#0D2434]/85 backdrop-blur-xl border border-white/10 p-4 sm:p-5 shadow-[0_15px_40px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden group hover:border-[#D8FF00]/30 transition-all">
            
            {/* Left section: Play button + Title */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Link
                href={activeCourse ? `/learn/${activeCourse.id}/${activeCourse.lastLessonId || 'l1'}` : '/learn/c2/l2_web'}
                className="w-12 h-12 rounded-full bg-[#D8FF00] text-black flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(216,255,0,0.4)] hover:scale-105 active:scale-95 transition-transform"
                aria-label="Continue Learning"
              >
                <Play className="w-5 h-5 fill-black ml-0.5" />
              </Link>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Continue Learning</h2>
                <p className="text-xs text-white/60">Pick up where you left off</p>
              </div>
            </div>

            {/* Middle section: Course Thumbnail & Progress Bar */}
            <div className="flex items-center gap-4 flex-1 max-w-2xl w-full">
              {/* Thumbnail */}
              <div className="w-20 h-12 rounded-lg overflow-hidden border border-white/15 shrink-0 relative bg-[#102C40]">
                <img
                  src={withBasePath('/images/continue-learning-thumb.jpg')}
                  alt="Web Development Fundamentals"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title, Lesson & Progress Bar */}
              <div className="flex-1 space-y-1.5 min-w-0">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white truncate pr-2">
                    {activeCourse ? activeCourse.title : 'Web Development Fundamentals'}
                  </span>
                  <span className="text-white/60 text-[11px] shrink-0">
                    Lesson 7 of 12 • 68% Complete
                  </span>
                </div>
                {/* Electric Lime Progress Bar */}
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#D8FF00] h-full rounded-full shadow-[0_0_8px_#D8FF00]"
                    style={{ width: '68%' }}
                  />
                </div>
              </div>
            </div>

            {/* Right section: Continue Watching Button */}
            <div className="w-full md:w-auto flex justify-end shrink-0">
              <Link
                href={activeCourse ? `/learn/${activeCourse.id}/${activeCourse.lastLessonId || 'l1'}` : '/learn/c2/l2_web'}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-[#D8FF00] text-black hover:bg-[#cbf000] shadow-[0_0_18px_rgba(216,255,0,0.3)] transition-all transform hover:scale-[1.02]"
              >
                <span>Continue Watching</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </Link>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* EXPLORE COURSES SECTION                                                  */}
        {/* ========================================================================= */}
        <section id="courses" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-24">
          
          {/* Header Row & Filters */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                Explore Courses
              </h2>
              <p className="text-sm text-white/60">
                Discover top courses tailored for your goals.
              </p>
            </div>

            {/* Filter Bar Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search input */}
              <div className="relative min-w-[200px]">
                <Search className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#0D2232] border border-white/10 rounded-full text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#D8FF00] focus:ring-1 focus:ring-[#D8FF00] transition-all"
                />
              </div>

              {/* Category Dropdown Pill */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-[#D8FF00] text-black font-bold text-xs rounded-full cursor-pointer focus:outline-none shadow-[0_0_12px_rgba(216,255,0,0.25)]"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-[#0D2232] text-white font-normal">
                    {c}
                  </option>
                ))}
              </select>

              {/* Levels Dropdown */}
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 bg-[#0D2232] border border-white/10 text-white/80 font-medium text-xs rounded-full cursor-pointer focus:outline-none focus:border-[#D8FF00]"
              >
                {levels.map((l) => (
                  <option key={l} value={l} className="bg-[#0D2232] text-white">
                    {l}
                  </option>
                ))}
              </select>

              {/* Sort By Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-[#0D2232] border border-white/10 text-white/80 font-medium text-xs rounded-full cursor-pointer focus:outline-none focus:border-[#D8FF00]"
              >
                {sortOptions.map((s) => (
                  <option key={s} value={s} className="bg-[#0D2232] text-white">
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 4-Column Course Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayCourses.map((course) => (
              <div
                key={course.id}
                className="bg-[#0D2232] hover:bg-[#112d42] border border-white/10 hover:border-[#D8FF00]/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col group"
              >
                {/* Course Thumbnail with Top-Right Badge */}
                <Link href={`/courses/${course.id}`} className="relative aspect-[16/10] overflow-hidden block">
                  <img
                    src={withBasePath(course.image)}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Glowing Badge */}
                  {course.badge && (
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-full text-[11px] font-bold text-white flex items-center gap-1 shadow-md">
                      {course.badgeIcon === 'flame' && <Flame className="w-3 h-3 text-[#D8FF00] fill-current" />}
                      {course.badgeIcon === 'sparkles' && <Sparkles className="w-3 h-3 text-[#D8FF00]" />}
                      <span>{course.badge}</span>
                    </div>
                  )}
                </Link>

                {/* Card Body */}
                <div className="p-4 flex flex-col flex-1">
                  {/* Course Title */}
                  <Link href={`/courses/${course.id}`}>
                    <h3 className="font-bold text-base text-white group-hover:text-[#D8FF00] transition-colors line-clamp-1 mb-1.5">
                      {course.title}
                    </h3>
                  </Link>

                  {/* Instructor */}
                  <div className="flex items-center gap-1.5 text-xs text-white/60 mb-3">
                    <img
                      src={course.instructorAvatar}
                      alt={course.instructor}
                      className="w-4 h-4 rounded-full object-cover ring-1 ring-white/20"
                    />
                    <span className="truncate">{course.instructor}</span>
                  </div>

                  {/* Rating & Bottom Row */}
                  <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between">
                    {/* Star Rating */}
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-white">{course.rating}</span>
                      <span className="text-white/40">({course.reviews})</span>
                    </div>

                    {/* Action Arrow & Price */}
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/courses/${course.id}`}
                        className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#D8FF00] text-white group-hover:text-black flex items-center justify-center transition-colors"
                        aria-label={`View ${course.title}`}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <span className="font-bold text-sm text-[#D8FF00] tracking-tight">
                        {course.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Courses Link */}
          <div className="mt-10 text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-[#0D2232] border border-white/10 hover:border-[#D8FF00]/50 hover:bg-[#122e44] transition-all"
            >
              <span>Explore All 8 Full Courses Catalog</span>
              <ArrowRight className="w-4 h-4 text-[#D8FF00]" />
            </Link>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* WHY LEAEARN EASE FEATURE HIGHLIGHTS                                      */}
        {/* ========================================================================= */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/10">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3">
              Why <span className="text-[#D8FF00]">LearnEase</span>?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
              A futuristic, human-centered e-learning experience stripped of complexity so you can focus on mastery.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl bg-[#0D2232]/70 border border-white/10 hover:border-[#D8FF00]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#D8FF00]/15 flex items-center justify-center text-[#D8FF00] mb-5 shadow-[0_0_15px_rgba(216,255,0,0.2)]">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Everything in One Place</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Seamlessly toggle between lectures, quizzes, and live assignments in one distraction-free interface.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#0D2232]/70 border border-white/10 hover:border-[#D8FF00]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#D8FF00]/15 flex items-center justify-center text-[#D8FF00] mb-5 shadow-[0_0_15px_rgba(216,255,0,0.2)]">
                <Map className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Guided Learning Paths</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Step-by-step curriculum with real-time progress indicators so you always know your next step.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#0D2232]/70 border border-white/10 hover:border-[#D8FF00]/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#D8FF00]/15 flex items-center justify-center text-[#D8FF00] mb-5 shadow-[0_0_15px_rgba(216,255,0,0.2)]">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Smart Deadline Alerts</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Never miss an assignment with integrated countdown timers and synced academic calendar.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#050E17] border-t border-white/10 py-10 px-4 sm:px-6 lg:px-8 text-white/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="grid grid-cols-3 gap-1 w-4 h-4 items-center justify-center">
              {[...Array(9)].map((_, i) => (
                <span key={i} className="w-1 h-1 rounded-full bg-[#D8FF00]" />
              ))}
            </div>
            <span className="font-bold text-lg text-white">LearnEase</span>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
            <Link href="/my-learning" className="hover:text-white transition-colors">My Learning</Link>
            <Link href="/assignments" className="hover:text-white transition-colors">Assignments</Link>
            <Link href="/calendar" className="hover:text-white transition-colors">Calendar</Link>
          </div>
          <p className="text-xs text-white/40">© {new Date().getFullYear()} LearnEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
