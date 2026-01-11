import { useEffect, useState } from 'react'
import { useI18n } from '../contexts/I18nContext'
import { useTheme } from '../contexts/ThemeContext'

interface SettingsModalProps {
    isOpen: boolean
    onClose: () => void
}

type Tab = 'general' | 'reader' | 'about'

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const { t, language, setLanguage } = useI18n()
    const { theme, setTheme } = useTheme()
    const [activeTab, setActiveTab] = useState<Tab>('general')

    // Preload Logic
    const [preloadCount, setPreloadCount] = useState(() => {
        return parseInt(localStorage.getItem('tachyon-preload-count') || '3')
    })

    useEffect(() => {
        if (isOpen) {
            setPreloadCount(parseInt(localStorage.getItem('tachyon-preload-count') || '3'))
        }
    }, [isOpen])

    const handlePreloadChange = (count: number) => {
        setPreloadCount(count)
        localStorage.setItem('tachyon-preload-count', count.toString())
    }

    if (!isOpen) return null

    const tabs = [
        {
            id: 'general' as Tab,
            label: t('general'),
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            )
        },
        {
            id: 'reader' as Tab,
            label: t('reader'),
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            )
        },
        {
            id: 'about' as Tab,
            label: t('about'),
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ]

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

            {/* Modal Container */}
            <div className="relative w-full max-w-3xl h-[600px] bg-[var(--color-bg)] rounded-2xl shadow-2xl ring-1 ring-white/10 overflow-hidden transform transition-all animate-scale-in flex">

                {/* Sidebar */}
                <div className="w-56 flex-shrink-0 bg-[var(--color-bg-card)] border-r border-[var(--color-border)] p-4 flex flex-col gap-2">
                    <div className="px-2 py-4 mb-2">
                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-accent)] to-purple-500">
                            {t('settings')}
                        </h2>
                    </div>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                    ? 'bg-[var(--color-bg-hover)] text-[var(--color-text)] shadow-sm'
                                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-hover)]'
                                }`}
                        >
                            <span className={`transition-colors ${activeTab === tab.id ? 'text-[var(--color-accent)]' : ''}`}>
                                {tab.icon}
                            </span>
                            {tab.label}
                        </button>
                    ))}

                    <div className="mt-auto px-2 py-4">
                        <p className="text-xs text-[var(--color-text-muted)] opacity-50 text-center">Tachyon v1.0.0</p>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col min-w-0 bg-[var(--color-bg)]/50">
                    {/* Header */}
                    <div className="flex-shrink-0 px-8 py-5 flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md sticky top-0 z-10">
                        <h3 className="text-lg font-semibold">{tabs.find(t => t.id === activeTab)?.label}</h3>
                        <button
                            onClick={onClose}
                            className="p-2 -mr-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-8">
                        {activeTab === 'general' && (
                            <div className="space-y-8 animate-fade-in">
                                {/* Appearance */}
                                <section className="space-y-4">
                                    <h4 className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wider">{t('appearance')}</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setTheme('light')}
                                            className={`p-4 rounded-xl border transition-all text-left group ${theme === 'light'
                                                    ? 'bg-[var(--color-bg-card)] border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]'
                                                    : 'bg-[var(--color-bg-card)] border-[var(--color-border)] hover:border-[var(--color-border-hover)]'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' : 'bg-[var(--color-bg-hover)] text-[var(--color-text-muted)]'}`}>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                                    </svg>
                                                </div>
                                                {theme === 'light' && <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />}
                                            </div>
                                            <span className="font-medium">{t('light')}</span>
                                        </button>

                                        <button
                                            onClick={() => setTheme('dark')}
                                            className={`p-4 rounded-xl border transition-all text-left group ${theme === 'dark'
                                                    ? 'bg-[var(--color-bg-card)] border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]'
                                                    : 'bg-[var(--color-bg-card)] border-[var(--color-border)] hover:border-[var(--color-border-hover)]'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' : 'bg-[var(--color-bg-hover)] text-[var(--color-text-muted)]'}`}>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                                    </svg>
                                                </div>
                                                {theme === 'dark' && <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />}
                                            </div>
                                            <span className="font-medium">{t('dark')}</span>
                                        </button>
                                    </div>
                                </section>

                                {/* Language */}
                                <section className="space-y-4">
                                    <h4 className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wider">{t('language')}</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setLanguage('en')}
                                            className={`p-4 rounded-xl border transition-all text-left ${language === 'en'
                                                    ? 'bg-[var(--color-bg-card)] border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]'
                                                    : 'bg-[var(--color-bg-card)] border-[var(--color-border)] hover:border-[var(--color-border-hover)]'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-800">EN</div>
                                                <span className="font-medium">English</span>
                                            </div>
                                        </button>

                                        <button
                                            onClick={() => setLanguage('zh')}
                                            className={`p-4 rounded-xl border transition-all text-left ${language === 'zh'
                                                    ? 'bg-[var(--color-bg-card)] border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]'
                                                    : 'bg-[var(--color-bg-card)] border-[var(--color-border)] hover:border-[var(--color-border-hover)]'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-xs font-bold text-red-800">ZH</div>
                                                <span className="font-medium">中文</span>
                                            </div>
                                        </button>
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === 'reader' && (
                            <div className="space-y-8 animate-fade-in">
                                <section className="space-y-4">
                                    <h4 className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wider">{t('preloadPages')}</h4>
                                    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-1 flex">
                                        {[3, 5, 10, 999].map(count => (
                                            <button
                                                key={count}
                                                onClick={() => handlePreloadChange(count)}
                                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${preloadCount === count
                                                        ? 'bg-[var(--color-bg-elevated)] text-[var(--color-text)] shadow-sm ring-1 ring-black/5 dark:ring-white/10'
                                                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                                                    }`}
                                            >
                                                {count === 999 ? 'All' : count}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-sm text-[var(--color-text-muted)] flex items-start gap-2">
                                        <svg className="w-5 h-5 flex-shrink-0 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {t('preloadHint')}
                                    </p>
                                </section>
                            </div>
                        )}

                        {activeTab === 'about' && (
                            <div className="text-center py-12 animate-fade-in">
                                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[var(--color-accent)] to-purple-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-xl shadow-[var(--color-accent)]/30">
                                    T
                                </div>
                                <h2 className="text-2xl font-bold mb-2">Tachyon</h2>
                                <p className="text-[var(--color-text-muted)] mb-8">Lightning-fast Comic Reader</p>

                                <div className="max-w-xs mx-auto space-y-3">
                                    <div className="flex justify-between text-sm py-2 border-b border-[var(--color-border)]">
                                        <span className="text-[var(--color-text-muted)]">{t('version')}</span>
                                        <span className="font-mono">v1.0.0</span>
                                    </div>
                                    <div className="flex justify-between text-sm py-2 border-b border-[var(--color-border)]">
                                        <span className="text-[var(--color-text-muted)]">Build</span>
                                        <span className="font-mono">2026.1</span>
                                    </div>
                                    <div className="flex justify-between text-sm py-2">
                                        <span className="text-[var(--color-text-muted)]">GitHub</span>
                                        <a href="https://github.com/5lin/Tachyon" target="_blank" rel="noopener" className="text-[var(--color-accent)] hover:underline">5lin/Tachyon</a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
