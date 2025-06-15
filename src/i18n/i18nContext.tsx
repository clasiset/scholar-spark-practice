import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'am' | 'om' | 'ar';

interface TranslationKeys {
  navigation: {
    home: string;
    courses: string;
    exams: string;
    subscription: string;
    aboutUs: string;
    contactUs: string;
    allCourses: string;
    programs: string;
    tutoring: string;
    entranceExam: string;
    exitExam: string;
    workExam: string;
    ngatExam: string;
  };
  auth: {
    login: string;
    signUp: string;
    logout: string;
    editProfile: string;
    settings: string;
    notifications: string;
    studentAccount: string;
  };
  home: {
    welcomeMessage: string;
    heroTitle: string;
    heroSubtitle: string;
    getStarted: string;
  };
  profile: {
    seePublicProfile: string;
    updateInformation: string;
    accountPrivacySettings: string;
    managePreferences: string;
    billingPlans: string;
    logoutAccount: string;
  };
  common: {
    search: string;
    loading: string;
    error: string;
    success: string;
    cancel: string;
    save: string;
    submit: string;
    back: string;
  };
}

interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationKeys;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const languageNames = {
  en: 'English',
  am: 'አማርኛ',
  om: 'Afan Oromo',
  ar: 'العربية'
};

const rtlLanguages = ['ar'];

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('preferred-language');
    if (saved && ['en', 'am', 'om', 'ar'].includes(saved)) {
      return saved as Language;
    }
    
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    if (['en', 'am', 'om', 'ar'].includes(browserLang)) {
      return browserLang as Language;
    }
    
    return 'en';
  });

  const [translations, setTranslations] = useState<TranslationKeys | null>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`./translations/${language}.json`);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to English
        const fallbackModule = await import('./translations/en.json');
        setTranslations(fallbackModule.default);
      }
    };

    loadTranslations();
  }, [language]);

  useEffect(() => {
    localStorage.setItem('preferred-language', language);
    
    // Set HTML dir attribute for RTL support
    const isRTL = rtlLanguages.includes(language);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const isRTL = rtlLanguages.includes(language);

  if (!translations) {
    return <div>Loading...</div>;
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t: translations, isRTL }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

export { languageNames };
export type { Language };
