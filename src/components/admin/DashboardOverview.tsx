
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  Target
} from 'lucide-react';

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  color = "blue"
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  trend?: { value: number; isPositive: boolean };
  color?: string;
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
    <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-semibold text-slate-700 dark:text-slate-300">{title}</CardTitle>
        <div className={`p-2 rounded-lg bg-gradient-to-r ${colorClasses[color]} shadow-lg`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">{value}</div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{description}</p>
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

const DashboardOverview = () => {
  const stats = [
    {
      title: "Total Students",
      value: "2,847",
      description: "Active enrolled students",
      icon: Users,
      trend: { value: 12, isPositive: true },
      color: "blue"
    },
    {
      title: "Total Teachers",
      value: "156",
      description: "Active teaching staff",
      icon: GraduationCap,
      trend: { value: 3, isPositive: true },
      color: "green"
    },
    {
      title: "Active Courses",
      value: "43",
      description: "Currently running courses",
      icon: BookOpen,
      trend: { value: 8, isPositive: true },
      color: "purple"
    },
    {
      title: "Revenue This Month",
      value: "$47,521",
      description: "Fee collection & other income",
      icon: DollarSign,
      trend: { value: 5, isPositive: false },
      color: "orange"
    },
    {
      title: "Attendance Rate",
      value: "94.2%",
      description: "Overall student attendance",
      icon: Target,
      trend: { value: 2, isPositive: true },
      color: "pink"
    },
    {
      title: "Pending Admissions",
      value: "34",
      description: "Applications awaiting review",
      icon: AlertCircle,
      color: "indigo"
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

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Welcome back, Administrator!
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Here's what's happening at Zehulu.com today.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                <Activity className="h-5 w-5 text-white" />
              </div>
              Recent Activities
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Latest updates and activities across the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 cursor-pointer group">
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              Upcoming Events
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Important dates and deadlines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border-l-4 border-gradient-to-b from-blue-500 to-purple-500 pl-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-r-lg transition-all duration-200 cursor-pointer">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">{event.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {event.date}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60 group">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <Users className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors">Add Student</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Enroll new student</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60 group">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <BookOpen className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-green-600 transition-colors">Create Course</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Add new course</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60 group">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <Bell className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-purple-600 transition-colors">Send Notice</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Broadcast message</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60 group">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-orange-600 transition-colors">View Reports</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Analytics dashboard</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
