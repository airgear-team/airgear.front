import React, { useState } from "react";
import style from './ToggleSwitch.module.scss';


const ToggleSwitch = ({ label, onToggle }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
        if (onToggle) {
            onToggle(!isChecked);
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