import styles from './Pagination.module.css';
import ReactPaginate from 'react-paginate';

export default function Pagination({ forcePage, pageCount, changePage }) {

    return(
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            previousLabel="<"
            nextLabel=">"
            onPageChange={event => changePage(event.selected)}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            activeLinkClassName={styles.activeLink}
            forcePage={forcePage}
        />
    );
}