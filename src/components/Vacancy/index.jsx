import styles from './Vacancy.module.css';
import { LocationIcon } from '../../assets/exports';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function getPayment(payment_from, payment_to, currency, isLink) {
    if (payment_from) {
        let content = `з/п от ${payment_from} - ${payment_to} ${currency}`;
        if (!payment_to) content = `з/п от ${payment_from} ${currency}`;
        return (
            <>
                <p className={isLink ? styles.linkPayment : styles.simplePayment}>{content}</p>
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

    let link = <h1 className={styles.simpleTitle}>{props.profession}</h1>;
    if (props.isLink) link =
        <Link 
            to={{ pathname: `/Vacancies/${props.id}`}}
            state={{
                id: props.id,
                profession: props.profession,
                town: props.town,
                type_of_work: props.type_of_work,
                payment_from: props.payment_from,
                payment_to: props.payment_to,
                currency: props.currency,
                description: props.description
            }}>
            <h1 className={styles.linkTitle}>{props.profession}</h1>
        </Link>

    return (
       <div data-elem={`vacancy-${props.id}`} className={styles.root}>
            <div className={styles.title}>
               {link}
                <FontAwesomeIcon
                    data-elem={`vacancy-${props.id}-shortlist-button`} className={styles.starButton}
                    onClick={() => setIsFavorite(!isFavorite)}
                    icon={(() => isFavorite ? fasStar : farStar)()}
                />
            </div>
            <div className={`${props.isLink ? styles.linkInfo : styles.simpleInfo} ${styles.info}`}>
                {getPayment(props.payment_from, props.payment_to, props.currency, props.isLink)}
                <p>{props.type_of_work}</p>
            </div>
            <div className={`${props.isLink ? styles.linkLocation : styles.simpleLocation} ${styles.location}`}>
                <img src={LocationIcon}></img>
                <p>{props.town}</p>
            </div>
       </div>
    )
}