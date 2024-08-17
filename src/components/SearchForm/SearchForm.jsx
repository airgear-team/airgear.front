import React from 'react';
import MagnifyingIcon from "../../assets/images/icons/Magnifying-glass.svg?react";
import LocationIcon from "../../assets/images/icons/Location-point.svg?react";
import styles from './SearchForm.module.scss';

const SearchForm = () => {
    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <MagnifyingIcon className={styles.icon} />
                <input type="text" placeholder="What are you looking for?" className={styles.mainInput} />
                <LocationIcon className={styles.icon} />
                <input type="text" placeholder="Ukraine" className={styles.locationInput} />
                <button className={styles.searchButton}>SEARCH</button>
            </div>
        </div>
    );
};

export default SearchForm;
