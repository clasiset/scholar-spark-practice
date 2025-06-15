
import React, { useRef } from 'react';
import { Flag, XCircle } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  hint: string;
  explanation: string;
}

interface QuestionGridModalComponentProps {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<number, string>;
  flaggedQuestions: number[];
  onQuestionClick: (index: number) => void;
  onClose: () => void;
  onFlagToggleByIndex: (index: number) => void;
}

export const QuestionGridModalComponent = ({ 
  questions, 
  currentQuestionIndex, 
  answers, 
  flaggedQuestions, 
  onQuestionClick, 
  onClose, 
  onFlagToggleByIndex 
}: QuestionGridModalComponentProps) => {
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
        onClose();
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card p-6 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-foreground">All Questions</h2>
          <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground">
            <XCircle size={24} />
          </button>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-2 mb-6 overflow-y-auto custom-scrollbar pr-2 flex-grow">
          {questions.map((_, index) => {
            const isFlagged = flaggedQuestions.includes(index);
            const isAnswered = answers[index] !== undefined;

            let buttonClass = 'bg-muted text-muted-foreground hover:bg-accent';
            if (index === currentQuestionIndex) {
              buttonClass = 'bg-blue-600 text-white shadow-lg';
            } else if (isAnswered) {
              buttonClass = 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            } else if (isFlagged) {
              buttonClass = 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
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
                  relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  transition-all duration-200 ease-in-out
                  ${buttonClass}
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                `}
                title={`Question ${index + 1} (Long press to flag/unflag)`}
              >
                {isFlagged && (
                  <Flag
                    size={16}
                    fill="currentColor"
                    className="absolute top-0 right-0 -mt-1 -mr-1 text-red-500"
                  />
                )}
                {index + 1}
              </button>
            );
          })}
        </div>
        <div className="mt-auto space-y-2 text-xs pt-4 border-t text-muted-foreground">
          <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-600 mr-2"></span>Current</div>
          <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-500/30 mr-2"></span>Answered</div>
          <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-muted border mr-2"></span>Unanswered</div>
          <div className="flex items-center"><Flag size={12} className="text-red-500 mr-2" />Flagged (Long press)</div>
        </div>
      </div>
    </div>
  );
};
