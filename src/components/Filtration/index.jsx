import { useEffect, useRef, useState } from 'react';
import styles from './Filtration.module.css';
import { useSearchParams } from 'react-router-dom';
import fetchCatalogues from '../../api/fetchCatalogues';


export default function Filtration({ onFilter, defaultValues}) {

    const [searchParams, setSearchParams] = useSearchParams();
    const [catalogues, setCatalogues] = useState([]);
    const [selectedCatalogue, setSelectedCatalogue] = useState(defaultValues[0] || '');

    useEffect(() => {
        (async () => setCatalogues(await fetchCatalogues()))();
        filters.catalogueSelect.selectedIndex = Number(defaultValues[0]);
    }, []);

    const filters = {
        catalogueSelect: useRef(),
        paymentFromInput: useRef(),
        paymentToInput: useRef()
    }

    function chengeSelect(event) {
        setSelectedCatalogue(event.target.value);
    }

    function resetFilters() {
        Object.values(filters).forEach(item => item.current.value = '');
        setSelectedCatalogue('');
        if (searchParams.has('page')) {
            setSearchParams({ page: searchParams.get('page') });
        }
        setSearchParams({});
        onFilter(
            filters.catalogueSelect.current.value,
            filters.paymentFromInput.current.value,
            filters.paymentToInput.current.value
        );
    }

    return (
       <div className={styles.root}>
            <div className={styles.title}>
                <h1>Фильтры</h1>
                <div onClick={resetFilters}>Сбросить все</div>
            </div>
            <div>
                <h2>Отрасль</h2>
                <select
                    value={selectedCatalogue}
                    onChange={event => chengeSelect(event)}
                    name="catalogues"
                    ref={filters.catalogueSelect}>
                    <option value="">Выберите отрасль</option>
                    {catalogues.map(item => <option key={item.key} value={item.key}>{item.title}</option>)}
                </select>
            </div>
            <div>
                <h2>Оклад</h2>
                <input
                    ref={filters.paymentFromInput}
                    defaultValue={defaultValues[1]}
                    type="number"
                    name='payment-from'
                    step="1000"
                    min="0"
                    placeholder="От">
                </input>
                <input
                    ref={filters.paymentToInput}
                    defaultValue={defaultValues[2]}
                    type="number"
                    name='payment-to'
                    step="1000"
                    min="0"
                    placeholder="До">
                </input>
            </div>
            <button onClick={() => {
                onFilter(
                    filters.catalogueSelect.current.value,
                    filters.paymentFromInput.current.value,
                    filters.paymentToInput.current.value
                );
            }}>Применить</button>
       </div>
    )
}