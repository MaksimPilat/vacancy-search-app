import styles from './VacancyInfo.module.css';
import Vacancy from '../../components/Vacancy';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import fetchCertainVacancies from '../../api/fetchCertainVacancies';
import Loader from '../../components/Loader';


export default function VacancyInfo() {

    const location = useLocation();
    const [data, setData] = useState({});
    const [loader, setLoader] = useState(true);
   
    useEffect(() => {
        window.scrollTo(0, 0);
        initData().then(res => {
            setLoader(false);
            setData(res);
        });
    }, [])

    async function initData() {
        if (!location.state) {
            const id = Number(location.pathname.slice(location.pathname.lastIndexOf('/') + 1));
            let response = await fetchCertainVacancies([id]);
            response = response.objects[0];
            return {
                id: response.id,
                profession: response.profession,
                town: response.town.title,
                type_of_work: response.type_of_work.title,
                payment_from: response.payment_from,
                payment_to: response.payment_to,
                currency: response.currency,
                description: response.vacancyRichText
            }
        } else return location.state;
    }

    return(
        <div className='container'>
             <div className={styles.root}>
                <Loader active={loader}></Loader>
                <Vacancy
                    data-elem={`vacancy-${data.id}`}
                    key={data.id}
                    id={data.id}
                    profession ={data.profession}
                    town={data.town}
                    type_of_work={data.type_of_work}
                    payment_from={data.payment_from}
                    payment_to={data.payment_to}
                    currency={data.currency}
                />
                <div className={styles.body} dangerouslySetInnerHTML={{__html: data.description}}></div>
            </div>
        </div>
    );
}