import styles from './VacancySearch.module.css';
import Filtration from '../../components/Filtration';
import Search from '../../components/Search';
import Vacancy from '../../components/Vacancy';
import Pagination from '../../components/Pagination';
import Loader from '../../components/Loader';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import fetchVacancies from '../../api/fetchVacancies';


export default function VacancySearch() {

    const [searchParams, setSearchParams] = useSearchParams();
    const isMounted = useRef(false);
    const navigate = useNavigate();
    const [vacancies, setVacancies] = useState([])
    const [loader, setLoader] = useState(true);
    const [currentPage, setCurrentPage] = useState(initPage());
    const [pageCount, setPageCount] = useState(125);
    const [filter, setFilter] = useState(initFilter());
    const [keyword, setKeyword] = useState(initKeyWord());
   
    function initPage() {
        if (searchParams.has('page')) return Number(searchParams.get('page'));
        return 1;
    }

    function initFilter() {
        const filter = {};
        ['catalogues', 'payment_from', 'payment_to'].forEach((param) => {
            if (searchParams.has(param)) filter[param] = searchParams.get(param);
        });
        return filter;
    }

    function initKeyWord() {
        if (searchParams.has('keyword')) return searchParams.get('keyword');
        return '';
    }

    async function updateVacancies() {
        setLoader(true);
        window.scrollTo(0, 0);
        const response = await fetchVacancies([currentPage, filter.catalogues, filter.payment_from, filter.payment_to, keyword]);
        setLoader(false);
        if (response.total > 500) setPageCount(125);
        else if (response.total === 0 || response.objects < 2) navigate('./NotFound'); // "< 2" due to api specifics
        else setPageCount(Math.ceil(response.total / 4 - 1));
        setVacancies(response.objects || []);
    }

    function updateSearchParams() {
        if (isMounted.current) {
            let params = { page: currentPage };
            Object.entries(filter).forEach(([key, value]) => {
                if (value) params[key] = value;
            });
            if (keyword) params.keyword = keyword;
            return setSearchParams(params);
        }
        isMounted.current = true;
    }

    useEffect(() => {
        updateSearchParams();
        updateVacancies();
    }, [currentPage]);

    useLayoutEffect(() => {
        if (isMounted.current) {
            setCurrentPage(1);
            updateSearchParams();
        }
        updateVacancies();
    }, [filter, keyword]);

    return(
        <div className='container'>
            <div className={styles.wrapper}>
                <div className={styles.filtration}>
                    <Filtration
                        onFilter={(catalogues, payment_from, payment_to) =>
                            setFilter({
                                catalogues: catalogues,
                                payment_from: payment_from,
                                payment_to: payment_to
                            })
                        }
                        defaultValues={[searchParams.get('catalogues'), searchParams.get('payment_from'), searchParams.get('payment_to')]}
                    />
                </div>
                <div className={styles.body}>
                    <Search onSearch={(keyword) => setKeyword(keyword)} defaultValue={keyword} />
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
        </div>
    )
}