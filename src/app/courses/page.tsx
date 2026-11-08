'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, BookOpen, Star, Clock, User, CheckCircle } from 'lucide-react';
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
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full" aria-hidden="true">
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

  const categories = ['All Categories', 'Computer Science', 'Web Development', 'Cybersecurity', 'Design', 'Software Engineering', 'Networking', 'Database'];
  const difficulties = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
  const sortOptions = ['Most Popular', 'Highest Rated', 'Newest'];

  const filteredCourses = useMemo(() => {
    if (!allCourses) return [];
    
    return allCourses.filter((course: any) => {
      const matchesSearch = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = categoryFilter === 'All Categories' || course.category === categoryFilter;
      const matchesDifficulty = difficultyFilter === 'All Levels' || course.difficulty === difficultyFilter;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    }).sort((a: any, b: any) => {
      if (sortBy === 'Highest Rated') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'Newest') return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      // Most Popular
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Explore Courses</h1>
          <p className="text-gray-500 mt-2">Find the perfect course for your learning journey</p>
        </div>

        {/* Search + Filters Row */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
          </div>
          
          <div className="flex flex-wrap md:flex-nowrap gap-4">
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            
            <select 
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
            >
              {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-gray-400" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
              >
                {sortOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600 font-medium">Showing {filteredCourses.length} courses</p>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course: any) => {
              const isEnrolled = enrolledCourses?.some((ec: any) => ec.courseId === course.id);
              return (
                <div key={course.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col">
                  {/* Image container with 3:2 aspect ratio */}
                  <div className={`relative aspect-[3/2] ${course.color || 'bg-gradient-to-br from-indigo-500 to-purple-600'} flex items-center justify-center overflow-hidden`}>
                    <CourseCardImage course={course} />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-gray-800 text-xs font-bold shadow-sm z-10">
                      {course.category}
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
                      <Link href={`/courses/${course.id}`} className="hover:text-indigo-600 transition-colors">
                        {course.title}
                      </Link>
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{course.instructor?.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-gray-700">{course.rating || '4.5'}</span>
                        <span>({course.reviewCount || 0})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration || '4h 30m'}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 line-clamp-2 mb-5 flex-1">
                      {course.description}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 text-gray-700">
                        {course.difficulty || 'Beginner'}
                      </span>
                      
                      {isEnrolled ? (
                        <button className="flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium cursor-default">
                          <CheckCircle className="w-4 h-4" />
                          Enrolled
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleEnroll(course.id)}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
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
          <div className="bg-white rounded-xl border border-gray-200 py-16 px-4 text-center">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in-up">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        )}
      </main>
    </div>
  );
}
