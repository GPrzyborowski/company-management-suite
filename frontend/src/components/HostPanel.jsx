import HostCard from './HostCard'
import NewHostCard from './NewHostCard'
import classes from './HostPanel.module.css'

function HostPanel({ onNewHostClick, hosts, fetchHosts }) {
	const toggleActivated = async id => {
		const res = await fetch(`http://localhost:5000/api/togglehost/${id}`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
		if (!res.ok) {
			console.error(res.message)
			return
		}
		await res.json()
		fetchHosts()
	}

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
							onClick={() => toggleActivated(host.id)}
						/>
					)
				})}
				<NewHostCard onClick={onNewHostClick} />
			</div>
		</div>
	)
}

export default HostPanel
