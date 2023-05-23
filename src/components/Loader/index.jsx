import styles from './Loader.module.css';

export default function Loader({ active }) {

    if (active) return <div className={styles.root}></div>

}