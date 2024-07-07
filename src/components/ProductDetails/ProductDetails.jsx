import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './ProductDetails.module.scss';
import DefaultImage from "../../assets/images/default-image.png";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [itemImg, setItemImg] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`http://localhost:8080/goods/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setProduct(data);
                if (data.images.length > 0) {
                    const imageResponse = await fetch(`http://localhost:8080/images/${data.images[0].imageUrl}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (imageResponse.ok) {
                        setItemImg(URL.createObjectURL(await imageResponse.blob()));
                    } else {
                        setItemImg(DefaultImage);
                    }
                } else {
                    setItemImg(DefaultImage);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className={style.product_details}>
            <h1>{product.name}</h1>
            <img src={itemImg} alt={product.name} />
            <p>{product.description}</p>
            <p className={style.product_price}>Price: {product.price.priceAmount} {product.price.priceCurrency}</p>
            <p className={style.product_location}>Location: {product.location.settlement}</p>
            <p className={style.product_status}>Status: {product.status}</p>
        </div>
    );
}
