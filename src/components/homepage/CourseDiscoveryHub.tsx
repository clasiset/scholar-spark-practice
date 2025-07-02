
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

const CourseDiscoveryHub = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const topSkills = [
    { name: 'AI & Machine Learning', courses: 15, trending: true },
    { name: 'Digital Marketing', courses: 23, new: true },
    { name: 'Leadership', courses: 18 },
    { name: 'Data Science', courses: 12, trending: true },
    { name: 'Web Development', courses: 28 },
    { name: 'Creative Arts', courses: 14, new: true }
  ];

  const recommendedCourses = [
    { title: 'Introduction to Machine Learning', rating: 4.8, students: '12.5k', badge: 'trending' },
    { title: 'Advanced Digital Marketing', rating: 4.9, students: '8.2k', badge: 'new' },
    { title: 'Leadership Fundamentals', rating: 4.7, students: '15.1k' }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Intelligent Course 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Discovery</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find your perfect learning path with our AI-powered recommendations
          </p>
        </div>

        {/* Interactive Search Bar */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="What would you like to learn today?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors bg-white/90 backdrop-blur-sm"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🔍</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Skills Cloud */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Popular Skills</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {topSkills.map((skill, index) => (
              <div
                key={skill.name}
                className={`group relative cursor-pointer transition-all duration-300 hover:scale-110 ${
                  selectedSkill === skill.name ? 'scale-110' : ''
                }`}
                onClick={() => setSelectedSkill(selectedSkill === skill.name ? null : skill.name)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                  selectedSkill === skill.name 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent' 
                    : 'bg-white/90 border-gray-200 hover:border-blue-500 text-gray-700'
                } backdrop-blur-sm shadow-lg hover:shadow-xl`}>
                  <span className="font-semibold">{skill.name}</span>
                  <span className="ml-2 text-sm opacity-75">({skill.courses})</span>
                  {skill.trending && (
                    <Badge className="ml-2 bg-red-500 text-white animate-pulse">Trending</Badge>
                  )}
                  {skill.new && (
                    <Badge className="ml-2 bg-green-500 text-white">New</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Courses You Might Like</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendedCourses.map((course, index) => (
              <Card key={course.title} className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg">{course.title}</span>
                    {course.badge && (
                      <Badge className={`${
                        course.badge === 'trending' ? 'bg-red-500 animate-pulse' : 'bg-green-500'
                      } text-white`}>
                        {course.badge}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-semibold">{course.rating}</span>
                    </div>
                    <span className="text-gray-600">{course.students} students</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDiscoveryHub;
