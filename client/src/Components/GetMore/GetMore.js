import React, {useEffect, useState} from "react";
import styles from './GetMore.module.css'
import Modal from "../../Common/Modal/Modal";
import axios from "axios";

const GetMore = ({setClose, data}) => {
    const [user, setUser] = useState({})
    useEffect(() => {
        axios('/users')
            .then((response) => {
                const data = response.data.data;

            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return <Modal closeModal={setClose}>
        <div className={styles['user-info']}>
            <div className={styles['avatar-content']}>
                <img className={styles['avatar']} src={user.avatar} alt="avatar" />
                <div className={styles['avatar-info']}>
                    <span className={styles['username']}>{user.userName}</span>
                    <div className={styles['statuses']}>
                        <span className={styles['fcfs']}>FCFS 21/400</span>
                        <span className={styles['fcfs']}>Scraps 21/400</span>
                    </div>
                    <span className={styles['date']}>30/01/2023, 21:27:43</span>
                    <span className={styles['describe']}>Are you ready?🔔 https://t.co/dBIMB5sQu2...</span>
                </div>
            </div>
        </div>
        <p className={styles['raid-status']}>Your Raid is live!</p>
        <button className={styles['close-modal']}>Close</button>
    </Modal>
}

export default GetMore