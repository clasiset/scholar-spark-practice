
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { examTypes } from '../data/examData';
import BackButton from './BackButton';

const examCategories = [
  { key: 'entrance', name: 'University Entrance Exams', description: 'Prepare for university with past entrance exam papers.' },
  { key: 'exit', name: 'Exit Exams', description: 'Practice for your university exit examinations.' },
  { key: 'work', name: 'Work Placement Exams', description: 'Assessments for job placements and career opportunities.' },
  { key: 'ngat', name: 'NGAT', description: 'Prepare for the National Graduate Admission Test.' },
];

const AllExamsPage = ({ navigate, goBack, previousPageName }) => {
  const handleExamTypeClick = (examKey) => {
    const examData = examTypes[examKey];
    navigate('examSubjects', { ...examData, type: examKey });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <BackButton onClick={goBack} previousPageName={previousPageName} />
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">Select Your Exam</h1>
        <p className="text-center text-gray-500 mb-12">Choose the type of exam you want to prepare for.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {examCategories.map((exam) => {
            const examData = examTypes[exam.key];
            const Icon = examData.icon;
            return (
              <div
                key={exam.key}
                onClick={() => handleExamTypeClick(exam.key)}
                className={`p-8 rounded-xl shadow-lg cursor-pointer text-white transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl bg-gradient-to-br ${examData.bgColor}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-4 rounded-full">
                    <Icon size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{exam.name}</h2>
                    <p className="text-white/90">{exam.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllExamsPage;
