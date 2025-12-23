import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import classes from './Employee.module.css'

function Employee() {
	const { id } = useParams()

	const [employee, setEmployee] = useState('')
	const localEndpoint = `http://localhost:5000/api/employees/${id}`

	useEffect(() => {
		fetch(localEndpoint, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
			.then(res => res.json())
			.then(data => {
				setEmployee(data)
				console.log(data)
			})
	}, [id])

	const birthDate = new Date(employee.birthDate)
	const birthDateFormatted = birthDate.toLocaleDateString('pl-PL', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	})

	return (
		<main className={classes.main}>
			<div className={classes.box}>
				<div className={classes['info-box']}>
					<p className={classes.info}>
						<span className={classes['info-label']}>Name:</span> {employee.firstName} {employee.lastName}
					</p>
					<p className={classes.info}><span className={classes['info-label']}>Birth date: </span>{birthDateFormatted}</p>
					<p className={classes.info}><span className={classes['info-label']}>Social number: </span>{employee.socialNumber}</p>
				</div>
				<div className={classes['work-box']}>
					<p>test</p>
				</div>
				<div className={classes['docs-box']}>
					<p>test</p>
				</div>
			</div>
		</main>
	)
}
export default Employee
