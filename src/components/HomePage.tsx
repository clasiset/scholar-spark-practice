
import React, { useState, useEffect } from 'react';
import { useI18n } from '../i18n/i18nContext';

const HomePage = ({ navigate, openModal }) => {
  const { t } = useI18n();
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const handleAuthChange = (event: CustomEvent) => {
      setUser(event.detail);
    };

    window.addEventListener('authChange', handleAuthChange as EventListener);

    return () => {
      window.removeEventListener('authChange', handleAuthChange as EventListener);
    };
  }, []);

  const testimonials = [
    {
      quote: t.home.testimonial1Quote,
      name: t.home.testimonial1Name,
      role: t.home.testimonial1Role,
      avatar: "https://i.pravatar.cc/150?u=abiy@example.com"
    },
    {
      quote: t.home.testimonial2Quote,
      name: t.home.testimonial2Name,
      role: t.home.testimonial2Role, 
      avatar: "https://i.pravatar.cc/150?u=meron@example.com"
    },
    {
      quote: t.home.testimonial3Quote,
      name: t.home.testimonial3Name,
      role: t.home.testimonial3Role,
      avatar: "https://i.pravatar.cc/150?u=dawit@example.com"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-6 lg:px-12">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {user ? t.home.welcomeMessage : t.home.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              {t.home.heroSubtitle}
            </p>
            {!user && (
              <button
                onClick={() => openModal('signup')}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
              >
                {t.home.getStarted}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 lg:px-12 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            {t.home.whyChooseTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t.home.feature1Title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.home.feature1Description}
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t.home.feature2Title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.home.feature2Description}
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t.home.feature3Title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t.home.feature3Description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 lg:px-12">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            {t.home.testimonialsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-r from-indigo-600 to-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t.home.ctaTitle}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t.home.ctaSubtitle}
          </p>
          {!user && (
            <button
              onClick={() => openModal('signup')}
              className="bg-white hover:bg-gray-100 text-indigo-600 font-bold py-4 px-8 rounded-full text-lg shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {t.home.ctaButton}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
