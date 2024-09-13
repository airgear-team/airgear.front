import React from 'react';
import style from "./AdminPagination.module.scss"

export const Pagination = ({ usersPerPage, totalUsers, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={style.pagination}>
                {pageNumbers.map(number => (
                    <li key={number} className={style.pageNumber}>
                        <a onClick={() => paginate(number)} href="!#" className={style.pageLink}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};