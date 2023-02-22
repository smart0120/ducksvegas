import React from "react";
import styles from './RiderBoards.module.css';

const RiderBoards = () => {
    return(
        <div className={styles['boards-container']}>
            <p className={styles['title']}>Statistics</p>
            <div className={styles['statistics-board']}>
                <h1 className={styles['amount']}>3.3400 SOL</h1>
                <p className={styles['value']}>Avg. per Raid</p>
                <h1 className={styles['amount']}>150.3400 SOL</h1>
                <p className={styles['value']}> Total Profit</p>
                <h1 className={styles['amount']}>32</h1>
                <p className={styles['value']}>Total Raids</p>
            </div>
            <p className={styles['title']}>Statistics</p>
            <div className={styles['top-raiders-board']}>
                <ul className={styles['top-raiders-list']}>
                    <li>
                        <div className={styles['raider-info-details']}>
                            <span>1</span>
                            <img src="https://pbs.twimg.com/profile_images/1603763387401371649/ECzooI6t_normal.jpg" alt="avatar" className={styles['top-raider-avatar']}/>
                            <p className={styles['top-raider-username']}>AventarNFT</p>
                        </div>
                        <span className={styles['earned']}>19.6465 SOL</span>
                    </li>
                    <li>
                        <div className={styles['raider-info-details']}>
                            <span>2</span>
                            <img src="https://pbs.twimg.com/profile_images/1603763387401371649/ECzooI6t_normal.jpg" alt="avatar" className={styles['top-raider-avatar']}/>
                            <p className={styles['top-raider-username']}>AventarNFT</p>
                        </div>
                        <span className={styles['earned']}>19.6465 SOL</span>
                    </li>
                    <li>
                        <div className={styles['raider-info-details']}>
                            <span>3</span>
                            <img src="https://pbs.twimg.com/profile_images/1603763387401371649/ECzooI6t_normal.jpg" alt="avatar" className={styles['top-raider-avatar']}/>
                            <p className={styles['top-raider-username']}>AventarNFT</p>
                        </div>
                        <span className={styles['earned']}>19.6465 SOL</span>
                    </li>
                </ul>
                <span className={styles['see-all']}>See All</span>
            </div>
        </div>
    )
}

export default RiderBoards