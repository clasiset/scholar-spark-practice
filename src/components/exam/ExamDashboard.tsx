import React, { useState, useEffect, useRef } from 'react';
import { Flag, CheckCircle, XCircle, HelpCircle, Lightbulb, ChevronLeft, ChevronRight, Trophy, Home, ChevronDown, Menu } from 'lucide-react';

// Dummy data for questions
const dummyQuestions = [
  {
    id: 1,
    text: "The weather outside was extremely pleasant and hence we decided to ______.",
    options: [
      { id: 'a', text: "employ this rare opportunity for writing letters" },
      { id: 'b', text: "enjoy a morning ride in the open" },
      { id: 'c', text: "refrain from going out for a morning walk" },
      { id: 'd', text: "utilize our time watching the television" },
    ],
    correctAnswer: 'b',
    hint: "Think about what one would do on a pleasant morning outdoors.",
    explanation: "The phrase 'extremely pleasant' suggests an activity that would allow one to enjoy the weather. 'Enjoy a morning ride in the open' fits this perfectly, implying taking advantage of the good weather.",
  },
  {
    id: 2,
    text: "Which of the following is a prime number?",
    options: [
      { id: 'a', text: "4" },
      { id: 'b', text: "9" },
      { id: 'c', text: "11" },
      { id: 'd', text: "15" },
    ],
    correctAnswer: 'c',
    hint: "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.",
    explanation: "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. 4 = 2x2, 9 = 3x3, 15 = 3x5. Only 11 is divisible only by 1 and 11.",
  },
  {
    id: 3,
    text: "What is the capital of France?",
    options: [
      { id: 'a', text: "Berlin" },
      { id: 'b', text: "Madrid" },
      { id: 'c', text: "Rome" },
      { id: 'd', text: "Paris" },
    ],
    correctAnswer: 'd',
    hint: "It's a major European city known for its art and culture.",
    explanation: "Paris is the capital and most populous city of France.",
  },
  {
    id: 4,
    text: "Which planet is known as the 'Red Planet'?",
    options: [
      { id: 'a', text: "Earth" },
      { id: 'b', text: "Mars" },
      { id: 'c', text: "Jupiter" },
      { id: 'd', text: "Venus" },
    ],
    correctAnswer: 'b',
    hint: "It's the fourth planet from the Sun.",
    explanation: "Mars is often referred to as the 'Red Planet' due to its reddish appearance, which is caused by iron oxide (rust) on its surface.",
  },
  {
    id: 5,
    text: "What is the chemical symbol for water?",
    options: [
      { id: 'a', text: "O2" },
      { id: 'b', text: "H2O" },
      { id: 'c', text: "CO2" },
      { id: 'd', text: "NaCl" },
    ],
    correctAnswer: 'b',
    hint: "It involves hydrogen and oxygen.",
    explanation: "The chemical symbol for water is H2O, meaning it is composed of two hydrogen atoms and one oxygen atom.",
  },
  {
    id: 6,
    text: "Who painted the Mona Lisa?",
    options: [
      { id: 'a', text: "Vincent van Gogh" },
      { id: 'b', text: "Pablo Picasso" },
      { id: 'c', text: "Leonardo da Vinci" },
      { id: 'd', text: "Claude Monet" },
    ],
    correctAnswer: 'c',
    hint: "He was a famous Italian Renaissance artist and inventor.",
    explanation: "The Mona Lisa was painted by Leonardo da Vinci, an Italian polymath of the High Renaissance.",
  },
  {
    id: 7,
    text: "What is the largest ocean on Earth?",
    options: [
      { id: 'a', text: "Atlantic Ocean" },
      { id: 'b', text: "Indian Ocean" },
      { id: 'c', text: "Arctic Ocean" },
      { id: 'd', text: "Pacific Ocean" },
    ],
    correctAnswer: 'd',
    hint: "It covers about one-third of the surface of the Earth.",
    explanation: "The Pacific Ocean is the largest and deepest of Earth's oceanic divisions.",
  },
  {
    id: 8,
    text: "How many continents are there?",
    options: [
      { id: 'a', text: "5" },
      { id: 'b', text: "6" },
      { id: 'c', text: "7" },
      { id: 'd', text: "8" },
    ],
    correctAnswer: 'c',
    hint: "Think about North America, South America, Europe, Asia, Africa, Australia...",
    explanation: "There are generally considered to be seven continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia.",
  },
  {
    id: 9,
    text: "What is the fastest land animal?",
    options: [
      { id: 'a', text: "Lion" },
      { id: 'b', text: "Cheetah" },
      { id: 'c', text: "Gazelle" },
      { id: 'd', text: "Horse" },
    ],
    correctAnswer: 'b',
    hint: "It's known for its incredible speed and spotted coat.",
    explanation: "The cheetah is the fastest land animal, capable of running at speeds of up to 120 km/h (75 mph) over short distances.",
  },
  {
    id: 10,
    text: "Which gas do plants absorb from the atmosphere?",
    options: [
      { id: 'a', text: "Oxygen" },
      { id: 'b', text: "Nitrogen" },
      { id: 'c', text: "Carbon Dioxide" },
      { id: 'd', text: "Hydrogen" },
    ],
    correctAnswer: 'c',
    hint: "It's essential for photosynthesis.",
    explanation: "Plants absorb carbon dioxide from the atmosphere for photosynthesis, the process by which they convert light energy into chemical energy.",
  },
];

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Toast disappears after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'info' ? 'bg-blue-500' : 'bg-red-500';
  const Icon = type === 'success' ? CheckCircle : type === 'info' ? Lightbulb : XCircle;

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-fade-in-up`}>
      <Icon size={20} />
      <span>{message}</span>
      <button onClick={onClose} className="ml-auto text-white opacity-75 hover:opacity-100">
        <XCircle size={18} />
      </button>
    </div>
  );
};

// Exam Completed Modal Component
const ExamCompletedModal = ({ score, correct, incorrect, total, onClose }) => {
  const message = score >= 60 ? "Great job! You passed the exam." : "You need more practice. Review the material and try again.";
  const messageColor = score >= 60 ? "text-green-700" : "text-red-700";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <Trophy size={64} className="text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Exam Completed!</h2>
        <p className="text-gray-600 mb-6">You've completed the Aptitude Entrance Exam.</p>

        <div className="mb-6">
          <p className="text-xl font-semibold text-gray-800 mb-2">Score: {score}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${score}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-gray-700 font-medium text-sm">
            <span className="flex items-center">
              <CheckCircle size={16} className="text-green-500 mr-1" /> Correct: {correct}
            </span>
            <span className="flex items-center">
              <XCircle size={16} className="text-red-500 mr-1" /> Incorrect: {incorrect}
            </span>
            <span>Total: {total}</span>
          </div>
        </div>

        <p className={`text-md font-medium ${messageColor} mb-6`}>{message}</p>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-lg
                     hover:bg-blue-700 transition-colors duration-200 ease-in-out
                     flex items-center justify-center space-x-2 shadow-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <Home size={20} />
          <span>Home / Restart</span>
        </button>
      </div>
    </div>
  );
};


// Header Component
const Header = ({ title, breadcrumbs, examMode, timeLeft, onToggleExamMode, onToggleQuestionGrid }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <header className="bg-white p-4 border-b border-gray-200 shadow-sm flex justify-between items-center">
      <div>
        <nav className="text-sm text-gray-600 mb-1 sm:mb-2">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="mr-1">
              {crumb} {index < breadcrumbs.length - 1 && <span className="mx-1">/</span>}
            </span>
          ))}
        </nav>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">{title}</h1>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        {!examMode && <span className="text-gray-600 text-sm hidden md:inline">Practice Mode</span>}
        {examMode && (
          <span className="text-blue-600 font-semibold text-base sm:text-lg">
            Time: {formatTime(timeLeft)}
          </span>
        )}
        <button
          onClick={onToggleQuestionGrid}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 lg:hidden"
          title="View All Questions"
        >
          <Menu size={24} />
        </button>
        <button
          onClick={onToggleExamMode}
          className={`py-2 px-3 sm:px-6 rounded-lg font-semibold shadow-md transition-colors duration-200 ease-in-out
            ${examMode
              ? 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500'
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm sm:text-base
          `}
        >
          {examMode ? 'Practice Mode' : 'Exam Mode'}
        </button>
      </div>
    </header>
  );
};

// Question Panel Component (Left Sidebar - visible on large screens)
const QuestionPanel = ({ questions, currentQuestionIndex, answers, flaggedQuestions, onQuestionClick, onFlagToggleByIndex }) => {
  const longPressTimer = useRef(null);
  const isClicking = useRef(false);
  const LONG_PRESS_DURATION = 500;

  const handlePressStart = (e, index) => {
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
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Questions</h2>
      <div className="grid grid-cols-5 gap-2 mb-6 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        {questions.map((_, index) => {
          const isFlagged = flaggedQuestions.includes(index);
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
                relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                transition-all duration-200 ease-in-out
                ${index === currentQuestionIndex
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : answers[index] !== undefined
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : isFlagged
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
              `}
              title={`Question ${index + 1} (Long press to flag/unflag)`}
            >
              {isFlagged && (
                <Flag
                  size={16}
                  fill="currentColor"
                  className="absolute top-0 right-0 -mt-1 -mr-1 text-red-500"
                />
              )}
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-auto space-y-3 text-sm">
        <div className="flex items-center">
          <span className="w-4 h-4 rounded-full bg-blue-600 mr-3 flex-shrink-0"></span>
          <span className="text-gray-700">Current</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 rounded-full bg-green-100 border border-green-300 mr-3 flex-shrink-0"></span>
          <span className="text-gray-700">Answered</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 rounded-full bg-gray-100 border border-gray-300 mr-3 flex-shrink-0"></span>
          <span className="text-gray-700">Unanswered</span>
        </div>
        <div className="flex items-center">
          <Flag size={16} className="text-red-500 mr-3 flex-shrink-0" />
          <span className="text-gray-700">Flagged (Long press)</span>
        </div>
      </div>
    </div>
  );
};

