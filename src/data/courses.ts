
export interface Course {
  id: number;
  title: string;
  code: string;
  description: string;
  department: string;
  level: string;
  studyMode: string;
  duration: string;
  credits: number;
  startDate: string;
}

// Mock data with more details
export const allCourses: Course[] = [
  { id: 1, title: 'Advanced Mathematics', code: 'MATH301', description: 'Comprehensive math preparation for university entrance.', department: 'Mathematics', level: 'Undergraduate', studyMode: 'On-Campus', duration: '1 Year', credits: 15, startDate: 'Fall 2025' },
  { id: 2, title: 'Physics Fundamentals', code: 'PHY101', description: 'Essential physics concepts for science and engineering students.', department: 'Physics', level: 'Undergraduate', studyMode: 'On-Campus', duration: '1 Year', credits: 15, startDate: 'Fall 2025' },
  { id: 3, title: 'Chemistry Basics', code: 'CHEM101', description: 'Core chemistry principles and lab practices.', department: 'Chemistry', level: 'Undergraduate', studyMode: 'Blended', duration: '1 Year', credits: 15, startDate: 'Fall 2025' },
  { id: 4, title: 'Introduction to Programming', code: 'CS101', description: 'Learn to code with Python. No prior experience required.', department: 'Computer Science', level: 'Undergraduate', studyMode: 'Online', duration: '12 Weeks', credits: 5, startDate: 'Spring 2026' },
  { id: 5, title: 'Masters in Business Administration', code: 'MBA500', description: 'Develop leadership skills for the modern business world.', department: 'Business', level: 'Graduate', studyMode: 'Full-time', duration: '2 Years', credits: 60, startDate: 'Fall 2025' },
  { id: 6, title: 'Digital Marketing Certificate', code: 'MKTG250', description: 'A short course on social media marketing, SEO, and content strategy.', department: 'Business', level: 'Certificate', studyMode: 'Online', duration: '6 Weeks', credits: 0, startDate: 'Rolling' },
];

export const departments = [...new Set(allCourses.map(c => c.department))];
export const levels = [...new Set(allCourses.map(c => c.level))];
export const studyModes = [...new Set(allCourses.map(c => c.studyMode))];
