import styles from './Vacancy.module.css';

export default function Vacancy({ profession, firm_name, town, type_of_work, payment_from, payment_to, currency }) {

    return (
       <div className={styles.wrapper}>
            <h1>{profession}</h1>
       </div>
    )
}
