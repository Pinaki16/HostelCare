import React, { useState } from 'react';
import { 
  Building2, 
  ClipboardList, 
  Users, 
  LogOut, 
  Menu, 
  X,
  Wrench,
  GraduationCap,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { User } from '@/src/types';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Layout({ children, user, onLogout, activeTab, setActiveTab }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'student':
        return { label: 'Hostel Resident', icon: GraduationCap, color: 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900/60' };
      case 'staff':
        return { label: 'Maintenance Staff', icon: Wrench, color: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900/60' };
      case 'admin':
        return { label: 'Hostel Warden / Admin', icon: ShieldCheck, color: 'text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-900/60' };
      default:
        return { label: role, icon: ShieldCheck, color: 'text-slate-700 bg-slate-50 border-slate-200' };
    }
  };

  const roleInfo = getRoleBadge(user.role);

  const navigation = [
    { 
      name: 'Dashboard', 
      label: user.role === 'student' ? 'My Complaints' : user.role === 'staff' ? 'My Assigned Tasks' : 'Hostel Operations',
      icon: ClipboardList, 
      roles: ['student', 'admin', 'staff'] 
    },
    { 
      name: 'Manage Users', 
      label: 'Hostel Directory', 
      icon: Users, 
      roles: ['admin'] 
    },
  ].filter(item => item.roles.includes(user.role));

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#0B0F17] flex transition-colors duration-200 text-[#111827] dark:text-[#F9FAFB]">
      
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-[#111827] border-r border-[#E5E7EB] dark:border-slate-800 flex-shrink-0">
        
        {/* Brand Header */}
        <div className="p-5 border-b border-[#E5E7EB] dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#163B73] dark:bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-base text-[#111827] dark:text-white tracking-tight leading-none block">
                HostelCare
              </span>
              <span className="text-[11px] font-medium text-[#667085] dark:text-slate-400">
                Residential Portal
              </span>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3.5 space-y-1.5 overflow-y-auto">
          <div className="px-3 pt-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-[#667085] dark:text-slate-400">
            Navigation
          </div>
          {navigation.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer text-left",
                  isActive 
                    ? "bg-[#2563EB] text-white shadow-xs" 
                    : "text-[#667085] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#111827] dark:hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-4 h-4", isActive ? "text-white" : "text-[#667085] dark:text-slate-400")} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-white/80" />}
              </button>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-[#E5E7EB] dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-[#163B73] dark:bg-blue-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
              {user.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#111827] dark:text-white truncate">
                {user.name}
              </p>
              <div className="inline-flex items-center gap-1 mt-0.5 px-2 py-0.5 rounded text-[10px] font-semibold border"
                   style={{ borderColor: 'transparent' }}
              >
                <span className={cn("inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold border", roleInfo.color)}>
                  <roleInfo.icon className="w-3 h-3" />
                  {roleInfo.label}
                </span>
              </div>
            </div>
          </div>

          {user.roll_no && (
            <p className="text-xs text-[#667085] dark:text-slate-400 mb-3 px-1">
              Roll / Room: <span className="font-semibold text-[#111827] dark:text-slate-200">{user.roll_no}</span>
            </p>
          )}

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-900/50 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Mobile Top Header */}
        <header className="md:hidden bg-white dark:bg-[#111827] border-b border-[#E5E7EB] dark:border-slate-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#163B73] dark:bg-blue-600 flex items-center justify-center text-white">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-base text-[#111827] dark:text-white">HostelCare</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-lg text-[#667085] hover:text-[#111827] hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Mobile Drawer */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" 
              onClick={() => setIsSidebarOpen(false)} 
            />
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-[#111827] shadow-xl flex flex-col">
              <div className="p-5 border-b border-[#E5E7EB] dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#163B73] text-white flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-base text-[#111827] dark:text-white">HostelCare</span>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 rounded-md text-[#667085] hover:text-[#111827]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 p-4 space-y-1.5">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveTab(item.name);
                      setIsSidebarOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all text-left",
                      activeTab === item.name 
                        ? "bg-[#2563EB] text-white" 
                        : "text-[#667085] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="p-4 border-t border-[#E5E7EB] dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                <p className="text-xs font-bold text-[#111827] dark:text-white truncate">{user.name}</p>
                <p className="text-[11px] text-[#667085] dark:text-slate-400 mb-3">{roleInfo.label}</p>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}
