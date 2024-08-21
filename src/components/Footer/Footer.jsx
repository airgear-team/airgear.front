import React from 'react';
import style from './Footer.module.scss';
import FB from '../../assets/images/social/facebook.svg';
import Youtube from '../../assets/images/social/youtube.svg';
import Twitter from '../../assets/images/social/twitter.svg';

export default function Footer() {
    return (
        <footer className={style.footer}>
            <div className={style.footerContent}>
                <div className={style.logo}>
                    <a href="/">AIRGEAR</a>
                </div>

                <div className={style.footerNav}>
                    <div className={style.column}>
                        <nav>
                            <a href="#">Допомога та Зворотній зв’язок</a>
                            <a href="#">Популярні запити</a>
                            <a href="#">Профіль кандидата</a>
                            <a href="#">Отримані оцінки</a>
                        </nav>
                    </div>
                    <div className={style.column}>
                        <nav>
                            <a href="#">Створити оголошення</a>
                            <a href="#">Обрані оголошення</a>
                            <a href="#">Повідомлення</a>
                            <a href="#">Недавно переглянуті</a>
                        </nav>
                    </div>
                    <div className={style.column}>
                        <nav>
                            <a href="#">Платежі та рахунок</a>
                            <a href="#">Електронні рахунки</a>
                            <a href="#">Бонуси та повернення</a>
                            <a href="#">Мої відгуки</a>
                        </nav>
                    </div>
                </div>

                <div className={style.footerInfo}>
                    <div className={style.column}>
                        <div className={style.socialIcons}>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <img src={FB} alt="Facebook" className={style.icon} />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                <img src={Youtube} alt="YouTube" className={style.icon} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <img src={Twitter} alt="Twitter" className={style.icon} />
                            </a>
                        </div>
                    </div>
                    <div className={style.column}>
                        <p>© AIRGEAR, 2024</p>
                    </div>
                    <div className={style.column}>
                        <p>Дизайн — Олена Стужко</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
