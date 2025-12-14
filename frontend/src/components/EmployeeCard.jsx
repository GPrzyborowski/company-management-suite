import classes from './EmployeeCard.module.css'

function EmployeeCard() {
	return (
		<div className={classes.card}>
			<p className={classes.name}>Name Surname</p>
			<div className={classes['card-role-phone']}>
				<p className={classes.role}>Software Engineer</p>
				<div className={classes['card-phone']}>
                    <img src="/phone.svg" alt="phone icon" className={classes['phone-icon']}/>
					<p>123456789</p>
				</div>
			</div>
		</div>
	)
}

export default EmployeeCard
