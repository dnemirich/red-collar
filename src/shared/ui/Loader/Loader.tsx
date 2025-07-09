import s from './loader.module.scss'

export const Loader = () => {
    return (
        <div className={s.loader}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}