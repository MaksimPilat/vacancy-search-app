import { useRef } from 'react'
import styles from './Search.module.css'

export default function Search({ onSearch, defaultValue }) {

    const searchInput = useRef();

    return(
        <div className={styles.wrapper}>
            <input
                data-elem="search-input"
                ref={searchInput}
                defaultValue={defaultValue}
                type='search'
                placeholder='     Введите название вакансии'
                results="0"
                id="vacancy-search"
                name="vacancy-search">
            </input>
            <button
                data-elem="search-button"
                onClick={() => onSearch(searchInput.current.value)}>
                    Поиск
            </button>
        </div>
    )
}