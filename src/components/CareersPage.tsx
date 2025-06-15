
import React from 'react';
import BackButton from './BackButton';

const CareersPage = ({ goBack, previousPageName }: { goBack?: () => void, previousPageName?: string | null }) => {
  return (
    <div className="min-h-screen bg-background py-12 text-foreground">
      <div className="container mx-auto px-6">
        <BackButton onClick={goBack} previousPageName={previousPageName} />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-8">Career Opportunities</h1>
          <p className="text-xl text-muted-foreground">Explore career paths and opportunities after your academic journey.</p>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
