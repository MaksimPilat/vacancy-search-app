import styles from './NotFound.module.css';
import { NotFoundIcon } from '../../assets/exports';
import { Link } from 'react-router-dom';

export default function NotFound(props) {

    return(
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <img src={NotFoundIcon}></img>
                <h1>Упс, здесь еще ничего нет!</h1>
                <Link to={'/'}>
                    <button>
                        Поиск вакансий
                    </button>
                </Link>
               
            </div>
        </div>
    );
}