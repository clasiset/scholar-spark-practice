import React, { useState } from 'react';
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
import LocalJobPortalPage from '../components/LocalJobPortalPage';
import JobSeekerDashboardPage from '../components/JobSeekerDashboardPage';
import EmployerDashboardPage from '../components/EmployerDashboardPage';
import BlogPage from '../components/BlogPage';
import SubscriptionPage from '../components/SubscriptionPage';

// Main App Component
const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [history, setHistory] = useState<string[]>(['home']);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'signup', 'login', 'enroll', 'startExam'
  const [modalData, setModalData] = useState(null); // Data for the modal, e.g., course title for enrollment
  const [pageData, setPageData] = useState(null); // Data to pass between pages (e.g., subject title, exam details)

  // Navigation handler
  const navigate = (page, data = null) => {
    if (page !== currentPage) {
      setHistory(prevHistory => [...prevHistory, page]);
    }
    setCurrentPage(page);
    setPageData(data);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const previousPage = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentPage(previousPage);
      setPageData(null);
    }
  };
  
  const previousPageName = history.length > 1 ? history[history.length - 2] : null;

  // Function to open the modal with specific content
  const openModal = (type, data = null) => {
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
  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} openModal={openModal} />;
      case 'courses':
        return <CoursesPage openModal={openModal} goBack={goBack} previousPageName={previousPageName} />;
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
        return <ContactPage goBack={goBack} previousPageName={previousPageName} />;
      case 'examSubjects':
        return <ExamSubjectsPage navigate={navigate} goBack={goBack} previousPageName={previousPageName} pageData={pageData} />;
      case 'subjectExams':
        return <SubjectExamsPage navigate={navigate} subjectTitle={pageData?.subjectTitle} onStartExam={openModal} goBack={goBack} previousPageName={previousPageName} />;
      case 'examPage':
        return <ExamPage navigate={navigate} examDetails={pageData} goBack={goBack} previousPageName={previousPageName} />;
      case 'blog':
        return <BlogPage goBack={goBack} previousPageName={previousPageName} />;
      case 'localJobPortal':
        return <LocalJobPortalPage navigate={navigate} goBack={goBack} previousPageName={previousPageName} />;
      case 'jobSeekerDashboard':
        return <JobSeekerDashboardPage goBack={goBack} previousPageName={previousPageName} />;
      case 'employerDashboard':
        return <EmployerDashboardPage goBack={goBack} previousPageName={previousPageName} />;
      case 'subscription':
        return <SubscriptionPage openModal={openModal} goBack={goBack} previousPageName={previousPageName} />;
      default:
        return <HomePage navigate={navigate} openModal={openModal} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased flex flex-col">
      <Header navigate={navigate} openModal={openModal} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
      {showModal && <Modal type={modalType} data={modalData} onClose={closeModal} openModal={openModal} navigate={navigate} />}
    </div>
  );
};

export default Index;
