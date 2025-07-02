
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
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Question {questionIndex + 1} of {totalQuestions}</h2>
          <button
            onClick={onFlagToggle}
            className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
              isFlagged 
                ? 'bg-red-500 hover:bg-red-600 shadow-lg' 
                : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
            }`}
            title={isFlagged ? "Unflag Question" : "Flag Question"}
          >
            <Flag className="h-5 w-5" fill={isFlagged ? 'currentColor' : 'none'} />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Content */}
      <div className="p-8">
        <div className="mb-8 text-lg text-gray-800 leading-relaxed font-medium">
          {question.text}
        </div>

        {/* Answer Options */}
        <div className="space-y-4 mb-8">
          {question.options.map((option) => {
            const isCorrect = showExplanation && option.id === question.correctAnswer;
            const isIncorrectAndSelected = showExplanation && selectedAnswer === option.id && selectedAnswer !== question.correctAnswer;
            const isSelected = selectedAnswer === option.id;

            let optionClass = 'border-2 border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md';
            let letterClass = 'border-2 border-gray-300 text-gray-600 bg-white';
            
            if (showExplanation) {
              if (isCorrect) {
                optionClass = 'border-2 border-green-400 bg-green-50 shadow-lg';
                letterClass = 'bg-green-500 border-green-500 text-white shadow-md';
              } else if (isIncorrectAndSelected) {
                optionClass = 'border-2 border-red-400 bg-red-50 shadow-lg';
                letterClass = 'bg-red-500 border-red-500 text-white shadow-md';
              } else {
                optionClass = 'border-2 border-gray-200 bg-gray-100 opacity-60';
              }
            } else if (isSelected) {
              optionClass = 'border-2 border-blue-500 bg-blue-50 shadow-lg transform scale-[1.02]';
              letterClass = 'bg-blue-500 border-blue-500 text-white shadow-md';
            }

            return (
              <button
                key={option.id}
                onClick={() => onAnswerSelect(option.id)}
                disabled={showExplanation && !examMode}
                className={`
                  w-full p-5 text-left rounded-xl
                  flex items-center space-x-4
                  transition-all duration-300 ease-out
                  ${optionClass}
                  ${(showExplanation && !examMode) ? 'cursor-not-allowed' : 'cursor-pointer hover:transform hover:scale-[1.01]'}
                  focus:outline-none focus:ring-4 focus:ring-blue-300/50
                `}
              >
                <span className={`
                  w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center font-bold text-sm
                  ${letterClass} transition-all duration-300
                `}>
                  {option.id.toUpperCase()}
                </span>
                <span className="flex-grow text-gray-800 font-medium">{option.text}</span>
                {showExplanation && isCorrect && (
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                )}
                {showExplanation && isIncorrectAndSelected && (
                  <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        {!examMode && (
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={onGetHint}
              disabled={showExplanation}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold
                         hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300
                         flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl
                         focus:outline-none focus:ring-4 focus:ring-yellow-300/50
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Lightbulb className="h-5 w-5" />
              <span>Need a hint?</span>
            </button>
            <button
              onClick={onGetExplanation}
              disabled={showExplanation}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold
                         hover:from-purple-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300
                         flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl
                         focus:outline-none focus:ring-4 focus:ring-purple-300/50
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <HelpCircle className="h-5 w-5" />
              <span>Get Explanation</span>
            </button>
          </div>
        )}

        {/* Explanation */}
        {showExplanation && !examMode && (
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-xl shadow-inner">
            <h3 className="font-bold mb-3 text-blue-900 text-lg flex items-center">
              <HelpCircle className="h-5 w-5 mr-2" />
              Explanation
            </h3>
            <p className="text-blue-800 leading-relaxed">{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};
