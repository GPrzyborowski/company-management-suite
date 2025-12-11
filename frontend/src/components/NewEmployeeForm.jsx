import { useState } from 'react'
import classes from './NewEmployeeForm.module.css'
import InputContainer from './InputContainer'

function NewEmployeeForm() {
	const handleSubmit = e => {
		e.preventDefault()
		onSubmit()
	}

	const [firstName, setFirstName] = useState('')

	return (
		<main className={classes.main}>
			<h1 className={classes.header}>Register a new employee.</h1>
			<form onSubmit={handleSubmit} className={classes.form}>
				<InputContainer
					htmlFor="firstName"
					labelText="First name:"
					type="text"
					id="firstName"
					value={firstName}
					onChange={setFirstName}
				/>
				<button type="submit" className={classes['form-btn']}>
					Submit
				</button>
			</form>
		</main>
	)
}

export default NewEmployeeForm