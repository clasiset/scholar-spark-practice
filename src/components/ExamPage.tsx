
import React from 'react';
import { ExamDashboard } from './exam/ExamDashboard';
import BackButton from './BackButton';

interface ExamPageProps {
  navigate?: (page: any, data?: any) => void;
  examDetails?: any;
  goBack?: () => void;
  previousPageName?: string | null;
}

const ExamPage: React.FC<ExamPageProps> = ({ navigate, examDetails, goBack, previousPageName }) => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-4">
      <BackButton onClick={goBack} previousPageName={previousPageName} />
      <ExamDashboard />
    </div>
  );
};

export default ExamPage;
