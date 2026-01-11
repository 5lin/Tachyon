import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { translations, type Language, type TranslationKey } from '../lib/i18n'

interface I18nContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: TranslationKey, params?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem('tachyon-language')
        if (saved === 'zh' || saved === 'en') return saved
        // Default to English
        return 'en'
    })

    useEffect(() => {
        localStorage.setItem('tachyon-language', language)
    }, [language])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
    }

    const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
        let text: string = translations[language][key] ?? translations.en[key] ?? key
        if (params) {
            Object.entries(params).forEach(([k, v]) => {
                text = text.replace(`{${k}}`, String(v))
            })
        }
        return text
    }

    return (
        <I18nContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </I18nContext.Provider>
    )
}

export function useI18n() {
    const context = useContext(I18nContext)
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider')
    }
    return context
}
