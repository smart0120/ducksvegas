import React from "react";
import styles from './Ride.module.css'

const Ride = ({data, setter, showRaid}) => {
    const date = new Date(data.date);
    const parcelDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    return(
        <div className={styles['ride-container']}>
            <div className={styles['rides-info']}>
                <img src={data.avatar} alt="avatar" className={styles['avatar-image']} />
                <div className={styles['ride-info']}>
                    <p className={styles['rides-nickname']}>{data.userName}</p>
                    <div className={styles['status-buttons']}>
                        <span className={styles['fcfs']}>
                        Raids {data.done + '/' + data.guarantedRaids}
                        </span>
                        {/*<span className={styles['scraps']}>Scraps {data.done + '/' + data.guarantedRaids}</span>*/}
                    </div>
                </div>
            </div>
            <div className={styles['date-and-description']}>
                <p className={styles['date']}>{parcelDate}</p>
                <p className={styles['description']}>{data.tweetDescription.slice(0, 85)}...</p>
            </div>
            <div className={styles['action-button']}>
                {
                    data.type === "fcfs" && <button className={styles['no-raids-available']}>No raids available</button>
                }
                {
                    data.type === "active" && <button className={styles['raids-in-scraps']} onClick={() => {
                        setter({...data});
                        showRaid(true)
                    }}>Raid in Scraps Phase</button>
                }
                {
                    data.type === "draft" && <button className={styles['raids-in-scraps']}>Continue</button>
                }
                {/*<button className={styles['hide']}>hide</button>*/}
            </div>
        </div>
    )
}

export default Ride