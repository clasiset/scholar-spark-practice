
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
  FileText
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
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${
      isActive 
        ? 'bg-primary text-primary-foreground shadow-md' 
        : 'hover:bg-accent hover:text-accent-foreground'
    }`}
  >
    <Icon className="w-5 h-5 shrink-0" />
    <span className="truncate">{children}</span>
  </Link>
);

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
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
    <div className="flex min-h-screen bg-background">
      {/* Responsive Sidebar */}
      <aside className={`${
        sidebarCollapsed ? 'w-16' : 'w-64'
      } bg-card border-r border-border flex flex-col shadow-lg transition-all duration-300 relative z-40`}>
        
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <h1 className="font-bold text-xl text-foreground">Zehulu Admin</h1>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-md hover:bg-accent transition-colors"
              aria-label="Toggle sidebar"
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 p-4 flex-1">
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
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Quick Actions */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-border">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="flex items-center gap-2 w-full p-2 text-left text-sm hover:bg-accent rounded-md transition-colors">
                <Bell className="w-4 h-4" />
                Send Announcement
              </button>
              <button className="flex items-center gap-2 w-full p-2 text-left text-sm hover:bg-accent rounded-md transition-colors">
                <UserCheck className="w-4 h-4" />
                Add Student
              </button>
              <button className="flex items-center gap-2 w-full p-2 text-left text-sm hover:bg-accent rounded-md transition-colors">
                <FileText className="w-4 h-4" />
                Generate Report
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-foreground">Admin Dashboard</h2>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-accent rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* User Profile */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                A
              </div>
              <span className="text-sm font-medium hidden sm:block">Administrator</span>
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
