import { useState, useEffect } from 'react'

function EmployeeList() {
	const [employees, setEmployees] = useState([])

	const endpoint = 'http://localhost:5000/api/employees'

	useEffect(() => {
		fetch(endpoint)
			.then(res => res.json())
			.then(data => {
				console.log(data)
				setEmployees(data)
			})
	}, [])

	return (
		<>
			<table>
				<tbody>
					{employees.map(record => (
						<tr key={record.id}>
							<td>{record.id}</td>
							<td>{record.name}</td>
							<td>{record.age}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

export default EmployeeList
