
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../components/HomePage';
import CoursesPage from '../components/CoursesPage';
import ProgramsPage from '../components/ProgramsPage';
import TutoringPage from '../components/TutoringPage';
import ResourcesPage from '../components/ResourcesPage';
import CommunityPage from '../components/CommunityPage';
import CareersPage from '../components/CareersPage';
import AboutPage from '../components/AboutPage';
import ContactPage from '../components/ContactPage';
import ExamSubjectsPage from '../components/ExamSubjectsPage';
import SubjectExamsPage from '../components/SubjectExamsPage';
import ExamPage from '../components/ExamPage';
import Modal from '../components/Modal';
import BlogPage from '../components/BlogPage';
import SubscriptionPage from '../components/SubscriptionPage';
import EditProfilePage from '../components/EditProfilePage';
import SettingsPage from '../components/SettingsPage';
import NotificationsPage from '../components/NotificationsPage';

interface HistoryEntry {
  page: string;
  data: any | null;
}

interface User {
  email: string;
  id: string;
}

// Main App Component
const Index = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([{ page: 'home', data: null }]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'signup', 'login', 'enroll', 'startExam'
  const [modalData, setModalData] = useState(null); // Data for the modal, e.g., course title for enrollment
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [testimonials, setTestimonials] = useState([
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
  ]);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user);
      if (session?.user) {
        const userData = {
          email: session.user.email || '',
          id: session.user.id
        };
        setUser(userData);
        window.dispatchEvent(new CustomEvent('authChange', { detail: userData }));
      } else {
        setUser(null);
        window.dispatchEvent(new CustomEvent('authChange', { detail: null }));
      }
      setLoading(false);
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const userData = {
          email: session.user.email || '',
          id: session.user.id
        };
        setUser(userData);
      }
      setLoading(false);
    });

    // Listen for custom auth events (fallback for older components)
    const handleAuthChange = (event: CustomEvent) => {
      const userData = event.detail;
      if (userData) {
        setUser({
          email: userData.email || '',
          id: userData.id || ''
        });
      } else {
        setUser(null);
      }
    };

    window.addEventListener('authChange', handleAuthChange as EventListener);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('authChange', handleAuthChange as EventListener);
    };
  }, []);

  const addTestimonial = (testimonial: any) => {
    setTestimonials(prev => [testimonial, ...prev]);
  };

  const { page: currentPage, data: pageData } = history[history.length - 1];

  // Navigation handler
  const navigate = (page: string, data: any = null) => {
    const latestEntry = history[history.length - 1];
    if (page !== latestEntry.page || JSON.stringify(data) !== JSON.stringify(latestEntry.data)) {
      setHistory(prevHistory => [...prevHistory, { page, data }]);
    }
  };

  const goBack = () => {
    if (history.length > 1) {
      setHistory(prevHistory => prevHistory.slice(0, -1));
    } else {
      // If we're at the first page or somehow the history is empty, ensure we go to home
      setHistory([{ page: 'home', data: null }]);
    }
  };

  const navigateToHistory = (index: number) => {
    if (index < history.length - 1) {
      setHistory(prevHistory => prevHistory.slice(0, index + 1));
    }
  };
  
  const previousPageName = history.length > 1 ? history[history.length - 2].page : null;

  // Function to open the modal with specific content
  const openModal = (type: any, data = null) => {
    setModalType(type);
    setModalData(data);
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setModalData(null);
  };

  // Main content rendering based on currentPage
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} openModal={openModal} user={user} />;
      case 'courses':
        return <CoursesPage openModal={openModal} goBack={goBack} previousPageName={previousPageName} navigate={navigate} />;
      case 'programs':
        return <ProgramsPage />;
      case 'tutoring':
        return <TutoringPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'community':
        return <CommunityPage goBack={goBack} previousPageName={previousPageName} />;
      case 'careers':
        return <CareersPage goBack={goBack} previousPageName={previousPageName} />;
      case 'about':
        return <AboutPage goBack={goBack} previousPageName={previousPageName} />;
      case 'contact':
        return <ContactPage goBack={goBack} previousPageName={previousPageName} addTestimonial={addTestimonial} />;
      case 'examSubjects':
        return <ExamSubjectsPage navigate={navigate} goBack={goBack} previousPageName={previousPageName} pageData={pageData} />;
      case 'subjectExams':
        return <SubjectExamsPage subjectTitle={pageData?.subjectTitle} examType={pageData?.examType} navigate={navigate} goBack={goBack} previousPageName={previousPageName} />;
      case 'examPage':
        return <ExamPage navigate={navigate} examDetails={pageData} goBack={goBack} history={history} navigateToHistory={navigateToHistory} />;
      case 'blog':
        return <BlogPage goBack={goBack} previousPageName={previousPageName} />;
      case 'subscription':
        return <SubscriptionPage openModal={openModal} history={history} navigateToHistory={navigateToHistory} />;
      case 'editProfile':
        return <EditProfilePage user={user} goBack={goBack} previousPageName={previousPageName} />;
      case 'settings':
        return <SettingsPage user={user} goBack={goBack} previousPageName={previousPageName} />;
      case 'notifications':
        return <NotificationsPage user={user} goBack={goBack} previousPageName={previousPageName} />;
      default:
        return <HomePage navigate={navigate} openModal={openModal} user={user} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Header navigate={navigate} openModal={openModal} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
      {showModal && <Modal type={modalType} data={modalData} onClose={closeModal} openModal={openModal} navigate={navigate} />}
    </div>
  );
};

export default Index;
