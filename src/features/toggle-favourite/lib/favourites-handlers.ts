import type {BookSummary} from "entities/book";

const STORAGE_KEY = 'favourites'

export function getFavourites(): BookSummary[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

export function isFavourite(bookId: string): boolean {
    return getFavourites().some(b => b.id === bookId)
}

export function toggleFavourite(book: BookSummary): boolean {
    const current = getFavourites()
    const exists = current.some(b => b.id === book.id)
    const updated = exists
        ? current.filter(b => b.id !== book.id)
        : [...current, book]

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    return !exists
}
