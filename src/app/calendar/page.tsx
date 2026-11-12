'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { ChevronLeft, ChevronRight, X, Calendar as CalendarIcon, ExternalLink } from 'lucide-react';

const calendarEvents = [
  { id: 1, date: '2026-09-05', type: 'assignment', title: 'UX Research Report', course: 'HCI', description: 'Submit the final UX research report detailing user interviews and personas.' },
  { id: 2, date: '2026-09-10', type: 'quiz', title: 'React Basics', course: 'Web Dev', description: 'Covers components, props, state, and hooks.' },
  { id: 3, date: '2026-09-15', type: 'lecture', title: 'Network Security', course: 'Cybersecurity', description: 'Live lecture on basic network security principles and cryptography.' },
  { id: 4, date: '2026-09-22', type: 'exam', title: 'Midterm Exam', course: 'HCI', description: 'Comprehensive exam covering all topics from weeks 1-6.' },
];

const eventColors = {
  assignment: 'bg-[#D8FF00]/15 text-[#D8FF00] border-[#D8FF00]/30',
  quiz: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  lecture: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  exam: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
};

const eventBadgeColors = {
  assignment: 'bg-[#D8FF00]',
  quiz: 'bg-blue-400',
  lecture: 'bg-purple-400',
  exam: 'bg-rose-400',
};

export default function CalendarPage() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [currentMonth, setCurrentMonth] = useState(9); // September
  const [currentYear, setCurrentYear] = useState(2026);

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay();
  const prevMonthDays = new Date(currentYear, currentMonth - 1, 0).getDate();

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const gridDays = [];
  
  // Prev month padding
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    gridDays.push({
      day: prevMonthDays - i,
      isCurrentMonth: false,
      dateString: `2026-08-${(prevMonthDays - i).toString().padStart(2, '0')}`,
      events: []
    });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `2026-09-${i.toString().padStart(2, '0')}`;
    const dayEvents = calendarEvents.filter(e => e.date === dateStr);
    gridDays.push({
      day: i,
      isCurrentMonth: true,
      isToday: i === 1,
      dateString: dateStr,
      events: dayEvents
    });
  }

  // Next month padding
  const totalCells = Math.ceil(gridDays.length / 7) * 7;
  const remainingCells = totalCells - gridDays.length;
  for (let i = 1; i <= remainingCells; i++) {
    gridDays.push({
      day: i,
      isCurrentMonth: false,
      dateString: `2026-10-${i.toString().padStart(2, '0')}`,
      events: []
    });
  }

  const handleEventClick = (e: React.MouseEvent, event: any) => {
    e.stopPropagation();
    setSelectedEvent(event);
  };

  return (
    <div className="min-h-screen bg-[#081726] text-white flex flex-col font-sans selection:bg-[#D8FF00] selection:text-black">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-8">
        
        {/* Main Calendar View */}
        <div className="flex-1 bg-[#0D2232] rounded-3xl shadow-xl border border-white/10 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#081726]/60">
            <h1 className="text-2xl font-black text-white tracking-tight">
              Academic <span className="text-[#D8FF00]">Calendar</span>
            </h1>
            <div className="flex items-center space-x-3">
              <button 
                onClick={handlePrevMonth} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
                aria-label="Previous Month"
              >
                <ChevronLeft size={20} />
              </button>
              <h2 className="text-base font-bold text-white w-40 text-center">
                {monthNames[currentMonth - 1]} {currentYear}
              </h2>
              <button 
                onClick={handleNextMonth} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
                aria-label="Next Month"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Calendar Grid Wrapper for Small Screens */}
          <div className="flex-1 overflow-x-auto flex flex-col">
            <div className="min-w-[480px] sm:min-w-0 flex-1 flex flex-col">
              {/* Grid Header */}
              <div className="grid grid-cols-7 border-b border-white/10 bg-[#081726]/40">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="py-2.5 text-center text-xs font-bold text-white/50 uppercase tracking-wider">
                    {day}
                  </div>
                ))}
              </div>

              {/* Grid Cells */}
              <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-white/5 gap-px">
                {gridDays.map((cell, idx) => (
                  <div 
                    key={idx} 
                    className={`min-h-[82px] sm:min-h-[110px] bg-[#0D2232] p-1.5 sm:p-2 transition-colors hover:bg-[#112e44] flex flex-col cursor-pointer ${!cell.isCurrentMonth ? 'opacity-30 bg-[#081726]' : ''}`}
                    onClick={() => {
                      if (cell.events.length > 0) {
                        setSelectedEvent(cell.events[0]);
                      }
                    }}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                        cell.isToday 
                          ? 'bg-[#D8FF00] text-black shadow-[0_0_10px_#D8FF00]' 
                          : cell.isCurrentMonth ? 'text-white' : 'text-white/40'
                      }`}>
                        {cell.day}
                      </span>
                    </div>
                    
                    <div className="space-y-1 overflow-y-auto max-h-[75px] no-scrollbar">
                      {cell.events.map(event => (
                        <div 
                          key={event.id}
                          onClick={(e) => handleEventClick(e, event)}
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-md truncate border cursor-pointer hover:scale-[1.02] transition-transform ${eventColors[event.type as keyof typeof eventColors]}`}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Upcoming Events */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-[#0D2232] rounded-3xl shadow-xl border border-white/10 p-6 space-y-6">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="text-[#D8FF00]" size={20} />
              <h2 className="text-lg font-bold text-white tracking-tight">Upcoming Events</h2>
            </div>
            
            <div className="space-y-3">
              {calendarEvents.map(event => (
                <div 
                  key={event.id} 
                  className="flex gap-4 p-3.5 rounded-2xl bg-[#081726]/60 hover:bg-[#081726] cursor-pointer transition-all border border-white/5 hover:border-[#D8FF00]/40 group"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex flex-col items-center justify-center min-w-[3rem] px-2 py-1 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-bold text-white/50 uppercase">Sep</span>
                    <span className="text-lg font-black text-[#D8FF00]">{event.date.split('-')[2]}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className={`w-2 h-2 rounded-full ${eventBadgeColors[event.type as keyof typeof eventBadgeColors]}`}></span>
                      <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider">{event.type}</span>
                    </div>
                    <h3 className="text-xs font-bold text-white group-hover:text-[#D8FF00] transition-colors truncate">{event.title}</h3>
                    <p className="text-[11px] text-white/40 mt-0.5">{event.course}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-[#0D2232] border border-white/15 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden text-white animate-fade-in-up">
            <div className="flex justify-between items-start p-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${eventColors[selectedEvent.type as keyof typeof eventColors]}`}>
                    {selectedEvent.type}
                  </span>
                  <span className="text-xs font-semibold text-white/50">{selectedEvent.date}</span>
                </div>
                <h3 className="text-xl font-black text-white">{selectedEvent.title}</h3>
                <p className="text-xs text-white/60 mt-1">{selectedEvent.course}</p>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="text-white/40 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Description</h4>
              <p className="text-sm text-white/80 leading-relaxed mb-6">
                {selectedEvent.description || 'No additional details provided for this event.'}
              </p>
              
              <Link 
                href="/courses" 
                className="w-full inline-flex items-center justify-center gap-2 bg-[#D8FF00] hover:bg-[#cbf000] text-black py-3 px-5 rounded-full text-xs font-bold shadow-[0_0_15px_rgba(216,255,0,0.3)] transition-all"
              >
                <span>View Course Material</span>
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
