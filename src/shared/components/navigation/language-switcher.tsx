import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#384E85]/15 text-xs font-semibold text-[#384E85] dark:text-indigo-300 hover:bg-[#384E85]/5 transition cursor-pointer"
      title="Switch Language (LTR / RTL)"
    >
      <Globe className="w-3.5 h-3.5" />
      <span>{i18n.language === 'ar' ? 'English (LTR)' : 'العربية (RTL)'}</span>
    </button>
  );
};
