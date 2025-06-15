
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
  AlertCircle
} from 'lucide-react';

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend 
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  trend?: { value: number; isPositive: boolean };
}) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
      {trend && (
        <div className={`flex items-center text-xs mt-1 ${
          trend.isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          <TrendingUp className={`h-3 w-3 mr-1 ${
            !trend.isPositive ? 'rotate-180' : ''
          }`} />
          {trend.value}% from last month
        </div>
      )}
    </CardContent>
  </Card>
);

const DashboardOverview = () => {
  const stats = [
    {
      title: "Total Students",
      value: "2,847",
      description: "Active enrolled students",
      icon: Users,
      trend: { value: 12, isPositive: true }
    },
    {
      title: "Total Teachers",
      value: "156",
      description: "Active teaching staff",
      icon: GraduationCap,
      trend: { value: 3, isPositive: true }
    },
    {
      title: "Active Courses",
      value: "43",
      description: "Currently running courses",
      icon: BookOpen,
      trend: { value: 8, isPositive: true }
    },
    {
      title: "Revenue This Month",
      value: "$47,521",
      description: "Fee collection & other income",
      icon: DollarSign,
      trend: { value: 5, isPositive: false }
    },
    {
      title: "Attendance Rate",
      value: "94.2%",
      description: "Overall student attendance",
      icon: TrendingUp,
      trend: { value: 2, isPositive: true }
    },
    {
      title: "Pending Admissions",
      value: "34",
      description: "Applications awaiting review",
      icon: AlertCircle
    }
  ];

  const recentActivities = [
    { id: 1, type: "enrollment", message: "25 new students enrolled in Computer Science", time: "2 hours ago" },
    { id: 2, type: "payment", message: "Monthly fees collected: $12,450", time: "3 hours ago" },
    { id: 3, type: "grade", message: "Final grades submitted for Mathematics", time: "5 hours ago" },
    { id: 4, type: "announcement", message: "Parent-teacher meeting scheduled for next week", time: "1 day ago" },
    { id: 5, type: "maintenance", message: "System backup completed successfully", time: "1 day ago" }
  ];

  const upcomingEvents = [
    { id: 1, title: "Parent-Teacher Conference", date: "Dec 20, 2024", type: "meeting" },
    { id: 2, title: "Winter Break Begins", date: "Dec 23, 2024", type: "holiday" },
    { id: 3, title: "Final Exam Week", date: "Jan 8, 2025", type: "exam" },
    { id: 4, title: "New Semester Registration", date: "Jan 15, 2025", type: "registration" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Administrator!</h1>
        <p className="text-muted-foreground">Here's what's happening at Zehulu.com today.</p>
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
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest updates and activities across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none mb-1">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Important dates and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border-l-2 border-primary pl-3 py-2">
                  <h4 className="text-sm font-medium">{event.title}</h4>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium">Add Student</h3>
              <p className="text-sm text-muted-foreground">Enroll new student</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-medium">Create Course</h3>
              <p className="text-sm text-muted-foreground">Add new course</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Bell className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium">Send Notice</h3>
              <p className="text-sm text-muted-foreground">Broadcast message</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 className="font-medium">View Reports</h3>
              <p className="text-sm text-muted-foreground">Analytics dashboard</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
