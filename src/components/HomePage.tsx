import React from 'react';
import { User } from '../types';
import AnimatedStyles from './exam/AnimatedStyles';

interface HomePageProps {
  navigate: (page: string, data?: any) => void;
  openModal: (type: string, data?: any) => void;
  user: User | null;
}

const HomePage = ({ navigate, openModal, user }: HomePageProps) => {
  return (
    <>
      <AnimatedStyles />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Orbs */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-40 w-80 h-80 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Floating Geometric Shapes */}
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rotate-45 rounded-lg animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}></div>
          </div>
          <div className="absolute top-3/4 right-1/4 transform translate-x-1/2 translate-y-1/2">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500/30 to-red-500/30 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4s' }}></div>
          </div>
          <div className="absolute top-1/2 left-3/4 transform translate-x-1/2 -translate-y-1/2">
            <div className="w-20 h-20 bg-gradient-to-r from-teal-500/30 to-green-500/30 rotate-12 rounded-xl animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '5s' }}></div>
          </div>
          
          {/* Animated Lines */}
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                  <stop offset="100%" stopColor="rgba(147, 51, 234, 0.3)" />
                </linearGradient>
              </defs>
              <path
                d="M0,200 Q400,100 800,200 T1600,200"
                stroke="url(#gradient1)"
                strokeWidth="2"
                fill="none"
                className="animate-pulse"
              />
              <path
                d="M0,400 Q600,300 1200,400 T2400,400"
                stroke="url(#gradient1)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: '1s' }}
              />
            </svg>
          </div>
          
          {/* Particle Effect */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/40 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Hero Section - Full Screen */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=7952&q=80')`
            }}
          ></div>
          
          {/* Enhanced Overlays */}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
          
          {/* Content */}
          <div className="relative z-20 max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl animate-fade-in">
              Master Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">Education Journey</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-lg animate-fade-in" style={{ animationDelay: '0.5s' }}>
              Join thousands of students who have achieved their dreams with our comprehensive online learning platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '1s' }}>
              <button
                onClick={() => navigate('courses')}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300/50 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute -top-1 -left-1 w-3 h-3 bg-white/30 rounded-full animate-ping"></span>
                <span className="relative z-10">Start Learning Today</span>
              </button>
              <button
                onClick={() => navigate('programs')}
                className="group relative px-8 py-4 border-2 border-white/80 text-white backdrop-blur-sm bg-white/10 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover:border-white hover:shadow-2xl hover:shadow-white/20 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></span>
                <span className="relative z-10">Explore Programs</span>
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 animate-fade-in">
              Why Choose Zehulu?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: '📚', title: 'Expert Instructors', desc: 'Learn from industry professionals with years of experience', delay: '0s' },
                { icon: '🎯', title: 'Personalized Learning', desc: 'Tailored courses that adapt to your learning style and pace', delay: '0.2s' },
                { icon: '🏆', title: 'Proven Results', desc: 'Join thousands of successful graduates', delay: '0.4s' }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 animate-fade-in group"
                  style={{ animationDelay: feature.delay }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl animate-bounce" style={{ animationDelay: feature.delay }}>{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
