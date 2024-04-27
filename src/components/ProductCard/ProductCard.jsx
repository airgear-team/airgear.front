import style from './ProductCard.module.scss'import LikeIcon from "../../assets/images/icons/Star.svg?react";import DefaultImage from "../../assets/images/default-image.jpg"export default function ProductCard(props) {	const {item} = props;	const itemId = item?.id;	const itemProductUrl = item?.productUrl; //? should be ?	const itemImg = item?.img; //? should be ?	const itemName = item?.name;	const itemPrice = item?.price?.priceAmount;	const itemCurrency = item?.price?.priceCurrency;	const itemCity = item?.location?.settlement;	const itemNew = item?.goodsCondition === 'NEW';	const itemLike = item?.like; //? should be ?	const likeStatus = `${itemLike ? `${style.product_like}` : ''}`;	function formatNumber(number) {		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");	}	const showImage = () => {		if (!itemImg) {			return <img src={DefaultImage} alt="Немає зображення"/>;		} else {			return <img src={itemImg} alt="propduct image"/>;		}	}	return (		<li className={`${style.product_card} ${likeStatus}`} data-id={itemId}>			<a href={itemProductUrl}>				<div className='product_card__top'>					<div className={`${style.product_card__image_box} ibg`}>						{showImage()}					</div>				</div>				<div className={style.info}>					<div className={style.product_card__headline}>						{itemName && <h3 className={style.product_card__name}>{itemName}</h3>}						<div className="product_card__headline_right">							<button className={style.product_card__like_button} type="button"><LikeIcon/></button>						</div>					</div>					{itemPrice && (						<h2 className={style.product_card__price}>							<span className={style.product_card__price_number}>{formatNumber(itemPrice)}</span>							<span className="product_card__price_currency">{itemCurrency ?? 'грн'}</span>						</h2>)					}					{itemCity && <h4 className="product_card__town">{itemCity}</h4>}				</div>				{!!itemNew && <div className={style.product_card__label}>NEW</div>}			</a>		</li>	)}