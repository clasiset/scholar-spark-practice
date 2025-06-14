import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, User, Settings, Bell, LogOut, Edit } from 'lucide-react';
import { useI18n } from '../i18n/i18nContext';
import LanguageSwitcher from './LanguageSwitcher';

interface User {
  email: string;
}

const Header = ({ navigate, openModal }: { navigate: (page: string, data?: any) => void, openModal: (type: string, data?: any) => void }) => {
  const { t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleAuthChange = (event: CustomEvent) => {
      setUser(event.detail);
    };

    window.addEventListener('authChange', handleAuthChange as EventListener);
    return () => window.removeEventListener('authChange', handleAuthChange as EventListener);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeDropdowns = () => {
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const handleNavigation = (page: string, data?: any) => {
    navigate(page, data);
    closeDropdowns();
  };

  const handleLogout = () => {
    setUser(null);
    closeDropdowns();
    window.dispatchEvent(new CustomEvent('authChange', { detail: null }));
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => handleNavigation('home')}
          >
            <div className="text-2xl font-bold text-indigo-600">Zehulu.com</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('home')} 
              className="text-gray-700 hover:text-indigo-600 transition duration-300"
            >
              {t.navigation.home}
            </button>
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-indigo-600 transition duration-300">
                {t.navigation.courses}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <button 
                  onClick={() => handleNavigation('courses')} 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {t.navigation.allCourses}
                </button>
                <button 
                  onClick={() => handleNavigation('programs')} 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {t.navigation.programs}
                </button>
                <button 
                  onClick={() => handleNavigation('tutoring')} 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {t.navigation.tutoring}
                </button>
              </div>
            </div>
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-indigo-600 transition duration-300">
                {t.navigation.exams}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <button 
                  onClick={() => handleNavigation('examSubjects', { examType: 'entrance' })} 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {t.navigation.entranceExam}
                </button>
                <button 
                  onClick={() => handleNavigation('examSubjects', { examType: 'exit' })} 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {t.navigation.exitExam}
                </button>
                <button 
                  onClick={() => handleNavigation('examSubjects', { examType: 'work' })} 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {t.navigation.workExam}
                </button>
                <button 
                  onClick={() => handleNavigation('examSubjects', { examType: 'ngat' })} 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {t.navigation.ngatExam}
                </button>
              </div>
            </div>
            <button 
              onClick={() => handleNavigation('subscription')} 
              className="text-gray-700 hover:text-indigo-600 transition duration-300"
            >
              {t.navigation.subscription}
            </button>
            <button 
              onClick={() => handleNavigation('localJobPortal')} 
              className="text-gray-700 hover:text-indigo-600 transition duration-300"
            >
              {t.navigation.localJobPortal}
            </button>
            <button 
              onClick={() => handleNavigation('about')} 
              className="text-gray-700 hover:text-indigo-600 transition duration-300"
            >
              {t.navigation.aboutUs}
            </button>
            <button 
              onClick={() => handleNavigation('contact')} 
              className="text-gray-700 hover:text-indigo-600 transition duration-300"
            >
              {t.navigation.contactUs}
            </button>
          </nav>

          {/* Right side - Language switcher and auth */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition duration-300"
                >
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="hidden lg:block">{user.email}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                    <button
                      onClick={() => handleNavigation('editProfile')}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {t.profile.updateInformation}
                    </button>
                    <button
                      onClick={() => handleNavigation('settings')}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      {t.auth.settings}
                    </button>
                    <button
                      onClick={() => handleNavigation('notifications')}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      {t.auth.notifications}
                    </button>
                    <div className="border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        {t.auth.logout}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openModal('login')}
                  className="text-gray-700 hover:text-indigo-600 transition duration-300"
                >
                  {t.auth.login}
                </button>
                <button
                  onClick={() => openModal('signup')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-300"
                >
                  {t.auth.signUp}
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-indigo-600 transition duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavigation('home')}
                className="text-gray-700 hover:text-indigo-600 transition duration-300 block px-4 py-2"
              >
                {t.navigation.home}
              </button>
              <div className="relative">
                <button className="flex items-center text-gray-700 hover:text-indigo-600 transition duration-300 block px-4 py-2">
                  {t.navigation.courses}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="flex flex-col ml-4 mt-2 space-y-2">
                  <button
                    onClick={() => handleNavigation('courses')}
                    className="text-gray-700 hover:text-indigo-600 transition duration-300 block px-4 py-2"
                  >
                    {t.navigation.allCourses}
                  </button>
                  <button
                    onClick={() => handleNavigation('programs')}
                    className="text-gray-700 hover:text-indigo-600 transition duration-300 block px-4 py-2"
                  >
                    {t.navigation.programs}
                  </button>
                  <button
                    onClick={() => handleNavigation('tutoring')}
                    className="text-gray-700 hover:text-indigo-600 transition duration-300 block px-4 py-2"
                  >
                    {t.navigation.tutoring}
                  </button>
                </div>
              </div>
              <div className="relative">
                <button className="flex items-center text-gray-700 hover:text-indigo-600 transition duration-300 block px-4 py-2">
                  {t.navigation.exams}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="flex flex-col ml-4 mt-2 space-y-2">
                  <button
                    onClick={() => handleNavigation('examSubjects', { examType: 'entrance' })}
                    className="text-gray-700 hover:text-indigo-600 transition duration-300 block px-4 py-2"
                  >
                    {t.navigation.entranceExam}
                  </button>
                  <button
                    onClick={() => handleNavigation('examSubjects', { examType: 'exit' })}
                    className="text-gray-700 hover:text-indigo-600 transition duration-300 block px-4 py-2"
                  >
                    {t.navigation.exitExam}
                  </button>
                  <button
                    onClick={() => handleNavigation('examSubjects', { examType: 'work' })}
                    className="text-gray-700 hover:text-indigo-600 transition duration-300 block px-4 py-2"
                  >
                    {t.navigation.workExam}
                  </button>
                  <button
                    onClick={() => handleNavigation('examSubjects', { examType: 'ngat' })}
                    className="text-gray-700 hover:text-indigo-600 transition duration-300 block px-4 py-2"
                  >
                    {t.navigation.ngatExam}
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleNavigation('subscription')}
                className="text-gray-700 hover:text-indigo-600 transition duration-300 block px-4 py-2"
              >
                {t.navigation.subscription}
              </button>
              <button
                onClick={() => handleNavigation('localJobPortal')}
                className="text-gray-700 hover:text-indigo-600 transition duration-300 block px-4 py-2"
              >
                {t.navigation.localJobPortal}
              </button>
              <button
                onClick={() => handleNavigation('about')}
                className="text-gray-700 hover:text-indigo-600 transition duration-300 block px-4 py-2"
              >
                {t.navigation.aboutUs}
              </button>
              <button
                onClick={() => handleNavigation('contact')}
                className="text-gray-700 hover:text-indigo-600 transition duration-300 block px-4 py-2"
              >
                {t.navigation.contactUs}
              </button>
              <LanguageSwitcher />
              {user ? (
                <>
                  <button
                    onClick={() => handleNavigation('editProfile')}
                    className="flex items-center text-gray-700 hover:text-indigo-600 transition duration-300 block px-4 py-2"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {t.profile.updateInformation}
                  </button>
                  <button
                    onClick={() => handleNavigation('settings')}
                    className="flex items-center text-gray-700 hover:text-indigo-600 transition duration-300 block px-4 py-2"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    {t.auth.settings}
                  </button>
                  <button
                    onClick={() => handleNavigation('notifications')}
                    className="flex items-center text-gray-700 hover:text-indigo-600 transition duration-300 block px-4 py-2"
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    {t.auth.notifications}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-700 hover:text-indigo-600 transition duration-300 block px-4 py-2"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t.auth.logout}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => openModal('login')}
                    className="text-gray-700 hover:text-indigo-600 transition duration-300 block px-4 py-2"
                  >
                    {t.auth.login}
                  </button>
                  <button
                    onClick={() => openModal('signup')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-300 block"
                  >
                    {t.auth.signUp}
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
