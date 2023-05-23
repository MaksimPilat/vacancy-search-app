import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import { Logo } from '../../assets/exports';
import { useEffect, useState } from 'react';

export default function Header(props) {

    const [burgerMenu, setBurgerMenu] = useState(false);

    useEffect(() => {
        if (burgerMenu) document.querySelector('body').classList.add(styles.scrollLock);
        else document.querySelector('body').classList.remove(styles.scrollLock);
    }, [burgerMenu]);

    return (
        <div className={styles.root}>
            <div className='container'>
                <div className={styles.header}>
                    <a href='/'>
                        <img src={Logo} alt="logo"></img>
                    </a>
                    <nav className={burgerMenu ? styles.showNav : null}>
                        <ul>
                            <li>
                                <NavLink style={({ isActive }) => isActive ? { color: "var(--blue500-main-color)" } : { color: "var(--black-text-color)" }}
                                    onClick={() => setBurgerMenu(false)}
                                    to={"/"}>
                                    Поиск вакансий
                                </NavLink>
                            </li>
                            <li>
                                <NavLink style={({ isActive }) => isActive ? { color: "var(--blue500-main-color)" } : { color: "var(--black-text-color)" }}
                                    onClick={() => setBurgerMenu(false)}
                                    to={"/Favorites"}>
                                    Избранное
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div onClick={() => setBurgerMenu(!burgerMenu)} className={styles.burger}>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}