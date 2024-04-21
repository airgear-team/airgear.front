import React from 'react';
import { CounterProvider } from './counter/CounterProvider.jsx';
import { ThemeProvider } from './theme/ThemeContext.jsx';

const AppProvider = ({ children }) => {
    return (
        <CounterProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </CounterProvider>
    );
};

export default AppProvider;