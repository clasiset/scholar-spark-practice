import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, HelpCircle, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const FooterNav = ({ onPrevious, onNext, showPrevious, showNext, examMode, onSubmitExam }) => {
  return (
    <footer className="bg-background border-t shadow-lg sticky bottom-0 z-30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center gap-4">
          {/* Left side - Previous button */}
          <Button
            onClick={onPrevious}
            disabled={!showPrevious}
            variant={showPrevious ? "outline" : "ghost"}
            size="default"
            className={cn(
              "flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-200",
              showPrevious 
                ? "hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-600" 
                : "opacity-50 cursor-not-allowed"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="font-medium">Previous</span>
          </Button>

          {/* Center - Help buttons (only in practice mode) */}
          {!examMode && (
            <div className="flex gap-2">
              <Button
                variant="default"
                size="default"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm"
              >
                <HelpCircle className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">Need a hint?</span>
                <span className="sm:hidden font-medium">Hint</span>
              </Button>
              <Button
                variant="secondary"
                size="default"
                className="bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50 px-4 py-2 rounded-full flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">Get Explanation</span>
                <span className="sm:hidden font-medium">Explain</span>
              </Button>
            </div>
          )}

          {/* Right side - Next/Submit button */}
          {examMode ? (
            <Button
              onClick={onSubmitExam}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-sm font-medium"
            >
              <span>Submit Exam</span>
              <CheckCircle className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={onNext}
              disabled={!showNext}
              className={cn(
                "px-6 py-2 rounded-full flex items-center gap-2 font-medium transition-all duration-200",
                showNext
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
              )}
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </footer>
  );
};
