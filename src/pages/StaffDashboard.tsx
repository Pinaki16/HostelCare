import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Wrench, 
  Droplets, 
  Zap, 
  Wifi, 
  User, 
  Calendar, 
  Check, 
  ArrowRight,
  MessageSquare,
  Building2,
  FileText,
  X,
  Play
} from 'lucide-react';
import { Complaint, User as UserType } from '@/src/types';
import { format } from 'date-fns';

interface StaffDashboardProps {
  user: UserType;
  token: string;
}

export default function StaffDashboard({ user, token }: StaffDashboardProps) {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [actionType, setActionType] = useState<'in-progress' | 'resolved'>('in-progress');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [filterTab, setFilterTab] = useState<'active' | 'resolved' | 'all'>('active');

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
      console.error("Failed to fetch staff tasks", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleUpdateStatus = async (id: number, status: string, customNotes?: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/complaints/${id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          status, 
          notes: customNotes !== undefined ? customNotes : notes 
        })
      });
      if (res.ok) {
        setSelectedComplaint(null);
        setNotes('');
        fetchComplaints();
      } else {
        alert("Failed to update status. Please try again.");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'water': return Droplets;
      case 'electricity': return Zap;
      case 'internet': return Wifi;
      default: return Wrench;
    }
  };

  const activeJobs = complaints.filter(c => c.status !== 'resolved');
  const completedJobs = complaints.filter(c => c.status === 'resolved');

  const displayedJobs = complaints.filter(c => {
    if (filterTab === 'active') return c.status !== 'resolved';
    if (filterTab === 'resolved') return c.status === 'resolved';
    return true;
  });

  return (
    <div className="space-y-8">
      
      {/* 1. Header with Technician Welcome */}
      <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Maintenance Technician Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-white tracking-tight">
            Welcome, {user.name} 🔧
          </h1>
          <p className="text-sm text-[#667085] dark:text-slate-400 mt-1 max-w-xl">
            Here are the hostel maintenance requests assigned to you by the warden. Update the status once you start work or finish a repair.
          </p>
        </div>

        {/* Quick Summary Pill */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-[#E5E7EB] dark:border-slate-800 flex-shrink-0">
          <div className="text-center px-3 border-r border-[#E5E7EB] dark:border-slate-700">
            <p className="text-xs text-[#667085] dark:text-slate-400">To Do</p>
            <p className="text-xl font-bold text-[#2563EB]">{activeJobs.length}</p>
          </div>
          <div className="text-center px-3">
            <p className="text-xs text-[#667085] dark:text-slate-400">Completed</p>
            <p className="text-xl font-bold text-[#16A34A]">{completedJobs.length}</p>
          </div>
        </div>
      </div>

      {/* 2. Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E7EB] dark:border-slate-800 pb-3">
        <button
          onClick={() => setFilterTab('active')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            filterTab === 'active'
              ? 'bg-[#163B73] dark:bg-blue-600 text-white shadow-xs'
              : 'text-[#667085] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Active Jobs to Do ({activeJobs.length})
        </button>
        <button
          onClick={() => setFilterTab('resolved')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            filterTab === 'resolved'
              ? 'bg-[#163B73] dark:bg-blue-600 text-white shadow-xs'
              : 'text-[#667085] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Finished Repairs ({completedJobs.length})
        </button>
        <button
          onClick={() => setFilterTab('all')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            filterTab === 'all'
              ? 'bg-[#163B73] dark:bg-blue-600 text-white shadow-xs'
              : 'text-[#667085] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          All ({complaints.length})
        </button>
      </div>

      {/* 3. High-Clarity Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedJobs.map(c => {
          const CategoryIcon = getCategoryIcon(c.category);
          const isPending = c.status === 'pending';
          const isInProgress = c.status === 'in-progress';
          const isResolved = c.status === 'resolved';

          return (
            <div 
              key={c.id} 
              className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              <div>
                
                {/* Top Badge Strip */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                    isPending
                      ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/50'
                      : isInProgress
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/50'
                      : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      isPending ? 'bg-amber-500' : isInProgress ? 'bg-blue-500' : 'bg-emerald-500'
                    }`}></span>
                    {isPending ? 'Needs Your Attention' : isInProgress ? 'In Progress (You are working on this)' : 'Completed & Solved'}
                  </span>

                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    c.priority === 'high' ? 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-400' :
                    c.priority === 'medium' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400' :
                    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {c.priority === 'high' ? 'High Priority' : c.priority === 'medium' ? 'Medium' : 'Normal'}
                  </span>
                </div>

                {/* Main Job Title & Category */}
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#163B73] dark:text-blue-400 flex items-center justify-center flex-shrink-0 border border-[#E5E7EB] dark:border-slate-700">
                    <CategoryIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#111827] dark:text-white leading-tight">
                      {c.category} Repair
                    </h3>
                    <p className="text-xs text-[#667085] dark:text-slate-400 mt-0.5">
                      Assigned on {format(new Date(c.created_at), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>

                {/* Problem Description */}
                <div className="bg-slate-50 dark:bg-slate-900/60 border border-[#E5E7EB] dark:border-slate-800 p-3.5 rounded-lg mb-4">
                  <p className="text-xs font-semibold text-[#667085] dark:text-slate-400 uppercase tracking-wider mb-1">
                    Student's Problem Description:
                  </p>
                  <p className="text-sm text-[#111827] dark:text-slate-200 leading-relaxed font-medium">
                    "{c.description}"
                  </p>
                </div>

                {/* Resident Details */}
                <div className="flex items-center gap-2.5 text-xs text-[#667085] dark:text-slate-400 mb-6">
                  <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-[#111827] dark:text-white flex items-center justify-center font-bold text-[10px]">
                    {c.student_name ? c.student_name[0] : 'S'}
                  </div>
                  <span>Resident: <strong className="text-[#111827] dark:text-white">{c.student_name || 'Hostel Student'}</strong></span>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E5E7EB] dark:border-slate-800 flex items-center gap-3">
                {isPending && (
                  <button
                    onClick={() => handleUpdateStatus(c.id, 'in-progress', 'Started working on this issue.')}
                    className="flex-1 bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-4 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Start Working
                  </button>
                )}

                {isInProgress && (
                  <>
                    <button
                      onClick={() => {
                        setSelectedComplaint(c);
                        setActionType('resolved');
                      }}
                      className="flex-1 bg-[#16A34A] hover:bg-emerald-700 text-white font-semibold text-xs py-2.5 px-4 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      Mark as Fixed & Done
                    </button>
                    <button
                      onClick={() => {
                        setSelectedComplaint(c);
                        setActionType('in-progress');
                      }}
                      className="px-3 py-2.5 border border-[#E5E7EB] dark:border-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-[#667085] cursor-pointer"
                    >
                      Add Note
                    </button>
                  </>
                )}

                {isResolved && (
                  <div className="w-full py-2 bg-emerald-50 dark:bg-emerald-950/40 text-[#16A34A] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50 rounded-lg text-center text-xs font-semibold flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Repair Successfully Completed
                  </div>
                )}
              </div>

            </div>
          );
        })}

        {displayedJobs.length === 0 && (
          <div className="col-span-full bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-2xl p-12 text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-[#16A34A] flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#111827] dark:text-white">All caught up!</h3>
            <p className="text-xs text-[#667085] dark:text-slate-400 mt-1 max-w-sm mx-auto">
              There are no tasks pending in this section right now. New assignments from the warden will appear here automatically.
            </p>
          </div>
        )}
      </div>

      {/* 4. Update Status & Notes Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" 
            onClick={() => setSelectedComplaint(null)} 
          />
          <div className="relative bg-white dark:bg-[#111827] w-full max-w-md rounded-2xl shadow-xl border border-[#E5E7EB] dark:border-slate-800 overflow-hidden">
            
            <div className="px-6 py-5 border-b border-[#E5E7EB] dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
              <h3 className="text-base font-bold text-[#111827] dark:text-white">
                {actionType === 'resolved' ? 'Finish & Mark Resolved' : 'Add Update Note'}
              </h3>
              <button 
                onClick={() => setSelectedComplaint(null)}
                className="p-1 rounded-md text-[#667085] hover:text-[#111827]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-[#667085] dark:text-slate-400">
                Updating task for <strong className="text-[#111827] dark:text-white">{selectedComplaint.student_name}</strong> ({selectedComplaint.category})
              </p>

              {/* Quick pre-set notes for fast mobile tapping */}
              <div>
                <p className="text-[11px] font-bold text-[#111827] dark:text-slate-300 uppercase tracking-wider mb-2">
                  Quick common notes:
                </p>
                <div className="space-y-1.5">
                  {[
                    "Fixed and tested in presence of student.",
                    "Replaced faulty part with new replacement.",
                    "Inspected. Parts ordered from main store.",
                    "Student room was locked. Will visit again."
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setNotes(preset)}
                      className="w-full text-left p-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-[#E5E7EB] dark:border-slate-700 text-[#111827] dark:text-slate-200 transition-colors"
                    >
                      + {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111827] dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Custom Notes (Optional):
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Type any additional remarks..."
                  className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 rounded-lg text-[#111827] dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E5E7EB] dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedComplaint(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#667085]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedComplaint.id, actionType)}
                  disabled={loading}
                  className="bg-[#16A34A] hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  {loading ? 'Saving...' : actionType === 'resolved' ? 'Confirm Resolved' : 'Save Note'}
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
