
import React from "react";
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  DollarSign, 
  TrendingUp,
  BookOpen,
  Calendar,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  UserPlus,
  BookPlus,
  Eye,
  FileText
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import WebTransactions from "./WebTransactions";

const DashboardOverview = () => {
  // Sample data - in real app this would come from your backend
  const stats = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950"
    },
    {
      title: "Active Courses",
      value: "156",
      change: "+3",
      trend: "up", 
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950"
    },
    {
      title: "Monthly Revenue",
      value: "$24,890",
      change: "+8%",
      trend: "up",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950"
    },
    {
      title: "Exam Completions",
      value: "1,432",
      change: "+24%",
      trend: "up",
      icon: GraduationCap,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "enrollment",
      title: "New student enrolled in Mathematics Course",
      time: "2 minutes ago",
      icon: UserPlus,
      color: "text-blue-600"
    },
    {
      id: 2,
      type: "question",
      title: "5 new questions added to Physics exam bank",
      time: "15 minutes ago",
      icon: BookPlus,
      color: "text-green-600"
    },
    {
      id: 3,
      type: "exam",
      title: "Chemistry entrance exam completed by 12 students",
      time: "1 hour ago",
      icon: CheckCircle,
      color: "text-purple-600"
    },
    {
      id: 4,
      type: "alert",
      title: "Payment reminder sent to 23 students",
      time: "2 hours ago",
      icon: AlertCircle,
      color: "text-orange-600"
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Review new question submissions",
      priority: "high",
      dueDate: "Today",
      type: "review"
    },
    {
      id: 2,
      title: "Process monthly fee payments",
      priority: "medium",
      dueDate: "Tomorrow",
      type: "finance"
    },
    {
      id: 3,
      title: "Update course materials for Fall semester",
      priority: "low",
      dueDate: "This week",
      type: "content"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Dashboard Overview</h1>
          <p className="text-slate-600 dark:text-slate-400">Welcome back! Here's what's happening at Zehulu.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            This Month
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <FileText className="w-4 h-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-sm font-medium text-green-600">
                        {stat.change}
                      </span>
                      <span className="text-sm text-slate-500 ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activities
              </CardTitle>
              <CardDescription>Latest updates from across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const IconComponent = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors">
                      <div className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800`}>
                        <IconComponent className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {activity.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button variant="outline" className="w-full">
                  View All Activities
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Upcoming Tasks
            </CardTitle>
            <CardDescription>Items that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <span className="text-xs text-slate-500">
                          Due {task.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <Button variant="outline" className="w-full">
                View All Tasks
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Web Transactions Section */}
      <WebTransactions />
    </div>
  );
};

export default DashboardOverview;
