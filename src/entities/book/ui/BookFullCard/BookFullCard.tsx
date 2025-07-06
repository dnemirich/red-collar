import s from './bookFullCard.module.scss'
import type {BookEnlargedSummary} from "../../model";
import {convertDateFormat} from "../../lib/data-helpers.ts";
import {useState} from "react";

type Props = {
    book: BookEnlargedSummary
}

export const BookFullCard = ({book}: Props) => {
    const [expanded, setExpanded] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const {title, authors, description, imageLinks, pageCount, publishedDate, categories} = book.volumeInfo

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
                        className={`${s.img} ${!isImageLoaded ? s.hidden : ''}`}
                        src={imageLinks.small}
                        alt={title}
                        onLoad={() => setIsImageLoaded(true)}
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
                        <span key={index} className={s.category}>{category}</span>
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
