import React from 'react';
import { useCounter } from '../contexts/counter/CounterProvider';

const CounterComponent = () => {
    const { count, increment, decrement } = useCounter();


    return (
        <div>
            <h2>Counter</h2>
            <p>Count: {count}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    );
};

export default CounterComponent;