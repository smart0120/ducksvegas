import React from "react";
import styles from './Empty.module.css';
import {Link} from "react-router-dom";

const Empty = () => {
    return(
        <div className={styles['empty-modal-container']}>
            <span className={styles['attention']}>!</span>
            <span className={styles['title']}>No tweets available</span>
            <p className={styles['description']}>More tweets coming soon… you can get your own tweets raided <Link to="/main">here.</Link></p>
        </div>
    )
}

export default Empty