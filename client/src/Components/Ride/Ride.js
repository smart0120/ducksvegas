import React from "react";
import styles from './Ride.module.css'

const Ride = ({data}) => {
    const date = new Date(data.date);
    const parcelDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    return(
        <div className={styles['ride-container']}>
            <div className={styles['rides-info']}>
                <img src={data.avatar} alt="avatar" className={styles['avatar-image']} />
                <div className={styles['ride-info']}>
                    <p className={styles['rides-nickname']}>{data.username}</p>
                    <div className={styles['status-buttons']}>
                        <span className={styles['fcfs']}>
                        FCFS 21/400
                        </span>
                        <span className={styles['scraps']}>Scraps 21/400</span>
                    </div>
                </div>
            </div>
            <div className={styles['date-and-description']}>
                <p className={styles['date']}>{parcelDate}</p>
                <p className={styles['description']}>{data.mandatoryWord}</p>
            </div>
            <div className={styles['action-button']}>
                {
                    data.type === "fcfs" && <button className={styles['no-raids-available']}>No raids available</button>
                }
                {
                    data.type === "scraps" && <button className={styles['raids-in-scraps']}>Raid in Scraps Phase</button>
                }
                {/*<button className={styles['hide']}>hide</button>*/}
            </div>
        </div>
    )
}

export default Ride