
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Bot, Send, Search, Bell, FileText, Bookmark, Building, User } from 'lucide-react';
import BackButton from './BackButton';

const LocalJobPortalPage = ({ navigate, goBack, previousPageName }: { navigate: (page: string) => void, goBack?: () => void, previousPageName?: string | null }) => {
  const jobSeekerFeatures = [
    "Secure registration and login",
    "Detailed profile management",
    "Advanced job search and filtering",
    "Email and Telegram job alerts",
    "Application tracking",
    "Saved jobs",
  ];

  const employerFeatures = [
    "Secure company account registration",
    "Company profile management",
    "Job posting and management",
    "Applicant Tracking System (ATS)",
    "Communicate with applicants",
    "Featured job options",
  ];

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <BackButton onClick={goBack} previousPageName={previousPageName} />
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent pb-2">
            Local Job Portal
          </h1>
          <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
            A comprehensive job portal for the Ethiopian market, with a tightly integrated Telegram bot for enhanced user engagement.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-indigo-700">For Job Seekers</CardTitle>
              <CardDescription>Find your dream job with our powerful tools.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {jobSeekerFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={() => navigate('jobSeekerDashboard')} className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-700">For Employers</CardTitle>
              <CardDescription>Hire the best talent for your company.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {employerFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={() => navigate('employerDashboard')} className="mt-6 w-full bg-blue-600 hover:bg-blue-700">Post a Job</Button>
            </CardContent>
          </Card>
        </div>

        <section className="mt-20 pt-12 border-t">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-3">
                <Bot className="h-10 w-10 text-blue-600" />
                Telegram Bot Integration
              </h2>
              <p className="text-lg text-gray-600 mt-4 max-w-4xl mx-auto">
                A powerful enhancement to the Local Job Portal, designed to provide real-time, seamless interaction for users. Find jobs or recruit talent faster, smarter, and more efficiently.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl font-bold text-indigo-700"><User className="h-6 w-6" />For Job Seekers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {[
                                { icon: <Bell className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />, text: "Instant Job Alerts tailored to your skills and preferences." },
                                { icon: <Search className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />, text: "Job Search via Chat using keywords and filters." },
                                { icon: <Send className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />, text: "One-Click Applications using your saved profile." },
                                { icon: <FileText className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />, text: "Application Status Updates in real-time." },
                                { icon: <Bell className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />, text: "Automatic Interview Reminders with all details." },
                                { icon: <Bookmark className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />, text: "Saved Jobs Management to track interesting roles." },
                            ].map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    {feature.icon}
                                    <span className="text-gray-700">{feature.text}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl font-bold text-blue-700"><Building className="h-6 w-6" />For Employers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {[
                                { icon: <Bell className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />, text: "New Applicant Alerts instantly on Telegram." },
                                { icon: <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />, text: "Application Review Shortcuts to shortlist or reject candidates." },
                                { icon: <Send className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />, text: "Communicate with Applicants via direct messages or interview invites." },
                            ].map((feature, index) => (
                                 <li key={index} className="flex items-start">
                                    {feature.icon}
                                    <span className="text-gray-700">{feature.text}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800 text-center">User Commands and Menu</CardTitle>
                    <CardDescription className="text-center">Interact with our bot using these simple commands.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
                        {[
                            { cmd: "/start", desc: "Start the bot" },
                            { cmd: "/jobs", desc: "Browse jobs" },
                            { cmd: "/search", desc: "Search jobs" },
                            { cmd: "/alerts", desc: "Manage alerts" },
                            { cmd: "/applications", desc: "Track applications" },
                            { cmd: "/profile", desc: "View/edit profile" },
                            { cmd: "/help", desc: "Get help" },
                        ].map(item => (
                            <div key={item.cmd} className="p-3 bg-gray-100 rounded-lg border">
                                <p className="font-mono font-semibold text-blue-600">{item.cmd}</p>
                                <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </section>
      </div>
    </div>
  );
};

export default LocalJobPortalPage;
