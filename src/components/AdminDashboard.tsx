
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./admin/layout/AdminSidebar";
import AdminHeader from "./admin/layout/AdminHeader";
import DashboardOverview from "./admin/DashboardOverview";
import UserManagement from "./admin/UserManagement";
import AcademicManagement from "./admin/AcademicManagement";
import FinancialManagement from "./admin/FinancialManagement";
import Communication from "./admin/Communication";
import ReportsAnalytics from "./admin/ReportsAnalytics";
import AdminSettings from "./admin/AdminSettings";
import QuestionEditor from "./admin/QuestionEditor";

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } transition-transform duration-300 lg:relative lg:translate-x-0`}>
        <AdminSidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      }`}>
        {/* Header */}
        <AdminHeader 
          onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          mobileMenuOpen={mobileMenuOpen}
        />

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/users/roles" element={<div>Roles & Permissions</div>} />
            <Route path="/users/logs" element={<div>Activity Logs</div>} />
            <Route path="/users/segments" element={<div>User Segmentation</div>} />
            
            <Route path="/academics" element={<AcademicManagement />} />
            <Route path="/academics/new-question" element={<QuestionEditor />} />
            <Route path="/academics/exams" element={<div>Exams Management</div>} />
            <Route path="/academics/subjects" element={<div>Subjects Management</div>} />
            <Route path="/academics/grading" element={<div>Grading System</div>} />
            
            <Route path="/content/articles" element={<div>Articles Management</div>} />
            <Route path="/content/media" element={<div>Media Library</div>} />
            <Route path="/content/editor" element={<div>Content Editor</div>} />
            <Route path="/content/seo" element={<div>SEO Management</div>} />
            
            <Route path="/financial" element={<FinancialManagement />} />
            <Route path="/financial/subscriptions" element={<div>Subscriptions</div>} />
            <Route path="/financial/invoices" element={<div>Invoices</div>} />
            <Route path="/financial/payments" element={<div>Payment Methods</div>} />
            
            <Route path="/communication" element={<Communication />} />
            <Route path="/communication/email" element={<div>Email Campaigns</div>} />
            <Route path="/communication/support" element={<div>Support Tickets</div>} />
            <Route path="/communication/announcements" element={<div>Announcements</div>} />
            
            <Route path="/analytics/performance" element={<div>Performance Metrics</div>} />
            <Route path="/analytics/users" element={<div>User Analytics</div>} />
            <Route path="/analytics/content" element={<div>Content Analytics</div>} />
            <Route path="/analytics/reports" element={<ReportsAnalytics />} />
            
            <Route path="/system/health" element={<div>System Health</div>} />
            <Route path="/system/api" element={<div>API Management</div>} />
            <Route path="/system/backup" element={<div>Backup & Recovery</div>} />
            <Route path="/system/audit" element={<div>Audit Logs</div>} />
            
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="/settings/security" element={<div>Security Settings</div>} />
            <Route path="/settings/integrations" element={<div>Integrations</div>} />
            <Route path="/settings/advanced" element={<div>Advanced Settings</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
