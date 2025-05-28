
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const SubjectExamsPage = ({ navigate, subjectTitle, onStartExam }) => {
  const [hoveredExam, setHoveredExam] = useState(null);

  const exams = [
    { id: 1, year: '2014', title: 'Entrance Exam' },
    { id: 2, year: '2015', title: 'Entrance Exam' },
    { id: 3, year: '2016', title: 'Entrance Exam' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-lg">
        <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
          <button
            onClick={() => navigate('entranceExams')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-3 md:mb-4 transition-colors group"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Subjects
          </button>
          
          <div className="flex items-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center mr-3 md:mr-4 shadow-md">
              <img src="/lovable-uploads/b4a3ff1d-fa0f-4e7a-8584-0b818b023773.png" alt="Ministry of Education Logo" className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover" />
            </div>
            <h1 className="text-xl md:text-3xl font-bold text-gray-900">
              {subjectTitle} Entrance <span className="text-blue-600">Exam</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {exams.map((exam) => (
            <div 
              key={exam.id} 
              className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 p-6 md:p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden"
              onMouseEnter={() => setHoveredExam(exam.id)}
              onMouseLeave={() => setHoveredExam(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl md:text-3xl font-bold text-white">{exam.year}</span>
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-4">{exam.title}</h2>
                <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">Practice with real exam questions</p>
                
                {hoveredExam === exam.id ? (
                  <button
                    onClick={() => onStartExam('startExam', { subjectTitle, year: exam.year, ...exam })}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 md:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-sm md:text-base"
                  >
                    Get Exam
                  </button>
                ) : (
                  <div className="w-full py-2 md:py-3 text-gray-400 font-medium text-sm md:text-base border-2 border-dashed border-gray-300 rounded-lg">
                    Hover to Get Exam
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectExamsPage;
