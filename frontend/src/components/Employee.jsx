import EmployeeCard from './EmployeeCard'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

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
			.then(data => setEmployee(data))
	}, [id])

	return (
		<main>
			<EmployeeCard employee={employee}/>
		</main>
	)
}
export default Employee
