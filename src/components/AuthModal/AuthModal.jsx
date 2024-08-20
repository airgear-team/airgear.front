import React, { useState } from 'react';
import style from './AuthModal.module.scss';
import AppleIcon from "../../assets/images/icons/auth/Apple.svg?react";
import FacebookIcon from "../../assets/images/icons/auth/Facebook.svg?react";
import GoogleIcon from "../../assets/images/icons/auth/Google.svg?react";

export default function AuthModal({ onClose }) {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = isRegister ? 'http://localhost:8080/auth/register' : 'http://localhost:8080/auth/authenticate';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('token', data.token);
                onClose();
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className={style.modal}>
            <div className={style.modalContent}>
                <span className={style.close} onClick={onClose}>&times;</span>
                <div>
                    <button className={style.oAuthButton} type="submit">
                        <AppleIcon />
                        Продовжити через Apple
                    </button>
                    <button className={style.oAuthButton} type="submit">
                        <FacebookIcon />
                        Продовжити через Facebook
                    </button>
                    <button className={style.oAuthButton} type="submit">
                        <GoogleIcon />
                        Продовжити через Google
                    </button>
                </div>
                <div className={style.orContainer}>
                    <span className={style.line}></span>
                    <span className={style.orText}>або</span>
                    <span className={style.line}></span>
                </div>

                <div className={style.switchButtons}>
                    <button 
                        type="button" 
                        className={!isRegister ? style.activeButton : style.inactiveButton}
                        onClick={() => setIsRegister(false)}
                    >
                        Увійти
                    </button>
                    <button 
                        type="button" 
                        className={isRegister ? style.activeButton : style.inactiveButton}
                        onClick={() => setIsRegister(true)}
                    >
                        Зареєструватись
                    </button>

                <form onSubmit={handleSubmit}>
                    {isRegister && (
                        <>
                            <input type="text" name="name" placeholder="Ім'я" value={formData.name} onChange={handleChange} required />
                            <input type="text" name="phone" placeholder="Номер телефону" value={formData.phone} onChange={handleChange} required />
                        </>
                    )}
                    <input type="email" name="email" placeholder="Електронна пошта" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} required />
                    <button type="submit">{isRegister ? 'Зареєструватись' : 'Увійти'}</button>
                </form>

                </div>
            </div>
        </div>
    );
}
