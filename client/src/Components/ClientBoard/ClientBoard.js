import React, {useState} from "react";
import styles from './ClientBoard.module.css';
import Ride from "../Ride/Ride";

const ClientBoard = ({data}) => {
    const [activeTab, setActiveTab] = useState('active');
    const active = data.filter((raid) => {
        if(raid.status === 'active') return raid
    })
    const [showRaid, setShowRaid] = useState(active);

    const changeStatus = (status) => {
        const raids = data.filter((raid) => {
            if(raid.status === status) return raid
        })

        setShowRaid([...raids])
    }

    return (
        <div className={styles['client-board']}>
            <div className={styles['tabs']}>
                <span onClick={() => {
                    setActiveTab("active");
                    changeStatus("active");
                }} className={activeTab === "active" && styles['active']}>Active</span>
                <span onClick={() => {
                    setActiveTab("ended");
                    changeStatus("ended");
                }} className={activeTab === "ended" && styles['active']}>Ended</span>
                <span onClick={() => {
                    setActiveTab("draft");
                    changeStatus("draft");
                }} className={activeTab === "draft" && styles['active']}>Draft</span>
            </div>
            <div className={styles['show-raids-container']}>
                {showRaid.map((raid) => {
                    return <Ride data={raid} />
                })}
            </div>
        </div>
    )
}

export default ClientBoard