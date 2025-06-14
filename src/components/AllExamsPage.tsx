
import React, { useState } from 'react';
import { FileText, ArrowRight } from 'lucide-react';
import BackButton from './BackButton';

const subjectsData = {
  'Entrance': [
    { title: 'Aptitude Test', description: 'Enhance your logical reasoning, problem-solving, and analytical thinking abilities.', borderColor: 'hover:border-blue-400' },
    { title: 'Biology', description: 'Study life sciences including cell biology, genetics, ecology, and human anatomy.', borderColor: 'hover:border-green-400' },
    { title: 'Chemistry', description: 'Explore chemical reactions, atomic theory, and organic/inorganic chemistry.', borderColor: 'hover:border-purple-400' },
    { title: 'Civics & Ethical Education', description: 'Learn about citizenship, democracy, ethics, and civic responsibilities.', borderColor: 'hover:border-blue-400' },
    { title: 'Economics', description: 'Study micro and macroeconomics, market systems, and economic policies.', borderColor: 'hover:border-yellow-400' },
    { title: 'English', description: 'Practice English language entrance exam questions covering grammar, vocabulary, and comprehension.', borderColor: 'hover:border-red-400' },
    { title: 'Geography', description: 'Learn about physical geography, human geography, and environmental studies.', borderColor: 'hover:border-teal-400' },
    { title: 'History', description: 'Explore Ethiopian and world history, civilizations, and historical events.', borderColor: 'hover:border-orange-400' },
    { title: 'Mathematics for Natural Sciences', description: 'Test your skills in algebra, geometry, calculus, and other mathematical concepts.', borderColor: 'hover:border-pink-400' }
  ],
  'Exit': [
    { title: 'Computer Science', description: 'Covers core concepts of computer science for exit exam.', borderColor: 'hover:border-blue-400' },
    { title: 'Medicine', description: 'Comprehensive review for medical school exit exams.', borderColor: 'hover:border-green-400' },
    { title: 'Law', description: 'Prepare for your law school final assessment.', borderColor: 'hover:border-purple-400' },
    { title: 'Engineering', description: 'Civil, Mechanical, and Electrical engineering exit exam prep.', borderColor: 'hover:border-yellow-400' },
  ],
  'NGAT': [
    { title: 'Verbal Reasoning', description: 'Improve your verbal analysis and comprehension skills.', borderColor: 'hover:border-blue-400' },
    { title: 'Quantitative Reasoning', description: 'Sharpen your mathematical and data interpretation abilities.', borderColor: 'hover:border-green-400' },
    { title: 'Analytical Writing', description: 'Practice structured and persuasive essay writing.', borderColor: 'hover:border-purple-400' },
  ],
  'Work Placement': [
    { title: 'Situational Judgement', description: 'Assess your professional decision-making skills.', borderColor: 'hover:border-blue-400' },
    { title: 'Logical Reasoning', description: 'Test your ability to analyze patterns and logical arguments.', borderColor: 'hover:border-green-400' },
    { title: 'Numerical Reasoning', description: 'Evaluate your ability to work with numbers and data.', borderColor: 'hover:border-purple-400' },
  ],
};

const examTypes = [
  { type: 'Entrance', title: 'Entrance Exams', description: 'Ace your university entrance tests.' },
  { type: 'Exit', title: 'Exit Exams', description: 'Prepare for your graduation assessment.' },
  { type: 'NGAT', title: 'NGAT Exams', description: 'National Graduate Admission Test prep.' },
  { type: 'Work Placement', title: 'Work Placement Exams', description: 'Get ready for pre-employment tests.' }
];

const AllExamsPage = ({ navigate, goBack, previousPageName }) => {
  const [selectedExamType, setSelectedExamType] = useState<string | null>(null);

  const handleSelectExamType = (examType: string) => {
    setSelectedExamType(examType);
  };

  const handleGoBackToExamTypes = () => {
    setSelectedExamType(null);
  }

  const subjects = selectedExamType ? subjectsData[selectedExamType] || [] : [];
  const currentExamType = selectedExamType ? examTypes.find(e => e.type === selectedExamType) : null;

  if (!selectedExamType) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8">
        <BackButton onClick={goBack} previousPageName={previousPageName} />
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">Select Exam Type</h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Choose the type of exam you want to prepare for.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {examTypes.map((exam) => (
            <div
              key={exam.type}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col"
              onClick={() => handleSelectExamType(exam.type)}
            >
              <div className="flex-grow">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{exam.title}</h2>
                <p className="text-gray-600 mb-4">{exam.description}</p>
              </div>
              <div className="flex justify-end">
                <button className="mt-auto bg-blue-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center">
                  Select <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <BackButton onClick={handleGoBackToExamTypes} previousPageName="Exam Types" />
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">{currentExamType?.title}</h1>
      <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Select your subject and year to start practicing
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className={`bg-white rounded-lg p-6 transition-all duration-300 cursor-pointer border-2 border-gray-200 hover:shadow-lg ${subject.borderColor} hover:scale-105 transform`}
            onClick={() => navigate('subjectExams', { subjectTitle: subject.title, examType: selectedExamType })}
          >
            <div className="flex items-start">
              <div className="bg-gray-100 p-3 rounded-lg mr-4 flex-shrink-0">
                <FileText className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">{subject.title}</h2>
                <p className="text-sm text-gray-600">{subject.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllExamsPage;
