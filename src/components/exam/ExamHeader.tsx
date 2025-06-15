
import React from 'react';
import { Clock, Menu } from 'lucide-react';
import ModeToggle from './ModeToggle';

export const ExamHeader = ({ examMode, timeLeft, onToggleExamMode, totalQuestions, answeredQuestions, onOpenMobilePanel, examDetails }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-2 sm:mb-0 text-center sm:text-left flex items-center">
            <div className="w-8 h-8 mr-3 flex-shrink-0 bg-white rounded-full overflow-hidden border-2 border-blue-200">
              <img 
                src="/lovable-uploads/b4a3ff1d-fa0f-4e7a-8584-0b818b023773.png" 
                alt="Ministry of Education Logo" 
                className="w-full h-full object-cover scale-110" 
              />
            </div>
            <div>
              <nav className="text-xs text-muted-foreground mb-1">
                Entrance Exams / {examDetails?.subjectTitle || 'Aptitude Test'}
              </nav>
              <h1 className="text-lg font-semibold text-card-foreground">
                {examDetails?.subjectTitle || 'Aptitude Test'} - Entrance Exam {examDetails?.year || '2014'}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {examMode && (
              <div className="text-xs text-muted-foreground hidden md:flex items-center space-x-4">
                <span>Answered: {answeredQuestions}/{totalQuestions}</span>
                <span>Time: {formatTime(timeLeft)}</span>
              </div>
            )}
            
            <ModeToggle examMode={examMode} onToggle={onToggleExamMode} />
            
            <button 
              onClick={onOpenMobilePanel} 
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
      
      {examMode && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-800/30 px-4 py-3">
          <div className="container mx-auto flex items-center justify-between text-sm">
            <div className="flex items-center text-blue-700 dark:text-blue-300">
              <Clock size={16} className="mr-2" />
              <span className="font-medium">Exam Mode Active</span>
            </div>
            <div className="flex items-center space-x-4 text-blue-600 dark:text-blue-400">
              <span>Time: {formatTime(timeLeft)}</span>
              <span>Answered: {answeredQuestions}/{totalQuestions}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
