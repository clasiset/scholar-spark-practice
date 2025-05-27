
import React from 'react';

const StartExamModal = ({ onClose, examDetails, navigate }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">Start Your Exam</h2>
          <p className="text-gray-700 mb-6">Begin your {examDetails?.subjectTitle} {examDetails?.year} entrance exam</p>
        </div>
        <div className="bg-gray-50 rounded-md p-6 mb-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="font-semibold text-lg text-gray-800">Start Now</h3>
            </div>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Ready</span>
          </div>
          <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
            <li>Practice mode with detailed explanations</li>
            <li>AI-powered hints and assistance</li>
            <li>Track your progress and performance</li>
          </ul>
          <div className="bg-yellow-100 text-yellow-800 rounded-md p-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm">You can switch between practice and exam modes anytime</p>
          </div>
        </div>
        <button
          onClick={() => { 
            navigate('examPage', examDetails); 
            onClose(); 
          }}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition duration-300"
        >
          Begin Exam
        </button>
      </div>
    </div>
  );
};

export default StartExamModal;
