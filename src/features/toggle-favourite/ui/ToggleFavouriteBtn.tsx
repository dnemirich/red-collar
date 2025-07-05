import s from './toggleFavouriteBtn.module.scss'
import {Heart} from "lucide-react";
import {type MouseEvent, useEffect, useState} from "react";
import type {BookSummary} from "entities/book";
import {isFavourite, toggleFavourite} from "../lib";

type Props = {
    book: BookSummary
}

export const ToggleFavouriteBtn = ({book}: Props) => {
    const [favourite, setFavourite] = useState(false);

    useEffect(() => {
        setFavourite(isFavourite(book.id))
    }, []);

    const handleClick = (e: MouseEvent) => {
        e.stopPropagation()
        const newState = toggleFavourite(book)
        setFavourite(newState)
    }

    return (
        <button
            className={`${s.btn} ${favourite ? s.favourite : ''}`}
            onClick={handleClick}
            aria-label={favourite ? 'Remove from favourites' : 'Add to favourites'}
        >
            <Heart/>
        </button>
    )
}