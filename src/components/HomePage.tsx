import React from 'react';
import { BookOpen, Trophy, Users, ArrowRight, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const HomePage = ({ navigate, openModal }) => {
  const featuredCourses = [
    {
      title: 'Advanced Mathematics',
      description: 'Master calculus, algebra, and statistics with expert guidance.',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=60',
    },
    {
      title: 'Modern Web Development',
      description: 'Build responsive and dynamic websites with React and Node.js.',
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=60',
    },
    {
      title: 'Introduction to Physics',
      description: 'Explore the fundamental principles of the physical world.',
      image: 'https://images.unsplash.com/photo-1581092580433-c2c1f56a6435?auto=format&fit=crop&w=800&q=60',
    },
  ];

  const testimonials = [
    {
      quote: "This platform transformed my understanding of complex subjects. The interactive lessons are a game-changer!",
      name: "Alex Johnson",
      role: "University Student",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    },
    {
      quote: "The flexible schedule allowed me to study while working full-time. I couldn't have passed my exams without it.",
      name: "Maria Garcia",
      role: "Working Professional",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d"
    },
    {
      quote: "The quality of the instructors is top-notch. They are true experts who know how to teach.",
      name: "David Smith",
      role: "High School Graduate",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Interactive Education Background */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat transform transition-transform duration-[20s] hover:scale-105"
          style={{
            backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.85), rgba(59, 130, 246, 0.75))`
          }}
        />
        {/* Animated overlay particles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-yellow-300/30 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-white/15 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-200/40 rounded-full animate-ping delay-500"></div>
        </div>
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4 md:px-6 text-white">
          <div className="container mx-auto text-center">
            <div className="mb-6 md:mb-8">
              <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 p-1">
                <div className="w-full h-full bg-white rounded-full overflow-hidden">
                  <img 
                    src="/lovable-uploads/b4a3ff1d-fa0f-4e7a-8584-0b818b023773.png" 
                    alt="Ministry of Education Logo" 
                    className="w-full h-full object-cover scale-110" 
                  />
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                University <span className="text-yellow-300 animate-pulse">Entrance</span> Exams
              </h1>
              <p className="text-base md:text-xl text-blue-100 max-w-2xl md:max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed">
                Practice with subject-specific questions to prepare for your university entrance examination.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-12 md:mb-16 px-4">
              <button
                onClick={() => navigate('examSubjects', { examType: 'Entrance' })}
                className="bg-white/10 backdrop-blur-md text-white hover:bg-white/20 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 border border-white/20 group"
              >
                <BookOpen size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                <span className="hidden sm:inline">Explore Entrance Exams</span>
                <span className="sm:hidden">Entrance Exams</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
              <button
                onClick={() => navigate('examSubjects', { examType: 'Exit' })}
                className="bg-gradient-to-r from-yellow-400/90 to-orange-500/90 hover:from-yellow-500/90 hover:to-orange-600/90 backdrop-blur-md text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 border border-white/20 group"
              >
                <Trophy size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                <span className="hidden sm:inline">Explore Exit Exams</span>
                <span className="sm:hidden">Exit Exams</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-12 md:py-16 px-4 md:px-6 bg-white/5 backdrop-blur-sm">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 md:mb-12">Featured Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredCourses.map((course, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-md border border-white/20 text-white overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <CardHeader>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-100 text-sm md:text-base mb-4">{course.description}</p>
                    <Button onClick={() => navigate('courses')} variant="secondary" className="w-full bg-white/10 hover:bg-white/20 text-white">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 md:mb-12">What Our Students Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-md border border-white/20 text-white flex flex-col justify-between">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400 fill-yellow-400 h-5 w-5" />)}
                    </div>
                    <p className="text-blue-100 mb-4">"{testimonial.quote}"</p>
                  </CardContent>
                  <div className="p-6 pt-0 flex items-center">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-blue-200">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* About Us/Mission Section */}
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-blue-100 max-w-2xl mb-8">
                  Our mission is to democratize education by providing accessible, high-quality learning resources to students everywhere. We believe in empowering individuals to achieve their academic and career goals through innovative technology and dedicated support.
                </p>
                <Button onClick={() => navigate('about')} variant="outline" className="border-white text-white hover:bg-white/20 hover:text-white">Learn More About Us <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </div>
              <div className="hidden md:block">
                 <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60" alt="Students learning" className="rounded-lg shadow-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Blog CTA Section */}
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="text-center bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8 md:p-12 hover:bg-white/20 transition-colors duration-300">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Explore Our Blog</h2>
              <p className="text-blue-100 max-w-2xl mx-auto mb-8">
                Discover insights, tips, and the latest trends in AI-powered education and exam preparation.
              </p>
              <button
                onClick={() => navigate('blog')}
                className="bg-white/10 backdrop-blur-md text-white hover:bg-white/20 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-sm md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 border border-white/20 group mx-auto"
              >
                <BookOpen size={20} />
                <span>Read Articles</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="container mx-auto text-center">
             <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Begin Your Learning Journey?</h2>
             <p className="text-blue-100 max-w-2xl mx-auto mb-8">
                Discover the perfect course for your aspirations and join a community of learners.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate('courses')} size="lg" className="bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border-white/20 border">
                    <BookOpen className="mr-2" />
                    Browse All Courses
                </Button>
                <Button onClick={() => openModal('signup')} size="lg" className="bg-gradient-to-r from-yellow-400/90 to-orange-500/90 hover:from-yellow-500/90 hover:to-orange-600/90 text-white">
                    <Users className="mr-2" />
                    Sign Up Now
                </Button>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
