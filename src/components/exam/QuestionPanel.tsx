
import React, { useRef } from 'react';
import { Flag, Trophy } from 'lucide-react';

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
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 h-full flex flex-col overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
        <h2 className="text-lg font-bold mb-2 flex items-center">
          <Trophy size={20} className="mr-2" />
          Questions Overview
        </h2>
        <div className="text-blue-100 text-sm">
          Progress: {Object.keys(answers).length}/{questions.length} answered
        </div>
      </div>
      
      <div className="p-6 flex-grow overflow-y-auto">
        <div className="grid grid-cols-5 gap-3 mb-6">
          {questions.map((_, index) => {
            const isFlagged = flaggedQuestions.includes(index);
            const isAnswered = answers[index] !== undefined;
            let buttonClass = 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-gray-200 hover:border-gray-300';
            
            if (index === currentQuestionIndex) {
              buttonClass = 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-2 border-blue-400 ring-2 ring-blue-200 shadow-md transform scale-105';
            } else if (isAnswered) {
              buttonClass = 'bg-gradient-to-br from-green-100 to-green-200 text-green-800 border-2 border-green-300 hover:from-green-200 hover:to-green-300 shadow-sm';
            } else if (isFlagged && !examMode) {
              buttonClass = 'bg-gradient-to-br from-red-100 to-red-200 text-red-800 border-2 border-red-300 hover:from-red-200 hover:to-red-300 shadow-sm';
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
                  relative w-full h-12 rounded-xl text-sm font-bold
                  flex items-center justify-center
                  transition-all duration-200 ease-in-out 
                  ${buttonClass}
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                  hover:transform hover:scale-105
                `}
                title={`Question ${index + 1}${!examMode ? ' (Long press to flag)' : ''}`}
              >
                {isFlagged && !examMode && (
                  <Flag
                    size={12}
                    fill="currentColor"
                    className="absolute top-1 right-1 text-red-600"
                  />
                )}
                {index + 1}
              </button>
            );
          })}
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
            <span className="w-4 h-4 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 mr-3 border-2 border-blue-400"></span>
            <span className="text-blue-800 font-medium">Current Question</span>
          </div>
          <div className="flex items-center p-3 bg-green-50 rounded-lg">
            <span className="w-4 h-4 rounded-lg bg-gradient-to-br from-green-100 to-green-200 mr-3 border-2 border-green-300"></span>
            <span className="text-green-800 font-medium">Answered</span>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <span className="w-4 h-4 rounded-lg bg-gray-100 mr-3 border-2 border-gray-200"></span>
            <span className="text-gray-600 font-medium">Unanswered</span>
          </div>
          {!examMode && (
            <div className="flex items-center p-3 bg-red-50 rounded-lg">
              <Flag size={14} className="text-red-600 mr-3" />
              <span className="text-red-800 font-medium">Flagged (Long press)</span>
            </div>
          )}
        </div>
      </div>

      {!examMode && (
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={onFinishPracticeExam}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-bold text-sm hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Finish Practice Session
          </button>
        </div>
      )}
    </div>
  );
};
