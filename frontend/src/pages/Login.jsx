import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Navigation from '../components/Navigation'
import LoginForm from '../components/LoginForm'

function Login() {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [hasToken, setHasToken] = useState('')

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
			window.location.href = '/dashboard'
		} else {
			console.error(data.error)
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('token')
		token ? setHasToken(true) : setHasToken(false)
	}, [])

	return (
		<>
			{!hasToken && (
				<>
					<Navigation />
					<LoginForm
						onSubmit={submit}
						login={login}
						setLogin={setLogin}
						password={password}
						setPassword={setPassword}
					/>
				</>
			)}
			{hasToken && (
				<Navigate to='/dashboard' replace={true}/>
			)}
		</>
	)
}

export default Login
