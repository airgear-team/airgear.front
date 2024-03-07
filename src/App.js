import React, { useEffect, useState } from 'react';
import GoodsItem from './GoodsItem';
import './GoodsItem.css'

function App() {
    const [goods, setGoods] = useState([]);

    useEffect(() => {
        const headers = new Headers();
        headers.append('Authorization', 'Bearer');

        fetch('http://localhost:8080/goods/random-goods', {
            method: 'GET',
            headers: headers
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Response : ', data);
                setGoods(data);
            })
            .catch(error => {
                console.error('ERROR : ', error.message);
            });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>AirGear</h1>
            </header>
            <div className="goods-list">
                {goods.map(item => (
                    <GoodsItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}

export default App;

