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
  X,
  Filter,
  Download,
  User,
  BookPlus,
  Home
} from "lucide-react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import DashboardOverview from "./admin/DashboardOverview";
import UserManagement from "./admin/UserManagement";
import AcademicManagement from "./admin/AcademicManagement";
import FinancialManagement from "./admin/FinancialManagement";
import Communication from "./admin/Communication";
import ReportsAnalytics from "./admin/ReportsAnalytics";
import AdminSettings from "./admin/AdminSettings";
import QuestionEditor from "./admin/QuestionEditor";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  
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

  const notifications = [
    { id: 1, title: "New admission request", time: "5 min ago", unread: true },
    { id: 2, title: "Fee payment overdue alert", time: "1 hour ago", unread: true },
    { id: 3, title: "System backup completed", time: "2 hours ago", unread: false },
  ];

  const handleQuickAdd = (type: string) => {
    if (type === 'question') {
      navigate('/admin/academics/new-question');
    } else {
      console.log(`Quick add: ${type}`);
    }
    // Add other quick action logic here
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Fixed Full Height Sidebar */}
      <aside className={`${
        sidebarCollapsed ? 'w-16' : 'w-72'
      } ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } fixed top-0 left-0 h-screen bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-700/60 flex flex-col shadow-2xl transition-all duration-300 z-50 overflow-y-auto`}>
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-200/60 dark:border-slate-700/60 flex-shrink-0">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">Z</span>
                </div>
                <div>
                  <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Zehulu Admin
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Educational Management</p>
                </div>
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

        {/* Navigation Menu */}
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
          
          <div className="mt-auto relative group">
            <SidebarLink 
              to="/" 
              icon={Home}
            >
              {!sidebarCollapsed && "Back to Site"}
            </SidebarLink>
            {sidebarCollapsed && (
              <div className="absolute left-full ml-3 px-3 py-2 bg-slate-900 dark:bg-slate-700 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Back to Site
              </div>
            )}
          </div>
        </nav>

        {/* Quick Actions */}
        {!sidebarCollapsed && (
          <div className="p-6 border-t border-slate-200/60 dark:border-slate-700/60 flex-shrink-0">
            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4 uppercase tracking-wider">Quick Actions</h3>
            <div className="space-y-2">
              <button 
                onClick={() => handleQuickAdd('question')}
                className="flex items-center gap-3 w-full p-3 text-left text-sm hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 rounded-lg transition-all duration-200 text-slate-700 dark:text-slate-300 hover:text-blue-700 group"
              >
                <BookPlus className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                Add Question
              </button>
              <button 
                onClick={() => handleQuickAdd('announcement')}
                className="flex items-center gap-3 w-full p-3 text-left text-sm hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 rounded-lg transition-all duration-200 text-slate-700 dark:text-slate-300 hover:text-blue-700 group"
              >
                <Bell className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                Send Announcement
              </button>
              <button 
                onClick={() => handleQuickAdd('student')}
                className="flex items-center gap-3 w-full p-3 text-left text-sm hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 rounded-lg transition-all duration-200 text-slate-700 dark:text-slate-300 hover:text-blue-700 group"
              >
                <UserCheck className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                Add Student
              </button>
              <button 
                onClick={() => handleQuickAdd('report')}
                className="flex items-center gap-3 w-full p-3 text-left text-sm hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 rounded-lg transition-all duration-200 text-slate-700 dark:text-slate-300 hover:text-blue-700 group"
              >
                <FileText className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                Generate Report
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area with margin to account for fixed sidebar */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      }`}>
        {/* Enhanced Header with Standard Dashboard Components */}
        <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700/60 px-6 py-4 shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between gap-4">
            {/* Left Section: Mobile Menu + Branding */}
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
            
            {/* Center Section: Global Search */}
            <div className="flex-1 max-w-xl mx-4 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search students, teachers, courses, reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Section: Actions + User Menu */}
            <div className="flex items-center gap-3">
              {/* Quick Add Dropdown */}
              <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg shadow-blue-500/25">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Quick Add</span>
                </button>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                    3
                  </span>
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700 last:border-0">
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-blue-500' : 'bg-slate-300'}`} />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{notification.title}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all notifications</button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* User Profile Menu */}
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Administrator</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">admin@zehulu.com</p>
                  </div>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50">
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                        <User className="w-4 h-4" />
                        My Profile
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <div className="border-t border-slate-200 dark:border-slate-700 my-2"></div>
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                        Logout
                      </button>
                    </div>
                  </div>
                )}
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
            <Route path="/academics/new-question" element={<QuestionEditor />} />
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
