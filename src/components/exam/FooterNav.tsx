
import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

export const FooterNav = ({ onPrevious, onNext, showPrevious, showNext, examMode, onSubmitExam }) => {
  return (
    <footer className="bg-white p-4 border-t border-gray-200 shadow-lg flex justify-between items-center sticky bottom-0 z-30">
      <button
        onClick={onPrevious}
        disabled={!showPrevious}
        className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out transform
          ${showPrevious
            ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white hover:from-gray-500 hover:to-gray-600 shadow-md hover:scale-105'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }
          flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50
        `}
      >
        <ChevronLeft size={18} />
        <span>Previous</span>
      </button>
      
      {examMode ? (
         <button
            onClick={onSubmitExam}
            className="px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out transform hover:scale-105
                       bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-lg
                       flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
            <span>Submit Exam</span>
            <CheckCircle size={18} />
        </button>
      ) : (
        <button
            onClick={onNext}
            disabled={!showNext}
            className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out transform
            ${showNext
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:scale-105'
                : 'bg-gradient-to-r from-indigo-300 to-purple-400 text-white cursor-not-allowed opacity-50'
            }
            flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
            `}
        >
            <span>Next</span>
            <ChevronRight size={18} />
        </button>
      )}
    </footer>
  );
};
