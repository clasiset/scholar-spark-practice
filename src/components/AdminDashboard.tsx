
import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  BookOpen, 
  DollarSign, 
  MessageSquare, 
  BarChart3,
  Calendar,
  Bell,
  GraduationCap,
  UserCheck,
  FileText,
  Search,
  Plus,
  Menu,
  X
} from "lucide-react";
import { Link, Routes, Route } from "react-router-dom";
import DashboardOverview from "./admin/DashboardOverview";
import UserManagement from "./admin/UserManagement";
import AcademicManagement from "./admin/AcademicManagement";
import FinancialManagement from "./admin/FinancialManagement";
import Communication from "./admin/Communication";
import ReportsAnalytics from "./admin/ReportsAnalytics";
import AdminSettings from "./admin/AdminSettings";

const SidebarLink = ({ 
  to, 
  icon: Icon, 
  children, 
  isActive = false 
}: { 
  to: string; 
  icon: React.ElementType; 
  children: React.ReactNode;
  isActive?: boolean;
}) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium group hover:scale-[1.02] ${
      isActive 
        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
        : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-300'
    }`}
  >
    <Icon className={`w-5 h-5 shrink-0 transition-colors ${
      isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-600'
    }`} />
    <span className="truncate">{children}</span>
  </Link>
);

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const currentPath = window.location.pathname;

  const menuItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard Overview", exact: true },
    { to: "/admin/users", icon: Users, label: "User Management" },
    { to: "/admin/academics", icon: GraduationCap, label: "Academic Management" },
    { to: "/admin/financial", icon: DollarSign, label: "Financial Management" },
    { to: "/admin/communication", icon: MessageSquare, label: "Communication" },
    { to: "/admin/reports", icon: BarChart3, label: "Reports & Analytics" },
    { to: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Responsive Sidebar */}
      <aside className={`${
        sidebarCollapsed ? 'w-16' : 'w-72'
      } ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } fixed lg:relative h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-700/60 flex flex-col shadow-2xl transition-all duration-300 z-50`}>
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200/60 dark:border-slate-700/60">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Z</span>
                </div>
                <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Zehulu Admin
                </h1>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden lg:block"
              aria-label="Toggle sidebar"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors lg:hidden"
              aria-label="Close menu"
            >
              <X className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 p-6 flex-1">
          {menuItems.map((item) => {
            const isActive = item.exact 
              ? currentPath === item.to 
              : currentPath.startsWith(item.to) && item.to !== "/admin";
            
            return (
              <div key={item.to} className="relative group">
                <SidebarLink 
                  to={item.to} 
                  icon={item.icon}
                  isActive={isActive}
                >
                  {!sidebarCollapsed && item.label}
                </SidebarLink>
                
                {/* Tooltip for collapsed state */}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-3 px-3 py-2 bg-slate-900 dark:bg-slate-700 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Quick Actions */}
        {!sidebarCollapsed && (
          <div className="p-6 border-t border-slate-200/60 dark:border-slate-700/60">
            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4 uppercase tracking-wider">Quick Actions</h3>
            <div className="space-y-2">
              <button className="flex items-center gap-3 w-full p-3 text-left text-sm hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 rounded-lg transition-all duration-200 text-slate-700 dark:text-slate-300 hover:text-blue-700 group">
                <Bell className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                Send Announcement
              </button>
              <button className="flex items-center gap-3 w-full p-3 text-left text-sm hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 rounded-lg transition-all duration-200 text-slate-700 dark:text-slate-300 hover:text-blue-700 group">
                <UserCheck className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                Add Student
              </button>
              <button className="flex items-center gap-3 w-full p-3 text-left text-sm hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 rounded-lg transition-all duration-200 text-slate-700 dark:text-slate-300 hover:text-blue-700 group">
                <FileText className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                Generate Report
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700/60 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Zehulu Educational Management System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Global Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search students, teachers, courses..."
                className="pl-10 pr-4 py-2 w-64 bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Quick Add */}
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg shadow-blue-500/25">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Quick Add</span>
            </button>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                3
              </span>
            </button>
            
            {/* User Profile */}
            <div className="flex items-center gap-3 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Administrator</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">admin@zehulu.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/academics" element={<AcademicManagement />} />
            <Route path="/financial" element={<FinancialManagement />} />
            <Route path="/communication" element={<Communication />} />
            <Route path="/reports" element={<ReportsAnalytics />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
