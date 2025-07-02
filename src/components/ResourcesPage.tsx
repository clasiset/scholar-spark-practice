
import React from 'react';

interface ResourcesPageProps {
  navigate: (page: string, data?: any) => void;
  openModal: (type: string, data?: any) => void;
}

const ResourcesPage = ({ navigate, openModal }: ResourcesPageProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-8">Learning Resources</h1>
        <p className="text-xl text-muted-foreground">Access study materials, guides, and additional learning resources.</p>
      </div>
    </div>
  );
};

export default ResourcesPage;
