import {SearchInput} from "features/search-books";
import {LayoutContainer} from "shared/ui/LayoutContainer";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchBooks, type Filter} from "entities/book";
import {BooksList} from "widgets/BooksList";
import {SelectFilter} from "features/filter-books";
import s from './homePage.module.scss'

const maxResults = 9;

export const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState<string>('JavaScript');
    const [filter, setFilter] = useState<Filter>('ebooks');

    const { data, isLoading, error } = useQuery({
        queryKey: ['books', searchTerm, filter],
        queryFn: () => fetchBooks({q: searchTerm, filter, maxResults}),
        staleTime: 1000 * 60 * 5,
        enabled: searchTerm.trim().length > 0,

    });

    return (
        <LayoutContainer>
            <div className={s.wrapper}>
                <div className={s.header}>
                    <SearchInput onSearch={setSearchTerm} />
                    <SelectFilter onSelect={setFilter}/>
                </div>
                {data && <BooksList data={data.items}/>}
                {isLoading && <p>Загрузка...</p>}
                {error && <p>Ошибка загрузки</p>}
            </div>
        </LayoutContainer>
    )
}