import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header(props) {

    return (
        <div className={styles.root}>
            <div className='container'>
                <div className={styles.header}>
                    <a href='/'>
                        <img src="./logo.png" alt="logo"></img>
                    </a>
                    <nav>
                        <ul>
                            <li>
                                <NavLink style={({ isActive }) => isActive ? { color: "var(--blue-main-color)" } : { color: "var(--black-text-color)" }}
                                to={"/"}>
                                    Поиск вакансий
                                </NavLink>
                            </li>
                            <li>
                            <NavLink style={({ isActive }) => isActive ? { color: "var(--blue-main-color)" } : { color: "var(--black-text-color)" }}
                                to={"/Favorites"}>
                                    Избранное
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}