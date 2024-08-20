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
import ArrowDescription from "../../assets/images/icons/ArrowDescription.svg?react";
import UserDefaultAvatar from "../../assets/images/icons/UserDefaultAvatar.svg?react";
import LocationIcon from "../../assets/images/icons/Location-point.svg?react";
import PhoneIcon from "../../assets/images/icons/PhoneIcon.svg?react";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [itemImgIndex, setItemImgIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);

    let myString = "— Великий асортимент шин з Німеччини.\n— Комплекти, пари, одиночні, на запаску.\n— Ціна від 800 грн/шт\n— Допоможемо підібрати та проконсультуємо вас у підборі шин.\n— Шини для будь-яких типів автомобілів.\n— Гарантія якості та довговічності.\n— Доступні різні розміри та моделі.\n— Швидка доставка по всій Україні.";


    const handleToggle = () => {
        setShowMore(prevState => !prevState);
    };

    const handleButtonClick = () => {
        setShowPhoneNumber(prevState => !prevState);
    };


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
                        <p className={style.description}>{product.description}</p>

                        <div className={style.separatorContainer}>
                            <hr className={style.separator} />
                            <div className={style.viewsText}>Переглядів : 180</div>
                        </div>
                    </div>

                    <div className={style.containerElement}>
                        <h1 className={style.contactHead}>ЗВ’ЯЗАТИСЯ З ПРОДАВЦЕМ</h1>
                        <div className={style.userInfo}>
                            <UserDefaultAvatar />
                            <div className={style.userText}>
                                <div className={style.userName}>Сергій</div>
                                <div className={style.userStatus}>Був нещодавно</div>
                            </div>
                        </div>
                        <h1 className={style.contactPhone}>
                            <PhoneIcon />
                            {showPhoneNumber ? product.phoneNumber : '+(XXX)-XX–XX–XXX'}
                        </h1>
                        <button className={style.phoneNumberButton} type="button" onClick={handleButtonClick}>
                            {showPhoneNumber ? 'Сховати' : 'Показати'}
                        </button>
                    </div>

                </div>

                <div className={style.rightContainer}>
                    <div className={style.containerElement}>
                        <button className={style.likeButton} type="button"><LikeIcon /></button>
                        <h1 className={style.publishinDate}>{formatDate(product.createdAt)}</h1>
                        <h1 className={style.goodsName}>{product.name}</h1>
                        <p className={style.goodsPrice}>{product.price.priceAmount} {product.price.priceCurrency}</p>
                        <p className={style.goodsDeposit}>
                            Застава : <span className={style.goodsDepositPrice}>{product.deposit.depositAmount} {product.deposit.depositCurrency}</span>
                        </p>
                        <button className={style.messageButton} type="button">Повідомлення</button>
                        <div>
                            <button
                                className={style.phoneNumberButton}
                                type="button"
                                onClick={handleButtonClick}
                            >
                                {showPhoneNumber ? product.phoneNumber : 'Показати телефон'}
                            </button>
                        </div>
                    </div>


                    <div className={style.containerElement}>
                        <div className={style.userContainer}>
                            <div className={style.leftUserContainer}>
                                <div className={style.userHead}>
                                    КОРИСТУВАЧ
                                </div>
                                <div className={style.userStatusIcon}><UserStatusIcon /></div>

                            </div>
                            <div className={style.rightUserContainer}>
                                <div className={style.userStars}><UserStars /><div className={style.userEvaluation}> (23 оцінки)</div></div>
                            </div>
                        </div>


                        <div className={style.userInfo}>
                            <UserDefaultAvatar />
                            <div className={style.userText}>
                                <div className={style.userName}>Сергій</div>
                                <div className={style.userStatus}>Був нещодавно</div>
                            </div>
                        </div>

                        <h1 className={style.ratingComment}>Цей автор отримав багато відмінних відгуків</h1>

                        <div className={style.whatsRatingContainer}>
                            <h1 className={style.whatsRating}>Що таке рейтинг?</h1>Усі оголошення автора <ArrowDescription className={style.arrowAllGoods} />
                        </div>

                    </div>




                    <div className={style.containerElement}>
                        <div className={style.locationContainer}>
                            <div className={style.textContainer}>
                                <h1 className={style.locationHeader}>МІСЦЕЗНАХОДЖЕННЯ</h1>
                                <p className={style.locationText}>
                                    <LocationIcon />
                                    {product.location.settlement}
                                </p>
                                <h1 className={style.locationRegion}>Київська область</h1>
                            </div>
                            <div className={style.mapIconContainer}>
                                <button
                                    className={style.mapButton}
                                    onClick={() => {
                                        const query = encodeURIComponent(product.location.settlement);
                                        window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
                                    }}
                                >
                                    <MapIcon />
                                </button>
                            </div>
                        </div>

                    </div>



                    <div className={style.containerElement}>
                        <h1 className={style.headerDescription}>ПРО НАС</h1>

                        <div className={style.bodyDescription}>
                            {showMore ? myString : myString.split('\n').slice(0, 4).join('\n')}
                        </div>
                        <h1 className={style.showMoreDescription} onClick={handleToggle}>
                            {showMore ? 'Згорнути опис' : 'Показати повністю'}
                            <ArrowDescription className={`${style.arrowDescription} ${showMore ? style.rotateArrow : ''}`} />
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
