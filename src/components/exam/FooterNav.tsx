
import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

export const FooterNav = ({ onPrevious, onNext, showPrevious, showNext, examMode, onSubmitExam }) => {
  return (
    <footer className="bg-white p-4 border-t border-gray-200 flex justify-between items-center sticky bottom-0 z-30">
      <button
        onClick={onPrevious}
        disabled={!showPrevious}
        className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200
          ${showPrevious
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
            : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200'
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
          className="px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200
                     bg-red-600 text-white hover:bg-red-700 border border-red-600
                     flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          <span>Submit Exam</span>
          <CheckCircle size={18} />
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!showNext}
          className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200
            ${showNext
              ? 'bg-blue-600 text-white hover:bg-blue-700 border border-blue-600'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
            }
            flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          `}
        >
          <span>Next</span>
          <ChevronRight size={18} />
        </button>
      )}
    </footer>
  );
};
