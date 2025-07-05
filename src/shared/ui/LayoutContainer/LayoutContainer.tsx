import type {ReactNode} from "react";
import s from './layoutContainer.module.scss'

type Props = {
    children: ReactNode;
}

export const LayoutContainer = ({children}: Props) => {
    return (
        <div className={s.container}>
            {children}
        </div>
    )
}