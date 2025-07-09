import {type InfiniteData, useInfiniteQuery} from "@tanstack/react-query";
import {fetchBooks, type FetchBooksResponse, type Filter} from "entities/book";
import {SelectFilter} from "features/filter-books";
import {SearchInput} from "features/search-books";
import {useEffect, useRef, useState} from "react";
import {useAppStore} from "shared/model/appStore.ts";
import {LayoutContainer, Loader} from "shared/ui";
import {BooksList} from "widgets/BooksList";

import s from './homePage.module.scss'

const maxResults = 12;

export const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState<string>('JavaScript');
    const [filter, setFilter] = useState<Filter>('ebooks');
    const {setError} = useAppStore();

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

    return (
        <>
            <LayoutContainer>
                <div className={s.wrapper}>
                    <div className={s.header}>
                        <SearchInput onSearch={setSearchTerm}/>
                        <SelectFilter onSelect={setFilter}/>
                    </div>

                    {data && (
                        <BooksList data={
                            data.pages
                                .flatMap(page => page.items ?? [])
                                .filter(
                                    (book, index, self) =>
                                        index === self.findIndex(b => b.id === book.id)
                                )
                        }/>
                    )}

                    {isLoading && <Loader/>}

                </div>
            </LayoutContainer>
            {isFetchingNextPage && <Loader/>}
            <div className={s.refContainer} ref={loadMoreRef}/>
        </>
    )
}