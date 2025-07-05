import s from './booksList.module.scss'
import {type Book, BookCard} from "entities/book";

type Props = {
    data: Book[]
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