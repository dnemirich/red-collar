import {type InfiniteData, useInfiniteQuery} from "@tanstack/react-query";
import {fetchBooks, type FetchBooksResponse, type Filter} from "entities/book";
import {SelectFilter} from "features/filter-books";
import {SearchInput, useSearchStore} from "features/search-books";
import {useEffect, useRef} from "react";
import {useAppStore} from "shared/model/appStore.ts";
import {LayoutContainer, Loader} from "shared/ui";
import {BooksList} from "widgets/BooksList";

import s from './homePage.module.scss'

const maxResults = 12;

export const HomePage = () => {
    const {setError} = useAppStore();
    const { filter, initialized, searchTerm, setFilter, setInitialized, setSearchTerm } = useSearchStore();

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery<
        FetchBooksResponse,
        Error,
        InfiniteData<FetchBooksResponse>,
        [string, string, Filter],
        number
    >({
        enabled: searchTerm.trim().length > 0,
        getNextPageParam: (lastPage, allPages) => {
            const totalItems = lastPage.totalItems;
            const loadedItems = allPages.flatMap(p => p.items ?? []).length;
            return loadedItems < totalItems ? loadedItems : undefined;
        },
        initialPageParam: 0,
        queryFn: ({pageParam = 0}) =>
            fetchBooks({filter, maxResults, q: searchTerm, startIndex: pageParam}),
        queryKey: ['books', searchTerm, filter],
        staleTime: 1000 * 60 * 5,
    });

    if(error) setError(error.message)

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!initialized) {
            setSearchTerm('JavaScript');
            setInitialized();
        }
    }, []);

    useEffect(() => {
        if (!loadMoreRef.current) return;
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            {root: null, rootMargin: '5px', threshold: 0}
        );

        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const books = data
        ? data.pages.flatMap(page => page.items ?? [])
            .filter((book, index, self) => index === self.findIndex(b => b.id === book.id))
        : [];

    const isEmpty = searchTerm && !isLoading && books.length === 0;


    return (
        <>
            <LayoutContainer>
                <div className={s.wrapper}>
                    <div className={s.header}>
                        <SearchInput onSearch={setSearchTerm} value={searchTerm}/>
                        <SelectFilter onSelect={setFilter} value={filter}/>
                    </div>

                    {!searchTerm && <p className={s.infoPlaceholder}>Enter a search term to find a book</p>}
                    {isEmpty && <p className={s.infoPlaceholder}>Whoops! No books matched your search.</p>}

                    {books.length > 0 && <BooksList data={books} />}

                    {isLoading && <Loader/>}

                </div>
            </LayoutContainer>
            {isFetchingNextPage && <Loader/>}
            <div className={s.refContainer} ref={loadMoreRef}/>
        </>
    )
}