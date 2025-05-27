
import React from 'react';
import { Trophy, CheckCircle, XCircle, Settings, Home } from 'lucide-react';

export const ExamCompletedModal = ({ score, correct, incorrect, total, onClose, onRestart }) => {
  const message = score >= 60 ? "Great job! You passed the exam." : "You need more practice. Review the material and try again.";
  const messageColor = score >= 60 ? "text-green-600" : "text-red-600";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[90] p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <Trophy size={56} className="text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Exam Completed!</h2>
        <p className="text-gray-600 mb-6">You've completed the Aptitude Test - Entrance Exam 2014.</p>

        <div className="mb-6">
          <p className="text-xl font-semibold text-gray-800 mb-2">Score: {score}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${score}%` }}
            ></div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between text-gray-700 font-medium text-sm space-y-1 sm:space-y-0">
            <span className="flex items-center justify-center sm:justify-start">
              <CheckCircle size={16} className="text-green-500 mr-1" /> Correct: {correct}
            </span>
            <span className="flex items-center justify-center sm:justify-start">
              <XCircle size={16} className="text-red-500 mr-1" /> Incorrect: {incorrect}
            </span>
            <span>Total: {total}</span>
          </div>
        </div>

        <p className={`text-md font-medium ${messageColor} mb-6`}>{message}</p>

        <div className="space-y-3">
            <button
                onClick={onRestart}
                className="w-full bg-blue-500 text-white py-2.5 px-4 rounded-md font-semibold text-base
                           hover:bg-blue-600 transition-colors duration-200 ease-in-out
                           flex items-center justify-center space-x-2 shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                <Settings size={18} />
                <span>Restart Exam</span>
            </button>
            <button
                onClick={onClose}
                className="w-full bg-gray-500 text-white py-2.5 px-4 rounded-md font-semibold text-base
                           hover:bg-gray-600 transition-colors duration-200 ease-in-out
                           flex items-center justify-center space-x-2 shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
                <Home size={18} />
                <span>Close Results</span>
            </button>
        </div>
      </div>
    </div>
  );
};
