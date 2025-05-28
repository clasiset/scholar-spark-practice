
import React from 'react';
import { ArrowLeft } from 'lucide-react';

const SubjectExamsPage = ({ navigate, subjectTitle, onStartExam }) => {
  const exams = [
    { id: 1, year: '2014', title: 'Entrance Exam' },
    { id: 2, year: '2015', title: 'Entrance Exam' },
    { id: 3, year: '2016', title: 'Entrance Exam' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-6">
          <button
            onClick={() => navigate('entranceExams')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Subjects
          </button>
          
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
              <img src="/lovable-uploads/273f4172-a5e6-48b1-af34-164c5dcea982.png" alt="University Logo" className="w-8 h-8 rounded-full object-cover" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{subjectTitle} Entrance <span className="text-blue-600">Exam</span></h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {exams.map((exam) => (
            <div key={exam.id} className="bg-white rounded-lg border border-gray-200 p-8 text-center hover:shadow-md transition-shadow">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{exam.year}</h2>
              <p className="text-gray-600 mb-6">{exam.title}</p>
              <button
                onClick={() => onStartExam('startExam', { subjectTitle, year: exam.year, ...exam })}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
              >
                Start Exam
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectExamsPage;
