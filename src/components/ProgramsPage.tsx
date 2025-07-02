
import React from 'react';

interface ProgramsPageProps {
  navigate: (page: string, data?: any) => void;
  openModal: (type: string, data?: any) => void;
}

const ProgramsPage = ({ navigate, openModal }: ProgramsPageProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-8">Academic Programs</h1>
        <p className="text-xl text-muted-foreground">Coming soon - Comprehensive academic programs for university preparation.</p>
      </div>
    </div>
  );
};

export default ProgramsPage;
