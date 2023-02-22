import React from "react";
import styles from './NoPublishedTweets.module.css'
import {Link} from "react-router-dom";

const RideAddedModal = () => {
    return (
        <div className={styles['create-ride-container']}>
            <span className={styles['attention']}>!</span>
            <p className={styles['title']}>No published tweets yet.</p>
            <div className={styles['subtitle-content']}>
                <p className={styles['subtitle']}>You have no published tweets, </p>
                <Link className={styles['direct-link']} to="/dashboard/client/create-ride" >Publish a Tweet to Raid.</Link>
            </div>
        </div>
    )
}

export default  RideAddedModal