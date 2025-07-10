import {LayoutContainer} from "shared/ui";

import s from './notFoundPage.module.scss'

export const NotFoundPage = () => {
    return (
        <LayoutContainer>
            <div className={s.wrapper}>
                <h2 className={s.title}>404</h2>
                <h3 className={s.subtitle}>Page was not found</h3>
            </div>
        </LayoutContainer>
    )
}