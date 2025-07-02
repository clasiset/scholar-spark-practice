
import React from 'react';
import { Button } from './ui/button';
import { Star } from 'lucide-react';
import AnimatedStyles from './exam/AnimatedStyles';
import { User } from '@/types';
import DynamicBackground from './homepage/DynamicBackground';
import AnimatedHeadline from './homepage/AnimatedHeadline';
import InteractiveCTACluster from './homepage/InteractiveCTACluster';
import CourseDiscoveryHub from './homepage/CourseDiscoveryHub';
import LearningJourneyVisualizer from './homepage/LearningJourneyVisualizer';
import InstructorSpotlight from './homepage/InstructorSpotlight';
import ResourceHub from './homepage/ResourceHub';
import WhyChooseUs from './homepage/WhyChooseUs';

interface HomePageProps {
  navigate: (page: string, data?: any) => void;
  openModal: (type: string, data?: any) => void;
  user?: User | null;
}

const HomePage = ({ navigate, openModal, user }: HomePageProps) => {
  return (
    <>
      <AnimatedStyles />
      <div className="relative min-h-screen overflow-hidden">
        <DynamicBackground />
        
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <div className="animate-fade-in">
                <div className="mb-8 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-20 animate-pulse-slow"></div>
                    <div className="relative bg-white p-6 rounded-full shadow-2xl">
                      <div className="h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold animate-bounce-slow">
                        🎓
                      </div>
                    </div>
                  </div>
                </div>
                
                <AnimatedHeadline />
                <InteractiveCTACluster navigate={navigate} />
              </div>
            </div>
          </section>

          {/* Course Discovery Hub */}
          <CourseDiscoveryHub />

          {/* Learning Journey Visualizer */}
          <LearningJourneyVisualizer />

          {/* Instructor Spotlight */}
          <InstructorSpotlight />

          {/* Resource Hub & Community */}
          <ResourceHub />

          {/* Why Choose Us */}
          <WhyChooseUs />

          {/* Stats Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                {[
                  { number: "50,000+", label: "Students Helped", icon: "👥" },
                  { number: "95%", label: "Success Rate", icon: "🏆" },
                  { number: "1000+", label: "Practice Questions", icon: "📚" }
                ].map((stat, index) => (
                  <div key={index} className="animate-float" style={{ animationDelay: `${index * 0.3}s` }}>
                    <div className="text-4xl mb-4">{stat.icon}</div>
                    <h3 className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</h3>
                    <p className="text-blue-100 text-lg">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
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
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-xl font-semibold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => navigate('examSubjects')}
                >
                  <Star className="mr-3 h-6 w-6 group-hover:rotate-180 transition-transform duration-300" />
                  Get Started Free
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
