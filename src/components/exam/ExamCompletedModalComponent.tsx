
import React from 'react';
import { Trophy, CheckCircle, XCircle, Home } from 'lucide-react';

interface ExamCompletedModalProps {
  score: number;
  correct: number;
  incorrect: number;
  total: number;
  onClose: () => void;
}

export const ExamCompletedModalComponent = ({ score, correct, incorrect, total, onClose }: ExamCompletedModalProps) => {
  const message = score >= 60 ? "Great job! You passed the exam." : "You need more practice. Review the material and try again.";
  const messageColor = score >= 60 ? "text-green-700" : "text-red-700";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <Trophy size={64} className="text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Exam Completed!</h2>
        <p className="text-gray-600 mb-6">You've completed the Aptitude Entrance Exam.</p>

        <div className="mb-6">
          <p className="text-xl font-semibold text-gray-800 mb-2">Score: {score}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${score}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-gray-700 font-medium text-sm">
            <span className="flex items-center">
              <CheckCircle size={16} className="text-green-500 mr-1" /> Correct: {correct}
            </span>
            <span className="flex items-center">
              <XCircle size={16} className="text-red-500 mr-1" /> Incorrect: {incorrect}
            </span>
            <span>Total: {total}</span>
          </div>
        </div>

        <p className={`text-md font-medium ${messageColor} mb-6`}>{message}</p>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-lg
                     hover:bg-blue-700 transition-colors duration-200 ease-in-out
                     flex items-center justify-center space-x-2 shadow-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <Home size={20} />
          <span>Home / Restart</span>
        </button>
      </div>
    </div>
  );
};
