interface ViewToggleProps {
    view: 'grid' | 'list'
    onViewChange: (view: 'grid' | 'list') => void
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
    return (
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
            <button
                onClick={() => onViewChange('grid')}
                className={`p-2 rounded-lg transition-all ${view === 'grid'
                        ? 'bg-[var(--color-accent)] text-white shadow-sm'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-hover)]'
                    }`}
                aria-label="网格视图"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            </button>
            <button
                onClick={() => onViewChange('list')}
                className={`p-2 rounded-lg transition-all ${view === 'list'
                        ? 'bg-[var(--color-accent)] text-white shadow-sm'
                        : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-hover)]'
                    }`}
                aria-label="列表视图"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>
    )
}
