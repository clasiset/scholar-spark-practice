
import React from 'react';
import { Clock, Menu, Timer, Award } from 'lucide-react';

export const ExamHeader = ({ examMode, timeLeft, onToggleExamMode, totalQuestions, answeredQuestions, onOpenMobilePanel, examDetails }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="text-center lg:text-left">
            <nav className="text-xs text-blue-600 font-medium mb-1 flex items-center justify-center lg:justify-start">
              <Award size={14} className="mr-1" />
              Entrance Exams / {examDetails?.subjectTitle || 'Aptitude Test'}
            </nav>
            <h1 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {examDetails?.subjectTitle || 'Aptitude Test'} - Entrance Exam {examDetails?.year || '2014'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {examMode && (
              <div className="hidden md:flex items-center bg-blue-50 px-4 py-2 rounded-lg">
                <span className="text-sm text-blue-700 font-medium">
                  Progress: {answeredQuestions}/{totalQuestions}
                </span>
              </div>
            )}
            
            <div className={`flex items-center px-4 py-2 rounded-lg font-bold text-sm ${
              examMode && timeLeft < 60 
                ? 'bg-red-100 text-red-700 animate-pulse' 
                : examMode 
                  ? 'bg-amber-100 text-amber-700' 
                  : 'bg-green-100 text-green-700'
            }`}>
              {examMode ? <Timer size={18} className="mr-2" /> : <Clock size={18} className="mr-2" />}
              {examMode ? formatTime(timeLeft) : 'Practice Mode'}
            </div>
            
            <button
              onClick={onToggleExamMode}
              className={`py-3 px-6 rounded-xl font-bold text-sm shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105
                ${examMode
                  ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
              `}
            >
              {examMode ? 'Switch to Practice' : 'Start Exam Mode'}
            </button>
            
            <button 
              onClick={onOpenMobilePanel} 
              className="lg:hidden p-3 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
