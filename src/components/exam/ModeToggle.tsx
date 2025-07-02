
import React from "react";
import { cn } from "@/lib/utils";

interface ModeToggleProps {
  examMode: boolean;
  onToggle: () => void;
}

const ModeToggle = ({ examMode, onToggle }: ModeToggleProps) => {
  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 space-x-1">
      <button
        onClick={() => !examMode && onToggle()}
        className={cn(
          "px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1",
          !examMode 
            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:ring-blue-300" 
            : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 focus:ring-gray-300"
        )}
        disabled={!examMode}
      >
        Practice
      </button>
      <button
        onClick={() => examMode && onToggle()}
        className={cn(
          "px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1",
          examMode 
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md focus:ring-blue-300" 
            : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 focus:ring-gray-300"
        )}
        disabled={examMode}
      >
        Exam
      </button>
    </div>
  );
};

export default ModeToggle;
