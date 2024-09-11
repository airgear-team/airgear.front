import React from "react";
import style from "./PopularQueriesCard.module.scss"
import { PopularQueryLink } from "../PopularQueryLink/PopularQueryLink";

export const PopularQueriesCard = ({ id, title, items }) => {
    return (
        <div className={style.card}>
            <h3 className={style.cardTitle}>{title}</h3>
            <div className={style.cardList}>
                {
                    items.map(item => (
                        <PopularQueryLink
                            key={item.item_id}
                            id={item.item_id}
                            name={item.name}
                        />
                    ))
                }
            </div>
        </div>
    );
}