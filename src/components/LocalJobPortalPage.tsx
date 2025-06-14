
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const LocalJobPortalPage = () => {
  const jobSeekerFeatures = [
    { icon: '📝', title: 'User Registration/Login', description: 'Sign up with email, phone, or Telegram, and upload your profile picture and resume.' },
    { icon: '👤', title: 'Profile Management', description: 'Detail your personal info, education, work experience, skills, and languages.' },
    { icon: '🔎', title: 'Advanced Job Search', description: 'Search by category, location, or experience, and filter by job type.' },
    { icon: '📌', title: 'Saved Jobs', description: 'Keep a list of jobs you are interested in.' },
    { icon: '🔔', title: 'Job Alerts', description: 'Subscribe to email & Telegram alerts for jobs that match your profile.' },
    { icon: '📂', title: 'Application Tracking', description: 'Monitor the status of your applications (Submitted, Reviewed, Interview).' },
  ];

  const employerFeatures = [
    { icon: '📝', title: 'Company Registration/Login', description: 'Register your company and upload your logo.' },
    { icon: '🏢', title: 'Company Profile Management', description: 'Describe your company and the industries you serve.' },
    { icon: '📋', title: 'Post New Jobs', description: 'Create detailed job posts with requirements and salary ranges.' },
    { icon: '🗂️', title: 'Manage Job Posts', description: 'View active jobs, and edit or deactivate listings.' },
    { icon: '⚙️', title: 'Applicant Tracking System (ATS)', description: 'View, manage, and change the status of applicants.' },
    { icon: '💬', title: 'Communication Center', description: 'Send messages directly to applicants.' },
    { icon: '⭐', title: 'Featured Job Options', description: 'Promote job posts for better visibility.' },
  ];
  
  const telegramFeatures = [
    { icon: '📲', title: 'Instant Job Alerts', description: 'Receive real-time job notifications based on your saved preferences.' },
    { icon: '🔎', title: 'Job Search via Chat', description: 'Search for jobs directly by typing keywords and use filters inside the chat.' },
    { icon: '🗂️', title: 'Application Status Updates', description: 'Get notified when employers view your application or change its status.' },
    { icon: '📝', title: 'Quick Apply Feature', description: 'Apply to jobs with your saved profile right from Telegram.' },
    { icon: '💼', title: 'Employer Notifications', description: 'Employers get notified instantly when new applicants apply.' },
    { icon: '📅', title: 'Interview Reminders', description: 'Automated reminders for interview schedules.' },
];

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent pb-2">
            Local Job Portal
          </h1>
          <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
            A comprehensive job portal for the Ethiopian market, with a tightly integrated Telegram bot for enhanced user engagement.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-indigo-700">For Job Seekers</CardTitle>
              <CardDescription>Everything you need to find your dream job.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-4">
                {jobSeekerFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-2xl mr-3 mt-0 flex-shrink-0">{feature.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
              <Button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
            </div>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-700">For Employers</CardTitle>
              <CardDescription>All the tools to hire the best talent.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-4">
                {employerFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-2xl mr-3 mt-0 flex-shrink-0">{feature.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
              <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700">Post a Job</Button>
            </div>
          </Card>
        </div>

        <section className="mt-16">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">🤖 Telegram Bot Integration</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
                    Making your job search and recruitment faster and more interactive, right from Telegram.
                </p>
            </div>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                {telegramFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                        <span className="text-3xl mr-4 flex-shrink-0">{feature.icon}</span>
                        <div>
                            <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 text-center bg-indigo-50 text-indigo-800 p-6 rounded-lg max-w-4xl mx-auto border border-indigo-200">
                <h4 className="font-bold text-lg mb-2">🚀 Key Benefits</h4>
                <p>No need to frequently visit the website. Stay updated on the go, and increase engagement and response rates for both job seekers and employers.</p>
            </div>
        </section>
      </div>
    </div>
  );
};

export default LocalJobPortalPage;
