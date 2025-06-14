
import React from 'react';
import { useI18n } from '../i18n/i18nContext';

const Footer = () => {
  const { t } = useI18n();
  
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Zehulu.com</h3>
            <p className="text-gray-300">
              {t.footer.tagline}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">{t.navigation.home}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">{t.navigation.courses}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">{t.navigation.aboutUs}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">{t.navigation.contactUs}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.exams}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">{t.footer.mathematics}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">{t.footer.physics}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">{t.footer.chemistry}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">{t.footer.biology}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.support}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">{t.footer.helpCenter}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">{t.footer.privacyPolicy}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300">{t.footer.termsOfService}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">&copy; 2024 Zehulu.com. {t.footer.allRightsReserved}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
