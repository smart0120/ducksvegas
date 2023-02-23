import React, {useEffect, useState} from "react";
import styles from './LinkWallet.module.css';
import {Link} from "react-router-dom";
import logo from "../../icons/logo.svg";
import nft from "../../icons/nft.svg";
import axios from "axios";
import WalletAdapter from "../WalletAdapter/WalletAdapter";
import {useSelector} from "react-redux";

function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

const LinkWallet = () => {

    const [nftNotFound, setNftNotFound] = useState(false)

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

    })

    const global = useSelector((state) => state.GlobalVariables);

    const getParameters = (URL) => {
        URL = JSON.parse('{"' + decodeURI(URL.split("?")[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +'"}');
        return JSON.stringify(URL);
    };

    const sessionId = JSON.parse(getParameters(window.location.href));

    useEffect(() => {
        setCookie("sessionId", sessionId.id, 1);
        axios("/users")
            .then((res) => {
                const data = res.data.data;
                setUserData({...data[0]});
            })
    }, []);

    useEffect(() => {
        if(global.walletSelected){
            axios(`https://portal-api-afa7y.ondigitalocean.app/wallet/${global.walletAddress}`)
                .then((res) => {
                    const data = res.data;
                    if(data.staking.length === 0 && data.wallet.length === 0){
                        setNftNotFound(true);
                        alert("You are not ducks NFT holder")
                    }else{
                        if(window.sessionStorage.getItem("role") === "rider"){
                            window.location.href = '/auth/verify-ownership';
                        }else{
                            window.location.href = '/dashboard/client';
                        }
                    }
                })
        }
    }, [global.walletSelected])


    return(
        <div className={styles['home-page-container']}>
            <Link to="/"><img src={logo} alt="Logo" className={styles['logo']} /></Link>
            <img src={userData.avatar} alt="nft" className={styles['nft-icon']} />
            <p className={styles['username']}>@{userData.twitterUsername}</p>
            <Link to="/auth" className={styles['change-account']} >Change an account</Link>
            <div className={styles['hr-line']}></div>
            <WalletAdapter />
        </div>
    )
}

export default LinkWallet