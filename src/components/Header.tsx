import React, { useState, useEffect } from 'react';
import NavLink from './NavLink';
import LanguageSwitcher from './LanguageSwitcher';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon, User, Settings, CreditCard, Bell, LogOut, Menu, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useI18n } from '../i18n/i18nContext';

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Header = ({ navigate, openModal }) => {
  const { t, isRTL } = useI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleAuthChange = (event: CustomEvent) => {
      setUser(event.detail);
    };

    window.addEventListener('authChange', handleAuthChange as EventListener);

    return () => {
      window.removeEventListener('authChange', handleAuthChange as EventListener);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getInitials = (email: string | undefined) => {
    if (!email) return 'U';
    return email[0].toUpperCase();
  };

  const handleLogout = () => {
    // Clear user session
    setUser(null);
    // Dispatch auth change event
    window.dispatchEvent(new CustomEvent('authChange', { detail: null }));
    // Navigate to home
    navigate('home');
    setIsProfileOpen(false);
  };

  return (
    <header className={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg py-3 md:py-4 px-4 md:px-6 lg:px-12 sticky top-0 z-50 border-b border-blue-100 dark:border-slate-800 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center cursor-pointer group" onClick={() => navigate('home')}>
          <div className="w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3 rounded-full overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300 bg-white border-2 border-blue-200 dark:border-slate-700">
            <img 
              src="/lovable-uploads/b4a3ff1d-fa0f-4e7a-8584-0b818b023773.png" 
              alt="Logo" 
              className="w-full h-full object-cover scale-110" 
            />
          </div>
          <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent dark:text-transparent dark:bg-gradient-to-r dark:from-sky-400 dark:to-cyan-300">
            Zehulu.com
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavLink text={t.navigation.home} onClick={() => navigate('home')} />
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>{t.navigation.courses}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md dark:from-slate-800/50 dark:to-slate-800"
                          href="#"
                          onClick={(e) => { e.preventDefault(); navigate('courses'); }}
                        >
                          <div className="w-8 h-8 md:w-10 md:h-10 mb-2 rounded-full overflow-hidden shadow-md bg-white border-2 border-blue-200">
                            <img 
                              src="/lovable-uploads/b4a3ff1d-fa0f-4e7a-8584-0b818b023773.png" 
                              alt="Logo" 
                              className="w-full h-full object-cover scale-110" 
                            />
                          </div>
                          <div className="text-lg font-medium">Zehulu.com</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            {t.home.heroTitle}
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem onClick={() => navigate('courses')} title={t.navigation.allCourses}>
                      Browse our comprehensive course catalog.
                    </ListItem>
                    <ListItem onClick={() => navigate('programs')} title={t.navigation.programs}>
                      Structured learning paths for success.
                    </ListItem>
                    <ListItem onClick={() => navigate('tutoring')} title={t.navigation.tutoring}>
                      Personalized one-on-one tutoring sessions.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>{t.navigation.exams}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    <ListItem onClick={() => navigate('examSubjects', { examType: 'entrance' })} title={t.navigation.entranceExam}>
                      Prepare for university entrance exams.
                    </ListItem>
                    <ListItem onClick={() => navigate('examSubjects', { examType: 'exit' })} title={t.navigation.exitExam}>
                      Practice for your university exit exams.
                    </ListItem>
                     <ListItem onClick={() => navigate('examSubjects', { examType: 'work' })} title={t.navigation.workExam}>
                      Prepare for professional work exams.
                    </ListItem>
                     <ListItem onClick={() => navigate('examSubjects', { examType: 'ngat' })} title={t.navigation.ngatExam}>
                      Practice for the NGAT exam.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                 <NavLink text={t.navigation.subscription} onClick={() => navigate('subscription')} />
              </NavigationMenuItem>

              <NavigationMenuItem>
                 <NavLink text={t.navigation.localJobPortal} onClick={() => navigate('localJobPortal')} />
              </NavigationMenuItem>

              <NavigationMenuItem>
                 <NavLink text={t.navigation.aboutUs} onClick={() => navigate('about')} />
              </NavigationMenuItem>

              <NavigationMenuItem>
                 <NavLink text={t.navigation.contactUs} onClick={() => navigate('contact')} />
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center space-x-4 pl-6">
            <LanguageSwitcher />
            
            <div className="flex items-center">
              <Sun className={`h-5 w-5 text-yellow-500 transition-all ${isDarkMode ? 'scale-0' : 'scale-100'}`} />
              <Switch
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                  className="mx-2"
                  aria-label="Toggle dark mode"
              />
              <Moon className={`h-5 w-5 text-slate-400 transition-all ${isDarkMode ? 'scale-100' : 'scale-0'}`} />
            </div>

            {user ? (
              <div className="relative profile-dropdown">
                <Avatar 
                  className="cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all duration-200"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold">
                    {getInitials(user.email)}
                  </AvatarFallback>
                </Avatar>
                
                {isProfileOpen && (
                  <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-72 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-xl rounded-lg z-50`}>
                    <div className="p-4 border-b border-gray-200 dark:border-slate-700">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-lg font-semibold">
                            {getInitials(user.email)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">{user.email}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{t.auth.studentAccount}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <button 
                        onClick={() => { navigate('editProfile', user); setIsProfileOpen(false); }}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center"
                      >
                        <User className={`${isRTL ? 'ml-3' : 'mr-3'} h-5 w-5 text-green-600 dark:text-green-400`} />
                        <div>
                          <div className="font-medium">{t.auth.editProfile}</div>
                          <div className="text-xs text-gray-500">{t.profile.updateInformation}</div>
                        </div>
                      </button>
                      
                      <button 
                        onClick={() => { navigate('settings', user); setIsProfileOpen(false); }}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center"
                      >
                        <Settings className={`${isRTL ? 'ml-3' : 'mr-3'} h-5 w-5 text-gray-600 dark:text-gray-400`} />
                        <div>
                          <div className="font-medium">{t.auth.settings}</div>
                          <div className="text-xs text-gray-500">{t.profile.accountPrivacySettings}</div>
                        </div>
                      </button>
                      
                      <button 
                        onClick={() => { navigate('notifications', user); setIsProfileOpen(false); }}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center"
                      >
                        <Bell className={`${isRTL ? 'ml-3' : 'mr-3'} h-5 w-5 text-yellow-600 dark:text-yellow-400`} />
                        <div>
                          <div className="font-medium">{t.auth.notifications}</div>
                          <div className="text-xs text-gray-500">{t.profile.managePreferences}</div>
                        </div>
                      </button>
                      
                      <button 
                        onClick={() => { navigate('subscription'); setIsProfileOpen(false); }}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center"
                      >
                        <CreditCard className={`${isRTL ? 'ml-3' : 'mr-3'} h-5 w-5 text-green-600 dark:text-green-400`} />
                        <div>
                          <div className="font-medium">{t.navigation.subscription}</div>
                          <div className="text-xs text-gray-500">{t.profile.billingPlans}</div>
                        </div>
                      </button>

                      <div className="border-t border-gray-200 dark:border-slate-700 my-1"></div>

                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center text-red-600 dark:text-red-400"
                      >
                        <LogOut className={`${isRTL ? 'ml-3' : 'mr-3'} h-5 w-5`} />
                        <div>
                          <div className="font-medium">{t.auth.logout}</div>
                          <div className="text-xs">{t.profile.logoutAccount}</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
                <div className="flex items-center space-x-2">
                  <button
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-sky-400 font-semibold py-2 px-6 rounded-full transition-colors"
                    onClick={() => openModal('login')}
                  >
                    {t.auth.login}
                  </button>
                  <button
                    className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                    onClick={() => openModal('signup')}
                  >
                    {t.auth.signUp}
                  </button>
                </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center space-x-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:text-gray-900 p-2"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md mt-4 rounded-lg shadow-xl border border-gray-100 dark:border-slate-800">
          <nav className="flex flex-col space-y-1 py-4 px-6">
            <NavLink text={t.navigation.home} onClick={() => { navigate('home'); setIsMobileMenuOpen(false); }} />
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="courses" className="border-b-0">
                <AccordionTrigger className="py-2 hover:no-underline font-medium text-gray-700 hover:text-indigo-600 [&[data-state=open]>svg]:text-indigo-600 dark:text-gray-300 dark:hover:text-sky-400 dark:[&[data-state=open]>svg]:text-sky-400">{t.navigation.courses}</AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4 flex flex-col space-y-1 pt-1">
                    <NavLink text={t.navigation.allCourses} onClick={() => { navigate('courses'); setIsMobileMenuOpen(false); }} />
                    <NavLink text={t.navigation.programs} onClick={() => { navigate('programs'); setIsMobileMenuOpen(false); }} />
                    <NavLink text={t.navigation.tutoring} onClick={() => { navigate('tutoring'); setIsMobileMenuOpen(false); }} />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="exams" className="border-b-0">
                <AccordionTrigger className="py-2 hover:no-underline font-medium text-gray-700 hover:text-indigo-600 [&[data-state=open]>svg]:text-indigo-600 dark:text-gray-300 dark:hover:text-sky-400 dark:[&[data-state=open]>svg]:text-sky-400">{t.navigation.exams}</AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4 flex flex-col space-y-1 pt-1">
                    <NavLink text={t.navigation.entranceExam} onClick={() => { navigate('examSubjects', { examType: 'entrance' }); setIsMobileMenuOpen(false); }} />
                    <NavLink text={t.navigation.exitExam} onClick={() => { navigate('examSubjects', { examType: 'exit' }); setIsMobileMenuOpen(false); }} />
                    <NavLink text={t.navigation.workExam} onClick={() => { navigate('examSubjects', { examType: 'work' }); setIsMobileMenuOpen(false); }} />
                    <NavLink text={t.navigation.ngatExam} onClick={() => { navigate('examSubjects', { examType: 'ngat' }); setIsMobileMenuOpen(false); }} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <NavLink text={t.navigation.subscription} onClick={() => { navigate('subscription'); setIsMobileMenuOpen(false); }} />
            <NavLink text={t.navigation.localJobPortal} onClick={() => { navigate('localJobPortal'); setIsMobileMenuOpen(false); }} />
            <NavLink text={t.navigation.aboutUs} onClick={() => { navigate('about'); setIsMobileMenuOpen(false); }} />
            <NavLink text={t.navigation.contactUs} onClick={() => { navigate('contact'); setIsMobileMenuOpen(false); }} />
            
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <LanguageSwitcher />
                <div className="flex items-center">
                  <Sun className={`h-5 w-5 text-yellow-500 transition-all ${isDarkMode ? 'scale-0' : 'scale-100'}`} />
                  <Switch
                      checked={isDarkMode}
                      onCheckedChange={setIsDarkMode}
                      className="mx-2"
                      aria-label="Toggle dark mode"
                  />
                  <Moon className={`h-5 w-5 text-slate-400 transition-all ${isDarkMode ? 'scale-100' : 'scale-0'}`} />
                </div>
              </div>
              {user ? (
                  <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                          <Avatar>
                              <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold">
                                  {getInitials(user.email)}
                              </AvatarFallback>
                          </Avatar>
                          <div>
                              <p className="font-semibold text-gray-800 dark:text-gray-200">{user.email}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{t.auth.studentAccount}</p>
                          </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                          <button 
                              onClick={() => { navigate('editProfile', user); setIsMobileMenuOpen(false); }}
                              className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center"
                          >
                              <User className="mr-2 h-4 w-4" />
                              {t.auth.editProfile}
                          </button>
                          <button 
                              onClick={() => { navigate('settings', user); setIsMobileMenuOpen(false); }}
                              className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center"
                          >
                              <Settings className="mr-2 h-4 w-4" />
                              {t.auth.settings}
                          </button>
                          <button 
                              onClick={() => { navigate('notifications', user); setIsMobileMenuOpen(false); }}
                              className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center"
                          >
                              <Bell className="mr-2 h-4 w-4" />
                              {t.auth.notifications}
                          </button>
                          <button 
                              onClick={() => { navigate('subscription'); setIsMobileMenuOpen(false); }}
                              className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center"
                          >
                              <CreditCard className="mr-2 h-4 w-4" />
                              {t.navigation.subscription}
                          </button>
                          <button 
                              onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                              className="w-full text-left py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-slate-800 flex items-center text-red-600 dark:text-red-400"
                          >
                              <LogOut className="mr-2 h-4 w-4" />
                              {t.auth.logout}
                          </button>
                      </div>
                  </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <button
                    className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 w-full"
                    onClick={() => { openModal('signup'); setIsMobileMenuOpen(false); }}
                  >
                    {t.auth.signUp}
                  </button>
                  <button
                    className="text-center w-full py-2 px-6 rounded-full font-semibold text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-800"
                    onClick={() => { openModal('login'); setIsMobileMenuOpen(false); }}
                  >
                    {t.auth.login}
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
