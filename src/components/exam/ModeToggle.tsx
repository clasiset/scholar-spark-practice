
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
        "relative flex items-center w-40 h-10 rounded-full p-1 cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        examMode ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
      )}
      role="switch"
      aria-checked={examMode}
    >
      <span className="sr-only">Toggle between Practice and Exam mode</span>
      <div
        className={cn(
          "absolute left-1 top-1 bg-white dark:bg-card w-[74px] h-8 rounded-full shadow-md transform transition-transform duration-300",
          examMode ? "translate-x-[78px]" : "translate-x-0"
        )}
      />
      <div className="flex justify-around w-full">
        <span
          className={cn(
            "z-10 text-sm font-semibold transition-colors duration-300",
            !examMode ? "text-card-foreground" : "text-white"
          )}
        >
          Practice
        </span>
        <span
          className={cn(
            "z-10 text-sm font-semibold transition-colors duration-300",
            examMode ? "text-card-foreground" : "text-white"
          )}
        >
          Exam
        </span>
      </div>
    </button>
  );
};

export default ModeToggle;
