
import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, HelpCircle, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const FooterNav = ({ onPrevious, onNext, showPrevious, showNext, examMode, onSubmitExam }) => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800 shadow-lg sticky bottom-0 z-30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center gap-4">
          {/* Left side - Previous button */}
          <Button
            onClick={onPrevious}
            disabled={!showPrevious}
            variant="outline"
            size="default"
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 border-2 font-semibold shadow-md hover:shadow-lg transform hover:scale-105",
              showPrevious 
                ? "border-blue-200 bg-gradient-to-r from-white to-blue-50 text-blue-600 hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 dark:from-slate-800 dark:to-slate-700 dark:border-blue-400 dark:text-blue-400 dark:hover:from-slate-700 dark:hover:to-slate-600" 
                : "opacity-40 cursor-not-allowed border-gray-200 text-gray-400 dark:border-gray-600 dark:text-gray-500"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold">Previous</span>
          </Button>

          {/* Center - Help buttons (only in practice mode) */}
          {!examMode && (
            <div className="flex gap-3">
              <Button
                variant="default"
                size="default"
                className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold border-2 border-blue-400 hover:border-blue-500"
              >
                <HelpCircle className="w-5 h-5" />
                <span className="hidden sm:inline font-semibold">Need a hint?</span>
                <span className="sm:hidden font-semibold">Hint</span>
              </Button>
              <Button
                variant="secondary"
                size="default"
                className="bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 hover:from-purple-200 hover:via-indigo-200 hover:to-blue-200 text-purple-700 dark:from-purple-900/40 dark:via-indigo-900/40 dark:to-blue-900/40 dark:text-purple-300 dark:hover:from-purple-800/50 dark:hover:via-indigo-800/50 dark:hover:to-blue-800/50 px-6 py-3 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-2 border-purple-200 dark:border-purple-600 hover:border-purple-300 dark:hover:border-purple-500 font-semibold"
              >
                <BookOpen className="w-5 h-5" />
                <span className="hidden sm:inline font-semibold">Get Explanation</span>
                <span className="sm:hidden font-semibold">Explain</span>
              </Button>
            </div>
          )}

          {/* Right side - Next/Submit button */}
          {examMode ? (
            <Button
              onClick={onSubmitExam}
              className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 text-white px-8 py-3 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl font-semibold transition-all duration-300 transform hover:scale-105 border-2 border-red-400 hover:border-red-500"
            >
              <span>Submit Exam</span>
              <CheckCircle className="w-5 h-5" />
            </Button>
          ) : (
            <Button
              onClick={onNext}
              disabled={!showNext}
              className={cn(
                "px-8 py-3 rounded-full flex items-center gap-2 font-semibold transition-all duration-300 transform border-2 shadow-md hover:shadow-lg",
                showNext
                  ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white hover:scale-105 border-blue-400 hover:border-blue-500"
                  : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-400 cursor-not-allowed border-gray-200 dark:from-gray-700 dark:to-gray-800 dark:text-gray-500 dark:border-gray-600"
              )}
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </footer>
  );
};
