import React, {useEffect, useState} from "react";
import styles from './RidesTab.module.css'
import Ride from "../Ride/Ride";
import Empty from "../Empty";
import axios from "axios";
import RaidSteps from "../RaidSteps/RaidSteps";

const RidesTab = () => {
    const [rides, setRides] = useState([]);
    const [active, setActive] = useState("active");
    const [selected, setSelected] = useState({});
    const [allRide, setAllRide] = useState([]);
    const [showRaidSteps, setShowRaidSteps] = useState(false)
    useEffect(() => {
        axios('/raids')
            .then((response) => {
                const data = response.data.data;
                setAllRide(data)
                const activated = data.filter((d) => {
                    if(d.status === "active") return d
                })
                setRides(activated)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    const raiderListSetter = (type) => {
        const raidList = allRide.filter((r) => {
            if(r.status === type) return r
        })

        setRides([...raidList])
    }

    return (
        <div className={styles['rides-container']}>
            <div className={styles['tabs']}>
                <span className={active === "active" ? styles['active'] : ""}
                      onClick={() => {
                          setActive("active");
                          raiderListSetter('active')
                      }}>Active</span>
                {/*<span className={active === "scraps" ? styles['active'] : ""}*/}
                {/*      onClick={() => setActive("scraps")}>Scraps</span>*/}
                <span className={active === "ended" ? styles['active'] : ""}
                      onClick={() => {
                          setActive("ended");
                          raiderListSetter('ended')
                      }}>Ended</span>
            </div>
            <div className={styles['rides-table']}>
                {
                    rides.length > 0 && (
                        rides.map((ride) => {
                            return <Ride data={{...ride, type: active}} setter={setSelected} showRaid={setShowRaidSteps}/>
                        })
                    )
                }
                {
                    !rides.length > 0 && <Empty/>
                }
            </div>
            {
                showRaidSteps && <RaidSteps setClose={setShowRaidSteps} data={selected} />
            }
        </div>
    )
}

export default RidesTab