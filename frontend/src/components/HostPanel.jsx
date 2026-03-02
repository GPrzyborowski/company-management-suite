import HostCard from './HostCard'
import NewHostCard from './NewHostCard'
import classes from './HostPanel.module.css'

function HostPanel({ onNewHostClick }) {
  return (
    <div className={classes.container}>
      <h2 className={classes.header}>Host devices</h2>
      <div className={classes['device-container']}>
        <NewHostCard onClick={onNewHostClick} />
      </div>
    </div>
  )
}

export default HostPanel