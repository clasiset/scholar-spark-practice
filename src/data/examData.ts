import { FileText, Book, Briefcase, BrainCircuit } from 'lucide-react';

export const examData = {
  entrance: {
    title: 'Entrance Exam',
    subjects: [
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
    ]
  },
  exit: {
    title: 'Exit Exam',
    subjects: [
      { id: 1, title: 'Computer Science', description: 'Test your knowledge in core computer science concepts.', icon: Book, color: 'border-blue-200 hover:border-blue-300 hover:bg-blue-50' },
      { id: 2, title: 'Mechanical Engineering', description: 'Assess your understanding of mechanical engineering principles.', icon: Book, color: 'border-green-200 hover:border-green-300 hover:bg-green-50' },
      { id: 3, title: 'Medicine', description: 'Prepare for your medical board exit exams.', icon: Book, color: 'border-red-200 hover:border-red-300 hover:bg-red-50' },
      { id: 4, title: 'Law', description: 'Review key concepts and case law for your law school exit exam.', icon: Book, color: 'border-yellow-200 hover:border-yellow-300 hover:bg-yellow-50' },
    ]
  },
  work: {
    title: 'Work Exam',
    subjects: [
      { id: 1, title: 'Professional Communication', description: 'Evaluate your business communication skills.', icon: Briefcase, color: 'border-purple-200 hover:border-purple-300 hover:bg-purple-50' },
      { id: 2, title: 'Software Development', description: 'Test your practical coding and problem-solving skills.', icon: Briefcase, color: 'border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50' },
      { id: 3, title: 'Project Management', description: 'Assess your knowledge of project management methodologies.', icon: Briefcase, color: 'border-yellow-200 hover:border-yellow-300 hover:bg-yellow-50' },
      { id: 4, title: 'Financial Accounting', description: 'Prepare for accounting roles with these exam questions.', icon: Briefcase, color: 'border-green-200 hover:border-green-300 hover:bg-green-50' },
    ]
  },
  ngat: {
    title: 'NGAT Exam',
    subjects: [
      { id: 1, title: 'Verbal Reasoning', description: 'Practice verbal reasoning questions for NGAT.', icon: BrainCircuit, color: 'border-teal-200 hover:border-teal-300 hover:bg-teal-50' },
      { id: 2, title: 'Numerical Reasoning', description: 'Test your numerical reasoning skills for NGAT.', icon: BrainCircuit, color: 'border-orange-200 hover:border-orange-300 hover:bg-orange-50' },
      { id: 3, title: 'Abstract Reasoning', description: 'Prepare for abstract reasoning challenges in NGAT.', icon: BrainCircuit, color: 'border-pink-200 hover:border-pink-300 hover:bg-pink-50' },
      { id: 4, title: 'Situational Judgement', description: 'Assess your ability to handle workplace scenarios.', icon: BrainCircuit, color: 'border-blue-200 hover:border-blue-300 hover:bg-blue-50' },
    ]
  }
};
