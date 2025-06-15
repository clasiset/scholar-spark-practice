
import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '../i18n/i18nContext';
import BreadcrumbNav from './BreadcrumbNav';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Plus, X, Save, RotateCcw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { type Tables } from '@/integrations/supabase/types';


interface User {
  email: string;
  id: string;
}

interface HistoryEntry {
  page: string;
  data: any | null;
}

interface EditProfilePageProps {
  user: User | null;
  profile: Tables<'profiles'> | null;
  history: HistoryEntry[];
  navigateToHistory: (index: number) => void;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  bio: string;
  location: string;
  websiteUrl: string;
  avatarUrl: string;
  socialLinks: SocialLink[];
}

const EditProfilePage: React.FC<EditProfilePageProps> = ({ user, profile, history, navigateToHistory }) => {
  const { t, isRTL } = useI18n();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phoneNumber: '',
    bio: '',
    location: '',
    websiteUrl: '',
    avatarUrl: '',
    socialLinks: []
  });

  const [originalData, setOriginalData] = useState<ProfileData>(profileData);
  const [hasChanges, setHasChanges] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (profile) {
      const initialData: ProfileData = {
        firstName: profile.first_name ?? '',
        lastName: profile.last_name ?? '',
        email: user?.email ?? '',
        phoneNumber: profile.phone_number ?? '',
        bio: profile.bio ?? '',
        location: profile.location ?? '',
        websiteUrl: profile.website_url ?? '',
        avatarUrl: profile.avatar_url ?? '',
        socialLinks: (profile.social_links as SocialLink[] | null) ?? [],
      };
      setProfileData(initialData);
      setOriginalData(initialData);
    }
  }, [profile, user]);

  useEffect(() => {
    // Check for changes
    setHasChanges(JSON.stringify(profileData) !== JSON.stringify(originalData));
  }, [profileData, originalData]);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    if (!isEditing) return;
    
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialLinkChange = (index: number, field: 'platform' | 'url', value: string) => {
    if (!isEditing) return;
    
    setProfileData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const addSocialLink = () => {
    if (!isEditing) return;
    
    setProfileData(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: '', url: '' }]
    }));
  };

  const removeSocialLink = (index: number) => {
    if (!isEditing) return;
    
    setProfileData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditing) return;
    
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          avatarUrl: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    if (!isEditing) return;
    
    setProfileData(prev => ({
      ...prev,
      avatarUrl: ''
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!user) {
        toast({ title: "Error", description: "You must be logged in to save.", variant: "destructive" });
        return;
    }
    
    try {
      const updates = {
        id: user.id,
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        phone_number: profileData.phoneNumber,
        bio: profileData.bio,
        location: profileData.location,
        website_url: profileData.websiteUrl,
        avatar_url: profileData.avatarUrl,
        social_links: profileData.socialLinks,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
      
      setOriginalData(profileData);
      setIsEditing(false);
      toast({
        title: t.common.success,
        description: "Profile updated successfully!",
      });
    } catch (error: any) {
      toast({
        title: t.common.error,
        description: error.message || "Error saving profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setIsEditing(false);
  };

  const getInitials = (email: string) => {
    return email ? email[0].toUpperCase() : 'U';
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-slate-900 py-6 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <BreadcrumbNav history={history} navigateToHistory={navigateToHistory} />
        
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {t.auth.editProfile}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t.profile.updateInformation}
              </p>
            </div>
            
            {!isEditing ? (
              <Button onClick={handleEdit} variant="outline">
                <Camera className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-3">
                <Button onClick={handleCancel} variant="outline" disabled={!hasChanges}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {t.common.cancel}
                </Button>
                <Button onClick={handleSave} disabled={!hasChanges}>
                  <Save className="w-4 h-4 mr-2" />
                  {t.common.save} Changes
                </Button>
              </div>
            )}
          </div>
          
          {isEditing && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                You are now editing your profile. Make your changes and click "Save Changes" when done.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Avatar Section */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6">
                <Avatar className="w-24 h-24">
                  {profileData.avatarUrl ? (
                    <AvatarImage src={profileData.avatarUrl} alt="Profile" />
                  ) : (
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                      {getInitials(profileData.email)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="space-y-2">
                  <div className="flex space-x-3">
                    <Button 
                      onClick={() => fileInputRef.current?.click()} 
                      variant="outline"
                      disabled={!isEditing}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      {profileData.avatarUrl ? 'Change Image' : 'Upload Image'}
                    </Button>
                    {profileData.avatarUrl && (
                      <Button 
                        onClick={removeImage} 
                        variant="outline"
                        disabled={!isEditing}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Remove Image
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    Upload a square image for best results. Max size: 5MB
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50 dark:bg-slate-800" : ""}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50 dark:bg-slate-800" : ""}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className="bg-gray-50 dark:bg-slate-800"
                  readOnly
                />
                <p className="text-sm text-gray-500 mt-1">
                  Email changes require verification
                </p>
              </div>

              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={profileData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50 dark:bg-slate-800" : ""}
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profileData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, Country"
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50 dark:bg-slate-800" : ""}
                />
              </div>

              <div>
                <Label htmlFor="websiteUrl">Website/Portfolio URL</Label>
                <Input
                  id="websiteUrl"
                  type="url"
                  value={profileData.websiteUrl}
                  onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                  placeholder="https://yourwebsite.com"
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50 dark:bg-slate-800" : ""}
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio/About Me</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                  className={`min-h-[100px] ${!isEditing ? "bg-gray-50 dark:bg-slate-800" : ""}`}
                  disabled={!isEditing}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {profileData.bio.length}/500 characters
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Links */}
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileData.socialLinks.map((link, index) => (
                <div key={index} className="flex space-x-3">
                  <Input
                    placeholder="Platform (e.g., LinkedIn)"
                    value={link.platform}
                    onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                    className="flex-1"
                    disabled={!isEditing}
                  />
                  <Input
                    placeholder="URL"
                    type="url"
                    value={link.url}
                    onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                    className="flex-2"
                    disabled={!isEditing}
                  />
                  <Button
                    onClick={() => removeSocialLink(index)}
                    variant="outline"
                    size="icon"
                    disabled={!isEditing}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button 
                onClick={addSocialLink} 
                variant="outline" 
                className="w-full"
                disabled={!isEditing}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Social Link
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
