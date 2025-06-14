import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import NavLink from './NavLink';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = ({ navigate, openModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const getInitials = (email: string | undefined) => {
    if (!email) return 'U';
    return email[0].toUpperCase();
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg py-3 md:py-4 px-4 md:px-6 lg:px-12 sticky top-0 z-50 border-b border-blue-100">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center cursor-pointer group" onClick={() => navigate('home')}>
          <div className="w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3 rounded-full overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300 bg-white border-2 border-blue-200">
            <img 
              src="/lovable-uploads/b4a3ff1d-fa0f-4e7a-8584-0b818b023773.png" 
              alt="Logo" 
              className="w-full h-full object-cover scale-110" 
            />
          </div>
          <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            EduPlatform
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
          <NavLink text="Home" onClick={() => navigate('home')} />
          <NavLink text="Courses" onClick={() => navigate('courses')} />
          <NavLink text="Programs" onClick={() => navigate('programs')} />
          <NavLink text="Tutoring" onClick={() => navigate('tutoring')} />
          <NavLink text="Resources" onClick={() => navigate('resources')} />
          <NavLink text="Community" onClick={() => navigate('community')} />
          <NavLink text="Careers" onClick={() => navigate('careers')} />
          <NavLink text="About" onClick={() => navigate('about')} />
          <NavLink text="Exit Exam" onClick={() => navigate('home')} />
          <NavLink text="Entrance Exam" onClick={() => navigate('entranceExams')} />
          <NavLink text="Work Exam" onClick={() => navigate('examPage')} />
          <NavLink text="NGAT Exam" onClick={() => navigate('examPage')} />
          
          <div className="flex items-center space-x-3">
            {!user && (
                <button
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                  onClick={() => openModal('login')}
                >
                  Sign In
                </button>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md mt-4 rounded-lg shadow-xl border border-gray-100">
          <nav className="flex flex-col space-y-2 py-4 px-6">
            <NavLink text="Home" onClick={() => { navigate('home'); setIsMobileMenuOpen(false); }} />
            <NavLink text="Courses" onClick={() => { navigate('courses'); setIsMobileMenuOpen(false); }} />
            <NavLink text="Programs" onClick={() => { navigate('programs'); setIsMobileMenuOpen(false); }} />
            <NavLink text="Tutoring" onClick={() => { navigate('tutoring'); setIsMobileMenuOpen(false); }} />
            <NavLink text="Resources" onClick={() => { navigate('resources'); setIsMobileMenuOpen(false); }} />
            <NavLink text="Community" onClick={() => { navigate('community'); setIsMobileMenuOpen(false); }} />
            <NavLink text="Careers" onClick={() => { navigate('careers'); setIsMobileMenuOpen(false); }} />
            <NavLink text="About" onClick={() => { navigate('about'); setIsMobileMenuOpen(false); }} />
            <NavLink text="Exit Exam" onClick={() => { navigate('home'); setIsMobileMenuOpen(false); }} />
            <NavLink text="Entrance Exam" onClick={() => { navigate('entranceExams'); setIsMobileMenuOpen(false); }} />
            <NavLink text="Work Exam" onClick={() => { navigate('examPage'); setIsMobileMenuOpen(false); }} />
            <NavLink text="NGAT Exam" onClick={() => { navigate('examPage'); setIsMobileMenuOpen(false); }} />
            {!user && (
              <button
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 w-full mt-4"
                onClick={() => { openModal('login'); setIsMobileMenuOpen(false); }}
              >
                Sign In
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
