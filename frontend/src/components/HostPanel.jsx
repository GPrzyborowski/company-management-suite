import HostCard from "./HostCard"
import classes from './HostPanel.module.css'

function HostPanel() {
    return (
        <div className={classes.header}>
            <h2>Host devices</h2>
            <HostCard />
        </div>
    )
}

export default HostPanel