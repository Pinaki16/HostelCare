import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  ShieldCheck, 
  Wrench, 
  GraduationCap, 
  Mail, 
  Hash, 
  Filter,
  CheckCircle2
} from 'lucide-react';
import { User as UserType } from '@/src/types';

interface AdminUserManagementProps {
  token: string;
}

export default function AdminUserManagement({ token }: AdminUserManagementProps) {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'staff' | 'admin'>('all');

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'student':
        return { label: 'Hostel Resident', icon: GraduationCap, style: 'text-blue-700 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900/50' };
      case 'staff':
        return { label: 'Maintenance Staff', icon: Wrench, style: 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900/50' };
      case 'admin':
        return { label: 'Hostel Warden / Rector', icon: ShieldCheck, style: 'text-indigo-700 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-900/50' };
      default:
        return { label: role, icon: Users, style: 'text-slate-700 bg-slate-50 border-slate-200' };
    }
  };

  const studentsCount = users.filter(u => u.role === 'student').length;
  const staffCount = users.filter(u => u.role === 'staff').length;
  const adminCount = users.filter(u => u.role === 'admin').length;

  const filteredUsers = users.filter(u => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = u.name?.toLowerCase().includes(q);
      const matchEmail = u.email?.toLowerCase().includes(q);
      const matchRoll = u.roll_no?.toLowerCase().includes(q);
      return matchName || matchEmail || matchRoll;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      
      {/* 1. Header */}
      <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 text-[#2563EB] dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Campus Residence Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-white tracking-tight">
            Hostel Directory & User Accounts
          </h1>
          <p className="text-sm text-[#667085] dark:text-slate-400 mt-1 max-w-xl">
            Directory of registered students, maintenance personnel, and hostel wardens for account verification and contact.
          </p>
        </div>

        {/* Metric pills */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-[#E5E7EB] dark:border-slate-800 flex-shrink-0">
          <div className="text-center px-3 border-r border-[#E5E7EB] dark:border-slate-700">
            <p className="text-[11px] text-[#667085] dark:text-slate-400">Students</p>
            <p className="text-lg font-bold text-[#2563EB]">{studentsCount}</p>
          </div>
          <div className="text-center px-3 border-r border-[#E5E7EB] dark:border-slate-700">
            <p className="text-[11px] text-[#667085] dark:text-slate-400">Staff</p>
            <p className="text-lg font-bold text-[#16A34A]">{staffCount}</p>
          </div>
          <div className="text-center px-3">
            <p className="text-[11px] text-[#667085] dark:text-slate-400">Wardens</p>
            <p className="text-lg font-bold text-indigo-600">{adminCount}</p>
          </div>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Role Chips */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'student', 'staff', 'admin'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setRoleFilter(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer whitespace-nowrap ${
                roleFilter === tab
                  ? 'bg-[#163B73] dark:bg-blue-600 text-white shadow-xs'
                  : 'text-[#667085] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab === 'all' ? 'All Accounts' : tab === 'student' ? 'Residents' : tab === 'staff' ? 'Technicians' : 'Wardens'}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#667085] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search name, roll no, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 rounded-lg text-[#111827] dark:text-white placeholder-[#667085] focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 3. Table */}
      <div className="bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-slate-800 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/30 text-[#667085] dark:text-slate-400 text-xs font-semibold">
                <th className="px-6 py-3.5">Name</th>
                <th className="px-6 py-3.5">Assigned Role</th>
                <th className="px-6 py-3.5">Room / Roll No</th>
                <th className="px-6 py-3.5">Campus Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] dark:border-slate-800">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => {
                  const roleData = getRoleBadge(u.role);
                  const RoleIcon = roleData.icon;

                  return (
                    <tr key={u.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#163B73] dark:bg-blue-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                            {u.name ? u.name[0].toUpperCase() : 'U'}
                          </div>
                          <div>
                            <p className="font-bold text-[#111827] dark:text-white">{u.name}</p>
                            <p className="text-xs text-[#667085] dark:text-slate-400">User ID #{u.id}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${roleData.style}`}>
                          <RoleIcon className="w-3.5 h-3.5" />
                          {roleData.label}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-xs font-medium text-[#111827] dark:text-slate-200">
                        {u.roll_no || <span className="text-[#667085] italic">-</span>}
                      </td>

                      <td className="px-6 py-4 text-xs text-[#667085] dark:text-slate-300 font-medium">
                        {u.email}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-xs text-[#667085]">
                    No accounts found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3.5 bg-slate-50/50 dark:bg-slate-900/30 border-t border-[#E5E7EB] dark:border-slate-800 text-xs text-[#667085] flex items-center justify-between">
          <span>Total {filteredUsers.length} accounts displayed</span>
          <span>HostelCare Portal</span>
        </div>
      </div>

    </div>
  );
}
