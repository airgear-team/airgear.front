import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    useEffect(() => {
        const headers = new Headers();
        headers.append('Authorization', 'Bearer');

        fetch('http://localhost:8080/goods/all', {
            method : 'GET',
            headers : headers
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Відповідь від контролера:', data);
            })
            .catch(error => {
                console.error('Помилка отримання даних від контролера:', error.message);
            });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
