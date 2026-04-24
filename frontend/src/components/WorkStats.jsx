import classes from './WorkStats.module.css'

function WorkStats({ data, salary }) {
	if (!Array.isArray(data) || data.length == 0) return null

	const workData = data.reduce((acc, session) => {
		const date = session.startedAt.split('T')[0]
		const start = new Date(session.startedAt)
		const end = new Date(session.endedAt)
		const durationHours = (end - start) / 1000 / 3600

		const existing = acc.find(item => item.name == date)
		if (existing) {
			existing.duration += durationHours
		} else {
			acc.push({ name: date, duration: durationHours })
		}

		return acc
	}, [])

	const days = workData.length

	const hours = workData.reduce((acc, element) => acc + element.duration, 0)

	const avgTime = (hours / days).toFixed(1)

    const earned = (salary * hours).toFixed(2)

	return (
		<div className={classes['work-stats-box']}>
			<div className={classes['work-stats-box-element']}>
				<p className={classes['work-stats-box-text']}>
					<span className={classes.bold}>Days at work: </span>
					{days}
				</p>
			</div>
			<div className={classes['work-stats-box-element']}>
				<p className={classes['work-stats-box-text']}>
					<span className={classes.bold}>Total time worked: </span>
					{hours.toFixed(1)} hours
				</p>
			</div>
			<div className={classes['work-stats-box-element']}>
				<p className={classes['work-stats-box-text']}>
					<span className={classes.bold}>Average time at work: </span>
					{avgTime} hours
				</p>
			</div>
			<div className={classes['work-stats-box-element']}>
				<p className={classes['work-stats-box-text']}>
					<span className={classes.bold}>Earned: </span>
					{earned} PLN
				</p>
			</div>
		</div>
	)
}

export default WorkStats
