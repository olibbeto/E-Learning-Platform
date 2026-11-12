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
  ChevronDown
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { withBasePath } from '@/lib/basePath';

export default function LandingPage() {
  const { allCourses, enrolledCourses } = useApp();

  // Search & Filter state for Explore Courses
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [sortBy, setSortBy] = useState('Sort by');

  const categories = [
    'All Categories',
    'Development',
    'Design',
    'Data Science',
    'Security',
    'Infrastructure',
  ];
  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
  const sortOptions = ['Sort by', 'Most Popular', 'Highest Rated', 'Price: Low to High'];

  // Default featured 4 courses matching the reference mockup
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
      badgeIcon: 'dot',
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
      badgeIcon: 'none',
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
      badgeIcon: 'star',
      rating: 4.9,
      reviews: '3.2k',
      price: '$79',
      image: '/images/thumb-ai.jpg',
    },
  ];

  // Active / Continue Learning course from enrolled or fallback
  const activeCourse = enrolledCourses && enrolledCourses.length > 0
    ? enrolledCourses[0]
    : allCourses?.find((c) => c.id === 'c2') || allCourses?.[0];

  // Live filter & search
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

    if (sortBy === 'Highest Rated') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [searchQuery, selectedCategory, selectedLevel, sortBy]);

  return (
    <div className="min-h-screen bg-[#050D15] text-white flex flex-col font-sans selection:bg-[#D8FF00] selection:text-black relative overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* VIBRANT ATMOSPHERIC LIGHTING EFFECTS MATCHING MOCKUP                     */}
      {/* ========================================================================= */}
      {/* Radiant Electric Lime + Cyan Glow Behind Student & Hero */}
      <div 
        className="pointer-events-none absolute top-[-50px] right-[10%] w-[650px] h-[650px] rounded-full blur-[140px] opacity-45 -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(216, 255, 0, 0.45) 0%, rgba(0, 229, 255, 0.25) 45%, transparent 70%)'
        }}
      />
      {/* Ambient Glow Behind Hero Headline */}
      <div 
        className="pointer-events-none absolute top-[80px] left-[-100px] w-[500px] h-[500px] rounded-full blur-[150px] opacity-25 -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(216, 255, 0, 0.3) 0%, rgba(16, 44, 64, 0.4) 50%, transparent 75%)'
        }}
      />
      {/* Subtle Bottom Ambient Glow */}
      <div 
        className="pointer-events-none absolute top-[700px] left-[30%] w-[700px] h-[500px] rounded-full blur-[160px] opacity-20 -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(0, 180, 255, 0.25) 0%, rgba(216, 255, 0, 0.15) 50%, transparent 80%)'
        }}
      />

      {/* Navigation */}
      <Navbar />

      <main className="flex-1 flex flex-col">

        {/* ========================================================================= */}
        {/* HERO SECTION                                                             */}
        {/* ========================================================================= */}
        <section className="relative pt-8 sm:pt-14 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
            
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-5 text-center lg:text-left space-y-6 z-10">
              <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-black tracking-tight leading-[1.06] text-white">
                Learn smarter. <br />
                <span className="text-[#D8FF00] drop-shadow-[0_0_25px_rgba(216,255,0,0.45)]">
                  Navigate
                </span>{' '}
                easier.
              </h1>

              <p className="text-base sm:text-lg text-white/75 max-w-md mx-auto lg:mx-0 leading-relaxed font-normal">
                Build new skills, achieve your goals, and take control of your learning journey.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-extrabold bg-[#D8FF00] text-black hover:bg-[#cbf000] shadow-[0_0_25px_rgba(216,255,0,0.4)] transition-all duration-200 transform hover:scale-[1.03] active:scale-[0.98]"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-5 h-5 text-black stroke-[2.5]" />
                </Link>

                <Link
                  href="/my-learning"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-base font-semibold text-white bg-white/5 border border-white/20 hover:border-white/40 hover:bg-white/10 backdrop-blur-md transition-all duration-200"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Learning</span>
                </Link>
              </div>
            </div>

            {/* Center Visual: Student Studying with Laptop (SEAMLESS NO-BORDER INTEGRATION) */}
            <div className="lg:col-span-4 relative flex justify-center items-center py-4 lg:py-0">
              <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
                {/* Backlight halo glow specifically centered behind student */}
                <div 
                  className="absolute inset-0 rounded-full blur-[80px] opacity-50 -z-10"
                  style={{
                    background: 'radial-gradient(circle, rgba(216, 255, 0, 0.4) 0%, rgba(0, 229, 255, 0.2) 50%, transparent 70%)'
                  }}
                />
                <img
                  src={withBasePath('/images/hero-student-real.jpg')}
                  alt="Student studying with laptop and headphones"
                  className="w-full h-full object-contain [mask-image:radial-gradient(ellipse_at_center,black_58%,transparent_98%)] filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] transform scale-105"
                />
              </div>
            </div>

            {/* Right Column: Floating Learning Progress Card */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end z-10">
              <div className="w-full max-w-[310px] rounded-3xl bg-[#081827]/85 backdrop-blur-2xl border border-white/15 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.6)] space-y-5 hover:border-white/25 transition-all">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/70">
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
                  <div className="w-full bg-[#112332] h-2.5 rounded-full overflow-hidden p-[1px] border border-white/5">
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
                    <div className="text-sm font-black text-white">12</div>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Courses</div>
                  </div>
                  <div className="space-y-1">
                    <Award className="w-4 h-4 mx-auto text-[#D8FF00]" />
                    <div className="text-sm font-black text-white">4.8</div>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Rating</div>
                  </div>
                  <div className="space-y-1">
                    <Clock className="w-4 h-4 mx-auto text-[#D8FF00]" />
                    <div className="text-sm font-black text-white">45h</div>
                    <div className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Learned</div>
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
          <div className="relative rounded-3xl bg-[#081827]/90 backdrop-blur-2xl border border-white/15 p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden group hover:border-[#D8FF00]/40 transition-all">
            
            {/* Left section: Circular Lime Play button + Title */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Link
                href={activeCourse ? `/learn/${activeCourse.id}/${activeCourse.lastLessonId || 'l1'}` : '/learn/c2/l2_web'}
                className="w-12 h-12 rounded-full bg-[#D8FF00] text-black flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(216,255,0,0.5)] hover:scale-105 active:scale-95 transition-transform"
                aria-label="Continue Learning"
              >
                <Play className="w-5 h-5 fill-black ml-0.5" />
              </Link>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">Continue Learning</h2>
                <p className="text-xs text-white/60">Pick up where you left off</p>
              </div>
            </div>

            {/* Middle section: Course Thumbnail & Progress Bar */}
            <div className="flex items-center gap-4 flex-1 max-w-2xl w-full">
              {/* Thumbnail */}
              <div className="w-24 h-14 rounded-xl overflow-hidden border border-white/20 shrink-0 relative bg-[#102C40] shadow-md">
                <img
                  src={withBasePath('/images/continue-learning-thumb.jpg')}
                  alt="Web Development Fundamentals"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title, Lesson & Progress Bar */}
              <div className="flex-1 space-y-2 min-w-0">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white truncate pr-2 text-sm">
                    {activeCourse ? activeCourse.title : 'Web Development Fundamentals'}
                  </span>
                  <span className="text-white/60 text-[11px] shrink-0 font-medium">
                    Lesson 7 of 12 • 68% Complete
                  </span>
                </div>
                {/* Electric Lime Progress Bar */}
                <div className="w-full bg-[#112332] h-2 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="bg-[#D8FF00] h-full rounded-full shadow-[0_0_10px_#D8FF00]"
                    style={{ width: '68%' }}
                  />
                </div>
              </div>
            </div>

            {/* Right section: Continue Watching Button */}
            <div className="w-full md:w-auto flex justify-end shrink-0">
              <Link
                href={activeCourse ? `/learn/${activeCourse.id}/${activeCourse.lastLessonId || 'l1'}` : '/learn/c2/l2_web'}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-extrabold bg-[#D8FF00] text-black hover:bg-[#cbf000] shadow-[0_0_20px_rgba(216,255,0,0.4)] transition-all transform hover:scale-[1.03]"
              >
                <span>Continue Watching</span>
                <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
              </Link>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* EXPLORE COURSES SECTION                                                  */}
        {/* ========================================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-20">
          
          {/* Section Header & Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Explore Courses</h2>
              <p className="text-xs sm:text-sm text-white/60 mt-1">Discover top courses tailored for your goals.</p>
            </div>

            {/* Filter Pills matching Mockup */}
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* Search input pill */}
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 text-white/40 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-[#081827] border border-white/15 focus:border-[#D8FF00] rounded-full text-xs text-white placeholder-white/40 outline-none w-44 sm:w-52 transition-colors"
                />
              </div>

              {/* Category Dropdown Pill - Styled in Electric Lime like Mockup */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none pl-4 pr-8 py-2 bg-[#D8FF00] text-black font-extrabold text-xs rounded-full cursor-pointer focus:outline-none shadow-[0_0_15px_rgba(216,255,0,0.3)] transition-all"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-[#081827] text-white font-medium">
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-black absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2.5]" />
              </div>

              {/* Levels Dropdown Pill */}
              <div className="relative">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="appearance-none pl-4 pr-8 py-2 bg-[#081827] border border-white/15 text-white font-medium text-xs rounded-full cursor-pointer focus:outline-none focus:border-[#D8FF00] transition-colors"
                >
                  {levels.map((l) => (
                    <option key={l} value={l} className="bg-[#081827] text-white">
                      {l}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-white/60 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Sort By Dropdown Pill */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-8 py-2 bg-[#081827] border border-white/15 text-white font-medium text-xs rounded-full cursor-pointer focus:outline-none focus:border-[#D8FF00] transition-colors"
                >
                  {sortOptions.map((s) => (
                    <option key={s} value={s} className="bg-[#081827] text-white">
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-white/60 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

            </div>
          </div>

          {/* 4-Column Course Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayCourses.map((course) => (
              <div
                key={course.id}
                className="bg-[#081827]/90 hover:bg-[#0B1F32] border border-white/15 hover:border-[#D8FF00]/50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col group backdrop-blur-xl"
              >
                {/* Course Thumbnail with Top-Right Badge */}
                <Link href={`/courses/${course.id}`} className="relative aspect-[16/10] overflow-hidden block bg-[#0D2232]">
                  <img
                    src={withBasePath(course.image)}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Glowing Pill Badge */}
                  {course.badge && (
                    <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[11px] font-bold text-white flex items-center gap-1.5 shadow-lg">
                      {course.badgeIcon === 'flame' && <Flame className="w-3.5 h-3.5 text-[#D8FF00] fill-current" />}
                      {course.badgeIcon === 'star' && <span className="text-[#D8FF00] text-xs">★</span>}
                      {course.badgeIcon === 'dot' && <span className="w-1.5 h-1.5 rounded-full bg-[#D8FF00]" />}
                      <span>{course.badge}</span>
                    </div>
                  )}
                </Link>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Course Title */}
                  <Link href={`/courses/${course.id}`}>
                    <h3 className="font-bold text-base text-white group-hover:text-[#D8FF00] transition-colors line-clamp-1 mb-2">
                      {course.title}
                    </h3>
                  </Link>

                  {/* Instructor */}
                  <div className="flex items-center gap-2 text-xs text-white/60 mb-4">
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
                    <div className="flex items-center gap-1.5 text-xs">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-black text-white">{course.rating}</span>
                      <span className="text-white/40">({course.reviews})</span>
                    </div>

                    {/* Action Arrow & Price */}
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/courses/${course.id}`}
                        className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#D8FF00] text-white group-hover:text-black flex items-center justify-center transition-all duration-200"
                        aria-label={`View ${course.title}`}
                      >
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </Link>
                      <span className="font-black text-base text-[#D8FF00] tracking-tight drop-shadow-[0_0_10px_rgba(216,255,0,0.3)]">
                        {course.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Catalog Link */}
          <div className="mt-10 flex justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#081827] border border-white/15 hover:border-[#D8FF00] hover:text-[#D8FF00] transition-colors shadow-lg"
            >
              <span>Explore All 8 Full Courses Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* WHY LEANEASE / HCI HEURISTICS HIGHLIGHTS                                 */}
        {/* ========================================================================= */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#D8FF00] uppercase tracking-widest bg-[#D8FF00]/10 px-3 py-1 rounded-full border border-[#D8FF00]/20">
              Why LearnEase
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight mt-3">
              Built on Proven HCI Usability Principles
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-2">
              Designed around how students actually learn — eliminating navigation confusion, cognitive overload, and messy course portals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#081827]/80 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#D8FF00]/15 text-[#D8FF00] flex items-center justify-center font-bold">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">System Status Visibility</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Live radial progress gauges, automated lesson checkmarks, and clear deadline alerts keep you informed of your academic standing.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#081827]/80 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#D8FF00]/15 text-[#D8FF00] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Zero Cognitive Friction</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                1-click lesson continuation, instant file dropzone submissions, and unified assignment tracking eliminate traditional LMS clutter.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#081827]/80 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#D8FF00]/15 text-[#D8FF00] flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Focus & Flow</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Distraction-free learning layout with auto-saving notes, smooth video playback controls, and rapid modular curriculum navigation.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#040A10] py-8 text-center text-xs text-white/40">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 LearnEase · Usability Evaluation Prototype · Built with Next.js & Tailwind CSS</p>
          <div className="flex gap-6">
            <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
            <Link href="/my-learning" className="hover:text-white transition-colors">My Learning</Link>
            <Link href="/assignments" className="hover:text-white transition-colors">Assignments</Link>
            <Link href="/calendar" className="hover:text-white transition-colors">Calendar</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
