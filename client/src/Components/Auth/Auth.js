import React from "react";
import styles from './Auth.module.css';
import logo from "../../icons/logo.svg";
import twitter from '../../icons/twitter.svg'
import { Link } from "react-router-dom";

const Auth = () => {
    const role = (new URLSearchParams(window.location.search)).get("role")
    window.sessionStorage.setItem("role", role.role)

    const authorize = () => {
        window.location.href = `/twitter/login`
    }

    return (
        <div className={styles['home-page-container']}>
            <Link to="/">
                <img src={logo} alt="Logo" className={styles['logo']} />
            </Link>
            <p className={styles['title']}>
                Raid to earn platform on the Solana Blockchain
            </p>
            <button className={styles['twitter-auth-button']} onClick={() => authorize()}>
                <img src={twitter} alt="twitter" style={{ width: "24px" }} />
                <span>Login with twitter</span>
            </button>
        </div>
    )
}

export default Auth