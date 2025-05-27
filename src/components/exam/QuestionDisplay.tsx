
import React from 'react';
import { CheckCircle, XCircle, Lightbulb, HelpCircle } from 'lucide-react';

export const QuestionDisplay = ({ question, selectedAnswer, onAnswerSelect, onGetHint, onGetExplanation, showExplanation, examMode, totalQuestions, currentQuestionNumber, explanationLoading, progress }) => {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-lg shadow flex-grow flex flex-col">
      <div className="mb-3">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
          <span>Question {currentQuestionNumber} of {totalQuestions}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="mb-5 text-base text-gray-800 leading-relaxed">
        {question.text}
      </div>

      <div className="space-y-3 mb-5">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.id;
          const isCorrect = showExplanation && option.id === question.correctAnswer;
          const isIncorrectAndSelected = showExplanation && isSelected && !isCorrect;

          let optionClass = 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50';
          let letterClass = 'border-gray-400 text-gray-600 bg-white';
          
          if (showExplanation) {
            if (isCorrect) {
              optionClass = 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500';
              letterClass = 'bg-green-500 border-green-600 text-white';
            } else if (isIncorrectAndSelected) {
              optionClass = 'border-red-500 bg-red-50 text-red-700 ring-1 ring-red-500';
              letterClass = 'bg-red-500 border-red-600 text-white';
            } else if (isSelected) { 
                 optionClass = 'border-gray-300 bg-gray-100 opacity-70'; 
            } else {
                 optionClass = 'border-gray-300 bg-gray-50 opacity-70'; 
            }
          } else if (isSelected) {
            optionClass = 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500';
            letterClass = 'bg-blue-500 border-blue-600 text-white';
          }

          return (
            <button
              key={option.id}
              onClick={() => onAnswerSelect(option.id)}
              disabled={examMode && isSelected} 
              className={`
                w-full p-3 text-left rounded-md border
                flex items-center justify-between space-x-3
                transition-all duration-150 ease-in-out text-sm
                ${optionClass}
                ${(examMode && isSelected) ? 'cursor-not-allowed' : ''}
                focus:outline-none 
              `}
            >
              <span className="flex items-center space-x-2.5 flex-grow">
                <span className={`
                  w-5 h-5 flex-shrink-0 rounded-full border flex items-center justify-center font-semibold text-xs
                  ${letterClass}
                `}>
                  {option.id.toUpperCase()}
                </span>
                <span className="flex-grow text-gray-700">{option.text}</span>
              </span>
              {showExplanation && isCorrect && <CheckCircle size={18} className="text-green-500 flex-shrink-0" />}
              {showExplanation && isIncorrectAndSelected && <XCircle size={18} className="text-red-500 flex-shrink-0" />}
            </button>
          );
        })}
      </div>
        
      {!examMode && (
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 mt-auto">
            <button
            onClick={onGetHint}
            disabled={showExplanation || explanationLoading}
            className="px-4 py-2 rounded-md bg-yellow-400 text-yellow-800 font-medium text-xs
                        hover:bg-yellow-500 transition-colors duration-200 ease-in-out
                        flex items-center justify-center space-x-1.5 shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50
                        disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
            <Lightbulb size={14} />
            <span>Need a hint?</span>
            </button>
            <button
            onClick={onGetExplanation}
            disabled={explanationLoading || showExplanation}
            className="px-4 py-2 rounded-md bg-purple-500 text-white font-medium text-xs
                        hover:bg-purple-600 transition-colors duration-200 ease-in-out
                        flex items-center justify-center space-x-1.5 shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
                        disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
            {explanationLoading ? (
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : <HelpCircle size={14} />}
            <span>{explanationLoading ? 'Loading...' : (showExplanation ? 'Explanation Shown' : 'Get AI Explanation')}</span>
            </button>
        </div>
      )}

      {showExplanation && !examMode && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-700 text-xs">
          <h3 className="font-semibold mb-1 text-sm">Explanation:</h3>
          <p className="whitespace-pre-wrap leading-normal">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};
