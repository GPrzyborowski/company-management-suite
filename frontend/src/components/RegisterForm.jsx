import classes from './RegisterForm.module.css'

function RegisterForm({ onSubmit, login, setLogin, password, setPassword, phone, setPhone, warningMsg }) {

    const handleSubmit = e => {
		e.preventDefault()
		onSubmit(e)
	}

    return (
        <main className={classes.main}>
            <h1 className={classes.header}>Register a new admin account.</h1>
            <form onSubmit={handleSubmit} className={classes.form}>
                <label htmlFor="login" className={classes['form-label']}>Login:</label>
                <input type="text" id="login" className={classes['form-input']} value={login} onChange={e => setLogin(e.target.value)} /> <br />
                <label htmlFor="password" className={classes['form-label']}>Password:</label>
                <input type="password" id="password" className={classes['form-input']} value={password} onChange={e => setPassword(e.target.value)} /> <br />
                <label htmlFor="phone" className={classes['form-label']}>Phone number:</label>
                <input type="text" id="phone" className={classes['form-input']} value={phone} onChange={e => setPhone(e.target.value)} /> <br />
                <button type="submit" className={classes['form-btn']}>Register</button>
            </form>
                <p className={classes.warning}>{warningMsg}</p>
        </main>
    )
}

export default RegisterForm