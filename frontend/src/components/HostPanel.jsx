import HostCard from './HostCard'
import NewHostCard from './NewHostCard'
import classes from './HostPanel.module.css'

function HostPanel({ onNewHostClick, hosts }) {
	return (
		<div className={classes.container}>
			<h2 className={classes.header}>Host devices</h2>
			<div className={classes['device-container']}>
				{hosts.map(host => {
					return (
						<HostCard
							key={host.id}
							hostName={host.deviceName}
							createdDate={host.createdAt}
							isActivated={host.isActive}
						/>
					)
				})}
				<NewHostCard onClick={onNewHostClick} />
			</div>
		</div>
	)
}

export default HostPanel
