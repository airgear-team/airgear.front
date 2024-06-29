import s from './searchingForm.module.scss';
import search from '../../assets/images/icons/Search.svg'
import location from '../../assets/images/icons/Location.svg'



const SearchingForm = () => {
    return (
        <div className={s.search}>
            <div className={`${s.search__container} container`}>
                <form className={s.search__form}>
                    <img src={search} alt=""/>
                    <input type="text"
                               placeholder="Знайти…"
                               className={s.search__input}
                    />
                    <img src={location} alt=""/>
                    <input type="text"
                           placeholder="Вся Україна"
                           className={s.search__location}
                    />
                </form>
                <button className={s.search__btn}>Пошук</button>
            </div>

        </div>
    );
};

export default SearchingForm;