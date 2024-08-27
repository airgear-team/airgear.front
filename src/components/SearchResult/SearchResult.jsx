import style from './SearchResult.module.scss';
import Header from "../Header/Header.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import Footer from "../Footer/Footer.jsx";
import SearchProductCard from "../SearchProductCard/SearchProductCard.jsx";
import {useEffect, useState} from "react";


export default function SearchResult() {
    const [searchProductCard, setProductCard] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/goods/random', {
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setProductCard(data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    return (
        <div className={style.container}>
            <Header />
            <SearchForm />
            <div className={style.searchResult}>
                <div className={style.resultsHeader}>
                    <h2>Ми знайшли {searchProductCard.length} оголошень</h2>
                </div>
                <div className={style.resultsList}>
                    {searchProductCard.map(product => (
                        <SearchProductCard key={searchProductCard.id} product={product} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
