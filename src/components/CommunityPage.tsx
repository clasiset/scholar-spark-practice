
import React from 'react';
import BackButton from './BackButton';

const CommunityPage = ({ goBack, previousPageName }: { goBack?: () => void, previousPageName?: string | null }) => {
  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="container mx-auto px-6">
        <BackButton onClick={goBack} previousPageName={previousPageName} />
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Student Community</h1>
          <p className="text-xl text-muted-foreground">Join our community of learners and share your academic journey.</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
