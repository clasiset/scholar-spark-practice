
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, Briefcase, FilePlus, ClipboardList, Users, MessageSquare, Star } from 'lucide-react';
import BackButton from './BackButton';

const FeatureCard = ({ icon, title, description, children }: { icon: React.ReactNode, title: string, description: string, children?: React.ReactNode }) => (
  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
    <CardHeader className="flex flex-row items-center gap-4">
      {icon}
      <div>
        <CardTitle className="text-xl font-bold text-gray-800">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </div>
    </CardHeader>
    {children && <CardContent className="flex-grow flex flex-col">{children}</CardContent>}
  </Card>
);

const EmployerDashboardPage = ({ goBack, previousPageName }: { goBack?: () => void, previousPageName?: string | null }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <BackButton onClick={goBack} previousPageName={previousPageName} />
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent pb-2">
            Employer Portal
          </h1>
          <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
            Find the best talent for your team. Manage job postings and applicants seamlessly.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Registration/Login */}
          <FeatureCard 
            icon={<Building className="h-8 w-8 text-blue-600 flex-shrink-0" />}
            title="Company Registration/Login"
            description="Set up your company profile."
          >
            <div className="space-y-4 flex flex-col flex-grow">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Register Your Company</Button>
                <div className="space-y-2 pt-4 border-t mt-4">
                    <Label htmlFor="logo">Upload Company Logo</Label>
                    <Input id="logo" type="file" accept="image/*" />
                </div>
            </div>
          </FeatureCard>

          {/* Company Profile Management */}
          <FeatureCard 
            icon={<Briefcase className="h-8 w-8 text-blue-600 flex-shrink-0" />}
            title="Company Profile Management"
            description="Showcase your company's brand."
          >
            <div className="space-y-3 flex-grow">
              <ul className="space-y-3 list-disc list-inside text-gray-700">
                  <li>About the company</li>
                  <li>Industries served</li>
              </ul>
            </div>
             <Button className="mt-4 w-full" variant="outline">Manage Profile</Button>
          </FeatureCard>

          {/* Post New Job Form */}
          <FeatureCard 
            icon={<FilePlus className="h-8 w-8 text-blue-600 flex-shrink-0" />}
            title="Post New Job"
            description="Create and publish job openings."
          >
             <div className="space-y-3 flex-grow">
              <ul className="space-y-3 list-disc list-inside text-gray-700">
                  <li>Job title & Description</li>
                  <li>Requirements & Salary range</li>
                  <li>Work location (Remote/On-site)</li>
              </ul>
            </div>
            <Button className="mt-4 w-full">Post a New Job</Button>
          </FeatureCard>
          
          {/* Manage Job Posts */}
           <FeatureCard 
            icon={<ClipboardList className="h-8 w-8 text-green-500 flex-shrink-0" />}
            title="Manage Job Posts"
            description="Keep your listings up to date."
          >
            <div className="flex-grow">
              <ul className="space-y-3 list-disc list-inside text-gray-700">
                  <li>View active jobs</li>
                  <li>Edit or deactivate postings</li>
              </ul>
            </div>
            <Button className="mt-4 w-full" variant="outline">View Job Posts</Button>
          </FeatureCard>

          {/* Applicant Tracking System (ATS) */}
          <FeatureCard 
            icon={<Users className="h-8 w-8 text-teal-500 flex-shrink-0" />}
            title="Applicant Tracking System"
            description="Streamline your hiring process."
          >
            <div className="flex-grow">
              <ul className="space-y-3 list-disc list-inside text-gray-700">
                  <li>View applicants per job</li>
                  <li>Change applicant status</li>
              </ul>
            </div>
             <Button className="mt-4 w-full">Manage Applicants</Button>
          </FeatureCard>

          {/* Communication Center */}
          <FeatureCard 
            icon={<MessageSquare className="h-8 w-8 text-sky-500 flex-shrink-0" />}
            title="Communication Center"
            description="Engage with potential candidates."
          >
             <div className="space-y-3 flex-grow">
               <p className="text-gray-700">Send messages to applicants directly through the platform.</p>
            </div>
            <Button className="mt-4 w-full" variant="outline">Open Messages</Button>
          </FeatureCard>
          
           {/* Featured Job Options */}
          <FeatureCard 
            icon={<Star className="h-8 w-8 text-yellow-500 flex-shrink-0" />}
            title="Featured Job Options"
            description="Increase visibility for your posts."
          >
             <div className="space-y-3 flex-grow">
               <p className="text-gray-700">Pay to promote your job posts and attract more candidates.</p>
            </div>
            <Button className="mt-4 w-full" variant="outline">Promote a Job</Button>
          </FeatureCard>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboardPage;
