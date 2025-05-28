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
    <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col">
      <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Questions</h2>
      <div className="grid grid-cols-5 gap-2 mb-5 flex-grow overflow-y-auto pr-1">
        {questions.map((_, index) => {
          const isFlagged = flaggedQuestions.includes(index);
          const isAnswered = answers[index] !== undefined;
          let buttonClass = 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-300 hover:shadow-md';
          if (index === currentQuestionIndex) {
            buttonClass = 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-indigo-600 ring-2 ring-indigo-300 shadow-lg';
          } else if (isAnswered) {
            buttonClass = 'bg-gradient-to-br from-emerald-400 to-green-500 text-white border-emerald-500 hover:from-emerald-500 hover:to-green-600 shadow-md';
          } else if (isFlagged && !examMode) {
            buttonClass = 'bg-gradient-to-br from-red-400 to-pink-500 text-white border-red-500 hover:from-red-500 hover:to-pink-600 shadow-md';
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
                relative w-full h-10 rounded-lg text-sm font-bold border-2
                flex items-center justify-center
                transition-all duration-200 ease-in-out transform hover:scale-105
                ${buttonClass}
                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50
              `}
              title={`Question ${index + 1}${!examMode ? ' (Long press to flag)' : ''}`}
            >
              {isFlagged && !examMode && (
                <Flag
                  size={12}
                  fill="currentColor"
                  className="absolute top-0.5 right-0.5 text-white drop-shadow-sm"
                />
              )}
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-auto space-y-2 text-xs text-gray-600 border-t border-gray-200 pt-4">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-sm bg-gradient-to-br from-indigo-500 to-purple-600 mr-2 border border-indigo-600"></span>
          Current
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-sm bg-gradient-to-br from-emerald-400 to-green-500 mr-2 border border-emerald-500"></span>
          Answered
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-sm bg-gray-100 mr-2 border border-gray-300"></span>
          Unanswered
        </div>
        {!examMode && (
          <div className="flex items-center">
            <Flag size={12} className="text-red-500 mr-2" />
            Flagged (Long press)
          </div>
        )}
      </div>
      {!examMode && (
        <button
          onClick={onFinishPracticeExam}
          className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-lg font-bold text-sm 
                     hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 ease-in-out transform hover:scale-105 
                     shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Finish Exam
        </button>
      )}
    </div>
  );
};
