import React from 'react';

function GoodsItem({ item }) {
    return (
        <div className="goods-item">
            <h2>{item.name}</h2>
            <p>Description: {item.description}</p>
            <p>Price: {item.price}</p>
            <p>{item.location.settlement}</p>
            <p>{item.createdAt}</p>
        </div>
    );
}

export default GoodsItem;