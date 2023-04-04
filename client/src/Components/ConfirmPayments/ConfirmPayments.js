import React, { useEffect, useState } from "react"
import axios from "axios"
import styles from './ConfirmPayments.module.css'
import Modal from "../../Common/Modal/Modal"

const ConfirmPayments = ({ setClose, data, text }) => {
  const [user, setUser] = useState({})
  const descr = "Are you ready?🔔 https://t.co/dBIMB5sQu22132/content"
  const date = new Date()
  const now = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/users")
      setUser(data)
    })()
  }, [])

  return <Modal closeModal={setClose}>
    <div className={styles['user-info']}>
      <div className={styles['avatar-content']}>
        <div className={styles['user-avatar']}>
          <img className={styles['avatar']} src={user.avatar} alt="avatar" />
          <div className={styles['user-info']}>
            <span className={styles['username']}>{user.twitterUsername}</span>
            <div className={styles['statuses']}>
              <span className={styles['fcfs']}>FCFS 0/400</span>
            </div>
          </div>
        </div>
        <div className={styles['avatar-info']}>
          <p className={styles['date']}>{now}</p>
          <p className={styles['describe']}>{text.slice(0, 39)}...</p>
        </div>
      </div>
      <p className={styles['payments-confirmation-text']}>
        Your raid is ready to start, please pay {data.budget} SOL to start the raid.
      </p>
      <button className={styles['pay-button']}>Pay {data.budget} SOL</button>
      <button className={styles['close-button']}>Close</button>
    </div>
  </Modal>
}

export default ConfirmPayments