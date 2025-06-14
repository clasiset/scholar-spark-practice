
import React, { useState, useEffect } from 'react';
import NavLink from './NavLink';
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
import { Sun, Moon } from 'lucide-react';
import { cn } from "@/lib/utils";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

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


  const getInitials = (email: string | undefined) => {
    if (!email) return 'U';
    return email[0].toUpperCase();
  };

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg py-3 md:py-4 px-4 md:px-6 lg:px-12 sticky top-0 z-50 border-b border-blue-100 dark:border-slate-800">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center cursor-pointer group" onClick={() => navigate('home')}>
          <div className="w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3 rounded-full overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300 border-2 border-blue-200 dark:border-slate-700">
            <img 
              src="/lovable-uploads/b4a3ff1d-fa0f-4e7a-8584-0b818b023773.png" 
              alt="Logo" 
              className="w-full h-full object-cover scale-110" 
            />
          </div>
          <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent dark:text-transparent dark:bg-gradient-to-r dark:from-sky-400 dark:to-cyan-300">
            EduPlatform
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavLink text="Home" onClick={() => navigate('home')} />
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
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
                          <div className="text-lg font-medium">EduPlatform</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Your gateway to academic excellence.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem onClick={() => navigate('courses')} title="All Courses">
                      Browse our comprehensive course catalog.
                    </ListItem>
                    <ListItem onClick={() => navigate('programs')} title="Programs">
                      Structured learning paths for success.
                    </ListItem>
                    <ListItem onClick={() => navigate('tutoring')} title="Tutoring">
                      Personalized one-on-one tutoring sessions.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Exams</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    <ListItem onClick={() => navigate('examSubjects', { examType: 'entrance' })} title="Entrance Exam">
                      Prepare for university entrance exams.
                    </ListItem>
                    <ListItem onClick={() => navigate('examSubjects', { examType: 'exit' })} title="Exit Exam">
                      Practice for your university exit exams.
                    </ListItem>
                     <ListItem onClick={() => navigate('examSubjects', { examType: 'work' })} title="Work Exam">
                      Prepare for professional work exams.
                    </ListItem>
                     <ListItem onClick={() => navigate('examSubjects', { examType: 'ngat' })} title="NGAT Exam">
                      Practice for the NGAT exam.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                 <NavLink text="Subscription" onClick={() => navigate('subscription')} />
              </NavigationMenuItem>

              <NavigationMenuItem>
                 <NavLink text="Local Job Portal" onClick={() => navigate('localJobPortal')} />
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-4 md:w-[400px]">
                    <ListItem onClick={() => navigate('about')} title="About Us">
                      Learn more about our mission and team.
                    </ListItem>
                    <ListItem onClick={() => navigate('contact')} title="Contact Us">
                      Get in touch with us for any inquiries.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center space-x-4 pl-6">
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
              <Avatar onClick={() => openModal('profile', user)} className="cursor-pointer">
                <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold">
                  {getInitials(user.email)}
                </AvatarFallback>
              </Avatar>
            ) : (
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
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:text-gray-900 p-2"
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
        <div className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md mt-4 rounded-lg shadow-xl border border-gray-100 dark:border-slate-800">
          <nav className="flex flex-col space-y-1 py-4 px-6">
            <NavLink text="Home" onClick={() => { navigate('home'); setIsMobileMenuOpen(false); }} />
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="courses" className="border-b-0">
                <AccordionTrigger className="py-2 hover:no-underline font-medium text-gray-700 hover:text-indigo-600 [&[data-state=open]>svg]:text-indigo-600 dark:text-gray-300 dark:hover:text-sky-400 dark:[&[data-state=open]>svg]:text-sky-400">Courses</AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4 flex flex-col space-y-1 pt-1">
                    <NavLink text="All Courses" onClick={() => { navigate('courses'); setIsMobileMenuOpen(false); }} />
                    <NavLink text="Programs" onClick={() => { navigate('programs'); setIsMobileMenuOpen(false); }} />
                    <NavLink text="Tutoring" onClick={() => { navigate('tutoring'); setIsMobileMenuOpen(false); }} />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="exams" className="border-b-0">
                <AccordionTrigger className="py-2 hover:no-underline font-medium text-gray-700 hover:text-indigo-600 [&[data-state=open]>svg]:text-indigo-600 dark:text-gray-300 dark:hover:text-sky-400 dark:[&[data-state=open]>svg]:text-sky-400">Exams</AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4 flex flex-col space-y-1 pt-1">
                    <NavLink text="Entrance Exam" onClick={() => { navigate('examSubjects', { examType: 'entrance' }); setIsMobileMenuOpen(false); }} />
                    <NavLink text="Exit Exam" onClick={() => { navigate('examSubjects', { examType: 'exit' }); setIsMobileMenuOpen(false); }} />
                    <NavLink text="Work Exam" onClick={() => { navigate('examSubjects', { examType: 'work' }); setIsMobileMenuOpen(false); }} />
                    <NavLink text="NGAT Exam" onClick={() => { navigate('examSubjects', { examType: 'ngat' }); setIsMobileMenuOpen(false); }} />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="about" className="border-b-0">
                <AccordionTrigger className="py-2 hover:no-underline font-medium text-gray-700 hover:text-indigo-600 [&[data-state=open]>svg]:text-indigo-600 dark:text-gray-300 dark:hover:text-sky-400 dark:[&[data-state=open]>svg]:text-sky-400">About</AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4 flex flex-col space-y-1 pt-1">
                    <NavLink text="About Us" onClick={() => { navigate('about'); setIsMobileMenuOpen(false); }} />
                    <NavLink text="Contact Us" onClick={() => { navigate('contact'); setIsMobileMenuOpen(false); }} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <NavLink text="Subscription" onClick={() => { navigate('subscription'); setIsMobileMenuOpen(false); }} />
            <NavLink text="Local Job Portal" onClick={() => { navigate('localJobPortal'); setIsMobileMenuOpen(false); }} />
            
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-slate-700">
              {user ? (
                  <div className="flex items-center space-x-3" onClick={() => { openModal('profile', user); setIsMobileMenuOpen(false); }}>
                      <Avatar className="cursor-pointer">
                          <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold">
                              {getInitials(user.email)}
                          </AvatarFallback>
                      </Avatar>
                      <div>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{user.email}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">View Profile</p>
                      </div>
                  </div>
              ) : (
                <button
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 w-full"
                  onClick={() => { openModal('login'); setIsMobileMenuOpen(false); }}
                >
                  Sign In
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
