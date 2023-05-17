import styles from './Filtration.module.css'

export default function Filtration(props) {

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
                    <option value="1">Синий</option>
                    <option value="2">Зеленый</option>
                    <option value="3">Желтый</option>
                    <option value="4">Красный</option>
                    <option value="5">Оранжевый</option>
                    <option value="6">Черный</option>
                </select>
            </div>

            <div>
                <h2>Оклад</h2>
                <input type="number" step="1000" min="0" max="500000" placeholder="От"></input>
                <input type="number" step="1000" min="0" max="500000" placeholder="До"></input>
            </div>

            <button>Применить</button>
       </div>
    )
}