import {SearchInput} from "features/search-books";
import {LayoutContainer} from "shared/ui/LayoutContainer";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchBooks} from "../../entities/book/model/book-api.ts";

export const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState<string>('Java Script');
    const [filter, setFilter] = useState<string>('');

    const { data, isLoading, error } = useQuery({
        queryKey: ['books', searchTerm],
        queryFn: () => fetchBooks({q: searchTerm}),
        staleTime: 1000 * 60 * 5,
        enabled: searchTerm.trim().length > 0,

    });

    return (
        <LayoutContainer>
            <SearchInput onSearch={setSearchTerm} />
            {isLoading && <p>Загрузка...</p>}
            {error && <p>Ошибка загрузки</p>}

            {data && (
                <div>
                    {data.items?.map(book => (
                        <div key={book.id}>{book.volumeInfo.title}</div>
                    ))}
                </div>
            )}

        </LayoutContainer>
    )
}