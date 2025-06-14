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
import EntranceExamsPage from '../components/EntranceExamsPage';
import SubjectExamsPage from '../components/SubjectExamsPage';
import ExamPage from '../components/ExamPage';
import Modal from '../components/Modal';
import LocalJobPortalPage from '../components/LocalJobPortalPage';

// Main App Component
const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'signup', 'login', 'enroll', 'startExam'
  const [modalData, setModalData] = useState(null); // Data for the modal, e.g., course title for enrollment
  const [pageData, setPageData] = useState(null); // Data to pass between pages (e.g., subject title, exam details)

  // Navigation handler
  const navigate = (page, data = null) => {
    setCurrentPage(page);
    setPageData(data);
  };

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
        return <CoursesPage openModal={openModal} />;
      case 'programs':
        return <ProgramsPage />;
      case 'tutoring':
        return <TutoringPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'community':
        return <CommunityPage />;
      case 'careers':
        return <CareersPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'entranceExams':
        return <EntranceExamsPage navigate={navigate} />;
      case 'subjectExams':
        return <SubjectExamsPage navigate={navigate} subjectTitle={pageData?.subjectTitle} onStartExam={openModal} />;
      case 'examPage':
        return <ExamPage navigate={navigate} examDetails={pageData} />;
      case 'localJobPortal':
        return <LocalJobPortalPage />;
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
