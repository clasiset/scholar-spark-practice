
import React from 'react';
import { Menu, Clock } from 'lucide-react';

interface ExamHeaderComponentProps {
  title: string;
  examMode: boolean;
  timeLeft: number;
  onToggleExamMode: () => void;
  onToggleQuestionGrid: () => void;
}

export const ExamHeaderComponent = ({ 
  title, 
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
    <header className="bg-card p-2 sm:p-3 md:p-4 border-b border-border shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3">
        <div className="flex items-center flex-1 min-w-0 w-full sm:w-auto">
          <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-card-foreground truncate">
            {title}
          </h1>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-wrap w-full sm:w-auto justify-between sm:justify-end">
          {examMode && (
            <div className="flex items-center gap-1 sm:gap-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm font-medium">
                {formatTime(timeLeft)}
              </span>
            </div>
          )}
          
          <button
            onClick={onToggleQuestionGrid}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-muted text-muted-foreground lg:hidden flex-shrink-0"
            title="View All Questions"
          >
            <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          
          {/* Mode Toggle Buttons */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 sm:p-1 gap-0.5 sm:gap-1">
            <button
              onClick={() => examMode && onToggleExamMode()}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                !examMode 
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-blue-300" 
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 focus:ring-gray-300"
              }`}
              disabled={!examMode}
            >
              Practice
            </button>
            <button
              onClick={() => !examMode && onToggleExamMode()}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                examMode 
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md focus:ring-blue-300" 
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 focus:ring-gray-300"
              }`}
              disabled={examMode}
            >
              Exam
            </button>
          </div>
        </div>
      </div>
      
      {/* Exam Mode Status Bar for Small Screens */}
      {examMode && (
        <div className="mt-2 sm:mt-3 sm:hidden bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-2">
          <div className="flex items-center justify-between text-xs text-blue-700 dark:text-blue-300">
            <span className="font-medium">Exam Mode Active</span>
            <span className="font-medium">Time: {formatTime(timeLeft)}</span>
          </div>
        </div>
      )}
    </header>
  );
};
