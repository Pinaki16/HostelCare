import React, { useState } from 'react';
import { LogIn, UserPlus, Mail, Lock, User as UserIcon, Hash, HelpCircle, Key, Chrome } from 'lucide-react';
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
          alert('Registration successful! Please login.');
        }
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to connect to server');
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
        setError(data.error || 'User not found');
      }
    } catch (err) {
      setError('Failed to connect to server');
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
        alert('Password reset successful! Please login.');
        setView('login');
        setForgotStep(1);
      } else {
        const data = await res.json();
        setError(data.error || 'Incorrect answer');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4 transition-colors duration-500">
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-5xl w-full bg-white dark:bg-slate-900 rounded-[30px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[650px] border border-white/20 dark:border-slate-800"
      >
        {/* Left Section - Illustration */}
        <div className="md:w-1/2 bg-emerald-50 dark:bg-slate-800/50 p-12 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-12 left-12">
            <h1 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">H</div>
              HostelCare
            </h1>
          </div>
          
          <motion.img 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            src="https://illustrations.popsy.co/emerald/work-from-home.svg" 
            alt="Onboarding" 
            className="w-full max-w-[350px] h-auto mb-8"
            referrerPolicy="no-referrer"
          />
          
          <div className="text-center max-w-sm">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">Welcome to the Community</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Manage your hostel life with ease. Report issues, track status, and stay updated with your maintenance requests.
            </p>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-200/30 dark:bg-emerald-900/10 rounded-full blur-3xl" />
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-200/30 dark:bg-teal-900/10 rounded-full blur-3xl" />
        </div>

        {/* Right Section - Form */}
        <div className="md:w-1/2 bg-white dark:bg-slate-900 p-8 md:p-12 flex flex-col justify-center relative">
          <AnimatePresence mode="wait">
            {view === 'forgot' ? (
              <motion.div 
                key="forgot"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Reset Password</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Follow the steps to recover your account</p>
                </div>

                {forgotStep === 1 ? (
                  <form onSubmit={handleForgotStep1} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase ml-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                        <input
                          type="email"
                          placeholder="name@university.edu"
                          required
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 dark:text-white"
                          value={resetData.email}
                          onChange={(e) => setResetData({ ...resetData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 dark:shadow-none disabled:opacity-50"
                    >
                      {loading ? 'Checking...' : 'Next Step'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl text-emerald-700 dark:text-emerald-400 text-sm font-medium border border-emerald-100 dark:border-emerald-800">
                      <p className="text-xs uppercase opacity-60 mb-1">Security Question</p>
                      {resetData.security_question}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase ml-1">Your Answer</label>
                      <div className="relative">
                        <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                        <input
                          type="text"
                          placeholder="Type your answer"
                          required
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 dark:text-white"
                          value={resetData.security_answer}
                          onChange={(e) => setResetData({ ...resetData, security_answer: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase ml-1">New Password</label>
                      <div className="relative">
                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          required
                          className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 dark:text-white"
                          value={resetData.new_password}
                          onChange={(e) => setResetData({ ...resetData, new_password: e.target.value })}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 dark:shadow-none disabled:opacity-50"
                    >
                      {loading ? 'Resetting...' : 'Update Password'}
                    </button>
                  </form>
                )}
                <button 
                  onClick={() => { setView('login'); setForgotStep(1); }}
                  className="w-full text-center text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Back to Login
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key={view}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    {view === 'login' ? 'Welcome Back' : 'Create Account'}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    {view === 'login' ? 'Enter your details to access your account' : 'Join us to manage your hostel complaints efficiently'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {view === 'register' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase ml-1">Full Name</label>
                        <div className="relative">
                          <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                          <input
                            type="text"
                            placeholder="John Doe"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 dark:text-white"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase ml-1">Roll Number</label>
                        <div className="relative">
                          <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                          <input
                            type="text"
                            placeholder="CS101"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 dark:text-white"
                            value={formData.roll_no}
                            onChange={(e) => setFormData({ ...formData, roll_no: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                      <input
                        type="email"
                        placeholder="name@university.edu"
                        required
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 dark:text-white"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase ml-1">Password</label>
                      {view === 'login' && (
                        <button 
                          type="button"
                          onClick={() => setView('forgot')}
                          className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700"
                        >
                          Forgot?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        required
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 dark:text-white"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </div>
                  </div>

                  {view === 'register' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase ml-1">Role</label>
                        <select 
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-600 dark:text-slate-300"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                          <option value="student">Student</option>
                          <option value="staff">Staff</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase ml-1">Security Question</label>
                        <select 
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-600 dark:text-slate-300"
                          value={formData.security_question}
                          onChange={(e) => setFormData({ ...formData, security_question: e.target.value })}
                        >
                          <option>What is your favorite color?</option>
                          <option>What was your first pet's name?</option>
                          <option>What city were you born in?</option>
                          <option>What is your mother's maiden name?</option>
                        </select>
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase ml-1">Security Answer</label>
                        <div className="relative">
                          <HelpCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                          <input
                            type="text"
                            placeholder="Your secret answer"
                            required
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 dark:text-white"
                            value={formData.security_answer}
                            onChange={(e) => setFormData({ ...formData, security_answer: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 dark:text-red-400 text-xs font-bold bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-100 dark:border-red-900/30"
                    >
                      {error}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 dark:shadow-none disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        {view === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                        {view === 'login' ? 'Sign In' : 'Create Account'}
                      </>
                    )}
                  </button>
                </form>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800"></div></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-slate-900 px-2 text-slate-400 font-bold">Or continue with</span></div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <button 
                    type="button"
                    onClick={() => alert('Google Authentication requires a Client ID to be configured in the environment. Please contact the administrator.')}
                    className="flex items-center justify-center gap-2 py-3 border border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm font-bold text-slate-600 dark:text-slate-300"
                  >
                    <Chrome className="w-4 h-4" /> Google
                  </button>
                </div>

                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  {view === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                  <button 
                    onClick={() => setView(view === 'login' ? 'register' : 'login')}
                    className="font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700"
                  >
                    {view === 'login' ? 'Sign Up' : 'Log In'}
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {onBack && (
            <button 
              onClick={onBack}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-300 dark:text-slate-600 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              ← Back to Home
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
