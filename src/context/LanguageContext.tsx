"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import frTranslations from '@/locales/fr.json';
import enTranslations from '@/locales/en.json';

export type Language = 'fr' | 'en';

interface Translations {
    [key: string]: string | Translations;
}

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Translations> = {
    fr: frTranslations,
    en: enTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getNestedValue(obj: Translations, path: string): string {
    const keys = path.split('.');
    let current: string | Translations = obj;

    for (const key of keys) {
        if (typeof current === 'object' && current !== null && key in current) {
            current = current[key];
        } else {
            return path; // Return the key if not found
        }
    }

    return typeof current === 'string' ? current : path;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('fr');
    const [isHydrated, setIsHydrated] = useState(false);

    // Load language from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('invoicedesign-language');
        if (stored === 'en' || stored === 'fr') {
            setLanguageState(stored);
        }
        setIsHydrated(true);
    }, []);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('invoicedesign-language', lang);
    }, []);

    const t = useCallback((key: string): string => {
        return getNestedValue(translations[language], key);
    }, [language]);

    // Prevent hydration mismatch by returning default language until hydrated
    const value = {
        language: isHydrated ? language : 'fr',
        setLanguage,
        t,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

// Alias for convenience
export const useTranslation = useLanguage;
