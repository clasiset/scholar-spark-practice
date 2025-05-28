
import React from 'react';
import { BookOpen, Trophy, Users, Star } from 'lucide-react';

const HomePage = ({ navigate, openModal }) => {
  return (
    <div className="min-h-screen relative">
      {/* Education Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.9)), url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`
        }}
      />
      
      {/* Content overlay */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-6 text-white">
          <div className="container mx-auto text-center">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-2xl">
                <img src="/lovable-uploads/b4a3ff1d-fa0f-4e7a-8584-0b818b023773.png" alt="Ministry of Education Logo" className="w-20 h-20 rounded-full object-cover" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                University <span className="text-yellow-300">Entrance</span> Exams
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Practice with subject-specific questions to prepare for your university entrance examination.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => navigate('entranceExams')}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <BookOpen size={24} />
                Explore Entrance Exams →
              </button>
              <button
                onClick={() => navigate('entranceExams')}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Trophy size={24} />
                Explore Exit Exams →
              </button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-6 bg-white/95 backdrop-blur-sm">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Our Platform?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Practice Mode</h3>
                <p className="text-gray-600">Practice with detailed explanations and AI-powered hints</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Exam Mode</h3>
                <p className="text-gray-600">Simulate real exam conditions with timed sessions</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
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
    </div>
  );
};

export default HomePage;
