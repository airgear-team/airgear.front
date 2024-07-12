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
            priceType: 'NON_NEGOTIATED_PRICE'
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
        const { name, value, type, checked } = e.target;
        const [mainKey, subKey] = name.split('.');
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                [mainKey]: {
                    ...formData[mainKey],
                    [subKey]: checked ? 'NEGOTIATED_PRICE' : 'NON_NEGOTIATED_PRICE'
                }
            });
        } else if (subKey) {
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

    const handleRemoveImage = (index) => {
        const newImages = [...selectedImages];
        newImages.splice(index, 1);
        setSelectedImages(newImages);
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
                window.location.href = '/';
            })
            .catch(error => {
                console.error('Images upload error:', error);
            });
    };

    return (
        <div>
            <Header />
            <div className={style.createRent}>
                <form onSubmit={handleSubmit}>
                    <div className={style.flexRow}>
                        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className={style.flexItem66} />
                        <input type="number" name="category.id" placeholder="Category" value={formData.category.id} onChange={handleChange} required className={style.flexItem33} />
                    </div>
                    <div className={style.imageUpload}>
                        <div className={style.imagePreview}>
                            {selectedImages.map((image, index) => (
                                <div key={index} className={style.imageContainer}>
                                    <img src={URL.createObjectURL(image)} alt={`Selected ${index}`} />
                                    <button type="button" className={style.removeButton} onClick={() => handleRemoveImage(index)}>×</button>
                                </div>
                            ))}
                        </div>
                        <label htmlFor="imageInput" className={style.imageUploadLabel}>
                            <i className="fa fa-camera">
                                <h className={style.imageUploadButtonText}>Add image</h>
                            </i>
                        </label>
                        <input id="imageInput" type="file" multiple onChange={handleImageChange} />
                    </div>
                    <input type="text" className={style.description} name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />

                    <div className={style.flexRow}>
                        <input type="number" name="price.priceAmount" placeholder="Price Amount" value={formData.price.priceAmount} onChange={handleChange} required className={style.flexItem33} />
                        <select name="price.priceCurrency" value={formData.price.priceCurrency} onChange={handleChange} required className={style.flexItem33}>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                        <div className={style.flexItem33}>
                            <label>
                                Negotiated:
                                <input type="checkbox" name="price.priceType" checked={formData.price.priceType === 'NEGOTIATED_PRICE'} onChange={handleChange} />
                            </label>
                        </div>
                    </div>

                    <div className={style.flexRow}>
                        <input type="number" name="weekendsPrice.weekendsPriceAmount" placeholder="Weekends Price Amount" value={formData.weekendsPrice.weekendsPriceAmount} onChange={handleChange} required className={style.flexItem33} />
                        <select name="weekendsPrice.weekendsPriceCurrency" value={formData.weekendsPrice.weekendsPriceCurrency} onChange={handleChange} required className={style.flexItem33}>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                        <div className={style.flexItem33}>
                            <label>
                                Negotiated:
                                <input type="checkbox" name="weekendsPrice.weekendsPriceType" checked={formData.weekendsPrice.weekendsPriceType === 'NEGOTIATED_PRICE'} onChange={handleChange} />
                            </label>
                        </div>
                    </div>

                    <div className={style.flexRow}>
                        <input type="number" name="deposit.depositAmount" placeholder="Deposit Amount" value={formData.deposit.depositAmount} onChange={handleChange} required className={style.flexItem33} />
                        <select name="deposit.depositCurrency" value={formData.deposit.depositCurrency} onChange={handleChange} required className={style.flexItem33}>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                        <div className={style.flexItem33}>
                            <label>
                                Negotiated:
                                <input type="checkbox" name="deposit.depositPriceType" checked={formData.deposit.depositPriceType === 'NEGOTIATED_PRICE'} onChange={handleChange} />
                            </label>
                        </div>
                    </div>

                    <input type="number" name="locationId" placeholder="Location ID" value={formData.locationId} onChange={handleChange} required />
                    <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
                    <select name="goodsCondition" value={formData.goodsCondition} onChange={handleChange} required>
                        <option value="NEW">New</option>
                        <option value="USED">Used</option>
                    </select>
                    <button type="submit">Create</button>
                </form>
            </div>
        </div>
    );
}
