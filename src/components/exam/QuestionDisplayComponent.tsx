
import React from 'react';
import { CheckCircle, XCircle, Lightbulb, HelpCircle, Flag } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  hint: string;
  explanation: string;
}

interface QuestionDisplayComponentProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer?: string;
  onAnswerSelect: (optionId: string) => void;
  onFlagToggle: () => void;
  isFlagged: boolean;
  onGetHint: () => void;
  onGetExplanation: () => void;
  showExplanation: boolean;
  examMode: boolean;
}

export const QuestionDisplayComponent = ({ 
  question, 
  questionIndex, 
  totalQuestions, 
  selectedAnswer, 
  onAnswerSelect, 
  onFlagToggle, 
  isFlagged, 
  onGetHint, 
  onGetExplanation, 
  showExplanation, 
  examMode 
}: QuestionDisplayComponentProps) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md flex-grow flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Question {questionIndex + 1} of {totalQuestions}</h2>
        <button
          onClick={onFlagToggle}
          className={`p-2 rounded-full transition-colors duration-200 ease-in-out
            ${isFlagged ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
          `}
          title={isFlagged ? "Unflag Question" : "Flag Question"}
        >
          <Flag size={20} fill={isFlagged ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="mb-8 text-base sm:text-lg text-gray-900 leading-relaxed">
        {question.text}
      </div>

      <div className="space-y-3 sm:space-y-4 mb-8">
        {question.options.map((option) => {
          const isCorrect = showExplanation && option.id === question.correctAnswer;
          const isIncorrectAndSelected = showExplanation && selectedAnswer === option.id && selectedAnswer !== question.correctAnswer;

          return (
            <button
              key={option.id}
              onClick={() => onAnswerSelect(option.id)}
              disabled={showExplanation && !examMode}
              className={`
                w-full p-3 sm:p-4 text-left rounded-lg border-2
                flex items-center justify-between space-x-3
                transition-all duration-200 ease-in-out text-sm sm:text-base
                ${selectedAnswer === option.id && !showExplanation
                  ? 'border-blue-500 bg-blue-50 text-blue-800 shadow-sm'
                  : showExplanation && isCorrect
                    ? 'border-green-500 bg-green-50 text-green-800 shadow-sm'
                    : showExplanation && isIncorrectAndSelected
                      ? 'border-red-500 bg-red-50 text-red-800 shadow-sm'
                      : 'border-gray-200 bg-gray-50 text-gray-800 hover:border-blue-300 hover:bg-blue-100'
                }
                ${(showExplanation && !examMode) ? 'cursor-not-allowed' : 'cursor-pointer'}
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
              `}
            >
              <span className="flex items-center space-x-3">
                <span className={`
                  w-6 h-6 flex-shrink-0 rounded-full border-2 flex items-center justify-center font-medium
                  ${selectedAnswer === option.id && !showExplanation
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : showExplanation && isCorrect
                      ? 'bg-green-500 border-green-500 text-white'
                      : showExplanation && isIncorrectAndSelected
                        ? 'bg-red-500 border-red-500 text-white'
                        : 'border-gray-400 text-gray-600'
                  }
                `}>
                  {option.id.toUpperCase()}
                </span>
                <span className="flex-grow">{option.text}</span>
              </span>
              {showExplanation && isCorrect && <CheckCircle size={20} className="text-green-500 flex-shrink-0" />}
              {showExplanation && isIncorrectAndSelected && <XCircle size={20} className="text-red-500 flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {!examMode && (
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-auto">
          <button
            onClick={onGetHint}
            disabled={showExplanation}
            className="px-4 py-2 sm:px-5 rounded-lg bg-yellow-100 text-yellow-700 font-medium
                       hover:bg-yellow-200 transition-colors duration-200 ease-in-out
                       flex items-center justify-center space-x-2 shadow-sm text-sm sm:text-base
                       focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Lightbulb size={18} />
            <span>Need a hint?</span>
          </button>
          <button
            onClick={onGetExplanation}
            disabled={showExplanation}
            className="px-4 py-2 sm:px-5 rounded-lg bg-purple-100 text-purple-700 font-medium
                       hover:bg-purple-200 transition-colors duration-200 ease-in-out
                       flex items-center justify-center space-x-2 shadow-sm text-sm sm:text-base
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HelpCircle size={18} />
            <span>Get Explanation</span>
          </button>
        </div>
      )}

      {showExplanation && !examMode && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
          <h3 className="font-semibold mb-2">Explanation:</h3>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
};
