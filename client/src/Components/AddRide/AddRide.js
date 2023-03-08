import React, {useEffect, useState} from "react";
import styles from './AddRide.module.css'
import Input from "../../Common/Input/Input";
import down from '../../icons/down.svg';
import OutsideClickHandler from "react-outside-click-handler/esm/OutsideClickHandler";
import axios from "axios";
import ConfirmPayments from "../ConfirmPayments/ConfirmPayments";

const AddRide = ({setSuccess}) => {
    const [showPaymentComplete, setShowPaymentComplete] = useState(false);
    const [tweetDescription, setTweetDescription]= useState("")
    const [warnings, setWarnings] = useState({
        discordID: false,
        projectName: false,
        tweetLink: false,
        minCharacters: false,
        minFollowers: false,
        mandatoryWord: false,
        forbidden: false
    });
    const [formData, setFormData] = useState({
        discordId: "",
        projectName: "",
        tweetLink: "",
        minCharacters: "0",
        minFollowers: "0",
        mandatoryWord: "",
        forbiddenWords: "",
        budget: "3 SOL",
        avatar: "",
        userName: "",
        userId: "",
        date: ""
    });

    const submitRaid = () => {
        if(formData.discordId.trim() === ""){
            setWarnings({...warnings, discordID: true})
        }if(formData.projectName.trim() === ""){
            setWarnings({...warnings, projectName: true})
        }
        if(formData.tweetLink.trim() === ""){
            setWarnings({...warnings, tweetLink: true})
        }
        if(formData.minCharacters === ""){
            setWarnings({...warnings, minCharacters: true})
        }
        if(formData.minFollowers === ""){
            setWarnings({...warnings, minFollowers: true})
        }
        if(formData.mandatoryWord.trim() === ""){
            setWarnings({...warnings, mandatoryWord: true})
        }
        if(formData.forbiddenWords.trim() === ""){
            setWarnings({...warnings, forbidden: true})
        }

        if(warnings.discordID || warnings.projectName || warnings.tweetLink || warnings.minCharacters || warnings.minFollowers, warnings.mandatoryWord || warnings.forbidden){
            console.log("not")
        }else{
            axios.post("/raid", {...formData})
                .then((response) => {
                    const data = response.data;
                    setTweetDescription(data.tweetText)
                    setShowPaymentComplete(true);
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    useEffect(() => {
        axios("/users")
            .then((response) => {
                const data = response.data.data;
                setFormData((prev) => ({...prev, avatar: data[0].avatar, userName: data[0].twitterUsername, userId: data[0].twitterId, date: new Date()}))
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const [dropdownIsShown, setDropdownIsShown] = useState(false);

    const handler = {
        discordId(e){
            setFormData((prev) => ({...prev, discordId: e.target.value}))
        },
        projectName(e){
            setFormData((prev) => ({...prev, projectName: e.target.value}))
        },
        tweetLink(e){
            setFormData((prev) => ({...prev, tweetLink: e.target.value}))
        },
        mandatoryWord(e){
            setFormData((prev) => ({...prev, mandatoryWord: e.target.value}))
        },
        forbiddenWords(e){
            setFormData((prev) => ({...prev, forbiddenWords: e.target.value}))
        },
        budget(e){
            setFormData((prev) => ({...prev, budget: e.target.value}))
        },
        increase(){
            setFormData((prev) => ({...prev, minCharacters: parseInt(formData.minCharacters) + 1}))
        },
        decrease(){
            if(formData.minCharacters > 0){
                setFormData((prev) => ({...prev, minCharacters: parseInt(formData.minCharacters) - 1}))
            }
        },
        increaseMinFollowers(){
            setFormData((prev) => ({...prev, minFollowers: parseInt(formData.minFollowers) + 1}))
        },
        decreaseMinFollowers(){
            if(formData.minFollowers > 0){
                setFormData((prev) => ({...prev, minFollowers: parseInt(formData.minFollowers) - 1}))
            }
        },
        minCharactersOnChange(e){
            setFormData((prev) => ({...prev, minCharacters: e.target.value}))
        },
        minFollowersOnChange(e){
            setFormData((prev) => ({...prev, minFollowers: e.target.value}))
        }
    }

    return (
        <div className={styles['create-ride-container']}>
            <p className={styles['title']}>Create a new raid</p>
            <p className={styles['subtitle']}>Submit the information below to create a new raid.</p>
            <div className={styles['form-container']}>
                <div className={styles['form-item-container']}>
                    <Input
                        placeholder={"Discord ID"}
                        label={"Discord ID"}
                        width={"calc(100%)"}
                        type="text"
                        onChangeHandler={handler.discordId}
                    />
                    {warnings.discordID && <p className={styles['error-message']} style={{marginTop: '-22px'}}>Enter discord ID</p>}
                </div>
                <div className={styles['form-item-container']}>
                    <Input
                        placeholder={"Junior duck"}
                        label={"Project Name"}
                        width={"calc(100%)"}
                        type="text"
                        onChangeHandler={handler.projectName}
                    />
                    {warnings.projectName && <p className={styles['error-message']} style={{marginTop: '-22px'}}>Enter project name</p>}
                </div>
                <Input
                    placeholder={"https://twitter.com/AlphaPharaohs/status/1582783576478650378"}
                    label={"Tweet link"}
                    width={"100%"}
                    type="text"
                    onChangeHandler={handler.tweetLink}
                />
                <div style={{marginTop: "-20px", marginBottom: "56px"}}>
                    <span className={styles['instruction']}>Make sure the tweet link looks like this: </span><span style={{color: "#86D2D4", fontSize: "12px"}}>https://twitter.com/USERXXX/status/12345</span>
                </div>
                {warnings.tweetLink && <p className={styles['error-message']} style={{marginTop: '-42px', position: "inherit", width: "100%"}}>Enter tweet link</p>}

                <div style={{width: "100%"}}>
                    <p className={styles['section-title']}>What do you need from raiders?</p>
                    <p className={styles['section-subtitle']}>Submit the information below to create a new raid.</p>
                </div>
                <div className={styles['form-item-container']}>
                    <Input
                        placeholder={""}
                        label={"Min Characters"}
                        width={"calc(100%)"}
                        type="text"
                        num={formData.minCharacters}
                        withButtons={true}
                        increase={handler.increase}
                        onChangeHandler={handler.minCharactersOnChange}
                        decrease={handler.decrease}
                    />
                    {warnings.minCharacters && <p className={styles['error-message']} style={{marginTop: '-22px'}}>Enter min characters</p>}
                </div>
                <div className={styles['form-item-container']}>
                    <Input
                        placeholder={""}
                        label={"Min Followers"}
                        width={"calc(100%)"}
                        type="text"
                        num={formData.minFollowers}
                        withButtons={true}
                        onChangeHandler={handler.minFollowersOnChange}
                        increase={handler.increaseMinFollowers}
                        decrease={handler.decreaseMinFollowers}
                        textInfo="Replies must contain at least 0 characters"
                    />
                    {warnings.minFollowers && <p className={styles['error-message']} style={{marginTop: '-22px'}}>Enter min followers</p>}
                </div>

                <div className={styles['form-item-container']}>
                    <Input
                        placeholder={"#Alpha Pharaoh, Good"}
                        label={"Mandatory Word, Hashtag or @Username"}
                        width={"calc(100%)"}
                        type="text"
                        textInfo="Any word added here will appear in every raid tweet."
                        onChangeHandler={handler.mandatoryWord}
                    />
                    {warnings.mandatoryWord && <p className={styles['error-message']} style={{marginTop: '-22px'}}>Enter mandatory word</p>}
                </div>
                <div className={styles['form-item-container']}>
                    <Input
                        placeholder={"Lfg, Wagmi"}
                        label={"Forbidden Words"}
                        width={"calc(100%)"}
                        type="text"
                        textInfo="Please separate words with a comma"
                        onChangeHandler={handler.forbiddenWords}
                    />
                    {warnings.forbidden && <p className={styles['error-message']} style={{marginTop: '-22px'}}>Enter forbidden word</p>}
                </div>
                <div className={styles['solana-amount-dropdown']}>
                    <p className={styles['budget-title']}>Budget</p>
                    <div className={styles['select-amount']} onClick={() => setDropdownIsShown(true)}><span>{formData.budget}</span> <img src={down} alt="down" /></div>
                    {dropdownIsShown && <OutsideClickHandler onOutsideClick={() => setDropdownIsShown(false)}>
                        <div className={styles['dropdown-container']} onClick={() => setDropdownIsShown(false)}>
                            <span onClick={() => setFormData((prev) => ({...prev, budget: "3 SOL"}))}>3 SOL</span>
                            <span onClick={() => setFormData((prev) => ({...prev, budget: "4 SOL"}))}>4 SOL</span>
                            <span onClick={() => setFormData((prev) => ({...prev, budget: "4.5 SOL"}))}>4.5 SOL</span>
                            <span onClick={() => setFormData((prev) => ({...prev, budget: "5 SOL"}))}>5 SOL</span>
                            <span onClick={() => setFormData((prev) => ({...prev, budget: "6 SOL"}))}>6 SOL</span>
                        </div>
                    </OutsideClickHandler>}
                </div>
                <div className={styles['divider']}></div>
                <button className={styles['submit-ride']} onClick={submitRaid}>
                    Pay {formData.budget}
                </button>
            </div>
            {showPaymentComplete && <ConfirmPayments setClose={setShowPaymentComplete} data={formData} text={tweetDescription} />}
        </div>
    )
}

export default AddRide