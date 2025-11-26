import { useState } from 'react'
import Navigation from '../components/Navigation'
import LoginForm from '../components/LoginForm'

function Login() {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')

	const tempEndpoint = 'http://localhost:5000/api/auth/login'

	async function submit() {
		const res = await fetch(tempEndpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ login, password }),
		})

		const data = await res.json()

		if (res.ok) {
			localStorage.setItem('token', data.jwtToken)
		} else {
			console.error(data.error)
		}
	}

	return (
		<>
			<Navigation />
			<LoginForm onSubmit={submit} login={login} setLogin={setLogin} password={password} setPassword={setPassword} />
		</>
	)
}

export default Login
