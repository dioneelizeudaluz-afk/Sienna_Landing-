import { useState, useEffect, createContext, useContext } from 'react';
import { translations, TranslationKey, Language } from '../translations';

interface LanguageContextType {
  lang: Language;
  changeLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'pt',
  changeLang: () => {},
  t: (key) => key,
});

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

export function useLanguage() {
  return useContext(LanguageContext);
}