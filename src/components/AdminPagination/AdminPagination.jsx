import React from 'react';
import style from "./AdminPagination.module.scss"

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
                        className={style.pageNumber}
                        disabled={number === currentPage}
                    >
                        {number}
                    </li>
                ))}
            </ul>
        </nav>
    );
};