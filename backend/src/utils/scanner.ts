import { readdirSync, statSync } from 'fs'
import { join, extname } from 'path'

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.bmp']

export interface ComicInfo {
    id: string        // Base64 encoded path
    name: string      // Folder name
    path: string      // Original path
    pageCount: number // Number of images
}

export interface PageInfo {
    index: number
    filename: string
    relativePath: string  // Relative path from comic folder
}

/**
 * Natural sort comparator for filenames
 * Handles: 1.jpg, 2.jpg, 10.jpg correctly
 */
function naturalSort(a: string, b: string): number {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
}

/**
 * Encode path to URL-safe Base64 ID
 */
export function encodeId(path: string): string {
    return Buffer.from(path, 'utf-8').toString('base64url')
}

/**
 * Decode Base64 ID back to path
 */
export function decodeId(id: string): string {
    return Buffer.from(id, 'base64url').toString('utf-8')
}

/**
 * Check if file is an image
 */
function isImage(filename: string): boolean {
    const ext = extname(filename).toLowerCase()
    return IMAGE_EXTENSIONS.includes(ext)
}

/**
 * Recursively scan a directory for images
 */
function scanImagesRecursive(basePath: string, currentPath: string = ''): { filename: string; relativePath: string }[] {
    const fullPath = currentPath ? join(basePath, currentPath) : basePath
    const results: { filename: string; relativePath: string }[] = []

    try {
        const entries = readdirSync(fullPath, { withFileTypes: true })

        for (const entry of entries) {
            const entryRelativePath = currentPath ? join(currentPath, entry.name) : entry.name

            if (entry.isDirectory()) {
                // Recursively scan subdirectories
                const subImages = scanImagesRecursive(basePath, entryRelativePath)
                results.push(...subImages)
            } else if (entry.isFile() && isImage(entry.name)) {
                results.push({
                    filename: entry.name,
                    relativePath: entryRelativePath,
                })
            }
        }
    } catch (error) {
        console.error(`Error scanning directory ${fullPath}:`, error)
    }

    return results
}

/**
 * Scan comics directory and return all comic folders
 */
export function scanComics(comicsDir: string): ComicInfo[] {
    try {
        const entries = readdirSync(comicsDir, { withFileTypes: true })
        const comics: ComicInfo[] = []

        for (const entry of entries) {
            if (!entry.isDirectory()) continue

            const folderPath = join(comicsDir, entry.name)
            const pages = getComicPages(folderPath)

            if (pages.length > 0) {
                comics.push({
                    id: encodeId(entry.name),
                    name: entry.name,
                    path: entry.name,
                    pageCount: pages.length,
                })
            }
        }

        return comics.sort((a, b) => naturalSort(a.name, b.name))
    } catch (error) {
        console.error('Error scanning comics:', error)
        return []
    }
}

/**
 * Get sorted list of image files in a comic folder (recursive)
 */
export function getComicPages(folderPath: string): PageInfo[] {
    try {
        const images = scanImagesRecursive(folderPath)

        // Sort by relative path (natural sort)
        images.sort((a, b) => naturalSort(a.relativePath, b.relativePath))

        return images.map((img, index) => ({
            index,
            filename: img.filename,
            relativePath: img.relativePath,
        }))
    } catch (error) {
        console.error('Error reading comic folder:', error)
        return []
    }
}

/**
 * Get file stats for ETag generation
 */
export function getFileStats(filePath: string): { size: number; mtime: number } | null {
    try {
        const stat = statSync(filePath)
        return { size: stat.size, mtime: stat.mtimeMs }
    } catch {
        return null
    }
}
