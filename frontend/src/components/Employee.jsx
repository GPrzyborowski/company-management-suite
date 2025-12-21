import EmployeeCard from './EmployeeCard'
import classes from './Employee.module.css'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Employee() {
	const { id } = useParams()

	const localEndpoint = `http://localhost:5000/api/employees/${id}`

	useEffect(() => {
		fetch(localEndpoint, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
			.then(res => res.json())
			.then(data => console.log(data))
	}, [id])

	return (
		<main>
			{/* <EmployeeCard /> */}
		</main>
	)
}
export default Employee
