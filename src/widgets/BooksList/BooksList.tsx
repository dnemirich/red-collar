import s from './booksList.module.scss'
import {BookCard, type BookSummary} from "entities/book";

type Props = {
    data: BookSummary[]
}
export const BooksList = ({data}: Props) => {
    return (
        <ul className={s.booksList}>
            {data.map(book => (
               <BookCard key={book.id} book={book}/>
            ))}
        </ul>
    )
}