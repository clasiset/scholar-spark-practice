
import React from 'react';

const AnimatedStyles = () => (
  <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    @keyframes float-delayed {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      33% { transform: translateY(-15px) translateX(10px); }
      66% { transform: translateY(-25px) translateX(-10px); }
    }
    
    @keyframes float-slow {
      0%, 100% { transform: translateY(0px) scale(1); }
      50% { transform: translateY(-30px) scale(1.05); }
    }
    
    @keyframes twinkle {
      0%, 100% { opacity: 0; transform: scale(0); }
      50% { opacity: 1; transform: scale(1); }
    }
    
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes pulse-slow {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.1); }
    }
    
    @keyframes bounce-slow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    
    .animate-float-delayed {
      animation: float-delayed 8s ease-in-out infinite;
    }
    
    .animate-float-slow {
      animation: float-slow 10s ease-in-out infinite;
    }
    
    .animate-twinkle {
      animation: twinkle 4s ease-in-out infinite;
    }
    
    .animate-spin-slow {
      animation: spin-slow 20s linear infinite;
    }
    
    .animate-pulse-slow {
      animation: pulse-slow 4s ease-in-out infinite;
    }
    
    .animate-bounce-slow {
      animation: bounce-slow 6s ease-in-out infinite;
    }
    
    .animate-fade-in {
      animation: fadeIn 1s ease-out forwards;
      opacity: 0;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `}</style>
);

export default AnimatedStyles;
