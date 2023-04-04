import React, { useEffect, useState } from "react"
import axios from "axios"
import styles from './RaidSteps.module.css'
import Modal from "../../Common/Modal/Modal"
import ok from '../../icons/ok.svg'

const RaidSteps = ({ setClose, data }) => {
  const [user, setUser] = useState({})
  const [redirected, setRedirected] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [completedRaid, setCompletedRaid] = useState(false)
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/users")
      setUser(data)
      const completedRaids = JSON.parse(data.completedRaids)
      setCompleted(completedRaids.includes(data.tweetID))
    })()
  }, [])

  const checkStatusHandler = () => {
    axios.put(`/raid/check-status`, {
      tweetID: data.tweetID,
      username: data.userName,
      amount: data.perRaid,
      forbidden: data.forbiddenWords.split(","),
      required: data.mandatoryWord.split(","),
      minCharacters: data.minCharacters
    })
      .then((response) => {
        const res = response.data.result
        if (res === "done") {
          setCompletedRaid(true)
        } else {
          alert(res)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Modal closeModal={setClose}>
      <div className={styles['modal-content']}>
        <div className={styles['raid-header']}>
          <div className={styles['author']}>
            <img className={styles['avatar']} src={data.avatar} alt="avatar" />
            <p className={styles['username']}>@{data.userName}</p>
          </div>
          <div className={styles['earnings']}>
            <p className={styles['earned-title']}>You Earn</p>
            <p className={styles['earned-amount']}>SOL {data.perRaid}</p>
          </div>
        </div>
        <div className={styles['progress-steps']}>
          <ul className={styles['steps-list']}>
            <li>
              <span className={styles['step']}>
                {
                  user.followersCount < data.minFollowers || completed ?
                    <img src={ok} alt="okay icon" className={styles['done']} />
                    :
                    1
                }
              </span>
              <p className={styles['description']}>
                You need at least
                <span className={styles['divide']}>
                  {data.minFollowers} followers
                </span>
                to participate in the raid.
              </p>
            </li>
            <li>
              <span className={styles['step']}>{(redirected || completed) ? <img src={ok} alt="okay icon" className={styles['done']} /> : 2}</span>
              <p className={styles['description']}>
                Like, Retweet and Reply.
              </p>
            </li>
            <li>
              <span className={styles['step']}>{(completedRaid || completed) ? <img src={ok} alt="okay icon" className={styles['done']} /> : 3}</span>
              <p className={styles['description']}>
                Your reply needs to contains an least
                <span className={styles['divide']}>
                  {data.minCharacters} characters.
                </span>
              </p>
            </li>
          </ul>
        </div>
        {
          parseInt(user.followersCount) < parseInt(data.minFollowers) || completed ?
            <div className={styles['followers-state']}>
              <span></span>
              <button>
                <p className={styles['attention']}>!</p>
                <p>
                  {
                    completed ?
                      "You already completed this raid"
                      :
                      "You need at least {data.minFollowers} Followers to join this raid."
                  }
                </p>
              </button>
            </div>
            :
            <div className={!redirected ? styles['followers-state'] : styles['d-none']}>
              <span></span>
              <a
                href={data.tweeterLink}
                onClick={() => setRedirected(true)}
                target="_blank"
                rel="noreferrer"
              >
                Start Raiding
              </a>
            </div>
        }
        {(redirected && !completed) && (
          <div className={styles['followers-state']}>
            <span></span>
            <button onClick={checkStatusHandler} className={styles['check-status-button']} rel="noreferrer">
              Check Status...
            </button>
          </div>
        )}
        <button className={styles['close-button']} onClick={() => setClose(false)}>
          Close
        </button>
      </div>
    </Modal>
  )
}

export default RaidSteps