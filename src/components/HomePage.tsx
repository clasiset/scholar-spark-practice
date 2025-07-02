import React from 'react';
import { Button } from './ui/button';
import { BookOpen, Users, Trophy, Star, GraduationCap, Clock, Target, Award } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';
import AnimatedStyles from './exam/AnimatedStyles';

interface HomePageProps {
  navigate: (page: string, data?: any) => void;
  openModal: (type: string, data?: any) => void;
  user?: any;
}

const HomePage = ({ navigate, openModal, user }: HomePageProps) => {
  return (
    <>
      <AnimatedStyles />
      <div className="relative min-h-screen overflow-hidden">
        <AnimatedBackground />
        
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <div className="animate-fade-in">
                <div className="mb-8 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-20 animate-pulse-slow"></div>
                    <div className="relative bg-white p-6 rounded-full shadow-2xl">
                      <GraduationCap className="h-16 w-16 text-blue-600 animate-bounce-slow" />
                    </div>
                  </div>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                  Master Your
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-float">
                    Future Today
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                  Transform your learning journey with our comprehensive exam preparation platform. 
                  Join thousands of students achieving their academic goals.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 animate-float-delayed"
                    onClick={() => navigate('exams')}
                  >
                    <BookOpen className="mr-3 h-6 w-6" />
                    Start Learning Now
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    onClick={() => navigate('about')}
                  >
                    <Users className="mr-3 h-6 w-6" />
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 animate-fade-in">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Why Choose 
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Scholar Spark</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Discover the features that make us the preferred choice for exam preparation
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: <Clock className="h-12 w-12 text-blue-600" />,
                    title: "Smart Timing",
                    description: "Adaptive time management with real exam conditions"
                  },
                  {
                    icon: <Target className="h-12 w-12 text-purple-600" />,
                    title: "Focused Learning",
                    description: "Personalized study paths based on your strengths"
                  },
                  {
                    icon: <Trophy className="h-12 w-12 text-yellow-600" />,
                    title: "Achievement System",
                    description: "Track progress with badges and milestones"
                  },
                  {
                    icon: <Award className="h-12 w-12 text-green-600" />,
                    title: "Expert Content",
                    description: "Curated by education professionals and teachers"
                  }
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100 animate-float-slow"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="mb-6 flex justify-center">
                      <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl animate-pulse-slow">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                {[
                  { number: "50,000+", label: "Students Helped", icon: <Users className="h-8 w-8 mx-auto mb-4" /> },
                  { number: "95%", label: "Success Rate", icon: <Trophy className="h-8 w-8 mx-auto mb-4" /> },
                  { number: "1000+", label: "Practice Questions", icon: <BookOpen className="h-8 w-8 mx-auto mb-4" /> }
                ].map((stat, index) => (
                  <div key={index} className="animate-float" style={{ animationDelay: `${index * 0.3}s` }}>
                    {stat.icon}
                    <h3 className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</h3>
                    <p className="text-blue-100 text-lg">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/90 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Ready to Excel in Your Exams?
              </h2>
              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                Join our community of successful students and start your journey to academic excellence today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-xl font-semibold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => navigate('exams')}
                >
                  <Star className="mr-3 h-6 w-6" />
                  Get Started Free
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-gray-300 hover:border-purple-500 text-gray-700 hover:text-purple-600 px-10 py-4 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  onClick={() => navigate('contact')}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;
