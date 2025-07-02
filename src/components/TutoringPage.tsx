
import React from 'react';

interface TutoringPageProps {
  navigate: (page: string, data?: any) => void;
  openModal: (type: string, data?: any) => void;
}

const TutoringPage = ({ navigate, openModal }: TutoringPageProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-8">Personal Tutoring</h1>
        <p className="text-xl text-muted-foreground">Connect with expert tutors for personalized learning experiences.</p>
      </div>
    </div>
  );
};

export default TutoringPage;
