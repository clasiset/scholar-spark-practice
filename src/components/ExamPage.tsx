
import React from 'react';
import { ExamDashboard } from './exam/ExamDashboard';

const ExamPage = ({ navigate, examDetails }) => {
  return (
    <ExamDashboard 
      navigate={navigate} 
      examDetails={examDetails}
    />
  );
};

export default ExamPage;
