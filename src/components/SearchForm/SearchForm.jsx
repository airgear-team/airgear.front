import React, { useState } from 'react';
import MagnifyingIcon from "../../assets/images/icons/Magnifying-glass.svg?react";
import LocationIcon from "../../assets/images/icons/Location-point.svg?react";
import styles from './SearchForm.module.scss';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [locations, setLocations] = useState([]);
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8089/search/?search=name:${name}, location.settlement:${location}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                navigate('/search-results', { state: { productCard: data } });
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    };

    const findLocation = (e) => {
        e.preventDefault();
        const query = e.target.value;
        setLocation(query);

        if (query.length > 2) {
            fetch(`http://localhost:8083/locations/?prefix=${query}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    setLocations(data.content);
                })
                .catch(error => {
                    console.error('Error fetching locations:', error);
                });
        } else {
            setLocations([]);
        }
    };

    const handleLocationSelect = (settlement) => {
        setLocation(settlement);
        setLocations([]);
    };

    return (
        <div className={styles.container}>
            <div className={styles.searchWrapper}>
                <div className={styles.search}>
                    <MagnifyingIcon className={styles.icon} />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="What are you looking for?"
                        className={styles.mainInput}
                    />
                    <LocationIcon className={styles.icon} />
                    <input
                        type="text"
                        value={location}
                        onChange={findLocation}
                        placeholder="Ukraine"
                        className={styles.locationInput}
                    />
                    <button className={styles.searchButton} onClick={handleClick}>SEARCH</button>
                </div>
                {locations.length > 0 && (
                    <ul className={styles.locationList}>
                        {locations.map((loc) => (
                            <li
                                key={loc.uniqueSettlementID}
                                className={styles.locationItem}
                                onClick={() => handleLocationSelect(loc.settlement)}
                            >
                                {loc.settlement} ({loc.region})
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchForm;
