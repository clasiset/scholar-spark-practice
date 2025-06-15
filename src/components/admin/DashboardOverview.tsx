
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Bell,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock,
  Target,
  Plus,
  Filter,
  Download,
  MoreHorizontal,
  Eye
} from 'lucide-react';

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  color = "blue",
  onClick
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  trend?: { value: number; isPositive: boolean };
  color?: string;
  onClick?: () => void;
}) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600", 
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    pink: "from-pink-500 to-pink-600",
    indigo: "from-indigo-500 to-indigo-600"
  };

  return (
    <Card 
      className={`hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300">{title}</CardTitle>
          {onClick && <Eye className="w-4 h-4 text-slate-400" />}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[color]} shadow-lg`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">{value}</div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{description}</p>
        {trend && (
          <div className={`flex items-center text-sm font-medium ${
            trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {trend.isPositive ? (
              <ArrowUpRight className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 mr-1" />
            )}
            {Math.abs(trend.value)}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ActivityItem = ({ activity, onClick }: { activity: any; onClick?: () => void }) => (
  <div 
    className={`flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 group ${onClick ? 'cursor-pointer' : ''}`}
    onClick={onClick}
  >
    <div className={`w-3 h-3 bg-gradient-to-r from-${activity.color}-500 to-${activity.color}-600 rounded-full mt-2 shrink-0 shadow-lg`} />
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
        {activity.message}
      </p>
      <div className="flex items-center gap-1 mt-1">
        <Clock className="h-3 w-3 text-slate-400" />
        <p className="text-xs text-slate-500 dark:text-slate-400">{activity.time}</p>
      </div>
    </div>
    {onClick && <MoreHorizontal className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />}
  </div>
);

const DashboardOverview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  
  const stats = [
    {
      title: "Total Students",
      value: "2,847",
      description: "Active enrolled students",
      icon: Users,
      trend: { value: 12, isPositive: true },
      color: "blue",
      onClick: () => console.log("Navigate to students")
    },
    {
      title: "Total Teachers",
      value: "156",
      description: "Active teaching staff",
      icon: GraduationCap,
      trend: { value: 3, isPositive: true },
      color: "green",
      onClick: () => console.log("Navigate to teachers")
    },
    {
      title: "Active Courses",
      value: "43",
      description: "Currently running courses",
      icon: BookOpen,
      trend: { value: 8, isPositive: true },
      color: "purple",
      onClick: () => console.log("Navigate to courses")
    },
    {
      title: "Revenue This Month",
      value: "$47,521",
      description: "Fee collection & other income",
      icon: DollarSign,
      trend: { value: 5, isPositive: false },
      color: "orange",
      onClick: () => console.log("Navigate to finances")
    },
    {
      title: "Attendance Rate",
      value: "94.2%",
      description: "Overall student attendance",
      icon: Target,
      trend: { value: 2, isPositive: true },
      color: "pink",
      onClick: () => console.log("Navigate to attendance")
    },
    {
      title: "Pending Admissions",
      value: "34",
      description: "Applications awaiting review",
      icon: AlertCircle,
      color: "indigo",
      onClick: () => console.log("Navigate to admissions")
    }
  ];

  const recentActivities = [
    { id: 1, type: "enrollment", message: "25 new students enrolled in Computer Science", time: "2 hours ago", color: "blue" },
    { id: 2, type: "payment", message: "Monthly fees collected: $12,450", time: "3 hours ago", color: "green" },
    { id: 3, type: "grade", message: "Final grades submitted for Mathematics", time: "5 hours ago", color: "purple" },
    { id: 4, type: "announcement", message: "Parent-teacher meeting scheduled for next week", time: "1 day ago", color: "orange" },
    { id: 5, type: "maintenance", message: "System backup completed successfully", time: "1 day ago", color: "indigo" }
  ];

  const upcomingEvents = [
    { id: 1, title: "Parent-Teacher Conference", date: "Dec 20, 2024", type: "meeting", color: "blue" },
    { id: 2, title: "Winter Break Begins", date: "Dec 23, 2024", type: "holiday", color: "green" },
    { id: 3, title: "Final Exam Week", date: "Jan 8, 2025", type: "exam", color: "red" },
    { id: 4, title: "New Semester Registration", date: "Jan 15, 2025", type: "registration", color: "purple" }
  ];

  const quickActions = [
    { title: "Add Student", description: "Enroll new student", icon: Users, color: "blue", action: () => console.log("Add student") },
    { title: "Create Course", description: "Add new course", icon: BookOpen, color: "green", action: () => console.log("Create course") },
    { title: "Send Notice", description: "Broadcast message", icon: Bell, color: "purple", action: () => console.log("Send notice") },
    { title: "View Reports", description: "Analytics dashboard", icon: TrendingUp, color: "orange", action: () => console.log("View reports") }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section with Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Welcome back, Administrator!
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">Here's what's happening at Zehulu.com today.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Enhanced KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid with Enhanced Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities with Pagination */}
        <Card className="lg:col-span-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Recent Activities</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Latest updates and activities across the platform
                  </CardDescription>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentActivities.map((activity) => (
                <ActivityItem 
                  key={activity.id} 
                  activity={activity}
                  onClick={() => console.log(`View activity ${activity.id}`)}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events with Interactive Calendar */}
        <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Upcoming Events</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Important dates and deadlines
                  </CardDescription>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div 
                  key={event.id} 
                  className="border-l-4 border-gradient-to-b from-blue-500 to-purple-500 pl-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-r-lg transition-all duration-200 cursor-pointer group"
                  onClick={() => console.log(`View event ${event.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 group-hover:text-blue-600 transition-colors">{event.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {event.date}
                      </p>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Card 
            key={index}
            className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60 group"
            onClick={action.action}
          >
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`w-14 h-14 bg-gradient-to-br from-${action.color}-500 to-${action.color}-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                <action.icon className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold text-slate-700 dark:text-slate-300 group-hover:text-${action.color}-600 transition-colors`}>{action.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{action.description}</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
