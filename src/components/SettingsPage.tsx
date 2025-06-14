
import React, { useState } from 'react';
import { useI18n } from '../i18n/i18nContext';
import BackButton from './BackButton';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Shield, Smartphone, Monitor, Trash2, Download, Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface User {
  email: string;
}

interface SettingsPageProps {
  user: User | null;
  goBack?: () => void;
  previousPageName?: string | null;
}

interface UserSettings {
  language: string;
  timezone: string;
  dateFormat: string;
  theme: string;
  twoFactorEnabled: boolean;
  profileVisibility: boolean;
  dataSharing: {
    analytics: boolean;
    marketing: boolean;
    thirdParty: boolean;
  };
}

interface ActiveSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ user, goBack, previousPageName }) => {
  const { t, isRTL, setLanguage } = useI18n();
  const { toast } = useToast();

  const [settings, setSettings] = useState<UserSettings>({
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    theme: 'light',
    twoFactorEnabled: false,
    profileVisibility: true,
    dataSharing: {
      analytics: true,
      marketing: false,
      thirdParty: false
    }
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [activeSessions] = useState<ActiveSession[]>([
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'New York, US',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'New York, US',
      lastActive: '2 hours ago',
      current: false
    }
  ]);

  const handleSettingChange = (key: keyof UserSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDataSharingChange = (key: keyof UserSettings['dataSharing'], checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      dataSharing: {
        ...prev.dataSharing,
        [key]: checked
      }
    }));
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    handleSettingChange('language', newLanguage);
  };

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: t.common.error,
        description: "New passwords don't match",
        variant: "destructive",
      });
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPasswords({ current: '', new: '', confirm: '' });
      toast({
        title: t.common.success,
        description: "Password updated successfully!",
      });
    } catch (error) {
      toast({
        title: t.common.error,
        description: "Error updating password",
        variant: "destructive",
      });
    }
  };

  const handleSaveSettings = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t.common.success,
        description: "Settings saved successfully!",
      });
    } catch (error) {
      toast({
        title: t.common.error,
        description: "Error saving settings",
        variant: "destructive",
      });
    }
  };

  const handleLogoutAllDevices = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t.common.success,
        description: "Logged out from all other devices",
      });
    } catch (error) {
      toast({
        title: t.common.error,
        description: "Error logging out devices",
        variant: "destructive",
      });
    }
  };

  const handleDataExport = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: t.common.success,
        description: "Data export request submitted. You'll receive an email when ready.",
      });
    } catch (error) {
      toast({
        title: t.common.error,
        description: "Error requesting data export",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t.common.success,
        description: "Account deletion request submitted",
      });
    } catch (error) {
      toast({
        title: t.common.error,
        description: "Error deleting account",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-slate-900 py-6 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <BackButton onClick={goBack} previousPageName={previousPageName} />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t.auth.settings}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t.profile.accountPrivacySettings}
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Language</Label>
                  <Select value={settings.language} onValueChange={handleLanguageChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="am">አማርኛ</SelectItem>
                      <SelectItem value="om">Afaan Oromoo</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="EAT">East Africa Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Date Format</Label>
                  <RadioGroup 
                    value={settings.dateFormat} 
                    onValueChange={(value) => handleSettingChange('dateFormat', value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="MM/DD/YYYY" id="date1" />
                      <Label htmlFor="date1">MM/DD/YYYY</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="DD/MM/YYYY" id="date2" />
                      <Label htmlFor="date2">DD/MM/YYYY</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="YYYY-MM-DD" id="date3" />
                      <Label htmlFor="date3">YYYY-MM-DD</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Theme</Label>
                  <RadioGroup 
                    value={settings.theme} 
                    onValueChange={(value) => handleSettingChange('theme', value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light">Light</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark">Dark</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system">System</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                  />
                </div>
                <Button onClick={handlePasswordChange}>
                  <Shield className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable 2FA</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={settings.twoFactorEnabled}
                    onCheckedChange={(checked) => handleSettingChange('twoFactorEnabled', checked)}
                  />
                </div>
                {settings.twoFactorEnabled && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm">
                      Two-factor authentication is enabled. Use your authenticator app to generate codes.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {session.device.includes('iPhone') ? (
                        <Smartphone className="w-5 h-5 text-gray-500" />
                      ) : (
                        <Monitor className="w-5 h-5 text-gray-500" />
                      )}
                      <div>
                        <p className="font-medium">{session.device}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {session.location} • {session.lastActive}
                        </p>
                      </div>
                    </div>
                    {session.current && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded">
                        Current
                      </span>
                    )}
                  </div>
                ))}
                <Button onClick={handleLogoutAllDevices} variant="outline">
                  Log out all other devices
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Visibility</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Public Profile</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Make your profile visible to other users
                    </p>
                  </div>
                  <Switch
                    checked={settings.profileVisibility}
                    onCheckedChange={(checked) => handleSettingChange('profileVisibility', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Sharing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="analytics"
                    checked={settings.dataSharing.analytics}
                    onCheckedChange={(checked) => handleDataSharingChange('analytics', checked as boolean)}
                  />
                  <Label htmlFor="analytics">Share analytics data to improve our service</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="marketing"
                    checked={settings.dataSharing.marketing}
                    onCheckedChange={(checked) => handleDataSharingChange('marketing', checked as boolean)}
                  />
                  <Label htmlFor="marketing">Receive marketing communications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="thirdParty"
                    checked={settings.dataSharing.thirdParty}
                    onCheckedChange={(checked) => handleDataSharingChange('thirdParty', checked as boolean)}
                  />
                  <Label htmlFor="thirdParty">Share data with trusted third parties</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={handleDataExport} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Request Data Export
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-6 pb-8">
          <Button onClick={handleSaveSettings}>
            <Save className="w-4 h-4 mr-2" />
            {t.common.save} Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
