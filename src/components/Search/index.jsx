import styles from './Search.module.css'

export default function Search(props) {

    return(
        <div className={styles.wrapper}>
            <input type='search' placeholder='     Введите название вакансии' id="vacancy-search" name="vacancy-search"></input>
            <button>Поиск</button>
        </div>
    )
}