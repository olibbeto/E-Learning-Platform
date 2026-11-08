'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { useApp } from '@/context/AppContext';
import { Clock, Star, BookOpen, Megaphone, CheckCircle2 } from 'lucide-react';

const iconMap = {
  assignment: { icon: Clock, color: 'text-[#D8FF00]', bg: 'bg-[#D8FF00]/15' },
  grade: { icon: Star, color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
  lesson: { icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/15' },
  announcement: { icon: Megaphone, color: 'text-purple-400', bg: 'bg-purple-500/15' }
};

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);

  return (
    <div className="min-h-screen bg-[#081726] text-white flex flex-col font-sans selection:bg-[#D8FF00] selection:text-black">
      <Navbar />
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black text-white tracking-tight">
              Notifi<span className="text-[#D8FF00]">cations</span>
            </h1>
            {unreadCount > 0 && (
              <span className="bg-[#D8FF00] text-black py-0.5 px-3 rounded-full text-xs font-bold shadow-[0_0_10px_#D8FF00]">
                {unreadCount} new
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <div className="flex bg-[#0D2232] border border-white/10 p-1 rounded-full">
              <button 
                onClick={() => setFilter('all')}
                className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${filter === 'all' ? 'bg-[#D8FF00] text-black shadow-sm' : 'text-white/60 hover:text-white'}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('unread')}
                className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all ${filter === 'unread' ? 'bg-[#D8FF00] text-black shadow-sm' : 'text-white/60 hover:text-white'}`}
              >
                Unread
              </button>
            </div>
            {unreadCount > 0 && (
              <button 
                onClick={markAllNotificationsRead}
                className="text-xs font-bold text-[#D8FF00] hover:underline transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>
        </div>

        {/* List Section */}
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16 bg-[#0D2232] rounded-3xl border border-white/10 shadow-xl">
            <CheckCircle2 className="w-12 h-12 text-[#D8FF00]/40 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No notifications</h3>
            <p className="text-xs text-white/50 mt-1">You're completely up to date.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => {
              const config = iconMap[notification.type as keyof typeof iconMap] || iconMap.announcement;
              const Icon = config.icon;
              return (
                <div 
                  key={notification.id} 
                  onClick={() => markNotificationRead(notification.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 items-start ${
                    notification.read 
                      ? 'bg-[#0D2232]/60 border-white/5 text-white/70 hover:bg-[#0D2232]' 
                      : 'bg-[#0D2232] border-[#D8FF00]/30 shadow-[0_0_15px_rgba(216,255,0,0.06)]'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 ${config.bg} ${config.color}`}>
                    <Icon size={18} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={`text-sm font-bold truncate ${notification.read ? 'text-white/80' : 'text-white'}`}>
                        {notification.title}
                      </h4>
                      <span className="text-[11px] text-white/40 shrink-0">
                        {new Date(notification.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 mt-1 leading-relaxed">
                      {notification.message}
                    </p>
                  </div>
                  
                  {!notification.read && (
                    <span className="w-2 h-2 rounded-full bg-[#D8FF00] shadow-[0_0_6px_#D8FF00] shrink-0 mt-2" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
