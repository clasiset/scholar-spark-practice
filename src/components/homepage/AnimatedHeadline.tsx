
import React, { useState, useEffect } from 'react';

const AnimatedHeadline = () => {
  const [isVisible, setIsVisible] = useState(false);
  const headline = "Illuminate Your Future";
  const subheadline = "Transformative Online Programs for Lifelong Learners";

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-center mb-8 sm:mb-10 md:mb-12 px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
        {headline.split('').map((char, index) => (
          <span
            key={index}
            className={`inline-block transition-all duration-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ 
              transitionDelay: `${index * 50}ms`,
              color: char === ' ' ? 'transparent' : undefined
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
        <span className="block mt-2 sm:mt-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
          {["Knowledge,", "Unleashed"].map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-2 sm:mr-4">
              {word.split('').map((char, charIndex) => (
                <span
                  key={charIndex}
                  className={`inline-block transition-all duration-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ 
                    transitionDelay: `${(headline.length + wordIndex * 10 + charIndex) * 50}ms`
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </span>
      </h1>
      
      <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`} style={{ transitionDelay: '1s' }}>
        {subheadline}
      </p>
    </div>
  );
};

export default AnimatedHeadline;
