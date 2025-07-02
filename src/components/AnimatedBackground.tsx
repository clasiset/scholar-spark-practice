
import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large gradient orbs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-20 -right-40 w-96 h-96 bg-gradient-to-l from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-gradient-to-t from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-float-slow"></div>
      
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/40 rounded-full animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        />
      ))}
      
      {/* Geometric shapes */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-blue-400/30 rotate-45 animate-spin-slow"></div>
      <div className="absolute top-3/4 right-20 w-6 h-6 bg-purple-400/30 rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-pink-400/30 rotate-12 animate-bounce-slow"></div>
    </div>
  );
};

export default AnimatedBackground;
