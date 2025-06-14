
import React, { useState } from 'react';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import CoursesPage from '../components/CoursesPage';
import AboutPage from '../components/AboutPage';
import ContactPage from '../components/ContactPage';
import ExamSubjectsPage from '../components/ExamSubjectsPage';
import EditProfilePage from '../components/EditProfilePage';
import SettingsPage from '../components/SettingsPage';
import NotificationsPage from '../components/NotificationsPage';
import SubscriptionPage from '../components/SubscriptionPage';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

type Page = 'home' | 'courses' | 'about' | 'contact' | 'examSubjects' | 'subscription' | 'localJobPortal' | 'programs' | 'tutoring' | 'editProfile' | 'settings' | 'notifications';

interface User {
  email: string;
}

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [pageData, setPageData] = useState<any>(null);
  const [navigationHistory, setNavigationHistory] = useState<Array<{ page: Page; data: any; pageName: string }>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState<any>(null);

  const navigate = (page: Page, data?: any) => {
    console.log('Navigating to:', page, 'with data:', data);
    
    const currentPageName = getCurrentPageName();
    
    if (page !== currentPage) {
      setNavigationHistory(prev => [...prev, { 
        page: currentPage, 
        data: pageData, 
        pageName: currentPageName 
      }]);
    }
    
    setCurrentPage(page);
    setPageData(data || null);
  };

  const goBack = () => {
    console.log('Going back, history:', navigationHistory);
    if (navigationHistory.length > 0) {
      const previousPage = navigationHistory[navigationHistory.length - 1];
      setCurrentPage(previousPage.page);
      setPageData(previousPage.data);
      setNavigationHistory(prev => prev.slice(0, -1));
    }
  };

  const getCurrentPageName = () => {
    const pageNames: Record<Page, string> = {
      home: 'Home',
      courses: 'Courses',
      about: 'About Us',
      contact: 'Contact Us',
      examSubjects: 'Exam Subjects',
      subscription: 'Subscription',
      localJobPortal: 'Local Job Portal',
      programs: 'Programs',
      tutoring: 'Tutoring',
      editProfile: 'Edit Profile',
      settings: 'Settings',
      notifications: 'Notifications'
    };
    return pageNames[currentPage];
  };

  const getPreviousPageName = () => {
    if (navigationHistory.length > 0) {
      return navigationHistory[navigationHistory.length - 1].pageName;
    }
    return null;
  };

  const openModal = (type: string, data?: any) => {
    setModalType(type);
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('');
    setModalData(null);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} openModal={openModal} />;
      case 'courses':
        return <CoursesPage openModal={openModal} goBack={goBack} previousPageName={getPreviousPageName()} />;
      case 'about':
        return <AboutPage goBack={goBack} previousPageName={getPreviousPageName()} />;
      case 'contact':
        return <ContactPage goBack={goBack} previousPageName={getPreviousPageName()} addTestimonial={() => {}} />;
      case 'examSubjects':
        return <ExamSubjectsPage navigate={navigate} goBack={goBack} previousPageName={getPreviousPageName()} pageData={pageData} />;
      case 'editProfile':
        return <EditProfilePage goBack={goBack} previousPageName={getPreviousPageName()} />;
      case 'settings':
        return <SettingsPage goBack={goBack} previousPageName={getPreviousPageName()} />;
      case 'notifications':
        return <NotificationsPage goBack={goBack} previousPageName={getPreviousPageName()} />;
      case 'subscription':
        return <SubscriptionPage openModal={openModal} goBack={goBack} previousPageName={getPreviousPageName()} />;
      default:
        return <HomePage navigate={navigate} openModal={openModal} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header navigate={navigate} openModal={openModal} />
      {renderCurrentPage()}
      <Footer />
      {isModalOpen && (
        <Modal 
          type={modalType} 
          data={modalData} 
          onClose={closeModal}
          openModal={openModal}
          navigate={navigate}
        />
      )}
    </div>
  );
};

export default Index;
