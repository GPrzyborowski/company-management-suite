import classes from './LoginForm.module.css'

function LoginForm({ onSubmit, login, setLogin, password, setPassword }) {
	
    const handleSubmit = e => {
		e.preventDefault()
		onSubmit()
	}

	return (
		<div className={classes.container}>
			<form onSubmit={handleSubmit} className={classes.form}>
				<label htmlFor="login" className={classes['form-label']}>Login:</label>
				<input type="text" id="login" className={classes['form-input']} value={login} onChange={e => setLogin(e.target.value)} /> <br />
				<label htmlFor="password" className={classes['form-label']}>Password:</label>
				<input type="password" id="password" className={classes['form-input']} value={password} onChange={e => setPassword(e.target.value)} /> <br />
				<button type="submit" className={classes['form-btn']}>Log in</button>
			</form>
		</div>
	)
}

export default LoginForm