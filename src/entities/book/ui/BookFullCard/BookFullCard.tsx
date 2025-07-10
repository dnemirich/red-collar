import {useState} from "react";

import type {BookEnlargedSummary} from "../../model";

import {convertDateFormat} from "../../lib/data-helpers.ts";
import s from './bookFullCard.module.scss'

type Props = {
    book: BookEnlargedSummary
}

export const BookFullCard = ({book}: Props) => {
    const [expanded, setExpanded] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const {authors, categories, description, imageLinks, pageCount, publishedDate, title} = book.volumeInfo

    const formattedDate = publishedDate && convertDateFormat(publishedDate)
    const formattedCategories = categories && Array.from(new Set(categories.map(category => category.split('/')).flat()))
    const plainText = description?.replace(/<\/?[^>]+(>|$)/g, '') ?? '';
    const maxLength = 1000;
    const shortDescription =
        plainText.length > maxLength ? plainText.slice(0, maxLength) + '...' : plainText;

    return (
        <div className={s.card}>
            {/*{imageLinks?.small && <img className={s.img} src={imageLinks.small} alt={title}/>}*/}
            <div className={s.imgWrapper}>
                {!isImageLoaded && <div className={s.skeleton} />}
                {imageLinks?.small && (
                    <img
                        alt={title}
                        className={`${s.img} ${!isImageLoaded ? s.hidden : ''}`}
                        onLoad={() => setIsImageLoaded(true)}
                        src={imageLinks.small}
                    />
                )}
            </div>
            <div className={s.content}>
                <h2 className={s.title}>{title}</h2>
                <h3 className={s.authors}>{authors && authors?.join(', ')}</h3>
                <p className={s.pageCount}>Page count: <span>{pageCount}</span></p>
                <p className={s.publishDate}>Publication date: <span>{formattedDate}</span></p>
                <p className={s.categories}>{
                    formattedCategories?.map((category, index) => (
                        <span className={s.category} key={index}>{category}</span>
                    ))
                }</p>
                {/*<p className={s.description}>{plainText}</p>*/}
                <p className={s.description} onClick={() => setExpanded(!expanded)}>
                    {expanded ? plainText : shortDescription}
                    {plainText.length > maxLength && (
                        <span className={s.readMore}> {expanded ? 'Hide' : 'Show more'}</span>
                    )}
                </p>
            </div>
        </div>
    )
}
