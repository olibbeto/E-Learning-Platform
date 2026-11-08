'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { User, Bell, Palette, Accessibility, AlertTriangle, Check, Monitor, Moon, Sun, Type, CheckCircle2 } from 'lucide-react';

type TabType = 'account' | 'notifications' | 'appearance' | 'accessibility';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('account');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Settings State
  const [notifyAnnouncements, setNotifyAnnouncements] = useState(true);
  const [notifyAssignments, setNotifyAssignments] = useState(true);
  const [notifyGrades, setNotifyGrades] = useState(true);
  const [notifyLessons, setNotifyLessons] = useState(false);
  const [notifySummary, setNotifySummary] = useState(true);

  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState('medium');

  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Load from localStorage for reduce motion
  useEffect(() => {
    const saved = localStorage.getItem('reduceMotion');
    if (saved) setReduceMotion(JSON.parse(saved));
  }, []);

  const handleReduceMotionChange = (val: boolean) => {
    setReduceMotion(val);
    localStorage.setItem('reduceMotion', JSON.stringify(val));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Password updated successfully');
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
  ];

  return (
    <div className="min-h-screen bg-[#081726] text-white flex flex-col font-sans selection:bg-[#D8FF00] selection:text-black">
      <Navbar />

      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#D8FF00] text-black font-bold px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(216,255,0,0.4)] flex items-center gap-2.5 animate-fade-in-up">
          <CheckCircle2 className="w-4 h-4 text-black" />
          <p className="text-xs">{toastMessage}</p>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-[#0D2232] rounded-3xl border border-white/10 shadow-2xl max-w-sm w-full p-6 text-white animate-fade-in-up">
            <div className="flex items-center gap-3 text-rose-400 mb-4">
              <AlertTriangle size={24} />
              <h3 className="text-lg font-bold">Delete Account</h3>
            </div>
            <p className="text-white/60 text-xs mb-6 leading-relaxed">
              Are you sure you want to delete your account? This action is permanent and cannot be undone. All your progress will be lost.
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-xs font-semibold text-white/80 bg-white/10 hover:bg-white/15 rounded-full transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowDeleteModal(false);
                  showToast('Account deletion requested');
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-full transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-8">
          Platform <span className="text-[#D8FF00]">Settings</span>
        </h1>
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Left Navigation */}
          <nav className="w-full md:w-60 shrink-0 flex flex-col gap-1.5">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-2xl transition-all text-left ${isActive ? 'bg-[#D8FF00] text-black shadow-[0_0_15px_rgba(216,255,0,0.3)]' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                >
                  <Icon size={16} className={isActive ? 'text-black' : 'text-white/50'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Content */}
          <div className="flex-1 bg-[#0D2232] rounded-3xl shadow-xl border border-white/10 overflow-hidden w-full">
            
            {/* ACCOUNT TAB */}
            {activeTab === 'account' && (
              <div className="p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-6">Account Settings</h2>
                
                <div className="mb-8">
                  <label className="block text-xs font-semibold text-white/70 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    disabled 
                    value="alex.johnson@university.edu"
                    className="w-full max-w-md bg-[#081726] border border-white/10 text-white/50 rounded-xl text-xs p-3"
                  />
                  <p className="text-[11px] text-white/40 mt-1.5">To change your email, please contact university administration.</p>
                </div>

                <div className="border-t border-white/10 pt-8 mb-8">
                  <h3 className="text-sm font-bold text-white mb-4">Change Password</h3>
                  <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-xs font-semibold text-white/70 mb-1">Current Password</label>
                      <input type="password" required className="w-full rounded-xl bg-[#081726] border border-white/15 text-white text-xs p-3 focus:outline-none focus:border-[#D8FF00]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/70 mb-1">New Password</label>
                      <input type="password" required className="w-full rounded-xl bg-[#081726] border border-white/15 text-white text-xs p-3 focus:outline-none focus:border-[#D8FF00]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/70 mb-1">Confirm New Password</label>
                      <input type="password" required className="w-full rounded-xl bg-[#081726] border border-white/15 text-white text-xs p-3 focus:outline-none focus:border-[#D8FF00]" />
                    </div>
                    <button type="submit" className="bg-[#D8FF00] text-black px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#cbf000] shadow-[0_0_12px_rgba(216,255,0,0.25)] transition-all">
                      Update Password
                    </button>
                  </form>
                </div>

                <div className="border-t border-rose-500/20 pt-8">
                  <h3 className="text-sm font-bold text-rose-400 mb-1">Danger Zone</h3>
                  <p className="text-xs text-white/50 mb-4">Permanently delete your account and all associated course records.</p>
                  <button 
                    onClick={() => setShowDeleteModal(true)}
                    className="border border-rose-500/40 text-rose-400 hover:bg-rose-500/10 px-4 py-2 rounded-full text-xs font-bold transition-colors"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && (
              <div className="p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  {[
                    { label: 'Email notifications for announcements', state: notifyAnnouncements, setter: setNotifyAnnouncements, desc: 'Get an email when a course instructor posts a new announcement.' },
                    { label: 'Assignment due reminders', state: notifyAssignments, setter: setNotifyAssignments, desc: 'Receive a reminder 48 hours before an assignment is due.' },
                    { label: 'Grade published notifications', state: notifyGrades, setter: setNotifyGrades, desc: 'Be notified when your assignment or quiz has been graded.' },
                    { label: 'New lesson available alerts', state: notifyLessons, setter: setNotifyLessons, desc: 'Get notified when new course content is unlocked.' },
                    { label: 'Weekly progress recap', state: notifySummary, setter: setNotifySummary, desc: 'Receive a weekly email summarizing your learning activity.' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-4">
                      <div className="pr-4">
                        <h3 className="text-xs font-bold text-white">{item.label}</h3>
                        <p className="text-[11px] text-white/50 mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                      <button 
                        onClick={() => item.setter(!item.state)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${item.state ? 'bg-[#D8FF00]' : 'bg-white/10'}`}
                      >
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#081726] shadow ring-0 transition duration-200 ease-in-out ${item.state ? 'translate-x-5 bg-black' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* APPEARANCE TAB */}
            {activeTab === 'appearance' && (
              <div className="p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-6">Visual Theme</h2>
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-[#081726] border border-[#D8FF00]/40 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">Midnight Navy & Electric Lime (Active)</h4>
                      <p className="text-[11px] text-white/50 mt-0.5">LearnEase futuristic EdTech design system</p>
                    </div>
                    <span className="w-3 h-3 rounded-full bg-[#D8FF00] shadow-[0_0_8px_#D8FF00]" />
                  </div>
                </div>
              </div>
            )}

            {/* ACCESSIBILITY TAB */}
            {activeTab === 'accessibility' && (
              <div className="p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-6">Accessibility Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-white">Reduce Motion</h3>
                      <p className="text-[11px] text-white/50 mt-0.5">Minimize transition animations throughout the platform.</p>
                    </div>
                    <button 
                      onClick={() => handleReduceMotionChange(!reduceMotion)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${reduceMotion ? 'bg-[#D8FF00]' : 'bg-white/10'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#081726] transition ${reduceMotion ? 'translate-x-5 bg-black' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
