
import React from 'react';
import BreadcrumbNav from './BreadcrumbNav';

interface HistoryEntry {
  page: string;
  data: any | null;
}

interface BlogPageProps {
  history: HistoryEntry[];
  navigateToHistory: (index: number) => void;
  navigate: (page: string, data?: any) => void;
  openModal: (type: string, data?: any) => void;
}

const BlogPage = ({ history, navigateToHistory, navigate, openModal }: BlogPageProps) => {
  return (
    <div className="min-h-screen bg-background py-12 text-foreground">
      <div className="container mx-auto px-6">
        <BreadcrumbNav history={history} navigateToHistory={navigateToHistory} />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-8">Blog & Articles</h1>
          <p className="text-xl text-muted-foreground">Stay updated with the latest insights, tips, and educational content.</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
