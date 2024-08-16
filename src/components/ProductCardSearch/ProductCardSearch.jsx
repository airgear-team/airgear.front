import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ProductCardSearch.module.scss';

const ProductCardSearch = () => {
    const location = useLocation();
    const { productCard } = location.state || { productCard: { content: [] } };

    // Extract the actual array of products from the 'content' field
    const products = productCard.content || [];

    return (
        <div className={styles.container}>
            <h2>Search Results</h2>
            {products.length === 0 ? (
                <p>No products found</p>
            ) : (
                <ul className={styles.productList}>
                    {products.map(product => (
                        <li key={product.id} className={styles.productItem}>
                            <h3>{product.name}</h3>
                            <p>Location: {product.location.settlement}</p>
                            <p>Price: ${product.price.priceAmount.toFixed(2)}</p>
                            <p>Description: {product.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductCardSearch;
