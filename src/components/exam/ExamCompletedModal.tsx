
import React from 'react';
import { Trophy, CheckCircle, XCircle, Settings, Home } from 'lucide-react';

export const ExamCompletedModal = ({ score, correct, incorrect, total, onClose, onRestart }) => {
  const message = score >= 60 ? "Great job! You passed the exam." : "You need more practice. Review the material and try again.";
  const messageColor = score >= 60 ? "text-emerald-600" : "text-red-600";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[90] p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-gray-200">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full">
            <Trophy size={48} className="text-indigo-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Exam Completed!</h2>
        <p className="text-gray-600 mb-8">You've completed the Aptitude Test - Entrance Exam 2014.</p>

        <div className="mb-8">
          <p className="text-2xl font-bold text-gray-800 mb-4">Score: {score}%</p>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${score}%` }}
            ></div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm font-semibold">
            <div className="flex flex-col items-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <CheckCircle size={20} className="text-emerald-500 mb-1" />
              <span className="text-emerald-700">Correct</span>
              <span className="text-emerald-800 text-lg font-bold">{correct}</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-red-50 rounded-lg border border-red-200">
              <XCircle size={20} className="text-red-500 mb-1" />
              <span className="text-red-700">Incorrect</span>
              <span className="text-red-800 text-lg font-bold">{incorrect}</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-gray-500 mb-1">📝</span>
              <span className="text-gray-700">Total</span>
              <span className="text-gray-800 text-lg font-bold">{total}</span>
            </div>
          </div>
        </div>

        <p className={`text-lg font-semibold ${messageColor} mb-8`}>{message}</p>

        <div className="space-y-3">
            <button
                onClick={onRestart}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-xl font-bold text-base
                           hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 ease-in-out transform hover:scale-105
                           flex items-center justify-center space-x-2 shadow-lg
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
                <Settings size={20} />
                <span>Restart Exam</span>
            </button>
            <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-xl font-bold text-base
                           hover:from-gray-600 hover:to-gray-700 transition-all duration-200 ease-in-out transform hover:scale-105
                           flex items-center justify-center space-x-2 shadow-lg
                           focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
                <Home size={20} />
                <span>Close Results</span>
            </button>
        </div>
      </div>
    </div>
  );
};
