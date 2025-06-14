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

interface HistoryEntry {
  page: string;
  data: any | null;
}

// Main App Component
const Index = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([{ page: 'home', data: null }]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'signup', 'login', 'enroll', 'startExam'
  const [modalData, setModalData] = useState(null); // Data for the modal, e.g., course title for enrollment

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
  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} openModal={openModal} testimonials={testimonials} />;
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
        return <ContactPage goBack={goBack} previousPageName={previousPageName} addTestimonial={addTestimonial} />;
      case 'examSubjects':
        return <ExamSubjectsPage navigate={navigate} goBack={goBack} previousPageName={previousPageName} pageData={pageData} />;
      case 'subjectExams':
        return <SubjectExamsPage subjectTitle={pageData?.subjectTitle} navigate={navigate} goBack={goBack} previousPageName={previousPageName} />;
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
        return <HomePage navigate={navigate} openModal={openModal} testimonials={testimonials} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 font-sans antialiased flex flex-col">
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
