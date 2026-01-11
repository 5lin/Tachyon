import { useState, useRef, useEffect } from 'react'
import { useI18n } from '../contexts/I18nContext'

type SortOption = 'name' | 'pages' | 'pages-desc'

interface SortDropdownProps {
    value: SortOption
    onChange: (value: SortOption) => void
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
    const { t } = useI18n()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const options: { value: SortOption; labelKey: 'sortByName' | 'sortByPagesAsc' | 'sortByPagesDesc' }[] = [
        { value: 'name', labelKey: 'sortByName' },
        { value: 'pages', labelKey: 'sortByPagesAsc' },
        { value: 'pages-desc', labelKey: 'sortByPagesDesc' },
    ]

    const currentOption = options.find(o => o.value === value)

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Close on escape
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false)
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [])

    return (
        <div ref={dropdownRef} className="relative">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-11 px-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text)] text-sm flex items-center gap-2 hover:border-[var(--color-border-hover)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
            >
                <svg className="w-4 h-4 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                <span className="whitespace-nowrap">{currentOption ? t(currentOption.labelKey) : ''}</span>
                <svg
                    className={`w-4 h-4 text-[var(--color-text-muted)] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 min-w-full py-1 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] shadow-xl shadow-black/20 z-50 overflow-hidden animate-dropdown">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                onChange(option.value)
                                setIsOpen(false)
                            }}
                            className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${option.value === value
                                ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                                : 'text-[var(--color-text)] hover:bg-[var(--color-bg-hover)]'
                                }`}
                        >
                            {t(option.labelKey)}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
