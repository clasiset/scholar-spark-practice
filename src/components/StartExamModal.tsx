
import React from 'react';
import { X, FileText, Lightbulb, BookOpen } from 'lucide-react';

const StartExamModal = ({ onClose, examDetails, navigate }) => {
  const examTitle = (examDetails?.examTitle || 'exam').toLowerCase();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <FileText className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Start Your Exam</h2>
              <p className="text-gray-600">Begin your {examDetails?.subjectTitle} {examDetails?.year} {examTitle}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <BookOpen className="text-gray-600 mr-3" size={20} />
                <h3 className="font-semibold text-gray-900">Start Now</h3>
              </div>
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">Ready</span>
            </div>
            
            <div className="space-y-3 mb-4">
              <p className="text-sm text-gray-600">Features:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Practice mode with detailed explanations</li>
                <li>• AI-powered hints and assistance</li>
                <li>• Track your progress and performance</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 text-blue-800 rounded-lg p-3 flex items-start">
              <Lightbulb className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
              <p className="text-sm">You can switch between practice and exam modes anytime</p>
            </div>
          </div>

          <button
            onClick={() => { 
              navigate('examPage', examDetails); 
              onClose(); 
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Begin Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartExamModal;
