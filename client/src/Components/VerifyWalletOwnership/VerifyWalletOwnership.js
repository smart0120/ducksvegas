import React, {useEffect, useState} from "react";
import styles from './VerifyWalletOwnership.module.css'
import {Link} from "react-router-dom";
import logo from "../../icons/logo.svg";
import WalletAdapter from "../WalletAdapter/WalletAdapter";
import axios from "axios";
import phantom from '../../icons/phantom.svg'
import {useSelector} from "react-redux";

const VerifyWalletOwnership = () => {
    const [userData, setUserData] = useState({
        Id: 0,
        walletId: '',
        twitterUsername: '',
        category: '',
        followersCount: 0,
        balance: 0,
        nfts: '',
        nbRaids: 0,
        pfp: '',
        raided: 0,
        twitterId: '',
        avatar: ''
    });

    window.location.href = "/dashboard/rider"

    const wallet = useSelector((state) => state.GlobalVariables);

    useEffect(() => {
        axios("/users")
            .then((res) => {
                const data = res.data.data;
                setUserData({...data[0]});
            })
    }, []);

    return (
        <div className={styles['home-page-container']}>
            <Link to="/"><img src={logo} alt="Logo" className={styles['logo']} /></Link>
            <div className={styles['accounts-wrapper']}>
                <div className={styles['twitter-account']}>
                    <img src={userData.avatar} alt="nft" className={styles['nft-icon']} />
                    <p className={styles['username']}>@{userData.twitterUsername}</p>
                    <Link to="/auth" className={styles['change-account']} >Change an account</Link>
                </div>
                <div className={styles['phantom-account']}>
                    <img src={phantom} alt="phantom icon" className={styles['phantom-icon']} />
                    <p className={styles['wallet-address']}>{wallet.walletAddress.slice(0,4)}...{wallet.walletAddress.slice(-4)}</p>
                </div>
            </div>
            <div className={styles['hr-line']}></div>
            <p className={styles['verify-wallet-title']}>We need to verify your wallet ownership</p>
            <WalletAdapter />
        </div>
    )
}

export default VerifyWalletOwnership