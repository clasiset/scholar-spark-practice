
import React from 'react';
import { BookOpen, Trophy, Users, Star } from 'lucide-react';

const HomePage = ({ navigate, openModal }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <img src="/lovable-uploads/273f4172-a5e6-48b1-af34-164c5dcea982.png" alt="University Logo" className="w-12 h-12 rounded-full object-cover" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              University <span className="text-blue-600">Entrance</span> Exams
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Practice with subject-specific questions to prepare for your university entrance examination.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => navigate('entranceExams')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <BookOpen size={24} />
              Explore Entrance Exams →
            </button>
            <button
              onClick={() => navigate('entranceExams')}
              className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <Trophy size={24} />
              Explore Exit Exams →
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Practice Mode</h3>
              <p className="text-gray-600">Practice with detailed explanations and AI-powered hints</p>
            </div>
            <div className="text-center p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Exam Mode</h3>
              <p className="text-gray-600">Simulate real exam conditions with timed sessions</p>
            </div>
            <div className="text-center p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
              <p className="text-gray-600">Monitor your performance and identify areas for improvement</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
