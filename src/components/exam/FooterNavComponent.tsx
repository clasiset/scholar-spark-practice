
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Flag } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  hint: string;
  explanation: string;
}

interface FooterNavComponentProps {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<number, string>;
  flaggedQuestions: number[];
  onPrevious: () => void;
  onNext: () => void;
  showPrevious: boolean;
  showNext: boolean;
  onQuestionClick: (index: number) => void;
  onFlagToggleByIndex: (index: number) => void;
  onFinishExam: (timedOut: boolean) => void;
  examMode: boolean;
}

export const FooterNavComponent = ({ 
  questions, 
  currentQuestionIndex, 
  answers, 
  flaggedQuestions, 
  onPrevious, 
  onNext, 
  showPrevious, 
  showNext, 
  onQuestionClick, 
  onFlagToggleByIndex, 
  onFinishExam, 
  examMode 
}: FooterNavComponentProps) => {
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
    <footer className="bg-white p-3 sm:p-4 border-t border-gray-200 shadow-sm flex justify-between items-center mt-auto">
      <button
        onClick={onPrevious}
        disabled={!showPrevious}
        className={`px-3 py-2 sm:px-4 rounded-lg font-semibold transition-colors duration-200 ease-in-out
          ${showPrevious
            ? 'bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-sm'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }
          flex items-center space-x-1 sm:space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-sm sm:text-base
        `}
      >
        <ChevronLeft size={18} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="hidden lg:flex items-center space-x-1 overflow-x-auto whitespace-nowrap py-2 px-1 custom-scrollbar flex-grow justify-center mx-2">
        {questions.map((_, index) => {
          const isFlagged = flaggedQuestions.includes(index);
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
                relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs sm:text-sm font-medium
                transition-all duration-200 ease-in-out
                ${index === currentQuestionIndex
                  ? 'bg-blue-600 text-white shadow-lg'
                  : answers[index] !== undefined
                    ? 'bg-green-100 text-green-700'
                    : isFlagged
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
              `}
              title={`Question ${index + 1} (Long press to flag/unflag)`}
            >
              {isFlagged && (
                <Flag
                  size={12}
                  fill="currentColor"
                  className="absolute top-0 right-0 -mt-0.5 -mr-0.5 text-red-500"
                />
              )}
              {index + 1}
            </button>
          );
        })}
      </div>
      <div className="lg:hidden flex-grow text-center text-sm text-gray-600 font-medium">
        Q {currentQuestionIndex + 1} / {questions.length}
      </div>

      {examMode && Object.keys(answers).length === questions.length && (
        <button
          onClick={() => onFinishExam(false)}
          className="px-3 py-2 sm:px-4 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-600 shadow-md
          transition-colors duration-200 ease-in-out flex items-center space-x-1 sm:space-x-2
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-sm sm:text-base mx-2"
        >
          <span>Finish Exam</span>
          <CheckCircle size={18} />
        </button>
      )}

      <button
        onClick={onNext}
        disabled={!showNext}
        className={`px-3 py-2 sm:px-4 rounded-lg font-semibold transition-colors duration-200 ease-in-out
          ${showNext
            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
            : 'bg-blue-300 text-white cursor-not-allowed'
          }
          flex items-center space-x-1 sm:space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm sm:text-base
        `}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={18} />
      </button>
    </footer>
  );
};
