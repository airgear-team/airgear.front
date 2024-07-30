import style from './ProductList.module.scss'import ProductCard from "../ProductCard/ProductCard.jsx";import {useState, useEffect} from "react";import Header from "../Header/Header.jsx";import SearchForm from "../SearchFrom/SearchFrom.jsx";export default function ProductList() {    const [productCard, setProductCard] = useState([]);    useEffect(() => {        fetch('http://localhost:8080/goods/random', {            headers: {                'Accept': 'application/json'            }        })            .then(response => response.json())            .then(data => {                setProductCard(data);            })            .catch(error => {                console.error('Error fetching posts:', error);            });    }, []);    return (        <div className={style.container}>            <div><Header/></div>            <div><SearchForm/></div>            <div>                <ul className={style.product_list}>                    {productCard.map(item => <ProductCard key={productCard.id} item={item}/>)}                </ul>            </div>        </div>    )}