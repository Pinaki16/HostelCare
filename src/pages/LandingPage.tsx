import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Zap,
  MessageSquare,
  ArrowRight,
  Users,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  FileText,
  Wrench,
  AlertCircle,
  Building2,
  Wifi,
  Droplets,
  Search,
  ExternalLink,
  ChevronRight,
  Check,
  SlidersHorizontal,
  Bell
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFormCategory, setActiveFormCategory] = useState<'Water' | 'Electricity' | 'Internet' | 'Furniture'>('Water');
  const [activePreviewFilter, setActivePreviewFilter] = useState<'all' | 'in-progress' | 'pending' | 'resolved'>('all');

  const stats = [
    { value: "2,500+", label: "Complaints resolved" },
    { value: "1,200+", label: "Active students" },
    { value: "24 hrs", label: "Average resolution" },
    { value: "98%", label: "Student satisfaction" },
  ];

  const previewTableData = [
    {
      id: "CMP-1042",
      title: "Water Leakage under basin",
      student: "Rahul Sharma",
      room: "B-204",
      category: "Water",
      priority: "High",
      status: "in-progress",
      staff: "Plumber Ramesh",
      updated: "10m ago"
    },
    {
      id: "CMP-1041",
      title: "Broken tube light fixture",
      student: "Anita Roy",
      room: "A-112",
      category: "Electricity",
      priority: "Medium",
      status: "pending",
      staff: "Unassigned",
      updated: "45m ago"
    },
    {
      id: "CMP-1039",
      title: "Wi-Fi router dropping signal",
      student: "Arjun Kumar",
      room: "C-305",
      category: "Internet",
      priority: "Low",
      status: "resolved",
      staff: "IT Desk (Vikram)",
      updated: "2h ago"
    },
    {
      id: "CMP-1038",
      title: "Geyser trip switch overheating",
      student: "Sneha Patel",
      room: "D-401",
      category: "Electricity",
      priority: "High",
      status: "in-progress",
      staff: "Electrician Dev",
      updated: "3h ago"
    },
    {
      id: "CMP-1035",
      title: "Window latch mechanism loose",
      student: "Vikram Verma",
      room: "B-109",
      category: "Maintenance",
      priority: "Low",
      status: "resolved",
      staff: "Carpenter Mohan",
      updated: "Yesterday"
    }
  ];

  const filteredPreview = previewTableData.filter(item => {
    if (activePreviewFilter === 'all') return true;
    return item.status === activePreviewFilter;
  });

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#0B0F17] text-[#111827] dark:text-[#F9FAFB] transition-colors duration-200">
      
      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-md border-b border-[#E5E7EB] dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-[#163B73] dark:bg-blue-600 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-[1.02]">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-[#111827] dark:text-white leading-none">
                  HostelCare
                </span>
                <span className="text-[11px] font-medium text-[#667085] dark:text-slate-400 tracking-wide mt-1">
                  Residential Services
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-sm font-medium text-[#667085] dark:text-slate-300 hover:text-[#111827] dark:hover:text-white transition-colors">
                Home
              </a>
              <a href="#features" className="text-sm font-medium text-[#667085] dark:text-slate-300 hover:text-[#111827] dark:hover:text-white transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-[#667085] dark:text-slate-300 hover:text-[#111827] dark:hover:text-white transition-colors">
                How It Works
              </a>
              <a href="#product-preview" className="text-sm font-medium text-[#667085] dark:text-slate-300 hover:text-[#111827] dark:hover:text-white transition-colors">
                Overview
              </a>
              <a href="#contact" className="text-sm font-medium text-[#667085] dark:text-slate-300 hover:text-[#111827] dark:hover:text-white transition-colors">
                Contact
              </a>
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={onGetStarted}
                className="text-sm font-semibold text-[#111827] dark:text-slate-200 hover:text-[#2563EB] dark:hover:text-blue-400 px-3 py-2 transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                Submit Complaint
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-[#667085] hover:text-[#111827] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-b border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-[#0B0F17] px-4 pt-3 pb-6 space-y-3">
            <a
              href="#home"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#111827] dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg"
            >
              Home
            </a>
            <a
              href="#features"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#111827] dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#111827] dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg"
            >
              How It Works
            </a>
            <a
              href="#product-preview"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#111827] dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg"
            >
              Overview
            </a>
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-[#111827] dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg"
            >
              Contact
            </a>
            <div className="pt-3 border-t border-[#E5E7EB] dark:border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => { setIsMenuOpen(false); onGetStarted(); }}
                className="w-full py-2.5 text-center text-sm font-semibold border border-[#E5E7EB] dark:border-slate-700 text-[#111827] dark:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Login
              </button>
              <button
                onClick={() => { setIsMenuOpen(false); onGetStarted(); }}
                className="w-full py-2.5 text-center text-sm font-semibold bg-[#2563EB] text-white rounded-lg hover:bg-blue-700"
              >
                Submit Complaint
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section id="home" className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* LEFT COLUMN: Editorial Presentation */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 text-[#163B73] dark:text-blue-400 text-xs font-semibold uppercase tracking-wider shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
                HOSTEL MANAGEMENT MADE SIMPLE
              </div>

              {/* Large Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#111827] dark:text-white tracking-tight leading-[1.12]">
                Report hostel issues.<br />
                Get them <span className="text-[#2563EB]">resolved.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-[#667085] dark:text-slate-300 max-w-xl leading-relaxed">
                HostelCare gives students a simple way to report maintenance issues, track progress, and stay informed until the problem is resolved.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onGetStarted}
                  className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-lg text-sm shadow-sm transition-all cursor-pointer"
                >
                  Submit a Complaint
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onGetStarted}
                  className="inline-flex items-center justify-center gap-2 bg-white dark:bg-[#111827] hover:bg-slate-50 dark:hover:bg-slate-800 text-[#111827] dark:text-white border border-[#E5E7EB] dark:border-slate-700 font-semibold px-6 py-3.5 rounded-lg text-sm shadow-xs transition-all cursor-pointer"
                >
                  Track Complaint
                </button>
              </div>

              {/* Trust Statement */}
              <div className="pt-2 flex items-center gap-2.5 text-xs text-[#667085] dark:text-slate-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                <span>Built for students, wardens and hostel maintenance teams.</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Realistic HTML/CSS Dashboard Preview */}
            <div className="lg:col-span-6 relative">
              
              {/* Subtle accent badge positioned top right */}
              <div className="hidden sm:flex absolute -top-4 -right-2 z-20 items-center gap-2 bg-white dark:bg-[#161F30] border border-[#E5E7EB] dark:border-slate-700 rounded-lg px-3 py-2 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></div>
                <span className="text-xs font-semibold text-[#111827] dark:text-slate-200">Average response: 2.4 hrs</span>
              </div>

              {/* Main Dashboard Preview Card */}
              <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-xl shadow-md overflow-hidden">
                
                {/* Header Chrome */}
                <div className="px-5 py-3.5 border-b border-[#E5E7EB] dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/50">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 mr-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                    </div>
                    <span className="text-xs font-bold text-[#111827] dark:text-slate-200 tracking-tight">HostelCare Dashboard</span>
                    <span className="text-[11px] font-medium text-[#667085] dark:text-slate-400">· Block B</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#16A34A] bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 px-2 py-0.5 rounded">
                    <span>● Live</span>
                  </div>
                </div>

                {/* Dashboard Metrics Strip */}
                <div className="p-5 border-b border-[#E5E7EB] dark:border-slate-800 grid grid-cols-3 gap-3 bg-white dark:bg-[#111827]">
                  <div className="p-3 rounded-lg bg-[#F7F8FA] dark:bg-slate-800/60 border border-[#E5E7EB] dark:border-slate-700/60">
                    <p className="text-[11px] font-semibold text-[#667085] dark:text-slate-400">Open Complaints</p>
                    <p className="text-2xl font-bold text-[#111827] dark:text-white mt-0.5">12</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#F7F8FA] dark:bg-slate-800/60 border border-[#E5E7EB] dark:border-slate-700/60">
                    <p className="text-[11px] font-semibold text-[#667085] dark:text-slate-400">In Progress</p>
                    <p className="text-2xl font-bold text-[#F59E0B] mt-0.5">7</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#F7F8FA] dark:bg-slate-800/60 border border-[#E5E7EB] dark:border-slate-700/60">
                    <p className="text-[11px] font-semibold text-[#667085] dark:text-slate-400">Resolved Today</p>
                    <p className="text-2xl font-bold text-[#16A34A] mt-0.5">18</p>
                  </div>
                </div>

                {/* Complaint List */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#667085] dark:text-slate-400 px-1 pb-1">
                    <span>Active Tickets</span>
                    <span>Priority / Status</span>
                  </div>

                  {/* Item 1 */}
                  <div className="p-3 rounded-lg border border-[#E5E7EB] dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60 flex items-center justify-between gap-3 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-md bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/50 flex items-center justify-center flex-shrink-0 text-amber-600">
                        <Droplets className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#111827] dark:text-white truncate">Water Leakage</p>
                        <p className="text-xs text-[#667085] dark:text-slate-400">Room 204 · 2nd Floor</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50">
                        In Progress
                      </span>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="p-3 rounded-lg border border-[#E5E7EB] dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60 flex items-center justify-between gap-3 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/50 flex items-center justify-center flex-shrink-0 text-[#2563EB]">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#111827] dark:text-white truncate">Broken Fan</p>
                        <p className="text-xs text-[#667085] dark:text-slate-400">Room 118 · 1st Floor</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50">
                        Assigned
                      </span>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="p-3 rounded-lg border border-[#E5E7EB] dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60 flex items-center justify-between gap-3 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-center flex-shrink-0 text-[#16A34A]">
                        <Wifi className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#111827] dark:text-white truncate">Wi-Fi Issue</p>
                        <p className="text-xs text-[#667085] dark:text-slate-400">Room 305 · 3rd Floor</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50">
                        Resolved
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Ticker */}
                <div className="px-5 py-3 bg-slate-50 dark:bg-slate-900/60 border-t border-[#E5E7EB] dark:border-slate-800 flex items-center justify-between text-xs text-[#667085] dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    <span className="font-medium text-[#111827] dark:text-slate-300">42 issues resolved today</span>
                  </div>
                  <button onClick={onGetStarted} className="text-[#2563EB] hover:underline font-semibold flex items-center gap-1 cursor-pointer">
                    View Queue <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUST / STATISTICS COMPACT STRIP */}
      <section className="border-y border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#E5E7EB] dark:divide-slate-800">
            {stats.map((stat, idx) => (
              <div key={idx} className={`flex flex-col items-center sm:items-start text-center sm:text-left ${idx !== 0 ? 'pt-6 lg:pt-0 lg:pl-8' : ''}`}>
                <p className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111827] dark:text-white">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#667085] dark:text-slate-400 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ASYMMETRIC FEATURES SECTION */}
      <section id="features" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-14">
            <p className="text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-2">Core Workflow</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] dark:text-white tracking-tight">
              Everything students need to report problems.
            </h2>
            <p className="text-base text-[#667085] dark:text-slate-300 mt-3 leading-relaxed">
              From reporting an issue to seeing it resolved, HostelCare keeps the entire process clear.
            </p>
          </div>

          {/* Asymmetric Panel Layout */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: Realistic Interactive Complaint Form UI */}
            <div className="lg:col-span-7 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-5 border-b border-[#E5E7EB] dark:border-slate-800 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-[#111827] dark:text-white">Report issues in seconds</h3>
                  <p className="text-xs text-[#667085] dark:text-slate-400 mt-0.5">Quick form with instant category routing</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-[#667085] dark:text-slate-300 rounded">
                  Student Portal
                </span>
              </div>

              {/* Form Preview Component */}
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] dark:text-slate-300 uppercase tracking-wider mb-2">
                    Complaint Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['Water', 'Electricity', 'Internet', 'Furniture'] as const).map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveFormCategory(cat)}
                        className={`px-3 py-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                          activeFormCategory === cat
                            ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                            : 'bg-white dark:bg-slate-900 text-[#667085] dark:text-slate-300 border-[#E5E7EB] dark:border-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#111827] dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Room Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        readOnly
                        value="B-204"
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 rounded-lg text-[#111827] dark:text-white font-medium focus:outline-none"
                      />
                      <span className="absolute right-3 top-3 text-[11px] text-[#667085] font-medium">Wing B</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#111827] dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Urgency Level
                    </label>
                    <select
                      disabled
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 rounded-lg text-[#111827] dark:text-white font-medium focus:outline-none"
                    >
                      <option>High Priority (Water Leakage)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111827] dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Description
                  </label>
                  <textarea
                    readOnly
                    rows={3}
                    value="Continuous water leakage near the bathroom washbasin tap pipe. Floor is getting flooded since morning."
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 rounded-lg text-[#111827] dark:text-white leading-relaxed resize-none focus:outline-none"
                  ></textarea>
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <p className="text-xs text-[#667085] dark:text-slate-400">
                    Auto-dispatches to: <span className="font-semibold text-[#111827] dark:text-slate-200">Hostel Maintenance Unit</span>
                  </p>
                  <button
                    onClick={onGetStarted}
                    className="bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    Submit Complaint
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: Stacked Feature List (Not floating cards) */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="p-5 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-xl transition-all hover:border-slate-300 dark:hover:border-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 text-[#2563EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#111827] dark:text-white">Real-time Tracking</h4>
                    <p className="text-sm text-[#667085] dark:text-slate-400 mt-1 leading-relaxed">
                      See exactly where your complaint stands at every step, from warden acknowledgment to staff dispatch.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-xl transition-all hover:border-slate-300 dark:hover:border-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 text-[#2563EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#111827] dark:text-white">Smart Categorization</h4>
                    <p className="text-sm text-[#667085] dark:text-slate-400 mt-1 leading-relaxed">
                      Complaints route instantly to designated electricians, plumbers, carpenters, or network admins.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-xl transition-all hover:border-slate-300 dark:hover:border-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 text-[#2563EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#111827] dark:text-white">Admin Monitoring</h4>
                    <p className="text-sm text-[#667085] dark:text-slate-400 mt-1 leading-relaxed">
                      Give hostel administration a clear overview of pending workloads, unresolved bottlenecks, and staff SLAs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-xl transition-all hover:border-slate-300 dark:hover:border-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 text-[#2563EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#111827] dark:text-white">Student Feedback</h4>
                    <p className="text-sm text-[#667085] dark:text-slate-400 mt-1 leading-relaxed">
                      Collect resident confirmation and ratings after resolution to verify the fix before closing tickets.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (HORIZONTAL TIMELINE) */}
      <section id="how-it-works" className="py-20 lg:py-28 border-t border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-2">Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] dark:text-white tracking-tight">
              How it works
            </h2>
            <p className="text-base text-[#667085] dark:text-slate-300 mt-2">
              A transparent four-step cycle from incident reporting to closure.
            </p>
          </div>

          {/* Timeline: Horizontal on Desktop, Vertical on Mobile */}
          <div className="relative">
            
            {/* Desktop Connecting Line */}
            <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-[#E5E7EB] dark:bg-slate-800 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              
              {/* Step 1 */}
              <div className="flex flex-col items-start bg-white dark:bg-[#111827]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-900 border-2 border-[#163B73] dark:border-blue-500 text-[#163B73] dark:text-blue-400 flex items-center justify-center font-bold text-base shadow-xs">
                    01
                  </div>
                </div>
                <h3 className="text-base font-bold text-[#111827] dark:text-white">Submit</h3>
                <p className="text-sm text-[#667085] dark:text-slate-400 mt-1.5 leading-relaxed">
                  Log in with student credentials, pick category, room, and submit the description in under 30 seconds.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-start bg-white dark:bg-[#111827]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-900 border-2 border-[#E5E7EB] dark:border-slate-700 text-[#111827] dark:text-white flex items-center justify-center font-bold text-base shadow-xs">
                    02
                  </div>
                </div>
                <h3 className="text-base font-bold text-[#111827] dark:text-white">Review</h3>
                <p className="text-sm text-[#667085] dark:text-slate-400 mt-1.5 leading-relaxed">
                  Hostel administration reviews urgency and assigns the work ticket to dedicated maintenance staff.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-start bg-white dark:bg-[#111827]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-900 border-2 border-[#E5E7EB] dark:border-slate-700 text-[#111827] dark:text-white flex items-center justify-center font-bold text-base shadow-xs">
                    03
                  </div>
                </div>
                <h3 className="text-base font-bold text-[#111827] dark:text-white">Resolve</h3>
                <p className="text-sm text-[#667085] dark:text-slate-400 mt-1.5 leading-relaxed">
                  Technician arrives at the student's room, inspects, fixes the issue, and marks status as completed.
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-start bg-white dark:bg-[#111827]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-900 border-2 border-[#16A34A] dark:border-emerald-500 text-[#16A34A] flex items-center justify-center font-bold text-base shadow-xs">
                    04
                  </div>
                </div>
                <h3 className="text-base font-bold text-[#111827] dark:text-white">Track</h3>
                <p className="text-sm text-[#667085] dark:text-slate-400 mt-1.5 leading-relaxed">
                  Receive live notifications at every milestone and provide rating feedback to conclude the ticket.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6. PRODUCT PREVIEW SECTION: "Everything in one place." */}
      <section id="product-preview" className="py-20 lg:py-28 border-t border-[#E5E7EB] dark:border-slate-800 bg-[#F7F8FA] dark:bg-[#0B0F17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-2">Centralized Operations</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] dark:text-white tracking-tight">
                Everything in one place.
              </h2>
              <p className="text-base text-[#667085] dark:text-slate-300 mt-2 max-w-xl">
                A unified overview for administration and maintenance personnel to track, filter, and resolve issues without messy paper records.
              </p>
            </div>
            
            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-white dark:bg-[#111827] p-1 rounded-lg border border-[#E5E7EB] dark:border-slate-800 self-start md:self-auto">
              {(['all', 'in-progress', 'pending', 'resolved'] as const).map(filter => (
                <button
                  key={filter}
                  onClick={() => setActivePreviewFilter(filter)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded capitalize transition-all cursor-pointer ${
                    activePreviewFilter === filter
                      ? 'bg-[#163B73] dark:bg-blue-600 text-white shadow-xs'
                      : 'text-[#667085] dark:text-slate-300 hover:text-[#111827]'
                  }`}
                >
                  {filter.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Large Realistic Admin Dashboard Preview */}
          <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
            
            {/* Table Header Bar */}
            <div className="px-6 py-4 border-b border-[#E5E7EB] dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/60 dark:bg-slate-900/40">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-[#111827] dark:text-white">Complaint Overview</span>
                <span className="text-xs font-medium text-[#667085] dark:text-slate-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-[#E5E7EB] dark:border-slate-700">
                  Total: 42
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-[#F59E0B] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B]"></span> Pending: 12
                </span>
                <span className="flex items-center gap-1.5 text-[#2563EB] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span> In Progress: 18
                </span>
                <span className="flex items-center gap-1.5 text-[#16A34A] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span> Resolved: 12
                </span>
              </div>
            </div>

            {/* Table Component */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#E5E7EB] dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/20 text-[#667085] dark:text-slate-400 text-xs font-semibold">
                    <th className="px-6 py-3.5">Complaint</th>
                    <th className="px-6 py-3.5">Student / Room</th>
                    <th className="px-6 py-3.5">Category</th>
                    <th className="px-6 py-3.5">Priority</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5">Assigned To</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] dark:divide-slate-800">
                  {filteredPreview.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-[#111827] dark:text-white">{item.title}</div>
                        <div className="text-xs text-[#667085] dark:text-slate-400">{item.id} · {item.updated}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-[#111827] dark:text-slate-200">{item.student}</div>
                        <div className="text-xs text-[#667085] dark:text-slate-400">Room {item.room}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-[#111827] dark:text-slate-300">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold ${
                          item.priority === 'High' ? 'text-red-600 dark:text-red-400' :
                          item.priority === 'Medium' ? 'text-amber-600 dark:text-amber-400' :
                          'text-slate-600 dark:text-slate-400'
                        }`}>
                          {item.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium ${
                          item.status === 'in-progress'
                            ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50'
                            : item.status === 'resolved'
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            item.status === 'in-progress' ? 'bg-amber-500' :
                            item.status === 'resolved' ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}></span>
                          {item.status === 'in-progress' ? 'In Progress' :
                           item.status === 'resolved' ? 'Resolved' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-[#667085] dark:text-slate-300">
                        {item.staff}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="px-6 py-3.5 bg-slate-50/60 dark:bg-slate-900/40 border-t border-[#E5E7EB] dark:border-slate-800 flex items-center justify-between text-xs text-[#667085] dark:text-slate-400">
              <span>Showing {filteredPreview.length} active complaints in current block</span>
              <button onClick={onGetStarted} className="text-[#2563EB] hover:underline font-semibold cursor-pointer">
                Access Warden Portal →
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. BENEFITS SECTION (THREE CLEAN COLUMNS) */}
      <section className="py-20 lg:py-28 border-t border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-2">Stakeholder Value</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] dark:text-white tracking-tight">
              Benefits tailored to every role
            </h2>
            <p className="text-base text-[#667085] dark:text-slate-300 mt-2">
              Designed to create seamless coordination between residents, management, and field technicians.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* For Students */}
            <div className="p-6 rounded-xl border border-[#E5E7EB] dark:border-slate-800 bg-[#F7F8FA] dark:bg-slate-900/50 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 text-[#163B73] dark:text-blue-400 flex items-center justify-center mb-5">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-2">FOR STUDENTS</h3>
                <p className="text-sm text-[#667085] dark:text-slate-400 mb-6">
                  No more visiting the warden's desk during study hours or dealing with lost complaint slips.
                </p>
                <ul className="space-y-2.5 text-sm font-medium text-[#111827] dark:text-slate-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                    <span>Easy mobile reporting in seconds</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                    <span>Clear real-time status tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                    <span>Faster turnaround with direct escalation</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* For Administration */}
            <div className="p-6 rounded-xl border border-[#E5E7EB] dark:border-slate-800 bg-[#F7F8FA] dark:bg-slate-900/50 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 text-[#163B73] dark:text-blue-400 flex items-center justify-center mb-5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-2">FOR ADMINISTRATION</h3>
                <p className="text-sm text-[#667085] dark:text-slate-400 mb-6">
                  Full visibility across hostel blocks with actionable metrics to hold service vendors accountable.
                </p>
                <ul className="space-y-2.5 text-sm font-medium text-[#111827] dark:text-slate-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                    <span>Centralized complaint repository</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                    <span>Better technician accountability</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                    <span>Effortless reporting for campus audits</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* For Maintenance Staff */}
            <div className="p-6 rounded-xl border border-[#E5E7EB] dark:border-slate-800 bg-[#F7F8FA] dark:bg-slate-900/50 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 text-[#163B73] dark:text-blue-400 flex items-center justify-center mb-5">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#111827] dark:text-white mb-2">FOR MAINTENANCE STAFF</h3>
                <p className="text-sm text-[#667085] dark:text-slate-400 mb-6">
                  Structured job cards with room location, issue description, and direct contact details.
                </p>
                <ul className="space-y-2.5 text-sm font-medium text-[#111827] dark:text-slate-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                    <span>Clear work assignments by trade</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                    <span>Priority-based dispatch queues</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                    <span>Simple one-tap completion updates</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. AUTHENTIC TESTIMONIALS */}
      <section className="py-20 lg:py-28 border-t border-[#E5E7EB] dark:border-slate-800 bg-[#F7F8FA] dark:bg-[#0B0F17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-2">Feedback</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] dark:text-white tracking-tight">
              Trusted by hostel residents
            </h2>
            <p className="text-base text-[#667085] dark:text-slate-300 mt-2">
              Authentic perspectives from students and warden supervisors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Testimonial 1 */}
            <div className="p-6 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-xl shadow-xs flex flex-col justify-between">
              <p className="text-sm text-[#111827] dark:text-slate-200 leading-relaxed italic mb-6">
                "Before HostelCare, we had to repeatedly tell the warden about maintenance issues. Now I can report and track everything from one place."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#E5E7EB] dark:border-slate-800">
                <div className="w-9 h-9 rounded-full bg-[#163B73] text-white flex items-center justify-center font-bold text-xs">
                  PS
                </div>
                <div>
                  <p className="text-sm font-bold text-[#111827] dark:text-white">Priya S.</p>
                  <p className="text-xs text-[#667085] dark:text-slate-400">2nd Year Student · Block C</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-6 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-xl shadow-xs flex flex-col justify-between">
              <p className="text-sm text-[#111827] dark:text-slate-200 leading-relaxed italic mb-6">
                "Reported a broken ceiling fan at 9:30 AM, and the electrician fixed it before noon. The status notifications kept me informed the whole time."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#E5E7EB] dark:border-slate-800">
                <div className="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-xs">
                  RS
                </div>
                <div>
                  <p className="text-sm font-bold text-[#111827] dark:text-white">Rahul Sharma</p>
                  <p className="text-xs text-[#667085] dark:text-slate-400">3rd Year Student · Block A</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-6 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-xl shadow-xs flex flex-col justify-between">
              <p className="text-sm text-[#111827] dark:text-slate-200 leading-relaxed italic mb-6">
                "Managing 400+ rooms used to result in lost registers. With the dashboard, our staff resolves 90% of requests within 24 hours."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-[#E5E7EB] dark:border-slate-800">
                <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
                  AK
                </div>
                <div>
                  <p className="text-sm font-bold text-[#111827] dark:text-white">Amit Kumar</p>
                  <p className="text-xs text-[#667085] dark:text-slate-400">Senior Hostel Warden</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. CONTACT CTA SECTION (INSTITUTIONAL & CLEAN) */}
      <section id="contact" className="py-20 lg:py-24 border-t border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#F7F8FA] dark:bg-slate-900/60 border border-[#E5E7EB] dark:border-slate-800 rounded-2xl p-8 sm:p-12 lg:p-16">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <p className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">Fast Support</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] dark:text-white tracking-tight">
                  Have a hostel issue?
                </h2>
                <p className="text-base text-[#667085] dark:text-slate-300 leading-relaxed max-w-lg">
                  Report it once. Track it clearly. Get it resolved. Our administration desk is available for immediate support.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={onGetStarted}
                    className="bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    Submit Complaint
                  </button>
                  <a
                    href="tel:+911234567890"
                    className="bg-white dark:bg-slate-800 text-[#111827] dark:text-white border border-[#E5E7EB] dark:border-slate-700 font-semibold text-sm px-6 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all inline-flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-[#163B73] dark:text-blue-400" />
                    Contact Administration
                  </a>
                </div>
              </div>

              {/* Direct Office Contacts Directory */}
              <div className="lg:col-span-5 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-[#111827] dark:text-white uppercase tracking-wider">
                  Campus Facility Office
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#667085] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[#111827] dark:text-white">Main Admin Block, Floor 1</p>
                      <p className="text-xs text-[#667085] dark:text-slate-400">Hostel Warden & Maintenance Desk</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#667085] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[#111827] dark:text-white">+91 123 456 7890</p>
                      <p className="text-xs text-[#667085] dark:text-slate-400">Mon–Sat: 8:00 AM – 8:00 PM (Emergency 24/7)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#667085] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[#111827] dark:text-white">office@hostelcare.com</p>
                      <p className="text-xs text-[#667085] dark:text-slate-400">Official student complaints mailbox</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 10. INSTITUTIONAL FOOTER */}
      <footer className="border-t border-[#E5E7EB] dark:border-slate-800 bg-white dark:bg-[#0B0F17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-8 mb-12">
            
            {/* Brand column */}
            <div className="col-span-2 md:col-span-5 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-[#163B73] dark:bg-blue-600 flex items-center justify-center text-white">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-base text-[#111827] dark:text-white tracking-tight">HostelCare</span>
              </div>
              <p className="text-sm text-[#667085] dark:text-slate-400 max-w-sm leading-relaxed">
                Making hostel maintenance simpler for students and administrators with clear accountability and fast resolution.
              </p>
            </div>

            {/* Product links */}
            <div className="col-span-1 md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold text-[#111827] dark:text-white uppercase tracking-wider">Product</h4>
              <ul className="space-y-2 text-sm text-[#667085] dark:text-slate-400 font-medium">
                <li><a href="#features" className="hover:text-[#111827] dark:hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-[#111827] dark:hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#product-preview" className="hover:text-[#111827] dark:hover:text-white transition-colors">Product Overview</a></li>
                <li><button onClick={onGetStarted} className="hover:text-[#111827] dark:hover:text-white transition-colors cursor-pointer text-left">Track Complaint</button></li>
              </ul>
            </div>

            {/* Support links */}
            <div className="col-span-1 md:col-span-4 space-y-3">
              <h4 className="text-xs font-bold text-[#111827] dark:text-white uppercase tracking-wider">Support</h4>
              <ul className="space-y-2 text-sm text-[#667085] dark:text-slate-400 font-medium">
                <li><a href="#contact" className="hover:text-[#111827] dark:hover:text-white transition-colors">Help Center & Office</a></li>
                <li><a href="#contact" className="hover:text-[#111827] dark:hover:text-white transition-colors">Emergency Contacts</a></li>
                <li><span className="text-slate-400 dark:text-slate-500">Hostel Rules & Maintenance Guidelines</span></li>
                <li><span className="text-slate-400 dark:text-slate-500">Privacy Policy</span></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-[#E5E7EB] dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#667085] dark:text-slate-400">
            <p>© 2026 HostelCare. All rights reserved.</p>
            <p className="font-medium">Online Hostel Complaint Management System</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
