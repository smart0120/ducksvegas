import React, { useEffect, useState } from "react"
import { Route } from "react-router-dom"
import axios from "axios"
import styles from "./Rider.module.css"
import RiderHeader from "../Common/ClientHeader/RiderHeader"
import RiderFooter from "../Components/RiderFooter/RiderFooter"
import AddRide from "../Components/AddRide/AddRide"
import RideAddedModal from "../Components/RideAddedModal/RideAddedModal"
import NoPublishedTweets from "../Components/NoPublishedTweets/NoPublishedTweets"
import ClientBoard from "../Components/ClientBoard/ClientBoard"

const Client = () => {
  const [success, setSuccess] = useState(false)
  const [raids, setRaids] = useState([])
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/users")
      const { data: raids } = await axios.get(`/raids/${data.twitterUsername}`)
      setRaids(raids)
    })()
  }, [])

  return (
    <div className={styles['riders-container']}>
      <RiderHeader clientSide={true} />
      <Route path="/dashboard/client" exact>
        {
          raids.length === 0 ?
            <NoPublishedTweets />
            :
            <ClientBoard data={raids} />
        }
      </Route>
      <Route path="/dashboard/client/create-ride" >
        {
          !success ?
            <AddRide setSuccess={setSuccess} />
            :
            <RideAddedModal setSuccess={setSuccess} />
        }
      </Route>
      <RiderFooter />
    </div>
  )
}

export default Client