import { useRef } from 'react'
import styles from './Search.module.css'

export default function Search({ onSearch, defaultValue }) {

    const searchInput = useRef();

    return(
        <div className={styles.wrapper}>
            <input
                ref={searchInput}
                defaultValue={defaultValue}
                type='search'
                placeholder='     Введите название вакансии'
                id="vacancy-search"
                name="vacancy-search">
            </input>
            <button onClick={() => onSearch(searchInput.current.value)}>Поиск</button>
        </div>
    )
}