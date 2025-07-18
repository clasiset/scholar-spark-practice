
import React from 'react';
import BreadcrumbNav from './BreadcrumbNav';

interface HistoryEntry {
  page: string;
  data: any | null;
}

interface CareersPageProps {
  history: HistoryEntry[];
  navigateToHistory: (index: number) => void;
  navigate: (page: string, data?: any) => void;
  openModal: (type: string, data?: any) => void;
}

const CareersPage = ({ history, navigateToHistory, navigate, openModal }: CareersPageProps) => {
  return (
    <div className="min-h-screen bg-background py-12 text-foreground">
      <div className="container mx-auto px-6">
        <BreadcrumbNav history={history} navigateToHistory={navigateToHistory} />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-8">Career Opportunities</h1>
          <p className="text-xl text-muted-foreground">Explore career paths and opportunities after your academic journey.</p>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
