
import React from 'react';
import BackButton from './BackButton';

const SubjectExamsPage = ({ subjectTitle, examType, navigate, goBack, previousPageName }: { subjectTitle: string, examType?: string, navigate: (page: string, data: any) => void, goBack?: () => void, previousPageName?: string | null }) => {
  const getExamDisplayName = (type?: string) => {
    switch (type) {
      case 'exit': return 'Exit Exam';
      case 'entrance': return 'Entrance Exam';
      case 'work': return 'Work Placement Exam';
      case 'ngat': return 'NGAT Exam';
      default: return 'Exam';
    }
  };
  
  const examTitle = getExamDisplayName(examType);

  const exams = [
    { id: 1, year: '2015', title: examTitle },
    { id: 2, year: '2016', title: examTitle },
    { id: 3, year: '2017', title: examTitle },
  ];

  const handleStartExam = (exam: any) => {
    navigate('examPage', { subjectTitle, year: exam.year, ...exam });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <BackButton onClick={goBack} previousPageName={previousPageName || 'Departments'} />
        
        <div className="flex items-center mt-6 mb-12">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center mr-3 md:mr-4 shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
            <img 
              src="/lovable-uploads/b4a3ff1d-fa0f-4e7a-8584-0b818b023773.png" 
              alt="Ministry of Education Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl md:text-3xl font-bold">
            {subjectTitle} <span className="text-blue-600 dark:text-blue-400">{examTitle}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <div 
              key={exam.id}
              onClick={() => handleStartExam(exam)}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-lg p-8 text-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-800"
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">{exam.year}</h2>
              <p className="text-gray-500 dark:text-gray-400">{exam.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectExamsPage;
