import Wrapper from '../components/Wrapper'
import NewEmployeeForm from '../components/NewEmployeeForm'
import Navigation from '../components/Navigation'
import { useState } from 'react'

function NewEmployee() {
	const localEndpoint = 'http://localhost:5000/api/auth/registeremployee'

	const [formKey, setFormKey] = useState(0)

	async function submit(dataToSend) {
		const res = await fetch(localEndpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(dataToSend),
		})

		const data = await res.json()

		if (res.ok) {
			console.log('Success.')
			setFormKey(prev => prev + 1)
		} else {
			console.error(data)
		}
	}

	return (
		<Wrapper>
			<Navigation />
			<NewEmployeeForm onSubmit={submit} key={formKey}/>
		</Wrapper>
	)
}

export default NewEmployee
