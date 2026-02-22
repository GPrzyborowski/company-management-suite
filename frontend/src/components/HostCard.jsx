import classes from './HostCard.module.css'

function HostCard() {
	return (
		<div className={classes.card}>
			<p className={classes.name}></p>
			<div className={classes['card-mail-phone']}>
				<div className={classes['card-activated']}>
					<img src="/calendar.svg" alt="mail icon" className={classes['mail-icon']} />
					<p></p>
				</div>
				<div className={classes['card-active']}>
					<p></p>
				</div>
			</div>
		</div>
	)
}

export default HostCard
