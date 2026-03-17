import Wrapper from '../components/Wrapper'
import Navigation from '../components/Navigation'
import NewEmployeeForm from '../components/NewEmployeeForm'
import WarningMsg from '../components/WarningMsg'
import { useState } from 'react'
import { API_URL } from '../config/env'

function NewEmployee() {
	const [warningMsg, setWarningMsg] = useState('')
	const [formKey, setFormKey] = useState(0)

	const REGISTER_ENDPOINT = `${API_URL}/auth/registeremployee`

	async function submit(dataToSend) {
		const res = await fetch(REGISTER_ENDPOINT, {
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
			setWarningMsg('Error while registering new employee.')
		}
	}

	return (
		<Wrapper>
			<Navigation />
			<NewEmployeeForm onSubmit={submit} key={formKey} />
			<WarningMsg children={warningMsg} />
		</Wrapper>
	)
}

export default NewEmployee
