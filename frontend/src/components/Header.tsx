import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

interface HeaderProps {
    title?: string
    showBack?: boolean
    rightContent?: React.ReactNode
}

export default function Header({ title, showBack = false, rightContent }: HeaderProps) {
    const { theme, toggleTheme } = useTheme()

    return (
        <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
                {/* Left Section */}
                <div className="flex items-center gap-4 min-w-0">
                    {showBack ? (
                        <Link
                            to="/"
                            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-border-hover)] transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="text-sm font-medium hidden sm:inline">返回</span>
                        </Link>
                    ) : (
                        <Link to="/" className="flex items-center gap-3">
                            {/* Logo */}
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg pulse-glow">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-xl font-bold gradient-text">Tachyon</h1>
                                <p className="text-xs text-[var(--color-text-subtle)]">超光速漫画阅读器</p>
                            </div>
                        </Link>
                    )}

                    {/* Page Title */}
                    {title && (
                        <h2 className="text-sm font-medium text-[var(--color-text-muted)] truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px]">
                            {title}
                        </h2>
                    )}
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3">
                    {rightContent}

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="theme-toggle"
                        aria-label={theme === 'dark' ? '切换到日间模式' : '切换到夜间模式'}
                    >
                        {theme === 'dark' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </header>
    )
}
