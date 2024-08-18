import React from 'react';
import styles from './Categories.module.scss';
import { useNavigate } from 'react-router-dom';

import image1 from '../../assets/images/categories/appliances-and-electronics.svg';
import image2 from '../../assets/images/categories/beauty-and-health.svg';
import image3 from '../../assets/images/categories/clothes-and-accessories.svg';
import image4 from '../../assets/images/categories/event-goods.svg';
import image5 from '../../assets/images/categories/property.svg';
import image6 from '../../assets/images/categories/recreational-equipment.svg';
import image7 from '../../assets/images/categories/sport-equipment.svg';
import image8 from '../../assets/images/categories/tools-and-equipment.svg';
import image9 from '../../assets/images/categories/transport-and-special-equipment.svg';

const images = [
    { src: image1, id: 3, label: 'Побутова техніка' },
    { src: image2, id: 8, label: 'Краса та здоров’я' },
    { src: image3, id: 4, label: 'Одяг та аксесуари' },
    { src: image4, id: 9, label: 'Товари для подій' },
    { src: image5, id: 1, label: 'Нерухомість' },
    { src: image6, id: 5, label: 'Відпочинок' },
    { src: image7, id: 7, label: 'Спортивне обладнання' },
    { src: image8, id: 6, label: 'Інструменти' },
    { src: image9, id: 2, label: 'Транспорт' },
];

const Categories = () => {
    const navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault();
        let value=e.target.getAttribute("value");
        fetch(`http://localhost:8089/search/?search=category.id:${value}&&sort=createdAt,desc`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                navigate('/search-results', { state: { productCard: data } });
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Категорії товарів</h1>
            <div className={styles.imageContainer}>
                {images.map((item, index) => (
                    <div key={index} className={styles.imageWrapper}>
                        <img src={item.src} alt={`Category ${index}`} className={styles.image} value={item.id} onClick={handleClick}  />
                        <div className={styles.label}>{item.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
