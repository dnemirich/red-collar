import {Library} from "lucide-react";
import {Link, useLocation} from "react-router";
import {ROUTES} from "shared/constants/routes.ts";
import {LayoutContainer} from "shared/ui/LayoutContainer";

import s from './header.module.scss'

const NAV_LINKS = [
    {
        href: ROUTES.HOME,
        label: 'Home',
    },
    {
        href: ROUTES.FAVOURITES,
        label: 'Favourites',
    },
]

export const Header = () => {

    const location = useLocation();


    return (
        <header className={s.header}>
            <LayoutContainer>
                <div className={s.wrapper}>
                    <div className={s.logo}>
                        <Link to={ROUTES.HOME}>
                            <Library size={36}/>
                        </Link>
                    </div>
                    <nav>
                        <ul className={s.navList}>
                            {NAV_LINKS.map(({href, label}, index) => (
                                <li className={`${s.navItem} ${location.pathname === href ? s.navItemActive: ''}`} key={index}><Link to={href}>{label}</Link></li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </LayoutContainer>
        </header>
    )
}