
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import BackButton from './BackButton';
import { examData } from '../data/examData';

const ExamSubjectsPage = ({ navigate, goBack, previousPageName, pageData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const examType = pageData?.examType || 'entrance';
  const examInfo = examData[examType] || examData.entrance;
  const { title: pageTitle, subjects } = examInfo;

  const filteredSubjects = subjects.filter(subject =>
    subject.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(249, 250, 251, 0.95), rgba(243, 244, 246, 0.95)), url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`
        }}
      />
      
      <div className="relative z-10">
        <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
          <div className="container mx-auto px-6 py-6">
            <BackButton onClick={goBack} previousPageName={previousPageName} />
            
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 shadow-md">
                <img src="/lovable-uploads/b4a3ff1d-fa0f-4e7a-8584-0b818b023773.png" alt="Ministry of Education Logo" className="w-10 h-10 rounded-full object-cover" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                {pageTitle.replace(/ (Exams|Exam)$/, '')}
                <span className="text-blue-600">{pageTitle.match(/ (Exams|Exam)$/)?.[0]}</span>
              </h1>
            </div>
            
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          {!searchTerm && (
            <p className="text-gray-700 text-center mb-8 font-medium">Select your subject and year to start practicing</p>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject) => {
              const IconComponent = subject.icon;
              return (
                <div
                  key={subject.id}
                  onClick={() => navigate('subjectExams', { subjectTitle: subject.title, examType })}
                  className={`bg-white/90 backdrop-blur-sm rounded-lg border-2 ${subject.color} p-6 cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <IconComponent size={24} className="text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{subject.title}</h3>
                      <p className="text-gray-600 text-sm">{subject.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredSubjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No subjects found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamSubjectsPage;
