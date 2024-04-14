import { categoriesArrTest } from "./categoriesArrTest";
import s from "./categories.module.scss";
const Categories = () => {
  return (
    <div className={s.categories}>
      <div className={`${s.categories__container} container`}>
        <div className={s.categories__title}>Розділи на сервісі Logo?</div>
        <ul className={s.categories__list}>
          {categoriesArrTest.map((categori) => (
            <li key={categori.id} className={s.categories__item}>
              <img
                src={categori.img}
                alt={categori.title}
                className={s.categories__img}
              />
              <p className={s.categories__text}>{categori.title} </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
