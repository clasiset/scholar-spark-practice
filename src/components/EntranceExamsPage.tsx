
import React from 'react';

const EntranceExamsPage = ({ navigate }) => {
  const subjects = [
    { id: 1, title: 'Mathematics', description: 'Algebra, Geometry, Calculus', icon: '📐', color: 'bg-blue-500' },
    { id: 2, title: 'Physics', description: 'Mechanics, Thermodynamics, Optics', icon: '⚛️', color: 'bg-purple-500' },
    { id: 3, title: 'Chemistry', description: 'Organic, Inorganic, Physical', icon: '🧪', color: 'bg-green-500' },
    { id: 4, title: 'Biology', description: 'Botany, Zoology, Genetics', icon: '🧬', color: 'bg-red-500' },
    { id: 5, title: 'English', description: 'Grammar, Literature, Writing', icon: '📚', color: 'bg-yellow-500' },
    { id: 6, title: 'History', description: 'Ethiopian History, World History', icon: '🏛️', color: 'bg-indigo-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">University Entrance Exams</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your subject and start practicing for Ethiopian university entrance examinations. 
            Our AI-powered platform provides detailed explanations and tracks your progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => navigate('subjectExams', { subjectTitle: subject.title })}
            >
              <div className={`${subject.color} text-white p-6 rounded-t-xl`}>
                <div className="text-4xl mb-2">{subject.icon}</div>
                <h3 className="text-2xl font-bold">{subject.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{subject.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Available exams: 10</span>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition duration-300">
                    Start Practice →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EntranceExamsPage;
