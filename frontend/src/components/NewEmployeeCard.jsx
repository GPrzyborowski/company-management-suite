import classes from './NewEmployeeCard.module.css'
import { useNavigate } from 'react-router-dom'

function NewEmployeeCard() {
	const navigate = useNavigate()

	return (
		<div className={classes.card}>
			<p className={classes.name}>Add a new employee</p>
			<div className={classes.container}>
				<img className={classes['plus-circle']} src="/plus-circle.svg" alt="plus circle" />
			</div>
		</div>
	)
}

export default NewEmployeeCard
