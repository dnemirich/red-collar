import {SearchInput} from "features/search-books";
import {LayoutContainer} from "shared/ui/LayoutContainer";
import {useEffect, useRef, useState} from "react";
import {useInfiniteQuery} from "@tanstack/react-query";
import {fetchBooks, type Filter} from "entities/book";
import {BooksList} from "widgets/BooksList";
import {SelectFilter} from "features/filter-books";
import s from './homePage.module.scss'

const maxResults = 12;

export const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState<string>('JavaScript');
    const [filter, setFilter] = useState<Filter>('ebooks');

    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['books', searchTerm, filter],
        queryFn: ({ pageParam = 0 }) =>
            fetchBooks({ q: searchTerm, filter, maxResults, startIndex: pageParam }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const totalItems = lastPage.totalItems;
            const loadedItems = allPages.flatMap(p => p.items ?? []).length;
            return loadedItems < totalItems ? loadedItems : undefined;
        },
        enabled: searchTerm.trim().length > 0,
        staleTime: 1000 * 60 * 5,
    });

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!loadMoreRef.current) return;
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { root: null, rootMargin: '5px', threshold: 0 }
        );

        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    return (
        <>
            <LayoutContainer>
                <div className={s.wrapper}>
                    <div className={s.header}>
                        <SearchInput onSearch={setSearchTerm} />
                        <SelectFilter onSelect={setFilter}/>
                    </div>

                        {data && (
                            <BooksList data={data.pages.flatMap(page => page.items)} />
                        )}


                    {isLoading && <p>Загрузка...</p>}
                    {error && <p>Ошибка загрузки</p>}

                </div>
            </LayoutContainer>
            <div ref={loadMoreRef} style={{
                height: 30,
                background: 'red',
                marginTop: '2rem',
            }} />
            {isFetchingNextPage && <p>Загружаем еще...</p>}
</>
    )
}