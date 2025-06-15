import React, { useState } from 'react';
import { useI18n } from '../i18n/i18nContext';
import BreadcrumbNav from './BreadcrumbNav';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bell, Mail, Smartphone, CheckCircle, Archive, Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface User {
  email: string;
}

interface HistoryEntry {
  page: string;
  data: any | null;
}

interface NotificationsPageProps {
  user: User | null;
  history: HistoryEntry[];
  navigateToHistory: (index: number) => void;
}

interface NotificationPreferences {
  email: {
    newMessage: boolean;
    activityOnPost: boolean;
    productUpdates: boolean;
    marketingOffers: boolean;
    generalAnnouncements: boolean;
  };
  inApp: {
    newMessage: boolean;
    activityOnPost: boolean;
    mentions: boolean;
  };
  push: {
    newMessage: boolean;
    importantAlerts: boolean;
  };
}

interface Notification {
  id: string;
  type: 'message' | 'activity' | 'update' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ user, history, navigateToHistory }) => {
  const { t, isRTL } = useI18n();
  const { toast } = useToast();

  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: {
      newMessage: true,
      activityOnPost: true,
      productUpdates: true,
      marketingOffers: false,
      generalAnnouncements: true,
    },
    inApp: {
      newMessage: true,
      activityOnPost: true,
      mentions: true,
    },
    push: {
      newMessage: false,
      importantAlerts: true,
    },
  });

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'message',
      title: 'New Message',
      message: 'You have received a new message from your instructor',
      timestamp: '2 minutes ago',
      isRead: false,
    },
    {
      id: '2',
      type: 'activity',
      title: 'Exam Completed',
      message: 'Your Mathematics exam has been graded',
      timestamp: '1 hour ago',
      isRead: false,
    },
    {
      id: '3',
      type: 'update',
      title: 'Platform Update',
      message: 'New features have been added to your dashboard',
      timestamp: '1 day ago',
      isRead: true,
    },
    {
      id: '4',
      type: 'alert',
      title: 'Subscription Reminder',
      message: 'Your subscription will expire in 7 days',
      timestamp: '2 days ago',
      isRead: true,
    },
  ]);

  const handlePreferenceChange = (
    category: keyof NotificationPreferences,
    setting: string,
    value: boolean
  ) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
  };

  const handleSavePreferences = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t.common.success,
        description: "Notification preferences saved successfully!",
      });
    } catch (error) {
      toast({
        title: t.common.error,
        description: "Error saving preferences",
        variant: "destructive",
      });
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const archiveNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <Mail className="w-5 h-5 text-blue-500" />;
      case 'activity':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'update':
        return <Bell className="w-5 h-5 text-orange-500" />;
      case 'alert':
        return <Bell className="w-5 h-5 text-red-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-slate-900 py-6 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <BreadcrumbNav history={history} navigateToHistory={navigateToHistory} />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t.auth.notifications}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t.profile.managePreferences}
          </p>
        </div>

        <Tabs defaultValue="preferences" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="history" className="relative">
              History
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2 px-1 py-0 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-newMessage">New Message</Label>
                  <Switch
                    id="email-newMessage"
                    checked={preferences.email.newMessage}
                    onCheckedChange={(checked) => 
                      handlePreferenceChange('email', 'newMessage', checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-activityOnPost">Activity on your Post</Label>
                  <Switch
                    id="email-activityOnPost"
                    checked={preferences.email.activityOnPost}
                    onCheckedChange={(checked) => 
                      handlePreferenceChange('email', 'activityOnPost', checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-productUpdates">Product Updates</Label>
                  <Switch
                    id="email-productUpdates"
                    checked={preferences.email.productUpdates}
                    onCheckedChange={(checked) => 
                      handlePreferenceChange('email', 'productUpdates', checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-marketingOffers">Marketing Offers</Label>
                  <Switch
                    id="email-marketingOffers"
                    checked={preferences.email.marketingOffers}
                    onCheckedChange={(checked) => 
                      handlePreferenceChange('email', 'marketingOffers', checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-generalAnnouncements">General Announcements</Label>
                  <Switch
                    id="email-generalAnnouncements"
                    checked={preferences.email.generalAnnouncements}
                    onCheckedChange={(checked) => 
                      handlePreferenceChange('email', 'generalAnnouncements', checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  In-App Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="inApp-newMessage">New Message</Label>
                  <Switch
                    id="inApp-newMessage"
                    checked={preferences.inApp.newMessage}
                    onCheckedChange={(checked) => 
                      handlePreferenceChange('inApp', 'newMessage', checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="inApp-activityOnPost">Activity on your Post</Label>
                  <Switch
                    id="inApp-activityOnPost"
                    checked={preferences.inApp.activityOnPost}
                    onCheckedChange={(checked) => 
                      handlePreferenceChange('inApp', 'activityOnPost', checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="inApp-mentions">Mentions</Label>
                  <Switch
                    id="inApp-mentions"
                    checked={preferences.inApp.mentions}
                    onCheckedChange={(checked) => 
                      handlePreferenceChange('inApp', 'mentions', checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="w-5 h-5 mr-2" />
                  Push Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-newMessage">New Message</Label>
                  <Switch
                    id="push-newMessage"
                    checked={preferences.push.newMessage}
                    onCheckedChange={(checked) => 
                      handlePreferenceChange('push', 'newMessage', checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-importantAlerts">Important Alerts</Label>
                  <Switch
                    id="push-importantAlerts"
                    checked={preferences.push.importantAlerts}
                    onCheckedChange={(checked) => 
                      handlePreferenceChange('push', 'importantAlerts', checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSavePreferences}>
                <Save className="w-4 h-4 mr-2" />
                {t.common.save} Preferences
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Notification History</h3>
              {unreadCount > 0 && (
                <Button onClick={markAllAsRead} variant="outline">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark All as Read
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card key={notification.id} className={`transition-colors ${
                  !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : ''
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{notification.title}</h4>
                            {!notification.isRead && (
                              <Badge variant="secondary" className="text-xs">New</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {notification.timestamp}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {!notification.isRead && (
                          <Button
                            onClick={() => markAsRead(notification.id)}
                            variant="ghost"
                            size="sm"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          onClick={() => archiveNotification(notification.id)}
                          variant="ghost"
                          size="sm"
                        >
                          <Archive className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {notifications.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">
                    No notifications
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500">
                    You're all caught up!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NotificationsPage;
