import s from './booksList.module.scss'
import type {Book} from "entities/book";

type Props = {
    data: Book[]
}
export const BooksList = ({data}: Props) => {
    return (
        <ul className={s.booksList}>
            {data.map(book => (
                <li key={book.id}>{book.volumeInfo.title}</li>
            ))}
        </ul>
    )
}