import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, MessageSquare, AlertCircle } from 'lucide-react';
import { Complaint, User } from '@/src/types';
import { format } from 'date-fns';

interface StaffDashboardProps {
  user: User;
  token: string;
}

export default function StaffDashboard({ user, token }: StaffDashboardProps) {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchComplaints = async () => {
    const res = await fetch('/api/complaints', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    setComplaints(data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleUpdateStatus = async (id: number, status: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/complaints/${id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status, notes })
      });
      if (res.ok) {
        setSelectedComplaint(null);
        setNotes('');
        fetchComplaints();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Assigned Tasks</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Manage and resolve assigned maintenance issues</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complaints.map(c => (
          <div key={c.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                  c.status === 'pending' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/30' :
                  c.status === 'in-progress' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/30' :
                  'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30'
                }`}>
                  {c.status}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">{format(new Date(c.created_at), 'MMM dd')}</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">{c.category}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">{c.description}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-400">
                  {c.student_name?.[0]}
                </div>
                Student: {c.student_name}
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              {c.status !== 'resolved' && (
                <button 
                  onClick={() => setSelectedComplaint(c)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 dark:shadow-none"
                >
                  Update Status
                </button>
              )}
              <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {complaints.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
            <CheckCircle2 className="w-12 h-12 text-slate-200 dark:text-slate-800 mx-auto mb-4" />
            <p className="text-slate-400 dark:text-slate-600 font-medium">No tasks assigned to you yet.</p>
          </div>
        )}
      </div>

      {/* Update Status Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm" onClick={() => setSelectedComplaint(null)} />
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl p-6 border border-transparent dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Update Progress</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">New Status</label>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleUpdateStatus(selectedComplaint.id, 'in-progress')}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl text-sm font-bold border border-blue-100 dark:border-blue-800"
                  >
                    <Clock className="w-4 h-4" />
                    In Progress
                  </button>
                  <button 
                    onClick={() => handleUpdateStatus(selectedComplaint.id, 'resolved')}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm font-bold border border-emerald-100 dark:border-emerald-800"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Resolved
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Notes (Optional)</label>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none text-slate-900 dark:text-white"
                  placeholder="Add any updates or notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
            <button 
              onClick={() => setSelectedComplaint(null)}
              className="w-full mt-4 py-3 text-slate-500 dark:text-slate-400 font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
