import style from './SearchProductCard.module.scss';
import React, { useEffect, useState } from 'react';
import DefaultImage from '../../assets/images/default-image.png';
import { format, isToday, isYesterday } from 'date-fns';
import { uk } from 'date-fns/locale';
import LikeIcon from "../../assets/images/icons/Star.svg";

export default function SearchProductCard({ product }) {
    const [productImg, setProductImg] = useState(DefaultImage);

    useEffect(() => {
        const fetchImage = async () => {
            if (!product || !product.id) return;

            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`http://localhost:8080/images/${product.id}/images`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();

                if (data.length > 0) {
                    const imageId = data[0].imageUrl;
                    const imageResponse = await fetch(`http://localhost:8080/images/${imageId}`);
                    if (imageResponse.ok) {
                        const imageUrl = URL.createObjectURL(await imageResponse.blob());
                        setProductImg(imageUrl);
                    }
                }
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();

        return () => {
            if (productImg !== DefaultImage) {
                URL.revokeObjectURL(productImg);
            }
        };
    }, [product?.id]);

    if (!product) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isToday(date)) {
            return `Сьогодні о ${format(date, 'HH:mm', { locale: uk })}`;
        } else if (isYesterday(date)) {
            return `Вчора о ${format(date, 'HH:mm', { locale: uk })}`;
        } else {
            return format(date, 'd MMMM yyyy \'р.\'', { locale: uk });
        }
    };

    const getConditionLabel = (condition) => {
        switch (condition) {
            case 'NEW':
                return 'Нове';
            case 'USED':
                return 'Вживане';
            default:
                return 'Не вказано';
        }
    };

    const currencySymbols = {
        USD: '$',
        EUR: '€',
        UAH: '₴',
    };

    return (
        <div className={style.productCard}>
            <div className={style.imageContainer}>
                <img src={productImg} alt={product.name || "Product"} />
            </div>
            <div className={style.productInfo}>
                <div className={style.productHeader}>
                    <h3 className={style.productName}>{product.name || 'No name'}</h3>
                    <span className={style.productPrice}>
                        {product.price?.priceAmount || 'Price not available'} {currencySymbols[product.price?.priceCurrency] || ''}
                    </span>
                </div>
                <p className={style.productCondition}>{getConditionLabel(product.goodsCondition)}</p>
                <div className={style.productFooter}>
                    <p className={style.productLocation}>{product.location.settlement + " - " + formatDate(product.createdAt) || 'Location not available'}</p>
                    <img src={LikeIcon} alt="Like" className={style.icon} />
                    <span className={style.topBadge}>ТОП</span>
                </div>
            </div>
        </div>
    );
}
