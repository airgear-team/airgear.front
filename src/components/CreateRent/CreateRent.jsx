import React, { useState } from 'react';
import style from './CreateRent.module.scss';
import Header from "../Header/Header.jsx";

export default function CreateRent() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: {
            priceAmount: '',
            priceCurrency: 'USD',
            priceType: 'NEGOTIATED_PRICE'
        },
        weekendsPrice: {
            weekendsPriceAmount: '',
            weekendsPriceCurrency: 'USD',
            weekendsPriceType: 'NON_NEGOTIATED_PRICE'
        },
        deposit: {
            depositAmount: '',
            depositCurrency: 'USD',
            depositPriceType: 'NON_NEGOTIATED_PRICE'
        },
        locationId: '',
        category: {
            id: ''
        },
        phoneNumber: '',
        goodsCondition: 'NEW'
    });

    const [selectedImages, setSelectedImages] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [mainKey, subKey] = name.split('.');
        if (subKey) {
            setFormData({
                ...formData,
                [mainKey]: {
                    ...formData[mainKey],
                    [subKey]: value
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleImageChange = (e) => {
        setSelectedImages([...selectedImages, ...Array.from(e.target.files)]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/goods/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                uploadImages(data.id, token);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const uploadImages = (goodsID, token) => {
        const imageFormData = new FormData();
        selectedImages.forEach((image, index) => {
            imageFormData.append('images', image);
        });

        console.log('Uploading images:', selectedImages);
        console.log('FormData:', imageFormData);

        fetch(`http://localhost:8080/images/${goodsID}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: imageFormData
        })
            .then(response => response.json())
            .then(data => {
                console.log('Images upload success:', data);
                //redirect
                window.location.href = '/';
            })
            .catch(error => {
                console.error('Images upload error:', error);
            });
    };

    return (
        <div>
            <div>
                <Header />
            </div>
            <div className={style.createRent}>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                    <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                    <input type="number" name="price.priceAmount" placeholder="Price Amount" value={formData.price.priceAmount} onChange={handleChange} required />
                    <select name="price.priceCurrency" value={formData.price.priceCurrency} onChange={handleChange} required>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                    <select name="price.priceType" value={formData.price.priceType} onChange={handleChange} required>
                        <option value="NEGOTIATED_PRICE">Negotiated</option>
                        <option value="NON_NEGOTIATED_PRICE">Non-negotiated</option>
                    </select>
                    <input type="number" name="weekendsPrice.weekendsPriceAmount" placeholder="Weekends Price Amount" value={formData.weekendsPrice.weekendsPriceAmount} onChange={handleChange} required />
                    <select name="weekendsPrice.weekendsPriceCurrency" value={formData.weekendsPrice.weekendsPriceCurrency} onChange={handleChange} required>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                    <select name="weekendsPrice.weekendsPriceType" value={formData.weekendsPrice.weekendsPriceType} onChange={handleChange} required>
                        <option value="NEGOTIATED_PRICE">Negotiated</option>
                        <option value="NON_NEGOTIATED_PRICE">Non-negotiated</option>
                    </select>
                    <input type="number" name="deposit.depositAmount" placeholder="Deposit Amount" value={formData.deposit.depositAmount} onChange={handleChange} required />
                    <select name="deposit.depositCurrency" value={formData.deposit.depositCurrency} onChange={handleChange} required>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                    <select name="deposit.depositPriceType" value={formData.deposit.depositPriceType} onChange={handleChange} required>
                        <option value="NEGOTIATED_PRICE">Negotiated</option>
                        <option value="NON_NEGOTIATED_PRICE">Non-negotiated</option>
                    </select>
                    <input type="number" name="locationId" placeholder="Location ID" value={formData.locationId} onChange={handleChange} required />
                    <input type="number" name="category.id" placeholder="Category ID" value={formData.category.id} onChange={handleChange} required />
                    <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
                    <select name="goodsCondition" value={formData.goodsCondition} onChange={handleChange} required>
                        <option value="NEW">New</option>
                        <option value="USED">Used</option>
                    </select>
                    <input type="file" multiple onChange={handleImageChange} />
                    <div className={style.imagePreview}>
                        {selectedImages.map((image, index) => (
                            <img key={index} src={URL.createObjectURL(image)} alt={`Selected ${index}`} />
                        ))}
                    </div>
                    <button type="submit">Create</button>
                </form>
            </div>
        </div>
    );
}
