
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Briefcase, Search, Star, Bell, FileText, Mail, Phone, MessageSquare } from 'lucide-react';
import BackButton from './BackButton';

const FeatureCard = ({ icon, title, description, children }: { icon: React.ReactNode, title: string, description: string, children: React.ReactNode }) => (
  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
    <CardHeader className="flex flex-row items-center gap-4">
      {icon}
      <div>
        <CardTitle className="text-xl font-bold text-gray-800">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </div>
    </CardHeader>
    <CardContent className="flex-grow flex flex-col">
      {children}
    </CardContent>
  </Card>
);

const JobSeekerDashboardPage = ({ goBack, previousPageName }: { goBack?: () => void, previousPageName?: string | null }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <BackButton onClick={goBack} previousPageName={previousPageName} />
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent pb-2">
            Job Seeker Portal
          </h1>
          <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
            Your journey to a new career starts here. Manage your profile, search for jobs, and track your applications.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* User Registration/Login */}
          <FeatureCard 
            icon={<User className="h-8 w-8 text-indigo-600 flex-shrink-0" />}
            title="User Registration/Login"
            description="Create your account to get started."
          >
            <div className="space-y-4 flex flex-col flex-grow">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white"><Mail className="mr-2 h-4 w-4" /> Sign up with Email</Button>
                <Button variant="outline" className="w-full"><Phone className="mr-2 h-4 w-4" /> Sign up with Phone</Button>
                <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white"><MessageSquare className="mr-2 h-4 w-4" /> Sign up with Telegram</Button>
                <div className="space-y-2 pt-4 border-t mt-4">
                    <Label htmlFor="resume">Upload Resume/CV</Label>
                    <Input id="resume" type="file" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="picture">Profile Picture</Label>
                    <Input id="picture" type="file" accept="image/*" />
                </div>
            </div>
          </FeatureCard>

          {/* Profile Management */}
          <FeatureCard 
            icon={<Briefcase className="h-8 w-8 text-indigo-600 flex-shrink-0" />}
            title="Profile Management"
            description="Keep your professional profile updated."
          >
            <div className="space-y-3 flex-grow">
              <ul className="space-y-3 list-disc list-inside text-gray-700">
                  <li>Personal info</li>
                  <li>Educational background</li>
                  <li>Work experience</li>
                  <li>Skills and languages</li>
              </ul>
            </div>
             <Button className="mt-4 w-full" variant="outline">Manage Profile</Button>
          </FeatureCard>

          {/* Job Search Interface */}
          <FeatureCard 
            icon={<Search className="h-8 w-8 text-indigo-600 flex-shrink-0" />}
            title="Job Search Interface"
            description="Find your next opportunity."
          >
             <div className="space-y-3 flex-grow">
              <ul className="space-y-3 list-disc list-inside text-gray-700">
                  <li>Search by category, location, experience</li>
                  <li>Filter: Remote, Full-time, Part-time, Internship</li>
              </ul>
            </div>
            <Button className="mt-4 w-full">Search Jobs</Button>
          </FeatureCard>
          
          {/* Saved Jobs List */}
           <FeatureCard 
            icon={<Star className="h-8 w-8 text-yellow-500 flex-shrink-0" />}
            title="Saved Jobs List"
            description="Keep track of jobs you're interested in."
          >
            <div className="flex-grow">
              <p className="text-gray-600">You have no saved jobs yet. Start searching to save jobs!</p>
            </div>
            <Button className="mt-4 w-full" variant="outline">View Saved Jobs</Button>
          </FeatureCard>

          {/* Email & Telegram Job Alerts */}
          <FeatureCard 
            icon={<Bell className="h-8 w-8 text-red-500 flex-shrink-0" />}
            title="Email & Telegram Job Alerts"
            description="Get notified about new openings."
          >
            <div className="flex-grow">
              <p className="text-gray-600">Subscribe to get instant notifications that match your preferences.</p>
            </div>
             <Button className="mt-4 w-full">Manage Alerts</Button>
          </FeatureCard>

          {/* Application Tracking Dashboard */}
          <FeatureCard 
            icon={<FileText className="h-8 w-8 text-green-500 flex-shrink-0" />}
            title="Application Tracking"
            description="Monitor the status of your applications."
          >
             <div className="space-y-3 flex-grow">
              <ul className="space-y-3 list-disc list-inside text-gray-700">
                  <li>Applied jobs status (e.g., Submitted, Reviewed, Interview)</li>
              </ul>
              <p className="text-gray-600 mt-2">No applications submitted yet.</p>
            </div>
            <Button className="mt-4 w-full" variant="outline">View Applications</Button>
          </FeatureCard>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboardPage;
