"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../../locales/en.json';
import viTranslations from '../../locales/vi.json';

const LanguageContext = createContext();

const translations = {
    en: enTranslations,
    vi: viTranslations
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState('en');

    useEffect(() => {
        // Load language from localStorage on mount
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && translations[savedLanguage]) {
            setCurrentLanguage(savedLanguage);
        }
    }, []);

    const changeLanguage = (language) => {
        if (translations[language]) {
            setCurrentLanguage(language);
            localStorage.setItem('language', language);
        }
    };

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[currentLanguage];

        for (const k of keys) {
            value = value?.[k];
        }

        return value || key;
    };

    const value = {
        currentLanguage,
        changeLanguage,
        t,
        languages: [
            { code: 'en', name: 'English', flag: '🇺🇸' },
            { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' }
        ]
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
