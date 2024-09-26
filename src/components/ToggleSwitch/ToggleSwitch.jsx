import React from "react";
import style from './ToggleSwitch.module.scss';

const ToggleSwitch = ({ isChecked, label, onToggle }) => {
    const handleToggle = () => {
        if (onToggle) {
            onToggle(!isChecked); // Передаємо новий стан
        }
    };

    return (
        <div className={style.toggleSwitch}>
            <label>
                {label}
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleToggle}
                />
                <span className={style.slider}></span>
            </label>
        </div>
    );
};

export default ToggleSwitch;
