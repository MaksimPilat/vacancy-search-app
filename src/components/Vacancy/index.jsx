import styles from './Vacancy.module.css';
import { LocationIcon } from '../../assets/exports';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

function getPayment(payment_from, payment_to, currency) {
    if (payment_from) {
        if (payment_to) return(
            <>
                <p>з/п от {payment_from} - {payment_to} {currency}</p>
                <span>•</span>
            </>
        );
        else return(
            <>
                <p>з/п от {payment_from} {currency}</p>
                <span>•</span>
            </>
        );
    } return <p></p>;
}

function checkIfFavourite(id) {
    const favoriteVacancies = JSON.parse(localStorage.getItem('favoriteVacancies')) || [];
    if (favoriteVacancies.includes(id)) return true;
    return false;
}

export default function Vacancy(props) {

    const [isFavorite, setIsFavorite] = useState(checkIfFavourite(props.id));

    useEffect(() => {
        const favoriteVacancies = JSON.parse(localStorage.getItem('favoriteVacancies')) || [];
        const index = favoriteVacancies.indexOf(props.id);
        if (isFavorite && index === -1) {
            favoriteVacancies.push(props.id);
        } else if (!isFavorite && favoriteVacancies.indexOf(props.id) !== -1) {
            favoriteVacancies.splice(favoriteVacancies.indexOf(props.id), 1);
        }
        localStorage.setItem('favoriteVacancies', JSON.stringify(favoriteVacancies));
    }, [isFavorite]);

    return (
       <div className={styles.root}>
            <div className={styles.title}>
                <h1>{props.profession}</h1>
                <FontAwesomeIcon
                    onClick={() => setIsFavorite(!isFavorite)}
                    icon={(() => isFavorite ? fasStar : farStar)()}
                    className={styles.starButton} />
            </div>
            <div className={styles.info}>
                {getPayment(props.payment_from, props.payment_to, props.currency)}
                <p>{props.type_of_work}</p>
            </div>
            <div className={styles.location}>
                <img src={LocationIcon}></img>
                <p>{props.town}</p>
            </div>
       </div>
    )
}