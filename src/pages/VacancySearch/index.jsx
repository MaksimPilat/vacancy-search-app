import styles from './VacancySearch.module.css';
import Filtration from '../../components/Filtration';
import Search from '../../components/Search';
import Vacancy from '../../components/Vacancy';
import Pagination from '../../components/Pagination';
import { useEffect, useState } from 'react';

export default function VacancySearch(props) {

    
    const [vacancies, setVacancies] = useState({objects: []});
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        (async () => {
            let response = await fetch(`https://startup-summer-2023-proxy.onrender.com/2.0/v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948/vacancies/?page=${currentPage}&count=5`, {
                method: 'GET',
                headers: { 'x-secret-key': 'GEU4nvd3rej*jeh.eqp' }
            });
            response = await response.json();
            setVacancies(response);
        })();
    }, [currentPage]);


    return(
        <div className='container'>
            <div className={styles.wrapper}>
                <div className={styles.filtration}>
                    <Filtration />
                </div>
                <div className={styles.body}>
                    <Search />
                    <div className={styles.vacancyList}>
                        {vacancies.objects.map(item => 
                            <Vacancy
                                key={item.id}
                                profession ={item.profession}
                                firm_name={item.firm_name }
                                town={item.town.title}
                                type_of_work={item.type_of_work.title}
                                payment_from={item.payment_from}
                                payment_to={item.payment_to}
                                currency ={item.currency }
                            />
                        )}
                    </div>
                    <Pagination changePage={page => setCurrentPage(page)}/>
                </div>
            </div>
        </div>
    )
}