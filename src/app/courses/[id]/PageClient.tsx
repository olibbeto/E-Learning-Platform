'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronRight, 
  Star, 
  Users, 
  Clock, 
  BookOpen, 
  Check, 
  PlayCircle, 
  FileText,
  Award, 
  Shield, 
  ChevronDown, 
  ChevronUp,
  CheckCircle2
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { useApp } from '@/context/AppContext';
import { withBasePath } from '@/lib/basePath';
import { CourseIllustration } from '@/components/ui/CourseCard';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const { allCourses, enrolledCourses, enrollInCourse } = useApp();
  
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({ 0: true });

  const course = allCourses?.find((c: any) => c.id === courseId);
  const enrolledData = enrolledCourses?.find((ec: any) => ec.courseId === courseId || ec.id === courseId);
  const isEnrolled = !!enrolledData;

  if (!course) {
    return (
      <div className="min-h-screen bg-[#081726] text-white flex flex-col items-center justify-center font-sans">
        <Navbar />
        <div className="text-center mt-20 flex-1">
          <h1 className="text-3xl font-black text-white mb-2">Course not found</h1>
          <p className="text-white/60 mb-6 text-sm">The course you're looking for doesn't exist or has been removed.</p>
          <Link href="/courses" className="px-6 py-3 bg-[#D8FF00] text-black rounded-full font-bold hover:bg-[#cbf000] transition-colors shadow-[0_0_15px_rgba(216,255,0,0.3)]">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    if (enrollInCourse) {
      enrollInCourse(course.id);
      router.push(`/learn/${course.id}/${course.modules?.[0]?.lessons?.[0]?.id || 'l1'}`);
    }
  };

  const toggleModule = (index: number) => {
    setExpandedModules(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const objectives = course.objectives || [
    "Master the fundamental concepts and practical applications.",
    "Build real-world projects from scratch.",
    "Understand industry best practices and standards.",
    "Develop problem-solving skills for complex scenarios."
  ];

  const modules = course.modules || [
    { title: "Getting Started", duration: "45m", lessons: [{ id: '1', title: "Introduction", duration: "10m", type: "video" }, { id: '2', title: "Setup and Installation", duration: "35m", type: "text" }] },
    { title: "Core Concepts", duration: "2h 15m", lessons: [{ id: '3', title: "Fundamentals", duration: "45m", type: "video" }, { id: '4', title: "Advanced Topics", duration: "1h 30m", type: "video" }] }
  ];

  const instructorName = typeof course.instructor === 'string' ? course.instructor : course.instructor?.name || 'Instructor';

  return (
    <div className="min-h-screen bg-[#081726] text-white pb-24 font-sans selection:bg-[#D8FF00] selection:text-black">
      <Navbar />
      
      {/* Hero Header */}
      <div className="bg-[#0D2232] border-b border-white/10 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="w-full lg:w-2/3 pr-0 lg:pr-12">
            {/* Breadcrumb */}
            <div className="flex items-center text-xs text-white/50 mb-6 gap-2">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#D8FF00] font-semibold">{course.title}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-tight tracking-tight text-white">
              {course.title}
            </h1>
            
            <p className="text-base sm:text-lg text-white/70 mb-8 leading-relaxed font-normal">
              {course.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-xs text-white/70">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-bold text-white">{course.rating || '4.8'}</span>
                <span className="text-white/40">({course.reviewCount || 1240} ratings)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#D8FF00]" />
                <span>{course.students?.toLocaleString() || '4,500'} students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#D8FF00]" />
                <span>{course.duration || '6 weeks'}</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#102C40] border border-white/10 font-bold text-white">
                {course.difficulty || 'Intermediate'}
              </span>
            </div>
            
            <div className="mt-8 flex items-center gap-3.5">
              <div className="w-10 h-10 bg-[#102C40] border border-[#D8FF00]/40 rounded-full flex items-center justify-center font-bold text-sm text-[#D8FF00]">
                {instructorName.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-sm text-white">{instructorName}</p>
                <p className="text-xs text-white/50">Lead Course Instructor</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column */}
          <div className="w-full lg:w-2/3 space-y-12">
            
            {/* About course */}
            <section>
              <h2 className="text-2xl font-black text-white mb-4 tracking-tight">About this course</h2>
              <div className="text-white/70 space-y-4 leading-relaxed text-sm sm:text-base">
                <p>{course.description}</p>
                <p>This comprehensive course is designed to take you from foundational principles to advanced concepts with practical, hands-on examples. You will learn by building real-world projects and solving complex scenarios that mirror industry workflows.</p>
              </div>
            </section>

            {/* What you'll learn */}
            <section className="bg-[#0D2232] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h2 className="text-xl font-black text-white mb-6 tracking-tight">What you'll learn</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {objectives.map((obj: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-white/80">
                    <CheckCircle2 className="w-5 h-5 text-[#D8FF00] shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Curriculum */}
            <section>
              <h2 className="text-2xl font-black text-white mb-6 tracking-tight">Course Curriculum</h2>
              <div className="border border-white/10 rounded-2xl bg-[#0D2232] overflow-hidden divide-y divide-white/10 shadow-xl">
                {modules.map((module: any, idx: number) => (
                  <div key={idx} className="w-full">
                    <button 
                      onClick={() => toggleModule(idx)}
                      className="w-full flex items-center justify-between p-5 bg-[#0D2232] hover:bg-[#112d42] transition-colors text-left"
                    >
                      <div>
                        <h3 className="font-bold text-white text-base">{module.title}</h3>
                        <p className="text-xs text-white/50 mt-1">
                          {module.lessons?.length || 0} lessons • {module.duration}
                        </p>
                      </div>
                      <div className="text-white/60">
                        {expandedModules[idx] ? <ChevronUp className="w-5 h-5 text-[#D8FF00]" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </button>
                    
                    {expandedModules[idx] && (
                      <div className="p-3 bg-[#081726]/60 border-t border-white/5 space-y-1">
                        {module.lessons?.map((lesson: any, lIdx: number) => (
                          <div key={lesson.id || lIdx} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors">
                            <div className="flex items-center gap-3">
                              {lesson.type === 'video' ? (
                                <PlayCircle className="w-4 h-4 text-[#D8FF00]" />
                              ) : (
                                <FileText className="w-4 h-4 text-cyan-400" />
                              )}
                              <span className="text-xs font-semibold text-white/90">{lesson.title}</span>
                            </div>
                            <span className="text-xs text-white/40">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column Sticky Card */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-28 bg-[#0D2232] border border-white/10 rounded-3xl shadow-2xl overflow-hidden -mt-16 lg:-mt-40 z-10">
              <div className="h-48 relative overflow-hidden flex items-center justify-center">
                <CourseIllustration course={course} />
              </div>
              
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-black text-[#D8FF00] tracking-tight">{course.price || '$49.99'}</span>
                  <span className="text-xs text-white/40">Full lifetime access</span>
                </div>

                {isEnrolled ? (
                  <Link 
                    href={`/learn/${course.id}/${enrolledData.lastLessonId || modules[0]?.lessons?.[0]?.id || 'l1'}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-[#D8FF00] hover:bg-[#cbf000] text-black rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(216,255,0,0.35)]"
                  >
                    <span>Continue Learning</span>
                    <ChevronRight className="w-4 h-4 text-black" />
                  </Link>
                ) : (
                  <button 
                    onClick={handleEnroll}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-[#D8FF00] hover:bg-[#cbf000] text-black rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(216,255,0,0.35)]"
                  >
                    <span>Enroll in Course</span>
                    <ChevronRight className="w-4 h-4 text-black" />
                  </button>
                )}
                
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider text-white/60">This course includes:</h4>
                  <ul className="space-y-3 text-xs text-white/70">
                    <li className="flex items-center gap-3">
                      <PlayCircle className="w-4 h-4 text-[#D8FF00]" />
                      <span>{modules.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0)} video and text lessons</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-[#D8FF00]" />
                      <span>Downloadable resources & worksheets</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-[#D8FF00]" />
                      <span>Full lifetime access on web & mobile</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Award className="w-4 h-4 text-[#D8FF00]" />
                      <span>Verified certificate of completion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
