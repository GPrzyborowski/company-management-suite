import HostPanel from './HostPanel'
import classes from './ManagementViewport.module.css'

function ManagementViewport() {
    return (
        <main className={classes.main}>
            <HostPanel />
        </main>
    )
}

export default ManagementViewport