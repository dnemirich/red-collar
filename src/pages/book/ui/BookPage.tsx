import {useQuery} from "@tanstack/react-query";
import {BookFullCard, fetchBookById} from "entities/book";
import {useParams} from "react-router";
import {useAppStore} from "shared/model/appStore.ts";
import {LayoutContainer, Loader} from "shared/ui";

import s from './bookPage.module.scss'

export const BookPage = () => {
    const {bookId} = useParams<{ bookId: string }>();
    const {setError} = useAppStore();

    const {data, error, isLoading} = useQuery({
        enabled: !!bookId,
        queryFn: () => fetchBookById(bookId!),
        queryKey: [`book/${bookId}`, bookId],
        staleTime: Infinity,
    });

    if (error) setError(error?.message);

    return (
        <LayoutContainer>
            {
                isLoading &&
                <div className={s.loaderWrapper}>
                    {<Loader/>}
                </div>
            }

            {data && <BookFullCard book={data}/>}
        </LayoutContainer>
    )
}