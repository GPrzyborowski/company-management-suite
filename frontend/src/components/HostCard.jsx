import classes from './HostCard.module.css'

function HostCard() {
	return (
		<div className={classes.card}>
			<p className={classes.name}>Tablet</p>
			<div className={classes.container}>
				<div className={classes['card-activated']}>
					<img src="/calendar.svg" alt="calendar icon" className={classes['calendar-icon']} />
					<p className={classes.date}>01.01.2025</p>
				</div>
				<div className={classes['card-active']}>
					<div className={classes.dot}></div>
					<p>Active</p>
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
