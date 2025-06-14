
import { BookOpen, Briefcase, GraduationCap, Award, FileText } from 'lucide-react';

const entranceSubjects = [
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

export const examTypes = {
  entrance: {
    title: 'University Entrance Exams',
    subjects: entranceSubjects,
    icon: GraduationCap,
    bgColor: 'from-blue-400 to-blue-600',
  },
  exit: {
    title: 'University Exit Exams',
    subjects: [
      { id: 1, title: 'Computer Science', description: 'Core concepts of programming, data structures, and algorithms.', icon: FileText, color: 'border-green-200 hover:border-green-300 hover:bg-green-50' },
      { id: 2, title: 'Mechanical Engineering', description: 'Fundamentals of mechanics, thermodynamics, and materials science.', icon: FileText, color: 'border-green-200 hover:border-green-300 hover:bg-green-50' },
      { id: 3, title: 'Medicine', description: 'Clinical sciences, anatomy, and patient care principles.', icon: FileText, color: 'border-green-200 hover:border-green-300 hover:bg-green-50' },
      { id: 4, title: 'Law', description: 'Constitutional law, criminal law, and legal procedures.', icon: FileText, color: 'border-green-200 hover:border-green-300 hover:bg-green-50' },
    ],
    icon: BookOpen,
    bgColor: 'from-green-400 to-green-600',
  },
  work: {
    title: 'Work Placement Exams',
    subjects: [
        { id: 1, title: 'General Aptitude', description: 'Assess your general problem-solving and logical skills.', icon: FileText, color: 'border-purple-200 hover:border-purple-300 hover:bg-purple-50' },
        { id: 2, title: 'Situational Judgement', description: 'Test your response to work-related scenarios.', icon: FileText, color: 'border-purple-200 hover:border-purple-300 hover:bg-purple-50' },
        { id: 3, title: 'English Proficiency', description: 'Evaluate your business communication skills.', icon: FileText, color: 'border-purple-200 hover:border-purple-300 hover:bg-purple-50' },
    ],
    icon: Briefcase,
    bgColor: 'from-purple-400 to-purple-600',
  },
  ngat: {
    title: 'NGAT Exams',
    subjects: [
        { id: 1, title: 'Verbal Reasoning', description: 'Analyze and evaluate written material and synthesize information.', icon: FileText, color: 'border-yellow-200 hover:border-yellow-300 hover:bg-yellow-50' },
        { id: 2, title: 'Quantitative Reasoning', description: 'Test your problem-solving ability, focusing on basic math concepts.', icon: FileText, color: 'border-yellow-200 hover:border-yellow-300 hover:bg-yellow-50' },
        { id: 3, title: 'Analytical Writing', description: 'Articulate complex ideas clearly and effectively.', icon: FileText, color: 'border-yellow-200 hover:border-yellow-300 hover:bg-yellow-50' },
    ],
    icon: Award,
    bgColor: 'from-yellow-400 to-yellow-600',
  },
};