// Question Display Component (Main Content)
const QuestionDisplay = ({ question, questionIndex, totalQuestions, selectedAnswer, onAnswerSelect, onFlagToggle, isFlagged, onGetHint, onGetExplanation, showExplanation, examMode }) => {
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
              disabled={showExplanation && !examMode} // Disable selection after explanation is shown in practice mode
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

// Question Grid Modal Component (for small screens)
const QuestionGridModal = ({ questions, currentQuestionIndex, answers, flaggedQuestions, onQuestionClick, onClose, onFlagToggleByIndex }) => {
  const longPressTimer = useRef(null);
  const isClicking = useRef(false);
  const LONG_PRESS_DURATION = 500;

  const handlePressStart = (e, index) => {
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
        onClose(); 
      }
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">All Questions</h2>
            <button onClick={onClose} className="p-2 text-gray-600 hover:text-gray-800">
                <XCircle size={24} />
            </button>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 gap-2 mb-6 overflow-y-auto custom-scrollbar pr-2 flex-grow">
          {questions.map((_, index) => {
            const isFlagged = flaggedQuestions.includes(index);
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
                  relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  transition-all duration-200 ease-in-out
                  ${index === currentQuestionIndex
                    ? 'bg-blue-600 text-white shadow-lg'
                    : answers[index] !== undefined
                      ? 'bg-green-100 text-green-700'
                      : isFlagged
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                `}
                title={`Question ${index + 1} (Long press to flag/unflag)`}
              >
                {isFlagged && (
                  <Flag
                    size={16}
                    fill="currentColor"
                    className="absolute top-0 right-0 -mt-1 -mr-1 text-red-500"
                  />
                )}
                {index + 1}
              </button>
            );
          })}
        </div>
         <div className="mt-auto space-y-2 text-xs pt-4 border-t">
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-600 mr-2"></span>Current</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-100 border border-green-300 mr-2"></span>Answered</div>
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-gray-100 border border-gray-300 mr-2"></span>Unanswered</div>
            <div className="flex items-center"><Flag size={12} className="text-red-500 mr-2" />Flagged (Long press)</div>
        </div>
      </div>
    </div>
  );
};


// Footer Navigation Component
const FooterNav = ({ questions, currentQuestionIndex, answers, flaggedQuestions, onPrevious, onNext, showPrevious, showNext, onQuestionClick, onFlagToggleByIndex, onFinishExam, examMode }) => {
  const longPressTimer = useRef(null);
  const isClicking = useRef(false);
  const LONG_PRESS_DURATION = 500;

  const handlePressStart = (e, index) => {
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
    <footer className="bg-white p-3 sm:p-4 border-t border-gray-200 shadow-sm flex justify-between items-center mt-auto">
      <button
        onClick={onPrevious}
        disabled={!showPrevious}
        className={`px-3 py-2 sm:px-4 rounded-lg font-semibold transition-colors duration-200 ease-in-out
          ${showPrevious
            ? 'bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-sm'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }
          flex items-center space-x-1 sm:space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-sm sm:text-base
        `}
      >
        <ChevronLeft size={18} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Condensed Question Navigation for smaller screens, full for larger */}
      <div className="hidden lg:flex items-center space-x-1 overflow-x-auto whitespace-nowrap py-2 px-1 custom-scrollbar flex-grow justify-center mx-2">
        {questions.map((_, index) => {
          const isFlagged = flaggedQuestions.includes(index);
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
                relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex-shrink-0 flex items-center justify-center text-xs sm:text-sm font-medium
                transition-all duration-200 ease-in-out
                ${index === currentQuestionIndex
                  ? 'bg-blue-600 text-white shadow-lg'
                  : answers[index] !== undefined
                    ? 'bg-green-100 text-green-700'
                    : isFlagged
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
              `}
              title={`Question ${index + 1} (Long press to flag/unflag)`}
            >
              {isFlagged && (
                <Flag
                  size={12}
                  fill="currentColor"
                  className="absolute top-0 right-0 -mt-0.5 -mr-0.5 text-red-500"
                />
              )}
              {index + 1}
            </button>
          );
        })}
      </div>
      <div className="lg:hidden flex-grow text-center text-sm text-gray-600 font-medium">
        Q {currentQuestionIndex + 1} / {questions.length}
      </div>


      {examMode && Object.keys(answers).length === questions.length && (
         <button
            onClick={() => onFinishExam(false)}
            className="px-3 py-2 sm:px-4 rounded-lg font-semibold bg-green-500 text-white hover:bg-green-600 shadow-md
            transition-colors duration-200 ease-in-out flex items-center space-x-1 sm:space-x-2
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-sm sm:text-base mx-2"
        >
            <span>Finish Exam</span>
            <CheckCircle size={18} />
        </button>
      )}

      <button
        onClick={onNext}
        disabled={!showNext}
        className={`px-3 py-2 sm:px-4 rounded-lg font-semibold transition-colors duration-200 ease-in-out
          ${showNext
            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
            : 'bg-blue-300 text-white cursor-not-allowed' // Keep blue for consistency, but disabled
          }
          flex items-center space-x-1 sm:space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm sm:text-base
        `}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={18} />
      </button>
    </footer>
  );
};

