
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
        "relative flex items-center w-32 h-10 rounded-full p-1 cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 border-2",
        examMode 
          ? "bg-gradient-to-r from-blue-500 to-blue-600 border-blue-400 focus:ring-blue-300" 
          : "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-gray-300"
      )}
      role="switch"
      aria-checked={examMode}
    >
      <span className="sr-only">Toggle between Practice and Exam mode</span>
      
      {/* Sliding indicator */}
      <div
        className={cn(
          "absolute w-8 h-8 bg-white rounded-full shadow-lg transition-transform duration-300 ease-in-out border",
          examMode 
            ? "translate-x-20 border-blue-200" 
            : "translate-x-0 border-gray-200"
        )}
      />
      
      {/* Labels */}
      <div className="flex justify-between items-center w-full px-3 relative z-10">
        <span
          className={cn(
            "text-sm font-medium transition-colors duration-300",
            !examMode 
              ? "text-gray-700 dark:text-gray-200" 
              : "text-white/70"
          )}
        >
          Practice
        </span>
        <span
          className={cn(
            "text-sm font-medium transition-colors duration-300",
            examMode 
              ? "text-white" 
              : "text-gray-500 dark:text-gray-400"
          )}
        >
          Exam
        </span>
      </div>
    </button>
  );
};

export default ModeToggle;
