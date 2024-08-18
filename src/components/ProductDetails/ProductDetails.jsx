import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './ProductDetails.module.scss';
import DefaultImage from "../../assets/images/default-image.png";
import Header from "../Header/Header.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import LikeIcon from "../../assets/images/icons/Star.svg?react";
import MapIcon from "../../assets/images/icons/Map.svg?react";
import UserStars from "../../assets/images/icons/UserStars.svg?react";
import UserStatusIcon from "../../assets/images/icons/UserStatusIcon.svg?react";
import Arrow from "../../assets/images/icons/Arrow.svg?react";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [itemImgIndex, setItemImgIndex] = useState(0);
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`http://localhost:8080/goods/${id}`, {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const data = await response.json();
                setProduct(data);
                if (data.images.length > 0) {
                    const imagePromises = data.images.map(async (img) => {
                        const imageResponse = await fetch(`http://localhost:8080/images/${img.imageUrl}`);
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

    function formatDate(dateString) {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        const formattedDate = new Date(dateString).toLocaleString('uk-UA', options);
        const [date, time] = formattedDate.split(', ');
        return `Опубліковано ${date} о ${time}`;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <SearchForm />
            <div className={style.container}>
                <div className={style.leftContainer}>
                    <div className={style.containerElement}>
                        <div className={style.imageContainer}>
                            <button onClick={handlePrevImage} className={style.imageNavButton}><Arrow /></button>
                            <img src={images[itemImgIndex]} alt={product.name} />
                            <button onClick={handleNextImage} className={`${style.imageNavButton} ${style.flippedArrow}`}><Arrow /></button>
                        </div>
                        <div className={style.imageIndicators}>
                            {images.map((_, index) => (
                                <div
                                    key={index}
                                    className={`${style.indicator} ${index === itemImgIndex ? style.activeIndicator : ''}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={style.containerElement}>
                        <div>
                            <h1 className={style.descriptionElement}>
                                Стан: {product.goodsCondition === 'NEW' ? 'Нове' : 'Вживане'}
                            </h1>
                            <h1 className={style.descriptionElement}>
                                Рік випуску: 2017
                            </h1>
                        </div>
                        <h1 className={style.descriptionHead}>ОПИС</h1>
                        <p>{product.description}</p>
                    </div>
                </div>




                <div className={style.rightContainer}>
                    <div className={style.containerElement}>
                        <button className={style.likeButton} type="button"><LikeIcon /></button>
                        <h1 className={style.publishinDate}>{formatDate(product.createdAt)}</h1>
                        <h1 className={style.goodsName}>{product.name}</h1>
                        <p className={style.goodsPrice}>{product.price.priceAmount} {product.price.priceCurrency}</p>
                        <p className={style.goodsDeposit}>
                            Заства : <span className={style.goodsDepositPrice}>{product.deposit.depositAmount} {product.deposit.depositCurrency}</span>
                        </p>
                        <button className={style.messageButton} type="button">Повідомлення</button>
                        <button className={style.phoneNumberButton} type="button">Показати телефон</button>
                    </div>
                    <div className={style.containerElement}>
                        <div><UserStars /></div>
                        <div>User<UserStatusIcon /></div>
                        <div>What is a rating? All products of the author</div>
                    </div>
                    <div className={style.containerElement}>
                        <div><MapIcon /></div>
                        <p className={style.productLocation}>Location: {product.location.settlement}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
