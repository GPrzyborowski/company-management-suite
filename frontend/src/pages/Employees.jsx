import Navigation from '../components/Navigation'
import EmployeeCard from '../components/EmployeeCard'
import { useState, useEffect } from 'react'

function Employees() {
	const [employees, setEmployees] = useState([])
	const localEndpoint = `http://localhost:5000/api/employees`

	useEffect(() => {
		fetch(localEndpoint, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
			.then(async res => {
				if(!res) {
					throw new Error(res.status)
				}
				return res.json()
			})
			.then((data) => {
				if(Array.isArray(data)) {
					setEmployees(data)
				} else {
					setEmployees([])
					console.log(data);
					console.error("Wrong data format.")
				}
			})
			.catch((err) => {
				setEmployees([])
				console.error(err)
			})
	}, [])

	return (
		<>
			<Navigation />
			<div className="container">
				{employees.map(element => {
					return <EmployeeCard key={element.id} employee={element} />
				})}
			</div>
		</>
	)
}

export default Employees
