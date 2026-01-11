import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../contexts/I18nContext'

interface ComicCardProps {
    id: string
    name: string
    coverUrl: string
    pageCount: number
    view?: 'grid' | 'list'
}

export default function ComicCard({ id, name, coverUrl, pageCount, view = 'grid' }: ComicCardProps) {
    const { t } = useI18n()
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)

    if (view === 'list') {
        return (
            <Link
                to={`/read/${id}`}
                className="flex items-center gap-4 p-3 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-border-hover)] transition-all group"
            >
                {/* Thumbnail */}
                <div className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--color-bg-hover)]">
                    {!loaded && !error && (
                        <div className="absolute inset-0 loading-shimmer" />
                    )}
                    <img
                        src={coverUrl}
                        alt={name}
                        loading="lazy"
                        onLoad={() => setLoaded(true)}
                        onError={() => setError(true)}
                        className={`w-full h-full object-cover transition-opacity ${loaded ? 'opacity-100' : 'opacity-0'}`}
                    />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[var(--color-text)] truncate group-hover:text-[var(--color-accent)] transition-colors">
                        {name}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">
                        {t('pages', { count: pageCount })}
                    </p>
                </div>

                {/* Arrow */}
                <svg className="w-5 h-5 text-[var(--color-text-subtle)] group-hover:text-[var(--color-accent)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </Link>
        )
    }

    return (
        <Link
            to={`/read/${id}`}
            className="comic-card group relative block aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--color-bg-card)] border border-[var(--color-border)]"
        >
            {/* Ambient Glow (dark theme only) */}
            <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-pink-500/20 dark:block hidden" />

            {/* Loading Skeleton */}
            {!loaded && !error && (
                <div className="absolute inset-0 loading-shimmer" />
            )}

            {/* Cover Image */}
            <img
                src={coverUrl}
                alt={name}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${loaded ? 'opacity-100 fade-in' : 'opacity-0'
                    }`}
            />

            {/* Error State */}
            {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-bg-card)]">
                    <div className="w-14 h-14 mb-2 rounded-full bg-[var(--color-bg-hover)] flex items-center justify-center">
                        <svg className="w-7 h-7 text-[var(--color-text-subtle)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <span className="text-[var(--color-text-subtle)] text-sm">无封面</span>
                </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

            {/* Info Container */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
                {/* Page Count Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mb-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                    <svg className="w-3.5 h-3.5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-xs font-medium text-white/90">{t('pages', { count: pageCount })}</span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-white line-clamp-2 leading-relaxed drop-shadow-lg">
                    {name}
                </h3>
            </div>

            {/* Hover Arrow */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            </div>
        </Link>
    )
}
