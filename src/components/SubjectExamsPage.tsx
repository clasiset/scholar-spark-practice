
import React from 'react';

const SubjectExamsPage = ({ navigate, subjectTitle, onStartExam }) => {
  const exams = [
    { id: 1, year: '2023', difficulty: 'Medium', questions: 40, duration: '120 min' },
    { id: 2, year: '2022', difficulty: 'Hard', questions: 45, duration: '150 min' },
    { id: 3, year: '2021', difficulty: 'Easy', questions: 35, duration: '90 min' },
    { id: 4, year: '2020', difficulty: 'Medium', questions: 40, duration: '120 min' },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <button
            onClick={() => navigate('entranceExams')}
            className="text-indigo-600 hover:text-indigo-800 mb-4 inline-flex items-center"
          >
            ← Back to Subjects
          </button>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{subjectTitle} Entrance Exams</h1>
          <p className="text-xl text-gray-600">
            Practice with past examination papers and improve your performance with detailed feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exams.map((exam) => (
            <div key={exam.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">{exam.year} Exam</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(exam.difficulty)}`}>
                    {exam.difficulty}
                  </span>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Questions:</span>
                    <span className="font-semibold">{exam.questions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold">{exam.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subject:</span>
                    <span className="font-semibold">{subjectTitle}</span>
                  </div>
                </div>

                <button
                  onClick={() => onStartExam('startExam', { subjectTitle, year: exam.year, ...exam })}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300 transform hover:scale-105"
                >
                  Start Exam
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectExamsPage;
