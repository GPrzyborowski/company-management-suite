import NewEmployeeForm from '../components/NewEmployeeForm'
import Navigation from '../components/Navigation'

function NewEmployee() {
	const localEndpoint = 'http://localhost:5000/api/auth/registeremployee'

	async function submit(dataToSend) {
		const res = await fetch(localEndpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(dataToSend),
		})

		const data = await res.json()

		if (res.ok) {
			console.log('Success.')
		} else {
			console.error(data)
		}
	}

	return (
		<>
			<Navigation />
			<NewEmployeeForm onSubmit={submit}/>
		</>
	)
}

export default NewEmployee
