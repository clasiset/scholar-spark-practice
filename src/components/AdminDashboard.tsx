
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from './admin/layout/AdminSidebar';
import AdminHeader from './admin/layout/AdminHeader';
import DashboardOverview from './admin/DashboardOverview';
import UserManagement from './admin/UserManagement';
import AcademicManagement from './admin/AcademicManagement';
import FinancialManagement from './admin/FinancialManagement';
import ReportsAnalytics from './admin/ReportsAnalytics';
import Communication from './admin/Communication';
import AdminSettings from './admin/AdminSettings';
import QuestionEditor from './admin/QuestionEditor';
import WebTransactions from './admin/WebTransactions';
import { User } from '../types';

interface AdminDashboardProps {
  navigate: (page: string, data?: any) => void;
  openModal: (type: string, data?: any) => void;
  user?: User | null;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ navigate, openModal, user }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900">
      <AdminSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader user={user} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-slate-900 p-6">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/academic" element={<AcademicManagement />} />
            <Route path="/financial" element={<FinancialManagement />} />
            <Route path="/reports" element={<ReportsAnalytics />} />
            <Route path="/communication" element={<Communication />} />
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="/questions" element={<QuestionEditor />} />
            <Route path="/transactions" element={<WebTransactions />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
