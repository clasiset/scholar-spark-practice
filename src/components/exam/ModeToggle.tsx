
import React from "react";
import { cn } from "@/lib/utils";

interface ModeToggleProps {
  examMode: boolean;
  onToggle: () => void;
}

const ModeToggle = ({ examMode, onToggle }: ModeToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "relative flex items-center w-36 h-12 rounded-full p-1 cursor-pointer transition-all duration-500 focus:outline-none focus:ring-4 shadow-lg hover:shadow-xl transform hover:scale-105 border",
        examMode 
          ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-blue-200 border-blue-400 focus:ring-blue-200/50" 
          : "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 shadow-gray-200 border-gray-300 dark:border-gray-600 focus:ring-gray-200/50"
      )}
      role="switch"
      aria-checked={examMode}
    >
      <span className="sr-only">Toggle between Practice and Exam mode</span>
      <div
        className={cn(
          "absolute bg-white w-10 h-10 rounded-full shadow-xl transform transition-all duration-500 ease-in-out border-2 flex items-center justify-center",
          examMode 
            ? "translate-x-24 border-blue-200 bg-gradient-to-br from-white to-blue-50" 
            : "translate-x-0 border-gray-200 bg-gradient-to-br from-white to-gray-50"
        )}
      >
        <div className={cn(
          "w-6 h-6 rounded-full transition-all duration-300",
          examMode 
            ? "bg-gradient-to-br from-blue-400 to-blue-600 shadow-md" 
            : "bg-gradient-to-br from-gray-300 to-gray-500 shadow-sm"
        )}></div>
      </div>
      <div className="flex justify-between items-center w-full px-4 relative z-10">
        <span
          className={cn(
            "text-sm font-bold transition-all duration-500 drop-shadow-sm",
            !examMode ? "text-gray-800 dark:text-gray-200 scale-110 font-extrabold" : "text-white/90 scale-90"
          )}
        >
          Practice
        </span>
        <span
          className={cn(
            "text-sm font-bold transition-all duration-500 drop-shadow-sm",
            examMode ? "text-white scale-110 font-extrabold" : "text-gray-600 dark:text-gray-400 scale-90"
          )}
        >
          Exam
        </span>
      </div>
    </button>
  );
};

export default ModeToggle;
