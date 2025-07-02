
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Your
            <span className="block text-yellow-300"> Expert Mentors</span>
          </h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Learn from industry leaders who bring real-world experience to every lesson
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {instructors.map((instructor, index) => (
            <Card 
              key={instructor.name} 
              className="group relative overflow-hidden bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105"
              style={{
                transform: `translateY(${instructor.parallaxOffset}px)`,
                animationDelay: `${index * 0.2}s`
              }}
            >
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-white/50 group-hover:ring-yellow-300 transition-all duration-300">
                    <img 
                      src={instructor.image} 
                      alt={instructor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-sm">⭐</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{instructor.name}</h3>
                <p className="text-blue-200 mb-4 font-semibold">{instructor.expertise}</p>
                
                <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <blockquote className="text-white/90 italic mb-3">
                    "{instructor.quote}"
                  </blockquote>
                  <p className="text-blue-200 text-sm">{instructor.experience}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 backdrop-blur-md border border-white/30 hover:border-white/50">
            View All Instructors
          </button>
        </div>
      </div>
    </section>
  );
};

export default InstructorSpotlight;
