'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, BookOpen, Star, Clock, User, CheckCircle2, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { useApp } from '@/context/AppContext';
import { withBasePath } from '@/lib/basePath';

const courseAltText: Record<string, string> = {
  c1: 'Illustration of a wireframe interface with a cursor and user icon',
  c2: 'Illustration of a code editor and browser window with HTML tags',
  c3: 'Illustration of a shield with a padlock over a security network',
  c4: 'Illustration of a circular sprint diagram next to a kanban board',
  c5: 'Illustration of a router connected to a laptop, server and phone',
  c6: 'Illustration of stacked database cylinders connected to a data table',
  c7: 'Illustration of a phone wireframe next to a layout grid with color swatches',
  c8: 'Illustration of a terminal window with a cursor and curly-brace symbol',
};

function CourseCardImage({ course }: { course: any }) {
  const [imgError, setImgError] = useState(false);
  const src = withBasePath(course.image);
  const alt = courseAltText[course.id] ?? `${course.title} course illustration`;
  const showImage = !!course.image && !imgError;

  if (showImage) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setImgError(true)}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full bg-[#102C40]" aria-hidden="true">
      <BookOpen className="w-16 h-16 text-white/30" />
    </div>
  );
}

export default function CoursesPage() {
  const { allCourses, enrollInCourse, enrolledCourses } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [difficultyFilter, setDifficultyFilter] = useState('All Levels');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [toastMessage, setToastMessage] = useState('');

  const categories = ['All Categories', 'Computer Science', 'Web Development', 'Cybersecurity', 'Design', 'Software Engineering', 'Networking', 'Database', 'Development', 'Security', 'Infrastructure', 'Engineering'];
  const difficulties = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
  const sortOptions = ['Most Popular', 'Highest Rated', 'Newest'];

  const filteredCourses = useMemo(() => {
    if (!allCourses) return [];
    
    return allCourses.filter((course: any) => {
      const matchesSearch = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (typeof course.instructor === 'string' && course.instructor.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = categoryFilter === 'All Categories' || course.category === categoryFilter;
      const matchesDifficulty = difficultyFilter === 'All Levels' || course.difficulty === difficultyFilter;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    }).sort((a: any, b: any) => {
      if (sortBy === 'Highest Rated') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'Newest') return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      return (b.students || 0) - (a.students || 0);
    });
  }, [allCourses, searchQuery, categoryFilter, difficultyFilter, sortBy]);

  const handleEnroll = (courseId: string) => {
    if (enrollInCourse) {
      enrollInCourse(courseId);
      setToastMessage('Successfully enrolled in course!');
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#081726] text-white flex flex-col font-sans">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Explore <span className="text-[#D8FF00]">Courses</span>
          </h1>
          <p className="text-white/60 mt-2 text-sm sm:text-base">
            Find the perfect course for your learning journey from our expert curriculum.
          </p>
        </div>

        {/* Search + Filters Row */}
        <div className="bg-[#0D2232]/85 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-white/10 mb-10 flex flex-col md:flex-row gap-4 shadow-xl">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text" 
              placeholder="Search courses by title, topic, or instructor..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#081726] border border-white/10 rounded-full text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#D8FF00] focus:ring-1 focus:ring-[#D8FF00] transition-all"
            />
          </div>
          
          <div className="flex flex-wrap md:flex-nowrap gap-3 items-center">
            {/* Category Filter */}
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2.5 bg-[#D8FF00] text-black font-bold text-xs rounded-full cursor-pointer focus:outline-none shadow-[0_0_12px_rgba(216,255,0,0.25)]"
            >
              {categories.map(c => <option key={c} value={c} className="bg-[#0D2232] text-white font-normal">{c}</option>)}
            </select>
            
            {/* Difficulty Filter */}
            <select 
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-4 py-2.5 bg-[#081726] border border-white/10 rounded-full text-xs text-white/80 font-medium cursor-pointer focus:outline-none focus:border-[#D8FF00]"
            >
              {difficulties.map(d => <option key={d} value={d} className="bg-[#0D2232] text-white">{d}</option>)}
            </select>
            
            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-white/40 hidden sm:block" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 bg-[#081726] border border-white/10 rounded-full text-xs text-white/80 font-medium cursor-pointer focus:outline-none focus:border-[#D8FF00]"
              >
                {sortOptions.map(s => <option key={s} value={s} className="bg-[#0D2232] text-white">{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6 flex justify-between items-center text-sm">
          <p className="text-white/60 font-medium">Showing <span className="text-[#D8FF00] font-bold">{filteredCourses.length}</span> courses</p>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course: any) => {
              const isEnrolled = enrolledCourses?.some((ec: any) => ec.courseId === course.id || ec.id === course.id);
              const instructorName = typeof course.instructor === 'string' ? course.instructor : course.instructor?.name || 'Instructor';

              return (
                <div 
                  key={course.id} 
                  className="bg-[#0D2232] hover:bg-[#112d42] rounded-2xl border border-white/10 hover:border-[#D8FF00]/40 overflow-hidden shadow-lg hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col group"
                >
                  {/* Image container with 3:2 aspect ratio */}
                  <Link href={`/courses/${course.id}`} className="relative aspect-[3/2] overflow-hidden block">
                    <CourseCardImage course={course} />
                    {/* Category badge */}
                    <div className="absolute top-3 left-3 bg-[#081726]/85 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-white text-xs font-semibold shadow-sm z-10">
                      {course.category}
                    </div>
                    {/* Difficulty badge */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-white/90 text-xs font-semibold shadow-sm z-10">
                      {course.difficulty || 'Beginner'}
                    </div>
                  </Link>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-lg text-white group-hover:text-[#D8FF00] transition-colors mb-1 line-clamp-1">
                      <Link href={`/courses/${course.id}`}>
                        {course.title}
                      </Link>
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3 text-xs text-white/60">
                      <User className="w-3.5 h-3.5 text-white/40" />
                      <span>{instructorName}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs font-medium text-white/60 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-white font-bold">{course.rating || '4.8'}</span>
                        <span className="text-white/40">({course.reviewCount || course.students || 0})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-white/40" />
                        <span>{course.duration || '6 weeks'}</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-white/60 line-clamp-2 mb-5 flex-1 leading-relaxed">
                      {course.description}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="font-extrabold text-lg text-[#D8FF00] tracking-tight">
                        {course.price || '$49.99'}
                      </span>
                      
                      {isEnrolled ? (
                        <Link 
                          href={`/learn/${course.id}/${course.lastLessonId || 'l1'}`}
                          className="flex items-center gap-1.5 px-4 py-2 bg-[#D8FF00]/15 border border-[#D8FF00]/30 text-[#D8FF00] rounded-full text-xs font-bold hover:bg-[#D8FF00] hover:text-black transition-all"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Enrolled</span>
                        </Link>
                      ) : (
                        <button 
                          onClick={() => handleEnroll(course.id)}
                          className="px-4 py-2 bg-[#D8FF00] text-black rounded-full text-xs font-bold hover:bg-[#cbf000] shadow-[0_0_12px_rgba(216,255,0,0.25)] transition-all min-h-[36px]"
                        >
                          Enroll Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-[#0D2232] rounded-2xl border border-white/10 py-16 px-4 text-center">
            <Search className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">No courses found</h3>
            <p className="text-white/50 text-sm mt-1">Try adjusting your search query or filters.</p>
          </div>
        )}

        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 bg-[#D8FF00] text-black font-bold px-6 py-3 rounded-full shadow-[0_0_20px_rgba(216,255,0,0.4)] flex items-center gap-2.5 z-50 animate-fade-in-up">
            <CheckCircle2 className="w-5 h-5 text-black" />
            <span>{toastMessage}</span>
          </div>
        )}
      </main>
    </div>
  );
}
