
import React, { useState, useEffect } from 'react';

const DynamicBackground = () => {
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'day' | 'evening'>('day');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      setTimeOfDay('morning');
    } else if (hour >= 12 && hour < 18) {
      setTimeOfDay('day');
    } else {
      setTimeOfDay('evening');
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getBackgroundGradient = () => {
    switch (timeOfDay) {
      case 'morning':
        return 'from-orange-200/30 via-yellow-100/20 to-pink-200/30';
      case 'day':
        return 'from-blue-200/30 via-indigo-100/20 to-purple-200/30';
      case 'evening':
        return 'from-purple-300/30 via-indigo-200/20 to-blue-300/30';
      default:
        return 'from-blue-200/30 via-indigo-100/20 to-purple-200/30';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000`} />
      
      {/* Animated particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/40 rounded-full animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
            transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.01}px, ${(mousePosition.y - window.innerHeight / 2) * 0.01}px)`
          }}
        />
      ))}
      
      {/* Data stream effect */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse"
            style={{
              left: `${i * 25}%`,
              top: `${20 + i * 15}%`,
              width: '200px',
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DynamicBackground;
