import type {BookSummary} from "entities/book";

import {Heart} from "lucide-react";
import {type MouseEvent, useEffect, useState} from "react";
import {useAppStore} from "shared/model/appStore.ts";

import {isFavourite, toggleFavourite} from "../lib";
import s from './toggleFavouriteBtn.module.scss'

type Props = {
    book: BookSummary
}

export const ToggleFavouriteBtn = ({book}: Props) => {
    const [favourite, setFavourite] = useState(false);
    const {setSuccess} = useAppStore()

    useEffect(() => {
        setFavourite(isFavourite(book.id))
    }, [book.id]);

    const handleClick = (e: MouseEvent) => {
        e.stopPropagation()
        const newState = toggleFavourite(book)
        setSuccess(newState ? `${book.volumeInfo.title} was added to favourites` : `${book.volumeInfo.title} was removed from favourites`)
        setFavourite(newState)
    }

    return (
        <button
            aria-label={favourite ? 'Remove from favourites' : 'Add to favourites'}
            className={`${s.btn} ${favourite ? s.favourite : ''}`}
            onClick={handleClick}
        >
            <Heart size={18}/>
        </button>
    )
}