import React, { useState, useEffect } from 'react';
import style from './Header.module.scss';
import AuthModal from '../AuthModal/AuthModal.jsx';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('http://localhost:8080/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setUser(data);
                    setIsLoggedIn(true);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, []);

    const handleLoginClick = () => {
        setShowAuthModal(true);
    };

    const handleProfileClick = () => {
        window.location.href = '/profile';
    };

    const handleCreateRentClick = () => {
        window.location.href = '/create-rent';
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
        window.location.reload();
    };

    const handleCloseModal = () => {
        setShowAuthModal(false);
    };

    return (
        <header className={style.header}>
            <div className={style.logo}>
                <a href="/">AIRGEAR</a>
            </div>

            <div className={style.auth}>
                {isLoggedIn ? (
                    <>
                        <button onClick={handleCreateRentClick}>Add Ad</button>
                        <button onClick={handleProfileClick}>Profile</button>
                        <button onClick={handleLogoutClick}>Logout</button>
                    </>
                ) : (
                    <button onClick={handleLoginClick}>Login</button>
                )}
            </div>
            {showAuthModal && <AuthModal onClose={handleCloseModal} />}
        </header>
    );
}
