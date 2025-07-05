import type {Book, BookEnlargedSummary, BookSummary} from "../model";

export const mapBook = (book: Book): BookSummary => ({
    id: book.id,
    volumeInfo: {
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        imageLinks: {
            thumbnail: book.volumeInfo.imageLinks?.thumbnail,
        },
    },
})

export const mapBookLargeVersion = (book: Book): BookEnlargedSummary => ({
    id: book.id,
    volumeInfo: book.volumeInfo,
})