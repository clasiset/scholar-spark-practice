
import React, { useState } from 'react';
import NavLink from './NavLink';

const Header = ({ navigate, openModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md py-4 px-6 md:px-12 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-700 cursor-pointer" onClick={() => navigate('home')}>
          EduPlatform
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          <NavLink text="Home" onClick={() => navigate('home')} />
          <NavLink text="Courses" onClick={() => navigate('courses')} />
          <NavLink text="Programs" onClick={() => navigate('programs')} />
          <NavLink text="Tutoring" onClick={() => navigate('tutoring')} />
          <NavLink text="Resources" onClick={() => navigate('resources')} />
          <NavLink text="Community" onClick={() => navigate('community')} />
          <NavLink text="Careers" onClick={() => navigate('careers')} />
          <NavLink text="About" onClick={() => navigate('about')} />
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => openModal('login')}
          >
            Sign In
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
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
        <div className="lg:hidden bg-white mt-4 rounded-lg shadow-lg">
          <nav className="flex flex-col space-y-2 py-4 px-6">
            <NavLink text="Home" onClick={() => { navigate('home'); setIsMobileMenuOpen(false); }} />
            <NavLink text="Courses" onClick={() => { navigate('courses'); setIsMobileMenuOpen(false); }} />
            <NavLink text="Programs" onClick={() => { navigate('programs'); setIsMobileMenuOpen(false); }} />
            <NavLink text="Tutoring" onClick={() => { navigate('tutoring'); setIsMobileMenuOpen(false); }} />
            <NavLink text="Resources" onClick={() => { navigate('resources'); setIsMobileMenuOpen(false); }} />
            <NavLink text="Community" onClick={() => { navigate('community'); setIsMobileMenuOpen(false); }} />
            <NavLink text="Careers" onClick={() => { navigate('careers'); setIsMobileMenuOpen(false); }} />
            <NavLink text="About" onClick={() => { navigate('about'); setIsMobileMenuOpen(false); }} />
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 w-full mt-4"
              onClick={() => { openModal('login'); setIsMobileMenuOpen(false); }}
            >
              Sign In
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
