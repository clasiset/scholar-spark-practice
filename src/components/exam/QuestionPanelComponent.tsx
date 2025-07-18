
import React, { useRef } from 'react';
import { Flag } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  hint: string;
  explanation: string;
}

interface QuestionPanelComponentProps {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<number, string>;
  flaggedQuestions: number[];
  onQuestionClick: (index: number) => void;
  onFlagToggleByIndex: (index: number) => void;
}

export const QuestionPanelComponent = ({ 
  questions, 
  currentQuestionIndex, 
  answers, 
  flaggedQuestions, 
  onQuestionClick, 
  onFlagToggleByIndex 
}: QuestionPanelComponentProps) => {
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isClicking = useRef(false);
  const LONG_PRESS_DURATION = 500;

  const handlePressStart = (e: React.MouseEvent | React.TouchEvent, index: number) => {
    isClicking.current = true;
    longPressTimer.current = setTimeout(() => {
      isClicking.current = false;
      onFlagToggleByIndex(index);
      longPressTimer.current = null;
    }, LONG_PRESS_DURATION);
  };

  const handlePressEnd = (e: React.MouseEvent | React.TouchEvent, index: number) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
      if (isClicking.current) {
        onQuestionClick(index);
      }
    }
    isClicking.current = false;
  };

  const handlePressCancel = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    isClicking.current = false;
  };

  return (
    <div className="bg-card p-4 sm:p-6 rounded-lg shadow-md h-full flex flex-col">
      <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4">Questions</h2>
      <div className="grid grid-cols-5 gap-2 mb-6 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        {questions.map((_, index) => {
          const isFlagged = flaggedQuestions.includes(index);
          const isAnswered = answers[index] !== undefined;

          let buttonClass = 'bg-muted text-muted-foreground hover:bg-accent';
          if (index === currentQuestionIndex) {
            buttonClass = 'bg-blue-600 text-white shadow-lg transform scale-105';
          } else if (isAnswered) {
            buttonClass = 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 hover:dark:bg-green-900/50';
          } else if (isFlagged) {
            buttonClass = 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 hover:dark:bg-red-900/50';
          }

          return (
            <button
              key={index}
              onMouseDown={(e) => handlePressStart(e, index)}
              onMouseUp={(e) => handlePressEnd(e, index)}
              onMouseLeave={handlePressCancel}
              onTouchStart={(e) => handlePressStart(e, index)}
              onTouchEnd={(e) => handlePressEnd(e, index)}
              onTouchCancel={handlePressCancel}
              className={`
                relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium
                transition-all duration-200 ease-in-out
                ${buttonClass}
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
              `}
              title={`Question ${index + 1} (Long press to flag/unflag)`}
            >
              {isFlagged && (
                <Flag
                  size={14}
                  fill="currentColor"
                  className="absolute top-0 right-0 -mt-1 -mr-1 text-red-500"
                />
              )}
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-auto space-y-2 sm:space-y-3 text-xs sm:text-sm">
        <div className="flex items-center">
          <span className="w-4 h-4 rounded-full bg-blue-600 mr-3 flex-shrink-0"></span>
          <span className="text-muted-foreground">Current</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-500/30 mr-3 flex-shrink-0"></span>
          <span className="text-muted-foreground">Answered</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 rounded-full bg-muted border mr-3 flex-shrink-0"></span>
          <span className="text-muted-foreground">Unanswered</span>
        </div>
        <div className="flex items-center">
          <Flag size={16} className="text-red-500 mr-3 flex-shrink-0" />
          <span className="text-muted-foreground">Flagged (Long press)</span>
        </div>
      </div>
    </div>
  );
};
