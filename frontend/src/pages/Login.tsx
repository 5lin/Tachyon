import { useTheme } from '../contexts/ThemeContext'

const API_BASE = import.meta.env.VITE_API_URL || ''

export default function Login() {
    const { theme, toggleTheme } = useTheme()

    const handleLogin = () => {
        window.location.href = `${API_BASE}/api/auth/login`
    }

    return (
        <div className="min-h-screen bg-[var(--color-bg)] flex flex-col">
            {/* Noise Texture */}
            <div className="noise" />

            {/* Background Decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl float" />
                <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl float" style={{ animationDelay: '-2s' }} />
                <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl float" style={{ animationDelay: '-4s' }} />
            </div>

            {/* Header */}
            <header className="relative z-10 flex justify-end p-6">
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
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
                {/* Logo */}
                <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl pulse-glow">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold gradient-text mb-2">Tachyon</h1>
                <p className="text-[var(--color-text-muted)] mb-10">超光速漫画阅读器</p>

                {/* Login Card */}
                <div className="w-full max-w-sm p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] backdrop-blur-xl">
                    <h2 className="text-lg font-semibold text-[var(--color-text)] text-center mb-6">
                        登录以继续
                    </h2>

                    <button
                        onClick={handleLogin}
                        className="btn btn-primary w-full py-3 text-base"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        使用 SSO 登录
                    </button>

                    <p className="text-xs text-[var(--color-text-subtle)] text-center mt-4">
                        将跳转到身份验证服务
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 py-6 text-center">
                <p className="text-xs text-[var(--color-text-subtle)]">
                    Tachyon © 2026 · 超光速粒子 · 极速阅读
                </p>
            </footer>
        </div>
    )
}
