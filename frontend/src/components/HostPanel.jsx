import HostCard from "./HostCard"
import classes from './HostPanel.module.css'

function HostPanel() {
    return (
        <div className={classes.container}>
            <h2 className={classes.header}>Host devices</h2>
            <div className={classes['device-container']}>
                <HostCard />
            </div>
        </div>
    )
}

export default HostPanel