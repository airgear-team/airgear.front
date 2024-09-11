import React, { useEffect, useState } from "react";
import style from "./PopularQueries.module.scss"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { PopularQueriesCard } from "../PopularQueriesCard/PopularQueriesCard";
import { queriesArray } from "../../constants";


export const PopularQueries = () => {
    const [queries, setQueries] = useState([])

    useEffect(() => {
        setQueries(queriesArray)
    }, [])


    return (
        <>
            <Header />
            <div className={style.container}>
                <h2 className={style.title}>Популярні запити</h2>
                <div className={style.list}>
                    {
                        queries.map(card => (
                            <PopularQueriesCard
                                key={card.id}
                                id={card.id}
                                title={card.title}
                                items={card.items}
                            />
                        ))
                    }
                </div>
            </div>
            <Footer />
        </>
    );
}