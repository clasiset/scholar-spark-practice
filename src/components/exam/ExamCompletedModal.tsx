
import React from 'react';
import { Trophy, CheckCircle, XCircle, Home } from 'lucide-react';

export const ExamCompletedModal = ({ score, correct, incorrect, total, onClose }) => {
  const message = score >= 60 ? "Great job! You passed the exam." : "You need more practice. Review the material and try again.";
  const messageContainerClass = "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[90] p-4">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl max-w-md w-full text-center border border-gray-200 dark:border-gray-700">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
            <Trophy size={32} className="text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Exam Completed!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">You've completed the Aptitude Test - Entrance Exam 2014.</p>

        <div className="mb-6">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">Score</p>
          <p className="text-4xl font-bold text-gray-800 dark:text-white mb-4">{score}%</p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6 overflow-hidden">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${score}%` }}
            ></div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs sm:text-sm">
            <div className="flex items-center justify-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/60 rounded-lg">
              <CheckCircle size={16} className="text-green-500" />
              <span className="text-gray-600 dark:text-gray-300 font-medium">Correct: {correct}</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/60 rounded-lg">
              <XCircle size={16} className="text-red-500" />
              <span className="text-gray-600 dark:text-gray-300 font-medium">Incorrect: {incorrect}</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/60 rounded-lg">
               <span className="text-gray-600 dark:text-gray-300 font-medium">Total: {total}</span>
            </div>
          </div>
        </div>

        <div className={`p-3 rounded-lg ${messageContainerClass} mb-6`}>
            <p className="text-sm font-semibold">{message}</p>
        </div>

        <div className="space-y-3">
            <button
                onClick={onClose}
                className="w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 py-3 px-6 rounded-xl font-bold text-base
                           border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700
                           transition-all duration-200 ease-in-out transform hover:scale-105
                           flex items-center justify-center space-x-2 shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                <Home size={20} />
                <span>Home</span>
            </button>
        </div>
      </div>
    </div>
  );
};
