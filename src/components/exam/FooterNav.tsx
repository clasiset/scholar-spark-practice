
import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

export const FooterNav = ({ onPrevious, onNext, showPrevious, showNext, examMode, onSubmitExam }) => {
  return (
    <footer className="bg-white p-3 border-t border-gray-200 shadow-sm flex justify-between items-center sticky bottom-0 z-30">
      <button
        onClick={onPrevious}
        disabled={!showPrevious}
        className={`px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 ease-in-out
          ${showPrevious
            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-sm'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }
          flex items-center space-x-1.5 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50
        `}
      >
        <ChevronLeft size={18} />
        <span>Previous</span>
      </button>
      
      {examMode ? (
         <button
            onClick={onSubmitExam}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 ease-in-out
            bg-red-500 text-white hover:bg-red-600 shadow-sm
            flex items-center space-x-1.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
            `}
        >
            <span>Submit Exam</span>
            <CheckCircle size={18} />
        </button>
      ) : (
        <button
            onClick={onNext}
            disabled={!showNext}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 ease-in-out
            ${showNext
                ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm'
                : 'bg-blue-300 text-white cursor-not-allowed opacity-50'
            }
            flex items-center space-x-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
            `}
        >
            <span>Next</span>
            <ChevronRight size={18} />
        </button>
      )}
    </footer>
  );
};
