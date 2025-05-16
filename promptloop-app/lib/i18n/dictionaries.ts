import 'server-only';
import { Locale } from '../types';

// Dictionary type
interface Dictionary {
  [key: string]: {
    [key: string]: string | {
      [key: string]: string;
    }
  }
}

// Locales with RTL support
const locales: Locale[] = [
  { lang: 'en', isRTL: false },
  { lang: 'ar', isRTL: true }
];

export const getLocales = (): Locale[] => {
  return locales;
};

// Dictionary getter
export const getDictionary = async (locale: string): Promise<Dictionary> => {
  // Determine which dictionary to load
  const lang = locale === 'ar' ? 'ar' : 'en';
  
  try {
    return (await import(`./dictionaries/${lang}.json`)).default;
  } catch (error) {
    console.error(`Error loading dictionary for locale: ${lang}`, error);
    // Fallback to English
    return (await import('./dictionaries/en.json')).default;
  }
};

// Helper to check if RTL
export const isRTL = (locale: string): boolean => {
  return locale === 'ar';
}; 