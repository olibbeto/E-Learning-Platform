'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Play, Pause, Maximize, Volume2, ArrowLeft, ArrowRight, CheckCircle, FileText, Download, Menu, Clock, BookOpen, X } from 'lucide-react';

const mockAllCourses = [
  {
    id: 'c1',
    title: 'Human-Computer Interaction',
    modules: [
      {
        id: 'm1',
        title: 'Introduction to HCI',
        lessons: [
          { id: 'l1', title: 'What is HCI?', duration: '10:00', type: 'video' },
          { id: 'l2', title: 'History of HCI', duration: '15:00', type: 'video' }
        ]
      },
      {
        id: 'm2',
        title: 'Design Principles',
        lessons: [
          { id: 'l3', title: 'Affordances and Signifiers', duration: '20:00', type: 'video' }
        ]
      }
    ]
  }
];

export default function LessonPage({ params }: { params: { courseId: string; lessonId: string } }) {
  const router = useRouter();
  const { courseId, lessonId } = params;
  
  // Mock context state
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const markLessonComplete = (id: string) => setCompletedLessons(prev => [...prev, id]);
  
  const allCourses = mockAllCourses; 
  const course = allCourses.find(c => c.id === courseId) || allCourses[0];

  // Flatten lessons to find current, prev, next
  const flatLessons = useMemo(() => {
    return course.modules.flatMap(m => 
      m.lessons.map(l => ({ ...l, moduleId: m.id, moduleTitle: m.title }))
    );
  }, [course]);

  const currentIndex = flatLessons.findIndex(l => l.id === lessonId);
  const lesson = flatLessons[currentIndex >= 0 ? currentIndex : 0];
  const prevLesson = currentIndex > 0 ? flatLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < flatLessons.length - 1 ? flatLessons[currentIndex + 1] : null;
  
  const isCompleted = completedLessons.includes(lesson?.id);

  const totalLessons = flatLessons.length;
  const completedCount = completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Video UI state
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);

  // Notes state
  const [notes, setNotes] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load notes from local storage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes-${courseId}-${lessonId}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [courseId, lessonId]);

  // Auto-save notes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(`notes-${courseId}-${lessonId}`, notes);
      if (notes) {
        setSaveStatus('Notes auto-saved');
        setTimeout(() => setSaveStatus(''), 2000);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [notes, courseId, lessonId]);

  // Mock video progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return p + (0.5 * playbackSpeed);
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleComplete = () => {
    if (!isCompleted && lesson) {
      markLessonComplete(lesson.id);
    }
  };

  const handleDownload = (filename: string) => {
    alert(`Download started: ${filename}`);
  };

  if (!lesson) {
    return <div className="p-8 text-center text-white">Lesson not found.</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-[#081726] text-white overflow-hidden">
      {/* Top bar */}
      <header className="flex-none h-16 bg-[#0A1926] border-b border-[#102C40] flex items-center justify-between px-4 sm:px-6 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-md"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/my-learning" className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-semibold text-sm sm:text-base hidden sm:block truncate max-w-sm text-white">{course.title}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-medium text-white/70">Lesson {currentIndex + 1} of {totalLessons}</span>
            <div className="w-32 h-1.5 bg-white/10 rounded-full mt-1.5 overflow-hidden">
              <div 
                className="h-full bg-[#D8FF00] rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(216,255,0,0.6)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar (Desktop) */}
        <aside className="hidden lg:block w-72 bg-[#0A1926] border-r border-[#102C40] overflow-y-auto">
          <div className="p-4">
            <h2 className="font-bold text-sm tracking-wider uppercase text-white/50 mb-3">Course Content</h2>
            {course.modules.map(mod => (
              <div key={mod.id} className="mb-4">
                <h3 className="font-semibold text-xs text-white/80 mb-2">{mod.title}</h3>
                <ul className="space-y-1">
                  {mod.lessons.map(l => {
                    const isCurrent = l.id === lesson.id;
                    const isDone = completedLessons.includes(l.id);
                    return (
                      <li key={l.id}>
                        <Link 
                          href={`/learn/${courseId}/${l.id}`}
                          className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-colors ${
                            isCurrent 
                              ? 'bg-[#D8FF00]/15 text-[#D8FF00] font-semibold border-l-2 border-[#D8FF00]' 
                              : 'hover:bg-white/5 text-white/70'
                          }`}
                        >
                          {isDone ? <CheckCircle className="w-3.5 h-3.5 text-[#D8FF00]" /> : <Play className="w-3.5 h-3.5 text-white/40" />}
                          <span className="truncate">{l.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Left Sidebar (Mobile Drawer) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
            <div className="relative flex flex-col w-72 bg-[#0A1926] h-full shadow-2xl border-r border-[#102C40]">
              <div className="flex items-center justify-between p-4 border-b border-[#102C40]">
                <h2 className="font-bold text-sm text-white">Course Content</h2>
                <button onClick={() => setSidebarOpen(false)} className="text-white/60 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto">
                {course.modules.map(mod => (
                  <div key={mod.id} className="mb-4">
                    <h3 className="font-semibold text-xs text-white/80 mb-2">{mod.title}</h3>
                    <ul className="space-y-1">
                      {mod.lessons.map(l => {
                        const isCurrent = l.id === lesson.id;
                        const isDone = completedLessons.includes(l.id);
                        return (
                          <li key={l.id}>
                            <Link 
                              onClick={() => setSidebarOpen(false)}
                              href={`/learn/${courseId}/${l.id}`}
                              className={`flex items-center gap-2 p-2 rounded-lg text-xs ${isCurrent ? 'bg-[#D8FF00]/15 text-[#D8FF00] font-semibold' : 'text-white/70'}`}
                            >
                              {isDone ? <CheckCircle className="w-3.5 h-3.5 text-[#D8FF00]" /> : <Play className="w-3.5 h-3.5 text-white/40" />}
                              <span className="truncate">{l.title}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Center Content */}
        <main className="flex-1 overflow-y-auto bg-[#081726] flex justify-center">
          <div className="max-w-4xl w-full p-4 sm:p-8 flex flex-col gap-8 pb-32">
            
            {/* Breadcrumb */}
            <nav className="text-xs text-white/50 flex gap-2 items-center">
              <Link href="/my-learning" className="hover:text-white">My Learning</Link>
              <span>/</span>
              <span className="truncate max-w-[150px]">{course.title}</span>
              <span>/</span>
              <span className="truncate max-w-[150px]">{lesson.moduleTitle}</span>
              <span>/</span>
              <span className="text-[#D8FF00] font-medium">{lesson.title}</span>
            </nav>

            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{lesson.title}</h1>

            {/* Video Player */}
            <div className="w-full aspect-video bg-[#050D15] rounded-2xl overflow-hidden relative flex flex-col group border border-[#102C40] shadow-2xl">
              <div className="absolute top-4 left-4 text-white/80 text-xs font-medium z-10 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full">
                Now playing: {lesson.title}
              </div>
              
              <div className="flex-1 flex items-center justify-center relative">
                {/* Center Play/Pause Overlay */}
                <button 
                  onClick={togglePlay}
                  className="w-16 h-16 bg-[#D8FF00] text-black rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-[0_0_30px_rgba(216,255,0,0.5)]"
                >
                  {isPlaying ? <Pause className="w-7 h-7 fill-black" /> : <Play className="w-7 h-7 ml-1 fill-black" />}
                </button>
              </div>

              {/* Controls */}
              <div className="h-14 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-center px-4 gap-4 text-white">
                <button onClick={togglePlay} className="hover:text-[#D8FF00] transition-colors">
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                
                <div className="flex-1 flex items-center gap-2 group/slider cursor-pointer">
                  <span className="text-xs font-mono text-white/60 w-10 text-right">
                    {Math.floor((progress * parseInt(lesson.duration)) / 100)}:{(Math.floor((progress * parseInt(lesson.duration) * 60) / 100) % 60).toString().padStart(2, '0')}
                  </span>
                  <div className="flex-1 h-1.5 bg-white/20 rounded-full relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-[#D8FF00]" style={{ width: `${progress}%` }}></div>
                  </div>
                  <span className="text-xs font-mono text-white/60 w-10">{lesson.duration}</span>
                </div>

                <div className="flex items-center gap-3">
                  <select 
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                    className="bg-transparent text-xs cursor-pointer hover:text-[#D8FF00] outline-none text-white/80"
                  >
                    <option value={0.5} className="bg-[#0A1926] text-white">0.5x</option>
                    <option value={1} className="bg-[#0A1926] text-white">1x</option>
                    <option value={1.25} className="bg-[#0A1926] text-white">1.25x</option>
                    <option value={1.5} className="bg-[#0A1926] text-white">1.5x</option>
                    <option value={2} className="bg-[#0A1926] text-white">2x</option>
                  </select>
                  
                  <div className="flex items-center gap-1">
                    <Volume2 className="w-4 h-4 hover:text-[#D8FF00] cursor-pointer" />
                  </div>

                  <button className="hover:text-[#D8FF00] transition-colors">
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content card */}
            <div className="flex flex-col gap-6 bg-[#0D2232] p-6 sm:p-8 rounded-2xl border border-[#102C40] shadow-xl">
              <section>
                <h2 className="text-lg font-bold text-white mb-3">Lesson Summary</h2>
                <p className="text-white/70 leading-relaxed text-sm">
                  In this lesson, we explore the fundamental concepts of {lesson.title.toLowerCase()}. Understanding these principles is critical for designing intuitive user interfaces and modern educational systems.
                </p>
                <h3 className="font-semibold text-sm text-[#D8FF00] mt-4 mb-2">Learning Objectives:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-white/70">
                  <li>Define the core aspects of {lesson.title.toLowerCase()}.</li>
                  <li>Identify common patterns used in modern web design.</li>
                  <li>Apply basic psychological principles to UI layouts.</li>
                </ul>
              </section>

              <hr className="border-[#102C40]" />

              <section>
                <h2 className="text-lg font-bold text-white mb-3">Reading Material</h2>
                <div className="text-white/75 text-sm space-y-3 leading-relaxed">
                  <p>
                    Human-Computer Interaction (HCI) is a multidisciplinary field of study focusing on the design of computer technology and, in particular, the interaction between humans (the users) and computers.
                  </p>
                  <p>
                    When designing interfaces, affordances play a crucial role. An affordance is a property in which the physical characteristics of an object or environment influence its function. For example, a physical button affords clicking, and a digital button must visually signal that same affordance using signifiers like borders, subtle glow, or high-contrast accent colors.
                  </p>
                </div>
              </section>

              <hr className="border-[#102C40]" />

              <section>
                <h2 className="text-lg font-bold text-white mb-4">Resources</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { name: 'Lecture Slides', type: 'PDF', size: '2.4 MB' },
                    { name: 'Design Assets', type: 'ZIP', size: '15.1 MB' },
                    { name: 'Cheatsheet', type: 'PDF', size: '1.1 MB' }
                  ].map((res, i) => (
                    <div key={i} className="border border-[#102C40] rounded-xl p-3.5 flex items-center justify-between hover:border-[#D8FF00]/50 transition-colors bg-[#0A1926]">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#D8FF00]/10 text-[#D8FF00] rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium text-xs text-white truncate max-w-[90px]">{res.name}</p>
                          <p className="text-[11px] text-white/40">{res.type} • {res.size}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDownload(res.name)}
                        className="text-white/40 hover:text-[#D8FF00] p-1.5 rounded-full hover:bg-white/5 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <hr className="border-[#102C40]" />

              <section>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold text-white">Your Notes</h2>
                  {saveStatus && <span className="text-xs text-[#D8FF00] font-medium bg-[#D8FF00]/10 px-2.5 py-1 rounded-full">{saveStatus}</span>}
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Take notes here... They are automatically saved."
                  className="w-full h-32 p-4 border border-[#102C40] rounded-xl focus:ring-2 focus:ring-[#D8FF00] focus:border-transparent outline-none resize-y text-white text-sm bg-[#0A1926] transition-colors"
                ></textarea>
              </section>
            </div>
          </div>
        </main>

        {/* Right Sidebar (Desktop) */}
        <aside className="hidden xl:block w-80 bg-[#0A1926] border-l border-[#102C40] overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="bg-[#0D2232] rounded-2xl p-5 border border-[#102C40]">
              <h3 className="font-semibold text-white text-sm mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5 text-white/70">
                    <span>Course Completion</span>
                    <span className="font-bold text-[#D8FF00]">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#D8FF00] rounded-full shadow-[0_0_8px_rgba(216,255,0,0.5)]" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[#0A1926] p-3 rounded-xl border border-[#102C40] text-center">
                    <span className="block text-xl font-bold text-white">{completedCount}/{totalLessons}</span>
                    <span className="text-white/40 text-[10px] uppercase font-semibold">Lessons</span>
                  </div>
                  <div className="bg-[#0A1926] p-3 rounded-xl border border-[#102C40] text-center">
                    <span className="block text-xl font-bold text-[#D8FF00]">12h</span>
                    <span className="text-white/40 text-[10px] uppercase font-semibold">Remaining</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white text-sm mb-3">About this Lesson</h3>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 text-white/70 bg-[#0D2232] p-3 rounded-xl border border-[#102C40]">
                  <Clock className="w-4 h-4 text-[#D8FF00]" />
                  <div>
                    <p className="text-[10px] text-white/40 uppercase font-semibold">Duration</p>
                    <p className="font-medium text-xs text-white">{lesson.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/70 bg-[#0D2232] p-3 rounded-xl border border-[#102C40]">
                  <BookOpen className="w-4 h-4 text-[#D8FF00]" />
                  <div>
                    <p className="text-[10px] text-white/40 uppercase font-semibold">Module</p>
                    <p className="font-medium text-xs text-white">{lesson.moduleTitle}</p>
                  </div>
                </div>
              </div>
            </div>

            {nextLesson && (
              <div>
                <h3 className="font-semibold text-white text-sm mb-3">Up Next</h3>
                <Link href={`/learn/${courseId}/${nextLesson.id}`} className="block border border-[#102C40] rounded-xl p-4 bg-[#0D2232] hover:border-[#D8FF00]/50 transition-all group cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-semibold text-[#D8FF00] bg-[#D8FF00]/10 px-2 py-0.5 rounded-full">Next Lesson</span>
                    <Play className="w-4 h-4 text-white/40 group-hover:text-[#D8FF00]" />
                  </div>
                  <h4 className="font-medium text-xs text-white group-hover:text-[#D8FF00] transition-colors">{nextLesson.title}</h4>
                  <p className="text-[11px] text-white/40 mt-1">{nextLesson.duration} • Video</p>
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 h-20 bg-[#0A1926]/95 backdrop-blur-md border-t border-[#102C40] z-30 lg:left-72 xl:right-80 px-4 sm:px-8 flex items-center justify-between">
        <button
          onClick={() => prevLesson && router.push(`/learn/${courseId}/${prevLesson.id}`)}
          disabled={!prevLesson}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-colors ${!prevLesson ? 'text-white/30 cursor-not-allowed' : 'text-white/80 hover:bg-white/10'}`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous Lesson</span>
          <span className="sm:hidden">Prev</span>
        </button>

        <button
          onClick={handleComplete}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold transition-all ${
            isCompleted 
              ? 'bg-[#D8FF00]/20 text-[#D8FF00] border border-[#D8FF00]' 
              : 'bg-[#D8FF00] text-black hover:bg-[#cbf200] shadow-[0_0_20px_rgba(216,255,0,0.35)]'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>{isCompleted ? 'Lesson Completed!' : 'Mark as Complete'}</span>
        </button>

        <button
          onClick={() => nextLesson && router.push(`/learn/${courseId}/${nextLesson.id}`)}
          disabled={!nextLesson}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-colors ${!nextLesson ? 'text-white/30 cursor-not-allowed' : 'text-[#D8FF00] hover:bg-[#D8FF00]/10'}`}
        >
          <span className="hidden sm:inline">Next Lesson</span>
          <span className="sm:hidden">Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
}
