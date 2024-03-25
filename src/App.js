import {useEffect, useState} from 'react';
import GoodsItem from './components/GoodsItem';
import './components/css/GoodsItem.css'

function App() {
    const [goods, setGoods] = useState([]);

    useEffect(() => {
        const headers = new Headers();
        const myToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5dXJpaSIsInJvbGVzIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzEwMTg5Mzk0LCJleHAiOjE3MTAyMDczOTR9.H4e4Q5lrn2aFCO1jsB91_TlqeTzYglaaY60XA7b5X6E'
        headers.append('Authorization', `Bearer ${myToken}`);
        headers.append('Content-Type', 'application/json');

        const body = JSON.stringify({
            "name": "Sample Item",
            "description": "This is a sample item description",
            "price": 100.50,
            "weekendsPrice": 120.00,
            "location": {
                "regionId": 4,
                "settlement": "ваваів"
            },
            "deposit": {
                "amount": 50.00,
                "currency": "USD"
            },
            "user": {
                "id": 1
            },
            "category": {
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
                // console.log('Response : ', data);
                setGoods(prevGoods => [...prevGoods, data]);
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
                {goods.map(item =>
                    <GoodsItem key={item.id} item={item}/>
                )}
            </div>
        </div>
    );
}

export default App;