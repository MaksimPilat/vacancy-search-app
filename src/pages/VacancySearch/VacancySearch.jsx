import styles from './VacancySearch.module.css'
import Filtration from '../../components/Filtration/Filtration'
import Search from '../../components/Search/Search'
import Vacancy from '../../components/Vacancy/Vacancy'

export default function VacancySearch(props) {

    return(
        <div className='container'>
            <div className={styles.wrapper}>
                <div className={styles.filtration}>
                    <Filtration></Filtration>
                </div>
                <div className={styles.body}>
                    <Search></Search>
                    <div className={styles.vacancyList}>
                        <Vacancy></Vacancy>
                        <Vacancy></Vacancy>
                        <Vacancy></Vacancy>
                        <Vacancy></Vacancy>
                        <Vacancy></Vacancy>
                        <Vacancy></Vacancy>
                    </div>
                </div>
            </div>
        </div>
    )
}