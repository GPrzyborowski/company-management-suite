import classes from './NewHostCard.module.css'

function NewHostCard({ onClick }) {
	return (
		<div className={classes.card} onClick={onClick}>
			<p className={classes.name}>New host device</p>
			<img className={classes.icon} src="/plus-circle.svg" alt="plus circle" />
		</div>
	)
}

export default NewHostCard