
import React from 'react';
import { Menu } from 'lucide-react';

interface ExamHeaderComponentProps {
  title: string;
  breadcrumbs: string[];
  examMode: boolean;
  timeLeft: number;
  onToggleExamMode: () => void;
  onToggleQuestionGrid: () => void;
}

export const ExamHeaderComponent = ({ 
  title, 
  breadcrumbs, 
  examMode, 
  timeLeft, 
  onToggleExamMode, 
  onToggleQuestionGrid 
}: ExamHeaderComponentProps) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <header className="bg-white p-4 border-b border-gray-200 shadow-sm flex justify-between items-center">
      <div>
        <nav className="text-sm text-gray-600 mb-1 sm:mb-2">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="mr-1">
              {crumb} {index < breadcrumbs.length - 1 && <span className="mx-1">/</span>}
            </span>
          ))}
        </nav>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">{title}</h1>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        {!examMode && <span className="text-gray-600 text-sm hidden md:inline">Practice Mode</span>}
        {examMode && (
          <span className="text-blue-600 font-semibold text-base sm:text-lg">
            Time: {formatTime(timeLeft)}
          </span>
        )}
        <button
          onClick={onToggleQuestionGrid}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 lg:hidden"
          title="View All Questions"
        >
          <Menu size={24} />
        </button>
        <button
          onClick={onToggleExamMode}
          className={`py-2 px-3 sm:px-6 rounded-lg font-semibold shadow-md transition-colors duration-200 ease-in-out
            ${examMode
              ? 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500'
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm sm:text-base
          `}
        >
          {examMode ? 'Practice Mode' : 'Exam Mode'}
        </button>
      </div>
    </header>
  );
};
