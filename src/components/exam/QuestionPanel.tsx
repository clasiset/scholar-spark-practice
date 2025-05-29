
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
    <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col shadow-sm">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
      </div>
      
      <div className="p-4 flex-grow overflow-y-auto">
        <div className="grid grid-cols-10 gap-2 mb-6">
          {questions.map((_, index) => {
            const isFlagged = flaggedQuestions.includes(index);
            const isAnswered = answers[index] !== undefined;
            let buttonClass = 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200';
            
            if (index === currentQuestionIndex) {
              buttonClass = 'bg-blue-600 text-white border-blue-600 shadow-md';
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
                    className="absolute -top-1 -right-1 text-red-500"
                  />
                )}
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-gray-100 space-y-4">
        <div className="space-y-3 text-xs text-gray-600">
          <div className="flex items-center">
            <span className="w-4 h-4 rounded bg-blue-600 mr-3 flex-shrink-0"></span>
            <span>Current</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 rounded bg-green-50 border border-green-200 mr-3 flex-shrink-0"></span>
            <span>Answered</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 rounded bg-gray-50 border border-gray-200 mr-3 flex-shrink-0"></span>
            <span>Unanswered</span>
          </div>
          {!examMode && (
            <div className="flex items-center">
              <Flag size={12} className="text-red-500 mr-3 flex-shrink-0" />
              <span>Flagged (Long press to flag)</span>
            </div>
          )}
        </div>
        
        {!examMode && (
          <button
            onClick={onFinishPracticeExam}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium text-sm 
                       hover:bg-blue-700 transition-all duration-200 shadow-sm flex items-center justify-center space-x-2"
          >
            <span>🏆</span>
            <span>Finish Exam</span>
          </button>
        )}
      </div>
    </div>
  );
};
