import s from './wTransBtn.module.scss'


const WTransBtn = ({text}) => {
    return (
        <button className={s.button}>
            {text}
        </button>
    );
};

export default WTransBtn;