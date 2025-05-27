
import React from 'react';

const HomePage = ({ navigate, openModal }) => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative text-white py-20 md:py-32 overflow-hidden bg-cover bg-center min-h-[60vh] flex items-center justify-center"
        style={{ backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
      >
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 to-purple-900 opacity-80"></div>

        <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10">
          <div className="bg-white bg-opacity-95 p-8 md:p-12 rounded-xl shadow-2xl max-w-2xl w-full text-gray-800">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
              Excel in Your <span className="text-indigo-700">Ethiopian Academic Journey</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Practice for university exit exams and university entrance examinations with our interactive platform. Get AI-powered feedback and track your progress.
            </p>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => navigate('entranceExams')}
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* University Exams Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* University Entrance Exams Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-gray-200 flex flex-col items-center">
              <div className="w-24 h-24 mb-6 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">University Entrance Exams</h3>
              <p className="text-gray-600 mb-6">
                Practice with subject-specific questions to prepare for your university entrance examination.
              </p>
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => navigate('entranceExams')}
              >
                Explore Entrance Exams →
              </button>
            </div>

            {/* University Exit Exams Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-gray-200 flex flex-col items-center">
              <div className="w-24 h-24 mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">University Exit Exams</h3>
              <p className="text-gray-600 mb-6">
                Prepare for your graduation examinations with comprehensive practice tests.
              </p>
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => navigate('courses')}
              >
                Coming Soon →
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
