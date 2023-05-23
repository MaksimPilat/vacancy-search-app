import { useEffect, useState, useRef } from 'react';
import styles from './Favorites.module.css';
import Vacancy from '../../components/Vacancy';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import fetchCertainVacancies from '../../api/fetchCertainVacancies';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';


export default function Favorites() {

    const [searchParams, setSearchParams] = useSearchParams();
    const isMounted = useRef(false);
    const [currentPage, setCurrentPage] = useState(initPage());
    const [pageCount, setPageCount] = useState(125);
    const [vacancies, setVacancies] = useState([]);
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();

    function initPage() {
        if (searchParams.has('page')) return Number(searchParams.get('page'));
        return 1;
    }

    useEffect(() => {
        updateSearchParams();
        updateVacancies()
    }, [currentPage]);

    function getIdsFromLS() {
        if (localStorage.getItem('favoriteVacancies')) {
            return JSON.parse(localStorage.getItem('favoriteVacancies'));
        }
        navigate('../NotFound');
    }

    function updateSearchParams() {
        if (isMounted.current) return setSearchParams({ page: currentPage });
        isMounted.current = true;
    }

    async function updateVacancies() {
        let indexFrom = (currentPage - 1) * 4;
        const ids = getIdsFromLS();
        if (indexFrom > ids.length - 1) return setCurrentPage(currentPage-1);
        if (ids.length === 0) navigate('../NotFound');
        else setPageCount(Math.ceil(ids.length / 4));
        window.scrollTo(0, 0);
        setLoader(true);
        const response = await fetchCertainVacancies(ids.slice(indexFrom, indexFrom + 4));
        setLoader(false);
        setVacancies(response.objects || []);
    }

    return(
        <div className='container'>
            <div className={styles.root}>
                <CSSTransition in={loader} timeout={0} classNames={{enterDone: styles.vacancyListEnterDone, exitDone: styles.vacancyListExitDone}}>
                    <div className={styles.vacancyList}>
                        {vacancies.map(item => 
                            <Vacancy
                                data-elem={`vacancy-${item.id}`}
                                key={item.id}
                                id={item.id}
                                profession ={item.profession}
                                town={item.town.title}
                                type_of_work={item.type_of_work.title}
                                payment_from={item.payment_from}
                                payment_to={item.payment_to}
                                currency={item.currency}
                                description={item.vacancyRichText}
                                isLink={true}
                            />
                        )}
                    </div>
                </CSSTransition>
                <Loader active={loader}/>
                <Pagination
                    changePage={number => setCurrentPage(number + 1)}
                    forcePage={currentPage-1}
                    pageCount={pageCount}
                />
            </div>
        </div>
    );
}