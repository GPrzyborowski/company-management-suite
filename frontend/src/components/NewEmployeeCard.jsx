import classes from './EmployeeCard.module.css'
import { useNavigate } from 'react-router-dom'

function NewEmployeeCard() {
	const navigate = useNavigate()

	return (
		<div className={classes.card}>
			<p className={classes.name}>Add new employee.</p>
			<div className={classes['card-mail-phone']}>
			</div>
		</div>
	)
}

export default NewEmployeeCard
