import React from "react";
import styles from './RideAddedModal.module.css'
import done from "../../icons/done.svg";
import {Link} from "react-router-dom";

const RideAddedModal = ({setSuccess}) => {
    return (
        <div className={styles['create-ride-container']}>
            <img src={done} alt="success icon" className={styles['success-icon']} />
            <p className={styles['title']}>You have successfully created a new raid!</p>
            <p className={styles['subtitle']}>The review period time is anywhere between 1-2 hours.</p>
            <div className={styles['action-buttons']}>
                <Link className={styles['home-button']} to="/dashboard/client">Home</Link>
                <button className={styles['add-new-button']} onClick={() => {setSuccess(false)}} >Create a new raid</button>
            </div>
        </div>
    )
}

export default  RideAddedModal