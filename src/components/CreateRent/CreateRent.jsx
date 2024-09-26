import React, {useState} from 'react';
import style from './CreateRent.module.scss';
import Header from '../Header/Header.jsx';
import Footer from "../Footer/Footer.jsx";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";

export default function CreateRent() {
    const [location, setLocation] = useState("");
    const [locations, setLocations] = useState([]);
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
        phoneNumber: '+380',
        goodsCondition: 'NEW',
        sellerName: '',
        sellerEmail: ''
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
    const findLocation = (e) => {
        e.preventDefault();
        const query = e.target.value;
        setLocation(query);

        if (query.length > 2) {
            fetch(`http://localhost:8083/locations/?prefix=${query}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                },
            })
                .then(response => response.json())
                .then(data => {
                    setLocations(data.content);
                })
                .catch(error => {
                    console.error('Error fetching locations:', error);
                });
        } else {
            setLocations([]);
        }
    };

    const handleLocationSelect = (loc) => {
        setLocation(loc.settlement);
        setFormData({
            ...formData,
            locationId: loc.uniqueSettlementID
        });
        setLocations([]);
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
    const handleEmailChange = (event) => {
        setFormData({
            ...formData,
            sellerEmail: event.target.value
        });
    };
    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailRegex.test(email);
    };

    const handlePhoneChange = (event) => {
        const input = event.target.value;
        if (input.startsWith('+380')) {
            setFormData({
                ...formData,
                phoneNumber: input
            });
        } else {
            setFormData({
                ...formData,
                phoneNumber: '+380' + input.slice(3)
            });
        }
    };

    const isPhoneValid = (phoneNumber) => {
        const phoneRegex = /^\+380\d{9}$/;
        return phoneRegex.test(phoneNumber);
    };


    return (
        <div className={style.container}>
            <Header/>
            <div className={style.createRent}>
                <form onSubmit={handleSubmit}>
                    <div className={style.createRentBackgroundWhite}>
                        <h1 className={style.boldTitle}>Опишіть у подробицях</h1>
                        <div className={style.flexRow}>
                            <div className={style.flexItem}>
                                <h1 className={style.smallTitle}>Вкажіть назву*</h1>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Наприклад, IPhone 12, з гарантією"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className={`${style.flexItem} ${formData.name.length > 0 ? style.blackText : ''} ${formData.name.length < 16 && style.error}`}
                                />
                                {formData.name.length < 16 && (
                                    <>
                                        <p className={style.errorText}>Не забудьте заповнити заголовок</p>
                                    </>
                                )}
                                <div className={style.flexBetween}>
                                    <p className={style.smallTitle}>Введіть щонайменше 16 символів</p>
                                    <p className={style.smallTitle}>{formData.name.length}/70</p>
                                </div>

                            </div>
                            <div className={style.flexItem}>
                                <h1 className={style.smallTitle}>Категорія*</h1>
                                <select
                                    name="category.id"
                                    value={formData.category.id}
                                    onChange={handleChange}
                                    required
                                    className={`${style.flexItem} ${formData.category.id ? style.blackText : style.error}`}
                                >
                                    <option value="">Виберіть категорію</option>
                                    {categoryOptions.map(option => (
                                        <option key={option.id} value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                                {!formData.category.id && (
                                    <p className={style.errorText}>Будь ласка, виберіть категорію</p>
                                )}
                            </div>

                            <div className={style.goodsConditionCheckbox}>
                                <label>
                                    <h1 className={style.smallTitle}>Товар новий?</h1>
                                    <br/>
                                    <ToggleSwitch
                                        isChecked={formData.goodsCondition === "NEW"}
                                        onToggle={(isChecked) => handleChange({
                                            target: {
                                                name: "goodsCondition",
                                                value: isChecked ? "NEW" : "USED"
                                            }
                                        })}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={style.createRentBackgroundWhite}>

                        <h1 className={style.boldTitle}>Фото</h1>
                        <p className={style.smallTitle}>Перше фото буде на обкладинці оголошення. Перетягніть, щоб
                            змінити порядок фото</p>
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
                                    <h className={style.imageUploadButtonText}>Фото</h>
                                </i>
                            </label>
                            <input id="imageInput" type="file" multiple onChange={handleImageChange}/>
                        </div>
                    </div>
                    <div className={style.createRentBackgroundWhite}>
                        <h1 className={style.boldTitle}>Опис</h1>
                        <textarea
                            className={`${style.description} ${formData.description.length > 0 ? style.blackText : ''} ${formData.description.length < 40 && style.error}`}
                            name="description"
                            placeholder="Подумайте, що ви хотіли б дізнатися з оголошення та додайте це в опис"
                            value={formData.description}
                            onChange={handleChange}
                            required

                        />
                        {formData.description.length < 16 && (
                            <>
                                <p className={style.errorText}>Не забудьте заповнити заголовок</p>
                            </>
                        )}
                        <div className={style.flexBetween}>
                            <p className={style.smallTitle}>Введіть щонайменше 40 символів</p>
                            <p className={style.smallTitle}>{formData.description.length}/9000</p>
                        </div>
                    </div>

                    <div className={style.flexRow}>
                        <div className={`${style.flexItemR} ${style.createRentBackgroundWhite}`}>
                            <h1 className={style.boldTitle}>Місцезнаходження</h1>
                            <input
                                type="text"
                                value={location}
                                onChange={findLocation}
                                placeholder="Ukraine"
                                className={`${style.flexItem} ${location ? '' : style.error}`}

                                required
                            />
                            {!location && (
                                <p className={style.errorText}>Невірне місцезнаходження</p>
                            )}

                            {locations.length > 0 && (
                                <ul className={style.locationList}>
                                    {locations.map((loc) => (
                                        <li
                                            key={loc.uniqueSettlementID}
                                            className={style.locationItem}
                                            onClick={() => handleLocationSelect(loc)}
                                        >
                                            {loc.settlement} ({loc.region})
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    <div className={`${style.flexItemR} ${style.createRentBackgroundWhite}`}>
                            <h1 className={style.boldTitle}>Автопродовження</h1>
                            <div className={style.toggleContainer}>
                                <p className={style.smallTitle}>Оголошення буде деактивовано через 30 днів</p>
                                <ToggleSwitch/>
                            </div>
                        </div>
                    </div>
                    <div className={style.createRentBackgroundWhite}>
                        <h1 className={style.boldTitle}>Ціна</h1>
                        <div className={style.currencyContainer}>

                            <div className={style.currency}>
                                <input
                                    type="number"
                                    name="price.priceAmount"
                                    placeholder="Ціна"
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
                                        Договірна:
                                        <ToggleSwitch
                                            isChecked={formData.price.priceType === 'NEGOTIATED_PRICE'}
                                            onToggle={(isChecked) => handleChange({
                                                target: {
                                                    name: "price.priceType",
                                                    value: isChecked ? 'NEGOTIATED_PRICE' : ''
                                                }
                                            })}
                                        />
                                    </label>
                                </div>

                            </div>

                            <div className={style.currency}>
                                <input
                                    type="number"
                                    name="weekendsPrice.weekendsPriceAmount"
                                    placeholder="Ціна на вихідні"
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
                                        Договірна:
                                        <ToggleSwitch
                                            isChecked={formData.weekendsPrice.weekendsPriceType === 'NEGOTIATED_PRICE'}
                                            onToggle={(isChecked) => handleChange({
                                                target: {
                                                    name: "weekendsPrice.weekendsPriceType",
                                                    value: isChecked ? 'NEGOTIATED_PRICE' : ''
                                                }
                                            })}
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className={style.currency}>
                                <input
                                    type="number"
                                    name="deposit.depositAmount"
                                    placeholder="Депозит"
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
                                        Договірна:
                                    </label>
                                    <ToggleSwitch
                                        isChecked={formData.deposit.depositPriceType === 'NEGOTIATED_PRICE'}
                                        onToggle={(isChecked) => handleChange({
                                            target: {
                                                name: "deposit.depositPriceType",
                                                value: isChecked ? 'NEGOTIATED_PRICE' : ''
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.createRentBackgroundWhite}>
                        <h1 className={style.boldTitle}>Ваші контактні дані</h1>
                        <div className={style.flexRow}>
                            <div className={style.flexItem}>
                                <h1 className={style.smallTitle}>Ім'я</h1>
                                <input
                                    type="text"
                                    name="sellerName"
                                    placeholder="Ім'я"
                                    value={formData.sellerName}
                                    onChange={handleChange}
                                    required
                                    className={`${style.flexItem} ${formData.sellerName.length > 0 ? style.blackText : ''} ${formData.sellerName.length < 3 && style.error}`}
                                />
                                {formData.sellerName.length < 3 && (
                                    <>
                                        <p className={style.errorText}>Будь ласка, вкажіть ім’я контактної особи</p>
                                    </>
                                )}


                            </div>
                            <div className={style.flexItem}>
                                <h1 className={style.smallTitle}>Електронна пошта</h1>
                                <input
                                    type="text"
                                    name="sellerEmail"
                                    placeholder="Електронна пошта"
                                    value={formData.sellerEmail}
                                    onChange={handleEmailChange}
                                    required
                                    className={`${style.flexItem} ${isEmailValid(formData.sellerEmail) ? '' : style.error} ${isEmailValid(formData.sellerEmail) ? style.blackText : ''}`}
                                />
                                {!isEmailValid(formData.sellerEmail) && (
                                    <p className={style.errorText}>Будь ласка, введіть коректну електронну адресу</p>
                                )}
                            </div>
                            <div className={style.flexItem}>
                                <h1 className={style.smallTitle}>Номер телефону</h1>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="XXXXXXXXXX"
                                    value={formData.phoneNumber}
                                    onChange={handlePhoneChange}
                                    required
                                    className={`${style.flexItem} ${isPhoneValid(formData.phoneNumber) ? '' : style.error} ${isPhoneValid(formData.phoneNumber) ? style.blackText : ''}`}
                                />
                                {!isPhoneValid(formData.phoneNumber) && (
                                    <p className={style.errorText}>Будь ласка, введіть коректний номер телефону</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <button type="submit">Create</button>
                </form>
            </div>
            <Footer/>
        </div>
    )
        ;
}
