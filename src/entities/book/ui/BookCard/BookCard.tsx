import s from './bookCard.module.scss'
import type {Book} from "../../model";

type Props = {
    book: Book
}

export const BookCard = ({book}: Props) => {
    const { title, authors, description, imageLinks } = book.volumeInfo

    return (
    <li className={s.card}>

            { imageLinks?.thumbnail && <img className={s.img} src={imageLinks.thumbnail} alt={title}/>}

        <div className={s.content}>
            <h2 className={s.title}>{title}</h2>
            <h3 className={s.authors}>{ authors && authors.length > 5 ? authors.slice(0,5).join(', ').concat(' et al.') : authors?.join(', ')}</h3>
            <p className={s.description}>{description}</p>
        </div>
    </li>
    )
}