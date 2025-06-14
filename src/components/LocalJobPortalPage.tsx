
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from 'lucide-react';

const LocalJobPortalPage = ({ navigate }: { navigate: (page: string) => void }) => {
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

        <section className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Coming Soon: Telegram Bot Integration!</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
                Get instant job alerts, search for jobs, and receive application status updates directly on Telegram. We're working hard to bring this feature to you.
            </p>
        </section>
      </div>
    </div>
  );
};

export default LocalJobPortalPage;
