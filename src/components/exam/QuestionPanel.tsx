
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
    <div className="bg-white p-5 rounded-lg shadow h-full flex flex-col">
      <h2 className="text-base font-semibold text-gray-700 mb-4">Questions</h2>
      <div className="grid grid-cols-5 gap-1.5 mb-5 flex-grow overflow-y-auto pr-1">
        {questions.map((_, index) => {
          const isFlagged = flaggedQuestions.includes(index);
          const isAnswered = answers[index] !== undefined;
          let buttonClass = 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300';
          if (index === currentQuestionIndex) {
            buttonClass = 'bg-blue-500 text-white border-blue-600 ring-2 ring-blue-300';
          } else if (isAnswered) {
            buttonClass = 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200';
          } else if (isFlagged && !examMode) {
            buttonClass = 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200';
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
                relative w-full h-8 rounded text-xs font-medium border
                flex items-center justify-center
                transition-all duration-150 ease-in-out 
                ${buttonClass}
                focus:outline-none 
              `}
              title={`Question ${index + 1}${!examMode ? ' (Long press to flag)' : ''}`}
            >
              {isFlagged && !examMode && (
                <Flag
                  size={10}
                  fill="currentColor"
                  className="absolute top-0.5 right-0.5 text-red-500"
                />
              )}
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-auto space-y-1.5 text-xs text-gray-600">
        <div className="flex items-center"><span className="w-2.5 h-2.5 rounded-sm bg-blue-500 mr-2 border border-blue-600"></span>Current</div>
        <div className="flex items-center"><span className="w-2.5 h-2.5 rounded-sm bg-green-100 mr-2 border border-green-300"></span>Answered</div>
        <div className="flex items-center"><span className="w-2.5 h-2.5 rounded-sm bg-gray-100 mr-2 border border-gray-300"></span>Unanswered</div>
        {!examMode && <div className="flex items-center"><Flag size={10} className="text-red-500 mr-2" />Flagged (Long press)</div>}
      </div>
      {!examMode && (
        <button
          onClick={onFinishPracticeExam}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md font-semibold text-sm hover:bg-blue-600 transition-colors duration-200 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Finish Exam
        </button>
      )}
    </div>
  );
};
