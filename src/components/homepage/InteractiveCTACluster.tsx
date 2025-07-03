
import React from 'react';
import { Button } from '../ui/button';
import { BookOpen, Lightbulb, ArrowRight } from 'lucide-react';

interface InteractiveCTAClusterProps {
  navigate: (page: string, data?: any) => void;
}

const InteractiveCTACluster = ({ navigate }: InteractiveCTAClusterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4">
      <Button 
        size="lg" 
        className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
        onClick={() => navigate('examSubjects')}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-center justify-center">
          <BookOpen className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:rotate-12" />
          Explore Courses
          <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
        <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
      </Button>
      
      <Button 
        variant="outline" 
        size="lg"
        className="group relative overflow-hidden border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm w-full sm:w-auto"
        onClick={() => navigate('about')}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-center justify-center">
          <Lightbulb className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 transition-all group-hover:text-yellow-500 group-hover:scale-110" />
          Discover Our Approach
        </div>
        <div className="absolute inset-0 rounded-xl border-2 border-blue-400/30 opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-125 transition-all duration-300" />
      </Button>
    </div>
  );
};

export default InteractiveCTACluster;
