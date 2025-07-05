import {LayoutContainer} from "shared/ui/LayoutContainer";
import {Library} from "lucide-react";
import {ROUTES} from "shared/constants/routes.ts";
import {Link, useLocation} from "react-router";
import s from './header.module.scss'

const NAV_LINKS = [
    {
        label: 'Home',
        href: ROUTES.HOME,
    },
    {
        label: 'Favourites',
        href: ROUTES.FAVOURITES,
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
                            {NAV_LINKS.map(({label, href}, index) => (
                                <li key={index} className={`${s.navItem} ${location.pathname === href ? s.navItemActive: ''}`}><Link to={href}>{label}</Link></li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </LayoutContainer>
        </header>
    )
}