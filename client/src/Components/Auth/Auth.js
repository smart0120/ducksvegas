import React from "react";
import styles from './Auth.module.css';
import logo from "../../icons/logo.svg";
import twitter from '../../icons/twitter.svg'
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {GlobalVariablesAction} from "../../Store/GlobalVariables";

const Auth = () => {
    const dispatch = useDispatch();
    const getParameters = (URL) => {
        URL = JSON.parse('{"' + decodeURI(URL.split("?")[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +'"}');
        return JSON.stringify(URL);
    };

    let role = getParameters(window.location.href);
    role = JSON.parse(role)
    const authorize = () => {
        window.sessionStorage.setItem("role", role.role)
        window.location.href = `http://localhost:8080/twitter/login?role=${role.role}`
    }
    return(
        <div className={styles['home-page-container']}>
            <Link to="/"><img src={logo} alt="Logo" className={styles['logo']} /></Link>
            <p className={styles['title']}>Raid to earn platform on the Solana Blockchain</p>
            <button className={styles['twitter-auth-button']} onClick={() => authorize()}>
                <img src={twitter} alt="twitter" style={{width: "24px"}} />
                <span>Login with twitter</span>
            </button>
        </div>
    )
}

export default Auth