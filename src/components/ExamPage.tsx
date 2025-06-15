
import React from 'react';
import { ExamDashboard } from './exam/ExamDashboard';
import BreadcrumbNav from './BreadcrumbNav';

interface HistoryEntry {
  page: string;
  data: any | null;
}

interface ExamPageProps {
  navigate?: (page: any, data?: any) => void;
  examDetails?: any;
  goBack?: () => void;
  history: HistoryEntry[];
  navigateToHistory: (index: number) => void;
}

const ExamPage: React.FC<ExamPageProps> = ({ navigate, examDetails, goBack, history, navigateToHistory }) => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-4">
      <BreadcrumbNav history={history} navigateToHistory={navigateToHistory} />
      <ExamDashboard goBack={goBack} />
    </div>
  );
};

export default ExamPage;
