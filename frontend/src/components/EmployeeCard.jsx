import classes from './EmployeeCard.module.css'
import { useNavigate } from 'react-router-dom'

function EmployeeCard({employee}) {

	const navigate = useNavigate()

	return (
		<div className={classes.card} onClick={() => {
			navigate(`/employees/${employee.id}`)
		}}>
			<p className={classes.name}>{employee.firstName} {employee.lastName}</p>
			<div className={classes['card-role-phone']}>
				<p className={classes.role}>{employee.position}</p>
				<div className={classes['card-phone']}>
                    <img src="/phone.svg" alt="phone icon" className={classes['phone-icon']}/>
					<p>{employee.phoneNumber}</p>
				</div>
			</div>
		</div>
	)
}

export default EmployeeCard
