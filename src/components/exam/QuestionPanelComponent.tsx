
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
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Questions</h2>
      <div className="grid grid-cols-5 gap-2 mb-6 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
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
                relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                transition-all duration-200 ease-in-out
                ${index === currentQuestionIndex
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : answers[index] !== undefined
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : isFlagged
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
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

      <div className="mt-auto space-y-3 text-sm">
        <div className="flex items-center">
          <span className="w-4 h-4 rounded-full bg-blue-600 mr-3 flex-shrink-0"></span>
          <span className="text-gray-700">Current</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 rounded-full bg-green-100 border border-green-300 mr-3 flex-shrink-0"></span>
          <span className="text-gray-700">Answered</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 rounded-full bg-gray-100 border border-gray-300 mr-3 flex-shrink-0"></span>
          <span className="text-gray-700">Unanswered</span>
        </div>
        <div className="flex items-center">
          <Flag size={16} className="text-red-500 mr-3 flex-shrink-0" />
          <span className="text-gray-700">Flagged (Long press)</span>
        </div>
      </div>
    </div>
  );
};
