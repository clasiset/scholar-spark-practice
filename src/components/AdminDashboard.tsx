
import React from "react";
import { LayoutDashboard, Users, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const SidebarLink = ({ to, icon: Icon, children }: { to: string, icon: React.ElementType, children: React.ReactNode }) => (
  <Link to={to} className="flex items-center gap-2 px-4 py-2 rounded hover:bg-accent transition-colors text-sm font-medium">
    <Icon className="w-5 h-5" />
    {children}
  </Link>
);

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-56 bg-muted text-muted-foreground flex flex-col shadow-lg">
        <div className="py-6 px-4 font-bold text-xl border-b border-border">Admin</div>
        <nav className="flex flex-col gap-2 p-4 flex-1">
          <SidebarLink to="/admin" icon={LayoutDashboard}>Dashboard</SidebarLink>
          <SidebarLink to="/admin/users" icon={Users}>Users</SidebarLink>
          <SidebarLink to="/admin/settings" icon={Settings}>Settings</SidebarLink>
        </nav>
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 border-b border-border bg-card shadow">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </header>
        {/* Content */}
        <main className="flex-1 p-8">
          <div className="rounded-xl bg-card p-8 shadow">
            <h2 className="text-xl font-semibold mb-4">Welcome to the Zehulu.com Admin!</h2>
            <p className="text-muted-foreground">Choose a section from the sidebar to begin managing your application.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
