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

	return (
		<main className={classes.main}>
			<div className={classes.box}>
				<div className={classes['info-box']}>
					<h1 className={classes.name}>
						{employee.firstName} {employee.lastName}
					</h1>
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
