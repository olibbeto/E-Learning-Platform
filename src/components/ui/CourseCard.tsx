'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Course } from '@/types';
import { Star, Clock, Users, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { cn, getTotalLessons, getCompletedLessons } from '@/lib/utils';
import { withBasePath } from '@/lib/basePath';

interface CourseCardProps {
  course: Course;
  variant?: 'catalog' | 'enrolled' | 'recommended';
  onEnroll?: (courseId: string) => void;
}

/** Descriptive alt text per course id — falls back to the course title. */
export const courseAltText: Record<string, string> = {
  c1: 'Illustration of a wireframe interface with a cursor and user icon',
  c2: 'Illustration of a code editor and browser window with HTML tags',
  c3: 'Illustration of a shield with a padlock over a security network',
  c4: 'Illustration of a circular sprint diagram next to a kanban board',
  c5: 'Illustration of a router connected to a laptop, server and phone',
  c6: 'Illustration of stacked database cylinders connected to a data table',
  c7: 'Illustration of a phone wireframe next to a layout grid with color swatches',
  c8: 'Illustration of a terminal window with a cursor and curly-brace symbol',
};

/**
 * CourseIllustration — renders the course SVG with:
 *   • withBasePath() so the URL is correct on GitHub Pages
 *   • loading="lazy" for performance
 *   • onerror → falls back to gradient + book icon
 *   • meaningful alt text per course
 */
export function CourseIllustration({
  course,
  imgClassName = '',
}: {
  course: Course;
  imgClassName?: string;
}) {
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
        className={cn('absolute inset-0 w-full h-full object-cover', imgClassName)}
      />
    );
  }

  // Fallback: gradient background + book icon
  return (
    <div
      className={cn(
        'absolute inset-0 flex items-center justify-center',
        course.color || 'bg-gradient-to-br from-[#102C40] to-[#0A1926]',
      )}
      aria-hidden="true"
    >
      <BookOpen className="w-16 h-16 text-white/30" />
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function CourseCard({ course, variant = 'catalog', onEnroll }: CourseCardProps) {
  const isEnrolled = course.enrolled;
  const instructorName =
    typeof course.instructor === 'string'
      ? course.instructor
      : course.instructor?.name ?? 'Instructor';

  // ── catalog ───────────────────────────────────────────────────────────────
  const renderCatalog = () => (
    <div className="group flex flex-col bg-[#0D2232] hover:bg-[#112d42] rounded-2xl border border-white/10 hover:border-[#D8FF00]/40 overflow-hidden shadow-lg hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-300 h-full">
      {/* Image area — 3:2 aspect ratio */}
      <Link href={`/courses/${course.id}`} className="block relative aspect-[3/2] overflow-hidden">
        <CourseIllustration
          course={course}
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category pill — top-left, over the image */}
        <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-[#081726]/85 backdrop-blur-md border border-white/10 text-xs font-semibold rounded-full text-white">
          {course.category}
        </span>
        {/* Difficulty pill — top-right */}
        <span className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-white/90 text-xs font-semibold rounded-full">
          {course.difficulty}
        </span>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/courses/${course.id}`} className="hover:text-[#D8FF00] transition-colors">
          <h3 className="font-bold text-lg text-white group-hover:text-[#D8FF00] transition-colors line-clamp-2 mb-1.5">
            {course.title}
          </h3>
        </Link>
        <p className="text-xs text-white/60 mb-3">{instructorName}</p>

        <div className="flex items-center gap-4 text-xs text-white/60 mb-4 flex-wrap">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" aria-hidden="true" />
            <span className="font-bold text-white">{course.rating}</span>
            <span className="text-white/40">({course.reviewCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-white/40" aria-hidden="true" />
            <span>{course.students?.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-white/40" aria-hidden="true" />
            <span>{course.duration}</span>
          </div>
        </div>

        <p className="text-xs text-white/60 line-clamp-2 mb-4 flex-1 leading-relaxed">
          {course.shortDescription || course.description}
        </p>

        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="font-extrabold text-lg text-[#D8FF00] tracking-tight">{course.price}</span>
          {isEnrolled ? (
            <Link
              href={`/learn/${course.id}/${course.lastLessonId || ''}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#D8FF00]/15 border border-[#D8FF00]/30 text-[#D8FF00] font-bold rounded-full text-xs hover:bg-[#D8FF00] hover:text-black transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Enrolled</span>
            </Link>
          ) : (
            <button
              onClick={() => onEnroll && onEnroll(course.id)}
              className="px-4 py-2 bg-[#D8FF00] text-black font-bold rounded-full text-xs hover:bg-[#cbf000] shadow-[0_0_12px_rgba(216,255,0,0.25)] transition-all min-h-[38px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8FF00]"
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // ── enrolled ──────────────────────────────────────────────────────────────
  const renderEnrolled = () => {
    const total = getTotalLessons(course);
    const completed = getCompletedLessons(course);
    const progressPct = total > 0 ? Math.round((completed / total) * 100) : (course.progress || 0);

    return (
      <div className="flex flex-col bg-[#0D2232] rounded-2xl border border-white/10 hover:border-[#D8FF00]/30 overflow-hidden shadow-lg transition-all p-4">
        <div className="flex items-start gap-4">
          <Link
            href={`/learn/${course.id}/${course.lastLessonId || ''}`}
            className="group shrink-0 w-24 h-24 rounded-xl overflow-hidden relative border border-white/10"
          >
            <CourseIllustration course={course} />
          </Link>
          <div className="flex-1 min-w-0">
            <Link
              href={`/learn/${course.id}/${course.lastLessonId || ''}`}
              className="hover:text-[#D8FF00] transition-colors"
            >
              <h3 className="font-bold text-white truncate mb-1 text-base">{course.title}</h3>
            </Link>
            <p className="text-xs text-white/60 mb-2.5">{instructorName}</p>

            <div className="flex items-center gap-2 mb-1">
              <div className="flex-1 bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#D8FF00] h-full rounded-full shadow-[0_0_8px_#D8FF00]"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="text-xs font-bold text-[#D8FF00] shrink-0">
                {progressPct}%
              </span>
            </div>
            <p className="text-[11px] text-white/50 mb-3">
              {completed} of {total} lessons complete
            </p>

            <Link
              href={`/learn/${course.id}/${course.lastLessonId || ''}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#D8FF00] text-black font-bold rounded-full text-xs hover:bg-[#cbf000] shadow-[0_0_12px_rgba(216,255,0,0.25)] transition-all min-h-[38px]"
            >
              <span>Continue Learning</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </Link>
          </div>
        </div>
      </div>
    );
  };

  // ── recommended ───────────────────────────────────────────────────────────
  const renderRecommended = () => (
    <div className="flex gap-4 p-3.5 bg-[#0D2232] rounded-2xl border border-white/10 hover:border-[#D8FF00]/40 transition-all group">
      <Link
        href={`/courses/${course.id}`}
        className="shrink-0 w-20 h-20 rounded-xl overflow-hidden relative border border-white/10"
      >
        <CourseIllustration course={course} />
      </Link>
      <div className="flex flex-col flex-1 py-0.5">
        <Link
          href={`/courses/${course.id}`}
          className="hover:text-[#D8FF00] transition-colors line-clamp-1 font-bold text-white text-sm mb-1"
        >
          {course.title}
        </Link>
        <div className="flex items-center gap-3 text-xs text-white/60 mb-2">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" aria-hidden="true" />
            <span className="font-bold text-white">{course.rating}</span>
          </div>
          <span>{course.difficulty}</span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-extrabold text-sm text-[#D8FF00]">{course.price}</span>
          <button
            onClick={() => onEnroll && onEnroll(course.id)}
            className="text-xs font-bold text-black bg-[#D8FF00] hover:bg-[#cbf000] px-3.5 py-1.5 rounded-full transition-all shadow-[0_0_10px_rgba(216,255,0,0.25)]"
          >
            Enroll
          </button>
        </div>
      </div>
    </div>
  );

  if (variant === 'enrolled') return renderEnrolled();
  if (variant === 'recommended') return renderRecommended();
  return renderCatalog();
}
