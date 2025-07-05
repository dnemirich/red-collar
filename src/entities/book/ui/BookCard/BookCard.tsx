import s from './bookCard.module.scss'
import type {BookSummary} from "../../model";
import {useNavigate} from "react-router";
import {ToggleFavouriteBtn} from "features/toggle-favourite";
import {ROUTES} from "shared/constants/routes.ts";

type Props = {
    book: BookSummary
}

export const BookCard = ({book}: Props) => {
    const {title, authors, description, imageLinks} = book.volumeInfo

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(ROUTES.BOOK + '/' + book.id)
    }

    return (
        <li className={s.card} onClick={handleClick}>
            <ToggleFavouriteBtn book={book}/>

            {imageLinks?.thumbnail && <img className={s.img} src={imageLinks.thumbnail} alt={title}/>}

            <div className={s.content}>
                <h2 className={s.title}>{title}</h2>
                <h3 className={s.authors}>{authors && authors.length > 5 ? authors.slice(0, 5).join(', ').concat(' et al.') : authors?.join(', ')}</h3>
                <p className={s.description}>{description}</p>
            </div>
        </li>
    )
}