// Main Dashboard Component
const Dashboard = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); 
  const [flaggedQuestions, setFlaggedQuestions] = useState([]); 
  const [showExplanation, setShowExplanation] = useState(false);
  // showHint state is not strictly needed if we use toast for hints
  const [examMode, setExamMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes for demo
  const [showExamCompletedModal, setShowExamCompletedModal] = useState(false);
  const [examResults, setExamResults] = useState({ score: 0, correct: 0, incorrect: 0, total: questions.length });
  const [toast, setToast] = useState(null); 
  const [showQuestionGridModal, setShowQuestionGridModal] = useState(false);

  const timerRef = useRef(null);
  const currentQuestion = questions[currentQuestionIndex];

  // Timer effect for exam mode
  useEffect(() => {
    if (examMode) {
      setTimeLeft(10 * 60); // Reset timer when entering exam mode
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            handleFinishExam(true); // Auto-finish exam when time runs out (timedOut = true)
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [examMode, questions.length]); // Added questions.length to reset if questions change


  // Calculate results whenever answers change
   const calculateResults = (currentAnswers) => {
    let correctCount = 0;
    let incorrectCount = 0;
    questions.forEach((q, index) => {
      if (currentAnswers[index] !== undefined) {
        if (currentAnswers[index] === q.correctAnswer) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }
    });
    const scorePercentage = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    return {
      score: scorePercentage,
      correct: correctCount,
      incorrect: incorrectCount,
      total: questions.length,
    };
  };


  const handleAnswerSelect = (optionId) => {
    const newAnswers = { ...answers, [currentQuestionIndex]: optionId };
    setAnswers(newAnswers);
    
    if (examMode) {
        // In exam mode, only finish if all questions are answered
        const allAnswered = Object.keys(newAnswers).length === questions.length;
        if (allAnswered) {
            // Optional: provide a toast or confirm before auto-submitting
            // For now, we rely on the explicit "Finish Exam" button or timer.
            // setToast({ message: "All questions answered. Click 'Finish Exam' to submit.", type: 'info' });
        }
    } else {
        // In practice mode, can show explanation immediately or let user click
        setShowExplanation(false); 
    }
  };

  const handleFlagToggle = () => {
    const isCurrentlyFlagged = flaggedQuestions.includes(currentQuestionIndex);
    let newMessage;
    if (isCurrentlyFlagged) {
      setFlaggedQuestions(prev => prev.filter(index => index !== currentQuestionIndex));
      newMessage = `Question ${currentQuestionIndex + 1} unflagged.`;
    } else {
      setFlaggedQuestions(prev => [...prev, currentQuestionIndex]);
      newMessage = `Question ${currentQuestionIndex + 1} flagged for review.`;
    }
    setToast({ message: newMessage, type: 'info' });
  };

  const handleFlagToggleByIndex = (index) => {
    const isCurrentlyFlagged = flaggedQuestions.includes(index);
    let newMessage;
    if (isCurrentlyFlagged) {
      setFlaggedQuestions(prev => prev.filter(item => item !== index));
      newMessage = `Question ${index + 1} unflagged.`;
    } else {
      setFlaggedQuestions(prev => [...prev, index]);
      newMessage = `Question ${index + 1} flagged for review.`;
    }
    setToast({ message: newMessage, type: 'info' });
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
    setShowExplanation(false);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowExplanation(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
    } else if (examMode && currentQuestionIndex === questions.length -1) {
        // If it's the last question in exam mode, and user clicks next, consider it a finish attempt
        // This is an alternative to auto-finishing or requiring the finish button
        // handleFinishExam(false); 
        setToast({ message: "You are at the last question. Click 'Finish Exam' to submit.", type: 'info' });
    }
  };

  const handleGetHint = () => {
    if (currentQuestion && currentQuestion.hint && !examMode) {
      setToast({ message: `Hint: ${currentQuestion.hint}`, type: 'info' });
    } else if (examMode) {
      setToast({ message: "Hints are not available in Exam Mode.", type: 'info' });
    }
  };

  const handleGetExplanation = () => {
     if (!examMode) {
        setShowExplanation(true);
     } else {
        setToast({ message: "Explanations are not available in Exam Mode until after submission.", type: 'info' });
     }
  };

  const handleToggleExamMode = () => {
    setExamMode(!examMode);
    setShowExplanation(false); // Reset explanation when switching modes
    // Reset answers and flags if switching to exam mode from practice, or vice-versa?
    // For now, let's keep them to allow reviewing practice answers before an exam.
    // If switching TO exam mode, reset timer and potentially answers/flags
    if (!examMode) { // Means we are switching TO exam mode
        setAnswers({});
        setFlaggedQuestions([]);
        setCurrentQuestionIndex(0);
        setToast({ message: "Exam Mode started. Timer is running.", type: 'info' });
    } else { // Means we are switching TO practice mode
        setToast({ message: "Switched to Practice Mode.", type: 'info' });
    }
  };

  const handleFinishExam = (timedOut) => {
    clearInterval(timerRef.current); // Stop timer
    const results = calculateResults(answers);
    setExamResults(results);
    setShowExamCompletedModal(true);
    if (timedOut) {
        setToast({ message: "Time's up! Exam submitted automatically.", type: 'info' });
    } else {
        setToast({ message: "Exam submitted successfully!", type: 'success' });
    }
  };

  const handleCloseExamCompletedModal = () => {
    setShowExamCompletedModal(false);
    // Reset state for a new session/practice
    setCurrentQuestionIndex(0);
    setAnswers({});
    setFlaggedQuestions([]);
    setShowExplanation(false);
    setExamMode(false); // Default to practice mode after finishing
    setTimeLeft(10 * 60); // Reset timer
  };

  const handleCloseToast = () => {
    setToast(null);
  };

  const handleToggleQuestionGrid = () => {
    setShowQuestionGridModal(!showQuestionGridModal);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header
        title="Aptitude Entrance Exam"
        breadcrumbs={["Home", "Exams", "Aptitude"]}
        examMode={examMode}
        timeLeft={timeLeft}
        onToggleExamMode={handleToggleExamMode}
        onToggleQuestionGrid={handleToggleQuestionGrid}
      />

      <main className="flex-grow container mx-auto p-4 flex flex-col lg:flex-row gap-6">
        {/* Question Panel (Sidebar) - visible on lg screens */}
        <div className="hidden lg:block lg:w-1/4 xl:w-1/5">
          <QuestionPanel
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            flaggedQuestions={flaggedQuestions}
            onQuestionClick={handleQuestionClick}
            onFlagToggleByIndex={handleFlagToggleByIndex}
          />
        </div>

        {/* Main Question Display Area */}
        <div className="flex-grow lg:w-3/4 xl:w-4/5">
          {currentQuestion ? (
            <QuestionDisplay
              question={currentQuestion}
              questionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              selectedAnswer={answers[currentQuestionIndex]}
              onAnswerSelect={handleAnswerSelect}
              onFlagToggle={handleFlagToggle}
              isFlagged={flaggedQuestions.includes(currentQuestionIndex)}
              onGetHint={handleGetHint}
              onGetExplanation={handleGetExplanation}
              showExplanation={showExplanation && !examMode}
              examMode={examMode}
            />
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="text-xl text-gray-700">No questions loaded.</p>
            </div>
          )}
        </div>
      </main>

      {currentQuestion && (
        <FooterNav
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            flaggedQuestions={flaggedQuestions}
            onPrevious={handlePrevious}
            onNext={handleNext}
            showPrevious={currentQuestionIndex > 0}
            showNext={currentQuestionIndex < questions.length - 1 || (examMode && currentQuestionIndex === questions.length -1) }
            onQuestionClick={handleQuestionClick}
            onFlagToggleByIndex={handleFlagToggleByIndex}
            onFinishExam={handleFinishExam}
            examMode={examMode}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={handleCloseToast} />}
      {showExamCompletedModal && (
        <ExamCompletedModal
          {...examResults}
          onClose={handleCloseExamCompletedModal}
        />
      )}
      {showQuestionGridModal && (
        <QuestionGridModal
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            flaggedQuestions={flaggedQuestions}
            onQuestionClick={handleQuestionClick}
            onClose={handleToggleQuestionGrid}
            onFlagToggleByIndex={handleFlagToggleByIndex}
        />
      )}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c7c7c7;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a3a3a3;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Export the Dashboard component as ExamDashboard for the app
const ExamDashboard = () => {
  // In a real app, questions might be fetched from an API
  // useEffect(() => {
  //  fetchQuestions().then(data => setQuestions(data));
  // }, []);
  return (
    <Dashboard questions={dummyQuestions} />
  );
};

export default ExamDashboard;
