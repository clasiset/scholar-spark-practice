
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
    <div className="min-h-screen relative">
      {/* Amazing Education Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.85), rgba(59, 130, 246, 0.85)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`
        }}
      />
      
      {/* Content overlay */}
      <div className="relative z-10">
        <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
          <div className="container mx-auto px-6 py-6">
            <button
              onClick={() => navigate('entranceExams')}
              className="flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Subjects
            </button>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 shadow-md">
                <img src="/lovable-uploads/b4a3ff1d-fa0f-4e7a-8584-0b818b023773.png" alt="Ministry of Education Logo" className="w-10 h-10 rounded-full object-cover" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{subjectTitle} Entrance <span className="text-blue-600">Exam</span></h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {exams.map((exam) => (
              <div 
                key={exam.id} 
                className="bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200 p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
                onMouseEnter={() => setHoveredExam(exam.id)}
                onMouseLeave={() => setHoveredExam(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-0 hover:opacity-50 transition-opacity duration-300" />
                <div className="relative z-10">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">{exam.year}</h2>
                  <p className="text-gray-600 mb-6">{exam.title}</p>
                  
                  {hoveredExam === exam.id ? (
                    <button
                      onClick={() => onStartExam('startExam', { subjectTitle, year: exam.year, ...exam })}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Get Exam
                    </button>
                  ) : (
                    <div className="w-full py-3 text-gray-400 font-medium">
                      Hover to Get Exam
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectExamsPage;
