import {LayoutContainer} from "shared/ui/LayoutContainer";
import {BooksList} from "widgets/BooksList";
import {useEffect, useState} from "react";
import type {BookSummary} from "entities/book";
import {getFavourites} from "features/toggle-favourite";
import s from './favouritesPage.module.scss'

export const FavouritesPage = () => {
    const [favourites, setFavourites] = useState<BookSummary[]>([])

    useEffect(() => {
        setFavourites(getFavourites())
    }, []);

    return (
        <LayoutContainer>
            {favourites.length === 0 ?
                <h2 className={s.placeholderText}>The list is empty. Try to add a book to your favourites</h2> :
                <BooksList data={favourites}/>
            }
        </LayoutContainer>
    )
}