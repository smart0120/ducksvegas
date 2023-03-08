import React, {useEffect, useState} from "react";
import styles from "./Rider.module.css";
import RiderHeader from "../Common/ClientHeader/RiderHeader";
import RidesTab from "../Components/RidesTab/RidesTab";
import RiderBoards from "../Components/RiderBoards/RiderBoards";
import RiderFooter from "../Components/RiderFooter/RiderFooter";
import AddRide from "../Components/AddRide/AddRide";
import {Route} from "react-router-dom";
import RideAddedModal from "../Components/RideAddedModal/RideAddedModal";
import NoPublishedTweets from "../Components/NoPublishedTweets/NoPublishedTweets";
import axios from "axios";
import ClientBoard from "../Components/ClientBoard/ClientBoard";

const Client = () => {
    const [success, setSuccess] = useState(false);
    const [raids, setRaids] = useState([])
    useEffect(() => {
        axios('/users')
            .then((res) => {
                axios(`/raids/${res.data.data[0].twitterUsername}`)
                    .then((response) => {
                        setRaids([...response.data.data])
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return(
        <div className={styles['riders-container']}>
            <RiderHeader clientSide={true} />
            <Route path="/dashboard/client" exact > {raids.length === 0 ? <NoPublishedTweets /> : <ClientBoard data={raids} />} </Route>
            <Route path="/dashboard/client/create-ride" > {!success ? <AddRide setSuccess={setSuccess}/> : <RideAddedModal setSuccess={setSuccess} />} </Route>
            <RiderFooter />
        </div>
    )
}

export default Client