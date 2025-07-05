import {SearchInput} from "features/search-books";
import {LayoutContainer} from "shared/ui/LayoutContainer";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchBooks, type Filter} from "entities/book";
import {BooksList} from "widgets/BooksList";
import {SelectFilter} from "features/filter-books";
import s from './homePage.module.scss'

export const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState<string>('Java Script');
    const [filter, setFilter] = useState<Filter>('full');

    const { data, isLoading, error } = useQuery({
        queryKey: ['books', searchTerm, filter],
        queryFn: () => fetchBooks({q: searchTerm, filter}),
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
                {isLoading && <p>Загрузка...</p>}
                {error && <p>Ошибка загрузки</p>}

                {data && <BooksList data={data.items}/>}
            </div>
        </LayoutContainer>
    )
}