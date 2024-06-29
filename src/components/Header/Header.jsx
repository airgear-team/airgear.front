import s from './header.module.scss'
import logo from '../../assets/images/Logo.svg'
import star from '../../assets/images/icons/WStar.svg'
import userPanel from '../../assets/images/icons/UserPanel.svg'
import WTransBtn from "../UI/WTransBtn/WTransBtn.jsx";
import {NavLink} from "react-router-dom";
import arrow from "../../assets/images/icons/ArrowBtn.svg";

const Header = () => {
    return (
        <div className={s.header}>
            <div className={`${s.header__container} container`}>
                <div className={s.header__logo}>
                    <img src={logo} alt=""/>
                </div>
                <nav className={s.header__navbar}>
                    <div className={s.header__buttons}>
                        <WTransBtn text={'Додати оголошення'}/>
                        <WTransBtn text={'Повідомлення'}/>
                    </div>
                    <div className={s.header__languages}>
                        <NavLink to={'/'}>Укр</NavLink>
                        <NavLink to={'/'}>En</NavLink>
                    </div>
                    <div className={s.header__star}>
                        <img src={star} alt=""/>
                    </div>
                    <div className={s.header__menu}>
                        <img className={s.header__userIcon} src={userPanel} alt=""/>
                        <NavLink to={'/'}>Ваш профіль</NavLink>
                        <img src={arrow} alt=""/>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header;