import s from './bookCard.module.scss'

type Props = {
    img?: string;
    title: string;
    authors: string[];
    description: string;
}

export const BookCard = ({img, authors, description, title}: Props) => {
    return (
    <div className={s.card}>
        <div>
            <img src={img} alt={title} />
        </div>
        <h2>{title}</h2>
        <h3>{authors.join(', ')}</h3>
        <p>{description}</p>
    </div>
    )
}