
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
        "relative flex items-center w-36 h-10 rounded-full p-1 cursor-pointer transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:ring-opacity-50 shadow-lg hover:shadow-xl transform hover:scale-105",
        examMode 
          ? "bg-gradient-to-r from-blue-500 to-blue-600 shadow-blue-200" 
          : "bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 shadow-gray-200"
      )}
      role="switch"
      aria-checked={examMode}
    >
      <span className="sr-only">Toggle between Practice and Exam mode</span>
      <div
        className={cn(
          "absolute bg-white w-8 h-8 rounded-full shadow-lg transform transition-all duration-500 ease-in-out border-2",
          examMode 
            ? "translate-x-26 border-blue-200" 
            : "translate-x-0 border-gray-200"
        )}
      />
      <div className="flex justify-between items-center w-full px-3">
        <span
          className={cn(
            "text-sm font-bold transition-all duration-500 z-10 drop-shadow-sm",
            !examMode ? "text-gray-800 scale-110" : "text-white/90"
          )}
        >
          Practice
        </span>
        <span
          className={cn(
            "text-sm font-bold transition-all duration-500 z-10 drop-shadow-sm",
            examMode ? "text-white scale-110" : "text-gray-600"
          )}
        >
          Exam
        </span>
      </div>
    </button>
  );
};

export default ModeToggle;
