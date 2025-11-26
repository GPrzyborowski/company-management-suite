function LoginForm({ onSubmit, login, setLogin, password, setPassword }) {
	
    const handleSubmit = e => {
		e.preventDefault()
		onSubmit()
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor="login"></label>
				<input type="text" id="login" value={login} onChange={e => setLogin(e.target.value)} /> <br />
				<label htmlFor="password"></label>
				<input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} /> <br />
				<button type="submit">Login</button>
			</form>
		</>
	)
}

export default LoginForm