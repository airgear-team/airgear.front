import React from 'react';
import axios from "axios";

const GoogleAuthButton = () => {
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/auth/service/authenticate')
            window.location.href = response.data.url;
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <button onClick={handleLogin}>eee</button>
        </div>
    );
};

export default GoogleAuthButton;