
import React from 'react';
import BreadcrumbNav from './BreadcrumbNav';

interface HistoryEntry {
  page: string;
  data: any | null;
}

const SubjectExamsPage = ({ subjectTitle, examType, navigate, history, navigateToHistory }: { 
  subjectTitle: string;
  examType?: string;
  navigate: (page: string, data: any) => void;
  history: HistoryEntry[];
  navigateToHistory: (index: number) => void;
}) => {
  const getExamDisplayName = (type?: string) => {
    switch (type) {
      case 'exit': return 'Exit Exam';
      case 'entrance': return 'Entrance Exam';
      case 'work': return 'Work Exam';
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
    navigate('examPage', { subjectTitle, year: exam.year, examType, ...exam });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <BreadcrumbNav history={history} navigateToHistory={navigateToHistory} />
        
        <div className="flex items-center mt-6 mb-12">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-card rounded-full flex items-center justify-center mr-3 md:mr-4 shadow-sm overflow-hidden border border-border">
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
              className="bg-card rounded-lg shadow-sm hover:shadow-lg p-8 text-center cursor-pointer transition-all duration-300 transform hover:-translate-y-1 border border-border"
            >
              <h2 className="text-4xl font-bold text-foreground mb-2">{exam.year}</h2>
              <p className="text-muted-foreground">{exam.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectExamsPage;
