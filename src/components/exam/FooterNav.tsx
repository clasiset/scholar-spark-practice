
import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

export const FooterNav = ({ onPrevious, onNext, showPrevious, showNext, examMode, onSubmitExam }) => {
  return (
    <footer className="bg-white shadow-lg border-t border-gray-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <button
          onClick={onPrevious}
          disabled={!showPrevious}
          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ease-in-out
            ${showPrevious
              ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 shadow-lg hover:shadow-xl transform hover:scale-105'
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
              className="px-8 py-3 rounded-xl font-bold text-sm transition-all duration-200 ease-in-out
              bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transform hover:scale-105
              flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
          >
              <span>Submit Exam</span>
              <CheckCircle size={18} />
          </button>
        ) : (
          <button
              onClick={onNext}
              disabled={!showNext}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ease-in-out
              ${showNext
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-blue-300 text-white cursor-not-allowed opacity-50'
              }
              flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
              `}
          >
              <span>Next</span>
              <ChevronRight size={18} />
          </button>
        )}
      </div>
    </footer>
  );
};
