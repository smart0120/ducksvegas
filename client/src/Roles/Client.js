import React, {useState} from "react";
import styles from "./Rider.module.css";
import RiderHeader from "../Common/ClientHeader/RiderHeader";
import RidesTab from "../Components/RidesTab/RidesTab";
import RiderBoards from "../Components/RiderBoards/RiderBoards";
import RiderFooter from "../Components/RiderFooter/RiderFooter";
import AddRide from "../Components/AddRide/AddRide";
import {Route} from "react-router-dom";
import RideAddedModal from "../Components/RideAddedModal/RideAddedModal";
import NoPublishedTweets from "../Components/NoPublishedTweets/NoPublishedTweets";

const Client = () => {
    const [success, setSuccess] = useState(false)
    return(
        <div className={styles['riders-container']}>
            <RiderHeader />
            <Route path="/dashboard/client" exact ><NoPublishedTweets /></Route>
            <Route path="/dashboard/client/create-ride" > {!success ? <AddRide setSuccess={setSuccess}/> : <RideAddedModal setSuccess={setSuccess} />} </Route>
            <RiderFooter />
        </div>
    )
}

export default Client