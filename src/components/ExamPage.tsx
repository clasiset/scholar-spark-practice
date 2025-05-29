
import React from 'react';
import { ExamDashboard } from './exam/ExamDashboard';

interface ExamPageProps {
  navigate?: (page: any, data?: any) => void;
  examDetails?: any;
}

const ExamPage: React.FC<ExamPageProps> = ({ navigate, examDetails }) => {
  return <ExamDashboard />;
};

export default ExamPage;
