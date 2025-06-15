
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  ShoppingCart,
  Package,
  TrendingUp,
  Activity,
  Shield,
  Database,
  Globe,
  ChevronDown,
  ChevronRight,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface MenuItem {
  title: string;
  icon: React.ElementType;
  path?: string;
  children?: MenuItem[];
  badge?: string;
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard Overview",
    icon: LayoutDashboard,
    path: "/admin"
  },
  {
    title: "Analytics & Reports",
    icon: BarChart3,
    children: [
      { title: "Performance Metrics", icon: TrendingUp, path: "/admin/analytics/performance" },
      { title: "User Analytics", icon: Users, path: "/admin/analytics/users" },
      { title: "Content Analytics", icon: FileText, path: "/admin/analytics/content" },
      { title: "Custom Reports", icon: BarChart3, path: "/admin/analytics/reports" }
    ]
  },
  {
    title: "User Management",
    icon: Users,
    children: [
      { title: "All Users", icon: Users, path: "/admin/users" },
      { title: "Roles & Permissions", icon: Shield, path: "/admin/users/roles" },
      { title: "Activity Logs", icon: Activity, path: "/admin/users/logs" },
      { title: "User Segmentation", icon: UserCheck, path: "/admin/users/segments" }
    ]
  },
  {
    title: "Academic Management",
    icon: GraduationCap,
    children: [
      { title: "Questions Bank", icon: BookOpen, path: "/admin/academics" },
      { title: "Exams", icon: FileText, path: "/admin/academics/exams" },
      { title: "Subjects", icon: BookOpen, path: "/admin/academics/subjects" },
      { title: "Grading", icon: BarChart3, path: "/admin/academics/grading" }
    ]
  },
  {
    title: "Content Management",
    icon: FileText,
    children: [
      { title: "Articles", icon: FileText, path: "/admin/content/articles" },
      { title: "Media Library", icon: Package, path: "/admin/content/media" },
      { title: "Content Editor", icon: FileText, path: "/admin/content/editor" },
      { title: "SEO Management", icon: Globe, path: "/admin/content/seo" }
    ]
  },
  {
    title: "Financial Management",
    icon: DollarSign,
    children: [
      { title: "Revenue Overview", icon: DollarSign, path: "/admin/financial" },
      { title: "Subscriptions", icon: Package, path: "/admin/financial/subscriptions" },
      { title: "Invoices", icon: FileText, path: "/admin/financial/invoices" },
      { title: "Payment Methods", icon: DollarSign, path: "/admin/financial/payments" }
    ]
  },
  {
    title: "Communication",
    icon: MessageSquare,
    children: [
      { title: "Notifications", icon: Bell, path: "/admin/communication" },
      { title: "Email Campaigns", icon: MessageSquare, path: "/admin/communication/email" },
      { title: "Support Tickets", icon: MessageSquare, path: "/admin/communication/support" },
      { title: "Announcements", icon: Bell, path: "/admin/communication/announcements" }
    ]
  },
  {
    title: "System Management",
    icon: Database,
    children: [
      { title: "System Health", icon: Activity, path: "/admin/system/health" },
      { title: "API Management", icon: Database, path: "/admin/system/api" },
      { title: "Backup & Recovery", icon: Shield, path: "/admin/system/backup" },
      { title: "Audit Logs", icon: FileText, path: "/admin/system/audit" }
    ]
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "General Settings", icon: Settings, path: "/admin/settings" },
      { title: "Security", icon: Shield, path: "/admin/settings/security" },
      { title: "Integrations", icon: Globe, path: "/admin/settings/integrations" },
      { title: "Advanced", icon: Settings, path: "/admin/settings/advanced" }
    ]
  }
];

const AdminSidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  const hasActiveChild = (children: MenuItem[]) => 
    children.some(child => child.path && isActive(child.path));

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.title);
    const itemIsActive = item.path ? isActive(item.path) : false;
    const childIsActive = hasChildren ? hasActiveChild(item.children) : false;

    if (hasChildren) {
      return (
        <div key={item.title}>
          <button
            onClick={() => toggleExpanded(item.title)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium group",
              childIsActive 
                ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300" 
                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 shrink-0 transition-colors",
              childIsActive ? "text-blue-600" : "text-slate-500"
            )} />
            {!collapsed && (
              <>
                <span className="truncate flex-1 text-left">{item.title}</span>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </>
            )}
          </button>
          
          {!collapsed && isExpanded && (
            <div className="ml-4 mt-1 space-y-1">
              {item.children.map(child => renderMenuItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.title}
        to={item.path!}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium group hover:scale-[1.02]",
          level > 0 ? "ml-2" : "",
          itemIsActive 
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25" 
            : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-300"
        )}
      >
        <item.icon className={cn(
          "w-5 h-5 shrink-0 transition-colors",
          itemIsActive ? "text-white" : "text-slate-500 group-hover:text-blue-600"
        )} />
        {!collapsed && <span className="truncate">{item.title}</span>}
        {item.badge && !collapsed && (
          <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <aside className={cn(
      "fixed top-0 left-0 h-screen bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-700/60 flex flex-col shadow-2xl transition-all duration-300 z-50 overflow-y-auto",
      collapsed ? "w-16" : "w-72"
    )}>
      {/* Header */}
      <div className="p-6 border-b border-slate-200/60 dark:border-slate-700/60 flex-shrink-0">
        <div className="flex items-center justify-between">
          {!collapsed && (
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
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle sidebar"
          >
            <LayoutDashboard className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-6 flex-1">
        {menuItems.map(item => renderMenuItem(item))}
        
        <div className="mt-auto pt-6 border-t border-slate-200/60 dark:border-slate-700/60">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:text-blue-700 dark:hover:text-blue-300"
          >
            <Home className="w-5 h-5 text-slate-500" />
            {!collapsed && <span>Back to Site</span>}
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
