import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';
import { getLocales } from '@/lib/i18n/dictionaries';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locales = getLocales();
  const [currentLocale, setCurrentLocale] = useState('en');

  useEffect(() => {
    // Extract locale from pathname or from localStorage
    const savedLocale = localStorage.getItem('locale') || 'en';
    setCurrentLocale(savedLocale);
    
    // Add RTL class to body if Arabic
    if (savedLocale === 'ar') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [pathname]);

  const switchLanguage = (locale: string) => {
    localStorage.setItem('locale', locale);
    setCurrentLocale(locale);
    
    // Update RTL class
    if (locale === 'ar') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
    
    // Reload page to apply new language
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          {currentLocale === 'en' ? 'EN' : 'العربية'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem 
            key={locale.lang}
            onClick={() => switchLanguage(locale.lang)}
            className={currentLocale === locale.lang ? 'bg-muted' : ''}
          >
            {locale.lang === 'en' ? 'English' : 'العربية'}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 