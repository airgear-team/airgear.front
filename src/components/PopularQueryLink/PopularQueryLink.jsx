import style from "./PopularQueryLink.module.scss"
import { Link } from 'react-router-dom'

export const PopularQueryLink = ({ id, name }) => {
    return (
        <Link to={`/category/${id}`} className={style.item}>
            <span>{name}</span>
        </Link >
    )
}