import React, {useState} from "react";
import styles from './Home.module.css'
import logo from '../../icons/logo.svg'
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className={styles['home-page-container']}>
            <img src={logo} alt="Logo" className={styles['logo']} />
            <p className={styles['title']}>Raid to earn platform on the Solana Blockchain</p>
            <div className={styles['action-buttons']}>
                <Link className={styles['auth-as-rider']} to="/auth?role=rider" >I am a Raider</Link>
                <Link className={styles['require-rider']} to="/auth?role=client">I need Raiders</Link>
                <Link className={styles['rent-duck']} to="/auth?role=holder">Rent a Ducks</Link>
            </div>
        </div>
    )
}

export default Home