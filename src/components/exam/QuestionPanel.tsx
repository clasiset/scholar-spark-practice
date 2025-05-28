
import React, { useRef } from 'react';
import { Flag } from 'lucide-react';

export const QuestionPanel = ({ questions, currentQuestionIndex, answers, flaggedQuestions, onQuestionClick, onFlagToggleByIndex, examMode, onFinishPracticeExam }) => {
  const longPressTimer = useRef(null);
  const isClicking = useRef(false);
  const LONG_PRESS_DURATION = 500; 

  const handlePressStart = (e, index) => {
    if (examMode) return; 
    isClicking.current = true;
    longPressTimer.current = setTimeout(() => {
      isClicking.current = false; 
      onFlagToggleByIndex(index);
      longPressTimer.current = null; 
    }, LONG_PRESS_DURATION);
  };

  const handlePressEnd = (e, index) => {
    if (longPressTimer.current) { 
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
      if (isClicking.current) { 
        onQuestionClick(index);
      }
    } else if (isClicking.current) { 
        onQuestionClick(index);
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
    <div className="bg-white p-5 rounded-lg border border-gray-200 h-full flex flex-col">
      <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">Questions</h2>
      <div className="grid grid-cols-10 gap-1 mb-5 flex-grow overflow-y-auto pr-1">
        {questions.map((_, index) => {
          const isFlagged = flaggedQuestions.includes(index);
          const isAnswered = answers[index] !== undefined;
          let buttonClass = 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200';
          
          if (index === currentQuestionIndex) {
            buttonClass = 'bg-blue-600 text-white border-blue-600';
          } else if (isAnswered) {
            buttonClass = 'bg-green-50 text-green-700 border-green-200';
          } else if (isFlagged && !examMode) {
            buttonClass = 'bg-red-50 text-red-700 border-red-200';
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
                relative w-8 h-8 rounded text-xs font-medium
                flex items-center justify-center
                transition-all duration-200 hover:scale-105
                ${buttonClass}
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
              `}
              title={`Question ${index + 1}${!examMode ? ' (Long press to flag)' : ''}`}
            >
              {isFlagged && !examMode && (
                <Flag
                  size={8}
                  fill="currentColor"
                  className="absolute top-0 right-0 text-red-500"
                />
              )}
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-auto space-y-2 text-xs text-gray-600 border-t border-gray-200 pt-4">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded bg-blue-600 mr-2"></span>
          Current
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded bg-green-50 border border-green-200 mr-2"></span>
          Answered
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded bg-gray-50 border border-gray-200 mr-2"></span>
          Unanswered
        </div>
        {!examMode && (
          <div className="flex items-center">
            <Flag size={10} className="text-red-500 mr-2" />
            Flagged (Long press)
          </div>
        )}
      </div>
      
      {!examMode && (
        <button
          onClick={onFinishPracticeExam}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium text-sm 
                     hover:bg-blue-700 transition-all duration-200 shadow-sm"
        >
          🏆 Finish Exam
        </button>
      )}
    </div>
  );
};
