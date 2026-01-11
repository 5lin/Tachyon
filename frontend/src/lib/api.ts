const API_BASE = import.meta.env.VITE_API_URL || ''

export interface ComicInfo {
    id: string
    name: string
    path: string
    pageCount: number
}

export interface ComicsResponse {
    count: number
    comics: ComicInfo[]
}

export interface PageInfo {
    index: number
    url: string
}

export interface PagesResponse {
    id: string
    name: string
    pageCount: number
    pages: PageInfo[]
}

/**
 * Fetch all comics
 */
export async function fetchComics(): Promise<ComicsResponse> {
    const res = await fetch(`${API_BASE}/api/comics`)
    if (!res.ok) throw new Error('Failed to fetch comics')
    return res.json()
}

/**
 * Fetch pages of a comic
 */
export async function fetchPages(comicId: string): Promise<PagesResponse> {
    const res = await fetch(`${API_BASE}/api/comics/${comicId}/pages`)
    if (!res.ok) throw new Error('Failed to fetch pages')
    return res.json()
}

/**
 * Get cover image URL
 */
export function getCoverUrl(comicId: string): string {
    return `${API_BASE}/api/comics/${comicId}/cover`
}

/**
 * Get page image URL
 */
export function getPageUrl(comicId: string, pageIndex: number): string {
    return `${API_BASE}/api/comics/${comicId}/pages/${pageIndex}`
}
