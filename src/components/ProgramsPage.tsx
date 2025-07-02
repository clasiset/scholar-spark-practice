
import React from 'react';
import BreadcrumbNav from './BreadcrumbNav';
import { User } from '../types';

interface HistoryEntry {
  page: string;
  data: any | null;
}

interface ProgramsPageProps {
  navigate: (page: string, data?: any) => void;
  openModal: (type: string, data?: any) => void;
  user?: User | null;
}

const ProgramsPage = ({ navigate, openModal, user }: ProgramsPageProps) => {
  return (
    <div className="min-h-screen bg-background py-12 text-foreground">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-8">Academic Programs</h1>
          <p className="text-xl text-muted-foreground">Comprehensive programs designed to advance your career and knowledge.</p>
        </div>
      </div>
    </div>
  );
};

export default ProgramsPage;
