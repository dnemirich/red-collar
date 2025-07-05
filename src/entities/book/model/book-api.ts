import {api} from "shared/lib/base-api.ts";
import type {Book, FetchBooksParams, FetchBooksResponse} from "./book-types.ts";


export const fetchBooks = async (params: FetchBooksParams): Promise<FetchBooksResponse> => {

    const response = await api.get('/volumes', {
        params,
    });

    return response.data;
};

export const fetchBookById = async (id: string): Promise<Book> => {
    const response = await api.get(`/volumes/${id}`);

    return response.data;
}