
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { type Tables } from '@/integrations/supabase/types';
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
import { User } from '../types';

interface HistoryEntry {
  page: string;
  data: any | null;
}

// Main App Component
const Index = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([{ page: 'home', data: null }]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'signup', 'login', 'enroll', 'startExam'
  const [modalData, setModalData] = useState<any | null>(null); // Data for the modal, e.g., course title for enrollment
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null);
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
    setLoading(true);
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser({
          email: session.user.email || '',
          id: session.user.id,
        });

        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          setProfile(null);
        } else {
          setProfile(profileData);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const addTestimonial = (testimonial: any) => {
    setTestimonials(prev => [testimonial, ...prev]);
  };

  const { page: currentPage, data: pageData } = history[history.length - 1];

  // Navigation handler
  const navigate = (page: string, data: any = null) => {
    const topLevelPages = [
      'home', 'courses', 'programs', 'tutoring', 'resources', 'community', 
      'careers', 'about', 'contact', 'examSubjects', 'blog', 'subscription',
      'editProfile', 'settings', 'notifications'
    ];

    if (topLevelPages.includes(page)) {
      const newHistory: HistoryEntry[] = [{ page: 'home', data: null }];
      if (page !== 'home') {
        newHistory.push({ page, data });
      }
      setHistory(newHistory);
    } else {
      const latestEntry = history[history.length - 1];
      if (page !== latestEntry.page || JSON.stringify(data) !== JSON.stringify(latestEntry.data)) {
        setHistory(prevHistory => [...prevHistory, { page, data }]);
      }
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
  const openModal = (type: string, data: any = null) => {
    let finalData = data;
    if (type === 'profile' && profile) {
      finalData = { ...data, ...profile };
    }
    setModalType(type);
    setModalData(finalData);
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
        return <CoursesPage openModal={openModal} navigate={navigate} history={history} navigateToHistory={navigateToHistory} />;
      case 'programs':
        return <ProgramsPage />;
      case 'tutoring':
        return <TutoringPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'community':
        return <CommunityPage history={history} navigateToHistory={navigateToHistory} />;
      case 'careers':
        return <CareersPage history={history} navigateToHistory={navigateToHistory} />;
      case 'about':
        return <AboutPage history={history} navigateToHistory={navigateToHistory} />;
      case 'contact':
        return <ContactPage addTestimonial={addTestimonial} history={history} navigateToHistory={navigateToHistory} />;
      case 'examSubjects':
        return <ExamSubjectsPage navigate={navigate} pageData={pageData} history={history} navigateToHistory={navigateToHistory} />;
      case 'subjectExams':
        return <SubjectExamsPage subjectTitle={pageData?.subjectTitle} examType={pageData?.examType} navigate={navigate} history={history} navigateToHistory={navigateToHistory} />;
      case 'examPage':
        return <ExamPage navigate={navigate} examDetails={pageData} goBack={goBack} history={history} navigateToHistory={navigateToHistory} />;
      case 'blog':
        return <BlogPage history={history} navigateToHistory={navigateToHistory} />;
      case 'subscription':
        return <SubscriptionPage openModal={openModal} history={history} navigateToHistory={navigateToHistory} user={user} />;
      case 'editProfile':
        return <EditProfilePage user={user} profile={profile} history={history} navigateToHistory={navigateToHistory} />;
      case 'settings':
        return <SettingsPage user={user} history={history} navigateToHistory={navigateToHistory} />;
      case 'notifications':
        return <NotificationsPage user={user} history={history} navigateToHistory={navigateToHistory} />;
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
      <Header navigate={navigate} openModal={openModal} user={user} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
      {showModal && <Modal type={modalType} data={modalData} onClose={closeModal} openModal={openModal} navigate={navigate} />}
    </div>
  );
};

export default Index;
