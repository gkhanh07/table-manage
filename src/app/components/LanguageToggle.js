"use client";
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
    const { currentLanguage, changeLanguage, languages } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const currentLang = languages.find(lang => lang.code === currentLanguage);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/80 backdrop-blur-sm border border-slate-200 hover:bg-white/90 transition-all duration-200 shadow-sm"
            >
                <span className="text-lg">{currentLang?.flag}</span>
                <span className="text-sm font-medium text-slate-700">{currentLang?.code.toUpperCase()}</span>
                <svg
                    className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-slate-200 py-1 min-w-[150px] z-50">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            onClick={() => {
                                changeLanguage(language.code);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${currentLanguage === language.code
                                    ? 'bg-blue-50 text-blue-700 font-medium'
                                    : 'text-slate-700'
                                }`}
                        >
                            <span className="text-lg">{language.flag}</span>
                            <span>{language.name}</span>
                            {currentLanguage === language.code && (
                                <svg className="w-4 h-4 ml-auto text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Click outside to close */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default LanguageToggle;
