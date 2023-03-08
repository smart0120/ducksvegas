import React, {useState} from "react";
import styles from './Input.module.css'

const Input = ({width, label, type, onChangeHandler, placeholder, withButtons, num, increase, decrease, textInfo}) => {
    return(
        <label className={styles['label']} style={{width: width, position: "relative"}}>
            <span className={styles['label-text']}>{label}</span>
            {!withButtons && <input
                type={type}
                onChange={onChangeHandler}
                placeholder={placeholder}
                className={styles['form-control']}
            />}
            {withButtons &&
            <div className={styles['with-buttons-controls']}>
                <input
                    type={type}
                    onChange={onChangeHandler}
                    placeholder={placeholder}
                    className={styles['form-control-with-actions']}
                    value={num}
                />
                <div className={styles['action-buttons']}>
                    <button type="button" onClick={() => decrease()}>-</button>
                    <button type="button" onClick={() => increase()}>+</button>
                </div>
            </div>
            }
            {textInfo && (
                <p className={styles['additional-info']}>{textInfo}</p>
            )}
        </label>
    )
}

export default Input