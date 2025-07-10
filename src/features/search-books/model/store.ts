import type {Filter} from "entities/book";

import { create } from 'zustand';

type SearchState = {
    filter: Filter;
    initialized: boolean;
    searchTerm: string;
    setFilter: (filter: Filter) => void;
    setInitialized: () => void;
    setSearchTerm: (term: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
    filter: 'ebooks',
    initialized: false,
    searchTerm: 'JavaScript',
    setFilter: (filter) => set({ filter }),
    setInitialized: () => set({ initialized: true }),
    setSearchTerm: (term) => set({ searchTerm: term }),
}));
