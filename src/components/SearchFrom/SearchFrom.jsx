import React from 'react';
import MagnifyingIcon from "../../assets/images/icons/Magnifying-glass.svg?react";
import LocationIcon from "../../assets/images/icons/Location-point.svg?react";
import styles from './SearchFrom.module.scss';
import {useState, useEffect} from "react";


const SearchForm = () => {
const [productCard, setProductCard] = useState([]);
const [name, setName] = useState("");
const [location, setLocation] = useState("");
const handleClick = (e) => {
        e.preventDefault();
        //fetch('http://localhost:8089/search/?search=name:Маска для лиця332, location.settlement:Дніпро', {
        fetch(`http://localhost:8089/search/?search=name:${name}, location.settlement:${location}`, {
            method: 'GET',
            mode: 'no-cors',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            },
            //body: JSON.stringify(formData)
        })
            .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            setProductCard(data);

                        })
                        .catch(error => {
                            //console.error('Error fetching posts:', error);
                        });
    };


    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <MagnifyingIcon className={styles.icon} />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="What are you looking for?" className={styles.mainInput} />
                <LocationIcon className={styles.icon} />
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ukraine" className={styles.locationInput} />
                <button className={styles.searchButton} onClick={handleClick}>SEARCH</button>
            </div>
        </div>
    );
};

export default SearchForm;
