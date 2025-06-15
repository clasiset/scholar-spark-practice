
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  BarChart3, 
  Users, 
  DollarSign, 
  Activity,
  Calendar,
  MessageSquare,
  FileText,
  Shield,
  Globe,
  TrendingUp
} from "lucide-react";

interface Widget {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ElementType;
  size: 'small' | 'medium' | 'large';
}

interface WidgetLibraryProps {
  onAddWidget: (widget: Widget) => void;
  onClose: () => void;
}

const availableWidgets: Widget[] = [
  {
    id: 'sales-overview',
    name: 'Sales Overview',
    description: 'Display total sales, revenue trends, and conversion rates',
    category: 'Analytics',
    icon: BarChart3,
    size: 'medium'
  },
  {
    id: 'user-stats',
    name: 'User Statistics',
    description: 'Show active users, new registrations, and user engagement',
    category: 'Users',
    icon: Users,
    size: 'small'
  },
  {
    id: 'revenue-chart',
    name: 'Revenue Chart',
    description: 'Interactive line chart showing revenue over time',
    category: 'Financial',
    icon: DollarSign,
    size: 'large'
  },
  {
    id: 'system-health',
    name: 'System Health',
    description: 'Monitor server status, uptime, and performance metrics',
    category: 'System',
    icon: Activity,
    size: 'medium'
  },
  {
    id: 'recent-orders',
    name: 'Recent Orders',
    description: 'List of the most recent customer orders',
    category: 'E-commerce',
    icon: FileText,
    size: 'medium'
  },
  {
    id: 'calendar-events',
    name: 'Calendar Events',
    description: 'Upcoming events, appointments, and deadlines',
    category: 'Productivity',
    icon: Calendar,
    size: 'small'
  },
  {
    id: 'support-tickets',
    name: 'Support Tickets',
    description: 'Active support tickets and response times',
    category: 'Support',
    icon: MessageSquare,
    size: 'medium'
  },
  {
    id: 'security-alerts',
    name: 'Security Alerts',
    description: 'Security warnings, failed logins, and threat detection',
    category: 'Security',
    icon: Shield,
    size: 'small'
  },
  {
    id: 'api-usage',
    name: 'API Usage',
    description: 'API call volume, latency, and error rates',
    category: 'Technical',
    icon: Globe,
    size: 'medium'
  },
  {
    id: 'performance-trends',
    name: 'Performance Trends',
    description: 'Website performance metrics and optimization insights',
    category: 'Analytics',
    icon: TrendingUp,
    size: 'large'
  }
];

const WidgetLibrary: React.FC<WidgetLibraryProps> = ({ onAddWidget, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(availableWidgets.map(w => w.category)))];

  const filteredWidgets = availableWidgets.filter(widget => {
    const matchesSearch = widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         widget.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || widget.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-4xl max-h-[80vh] m-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Widget Library</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search widgets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWidgets.map(widget => {
              const IconComponent = widget.icon;
              return (
                <Card key={widget.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                        <IconComponent className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm mb-1">{widget.name}</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                          {widget.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">
                            <Badge variant="secondary" className="text-xs">
                              {widget.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {widget.size}
                            </Badge>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => onAddWidget(widget)}
                            className="h-7 px-2"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {filteredWidgets.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <p>No widgets found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WidgetLibrary;
