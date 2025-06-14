
import React, { useState } from 'react';
import { Shield, Globe, Palette, Clock, Eye, Download, Trash2, Smartphone } from 'lucide-react';
import BackButton from './BackButton';
import { useI18n } from '../i18n/i18nContext';
import { Button } from './ui/button';

const SettingsPage = ({ goBack, previousPageName }: { 
  goBack?: () => void, 
  previousPageName?: string | null 
}) => {
  const { t, language, setLanguage } = useI18n();
  
  const [settings, setSettings] = useState({
    language: language,
    timezone: 'Africa/Addis_Ababa',
    dateFormat: 'DD/MM/YYYY',
    theme: 'light',
    profileVisibility: 'public',
    dataSharing: false,
    twoFactorEnabled: false,
    emailNotifications: true,
    pushNotifications: true
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    if (key === 'language') {
      setLanguage(value);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error changing password' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving settings' });
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'privacy', label: 'Privacy', icon: Eye }
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
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
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

              {/* General Settings */}
              {activeTab === 'general' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">General Preferences</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Globe className="w-4 h-4 inline mr-2" />
                          Language
                        </label>
                        <select
                          value={settings.language}
                          onChange={(e) => handleSettingChange('language', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="en">English</option>
                          <option value="am">አማርኛ</option>
                          <option value="om">Afan Oromo</option>
                          <option value="ar">العربية</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Clock className="w-4 h-4 inline mr-2" />
                          Timezone
                        </label>
                        <select
                          value={settings.timezone}
                          onChange={(e) => handleSettingChange('timezone', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="Africa/Addis_Ababa">Africa/Addis Ababa</option>
                          <option value="UTC">UTC</option>
                          <option value="America/New_York">America/New York</option>
                          <option value="Europe/London">Europe/London</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date Format
                        </label>
                        <div className="space-y-2">
                          {['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'].map((format) => (
                            <label key={format} className="flex items-center">
                              <input
                                type="radio"
                                value={format}
                                checked={settings.dateFormat === format}
                                onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                                className="mr-2"
                              />
                              {format}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Palette className="w-4 h-4 inline mr-2" />
                          Theme
                        </label>
                        <div className="space-y-2">
                          {['light', 'dark', 'auto'].map((theme) => (
                            <label key={theme} className="flex items-center">
                              <input
                                type="radio"
                                value={theme}
                                checked={settings.theme === theme}
                                onChange={(e) => handleSettingChange('theme', e.target.value)}
                                className="mr-2"
                              />
                              {theme.charAt(0).toUpperCase() + theme.slice(1)}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Security Settings</h2>
                    
                    {/* Change Password */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <input
                          type="password"
                          placeholder="Current Password"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="password"
                          placeholder="New Password"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Button onClick={handlePasswordChange} disabled={isLoading}>
                          {isLoading ? 'Changing...' : 'Change Password'}
                        </Button>
                      </div>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-800">Two-Factor Authentication</h3>
                          <p className="text-gray-600">Add an extra layer of security to your account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.twoFactorEnabled}
                            onChange={(e) => handleSettingChange('twoFactorEnabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeTab === 'privacy' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Privacy Settings</h2>
                    
                    <div className="space-y-6">
                      {/* Profile Visibility */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Profile Visibility</h3>
                        <div className="space-y-2">
                          {['public', 'private'].map((visibility) => (
                            <label key={visibility} className="flex items-center">
                              <input
                                type="radio"
                                value={visibility}
                                checked={settings.profileVisibility === visibility}
                                onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                                className="mr-2"
                              />
                              {visibility.charAt(0).toUpperCase() + visibility.slice(1)}
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Data Sharing */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-800">Data Sharing</h3>
                            <p className="text-gray-600">Allow anonymous analytics to help improve our service</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings.dataSharing}
                              onChange={(e) => handleSettingChange('dataSharing', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>

                      {/* Data Export */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-800">Data Export</h3>
                            <p className="text-gray-600">Download all your data in a portable format</p>
                          </div>
                          <Button variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Request Data Export
                          </Button>
                        </div>
                      </div>

                      {/* Delete Account */}
                      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-red-800">Delete Account</h3>
                            <p className="text-red-600">Permanently delete your account and all associated data</p>
                          </div>
                          <Button variant="destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="flex justify-end pt-6 border-t">
                <Button onClick={handleSaveSettings} disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Settings'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
