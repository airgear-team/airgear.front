import './App.scss'
import ImagesUploadForm from "./components/ImagesUploadForm/ImagesUploadForm.jsx";
import ProductList from "./components/ProductList/ProductList.jsx";
import ProductCard from "./components/ProductCard/ProductCard.jsx";



function App() {
    return (
        <div>
            <ImagesUploadForm/>
            <ProductList/>
        </div>
    )
}

export default App
