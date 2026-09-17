import { useState, useEffect } from 'react';
import { translations, TranslationKey } from '../translations';
import type { Language } from '../config/config';

export function useLanguage() {
  const [lang, setLang] = useState<Language>('pt');

  useEffect(() => {
    const saved = localStorage.getItem('sienna_lang') as Language;
    if (saved && ['pt', 'en', 'es'].includes(saved)) setLang(saved);
  }, []);

  const changeLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('sienna_lang', newLang);
  };

  const t = (key: TranslationKey): string => translations[lang][key] || key;

  return { lang, changeLang, t };
}