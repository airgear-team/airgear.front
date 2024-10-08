import React, { useState } from 'react';
import style from './AuthModal.module.scss';
import AppleIcon from "../../assets/images/icons/auth/Apple.svg?react";
import FacebookIcon from "../../assets/images/icons/auth/Facebook.svg?react";
import GoogleIcon from "../../assets/images/icons/auth/Google.svg?react";
import YeyIcon from "../../assets/images/icons/YeyIcon.svg?react";

export default function AuthModal({ onClose }) {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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

    // Handle click outside modal to close
    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={style.modal} onClick={handleModalClick}>
            <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
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

                        <div className={style.passwordContainer}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Пароль"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className={style.passwordInput}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className={style.passwordToggle}
                            >
                                <YeyIcon />
                            </button>
                        </div>

                        <h1 className={style.forgotPassword}>Забули пароль?</h1>
                        <div className={style.singIn}>
                            <button type="submit">{isRegister ? 'Зареєструватись' : 'Увійти'}</button>
                        </div>

                        <h1 className={style.termsAgreement}>
                            Під час входу ви погоджуєтеся з нашими
                            <span className={style.termsAgreementLink}> Умовами користування</span>
                        </h1>
                    </form>
                </div>
            </div>
        </div>
    );
}
