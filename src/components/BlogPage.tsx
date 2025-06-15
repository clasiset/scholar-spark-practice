
import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import BackButton from './BackButton';

const blogPosts = [
  {
    title: "How AI is Changing the Way Students Prepare for Exams",
    topics: [
      "Personalized learning with AI tutors",
      "AI-powered flashcards and spaced repetition apps",
      "Adaptive testing platforms",
      "Real-life examples (e.g., ChatGPT, Quizlet AI)",
      "Pros & cons of using AI for exam prep",
    ],
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Top 7 Free Online Courses Every Student Should Try in 2025",
    topics: [
      "Best platforms (Coursera, edX, Khan Academy)",
      "Courses in AI, coding, digital marketing, languages",
      "Why micro-courses (short online courses) are trending",
      "Certification benefits for students' CVs",
    ],
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "The Future of Educational Testing: Are Traditional Exams Becoming Obsolete?",
    topics: [
      "Shift to project-based assessments",
      "AI-driven adaptive testing",
      "Online proctoring technologies",
      "Equity challenges with online exams",
    ],
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Using AI to Beat Procrastination: Study Tools You Need to Know",
    topics: [
      "Focus apps using AI (e.g., time management, focus music)",
      "GPT-powered writing assistants for essays",
      "AI note summarizers (e.g., Notion AI)",
      "How to build a productive study routine with AI",
    ],
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Revolutionizing Language Learning: How AI Tools Make Mastering a New Language Easier",
    topics: [
      "Real-time translation tools",
      "AI conversation partners",
      "Voice recognition apps for pronunciation",
      "AI-generated quizzes to test language skills",
    ],
    imageUrl: "https://images.unsplash.com/photo-1521335293386-343ade58e232?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const BlogPage = ({ goBack, previousPageName }) => {
  return (
    <div className="bg-background py-12 text-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
            <BackButton onClick={goBack} previousPageName={previousPageName} />
        </div>
        <h1 className="text-4xl font-bold text-center text-foreground mb-2">From Our Blog</h1>
        <p className="text-lg text-center text-muted-foreground mb-12">Insights and articles on modern education and AI.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-card rounded-xl border border-border overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="aspect-w-16 aspect-h-9">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-card-foreground mb-4 flex-grow">{post.title}</h3>
                <ul className="space-y-2 mb-6 text-muted-foreground text-sm">
                  {post.topics.map((topic, i) => (
                    <li key={i} className="flex items-start">
                      <Star size={14} className="mr-3 mt-1 text-accent flex-shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <button
                    className="font-semibold text-primary flex items-center gap-2 group-hover:text-primary/80 transition-colors"
                  >
                    Read More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
