import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  Users, 
  ClipboardList, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Search, 
  Filter, 
  Droplets, 
  Zap, 
  Wifi, 
  Wrench, 
  X, 
  Check, 
  UserCheck, 
  Building2, 
  AlertCircle,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { Complaint, User } from '@/src/types';
import { format } from 'date-fns';

interface AdminDashboardProps {
  user: User;
  token: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Water: '#2563EB',
  Electricity: '#F59E0B',
  Internet: '#8B5CF6',
  Furniture: '#10B981',
  Cleanliness: '#EC4899',
  Maintenance: '#64748B',
};

export default function AdminDashboard({ user, token }: AdminDashboardProps) {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [staff, setStaff] = useState<User[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in-progress' | 'resolved'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isAssigning, setIsAssigning] = useState(false);

  const fetchData = async () => {
    try {
      const [compRes, anaRes, staffRes] = await Promise.all([
        fetch('/api/complaints', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/analytics', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/users/staff', { headers: { 'Authorization': `Bearer ${token}` } })
      ]);
      
      if (compRes.ok) setComplaints(await compRes.json());
      if (anaRes.ok) setAnalytics(await anaRes.json());
      if (staffRes.ok) {
        const staffData = await staffRes.json();
        setStaff(Array.isArray(staffData) ? staffData : []);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssign = async (complaintId: number, staffId: number) => {
    setIsAssigning(true);
    try {
      const res = await fetch(`/api/complaints/${complaintId}/assign`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ staff_id: staffId })
      });
      if (res.ok) {
        setSelectedComplaint(null);
        fetchData();
      } else {
        const data = await res.json();
        alert(data.error || "Could not assign staff member.");
      }
    } catch (err) {
      alert("Connection error. Please try again.");
    } finally {
      setIsAssigning(false);
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat?.toLowerCase()) {
      case 'water': return Droplets;
      case 'electricity': return Zap;
      case 'internet': return Wifi;
      default: return Wrench;
    }
  };

  const filteredComplaints = complaints.filter(c => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && c.category?.toLowerCase() !== categoryFilter.toLowerCase()) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchStudent = c.student_name?.toLowerCase().includes(q);
      const matchDesc = c.description?.toLowerCase().includes(q);
      const matchCat = c.category?.toLowerCase().includes(q);
      const matchStaff = c.staff_name?.toLowerCase().includes(q);
      return matchStudent || matchDesc || matchCat || matchStaff;
    }
    return true;
  });

  const unassignedUrgent = complaints.filter(c => c.status === 'pending');

  if (!analytics) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-8 h-8 border-3 border-[#2563EB] border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-sm font-semibold text-[#667085]">Loading hostel operations desk...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* 1. Warden Operations Header */}
      <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900/60 text-indigo-700 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Hostel Administration Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-white tracking-tight">
            Hostel Operations & Maintenance Center
          </h1>
          <p className="text-sm text-[#667085] dark:text-slate-400 mt-1 max-w-xl">
            Live overview of student repair requests across all hostel wings. Review priority issues, dispatch maintenance staff, and track resolution time.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 text-xs font-semibold text-[#111827] dark:text-slate-200">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
            Hostel Desk Active
          </span>
        </div>
      </div>

      {/* 2. Plain-English Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Complaints */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-slate-400">
              Total Reported
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-[#163B73] dark:text-blue-400 flex items-center justify-center">
              <ClipboardList className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-[#111827] dark:text-white">{analytics.summary.total}</p>
          <p className="text-xs text-[#667085] dark:text-slate-400 mt-1">
            Total requests logged
          </p>
        </div>

        {/* Pending Assignment */}
        <div 
          onClick={() => setStatusFilter(statusFilter === 'pending' ? 'all' : 'pending')}
          className={`p-5 rounded-xl border transition-all cursor-pointer shadow-xs ${
            statusFilter === 'pending'
              ? 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-300 ring-2 ring-amber-500/20'
              : 'bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Needs Staff Assignment
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{analytics.summary.pending}</p>
          <p className="text-xs text-[#667085] dark:text-slate-400 mt-1">
            Waiting for technician assignment
          </p>
        </div>

        {/* In Progress */}
        <div 
          onClick={() => setStatusFilter(statusFilter === 'in-progress' ? 'all' : 'in-progress')}
          className={`p-5 rounded-xl border transition-all cursor-pointer shadow-xs ${
            statusFilter === 'in-progress'
              ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-300 ring-2 ring-blue-500/20'
              : 'bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-blue-400">
              Being Worked On
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-[#2563EB] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-[#2563EB] dark:text-blue-400">{analytics.summary.inProgress}</p>
          <p className="text-xs text-[#667085] dark:text-slate-400 mt-1">
            Technicians on active jobs
          </p>
        </div>

        {/* Resolved */}
        <div 
          onClick={() => setStatusFilter(statusFilter === 'resolved' ? 'all' : 'resolved')}
          className={`p-5 rounded-xl border transition-all cursor-pointer shadow-xs ${
            statusFilter === 'resolved'
              ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 ring-2 ring-emerald-500/20'
              : 'bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] dark:text-emerald-400">
              Resolved & Closed
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-[#16A34A] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-[#16A34A] dark:text-emerald-400">{analytics.summary.resolved}</p>
          <p className="text-xs text-[#667085] dark:text-slate-400 mt-1">
            Successfully solved issues
          </p>
        </div>

      </div>

      {/* 3. Triage Alert (If there are pending requests) */}
      {unassignedUrgent.length > 0 && (
        <div className="p-4 sm:p-5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-900 dark:text-amber-200">
                {unassignedUrgent.length} student complaint{unassignedUrgent.length > 1 ? 's' : ''} currently awaiting staff assignment
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                Assign a plumber, electrician, or technician below to dispatch help promptly.
              </p>
            </div>
          </div>
          <button
            onClick={() => setStatusFilter('pending')}
            className="self-start sm:self-auto px-4 py-2 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-all cursor-pointer"
          >
            Review Pending ({unassignedUrgent.length})
          </button>
        </div>
      )}

      {/* 4. Visual Overview: Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Category Breakdown Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-[#111827] dark:text-white">Issues by Category</h3>
              <p className="text-xs text-[#667085] dark:text-slate-400 mt-0.5">Distribution of reported problems across trades</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[#667085] dark:text-slate-300">
              Semester Total
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.categoryWise} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                <XAxis dataKey="category" tick={{ fontSize: 12, fill: '#667085' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#667085' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                  formatter={(val: any) => [`${val} complaints`, 'Count']}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {analytics.categoryWise.map((entry: any, index: number) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={CATEGORY_COLORS[entry.category] || '#2563EB'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Staff Team Overview */}
        <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#111827] dark:text-white mb-1">Maintenance Staff on Duty</h3>
            <p className="text-xs text-[#667085] dark:text-slate-400 mb-4">Registered technicians ready for job assignment</p>
            
            <div className="space-y-2.5 max-h-56 overflow-y-auto">
              {staff.length > 0 ? (
                staff.map((s) => (
                  <div key={s.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-[#E5E7EB] dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#163B73] dark:bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                        {s.name ? s.name[0] : 'T'}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#111827] dark:text-white">{s.name}</p>
                        <p className="text-[11px] text-[#667085] dark:text-slate-400">{s.email}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-900/50">
                      Available
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-xs text-[#667085] italic">
                  No staff accounts registered yet.
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5E7EB] dark:border-slate-800 mt-4 text-xs text-[#667085]">
            Total {staff.length} technicians available in roster.
          </div>
        </div>

      </div>

      {/* 5. Complete Complaints Dispatch Table */}
      <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-xl shadow-xs overflow-hidden">
        
        {/* Table Controls Bar */}
        <div className="p-5 border-b border-[#E5E7EB] dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/40">
          <div>
            <h3 className="text-base font-bold text-[#111827] dark:text-white">All Hostel Complaints</h3>
            <p className="text-xs text-[#667085] dark:text-slate-400 mt-0.5">Click "Assign" to dispatch maintenance personnel.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-60">
              <Search className="w-4 h-4 text-[#667085] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search student or room..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 rounded-lg text-[#111827] dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 rounded-lg text-[#111827] dark:text-white font-medium focus:outline-none"
            >
              <option value="all" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">All Statuses</option>
              <option value="pending" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Awaiting Staff Assignment</option>
              <option value="in-progress" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">In Progress</option>
              <option value="resolved" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Resolved</option>
            </select>
          </div>
        </div>

        {/* Tabular List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/20 text-[#667085] dark:text-slate-400 text-xs font-semibold">
                <th className="px-6 py-3.5">Student / Resident</th>
                <th className="px-6 py-3.5">Category & Description</th>
                <th className="px-6 py-3.5">Urgency</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Assigned Technician</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] dark:border-slate-800">
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((c) => {
                  const CategoryIcon = getCategoryIcon(c.category);
                  const isUnassigned = !c.staff_name;

                  return (
                    <tr key={c.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      
                      {/* Student */}
                      <td className="px-6 py-4">
                        <div className="font-bold text-[#111827] dark:text-white">
                          {c.student_name || 'Resident'}
                        </div>
                        <div className="text-xs text-[#667085] dark:text-slate-400">
                          Ticket #{c.id} · {format(new Date(c.created_at), 'MMM dd')}
                        </div>
                      </td>

                      {/* Issue */}
                      <td className="px-6 py-4 max-w-xs">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-[#111827] dark:text-slate-200">
                            <CategoryIcon className="w-3 h-3 text-[#2563EB]" />
                            {c.category}
                          </span>
                        </div>
                        <p className="text-xs text-[#111827] dark:text-slate-200 leading-relaxed line-clamp-2">
                          {c.description}
                        </p>
                      </td>

                      {/* Urgency */}
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold uppercase tracking-wider ${
                          c.priority === 'high' ? 'text-red-600 dark:text-red-400' :
                          c.priority === 'medium' ? 'text-amber-600 dark:text-amber-400' :
                          'text-slate-600 dark:text-slate-400'
                        }`}>
                          {c.priority}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          c.status === 'pending'
                            ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/50'
                            : c.status === 'in-progress'
                            ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/50'
                            : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            c.status === 'pending' ? 'bg-amber-500' :
                            c.status === 'in-progress' ? 'bg-blue-500' : 'bg-emerald-500'
                          }`}></span>
                          {c.status === 'pending' ? 'Needs Staff' :
                           c.status === 'in-progress' ? 'In Progress' : 'Resolved'}
                        </span>
                      </td>

                      {/* Assigned Staff */}
                      <td className="px-6 py-4">
                        {c.staff_name ? (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 text-[#2563EB] flex items-center justify-center font-bold text-[10px]">
                              {c.staff_name[0]}
                            </div>
                            <span className="text-xs font-semibold text-[#111827] dark:text-slate-200">
                              {c.staff_name}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-amber-600 dark:text-amber-400 font-medium italic">
                            Unassigned
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedComplaint(c)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                            isUnassigned
                              ? 'bg-[#2563EB] hover:bg-blue-700 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-[#111827] dark:text-white'
                          }`}
                        >
                          {isUnassigned ? 'Assign Staff' : 'Reassign'}
                        </button>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-xs text-[#667085]">
                    No complaints matching your current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-3.5 bg-slate-50/50 dark:bg-slate-900/30 border-t border-[#E5E7EB] dark:border-slate-800 text-xs text-[#667085] flex items-center justify-between">
          <span>Showing {filteredComplaints.length} of {complaints.length} total records</span>
          <span className="font-medium text-[#111827] dark:text-slate-300">Hostel Maintenance Unit</span>
        </div>
      </div>

      {/* 6. Assign Staff Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" 
            onClick={() => setSelectedComplaint(null)} 
          />
          <div className="relative bg-white dark:bg-[#111827] w-full max-w-md rounded-2xl shadow-xl border border-[#E5E7EB] dark:border-slate-800 overflow-hidden">
            
            <div className="px-6 py-5 border-b border-[#E5E7EB] dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
              <div>
                <h3 className="text-base font-bold text-[#111827] dark:text-white">Assign Technician</h3>
                <p className="text-xs text-[#667085] dark:text-slate-400 mt-0.5">Ticket #{selectedComplaint.id} ({selectedComplaint.category})</p>
              </div>
              <button 
                onClick={() => setSelectedComplaint(null)}
                className="p-1 rounded-md text-[#667085] hover:text-[#111827]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-xs text-[#667085] dark:text-slate-300 mb-3">
                Select a technician from the roster to dispatch for:
              </p>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 mb-4 text-xs">
                <p className="font-semibold text-[#111827] dark:text-white">{selectedComplaint.student_name}:</p>
                <p className="text-[#667085] dark:text-slate-400 mt-0.5">"{selectedComplaint.description}"</p>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
                {staff.length > 0 ? (
                  staff.map(s => (
                    <button
                      key={s.id}
                      disabled={isAssigning}
                      onClick={() => handleAssign(selectedComplaint.id, s.id)}
                      className="w-full flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB] dark:border-slate-800 hover:border-blue-400 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 transition-all text-left cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#163B73] dark:bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                          {s.name[0]}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#111827] dark:text-white group-hover:text-[#2563EB]">
                            {s.name}
                          </p>
                          <p className="text-[11px] text-[#667085] dark:text-slate-400">
                            {s.email}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#2563EB] group-hover:translate-x-0.5 transition-transform">
                        Assign →
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-[#667085] italic">
                    No staff accounts registered. Please register staff accounts first.
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSelectedComplaint(null)}
                className="w-full py-2.5 text-xs font-semibold text-[#667085] hover:text-[#111827]"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
