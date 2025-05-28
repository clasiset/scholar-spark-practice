
import React from 'react';
import { Clock, Menu } from 'lucide-react';

export const ExamHeader = ({ examMode, timeLeft, onToggleExamMode, totalQuestions, answeredQuestions, onOpenMobilePanel, examDetails }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-2 sm:mb-0 text-center sm:text-left">
          <nav className="text-xs text-indigo-200">
            Entrance Exams / {examDetails?.subjectTitle || 'Aptitude Test'}
          </nav>
          <h1 className="text-lg font-semibold text-white">
            {examDetails?.subjectTitle || 'Aptitude Test'} - Entrance Exam {examDetails?.year || '2014'}
          </h1>
        </div>
        <div className="flex items-center space-x-3 sm:space-x-4">
          {examMode && (
            <span className="text-xs text-indigo-200 hidden md:inline">
              Answered: {answeredQuestions}/{totalQuestions}
            </span>
          )}
           <span className={`text-sm font-semibold flex items-center ${examMode && timeLeft < 60 ? 'text-red-300 animate-pulse' : 'text-white'}`}>
             <Clock size={16} className="mr-1.5" />
             {examMode ? formatTime(timeLeft) : 'Practice'}
           </span>
          <button
            onClick={onToggleExamMode}
            className={`py-2 px-4 rounded-lg font-medium text-sm shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105
              ${examMode
                ? 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                : 'bg-white text-indigo-600 hover:bg-gray-50'
              }
              focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
            `}
          >
            {examMode ? 'Practice Mode' : 'Exam Mode'}
          </button>
          <button onClick={onOpenMobilePanel} className="lg:hidden p-2 text-white hover:text-indigo-200 transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};
