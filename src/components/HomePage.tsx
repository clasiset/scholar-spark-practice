import React from 'react';
import { User } from '../types';

interface HomePageProps {
  navigate: (page: string, data?: any) => void;
  openModal: (type: string, data?: any) => void;
  user: User | null;
}

const HomePage = ({ navigate, openModal, user }: HomePageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900">
      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=7952&q=80')`
          }}
        ></div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
            Master Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Education Journey</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-lg">
            Join thousands of students who have achieved their dreams with our comprehensive online learning platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('courses')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg font-semibold"
            >
              Start Learning Today
            </button>
            <button
              onClick={() => navigate('programs')}
              className="px-8 py-4 border-2 border-white/80 text-white backdrop-blur-sm bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 text-lg font-semibold"
            >
              Explore Programs
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose Zehulu?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Expert Instructors</h3>
              <p className="text-gray-600 dark:text-gray-300">Learn from industry professionals with years of experience</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Personalized Learning</h3>
              <p className="text-gray-600 dark:text-gray-300">Tailored courses that adapt to your learning style and pace</p>
            </div>
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Proven Results</h3>
              <p className="text-gray-600 dark:text-gray-300">Join thousands of successful graduates</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
