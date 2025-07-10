import {api} from "shared/lib/base-api.ts";

import type {BookEnlargedSummary, BookSummary, FetchBooksParams} from "./book-types.ts";

import {mapBook, mapBookLargeVersion} from "../lib";


export const fetchBooks = async (params: FetchBooksParams): Promise<{items: BookSummary[], totalItems: number}> => {

    const response = await api.get('/volumes', {
        params,
    });

    const items=  response.data.items?.map(mapBook) ?? [];

    return {items, totalItems: response.data.totalItems};
};

export const fetchBookById = async (id: string): Promise<BookEnlargedSummary> => {
    const response = await api.get(`/volumes/${id}`);

    return mapBookLargeVersion(response.data);
}