import { useEffect, useState } from 'react';
import styles from './Filtration.module.css';

export default function Filtration(props) {

    const [industries, setIndustries] = useState([]);

    useEffect(() => {
        (async () => {
            let response = await fetch('https://startup-summer-2023-proxy.onrender.com/2.0/catalogues', {
                method: 'GET',
                headers: { 'x-secret-key': 'GEU4nvd3rej*jeh.eqp'}
            });
            setIndustries(await response.json())
        })();
    }, []);

   
    return (
       <div className={styles.wrapper}>
            <div className={styles.title}>
                <h1>Фильтры</h1>
                <div>Сбросить все</div>
            </div>
            <div>
                <h2>Отрасль</h2>
                <select name="industries">
                    <option value="">Выберите значение</option>
                    {industries.map(item => <option key={item.key} value={item.key}>{item.title}</option>)}
                </select>
            </div>
            <div>
                <h2>Оклад</h2>
                <input type="number" name='salary-from' step="1000" min="0" max="500000" placeholder="От"></input>
                <input type="number" name='salary-to' step="1000" min="0" max="500000" placeholder="До"></input>
            </div>

            <button>Применить</button>
       </div>
    )
}