import React, { useEffect, useState } from 'react';
import GoodsItem from './GoodsItem';
import './GoodsItem.css'

function App() {
    const [goods, setGoods] = useState([]);

    useEffect(() => {
        const headers = new Headers();
        headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvbmx5dXNlcjEiLCJyb2xlcyI6IlJPTEVfVVNFUiIsImlhdCI6MTcxMDE4NDE3NSwiZXhwIjoxNzEwMjAyMTc1fQ.Mt6RULl6MF54Elxhb2UCMygLgG_lOsiHbeZ_GTx0X6I');
        headers.append('Content-Type', 'application/json');

        const body = JSON.stringify({
            "name": "Sample Item",
            "description": "This is a sample item description",
            "price": 100.50,
            "weekendsPrice": 120.00,
            "location" : {
                "regionId" : 4,
                "settlement" : "ваваів"
            },
            "deposit": {
                "amount": 50.00,
                "currency": "USD"
            },
            "user": {
                "id": 1
            },
            "category" : {
                "id": 1
            },
            "phoneNumber": "+380987654321"
        });

        fetch('http://localhost:8080/goods/', {
            method: 'POST',
            headers: headers,
            body: body
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
                {/*{goods.map(item => (*/}
                {/*    <GoodsItem key={item.id} item={item} />*/}
                {/*))}*/}
            </div>
        </div>
    );
}

export default App;

