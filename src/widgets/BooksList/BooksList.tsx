import {BookCard, type BookSummary} from "entities/book";

import s from './booksList.module.scss'

type Props = {
    data: BookSummary[]
}
export const BooksList = ({data}: Props) => {
    return (
        <ul className={s.booksList}>
            {data.map(book => (
               <BookCard book={book} key={book.id}/>
            ))}
        </ul>
    )
}