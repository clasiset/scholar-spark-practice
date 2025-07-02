
import React from 'react';
import BreadcrumbNav from './BreadcrumbNav';

interface HistoryEntry {
  page: string;
  data: any | null;
}

interface AboutPageProps {
  history: HistoryEntry[];
  navigateToHistory: (index: number) => void;
  navigate: (page: string, data?: any) => void;
  openModal: (type: string, data?: any) => void;
}

const AboutPage = ({ history, navigateToHistory, navigate, openModal }: AboutPageProps) => {
  return (
    <div className="min-h-screen bg-background py-12 text-foreground">
      <div className="container mx-auto px-6">
        <BreadcrumbNav history={history} navigateToHistory={navigateToHistory} />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-8">About Us</h1>
          <p className="text-xl text-muted-foreground">Learn more about our mission to transform education and empower learners worldwide.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
