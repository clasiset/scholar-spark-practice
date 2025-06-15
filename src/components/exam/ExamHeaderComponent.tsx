
import React from 'react';
import { Menu } from 'lucide-react';
import ModeToggle from './ModeToggle';

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
    <header className="bg-card p-4 border-b border-border shadow-sm flex justify-between items-center">
      <div>
        <nav className="text-sm text-muted-foreground mb-1 sm:mb-2">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="mr-1">
              {crumb} {index < breadcrumbs.length - 1 && <span className="mx-1">/</span>}
            </span>
          ))}
        </nav>
        <h1 className="text-lg sm:text-xl font-semibold text-card-foreground">{title}</h1>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        {!examMode && <span className="text-muted-foreground text-sm hidden md:inline">Practice Mode</span>}
        {examMode && (
          <span className="text-blue-600 dark:text-blue-400 font-semibold text-base sm:text-lg">
            Time: {formatTime(timeLeft)}
          </span>
        )}
        <button
          onClick={onToggleQuestionGrid}
          className="p-2 rounded-lg hover:bg-muted text-muted-foreground lg:hidden"
          title="View All Questions"
        >
          <Menu size={24} />
        </button>
        <ModeToggle examMode={examMode} onToggle={onToggleExamMode} />
      </div>
    </header>
  );
};
