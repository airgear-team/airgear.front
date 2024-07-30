import React, {useState} from 'react';
import style from './CreateRent.module.scss';
import Header from '../Header/Header.jsx';

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

    const categoryOptions = [
        {id: 1, name: 'Real Estate'},
        {id: 2, name: 'Transport and Special Equipment'},
        {id: 3, name: 'Tech and Electronics'},
        {id: 4, name: 'Clothing and Accessories'},
        {id: 5, name: 'Recreation Equipment'},
        {id: 6, name: 'Tools and Equipment '},
        {id: 7, name: 'Sports Equipment'},
        {id: 8, name: 'Beauty and Health'},
        {id: 9, name: 'Event Goods'},
    ];

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
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
            setFormData({...formData, [name]: value});
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
            <Header/>
            <div className={style.createRent}>
                <form onSubmit={handleSubmit}>
                    <h1 className={style.boldTitle}>Briefly describe</h1>

                    <div className={style.flexRow}>
                        <div className={style.flexItem66}>
                            <h1 className={style.smallTitle}>Enter a name*</h1>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name of your product"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={style.flexItem66}
                            />
                            <h1 className={style.smallTitle}>Enter at least 10 characters.</h1>
                        </div>
                        <div className={style.flexItem33}>
                            <h1 className={style.smallTitle}>Category*</h1>
                            <select
                                name="category.id"
                                value={formData.category.id}
                                onChange={handleChange}
                                required
                                className={style.flexItem33}
                            >
                                <option value="">Select Category</option>
                                {categoryOptions.map(option => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <h1 className={style.boldTitlePhoto}>Photo</h1>
                    <div className={style.imageUpload}>
                        <div className={style.imagePreview}>
                            {selectedImages.map((image, index) => (
                                <div key={index} className={style.imageContainer}>
                                    <img src={URL.createObjectURL(image)} alt={`Selected ${index}`}/>
                                    <button
                                        type="button"
                                        className={style.removeButton}
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                        <label htmlFor="imageInput" className={style.imageUploadLabel}>
                            <i className="fa fa-camera">
                                <h className={style.imageUploadButtonText}>Add photo</h>
                            </i>
                        </label>
                        <input id="imageInput" type="file" multiple onChange={handleImageChange}/>
                    </div>

                    <h1 className={style.boldTitle}>Description</h1>
                    <textarea
                        className={style.description}
                        name="description"
                        placeholder="Think about what you would like to know from the ad and add it to the description."
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <h1 className={style.boldTitle}>Price</h1>
                    <div className={style.currencyContainer}>

                        <div className={style.currency}>
                            <input
                                type="number"
                                name="price.priceAmount"
                                placeholder="Price Amount"
                                value={formData.price.priceAmount}
                                onChange={handleChange}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                required
                                className={style.currencyInputNumber}
                            />
                            <select
                                name="price.priceCurrency"
                                value={formData.price.priceCurrency}
                                onChange={handleChange}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                required
                                className={style.currencyDropDownMenu}
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="UAH">UAH</option>
                            </select>
                            <div className={style.currencyCheckbox}>
                                <label>
                                    Negotiable:
                                    <input
                                        type="checkbox"
                                        name="price.priceType"
                                        checked={formData.price.priceType === 'NEGOTIATED_PRICE'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                        </div>

                        <div className={style.currency}>
                            <input
                                type="number"
                                name="weekendsPrice.weekendsPriceAmount"
                                placeholder="Weekends Price Amount"
                                value={formData.weekendsPrice.weekendsPriceAmount}
                                onChange={handleChange}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                required
                                className={style.currencyInputNumber}

                            />
                            <select
                                name="weekendsPrice.weekendsPriceCurrency"
                                value={formData.weekendsPrice.weekendsPriceCurrency}
                                onChange={handleChange}
                                required
                                className={style.currencyDropDownMenu}
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="UAH">UAH</option>
                            </select>
                            <div className={style.currencyCheckbox}>
                                <label>
                                    Negotiable:
                                    <input
                                        type="checkbox"
                                        name="weekendsPrice.weekendsPriceType"
                                        checked={formData.weekendsPrice.weekendsPriceType === 'NEGOTIATED_PRICE'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className={style.currency}>
                            <input
                                type="number"
                                name="deposit.depositAmount"
                                placeholder="Deposit Amount"
                                value={formData.deposit.depositAmount}
                                onChange={handleChange}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                required
                                className={style.currencyInputNumber}
                            />
                            <select
                                name="deposit.depositCurrency"
                                value={formData.deposit.depositCurrency}
                                onChange={handleChange}
                                required
                                className={style.currencyDropDownMenu}
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="UAH">UAH</option>
                            </select>
                            <div className={style.currencyCheckbox}>
                                <label>
                                    Negotiable:
                                    <input
                                        type="checkbox"
                                        name="deposit.depositPriceType"
                                        checked={formData.deposit.depositPriceType === 'NEGOTIATED_PRICE'}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <h1 className={style.boldTitle}>Other information</h1>

                    <div className={style.otherInformation}>
                        <div className={style.location}>
                            <input
                                type="number"
                                name="locationId"
                                placeholder="Location ID"
                                value={formData.locationId}
                                onChange={handleChange}
                                required
                                className={style.locationInput} // змінив клас для CSS стилів
                            />
                        </div>
                        <div className={style.phoneNumber}>
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                                className={style.phoneNumberInput}
                            />
                        </div>

                        <div className={style.goodsConditionCheckbox}>
                            <label>
                                Is new ?
                                <input
                                    type="checkbox"
                                    name="goodsCondition"
                                    checked={formData.goodsCondition === "NEW"}
                                    onChange={(e) => handleChange({
                                        target: {
                                            name: "goodsCondition",
                                            value: e.target.checked ? "NEW" : "USED"
                                        }
                                    })}
                                />
                            </label>
                        </div>
                    </div>

                    <button type="submit">Create</button>
                </form>
            </div>
        </div>
    );
}
