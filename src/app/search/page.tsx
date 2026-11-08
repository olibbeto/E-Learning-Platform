'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import Link from 'next/link';
import { Search as SearchIcon, Book, PlayCircle, FileEdit, Clock, ChevronRight } from 'lucide-react';
import { withBasePath } from '@/lib/basePath';

// Mocked data for search
const mockCourses = [
  { id: 'c1', title: 'Human-Computer Interaction', description: 'Learn the principles of HCI and user experience design.', instructor: 'Dr. Sarah Johnson', category: 'Design', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'c2', title: 'Advanced React Patterns', description: 'Master complex React concepts and architecture.', instructor: 'Mike Chen', category: 'Development', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 'c3', title: 'Data Science Fundamentals', description: 'Introduction to statistics, Python, and machine learning.', instructor: 'Elena Rodriguez', category: 'Data Science', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
];

const mockLessons = [
  { id: 'l1', courseId: 'c1', courseTitle: 'Human-Computer Interaction', title: 'What is HCI?', duration: '10:00' },
  { id: 'l2', courseId: 'c1', courseTitle: 'Human-Computer Interaction', title: 'History of HCI', duration: '15:00' },
  { id: 'l3', courseId: 'c2', courseTitle: 'Advanced React Patterns', title: 'Custom Hooks', duration: '22:00' },
  { id: 'l4', courseId: 'c3', courseTitle: 'Data Science Fundamentals', title: 'Intro to Pandas', duration: '18:00' }
];

const mockAssignments = [
  { id: 'a1', courseId: 'c1', courseTitle: 'Human-Computer Interaction', title: 'Wireframing Assignment', dueDate: '2026-09-10' },
  { id: 'a2', courseId: 'c2', courseTitle: 'Advanced React Patterns', title: 'Build a Component Library', dueDate: '2026-09-15' }
];

type TabType = 'all' | 'courses' | 'lessons' | 'assignments';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(queryParam);
  const [searchInput, setSearchInput] = useState(queryParam);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Sync state with URL when it changes
  useEffect(() => {
    setQuery(queryParam);
    setSearchInput(queryParam);
    setIsLoading(true);
    
    // Simulate network request
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [queryParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput)}`);
    }
  };

  const lowerQuery = query.toLowerCase();

  // Filter results
  const filteredCourses = mockCourses.filter(c => 
    c.title.toLowerCase().includes(lowerQuery) || 
    c.description.toLowerCase().includes(lowerQuery) ||
    c.instructor.toLowerCase().includes(lowerQuery) ||
    c.category.toLowerCase().includes(lowerQuery)
  );

  const filteredLessons = mockLessons.filter(l => 
    l.title.toLowerCase().includes(lowerQuery) ||
    l.courseTitle.toLowerCase().includes(lowerQuery)
  );

  const filteredAssignments = mockAssignments.filter(a => 
    a.title.toLowerCase().includes(lowerQuery) ||
    a.courseTitle.toLowerCase().includes(lowerQuery)
  );

  const totalResults = filteredCourses.length + filteredLessons.length + filteredAssignments.length;

  // Highlight helper
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => 
          regex.test(part) ? <mark key={i} className="bg-yellow-200 text-gray-900 px-0.5 rounded">{part}</mark> : <span key={i}>{part}</span>
        )}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 p-4 shrink-0">
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="relative max-w-md w-full">
            <input 
              type="text" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search courses, lessons..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-full text-gray-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            <SearchIcon className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </form>
        </div>
      </div>

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {query ? `Results for "${query}"` : 'Search'}
          </h1>
          <p className="text-gray-500">
            {isLoading ? 'Searching...' : `Found ${totalResults} results`}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
          {(['all', 'courses', 'lessons', 'assignments'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors relative ${
                activeTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="capitalize">{tab}</span>
              {tab === 'courses' && <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">{filteredCourses.length}</span>}
              {tab === 'lessons' && <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">{filteredLessons.length}</span>}
              {tab === 'assignments' && <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">{filteredAssignments.length}</span>}
              
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-6 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 flex gap-6">
                <div className="w-48 h-32 bg-gray-200 rounded-lg shrink-0"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : totalResults === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <SearchIcon className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No results found for "{query}"</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">We couldn't find anything matching your search. Try checking for typos or using different keywords.</p>
            <Link href="/courses" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              Browse all courses
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Courses Section */}
            {(activeTab === 'all' || activeTab === 'courses') && filteredCourses.length > 0 && (
              <section>
                {activeTab === 'all' && <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Book className="w-5 h-5 text-blue-500"/> Courses</h2>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map(course => (
                    <Link href={`/courses/${course.id}`} key={course.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group">
                      <div className="h-48 bg-gray-200 relative overflow-hidden">
                        <img src={withBasePath(course.image)} alt={course.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-semibold text-gray-800">
                          {highlightText(course.category, query)}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {highlightText(course.title, query)}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {highlightText(course.description, query)}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">{highlightText(course.instructor || "", query)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Lessons Section */}
            {(activeTab === 'all' || activeTab === 'lessons') && filteredLessons.length > 0 && (
              <section>
                {activeTab === 'all' && <h2 className="text-xl font-semibold mb-4 mt-8 flex items-center gap-2"><PlayCircle className="w-5 h-5 text-purple-500"/> Lessons</h2>}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <ul className="divide-y divide-gray-200">
                    {filteredLessons.map(lesson => (
                      <li key={lesson.id}>
                        <Link href={`/learn/${lesson.courseId}/${lesson.id}`} className="flex items-start sm:items-center p-4 hover:bg-gray-50 transition-colors group">
                          <div className="bg-purple-100 p-3 rounded-lg mr-4 shrink-0 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <PlayCircle className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0 pr-4">
                            <p className="text-xs font-medium text-gray-500 mb-1">{highlightText(lesson.courseTitle, query)}</p>
                            <h4 className="text-base font-semibold text-gray-900 group-hover:text-purple-700 transition-colors truncate">
                              {highlightText(lesson.title, query)}
                            </h4>
                          </div>
                          <div className="shrink-0 flex items-center gap-4 text-sm text-gray-500">
                            <span className="hidden sm:flex items-center gap-1"><Clock className="w-4 h-4"/> {lesson.duration}</span>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Assignments Section */}
            {(activeTab === 'all' || activeTab === 'assignments') && filteredAssignments.length > 0 && (
              <section>
                {activeTab === 'all' && <h2 className="text-xl font-semibold mb-4 mt-8 flex items-center gap-2"><FileEdit className="w-5 h-5 text-orange-500"/> Assignments</h2>}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <ul className="divide-y divide-gray-200">
                    {filteredAssignments.map(assignment => (
                      <li key={assignment.id}>
                        <Link href={`/assignments/${assignment.id}`} className="flex items-start sm:items-center p-4 hover:bg-gray-50 transition-colors group">
                          <div className="bg-orange-100 p-3 rounded-lg mr-4 shrink-0 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                            <FileEdit className="w-6 h-6" />
                          </div>
                          <div className="flex-1 min-w-0 pr-4">
                            <p className="text-xs font-medium text-gray-500 mb-1">{highlightText(assignment.courseTitle, query)}</p>
                            <h4 className="text-base font-semibold text-gray-900 group-hover:text-orange-700 transition-colors truncate">
                              {highlightText(assignment.title, query)}
                            </h4>
                          </div>
                          <div className="shrink-0 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm">
                            <span className="text-orange-600 font-medium text-xs bg-orange-50 px-2 py-1 rounded">Due: {assignment.dueDate}</span>
                            <ChevronRight className="w-5 h-5 text-gray-400 hidden sm:block group-hover:text-orange-600 transition-colors" />
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" /></div>}>
      <SearchPageContent />
    </Suspense>
  );
}
