import {api} from "shared/lib/base-api.ts";
import type {BookEnlargedSummary, BookSummary, FetchBooksParams} from "./book-types.ts";
import {mapBook, mapBookLargeVersion} from "../lib";


export const fetchBooks = async (params: FetchBooksParams): Promise<{items: BookSummary[]}> => {

    const response = await api.get('/volumes', {
        params,
    });

    const items=  response.data.items?.map(mapBook) ?? [];

    return {items};
};

export const fetchBookById = async (id: string): Promise<BookEnlargedSummary> => {
    const response = await api.get(`/volumes/${id}`);

    return mapBookLargeVersion(response.data);
}