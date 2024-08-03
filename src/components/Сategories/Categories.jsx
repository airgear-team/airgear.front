import React from 'react';
import styles from './Categories.module.scss';

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
    { src: image1, label: 'Appliances' },
    { src: image2, label: 'Beauty & Health' },
    { src: image3, label: 'Clothes & Accessories' },
    { src: image4, label: 'Event Goods' },
    { src: image5, label: 'Property' },
    { src: image6, label: 'Recreational Equipment' },
    { src: image7, label: 'Sport Equipment' },
    { src: image8, label: 'Tools & Equipment' },
    { src: image9, label: 'Transport Equipment' },
];

const Categories = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Product categories</h1>
            <div className={styles.imageContainer}>
                {images.map((item, index) => (
                    <div key={index} className={styles.imageWrapper}>
                        <img src={item.src} alt={`Category ${index}`} className={styles.image} />
                        <div className={styles.label}>{item.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
