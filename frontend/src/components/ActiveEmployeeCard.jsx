import classes from './ActiveEmployeeCard.module.css'

function ActiveEmployeeCard({ name, surname, workStartTime }) {
	return (
		<div className={classes.card}>
			<div className={classes['activity-container']}>
				<div className={classes.dot}></div>
                <p>Working</p>
			</div>
			<p className={classes.name}>
				{name} {surname}
			</p>

			<p className={classes.time}>Clock-in: {workStartTime}</p>
		</div>
	)
}

export default ActiveEmployeeCard
