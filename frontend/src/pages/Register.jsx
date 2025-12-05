import { useState } from 'react'
import Navigation from '../components/Navigation'
import RegisterForm from '../components/RegisterForm'

function Register() {

	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [phone, setPhone] = useState('')

        const localEndpoint = 'http://localhost:5000/api/auth/registeradmin'

    	async function submit() {
		const res = await fetch(localEndpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ login, password, phone }),
		})

		const data = await res

		if (res.ok) {
			window.location.href = '/'
		} else {
			console.error(data.error)
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
			/>
		</>
	)
}

export default Register
