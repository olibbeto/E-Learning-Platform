"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Play,
  BookOpen,
  CheckSquare,
  Calendar,
  Search,
  Bell,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const { unreadNotificationsCount, currentUser } = useApp();

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Courses", href: "/courses", icon: Play },
    { name: "My Learning", href: "/my-learning", icon: BookOpen },
    { name: "Assignments", href: "/assignments", icon: CheckSquare },
    { name: "Calendar", href: "/calendar", icon: Calendar },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMobileSearchOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#081726]/90 backdrop-blur-xl border-b border-white/10 shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-8 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* 3x3 Dot Grid in Electric Lime */}
              <div className="grid grid-cols-3 gap-1 w-5 h-5 items-center justify-center p-0.5">
                {[...Array(9)].map((_, i) => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#D8FF00] group-hover:scale-110 transition-transform shadow-[0_0_6px_#D8FF00]"
                  />
                ))}
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-white/95">
                Learn<span className="text-white">Ease</span>
              </span>
            </Link>

            {/* Desktop Navigation Pills */}
            <div className="hidden lg:flex items-center space-x-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-[#D8FF00] text-black shadow-[0_0_15px_rgba(216,255,0,0.35)] scale-[1.02]"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-black fill-current' : 'text-white/70'}`} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Controls: Search, Notifications, Avatar */}
          <div className="flex items-center gap-3">
            
            {/* Search Bar Desktop */}
            <div className="hidden md:block w-48 lg:w-64">
              <form onSubmit={handleSearch} className="relative">
                <Search className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full pl-9 pr-4 py-2 bg-[#102C40]/80 border border-white/10 rounded-full text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#D8FF00] focus:ring-1 focus:ring-[#D8FF00] transition-all"
                />
              </form>
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notification Bell */}
            <Link
              href="/notifications"
              className="relative p-2.5 rounded-full bg-[#102C40]/80 border border-white/10 text-white/80 hover:text-white hover:border-[#D8FF00]/40 hover:bg-[#13354c] transition-all"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D8FF00] shadow-[0_0_8px_#D8FF00]" />
              )}
            </Link>

            {/* Profile Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 rounded-full border border-white/10 hover:border-[#D8FF00]/50 transition-all focus:outline-none focus:ring-2 focus:ring-[#D8FF00]"
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
              >
                <img
                  src={currentUser?.avatar || "https://i.pravatar.cc/150?u=alex"}
                  alt={currentUser?.name || "User Avatar"}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-[#D8FF00]/40"
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#0D2434] border border-white/10 shadow-2xl py-2 z-50 text-white animate-fade-in-up">
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-sm font-bold text-white">{currentUser?.name || "Alex Johnson"}</p>
                    <p className="text-xs text-white/60 truncate">{currentUser?.email || "alex.johnson@university.edu"}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/80 hover:text-black hover:bg-[#D8FF00] font-medium transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/80 hover:text-black hover:bg-[#D8FF00] font-medium transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Student Profile
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/80 hover:text-black hover:bg-[#D8FF00] font-medium transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <div className="border-t border-white/10 my-1"></div>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      router.push("/login");
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-rose-400 hover:text-rose-300 hover:bg-white/5 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Input Drawer */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-4 py-3 bg-[#0D2434] border-b border-white/10">
          <form onSubmit={handleSearch} className="relative">
            <Search className="w-4 h-4 text-white/50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses, lessons..."
              className="w-full pl-9 pr-4 py-2 bg-[#102C40] border border-white/10 rounded-full text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#D8FF00]"
              autoFocus
            />
          </form>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1926]/98 border-b border-white/10 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive
                    ? "bg-[#D8FF00] text-black shadow-[0_0_12px_rgba(216,255,0,0.3)]"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-black' : 'text-white/70'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
