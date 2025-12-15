import { useState } from 'react'
import classes from './LoginForm.module.css'

function LoginForm({ onSubmit, login, setLogin, password, setPassword, warningMsg }) {

    const handleSubmit = e => {
		e.preventDefault()
		if(login != '' && password != '') {
			onSubmit(e)
		} else {
			setWarningMsg("Login data not provided.")
		}
	}

	return (
		<main className={classes.container}>
			<form onSubmit={handleSubmit} className={classes.form}>
				<label htmlFor="login" className={classes['form-label']}>Login:</label>
				<input type="text" id="login" className={`${classes['form-input']} ${classes.login}`} value={login} onChange={e => setLogin(e.target.value)} /> <br />
				<label htmlFor="password" className={classes['form-label']}>Password:</label>
				<input type="password" id="password" className={classes['form-input']} value={password} onChange={e => setPassword(e.target.value)} /> <br />
				<button type="submit" className={classes['form-btn']}>Log in</button>
			</form>
				<p className={classes.warning}>{warningMsg}</p>
		</main>
	)
}

export default LoginForm