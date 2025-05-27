
import React from 'react';
import { Clock, Menu } from 'lucide-react';

export const ExamHeader = ({ examMode, timeLeft, onToggleExamMode, totalQuestions, answeredQuestions, onOpenMobilePanel, examDetails }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <header className="bg-white p-4 border-b border-gray-200">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-2 sm:mb-0 text-center sm:text-left">
          <nav className="text-xs text-gray-500">
            Entrance Exams / {examDetails?.subjectTitle || 'Aptitude Test'}
          </nav>
          <h1 className="text-lg font-semibold text-gray-700">
            {examDetails?.subjectTitle || 'Aptitude Test'} - Entrance Exam {examDetails?.year || '2014'}
          </h1>
        </div>
        <div className="flex items-center space-x-3 sm:space-x-4">
          {examMode && (
            <span className="text-xs text-gray-500 hidden md:inline">
              Answered: {answeredQuestions}/{totalQuestions}
            </span>
          )}
           <span className={`text-sm font-semibold flex items-center ${examMode && timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-blue-600'}`}>
             <Clock size={16} className="mr-1.5" />
             {examMode ? formatTime(timeLeft) : 'Practice'}
           </span>
          <button
            onClick={onToggleExamMode}
            className={`py-2 px-4 rounded-md font-medium text-sm shadow-sm transition-colors duration-200 ease-in-out
              ${examMode
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                : 'bg-blue-500 text-white hover:bg-blue-600'
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
            `}
          >
            {examMode ? 'Practice Mode' : 'Exam Mode'}
          </button>
          <button onClick={onOpenMobilePanel} className="lg:hidden p-2 text-gray-600 hover:text-blue-500">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};
