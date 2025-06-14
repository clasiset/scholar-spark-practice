
import React from 'react';
import BackButton from './BackButton';

const CoursesPage = ({ openModal, goBack, previousPageName }: { openModal: (type: string, data?: any) => void, goBack?: () => void, previousPageName?: string | null }) => {
  const courses = [
    { id: 1, title: 'Advanced Mathematics', description: 'Comprehensive math preparation', enrolled: 1200 },
    { id: 2, title: 'Physics Fundamentals', description: 'Essential physics concepts', enrolled: 800 },
    { id: 3, title: 'Chemistry Basics', description: 'Core chemistry principles', enrolled: 950 },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="container mx-auto px-6">
        <BackButton onClick={goBack} previousPageName={previousPageName} />
        <h1 className="text-4xl font-bold text-center mb-12">Available Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-card rounded-xl shadow-lg p-6 flex flex-col">
              <h3 className="text-xl font-bold mb-4">{course.title}</h3>
              <p className="text-muted-foreground mb-4 flex-grow">{course.description}</p>
              <p className="text-sm text-muted-foreground mb-4">{course.enrolled} students enrolled</p>
              <button
                onClick={() => openModal('enroll', course.title)}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-2 px-4 rounded-lg transition duration-300"
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
