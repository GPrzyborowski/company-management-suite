import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Navigation from '../components/Navigation'
import LoginForm from '../components/LoginForm'
import { API_URL } from '../config/env'

function Login() {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [hasToken, setHasToken] = useState('')
	const [warningMsg, setWarningMsg] = useState('')

	const LOGIN_ENDPOINT = `${API_URL}/auth/login`

	async function submit(e) {
		e.preventDefault()
		const res = await fetch(LOGIN_ENDPOINT, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ login, password }),
		})

		const data = await res.json()

		if (res.ok) {
			localStorage.setItem('token', data.jwtToken)
			window.location.href = '/dashboard'
		} else {
			setWarningMsg('Invalid login or password.')
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
						warningMsg={warningMsg}
					/>
				</>
			)}
			{hasToken && <Navigate to="/dashboard" replace={true} />}
		</>
	)
}

export default Login
