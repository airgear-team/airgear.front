import { Link } from 'react-router-dom'
import style from "./styles.module.scss"

export const AdminHeader = () => {
    return (
        <div className={style.header}>
            <Link to={'/'} className={[style["link"], style["activeLink"]].join(" ")}>
                <span>USER</span>
            </Link>
            <Link to={'/'} className={style.link}>
                <span>GOODS</span>
            </Link>
            <Link to={'/'} className={style.link}>
                <span>MESSAGES</span>
            </Link>
        </div>
    )
}