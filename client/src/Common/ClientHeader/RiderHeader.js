import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import styles from './ClientHeader.module.css'
import logo from '../../icons/logo.svg'
import solana from '../../icons/solana.svg'

const RiderHeader = ({ clientSide }) => {
  const [userState, setUserState] = useState({})

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/users")
      setUserState(data)
    })()
  }, [])

  return (
    <header className={styles['header']}>
      <Link to="/" >
        <img src={logo} alt="logo" className={styles['logo']} />
      </Link>
      <div className={styles['header-actions']}>
        {
          !clientSide ?
            <>
              <button className={styles['claim-button']}>
                Claim
              </button>
              <button className={styles['rent-button']}>
                Rent
              </button>
              <button className={styles['balance-button']}>
                <img className={styles['solana']} src={solana} alt="solana icon" /> SOL {userState.balance}
              </button>
            </>
            :
            <Link className={styles['claim-button']} to="/dashboard/client/create-ride">
              New Raid
            </Link>
        }
        <button className={styles['avatar-icon']}>
          <img src={userState.avatar} alt="user" />
        </button>
      </div>
    </header>
  )
}

export default RiderHeader