
import React from 'react';
import { CheckCircle, XCircle, Lightbulb, HelpCircle } from 'lucide-react';

export const QuestionDisplay = ({ question, selectedAnswer, onAnswerSelect, onGetHint, onGetExplanation, showExplanation, examMode, totalQuestions, currentQuestionNumber, explanationLoading, progress }) => {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-xl shadow-lg border border-gray-100 flex-grow flex flex-col">
      <div className="mb-4">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
          <span className="font-medium">Question {currentQuestionNumber} of {totalQuestions}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6 text-lg text-gray-800 leading-relaxed font-medium">
        {question.text}
      </div>

      <div className="space-y-3 mb-6">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.id;
          const isCorrect = showExplanation && option.id === question.correctAnswer;
          const isIncorrectAndSelected = showExplanation && isSelected && !isCorrect;

          let optionClass = 'border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md';
          let letterClass = 'border-gray-300 text-gray-600 bg-white';
          
          if (showExplanation) {
            if (isCorrect) {
              optionClass = 'border-emerald-400 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-200 shadow-md';
              letterClass = 'bg-emerald-500 border-emerald-600 text-white';
            } else if (isIncorrectAndSelected) {
              optionClass = 'border-red-400 bg-red-50 text-red-800 ring-2 ring-red-200 shadow-md';
              letterClass = 'bg-red-500 border-red-600 text-white';
            } else if (isSelected) { 
                 optionClass = 'border-gray-300 bg-gray-100 opacity-60'; 
            } else {
                 optionClass = 'border-gray-200 bg-gray-50 opacity-60'; 
            }
          } else if (isSelected) {
            optionClass = 'border-indigo-400 bg-indigo-50 text-indigo-800 ring-2 ring-indigo-200 shadow-md';
            letterClass = 'bg-indigo-500 border-indigo-600 text-white';
          }

          return (
            <button
              key={option.id}
              onClick={() => onAnswerSelect(option.id)}
              disabled={examMode && isSelected} 
              className={`
                w-full p-4 text-left rounded-xl border-2
                flex items-center justify-between space-x-3
                transition-all duration-200 ease-in-out text-sm
                ${optionClass}
                ${(examMode && isSelected) ? 'cursor-not-allowed' : 'transform hover:scale-[1.02]'}
                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50
              `}
            >
              <span className="flex items-center space-x-3 flex-grow">
                <span className={`
                  w-8 h-8 flex-shrink-0 rounded-full border-2 flex items-center justify-center font-bold text-sm
                  ${letterClass} transition-all duration-200
                `}>
                  {option.id.toUpperCase()}
                </span>
                <span className="flex-grow text-gray-800 font-medium">{option.text}</span>
              </span>
              {showExplanation && isCorrect && <CheckCircle size={20} className="text-emerald-500 flex-shrink-0" />}
              {showExplanation && isIncorrectAndSelected && <XCircle size={20} className="text-red-500 flex-shrink-0" />}
            </button>
          );
        })}
      </div>
        
      {!examMode && (
        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-auto">
            <button
            onClick={onGetHint}
            disabled={showExplanation || explanationLoading}
            className="px-5 py-3 rounded-lg bg-gradient-to-r from-amber-400 to-orange-400 text-white font-semibold text-sm
                        hover:from-amber-500 hover:to-orange-500 transition-all duration-200 ease-in-out transform hover:scale-105
                        flex items-center justify-center space-x-2 shadow-lg
                        focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50
                        disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed disabled:transform-none"
            >
            <Lightbulb size={16} />
            <span>Need a hint?</span>
            </button>
            <button
            onClick={onGetExplanation}
            disabled={explanationLoading || showExplanation}
            className="px-5 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm
                        hover:from-purple-600 hover:to-pink-600 transition-all duration-200 ease-in-out transform hover:scale-105
                        flex items-center justify-center space-x-2 shadow-lg
                        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
                        disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed disabled:transform-none"
            >
            {explanationLoading ? (
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : <HelpCircle size={16} />}
            <span>{explanationLoading ? 'Loading...' : (showExplanation ? 'Explanation Shown' : 'Get AI Explanation')}</span>
            </button>
        </div>
      )}

      {showExplanation && !examMode && (
        <div className="mt-5 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-400 rounded-lg text-indigo-800 text-sm shadow-sm">
          <h3 className="font-bold mb-2 text-base text-indigo-900">Explanation:</h3>
          <p className="whitespace-pre-wrap leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};
