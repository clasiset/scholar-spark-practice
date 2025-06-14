
import React, { useState } from 'react';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import CoursesPage from '../components/CoursesPage';
import AboutPage from '../components/AboutPage';
import ContactPage from '../components/ContactPage';
import ExamSubjectsPage from '../components/ExamSubjectsPage';
import Footer from '../components/Footer';
import Modal from '../components/Modal';

type Page = 'home' | 'courses' | 'about' | 'contact' | 'examSubjects' | 'subscription' | 'localJobPortal' | 'programs' | 'tutoring';

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
  const [testimonials, setTestimonials] = useState([
    {
      quote: "Zehulu helped me pass my entrance exam with excellent preparation materials.",
      name: "Abiy Teshome",
      role: "University Student",
      avatar: "https://i.pravatar.cc/150?u=abiy@example.com"
    },
    {
      quote: "The courses are well-structured and the tutors are very knowledgeable.",
      name: "Meron Bekele",
      role: "High School Graduate",
      avatar: "https://i.pravatar.cc/150?u=meron@example.com"
    },
    {
      quote: "I improved my grades significantly thanks to Zehulu's comprehensive study materials.",
      name: "Dawit Haile",
      role: "Student",
      avatar: "https://i.pravatar.cc/150?u=dawit@example.com"
    }
  ]);

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
      tutoring: 'Tutoring'
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

  const addTestimonial = (testimonial: any) => {
    setTestimonials(prev => [...prev, testimonial]);
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
        return <ContactPage goBack={goBack} previousPageName={getPreviousPageName()} addTestimonial={addTestimonial} />;
      case 'examSubjects':
        return <ExamSubjectsPage navigate={navigate} goBack={goBack} previousPageName={getPreviousPageName()} pageData={pageData} />;
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
        />
      )}
    </div>
  );
};

export default Index;
