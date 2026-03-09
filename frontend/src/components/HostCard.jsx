import classes from './HostCard.module.css'

function HostCard({ hostName, createdDate, isActivated }) {
	const newCreateDate = new Date(createdDate)
	const createdDateFormatted = newCreateDate.toLocaleDateString('pl-PL', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	})

	return (
		<div className={classes.card}>
			<p className={classes.name}>{hostName}</p>
			<div className={classes.container}>
				<div className={classes['card-activated']}>
					<img src="/calendar.svg" alt="calendar icon" className={classes['calendar-icon']} />
					<p className={classes.date}>{createdDateFormatted}</p>
				</div>
				<div className={classes['card-active']}>
					<div className={`${classes.dot} ${isActivated ? classes['dot-activated'] : ''}`}></div>
					<p>{isActivated ? 'Active' : 'Not active'}</p>
				</div>
				<div className={classes['btn-container']}>
					<button className={classes.btn}>
						<img src="/power.svg" alt="" />
					</button>
					<button className={classes.btn}>
						<img src="/key.svg" alt="" />
					</button>
				</div>
			</div>
		</div>
	)
}

export default HostCard
