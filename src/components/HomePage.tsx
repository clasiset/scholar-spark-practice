
import React from 'react';
import { useI18n } from '../i18n/i18nContext';

interface User {
  email: string;
  id: string;
}

interface HomePageProps {
  navigate: (page: string, data?: any) => void;
  openModal: (type: string) => void;
  user: User | null;
}

const HomePage = ({ navigate, openModal, user }: HomePageProps) => {
  const { t } = useI18n();

  const testimonials = [
    {
      quote: "The practice tests helped me understand the exam format perfectly. I scored higher than I ever expected!",
      name: "አብይ ተስፋዬ",
      role: "University Student",
      avatar: "https://i.pravatar.cc/150?u=abiy@example.com"
    },
    {
      quote: "The detailed explanations after each question really helped me learn from my mistakes.",
      name: "Meron Kebede",
      role: "Recent Graduate", 
      avatar: "https://i.pravatar.cc/150?u=meron@example.com"
    },
    {
      quote: "I love how the platform adapts to my learning pace. It's like having a personal tutor!",
      name: "ዳዊት አሸናፊ",
      role: "High School Student",
      avatar: "https://i.pravatar.cc/150?u=dawit@example.com"
    }
  ];

  const handleExploreEntrance = () => {
    navigate('examSubjects', { examType: 'entrance' });
  };

  const handleExploreExit = () => {
    navigate('examSubjects', { examType: 'exit' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section - Full Height */}
      <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-12">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Your Gateway to Academic Excellence
            </h1>
            {!user && (
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Master university entrance and exit exams with our comprehensive practice tests and AI-powered feedback.
              </p>
            )}
            
            {user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={handleExploreEntrance}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-8 rounded-full text-lg shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl w-full sm:w-auto"
                >
                  Explore Entrance Exams
                </button>
                <button
                  onClick={handleExploreExit}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 px-8 rounded-full text-lg shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl w-full sm:w-auto"
                >
                  Explore Exit Exams
                </button>
              </div>
            ) : (
              <button
                onClick={() => openModal('signup')}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 px-8 rounded-full text-lg shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 lg:px-12 bg-secondary/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Comprehensive Practice</h3>
              <p className="text-muted-foreground">
                Access thousands of practice questions covering all exam topics with detailed explanations.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">AI-Powered Feedback</h3>
              <p className="text-muted-foreground">
                Get instant, personalized feedback to identify your strengths and areas for improvement.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Expert Content</h3>
              <p className="text-muted-foreground">
                All content is created and reviewed by experienced educators and exam specialists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 lg:px-12">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
            What Our Students Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card text-card-foreground p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-12 bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Excel in Your Exams?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have successfully prepared for their exams with our platform.
          </p>
          {!user && (
            <button
              onClick={() => openModal('signup')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 px-8 rounded-full text-lg shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Start Your Journey Today
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
