
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const LearningJourneyVisualizer = () => {
  const { ref, inView } = useInView({ threshold: 0.3 });
  const [animatedNodes, setAnimatedNodes] = useState<number[]>([]);

  const journeySteps = [
    { id: 1, title: 'Enroll', description: 'Choose your perfect course', icon: '📚' },
    { id: 2, title: 'Learn', description: 'Interactive lessons & videos', icon: '🎓' },
    { id: 3, title: 'Practice', description: 'Hands-on projects & exercises', icon: '⚡' },
    { id: 4, title: 'Achieve', description: 'Earn certificates & badges', icon: '🏆' },
    { id: 5, title: 'Connect', description: 'Join our community network', icon: '🤝' }
  ];

  const stats = [
    { number: 20000, label: 'Graduates', suffix: '+' },
    { number: 95, label: 'Job Placement Rate', suffix: '%' },
    { number: 100, label: 'Expert Instructors', suffix: '+' }
  ];

  const [currentStats, setCurrentStats] = useState(stats.map(() => 0));

  useEffect(() => {
    if (inView) {
      // Animate journey nodes
      journeySteps.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedNodes(prev => [...prev, index]);
        }, index * 300);
      });

      // Animate statistics
      stats.forEach((stat, index) => {
        const duration = 2000;
        const steps = 60;
        const increment = stat.number / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.number) {
            current = stat.number;
            clearInterval(timer);
          }
          setCurrentStats(prev => {
            const newStats = [...prev];
            newStats[index] = Math.floor(current);
            return newStats;
          });
        }, duration / steps);
      });
    }
  }, [inView]);

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Your Learning 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Journey</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            From enrollment to achievement - see how we guide you every step of the way
          </p>
        </div>

        {/* Animated Timeline */}
        <div className="relative mb-12 sm:mb-16 md:mb-20">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 sm:w-1 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
          
          {journeySteps.map((step, index) => (
            <div
              key={step.id}
              className={`relative flex items-center mb-12 sm:mb-16 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className={`w-full sm:w-1/2 ${index % 2 === 0 ? 'sm:pr-8 md:pr-12 text-center sm:text-right' : 'sm:pl-8 md:pl-12 text-center sm:text-left'}`}>
                <div className={`transition-all duration-500 ${
                  animatedNodes.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{step.description}</p>
                </div>
              </div>
              
              <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full shadow-2xl flex items-center justify-center border-2 sm:border-4 border-blue-600">
                <span className={`text-lg sm:text-2xl transition-all duration-500 ${
                  animatedNodes.includes(index) ? 'scale-100' : 'scale-0'
                }`}>
                  {step.icon}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {currentStats[index].toLocaleString()}{stat.suffix}
              </div>
              <div className="text-gray-600 text-base sm:text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningJourneyVisualizer;
