import { useState, useEffect } from 'react'

function ApiTester() {
	const [message, setMessage] = useState('')
	const endpoint = 'http://localhost:5000/api/test'

	useEffect(() => {
		fetch(endpoint)
			.then(res => res.text())
			.then(data => setMessage(data))
			.catch(err => console.error(err))
	}, [])

	return <h1>{message}</h1>
}

export default ApiTester
