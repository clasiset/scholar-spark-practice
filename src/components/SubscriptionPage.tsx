
import React from 'react';
import BreadcrumbNav from './BreadcrumbNav';
import { User } from '../types';

interface HistoryEntry {
  page: string;
  data: any | null;
}

interface SubscriptionPageProps {
  openModal: (type: string, data?: any) => void;
  history: HistoryEntry[];
  navigateToHistory: (index: number) => void;
  navigate: (page: string, data?: any) => void;
  user: User | null;
}

const SubscriptionPage = ({ openModal, history, navigateToHistory, navigate, user }: SubscriptionPageProps) => {
  return (
    <div className="min-h-screen bg-background py-12 text-foreground">
      <div className="container mx-auto px-6">
        <BreadcrumbNav history={history} navigateToHistory={navigateToHistory} />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-8">Subscription Plans</h1>
          <p className="text-xl text-muted-foreground">Choose the perfect plan for your learning journey.</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
