import s from './bookFullCard.module.scss'
import type {BookEnlargedSummary} from "../../model";

type Props = {
    book: BookEnlargedSummary
}

export const BookFullCard = ({book}: Props) => {

    const {title,subtitle, authors, description, imageLinks, pageCount, publishedDate, categories} = book.volumeInfo

    return (
        <div className={s.card}>

            {imageLinks?.small && <img className={s.img} src={imageLinks.small} alt={title}/>}
            <div className={s.content}>
                <h2 className={s.title}>{title}</h2>
                <h3>{subtitle}</h3>
                <h3 className={s.authors}>{authors && authors?.join(', ')}</h3>
                <p>Page count: {pageCount}</p>
                <p>Published date: {publishedDate}</p>
                <p>Categories: {categories?.join(', ')}</p>
                <p className={s.description}>{description}</p>
            </div>
        </div>
    )
}
