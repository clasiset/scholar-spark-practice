
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
    <div className="min-h-screen bg-background py-6 sm:py-8 md:py-12 text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <BreadcrumbNav history={history} navigateToHistory={navigateToHistory} />
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 md:mb-8">
            Subscription Plans
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Choose the perfect plan for your learning journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
