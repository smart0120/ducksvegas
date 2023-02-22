import React, {useEffect, useState} from "react";
import styles from './RidesTab.module.css'
import Ride from "../Ride/Ride";
import Empty from "../Empty";
import axios from "axios";

const RidesTab = () => {

    const [rides, setRides] = useState([]);
    const [active, setActive] = useState("fcfs");
    useEffect(() => {
        axios('/raids')
            .then((response) => {
                const data = response.data.data;
                setRides(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <div className={styles['rides-container']}>
            <div className={styles['tabs']}>
                <span className={active === "fcfs" ? styles['active'] : ""}
                      onClick={() => setActive("fcfs")}>FCFS</span>
                <span className={active === "scraps" ? styles['active'] : ""}
                      onClick={() => setActive("scraps")}>Scraps</span>
                <span className={active === "ended" ? styles['active'] : ""}
                      onClick={() => setActive("ended")}>Ended</span>
            </div>
            <div className={styles['rides-table']}>
                {
                    rides.length > 0 && (
                        rides.map((ride) => {
                            return <Ride data={{...ride, type: active}}/>
                        })
                    )
                }
                {
                    !rides.length > 0 && <Empty/>
                }
            </div>
        </div>
    )
}

export default RidesTab