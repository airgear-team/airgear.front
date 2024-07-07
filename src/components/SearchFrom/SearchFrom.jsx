import React from 'react';
import LikeIcon from "../../assets/images/icons/Magnifying-glass.svg?react";
import styles from './SearchFrom.module.scss';

const SearchForm = () => {
    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <LikeIcon className={styles.icon} />
                <input type="text" placeholder="What are you looking for?" />
            </div>
        </div>
    );
};

export default SearchForm;
