import './App.scss'
import ProductList from "./components/ProductList/ProductList";
import Login from "./components/Login/Login.jsx";
import Logout from "./components/Login/Logout.jsx";
import {useState} from "react";
import GoogleAuthButton from "./components/GoogleAuthButton.jsx";


function App() {


    return (
        <div>
            <GoogleAuthButton/>
            <Login/>
            <Logout/>
            <ProductList/>
        </div>

    )
}

export default App
