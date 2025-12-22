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
			.then((data) => {
				setEmployee(data)
				console.log(data);
			})
	}, [id])

	return (
		<main className={classes.main}>
			<h1 className={classes.name}>{employee.firstName} {employee.lastName}</h1>
		</main>
	)
}
export default Employee
