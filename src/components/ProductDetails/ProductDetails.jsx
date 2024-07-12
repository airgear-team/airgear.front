import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import style from './ProductDetails.module.scss';
import DefaultImage from "../../assets/images/default-image.png";
import Header from "../Header/Header.jsx";

export default function ProductDetails() {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [itemImgIndex, setItemImgIndex] = useState(0);
    const [images, setImages] = useState([]);

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
                    const imagePromises = data.images.map(async (img) => {
                        const imageResponse = await fetch(`http://localhost:8080/images/${img.imageUrl}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        if (imageResponse.ok) {
                            return URL.createObjectURL(await imageResponse.blob());
                        } else {
                            return DefaultImage;
                        }
                    });
                    const loadedImages = await Promise.all(imagePromises);
                    setImages(loadedImages);
                } else {
                    setImages([DefaultImage]);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                setImages([DefaultImage]);
            }
        }

        fetchProduct();
    }, [id]);

    const handleNextImage = () => {
        setItemImgIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevImage = () => {
        setItemImgIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div><Header/>
            <div className={style.product_details}>
                <h1>{product.name}</h1>
                <div className={style.image_container}>
                    <button onClick={handlePrevImage} className={style.image_nav_button}>◀</button>
                    <img src={images[itemImgIndex]} alt={product.name}/>
                    <button onClick={handleNextImage} className={style.image_nav_button}>▶</button>
                </div>
                <p>{product.description}</p>
                <p className={style.product_price}>Price: {product.price.priceAmount} {product.price.priceCurrency}</p>
                <p className={style.product_location}>Location: {product.location.settlement}</p>
                <p className={style.product_status}>Status: {product.status}</p>
            </div>
        </div>

    );
}
