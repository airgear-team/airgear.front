import React, { useState } from 'react';
import style from './CreateRent.module.scss';

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
                window.location.href = '/';
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className={style.createRent}>
            <h2>Create Rent</h2>
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
                <button type="submit">Create</button>
            </form>
        </div>
    );
}
