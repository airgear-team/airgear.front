import React from 'react';
import style from "./styles.module.scss"

export const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={style.pagination}>
                {pageNumbers.map(number => (
                    <li
                        onClick={() => paginate(number)}
                        key={number}
                        className={number === currentPage ? style.activePage : style.pageNumber}
                    >
                        {number}
                    </li>
                ))}
            </ul>
        </nav>
    );
};