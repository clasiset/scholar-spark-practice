
import React from 'react';
import { Clock, GraduationCap, Target, DollarSign } from 'lucide-react';

const WhyChooseUs = () => {
  const differentiators = [
    {
      icon: <Clock className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
      title: 'Flexible Learning',
      description: 'Study at your own pace, on your own schedule',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
      title: 'Expert-Led',
      description: 'Learn from industry professionals and academics',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: <Target className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
      title: 'Career-Focused',
      description: 'Skills that directly impact your professional growth',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: <DollarSign className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
      title: 'Affordable',
      description: 'Premium education without the premium price tag',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Why Choose 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Scholar Spark?</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            We're not just another online learning platform - we're your partner in transformation
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {differentiators.map((item, index) => (
            <div
              key={item.title}
              className="group text-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-gray-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 ${item.bgColor} rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className={`${item.color} group-hover:animate-bounce`}>
                  {item.icon}
                </div>
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {item.title}
              </h3>
              
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {item.description}
              </p>
              
              <div className={`mt-3 sm:mt-4 w-12 h-1 ${item.color.replace('text-', 'bg-')} mx-auto rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
            Read Our Story
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
