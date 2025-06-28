
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
        "relative flex items-center w-32 h-8 rounded-full p-1 cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
        examMode ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
      )}
      role="switch"
      aria-checked={examMode}
    >
      <span className="sr-only">Toggle between Practice and Exam mode</span>
      <div
        className={cn(
          "absolute bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ease-in-out",
          examMode ? "translate-x-24" : "translate-x-0"
        )}
      />
      <div className="flex justify-between items-center w-full px-2">
        <span
          className={cn(
            "text-xs font-medium transition-colors duration-300 z-10",
            !examMode ? "text-gray-700" : "text-white"
          )}
        >
          Practice
        </span>
        <span
          className={cn(
            "text-xs font-medium transition-colors duration-300 z-10",
            examMode ? "text-white" : "text-gray-700"
          )}
        >
          Exam
        </span>
      </div>
    </button>
  );
};

export default ModeToggle;
