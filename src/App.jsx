import './App.scss'
import Header from "./components/Header/Header.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SearchingForm from "./components/SearchingForm/SearchingForm.jsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>

            </Routes>

            <Header/>
            <SearchingForm/>
            {/*/!*<ProductList/>*!/ Исправить*/}
        </BrowserRouter>
    )
}

export default App
