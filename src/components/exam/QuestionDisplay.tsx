
import React from 'react';
import { CheckCircle, XCircle, Lightbulb, HelpCircle } from 'lucide-react';

export const QuestionDisplay = ({ question, selectedAnswer, onAnswerSelect, onGetHint, onGetExplanation, showExplanation, examMode, totalQuestions, currentQuestionNumber, explanationLoading, progress }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 flex-grow flex flex-col overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Question {currentQuestionNumber} of {totalQuestions}</h3>
          <div className="text-indigo-100 text-sm font-medium">
            {Math.round(progress)}% Complete
          </div>
        </div>
        <div className="w-full bg-indigo-400 bg-opacity-50 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="p-8 flex-grow flex flex-col">
        <div className="mb-8 text-lg text-gray-800 leading-relaxed font-medium">
          {question.text}
        </div>

        <div className="space-y-4 mb-8 flex-grow">
          {question.options.map((option) => {
            const isSelected = selectedAnswer === option.id;
            const isCorrect = showExplanation && option.id === question.correctAnswer;
            const isIncorrectAndSelected = showExplanation && isSelected && !isCorrect;

            let optionClass = 'border-2 border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md';
            let letterClass = 'border-2 border-gray-300 text-gray-600 bg-white';
            
            if (showExplanation) {
              if (isCorrect) {
                optionClass = 'border-2 border-green-400 bg-gradient-to-r from-green-50 to-green-100 text-green-800 ring-2 ring-green-200 shadow-lg';
                letterClass = 'bg-gradient-to-br from-green-500 to-green-600 border-2 border-green-400 text-white shadow-sm';
              } else if (isIncorrectAndSelected) {
                optionClass = 'border-2 border-red-400 bg-gradient-to-r from-red-50 to-red-100 text-red-800 ring-2 ring-red-200 shadow-lg';
                letterClass = 'bg-gradient-to-br from-red-500 to-red-600 border-2 border-red-400 text-white shadow-sm';
              } else {
                optionClass = 'border-2 border-gray-200 bg-gray-50 opacity-60';
                letterClass = 'border-2 border-gray-300 text-gray-400 bg-gray-100';
              }
            } else if (isSelected) {
              optionClass = 'border-2 border-blue-400 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 ring-2 ring-blue-200 shadow-lg';
              letterClass = 'bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-blue-400 text-white shadow-sm';
            }

            return (
              <button
                key={option.id}
                onClick={() => onAnswerSelect(option.id)}
                disabled={examMode && isSelected} 
                className={`
                  w-full p-5 text-left rounded-xl
                  flex items-center space-x-4
                  transition-all duration-200 ease-in-out
                  ${optionClass}
                  ${(examMode && isSelected) ? 'cursor-not-allowed' : 'hover:transform hover:scale-[1.02]'}
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                `}
              >
                <span className={`
                  w-10 h-10 flex-shrink-0 rounded-full border flex items-center justify-center font-bold text-sm
                  ${letterClass}
                `}>
                  {option.id.toUpperCase()}
                </span>
                <span className="flex-grow text-gray-700 font-medium">{option.text}</span>
                {showExplanation && isCorrect && <CheckCircle size={24} className="text-green-500 flex-shrink-0" />}
                {showExplanation && isIncorrectAndSelected && <XCircle size={24} className="text-red-500 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
        
        {!examMode && (
          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            <button
              onClick={onGetHint}
              disabled={showExplanation || explanationLoading}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold text-sm
                        hover:from-amber-500 hover:to-orange-500 transition-all duration-200 ease-in-out
                        flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105
                        focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50
                        disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              <Lightbulb size={16} />
              <span>Get Hint</span>
            </button>
            <button
              onClick={onGetExplanation}
              disabled={explanationLoading || showExplanation}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold text-sm
                        hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 ease-in-out
                        flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105
                        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
                        disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {explanationLoading ? (
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : <HelpCircle size={16} />}
              <span>{explanationLoading ? 'Loading...' : (showExplanation ? 'Explanation Shown' : 'AI Explanation')}</span>
            </button>
          </div>
        )}

        {showExplanation && !examMode && (
          <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
            <h3 className="font-bold mb-3 text-blue-800 flex items-center">
              <Lightbulb size={18} className="mr-2" />
              Explanation:
            </h3>
            <p className="text-blue-700 leading-relaxed whitespace-pre-wrap">{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};
