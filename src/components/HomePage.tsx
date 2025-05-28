
import React from 'react';
import { BookOpen, Trophy, Users, Star } from 'lucide-react';

const HomePage = ({ navigate, openModal }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Interactive Education Background */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat transform transition-transform duration-[20s] hover:scale-105"
          style={{
            backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.85), rgba(59, 130, 246, 0.75)), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`
          }}
        />
        {/* Animated overlay particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-yellow-300/30 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-white/15 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-200/40 rounded-full animate-ping delay-500"></div>
        </div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4 md:px-6 text-white">
          <div className="container mx-auto text-center">
            <div className="mb-6 md:mb-8">
              <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 p-1">
                <div className="w-full h-full bg-white rounded-full overflow-hidden">
                  <img 
                    src="/lovable-uploads/b4a3ff1d-fa0f-4e7a-8584-0b818b023773.png" 
                    alt="Ministry of Education Logo" 
                    className="w-full h-full object-cover scale-110" 
                  />
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                University <span className="text-yellow-300 animate-pulse">Entrance</span> Exams
              </h1>
              <p className="text-base md:text-xl text-blue-100 max-w-2xl md:max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed">
                Practice with subject-specific questions to prepare for your university entrance examination.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-12 md:mb-16 px-4">
              <button
                onClick={() => navigate('entranceExams')}
                className="bg-white/10 backdrop-blur-md text-white hover:bg-white/20 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 border border-white/20 group"
              >
                <BookOpen size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                <span className="hidden sm:inline">Explore Entrance Exams</span>
                <span className="sm:hidden">Entrance Exams</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
              <button
                onClick={() => navigate('entranceExams')}
                className="bg-gradient-to-r from-yellow-400/90 to-orange-500/90 hover:from-yellow-500/90 hover:to-orange-600/90 backdrop-blur-md text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 border border-white/20 group"
              >
                <Trophy size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                <span className="hidden sm:inline">Explore Exit Exams</span>
                <span className="sm:hidden">Exit Exams</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 md:mb-12">Why Choose Our Platform?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center p-4 md:p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="text-blue-200 group-hover:text-white transition-colors duration-300" size={24} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-white">Practice Mode</h3>
                <p className="text-blue-100 text-sm md:text-base">Practice with detailed explanations and AI-powered hints</p>
              </div>
              <div className="text-center p-4 md:p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="text-green-200 group-hover:text-white transition-colors duration-300" size={24} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-white">Exam Mode</h3>
                <p className="text-blue-100 text-sm md:text-base">Simulate real exam conditions with timed sessions</p>
              </div>
              <div className="text-center p-4 md:p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="text-purple-200 group-hover:text-white transition-colors duration-300" size={24} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-white">Track Progress</h3>
                <p className="text-blue-100 text-sm md:text-base">Monitor your performance and identify areas for improvement</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
