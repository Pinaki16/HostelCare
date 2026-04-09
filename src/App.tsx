import React, { useState, useEffect } from 'react';
import Auth from './pages/Auth';
import LandingPage from './pages/LandingPage';
import Layout from './components/Layout';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import AdminUserManagement from './pages/AdminUserManagement';
import { AuthState, User } from './types';

export default function App() {
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem('hostel_auth');
    return saved ? JSON.parse(saved) : { user: null, token: null };
  });

  const [showAuth, setShowAuth] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');

  useEffect(() => {
    localStorage.setItem('hostel_auth', JSON.stringify(auth));
  }, [auth]);

  const handleLogin = (data: { user: User; token: string }) => {
    setAuth(data);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setAuth({ user: null, token: null });
    setShowAuth(false);
  };

  if (!auth.user || !auth.token) {
    if (showAuth) {
      return <Auth onLogin={handleLogin} onBack={() => setShowAuth(false)} />;
    }
    return <LandingPage onGetStarted={() => setShowAuth(true)} />;
  }

  const renderContent = () => {
    if (auth.user?.role === 'student') return <StudentDashboard user={auth.user} token={auth.token} />;
    if (auth.user?.role === 'staff') return <StaffDashboard user={auth.user} token={auth.token} />;
    if (auth.user?.role === 'admin') {
      if (activeTab === 'Manage Users') return <AdminUserManagement token={auth.token} />;
      return <AdminDashboard user={auth.user} token={auth.token} />;
    }
    return null;
  };

  return (
    <Layout user={auth.user} onLogout={handleLogout} activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}
