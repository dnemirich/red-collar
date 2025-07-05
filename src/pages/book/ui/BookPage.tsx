import {useParams} from "react-router";
import {LayoutContainer} from "shared/ui/LayoutContainer";
import {useQuery} from "@tanstack/react-query";
import {fetchBookById, BookFullCard} from "entities/book";

export const BookPage = () => {
    const { bookId } = useParams<{ bookId: string }>();

    const { data, isLoading, error } = useQuery({
        queryKey: [`book/${bookId}`, bookId],
        enabled: !!bookId,
        queryFn: () => fetchBookById(bookId!),
        staleTime: Infinity,
    });

    return (
        <LayoutContainer>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error</p>}
            {data && <BookFullCard book={data}/>}
        </LayoutContainer>
    )
}