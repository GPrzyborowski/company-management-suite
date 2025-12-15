import { useState } from 'react'
import Navigation from '../components/Navigation'
import RegisterForm from '../components/RegisterForm'

function Register() {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [phone, setPhone] = useState('')
	const [warningMsg, setWarningMsg] = useState('')

	const localEndpoint = 'http://localhost:5000/api/auth/registeradmin'

	async function submit(e) {
		e.preventDefault()
		try {
			const res = await fetch(localEndpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ login, password, phone }),
			})

			const data = await res.json()

			if (res.ok) {
				window.location.href = '/'
			} else {
				setWarningMsg("Unable to create an account with the provided data.")
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<>
			<Navigation />
			<RegisterForm
				onSubmit={submit}
				login={login}
				setLogin={setLogin}
				password={password}
				setPassword={setPassword}
				phone={phone}
				setPhone={setPhone}
				warningMsg={warningMsg}
			/>
		</>
	)
}

export default Register
