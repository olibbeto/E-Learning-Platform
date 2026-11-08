"use client";

import { useState, useCallback, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }, []);

  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email format.');
      return;
    }

    if (email === 'alex.johnson@university.edu' && password === 'password123') {
      router.push('/dashboard');
    } else {
      setError('Incorrect email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#081726] font-sans text-white">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-4 right-4 bg-[#0D2232] border border-[#D8FF00] text-white px-5 py-2.5 rounded-xl shadow-2xl z-50 animate-fade-in text-xs font-medium">
          {toastMessage}
        </div>
      )}

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
            Welcome back to <br /> your <span className="text-[#D8FF00]">learning</span> journey.
          </h1>
          <p className="text-white/60 text-sm max-w-md leading-relaxed">
            Pick up exactly where you left off and discover new ways to expand your knowledge today.
          </p>
        </div>
        
        <div className="relative z-10 bg-[#0D2232]/80 backdrop-blur-md p-6 rounded-2xl border border-[#102C40] shadow-xl">
          <p className="italic text-white/80 text-xs sm:text-sm mb-4 leading-relaxed">
            "LearnEase has completely simplified my study routine. Everything is just one click away."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#D8FF00] text-black rounded-full flex items-center justify-center font-bold text-xs">SM</div>
            <div>
              <p className="font-semibold text-xs text-white">Sarah Miller</p>
              <p className="text-[11px] text-white/40">Computer Science Student</p>
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">Sign in</h2>
            <p className="text-xs text-white/50">Welcome back! Please enter your details.</p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-2.5 text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="text-xs font-medium">{error}</p>
            </div>
          )}

          <div className="mb-5 p-4 bg-[#0D2232] border border-[#102C40] rounded-2xl">
            <p className="text-[10px] font-bold text-[#D8FF00] uppercase tracking-wider mb-1">Demo Credentials</p>
            <p className="text-xs text-white/90 font-mono">alex.johnson@university.edu</p>
            <p className="text-xs text-white/90 font-mono">password123</p>
            <button
              type="button"
              onClick={() => { setEmail('alex.johnson@university.edu'); setPassword('password123'); }}
              className="mt-2.5 text-[11px] font-semibold text-[#D8FF00] bg-[#D8FF00]/10 hover:bg-[#D8FF00]/20 px-3 py-1.5 rounded-lg transition-colors border border-[#D8FF00]/30"
            >
              Use Demo Credentials
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-2.5 rounded-xl border border-[#102C40] bg-[#0A1926] text-white text-xs placeholder-white/30 focus:ring-2 focus:ring-[#D8FF00] focus:border-transparent outline-none transition-all"
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#102C40] bg-[#0A1926] text-white text-xs placeholder-white/30 focus:ring-2 focus:ring-[#D8FF00] focus:border-transparent outline-none transition-all pr-10"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-white/60">
                <input type="checkbox" className="w-3.5 h-3.5 rounded border-[#102C40] bg-[#0A1926] text-[#D8FF00] focus:ring-[#D8FF00]" />
                <span>Remember me</span>
              </label>
              <button 
                type="button" 
                onClick={() => showToast('Password reset link sent to your email.')}
                className="font-medium text-[#D8FF00] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#D8FF00] hover:bg-[#cbf200] text-black font-bold rounded-xl text-xs transition-colors shadow-[0_0_20px_rgba(216,255,0,0.35)]"
            >
              Sign in
            </button>

            <button
              type="button"
              onClick={() => showToast('Google sign-in is not available in demo mode')}
              className="w-full py-2.5 px-4 bg-[#0A1926] hover:bg-[#102C40] border border-[#102C40] text-white/80 font-medium rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-white/50">
            Don't have an account?{' '}
            <Link href="/register" className="font-semibold text-[#D8FF00] hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
