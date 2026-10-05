import React, { useState } from 'react';
import { 
  ArrowLeft,
  X,
  HelpCircle,
  Key,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ThemeToggle from '../components/ThemeToggle';

interface AuthProps {
  onLogin: (data: any) => void;
  onBack?: () => void;
}

export default function Auth({ onLogin, onBack }: AuthProps) {
  const [view, setView] = useState<'login' | 'register' | 'forgot'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    roll_no: '',
    role: 'student',
    security_question: 'What is your favorite color?',
    security_answer: ''
  });

  const [forgotStep, setForgotStep] = useState(1);
  const [resetData, setResetData] = useState({
    email: '',
    security_question: '',
    security_answer: '',
    new_password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = view === 'login' ? '/api/auth/login' : '/api/auth/register';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        if (view === 'login') {
          onLogin(data);
        } else {
          setView('login');
          alert('Account created successfully! Please sign in with your email.');
        }
      } else {
        setError(data.error || 'Invalid credentials. Please check your email and password.');
      }
    } catch (err) {
      setError('Could not connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetData.email })
      });
      const data = await res.json();
      if (res.ok) {
        setResetData({ ...resetData, security_question: data.security_question });
        setForgotStep(2);
      } else {
        setError(data.error || 'No account found with this email.');
      }
    } catch (err) {
      setError('Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: resetData.email,
          security_answer: resetData.security_answer,
          new_password: resetData.new_password
        })
      });
      if (res.ok) {
        alert('Password successfully updated! Please sign in.');
        setView('login');
        setForgotStep(1);
      } else {
        const data = await res.json();
        setError(data.error || 'Incorrect answer to the security question.');
      }
    } catch (err) {
      setError('Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  // Reusable input and select styling with rock-solid contrast in both light & dark modes
  const inputClass = "w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 border border-slate-200 dark:border-slate-700 focus:border-[#2563EB] dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-slate-800 focus:outline-none transition-all";
  const smallInputClass = "w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 border border-slate-200 dark:border-slate-700 focus:border-[#2563EB] dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-slate-800 focus:outline-none transition-all";
  const selectClass = "w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:border-[#2563EB] dark:focus:border-blue-500 focus:outline-none cursor-pointer";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#87b9e8] via-[#aed5f8] to-[#cbe4fc] dark:from-[#0d1b2a] dark:via-[#132337] dark:to-[#1b2d42] flex items-center justify-center p-3 sm:p-6 transition-colors duration-300 relative">
      
      {/* Top Controls */}
      <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/60 dark:border-slate-700 text-[#374151] dark:text-slate-200 hover:bg-white shadow-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </button>
        )}
        <ThemeToggle />
      </div>

      {/* Main Floating Card */}
      <div className="max-w-4xl w-full bg-white dark:bg-[#111827] rounded-[28px] shadow-2xl shadow-sky-950/20 dark:shadow-none overflow-hidden p-3 sm:p-4 grid md:grid-cols-2 gap-4 sm:gap-6 items-stretch border border-white/60 dark:border-slate-800 my-auto">
        
        {/* LEFT COLUMN: Yeti Mascot Visual with Overlaid Typography */}
        <div className="relative rounded-[22px] overflow-hidden min-h-[340px] sm:min-h-[460px] md:min-h-[530px] flex flex-col justify-between bg-sky-100 dark:bg-slate-800">
          
          {/* Mascot Image */}
          <img 
            src="/yeti_mascot.jpg" 
            alt="HostelCare Mascot" 
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gentle Gradient for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10 pointer-events-none" />

          {/* Top subtle badge */}
          <div className="relative z-10 p-5">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-white/20 backdrop-blur-md text-white border border-white/30">
              HostelCare Portal
            </span>
          </div>

          {/* Bottom Left Big Bold Text: REPORT. TRACK. RESOLVE. */}
          <div className="relative z-10 p-6 sm:p-8">
            <h1 className="text-white font-black text-3xl sm:text-4xl lg:text-[40px] tracking-tight leading-[0.95] drop-shadow-md select-none">
              REPORT.<br />
              TRACK. RESOLVE.
            </h1>
          </div>
        </div>

        {/* RIGHT COLUMN: Clean Login & Account Forms */}
        <div className="p-4 sm:p-8 lg:p-10 flex flex-col justify-center">

          <AnimatePresence mode="wait">
            
            {/* 1. SIGN IN VIEW */}
            {view === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="w-full"
              >
                <h2 className="text-2xl sm:text-[28px] font-black tracking-tight text-[#111827] dark:text-white uppercase text-center mt-2">
                  WELCOME BACK
                </h2>
                <p className="text-xs sm:text-sm text-[#8892a0] dark:text-slate-400 text-center mt-1 mb-6">
                  Enter your email and password to access your account
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  {/* Remember Me & Forgot Password Row */}
                  <div className="flex items-center justify-between pt-0.5">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-black dark:text-white focus:ring-0 cursor-pointer"
                      />
                      <span className="text-xs text-slate-600 dark:text-slate-400">Remember me</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => { setView('forgot'); setError(''); }}
                      className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                    >
                      Forgot Password
                    </button>
                  </div>

                  {/* Error Notification */}
                  {error && (
                    <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-medium">
                      {error}
                    </div>
                  )}

                  {/* Primary Sign In Button (High contrast in both light & dark mode) */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 text-white rounded-xl py-3.5 text-sm font-semibold transition-all shadow-sm cursor-pointer mt-4"
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </button>

                  {/* Secondary Google Button */}
                  <button
                    type="button"
                    onClick={() => alert('Google Sign-In is ready for OAuth configuration. Use student email to sign in.')}
                    className="w-full bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl py-3 text-sm font-medium flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer mt-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Sign in with Google</span>
                  </button>
                </form>

                {/* Bottom Sign up Switcher */}
                <p className="text-center text-xs text-[#8892a0] dark:text-slate-400 mt-6">
                  Don't have an account?{' '}
                  <button
                    onClick={() => { setView('register'); setError(''); }}
                    className="font-bold text-[#111827] dark:text-white hover:underline cursor-pointer"
                  >
                    Sign up
                  </button>
                </p>

                {/* Quick Hint for Admin */}
                <p className="text-[11px] text-center text-[#9ca3af] mt-4">
                  Admin Demo: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-800 dark:text-slate-200">admin@hostel.com</code> / <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-800 dark:text-slate-200">admin123</code>
                </p>
              </motion.div>
            )}

            {/* 2. SIGN UP VIEW */}
            {view === 'register' && (
              <motion.div
                key="register"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="w-full"
              >
                <h2 className="text-2xl sm:text-[28px] font-black tracking-tight text-[#111827] dark:text-white uppercase text-center mt-2">
                  CREATE ACCOUNT
                </h2>
                <p className="text-xs sm:text-sm text-[#8892a0] dark:text-slate-400 text-center mt-1 mb-5">
                  Join the hostel community to report and track issues
                </p>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  
                  {/* Name and Room */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={smallInputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Room / Roll No
                      </label>
                      <input
                        type="text"
                        placeholder="B-204"
                        value={formData.roll_no}
                        onChange={(e) => setFormData({ ...formData, roll_no: e.target.value })}
                        className={smallInputClass}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@hostel.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={smallInputClass}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Create password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className={smallInputClass}
                    />
                  </div>

                  {/* Role & Question */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Role
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className={selectClass}
                      >
                        <option value="student" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Student Resident</option>
                        <option value="staff" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Maintenance Staff</option>
                        <option value="admin" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Hostel Warden</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Security Question
                      </label>
                      <select
                        value={formData.security_question}
                        onChange={(e) => setFormData({ ...formData, security_question: e.target.value })}
                        className={selectClass}
                      >
                        <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">What is your favorite color?</option>
                        <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">What was your first pet's name?</option>
                        <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">What city were you born in?</option>
                      </select>
                    </div>
                  </div>

                  {/* Security Answer */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Security Answer
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your secret answer"
                      value={formData.security_answer}
                      onChange={(e) => setFormData({ ...formData, security_answer: e.target.value })}
                      className={smallInputClass}
                    />
                  </div>

                  {error && (
                    <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-medium">
                      {error}
                    </div>
                  )}

                  {/* Register Button (High contrast in both light & dark mode) */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 text-white rounded-xl py-3 text-xs font-bold transition-all shadow-sm cursor-pointer mt-3"
                  >
                    {loading ? 'Creating Account...' : 'Complete Sign Up'}
                  </button>
                </form>

                <p className="text-center text-xs text-[#8892a0] dark:text-slate-400 mt-4">
                  Already have an account?{' '}
                  <button
                    onClick={() => { setView('login'); setError(''); }}
                    className="font-bold text-[#111827] dark:text-white hover:underline cursor-pointer"
                  >
                    Sign in
                  </button>
                </p>
              </motion.div>
            )}

            {/* 3. FORGOT PASSWORD VIEW */}
            {view === 'forgot' && (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="w-full"
              >
                <h2 className="text-2xl sm:text-[28px] font-black tracking-tight text-[#111827] dark:text-white uppercase text-center mt-2">
                  RESET PASSWORD
                </h2>
                <p className="text-xs sm:text-sm text-[#8892a0] dark:text-slate-400 text-center mt-1 mb-5">
                  Verify your identity to reset your password
                </p>

                {forgotStep === 1 ? (
                  <form onSubmit={handleForgotStep1} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Registered Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={resetData.email}
                        onChange={(e) => setResetData({ ...resetData, email: e.target.value })}
                        className={inputClass}
                      />
                    </div>

                    {error && (
                      <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-medium">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-black hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 text-white rounded-xl py-3.5 text-sm font-semibold transition-all shadow-sm cursor-pointer"
                    >
                      {loading ? 'Checking...' : 'Continue'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs border border-slate-200 dark:border-slate-700">
                      <p className="text-[11px] font-bold text-slate-500 uppercase">Security Question:</p>
                      <p className="font-semibold text-slate-900 dark:text-white mt-0.5">{resetData.security_question}</p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Security Answer
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your answer"
                        value={resetData.security_answer}
                        onChange={(e) => setResetData({ ...resetData, security_answer: e.target.value })}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        New Password
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Enter new password"
                        value={resetData.new_password}
                        onChange={(e) => setResetData({ ...resetData, new_password: e.target.value })}
                        className={inputClass}
                      />
                    </div>

                    {error && (
                      <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-medium">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-black hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 text-white rounded-xl py-3.5 text-sm font-semibold transition-all shadow-sm cursor-pointer"
                    >
                      {loading ? 'Updating...' : 'Set New Password'}
                    </button>
                  </form>
                )}

                <p className="text-center text-xs text-[#8892a0] dark:text-slate-400 mt-5">
                  Remembered your password?{' '}
                  <button
                    onClick={() => { setView('login'); setForgotStep(1); setError(''); }}
                    className="font-bold text-[#111827] dark:text-white hover:underline cursor-pointer"
                  >
                    Back to Sign in
                  </button>
                </p>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
