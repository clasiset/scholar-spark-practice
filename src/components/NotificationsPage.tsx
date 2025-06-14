
import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Check, Archive, Filter } from 'lucide-react';
import BackButton from './BackButton';
import { useI18n } from '../i18n/i18nContext';
import { Button } from './ui/button';

interface Notification {
  id: string;
  type: 'message' | 'activity' | 'mention' | 'update';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}

const NotificationsPage = ({ goBack, previousPageName }: { 
  goBack?: () => void, 
  previousPageName?: string | null 
}) => {
  const { t } = useI18n();
  
  const [preferences, setPreferences] = useState({
    email: {
      newMessage: true,
      activityOnPost: true,
      mentions: true,
      productUpdates: false,
      marketingOffers: false,
      generalAnnouncements: true
    },
    inApp: {
      newMessage: true,
      activityOnPost: true,
      mentions: true,
      productUpdates: true
    },
    push: {
      newMessage: true,
      importantAlerts: true,
      mentions: false
    }
  });

  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'message',
      title: 'New Message',
      message: 'You have received a new message from your instructor',
      timestamp: '2 hours ago',
      isRead: false
    },
    {
      id: '2',
      type: 'activity',
      title: 'Course Progress',
      message: 'You completed 75% of Mathematics course',
      timestamp: '1 day ago',
      isRead: true
    },
    {
      id: '3',
      type: 'mention',
      title: 'You were mentioned',
      message: 'John mentioned you in a discussion forum',
      timestamp: '2 days ago',
      isRead: false
    },
    {
      id: '4',
      type: 'update',
      title: 'System Update',
      message: 'New features have been added to your dashboard',
      timestamp: '3 days ago',
      isRead: true
    }
  ]);

  const [activeTab, setActiveTab] = useState('preferences');
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handlePreferenceChange = (category: 'email' | 'inApp' | 'push', setting: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Notification preferences saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving preferences' });
    } finally {
      setIsLoading(false);
    }
  };

  const markAllAsRead = () => {
    // In a real app, this would make an API call
    setMessage({ type: 'success', text: 'All notifications marked as read' });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <Mail className="w-5 h-5 text-blue-500" />;
      case 'activity':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'mention':
        return <Bell className="w-5 h-5 text-purple-500" />;
      case 'update':
        return <Smartphone className="w-5 h-5 text-orange-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'read') return notification.isRead;
    return true;
  });

  const tabs = [
    { id: 'preferences', label: 'Preferences', icon: Bell },
    { id: 'history', label: 'Notification History', icon: Archive }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <BackButton onClick={goBack} previousPageName={previousPageName} />
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 border-r">
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h1>
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-700'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
              {message && (
                <div className={`mb-6 p-4 rounded-lg ${
                  message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {message.text}
                </div>
              )}

              {/* Notification Preferences */}
              {activeTab === 'preferences' && (
                <div className="space-y-8">
                  <h2 className="text-xl font-semibold text-gray-800">Notification Preferences</h2>
                  
                  {/* Email Notifications */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                      <Mail className="w-5 h-5 mr-2" />
                      Email Notifications
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(preferences.email).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => handlePreferenceChange('email', key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* In-App Notifications */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                      <Bell className="w-5 h-5 mr-2" />
                      In-App Notifications
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(preferences.inApp).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => handlePreferenceChange('inApp', key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                      <Smartphone className="w-5 h-5 mr-2" />
                      Push Notifications
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(preferences.push).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => handlePreferenceChange('push', key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSavePreferences} disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save Preferences'}
                    </Button>
                  </div>
                </div>
              )}

              {/* Notification History */}
              {activeTab === 'history' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Notification History</h2>
                    <div className="flex items-center space-x-4">
                      <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">All Notifications</option>
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                      </select>
                      <Button variant="outline" onClick={markAllAsRead}>
                        <Check className="w-4 h-4 mr-2" />
                        Mark All as Read
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border ${
                          notification.isRead ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className={`font-medium ${notification.isRead ? 'text-gray-800' : 'text-blue-800'}`}>
                                {notification.title}
                              </h3>
                              <span className="text-sm text-gray-500">{notification.timestamp}</span>
                            </div>
                            <p className="text-gray-600 mt-1">{notification.message}</p>
                            {!notification.isRead && (
                              <div className="mt-2">
                                <Button variant="outline" size="sm">
                                  Mark as Read
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredNotifications.length === 0 && (
                    <div className="text-center py-12">
                      <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-500 mb-2">No notifications found</h3>
                      <p className="text-gray-400">You're all caught up!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
