import { useState } from 'react'
import classes from './NewEmployeeForm.module.css'

function NewEmployeeForm() {
	const handleSubmit = e => {
		e.preventDefault()
		onSubmit()
	}

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')

	return (
		<main className={classes.main}>
			<h1 className={classes.header}>Register a new employee.</h1>
			<form onSubmit={handleSubmit} className={classes.form}>
				<label htmlFor="name" className={classes['form-label']}>
					First name:
				</label>
				<input
					type="text"
					id="name"
					className={classes['form-input']}
					value={name}
					onChange={e => setName(e.target.value)}
				/>{' '}
				<br />
				<label htmlFor="surname" className={classes['form-label']}>
					Surname:
				</label>
				<input
					type="text"
					id="surname"
					className={classes['form-input']}
					value={surname}
					onChange={e => setSurname(e.target.value)}
				/>{' '}
				<br />
				<label htmlFor="phone" className={classes['form-label']}>
					Phone number:
				</label>
				<input
					type="text"
					id="phone"
					className={classes['form-input']}
					value={phone}
					onChange={e => setPhone(e.target.value)}
				/>{' '}
				<br />
				<button type="submit" className={classes['form-btn']}>
					Register
				</button>
			</form>
		</main>
	)
}

export default NewEmployeeForm
