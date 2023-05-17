import styles from './Pagination.module.css';
import ReactPaginate from 'react-paginate';

export default function Pagination({ changePage }) {

    return(
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            previousLabel="<"
            nextLabel=">"
            onPageChange={event => changePage(event.selected)}
            pageRangeDisplayed={5}
            pageCount={100}
            renderOnZeroPageCount={null}
        />
    );
}