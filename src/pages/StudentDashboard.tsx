import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Droplets, 
  Zap, 
  Wifi, 
  Wrench, 
  Search, 
  SlidersHorizontal,
  X,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Complaint, User } from '@/src/types';
import { format } from 'date-fns';

interface StudentDashboardProps {
  user: User;
  token: string;
}

const CATEGORIES = [
  { id: 'Water', label: 'Water & Plumbing', icon: Droplets, subtext: 'Taps, pipes, leakage, geyser' },
  { id: 'Electricity', label: 'Electrical & Power', icon: Zap, subtext: 'Fan, tube light, switch, wiring' },
  { id: 'Internet', label: 'Wi-Fi & Internet', icon: Wifi, subtext: 'No signal, slow speed, router' },
  { id: 'Furniture', label: 'Room Furniture', icon: Wrench, subtext: 'Bed, chair, study table, door lock' },
  { id: 'Cleanliness', label: 'Cleaning & Washroom', icon: Sparkles, subtext: 'Room cleaning, garbage, corridors' },
] as const;

export default function StudentDashboard({ user, token }: StudentDashboardProps) {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in-progress' | 'resolved'>('all');

  const [formData, setFormData] = useState({
    category: 'Water',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  const fetchComplaints = async () => {
    try {
      const res = await fetch('/api/complaints', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setComplaints(data);
      }
    } catch (err) {
      console.error("Failed to load complaints", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ category: 'Water', description: '', priority: 'medium' });
        fetchComplaints();
      } else {
        const errData = await res.json();
        alert(errData.error || 'Could not submit issue. Please check all fields.');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'water': return Droplets;
      case 'electricity': return Zap;
      case 'internet': return Wifi;
      case 'furniture':
      case 'maintenance': return Wrench;
      default: return AlertCircle;
    }
  };

  const pendingCount = complaints.filter(c => c.status === 'pending').length;
  const inProgressCount = complaints.filter(c => c.status === 'in-progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'resolved').length;

  const filteredComplaints = complaints.filter(c => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchesCategory = c.category?.toLowerCase().includes(q);
      const matchesDesc = c.description?.toLowerCase().includes(q);
      return matchesCategory || matchesDesc;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      
      {/* 1. Welcoming Non-Technical Header */}
      <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 text-[#2563EB] dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Student Resident Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-white tracking-tight">
            Welcome back, {user.name} 👋
          </h1>
          <p className="text-sm text-[#667085] dark:text-slate-400 mt-1 max-w-xl">
            Have a problem with water, electricity, Wi-Fi, or room maintenance? Report it here and track repairs until it's completely fixed.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2.5 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold px-5 py-3.5 rounded-xl text-sm shadow-sm transition-all cursor-pointer flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          Report a Problem in My Room
        </button>
      </div>

      {/* 2. Plain-English Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        {/* Under Review */}
        <div 
          onClick={() => setStatusFilter(statusFilter === 'pending' ? 'all' : 'pending')}
          className={`p-5 rounded-xl border transition-all cursor-pointer ${
            statusFilter === 'pending'
              ? 'bg-amber-50/50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 ring-2 ring-amber-500/20'
              : 'bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Awaiting Review
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-[#111827] dark:text-white">{pendingCount}</p>
          <p className="text-xs text-[#667085] dark:text-slate-400 mt-1">
            Warden office is reviewing these
          </p>
        </div>

        {/* Being Fixed */}
        <div 
          onClick={() => setStatusFilter(statusFilter === 'in-progress' ? 'all' : 'in-progress')}
          className={`p-5 rounded-xl border transition-all cursor-pointer ${
            statusFilter === 'in-progress'
              ? 'bg-blue-50/50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800 ring-2 ring-blue-500/20'
              : 'bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-blue-400">
              Being Fixed
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-[#2563EB] flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-[#111827] dark:text-white">{inProgressCount}</p>
          <p className="text-xs text-[#667085] dark:text-slate-400 mt-1">
            Technicians currently assigned
          </p>
        </div>

        {/* Resolved */}
        <div 
          onClick={() => setStatusFilter(statusFilter === 'resolved' ? 'all' : 'resolved')}
          className={`p-5 rounded-xl border transition-all cursor-pointer ${
            statusFilter === 'resolved'
              ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 ring-2 ring-emerald-500/20'
              : 'bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] dark:text-emerald-400">
              Fixed & Completed
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-[#16A34A] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-[#111827] dark:text-white">{resolvedCount}</p>
          <p className="text-xs text-[#667085] dark:text-slate-400 mt-1">
            Issues successfully solved
          </p>
        </div>

      </div>

      {/* 3. Filter Bar & Search */}
      <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'pending', 'in-progress', 'resolved'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === tab
                  ? 'bg-[#163B73] dark:bg-blue-600 text-white shadow-xs'
                  : 'text-[#667085] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab === 'all' ? 'All Complaints' : tab === 'pending' ? 'Under Review' : tab === 'in-progress' ? 'Being Fixed' : 'Completed'}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#667085] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search your complaints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 rounded-lg text-[#111827] dark:text-white placeholder-[#667085] focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 4. Non-Technical Incident Card List */}
      <div className="space-y-4">
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map((item) => {
            const Icon = getCategoryIcon(item.category);
            return (
              <div 
                key={item.id} 
                className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  
                  {/* Category & Title */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#163B73] dark:text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#E5E7EB] dark:border-slate-700">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-bold text-base text-[#111827] dark:text-white">
                          {item.category} Issue
                        </span>
                        <span className="text-xs text-[#667085] dark:text-slate-400">
                          (Ticket #{item.id})
                        </span>
                      </div>
                      <p className="text-sm text-[#111827] dark:text-slate-200 leading-relaxed max-w-2xl">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Status & Urgency Badges */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 flex-shrink-0">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                      item.status === 'pending'
                        ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/50'
                        : item.status === 'in-progress'
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/50'
                        : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        item.status === 'pending' ? 'bg-amber-500' :
                        item.status === 'in-progress' ? 'bg-blue-500' : 'bg-emerald-500'
                      }`}></span>
                      {item.status === 'pending' ? 'Awaiting Warden Review' :
                       item.status === 'in-progress' ? 'Technician Assigned' : 'Fixed & Resolved'}
                    </span>

                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      item.priority === 'high' ? 'text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-950/50' :
                      item.priority === 'medium' ? 'text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/50' :
                      'text-slate-600 bg-slate-100 dark:text-slate-400 dark:bg-slate-800'
                    }`}>
                      {item.priority === 'high' ? 'Urgent Attention' : item.priority === 'medium' ? 'Normal Priority' : 'Low Priority'}
                    </span>
                  </div>

                </div>

                {/* Progress Stepper Line */}
                <div className="pt-4 border-t border-[#E5E7EB] dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#667085] dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reported on {format(new Date(item.created_at), 'MMMM dd, yyyy')}</span>
                  </div>

                  {item.status === 'in-progress' && (
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                      <Wrench className="w-3.5 h-3.5" />
                      <span>Hostel technician is currently working on this issue.</span>
                    </div>
                  )}

                  {item.status === 'resolved' && (
                    <div className="flex items-center gap-1.5 text-[#16A34A] dark:text-emerald-400 font-semibold">
                      <Check className="w-4 h-4" />
                      <span>Repairs finished. Contact warden if further help is needed.</span>
                    </div>
                  )}
                </div>

              </div>
            );
          })
        ) : (
          <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-2xl p-12 text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 text-[#2563EB] flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#111827] dark:text-white">No complaints found</h3>
            <p className="text-xs text-[#667085] dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Everything in your room seems to be in order! If anything breaks, you can report it in seconds.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 inline-flex items-center gap-2 bg-[#2563EB] text-white text-xs font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Report an Issue
            </button>
          </div>
        )}
      </div>

      {/* 5. Guided "Report a Problem" Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" 
            onClick={() => setIsModalOpen(false)} 
          />
          <div className="relative bg-white dark:bg-[#111827] w-full max-w-xl rounded-2xl shadow-xl border border-[#E5E7EB] dark:border-slate-800 overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[#E5E7EB] dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
              <div>
                <h3 className="text-lg font-bold text-[#111827] dark:text-white">Report a Problem in Your Room</h3>
                <p className="text-xs text-[#667085] dark:text-slate-400 mt-0.5">Your hostel maintenance team will review and assign staff.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-[#667085] hover:text-[#111827] hover:bg-slate-200/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              
              {/* Step 1: Category Selection */}
              <div>
                <label className="block text-xs font-bold text-[#111827] dark:text-slate-200 uppercase tracking-wider mb-2.5">
                  1. What needs fixing?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CATEGORIES.map(cat => {
                    const isSelected = formData.category === cat.id;
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat.id })}
                        className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/70 dark:bg-blue-950/50 border-[#2563EB] ring-1 ring-[#2563EB]'
                            : 'bg-white dark:bg-slate-900 border-[#E5E7EB] dark:border-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'bg-[#2563EB] text-white' : 'bg-slate-100 dark:bg-slate-800 text-[#667085]'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className={`text-xs font-bold ${isSelected ? 'text-[#2563EB] dark:text-blue-400' : 'text-[#111827] dark:text-white'}`}>
                            {cat.label}
                          </p>
                          <p className="text-[11px] text-[#667085] dark:text-slate-400 leading-tight mt-0.5">
                            {cat.subtext}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Urgency Selection */}
              <div>
                <label className="block text-xs font-bold text-[#111827] dark:text-slate-200 uppercase tracking-wider mb-2">
                  2. How urgent is this?
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'low', label: 'Normal', note: '2–3 days' },
                    { id: 'medium', label: 'Important', note: 'Within 24h' },
                    { id: 'high', label: 'Urgent', note: 'Immediate' },
                  ].map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, priority: p.id as any })}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        formData.priority === p.id
                          ? 'bg-[#163B73] dark:bg-blue-600 text-white border-[#163B73] dark:border-blue-600 shadow-xs'
                          : 'bg-white dark:bg-slate-900 border-[#E5E7EB] dark:border-slate-700 text-[#667085] hover:border-slate-300'
                      }`}
                    >
                      <p className="text-xs font-bold capitalize">{p.label}</p>
                      <p className={`text-[10px] mt-0.5 ${formData.priority === p.id ? 'text-blue-100' : 'text-[#667085]'}`}>
                        {p.note}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Description */}
              <div>
                <label className="block text-xs font-bold text-[#111827] dark:text-slate-200 uppercase tracking-wider mb-2">
                  3. Please describe what's wrong
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., The tap in room washbasin is leaking continuously onto the floor..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 rounded-xl text-[#111827] dark:text-white placeholder-[#667085] focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E5E7EB] dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-[#667085] hover:text-[#111827] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !formData.description.trim()}
                  className="bg-[#2563EB] hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs px-5 py-2.5 rounded-lg shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  {loading ? 'Submitting...' : 'Send Complaint'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
