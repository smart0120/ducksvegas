import React from "react";
import styles from './Rider.module.css'
import RiderHeader from "../Common/ClientHeader/RiderHeader";
import RidesTab from "../Components/RidesTab/RidesTab";
import RiderBoards from "../Components/RiderBoards/RiderBoards";
import RiderFooter from "../Components/RiderFooter/RiderFooter";

const Rider = () => {
    return(
        <div className={styles['riders-container']}>
            <RiderHeader />
            <div className={styles['riders-page-content']}>
                <RidesTab />
                <RiderBoards />
            </div>
            <RiderFooter />
        </div>
    )
}

export default  Rider