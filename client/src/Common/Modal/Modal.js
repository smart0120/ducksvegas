import React from "react";
import {createPortal} from "react-dom";
import styles from './Modal.module.css';

const Modal = ({closeModal, children}) => {
    return createPortal(
        <div className={styles['modal']}>
            <div className={styles['backdrop']} onClick={() => closeModal(false)}></div>
            <div className={styles['modal-container']}>
                {children}
            </div>
        </div>,
        document.getElementById('modal')
    )
}

export default Modal