import React, { useState } from 'react';
import { Search, FileText, ArrowLeft } from 'lucide-react';

const EntranceExamsPage = ({ navigate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const subjects = [
    { 
      id: 1, 
      title: 'Aptitude Test', 
      description: 'Enhance your logical reasoning, problem-solving, and analytical thinking abilities.',
      icon: FileText,
      color: 'border-blue-200 hover:border-blue-300 hover:bg-blue-50'
    },
    { 
      id: 2, 
      title: 'Biology', 
      description: 'Study life sciences including cell biology, genetics, ecology, and human anatomy.',
      icon: FileText,
      color: 'border-green-200 hover:border-green-300 hover:bg-green-50'
    },
    { 
      id: 3, 
      title: 'Chemistry', 
      description: 'Explore chemical reactions, atomic theory, and organic/inorganic chemistry.',
      icon: FileText,
      color: 'border-purple-200 hover:border-purple-300 hover:bg-purple-50'
    },
    { 
      id: 4, 
      title: 'Civics & Ethical Education', 
      description: 'Learn about citizenship, democracy, ethics, and civic responsibilities.',
      icon: FileText,
      color: 'border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50'
    },
    { 
      id: 5, 
      title: 'Economics', 
      description: 'Study micro and macroeconomics, market systems, and economic policies.',
      icon: FileText,
      color: 'border-yellow-200 hover:border-yellow-300 hover:bg-yellow-50'
    },
    { 
      id: 6, 
      title: 'English', 
      description: 'Practice English language entrance exam questions covering grammar, vocabulary, and comprehension.',
      icon: FileText,
      color: 'border-red-200 hover:border-red-300 hover:bg-red-50'
    },
    { 
      id: 7, 
      title: 'Geography', 
      description: 'Learn about physical geography, human geography, and environmental studies.',
      icon: FileText,
      color: 'border-teal-200 hover:border-teal-300 hover:bg-teal-50'
    },
    { 
      id: 8, 
      title: 'History', 
      description: 'Explore Ethiopian and world history, civilizations, and historical events.',
      icon: FileText,
      color: 'border-orange-200 hover:border-orange-300 hover:bg-orange-50'
    },
    { 
      id: 9, 
      title: 'Mathematics for Natural Sciences', 
      description: 'Test your skills in algebra, geometry, calculus, and other mathematical concepts.',
      icon: FileText,
      color: 'border-pink-200 hover:border-pink-300 hover:bg-pink-50'
    }
  ];

  const filteredSubjects = subjects.filter(subject =>
    subject.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen relative">
      {/* Education Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(249, 250, 251, 0.95), rgba(243, 244, 246, 0.95)), url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`
        }}
      />
      
      {/* Content overlay */}
      <div className="relative z-10">
        <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
          <div className="container mx-auto px-6 py-6">
            <button
              onClick={() => navigate('home')}
              className="flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Home
            </button>
            
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 shadow-md">
                <img src="/lovable-uploads/b4a3ff1d-fa0f-4e7a-8584-0b818b023773.png" alt="Ministry of Education Logo" className="w-10 h-10 rounded-full object-cover" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">University Entrance <span className="text-blue-600">Exams</span></h1>
            </div>
            
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          <p className="text-gray-700 text-center mb-8 font-medium">Select your subject and year to start practicing</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject) => {
              const IconComponent = subject.icon;
              return (
                <div
                  key={subject.id}
                  onClick={() => navigate('subjectExams', { subjectTitle: subject.title })}
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

export default EntranceExamsPage;
