
import React from 'react';
import { Card, CardContent } from '../ui/card';

const InstructorSpotlight = () => {
  const instructors = [
    {
      name: 'Dr. Sarah Chen',
      expertise: 'AI & Machine Learning',
      image: 'https://i.pravatar.cc/300?u=sarah-chen',
      quote: 'Empowering students to shape the future of technology',
      experience: '15+ years industry experience',
      parallaxOffset: 0
    },
    {
      name: 'Prof. Michael Rodriguez',
      expertise: 'Digital Marketing',
      image: 'https://i.pravatar.cc/300?u=michael-rodriguez',
      quote: 'Marketing is about telling stories that resonate',
      experience: 'Led campaigns for Fortune 500 companies',
      parallaxOffset: -20
    },
    {
      name: 'Dr. Emily Watson',
      expertise: 'Leadership & Management',
      image: 'https://i.pravatar.cc/300?u=emily-watson',
      quote: 'Great leaders create more leaders, not followers',
      experience: 'Former CEO, bestselling author',
      parallaxOffset: -40
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Meet Your
            <span className="block text-yellow-300"> Expert Mentors</span>
          </h2>
          <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto">
            Learn from industry leaders who bring real-world experience to every lesson
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {instructors.map((instructor, index) => (
            <Card 
              key={instructor.name} 
              className="group relative overflow-hidden bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105"
              style={{
                transform: `translateY(${instructor.parallaxOffset}px)`,
                animationDelay: `${index * 0.2}s`
              }}
            >
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="relative mb-4 sm:mb-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full overflow-hidden ring-4 ring-white/50 group-hover:ring-yellow-300 transition-all duration-300">
                    <img 
                      src={instructor.image} 
                      alt={instructor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs sm:text-sm">⭐</span>
                  </div>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{instructor.name}</h3>
                <p className="text-blue-200 mb-3 sm:mb-4 font-semibold text-sm sm:text-base">{instructor.expertise}</p>
                
                <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <blockquote className="text-white/90 italic mb-2 sm:mb-3 text-sm sm:text-base">
                    "{instructor.quote}"
                  </blockquote>
                  <p className="text-blue-200 text-xs sm:text-sm">{instructor.experience}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <button className="bg-white/20 hover:bg-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 backdrop-blur-md border border-white/30 hover:border-white/50 text-sm sm:text-base">
            View All Instructors
          </button>
        </div>
      </div>
    </section>
  );
};

export default InstructorSpotlight;
