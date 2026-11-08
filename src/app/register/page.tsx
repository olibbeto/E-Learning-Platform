"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Password strength meter logic
  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    return score;
  };

  const strength = getPasswordStrength();
  const strengthBars = [
    { score: 1, color: 'bg-red-500', text: 'Weak', textColor: 'text-red-400' },
    { score: 2, color: 'bg-amber-500', text: 'Fair', textColor: 'text-amber-400' },
    { score: 3, color: 'bg-blue-400', text: 'Good', textColor: 'text-blue-400' },
    { score: 4, color: 'bg-[#D8FF00]', text: 'Strong', textColor: 'text-[#D8FF00]' }
  ];
  
  const currentStrength = password ? strengthBars[Math.max(0, strength - 1)] : { text: '', color: 'bg-white/10', textColor: 'text-white/40' };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email format.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex bg-[#081726] font-sans text-white">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#0A1926] via-[#102C40] to-[#081726] text-white flex-col justify-between p-12 border-r border-[#102C40] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D8FF00]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-xl group">
            <div className="grid grid-cols-3 gap-1 p-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8FF00]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8FF00]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8FF00]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8FF00]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8FF00]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8FF00]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8FF00]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8FF00]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8FF00]"></span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">LearnEase</span>
          </Link>

          <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight mb-4 mt-24">
            Start your <br /> <span className="text-[#D8FF00]">learning</span> journey today.
          </h1>
          <p className="text-white/60 text-sm max-w-md leading-relaxed">
            Join thousands of students and discover a simpler, smarter way to manage your education.
          </p>
        </div>
        
        <div className="relative z-10 bg-[#0D2232]/80 backdrop-blur-md p-6 rounded-2xl border border-[#102C40] shadow-xl">
          <p className="italic text-white/80 text-xs sm:text-sm mb-4 leading-relaxed">
            "Switching to LearnEase was the best decision for my academic career. Highly recommended!"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#D8FF00] text-black rounded-full flex items-center justify-center font-bold text-xs">JD</div>
            <div>
              <p className="font-semibold text-xs text-white">James Davis</p>
              <p className="text-[11px] text-white/40">Engineering Student</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-16 lg:px-20 bg-[#081726] relative py-12">
        <Link href="/" className="absolute top-6 left-6 lg:hidden flex items-center gap-2 font-bold text-lg text-white">
          <div className="grid grid-cols-3 gap-0.5 p-0.5">
            <span className="w-1 h-1 rounded-full bg-[#D8FF00]"></span>
            <span className="w-1 h-1 rounded-full bg-[#D8FF00]"></span>
            <span className="w-1 h-1 rounded-full bg-[#D8FF00]"></span>
            <span className="w-1 h-1 rounded-full bg-[#D8FF00]"></span>
            <span className="w-1 h-1 rounded-full bg-[#D8FF00]"></span>
            <span className="w-1 h-1 rounded-full bg-[#D8FF00]"></span>
            <span className="w-1 h-1 rounded-full bg-[#D8FF00]"></span>
            <span className="w-1 h-1 rounded-full bg-[#D8FF00]"></span>
            <span className="w-1 h-1 rounded-full bg-[#D8FF00]"></span>
          </div>
          LearnEase
        </Link>

        <div className="w-full max-w-sm mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">Create an account</h2>
            <p className="text-xs text-white/50">Start your journey with LearnEase today.</p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-2.5 text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="text-xs font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5" htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#102C40] bg-[#0A1926] text-white text-xs placeholder-white/30 focus:ring-2 focus:ring-[#D8FF00] focus:border-transparent outline-none transition-all"
                placeholder="Alex Johnson"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#102C40] bg-[#0A1926] text-white text-xs placeholder-white/30 focus:ring-2 focus:ring-[#D8FF00] focus:border-transparent outline-none transition-all"
                placeholder="alex.johnson@university.edu"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#102C40] bg-[#0A1926] text-white text-xs placeholder-white/30 focus:ring-2 focus:ring-[#D8FF00] focus:border-transparent outline-none transition-all pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {password && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex gap-1 h-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-full transition-all ${
                          i <= strength ? currentStrength.color : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-[10px] font-semibold ${currentStrength.textColor}`}>
                    {currentStrength.text}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5" htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#102C40] bg-[#0A1926] text-white text-xs placeholder-white/30 focus:ring-2 focus:ring-[#D8FF00] focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#D8FF00] hover:bg-[#cbf200] text-black font-bold rounded-xl text-xs transition-colors shadow-[0_0_20px_rgba(216,255,0,0.35)] mt-2"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-white/50">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-[#D8FF00] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
