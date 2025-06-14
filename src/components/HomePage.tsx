import React from 'react';
import { BookOpen, Trophy, Users, ArrowRight, Star, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const HomePage = ({ navigate, openModal, testimonials, user }) => {
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

  return (
    <div>
      {/* Hero Section */}
      <section className="h-screen relative flex items-center justify-center text-white overflow-hidden">
        {/* Interactive Education Background */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgb(37, 99, 235), rgb(59, 130, 246))`
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
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
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
                University <span className="text-yellow-300">Entrance</span> Exams
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

      <div className="bg-gray-50">
        {/* Featured Courses Section */}
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 md:mb-12">Featured Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredCourses.map((course, index) => (
                <Card key={index} className="bg-white border border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm md:text-base mb-4">{course.description}</p>
                    <Button onClick={() => navigate('courses')} variant="secondary" className="w-full">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 md:py-16 px-4 md:px-6 bg-white">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 md:mb-12">What Our Students Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white border border-gray-200 flex flex-col justify-between">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400 fill-yellow-400 h-5 w-5" />)}
                    </div>
                    <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                  </CardContent>
                  <div className="p-6 pt-0 flex items-center">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* About Us/Mission Section */}
        <section className="py-12 md:py-16 px-4 md:px-6 bg-gray-50">
          <div className="container mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-gray-600 max-w-2xl mb-6">
                  Our mission is to democratize education by providing accessible, high-quality learning resources to students everywhere. We believe in empowering individuals to achieve their academic and career goals through:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
                    <li>Personalized instruction and project-based learning.</li>
                    <li>Courses taught by industry experts and renowned academics.</li>
                    <li>A supportive community and cutting-edge technology.</li>
                </ul>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button onClick={() => navigate('about')} variant="outline">Learn More About Us <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-96">
                    <div className="text-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800">Get In Touch</h3>
                        <p className="text-sm text-gray-600">
                            We're here to answer your questions.
                        </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-50 rounded-md mr-3">
                          <Phone className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">Phone</h4>
                          <a href="tel:+251-11-123-4567" className="text-blue-600 hover:underline text-sm">+251-11-123-4567</a>
                          <p className="text-xs text-gray-500">Mon-Fri, 9am-5pm EAT</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-50 rounded-md mr-3">
                          <Mail className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">Email</h4>
                          <a href="mailto:info@moe-edu.et" className="text-blue-600 hover:underline text-sm">info@moe-edu.et</a>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t text-center">
                      <p className="text-gray-600 mb-2 text-xs">For detailed inquiries, or to provide feedback, use our full contact page.</p>
                       <Button onClick={() => navigate('contact')} variant="outline" size="sm" className="w-full">
                        Full Contact Page
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <div className="hidden md:block">
                 <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60" alt="Students learning" className="rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Blog CTA Section */}
        <section className="py-12 md:py-16 px-4 md:px-6 bg-white">
          <div className="container mx-auto">
            <div className="text-center bg-gray-50 rounded-xl border border-gray-200 p-8 md:p-12 hover:bg-gray-100 transition-colors duration-300">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Explore Our Blog</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Discover insights, tips, and the latest trends in AI-powered education and exam preparation.
              </p>
              <Button onClick={() => navigate('blog')} variant="outline">
                <BookOpen size={20} className="mr-2"/>
                <span>Read Articles</span>
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Contact Us Section */}
        <section className="py-12 md:py-16 px-4 md:px-6 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Get In Touch</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                We're here to answer your questions. Connect with us for more information about our programs.
              </p>
            </div>
            <div className="max-w-3xl mx-auto bg-white rounded-xl border border-gray-200 p-8 grid md:grid-cols-2 gap-8 items-center shadow-sm">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-50 rounded-lg mr-4">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Phone</h3>
                      <a href="tel:+251-11-123-4567" className="text-blue-600 hover:underline">+251-11-123-4567</a>
                      <p className="text-xs text-gray-500">Mon-Fri, 9am-5pm EAT</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-50 rounded-lg mr-4">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Email</h3>
                      <a href="mailto:info@moe-edu.et" className="text-blue-600 hover:underline">info@moe-edu.et</a>
                    </div>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-gray-600 mb-4">For detailed inquiries, or to provide feedback, please use our contact form.</p>
                   <Button onClick={() => navigate('contact')} variant="outline">
                    Full Contact Page
                    <ArrowRight size={20} className="ml-2" />
                  </Button>
                </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-12 md:py-16 px-4 md:px-6 bg-white">
          <div className="container mx-auto text-center">
             <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Ready to Begin Your Learning Journey?</h2>
             <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Discover the perfect course for your aspirations and join a community of learners.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {!user && (
                  <Button onClick={() => openModal('signup')} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Get Started
                      <ArrowRight className="ml-2" />
                  </Button>
                )}
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
