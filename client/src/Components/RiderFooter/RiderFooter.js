import React from "react";
import styles from './RiderFooter.module.css'

const RiderFooter = () => {
    return(
        <footer className={styles['footer']}>
            <div className={styles['footer-content']}>
                <div className={styles['info']}>
                    <span className={styles['title']}>Ride 2 Earn</span>
                    <p className={styles['sub-text']}>Raid to earn platform on the Solana Blockchain.</p>
                    <p className={styles['sub-text']}>Copyright © 2023 Raid 2 Earn. All rights reserved.</p>
                </div>
                <div className={styles['links']}>
                    <div className={styles['section']}>
                        <span className={styles['title']}>Support</span>
                        <ul className={styles['support']}>
                            <li>
                                <a href="https://test.com" target="_blank" > Help Center </a>
                            </li>
                            <li>
                                <a href="https://test.com" target="_blank" > FAQ </a>
                            </li>
                            <li>
                                <a href="https://test.com" target="_blank" > Partnership Program </a>
                            </li>
                            <li>
                                <a href="https://test.com" target="_blank" > Blog </a>
                            </li>
                        </ul>
                    </div>
                    <div className={styles['section']}>
                        <span className={styles['title']}>Community</span>
                        <ul className={styles['community']}>
                            <li>
                                <a href="https://test.com" target="_blank" > Facebook </a>
                            </li>
                            <li>
                                <a href="https://test.com" target="_blank" > Twitter </a>
                            </li>
                            <li>
                                <a href="https://test.com" target="_blank" > Instagram </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default RiderFooter