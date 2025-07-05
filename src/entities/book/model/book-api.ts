import {api} from "shared/lib/base-api.ts";
import type {FetchBooksParams, FetchBooksResponse} from "./book-types.ts";


const fetchBooks = async (params: FetchBooksParams): Promise<FetchBooksResponse> => {

    const response = await api.get('/volumes', {
        params,
    });

    return response.data;
};