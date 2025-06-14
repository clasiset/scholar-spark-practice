
import React from 'react';
import BackButton from './BackButton';
import { useI18n } from '../i18n/i18nContext';

const AboutPage = ({ goBack, previousPageName }: { goBack?: () => void, previousPageName?: string | null }) => {
  const { t } = useI18n();
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <BackButton onClick={goBack} previousPageName={previousPageName} />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">{t.about.title}</h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-600 mb-6">
              {t.about.description1}
            </p>
            <p className="text-lg text-gray-600">
              {t.about.description2}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
