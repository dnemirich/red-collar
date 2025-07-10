import {ToggleFavouriteBtn} from "features/toggle-favourite";
import {useNavigate} from "react-router";
import {ROUTES} from "shared/constants/routes.ts";

import type {BookSummary} from "../../model";

import s from './bookCard.module.scss'

type Props = {
    book: BookSummary
}

export const BookCard = ({book}: Props) => {
    const {authors, description, imageLinks, title} = book.volumeInfo

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(ROUTES.BOOK + '/' + book.id)
    }
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    };

    return (
        <li className={s.card} onClick={handleClick} onKeyDown={handleKeyDown} role="button" tabIndex={0}>
            <ToggleFavouriteBtn book={book}/>

            {imageLinks?.thumbnail && <img alt={title} className={s.img} src={imageLinks.thumbnail}/>}

            <div className={s.content}>
                <div className={s.titleWrapper}>
                    <h2 className={s.title}>{title}</h2>
                    <div className={s.tooltip}>{title}</div>
                </div>
                <h3 className={s.authors}>{authors && authors.length > 3 ? authors.slice(0, 3).join(', ').concat(' et al.') : authors?.join(', ')}</h3>
                <p className={s.description}>{description}</p>
            </div>
        </li>
    )
}