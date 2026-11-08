'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { useApp } from '@/context/AppContext';
import { Edit2, Save, X, BookOpen, Clock, Star, Megaphone, CheckCircle2 } from 'lucide-react';

const courses = [
  { id: 'c1', name: 'Human-Computer Interaction (HCI)', progress: 72 },
  { id: 'c2', name: 'Web Development Fundamentals', progress: 45 },
  { id: 'c3', name: 'Cybersecurity Fundamentals', progress: 28 },
];

const iconMap = {
  assignment: Clock,
  grade: Star,
  lesson: BookOpen,
  announcement: Megaphone
};

export default function ProfilePage() {
  const { updateProfile, notifications, currentUser } = useApp();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: currentUser?.name || 'Alex Johnson',
    email: currentUser?.email || 'alex.johnson@university.edu',
    bio: currentUser?.bio || 'Passionate student interested in web development and UX design. Always looking for new ways to learn and build things.',
    joinDate: 'January 2024'
  });
  
  const [editForm, setEditForm] = useState(profile);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = () => {
    setProfile(editForm);
    if (updateProfile) updateProfile(editForm);
    setIsEditing(false);
    setToastMessage('Profile updated successfully');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const initials = profile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  const recentActivity = [...(notifications || [])].slice(0, 5);

  return (
    <div className="min-h-screen bg-[#081726] text-white flex flex-col font-sans selection:bg-[#D8FF00] selection:text-black">
      <Navbar />
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#D8FF00] text-black font-bold px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(216,255,0,0.4)] flex items-center gap-2.5 animate-fade-in-up">
          <CheckCircle2 className="w-4 h-4 text-black" />
          <span className="text-xs">{toastMessage}</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Profile Header Card */}
        <div className="bg-[#0D2232] rounded-3xl shadow-xl border border-white/10 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-[#102C40] border-2 border-[#D8FF00] flex items-center justify-center text-2xl font-black text-[#D8FF00] shadow-[0_0_15px_rgba(216,255,0,0.3)]">
                {initials}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">{profile.name}</h1>
                <p className="text-xs text-white/50 mt-0.5">{profile.email}</p>
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <span className="text-[#D8FF00] font-semibold bg-[#D8FF00]/15 px-3 py-0.5 rounded-full border border-[#D8FF00]/30">Student</span>
                  <span className="text-white/40">Member since {profile.joinDate}</span>
                </div>
              </div>
            </div>

            <div>
              {isEditing ? (
                <div className="flex gap-2">
                  <button 
                    onClick={handleSave} 
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-[#D8FF00] text-black font-bold rounded-full text-xs hover:bg-[#cbf000] shadow-[0_0_12px_rgba(216,255,0,0.25)] transition-all"
                  >
                    <Save size={14} />
                    <span>Save</span>
                  </button>
                  <button 
                    onClick={handleCancel} 
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-white/10 text-white font-medium rounded-full text-xs hover:bg-white/15 transition-all"
                  >
                    <X size={14} />
                    <span>Cancel</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-white/10 text-white border border-white/10 hover:border-[#D8FF00]/40 font-bold rounded-full text-xs hover:bg-white/15 transition-all"
                >
                  <Edit2 size={14} className="text-[#D8FF00]" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-2">About Me</h2>
            {isEditing ? (
              <textarea 
                value={editForm.bio}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                className="w-full p-3 rounded-2xl bg-[#081726] border border-white/15 text-white text-sm focus:outline-none focus:border-[#D8FF00]"
                rows={3}
              />
            ) : (
              <p className="text-sm text-white/70 leading-relaxed max-w-3xl">{profile.bio}</p>
            )}
          </div>
        </div>

        {/* Courses & Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Enrolled Courses */}
          <div className="bg-[#0D2232] rounded-3xl shadow-xl border border-white/10 p-6 sm:p-8 flex flex-col">
            <h2 className="text-lg font-bold text-white mb-6">Enrolled Courses</h2>
            <div className="space-y-6 flex-1">
              {courses.map(course => (
                <div key={course.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-sm font-bold text-white truncate pr-4">{course.name}</h3>
                    <span className="text-sm font-black text-[#D8FF00]">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-[#D8FF00] h-full rounded-full shadow-[0_0_8px_#D8FF00]"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#0D2232] rounded-3xl shadow-xl border border-white/10 p-6 sm:p-8 flex flex-col">
            <h2 className="text-lg font-bold text-white mb-6">Recent Activity</h2>
            <div className="space-y-3 flex-1">
              {recentActivity.map((act) => {
                const IconComponent = iconMap[act.type as keyof typeof iconMap] || BookOpen;
                return (
                  <div key={act.id} className="flex gap-3.5 p-3 rounded-2xl bg-[#081726]/60 border border-white/5 items-center">
                    <div className="p-2 rounded-xl bg-[#102C40] text-[#D8FF00]">
                      <IconComponent size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">{act.title}</p>
                      <p className="text-[11px] text-white/50 truncate mt-0.5">{act.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
