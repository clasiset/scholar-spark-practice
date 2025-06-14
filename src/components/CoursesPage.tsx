
import React from 'react';
import BackButton from './BackButton';

const CoursesPage = ({ openModal, goBack, previousPageName }: { openModal: (type: string, data?: any) => void, goBack?: () => void, previousPageName?: string | null }) => {
  const courses = [
    { id: 1, title: 'Advanced Mathematics', description: 'Comprehensive math preparation', enrolled: 1200 },
    { id: 2, title: 'Physics Fundamentals', description: 'Essential physics concepts', enrolled: 800 },
    { id: 3, title: 'Chemistry Basics', description: 'Core chemistry principles', enrolled: 950 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <BackButton onClick={goBack} previousPageName={previousPageName} />
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Available Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <p className="text-sm text-gray-500 mb-4">{course.enrolled} students enrolled</p>
              <button
                onClick={() => openModal('enroll', course.title)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
