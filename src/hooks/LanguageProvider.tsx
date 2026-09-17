import { useState, useEffect } from 'react';
import { translations, TranslationKey, Language } from '../translations';
import { LanguageContext } from './useLanguage';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('pt');

  useEffect(() => {
    const saved = localStorage.getItem('sienna-language') as Language;
    if (saved && ['pt', 'en', 'es'].includes(saved)) {
      setLang(saved);
    }
  }, []);

  const changeLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('sienna-language', newLang);
  };

  const t = (key: TranslationKey): string => {
    return translations[lang][key] || translations.pt[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}