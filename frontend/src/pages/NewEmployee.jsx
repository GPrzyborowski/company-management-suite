import Wrapper from '../components/Wrapper'
import Navigation from '../components/Navigation'
import NewEmployeeForm from '../components/NewEmployeeForm'
import WarningMsg from '../components/WarningMsg'
import { useState } from 'react'

function NewEmployee() {
	const localEndpoint = 'http://localhost:5000/api/auth/registeremployee'

	const [warningMsg, setWarningMsg] = useState('')
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
			setWarningMsg("Error while registering new employee.")
		}
	}

	return (
		<Wrapper>
			<Navigation />
			<NewEmployeeForm onSubmit={submit} key={formKey} />
			<WarningMsg children={warningMsg}/>
		</Wrapper>
	)
}

export default NewEmployee
