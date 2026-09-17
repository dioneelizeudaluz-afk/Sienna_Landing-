import { createContext, useContext } from 'react';
import { translations, TranslationKey, Language } from '../translations';

export interface LanguageContextType {
  lang: Language;
  changeLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  lang: 'pt',
  changeLang: () => {},
  t: (key) => key,
});

export function useLanguage() {
  return useContext(LanguageContext);
}