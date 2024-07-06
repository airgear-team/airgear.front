import React, { useState } from 'react';
import style from './AuthModal.module.scss';

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
                <h2>{isRegister ? 'Register' : 'Login'}</h2>
                <form onSubmit={handleSubmit}>
                    {isRegister && (
                        <>
                            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                        </>
                    )}
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
                    <button type="button" onClick={() => setIsRegister(!isRegister)}>
                        {isRegister ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
                    </button>
                </form>
            </div>
        </div>
    );
}
