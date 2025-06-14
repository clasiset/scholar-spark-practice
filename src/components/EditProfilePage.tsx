
import React, { useState, useRef } from 'react';
import { useI18n } from '../i18n/i18nContext';
import BackButton from './BackButton';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Plus, X, Save, RotateCcw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface User {
  email: string;
}

interface EditProfilePageProps {
  user: User | null;
  goBack?: () => void;
  previousPageName?: string | null;
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

const EditProfilePage: React.FC<EditProfilePageProps> = ({ user, goBack, previousPageName }) => {
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

  React.useEffect(() => {
    // Check for changes
    setHasChanges(JSON.stringify(profileData) !== JSON.stringify(originalData));
  }, [profileData, originalData]);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialLinkChange = (index: number, field: 'platform' | 'url', value: string) => {
    setProfileData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const addSocialLink = () => {
    setProfileData(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: '', url: '' }]
    }));
  };

  const removeSocialLink = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    setProfileData(prev => ({
      ...prev,
      avatarUrl: ''
    }));
  };

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOriginalData(profileData);
      toast({
        title: t.common.success,
        description: "Profile updated successfully!",
      });
    } catch (error) {
      toast({
        title: t.common.error,
        description: "Error saving profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setProfileData(originalData);
  };

  const getInitials = (email: string) => {
    return email ? email[0].toUpperCase() : 'U';
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-slate-900 py-6 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <BackButton onClick={goBack} previousPageName={previousPageName} />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t.auth.editProfile}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t.profile.updateInformation}
          </p>
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
                    <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                      <Camera className="w-4 h-4 mr-2" />
                      {profileData.avatarUrl ? 'Change Image' : 'Upload Image'}
                    </Button>
                    {profileData.avatarUrl && (
                      <Button onClick={removeImage} variant="outline">
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
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
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
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profileData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, Country"
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
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio/About Me</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="min-h-[100px]"
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
                  />
                  <Input
                    placeholder="URL"
                    type="url"
                    value={link.url}
                    onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                    className="flex-2"
                  />
                  <Button
                    onClick={() => removeSocialLink(index)}
                    variant="outline"
                    size="icon"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button onClick={addSocialLink} variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Social Link
              </Button>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pb-8">
            <Button onClick={handleCancel} variant="outline" disabled={!hasChanges}>
              <RotateCcw className="w-4 h-4 mr-2" />
              {t.common.cancel}
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges}>
              <Save className="w-4 h-4 mr-2" />
              {t.common.save} Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
