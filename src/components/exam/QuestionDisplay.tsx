
import React from 'react';
import { CheckCircle, XCircle, Lightbulb, HelpCircle } from 'lucide-react';

export const QuestionDisplay = ({ question, selectedAnswer, onAnswerSelect, onGetHint, onGetExplanation, showExplanation, examMode, totalQuestions, currentQuestionNumber, explanationLoading, progress }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 flex-grow flex flex-col">
      <div className="mb-6">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
          <span className="font-medium">Question {currentQuestionNumber} of {totalQuestions}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div 
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-8 text-lg text-gray-900 leading-relaxed font-medium">
        {question.text}
      </div>

      <div className="space-y-3 mb-6">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.id;
          const isCorrect = showExplanation && option.id === question.correctAnswer;
          const isIncorrectAndSelected = showExplanation && isSelected && !isCorrect;

          let optionClass = 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50';
          let letterClass = 'border-gray-300 text-gray-600 bg-gray-50';
          
          if (showExplanation) {
            if (isCorrect) {
              optionClass = 'border-green-300 bg-green-50 text-green-800';
              letterClass = 'bg-green-600 border-green-600 text-white';
            } else if (isIncorrectAndSelected) {
              optionClass = 'border-red-300 bg-red-50 text-red-800';
              letterClass = 'bg-red-600 border-red-600 text-white';
            } else {
              optionClass = 'border-gray-200 bg-gray-50 opacity-60'; 
            }
          } else if (isSelected) {
            optionClass = 'border-blue-300 bg-blue-50 text-blue-800';
            letterClass = 'bg-blue-600 border-blue-600 text-white';
          }

          return (
            <button
              key={option.id}
              onClick={() => onAnswerSelect(option.id)}
              disabled={examMode && isSelected} 
              className={`
                w-full p-4 text-left rounded-lg border-2
                flex items-center space-x-4
                transition-all duration-200 text-sm
                ${optionClass}
                ${(examMode && isSelected) ? 'cursor-not-allowed' : 'hover:shadow-sm'}
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
              `}
            >
              <span className={`
                w-8 h-8 flex-shrink-0 rounded-full border-2 flex items-center justify-center font-bold text-sm
                ${letterClass} transition-all duration-200
              `}>
                {option.id.toUpperCase()}
              </span>
              <span className="flex-grow text-gray-800 font-medium">{option.text}</span>
              {showExplanation && isCorrect && <CheckCircle size={20} className="text-green-600 flex-shrink-0" />}
              {showExplanation && isIncorrectAndSelected && <XCircle size={20} className="text-red-600 flex-shrink-0" />}
            </button>
          );
        })}
      </div>
        
      {!examMode && (
        <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-auto">
          <button
            onClick={onGetHint}
            disabled={showExplanation || explanationLoading}
            className="px-5 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium text-sm
                       hover:bg-gray-50 transition-all duration-200
                       flex items-center justify-center space-x-2
                       focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50
                       disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            <Lightbulb size={16} />
            <span>Need a hint?</span>
          </button>
          <button
            onClick={onGetExplanation}
            disabled={explanationLoading || showExplanation}
            className="px-5 py-3 rounded-lg bg-blue-600 text-white font-medium text-sm
                       hover:bg-blue-700 transition-all duration-200
                       flex items-center justify-center space-x-2
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                       disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
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
        <div className="mt-5 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg text-blue-800 text-sm">
          <h3 className="font-bold mb-2 text-base text-blue-900">Explanation:</h3>
          <p className="whitespace-pre-wrap leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};
