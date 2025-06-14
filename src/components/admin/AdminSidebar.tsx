
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { LayoutDashboard, FileQuestion, Users, CreditCard, Settings, LifeBuoy } from 'lucide-react';
import { cn } from "@/lib/utils";

const AdminSidebar = () => {
  const { state } = useSidebar();
  const location = useLocation();

  const menuItems = [
    { to: '/admin', icon: LayoutDashboard, text: 'Dashboard' },
    { to: '/admin/questions', icon: FileQuestion, text: 'Questions' },
    { to: '/admin/students', icon: Users, text: 'Students' },
    { to: '/admin/subscriptions', icon: CreditCard, text: 'Subscriptions' },
  ];

  const bottomMenuItems = [
    { to: '/admin/settings', icon: Settings, text: 'Settings' },
  ];
  
  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  }

  return (
    <Sidebar
      className="hidden sm:flex border-r"
      collapsible="icon"
    >
      <div className="flex h-full flex-col">
        <SidebarHeader className="p-2 h-14 flex items-center">
            <div className="flex items-center gap-2 w-full" onClick={() => window.location.href='/'}>
                <div className={cn("w-8 h-8 rounded-full overflow-hidden shadow-md bg-white border-2 border-blue-200 dark:border-slate-700 flex-shrink-0", state === 'collapsed' && 'ml-0.5')}>
                    <img 
                    src="/lovable-uploads/b4a3ff1d-fa0f-4e7a-8584-0b818b023773.png" 
                    alt="Logo" 
                    className="w-full h-full object-cover scale-110" 
                    />
                </div>
                <span className={cn("text-lg font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent dark:text-transparent dark:bg-gradient-to-r dark:from-sky-400 dark:to-cyan-300", state === 'collapsed' && "hidden")}>
                    Zehulu.com
                </span>
            </div>
        </SidebarHeader>
        <SidebarContent className="flex-1 p-2">
            <SidebarMenu>
            {menuItems.map((item) => (
                <SidebarMenuItem key={item.text}>
                    <SidebarMenuButton
                        asChild
                        isActive={isActive(item.to)}
                        tooltip={{ children: item.text }}
                    >
                        <NavLink to={item.to}>
                        <item.icon className="size-4" />
                        <span className="group-data-[collapsible=icon]:hidden">{item.text}</span>
                        </NavLink>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarContent>

        <SidebarContent className="mt-auto p-2">
            <SidebarMenu>
            {bottomMenuItems.map((item) => (
                <SidebarMenuItem key={item.text}>
                    <SidebarMenuButton
                        asChild
                        tooltip={{ children: item.text }}
                    >
                        <NavLink to={item.to}>
                        <item.icon className="size-4" />
                        <span className="group-data-[collapsible=icon]:hidden">{item.text}</span>
                        </NavLink>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarContent>
      </div>
    </Sidebar>
  );
};

export default AdminSidebar;
