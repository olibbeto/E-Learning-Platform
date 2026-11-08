import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Layers, Map, TrendingUp, Bell, Upload, Star } from 'lucide-react';
import { withBasePath } from '@/lib/basePath';

const courses = [
  { id: 1, title: 'Introduction to Computer Science', instructor: 'Dr. Alan Turing', category: 'Computer Science', students: 1240, rating: 4.8, price: '$49', color: 'bg-gradient-to-br from-indigo-500 to-purple-600', image: '' },
  { id: 2, title: 'Advanced UX Design', instructor: 'Sarah Jenkins', category: 'Design', students: 890, rating: 4.9, price: '$79', color: 'bg-gradient-to-br from-pink-500 to-rose-500', image: '' },
  { id: 3, title: 'Data Structures and Algorithms', instructor: 'Prof. Cormen', category: 'Computer Science', students: 2100, rating: 4.7, price: '$59', color: 'bg-gradient-to-br from-blue-500 to-cyan-500', image: '' },
  { id: 4, title: 'Digital Marketing Fundamentals', instructor: 'Emma Watson', category: 'Marketing', students: 1560, rating: 4.6, price: '$39', color: 'bg-gradient-to-br from-emerald-500 to-teal-500', image: '' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
            Learn smarter. <br className="hidden lg:block" /> Navigate easier.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0">
            A simpler e-learning experience designed around the way students actually learn. No clutter, just clear paths to success.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <Link href="/courses" className="px-8 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-sm transition-all duration-200 w-full sm:w-auto text-center">
              Explore Courses
            </Link>
            <Link href="/login" className="px-8 py-3.5 text-base font-semibold text-indigo-600 bg-white border-2 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50 rounded-full transition-all duration-200 w-full sm:w-auto text-center">
              Start Learning
            </Link>
          </div>
        </div>
        
        {/* Visual Mockup Card */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-white rounded-3xl transform rotate-3 scale-105 opacity-50"></div>
          <div className="relative bg-white border border-slate-200 p-6 rounded-2xl shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">AJ</div>
                <div>
                  <h3 className="font-semibold text-sm">Welcome back, Alex</h3>
                  <p className="text-xs text-slate-500">You have 2 upcoming deadlines</p>
                </div>
              </div>
              <Bell className="w-5 h-5 text-slate-400" />
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-700">Current Progress</h4>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <Map className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Intro to Computer Science</span>
                    <span className="text-indigo-600 font-semibold">68%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why LearnEase Section */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why LearnEase?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We've stripped away the complexity to give you exactly what you need to succeed.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <Layers className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Everything in one place</h3>
              <p className="text-slate-600">Access your courses, assignments, and grades from a single, intuitive dashboard.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <Map className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Clear learning paths</h3>
              <p className="text-slate-600">Know exactly what to do next with our guided learning journeys.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Track your progress</h3>
              <p className="text-slate-600">Visualize your improvement over time with detailed analytics and insights.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center md:col-start-1 md:col-end-3 lg:col-auto lg:col-start-auto lg:col-end-auto">
              <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <Bell className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Never miss a deadline</h3>
              <p className="text-slate-600">Get smart notifications for upcoming assignments and quizzes.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center md:col-start-2 md:col-end-4 lg:col-auto lg:col-start-auto lg:col-end-auto">
              <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                <Upload className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Simple assignment submission</h3>
              <p className="text-slate-600">Upload your work with one click and get instant confirmation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Popular Courses</h2>
            <p className="text-slate-600">Join thousands of students learning new skills.</p>
          </div>
          <Link href="/courses" className="text-indigo-600 font-semibold hover:text-indigo-700 whitespace-nowrap">
            View All Courses &rarr;
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map(course => (
            <Link key={course.id} href="/courses" className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 block">
              <div className={`h-40 ${course.color || 'bg-slate-100'} relative overflow-hidden flex items-center justify-center`}>
                {course.image ? (
                  <img src={withBasePath(course.image)} alt={course.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="text-4xl">📚</div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm z-10">
                  {course.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 line-clamp-2 text-slate-900">{course.title}</h3>
                <p className="text-sm text-slate-500 mb-4">{course.instructor}</p>
                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="text-sm font-semibold">{course.rating}</span>
                    <span className="text-xs text-slate-400">({course.students})</span>
                  </div>
                  <span className="font-bold text-indigo-600">{course.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-indigo-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How LearnEase Works</h2>
            <p className="text-indigo-200 max-w-2xl mx-auto">A streamlined process from discovery to mastery.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-indigo-700/50"></div>
            {[
              { num: '1', title: 'Find a course', desc: 'Browse our catalog of expert-led courses.' },
              { num: '2', title: 'Start learning', desc: 'Engage with interactive lessons and videos.' },
              { num: '3', title: 'Track your progress', desc: 'Monitor your improvement over time.' },
              { num: '4', title: 'Complete assessments', desc: 'Validate your knowledge and earn certificates.' }
            ].map((step, i) => (
              <div key={i} className="flex-1 relative flex flex-col md:items-center text-left md:text-center">
                <div className="w-24 h-24 bg-indigo-800 rounded-full flex items-center justify-center text-3xl font-bold mb-6 border-8 border-indigo-900 relative z-10 text-indigo-200 mx-0 md:mx-auto">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-indigo-200 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">What Students Say</h2>
          <p className="text-slate-500 max-w-2xl mx-auto italic">(Sample testimonials for demonstration purposes)</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Sarah M.', program: 'Computer Science', quote: 'LearnEase completely transformed how I manage my coursework. The clear learning paths and upcoming deadlines feature saved me so many times.' },
            { name: 'David L.', program: 'UX Design', quote: 'The cleanest, most intuitive learning platform I\'ve ever used. It doesn\'t get in your way; it actually helps you focus on the content.' },
            { name: 'Emily R.', program: 'Business Administration', quote: 'I love how easy it is to track my progress and see exactly what I need to do to improve my grades. Highly recommended!' }
          ].map((testimonial, i) => (
            <div key={i} className="bg-slate-50 p-8 rounded-2xl">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="w-5 h-5 text-amber-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 mb-6 italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold text-slate-900">{testimonial.name}</p>
                <p className="text-sm text-slate-500">{testimonial.program}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-indigo-600 py-20 text-center px-6">
        <h2 className="text-3xl font-bold text-white mb-8">Ready to start learning?</h2>
        <Link href="/courses" className="inline-block px-8 py-4 text-lg font-semibold text-indigo-600 bg-white hover:bg-slate-50 rounded-full shadow-lg transition-all duration-200">
          Explore Courses
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white font-bold text-xl">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">L</div>
            LearnEase
          </div>
          <div className="flex gap-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link href="/login" className="hover:text-white transition-colors">Login</Link>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} LearnEase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
